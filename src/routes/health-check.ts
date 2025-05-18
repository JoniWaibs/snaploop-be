import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export async function healthCheckRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (_request: FastifyRequest, _reply: FastifyReply) => {
    return { status: 'ok' };
  });
}

export default healthCheckRoutes;
