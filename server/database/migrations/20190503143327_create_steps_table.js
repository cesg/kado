exports.up = function(knex, Promise) {
  return knex.schema.createTable('steps', table => {
    table.increments('id');
    table.string('name', 240);
    table.string('code', 240);
    table
      .integer('next_id')
      .unsigned()
      .nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('steps');
};
