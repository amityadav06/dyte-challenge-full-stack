const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");
const ShortUrl = require("../model/shortUrl");

router.get("/", (req, res) => {
  res.send("Hello from the router home");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plzz fill filed" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "password is not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();
      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill the data" });
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (isMatch) {
        res.status(400).json({ error: "Invalid Credentials wrong password" });
      } else {
        res.json({ message: "user login successfully" });
      }
    } else {
      res
        .status(400)
        .json({ error: "Invalid Credentials user does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
});
router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
});

router.post("/shorturl", async (req, res, next) => {
  try {
    const { urls } = req.body;
    if (!urls) {
      return res.status(400).json({ error: "Please fill the url" });
    }
    const urlExists = await ShortUrl.findOne({ urls });
    if (urlExists) {
      res.send({
        short_url: `${req.headers.host}/${urlExists.shortId}`,
        long_url: urls,
      });
      return;
    }
    const shortUrl = new ShortUrl({ urls: urls, shortId: shortId.generate() });
    const result = await shortUrl.save();
    res.send({
      short_url: `${req.headers.host}/${result.shortId}`,
      long_url: urls,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:shortId", async (req, res, next) => {
  try {
    const { shortId, clicks } = req.params;
    const result = await ShortUrl.findOne({ shortId });
    if (!result) {
      throw new Error("Short url does not exist");
    }
    result.clicks++;
    result.save();
    res.redirect(result.urls);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
