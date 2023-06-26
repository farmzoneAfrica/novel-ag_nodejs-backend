import { boolean, object, string, TypeOf } from 'zod';

export const createFarmSchema = object({
  body: object({
    name: string({
      required_error: 'Farm name is required',
    }),
    size: string().optional(),
    location: string({
      required_error: 'Farm location is required',
    }),
    landmark: string().optional(),
    crop: string().optional(),
    state: string().optional(),
    local_govt: string().optional(),
    ward: string().optional(),
  })
});

export const updateFarmSchema = object({
  body: object({
    name: string().optional(),
    size: string().optional(),
    location: string().optional(),
    landmark: string().optional(),
    crop: string().optional(),
    state: string().optional(),
    local_govt: string().optional(),
    ward: string().optional(),
    status: boolean().optional()
  })
});

export type CreateFarmInput = TypeOf<typeof createFarmSchema>['body'];
export type UpdateFarmInput = TypeOf<typeof updateFarmSchema>['body'];