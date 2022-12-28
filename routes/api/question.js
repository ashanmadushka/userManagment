const express = require("express");
const router = express.Router();
// Load input validation
const validateQuestionInput = require("../../validation/question");
// Load Question model
const Question = require("../../models/Question");

// @route POST api/question/create
// @desc add question
// @access Public
router.post("/create", (req, res) => {
  // Form validation
  const { errors, isValid } = validateQuestionInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newQuestion = new Question({
    question: req.body.question,
    category: req.body.category,
    status: req.body.status,
  });

  newQuestion
    .save()
    .then((question) => res.json(question))
    .catch((err) => console.log(err));
});

// @route put api/question/update
// @desc update question
// @access Public
router.put("/update", (req, res) => {
  // Form validation
  const { errors, isValid } = validateQuestionInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Question.findOneAndUpdate({ _id: req.body._id }, req.body)
    .then(() => {
      res.json(req.body);
    })
    .catch((err) => console.log(err));
});

// @route delete api/question/delete
// @desc delete question
// @access Public
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Question.deleteOne({ _id: id })
    .then(() => {
      res.json(id);
    })
    .catch((err) => console.log(err));
});

// @route Get api/question/list
// @desc add question
// @access Public
router.get("/list", (req, res) => {
  let filter = {};
  if (req.query?.filter) {
    const value = req.query?.filter;
    filter = { question: { $regex: value } };
  }
  Question.find(filter)
    .then((Questions) => {
      res.json(Questions);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
