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
exports.ProfileRepository = void 0;
const entities_1 = require("../entities");
const types_1 = require("../types");
const repositoryGenerics_1 = require("../types/repositoryGenerics");
const enterprise_repository_1 = require("./enterprise.repository");
const utils_1 = require("../utils");
const errorHandler_1 = require("./errorHandler");
const configSupabaseClient_1 = require("../configSupabaseClient");
const supabase_js_1 = require("@supabase/supabase-js");
const session_repository_1 = require("./session.repository");
class ProfileRepository extends repositoryGenerics_1.GenericRepository {
    constructor() {
        super(entities_1.Profile);
        this.enterpriseRepository = new enterprise_repository_1.EnterpriseRepository();
    }
    signUpWithEnterprise(ProfileEnterprise) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verifica que el phone no exista
                const enterprisePhone = yield this.enterpriseRepository.find({
                    where: {
                        phone: ProfileEnterprise.phone,
                    },
                });
                if (enterprisePhone.length > 0) {
                    throw new types_1.CustomError("Enterprise phone already registered", 409);
                }
                // Crea el profile en auth.enterprises
                const { data, error } = yield configSupabaseClient_1.supabaseAdmin.auth.admin.createUser({
                    email: ProfileEnterprise.email,
                    password: ProfileEnterprise.password,
                    role: "admin",
                    user_metadata: { username: ProfileEnterprise.username },
                    email_confirm: true,
                });
                // Manejo de AuthApiError
                if (error instanceof supabase_js_1.AuthApiError) {
                    const status = error.message == "Profile already registered" ? 409 : 500;
                    throw new types_1.CustomError(error.message, status);
                }
                // Crea la empresa
                const entity = (0, utils_1.toEntityFromDto)(entities_1.Enterprise, {
                    phone: ProfileEnterprise.phone,
                    name: ProfileEnterprise.name,
                });
                yield this.enterpriseRepository.save(entity);
                // Asigno el id de enterprise al campo enterprise de Profile
                const newProfile = (0, utils_1.toEntityFromDto)(entities_1.Profile, { enterprise: entity });
                // Asigno el id de auth.user al nuevo profilee
                newProfile.id = (_b = (_a = data.user) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "";
                // Guardo en la bd
                yield this.save(newProfile);
                const userData = {
                    idProfile: (_c = data.user) === null || _c === void 0 ? void 0 : _c.id,
                    createdAt: (_d = data.user) === null || _d === void 0 ? void 0 : _d.created_at,
                    username: (_e = data.user) === null || _e === void 0 ? void 0 : _e.user_metadata.username,
                    email: (_f = data.user) === null || _f === void 0 ? void 0 : _f.email,
                    role: (_g = data.user) === null || _g === void 0 ? void 0 : _g.role,
                    enterprise: {
                        id: entity.id,
                        name: entity.name,
                        phone: entity.phone,
                    },
                };
                return userData;
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
    signUp(dataProfile, idEnterprise) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Crea el profile en auth.enterprises
                const { data, error } = yield configSupabaseClient_1.supabaseAdmin.auth.admin.createUser({
                    email: dataProfile.email,
                    password: dataProfile.password,
                    role: dataProfile.role,
                    user_metadata: { username: dataProfile.username },
                    email_confirm: true,
                });
                const newProfile = (0, utils_1.toEntityFromDto)(entities_1.Profile, {});
                // Asigno el id de auth.enterprise al nuevo profilee
                newProfile.id = (_b = (_a = data.user) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "";
                // Manejo de AuthApiError
                if (error instanceof supabase_js_1.AuthApiError) {
                    const status = error.message == "Profile already registered" ? 409 : 500;
                    throw new types_1.CustomError(error.message, status);
                }
                console.log(idEnterprise);
                if (idEnterprise) {
                    const enterprise = yield this.enterpriseRepository.findByIdEntity(idEnterprise);
                    newProfile.enterprise = enterprise;
                }
                this.save(newProfile);
                const userData = {
                    idProfile: (_c = data.user) === null || _c === void 0 ? void 0 : _c.id,
                    createdAt: (_d = data.user) === null || _d === void 0 ? void 0 : _d.created_at,
                    username: (_e = data.user) === null || _e === void 0 ? void 0 : _e.user_metadata.username,
                    email: (_f = data.user) === null || _f === void 0 ? void 0 : _f.email,
                    role: (_g = data.user) === null || _g === void 0 ? void 0 : _g.role,
                    enterprise: newProfile.enterprise,
                };
                return userData;
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
    signIn(profile) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sessionReposotory = new session_repository_1.SessionRepository();
                const { data, error } = yield configSupabaseClient_1.supabase.auth.signInWithPassword({
                    email: profile.email,
                    password: profile.password,
                });
                if (error) {
                    // TODO: Add this to handleRepositoryError
                    if (error instanceof supabase_js_1.AuthApiError) {
                        const status = error.message == "Invalid login credentials" ? 401 : 500;
                        throw new types_1.CustomError(error.message, status);
                    }
                    else {
                        throw new types_1.CustomError("Unknown error: " + error, 500);
                    }
                }
                const refresToken = sessionReposotory.getSession();
                const userData = {
                    id: (_a = data.user) === null || _a === void 0 ? void 0 : _a.id,
                    email: (_b = data.user) === null || _b === void 0 ? void 0 : _b.email,
                    token: data.session.access_token,
                    refresh_token: (yield refresToken).refresh_token,
                };
                return userData;
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
    findAllProfiles(idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profiles = yield this.find({
                    where: { enterprise: { id: idEnterprise } },
                    relations: ["enterprise"],
                });
                const profileData = yield Promise.all(profiles.map((profile) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b, _c, _d;
                    const { data, error } = yield configSupabaseClient_1.supabaseAdmin.auth.admin.getUserById(profile.id);
                    if (error instanceof supabase_js_1.AuthApiError) {
                        throw new types_1.CustomError("Error fetching profile: " + error.message, error.status);
                    }
                    return {
                        id: profile.id,
                        username: (_a = data.user) === null || _a === void 0 ? void 0 : _a.user_metadata.username,
                        email: (_b = data.user) === null || _b === void 0 ? void 0 : _b.email,
                        role: (_c = data.user) === null || _c === void 0 ? void 0 : _c.role,
                        createdAt: (_d = data.user) === null || _d === void 0 ? void 0 : _d.created_at,
                        enterprise: profile.enterprise,
                    };
                })));
                return {
                    profiles: profileData,
                };
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
    findByIdProfileForEnterprise(idProfile, idEnterprise) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield configSupabaseClient_1.supabaseAdmin.auth.admin.getUserById(idProfile);
                if (error instanceof supabase_js_1.AuthApiError) {
                    throw new types_1.CustomError("Error fetching profile: " + error.message, error.status);
                }
                const profile = yield this.findOneBy({
                    id: idProfile,
                    enterprise: { id: idEnterprise },
                });
                const enterprise = yield this.enterpriseRepository.findOneBy({
                    id: idEnterprise,
                });
                if (data && profile) {
                    return {
                        id: (_a = data.user) === null || _a === void 0 ? void 0 : _a.id,
                        username: (_b = data.user) === null || _b === void 0 ? void 0 : _b.user_metadata.username,
                        email: (_c = data.user) === null || _c === void 0 ? void 0 : _c.email,
                        role: (_d = data.user) === null || _d === void 0 ? void 0 : _d.role,
                        createdAt: (_e = data.user) === null || _e === void 0 ? void 0 : _e.created_at,
                        enterprise,
                    };
                }
                else {
                    throw new types_1.CustomError("Profile not found", 404);
                }
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    deleteProfile(idProfile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield configSupabaseClient_1.supabaseAdmin.auth.admin.deleteUser(idProfile);
                if (error instanceof supabase_js_1.AuthApiError) {
                    throw new types_1.CustomError("Profile not found: " + error.message, error.status);
                }
                if (!data) {
                    throw new types_1.CustomError("Failed to delete profile in Supabase", 500);
                }
                yield this.deleteEntity(idProfile);
                return data;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    findOneProfileWithEnterprise(idProfile, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    where: { id: idProfile },
                    relations: ["enterprise"],
                };
                if (idEnterprise) {
                    options.where.enterprise = { id: idEnterprise };
                }
                const entity = yield this.findOne(options);
                return entity ? entity : undefined;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    logicDeleteProfile(idProfile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield configSupabaseClient_1.supabaseAdmin.auth.admin.deleteUser(idProfile, true);
                if (error instanceof supabase_js_1.AuthApiError) {
                    throw new types_1.CustomError("Profile not found: " + error.message, error.status);
                }
                if (!data)
                    throw new types_1.CustomError("Failed to delete profile in Supabase", 500);
                yield this.logicDelete(idProfile);
                return data;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    updateProfile(idProfile, dataProfile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield configSupabaseClient_1.supabaseAdmin.auth.admin.updateUserById(idProfile, {
                    email: dataProfile.email,
                    password: dataProfile.password,
                    user_metadata: { username: dataProfile.username },
                });
                if (error instanceof supabase_js_1.AuthApiError) {
                    throw new types_1.CustomError("Profile not found: " + error.message, error.status);
                }
                return data;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    updateRoleProfile(idProfile, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield configSupabaseClient_1.supabaseAdmin.auth.admin.updateUserById(idProfile, {
                    role: role,
                });
                if (error instanceof supabase_js_1.AuthApiError) {
                    throw new types_1.CustomError("Profile not found: " + error.message, error.status);
                }
                return data;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    //-----------------------
    findAllEntitiesForAEnterprise(idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = yield this.find({
                    where: { enterprise: { id: idEnterprise } },
                    relations: ["enterprise"],
                });
                return entities;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    findAllDeletedEntitiesForAEnterprise(idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.find({
                    where: { enterprise: { id: idEnterprise } },
                    withDeleted: true,
                    relations: ["enterprise"],
                });
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    findByIdEntityForAEnterprise(idProfile, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.findOneBy({
                    id: idProfile,
                    enterprise: { id: idEnterprise },
                });
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
    createEntityForAEnterprise(data, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enterpriseRepository = new enterprise_repository_1.EnterpriseRepository();
                const enterprise = yield enterpriseRepository.findByIdEntity(idEnterprise);
                if (!enterprise) {
                    throw new types_1.CustomError("Enterprise not found", 404);
                }
                data.enterprise = enterprise;
                const newEntity = (0, utils_1.toEntityFromDto)(entities_1.Profile, data);
                yield this.save(newEntity);
                return newEntity;
            }
            catch (error) {
                throw (0, errorHandler_1.handleRepositoryError)(error);
            }
        });
    }
    updateEntityForAEnterprise(idProfile, idEnterprise, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entityUpdated = yield this.update({
                    // chequear si es mejor con find y save, update no chequea si existe
                    id: idProfile,
                    enterprise: { id: idEnterprise },
                }, data);
                if (entityUpdated.affected) {
                    const restoredEntity = yield this.findByIdEntity(idProfile);
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
    deleteEntityForAEnterprise(idProfile, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.findOneOrFail({
                    where: { id: idProfile },
                    relations: ["enterprise"],
                })
                    .then((profile) => __awaiter(this, void 0, void 0, function* () {
                    if (profile.enterprise.id === idEnterprise) {
                        return yield this.delete(idProfile);
                    }
                    else {
                        throw new types_1.CustomError("Permission denied", 403);
                    }
                }))
                    .catch((error) => {
                    throw error;
                });
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
    logicDeleteForAEnterprise(idProfile, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.findOneOrFail({
                    where: { id: idProfile },
                    relations: ["enterprise"],
                })
                    .then((profile) => __awaiter(this, void 0, void 0, function* () {
                    if (profile.enterprise.id === idEnterprise) {
                        return yield this.softDelete(idProfile);
                    }
                    else {
                        throw new types_1.CustomError("Permission denied", 403);
                    }
                }))
                    .catch((error) => {
                    throw error;
                });
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
    restoreLogicDeletedForAEnterprise(idProfile, idEnterprise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.restore({
                    id: idProfile,
                    enterprise: { id: idEnterprise },
                });
                if (result.affected) {
                    const restoredEntity = yield this.findByIdEntity(idProfile);
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
exports.ProfileRepository = ProfileRepository;
