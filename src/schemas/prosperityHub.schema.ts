import { boolean, object, string, TypeOf, z } from 'zod';

export const createProsperityHubSchema = object({
  body: object({
    name: string({
      required_error: 'firstName is required',
    }),
    address: string({
      required_error: 'Address is required',
    }),
    state: string({
      required_error: 'State is required',
    }),
    localGovt: string({
      required_error: 'Address is required',
    }),
    remarks: string().optional(),
  })
});

export const updateProsperityHubSchema = object({
  body: object({
    name: string({}),
    address: string({}),
    state: string({}),
    status: boolean({}),
    localGovt: string({}),
    remarks: string({})
  })
});

export type CreateProsperityHubInput = TypeOf<typeof createProsperityHubSchema>['body'];
export type UpdateProsperityHubInput = TypeOf<typeof updateProsperityHubSchema>['body'];