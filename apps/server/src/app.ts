import Fastify, { FastifyInstance } from 'fastify';

export const buildApp = async (): Promise<FastifyInstance> => {
  const app = Fastify({
    logger: true,
  });

  app.get('/', async () => {
    return { message: 'Anonymous Learning API' };
  });

  return app;
};
