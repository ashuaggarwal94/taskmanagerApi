const express = require("express");
require("./db/mongoose");
const app = express();
const port = process.env.PORT;
const taskRoute = require("./routes/task");
const userRoute = require("./routes/user");

const multer = require("multer");
const upload = multer({
  dest: "images",
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("File must be of doc type")); //Error
    }
    cb(undefined, true); //no error
    // cb(undefined, false); //wi;; reject the file upload
  },
});

app.post(
  "/upload",
  upload.single("upload"),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.use(express.json());
app.use("/task", taskRoute);
app.use("/users", userRoute);

app.listen(port, () => {
  console.log("Server started at port " + port);
});

// const Task = require("./models/task");
// const User = require("./models/users");
// const main = async () => {
//   // const task = await Task.findById("5f15f202c9d46619b423f128");
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);

//   const user = await User.findById("5f15f1dcc9d46619b423f125");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };
// main();
