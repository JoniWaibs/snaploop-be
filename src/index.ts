import Fastify from 'fastify';

import cors from '@plugins/cors'
import userRoutes from '@routes/user'

const app = Fastify({
  logger: true,
});

app.register(cors);

app.register(userRoutes, { prefix: '/users' });

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 Server running at http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
