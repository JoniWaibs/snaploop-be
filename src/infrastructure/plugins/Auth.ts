import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import { UserResponseDTO } from '@application/dtos/UserDTO';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export default fp(async (fastify: FastifyInstance) => {
  fastify.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      if (request.cookies && request.cookies.token) {
        const token = request.cookies.token;
        const decoded: { user: UserResponseDTO } = fastify.jwt.verify(token);
        request.user = decoded.user;

        return;
      }

      await request.jwtVerify();
    } catch (err) {
      request.log.error(`No Authorization was found in request.headers or cookies: ${err}`);
      reply.status(401).send({ error: 'Unauthorized' });
    }
  });
});
