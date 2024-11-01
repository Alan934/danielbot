"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.FlowSchema = zod_1.default.object({
    name: zod_1.default
        .string({
        invalid_type_error: "The name must be a string",
        required_error: "The name is required",
    })
        .min(3, "The name must be at least 3 characters long"),
    description: zod_1.default.string({
        invalid_type_error: "The description must be a string",
        required_error: "The description is required",
    }),
    pricingPlans: zod_1.default
        .array(zod_1.default.string().uuid({
        message: "Each pricingPlanId must be a valid UUID",
    }))
        .nonempty({
        message: "At least one pricingPlanId is required",
    }),
});
