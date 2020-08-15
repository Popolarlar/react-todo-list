"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var todoSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
}); // the model ("Todo") is exported with the schema and the collection ("todos").

module.exports = mongoose.model("Todo", todoSchema, "todos");
//# sourceMappingURL=Todo.js.map