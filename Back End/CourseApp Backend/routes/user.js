const express = require("express");
const {jwtAuthorization, secret} = require("../authorization/auth");
const { User,Course } = require("../db/database")
const jwt = require("jsonwebtoken");
const router = express.Router();
router.post("/signup", async (req, res) => {
    // logic to sign up user
    const { username, password } = req.body;
    const userExist = await User.findOne({ username });
    if (userExist) {
      res.status(403).send("User already exist");
    } else {
      const newUser = new User(req.body);
      await newUser.save();
      const token = jwt.sign({ username }, secret, { expiresIn: "1h" });
      res.send(token);
    }
  });
  
  router.post("/login", async (req, res) => {
    // logic to log in user
    const { username, password } = req.body;
    const userExist = await User.findOne({ username, password });
    if (userExist) {
      const token = jwt.sign({ username }, secret, { expiresIn: "1h" });
      res.send(token);
    } else res.status(404).send("wrong credentials");
  });
  
  router.get("/courses", jwtAuthorization, async (req, res) => {
    // logic to list all courses
    const courses = await Course.find({ published: true });
    res.send(courses);
  });
  
  router.post("/courses/:courseId", jwtAuthorization, async (req, res) => {
    // logic to purchase a course
    // const ID = Number(req.params.courseId);
    const course = await Course.findById(req.params.courseId);
    if (course) {
      const userExist = await User.findOne({ username: req.user.username });
      userExist.purchasedCourses.push(course);
      await userExist.save();
      res.send(userExist);
    } else res.send("Course not found");
  });
  
  router.get("/purchasedCourses", jwtAuthorization, async (req, res) => {
    // logic to view purchased courses
    const user = await User.findOne({ username: req.user.username }).populate(
      "purchasedCourses"
    );
    const coursesBought = user.purchasedCourses;
    res.send(coursesBought);
  });

  module.exports = router;