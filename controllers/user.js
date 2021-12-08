const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { getAndConvertToNumber } = require('../helpers/commonFunctions');

const getUser = async (request, res = response) => {

    const { limit, initial } = request.query;

    const defaultLimit = getAndConvertToNumber(limit, 5);
    const defaultInitial = getAndConvertToNumber(initial, 0);

    const filter = {
        status: true,
    };

    const [total, users] = await Promise.all([
        User.countDocuments(filter),
        User.find(filter)
            .limit(defaultLimit)
            .skip(defaultInitial)
    ]);


    res.json({
        total,
        users,
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

const updateUser = async (request, res = response) => {

    const { id } = request.params;
    const { _id, password, google, email, ...restProperties } = request.body;

    //* Validate password
    if (password) {
        const salt = bcrypt.genSaltSync(10);
        restProperties.password = bcrypt.hashSync(password, salt);
    }

    await User.findByIdAndUpdate(id, restProperties);
    const updatedUser = await User.findOne({ id });

    res.json({
        msg: 'update api - controller',
        updatedUser,
    });
};

const deleteUser = async (request, res = response) => {

    const { id } = request.params;

    const filter = {
        status: false,
    };

    const deletedUser = await User.findByIdAndUpdate(id, filter);

    res.json(deletedUser);
};

module.exports = {
    getUser,
    addUser,
    updateUser,
    deleteUser,
};
