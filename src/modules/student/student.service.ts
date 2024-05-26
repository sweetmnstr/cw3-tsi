import { Student, Document, User } from '../db/models';
import { IRepository } from '../db/repositories/Abstract.repository';
import DocumentRepository from '../db/repositories/Document.repository';
import StudentRepository from '../db/repositories/Student.repository';
import UserRepository, { IUserRepository } from '../db/repositories/User.repository';
import { NotFoundError } from '../../utils/errors';
import { DocumentStatusEnum } from 'modules/db/enums/DocumentStatus.enum';

export interface IStudentService {
  createStudent(userId: number): Promise<string>;
  getStudents(): Promise<TStudentResponse[]>;
  getStudentById(id: number): Promise<TStudentResponse | null>;
  updateStudent(studentId: number, student: Partial<Student>): Promise<[number]>;
  deleteStudent(id: number): Promise<number>;
  createStudentApplication(studentId: number, document: Partial<Document>): Promise<Document>;
}

export type TStudentResponse = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

class StudentService implements IStudentService {
  constructor(
    private readonly userRepository: IUserRepository = UserRepository,
    private readonly studentsRepository: IRepository<Student> = StudentRepository,
    private readonly documentRepository: IRepository<Document> = DocumentRepository
  ) {}

  // Create a new student
  public async createStudent(userId: number): Promise<string> {
    await this.studentsRepository.create({ userId }, { include: [{ model: User }] });
    return 'User created successfully!';
  }

  // Get all students
  public async getStudents(): Promise<TStudentResponse[]> {
    const students = await this.studentsRepository.findAll({ include: [{ model: User }] });
    return students.map(this.mapGetStudent);
  }

  private mapGetStudent(student: Student): TStudentResponse {
    return {
      id: student.id,
      email: student.user.dataValues.email,
      firstName: student.user.dataValues.firstName,
      lastName: student.user.dataValues.lastName
    };
  }

  // Get a student by ID
  public async getStudentById(id: number): Promise<TStudentResponse | null> {
    const student = await this.studentsRepository.findById(id, { include: [{ model: User }] });
    if (!student) {
      return null;
    }
    return this.mapGetStudent(student);
  }

  // Update a student
  public async updateStudent(studentId: number, student: Partial<Student>): Promise<[number]> {
    const foundedStudent = await this.studentsRepository.findById(studentId);
    if (!foundedStudent) {
      throw new NotFoundError('Student not found');
    }
    return this.studentsRepository.update(studentId, student);
  }

  // Delete a student
  public async deleteStudent(id: number): Promise<number> {
    const student = await this.studentsRepository.findById(id);
    if (!student) {
      throw new NotFoundError('Student not found');
    }
    const userId = student.userId;
    await this.studentsRepository.delete(id, { cascade: true });
    return this.userRepository.delete(userId, { cascade: true });
  }

  public async createStudentApplication(studentId: number, document: Partial<Document>) {
    const student = await this.studentsRepository.findById(studentId);
    if (!student) {
      throw new NotFoundError('Student not found');
    }
    return this.documentRepository.create({ ...document, studentId, status: DocumentStatusEnum.PENDING });
  }
}

export default new StudentService();
