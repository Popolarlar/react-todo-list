const mongoose = require("mongoose");
const URI = require("./config/index");

mongoose
  .connect(process.env.MONGODB_URI || URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));
