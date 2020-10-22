const mongoose = require("mongoose");
const { Schema } = mongoose;

//connect to mongodb
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b1lha.mongodb.net/<dbname>?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var date = new Date();
var dateString = date.toDateString();

const todoSchema = new Schema({
  title: String,
  description: String,

  created: {
    type: String,
    default: dateString,
  },
});

//create a model using schema
const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;
