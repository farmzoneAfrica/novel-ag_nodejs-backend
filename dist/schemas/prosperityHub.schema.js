"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProsperityHubSchema = exports.createProsperityHubSchema = void 0;
const zod_1 = require("zod");
exports.createProsperityHubSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'firstName is required',
        }),
        address: (0, zod_1.string)({
            required_error: 'Address is required',
        }),
        remarks: (0, zod_1.string)().optional(),
    })
});
exports.updateProsperityHubSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({}),
        address: (0, zod_1.string)({}),
        remarks: (0, zod_1.string)({})
    })
});
//# sourceMappingURL=prosperityHub.schema.js.map