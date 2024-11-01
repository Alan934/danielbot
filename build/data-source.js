"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("./config");
exports.AppDataSource = new typeorm_1.DataSource(config_1.dbConfig);
