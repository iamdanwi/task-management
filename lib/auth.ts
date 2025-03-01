import { getServerSession } from 'next-auth/next';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { organization: true },
  });

  return user;
}

export async function isAuthorized(userId: string, organizationId: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      organizationId: organizationId,
    },
  });

  return !!user;
}
