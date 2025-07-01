import { NextFunction, Request, Response } from "express";
import { createUserService, getUserByIdService, loginService } from "../services/user.service";
import { StatusCodes } from "http-status-codes";
import { validate as isValidUUID } from "uuid";
import { BadRequestError } from "../utils/errors/app.error";
import { logger } from "../config/logger.config";

export const registerUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    const user = await createUserService(req.body);
    logger.info("User registered successfully!");
    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "User registered successfully!",
        data: user
    });
}

export const signInHandler = async (req: Request, res: Response, next: NextFunction) => {
    const token = await loginService(req.body);
    logger.info("User loggedin successfully!");
    res.status(StatusCodes.OK).json({ token });
}

export const getUserInfoHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!isValidUUID(req.params.id)) {
        throw new BadRequestError("Id is not a valid uuid!");
    }
    const user = await getUserByIdService(req.params.id);
    logger.info("Got user info");
    res.status(StatusCodes.OK).json({
        success: true,
        message: "User found successfully!",
        data: user
    });
}