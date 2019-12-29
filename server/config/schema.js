const fastifyPlugin = require('fastify-plugin');

async function schemas(fastify, options) {
  fastify.addSchema({
    $id: 'users',
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      email: { type: 'string' },
    },
  });

  fastify.addSchema({
    $id: 'sizes',
    type: ['object', 'null'],
    properties: {
      id: { type: 'number' },
      label: { type: 'string' },
    },
  });

  fastify.addSchema({
    $id: 'kanbans',
    type: 'object',
    properties: {
      id: { type: 'number' },
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
      body: { type: 'string' },
      size: {
        $ref: 'sizes#',
      },
      assigned: {
        type: ['null', 'object'],
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
        },
      },
    },
  });

  fastify.addSchema({
    $id: 'sizes_stats',
    type: 'object',
    properties: {
      size_id: { type: 'number' },
      touch: { type: 'number' },
      lead: { type: 'number' },
      circle: { type: 'number' },
      size: {
        $ref: 'sizes#',
      },
    },
  });
}

module.exports = fastifyPlugin(schemas);
