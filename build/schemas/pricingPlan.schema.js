"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingPlanSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.PricingPlanSchema = zod_1.default.object({
    name: zod_1.default.string({
        invalid_type_error: "The name must be a string",
        required_error: "The name is required",
    }),
    description: zod_1.default.string({
        invalid_type_error: "The description must be a string",
        required_error: "The description is required",
    }),
    price: zod_1.default
        .number({
        invalid_type_error: "The price must be a string",
        required_error: "The price is required",
    })
        .nonnegative({ message: "The price must be a non-negative number" }),
});
