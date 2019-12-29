exports.up = function(knex, Promise) {
  return knex.schema.createTable('sizes', table => {
    table.increments('id');
    table.string('label', 10);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sizes');
};
