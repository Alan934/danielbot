"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.EnterpriseSchema = zod_1.default.object({
    name: zod_1.default
        .string({
        invalid_type_error: "The name must be a string",
        required_error: "The name is required",
    })
        .min(3, "The name must be at least 3 characters long"),
    phone: zod_1.default
        .number({
        invalid_type_error: "The phone must be a number",
        required_error: "The phone is required",
    })
        .min(9, "The phone is too short")
        .transform((value) => String(value)),
    pricingPlan: zod_1.default
        .string({
        invalid_type_error: "The pricingPlan must be a string",
    })
        .optional(),
    connected: zod_1.default
        .boolean({
        invalid_type_error: "Connected must be a boolean",
    })
        .optional(),
});
