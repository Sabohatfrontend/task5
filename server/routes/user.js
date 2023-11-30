const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', auth, async (req, res) => {
    const users = await User.find().select('-password');
    if (!users) {
        return res.status(400).json('No any users');
    }

    res.send(users);
});

router.post('/:id', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('This email already exist');
    }

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        status: req.body.status,
        isAdmin: req.body.isAdmin,
    });

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({
        user.name,
        user.email,
        user.status,
        user.isAdmin
    });
})

router.patch('/:id', auth, async (req, res) => {
    const user = await User.findOneAndUpdate({ _id: req.user._id }, { ...req.body });
    if (!user) {
        return res.status(400).json('No such user');
    }

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({
        user.name,
        user.email,
        user.status,
        user.isAdmin
    });
});

router.delete('/:id', auth, async (req, res) => {
    const user = await User.findByIdAndDelete({ _id: req.user._id });
    if (!user) {
        return res.status(400).send('No such user');
    }
    res.send(user);
})
