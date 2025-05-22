import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import { healthCheckRoutes } from '../HealthCheck';

describe('Health Check Routes', () => {
  let fastify: FastifyInstance;
  let mockRequest: FastifyRequest;
  let mockReply: FastifyReply;

  beforeEach(() => {
    fastify = {
      get: jest.fn((path, handler) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (fastify as any).handler = handler;
      }),
      handler: null,
    } as unknown as FastifyInstance;

    mockRequest = {
      log: {
        info: jest.fn(),
      },
    } as unknown as FastifyRequest;

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as FastifyReply;
  });

  it('should register the health check route', async () => {
    await healthCheckRoutes(fastify);
    expect(fastify.get).toHaveBeenCalledWith('/', expect.any(Function));
  });

  it('should return 200 status with correct message', async () => {
    await healthCheckRoutes(fastify);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (fastify as any).handler(mockRequest, mockReply);

    expect(mockRequest.log.info).toHaveBeenCalledWith('Health check request received');
    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      status: 'ok',
      message: 'Server is running',
    });
  });
});
