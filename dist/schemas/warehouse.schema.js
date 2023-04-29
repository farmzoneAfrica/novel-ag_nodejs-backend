"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWarehouseSchema = exports.createWarehouseSchema = void 0;
const zod_1 = require("zod");
exports.createWarehouseSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'firstName is required',
        }),
        address: (0, zod_1.string)({
            required_error: 'Address is required',
        }),
        state: (0, zod_1.string)({
            required_error: 'State is required',
        }),
        localGovt: (0, zod_1.string)({
            required_error: 'Address is required',
        }),
        remarks: (0, zod_1.string)().optional(),
    })
});
exports.updateWarehouseSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({}).optional(),
        address: (0, zod_1.string)({}).optional(),
        state: (0, zod_1.string)({}).optional(),
        status: (0, zod_1.boolean)({}).optional(),
        localGovt: (0, zod_1.string)({}).optional(),
        remarks: (0, zod_1.string)({}).optional()
    })
});
//# sourceMappingURL=warehouse.schema.js.map