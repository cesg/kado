const Boom = require('@hapi/boom');
const Kanban = require('../models/Kanban');
const circleQueue = require('../queue/circle');
const leadQueue = require('../queue/lead');
const Qs = require('qs');

function triggerQueue(kanban) {
  const jobCircle = circleQueue.createJob({ id: kanban.id });
  const jobLead = leadQueue.createJob({ id: kanban.id });
  jobCircle.save();
  jobLead.save();
}

module.exports = async function(fastify, options) {
  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: {
            type: 'array',
            items: 'kanbans#',
          },
        },
      },
    },
    async (request, reply) => {
      let query = Qs.parse(request.query);
      const eager = query.eager;
      delete query.eager;

      let kanbans = Kanban.query();
      Object.keys(query).forEach(key => {
        Array.isArray(query[key]) ? kanbans.whereIn(key, query[key]) : kanbans.where(key, query[key]);
      });

      kanbans = await kanbans.eager(eager);

      reply.send(kanbans);
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: {
          properties: {
            step_id: { type: 'number' },
            reporter_id: { type: 'number' },
            assigned_id: { type: 'number' },
            size_id: { type: 'number' },
            name: { type: 'string' },
            lead: { type: 'number' },
            circle: { type: 'number' },
            touch: { type: 'number' },
            backlog: { type: 'string' },
            develop: { type: 'string' },
            feedback: { type: 'string' },
            done: { type: 'string' },
            body: { type: ['string', 'object'] },
          },
        },
        response: {
          200: {
            $ref: 'kanbans#',
          },
        },
      },
    },
    async (req, reply) => {
      const { body } = req;
      ['backlog', 'develop', 'feedback', 'done'].forEach(key => {
        if (key in body) {
          body[key] = body[key] || null;
        }
      });
      const kanban = await Kanban.query().insertAndFetch(body);
      if (body.done) {
        triggerQueue(kanban);
      }

      reply.send(kanban);
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: {
          properties: {
            step_id: { type: 'number' },
            reporter_id: { type: 'number' },
            assigned_id: { type: 'number' },
            size_id: { type: 'number' },
            name: { type: 'string' },
            lead: { type: 'number' },
            circle: { type: 'number' },
            touch: { type: 'number' },
            backlog: { type: 'string' },
            develop: { type: 'string' },
            feedback: { type: 'string' },
            done: { type: 'string' },
            body: { type: ['string', 'object'] },
          },
        },
        response: {
          200: {
            type: 'number',
          },
        },
      },
    },
    async (req, reply) => {
      const { body, params } = req;
      const kanban = await Kanban.query().findById(params.id);
      if (!kanban) {
        reply.code(404).send(Boom.notFound());
      }
      ['backlog', 'develop', 'feedback', 'done'].forEach(key => {
        if (key in body) {
          body[key] = body[key] || null;
        }
      });
      const data = await Kanban.query()
        .findById(params.id)
        .patch(body);

      if (body.done) {
        triggerQueue(kanban);
      }

      reply.send(data);
    }
  );

  fastify.get(
    '/:id',
    {
      schema: {
        response: {
          200: {
            $ref: 'kanbans#',
          },
        },
      },
    },
    async (req, reply) => {
      const { params } = req;
      const kanban = await Kanban.query().findById(params.id);
      if (!kanban) {
        reply.code(404).send(Boom.notFound());
      }

      reply.send(kanban);
    }
  );

  fastify.delete(':id', {}, async (request, reply) => {
    const { params, query } = request;
    const data = await Kanban.query()
      .where('id', params.id)
      .update({
        deleted_at: new Date().getTime(),
      });
    reply.send(data);
  });
};
