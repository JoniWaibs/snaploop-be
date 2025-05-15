import Fastify, { FastifyPluginAsync } from 'fastify';

import cors from '@plugins/cors';
import healthCheckRoutes from '@routes/health-check';

const appRoutes = [
  {
    prefix: '/health-check',
    route: healthCheckRoutes,
  },
];

export const buildApp = () => {
  const app = Fastify({
    logger: true,
  });

  app.register(cors);

  appRoutes.forEach((route: { prefix: string; route: FastifyPluginAsync }) => {
    app.register(route.route, { prefix: route.prefix });
  });

  return app;
};
