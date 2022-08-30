import { check, param } from "express-validator";

import { validationErrorMessages } from "../../../../../core/constants";
import { checkValidation } from "../../../../../infra/http/middlewares";

export default {
  idParam: [
    param("id")
      .exists()
      .withMessage(validationErrorMessages.isRequired)
      .notEmpty()
      .withMessage(validationErrorMessages.notEmpty)
      .isNumeric()
      .withMessage(validationErrorMessages.isNumeric)
      .toInt(),
    checkValidation,
  ],
  create: [
    check("id")
      .exists()
      .withMessage(validationErrorMessages.isRequired)
      .notEmpty()
      .withMessage(validationErrorMessages.notEmpty)
      .isNumeric()
      .withMessage(validationErrorMessages.isNumeric)
      .toInt(),
    checkValidation,
  ],
};
