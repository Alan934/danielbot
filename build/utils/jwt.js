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
exports.getUserByJWT = exports.verifyJWT = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const types_1 = require("../types");
const secret = process.env.JWT_SECRET || "";
const verifyJWT = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = yield (0, jsonwebtoken_1.verify)(token, secret);
        return decodedToken;
    }
    catch (error) {
        throw new types_1.CustomError("Failed to authenticate token" + error, 401);
    }
});
exports.verifyJWT = verifyJWT;
const getUserByJWT = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization || "";
        const jwt = token.split(" ")[1];
        if (jwt === "") {
            return new types_1.CustomError("No token provided", 401);
        }
        const user = (yield (0, exports.verifyJWT)(jwt));
        return user;
    }
    catch (error) {
        if (error instanceof types_1.CustomError) {
            throw error;
        }
        else {
            throw new types_1.CustomError("Unknown error: " + error, 500);
        }
    }
});
exports.getUserByJWT = getUserByJWT;
