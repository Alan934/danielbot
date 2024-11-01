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
exports.SessionController = void 0;
const session_repository_1 = require("../repositories/session.repository");
const utils_1 = require("../utils");
class SessionController {
    constructor() {
        this.sessionRepository = new session_repository_1.SessionRepository();
    }
    getSession(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.sessionRepository.getSession();
                return res.status(200).json(data);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    refreshSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.body.refresh_token;
                if (!refreshToken) {
                    return res.status(400).json({ error: "Refresh token is required" });
                }
                const data = yield this.sessionRepository.refreshSession(refreshToken);
                return res.status(200).json(data);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
}
exports.SessionController = SessionController;
