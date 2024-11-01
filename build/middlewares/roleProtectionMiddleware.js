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
exports.checkRoleAuth = void 0;
const jwt_1 = require("../utils/jwt");
const types_1 = require("../types");
const utils_1 = require("../utils");
const checkRoleAuth = (roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, jwt_1.getUserByJWT)(req);
        if (user instanceof types_1.CustomError) {
            return (0, utils_1.handleErrors)(user, res);
        }
        const userRole = user.role;
        if (roles.includes(userRole)) {
            next();
            return;
        }
        else {
            throw new types_1.CustomError("You do not have permission", 409);
        }
    }
    catch (error) {
        if (error instanceof types_1.CustomError) {
            return res
                .status(error.status)
                .json({ error: true, message: error.message });
        }
        else {
            return res.status(500).json({
                error: true,
                message: "Unknown error: " + error,
            });
        }
    }
});
exports.checkRoleAuth = checkRoleAuth;
