import { param } from "express-validator";

import errorMessages from "../../config/validation-error-messages";
import { checkValidation } from "../middleware";

export default {
  idParam: [
    param("id")
      .exists()
      .withMessage(errorMessages.isRequired)
      .notEmpty()
      .withMessage(errorMessages.notEmpty)
      .isNumeric()
      .withMessage(errorMessages.isNumeric)
      .toInt(),
    checkValidation,
  ],
};
