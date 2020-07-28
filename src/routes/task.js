const express = require("express");
const router = new express.Router();
const auth = require("./../middleware/auth");
const User = require("./../models/users");
const Task = require("./../models/task");

router.post("/", auth, async (req, res) => {
  let task = new Task({ ...req.body, owner: req.user._id });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.send(error);
  }
});

//GET /task?completed=true
//pagination
//limit= number of items
//skip= from where eg 0 then from 0
// GET /task?limit=10&skip=10
//GET  /task?sortBy=createdAt_asc | dsc anything i=work work as special char
router.get("/", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.complete) match.complete = req.query.complete === "true";
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "asc" ? 1 : -1;
  }
  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort: sort,
        },
      })
      .execPopulate();
    res.status(200).send(req.user.tasks);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", auth, async (req, res) => {
  let _id = req.params.id;
  try {
    let task = await Task.findOne({ _id, owner: req.user._id });
    if (task) res.status(200).send(task);
    else res.status(400).json({ message: "no data found" });
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:taskid", auth, async (req, res) => {
  let id = req.params.taskid;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "complete"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) res.status(400).send({ error: "Invalid operations" });
  else
    try {
      let task = await Task.findOne({ _id: id, owner: req.user._id });
      updates.forEach((update) => (task[update] = req.body[update]));
      task.save();
      if (!task) {
        res.status(404).send();
      }
      res.send(task);
    } catch (error) {
      res.status(400).send(error);
    }
});

router.delete("/:id", auth, async (req, res) => {
  let id = req.params.id;
  try {
    let task = await Task.findOneAndDelete({ _id: id, owner: req.user._id });
    if (task) res.status(200).send(task);
    else res.status(400).json({ message: "no data found" });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
