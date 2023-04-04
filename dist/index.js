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
const appError_1 = __importDefault(require("./utils/appError"));
const prismaClient_1 = __importDefault(require("./utils/prismaClient"));
const http_errors_1 = __importDefault(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./swagger-output.json"));
const agent_routes_1 = __importDefault(require("./routes/agent.routes"));
const agent_routes_2 = __importDefault(require("./routes/agent.routes"));
(0, validateEnv_1.default)();
const app = (0, express_1.default)();
async function bootstrap() {
    app.set('view engine', 'pug');
    app.set('views', `${__dirname}/views`);
    app.use(express_1.default.json({ limit: '10kb' }));
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        origin: [config_1.default.get('origin')],
        credentials: true,
    }));
    if (process.env.NODE_ENV === 'development')
        app.use((0, morgan_1.default)('dev'));
    // app.use(logger('dev'));
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
    app.use('/api/agents', agent_routes_1.default);
    app.use('/api/auths', agent_routes_2.default);
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    // Testing
    app.get('/api/healthchecker', (_, res) => {
        res.status(200).json({
            status: 'success',
            message: 'Welcome to NodeJs with Prisma and PostgreSQL',
        });
    });
    // UNHANDLED ROUTES
    app.all('*', (req, res, next) => {
        next(new appError_1.default(404, `Route ${req.originalUrl} not found`));
    });
    // GLOBAL ERROR HANDLER
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
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}.`);
    });
}
bootstrap()
    .catch((err) => {
    throw err;
})
    .finally(async () => {
    await prismaClient_1.default.$disconnect();
});
//# sourceMappingURL=index.js.map