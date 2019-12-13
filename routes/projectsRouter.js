const express = require("express");
const Projects = require("../models/ProjectsModel");
const router = express.Router();

router.get("/projects", async (req, res) => {
  Projects.getProjects()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log("Error could not get projects", err);
      res
        .status(500)
        .json({ error: "Server error, could not retrieve projects" });
    });
});

router.get("/tasks", (req, res) => {
  Projects.getTasks()
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(err => {
      console.log("Error getting tasks", err);
      res.status(500).json({ error: "Server error, could not get tasks" });
    });
});

router.get("/resources", (req, res) => {
  Projects.getResources()
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(err => {
      console.log("Error getting resources", err);
      res.status(500).json({ error: "Server error, could not get resources" });
    });
});

module.exports = router;
