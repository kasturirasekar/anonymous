import Fastify, { FastifyInstance, FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export const buildApp = async (): Promise<FastifyInstance> => {
  const app = Fastify({
    logger: true,
  });

  // Centralized Error Handling
  app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    app.log.error(error);
    reply.status(error.statusCode || 500).send({
      error: error.name || 'Internal Server Error',
      message: error.message || 'An unexpected error occurred',
    });
  });

  app.get('/', async () => {
    return { message: 'Anonymous Learning API' };
  });

  app.get('/health', async () => {
    return { status: 'ok' };
  });

  return app;
};
