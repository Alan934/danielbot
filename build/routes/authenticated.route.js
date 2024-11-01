"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatedRoute = void 0;
const express_1 = require("express");
const authenticated_controller_1 = require("../controllers/authenticated.controller");
const authenticatedRoute = () => {
    const authenticatedRoutes = (0, express_1.Router)();
    const authenticatedController = new authenticated_controller_1.AuthenticatedController();
    authenticatedRoutes.post("/", (req, res) => 
    /*
                #swagger.path = '/authenticated'
        #swagger.tags = ['Authenticated']
                #swagger.description = 'A partir del token, retorna si es válido o no'
                
                #swagger.parameters['body'] = {
                    in: 'body',
                    schema: { $ref: "#/definitions/Authenticated" }
                }
            */
    authenticatedController.isValidToken(req, res));
    return authenticatedRoutes;
};
exports.authenticatedRoute = authenticatedRoute;
