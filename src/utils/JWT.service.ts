import jwt from 'jsonwebtoken';
import { ForbiddenError } from './errors';
import { Secret } from 'jsonwebtoken';
import { RoleEnum } from '../modules/db/enums/Role.enum';

export interface IJWTService {
  signToken(email: string, role: RoleEnum): string;
  verifyToken(token: string, role: RoleEnum): void;
  decodeToken(token: string): { email: string; role: RoleEnum };
}

export class JWTService implements IJWTService {
  private studentSecret: string;
  private adminSecret: string;
  private expiredIn: string;

  constructor() {
    this.adminSecret = process.env.JWT_ADMIN_SECRET_KEY ?? 'secret1';
    this.studentSecret = process.env.JWT_STUDENT_SECRET_KEY ?? 'secret2';
    this.expiredIn = process.env.JWT_EXPIRES_IN ?? '1h';
  }

  public signToken(email: string, role: RoleEnum) {
    return jwt.sign({ email, role }, role === RoleEnum.ADMIN ? this.adminSecret : this.studentSecret, { expiresIn: this.expiredIn });
  }

  public verifyToken(token: string, role: RoleEnum): void {
    try {
      jwt.verify(token, role === RoleEnum.ADMIN ? this.adminSecret : this.studentSecret);
    } catch (err) {
      throw new ForbiddenError('Invalid token');
    }
  }

  public decodeToken(token: string): { email: string; role: RoleEnum } {
    try {
      const decodedToken = jwt.decode(token) as { email: string; role: RoleEnum };
      return decodedToken;
    } catch (err) {
      throw new ForbiddenError('Invalid token');
    }
  }

  public getSecret(role: RoleEnum): Secret {
    return role === RoleEnum.ADMIN ? this.adminSecret : this.studentSecret;
  }
}

export default new JWTService();
