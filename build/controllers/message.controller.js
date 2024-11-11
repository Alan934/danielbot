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
exports.MessageController = void 0;
const entities_1 = require("../entities");
const message_1 = require("../entities/message");
const message_repository_1 = require("../repositories/message.repository");
const controllerGenerics_1 = require("../types/controllerGenerics");
const utils_1 = require("../utils");
// import { CustomError } from "../types";
// import { toDtoFromEntity } from "../utils/transformDto";
// import { MessageDto } from "../entities/message";
const class_transformer_1 = require("class-transformer");
//import { AppDataSource } from "../data-source";
class MessageController extends controllerGenerics_1.GenericController {
    constructor() {
        super(entities_1.Message, entities_1.Message, message_1.MessageDto);
        this.messageRepository = new message_repository_1.MessageRepository();
    }
    createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const idFlow = req.body.flow.toString();
                const entity = yield this.messageRepository.createMessage((0, class_transformer_1.plainToInstance)(message_1.MessageDto, req.body, { groups: ["private"] }), idFlow, idEnterprise);
                return res.status(201).json(entity);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    findAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const entities = yield this.messageRepository.findAllMessages(idEnterprise);
                const entitiesDto = entities.map((entity) => (0, utils_1.toDtoFromEntity)(message_1.MessageDto, entity));
                return res.status(200).json(entitiesDto);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    findAllMainMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEnterprise = yield this.getEnterpriseId(req, res);
                //console.log("controller idEnterprise = " + idEnterprise)
                const entities = yield this.messageRepository.findAllMainMessages(idEnterprise);
                const entitiesDto = entities.map((entity) => (0, utils_1.toDtoFromEntity)(message_1.MessageDto, entity));
                return res.status(200).json(entitiesDto);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    getMessagesAllDeleted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const entities = yield this.messageRepository.findAllDeletedMessages(idEnterprise);
                const entitiesDto = entities.map((entity) => (0, utils_1.toDtoFromEntity)(message_1.MessageDto, entity));
                return res.status(200).json(entitiesDto);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    getMessageById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idMessage = req.params.id;
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const entity = yield this.messageRepository.findMessageById(idMessage, idEnterprise);
                return res.json(entity);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    findAllMessagesByNumOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const idFlow = req.query.idFlow;
                const numOrder = parseInt(req.query.numOrder, 10);
                const entities = yield this.messageRepository.findAllMessagesByNumOrder(idEnterprise, idFlow, numOrder);
                const entitiesDto = entities.map((entity) => (0, utils_1.toDtoFromEntity)(message_1.MessageDto, entity));
                return res.status(200).json(entitiesDto);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    findAllMessagesByNumOrderAndFlowByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const nameFlow = req.query.nameFlow;
                const numOrder = parseInt(req.query.numOrder, 10);
                const entities = yield this.messageRepository.findAllMessagesByNumOrderAndFlowByName(idEnterprise, nameFlow, numOrder);
                const entitiesDto = entities.map((entity) => (0, utils_1.toDtoFromEntity)(message_1.MessageDto, entity));
                return res.status(200).json(entitiesDto);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    // Obtener todos los mensajes con sus submensajes
    getMessagesWithSubMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const entities = yield this.messageRepository.getMessagesWithSubMessages(idEnterprise);
                const messagesDto = entities.map((message) => (0, utils_1.toDtoFromEntity)(message_1.MessageDto, message));
                return res.status(200).json(messagesDto);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    // Obtener un mensaje por ID con sus submensajes
    getOneWithSubMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const entity = yield this.messageRepository.getOneWithSubMessages(id, idEnterprise);
                if (!entity) {
                    return res.status(404).json({ message: "Message not found" });
                }
                return res.status(200).json(entity);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    // Controlador para actualizar un mensaje
    updateMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const data = req.body;
                const idEnterprise = req.body.enterprise || null;
                const idFlow = req.body.flow || null;
                const updatedMessage = yield this.messageRepository.updateMessage(id, data, idEnterprise, idFlow);
                return res.status(200).json(updatedMessage);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    // Soft delete de un mensaje específico
    softDeleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.messageRepository.softDeleteMessage(id);
                return res.status(200).json({ message: `Message with id ${id} successfully deleted.` });
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
}
exports.MessageController = MessageController;
