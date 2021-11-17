import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";

function validateInterviewMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, room, role, nickName } = req.body;
    if (userId && room && role && nickName) {
      next();
    } else {
      res.status(400).json({ status: "fail", statusCode: 400, message: "missing a required filed" });
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default validateInterviewMiddleware;
