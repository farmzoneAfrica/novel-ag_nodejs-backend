"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleUserSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.updateUserSchema = exports.verifyOtpSchema = exports.verifyEmailSchema = exports.loginUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
var RoleEnumType;
(function (RoleEnumType) {
    RoleEnumType["user"] = "user";
    RoleEnumType["farmer"] = "farmer";
    RoleEnumType["admin"] = "admin";
    RoleEnumType["agent"] = "agent";
    RoleEnumType["buyer"] = "buyer";
    RoleEnumType["dealer"] = "dealer";
    RoleEnumType["logistics"] = "logistics";
})(RoleEnumType || (RoleEnumType = {}));
exports.registerUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        first_name: (0, zod_1.string)({
            required_error: 'first_name is required',
        }),
        last_name: (0, zod_1.string)().optional(),
        phone: (0, zod_1.string)({
            required_error: 'phone number is required',
        }).min(7, 'Number must be more than 6 characters')
            .max(15, 'Password must be less than 15 characters'),
        email: (0, zod_1.string)({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        gender: (0, zod_1.string)().optional(),
        avatar: (0, zod_1.string)().optional(),
        nationality: (0, zod_1.string)().optional(),
        state: (0, zod_1.string)(),
        local_govt: (0, zod_1.string)(),
        ward: (0, zod_1.string)().optional(),
        address: (0, zod_1.string)().optional(),
        marital_status: (0, zod_1.string)().optional(),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        })
            .min(6, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        confirm_password: (0, zod_1.string)({
            required_error: 'Please confirm your password',
        }),
        role: (zod_1.z.nativeEnum(RoleEnumType)),
    }).refine((data) => data.password === data.confirm_password, {
        path: ['confirm_password'],
        message: 'Passwords do not match',
    }),
});
exports.loginUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        phone: (0, zod_1.string)().optional(),
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
exports.verifyOtpSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        otp: (0, zod_1.string)(),
    }),
});
exports.updateUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        first_name: (0, zod_1.string)({}),
        last_name: (0, zod_1.string)({}),
        gender: (0, zod_1.string)({}),
        state: (0, zod_1.string)({}),
        local_govt: (0, zod_1.string)({}),
        marital_status: (0, zod_1.string)({}),
        password: (0, zod_1.string)({})
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters').optional(),
        confirm_password: (0, zod_1.string)({}).optional(),
        role: zod_1.z.optional(zod_1.z.nativeEnum(RoleEnumType)),
    })
        .partial()
        .refine((data) => data.password === data.confirm_password, {
        path: ['confirm_password'],
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
        confirm_password: (0, zod_1.string)({
            required_error: 'Please confirm your password',
        }),
    }).refine((data) => data.password === data.confirm_password, {
        message: 'Passwords do not match',
        path: ['confirm_password'],
    }),
});
exports.getSingleUserSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)()
    })
});
//# sourceMappingURL=user.schema.js.map