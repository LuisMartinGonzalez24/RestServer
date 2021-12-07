const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUser = (request, res = response) => {
    res.json({
        msg: 'get api - controller'
    });
};

const addUser = async (request, res = response) => {
    
    const { name, email, password, google, role } = request.body;

    const user = new User({
        name,
        email,
        password,
        google,
        role
    });

    //* Verify if the email exixsts
    const existEmail = await User.findOne({ email: email });

    if (existEmail) {
        return res.status(400).json({
            message: 'Email already exist'
        });
    }

    //* Encrypt password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    //* Save in DB
    await user.save();

    res.json({
        msg: 'post api - controller',
        user,
    });
};

const deleteUser = (request, res = response) => {
    res.json({
        msg: 'delete api - controller'
    });
};

module.exports = {
    getUser,
    addUser,
    deleteUser,
};
