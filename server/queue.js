require('dotenv').config();

const circleQueue = require('./queue/circle');
const leadQueue = require('./queue/lead');

circleQueue.on('failed', err => {
  console.error(err.options);
});

leadQueue.on('failed', err => {
  console.error(err.options);
});

const TIMEOUT = 30 * 1000;
process.on('uncaughtException', async () => {
  // Queue#close is idempotent - no need to guard against duplicate calls.
  try {
    await circleQueue.close(TIMEOUT);
    await leadQueue.close(TIMEOUT);
  } catch (err) {
    console.error('bee-queue failed to shut down gracefully', err);
  }
  process.exit(1);
});
