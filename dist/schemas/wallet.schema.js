"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWalletSchema = exports.createWalletSchema = void 0;
const zod_1 = require("zod");
exports.createWalletSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        bvn: (0, zod_1.string)({
            required_error: 'BVN is required',
        }),
        bank: (0, zod_1.string)({
            required_error: 'Bank is required',
        }),
        account_number: (0, zod_1.string)({
            required_error: 'State is required',
        }),
        account_name: (0, zod_1.string)().optional(),
    })
});
exports.updateWalletSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        bvn: (0, zod_1.string)().optional(),
        bank: (0, zod_1.string)().optional(),
        account_number: (0, zod_1.string)().optional()
    })
});
//# sourceMappingURL=wallet.schema.js.map