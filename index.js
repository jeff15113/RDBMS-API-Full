const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());

const db = require("./cohortsDB");

server.post("/api/cohorts", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      errorMessage: "cohort must have a name."
    });
    return;
  }
  db.insert({
    name
  })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the cohort to the database"
      });
      return;
    });
});

server.get("/api/cohorts", (req, res) => {
  db.get()
    .then(cohorts => {
      res.json({ cohorts });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "cohort list could not be retrieved."
      });
      return;
    });
});

server.get("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(cohort => {
      if (cohort.length === 0) {
        res.status(404).json({
          message: "That cohort does not exist."
        });
        return;
      }
      res.json({ cohort });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "cohort could not be retrived"
      });
      return;
    });
});

server.get("/api/cohorts/:id/students", (req, res) => {
  const { id } = req.params;
  db.getStudents(id)
    .then(cohort => {
      if (cohort.length === 0) {
        res.status(404).json({
          message: "That cohort does not exist or has no students."
        });
        return;
      }
      res.json({ cohort });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "cohort could not be retrived"
      });
      return;
    });
});

server.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(response => {
      if (response === 0) {
        res.status(404).json({
          message: "The cohort with the specified ID does not exist."
        });
        return;
      }
      res.json({ success: `cohort ${id} removed.` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The cohort could not be removed"
      });
      return;
    });
});

server.put("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      errorMessage: "Name is required to modify cohort name"
    });
    return;
  }
  db.update(id, { name })
    .then(response => {
      if (response == 0) {
        res.status(404).json({
          message: "The cohort with the specified ID does not exist."
        });
        return;
      }
      db.getById(id)
        .then(cohort => {
          if (cohort.length === 0) {
            res.status(404).json({
              errorMessage: "The cohort with the specified ID does not exist."
            });
            return;
          }
          res.json(cohort);
        })
        .catch(error => {
          console.log(error);
          res
            .status(500)
            .jason({ error: "The cohort information could not be modified." });
        });
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The cohort information could not be modified." });
      return;
    });
});

const port = 4000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
