const Joi = require('joi');
const ValidateError = require('../errors/index')

const registerSchema = Joi.object({
  email: Joi.string().min(12).max(32).required().email(),
  password: Joi.string().min(8).max(27).required(),
});

exports.login = async (request, response, next) => {
  const { error } = registerSchema.validate(request.body);
  if (error) {
    response.status(400).json({ error: error.details[0]?.message });
    throw new ValidateError({
      message: error.details[0]?.message,
      statusCode: 400,
    });
  }
  next();
};
