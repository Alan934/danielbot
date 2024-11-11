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
exports.SubMessageRepository = void 0;
const entities_1 = require("../entities");
const repositoryGenerics_1 = require("../types/repositoryGenerics");
const data_source_1 = require("../data-source");
const types_1 = require("../types");
const errorHandler_1 = require("./errorHandler");
const message_repository_1 = require("./message.repository");
//import { FlowRepository } from "./flow.repository";
const uuid_1 = require("uuid");
class SubMessageRepository extends repositoryGenerics_1.GenericRepository {
    //private flowRepository = new FlowRepository();
    constructor() {
        super(entities_1.SubMessage);
        this.repository = data_source_1.AppDataSource.getRepository(entities_1.SubMessage);
        // this.flowRepository = new FlowRepository();
    }
    // Obtener todos los submensajes con sus relaciones, filtrando por `idEnterprise` y `isDeleted`
    getAllSubMessages(idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = yield this.repository.find({
                    where: {
                        isDeleted: false,
                        message: { enterprise: { id: idEnterprise } },
                    },
                    relations: [
                        "childSubMessages",
                        "parentSubMessage",
                        "message",
                    ],
                    order: {
                        numOrder: "ASC",
                    },
                });
                if (!entities || entities.length === 0) {
                    throw new types_1.CustomError("No subMessages found", 404);
                }
                return entities;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    // Obtener un submensaje específico por ID con sus relaciones
    getOneSubMessage(id, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subMessage = yield this.repository.findOne({
                    where: {
                        id: id,
                        isDeleted: false,
                        message: { enterprise: { id: idEnterprise } },
                    },
                    relations: [
                        "childSubMessages",
                        "parentSubMessage",
                        "message",
                    ],
                });
                if (!subMessage) {
                    throw new types_1.CustomError("SubMessage not found", 404);
                }
                return subMessage;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    // Crear un nuevo submensaje
    createSubMessage(data, idMessage, idParentSubMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Buscar el mensaje al que se asociará el submensaje
                const messageRepository = new message_repository_1.MessageRepository();
                const entityMessage = yield messageRepository.findOne({ where: { id: idMessage } });
                if (!entityMessage) {
                    throw new types_1.CustomError("Message not found", 404);
                }
                // Buscar el submensaje padre si se proporciona
                let parentSubMessage = null;
                if (idParentSubMessage) {
                    parentSubMessage = yield this.findOne({ where: { id: idParentSubMessage } });
                    if (!parentSubMessage) {
                        throw new types_1.CustomError("Parent submessage not found", 404);
                    }
                }
                const newSubMessage = this.create({
                    numOrder: data.numOrder,
                    body: data.body,
                    option: data.option,
                    isNumber: data.isNumber,
                    message: entityMessage,
                    parentSubMessage: parentSubMessage,
                    childSubMessages: [],
                });
                const savedSubMessage = yield this.save(newSubMessage);
                return savedSubMessage;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    // Actualizar un submensaje específico
    updateSubMessage(id, data, idParentSubMessage) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Attempting to update submessage with ID:", id);
                const subMessage = yield this.findOne({ where: { id } });
                if (!subMessage) {
                    throw new types_1.CustomError("SubMessage not found", 404);
                }
                if (data.message && data.message.id) {
                    const messageRepository = new message_repository_1.MessageRepository();
                    if (!(0, uuid_1.validate)(data.message.id)) {
                        throw new types_1.CustomError("El formato del ID de mensaje no es válido", 400);
                    }
                    const entityMessage = yield messageRepository.findOne({ where: { id: data.message.id } });
                    if (!entityMessage) {
                        throw new types_1.CustomError("Message not found", 404);
                    }
                    subMessage.message = entityMessage; // Solo actualizar si se pasa un mensaje válido
                }
                if (idParentSubMessage) {
                    const parentSubMessage = yield this.findOne({ where: { id: idParentSubMessage } });
                    if (!parentSubMessage) {
                        throw new types_1.CustomError("Parent submessage not found", 404);
                    }
                    subMessage.parentSubMessage = parentSubMessage; // Solo asignar si se proporciona un submensaje padre
                }
                subMessage.numOrder = (_a = data.numOrder) !== null && _a !== void 0 ? _a : subMessage.numOrder;
                subMessage.body = (_b = data.body) !== null && _b !== void 0 ? _b : subMessage.body;
                subMessage.option = (_c = data.option) !== null && _c !== void 0 ? _c : subMessage.option;
                subMessage.isNumber = (_d = data.isNumber) !== null && _d !== void 0 ? _d : subMessage.isNumber;
                subMessage.showName = (_e = data.showName) !== null && _e !== void 0 ? _e : subMessage.showName;
                subMessage.isName = (_f = data.isName) !== null && _f !== void 0 ? _f : subMessage.isName;
                const updatedSubMessage = yield this.save(subMessage);
                return updatedSubMessage;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    // Realiza el soft delete
    softDeleteSubMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subMessage = yield this.findOne({ where: { id } });
                if (!subMessage) {
                    throw new types_1.CustomError("SubMessage not found", 404);
                }
                subMessage.isDeleted = true;
                yield this.repository.save(subMessage);
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    // Recuperar un submensaje específico de la eliminación lógica
    recoverSubMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subMessage = yield this.findOne({ where: { id, isDeleted: true } });
                if (!subMessage) {
                    throw new types_1.CustomError("SubMessage not found or already not deleted", 404);
                }
                subMessage.isDeleted = false;
                const recoveredSubMessage = yield this.save(subMessage);
                return recoveredSubMessage;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
}
exports.SubMessageRepository = SubMessageRepository;
