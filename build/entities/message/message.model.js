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
let Message = class Message extends base_model_1.Base {
};
exports.Message = Message;
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", Number)
], Message.prototype, "numOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], Message.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => enterprise_1.Enterprise, (enterprise) => enterprise.messages, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        cascade: true,
        nullable: false,
    }),
    __metadata("design:type", enterprise_1.Enterprise)
], Message.prototype, "enterprise", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => flow_model_1.Flow, (flow) => flow.messages, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        cascade: true,
        nullable: false,
    }),
    __metadata("design:type", flow_model_1.Flow)
], Message.prototype, "flow", void 0);
exports.Message = Message = __decorate([
    (0, typeorm_1.Entity)("messages")
], Message);
