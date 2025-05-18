import { FastifyInstance } from 'fastify';
import Fastify from 'fastify';

import userRoutes from '@routes/user';

import cookie from '@fastify/cookie';

describe('User Routes', () => {
  let app: FastifyInstance;
  const mockUser = {
    email: 'test@example.com',
    name: 'Test User',
    picture: 'https://example.com/picture.jpg',
  };

  beforeEach(async () => {
    app = Fastify({
      logger: false,
    });

    const authenticate = jest.fn(async (request, _reply) => {
      request.user = mockUser;
    });

    await app.register(cookie);
    app.decorate('authenticate', authenticate);
    app.register(userRoutes, { prefix: '/api/user' });

    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  test('should return user data when authenticated', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/user/',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ user: mockUser });
  });

  test('should use the authenticate preHandler', async () => {
    await app.inject({
      method: 'GET',
      url: '/api/user/',
    });

    expect(app.authenticate).toHaveBeenCalled();
  });

  test('should log user information', async () => {
    const logSpy = jest.spyOn(app.log, 'info');

    await app.inject({
      method: 'GET',
      url: '/api/user/',
    });

    expect(logSpy).toHaveBeenCalledWith('User logger, data received from Google');
  });
});
