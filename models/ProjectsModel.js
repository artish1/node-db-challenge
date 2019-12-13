const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
  getProjects,
  getResources,
  getTasks
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
