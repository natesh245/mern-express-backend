const express = require("express");

const bodyParser = require("body-parser");

require("dotenv").config();

const mongoose = require("mongoose");
const { Schema } = mongoose;

//create an express app
const app = express();

app.use(bodyParser.json());

//connect to mongodb
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b1lha.mongodb.net/<dbname>?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//creating schema
// const userSchema = new Schema({
//   name: String,
//   password: String,
//   email: String,
//   created: {
//     type: Date,
//     default: Date.now, // 3 hours from now
//   },
// });

const todoSchema = new Schema({
  title: String,
  description: String,

  created: {
    type: Date,
    default: Date.now, // 3 hours from now
  },
});

//create a model using schema
const todoModel = mongoose.model("todo", todoSchema);

//get all todos
app.get("/todos", async (req, res) => {
  const all = await todoModel.find({});
  // console.log(all);
  res.send(all);
});

//get a todos based on his id
app.get("/todos/:todoId", async (req, res) => {
  const all = await todoModel.find({ _id: req.params["todoId"] });
  // console.log(all);
  res.send(all);
});

//post a new todo
app.post("/todos", (req, res) => {
  console.dir(req.body);
  const postedtodo = req.body;

  //creating user document using todosModel
  const todo = new todoModel(postedtodo);

  todo.save(function (err) {
    if (err) {
      console.log(err);

      res.send(err);
    } else {
      res.json({
        message: req.body.title + " created successfully",
      });
    }
  });
});

//update a todo
app.patch("/todos/:todoId", async (req, res) => {
  await todoModel.updateOne(
    { _id: req.params["todoId"] },
    { $set: { ...req.body } }
  );

  res.send("update successful");
});

//Delete a todos
app.delete("/todos/:todoId", async (req, res) => {
  await todoModel.deleteOne({ _id: req.params["todoId"] });

  res.send("delete successful");
});

//use port 3000 to listen to icoming requests
app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000/todos`);
});