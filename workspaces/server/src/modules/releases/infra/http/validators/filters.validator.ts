import { query } from "express-validator";

import { validationErrorMessages } from "../../../../../core/constants";
import { checkValidation } from "../../../../../infra/http/middlewares";

export default {
  queryParams: [
    query("length")
      .optional()
      .notEmpty()
      .withMessage(validationErrorMessages.notEmpty)
      .isNumeric()
      .withMessage(validationErrorMessages.isNumeric)
      .toInt(),
    query("order")
      .optional()
      .notEmpty()
      .withMessage(validationErrorMessages.notEmpty)
      .isString()
      .withMessage(validationErrorMessages.isString)
      .trim()
      .toLowerCase()
      .custom((order) => {
        if (!["desc", "asc"].includes(order)) throw new Error("not valid");
        return true;
      }),
    checkValidation,
  ],
};
