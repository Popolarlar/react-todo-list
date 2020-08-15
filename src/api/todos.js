const uuid = require("uuid");
const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// The route for getting a list of all todos
router.get("/", (req, res) => {
  Todo.find()
    .then((todos) => res.status(200).json(todos))
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error loading todos",
      })
    );
});

// The route for getting a list of all todos, but with a delay
// (to display the loading component better)
router.get("/delay", (req, res) => {
  setTimeout(() => {
    Todo.find()
      .then((todos) => res.status(200).json(todos))
      .catch((err) =>
        res.status(400).json({
          error: err,
          message: "Error loading todos",
        })
      );
  }, 2000);
});

// The route for creating new todo-list items
router.post("/", (req, res) => {
  const { text } = req.body;
  if (text) {
    const newTodo = new Todo({
      id: uuid(),
      createdAt: Date.now(),
      isCompleted: false,
      text,
    });

    newTodo
      .save()
      .then((newTodo) => {
        res.status(200).json(newTodo);
      })
      .catch((err) =>
        res.status(400).json({
          error: err,
          message: "Error creating todo",
        })
      );
  } else {
    res.status(400).json({ message: "Text cannot be empty" });
  }
});

router.post("/:id/completed", (req, res) => {
  const { id } = req.params;

  // The Node.js driver documentation doesn't mention a returnNewDocument option for findOneAndUpdate() (which is an option for the MongoDB shell command with the same name). Instead, it mentions an option called returnOriginal, which defaults to true. Try using that option, setting it to false to return the updated document instead of the original.
  Todo.findOneAndUpdate(
    { id: id },
    { isCompleted: true },
    { returnOriginal: false }
  )
    .then((updatedTodo) => {
      if (updatedTodo) {
        res.status(200).json(updatedTodo);
      } else {
        res.status(400).json({ message: "There is no todo with that id" });
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
        message: "Error updating todo",
      });
    });
});

// The route for deleting a todo-list item
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Todo.findOneAndRemove({ id: id })
    .then((removedTodo) => {
      if (removedTodo) {
        res.status(200).json(removedTodo);
      } else {
        res.status(400).json({ message: "There is no todo with that id" });
      }
    })
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error deleting todo",
      })
    );
});

module.exports = router;
