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
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}
// app.use(express.static(path.join(__dirname, "/../client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/../client/build/index.html"));
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
