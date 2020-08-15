import uuid from "uuid";
const express = require("express");
const router = express.Router();
var fakeTodos = [
  {
    id: "ae06181d-92c2-4fed-a29d-fb53a6301eb9",
    text: "Learn about React Ecosystems",
    isCompleted: false,
    createdAt: new Date(),
  },
  {
    id: "cda9165d-c263-4ef6-af12-3f1271af5fb4",
    text: "Get together with friends",
    isCompleted: false,
    createdAt: new Date(Date.now() - 86400000 * 7),
  },
  {
    id: "2e538cc5-b734-4771-a109-dfcd204bb38b",
    text: "Buy groceries",
    isCompleted: true,
    createdAt: new Date(Date.now() - 86400000 * 14),
  },
];

const Todo = require("../models/Todo");

// router.get("/", (req, res) => {
//   User.find()
//     .then((users) => res.json(users))
//     .catch((err) => console.log(err));
// });

// router.post("/", (req, res) => {
//   const { name, email } = req.body;
//   const newUser = new User({
//     name: name,
//     email: email,
//   });
//   newUser
//     .save()
//     .then(() =>
//       res.json({
//         message: "Created account successfully",
//       })
//     )
//     .catch((err) =>
//       res.status(400).json({
//         error: err,
//         message: "Error creating account",
//       })
//     );
// });

router.get("/seed", (req, res) => {
  Todo.find()
    .then((todos) => res.json(todos))
    .catch((err) => console.log(err));
});

// The route for getting a list of all todos
router.get("/", (req, res) => {
  // res.status(200).json(fakeTodos);
  Todo.find()
    .then((todos) => res.json(todos))
    .catch((err) => console.log(err));
});

// The route for getting a list of all todos, but with a delay
// (to display the loading component better)
router.get("/delay", (req, res) => {
  setTimeout(() => {
    // res.status(200).json(fakeTodos);
    Todo.find()
      .then((todos) => res.json(todos))
      .catch((err) => console.log(err));
  }, 2000);
});

// The route for creating new todo-list items
router.post("/", (req, res) => {
  const { text } = req.body;
  // if (text) {
  // const insertedTodo = {
  //   id: uuid(),
  //   createdAt: Date.now(),
  //   isCompleted: false,
  //   text,
  // };
  //   fakeTodos.push(insertedTodo);
  //   res.status(200).json(insertedTodo);
  // } else {
  //   res
  //     .status(400)
  //     .json({ message: "Request body should have a text property" });
  // }

  const newTodo = new Todo({
    id: uuid(),
    createdAt: Date.now(),
    isCompleted: false,
    text,
  });

  newTodo
    .save()
    .then((newTodo) => {
      // res.json({
      //   message: "Created todo successfully",
      // })
      res.status(200).json(newTodo);
    })
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error creating todo",
      })
    );
  // }
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
