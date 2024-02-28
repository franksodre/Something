const Router = require('express').Router()
const RegisterMiddleware = require('../middlewares/RegisterMidlleware');
const RegisterController = require('../controllers/RegisterController');
const LoginController = require('../controllers/LoginController');

const { errorHandler } = require('../errors/errorHandler')

// Rota de registro
Router.post('/register',RegisterMiddleware.register, RegisterController.register);
Router.get('/register',RegisterController.GET_register);

// Rota de login
Router.post('/login',LoginController.login);
Router.get('/login',LoginController.GET_login);

module.exports = Router;
