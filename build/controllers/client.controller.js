"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const client_1 = require("../entities/client");
const controllerGenerics_1 = require("../types/controllerGenerics");
// import { ClientRepository } from "../repositories/client.repository";
// import { Request, Response } from "express";
// import { CustomError } from "../types";
// import { plainToInstance } from "class-transformer";
// import { toDtoFromEntity } from "../utils";
class ClientController extends controllerGenerics_1.GenericController {
    // private clientRepository: ClientRepository;
    constructor() {
        super(client_1.Client, client_1.Client, client_1.ClientDTO);
        // this.clientRepository = new ClientRepository();
    }
}
exports.ClientController = ClientController;
