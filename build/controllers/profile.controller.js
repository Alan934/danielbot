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
exports.ProfileController = void 0;
const agent_1 = require("../entities/agent");
const controllerGenerics_1 = require("../types/controllerGenerics");
const profile_repository_1 = require("../repositories/profile.repository");
const utils_1 = require("../utils");
const class_transformer_1 = require("class-transformer");
// import { CustomError } from "../types";
// import { plainToInstance } from "class-transformer";
// import { toDtoFromEntity } from "../utils";
class ProfileController extends controllerGenerics_1.GenericController {
    constructor() {
        super(agent_1.Profile, agent_1.Profile, agent_1.ProfileDTO);
        this.profileRepository = new profile_repository_1.ProfileRepository();
    }
    signUpWithEnterprise(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield this.profileRepository.signUpWithEnterprise((0, class_transformer_1.plainToInstance)(agent_1.ProfileAndEnterpriseDTO, req.body, {
                    groups: ["private"],
                }));
                return res.status(200).json(profile);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const profile = yield this.profileRepository.signUp((0, class_transformer_1.plainToInstance)(agent_1.ProfileDTO, req.body, {
                    groups: ["private"],
                }), idEnterprise);
                return res.status(200).json(profile);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield this.profileRepository.signIn((0, class_transformer_1.plainToInstance)(agent_1.ProfileDTO, req.body, {
                    groups: ["private"],
                }));
                return res.status(200).json(profile);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    getAllProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const profiles = yield this.profileRepository.findAllProfiles(idEnterprise);
                return res.status(200).json(profiles);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    getProfileById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idProfile = req.params.id;
                const idEnterprise = yield this.getEnterpriseId(req, res);
                const profile = yield this.profileRepository.findByIdProfileForEnterprise(idProfile, idEnterprise);
                return res.status(200).json(profile);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    deleteProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idProfile = req.params.id;
                const profile = yield this.profileRepository.deleteProfile(idProfile);
                return res.status(200).json(profile);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    logicDeleteProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idProfile = req.params.id;
                const profile = yield this.profileRepository.logicDeleteProfile(idProfile);
                return res.status(200).json(profile);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idProfile = req.params.id;
                const dataProfile = req.body;
                const profile = yield this.profileRepository.updateProfile(idProfile, dataProfile);
                return res.status(200).json(profile);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
    updateRoleProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idProfile = req.params.id;
                const role = req.body.role;
                const profile = yield this.profileRepository.updateRoleProfile(idProfile, role);
                return res.status(200).json(profile);
            }
            catch (error) {
                return (0, utils_1.handleErrors)(error, res);
            }
        });
    }
}
exports.ProfileController = ProfileController;
