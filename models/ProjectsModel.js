const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
  getProjects,
  getResources,
  getTasks,
  addProject,
  addResource,
  addTask,
  getProjectById
};

function getProjects() {
  return db("projects");
}

function getProjectById(id) {
  return db("projects")
    .select("*")
    .where("id", "=", id)
    .first();
}

function getResources() {
  return db("resources");
}

function getTasks() {
  return db("tasks as t")
    .select(
      "t.id",
      "t.description",
      "t.notes",
      "t.completed",
      "p.name as ProjectName",
      "p.description as ProjectDescription"
    )
    .join({ p: "projects" }, "t.project_id", "=", "p.id");
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

function addResourceToProject(resource_id, project_id) {
  return db("project_resources").insert({ project_id, resource_id });
}
