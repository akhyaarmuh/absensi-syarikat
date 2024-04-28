import Validators from '../validators/index.js';
import { createResponse } from '../utilities/joi.js';
import ErrorResponse from '../utilities/error-response.js';

export default (validator) => {
  return async (req, res, next) => {
    const { error } = Validators[validator].validate(req.body, { abortEarly: false });

    if (error)
      next(
        new ErrorResponse('Unprocessable Content', 422, createResponse(error.details))
      );

    next();
  };
};
