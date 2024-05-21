import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { User } from './User.model';
import { Document } from './Document.model';

@Table
export class Student extends Model {
  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasOne(() => Document)
  document: Document;
}
