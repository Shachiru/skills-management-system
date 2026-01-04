import type {Request, Response} from "express";
import {Project} from "../models/Project.js";
import {ProjectRequirement} from "../models/ProjectRequirement.js";
import {Personnel} from "../models/Personnel.js";
import {Skill} from "../models/Skill.js";

const proficiencyLevels: Record<string, number> = {
    "Beginner": 1,
    "Intermediate": 2,
    "Advanced": 3,
    "Expert": 4
};

export const getAllProjects = async (_req: Request, res: Response) => {
    try {
        const projects = await Project.findAll({
            include: [{
                model: ProjectRequirement,
                include: [Skill]
            }]
        });
        res.status(200).json(projects);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const createProject = async (req: Request, res: Response) => {
    try {
        const {name, description, startDate, endDate, status, requirements} = req.body;
        const project = await Project.create({name, description, startDate, endDate, status});

        if (requirements && requirements.length > 0) {
            const reqs = requirements.map((r: any) => ({
                ...r,
                projectId: project.id
            }));
            await ProjectRequirement.bulkCreate(reqs);
        }
        res.status(201).json(project);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({message: "Project not found"});
        }

        await project.destroy();
        res.status(200).json({message: "Project deleted successfully"});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const addProjectRequirement = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {skillId, minProficiency} = req.body;

        const requirement = await ProjectRequirement.create({
            projectId: parseInt(id),
            skillId,
            minProficiency
        });

        res.status(201).json(requirement);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const deleteProjectRequirement = async (req: Request, res: Response) => {
    try {
        const {id, reqId} = req.params;

        const requirement = await ProjectRequirement.findOne({
            where: {id: reqId, projectId: id}
        });

        if (!requirement) {
            return res.status(404).json({message: "Requirement not found"});
        }

        await requirement.destroy();
        res.status(200).json({message: "Requirement removed successfully"});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const getMatchesForProject = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const requirements = await ProjectRequirement.findAll({
            where: {projectId: id}
        });

        if (requirements.length === 0) {
            return res.status(404).json({message: "No requirements found for this project"});
        }

        const requiredSkillIds = requirements.map(r => r.skillId);

        const candidates = await Personnel.findAll({
            where: {isAvailable: true},
            include: [{
                model: Skill,
                where: {id: requiredSkillIds},
                through: {attributes: ['proficiencyLevel']}
            }]
        });

        const totalRequirements = requirements.length;

        const matches = candidates.map(person => {
            let matchedCount = 0;

            requirements.forEach(req => {
                const personSkill = person.skills.find(s => s.id === req.skillId);

                if (personSkill) {
                    const pSkill = personSkill.get('PersonnelSkill') as any;
                    const personScore = proficiencyLevels[pSkill.proficiencyLevel] || 0;
                    const requiredScore = proficiencyLevels[req.minProficiency] || 0;

                    if (personScore >= requiredScore) {
                        matchedCount++;
                    }
                }
            });

            const matchPercentage = Math.round((matchedCount / totalRequirements) * 100);

            return {
                ...person.get({plain: true}),
                matchPercentage
            };
        })
            .filter(m => m.matchPercentage > 0)
            .sort((a, b) => b.matchPercentage - a.matchPercentage);

        res.status(200).json(matches);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};