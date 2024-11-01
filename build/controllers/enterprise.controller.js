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
exports.EnterpriseController = void 0;
const entities_1 = require("../entities");
const controllerGenerics_1 = require("../types/controllerGenerics");
const enterprise_repository_1 = require("../repositories/enterprise.repository");
const errorsHandler_1 = require("../utils/errorsHandler");
const enterprise_1 = require("../entities/enterprise");
const types_1 = require("../types");
const transformDto_1 = require("../utils/transformDto");
const class_transformer_1 = require("class-transformer");
class EnterpriseController extends controllerGenerics_1.GenericController {
    constructor() {
        super(entities_1.Enterprise, entities_1.Enterprise, enterprise_1.EnterpriseDto);
        this.updateEnterprise = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idEnterprise = req.params.idEnterprise;
                const idPricingPlan = req.body.pricingPlan;
                const updatedEntity = yield this.enterpriseRepository.updateEnterpriseWithPlan((0, class_transformer_1.plainToInstance)(enterprise_1.EnterpriseDto, req.body, { groups: ["private"] }), idEnterprise, idPricingPlan);
                if (updatedEntity instanceof types_1.CustomError) {
                    throw updatedEntity;
                }
                return res
                    .status(200)
                    .json((0, transformDto_1.toDtoFromEntity)(enterprise_1.EnterpriseDto, updatedEntity));
            }
            catch (error) {
                return (0, errorsHandler_1.handleErrors)(error, res);
            }
        });
        this.enterpriseRepository = new enterprise_repository_1.EnterpriseRepository();
    }
    prueba(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json("Probando get");
            }
            catch (error) {
                return (0, errorsHandler_1.handleErrors)(error, res);
            }
        });
    }
    getEnterpriseWithPricingPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEnterprise = req.params.idEnterprise;
                const enterprise = yield this.enterpriseRepository.getEnterpriseWithPricingPlan(idEnterprise);
                return res.status(200).json((0, transformDto_1.toDtoFromEntity)(enterprise_1.EnterpriseDto, enterprise));
            }
            catch (error) {
                return (0, errorsHandler_1.handleErrors)(error, res);
            }
        });
    }
}
exports.EnterpriseController = EnterpriseController;
