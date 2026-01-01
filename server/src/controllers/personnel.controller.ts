import type { Request, Response } from "express";
import { Personnel } from "../models/Personnel.js";

export const createPersonnel = async (req: Request, res: Response) => {
    try {
        const person = await Personnel.create(req.body);
        res.status(201).json(person);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllPersonnel = async (_req: Request, res: Response) => {
    try {
        const people = await Personnel.findAll();
        res.status(200).json(people);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePersonnel = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Personnel.update(req.body, { where: { id } });
        if (updated) {
            const updatedPerson = await Personnel.findByPk(id);
            return res.status(200).json(updatedPerson);
        }
        throw new Error('Personnel not found');
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePersonnel = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Personnel.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ message: "Personnel deleted" });
        }
        throw new Error('Personnel not found');
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};