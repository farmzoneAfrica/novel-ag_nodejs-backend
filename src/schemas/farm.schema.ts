import { boolean, object, string, TypeOf } from 'zod';

export const createFarmSchema = object({
  body: object({
    name: string({
      required_error: 'Farm name is required',
    }),
    size: string({
      required_error: 'Farm size is required',
    }),
    location: string({
      required_error: 'Farm location is required',
    }),
    closest_landmark: string().optional(),
    crop: string().optional(),
    state: string({
        required_error: 'State is required',
      }),
    local_govt: string({
    required_error: 'Local government is required',
    }),
    ward: string().optional(),
  })
});

export const updateFarmSchema = object({
  body: object({
    name: string().optional(),
    size: string().optional(),
    location: string().optional(),
    closest_landmark: string().optional(),
    crop: string().optional(),
    state: string().optional(),
    local_govt: string().optional(),
    ward: string().optional(),
    status: boolean().optional()
  })
});

export type CreateFarmInput = TypeOf<typeof createFarmSchema>['body'];
export type UpdateFarmInput = TypeOf<typeof updateFarmSchema>['body'];