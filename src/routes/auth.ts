import { FastifyInstance } from 'fastify';

import axios from 'axios';
import { User } from 'models/user';

import { OAuth2Namespace } from '@fastify/oauth2';

declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
  }
}

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/google/callback', async (request, reply) => {
    request.log.info('Logging user in Google');

    try {
      const { token } = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

      if (!token) {
        reply.status(401).send({ error: 'Unauthorized' });
      }

      const userInfo = await axios.get(process.env.GOOGLE_USER_INFO_URL!, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      if (!userInfo) {
        reply.status(404).send({ error: 'User info not found from Google' });
      }

      const user: User = userInfo.data;
      request.log.info('User info received from Google:', user.email);

      const jwt = fastify.jwt.sign({
        email: user.email,
        name: user.name,
        picture: user.picture,
      });

      reply
        .setCookie('token', jwt, {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
        })
        .redirect(`${process.env.FRONTEND_URL}/albums`);
    } catch (error) {
      request.log.error('Internal server error:', error);
      reply.status(500).send({ error: 'Internal server error' });
    }
  });
  fastify.get('/logout', async (req, reply) => {
    req.log.info('Closing session');
    reply.clearCookie('token', { path: '/' }).send({ message: 'Session closed' });
  });
}
