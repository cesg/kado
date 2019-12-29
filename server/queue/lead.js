const Queue = require('bee-queue');
const eachDay = require('date-fns/each_day');
const isWeekend = require('date-fns/is_weekend');

const Kanban = require('../models/Kanban');

const leadQueue = new Queue('lead', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

leadQueue.process(async job => {
  const kanban = await Kanban.query().findById(job.data.id);
  if (!kanban.backlog || !kanban.done) {
    return 0;
  }

  let lead = 1;
  eachDay(kanban.backlog, kanban.done).forEach(day => {
    if (!isWeekend(day)) {
      ++lead;
    }
  });

  await Kanban.query()
    .patch({ lead })
    .findById(job.data.id);

  return true;
});

module.exports = leadQueue;
