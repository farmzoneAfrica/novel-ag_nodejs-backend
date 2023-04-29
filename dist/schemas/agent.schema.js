"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleAgentSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.updateAgentSchema = exports.verifyEmailSchema = exports.loginAgentSchema = exports.registerAgentSchema = void 0;
const zod_1 = require("zod");
var RoleEnumType;
(function (RoleEnumType) {
    RoleEnumType["ADMIN"] = "ADMIN";
    RoleEnumType["AGENT"] = "AGENT";
})(RoleEnumType || (RoleEnumType = {}));
var GenderEnumType;
(function (GenderEnumType) {
    GenderEnumType["Male"] = "Male";
    GenderEnumType["Female"] = "Female";
})(GenderEnumType || (GenderEnumType = {}));
exports.registerAgentSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({
            required_error: 'firstName is required',
        }),
        lastName: (0, zod_1.string)().optional(),
        state: (0, zod_1.string)().optional(),
        gender: (zod_1.z.nativeEnum(GenderEnumType)),
        localGovt: (0, zod_1.string)().optional(),
        maritalStatus: (0, zod_1.string)().optional(),
        phone: (0, zod_1.string)({
            required_error: 'phone number is required',
        }).min(7, 'Number must be more than 6 characters')
            .max(15, 'Password must be less than 15 characters'),
        address: (0, zod_1.string)().optional(),
        avatar: (0, zod_1.string)().optional(),
        email: (0, zod_1.string)({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        })
            .min(6, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        confirmPassword: (0, zod_1.string)({
            required_error: 'Please confirm your password',
        }),
        role: zod_1.z.optional(zod_1.z.nativeEnum(RoleEnumType)),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    }),
});
exports.loginAgentSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }).min(8, 'Invalid email or password'),
    }),
});
exports.verifyEmailSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        verificationCode: (0, zod_1.string)(),
    }),
});
exports.updateAgentSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({}),
        lastName: (0, zod_1.string)({}),
        gender: (0, zod_1.string)({}),
        state: (0, zod_1.string)({}),
        localGovt: (0, zod_1.string)({}),
        maritalStatus: (0, zod_1.string)({}),
        password: (0, zod_1.string)({})
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters').optional(),
        confirmPassword: (0, zod_1.string)({}).optional(),
        role: zod_1.z.optional(zod_1.z.nativeEnum(RoleEnumType)),
    })
        .partial()
        .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    }),
});
exports.forgotPasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Email is invalid'),
    }),
});
exports.resetPasswordSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        resetToken: (0, zod_1.string)(),
    }),
    body: (0, zod_1.object)({
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }).min(8, 'Password must be more than 8 characters'),
        confirmPassword: (0, zod_1.string)({
            required_error: 'Please confirm your password',
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    }),
});
exports.getSingleAgentSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)()
    })
});
//# sourceMappingURL=agent.schema.js.map