import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Personnel } from './Personnel.js';
import { Skill } from './Skill.js';

@Table({ tableName: 'personnel_skills', timestamps: false })
export class PersonnelSkill extends Model {
    @ForeignKey(() => Personnel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    personnelId!: number;

    @ForeignKey(() => Skill)
    @Column({ type: DataType.INTEGER, allowNull: false })
    skillId!: number;

    @Column({
        type: DataType.ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert'),
        allowNull: false
    })
    proficiencyLevel!: string;
}