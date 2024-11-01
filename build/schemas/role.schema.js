"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const role_enum_1 = require("../enums/role.enum");
exports.RoleSchema = zod_1.default.object({
    role: zod_1.default.nativeEnum(role_enum_1.Role, {
        invalid_type_error: "The role must be a string",
        required_error: "The role is required",
    }),
});
