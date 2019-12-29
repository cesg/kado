const Boom = require('@hapi/boom');
const Kanban = require('../models/Kanban');
const Size = require('../models/Size');
const Knex = require('../config/knex');

module.exports = async function(fastify, options) {
  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: {
            type: 'array',
            items: {
              $ref: 'sizes_stats#',
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { query } = request;
      const sizes = await Size.query();
      let stats = await Kanban.query()
        .where('step_id', 4)
        .groupBy('size_id')
        .orderBy('size_id')
        .select('size_id', Knex.raw('AVG(touch) as touch'), Knex.raw('AVG(lead) as lead'), Knex.raw('AVG(circle) as circle'));

      stats = stats.map(stat => {
        stat.size = sizes.find(({ id }) => stat.size_id == id);
        stat.touch = stat.touch.toFixed(2);
        stat.lead = stat.lead.toFixed(2);
        stat.circle = stat.circle.toFixed(2);

        return stat;
      });
      reply.send(stats);
    }
  );
};
