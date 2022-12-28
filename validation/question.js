const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateQuestionInput(data) {
  console.log("dataaaaaaaaaaaaaaaaaaaa", data);
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.question = !isEmpty(data.question) ? data.question : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  // question checks
  if (Validator.isEmpty(data.question)) {
    errors.question = "Question field is required";
  }
  // category checks
  if (Validator.isEmpty(data.category)) {
    errors.category = "Category field is required";
  }

  // status checks
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
