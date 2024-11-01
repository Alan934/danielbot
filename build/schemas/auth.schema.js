"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const role_enum_1 = require("../enums/role.enum");
exports.AuthSchema = zod_1.default.object({
    email: zod_1.default
        .string({
        invalid_type_error: "The email must be a string",
        required_error: "The email is required",
    })
        .email("This is not a valid email."),
    password: zod_1.default
        .string({
        invalid_type_error: "The password must be a string",
        required_error: "The password is required",
    })
        .min(6, "The password must be at least 6 characters long"),
    username: zod_1.default
        .string({
        invalid_type_error: "The username must be a string",
        required_error: "The username is required",
    })
        .min(4, "The username must be at least 4 characters long"),
    role: zod_1.default
        .nativeEnum(role_enum_1.Role, {
        invalid_type_error: "The role must be a string",
        required_error: "The role is required",
    })
        .optional(),
});
