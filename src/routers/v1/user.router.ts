import express from 'express';
import { registerUserHanlder } from '../../controllers/user.controller';
import { validateRequetBody } from '../../validators';
import { userRegisterSchema } from '../../validators/user.validator';

const userRouter = express.Router();


userRouter.post('/register', validateRequetBody(userRegisterSchema), registerUserHanlder);

export default userRouter;