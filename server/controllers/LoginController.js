const User = require('../models/User');
const Bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');

module.exports = async function(fastify, options) {
  fastify.post(
    '/',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              token: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const user = await User.query()
        .where({ email })
        .first('id', 'email', 'password');
      if (!user) {
        reply.code(404).send(Boom.notFound());
      }

      if (!Bcrypt.compareSync(password, user.password)) {
        reply.code(422).send(Boom.badData());
      }

      const jwt = fastify.jwt.sign({ id: user.id, email: user.email });
      reply
        .setCookie('access_token', jwt, {
          path: '/',
        })
        .send({ token: jwt });
    }
  );
};
