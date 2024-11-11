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
exports.SubMessageController = void 0;
const entities_1 = require("../entities");
const subMessage_1 = require("../entities/subMessage");
const subMessage_repository_1 = require("../repositories/subMessage.repository");
const controllerGenerics_1 = require("../types/controllerGenerics");
const utils_1 = require("../utils");
// import { CustomError } from "../types";
// import { toDtoFromEntity } from "../utils/transformDto";
// import { MessageDto } from "../entities/message";
//import { plainToInstance } from "class-transformer";
//import { AppDataSource } from "../data-source";
class SubMessageController extends controllerGenerics_1.GenericController {
    constructor() {
        super(entities_1.SubMessage, entities_1.SubMessage, subMessage_1.SubMessageDto);
        this.subMessageRepository = new subMessage_repository_1.SubMessageRepository();
    }
    // Obtener todos los mensajes con sus submensajes
    getAllSubMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const entities = yield this.subMessageRepository.getAllSubMessages(idEnterprise);
                const messagesDto = entities.map((subMessage) => (0, utils_1.toDtoFromEntity)(subMessage_1.SubMessageDto, subMessage));
                return res.status(200).json(messagesDto);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    // Obtener un mensaje por ID con sus submensajes
    getOneSubMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const entity = yield this.subMessageRepository.getOneSubMessage(id, idEnterprise);
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
    // Crear un nuevo submensaje
    createSubMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const idMessage = req.params.id;
                const idParentSubMessage = req.body.parentSubMessage || null;
                const newSubMessage = yield this.subMessageRepository.createSubMessage(data, idMessage, idParentSubMessage);
                return res.status(201).json(newSubMessage);
            }
            catch (error) {
                console.error("Error creating submessage:", error);
                return res.status(500).json({ message: "Error creating submessage" });
            }
        });
    }
    // Controlador para actualizar un submensaje
    updateSubMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const data = req.body;
                const idParentSubMessage = req.body.parentSubMessage || null;
                const updatedSubMessage = yield this.subMessageRepository.updateSubMessage(id, data, idParentSubMessage);
                return res.status(200).json(updatedSubMessage);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    // Soft delete de un mensaje específico
    softDeleteSubMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.subMessageRepository.softDeleteSubMessage(id);
                return res.status(200).json({ message: `SubMessage with id ${id} successfully deleted.` });
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    // Recuperar un submensaje específico
    recoverSubMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const recoveredSubMessage = yield this.subMessageRepository.recoverSubMessage(id);
                return res.status(200).json({ message: `SubMessage with ID ${id} successfully recovered.`, data: recoveredSubMessage });
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
}
exports.SubMessageController = SubMessageController;
