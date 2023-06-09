"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProsperityHubSchema = exports.createProsperityHubSchema = void 0;
const zod_1 = require("zod");
exports.createProsperityHubSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Prosperity hub name is required',
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
exports.updateProsperityHubSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)(),
        location: (0, zod_1.string)(),
        closest_landmark: (0, zod_1.string)(),
        state: (0, zod_1.string)(),
        local_govt: (0, zod_1.string)(),
        ward: (0, zod_1.string)(),
        status: (0, zod_1.boolean)()
    })
});
//# sourceMappingURL=prosperity.hub.schema.js.map