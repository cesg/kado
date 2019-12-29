const Axios = require('axios');
const AuthProvider = require('../../models/AuthProvider');
const CompareAsc = require('date-fns/compare_asc');

module.exports = async function(fastify) {
  fastify.get(
    '/',
    {
      preValidation: [fastify.authenticate],
    },
    async (request, reply) => {
      const user = request.user;
      const gitlab = await AuthProvider.query()
        .where({
          name: 'gitlab',
          user_id: user.id,
        })
        .select('user_id', 'access_token')
        .first();
      const token = gitlab ? gitlab.access_token : null;

      let { data } = await Axios.get('https://gitlab.lirmi.com/api/v4/issues', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          state: 'opened',
          scope: 'assigned-to-me',
        },
      });

      data = data
        .filter(({ due_date }) => due_date)
        .sort((a, b) => {
          return CompareAsc(a.due_date, b.due_date);
        })
        .map(({ title, due_date, web_url }) => {
          return { title, due_date, web_url };
        });
      reply.send(data);
    }
  );
};
