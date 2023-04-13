import { object, string, TypeOf, z } from 'zod';

enum RoleEnumType {
  ADMIN = 'ADMIN',
  AGENT = 'AGENT',
}

export const registerAgentSchema = object({
  body: object({
    firstName: string({
      required_error: 'firstName is required',
    }),
    lastName: string().optional(),
    phone: string({
      required_error: 'phone number is required',
    }),
    address: string().optional(),
    avatar: string().optional(),
    prosperityHub: string().optional(),
    warehouse: string().optional(),
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    })
      .min(6, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    confirmPassword: string({
      required_error: 'Please confirm your password',
    }),
    role: z.optional(z.nativeEnum(RoleEnumType)),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  }),
});

export const loginAgentSchema = object({
  body: object({
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
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

export const updateAgentSchema = object({
  body: object({
    firstName: string({}),
    lastName: string({}),
    email: string({}).email('Invalid email address'),
    password: string({})
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    confirmPassword: string({}),
    role: z.optional(z.nativeEnum(RoleEnumType)),
  })
    .partial()
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
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
    confirmPassword: string({
      required_error: 'Please confirm your password',
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
});

export type RegisterAgentInput = Omit<
  TypeOf<typeof registerAgentSchema>['body'],
  'confirmPassword'
>;

export type LoginAgentInput = TypeOf<typeof loginAgentSchema>['body'];
export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>['params'];
export type UpdateUserInput = TypeOf<typeof updateAgentSchema>['body'];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;


