import ErrorResponse from '../utilities/error-response.js';

export default (roles = []) => {
  return async function (req, res, next) {
    const { role } = req.user;

    if (!roles.includes(role)) {
      return next(new ErrorResponse(`Access denied.`, 403));
    }

    next();
  };
};
