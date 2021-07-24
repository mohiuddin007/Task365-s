const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const taskSchema = require("../Schemas/taskSchema");
const Task = new mongoose.model("Task", taskSchema);

// get all task
router.get("/", async (req, res) => {
  await Task.find({})
    .select({
      date: 0,
    })
    .exec((err, data) => {
      if (err) {
        res.status(500).json({ error: "Server side issue" });
      } else {
        res.status(200).json({
          result: data,
          message: "success",
        });
      }
    });
});

// get a task by id
router.get("/:id", async (req, res) => {
  await Task.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Server side issue" });
    } else {
      res.status(200).json({
        result: data,
        message: "success",
      });
    }
  });
});

// post a task
router.post("/", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save((err) => {
    if (err) {
      res.status(500).json({
        error: "Server error!",
      });
    } else {
      res.status(200).json({
        message: "Task saved successfully",
      });
    }
  });
});

// post multiple task
router.post("/multiple", async (req, res) => {
  await Task.insertMany(req.body, (err) => {
    if (err) {
      res.status(200).json({
        error: "Server side problem",
      });
    } else {
      res.status(200).json({
        message: "Multiple Tasks saved successfully",
      });
    }
  });
});

//put a task by id
router.put("/:id", async (req, res) => {
  const result = await Task.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "done",
      },
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        res.status(200).json({
          error: "Server side problem",
        });
      } else {
        res.status(200).json({
          message: "Task was updated successfully",
        });
      }
    }
  );
  console.log(result);
});

// delete a task
router.delete("/:id", async (req, res) => {
  await Task.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server error",
      });
    } else {
      res.status(200).json({
        message: "Task was deleted successfully",
      });
    }
  });
});

//delete multiple tasks
// router.deleteMany("/deleteMany/:id", async (req, res) => {

// })

module.exports = router;
