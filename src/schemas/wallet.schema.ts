import { object, string, TypeOf } from 'zod';

export const createWalletSchema = object({
  body: object({
    bvn: string({
      required_error: 'BVN is required',
    }),
    bank: string({
      required_error: 'Bank is required',
    }),
    account_number: string({
        required_error: 'State is required',
    }),
    account_name: string().optional(),
  })
});

export const updateWalletSchema = object({
  body: object({
    bvn: string().optional(),
    bank: string().optional(),
    account_number: string().optional()
  })
});

export type CreateWalletInput = TypeOf<typeof createWalletSchema>['body'];
export type UpdateWalletInput = TypeOf<typeof updateWalletSchema>['body'];