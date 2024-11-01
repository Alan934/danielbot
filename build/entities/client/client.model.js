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
exports.Client = void 0;
const typeorm_1 = require("typeorm");
const base_model_1 = require("../base/base.model");
const enterprise_model_1 = require("../enterprise/enterprise.model");
let Client = class Client extends base_model_1.Base {
};
exports.Client = Client;
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Client.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], Client.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => enterprise_model_1.Enterprise, (enterprise) => enterprise.clients, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        cascade: true,
        nullable: false,
    }),
    __metadata("design:type", enterprise_model_1.Enterprise)
], Client.prototype, "enterprise", void 0);
exports.Client = Client = __decorate([
    (0, typeorm_1.Entity)("clients"),
    (0, typeorm_1.Index)(["phone", "username"], { unique: true })
], Client);
