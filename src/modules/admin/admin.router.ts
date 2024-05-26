import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import adminService from './admin.service';
import JWTService from '../../utils/JWT.service';
import { DocumentStatusEnum } from '../db/enums/DocumentStatus.enum';
import { TSignUpDTO } from '../auth/dtos';
import { ForbiddenError } from 'utils/errors';
import { RoleEnum } from 'modules/db/enums/Role.enum';

// Define your Fastify router
export default async function studentRouter(fastify: FastifyInstance, options: any) {
  // Get all students

  fastify.addHook('onRequest', async (request, reply) => {
    try {
      const authHeader = request.headers['authorization'];
      if (!authHeader) {
        throw new ForbiddenError('No token provided');
      }
      const token = authHeader.split(' ')[1];

      const { role } = JWTService.decodeToken(token);
      // if (role !== RoleEnum.ADMIN) {
      //   throw new ForbiddenError('You are not authorized to access this resource');
      // }

      JWTService.verifyToken(token, role);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.post('/students', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const createStudentsDTO = request.body as TSignUpDTO;
      const token = await adminService.createStudent(createStudentsDTO);
      reply.send({ token });
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      reply.status(statusCode).send({ message });
    }
  });

  fastify.delete('/students/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id: studentId } = request.params as { id: number };
      // Your code to delete the student with the given ID from the database
      await adminService.deleteStudent(studentId);
      reply.send({ message: 'Student deleted successfully' });
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      reply.status(statusCode).send({ message });
    }
  });

  fastify.get('/students', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const students = await adminService.getStudents();
      reply.send(students);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      reply.status(statusCode).send({ message });
    }
  });

  fastify.get('/students/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id: studentId } = request?.params as { id: number };
      const students = await adminService.getStudentById(studentId);
      reply.send(students);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      reply.status(statusCode).send({ message });
    }
  });

  fastify.patch('/document/:id/:status', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { status, id } = request.params as { id: number; status: DocumentStatusEnum.APPROVED | DocumentStatusEnum.REJECTED };
      // Your code to create a new student in the database
      const createdStudent = await adminService.changeDocumentStatus(id, status);
      reply.send(createdStudent);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      reply.status(statusCode).send({ message });
    }
  });
}
