import type {Request, Response} from "express";
import {Personnel} from "../models/Personnel.js";
import {Project} from "../models/Project.js";
import {Skill} from "../models/Skill.js";
import {Sequelize} from "sequelize-typescript";

export const getDashboardStats = async (_req: Request, res: Response) => {
    try {
        const [personnelCount, projectCount, skillCount, statusDistribution] = await Promise.all([
            Personnel.count(),
            Project.count(),
            Skill.count(),
            Project.findAll({
                attributes: [
                    'status',
                    [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']
                ],
                group: ['status']
            })
        ]);

        res.status(200).json({
            summary: {
                totalPersonnel: personnelCount,
                totalProjects: projectCount,
                totalSkills: skillCount
            },
            projectDistribution: statusDistribution
        });
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};