
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { id: 1, name: 'dummy1', cohort_id: 1 },
        { id: 2, name: 'dummy2', cohort_id: 1 },
        { id: 3, name: 'dummy3', cohort_id: 1 }
      ]);
    });
};
