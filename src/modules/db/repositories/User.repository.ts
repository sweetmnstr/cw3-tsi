import { User } from '../models/User.model';
import { AbstractRepository, IRepository } from './Abstract.repository';

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}

class UserRepository extends AbstractRepository<User> implements IUserRepository {
  constructor() {
    super(User);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ where: { email } });
    return user?.dataValues;
  }
}

export default new UserRepository();
