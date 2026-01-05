import type {Request, Response} from "express";
import {Personnel} from "../models/Personnel.js";
import {Op} from "sequelize";
import {PersonnelSkill} from "../models/PersonnelSkill.js";

export const createPersonnel = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, experienceLevel, ...rest } = req.body;

        // Combine firstName and lastName into name
        const name = `${firstName} ${lastName}`;

        const person = await Personnel.create({
            name,
            experienceLevel,
            ...rest
        });
        res.status(201).json(person);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const getAllPersonnel = async (req: Request, res: Response) => {
    try {
        const {role} = req.query;
        let whereClause: any = {};

        if (role) {
            whereClause.role = {[Op.like]: `%${role}%`};
        }


        const people = await Personnel.findAll({
            where: whereClause,
            include: ['skills']
        });

        // Transform data to include firstName and lastName for frontend
        const transformedPeople = people.map(person => {
            const personData = person.toJSON();
            const nameParts = personData.name.split(' ');
            return {
                ...personData,
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || ''
            };
        });

        res.status(200).json(transformedPeople);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const updatePersonnel = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const { firstName, lastName, experienceLevel, ...rest } = req.body;

        // Combine firstName and lastName into name
        const name = `${firstName} ${lastName}`;

        const [updated] = await Personnel.update({
            name,
            experienceLevel,
            ...rest
        }, {where: {id}});

        if (updated) {
            const updatedPerson = await Personnel.findByPk(id);
            if (updatedPerson) {
                const personData = updatedPerson.toJSON();
                const nameParts = personData.name.split(' ');
                return res.status(200).json({
                    ...personData,
                    firstName: nameParts[0] || '',
                    lastName: nameParts.slice(1).join(' ') || ''
                });
            }
        }
        throw new Error('Personnel not found');
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const deletePersonnel = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const deleted = await Personnel.destroy({where: {id}});
        if (deleted) {
            return res.status(200).json({message: "Personnel deleted"});
        }
        throw new Error('Personnel not found');
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export const addSkillToPersonnel = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {skillId, proficiencyLevel} = req.body;

        const newRecord = await PersonnelSkill.create({
            personnelId: Number(id),
            skillId: Number(skillId),
            proficiencyLevel: proficiencyLevel
        });

        return res.status(201).json({
            message: "Skill assigned successfully!",
            data: newRecord
        });
    } catch (error: any) {
        console.error("Database Insert Error:", error);
        return res.status(500).json({message: "Failed to save skill: " + error.message});
    }
};