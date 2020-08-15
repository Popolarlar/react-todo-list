import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
require("./database");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// API
const todos = require("./api/todos");
app.use("/api/todos", todos);

// Static web app
app.use(express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
