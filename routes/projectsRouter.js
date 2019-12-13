const express = require("express");
const Projects = require("../models/ProjectsModel");
const router = express.Router();

function transformCompletedToBoolean(array) {
  const edited = array.map(obj => {
    obj.completed = obj.completed ? true : false;
    return obj;
  });

  return edited;
}

router.get("/projects", async (req, res) => {
  Projects.getProjects()
    .then(projects => {
      const editedProjects = transformCompletedToBoolean(projects);
      res.status(200).json(editedProjects);
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
      const editedTasks = transformCompletedToBoolean(tasks);
      res.status(200).json(editedTasks);
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

//Posts

router.post("/projects", (req, res) => {
  const body = req.body;
  if (!body.name) {
    res.status(400).json({ error: "name field is required" });
  } else {
    Projects.addProject(body)
      .then(obj => {
        res.status(201).json(obj);
      })
      .catch(err => {
        console.log("error adding project", err);
        res.status(500).json({ error: "server error, could not add project" });
      });
  }
});

router.post("/tasks", (req, res) => {
  const body = req.body;
  if (!body.description || !body.project_id) {
    res
      .status(400)
      .json({ error: "description field and project_id are required fields" });
  } else {
    Projects.addTask(body)
      .then(obj => {
        res.status(201).json(obj);
      })
      .catch(err => {
        console.log("error, could not add task", err);
        res.status(500).json({ error: "Could not add task" });
      });
  }
});

module.exports = router;
