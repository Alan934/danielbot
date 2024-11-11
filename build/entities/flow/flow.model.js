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
exports.Flow = void 0;
const typeorm_1 = require("typeorm");
const base_model_1 = require("../base/base.model");
const message_1 = require("../message");
const pricingPlan_model_1 = require("../pricingPlan/pricingPlan.model");
let Flow = class Flow extends base_model_1.Base {
    constructor() {
        super(...arguments);
        this.isDeleted = false;
    }
};
exports.Flow = Flow;
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Flow.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], Flow.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        nullable: true,
        default: false,
    }),
    __metadata("design:type", Object)
], Flow.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_1.Message, (message) => message.flow),
    __metadata("design:type", Array)
], Flow.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => pricingPlan_model_1.PricingPlan, (pricingPlan) => pricingPlan.flows),
    __metadata("design:type", Array)
], Flow.prototype, "pricingPlans", void 0);
exports.Flow = Flow = __decorate([
    (0, typeorm_1.Entity)("flows")
], Flow);
