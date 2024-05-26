import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import Joi from 'joi';
import { BadRequestError } from '../utils/errors';

async function joiValidator(fastify: FastifyInstance) {
  fastify.decorate('validate', (schema: Joi.ObjectSchema<any>, data: unknown): void => {
    const { error } = schema.validate(data);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }
  });
}

export default fp(joiValidator);
