"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seed() {
    await prisma.role.createMany({
        data: [
            { name: 'admin' },
            { name: 'supervisor' },
            { name: 'agent' },
            { name: 'farmer' },
            { name: 'aggregator' },
            { name: 'user' },
            { name: 'dealer' },
            { name: 'logistics' }
        ],
        skipDuplicates: true,
    });
    await prisma.permission.createMany({
        data: [
            { name: 'create' },
            { name: 'read' },
            { name: 'update' },
            { name: 'delete' }
        ],
        skipDuplicates: true,
    });
}
seed()
    .catch((error) => {
    console.error(error);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map