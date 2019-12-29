exports.seed = function(knex, Promise) {
  return knex('sizes')
    .del()
    .then(function() {
      return knex('sizes').insert([
        { id: 1, label: 'XS' },
        { id: 2, label: 'S' },
        { id: 3, label: 'M' },
        { id: 4, label: 'L' },
        { id: 5, label: 'XL' },
      ]);
    });
};
