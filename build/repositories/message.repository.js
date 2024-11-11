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
exports.MessageRepository = void 0;
const entities_1 = require("../entities");
const repositoryGenerics_1 = require("../types/repositoryGenerics");
const data_source_1 = require("../data-source");
const types_1 = require("../types");
const enterprise_repository_1 = require("./enterprise.repository");
const errorHandler_1 = require("./errorHandler");
const flow_repository_1 = require("./flow.repository");
const uuid_1 = require("uuid");
class MessageRepository extends repositoryGenerics_1.GenericRepository {
    constructor() {
        super(entities_1.Message);
        this.flowRepository = new flow_repository_1.FlowRepository();
        this.repository = data_source_1.AppDataSource.getRepository(entities_1.Message);
        this.flowRepository = new flow_repository_1.FlowRepository();
    }
    findAllMessages(idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = yield this.repository.find({
                    where: { enterprise: { id: idEnterprise } },
                    relations: ["flow"],
                });
                return entities;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    findAllDeletedMessages(idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = yield this.repository.find({
                    where: { enterprise: { id: idEnterprise } },
                    relations: ["flow"],
                    withDeleted: true,
                });
                return entities;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    findMessageById(id, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.repository.findOne({
                    where: {
                        id: id,
                        enterprise: { id: idEnterprise },
                    },
                    relations: ["flow"],
                });
                if (!entity) {
                    throw new types_1.CustomError("Entity not found", 404);
                }
                return entity;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    findAllMessagesByNumOrder(idEnterprise, idFlow, numOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entityFlow = yield this.flowRepository.findOne({
                    where: { id: idFlow },
                });
                if (!entityFlow) {
                    throw new types_1.CustomError("Flow not found", 404);
                }
                const entities = yield this.repository.find({
                    where: {
                        enterprise: { id: idEnterprise },
                        numOrder: numOrder,
                        flow: { id: idFlow },
                    },
                });
                if (entities.length <= 0) {
                    throw new types_1.CustomError("Message not found", 404);
                }
                return entities;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    findAllMessagesByNumOrderAndFlowByName(idEnterprise, nameFlow, numOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entityFlow = yield this.flowRepository.findOne({
                    where: { name: nameFlow },
                });
                if (!entityFlow) {
                    throw new types_1.CustomError("Flow not found", 404);
                }
                const entities = yield this.repository.find({
                    where: {
                        enterprise: { id: idEnterprise },
                        numOrder: numOrder,
                        flow: { id: entityFlow.id },
                    },
                });
                if (entities.length <= 0) {
                    throw new types_1.CustomError("Message not found", 404);
                }
                return entities;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    createMessage(data, idFlow, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enterpriseRepository = new enterprise_repository_1.EnterpriseRepository();
                // Buscar la empresa
                const entityEnterprise = yield enterpriseRepository.findOne({
                    where: { id: idEnterprise },
                    relations: ["pricingPlan"],
                });
                if (!entityEnterprise) {
                    throw new types_1.CustomError("Enterprise not found", 404);
                }
                // Asignarle la empresa a message
                data.enterprise = entityEnterprise;
                // Validar existencia del flow
                if (!idFlow) {
                    throw new types_1.CustomError("Flow not provided", 400);
                }
                if (!(0, uuid_1.validate)(idFlow)) {
                    throw new types_1.CustomError("Invalid flow ID format", 400);
                }
                const entityFlow = yield this.flowRepository.findOne({
                    where: { id: idFlow },
                    relations: ["pricingPlans"],
                });
                if (!entityFlow) {
                    throw new types_1.CustomError("Flow not found", 404);
                }
                // Validar que el flujo pertenece al plan de precios de la empresa
                const enterprisePlanId = entityEnterprise.pricingPlan.id;
                if (!enterprisePlanId) {
                    throw new types_1.CustomError("Enterprise does not have an assigned plan", 400);
                }
                const flowPlans = entityFlow.pricingPlans;
                const isFlowInEnterprisePlan = flowPlans.some((plan) => plan.id === enterprisePlanId);
                if (!isFlowInEnterprisePlan) {
                    throw new types_1.CustomError("The flow does not belong to the enterprise's contracted plan", 400);
                }
                // Guarda message en la base de datos junto con la relación de flow y enterprise
                const newEntity = yield this.repository.save(data);
                return newEntity;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    updateEntityByEnterprise(data, idMessage, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedEntity = yield this.update({
                    id: idMessage,
                    enterprise: { id: idEnterprise },
                }, data);
                if (updatedEntity.affected) {
                    const newEntity = yield this.findMessageById(idMessage, idEnterprise);
                    return newEntity;
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
    deleteEntityByEnterprise(id, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.findMessageById(id, idEnterprise);
                if (!entity) {
                    throw new types_1.CustomError("Entity not found", 404);
                }
                const deletedEntity = yield this.delete({
                    id: id,
                    enterprise: { id: idEnterprise },
                });
                if (deletedEntity.affected) {
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
    logicDeleteByEnterprise(id, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.findMessageById(id, idEnterprise);
                if (!entity) {
                    throw new types_1.CustomError("Entity not found", 404);
                }
                const deletedEntity = yield this.softDelete(id);
                if (deletedEntity.affected) {
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
    restoreLogicDeletedByEnterprise(id, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.findMessageById(id, idEnterprise);
                if (!entity) {
                    throw new types_1.CustomError("Entity not found", 404);
                }
                const restoredEntity = yield this.restore(id);
                if (restoredEntity.affected) {
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
    findAllMainMessages(idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("idEnterprise = " + idEnterprise);
                const rootMessages = yield this.repository
                    .createQueryBuilder("message")
                    .leftJoinAndSelect("message.childMessages", "childMessages")
                    .where("message.fatherMessageId IS NULL")
                    .andWhere("message.enterprise = :idEnterprise", { idEnterprise })
                    .orderBy("message.numOrder", "ASC")
                    .getMany();
                for (const message of rootMessages) {
                    for (const child of message.childMessages) {
                        child.childMessages = yield this.findChildMessages(child.id);
                    }
                }
                return rootMessages;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    findAllMainMessagesWithIdFlow(idEnterprise, idFlow) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rootMessages = yield this.repository
                    .createQueryBuilder("message")
                    .leftJoinAndSelect("message.childMessages", "childMessages")
                    .where("message.fatherMessageId IS NULL")
                    .andWhere("message.enterpriseId = :idEnterprise", { idEnterprise })
                    .andWhere("message.flowId = :idFlow", { idFlow })
                    .orderBy("message.numOrder", "ASC")
                    .getMany();
                //console.log(JSON.stringify(rootMessages, null, 2))
                for (const message of rootMessages) {
                    for (const child of message.childMessages) {
                        child.childMessages = yield this.findChildMessages(child.id);
                    }
                }
                return rootMessages;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    findChildMessages(parentMessageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const childMessages = yield this.repository
                .createQueryBuilder("message")
                .leftJoinAndSelect("message.childMessages", "childMessages")
                .where("message.fatherMessageId = :parentMessageId", { parentMessageId })
                .orderBy("message.numOrder", "ASC")
                .getMany();
            // Recursivamente revisa cada hijo y carga sus hijos, si tiene
            for (const child of childMessages) {
                if (child.childMessages.length > 0) {
                    child.childMessages = yield this.findChildMessages(child.id); // Carga hijos de nivel más profundo si es necesario
                }
            }
            return childMessages;
        });
    }
    // GetAll de los mensajes con sus submensajes, filtrando por `idEnterprise`
    getMessagesWithSubMessages(idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = yield this.repository.find({
                    where: {
                        enterprise: { id: idEnterprise },
                        isDeleted: false,
                    },
                    relations: [
                        "flow",
                        "subMessages",
                        "subMessages.childSubMessages",
                        "subMessages.childSubMessages.childSubMessages",
                    ],
                    order: {
                        numOrder: "ASC",
                    },
                });
                if (!entities || entities.length === 0) {
                    throw new types_1.CustomError("No messages found", 404);
                }
                return entities;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    // GetOne de un mensaje específico con sus submensajes por ID y `idEnterprise`
    getOneWithSubMessages(id, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.repository.findOne({
                    where: {
                        id: id,
                        enterprise: { id: idEnterprise },
                        isDeleted: false,
                    },
                    relations: [
                        "flow",
                        "subMessages",
                        "subMessages.childSubMessages",
                        "subMessages.childSubMessages.childSubMessages",
                    ],
                });
                if (!entity) {
                    throw new types_1.CustomError("Entity not found", 404);
                }
                return entity;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    updateMessage(id, data, idEnterprise, idFlow) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield this.findOne({ where: { id } });
                if (!message) {
                    throw new types_1.CustomError("Message not found", 404);
                }
                if (idEnterprise) {
                    const enterpriseRepository = new enterprise_repository_1.EnterpriseRepository();
                    if (!(0, uuid_1.validate)(idEnterprise)) {
                        throw new types_1.CustomError("El formato del ID de enterprise no es válido", 400);
                    }
                    const entityEnterprise = yield enterpriseRepository.findOne({ where: { id: idEnterprise } });
                    if (!entityEnterprise) {
                        throw new types_1.CustomError("Enterprise not found", 404);
                    }
                    message.enterprise = entityEnterprise; // Solo actualizar si se pasa una empresa válida
                }
                if (idFlow) {
                    const flowRepository = new flow_repository_1.FlowRepository();
                    if (!(0, uuid_1.validate)(idFlow)) {
                        throw new types_1.CustomError("El formato del ID de flow no es válido", 400);
                    }
                    const entityFlow = yield flowRepository.findOne({ where: { id: idFlow } });
                    if (!entityFlow) {
                        throw new types_1.CustomError("Flow not found", 404);
                    }
                    message.flow = entityFlow; // Solo actualizar si se pasa un flujo válido
                }
                message.numOrder = (_a = data.numOrder) !== null && _a !== void 0 ? _a : message.numOrder;
                message.body = (_b = data.body) !== null && _b !== void 0 ? _b : message.body;
                message.option = (_c = data.option) !== null && _c !== void 0 ? _c : message.option;
                message.isNumber = (_d = data.isNumber) !== null && _d !== void 0 ? _d : message.isNumber;
                message.showName = (_e = data.showName) !== null && _e !== void 0 ? _e : message.showName;
                message.isName = (_f = data.isName) !== null && _f !== void 0 ? _f : message.isName;
                const updatedMessage = yield this.save(message);
                return updatedMessage;
            }
            catch (error) {
                console.error("Error updating message:", error);
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    // Realiza el soft delete
    softDeleteMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield this.findOne({ where: { id } });
                if (!message) {
                    throw new types_1.CustomError("Message not found", 404);
                }
                message.isDeleted = true;
                yield this.repository.save(message);
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
}
exports.MessageRepository = MessageRepository;
