import {Table, Column, Model, DataType, BelongsToMany, AllowNull, Unique, NotEmpty} from 'sequelize-typescript';
import {Personnel} from './Personnel.js';
import {PersonnelSkill} from './PersonnelSkill.js';

@Table({tableName: 'skills', timestamps: true})
export class Skill extends Model {

    @NotEmpty({msg: "Skill name cannot be empty"})
    @Unique
    @AllowNull(false)
    @Column({type: DataType.STRING})
    name!: string;

    @AllowNull(false)
    @Column({
        type: DataType.ENUM(
            'Programming Language',
            'Framework',
            'Library',
            'Database',
            'Cloud Provider',
            'Tool/DevOps',
            'Soft Skill',
            'Management'
        )
    })
    category!: string;

    @Column({type: DataType.TEXT, allowNull: true})
    description?: string;

    @BelongsToMany(() => Personnel, () => PersonnelSkill)
    personnel!: Personnel[];
}