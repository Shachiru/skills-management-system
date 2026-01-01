import type {Request, Response} from "express";
import {Project} from "../models/Project.js";
import {ProjectRequirement} from "../models/ProjectRequirement.js";
import {Personnel} from "../models/Personnel.js";
import {Skill} from "../models/Skill.js";
import {PersonnelSkill} from "../models/PersonnelSkill.js";

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
        const {name, description, startDate, endDate, requirements} = req.body;
        const project = await Project.create({name, description, startDate, endDate});

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
            where: { isAvailable: true },
            include: [{
                model: Skill,
                where: {id: requiredSkillIds},
                through: {attributes: ['proficiencyLevel']}
            }]
        });

        const matches = candidates.filter(person => {
            return requirements.every(req => {
                const personSkill = person.skills.find(s => s.id === req.skillId);

                if (!personSkill) return false;

                const pSkill = personSkill.get('PersonnelSkill') as PersonnelSkill;
                const personScore = proficiencyLevels[pSkill.proficiencyLevel] || 0;
                const requiredScore = proficiencyLevels[req.minProficiency] || 0;

                return personScore >= requiredScore;
            });
        });

        res.status(200).json(matches);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};