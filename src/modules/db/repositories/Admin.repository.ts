import { Admin } from '../models/Admin.model';
import { AbstractRepository } from './Abstract.repository';

class AdminRepository extends AbstractRepository<Admin> {
  constructor() {
    super(Admin);
  }
}

export default new AdminRepository();
