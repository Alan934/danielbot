"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericRoutes = void 0;
const express_1 = require("express");
const controllerGenerics_1 = require("./controllerGenerics");
const schemes_middleware_1 = require("../middlewares/schemes.middleware");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleProtectionMiddleware_1 = require("../middlewares/roleProtectionMiddleware");
/**
 * Crea rutas genéricas para operaciones CRUD de entidades utilizando Express y TypeORM.
 * @param {EntityTarget<T>} entity - El tipo de entidad que se gestionará.
 * @param {z.AnyZodObject} schema - El esquema de validación para las solicitudes de la entidad.
 * @returns {Router} Un enrutador Express configurado para manejar las operaciones CRUD de la entidad especificada.
 */
const genericRoutes = (entity, entityConstructor, dtoConstructor, schema) => {
    const genericRouter = (0, express_1.Router)();
    const genericController = new controllerGenerics_1.GenericController(entity, entityConstructor, dtoConstructor);
    // Ruta para obtener todas las entidades
    genericRouter.get("/", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor", "empleado"]), (0, schemes_middleware_1.validateQuery)(schema, true), (req, res) => 
    /*
      #swagger.tags = ['Generic']
      #swagger.path = '/{entidad}/'
      #swagger.summary = 'Obtener todos los registros de la entidad'
      #swagger.parameters["entidad"] = {
        in: "path",
        type: "string",
        enum: ["enterprises", "clients", "messages", "flows", "plans"]
      }
      #swagger.parameters['page'] = {
          in: 'query',
          name: 'page',
          description: 'Número de página.',
          type: 'number'
        }
      #swagger.security = [{
        "bearerAuth": []
      }]
    */
    genericController.getAll(req, res));
    // Ruta para obtener todas las entidades, incluidas las eliminadas
    genericRouter.get("/getAllDeleted/", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin"]), (0, schemes_middleware_1.validateSchema)(schema, true), (req, res) => 
    /*
      #swagger.tags = ['Generic']
      #swagger.path = '/{entidad}/getAllDeleted/'
      #swagger.summary = 'Obtener todos los registros con baja lógica de la entidad'
      #swagger.parameters["entidad"] = {
        in: "path",
        type: "string",
        enum: ["enterprises", "clients", "messages", "flows", "plans"]
      }
      #swagger.parameters['page'] = {
        in: 'query',
        name: 'page',
        description: 'Número de página.',
        type: 'number'
      }
      #swagger.security = [{
        "bearerAuth": []
      }]
    */
    genericController.getAllDeleted(req, res));
    // Ruta para obtener una entidad por su ID
    genericRouter.get("/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor", "empleado"]), (req, res, next) => {
        if (typeof req.params.id === "string") {
            return next("route");
        }
        /*
        #swagger.tags = ['Generic']
        #swagger.path = '/{entidad}/{id}'
        #swagger.summary = 'Obtener entidad por su id'
        #swagger.parameters["entidad"] = {
            in: "path",
            type: "string",
            enum: ["enterprises", "clients", "messages", "flows", "plans"]
          }
        #swagger.parameters['id'] = {
          in: 'path',
          name: 'id',
          description: 'ID de la entidad',
          required: true,
          type: 'string'
        }
        #swagger.security = [{
          "bearerAuth": []
        }]
      */
        genericController.getById(req, res);
    });
    // Ruta para crear una nueva entidad
    genericRouter.post("/", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin"]), (0, schemes_middleware_1.validateSchema)(schema), (req, res) => 
    /*
    #swagger.tags = ['Generic']
    #swagger.path = '/{entidad}/'
    #swagger.summary = 'Crear una nueva entidad'
    #swagger.parameters["entidad"] = {
        in: "path",
        type: "string",
        enum: ["enterprises", "clients", "plans"]
      }
    #swagger.parameters['body'] = {
      in: 'body',
      description: '✅ Utilizar el body correspondiente a la entidad elegida ✅',
      schema: { $ref: '#/definitions/Generics' }
    }
    #swagger.security = [{
      "bearerAuth": []
    }] */
    genericController.create(req, res));
    // Ruta para actualizar una entidad por su ID
    genericRouter.patch("/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin", "redactor"]), (0, schemes_middleware_1.validateSchema)(schema, true), (req, res) => 
    /*
    #swagger.tags = ['Generic']
    #swagger.path = '/{entidad}/{id}'
    #swagger.summary = 'Actualizar una entidad por su id'
    #swagger.parameters["entidad"] = {
        in: "path",
        type: "string",
        enum: [ "clients", "messages", "plans"]
      }
    #swagger.parameters['id'] = {
      in: 'path',
      name: 'id',
      description: 'ID de la entidad',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: '✅ Utilizar el body correspondiente a la entidad elegida ✅',
      schema: { $ref: '#/definitions/Generics' }
    }
    #swagger.security = [{
      "bearerAuth": []
    }] */
    genericController.update(req, res));
    // Ruta para eliminar una entidad por su ID
    genericRouter.delete("/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin"]), (req, res) => 
    /*
    #swagger.tags = ['Generic']
    #swagger.path = '/{entidad}/{id}'
    #swagger.summary = 'Eliminació por id'
    #swagger.parameters["entidad"] = {
        in: "path",
        type: "string",
        enum: ["enterprises", "clients", "messages", "flows", "plans"]
      }
    #swagger.parameters['id'] = {
      in: 'path',
      name: 'id',
      description: 'ID de la entidad',
      required: true,
      type: 'string'
    }
    #swagger.security = [{
      "bearerAuth": []
      }]
  */
    genericController.delete(req, res));
    // Ruta para eliminar lógicamente una entidad por su ID
    genericRouter.delete("/logicDelete/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin"]), (req, res) => 
    /*
    #swagger.tags = ['Generic']
    #swagger.path = '/{entidad}/logicDelete/{id}'
    #swagger.summary = 'Eliminación lógica una entidad por su id'
    #swagger.parameters["entidad"] = {
        in: "path",
        type: "string",
        enum: ["enterprises", "clients", "messages", "flows", "plans"]
      }
    #swagger.parameters['id'] = {
      in: 'path',
      name: 'id',
      description: 'ID de la entidad',
      required: true,
      type: 'string'
    }
    #swagger.security = [{
        "bearerAuth": []
      }]
  */
    genericController.logicDelete(req, res));
    // Ruta para restaurar una entidad eliminada lógicamente por su ID
    genericRouter.patch("/restore/:id", authMiddleware_1.authMiddleware, (0, roleProtectionMiddleware_1.checkRoleAuth)(["admin"]), (req, res) => 
    /*
    #swagger.tags = ['Generic']
    #swagger.path = '/{entidad}/restore/{id}'
    #swagger.summary = 'Restaurar una entidad eliminada lógicamente por su id'
    #swagger.parameters["entidad"] = {
        in: "path",
        type: "string",
        enum: ["enterprises", "clients", "messages", "flows", "plans"]
      }
    #swagger.parameters['id'] = {
      in: 'path',
      name: 'id',
      description: 'ID de la entidad',
      required: true,
      type: 'string'
    }
    #swagger.security = [{
      "bearerAuth": []
    }] */
    genericController.restoreLogicDeleted(req, res));
    return genericRouter;
};
exports.genericRoutes = genericRoutes;
