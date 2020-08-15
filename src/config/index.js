const dbuser = "admin";
const dbpassword = "admin";

const MONGODB_URI = `mongodb+srv://${dbuser}:${dbpassword}@cluster0.kzau8.mongodb.net/todolist?retryWrites=true&w=majority`;

module.exports = MONGODB_URI;
