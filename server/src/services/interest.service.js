import prisma from "../config/prisma.js";

export const sendInterest = async (tenantId, listingId) => {

  // Check if listing exists
  const listing = await prisma.listing.findUnique({
    where: { id: listingId }
  });

  if (!listing) {
    throw new Error("Listing not found");
  }

  // Prevent owner sending interest to own listing
  if (listing.ownerId === tenantId) {
    throw new Error("You cannot send interest to your own listing");
  }

  // Prevent duplicate requests
  const existingInterest = await prisma.interest.findFirst({
    where: {
      tenantId,
      listingId,
    },
  });

  if (existingInterest) {
    throw new Error("Interest already sent");
  }

  return await prisma.interest.create({
    data: {
      tenantId,
      listingId,
    },
  });
};

export const getReceivedInterests = async (ownerId) => {
  return await prisma.interest.findMany({
    where: {
      listing: {
        ownerId,
      },
    },
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
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findInterestById = async (interestId) => {
  return await prisma.interest.findUnique({
    where: { id: interestId },
    include: {
      listing: true,
    },
  });
};

export const updateInterestStatus = async (interestId, status) => {
  return await prisma.interest.update({
    where: {
      id: interestId,
    },
    data: {
      status,
    },
  });
};

export const createConversation = async (interestId) => {
  return await prisma.conversation.create({
    data: {
      interestId,
    },
  });
};

export const getSentInterests = async (tenantId) => {
  return await prisma.interest.findMany({
    where: {
      tenantId,
    },
    include: {
      listing: {
        select: {
          id: true,
          title: true,
          city: true,
          state: true,
          rent: true,
        },
      },
      conversation: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};