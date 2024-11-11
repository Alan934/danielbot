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
exports.flowRouter = void 0;
const routeGenerics_1 = require("../types/routeGenerics");
const entities_1 = require("../entities");
const schemas_1 = require("../schemas");
const flow_dto_1 = require("../entities/flow/dtos/flow.dto");
const flow_controller_1 = require("../controllers/flow.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const middlewares_1 = require("../middlewares");
const roleProtectionMiddleware_1 = require("../middlewares/roleProtectionMiddleware");
// import { Router } from "express";
const flowRouter = () => {
    const flowRoutes = (0, routeGenerics_1.genericRoutes)(entities_1.Flow, entities_1.Flow, flow_dto_1.FlowDto, schemas_1.FlowSchema); // lo comenté porque funciona raro cuando se sobreescriben los endpoints
    // const flowRoutes = Router();
    const flowController = new flow_controller_1.FlowController();
    flowRoutes.get("/enterprise/:idEnterprise", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () { 
    /*
    #swagger.path = '/flows/enterprise/{idEnterprise}'
    #swagger.tags = ['Flow']
    #swagger.description = 'Devuelve los flujos a los que la empresa puede acceder debido a su plan de precios'
    #swagger.parameters['idEnterprise'] = {
      in: 'path',
      required: true,
      type: 'string',
    }

    #swagger.security = [{
      "bearerAuth": []
    }]
    */
    return flowController.getFlowsForPricingPlanAndIdEnterprise(req, res); }));
    flowRoutes.get("/forPricingPlan/:planId", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () { 
    /*
      #swagger.path = '/flows/forPricingPlan/{planId}'
      #swagger.tags = ['Flow']
      #swagger.description = 'Devuelve los flujos de un plan especificado'
      #swagger.parameters['planId'] = {
        in: 'path',
        required: true,
        type: 'string',
      }
      #swagger.security = [{
        "bearerAuth": []
      }]
      */
    return flowController.getFlowsForPricingPlan(req, res); }));
    flowRoutes.post("/create", authMiddleware_1.authMiddleware, (0, middlewares_1.validateSchema)(schemas_1.FlowSchema), (req, res) => 
    /*
      #swagger.path = '/flows/create'
      #swagger.tags = ['Flow']
      #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: "#/definitions/Flows" }
              }

      #swagger.security = [{
            "bearerAuth": []
          }]
    */
    flowController.createFlow(req, res));
    flowRoutes.patch("/update/:id", authMiddleware_1.authMiddleware, (0, middlewares_1.validateSchema)(schemas_1.FlowSchema, true), (req, res) => 
    /*
    #swagger.path = '/flows/update/{id}'
    #swagger.tags = ['Flow']
    #swagger.parameters['body'] = {
                  in: 'body',
                  schema: { $ref: "#/definitions/Flows" }
              }

    #swagger.security = [{
                      "bearerAuth": []
                  }]
   
   */
    flowController.updateFlow(req, res));
    flowRoutes.get("/getAllWithMessages", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor"]), (req, res) => 
    /*
    #swagger.path = '/flows/getAllWithMessages'
    #swagger.tags = ['Flow']
    #sagger.description = 'Esta ruta trae todos los flujos y su relación con mensajes. '
    #swagger.security = [{
                      "bearerAuth": []
                  }]
   
   */
    flowController.findAllFlowsWithMessages(req, res));
    flowRoutes.get("/getAll", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor"]), (req, res) => 
    /*
    #swagger.path = '/flows/getAll'
    #swagger.tags = ['Flow']
    #swagger.description = 'Esta ruta trae todos los flujos con sus mensajes y submensajes relacionados, incluyendo los submensajes hijos.'
    #swagger.security = [{ "bearerAuth": [] }]
    */
    flowController.getAllWithMessagesAndSubMessages(req, res));
    flowRoutes.get("/getOne/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor"]), (req, res) => 
    /*
    #swagger.path = '/flows/getOne/{id}'
    #swagger.tags = ['Flow']
    #swagger.description = 'Esta ruta trae un flujo específico, sus mensajes relacionados y los submensajes hasta los hijos de los submensajes.'
    #swagger.security = [{ "bearerAuth": [] }]
    */
    flowController.getOneWithMessagesAndSubMessages(req, res));
    // Soft delete de un flujo
    flowRoutes.delete("/softDelete/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor"]), (req, res) => 
    /*
      #swagger.path = '/flows/softDelete/{id}'
      #swagger.tags = ['Flow']
      #swagger.description = 'Realiza un borrado lógico de un flujo específico'
      #swagger.parameters['id'] = { description: 'ID del flujo a eliminar' }
      #swagger.security = [{
        "bearerAuth": []
      }]
    */
    flowController.softDeleteFlow(req, res));
    // flowRoutes.get("/", (req, res) => flowController.getAll(req, res));
    // flowRoutes.get("/getAllDeleted/", (req, res) => flowController.getAllDeleted(req, res));
    // flowRoutes.get("/getById/:id", (req, res) => flowController.getById(req, res));
    // flowRoutes.delete("/:id", (req, res) => flowController.delete(req, res));
    // flowRoutes.delete("/logicDelete/:id", (req, res) => flowController.logicDelete(req, res));
    // flowRoutes.patch("/restore/:id", (req, res) => flowController.restoreLogicDeleted(req, res));
    return flowRoutes;
};
exports.flowRouter = flowRouter;
