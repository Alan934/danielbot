"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingPlanRepository = void 0;
const repositoryGenerics_1 = require("../types/repositoryGenerics");
const pricingPlan_model_1 = require("../entities/pricingPlan/pricingPlan.model");
class PricingPlanRepository extends repositoryGenerics_1.GenericRepository {
    constructor() {
        super(pricingPlan_model_1.PricingPlan);
    }
}
exports.PricingPlanRepository = PricingPlanRepository;
