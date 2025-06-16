import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function logAction(params: {
  userId?: number;
  action: string;
  message: string;
}) {
  const { userId, action, message } = params;

  await prisma.log.create({
    data: {
      userId,
      action,
      message,
    },
  });
}
