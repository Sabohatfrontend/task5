const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.patch('/:id', [auth, admin], async (req, res) => {
    const user = await User.findOneAndUpdate({ _id: req.user._id }, { ...req.body });
    if (!user) {
        return res.status(400).json('No such user');
    }

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({
        name: user.name,
        email: user.email,
        status: user.status,
        isAdmin: user.isAdmin
    });
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const user = await User.findByIdAndDelete({ _id: req.user._id });
    if (!user) {
        return res.status(400).send('No such user');
    }
    res.send(user);
});

module.exports = router;
