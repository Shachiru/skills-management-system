import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password!: string;

    @Column({ type: DataType.ENUM('Admin', 'Manager'), defaultValue: 'Manager' })
    role!: string;
}