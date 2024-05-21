import { Student } from '../models/Student.model';
import { AbstractRepository } from './Abstract.repository';

class StudentRepository extends AbstractRepository<Student> {
  constructor() {
    super(Student);
  }
}

export default new StudentRepository();
