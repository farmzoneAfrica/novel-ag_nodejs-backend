import { object, string, TypeOf, z } from 'zod';

export const createWarehouseSchema = object({
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

export const updateWarehouseSchema = object({
  body: object({
    name: string({}),
    address: string({}),
    state: string({}),
    localGovt: string({}),
    remarks: string({})
  })
});

export type CreateWarehouseInput = TypeOf<typeof createWarehouseSchema>['body'];
export type UpdateWarehouseInput = TypeOf<typeof updateWarehouseSchema>['body'];