import { check } from "express-validator";

import errorMessages from "../../config/validation-error-messages";
import { checkValidation } from "../middleware";

export default {
  credentials: [
    check("email")
      .exists()
      .withMessage(errorMessages.isRequired)
      .notEmpty()
      .withMessage(errorMessages.notEmpty)
      .isEmail()
      .withMessage(errorMessages.isEmail)
      .normalizeEmail(),
    check("password")
      .exists()
      .withMessage(errorMessages.isRequired)
      .notEmpty()
      .withMessage(errorMessages.notEmpty)
      .trim(),
    checkValidation,
  ],
};
