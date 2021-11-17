import express, { Request, Response, NextFunction, Router } from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
import getAllUsers from "../controller/getAllUsers.js";
import getUser from "./../controller/getUser.js";
import authMiddleware from "./../middleware/authMiddleware.js";

const userRouter: Router = express.Router();

userRouter.use(authMiddleware);

userRouter.get("/:userId", [getUser]);
userRouter.get("/", [getAllUsers]);

userRouter.use((error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});
export default userRouter;
