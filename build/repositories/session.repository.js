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
exports.SessionRepository = void 0;
const configSupabaseClient_1 = require("../configSupabaseClient");
const types_1 = require("../types");
class SessionRepository {
    getSession() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield configSupabaseClient_1.supabase.auth.getSession();
                if (error) {
                    throw new types_1.CustomError("Error getting session", 500);
                }
                return { "token": (_a = data === null || data === void 0 ? void 0 : data.session) === null || _a === void 0 ? void 0 : _a.access_token, "refresh_token": (_b = data === null || data === void 0 ? void 0 : data.session) === null || _b === void 0 ? void 0 : _b.refresh_token };
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
    }
    refreshSession(refreshToken) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield configSupabaseClient_1.supabase.auth.refreshSession({ refresh_token: refreshToken });
                if (error) {
                    throw new types_1.CustomError("Error refreshing token", 500);
                }
                return { "token": (_a = data === null || data === void 0 ? void 0 : data.session) === null || _a === void 0 ? void 0 : _a.access_token, "refresh_token": (_b = data === null || data === void 0 ? void 0 : data.session) === null || _b === void 0 ? void 0 : _b.refresh_token };
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
    }
}
exports.SessionRepository = SessionRepository;
