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
exports.SubMessage = void 0;
const typeorm_1 = require("typeorm");
const base_model_1 = require("../base/base.model");
const message_model_1 = require("../message/message.model"); // Clase Message principal
const optionEnum_1 = require("../../enums/optionEnum");
let SubMessage = class SubMessage extends base_model_1.Base {
    constructor() {
        super(...arguments);
        this.option = null;
        this.isNumber = null;
        this.showName = null;
        this.isName = null;
        this.isDeleted = false;
    }
};
exports.SubMessage = SubMessage;
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], SubMessage.prototype, "numOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], SubMessage.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: optionEnum_1.Option,
        nullable: true,
    }),
    __metadata("design:type", Object)
], SubMessage.prototype, "option", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        nullable: true,
    }),
    __metadata("design:type", Object)
], SubMessage.prototype, "isNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        nullable: true,
    }),
    __metadata("design:type", Object)
], SubMessage.prototype, "showName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        nullable: true,
    }),
    __metadata("design:type", Object)
], SubMessage.prototype, "isName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        nullable: true,
        default: false,
    }),
    __metadata("design:type", Object)
], SubMessage.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => message_model_1.Message, (message) => message.subMessages, {
        onDelete: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", message_model_1.Message)
], SubMessage.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SubMessage, (subMessage) => subMessage.childSubMessages, {
        nullable: true,
        onDelete: "SET NULL",
    }),
    __metadata("design:type", Object)
], SubMessage.prototype, "parentSubMessage", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SubMessage, (subMessage) => subMessage.parentSubMessage),
    __metadata("design:type", Array)
], SubMessage.prototype, "childSubMessages", void 0);
exports.SubMessage = SubMessage = __decorate([
    (0, typeorm_1.Entity)("subMessages")
], SubMessage);
