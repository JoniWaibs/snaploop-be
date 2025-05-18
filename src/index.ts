import { buildApp } from './app';

const app = buildApp();

app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.extest(1);
  }
  console.log(`🚀 - Server listening at ${address}`);
});
