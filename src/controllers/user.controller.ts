import { NextFunction, Request, Response } from "express";
import { createUserService, loginService } from "../services/user.service";
import { StatusCodes } from "http-status-codes";

export const registerUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    const user = await createUserService(req.body);
    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "User registered successfully!",
        data: user
    });
}

export const signInHandler = async (req: Request, res: Response, next: NextFunction) => {
    const token = await loginService(req.body);
    res.status(StatusCodes.OK).json({ token });
}
