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
exports.PricingPlan = void 0;
const typeorm_1 = require("typeorm");
const base_model_1 = require("../base/base.model");
const enterprise_1 = require("../enterprise");
const flow_model_1 = require("../flow/flow.model");
let PricingPlan = class PricingPlan extends base_model_1.Base {
};
exports.PricingPlan = PricingPlan;
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], PricingPlan.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], PricingPlan.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", Number)
], PricingPlan.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => enterprise_1.Enterprise, (enterprise) => enterprise.pricingPlan),
    __metadata("design:type", Array)
], PricingPlan.prototype, "enterprise", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => flow_model_1.Flow, (flow) => flow.pricingPlans),
    (0, typeorm_1.JoinTable)({
        name: "pricing_plans_flows",
        joinColumn: {
            name: "pricingPlanId",
        },
        inverseJoinColumn: {
            name: "flowId",
        },
    }),
    __metadata("design:type", Array)
], PricingPlan.prototype, "flows", void 0);
exports.PricingPlan = PricingPlan = __decorate([
    (0, typeorm_1.Entity)("pricing_plans")
], PricingPlan);
