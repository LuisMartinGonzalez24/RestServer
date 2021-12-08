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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userExistsById = exports.emailExist = exports.validateRoles = void 0;
const role_1 = __importDefault(require("../models/role"));
const user_1 = __importDefault(require("../models/user"));
const validateRoles = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const existRole = yield role_1.default.findOne({ role });
    if (!existRole || existRole === undefined) {
        throw new Error(`The role ${role} is not allowed`);
    }
    ;
});
exports.validateRoles = validateRoles;
const emailExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    //* Verify if the email exixsts
    const existEmail = yield user_1.default.findOne({ email });
    if (existEmail) {
        throw new Error(`The email: ${email} already exist`);
    }
});
exports.emailExist = emailExist;
const userExistsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //* Verify if the user with id exists
    const existUser = yield user_1.default.findById(id);
    if (!existUser) {
        throw new Error(`The user with id: ${id} not exists`);
    }
});
exports.userExistsById = userExistsById;
//# sourceMappingURL=dbValidations.js.map