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
exports.SubMessageDto = void 0;
const class_transformer_1 = require("class-transformer");
const message_model_1 = require("../../message/message.model");
const subMessage_model_1 = require("../subMessage.model");
class SubMessageDto {
    constructor() {
        this.isDeleted = false;
    }
}
exports.SubMessageDto = SubMessageDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], SubMessageDto.prototype, "numOrder", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], SubMessageDto.prototype, "body", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], SubMessageDto.prototype, "option", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], SubMessageDto.prototype, "isNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], SubMessageDto.prototype, "showName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], SubMessageDto.prototype, "isName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], SubMessageDto.prototype, "isDeleted", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => message_model_1.Message),
    __metadata("design:type", Object)
], SubMessageDto.prototype, "message", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => subMessage_model_1.SubMessage),
    __metadata("design:type", Object)
], SubMessageDto.prototype, "parentSubMessage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => subMessage_model_1.SubMessage),
    __metadata("design:type", Object)
], SubMessageDto.prototype, "childSubMessages", void 0);
