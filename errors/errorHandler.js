// Middleware de tratamento de erros
exports.errorHandler = (err, req, res, next) => {
    if (err instanceof ValidateError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    next(err);
};