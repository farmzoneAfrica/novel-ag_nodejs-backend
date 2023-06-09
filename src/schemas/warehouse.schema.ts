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
    user: string(),
    userId: string()
  })
});

export const updateWarehouseSchema = object({
  body: object({
    name: string(),
    location: string(),
    closest_landmark: string(),
    state: string(),
    local_govt: string(),
    ward: string(),
    status: boolean()
  })
});

export type CreateWarehouseInput = TypeOf<typeof createWarehouseSchema>['body'];
export type UpdateWarehouseInput = TypeOf<typeof updateWarehouseSchema>['body'];