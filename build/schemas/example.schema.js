"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ExampleSchema = zod_1.default.object({
    attributeString: zod_1.default
        .string({
        invalid_type_error: "The attributeString must be a string",
        required_error: "The attributeString is required",
    })
        .min(4),
    attributeNumber: zod_1.default.coerce
        .number({
        invalid_type_error: "The attributeNumber must be a number",
        required_error: "The attributeNumber is required",
    }),
});
