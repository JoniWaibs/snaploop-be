import { FastifyPluginAsync } from 'fastify';

const userRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async () => {
    return { users: ['Alice', 'Bob', 'Charlie'] };
  });
};

export default userRoutes;
