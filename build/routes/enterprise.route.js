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
exports.enterpriseRouter = void 0;
const routeGenerics_1 = require("../types/routeGenerics");
const entities_1 = require("../entities");
const schemas_1 = require("../schemas");
const enterprise_controller_1 = require("../controllers/enterprise.controller");
const enterprise_1 = require("../entities/enterprise");
const middlewares_1 = require("../middlewares");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleProtectionMiddleware_1 = require("../middlewares/roleProtectionMiddleware");
const enterpriseRouter = () => {
    const enterpriseRoutes = (0, routeGenerics_1.genericRoutes)(entities_1.Enterprise, entities_1.Enterprise, enterprise_1.EnterpriseDto, schemas_1.EnterpriseSchema);
    const enterpriseController = new enterprise_controller_1.EnterpriseController();
    enterpriseRoutes.get("/prueba", authMiddleware_1.authMiddleware, (0, middlewares_1.validateQuery)(schemas_1.EnterpriseSchema, true), (req, res) => 
    // #swagger.ignore = true
    enterpriseController.prueba(req, res));
    enterpriseRoutes.get("/getEnterpriseWithPricingPlan/:idEnterprise", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () { 
    /*
    #swagger.path = '/enterprises/getEnterpriseWithPricingPlan/{idEnterprise}'
    #swagger.tags = ['Enterprise']
    #swagger.description = 'Devuelve la empresa con la relación PricingPlan'
    #swagger.parameters['idEnterprise'] = {
      in: 'path',
      required: true,
      type: 'string',
    }
    #swagger.security = [{
      "bearerAuth": []
    }]
    */
    return enterpriseController.getEnterpriseWithPricingPlan(req, res); }));
    enterpriseRoutes.patch("/update/:idEnterprise", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin"]), (0, middlewares_1.validateSchema)(schemas_1.EnterpriseSchema, true), (req, res) => 
    /*
    #swagger.path = '/enterprises/update/{idEnterprise}'
    #swagger.tags = ['Enterprise']
    #swagger.parameters['body'] = {
                  in: 'body',
                  schema: { $ref: "#/definitions/EnterprisesUpdate" }
              }

    #swagger.security = [{
                      "bearerAuth": []
                  }]
   
   */
    enterpriseController.updateEnterprise(req, res));
    //enterpriseRoutes.delete("/:id", enterpriseController.delete);
    //enterpriseRoutes.delete("/logicDelete/:id", enterpriseController.logicDelete);
    //enterpriseRoutes.patch("/restore/:id", enterpriseController.restoreLogicDeleted);
    //enterpriseRoutes.get("/", enterpriseController.getAll);
    //enterpriseRoutes.get("/getAllDeleted/", enterpriseController.getAllDeleted);
    //enterpriseRoutes.get("/getById/:id", enterpriseController.getById);
    //enterpriseRoutes.post("/", enterpriseController.create);
    return enterpriseRoutes;
};
exports.enterpriseRouter = enterpriseRouter;
