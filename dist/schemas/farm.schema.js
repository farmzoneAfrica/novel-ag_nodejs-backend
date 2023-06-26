"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFarmSchema = exports.createFarmSchema = void 0;
const zod_1 = require("zod");
exports.createFarmSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Farm name is required',
        }),
        size: (0, zod_1.string)().optional(),
        location: (0, zod_1.string)({
            required_error: 'Farm location is required',
        }),
        landmark: (0, zod_1.string)().optional(),
        crop: (0, zod_1.string)().optional(),
        state: (0, zod_1.string)().optional(),
        local_govt: (0, zod_1.string)().optional(),
        ward: (0, zod_1.string)().optional(),
    })
});
exports.updateFarmSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)().optional(),
        size: (0, zod_1.string)().optional(),
        location: (0, zod_1.string)().optional(),
        landmark: (0, zod_1.string)().optional(),
        crop: (0, zod_1.string)().optional(),
        state: (0, zod_1.string)().optional(),
        local_govt: (0, zod_1.string)().optional(),
        ward: (0, zod_1.string)().optional(),
        status: (0, zod_1.boolean)().optional()
    })
});
//# sourceMappingURL=farm.schema.js.map