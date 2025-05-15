import { FastifyInstance } from 'fastify';
import Fastify from 'fastify';

import cors from '@plugins/cors';
import healthCheckRoutes from '@routes/health-check';

describe('Server', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = Fastify({
      logger: false,
    });

    app.register(cors);
    app.register(healthCheckRoutes, { prefix: '/health-check' });

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register the cors plugin', () => {
    expect(app.hasPlugin('@fastify/cors')).toBeTruthy();
  });

  it('should register user routes with prefix', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health-check',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
  });

  it('should return 404 for non-existent routes', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/non-existent',
    });

    expect(response.statusCode).toBe(404);
  });
});
