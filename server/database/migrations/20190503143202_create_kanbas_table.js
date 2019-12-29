exports.up = function(knex, Promise) {
  return knex.schema.createTable('kanbans', table => {
    table.increments('id');
    table
      .integer('step_id')
      .unsigned()
      .index();
    table
      .integer('size_id')
      .unsigned()
      .index();
    table.integer('reporter_id').unsigned();
    table.string('name', 250);
    table.jsonb('body').nullable();
    table.float('lead').default(0);
    table.float('circle').default(0);
    table.float('touch').default(0);
    table.date('backlog').nullable();
    table.date('develop').nullable();
    table.date('feedback').nullable();
    table.date('done').nullable();
    table.timestamps(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('kanbans');
};
