const Qs = require('qs');
const Boom = require('@hapi/boom');
const Axios = require('axios');
const User = require('../../models/User');
const AuthProvider = require('../../models/AuthProvider');

module.exports = async function(fastify, options) {
  fastify.get('/', {}, async (request, reply) => {
    const querystring = Qs.stringify({
      client_id: process.env.GITLAB_ID,
      redirect_uri: `${process.env.APP_URL}/api/auth/gitlab/callback`,
      response_type: 'code',
    });

    reply.redirect(`${process.env.GITLAB_URL}/oauth/authorize?${querystring}`);
  });

  fastify.get('/callback', {}, async (request, reply) => {
    const { query } = request;
    if (!query.code) {
      reply.send(Boom.badRequest());
    }

    let { data: token } = await Axios.post(`${process.env.GITLAB_URL}/oauth/token`, {
      client_id: process.env.GITLAB_ID,
      client_secret: process.env.GITLAB_SECRET,
      code: query.code,
      grant_type: 'authorization_code',
      redirect_uri: `${process.env.APP_URL}/api/auth/gitlab/callback`,
    });

    const querystring = Qs.stringify({
      access_token: token.access_token,
    });

    let { data: owner } = await Axios.get(`${process.env.GITLAB_URL}/api/v4/user?${querystring}`);
    let user = await User.query()
      .where('email', owner.email)
      .first();

    if (!user) {
      user = await User.query().insertAndFetch({
        email: owner.email,
        name: owner.name,
      });
    }

    let provider = await AuthProvider.query()
      .where({
        user_id: user.id,
        name: 'gitlab',
      })
      .first();

    if (!provider) {
      await AuthProvider.query().insert({
        user_id: user.id,
        name: 'gitlab',
        type: 'Bearer',
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        expires_in: token.expires_in,
      });
    }

    const jwt = fastify.jwt.sign({ id: user.id, email: user.email, name: user.name });
    reply
      .setCookie('access_token', jwt, {
        path: '/',
      })
      .redirect(process.env.APP_URL);
  });
};
