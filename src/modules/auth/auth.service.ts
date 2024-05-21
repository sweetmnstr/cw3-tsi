import UserRepository, { IUserRepository } from 'modules/db/repositories/User.repository';
import JWTService, { IJWTService } from 'utils/JWT.service';
import { CryptoService } from 'utils/crypto.service';
import { BadRequestError } from 'utils/errors';
import { TSignInDTO, TSignUpDTO } from './dtos';

export interface IAuthService {
  signIn(signInDTO: TSignInDTO): Promise<string>;
  signUp(signUpDTO: TSignUpDTO): Promise<string>;
}

export class AuthService implements IAuthService {
  constructor(
    private readonly usersRepository: IUserRepository = UserRepository,
    private readonly jwtService: IJWTService = JWTService
  ) {}

  public async signIn({ email, password }: TSignInDTO): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestError('Invalid email or password');
    }
    const salt = email.split('@')[0];

    const isPasswordValid = await CryptoService.verifyPassword(password, user.password, salt);
    if (!isPasswordValid) {
      throw new BadRequestError('Invalid email or password');
    }

    const token = this.jwtService.signToken(user.email);

    return token;
  }

  public async signUp(signUpDTO: TSignUpDTO): Promise<string> {
    const user = await this.usersRepository.findByEmail(signUpDTO.email);
    if (!user) {
      throw new BadRequestError('Invalid email or password');
    }
    const salt = signUpDTO.email.split('@')[0];
    const hashedPassword = await CryptoService.hashPassword(signUpDTO.password, salt);

    await this.usersRepository.create({ ...signUpDTO, password: hashedPassword });

    const token = this.jwtService.signToken(user.email);

    return token;
  }
}

export default new AuthService();
