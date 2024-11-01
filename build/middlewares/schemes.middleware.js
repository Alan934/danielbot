"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validateSchema = void 0;
const types_1 = require("../types");
const utils_1 = require("../utils");
/**
 * Middleware para validar un objeto de solicitud (req.body) con un esquema proporcionado.
 *
 * @param schema El esquema de validación a aplicar.
 * @param partial Indica si se debe realizar una validación parcial (true) o completa (false). Por defecto, es false.
 * @returns Un middleware que maneja la validación del esquema.
 */
const validateSchema = (schema, partial = false) => (req, res, next) => {
    try {
        if (partial) {
            const result = schema.partial().parse(req.body);
            if (Object.values(result).length === 0) {
                throw new types_1.CustomError("You did not provide valid attributes for the entity", 422);
            }
        }
        else {
            schema.parse(req.body);
        }
        return next();
    }
    catch (error) {
        return (0, utils_1.handleErrors)(error, res);
    }
};
exports.validateSchema = validateSchema;
const validateQuery = (schema, partial = false) => (req, res, next) => {
    try {
        checkKeys(req.query, schema, true);
        // Check for extra query parameters that are not in the schema
        if (partial) {
            schema.partial().parse(req.query, req.params);
            if (req.query.orderBy) {
                const paramsData = (0, utils_1.processSorting)(req.query.orderBy.toString());
                schema.partial().parse(paramsData);
                checkKeys(paramsData, schema, false);
            }
        }
        else {
            schema.parse(req.query, req.params);
        }
        return next();
    }
    catch (error) {
        return (0, utils_1.handleErrors)(error, res);
    }
};
exports.validateQuery = validateQuery;
const checkKeys = (queryData, schema, addFiltering) => {
    var schemaKeys = Object.keys(schema.shape);
    if (addFiltering) {
        schemaKeys = Object.keys(schema.shape).concat(["orderBy", "page"]);
    }
    const queryKeys = Object.keys(queryData);
    const extraKeys = queryKeys.filter((key) => !schemaKeys.includes(key));
    if (extraKeys.length > 0) {
        throw new types_1.CustomError(`The query parameters [${extraKeys.join(", ")}] are not valid`, 422);
    }
};
