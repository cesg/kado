module.exports = async function(fastify, options) {
  fastify.get(
    '/',
    {
      preValidation: [fastify.authenticate],
      schema: {
        response: {
          200: {
            $ref: 'users#',
          },
        },
      },
    },
    async (request, reply) => {
      console.info(request.user);
      reply.send(request.user);
    }
  );
};
