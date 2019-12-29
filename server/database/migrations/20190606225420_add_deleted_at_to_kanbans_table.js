exports.up = function(knex, Promise) {
  return knex.schema.table('kanbans', table => {
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('kanbans', table => {
    table.dropColumn('deleted_at');
  });
};
