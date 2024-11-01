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
}
exports.MessageController = MessageController;
