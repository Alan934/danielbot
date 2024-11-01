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
exports.ClientRepository = void 0;
const entities_1 = require("../entities");
const types_1 = require("../types");
const repositoryGenerics_1 = require("../types/repositoryGenerics");
const enterprise_repository_1 = require("./enterprise.repository");
const utils_1 = require("../utils");
const errorHandler_1 = require("./errorHandler");
class ClientRepository extends repositoryGenerics_1.GenericRepository {
    constructor() {
        super(entities_1.Client);
    }
    findAllEntitiesForAEnterprise(idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = yield this.find({
                    where: { enterprise: { id: idEnterprise } },
                    relations: ["enterprise"],
                });
                return entities;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    findAllDeletedEntitiesForAEnterprise(idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.find({
                    where: { enterprise: { id: idEnterprise } },
                    withDeleted: true,
                    relations: ["enterprise"],
                });
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    findByIdEntityForAEnterprise(idClient, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.findOneBy({
                    id: idClient,
                    enterprise: { id: idEnterprise },
                });
                if (entity) {
                    return entity;
                }
                else {
                    throw new types_1.CustomError("Entity not found", 404);
                }
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    createEntityForAEnterprise(data, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enterpriseRepository = new enterprise_repository_1.EnterpriseRepository();
                const enterprise = yield enterpriseRepository.findByIdEntity(idEnterprise);
                if (!enterprise) {
                    throw new types_1.CustomError("Enterprise not found", 404);
                }
                data.enterprise = enterprise;
                const newEntity = (0, utils_1.toEntityFromDto)(entities_1.Client, data);
                return yield this.save(newEntity);
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    updateEntityForAEnterprise(idClient, idEnterprise, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entityUpdated = yield this.update({
                    // chequear si es mejor con find y save, update no chequea si existe
                    id: idClient,
                    enterprise: { id: idEnterprise },
                }, data);
                if (entityUpdated.affected) {
                    const restoredEntity = yield this.findByIdEntity(idClient);
                    return restoredEntity;
                }
                else {
                    throw new types_1.CustomError("Entity not found", 404);
                }
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    deleteEntityForAEnterprise(idClient, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.findOneOrFail({
                    where: { id: idClient },
                    relations: ["enterprise"],
                })
                    .then((client) => __awaiter(this, void 0, void 0, function* () {
                    if (client.enterprise.id === idEnterprise) {
                        return yield this.delete(idClient);
                    }
                    else {
                        throw new types_1.CustomError("Permission denied", 403);
                    }
                }))
                    .catch((error) => {
                    throw error;
                });
                if (result.affected) {
                    return result.raw;
                }
                else {
                    throw new types_1.CustomError("Entity not found", 404);
                }
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    logicDeleteForAEnterprise(idClient, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.findOneOrFail({
                    where: { id: idClient },
                    relations: ["enterprise"],
                })
                    .then((client) => __awaiter(this, void 0, void 0, function* () {
                    if (client.enterprise.id === idEnterprise) {
                        return yield this.softDelete(idClient);
                    }
                    else {
                        throw new types_1.CustomError("Permission denied", 403);
                    }
                }))
                    .catch((error) => {
                    throw error;
                });
                if (result.affected) {
                    return result.raw;
                }
                else {
                    throw new types_1.CustomError("Entity not found", 404);
                }
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    restoreLogicDeletedForAEnterprise(idClient, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.restore({
                    id: idClient,
                    enterprise: { id: idEnterprise },
                });
                if (result.affected) {
                    return yield this.findByIdEntity(idClient);
                }
                else {
                    throw new types_1.CustomError("Entity not found", 404);
                }
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
}
exports.ClientRepository = ClientRepository;
