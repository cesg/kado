exports.up = function(knex, Promise) {
  return knex.schema.table('kanbans', table => {
    table
      .integer('assigned_id')
      .unsigned()
      .index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('kanbans', table => {
    table.dropColumn('assigned_id');
  });
};
