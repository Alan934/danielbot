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
exports.Message = void 0;
const typeorm_1 = require("typeorm");
const base_model_1 = require("../base/base.model");
const enterprise_1 = require("../enterprise");
const flow_model_1 = require("../flow/flow.model");
const subMessage_model_1 = require("../subMessage/subMessage.model");
const optionEnum_1 = require("../../enums/optionEnum");
let Message = class Message extends base_model_1.Base {
    constructor() {
        super(...arguments);
        this.option = null;
        this.isNumber = null;
        this.isDeleted = false;
        this.showName = null;
        this.isName = null;
    }
};
exports.Message = Message;
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], Message.prototype, "numOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Message.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: optionEnum_1.Option,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Message.prototype, "option", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        nullable: true,
    }),
    __metadata("design:type", Object)
], Message.prototype, "isNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        nullable: true,
        default: false,
    }),
    __metadata("design:type", Object)
], Message.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        nullable: true,
    }),
    __metadata("design:type", Object)
], Message.prototype, "showName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        nullable: true,
    }),
    __metadata("design:type", Object)
], Message.prototype, "isName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => enterprise_1.Enterprise, (enterprise) => enterprise.messages, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        cascade: true,
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "enterpriseId" }),
    __metadata("design:type", enterprise_1.Enterprise)
], Message.prototype, "enterprise", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => flow_model_1.Flow, (flow) => flow.messages, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        cascade: true,
        nullable: true,
    }),
    __metadata("design:type", flow_model_1.Flow)
], Message.prototype, "flow", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subMessage_model_1.SubMessage, (subMessage) => subMessage.message),
    __metadata("design:type", Array)
], Message.prototype, "subMessages", void 0);
exports.Message = Message = __decorate([
    (0, typeorm_1.Entity)("messages")
], Message);
