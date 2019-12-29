require('dotenv').config();

const inProduction = process.env.NODE_ENV === 'production';
const Boom = require('@hapi/boom');

const fastify = require('fastify')({
  logger: {
    level: inProduction ? 'error' : 'info',
  },
});

fastify.register(require('fastify-cookie'));
fastify.register(require('fastify-jwt'), {
  secret: 'secret',
});

fastify.decorate('authenticate', async function(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send(Boom.unauthorized());
  }
});

fastify.register(require('./config/schema'));
fastify.register(require('./routes/api'));

module.exports = fastify;
