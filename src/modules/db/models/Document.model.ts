import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Student } from './Student.model';
import { GenderEnum } from '../enums/Gender.enum';
import { ClassesEnum } from '../enums/Classes.enum';
import { DocumentStatusEnum } from '../enums/DocumentStatus.enum';

@Table
export class Document extends Model {
  @Column({ allowNull: false, type: DataType.STRING })
  faculty: string;

  @Column({ allowNull: true, type: DataType.STRING })
  photo?: string;

  @Column({ allowNull: false, type: DataType.STRING })
  firstName: string;

  @Column({ allowNull: false, type: DataType.STRING })
  lastName: string;

  @Column({ allowNull: false, type: DataType.ENUM(...Object.values(GenderEnum).map(String)) })
  gender: GenderEnum;

  @Column({ allowNull: false, type: DataType.DATE })
  dateOfBirth: Date;

  @Column({ allowNull: false, type: DataType.ENUM(...Object.values(ClassesEnum).map(String)) })
  admissionToClass: ClassesEnum;

  @Column({ allowNull: false, type: DataType.ENUM(...Object.values(DocumentStatusEnum).map(String)) })
  status: DocumentStatusEnum;

  @Column({ allowNull: false, type: DataType.JSONB })
  previousDocuments: object;

  @ForeignKey(() => Student)
  @Column({ allowNull: false, type: DataType.INTEGER })
  studentId: number;

  @BelongsTo(() => Student)
  student: Student;
}
