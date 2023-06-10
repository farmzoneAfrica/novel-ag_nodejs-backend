import { boolean, object, string, TypeOf } from 'zod';

export const createProsperityHubSchema = object({
  body: object({
    name: string({
      required_error: 'Prosperity hub name is required',
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

export const updateProsperityHubSchema = object({
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

export type CreateProsperityHubInput = TypeOf<typeof createProsperityHubSchema>['body'];
export type UpdateProsperityHubInput = TypeOf<typeof updateProsperityHubSchema>['body'];