import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";

function validateProfileMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { nickName, emailAddress, languages, difficulty } = req.body;
    if (nickName && emailAddress && languages && difficulty) {
      next();
    } else {
      res.status(400).json({ status: "fail", statusCode: 400, message: "missing a required field" });
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default validateProfileMiddleware;
