exports.up = function(knex, Promise) {
  return knex.schema.createTable('sizes_stats', table => {
    table.increments('id');
    table
      .integer('size_id')
      .unsigned()
      .unique();
    table.float('touch').default(0);
    table.float('lead').default(0);
    table.float('circle').default(0);
    table.timestamps(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sizes_stats');
};
