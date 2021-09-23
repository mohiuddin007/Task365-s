const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const taskSchema = require("../Schemas/taskSchema");
const Task = new mongoose.model("Task", taskSchema);

function routes(app) {
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

router.get("/movie", (req, res) => {
    return app.render(req, res, "/movie", { 
        "id": "i made it!" 
    });
  });

return router;
}

module.exports = routes;
