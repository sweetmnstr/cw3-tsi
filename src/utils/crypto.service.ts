import crypto from 'node:crypto';

export class CryptoService {
  public static hashPassword(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString('hex'));
      });
    });
  }

  public static verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
    return this.hashPassword(password, salt).then(derivedKey => {
      return derivedKey === hash;
    });
  }

  public static generateSalt() {
    return crypto.randomBytes(16).toString('hex');
  }
}
