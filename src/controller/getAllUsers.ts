import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import UserModel from "./../model/UserModel.js";
import { findAll } from "./../service/query.js";

async function getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users = await findAll(UserModel);
    if (users) {
      res.status(200).json({ status: "ok", statusCode: 200, length: users.length, users });
    } else {
      next(new ErrorHandler("Internal server error", 500));
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default getAllUsers;
