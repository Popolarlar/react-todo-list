"use strict";

require("dotenv").config();

var MONGODB_URI = "mongodb+srv://".concat(process.env.DB_USER, ":").concat(process.env.DB_PASS, "@cluster0.kzau8.mongodb.net/todolist?retryWrites=true&w=majority");
module.exports = MONGODB_URI;
//# sourceMappingURL=index.js.map