import { Prisma } from "@prisma/client"
import { prismaClient } from "../prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ConflictError } from "../utils/errors/app.error";

export const createUser = async (userPayload: Prisma.UserCreateInput) => {
    try {
        const user = await prismaClient.user.create({
            data: userPayload,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return user;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new ConflictError("A User with this email already exists. Please choose a different email")
            }
        }
    }
}