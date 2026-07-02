import prisma from "../config/prisma.js";

export const createProfile = async (profileData, tenantId) => {
  return await prisma.tenantProfile.create({
    data: {
      ...profileData,
      tenantId,
    },
  });
};

export const getProfile = async (tenantId) => {
  return await prisma.tenantProfile.findUnique({
    where: {
      tenantId,
    },
  });
};

export const updateProfile = async (tenantId, profileData) => {
  return await prisma.tenantProfile.update({
    where: {
      tenantId,
    },
    data: profileData,
  });
};