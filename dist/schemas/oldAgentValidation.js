"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailSchema = exports.updateAgentSchema = exports.registerAgentSchema = exports.loginAgentSchema = void 0;
const zod_1 = require("zod");
exports.loginAgentSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    userName: zod_1.z.string().trim().optional(),
    password: zod_1.z.string()
});
exports.registerAgentSchema = zod_1.z
    .object({
    userName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string(),
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    password: zod_1.z
        .string({
        required_error: 'Password is required'
    })
        .min(6, {
        message: 'Password must be 6 or more characters long'
    }),
    confirmPassword: zod_1.z
        .string()
        .min(6, {
        message: 'Confirm password must be 6 or more characters long'
    }),
    avatar: zod_1.z.string().optional(),
    isVerified: zod_1.z.boolean().optional()
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
exports.updateAgentSchema = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    userName: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().optional(),
    password: zod_1.z.string().min(4).optional(),
    confirmPassword: zod_1.z.string().min(4).optional(),
    avatar: zod_1.z.string().optional(),
    isVerified: zod_1.z.boolean().optional()
});
exports.emailSchema = zod_1.z.object({
    email: zod_1.z.string().email()
});
//# sourceMappingURL=oldAgentValidation.js.map