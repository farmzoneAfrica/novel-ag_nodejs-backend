"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePermissionSchema = exports.updateRoleSchema = exports.assignPermissionSchema = exports.assignRoleSchema = void 0;
const zod_1 = require("zod");
var RoleEnumType;
(function (RoleEnumType) {
    RoleEnumType["user"] = "user";
    RoleEnumType["farmer"] = "farmer";
    RoleEnumType["admin"] = "admin";
    RoleEnumType["agent"] = "agent";
    RoleEnumType["buyer"] = "buyer";
    RoleEnumType["dealer"] = "dealer";
    RoleEnumType["logistics"] = "logistics";
})(RoleEnumType || (RoleEnumType = {}));
var RoleEnumPermission;
(function (RoleEnumPermission) {
    RoleEnumPermission["create"] = "create";
    RoleEnumPermission["read"] = "read";
    RoleEnumPermission["update"] = "update";
    RoleEnumPermission["agentdelete"] = "delete";
})(RoleEnumPermission || (RoleEnumPermission = {}));
exports.assignRoleSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)()
    })
});
exports.assignPermissionSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (zod_1.z.nativeEnum(RoleEnumPermission))
    })
});
exports.updateRoleSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)()
    })
});
exports.updatePermissionSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (zod_1.z.nativeEnum(RoleEnumPermission))
    })
});
//# sourceMappingURL=role.permissions.schema.js.map