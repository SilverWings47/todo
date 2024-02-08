require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require("./controllers/db");

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.redirect("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.use('/profile', require('./routes/profileRoute'));
app.use("/createAccount", require("./routes/registerRoute"));
app.use("/auth", require("./routes/loginRoute"));
app.use("/newTask", require("./routes/newTaskRoute"));
app.use("/deleteTask", require("./routes/deleteTaskRoute"));
app.use("/load-tasks", require("./routes/loadTasksRoute"));
app.use("/logout", require("./routes/logoutRoute"));

app.listen(3000);