import { NextFunction, Request, Response } from "express";
import { createUserService } from "../services/user.service";
import { StatusCodes } from "http-status-codes";

export const registerUserHanlder = async (req: Request, res: Response, next: NextFunction) => {
    const user = await createUserService(req.body);
    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "User registered successfully!",
        data: user
    });
}
