"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const routeGenerics_1 = require("../types/routeGenerics");
const entities_1 = require("../entities");
const profile_controller_1 = require("../controllers/profile.controller");
const schemas_1 = require("../schemas");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const middlewares_1 = require("../middlewares");
const roleProtectionMiddleware_1 = require("../middlewares/roleProtectionMiddleware");
const role_schema_1 = require("../schemas/role.schema");
const profileRouter = () => {
    const profileRoutes = (0, routeGenerics_1.genericRoutes)(entities_1.Profile, entities_1.Profile, entities_1.ProfileDTO, schemas_1.ProfileSchema);
    const profileController = new profile_controller_1.ProfileController();
    profileRoutes.post("/signUpWithUser", (0, middlewares_1.validateSchema)(schemas_1.AuthSchema.merge(schemas_1.EnterpriseSchema)), (req, res) => 
    /*
              #swagger.path = '/profiles/signUpWithUser'
              #swagger.tags = ['Profile']
              #swagger.description = 'Esta ruta permite registrar un profile y una empresa en el mismo endpoit'
              #swagger.parameters['body'] = {
                  in: 'body',
                  schema: { $ref: "#/definitions/SignUp" }
              }
          */
    profileController.signUpWithEnterprise(req, res));
    profileRoutes.post("/signUp", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin"]), (0, middlewares_1.validateSchema)(schemas_1.AuthSchema), (req, res) => 
    /*
#swagger.path = '/profiles/signUp'
#swagger.tags = ['Profile']
#swagger.description = 'Esta ruta es la que utilizará el administrador para crear perfiles en su empresa'

#swagger.parameters['body'] = {
  in: 'body',
  schema: { $ref: "#/definitions/Profiles" }
}

#swagger.security = [{
                      "bearerAuth": []
                  }]
  */
    profileController.signUp(req, res));
    profileRoutes.post("/signIn", (0, middlewares_1.validateSchema)(schemas_1.ProfileSchema), (req, res) => 
    /*
            #swagger.path = '/profiles/signIn'
            #swagger.tags = ['Profile']
            #swagger.description = 'Retorna el token del profile'
            #swagger.parameters['body'] = {
                in: 'body',
                schema: { $ref: "#/definitions/SignIn" }
            }

      #swagger.responses[200] = {
            schema: { $ref: '#/definitions/ProfileResponse' }
      }
        */
    profileController.signIn(req, res));
    profileRoutes.get("/allProfiles", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor", "empleado"]), (req, res) => 
    /*
          #swagger.path = '/profiles/allProfiles'
          #swagger.tags = ['Profile']
          #swagger.description = 'Retorna los perfiles asociados a la empresa obtenida desde el token'
          }
          #swagger.security = [{
                      "bearerAuth": []
                  }]
  */
    profileController.getAllProfile(req, res));
    profileRoutes.get("/getById/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor", "empleado"]), (req, res) => 
    /*
          #swagger.path = '/profiles/getById/{id}'
          #swagger.tags = ['Profile']
          #swagger.description = 'Busca el perfil por el id y lo retorna siempre y cuando esté asociado a la empresa obtenida desde el token'
  
          #swagger.security = [{
                      "bearerAuth": []
                  }]
  */
    profileController.getProfileById(req, res));
    profileRoutes.delete("/deleteProfile/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin"]), (req, res) => 
    /*
          #swagger.path = '/profiles/deleteProfile/{id}'
          #swagger.tags = ['Profile']
          #swagger.description = 'Eliminación física del profile'
          }
          #swagger.security = [{
                      "bearerAuth": []
                  }]
  */
    profileController.deleteProfile(req, res));
    profileRoutes.patch("/logicDeleteProfile/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin"]), (req, res) => 
    /*
          #swagger.path = '/profiles/logicDeleteProfile/{id}'
          #swagger.tags = ['Profile']
          #swagger.description = 'Eliminación lógica del profile'
          }
          #swagger.security = [{
                      "bearerAuth": []
                  }]
  */
    profileController.logicDeleteProfile(req, res));
    profileRoutes.patch("/updateProfile/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor", "empleado"]), (0, middlewares_1.validateSchema)(schemas_1.AuthSchema, true), (req, res) => 
    /*
          #swagger.path = '/profiles/updateProfile/{id}'
          #swagger.tags = ['Profile']
          #swagger.description = 'Actualización del profile'
          }
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: "#/definitions/Profiles" }
    }
          #swagger.security = [{
                      "bearerAuth": []
                  }]
  */
    profileController.updateProfile(req, res));
    profileRoutes.patch("/updateRoleProfile/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin"]), (0, middlewares_1.validateSchema)(role_schema_1.RoleSchema), (req, res) => 
    /*
          #swagger.path = '/profiles/updateRoleProfile/{id}'
          #swagger.tags = ['Profile']
          #swagger.description = 'Actualización del rol del profile'
          }
    #swagger.parameters['body'] = {
        in: 'body',
         schema: {
              role: {
                "@enum": ["admin", "redactor", "empleado"],
              },
          }
    }
          #swagger.security = [{
                      "bearerAuth": []
                  }]
  */
    profileController.updateRoleProfile(req, res));
    // profileRoutes.get("/", (req, res) => profileController.getAll(req, res));
    // profileRoutes.get("/getAllDeleted/", (req, res) => profileController.getAllDeleted(req, res));
    // profileRoutes.get("/getById/:id", (req, res) => profileController.getById(req, res));
    // profileRoutes.post("/", (req, res) => profileController.create(req, res));
    // profileRoutes.patch("/:id", (req, res) => profileController.update(req, res));
    // profileRoutes.delete("/:id", (req, res) => profileController.delete(req, res));
    // profileRoutes.delete("/logicDelete/:id", (req, res) => profileController.logicDelete(req, res));
    // profileRoutes.patch("/restore/:id", (req, res) => profileController.restoreLogicDeleted(req, res));
    return profileRoutes;
};
exports.profileRouter = profileRouter;
