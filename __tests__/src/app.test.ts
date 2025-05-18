import { FastifyInstance } from 'fastify';
import Fastify from 'fastify';

import cors from '@plugins/cors';
import healthCheckRoutes from '@routes/health-check';

import cookie from '@fastify/cookie';

describe('Server', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = Fastify({
      logger: false,
    });

    await app.register(cookie);
    app.register(cors);
    app.register(healthCheckRoutes, { prefix: '/health-check' });

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('should register the cors plugin', () => {
    expect(app.hasPlugin('@fastify/cors')).toBeTruthy();
    expect(app.hasPlugin('@fastify/cookie')).toBeTruthy();
  });
});
