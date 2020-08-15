"use strict";

var mongoose = require("mongoose");

var URI = require("./config/index");

mongoose.connect(process.env.MONGODB_URI || URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(function () {
  return console.log("Database Connected Successfully");
})["catch"](function (err) {
  return console.log(err);
});
//# sourceMappingURL=database.js.map