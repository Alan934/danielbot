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
exports.FlowController = void 0;
const class_transformer_1 = require("class-transformer");
const flow_dto_1 = require("../entities/flow/dtos/flow.dto");
const flow_model_1 = require("../entities/flow/flow.model");
const flow_repository_1 = require("../repositories/flow.repository");
const controllerGenerics_1 = require("../types/controllerGenerics");
const utils_1 = require("../utils");
class FlowController extends controllerGenerics_1.GenericController {
    constructor() {
        super(flow_model_1.Flow, flow_model_1.Flow, flow_dto_1.FlowDto);
        this.createFlow = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newFlow = yield this.flowRepository.createFlowWithPricingPlans((0, class_transformer_1.plainToInstance)(flow_dto_1.FlowDto, req.body, { groups: ["private"] }));
                return res.status(201).json(newFlow);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
        this.updateFlow = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const flowId = req.params.id;
                const updatedFlow = yield this.flowRepository.updateFlowWithPricingPlans(req.body, flowId);
                return res.status(200).json(updatedFlow);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
        this.getFlowsForPricingPlan = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const planId = req.params.planId;
                const flows = yield this.flowRepository.getFlowsForPricingPlan(planId);
                const entitiesDTO = flows.map((entity) => {
                    return (0, utils_1.toDtoFromEntity)(flow_dto_1.FlowDto, entity);
                });
                return res.status(200).json(entitiesDTO);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
        this.getFlowsForPricingPlanAndIdEnterprise = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idEnterprise = req.params.idEnterprise;
                const flows = yield this.flowRepository.getFlowsForPricingPlanAndIdEnterprise(idEnterprise);
                const entitiesDTO = flows.map((entity) => {
                    return (0, utils_1.toDtoFromEntity)(flow_dto_1.FlowDto, entity);
                });
                return res.status(200).json(entitiesDTO);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
        this.flowRepository = new flow_repository_1.FlowRepository();
    }
    // Controlador para obtener todos los flujos con sus mensajes y submensajes
    findAllFlowsWithMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const flows = yield this.flowRepository.getAllWithMessagesAndSubMessages(idEnterprise);
                if (!flows || flows.length === 0) {
                    return res.status(404).json({ message: "No flows found" });
                }
                const flowsDto = flows.map((flow) => (0, utils_1.toDtoFromEntity)(flow_dto_1.FlowDto, flow));
                return res.status(200).json(flowsDto);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    // Controlador para obtener un flujo específico con sus mensajes y submensajes
    getOneWithMessagesAndSubMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const flow = yield this.flowRepository.getOneWithMessagesAndSubMessages(id, idEnterprise);
                if (!flow) {
                    return res.status(404).json({ message: "Flow not found" });
                }
                const flowDto = (0, utils_1.toDtoFromEntity)(flow_dto_1.FlowDto, flow);
                return res.status(200).json(flowDto);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    // Obtener todos los flujos con sus mensajes y submensajes
    getAllWithMessagesAndSubMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const flows = yield this.flowRepository.getAllWithMessagesAndSubMessages(idEnterprise);
                const flowsDto = flows.map((flow) => (0, utils_1.toDtoFromEntity)(flow_dto_1.FlowDto, flow));
                return res.status(200).json(flowsDto);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    // Soft delete de un flujo específico
    softDeleteFlow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.flowRepository.softDeleteFlow(id);
                return res.status(200).json({ message: `Flow with id ${id} successfully deleted.` });
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
}
exports.FlowController = FlowController;
