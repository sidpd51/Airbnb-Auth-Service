import { Prisma } from "@prisma/client"
import { prismaClient } from "../prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ConflictError, NotFoundError } from "../utils/errors/app.error";
import bcrypt from 'bcrypt';
import { serverConfig } from "../config";

export const createUser = async (userPayload: Prisma.UserCreateInput) => {
    try {
        userPayload.password = await bcrypt.hash(userPayload.password, serverConfig.SALT_ROUNDS);
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

export const getUserByEmail = async (email: string) => {
    const user = prismaClient.user.findUnique({
        where: {
            email: email
        },
        select: {
            id: true,
            password: true
        }
    });
    if (!user) {
        throw new NotFoundError(`User not found with email: ${email}`);
    }
    return user;
}
