const express = require("express");
const router = express.Router();

require("dotenv").config();

const todoModel = require("./mongoose");

//get all todos
router.get("/", async (req, res) => {
  const all = await todoModel.find({});
  // console.log(all);
  res.send(all);
});

//get a todos based on his id
router.get("/:todoId", async (req, res) => {
  const all = await todoModel.find({ _id: req.params["todoId"] });
  // console.log(all);
  res.json(...all);
});

//post a new todo
router.post("/", (req, res) => {
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
router.patch("/:todoId", async (req, res) => {
  await todoModel.updateOne(
    { _id: req.params["todoId"] },
    { $set: { ...req.body } }
  );

  res.send("update successful");
});

//Delete a todos
router.delete("/:todoId", async (req, res) => {
  await todoModel.deleteOne({ _id: req.params["todoId"] });

  res.send("delete successful");
});

module.exports = router;
