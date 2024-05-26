import UserRepository, { IUserRepository } from '../db/repositories/User.repository';
import JWTService, { IJWTService } from '../../utils/JWT.service';
import { CryptoService } from '../../utils/crypto.service';
import { BadRequestError } from '../../utils/errors';
import { TSignInDTO, TSignUpDTO } from './dtos';
import { RoleEnum } from '../db/enums/Role.enum';
import { IRepository } from '../db/repositories/Abstract.repository';
import StudentRepository from '../db/repositories/Student.repository';
import { Student } from '../db/models';

export interface IAuthService {
  signIn(signInDTO: TSignInDTO): Promise<string>;
  signUp(signUpDTO: TSignUpDTO): Promise<string>;
}

export class AuthService implements IAuthService {
  constructor(
    private readonly usersRepository: IUserRepository = UserRepository,
    private readonly studentsRepository: IRepository<Student> = StudentRepository,
    private readonly jwtService: IJWTService = JWTService
  ) {}

  public async signIn({ email, password }: TSignInDTO): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestError('Invalid email or password');
    }
    const salt = email.split('@')[0];

    const isAdmin = user?.admin;

    console.log({ password, userPassword: user.password, salt });

    const isPasswordValid = await CryptoService.verifyPassword(password, user.password, salt);
    if (!isPasswordValid) {
      throw new BadRequestError('Invalid email or password');
    }

    const token = isAdmin ? this.jwtService.signToken(user.email, RoleEnum.ADMIN) : this.jwtService.signToken(user.email, RoleEnum.STUDENT);

    return token;
  }

  public async signUp(signUpDTO: TSignUpDTO): Promise<string> {
    const checkUser = await this.usersRepository.findByEmail(signUpDTO.email);
    if (checkUser) {
      throw new BadRequestError('User already exists');
    }
    const salt = signUpDTO.email.split('@')[0];
    const hashedPassword = await CryptoService.hashPassword(signUpDTO.password, salt);

    const user = await this.usersRepository.create({ ...signUpDTO, password: hashedPassword });
    console.log({ user });

    await this.studentsRepository.create({ userId: user?.dataValues.id });

    const token = this.jwtService.signToken(signUpDTO.email, RoleEnum.STUDENT);

    return token;
  }
}

export default new AuthService();
