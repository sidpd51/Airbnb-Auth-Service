import { Prisma } from "@prisma/client";
import { createUser, getUserByEmail, getUserById } from "../repositories/user.repository";
import bcrypt from 'bcrypt';
import { LoginPaylodDTO } from "../dto/user.dto";
import { UnauthorizedError } from "../utils/errors/app.error";
import { UUIDTypes } from "uuid";
import jwt from 'jsonwebtoken';
import { serverConfig } from "../config";

export const createUserService = async (userPayload: Prisma.UserCreateInput) => {
    const user = await createUser(userPayload);
    return user;
}

export const loginService = async (loginPaylod: LoginPaylodDTO) => {
    const user = await getUserByEmail(loginPaylod.email);
    if (user) {
        if (!comparePwd(loginPaylod.password, user.password)) {
            throw new UnauthorizedError("Password didn't matched!");
        }
        return createJwtToken(user.id);
    }
}

const comparePwd = (hashPwd: string, pwd: string) => {
    return bcrypt.compareSync(hashPwd, pwd);
}

const createJwtToken = (id: UUIDTypes) => {
    const token = jwt.sign({ id }, serverConfig.JWT_SECRET, { expiresIn: "1hr" });
    return token;
}

export const getUserByIdService = async(id: UUIDTypes)=>{
    const user = await getUserById(id);
    return user;
}
