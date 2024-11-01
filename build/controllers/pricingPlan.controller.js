"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingPlanController = void 0;
// import { Request, Response } from "express";
const pricingPlan_dto_1 = require("../entities/pricingPlan/dtos/pricingPlan.dto");
const pricingPlan_model_1 = require("../entities/pricingPlan/pricingPlan.model");
const controllerGenerics_1 = require("../types/controllerGenerics");
class PricingPlanController extends controllerGenerics_1.GenericController {
    // private pricingPlanRepository: PricingPlanRepository;
    constructor() {
        super(pricingPlan_model_1.PricingPlan, pricingPlan_model_1.PricingPlan, pricingPlan_dto_1.PricingPlanDto);
    }
}
exports.PricingPlanController = PricingPlanController;
