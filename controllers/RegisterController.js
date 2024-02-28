const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../db/models/registrer/User');

const timeInactivity = 3 * 24 * 60 * 60;

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY_TOKEN, {
        expiresIn: timeInactivity,
    })
}

exports.register = async (request,response) => {
    const { name,email,password } = request.body;

    const CheckUserExists = await User.findOne({email});
    if(CheckUserExists){
        return response.status(400).json({ messageError: `user \`${email}\` is already taken` });
    }

    const salt = await bcrypt.genSalt(10);
    const HashedPass = await bcrypt.hash(password,salt);

    const user = new User({
        name,
        email,
        password: HashedPass,
    })

    try {
        const UserSaved = await user.save();
        const token = generateToken(user._id);
        response.cookie('jwt', token,{
            httpOnly: true,
            maxAge: timeInactivity * 1000,
        })
        response.status(201).json({ User: UserSaved._id });
    } catch (e) {
        return response.status(400).json({ erro: e });
    }

}

exports.GET_register = async (request,response) => {
    response.render('register')
}


// login 
// const token = jwt.sign({ id: User._id }, process.env.SECRET_KEY_TOKEN, { expiresIn: '1h' }) 
// // alterar para ser possivel expirar apenas depois de logout
// response.status(201).json({ message: 'Usuário registrado com sucesso!', token });

// module.exports = Router;