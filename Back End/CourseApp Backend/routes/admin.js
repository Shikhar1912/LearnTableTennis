const express = require("express");
const {jwtAuthorization, secret} = require("../authorization/auth");
const { Admin, Course } = require("../db/database");
const jwt = require('jsonwebtoken');
const router = express.Router();
router.post("/signup", async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  const alreadyExists = await Admin.findOne({ username });
  if (alreadyExists) {
    res.status(403).send("User already exists");
  } else {
    const newAdmin = new Admin({
      username,
      password,
    });
    await newAdmin.save();
    const token = jwt.sign({ username }, secret, { expiresIn: "1h" });
    res.send(`Bearer ${token}`);
  }
});

router.post("/login", async (req, res) => {
  // logic to log in admin
  const { username, password } = req.body;
  // console.log(username);
  const validUser = await Admin.findOne({ username, password });
  // console.log(validUser);
  if (validUser) {
    const token = jwt.sign({ username }, secret, { expiresIn: "1h" });
    res.json({ token: `Bearer ${token}` });
  } else {
    res.status(403).send("Wrong Credentials");
  }
});

router.post("/courses", jwtAuthorization, async (req, res) => {
  // logic to create a course
  // console.log(validUser);
  const { title, description, imageLink, price, published } = req.body;
  const obj = {
    title,
    description,
    imageLink,
    price,
    published,
    // courseId: Math.floor(Math.random() * 10000),
  };
  const newCourse = new Course(obj);
  await newCourse.save();
  const courses = await Course.find({});
  res.send(courses);
});

router.put("/courses/:courseId", jwtAuthorization, async (req, res) => {
  // logic to edit a course
  const ID = req.params.courseId;
  const { title, description, imageLink, price, published } = req.body;
  const course = await Course.findByIdAndUpdate(ID, req.body, { new: true });
  if (course) res.send(course);
  else res.status(404).send("No matching ID");
});

router.get("/courses", jwtAuthorization, async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.send(courses);
});

module.exports = router;
