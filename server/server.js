'use strict';

const fastify = require('./fastify.js');

fastify.listen(8000, '127.0.0.1', function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
