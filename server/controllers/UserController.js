const User = require('../models/User');

module.exports = async function(fastify, options) {
  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: {
            type: 'array',
            items: 'users#',
          },
        },
      },
    },
    async (request, reply) => {
      const { query } = request;
      let users = User.query();
      if (Object.keys(query).length > 0) {
        users = users.where(query);
      }

      users = await users;
      reply.send(users);
    }
  );
};
