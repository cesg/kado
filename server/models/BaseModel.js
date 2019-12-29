const { Model } = require('objection');
Model.knex(require('../config/knex'));

module.exports = Model;
