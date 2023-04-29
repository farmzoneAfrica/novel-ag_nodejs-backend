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
        name: (0, zod_1.string)({}),
        address: (0, zod_1.string)({}),
        state: (0, zod_1.string)({}),
        localGovt: (0, zod_1.string)({}),
        remarks: (0, zod_1.string)({})
    })
});
//# sourceMappingURL=warehouse.schema.js.map