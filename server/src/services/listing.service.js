import prisma from "../config/prisma.js";

export const createListing = async (listingData, ownerId) => {
  const listing = await prisma.listing.create({
    data: {
      ...listingData,
      ownerId,   //logged in user id
    },
  });

  return listing;
};

export const getAllListings = async (filters) => {
  const { city, state, minRent, maxRent } = filters;

  return await prisma.listing.findMany({
    where: {
      status: "ACTIVE",

      ...(city && { city }),

      ...(state && { state }),

      ...(minRent || maxRent
        ? {
            rent: {
              ...(minRent && { gte: Number(minRent) }),
              ...(maxRent && { lte: Number(maxRent) }),
            },
          }
        : {}),
    },

    include: {
      owner: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getListingById = async (id) => {
  return await prisma.listing.findUnique({
    where: {
      id,
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};