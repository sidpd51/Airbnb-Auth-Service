import { Prisma } from "@prisma/client";
import { createUser } from "../repositories/user.repository";

export const createUserService = async (userPayload: Prisma.UserCreateInput) => {
    const user = await createUser(userPayload);
    return user;
}