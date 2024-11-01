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
exports.EnterpriseRepository = void 0;
const entities_1 = require("../entities");
const repositoryGenerics_1 = require("../types/repositoryGenerics");
const data_source_1 = require("../data-source");
const types_1 = require("../types");
const transformDto_1 = require("../utils/transformDto");
const errorHandler_1 = require("./errorHandler");
class EnterpriseRepository extends repositoryGenerics_1.GenericRepository {
    constructor() {
        super(entities_1.Enterprise);
        this.repository = data_source_1.AppDataSource.getRepository(entities_1.Enterprise);
    }
    getEnterpriseWithPricingPlan(enterpriseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enterprise = yield this.findOne({
                    where: { id: enterpriseId },
                    relations: ["pricingPlan"],
                });
                if (enterprise) {
                    return enterprise;
                }
                else {
                    throw new types_1.CustomError("Enterprise not found", 404);
                }
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    updateEnterpriseWithPlan(data, idEnterprise, idPricingPlan) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pricingPlan = yield this.repository.manager
                    .getRepository(entities_1.PricingPlan)
                    .findOneBy({ id: idPricingPlan });
                if (!pricingPlan) {
                    throw new types_1.CustomError("PricingPlan not found", 404);
                }
                const updatedEntity = yield this.findOneBy({ id: idEnterprise });
                if (!updatedEntity) {
                    throw new types_1.CustomError("Enterprise not found", 404);
                }
                if (data.name) {
                    updatedEntity.name = data.name.toString();
                }
                if (data.phone) {
                    updatedEntity.phone = data.phone.toString();
                }
                if ("connected" in data) {
                    if (typeof data.connected === "boolean") {
                        updatedEntity.connected = data.connected;
                    }
                }
                updatedEntity.pricingPlan = pricingPlan;
                yield this.repository.save(updatedEntity);
                return updatedEntity;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    // Metodos de busqueda heredados del generico
    createEnterpriseEntity(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = (0, transformDto_1.toEntityFromDto)(entities_1.Enterprise, data);
                yield this.repository.save(data);
                return entity;
            }
            catch (error) {
                if (error instanceof types_1.CustomError) {
                    throw error;
                }
                else {
                    throw new types_1.CustomError("Unknown error: " + error, 500);
                }
            }
        });
    }
    deleteEnterpriseEntity(idEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.delete(idEntity);
                if (result.affected) {
                    return result.raw;
                }
                else {
                    throw new types_1.CustomError("Entity not found", 404);
                }
            }
            catch (error) {
                if (error instanceof types_1.CustomError) {
                    throw error;
                }
                else {
                    throw new types_1.CustomError("Unknown error" + error, 500);
                }
            }
        });
    }
    logicDeleteEnterprise(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.softDelete(id);
                if (result.affected) {
                    return result.raw;
                }
                else {
                    throw new types_1.CustomError("Entity not found", 404);
                }
            }
            catch (error) {
                if (error instanceof types_1.CustomError) {
                    throw error;
                }
                else {
                    throw new types_1.CustomError("Unknown error" + error, 500);
                }
            }
        });
    }
}
exports.EnterpriseRepository = EnterpriseRepository;
