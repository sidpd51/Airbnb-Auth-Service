import express from 'express';
import { registerUserHandler, signInHandler } from '../../controllers/user.controller';
import { validateRequetBody } from '../../validators';
import { loginSchema, userRegisterSchema } from '../../validators/user.validator';

const userRouter = express.Router();


userRouter.post('/register', validateRequetBody(userRegisterSchema), registerUserHandler);
userRouter.post('/signin', validateRequetBody(loginSchema), signInHandler);

export default userRouter;