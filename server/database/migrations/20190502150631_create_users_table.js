exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('email', 225);
    table.string('name', 260);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
