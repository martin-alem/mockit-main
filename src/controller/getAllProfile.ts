import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import ProfileModel from "./../model/ProfileModel.js";
import { findAll } from "./../service/query.js";

async function getAllProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profile = await findAll(ProfileModel);
    if (profile) {
      res.status(200).json({ status: "ok", statusCode: 200, length: profile.length, profile });
    } else {
      next(new ErrorHandler("Internal server error", 500));
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default getAllProfile;
