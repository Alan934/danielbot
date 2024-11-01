"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRepositoryError = void 0;
const types_1 = require("../types");
const typeorm_1 = require("typeorm");
function handleRepositoryError(err) {
    switch (true) {
        case err instanceof types_1.CustomError:
            return err;
        case err instanceof typeorm_1.QueryFailedError:
            const driverErr = JSON.parse(JSON.stringify(err.driverError));
            return new types_1.CustomError(driverErr.detail, 500);
        default:
            return new types_1.CustomError(`Unknown error: ${err}`, 500);
    }
}
exports.handleRepositoryError = handleRepositoryError;
