"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowRepository = void 0;
const repositoryGenerics_1 = require("../types/repositoryGenerics");
const flow_model_1 = require("../entities/flow/flow.model");
const data_source_1 = require("../data-source");
const types_1 = require("../types");
const entities_1 = require("../entities");
const errorHandler_1 = require("./errorHandler");
const enterprise_repository_1 = require("./enterprise.repository");
class FlowRepository extends repositoryGenerics_1.GenericRepository {
    constructor() {
        super(flow_model_1.Flow);
        this.repository = data_source_1.AppDataSource.getRepository(flow_model_1.Flow);
    }
    createFlowWithPricingPlans(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pricingPlanRepository = data_source_1.AppDataSource.getRepository(entities_1.PricingPlan);
                let pricingPlansEntities = [];
                if (data.pricingPlans && data.pricingPlans.length > 0) {
                    pricingPlansEntities = yield Promise.all(data.pricingPlans.map((id) => __awaiter(this, void 0, void 0, function* () {
                        const pricingPlan = yield pricingPlanRepository.findOneBy({
                            id: id.toString(),
                        });
                        if (!pricingPlan) {
                            throw new types_1.CustomError(`The PricingPlan with id ${id} was not found`, 404);
                        }
                        return pricingPlan;
                    })));
                }
                return this.repository.save({
                    name: data.name,
                    description: data.description,
                    pricingPlans: pricingPlansEntities,
                });
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    updateFlowWithPricingPlans(data, flowId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pricingPlanRepository = data_source_1.AppDataSource.getRepository(entities_1.PricingPlan);
                let pricingPlansEntities = [];
                if (data.pricingPlans && data.pricingPlans.length > 0) {
                    pricingPlansEntities = yield Promise.all(data.pricingPlans.map((id) => __awaiter(this, void 0, void 0, function* () {
                        const pricingPlan = yield pricingPlanRepository.findOneBy({
                            id: id.toString(),
                        });
                        if (!pricingPlan) {
                            throw new types_1.CustomError(`The PricingPlan with id ${id} was not found`, 404);
                        }
                        return pricingPlan;
                    })));
                }
                const flowToUpdate = yield this.findOneBy({ id: flowId });
                if (!flowToUpdate) {
                    throw new types_1.CustomError(`Flow with id ${flowId} not found`, 404);
                }
                if (data.name) {
                    flowToUpdate.name = data.name;
                }
                if (data.description) {
                    flowToUpdate.description = data.description;
                }
                if (data.pricingPlans) {
                    flowToUpdate.pricingPlans = pricingPlansEntities;
                }
                yield this.repository.save(flowToUpdate);
                return flowToUpdate;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    getFlowsForPricingPlan(planId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = this.find({
                    where: { pricingPlans: { id: planId } },
                });
                return entities;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    getFlowsForPricingPlanAndIdEnterprise(idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enterpriseRepository = new enterprise_repository_1.EnterpriseRepository();
                const enterprise = yield enterpriseRepository.getEnterpriseWithPricingPlan(idEnterprise);
                const entities = this.find({
                    where: { pricingPlans: { id: enterprise.pricingPlan.id } },
                });
                return entities;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
}
exports.FlowRepository = FlowRepository;
