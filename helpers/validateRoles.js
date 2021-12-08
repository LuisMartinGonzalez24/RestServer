const Role = require('../models/role');

const validateRoles = async (role = '') => {
    const existRole = await Role.findOne({ role });

    if (!existRole || existRole === undefined) {
        throw new Error(`The role ${role} is not allowed`);
    };
}

module.exports = {
    validateRoles,
};
