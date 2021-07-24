const express = require("express");
const mongoose = require("mongoose");
const taskHandler = require("./routeHandler/taskHandler");

const app = express();
app.use(express.json());

//database connection with mongoose
mongoose.connect("mongodb://localhost/crudPractice", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected successfully with mongodb")
})
.catch((err) => {
    console.log(err)
})


//application all routes is here
app.use('/task', taskHandler);


//default error handler
const errorHandler = (err, req, res, next) => {
    if(res.headersSent) {
        return next(err);
    }
    res.status(500).json({error: err});
}

app.listen(8000, () => {
    console.log(`Listening on port 8000`);
})
