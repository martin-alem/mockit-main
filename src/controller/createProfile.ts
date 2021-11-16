import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import ProfileModel from "./../model/ProfileModel.js";
import { insertOne } from "./../service/query.js";

async function createProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const { nickName, emailAddress, languages, difficulty, userId } = req.body;
    const data = { nickName, emailAddress, languages, difficulty, userId, lastUpdate: new Date()};
    const result = await insertOne(ProfileModel, data);
    if (result) {
      res.status(201).json({ status: "ok", statusCode: 201, profile: result });
    } else {
      next(new ErrorHandler("Internal server error", 500));
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default createProfile;
