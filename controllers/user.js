const { response } = require('express');

const getUser = (request, res = response) => {
    res.json({
        msg: 'get api - controller'
    });
};

const addUser = (request, res = response) => {

    const body = request.body;

    res.json({
        msg: 'post api - controller',
        body,
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
