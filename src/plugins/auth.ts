import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import { User } from 'models/user';

import fastifyJwt from '@fastify/jwt';
import fastifyOauth2 from '@fastify/oauth2';

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!,
    cookie: {
      cookieName: 'token',
      signed: false,
    },
  });

  fastify.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify<User>();
        request.log.info('JWT Verified');
      } catch (err) {
        request.log.error('JWT Verification failed:', err);
        reply.status(401).send({ error: 'Unauthorized' });
      }
    }
  );

  fastify.register(fastifyOauth2, {
    name: 'googleOAuth2',
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID!,
        secret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/api/auth/google',
    callbackUri: process.env.GOOGLE_CALLBACK_URL!,
    scope: ['profile', 'email'],
  });
});
