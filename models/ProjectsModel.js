const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
  getProjects,
  getResources,
  getTasks,
  addProject,
  addResource,
  addTask
};

function getProjects() {
  return db("projects");
}

function getResources() {
  return db("resources");
}

function getTasks() {
  return db("tasks");
}

function addProject(project) {
  return db("projects").insert(project, "id");
}

function addResource(resource) {
  return db("resources").insert(resource, "id");
}

function addTask(task) {
  return db("tasks").insert(task, "id");
}
