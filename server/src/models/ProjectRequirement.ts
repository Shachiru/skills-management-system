import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Project } from './Project.js';
import { Skill } from './Skill.js';

@Table({ tableName: 'project_requirements', timestamps: false })
export class ProjectRequirement extends Model {
    @ForeignKey(() => Project)
    @Column({ type: DataType.INTEGER, allowNull: false })
    projectId!: number;

    @ForeignKey(() => Skill)
    @Column({ type: DataType.INTEGER, allowNull: false })
    skillId!: number;

    @Column({
        type: DataType.ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert'),
        allowNull: false
    })
    minProficiency!: string;
}