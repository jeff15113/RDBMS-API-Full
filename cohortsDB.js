const db = require("./dbConfig.js");

module.exports = {
  get,
  getById,
  getStudents,
  insert,
  update,
  remove
};

function insert(cohort) {
  return db("cohorts")
    .insert(cohort)
    .then(ids => {
      return getById(ids[0]);
    });
}

function get() {
  return db("cohorts");
}

function getById(id) {
  return db("cohorts")
    .where({ id })
    .first();
}

function getStudents(id) {
  return db("cohorts")
    .join("students", "cohorts.id", "students.cohort_id")
    .select("students.name")
    .where("cohort_id", id);
}

function update(id, changes) {
  return db("cohorts")
    .where({ id })
    .update(changes);
}

function remove() {
  return db("cohorts")
    .where("id", id)
    .del();
}
