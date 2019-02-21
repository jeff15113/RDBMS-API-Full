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

function getByID(id) {
  return db("cohorts")
    .where({ id })
    .first();
}

function get(id) {
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
