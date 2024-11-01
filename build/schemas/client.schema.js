"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ClientSchema = zod_1.default.object({
    username: zod_1.default.string({
        invalid_type_error: "The username must be a string",
        required_error: "The username is required",
    }),
    phone: zod_1.default
        .number({
        invalid_type_error: "The phone must be a number",
        required_error: "The phone is required",
    })
        .transform((value) => String(value)),
});
