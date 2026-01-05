import type { Request, Response } from "express";
import { Skill } from "../models/Skill.js";
import { PersonnelSkill } from "../models/PersonnelSkill.js";

interface CreateSkillRequest extends Request {
    body: {
        name: string;
        category: string;
        description?: string;
    };
}

interface UpdateSkillRequest extends Request {
    body: {
        name?: string;
        category?: string;
        description?: string;
    };
}

interface AssignSkillRequest extends Request {
    body: {
        personnelId: number;
        skillId: number;
        proficiencyLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    };
}

export const createSkill = async (req: CreateSkillRequest, res: Response) => {
    try {
        const skill = await Skill.create(req.body);
        res.status(201).json(skill);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllSkills = async (_req: Request, res: Response) => {
    try {
        const skills = await Skill.findAll();
        res.status(200).json(skills);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSkill = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const skill = await Skill.findByPk(id);

        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        await skill.destroy();
        res.status(200).json({ message: "Skill deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSkill = async (req: UpdateSkillRequest, res: Response) => {
    try {
        const { id } = req.params;
        const skill = await Skill.findByPk(id);

        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        await skill.update(req.body);
        res.status(200).json(skill);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const assignSkillToPersonnel = async (req: AssignSkillRequest, res: Response) => {
    try {
        const { personnelId, skillId, proficiencyLevel } = req.body;

        const [assignment, created] = await PersonnelSkill.upsert({
            personnelId,
            skillId,
            proficiencyLevel
        });

        res.status(created ? 201 : 200).json({
            message: created ? "Skill assigned" : "Skill updated",
            data: assignment
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};