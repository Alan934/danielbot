"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const controllers_1 = require("../controllers");
const routeGenerics_1 = require("../types/routeGenerics");
const entities_1 = require("../entities");
const schemas_1 = require("../schemas");
const message_1 = require("../entities/message");
const middlewares_1 = require("../middlewares");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleProtectionMiddleware_1 = require("../middlewares/roleProtectionMiddleware");
const messageRouter = () => {
    const messageRoutes = (0, routeGenerics_1.genericRoutes)(entities_1.Message, entities_1.Message, message_1.MessageDto, schemas_1.MessageSchema);
    const messageController = new controllers_1.MessageController();
    messageRoutes.get("/getAllWithFlow", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor"]), (req, res) => 
    /*
    #swagger.path = '/messages/getAllWithFlow'
    #swagger.tags = ['Message']
    #sagger.description = 'Esta ruta trae todos los mensajes y su relación con flow. Si se prefiere no traer su relación con flow, usar la ruta genérica '/messages/''
    #swagger.security = [{
                      "bearerAuth": []
                  }]
   
   */
    messageController.findAllMessages(req, res));
    messageRoutes.get("/getAllMain", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor"]), (req, res) => 
    /*
    #swagger.path = '/messages/getAllWithFlow'
    #swagger.tags = ['Message']
    #sagger.description = 'Esta ruta trae todos los mensajes Padres con sus Hijos '/messages/''
    #swagger.security = [{
                      "bearerAuth": []
                  }]
   
   */
    messageController.findAllMainMessages(req, res));
    messageRoutes.post("/create", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor"]), (0, middlewares_1.validateSchema)(schemas_1.MessageSchema), (req, res) => 
    /*
    #swagger.path = '/messages/create/'
    #swagger.tags = ['Message']
    #sagger.description = 'Esta ruta crea un mensaje y su relación con flow.'
    #swagger.parameters['body'] = {
                  in: 'body',
                  schema: { $ref: "#/definitions/Messages" }
              }

    #swagger.security = [{
                      "bearerAuth": []
                  }]
   
   */
    messageController.createMessage(req, res));
    messageRoutes.get("/getMessageAllDeleted", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin"]), (req, res) => 
    /*
    #swagger.path = '/messages/getMessageAllDeleted'
    #swagger.tags = ['Message']
    #sagger.description = 'Esta ruta trae todos los mensajes y su relación con flow, incluyendo los que están dados de baja. Si se prefiere no traer su relación con flow, usar la ruta genérica '/messages/getAllDeleted/'
    #swagger.security = [{
                      "bearerAuth": []
                  }]
   
   */
    messageController.getMessagesAllDeleted(req, res));
    messageRoutes.get("/getMessageById/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor", "empleado"]), (req, res) => 
    /*
    #swagger.path = '/messages/getMessageAllDeleted/{id}'
    #swagger.tags = ['Message']
    #sagger.description = 'Esta ruta traeun mensaje y su relación con flow. Si se prefiere no traer su relación con flow, usar la ruta genérica '/messages/getOne/:id''
    #swagger.security = [{
                      "bearerAuth": []
                  }]
   
   */
    messageController.getMessageById(req, res));
    messageRoutes.get("/findAllMessagesByNumOrder", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor", "cliente"]), (req, res) => 
    /*
    #swagger.path = '/messages/findAllMessagesByNumOrder'
    #swagger.tags = ['Message']
    #sagger.description = 'Esta ruta trae todos los mensajes con un número de orden específico dentro de un flujo y una empresa.'
    #swagger.parameters['idFlow'] = {
        in: 'query',
        name: 'idFlow',
        required: true,
        schema: {
          type: 'string'
        },
        description: 'Id de flow'
      }
    #swagger
      #swagger.parameters['numOrder'] = {
        in: 'query',
        name: 'numOrder',
        required: true,
        schema: {
          type: 'integer'
        },
        description: 'Número de orden del mensaje'
      }
    #swagger.security = [{
          "bearerAuth": []
        }]
   */
    messageController.findAllMessagesByNumOrder(req, res));
    messageRoutes.get("/findAllMessagesByNumOrderAndFlowByName", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor", "cliente"]), (req, res) => 
    /*
    #swagger.path = '/messages/findAllMessagesByNumOrderAndFlowByName'
    #swagger.tags = ['Message']
    #sagger.description = 'Esta ruta trae todos los mensajes con un número de orden específico dentro de un flujo obtenido por el nombre y una empresa.'
    #swagger.parameters['nameFlow'] = {
        in: 'query',
        name: 'nameFlow',
        required: true,
        schema: {
          type: 'string'
        },
        description: 'Nombre del flow'
      }
    #swagger
      #swagger.parameters['numOrder'] = {
        in: 'query',
        name: 'numOrder',
        required: true,
        schema: {
          type: 'integer'
        },
        description: 'Número de orden del mensaje'
      }
    #swagger.security = [{
          "bearerAuth": []
        }]
   */
    messageController.findAllMessagesByNumOrderAndFlowByName(req, res));
    messageRoutes.get("/AllWithChildren", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor"]), (req, res) => 
    /*
    #swagger.path = '/messages/AllWithChildren'
    #swagger.tags = ['Message']
    #swagger.description = 'Esta ruta trae todos los mensajes junto con sus submensajes y sus respectivos submensajes hijos.'
    #swagger.security = [{ "bearerAuth": [] }]
    */
    messageController.getMessagesWithSubMessages(req, res));
    messageRoutes.get("/getOneWithChildren/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor", "empleado"]), (req, res) => 
    /*
    #swagger.path = '/messages/getOneWithChildren/{id}'
    #swagger.tags = ['Message']
    #swagger.description = 'Esta ruta trae un mensaje específico y sus submensajes, incluyendo los submensajes hijos.'
    #swagger.security = [{ "bearerAuth": [] }]
    */
    messageController.getOneWithSubMessages(req, res));
    messageRoutes.put("/update/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor", "empleado"]), (req, res) => 
    /*
    #swagger.path = '/messages/update/{id}'
    #swagger.tags = ['Message']
    #swagger.description = 'Esta ruta actualiza un mensaje específico junto con sus detalles. Se puede actualizar la relación con flow y enterprise si es necesario.'
    #swagger.security = [{ "bearerAuth": [] }]
    */
    messageController.updateMessage(req, res));
    messageRoutes.delete("/softDelete/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor"]), (req, res) => 
    /*
      #swagger.path = '/messages/softDelete/{id}'
      #swagger.tags = ['Message']
      #swagger.description = 'Realiza un borrado lógico de un Mensaje específico'
      #swagger.parameters['id'] = { description: 'ID del mensaje a eliminar' }
      #swagger.security = [{
        "bearerAuth": []
      }]
    */
    messageController.softDeleteMessage(req, res));
    // messageRoutes.get("/messages-with-submessages", authMiddleware, funcionando con metodo comentado de controller
    // checkRoleAuth(["admin", "redactor"]), MessageController.getMessagesWithSubMessages);
    // messageRoutes.patch("/:id", (req, res) => messageController.update(req, res));
    // messageRoutes.delete("/:id", (req, res) => messageController.delete(req, res));
    // messageRoutes.delete("/logicDelete/:id", (req, res) => messageController.logicDelete(req, res));
    // messageRoutes.patch("/restore/:id", (req, res) => messageController.restoreLogicDeleted(req, res));
    return messageRoutes;
};
exports.messageRouter = messageRouter;
