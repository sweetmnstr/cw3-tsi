import { Student, Document } from 'modules/db/models';
import { IRepository } from 'modules/db/repositories/Abstract.repository';
import DocumentRepository from 'modules/db/repositories/Document.repository';
import StudentRepository from 'modules/db/repositories/Student.repository';
import { NotFoundError } from 'utils/errors';

export interface IStudentService {
  createStudent(student: Student): Promise<Student>;
  getStudents(): Promise<Student[]>;
  getStudentById(id: number): Promise<Student | null>;
  updateStudent(studentId: number, student: Partial<Student>): Promise<[number]>;
  deleteStudent(id: number): Promise<number>;
  createStudentApplication(studentId: number, document: Partial<Document>): Promise<Document>;
}

class StudentService implements IStudentService {
  constructor(
    private readonly studentsRepository: IRepository<Student> = StudentRepository,
    private readonly documentRepository: IRepository<Document> = DocumentRepository
  ) {}

  // Create a new student
  public createStudent(student: Student): Promise<Student> {
    return this.studentsRepository.create(student);
  }

  // Get all students
  public getStudents(): Promise<Student[]> {
    return this.studentsRepository.findAll();
  }

  // Get a student by ID
  public getStudentById(id: number): Promise<Student | null> {
    return this.studentsRepository.findById(id);
  }

  // Update a student
  public updateStudent(studentId: number, student: Partial<Student>): Promise<[number]> {
    const foundedStudent = this.studentsRepository.findById(studentId);
    if (!foundedStudent) {
      throw new NotFoundError('Student not found');
    }
    return this.studentsRepository.update(studentId, student);
  }

  // Delete a student
  public deleteStudent(id: number): Promise<number> {
    const student = this.studentsRepository.findById(id);
    if (!student) {
      throw new NotFoundError('Student not found');
    }
    return this.studentsRepository.delete(id);
  }

  public async createStudentApplication(studentId: number, document: Partial<Document>) {
    const student = this.studentsRepository.findById(id);
    if (!student) {
      throw new NotFoundError('Student not found');
    }
    return this.documentRepository.create({ ...document, studentId });
  }
}

export default new StudentService();
