const express = require("express");
const mongoose = require("mongoose");
const taskHandler = require("./routeHandler/taskHandler");
const nextHandler = require("./routeHandler/nextHandler");
const next = require("next");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production'
const nextServer = next({ dev })
const handle = nextServer.getRequestHandler()

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

nextServer
  .prepare()
  .then(() => {
    const app = express();
    app.use(express.json());

   //application all routes is here
   app.use('/task', taskHandler);
   app.use('/next', nextHandler(app));

   app.get("*", (req, res) => {
    return handle(req, res);
  });

    //default error handler
    const errorHandler = (err, req, res, next) => {
        if(res.headersSent) {
            return next(err);
        }
        res.status(500).json({error: err});
    }

    app.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
