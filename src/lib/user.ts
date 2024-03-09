import { User } from "@prisma/client";
import prisma from "./prisma";

export const createUser = async (data: User) => {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (error) {
    return { error };
  }
};
