"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDtoFromEntity = exports.toEntityFromDto = void 0;
const class_transformer_1 = require("class-transformer");
/**
 * Converts a DTO to an entity.
 * @param {ClassConstructor<T>} entityClass - The class of the entity (not a specific instance).
 * @param {U} dto - The DTO specific instance.
 * @returns {T} New instance of the entity.
 */
function toEntityFromDto(entityClass, dto) {
    const plainDto = (0, class_transformer_1.instanceToPlain)(dto, { groups: ["private"] });
    return (0, class_transformer_1.plainToInstance)(entityClass, plainDto, { groups: ["private"], enableImplicitConversion: true });
}
exports.toEntityFromDto = toEntityFromDto;
/**
 * Converts an entity to a DTO.
 * @param {ClassConstructor<U>} dtoClass - The class of the DTO (not a specific instance).
 * @param {T} dto - The entity specific instance.
 * @returns {U} New instance of the DTO.
 */
function toDtoFromEntity(dtoClass, entity) {
    const plainEntity = (0, class_transformer_1.instanceToPlain)(entity, { groups: ["private"] });
    return (0, class_transformer_1.plainToInstance)(dtoClass, plainEntity, { enableImplicitConversion: true });
}
exports.toDtoFromEntity = toDtoFromEntity;
