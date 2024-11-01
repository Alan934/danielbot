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
exports.AuthenticatedController = void 0;
const types_1 = require("../types");
const jwt_1 = require("../utils/jwt");
class AuthenticatedController {
    isValidToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.body.token;
                if (!token) {
                    throw new types_1.CustomError("Token not provided", 400);
                }
                yield (0, jwt_1.verifyJWT)(token);
                return res.status(200).json({ isValid: true });
            }
            catch (error) {
                if (error instanceof types_1.CustomError) {
                    return res.status(200).json({ isValid: false, message: error.message });
                }
                else {
                    return res.status(500).json({ error });
                }
            }
        });
    }
}
exports.AuthenticatedController = AuthenticatedController;
