import { FastifyReply, FastifyRequest } from 'fastify';

export class UserController {
  constructor() {}

  async getUser(request: FastifyRequest, reply: FastifyReply) {
    request.log.info('User logger, data received from Google');
    reply.status(200).send({ user: request.user });
  }
}
