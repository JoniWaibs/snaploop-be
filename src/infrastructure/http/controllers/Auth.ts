import { FastifyRequest, FastifyReply } from 'fastify';

import { CreateUserDTO } from '@application/dtos/UserDTO';
import { LoginUserFromGoogleUseCase } from '@application/use-cases/LoginUserFromGoogleUseCase';
import axios from 'axios';

import { OAuth2Namespace } from '@fastify/oauth2';

declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
  }
}

export class AuthController {
  constructor(private LoginUserFromGoogleUseCase: LoginUserFromGoogleUseCase) {}

  async googleCallback(request: FastifyRequest, reply: FastifyReply) {
    request.log.info('Logging user with Google');

    try {
      const { token } = await request.server.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

      if (!token) {
        reply.status(401).send({ error: 'Unauthorized' });
      }

      const googleUserInfo = await axios.get(process.env.GOOGLE_USER_INFO_URL!, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      if (!googleUserInfo) {
        reply.status(404).send({ error: 'User info not found from Google' });
      }

      const userDTO: CreateUserDTO = {
        email: googleUserInfo.data.email,
        name: googleUserInfo.data.name,
        picture: googleUserInfo.data.picture,
        googleId: googleUserInfo.data.id,
      };

      const user = await this.LoginUserFromGoogleUseCase.execute(userDTO);

      request.log.info(`User ${user.id} logged in by Google`);

      const jwt = request.server.jwt.sign({ user });

      reply.setCookie('token', jwt, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
      });
      return reply.redirect(`${process.env.FRONTEND_URL}/albums`, 302);
    } catch (error) {
      request.log.error('Google callback error', JSON.stringify(error));
      return reply.code(500).send({ error: 'Authentication failed' });
    }
  }

  async logout(request: FastifyRequest, reply: FastifyReply) {
    request.log.info('Closing session');
    reply.clearCookie('token', { path: '/' });
    return reply.send({ message: 'Session closed' });
  }
}
