import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { Student } from './Student.model';
import { Admin } from './Admin.model';

@Table
export class User extends Model {
  @Column({ allowNull: false, type: DataType.STRING })
  firstName: string;

  @Column({ allowNull: false, type: DataType.STRING })
  lastName: string;

  @Column({ allowNull: false, type: DataType.STRING })
  email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  password: string;

  @HasOne(() => Student)
  student: Student;

  @HasOne(() => Admin)
  admin: Admin;
}
