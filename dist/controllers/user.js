"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.addUser = exports.getUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const commonFunctions_1 = require("../helpers/commonFunctions");
const getUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, initial } = request.query;
    const defaultLimit = (0, commonFunctions_1.getAndConvertToNumber)(limit, 5);
    const defaultInitial = (0, commonFunctions_1.getAndConvertToNumber)(initial, 0);
    const filter = {
        status: true,
    };
    const [total, users] = yield Promise.all([
        user_1.default.countDocuments(filter),
        user_1.default.find(filter)
            .limit(defaultLimit)
            .skip(defaultInitial)
    ]);
    response.json({
        total,
        users,
    });
});
exports.getUser = getUser;
const addUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, google, role } = request.body;
    const user = new user_1.default({
        name,
        email,
        password,
        google,
        role
    });
    //* Encrypt password
    const salt = bcryptjs_1.default.genSaltSync(10);
    user.password = bcryptjs_1.default.hashSync(password, salt);
    //* Save in DB
    yield user.save();
    response.json({
        msg: 'post api - controller',
        user,
    });
});
exports.addUser = addUser;
const updateUser = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const _a = request.body, { _id, password, google, email } = _a, restProperties = __rest(_a, ["_id", "password", "google", "email"]);
    //* Validate password
    if (password) {
        const salt = bcryptjs_1.default.genSaltSync(10);
        restProperties.password = bcryptjs_1.default.hashSync(password, salt);
    }
    yield user_1.default.findByIdAndUpdate(id, restProperties);
    const updatedUser = yield user_1.default.findOne({ id });
    res.json({
        msg: 'update api - controller',
        updatedUser,
    });
});
exports.updateUser = updateUser;
const deleteUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const filter = {
        status: false,
    };
    const deletedUser = yield user_1.default.findByIdAndUpdate(id, filter);
    response.json(deletedUser);
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map