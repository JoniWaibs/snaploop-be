import Fastify from 'fastify';

import { Server } from '@infrastructure/http/Server';

(() => {
  main();
})();

async function main() {
  const fastify = Fastify({
    logger: true,
  });
  new Server(fastify).run();
}
