"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const types_1 = require("../types");
/**
 * Maneja los errores que puedan ocurrir en el controlador/middleware
 * @param error - El error que ocurrió
 * @param res - El objeto de respuesta Express
 * @returns - Una respuesta JSON con un mensaje de error y un código de estado
 */
const handleErrors = (error, res) => {
    if (error instanceof types_1.CustomError) {
        return res
            .status(error.status)
            .json({ error: true, message: error.message });
    }
    else {
        return res.status(500).json({
            error: true,
            message: "Unknown error getting entities " + error,
        });
    }
};
exports.handleErrors = handleErrors;
