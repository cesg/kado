exports.seed = function(knex, Promise) {
  return knex('steps')
    .del()
    .then(function() {
      return knex('steps').insert([
        { id: 1, name: 'Backlog', code: 'backlog', next_id: 2 },
        { id: 2, name: 'Develop', code: 'develop', next_id: 3 },
        { id: 3, name: 'Feedback', code: 'feedback', next_id: 4 },
        { id: 4, name: 'Done', code: 'done', next_id: null },
      ]);
    });
};
