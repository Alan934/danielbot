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
exports.Enterprise = void 0;
const typeorm_1 = require("typeorm");
const base_model_1 = require("../base/base.model");
const profile_model_1 = require("../agent/profile.model");
const client_model_1 = require("../client/client.model");
const message_model_1 = require("../message/message.model");
const pricingPlan_model_1 = require("../pricingPlan/pricingPlan.model");
let Enterprise = class Enterprise extends base_model_1.Base {
};
exports.Enterprise = Enterprise;
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], Enterprise.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Enterprise.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Enterprise.prototype, "connected", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => profile_model_1.Profile, (profile) => profile.enterprise),
    __metadata("design:type", Array)
], Enterprise.prototype, "profiles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => client_model_1.Client, (client) => client.enterprise),
    __metadata("design:type", Array)
], Enterprise.prototype, "clients", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_model_1.Message, (message) => message.enterprise),
    __metadata("design:type", Array)
], Enterprise.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pricingPlan_model_1.PricingPlan, (pricingPlan) => pricingPlan.enterprise, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        cascade: true,
    }),
    __metadata("design:type", pricingPlan_model_1.PricingPlan)
], Enterprise.prototype, "pricingPlan", void 0);
exports.Enterprise = Enterprise = __decorate([
    (0, typeorm_1.Entity)("enterprises")
], Enterprise);
