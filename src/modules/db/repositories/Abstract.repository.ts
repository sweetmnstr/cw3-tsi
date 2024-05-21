// repositories/abstract.repository.ts
// import { Model, ModelStatic } from 'sequelize/types';

// repositories/abstract.repository.ts
import { Model, ModelStatic, CreationAttributes, UpdateOptions, WhereOptions } from 'sequelize/types';

export interface IRepository<T> {
  create(modelData: Partial<T>): Promise<T>;
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: number, modelData: Partial<T>): Promise<[affectedCount: number]>;
  delete(id: number): Promise<number>;
}

export abstract class AbstractRepository<T extends Model> implements IRepository<T> {
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  public async create(data: Partial<T>): Promise<T> {
    // @ts-ignore
    return this.model.create(data) as unknown as T;
  }

  public async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  public async findById(id: number): Promise<T | null> {
    return this.model.findByPk(id);
  }

  public async update(id: number, data: Partial<T>): Promise<[affectedCount: number]> {
    const options: UpdateOptions = {
      where: { id } as unknown as WhereOptions<T>
    };
    return this.model.update(data, options);
  }

  public async delete(id: number): Promise<number> {
    return this.model.destroy({
      where: { id } as unknown as WhereOptions<T>
    });
  }
}
