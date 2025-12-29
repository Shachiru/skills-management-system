import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Skill } from './Skill.js';
import { PersonnelSkill } from './PersonnelSkill.js';

@Table({ tableName: 'personnel', timestamps: true })
export class Personnel extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    role!: string;

    @Column({ type: DataType.ENUM('Junior', 'Mid-Level', 'Senior'), allowNull: false })
    experienceLevel!: string;

    @BelongsToMany(() => Skill, () => PersonnelSkill)
    skills!: Skill[];
}