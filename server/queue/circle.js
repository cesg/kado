const Queue = require('bee-queue');
const eachDay = require('date-fns/each_day');
const isWeekend = require('date-fns/is_weekend');

const Kanban = require('../models/Kanban');

const circleQueue = new Queue('circle', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

circleQueue.process(async job => {
  const kanban = await Kanban.query().findById(job.data.id);
  if (!kanban.develop || !kanban.feedback) {
    return 0;
  }

  let circle = 1;
  eachDay(kanban.develop, kanban.feedback).forEach(day => {
    if (!isWeekend(day)) {
      ++circle;
    }
  });

  await Kanban.query()
    .patch({ circle })
    .findById(job.data.id);

  return true;
});

module.exports = circleQueue;
