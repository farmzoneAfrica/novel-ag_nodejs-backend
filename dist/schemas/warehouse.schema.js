"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWarehouseSchema = exports.createWarehouseSchema = void 0;
const zod_1 = require("zod");
exports.createWarehouseSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Warehouse name is required',
        }),
        location: (0, zod_1.string)({
            required_error: 'Location is required',
        }),
        closest_landmark: (0, zod_1.string)().optional(),
        state: (0, zod_1.string)({
            required_error: 'State is required',
        }),
        local_govt: (0, zod_1.string)({
            required_error: 'Local government is required',
        }),
        ward: (0, zod_1.string)().optional(),
    })
});
exports.updateWarehouseSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)().optional(),
        location: (0, zod_1.string)().optional(),
        closest_landmark: (0, zod_1.string)().optional(),
        state: (0, zod_1.string)().optional(),
        local_govt: (0, zod_1.string)().optional(),
        ward: (0, zod_1.string)().optional(),
        status: (0, zod_1.boolean)().optional()
    })
});
//# sourceMappingURL=warehouse.schema.js.map