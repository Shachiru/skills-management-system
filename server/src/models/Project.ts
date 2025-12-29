import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'projects', timestamps: true })
export class Project extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    description!: string;

    @Column({ type: DataType.DATEONLY, allowNull: false })
    startDate!: Date;

    @Column({ type: DataType.DATEONLY, allowNull: false })
    endDate!: Date;

    @Column({
        type: DataType.ENUM('Planning', 'Active', 'Completed'),
        defaultValue: 'Planning'
    })
    status!: string;
}