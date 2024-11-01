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
exports.GenericController = void 0;
const repositoryGenerics_1 = require("./repositoryGenerics");
const types_1 = require("../types");
const index_1 = require("../utils/index");
const config_1 = require("../config");
const processSorting_1 = require("../utils/processSorting");
const jwt_1 = require("../utils/jwt");
const errorsHandler_1 = require("../utils/errorsHandler");
const repositories_1 = require("../repositories");
/**
 * Clase Controlador para trabajar con cualquier entidad que herede de Base
 */
class GenericController {
    /**
     * Crea una instancia de GenericController.
     * @param {GenericRepository<T>} repository - Instancia de GenericRepository
     */
    constructor(entity, entityConstructor, dtoConstructor) {
        this.repository = new repositoryGenerics_1.GenericRepository(entity);
        this.entityConstructor = entityConstructor;
        this.dtoConstructor = dtoConstructor;
    }
    /**
     * Obtiene el ID del Enterprise que realizó la solicitud, si fuere necesario para la entidad.
     * @param {Request} req - El objeto de solicitud Express.
     * @returns - El ID del Enterprise que realizó la solicitud (si se requiere) o undefined.
     */
    getEnterpriseId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileRepository = new repositories_1.ProfileRepository();
            var profile;
            const propertiesOfEntity = this.repository.metadata.columns.map((column) => column.propertyName);
            if (propertiesOfEntity.includes("enterprise")) {
                profile = yield (0, jwt_1.getUserByJWT)(req);
                if (profile instanceof types_1.CustomError) {
                    return (0, errorsHandler_1.handleErrors)(profile, res);
                }
            }
            const profileId = profile ? profile.sub : undefined;
            var enterpriseId;
            if (profileId && profileRepository) {
                const profileEntity = yield profileRepository.findOneProfileWithEnterprise(profileId);
                enterpriseId = profileEntity === null || profileEntity === void 0 ? void 0 : profileEntity.enterprise.id;
                return enterpriseId;
            }
            return undefined;
        });
    }
    /**
     * Maneja la solicitud para obtener todos los registros de entidades.
     * @param {Request} req - El objeto de solicitud Express.
     * @param {Response} res - El objeto de respuesta Express.
     */
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let orderParams = {};
                const idEnterprise = yield this.getEnterpriseId(req, res);
                // Make a copy of the query data to avoid modifying the original object
                const queryData = Object.assign({}, req.query);
                const orderBy = req.query.orderBy;
                if (orderBy) {
                    orderParams = (0, processSorting_1.processSorting)(orderBy);
                }
                // Remove orderBy & page from queryData if they exist, this avoid to filter by these fields
                delete queryData.orderBy;
                delete queryData.page;
                // Paginación
                const page = parseInt(req.query.page) || 1;
                const entities = yield this.repository.findAllEntities(queryData, page, orderParams, idEnterprise);
                const entitiesDTO = entities.map((entity) => {
                    return (0, index_1.toDtoFromEntity)(this.dtoConstructor, entity);
                });
                res.json(Object.assign(Object.assign({}, (0, index_1.getPagingData)(entitiesDTO, page, config_1.limit)), { entitiesDTO }));
                return;
            }
            catch (error) {
                (0, errorsHandler_1.handleErrors)(error, res);
            }
        });
    }
    /**
     * Esta función recupera todas las entidades activas y eliminadas logicamnete y maneja cualquier
     * error que ocurra en el proceso.
     * @param {Request} req: el parámetro `req` es un objeto que representa la solicitud HTTP realizada al
     * servidor. Es una instancia de la clase `Request` de Express, que proporciona información como el
     * método de solicitud, encabezados, parámetros de consulta y cuerpo.
     * @param {Response} res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar el
     * HTTP de respuesta al cliente. Es una instancia de la clase `Response` de Express, que proporciona
     * métodos para configurar el código de estado de respuesta, los encabezados y el cuerpo. En este
     * fragmento de código, se utiliza para enviar respuestas en formato JSON
     * @returns una lista de entidades eliminadas.
     */
    getAllDeleted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let orderParams = {};
                const orderBy = req.query.orderBy;
                if (orderBy) {
                    orderParams = (0, processSorting_1.processSorting)(orderBy);
                }
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const queryData = Object.assign({}, req.query);
                const page = parseInt(req.query.page) || 1;
                const entities = yield this.repository.findAllDeletedEntities(queryData, page, orderParams, idEnterprise);
                const entitiesDTO = entities.map((entity) => {
                    return (0, index_1.toDtoFromEntity)(this.dtoConstructor, entity);
                });
                res.json(Object.assign(Object.assign({}, (0, index_1.getPagingData)(entitiesDTO, page, config_1.limit)), { entitiesDTO }));
                return;
            }
            catch (error) {
                (0, errorsHandler_1.handleErrors)(error, res);
            }
        });
    }
    /**
     * Esta función maneja una solicitud para recuperar una entidad por su ID, devolviendo la entidad
     * si se encuentra o un mensaje de error si no.
     * @param {Request} req: el parámetro `req` es un objeto que representa la solicitud HTTP realizada al
     * servidor. Es una instancia de la clase `Request` de Express, que proporciona información como el
     * método de solicitud, encabezados, parámetros de consulta y cuerpo.
     * @param {Response} res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar el
     * HTTP de respuesta al cliente. Es una instancia de la clase `Response` de Express, que proporciona
     * métodos para configurar el código de estado de respuesta, los encabezados y el cuerpo. En este
     * fragmento de código, se utiliza para enviar respuestas en formato JSON
     * @returns la entidad encontrada por la identificación por el id dado o un mensaje de error.
     */
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const entity = yield this.repository.findByIdEntity(id, idEnterprise);
                res.json((0, index_1.toDtoFromEntity)(this.dtoConstructor, entity));
            }
            catch (error) {
                (0, errorsHandler_1.handleErrors)(error, res);
            }
        });
    }
    /**
     * Esta función valida el body de la request en funcion del esquema de Zod, llama al servicio para que
     * guarde la entidad en función de los datos del body ya validados y devuelve la entidad guardada.
     * En caso de errores en cada paso, detiene la ejecucion de la funcion y devuelve una respuesta JSON
     * con el mensaje de error
     * @param {Request} req: el parámetro `req` es un objeto que representa la solicitud HTTP realizada al
     * servidor. Es una instancia de la clase `Request` de Express, que proporciona información como el
     * método de solicitud, encabezados, parámetros de consulta y cuerpo.
     * @param {Response} res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar el
     * HTTP de respuesta al cliente. Es una instancia de la clase `Response` de Express, que proporciona
     * métodos para configurar el código de estado de respuesta, los encabezados y el cuerpo. En este
     * fragmento de código, se utiliza para enviar respuestas en formato JSON
     * @returns los datos de la entidad creada o, si ocurre, un mensaje de error diferente en base a donde
     * se produjo el error
     */
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const entity = (0, index_1.toEntityFromDto)(this.entityConstructor, req.body);
                const createdEntity = yield this.repository.createEntity(entity, idEnterprise);
                const createdDto = (0, index_1.toDtoFromEntity)(this.dtoConstructor, createdEntity);
                res.status(201).json(createdDto);
            }
            catch (error) {
                (0, errorsHandler_1.handleErrors)(error, res);
            }
        });
    }
    /**
     * Esta función valida el body de la request en funcion del esquema de Zod, llama al servicio para que
     * actualice la entidad en función del parametro del id y los datos del body ya validados y devuelve la
     * entidad actualizada. En caso de errores en cada paso, detiene la ejecucion de la funcion y devuelve
     * una respuesta JSON con el mensaje de error
     * @param {Request} req: el parámetro `req` es un objeto que representa la solicitud HTTP realizada al
     * servidor. Es una instancia de la clase `Request` de Express, que proporciona información como el
     * método de solicitud, encabezados, parámetros de consulta y cuerpo.
     * @param {Response} res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar el
     * HTTP de respuesta al cliente. Es una instancia de la clase `Response` de Express, que proporciona
     * métodos para configurar el código de estado de respuesta, los encabezados y el cuerpo. En este
     * fragmento de código, se utiliza para enviar respuestas en formato JSON
     * @returns una respuesta JSON. Si hay un error de validación, devuelve un objeto JSON con un error
     * mensaje y un código de estado de 422. Si la entidad se actualiza correctamente, devuelve la
     * información actualizada de la entidad como objeto JSON. Si hay un error durante el proceso de
     * actualización, devuelve un objeto JSON con un mensaje de error y un código de estado basado en el
     * error.
     */
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const updatedEntity = yield this.repository.updateEntity(id, req.body, idEnterprise);
                if (updatedEntity instanceof types_1.CustomError) {
                    throw updatedEntity;
                }
                res.json(updatedEntity);
            }
            catch (error) {
                (0, errorsHandler_1.handleErrors)(error, res);
            }
        });
    }
    /**
     * Esta función maneja la eliminación fisica de una entidad en función de su ID y devuelve una respuesta
     * con status 201 o un mensaje de error diferente segun donde se produjo
     * @param {Request} req: el parámetro `req` es un objeto que representa la solicitud HTTP realizada al
     * servidor. Es una instancia de la clase `Request` de Express, que proporciona información como el
     * método de solicitud, encabezados, parámetros de consulta y cuerpo.
     * @param {Response} res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar el
     * HTTP de respuesta al cliente. Es una instancia de la clase `Response` de Express, que proporciona
     * métodos para configurar el código de estado de respuesta, los encabezados y el cuerpo. En este
     * fragmento de código, se utiliza para enviar respuestas en formato JSON
     * @returns Si la variable `entidad` es una instancia de `CustomError`, entonces una respuesta JSON con
     * el mensaje de error y el código de estado especificado en la instancia `CustomError`. De lo
     * contrario, una respuesta con status 204 si la eliminación se hace correctamente
     */
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.repository.deleteEntity(id);
                res.status(204).json("Successfully deleted entity").end();
            }
            catch (error) {
                (0, errorsHandler_1.handleErrors)(error, res);
            }
        });
    }
    /**
     * Esta función realiza la obtención del id por parametro y llama al servicio para realizar la baja
     * logica de la entidad
     * @param {Request} req: el parámetro `req` es un objeto que representa la solicitud HTTP realizada al
     * servidor. Es una instancia de la clase `Request` de Express, que proporciona información como el
     * método de solicitud, encabezados, parámetros de consulta y cuerpo.
     * @param {Response} res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar el
     * HTTP de respuesta al cliente. Es una instancia de la clase `Response` de Express, que proporciona
     * métodos para configurar el código de estado de respuesta, los encabezados y el cuerpo. En este
     * fragmento de código, se utiliza para enviar respuestas en formato JSON
     * @returns Si la variable `entidad` es una instancia de `CustomError`, entonces una respuesta JSON con
     * el mensaje de error y el código de estado especificado en la instancia `CustomError`. De lo
     * contrario, una respuesta con status 204 si la eliminación se hace correctamente
     */
    logicDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const deletedEntity = yield this.repository.logicDelete(id, idEnterprise);
                if (deletedEntity instanceof types_1.CustomError) {
                    throw deletedEntity;
                }
                res.status(204).json("The entity was correctly deleted logically").end();
            }
            catch (error) {
                (0, errorsHandler_1.handleErrors)(error, res);
            }
        });
    }
    /**
     * Esta funcion realiza la logica para restaurar una entidad eliminada lógicamente
     * @param {Request} req: el parámetro `req` es un objeto que representa la solicitud HTTP realizada al
     * servidor. Es una instancia de la clase `Request` de Express, que proporciona información como el
     * método de solicitud, encabezados, parámetros de consulta y cuerpo.
     * @param {Response} res - El parámetro `res` es el objeto de respuesta que se utiliza para enviar el
     * HTTP de respuesta al cliente. Es una instancia de la clase `Response` de Express, que proporciona
     * métodos para configurar el código de estado de respuesta, los encabezados y el cuerpo. En este
     * fragmento de código, se utiliza para enviar respuestas en formato JSON
     * @returns la entidad restaurada o un mensaje de error diferente dependiendo de donde ocurrió el error
     */
    restoreLogicDeleted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const restoredEntity = yield this.repository.restoreLogicDeleted(id, idEnterprise);
                if (restoredEntity instanceof types_1.CustomError) {
                    throw restoredEntity;
                }
                res.status(200).json(restoredEntity);
            }
            catch (error) {
                (0, errorsHandler_1.handleErrors)(error, res);
            }
        });
    }
}
exports.GenericController = GenericController;
