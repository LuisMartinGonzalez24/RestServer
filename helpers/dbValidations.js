const Role = require('../models/role');
const User = require('../models/user');

const validateRoles = async (role = '') => {
    const existRole = await Role.findOne({ role });

    if (!existRole || existRole === undefined) {
        throw new Error(`The role ${role} is not allowed`);
    };
}

const emailExist = async (email = '') => {
    //* Verify if the email exixsts
    const existEmail = await User.findOne({ email });

    if (existEmail) {
        throw new Error(`The email: ${email} already exist`);
    }
}

const userExistsById = async (id) => {
    //* Verify if the user with id exists
    const existUser = await User.findById(id);

    if (!existUser) {
        throw new Error(`The user with id: ${id} not exists`);
    }
}

module.exports = {
    validateRoles,
    emailExist,
    userExistsById
};
