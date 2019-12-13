const express = require("express");

const server = express();
const port = 4000;
const projectsRouter = require("./routes/projectsRouter");

server.use(express.json());

server.use("/api", projectsRouter);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
