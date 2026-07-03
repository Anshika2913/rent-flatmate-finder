import prisma from "../config/prisma.js";

export const getUserConversations = async (userId) => {
  return await prisma.conversation.findMany({
    where: {
      interest: {
        OR: [
          {
            tenantId: userId,
          },
          {
            listing: {
              ownerId: userId,
            },
          },
        ],
      },
    },
    include: {
      interest: {
        include: {
          tenant: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          listing: {
            select: {
              id: true,
              title: true,
              city: true,
              state: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};