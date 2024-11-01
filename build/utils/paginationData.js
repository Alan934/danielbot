"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagingData = void 0;
const getPagingData = (data, page, limit) => {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / limit);
    const nextPage = page < totalPages ? page + 1 : null;
    const previusPage = page > 1 ? page - 1 : null;
    return { totalPages, currentPage: page, previusPage, nextPage, totalItems };
};
exports.getPagingData = getPagingData;
