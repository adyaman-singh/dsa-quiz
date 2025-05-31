const Executor = (handler) => async (req, res, next) => {
  try {
    const response = await handler(req, res);
    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
};

export default Executor;
