export const ValidatorMiddleware = (validator) => (req, res, next) => {
  const data = { params: req.params, body: req.body, query: req.query };
  const valid = validator(data);

  if (valid) {
    next();
  } else {
    const errorMessage = validator.errors || "Validator Error";
    const error = { status: 400, message: errorMessage };
    next(error);
  }
};
