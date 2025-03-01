import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Create test organization
    const organization = await prisma.organization.create({
        data: {
            name: 'Test Organization',
        },
    });

    // Create test user
    const user = await prisma.user.create({
        data: {
            email: 'test@example.com',
            name: 'Test User',
            password: await hash('password123', 10),
            organizationId: organization.id,
        },
    });

    // Create test project
    const project = await prisma.project.create({
        data: {
            name: 'Test Project',
            organizationId: organization.id,
        },
    });

    // Create test tasks
    await prisma.task.create({
        data: {
            title: 'First Task',
            description: 'This is a test task',
            status: 'TODO',
            priority: 'MEDIUM',
            projectId: project.id,
            assigneeId: user.id,
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
