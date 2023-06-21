import { object, string, TypeOf, z } from 'zod';

enum RoleEnumType {
  user = 'user',
  farmer = 'farmer',
  admin = 'admin',
  agent = 'agent',
  buyer = 'buyer',
  dealer = 'dealer',
  logistics = 'logistics',
}
enum RoleEnumPermission {
  create = 'create',
  read = 'read',
  update = 'update',
  agentdelete = 'delete',
}

export const assignRoleSchema = object({
  body: object({
    name: string()
  })
});

export const assignPermissionSchema = object({
  body: object({
    name: (z.nativeEnum(RoleEnumPermission))
  })
});

export const updateRoleSchema = object({
  body: object({
    name: string()
  })
});

export const updatePermissionSchema = object({
  body: object({
    name: (z.nativeEnum(RoleEnumPermission))
  })
});



export type CreateRoleInput = TypeOf<typeof assignRoleSchema>['body'];
export type UpdateRoleInput = TypeOf<typeof updateRoleSchema>['body'];

export type CreatePermissionInput = TypeOf<typeof assignPermissionSchema>['body'];
export type UpdatePermissionInput = TypeOf<typeof updatePermissionSchema>['body'];