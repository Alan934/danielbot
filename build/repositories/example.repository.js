"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleRepository = void 0;
const entities_1 = require("../entities");
const repositoryGenerics_1 = require("../types/repositoryGenerics");
class ExampleRepository extends repositoryGenerics_1.GenericRepository {
    constructor() {
        super(entities_1.Example);
    }
}
exports.ExampleRepository = ExampleRepository;
