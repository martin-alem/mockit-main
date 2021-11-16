import express, { Request, Response, NextFunction, Router } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import validateProfileMiddleware from "../middleware/validateProfileMiddleware.js";
import updateProfile from "./../controller/updateProfile.js";
import getAllProfile from "./../controller/getAllProfile.js";
import createProfile from "./../controller/createProfile.js";
import getProfile from "../controller/getProfile.js";

const profileRouter: Router = express.Router();

profileRouter.route("/").get([getAllProfile]).post([validateProfileMiddleware, createProfile]);
profileRouter.route("/:userId").put([validateProfileMiddleware, updateProfile]).get([getProfile]);

profileRouter.use((error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});
export default profileRouter;
