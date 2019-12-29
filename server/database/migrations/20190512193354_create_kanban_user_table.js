exports.up = function(knex, Promise) {
  return knex.schema.createTable('kanban_user', table => {
    table.integer('kanban_id').unsigned();
    table.integer('user_id').unsigned();

    table.primary(['kanban_id', 'user_id']);
    table.index(['kanban_id', 'user_id']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('kanban_user');
};
