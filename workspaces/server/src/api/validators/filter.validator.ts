import { query } from "express-validator";

import errorMessages from "../../config/validation-error-messages";
import { checkValidation } from "../middleware";

export default {
  queryParams: [
    query("length")
      .optional()
      .notEmpty()
      .withMessage(errorMessages.notEmpty)
      .isNumeric()
      .withMessage(errorMessages.isNumeric)
      .toInt(),
    query("order")
      .optional()
      .notEmpty()
      .withMessage(errorMessages.notEmpty)
      .isString()
      .withMessage(errorMessages.isString)
      .trim()
      .toLowerCase()
      .custom((order) => {
        if (!["desc", "asc"].includes(order)) throw new Error("not valid");
        return true;
      }),
    checkValidation,
  ],
};
