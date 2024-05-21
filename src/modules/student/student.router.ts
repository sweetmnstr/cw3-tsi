import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import studentService from './student.service';
import { Student, Document } from 'modules/db/models';

// Define your Fastify router
export default function studentRouter(fastify: FastifyInstance, options: any, done: () => void) {
  // Get all students

  fastify.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const students = await studentService.getStudents();
      reply.send(students);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      reply.status(statusCode).send({ message });
    }
  });

  fastify.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id: studentId } = request?.params as { id: number };
      const students = await studentService.getStudentById(studentId);
      reply.send(students);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      reply.status(statusCode).send({ message });
    }
  });

  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const newStudent = request.body as Student;
      // Your code to create a new student in the database
      const createdStudent = await studentService.createStudent(newStudent);
      reply.send(createdStudent);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      reply.status(statusCode).send({ message });
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

  fastify.delete('/students/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id: studentId } = request.params as { id: number };
      // Your code to delete the student with the given ID from the database
      await studentService.deleteStudent(studentId);
      reply.send({ message: 'Student deleted successfully' });
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

  done();
}
