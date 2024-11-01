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
exports.GenericRepository = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../data-source");
const types_1 = require("../types");
const config_1 = require("../config");
const errorHandler_1 = require("../repositories/errorHandler");
const entities_1 = require("../entities");
class GenericRepository extends typeorm_1.Repository {
    constructor(entity) {
        super(entity, data_source_1.AppDataSource.manager);
    }
    /**
     * La función `findAllEntities` es una función asincrónica que toma `whereOptions` y `opciones` como
     * parámetros y devuelve una promesa que se resuelve en una matriz de entidades o un objeto
     * 'CustomError`.
     * @param whereOptions - El parámetro `whereOptions` es un objeto que especifica las condiciones para
     * filtrar las entidades a recuperar. Puede incluir atributos y sus correspondientes valores para
     * comparar en la consulta de la base de datos.
     * @param {FindOptions} options - El parámetro `opciones` es un objeto que contiene información
     * adicional opciones para la consulta. Estas opciones pueden incluir cosas como clasificación,
     * paginación e incluir/excluir ciertos atributos del conjunto de resultados.
     * @returns una Promesa que se resuelve en una matriz de entidades de tipo T o en un objeto
     * CustomError
     */
    findAllEntities(queryOptions, page, orderBy, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                queryOptions = idEnterprise
                    ? Object.assign(Object.assign({}, queryOptions), { enterprise: { id: idEnterprise } }) : queryOptions;
                const entities = yield this.find({
                    where: Object.assign({}, queryOptions),
                    skip: (page - 1) * config_1.limit,
                    take: config_1.limit,
                    order: orderBy,
                });
                return entities;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    /**
     * La función `findAllDeletedEntities` es una función asincrónica que recupera todas las entidades
     * eliminadas, basadas en las opciones proporcionadas y devuelve una matriz de entidades o un objeto
     * `CustomError`.
     * @param {FindOptions} options - El parámetro `options` es un objeto que contiene información
     * adicional para encontrar entidades eliminadas. Puede incluir propiedades como "where", "order",
     * `limit` y `offset` para especificar las condiciones y el orden de los resultados de la consulta.
     * @returns La función `findAllDeletedEntities` devuelve una promesa que se resuelve en una matriz de
     * entidades `T[]` o un objeto `CustomError`.
     */
    findAllDeletedEntities(queryOptions, page, orderBy, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                queryOptions = idEnterprise
                    ? Object.assign(Object.assign({}, queryOptions), { enterprise: { id: idEnterprise } }) : queryOptions;
                return yield this.find({
                    where: queryOptions,
                    withDeleted: true,
                    skip: (page - 1) * config_1.limit,
                    take: config_1.limit,
                    order: orderBy,
                });
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    /**
     * Esta función encuentra una entidad por su ID y la devuelve, o devuelve un error personalizado si
     * la entidad no se encuentra o se produce un error.
     * @param {string} id - El parámetro `id` es una cadena que representa el identificador único de
     * la entidad que deseas encontrar.
     * @returns una Promesa que se resuelve en una instancia de tipo T o en un objeto CustomError.
     */
    findByIdEntity(idEntity, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var findOptionsWhere = { id: idEntity };
                if (idEnterprise) {
                    findOptionsWhere = Object.assign(Object.assign({}, findOptionsWhere), { enterprise: { id: idEnterprise } });
                }
                const entity = yield this.findOneBy(findOptionsWhere);
                if (entity) {
                    return entity;
                }
                else {
                    throw new types_1.CustomError("Entity not found", 404);
                }
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    /**
     * Esta función crea una entidad utilizando los datos proporcionados y devuelve la entidad creada
     * o un error personalizado.
     * @param data - El parámetro `data` es de tipo `MakeNullishOptional<T["_creationAttributes"]>` y
     * refiere los datos de la entidad que desea ser guardada
     * @returns La función `createEntity` devuelve una Promesa que se resuelve en una instancia de
     * la entidad `T` o una instancia de `CustomError`.
     */
    createEntity(data, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uniqueMetadata = this.metadata.uniques[0];
                if (uniqueMetadata.givenColumnNames) {
                    for (const col of uniqueMetadata.givenColumnNames) {
                        const alreadyExists = yield this.findOneBy({
                            [col]: data[col],
                        });
                        if (alreadyExists) {
                            throw new types_1.CustomError(`Entity with same ${col.toString()} already exists`, 409);
                        }
                    }
                }
                var modifiedEntity;
                if (Object.keys(this.metadata.propertiesMap).includes("enterprise")) {
                    modifiedEntity = Object.assign(Object.assign({}, data), { enterprise: undefined });
                }
                else {
                    modifiedEntity = Object.assign({}, data);
                }
                if (idEnterprise && "enterprise" in modifiedEntity) {
                    const enterpriseRepository = new GenericRepository(entities_1.Enterprise);
                    modifiedEntity.enterprise = yield enterpriseRepository.findByIdEntity(idEnterprise);
                }
                return yield this.save(modifiedEntity);
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    /**
     * La función `updateEntity` actualiza una entidad con el ID y los datos proporcionados, devolviendo
     * la información actualizada de la entidad o un error personalizado.
     * @param {string} id - El parámetro `id` es una cadena que representa el identificador único de la
     * entidad que desea actualizar.
     * @param data - El parámetro `data` es de tipo `Partial<T>`, lo que significa que es un objeto que
     * contiene propiedades parciales de tipo `T`. La "T" representa el tipo de entidad que se está
     * actualizando.
     * @returns una Promesa que se resuelve en una instancia de tipo T (la entidad actualizada) o en una
     * instancia de CustomError.
     */
    updateEntity(id, data, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var findOptionsWhere = { id: id };
                if (idEnterprise) {
                    findOptionsWhere = Object.assign(Object.assign({}, findOptionsWhere), { enterprise: { id: idEnterprise } });
                }
                const entityUpdated = yield this.update(findOptionsWhere, data);
                if (entityUpdated.affected) {
                    const restoredEntity = yield this.findByIdEntity(id);
                    return restoredEntity;
                }
                else {
                    throw new types_1.CustomError("Entity not found", 404);
                }
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    /**
     * La función `deleteEntity` es una función asincrónica que elimina una entidad de una base de datos
     * basada en el ID proporcionado y devuelve el número de filas afectadas o un objeto error
     * personalizado.
     * @param {string} id - El parámetro `id` es una cadena que representa el identificador único de la
     * entidad que necesita ser eliminada.
     * @returns La función `deleteEntity` devuelve una `Promise` que se resuelve en un número o en un
     * `Error personalizado`.
     */
    deleteEntity(id, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var findOptionsWhere = { id: id };
                if (idEnterprise) {
                    findOptionsWhere = Object.assign(Object.assign({}, findOptionsWhere), { enterprise: { id: idEnterprise } });
                }
                const result = yield this.delete(findOptionsWhere);
                if (result.affected) {
                    return result.raw;
                }
                else {
                    throw new types_1.CustomError("Entity not found", 404);
                }
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    /**
     * La función logicDelete elimina de forma logica una entidad de una tabla de base de datos según su
     * ID y devuelve el número de filas afectadas o un objeto de error personalizado.
     * @param {string} id - El parámetro `id` es una cadena que representa el identificador único de la
     * entidad que necesita ser eliminada.
     * @returns La función devuelve una `Promise` que se resuelve en un número o en un
     * `Error personalizado`.
     */
    logicDelete(id, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var findOptionsWhere = { id: id };
                if (idEnterprise) {
                    findOptionsWhere = Object.assign(Object.assign({}, findOptionsWhere), { enterprise: { id: idEnterprise } });
                }
                const result = yield this.softDelete(findOptionsWhere);
                if (result.affected) {
                    return result.raw;
                }
                else {
                    throw new types_1.CustomError("Entity not found", 404);
                }
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    /**
     * La función `restoreLogicDeleted` restaura una entidad eliminada logicamente por su ID y devuelve
     * la entidad restaurada o un error personalizado.
     * @param {string} id - El parámetro `id` es una cadena que representa el identificador único de la
     * entidad que necesita ser restaurada.
     * @returns La función `restoreLogicDeleted` devuelve una Promesa que se resuelve en un instancia de
     * tipo `T` o una instancia de `CustomError`.
     */
    restoreLogicDeleted(id, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var findOptionsWhere = { id: id };
                if (idEnterprise) {
                    findOptionsWhere = Object.assign(Object.assign({}, findOptionsWhere), { enterprise: { id: idEnterprise } });
                }
                const result = yield this.restore(id);
                if (result.affected) {
                    const restoredEntity = yield this.findByIdEntity(id);
                    return restoredEntity;
                }
                else {
                    throw new types_1.CustomError("Entity not found", 404);
                }
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
}
exports.GenericRepository = GenericRepository;
