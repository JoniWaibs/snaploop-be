import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export default async function userRoutes(fastify: FastifyInstance) {
  const { authenticate } = fastify;
  fastify.get('/', { preHandler: [authenticate] }, async (req: FastifyRequest, reply: FastifyReply) => {
    req.log.info('User logger, data received from Google');
    reply.status(200).send({ user: req.user });
  });
}
