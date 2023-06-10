import { boolean, object, string, TypeOf, z } from 'zod';

export const createWarehouseSchema = object({
  body: object({
    name: string({
      required_error: 'Warehouse name is required',
    }),
    location: string({
      required_error: 'Location is required',
    }),
    closest_landmark: string().optional(),
    state: string({
      required_error: 'State is required',
    }),
    local_govt: string({
      required_error: 'Local government is required',
    }),
    ward: string().optional(),
 
  })
});

export const updateWarehouseSchema = object({
  body: object({
    name: string().optional(),
    location: string().optional(),
    closest_landmark: string().optional(),
    state: string().optional(),
    local_govt: string().optional(),
    ward: string().optional(),
    status: boolean().optional()
  })
});

export type CreateWarehouseInput = TypeOf<typeof createWarehouseSchema>['body'];
export type UpdateWarehouseInput = TypeOf<typeof updateWarehouseSchema>['body'];