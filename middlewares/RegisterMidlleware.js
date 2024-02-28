// const express = require('express');
const Joi = require('joi');
const ValidateError = require('../errors/index')

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(29).required(),
  email: Joi.string().min(12).max(32).required().email(),
  password: Joi.string().min(8).max(27).required(),
});

exports.register = async (request, response, next) => {
  const { error } = registerSchema.validate(request.body);
  if (error) {
    // return response.status(400).json({ error: error.details[0]?.message });
    throw new ValidateError({
      message: error.details[0]?.message,
      statusCode: 400,
    });
  }
  next();
};
