import prisma from "../config/prisma.js";

export const getMessages = async (conversationId) => {
  return await prisma.message.findMany({
    where: {
      conversationId,
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const sendMessage = async (
  conversationId,
  senderId,
  content
) => {
  return await prisma.message.create({
    data: {
      conversationId,
      senderId,
      content,
    },
  });
};

export const getOwnerConversations = async (ownerId) => {
  return await prisma.conversation.findMany({
    where: {
      interest: {
        listing: {
          ownerId,
        },
      },
    },
    include: {
      interest: {
        include: {
          tenant: true,
          listing: true,
        },
      },
      messages: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};

export const getTenantConversations = async (tenantId) => {
  return await prisma.conversation.findMany({
    where: {
      interest: {
        tenantId,
      },
    },
    include: {
      interest: {
        include: {
          tenant: true,
          listing: true,
        },
      },
      messages: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};