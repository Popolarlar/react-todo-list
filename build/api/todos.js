"use strict";

var uuid = require("uuid");

var express = require("express");

var router = express.Router();

var Todo = require("../models/Todo"); // The route for getting a list of all todos


router.get("/", function (req, res) {
  Todo.find().then(function (todos) {
    return res.status(200).json(todos);
  })["catch"](function (err) {
    return res.status(400).json({
      error: err,
      message: "Error loading todos"
    });
  });
}); // The route for getting a list of all todos, but with a delay
// (to display the loading component better)

router.get("/delay", function (req, res) {
  setTimeout(function () {
    Todo.find().then(function (todos) {
      return res.status(200).json(todos);
    })["catch"](function (err) {
      return res.status(400).json({
        error: err,
        message: "Error loading todos"
      });
    });
  }, 2000);
}); // The route for creating new todo-list items

router.post("/", function (req, res) {
  var text = req.body.text;

  if (text) {
    var newTodo = new Todo({
      id: uuid(),
      createdAt: Date.now(),
      isCompleted: false,
      text: text
    });
    newTodo.save().then(function (newTodo) {
      res.status(200).json(newTodo);
    })["catch"](function (err) {
      return res.status(400).json({
        error: err,
        message: "Error creating todo"
      });
    });
  } else {
    res.status(400).json({
      message: "Text cannot be empty"
    });
  }
});
router.post("/:id/completed", function (req, res) {
  var id = req.params.id; // The Node.js driver documentation doesn't mention a returnNewDocument option for findOneAndUpdate() (which is an option for the MongoDB shell command with the same name). Instead, it mentions an option called returnOriginal, which defaults to true. Try using that option, setting it to false to return the updated document instead of the original.

  Todo.findOneAndUpdate({
    id: id
  }, {
    isCompleted: true
  }, {
    returnOriginal: false
  }).then(function (updatedTodo) {
    if (updatedTodo) {
      res.status(200).json(updatedTodo);
    } else {
      res.status(400).json({
        message: "There is no todo with that id"
      });
    }
  })["catch"](function (err) {
    res.status(400).json({
      error: err,
      message: "Error updating todo"
    });
  });
}); // The route for deleting a todo-list item

router["delete"]("/:id", function (req, res) {
  var id = req.params.id;
  Todo.findOneAndRemove({
    id: id
  }).then(function (removedTodo) {
    if (removedTodo) {
      res.status(200).json(removedTodo);
    } else {
      res.status(400).json({
        message: "There is no todo with that id"
      });
    }
  })["catch"](function (err) {
    return res.status(400).json({
      error: err,
      message: "Error deleting todo"
    });
  });
});
module.exports = router;
//# sourceMappingURL=todos.js.map