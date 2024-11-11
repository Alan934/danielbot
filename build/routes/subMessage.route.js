"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subMessageRouter = void 0;
const subMessage_controller_1 = require("../controllers/subMessage.controller");
const routeGenerics_1 = require("../types/routeGenerics");
const entities_1 = require("../entities");
const subMessage_1 = require("../schemas/subMessage");
const subMessage_2 = require("../entities/subMessage");
//import { validateSchema } from "../middlewares";
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleProtectionMiddleware_1 = require("../middlewares/roleProtectionMiddleware");
const subMessageRouter = () => {
    const subMessageRoutes = (0, routeGenerics_1.genericRoutes)(entities_1.SubMessage, entities_1.SubMessage, subMessage_2.SubMessageDto, subMessage_1.SubMessageSchema);
    const subMessageController = new subMessage_controller_1.SubMessageController();
    subMessageRoutes.get("/getAll", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor"]), (req, res) => 
    /*
    #swagger.path = '/subMessages/getAll'
    #swagger.tags = ['SubMessage']
    #swagger.description = 'Esta ruta trae todos los submensajes registrados en el sistema.'
    #swagger.security = [{ "bearerAuth": [] }]
    */
    subMessageController.getAllSubMessages(req, res));
    subMessageRoutes.get("/getOne/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor"]), (req, res) => 
    /*
    #swagger.path = '/subMessages/getOne/{id}'
    #swagger.tags = ['SubMessage']
    #swagger.description = 'Esta ruta obtiene un submensaje específico por su ID, incluyendo su mensaje padre y sus submensajes hijos si los tiene.'
    #swagger.security = [{ "bearerAuth": [] }]
    */
    subMessageController.getOneSubMessage(req, res));
    subMessageRoutes.post("/create/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor"]), (req, res) => 
    /*
    #swagger.path = '/subMessages/create/{id}'
    #swagger.tags = ['SubMessage']
    #swagger.description = 'Esta ruta crea un nuevo submensaje y lo asocia con el mensaje especificado por ID.'
    #swagger.security = [{ "bearerAuth": [] }]
    */
    subMessageController.createSubMessage(req, res));
    subMessageRoutes.put("/update/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor"]), (req, res) => 
    /*
    #swagger.path = '/subMessages/update/{id}'
    #swagger.tags = ['SubMessage']
    #swagger.description = 'Esta ruta actualiza un submensaje específico, permitiendo modificar sus datos y la relación con su mensaje padre.'
    #swagger.security = [{ "bearerAuth": [] }]
    */
    subMessageController.updateSubMessage(req, res));
    subMessageRoutes.delete("/softDelete/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor"]), (req, res) => 
    /*
      #swagger.path = '/subMessages/softDelete/{id}'
      #swagger.tags = ['SubMessage']
      #swagger.description = 'Realiza un borrado lógico de un SubMensaje específico'
      #swagger.parameters['id'] = { description: 'ID de un sub mensaje a eliminar' }
      #swagger.security = [{
        "bearerAuth": []
      }]
    */
    subMessageController.softDeleteSubMessage(req, res));
    subMessageRoutes.put("/recover/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor"]), (req, res) => 
    /*
      #swagger.path = '/subMessages/recover/{id}'
      #swagger.tags = ['SubMessage']
      #swagger.description = 'Recupera un SubMensaje previamente eliminado lógicamente, cambiando su estado a no eliminado.'
      #swagger.parameters['id'] = { description: 'ID del sub mensaje a recuperar' }
      #swagger.security = [{ "bearerAuth": [] }]
    */
    subMessageController.recoverSubMessage(req, res));
    return subMessageRoutes;
};
exports.subMessageRouter = subMessageRouter;
