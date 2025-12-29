import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

import { Personnel } from '../models/Personnel.js';
import { Skill } from '../models/Skill.js';
import { PersonnelSkill } from '../models/PersonnelSkill.js';
import { Project } from '../models/Project.js';
import { ProjectRequirement } from '../models/ProjectRequirement.js';

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'skills_mgmt_db',
    logging: false,
    models: [
        Personnel,
        Skill,
        PersonnelSkill,
        Project,
        ProjectRequirement
    ],
});

export const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ MySQL Connection has been established successfully.');

        await sequelize.sync({ alter: true });
        console.log('✅ Personnel System Database synced.');

    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1);
    }
};

export default sequelize;