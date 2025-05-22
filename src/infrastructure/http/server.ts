import Fastify, { FastifyPluginAsync, FastifyInstance } from 'fastify';

import authRoutes from '@infrastructure/http/routes/Auth';
import healthCheckRoutes from '@infrastructure/http/routes/HealthCheck';
import userRoutes from '@infrastructure/http/routes/User';
import authPlugin from '@infrastructure/plugins/Auth';
import cors from '@infrastructure/plugins/Cors';
import prismaPlugin from '@infrastructure/plugins/Prisma';
import dotenv from 'dotenv';

import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastifyOauth2 from '@fastify/oauth2';

dotenv.config();

const appRoutes = [
  {
    prefix: '/api/health-check',
    route: healthCheckRoutes,
  },
  {
    prefix: '/api/auth',
    route: authRoutes,
  },
  {
    prefix: '/api/user',
    route: userRoutes,
  },
];

export class Server {
  constructor(private readonly app: FastifyInstance) {
    this.app = Fastify({
      logger: true,
    });

    this.app.register(prismaPlugin);

    this.app.register(fastifyCookie);
    this.app.register(fastifyJwt, {
      secret: process.env.JWT_SECRET || 'supersecret',
    });

    this.app.register(fastifyOauth2, {
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

    this.app.register(cors);
    this.app.register(authPlugin);

    appRoutes.forEach((route: { prefix: string; route: FastifyPluginAsync }) => {
      this.app.register(route.route, { prefix: route.prefix });
    });
  }

  public async run() {
    try {
      await this.app.listen({ port: 8080, host: '0.0.0.0' });
      this.app.log.info(`🚀 - Server listening at ${JSON.stringify(this.app.server.address())}`);
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  }
}
