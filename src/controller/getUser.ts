import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import mongoose from "mongoose";
import UserModel from "./../model/UserModel.js";
import { findOne } from "./../service/query.js";

async function getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ status: "fail", statusCode: 400, message: "invalid field found" });
    } else {
      const user = await findOne(UserModel, { _id: userId });
      if (user) {
        res.status(200).json({ status: "ok", statusCode: 200, user });
      } else {
        next(new ErrorHandler("Internal server error", 500));
      }
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default getUser;
