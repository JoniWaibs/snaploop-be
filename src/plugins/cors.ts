import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import cors from '@fastify/cors';

export default fp(async (fastify: FastifyInstance) => {
  await fastify.register(cors, {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });
});
