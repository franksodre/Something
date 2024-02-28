const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../db/models/registrer/User');

exports.login = async (request,response) => {
    const { email, password } = request.body;

    const user = await User.findOne({email:email});
    if(!user){
        return response.status(400).json({ messageError: 'user doesn\'t exists' });
    }

    const checkPass = await bcrypt.compare(password,user.password)
    if(!checkPass){
        return response.status(400).json({ messageError: 'incorrect password' })
    }

    response.status(200).json({ success: 'user logged' })
}

exports.GET_login = async (request,response) => {
    response.render('login')
}
