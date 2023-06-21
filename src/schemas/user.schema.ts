import { number, object, string, TypeOf, z } from 'zod';

enum GenderEnumType {
  Male = 'Male',
  Female = 'Female',
}

enum RoleEnumType {
  Super_Admin = "Super_Admin",
  Admin = "Admin",
  Supervisor ="supervisor",
  Farmer = "Farmer",
  User = "User",
  Aggregator = "Aggregator",
  Logistics = "Logistics"
}

export const createUserSchema = object({
  body: object({
    role: (z.nativeEnum(RoleEnumType)),
    first_name: string({
      required_error: 'first_name is required',
    }),
    last_name: string().optional(),
    phone: string({
      required_error: 'phone number is required',
    }).min(7, 'Number must be more than 6 characters')
      .max(15, 'Password must be less than 15 characters'),
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    code: string().optional(),
    ip: string().optional(),
    gender: string(),
    profile_picture: string().optional(),
    nationality: string().optional(),
    staff_id: number().optional(),
    role_id: number(),
    state: string({
      required_error: 'State is required',
    }),
    state_id: number().optional(),
    local_govt_id: number().optional(),
    ward_id: number().optional(),
    address: string().optional(),
    marital_status: string().optional(),
    password: string({
      required_error: 'Password is required',
    })
      .min(6, 'Password must be more than 5 characters')
      .max(32, 'Password must be less than 32 characters'),
    confirm_password: string({
      required_error: 'Please confirm your password',
    }),
 
  }).refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    phone: string().optional(),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Invalid email or password'),
  }),
});

export const verifyEmailSchema = object({
  params: object({
    verificationCode: string(),
  }),
});

export const verifyOtpSchema = object({
  body: object({
    otp: string(),
  }),
});

export const updateUserSchema = object({
  body: object({
    first_name: string({}),
    last_name: string({}),
    gender: string({}).optional(),
    state: string({}),
    local_govt: string({}),
    marital_status: string({}),
    password: string({})
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters').optional(),
    confirm_password: string({}).optional(),
  })
    .partial()
    .refine((data) => data.password === data.confirm_password, {
      path: ['confirm_password'],
      message: 'Passwords do not match',
    }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Email is invalid'),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    resetToken: string(),
  }),
  body: object({
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Password must be more than 8 characters'),
    confirm_password: string({
      required_error: 'Please confirm your password',
    }),
  }).refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  }),
});

export const getSingleUserSchema = object({
  params: object({
    id: string()
  })
})

export type RegisterUserInput = Omit<
  TypeOf<typeof createUserSchema>['body'],
  'confirm_password'
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>['params'];
export type VerifyOtpInput = TypeOf<typeof verifyOtpSchema>['body'];
export type UpdateUserInput = TypeOf<typeof updateUserSchema>['body'];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
export type GetSingleUserInput = TypeOf<typeof getSingleUserSchema>['params'];

