exports.up = function(knex, Promise) {
  return knex.schema.createTable('auth_providers', table => {
    table.increments('id');
    table.string('name');
    table.string('type');
    table
      .integer('user_id')
      .unsigned()
      .index();
    table.string('access_token');
    table.string('refresh_token').nullable();
    table.integer('expires_in').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('auth_providers');
};
