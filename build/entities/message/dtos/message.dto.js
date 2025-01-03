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
exports.MessageDto = void 0;
const class_transformer_1 = require("class-transformer");
const enterprise_1 = require("../../enterprise");
const flow_dto_1 = require("../../flow/dtos/flow.dto");
const flow_model_1 = require("../../flow/flow.model");
class MessageDto {
    constructor() {
        this.isDeleted = false;
    }
}
exports.MessageDto = MessageDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], MessageDto.prototype, "numOrder", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MessageDto.prototype, "body", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], MessageDto.prototype, "option", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], MessageDto.prototype, "isNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], MessageDto.prototype, "showName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], MessageDto.prototype, "isName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], MessageDto.prototype, "isDeleted", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => enterprise_1.EnterpriseDto),
    __metadata("design:type", enterprise_1.Enterprise)
], MessageDto.prototype, "enterprise", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => flow_dto_1.FlowDto),
    __metadata("design:type", flow_model_1.Flow)
], MessageDto.prototype, "flow", void 0);
