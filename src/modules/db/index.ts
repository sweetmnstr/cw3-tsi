import { Sequelize } from 'sequelize-typescript';
import { Student, User, Document, Admin } from './models';

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  models: [Student, User, Document, Admin],
  dialect: process.env.DB_TYPE as 'postgres'
});

export const sequelizeAuthentificate = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};