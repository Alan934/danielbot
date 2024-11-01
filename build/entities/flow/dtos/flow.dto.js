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
exports.FlowDto = void 0;
const class_transformer_1 = require("class-transformer");
const PricingPlanSummaryDto_1 = require("../../pricingPlan/dtos/PricingPlanSummaryDto");
class FlowDto {
}
exports.FlowDto = FlowDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], FlowDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], FlowDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => PricingPlanSummaryDto_1.PricingPlanSummaryDto),
    __metadata("design:type", Array)
], FlowDto.prototype, "pricingPlans", void 0);
