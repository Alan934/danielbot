"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processSorting = void 0;
const processSorting = (queryOrderBy) => {
    const orderBy = {};
    if (queryOrderBy && typeof queryOrderBy === "string") {
        const orderByParams = queryOrderBy.split(",");
        orderByParams.forEach((param) => {
            const splitParams = param.split(":");
            const column = splitParams[0];
            const direction = splitParams.length > 1 ? splitParams[1].toUpperCase() : "ASC";
            orderBy[column] = direction;
        });
    }
    return orderBy;
};
exports.processSorting = processSorting;
