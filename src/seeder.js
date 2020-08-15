var seeder = require("mongoose-seed");
const connection =
  "mongodb+srv://admin:admin@cluster0.kzau8.mongodb.net/todolist?retryWrites=true&w=majority";

// Connect to MongoDB via Mongoose
seeder.connect(connection, function () {
  // Load Mongoose models
  seeder.loadModels(["src/models/Todo.js"]);

  // Clear specified collections
  seeder.clearModels(["Todo"], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});

// Data array containing seed data - documents organized by Model
var data = [
  {
    model: "Todo",
    documents: [
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
    ],
  },
];

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
