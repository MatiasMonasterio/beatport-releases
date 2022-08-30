import { check } from "express-validator";

import { validationErrorMessages } from "../../../../../core/constants";
import { checkValidation } from "../../../../../infra/http/middlewares";

export default {
  login: [
    check("email")
      .exists()
      .withMessage(validationErrorMessages.isRequired)
      .notEmpty()
      .withMessage(validationErrorMessages.notEmpty)
      .isEmail()
      .withMessage(validationErrorMessages.isEmail)
      .normalizeEmail(),
    check("password")
      .exists()
      .withMessage(validationErrorMessages.isRequired)
      .notEmpty()
      .withMessage(validationErrorMessages.notEmpty)
      .trim(),
    checkValidation,
  ],
  register: [
    check("email")
      .exists()
      .withMessage(validationErrorMessages.isRequired)
      .notEmpty()
      .withMessage(validationErrorMessages.notEmpty)
      .isEmail()
      .withMessage(validationErrorMessages.isEmail)
      .normalizeEmail(),
    check("password")
      .exists()
      .withMessage(validationErrorMessages.isRequired)
      .notEmpty()
      .withMessage(validationErrorMessages.notEmpty)
      .trim(),
    checkValidation,
  ],
};
