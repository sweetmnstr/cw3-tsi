import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import authService from './auth.service';
import { TSignInDTO, TSignUpDTO } from './dtos';

export default async function authRouter(fastify: FastifyInstance, options: any) {
  fastify.post('/sign-in', async (request, reply) => {
    try {
      const signInDTO = request.body as TSignInDTO;
      const token = await authService.signIn(signInDTO);
      reply.send({ token });
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      reply.status(statusCode).send({ message });
    }
  });

  fastify.post('/sign-up', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const signUpDTO = request.body as TSignUpDTO;
      const token = await authService.signUp(signUpDTO);
      reply.send({ token });
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      reply.status(statusCode).send({ message });
    }
  });
}
