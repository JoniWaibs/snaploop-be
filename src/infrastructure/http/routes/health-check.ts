import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export async function healthCheckRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    request.log.info('Health check request received');

    reply.status(200).send({
      status: 'ok',
      message: 'Server is running',
    });
  });
}

export default healthCheckRoutes;
