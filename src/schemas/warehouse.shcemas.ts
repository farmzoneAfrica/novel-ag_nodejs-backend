import { object, string, TypeOf, z } from 'zod';

export const createWarehouseSchema = object({
  body: object({
    name: string({
      required_error: 'firstName is required',
    }),
    address: string({
      required_error: 'Address is required',
    }),
    remarks: string().optional(),
  })
});

export const updateWarehouseSchema = object({
  body: object({
    name: string({}),
    address: string({}),
    remarks: string({})
  })
});

export type CreateWarehouseInput = TypeOf<typeof createWarehouseSchema>['body'];
export type UpdateWarehouseInput = TypeOf<typeof updateWarehouseSchema>['body'];