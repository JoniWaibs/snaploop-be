import { FastifyInstance } from 'fastify';
import Fastify from 'fastify';

import healthCheckRoutes from '@routes/health-check';

import cookie from '@fastify/cookie';

describe('Health Check Routes', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = Fastify({
      logger: false,
    });

    await app.register(cookie);
    app.register(healthCheckRoutes, { prefix: '/health-check' });

    await app.ready();
  });

  test('should return a 200 status', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health-check/',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok', message: 'Server is running' });
  });

  test('should log user information', async () => {
    const logSpy = jest.spyOn(app.log, 'info');

    await app.inject({
      method: 'GET',
      url: '/health-check/',
    });

    expect(logSpy).toHaveBeenCalledWith('Health check request received');
  });
});
