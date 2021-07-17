const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(cors());

dotenv.config({ path: `./config.env` });
require("./db/conn");
app.use(express.json());
const User = require("./model/userSchema");
app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;

app.get("/contact", (req, res) => {
  res.send("Hello in Contact MERN Stack");
});

app.get("/signin", (req, res) => {
  res.send("Hello in Sign In MERN Stack");
});

app.get("/signup", (req, res) => {
  res.send("Hello in Sign up   MERN Stack");
});

app.listen(PORT, () => {
  console.log(`listening from port ${PORT}`);
});
