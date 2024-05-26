import Fastify from 'fastify';
import authRouter from './modules/auth/auth.router';
import studentRouter from './modules/student/student.router';
import adminRouter from './modules/admin/admin.router';
import fastifyJwt from '@fastify/jwt';
import 'dotenv/config';
import { sequelize, sequelizeAuthentificate } from './modules/db';
import { Secret } from '@fastify/jwt';
import joiValidator from './validators/fastify-request.validator';

const apiPrefix = '/api/v1';
const fastify = Fastify({
  logger: true
});

async function main() {
  const port = Number(process.env.PORT) || 41222;
  await sequelizeAuthentificate();

  fastify.register(joiValidator);
  fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET ?? ('secret' as Secret) });

  fastify.register(authRouter, { prefix: `${apiPrefix}/auth` });
  fastify.register(adminRouter, { prefix: `${apiPrefix}/admin` });
  fastify.register(studentRouter, { prefix: `${apiPrefix}/students` });

  fastify.listen({ port }, (err, address) => {
    if (err) throw err;
    console.log(`Server started at port ${port}\n Address: ${address}\n Pid: ${process.pid}`);
  });
}

main().catch(err => console.error(err));

process.on('SIGINT', async () => {
  console.log('Shutting down...');
  await sequelize.close();
  fastify.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
