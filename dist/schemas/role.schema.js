"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoleSchema = exports.assignRoleSchema = void 0;
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
exports.assignRoleSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        role: (zod_1.z.nativeEnum(RoleEnumType))
    })
});
exports.updateRoleSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        role: (zod_1.z.nativeEnum(RoleEnumType))
    })
});
//# sourceMappingURL=role.schema.js.map