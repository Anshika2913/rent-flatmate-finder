import prisma from "../config/prisma.js";
import { hashPassword } from "../utils/hash.js";

export const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already registered.");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return user;
};