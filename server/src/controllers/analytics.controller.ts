import type {Request, Response} from "express";
import {Personnel} from "../models/Personnel.js";
import {Project} from "../models/Project.js";
import {Skill} from "../models/Skill.js";
import {Sequelize} from "sequelize-typescript";

export const getDashboardStats = async (_req: Request, res: Response) => {
    try {
        const stats = {
            totalPersonnel: await Personnel.count(),
            totalProjects: await Project.count(),
            totalSkills: await Skill.count(),
            projectStatus: await Project.findAll({
                attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']],
                group: ['status']
            })
        };
        res.status(200).json(stats);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};