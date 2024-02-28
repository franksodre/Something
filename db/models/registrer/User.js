const mongoose = require('mongoose');
const uuid = require('uuidv4')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 3,
        max: 29,
    },
    email: {
        type: String,
        required: true,
        min: 12,
        max: 32,
    },
    password:{
        type: String,
        required: true,
        min: 8,
        max: 27,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

// UserSchema.pre('save', function(next) {
//     this._id = uuid();
//     next();
// });

const User = new mongoose.model('User2', UserSchema)

module.exports = User;