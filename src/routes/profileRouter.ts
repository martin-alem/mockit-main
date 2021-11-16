import express, { Request, Response, NextFunction, Router } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import validateProfileMiddleware from "../middleware/validateProfileMiddleware.js";
import updateProfile from "./../controller/updateProfile.js";

const profileRouter: Router = express.Router();

profileRouter.put("/:userId", [validateProfileMiddleware, updateProfile]);

profileRouter.use((error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});
export default profileRouter;
