const mongoose = require("mongoose");
const connection =
  "mongodb+srv://admin:admin@cluster0.kzau8.mongodb.net/todolist?retryWrites=true&w=majority";

mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));
