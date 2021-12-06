const { Router } = require("express");
const { getUser, addUser, deleteUser } = require("../controllers/user");

const router = Router();

router.get('/', getUser);

router.post('/', addUser);

router.delete('/', deleteUser);

module.exports = router;
