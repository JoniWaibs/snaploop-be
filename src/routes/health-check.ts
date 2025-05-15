import { FastifyPluginAsync } from 'fastify';

const healthCheckRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async () => {
    return { status: 'ok' };
  });
};

export default healthCheckRoutes;
