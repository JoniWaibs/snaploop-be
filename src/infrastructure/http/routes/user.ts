import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import { UserController } from '../controllers/user';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export default async function userRoutes(fastify: FastifyInstance) {
  const { authenticate } = fastify;
  const userController = new UserController();

  fastify.get('/', { preHandler: [authenticate] }, async (req: FastifyRequest, reply: FastifyReply) => {
    return userController.getUser(req, reply);
  });
}
