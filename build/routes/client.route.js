"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRouter = void 0;
const routeGenerics_1 = require("../types/routeGenerics");
const entities_1 = require("../entities");
const schemas_1 = require("../schemas");
//import { ClientController } from "../controllers/client.controller";
// import { Router } from "express";
const clientRouter = () => {
    const clientRoutes = (0, routeGenerics_1.genericRoutes)(entities_1.Client, entities_1.Client, entities_1.ClientDTO, schemas_1.ClientSchema); // lo comenté porque funciona raro cuando se sobreescriben los endpoints
    // const clientRoutes = Router();
    // const clientController = new ClientController();
    // clientRoutes.get("/", (req, res) => clientController.getAll(req, res));
    // clientRoutes.get("/getAllDeleted/", (req, res) => clientController.getAllDeleted(req, res));
    // clientRoutes.get("/getById/:id", (req, res) => clientController.getById(req, res));
    // clientRoutes.post("/", (req, res) => clientController.create(req, res));
    // clientRoutes.patch("/:id", (req, res) => clientController.update(req, res));
    // clientRoutes.delete("/:id", (req, res) => clientController.delete(req, res));
    // clientRoutes.delete("/logicDelete/:id", (req, res) => clientController.logicDelete(req, res));
    // clientRoutes.patch("/restore/:id", (req, res) => clientController.restoreLogicDeleted(req, res));
    return clientRoutes;
};
exports.clientRouter = clientRouter;
