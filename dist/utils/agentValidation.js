"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAgentSchema = exports.registerAgentSchema = exports.emailSchema = exports.loginAgentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.loginAgentSchema = zod_1.default.object({
    email: zod_1.default.string().email().optional(),
    userName: zod_1.default.string().trim().optional(),
    password: zod_1.default.string()
});
exports.emailSchema = zod_1.default.object({
    email: zod_1.default.string().email()
});
exports.registerAgentSchema = zod_1.default
    .object({
    userName: zod_1.default.string(),
    email: zod_1.default.string().email(),
    phone: zod_1.default.string(),
    firstName: zod_1.default.string().optional(),
    lastName: zod_1.default.string().optional(),
    address: zod_1.default.string().optional(),
    password: zod_1.default
        .string({
        required_error: 'Password is required'
    })
        .min(6, {
        message: 'Password must be 6 or more characters long'
    }),
    confirmPassword: zod_1.default
        .string()
        .min(6, {
        message: 'Confirm password must be 6 or more characters long'
    }),
    avatar: zod_1.default.string().optional(),
    isVerified: zod_1.default.boolean().optional()
})
    .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Password did not match confirm password'
        });
    }
});
// update agent schema
exports.updateAgentSchema = zod_1.default.object({
    firstName: zod_1.default.string().optional(),
    lastName: zod_1.default.string().optional(),
    userName: zod_1.default.string().optional(),
    email: zod_1.default.string().email().optional(),
    phone: zod_1.default.string().optional(),
    password: zod_1.default.string().min(4).optional(),
    confirmPassword: zod_1.default.string().min(4).optional(),
    avatar: zod_1.default.string().optional(),
    isVerified: zod_1.default.boolean().optional()
});
//# sourceMappingURL=agentValidation.js.map