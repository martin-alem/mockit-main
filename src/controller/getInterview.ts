import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import InterviewModel from "./../model/InterviewModel.js";
import { findOne } from "./../service/query.js";

async function getInterview(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { room } = req.params;
    const interview = await findOne(InterviewModel, { room: room });
    if (interview) {
      res.status(200).json({ status: "ok", statusCode: 200, interview });
    } else {
      res.status(404).json({ status: "fail", statusCode: 404 });
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default getInterview;
