"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileAndEnterpriseDTO = void 0;
const class_transformer_1 = require("class-transformer");
const role_enum_1 = require("../../../enums/role.enum");
const enterprise_1 = require("../../enterprise");
class ProfileAndEnterpriseDTO {
}
exports.ProfileAndEnterpriseDTO = ProfileAndEnterpriseDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProfileAndEnterpriseDTO.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProfileAndEnterpriseDTO.prototype, "phone", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProfileAndEnterpriseDTO.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ groups: ["private"] }) // campo a ocultar en la respuesta
    ,
    __metadata("design:type", String)
], ProfileAndEnterpriseDTO.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProfileAndEnterpriseDTO.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProfileAndEnterpriseDTO.prototype, "role", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => enterprise_1.EnterpriseDto),
    __metadata("design:type", enterprise_1.Enterprise)
], ProfileAndEnterpriseDTO.prototype, "enterprise", void 0);