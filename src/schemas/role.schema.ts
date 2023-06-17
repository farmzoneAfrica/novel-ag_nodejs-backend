import { boolean, object, string, TypeOf, z } from 'zod';

enum RoleEnumType {
  user = 'user',
  farmer = 'farmer',
  admin = 'admin',
  agent = 'agent',
  buyer = 'buyer',
  dealer = 'dealer',
  logistics = 'logistics',
}

export const assignRoleSchema = object({
  body: object({
    role: (z.nativeEnum(RoleEnumType))
  })
});

export const updateRoleSchema = object({
  body: object({
    role: (z.nativeEnum(RoleEnumType))
  })
});


export type CreateRoleInput = TypeOf<typeof assignRoleSchema>['body'];
export type UpdateRoleInput = TypeOf<typeof updateRoleSchema>['body'];