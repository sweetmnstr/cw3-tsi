import { Document } from '../models/Document.model';
import { AbstractRepository } from './Abstract.repository';

class DocumentRepository extends AbstractRepository<Document> {
  constructor() {
    super(Document);
  }
}

export default new DocumentRepository();
