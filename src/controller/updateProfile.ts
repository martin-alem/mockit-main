import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import ProfileModel from "./../model/ProfileModel.js";
import { findAndUpdate } from "./../service/query.js";

async function updateQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const { nickName, emailAddress, languages, difficulty } = req.body;
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ status: "fail", statusCode: 400, message: "invalid field provided" });
    } else {
      const data = { nickName, emailAddress, languages, difficulty, lastUpdate: new Date() };
      const result = await findAndUpdate(ProfileModel, { userId: userId }, data);
      if (result) {
        res.status(200).json({ status: "ok", statusCode: 200, profile: result });
      } else {
        next(new ErrorHandler("Internal server error", 500));
      }
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default updateQuestion;
