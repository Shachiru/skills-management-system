import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Personnel } from './Personnel.js';
import { PersonnelSkill } from './PersonnelSkill.js';

@Table({ tableName: 'skills', timestamps: false })
export class Skill extends Model {
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    name!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    category!: string; // Programming Language, Framework, Tool, etc.

    @Column({ type: DataType.TEXT, allowNull: true })
    description?: string;

    @BelongsToMany(() => Personnel, () => PersonnelSkill)
    personnel!: Personnel[];
}