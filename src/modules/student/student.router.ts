import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import studentService from './student.service';
import { Student, Document } from '../db/models';
import JWTService from '../../utils/JWT.service';

// Define your Fastify router
export default async function studentRouter(fastify: FastifyInstance, options: any) {
  // Get all students

  fastify.addHook('onRequest', async (request, reply) => {
    try {
      console.log({ headers: request.headers });

      const authHeader = request.headers['authorization'];
      if (!authHeader) {
        throw new Error('No token provided');
      }
      const token = authHeader.split(' ')[1];

      const { role } = JWTService.decodeToken(token);
      JWTService.verifyToken(token, role);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.put('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id: studentId } = request.params as { id: number };
      const updatedStudent = request.body as Partial<Student>;
      // Your code to update the student with the given ID in the database
      const result = await studentService.updateStudent(studentId, updatedStudent);
      reply.send({ message: 'Student updated successfully' });
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      reply.status(statusCode).send({ message });
    }
  });

  fastify.post('/:id/documents', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id: studentId } = request.params as { id: number };
      const newDocument = request.body as Document;
      // Your code to create a new student in the database
      const createdDocument = await studentService.createStudentApplication(studentId, newDocument);
      reply.send(createdDocument);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      reply.status(statusCode).send({ message });
    }
  });
}
