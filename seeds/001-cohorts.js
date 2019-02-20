
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { id: 1, name: 'Web15' },
        { id: 2, name: 'Web16' },
        { id: 3, name: 'PT4' }
      ]);
    });
};
