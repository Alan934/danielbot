"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./data-source");
const Routes = __importStar(require("./routes/index"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./docs/swagger-output.json"));
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const apiV1Router = express_1.default.Router();
app.use("/api/v1", apiV1Router);
apiV1Router.use("/enterprises", Routes.enterpriseRouter());
apiV1Router.use("/profiles", Routes.profileRouter());
apiV1Router.use("/clients", Routes.clientRouter());
apiV1Router.use("/messages", Routes.messageRouter());
apiV1Router.use("/flows", Routes.flowRouter());
apiV1Router.use("/plans", Routes.pricingPlanRouter());
apiV1Router.use("/authenticated", Routes.authenticatedRoute());
apiV1Router.use("/session", Routes.sessionRouter());
app.use("/docs", swagger_ui_express_1.default.serve);
app.get("/docs", swagger_ui_express_1.default.setup(swagger_output_json_1.default));
// Middleware para manejar rutas no encontradas
app.use((_req, res) => {
    res.status(404).json({ error: true, message: "Route not found" });
});
const APP_PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 1234;
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
app.listen(APP_PORT, () => {
    console.log(`Server running on http://localhost:${APP_PORT}`);
});
