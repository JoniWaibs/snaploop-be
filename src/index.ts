import Fastify from 'fastify';

import { Server } from 'infrastructure/http/server';

(() => {
  main();
})();

async function main() {
  const fastify = Fastify({
    logger: true,
  });
  new Server(fastify).run();
}
