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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
const message_repository_1 = require("./message.repository");
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
    findAllFlowsWithMessages(idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messageRepository = new message_repository_1.MessageRepository();
                const enterpriseRepository = new enterprise_repository_1.EnterpriseRepository();
                const queryBuilder = this.repository.createQueryBuilder('flow');
                const entityEnterprise = yield enterpriseRepository.findOne({
                    where: { id: idEnterprise },
                    relations: ["pricingPlan"],
                });
                if (!entityEnterprise) {
                    throw new types_1.CustomError("Enterprise not found", 404);
                }
                const enterprisePlanId = entityEnterprise.pricingPlan.id;
                if (!enterprisePlanId) {
                    throw new types_1.CustomError("Enterprise does not have an assigned plan", 400);
                }
                // const entities = await queryBuilder
                // .leftJoinAndSelect('flow.messages', 'message') 
                // .leftJoin('pricing_plans_flows', 'ppf', 'ppf."flowId" = flow.id') 
                // .where('ppf."pricingPlanId" = :enterprisePlanId', { enterprisePlanId }) 
                // .getMany(); 
                const entities = yield queryBuilder
                    .leftJoin('pricing_plans_flows', 'ppf', 'ppf."flowId" = flow.id')
                    .where('ppf."pricingPlanId" = :enterprisePlanId', { enterprisePlanId })
                    .getMany();
                // Llenar cada flujo (flow) con sus mensajes raíz e hijos
                for (const flow of entities) {
                    flow.messages = yield messageRepository.findAllMainMessagesWithIdFlow(entityEnterprise.id, flow.id);
                }
                return entities;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    // Obtener un flujo específico con sus mensajes y submensajes
    getOneWithMessagesAndSubMessages(id, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.repository.findOne({
                    where: { id, isDeleted: false },
                });
                if (!entity) {
                    throw new types_1.CustomError("Flow not found", 404);
                }
                const messageRepository = new message_repository_1.MessageRepository();
                entity.messages = yield messageRepository.getMessagesWithSubMessages(idEnterprise);
                // Filtrar mensajes para incluir solo los que pertenecen a este flujo y eliminar la referencia `flow`
                entity.messages = entity.messages
                    .filter((message) => message.flow && message.flow.id === id)
                    .map((message) => {
                    const { flow } = message, messageWithoutFlow = __rest(message, ["flow"]);
                    return messageWithoutFlow;
                });
                return entity;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    // Obtener todos los flujos con sus mensajes y submensajes
    getAllWithMessagesAndSubMessages(idEnterprise) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enterpriseRepository = new enterprise_repository_1.EnterpriseRepository();
                const entityEnterprise = yield enterpriseRepository.findOne({
                    where: { id: idEnterprise },
                    relations: ["pricingPlan"],
                });
                if (!entityEnterprise) {
                    throw new types_1.CustomError("Enterprise not found", 404);
                }
                const enterprisePlanId = (_a = entityEnterprise.pricingPlan) === null || _a === void 0 ? void 0 : _a.id;
                if (!enterprisePlanId) {
                    throw new types_1.CustomError("Enterprise does not have an assigned plan", 400);
                }
                const flows = yield this.repository.find({
                    where: { isDeleted: false },
                });
                if (flows.length === 0) {
                    return [];
                }
                const messageRepository = new message_repository_1.MessageRepository();
                const allMessagesWithSubMessages = yield messageRepository.getMessagesWithSubMessages(idEnterprise);
                // Asignar mensajes a cada flujo según el flujo asociado y eliminar `flow` de cada mensaje
                for (const flow of flows) {
                    flow.messages = allMessagesWithSubMessages
                        .filter((message) => message.flow && message.flow.id === flow.id)
                        .map((message) => {
                        const { flow } = message, messageWithoutFlow = __rest(message, ["flow"]);
                        return messageWithoutFlow;
                    });
                }
                return flows;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    // Realiza el soft delete
    softDeleteFlow(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const flow = yield this.findOne({ where: { id } });
                if (!flow) {
                    throw new types_1.CustomError("Flow not found", 404);
                }
                flow.isDeleted = true;
                yield this.repository.save(flow);
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
}
exports.FlowRepository = FlowRepository;
