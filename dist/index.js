"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const morgan_1 = __importDefault(require("morgan"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const client_1 = require("@prisma/client");
const app_error_1 = __importDefault(require("./utils/app.error"));
const http_errors_1 = __importDefault(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./swagger-output.json"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const farmer_routes_1 = __importDefault(require("./routes/farmer.routes"));
const prosperity_hub_routes_1 = __importDefault(require("./routes/prosperity.hub.routes"));
const warehouse_routes_1 = __importDefault(require("./routes/warehouse.routes"));
const farm_routes_1 = __importDefault(require("./routes/farm.routes"));
const utils_route_1 = __importDefault(require("./routes/utils.route"));
const role_permission_route_1 = __importDefault(require("./routes/role.permission.route"));
(0, validateEnv_1.default)();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json({ limit: '10kb' }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [config_1.default.get('origin')],
    credentials: true,
}));
if (process.env.NODE_ENV === 'development')
    app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send('Hello World! Novel-AG');
});
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
app.get('/api/healthchecker', (_, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to NodeJs with Prisma and PostgreSQL',
    });
});
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/farmer', farmer_routes_1.default);
app.use('/api/v1/prosperity-hub', prosperity_hub_routes_1.default);
app.use('/api/v1/warehouse', warehouse_routes_1.default);
app.use('/api/v1/farm', farm_routes_1.default);
app.use('/api/v1/utils', utils_route_1.default);
app.use('/api/v1/assign', role_permission_route_1.default);
app.all('*', (req, res, next) => {
    next(new app_error_1.default(404, `Route ${req.originalUrl} not found`));
});
app.use((err, req, res, next) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.use(function (err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
const PORT = process.env.PORT;
console.clear();
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});
//# sourceMappingURL=index.js.map