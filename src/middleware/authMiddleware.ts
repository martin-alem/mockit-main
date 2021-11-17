import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import jwt from "jsonwebtoken";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { _access_token } = req.cookies;
    const JWT_SECRET = process.env.JWT_SECRET!;
    try {
      jwt.verify(_access_token, JWT_SECRET);
      next();
    } catch (error) {
      next(new ErrorHandler("Invalid access token", 401));
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default authMiddleware;
