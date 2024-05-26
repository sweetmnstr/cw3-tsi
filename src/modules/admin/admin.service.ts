import { DocumentStatusEnum } from '../db/enums/DocumentStatus.enum';
import { Document, Student } from '../db/models';
import { IRepository } from '../db/repositories/Abstract.repository';
import DocumentRepository from '../db/repositories/Document.repository';
import { BadRequestError, NotFoundError } from '../../utils/errors';
import StudentService, { IStudentService, TStudentResponse } from '../student/student.service';
import UserRepository, { IUserRepository } from '../db/repositories/User.repository';
import { CryptoService } from '../../utils/crypto.service';
import { TSignUpDTO } from '../auth/dtos';

export interface IAdminService {
  changeDocumentStatus(documentId: number, status: DocumentStatusEnum.APPROVED | DocumentStatusEnum.REJECTED): Promise<string>;
  createStudent(createUserDTO: TSignUpDTO): Promise<TStudentResponse>;
  getStudents(): Promise<TStudentResponse[]>;
  getStudentById(id: number): Promise<TStudentResponse | null>;
  deleteStudent(id: number): Promise<number>;
}

class AdminService implements IAdminService {
  constructor(
    private readonly documentRepository: IRepository<Document> = DocumentRepository,
    private readonly studentService: IStudentService = StudentService,
    private readonly usersRepository: IUserRepository = UserRepository
  ) {}
  // Create a new student
  public async createStudent(createUserDTO: TSignUpDTO): Promise<TStudentResponse> {
    const userId = await this.createUser(createUserDTO);
    return this.studentService.createStudent(userId);
  }

  private async createUser(createUserDTO: TSignUpDTO): Promise<number> {
    const checkUser = await this.usersRepository.findByEmail(createUserDTO.email);
    if (checkUser) {
      throw new BadRequestError('User already exists');
    }
    const salt = createUserDTO.email.split('@')[0];
    const hashedPassword = await CryptoService.hashPassword(createUserDTO.password, salt);

    const user = await this.usersRepository.create({ ...createUserDTO, password: hashedPassword });

    return user.dataValues.id;
  }

  // Change document status
  public async changeDocumentStatus(documentId: number, status: DocumentStatusEnum.APPROVED | DocumentStatusEnum.REJECTED): Promise<string> {
    const document = await this.documentRepository.findById(documentId);
    if (!document) {
      throw new NotFoundError('Document not found');
    }
    document.status = status;
    await this.documentRepository.update(documentId, document);

    return `Documetn updated status to ${status} successfully`;
  }

  public async getStudents(): Promise<TStudentResponse[]> {
    return this.studentService.getStudents();
  }

  // Get a student by ID
  public async getStudentById(id: number): Promise<TStudentResponse | null> {
    return this.studentService.getStudentById(id);
  }

  // Update a student
  public async updateStudent(studentId: number, student: Partial<Student>): Promise<[number]> {
    return this.studentService.updateStudent(studentId, student);
  }

  public async deleteStudent(id: number): Promise<number> {
    return this.studentService.deleteStudent(id);
  }
}

export default new AdminService();
