import Fastify, { FastifyPluginAsync } from 'fastify';

import authPlugin from '@plugins/auth';
import cors from '@plugins/cors';
import authRoutes from '@routes/auth';
import healthCheckRoutes from '@routes/health-check';
import userRoutes from '@routes/user';
import dotenv from 'dotenv';

import fastifyCookie from '@fastify/cookie';

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

export const buildApp = () => {
  const app = Fastify({
    logger: true,
  });

  app.register(cors);
  app.register(fastifyCookie);
  app.register(authPlugin);

  appRoutes.forEach((route: { prefix: string; route: FastifyPluginAsync }) => {
    app.register(route.route, { prefix: route.prefix });
  });

  return app;
};
