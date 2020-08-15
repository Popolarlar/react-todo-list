require("dotenv").config();

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kzau8.mongodb.net/todolist?retryWrites=true&w=majority`;

module.exports = MONGODB_URI;
