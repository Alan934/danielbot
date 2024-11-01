"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.MessageSchema = zod_1.default.object({
    numOrder: zod_1.default
        .number({
        invalid_type_error: "The numOrder must be a number",
        required_error: "The numOrder is required",
    })
        .positive(),
    body: zod_1.default.string({
        invalid_type_error: "The body must be a string",
        required_error: "The body is required",
    }),
    flow: zod_1.default.string({
        invalid_type_error: "The flow must be a string",
        required_error: "The flow is required",
    }),
});
