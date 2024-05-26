// @ts-ignore
import {
  Model,
  ModelStatic,
  CreationAttributes,
  UpdateOptions,
  WhereOptions,
  FindOptions,
  Attributes,
  DestroyOptions,
  CreateOptions
} from 'sequelize/types';

export interface IRepository<T> {
  //@ts-ignore
  create(modelData: Partial<T>, options?: CreateOptions<Attributes<T>>): Promise<T>;
  // @ts-ignore
  findById(id: number, options?: Omit<FindOptions<Attributes<T>>, 'where'>): Promise<T | null>;
  // @ts-ignore
  findAll(options?: FindOptions<Attributes<T>>): Promise<T[]>;
  update(id: number, modelData: Partial<T>): Promise<[affectedCount: number]>;
  // @ts-ignore
  delete(id: number, options?: DestroyOptions<Attributes<T>>): Promise<number>;
}

export abstract class AbstractRepository<T extends Model> implements IRepository<T> {
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  public async create(data: Partial<T>, options?: CreateOptions<Attributes<T>>): Promise<T> {
    // @ts-ignore
    return this.model.create(data, options) as unknown as T;
  }

  public async findAll(options?: FindOptions<Attributes<T>>): Promise<T[]> {
    return (await this.model.findAll(options)).map(model => model?.dataValues);
  }

  public async findById(id: number, options: Omit<FindOptions<Attributes<T>>, 'where'>): Promise<T | null> {
    const model = await this.model.findByPk(id, options);
    return model?.dataValues;
  }

  public async update(id: number, data: Partial<T>): Promise<[affectedCount: number]> {
    const options: UpdateOptions = {
      where: { id } as unknown as WhereOptions<T>
    };
    return this.model.update(data, options);
  }

  public async delete(id: number, options?: DestroyOptions<Attributes<T>>): Promise<number> {
    return this.model.destroy({
      where: { id } as unknown as WhereOptions<T>
    });
  }
}
