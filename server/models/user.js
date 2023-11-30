const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024
    },
    status: {
        type: String,
        enum: ['Active', 'Blocked'],
        default: 'Active',
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        status: this.status,
        isAdmin: this.isAdmin
    }, process.env.JWTPRIVATEKEY);
    return token;
}

const User = mongoose.model('User', userSchema);
exports.User = User;