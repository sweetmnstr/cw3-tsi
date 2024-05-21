import jwt from 'jsonwebtoken';
import { ForbiddenError } from './errors';

export interface IJWTService {
  signToken(email: string): string;
  verifyToken(token: string): void;
}

export class JWTService implements IJWTService {
  private secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET_KEY ?? 'secret';
  }

  public signToken(email: string) {
    return jwt.sign({ email }, this.secret, { expiresIn: '1h' });
  }

  public verifyToken(token: string): void {
    try {
      jwt.verify(token, this.secret);
    } catch (err) {
      throw new ForbiddenError('Invalid token');
    }
  }
}

export default new JWTService();
