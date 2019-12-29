const Qs = require('qs');
const Boom = require('@hapi/boom');
const Axios = require('axios');
const User = require('../../models/User');
const AuthProvider = require('../../models/AuthProvider');

module.exports = async function(fastify, options) {
  fastify.get('/', {}, async (req, reply) => {
    const querystring = Qs.stringify({
      type: 'web_server',
      client_id: process.env.BASECAMP_ID,
      redirect_uri: `${process.env.APP_URL}/api/auth/basecamp/callback`,
    });
    reply.redirect(`https://launchpad.37signals.com/authorization/new?${querystring}`);
  });

  fastify.get('/callback', {}, async (request, reply) => {
    const { query } = request;
    if (!query.code) {
      reply.send(Boom.badRequest());
    }

    const { data } = await Axios.post('https://launchpad.37signals.com/authorization/token', {
      type: 'web_server',
      client_id: process.env.BASECAMP_ID,
      redirect_uri: `${process.env.APP_URL}/api/auth/basecamp/callback`,
      client_secret: process.env.BASECAMP_SECRET,
      code: query.code,
    });

    const token = data.access_token;
    const { data: owner } = await Axios.get('https://launchpad.37signals.com/authorization.json', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let user = await User.query()
      .where('email', owner.identity.email_address)
      .first();

    if (!user) {
      user = await User.query().insertAndFetch({
        email: owner.identity.email_address,
        name: `${owner.identity.first_name} ${owner.identity.last_name}`,
      });
    }

    let provider = await AuthProvider.query()
      .where({
        user_id: user.id,
        name: 'basecamp',
      })
      .first();

    if (!provider) {
      await AuthProvider.query().insert({
        user_id: user.id,
        name: 'basecamp',
        type: 'web_server',
        access_token: token,
        refresh_token: null,
        expires_in: null,
      });
    }

    const jwt = fastify.jwt.sign({ id: user.id, email: user.email });
    reply
      .setCookie('access_token', jwt, {
        path: '/',
      })
      .redirect(process.env.APP_URL);
  });
};
