async function routes(fastify, options) {
  fastify.register(require('../controllers/LoginController'), { prefix: 'login' });
  fastify.register(require('../controllers/KanbanController'), { prefix: 'kanbans' });
  fastify.register(require('../controllers/UserController'), { prefix: 'users' });
  fastify.register(require('../controllers/SizeStatController'), { prefix: 'sizes-stats' });
  fastify.register(require('../controllers/auth/GitlabLoginController'), { prefix: 'auth/gitlab' });
  fastify.register(require('../controllers/auth/BasecampLoginController'), { prefix: 'auth/basecamp' });
  fastify.register(require('../controllers/auth/MeController'), { prefix: 'auth/me' });
  fastify.register(require('../controllers/gitlab/IssueController'), { prefix: 'gitlab/issues' });
}

module.exports = routes;
