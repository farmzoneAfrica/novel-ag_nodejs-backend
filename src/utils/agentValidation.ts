import z from 'zod';

export const loginAgentSchema = z.object({
  email: z.string().email().optional(),
  userName: z.string().trim().optional(),
  password: z.string()
});

export const emailSchema = z.object({
  email: z.string().email()
});

export const registerAgentSchema = z
  .object({
    userName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    address: z.string().optional(),
    password: z
      .string({
        required_error: 'Password is required'
      })
      .min(6, {
        message: 'Password must be 6 or more characters long'
      }),
    confirmPassword: z
      .string()
      .min(6, {
        message: 'Confirm password must be 6 or more characters long'
      }),
    avatar: z.string().optional(),
    isVerified: z.boolean().optional()
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
  export const updateAgentSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  userName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().min(4).optional(),
  confirmPassword: z.string().min(4).optional(),
  avatar: z.string().optional(),
  isVerified: z.boolean().optional()
});

