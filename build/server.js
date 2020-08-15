"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("./database");

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use((0, _cors["default"])()); // API

var todos = require("./api/todos");

app.use("/api/todos", todos); // Static web app

app.use(_express["default"]["static"](_path["default"].join(__dirname, "/../client/build")));
app.get("*", function (req, res) {
  res.sendFile(_path["default"].join(__dirname + "/../client/build/index.html"));
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("Server started on port ".concat(port));
});
//# sourceMappingURL=server.js.map