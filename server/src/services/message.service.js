import prisma from "../config/prisma.js";

export const sendMessage = async (
  conversationId,
  senderId,
  content
) => {
  // Check if conversation exists
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      interest: {
        include: {
          listing: true,
        },
      },
    },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  // Allow only the tenant or listing owner
  const tenantId = conversation.interest.tenantId;
  const ownerId = conversation.interest.listing.ownerId;

  if (senderId !== tenantId && senderId !== ownerId) {
    throw new Error("Not authorized to send messages");
  }

  return await prisma.message.create({
    data: {
      conversationId,
      senderId,
      content,
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const getMessages = async (conversationId, userId) => {
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      interest: {
        include: {
          listing: true,
        },
      },
    },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  const tenantId = conversation.interest.tenantId;
  const ownerId = conversation.interest.listing.ownerId;

  if (userId !== tenantId && userId !== ownerId) {
    throw new Error("Not authorized");
  }

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