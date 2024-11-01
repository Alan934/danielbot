"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// import { Role } from "../enums/role.enum";
exports.ProfileSchema = zod_1.default.object({
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
});
