import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import InterviewModel from "./../model/InterviewModel.js";
import { findAndUpdate } from "./../service/query.js";

async function updateInterview(req: Request, res: Response, next: NextFunction) {
  try {
    const { participants } = req.body;
    const { interviewId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(interviewId)) {
      res.status(400).json({ status: "fail", statusCode: 400, message: "invalid field provided" });
    } else {
      const result = await findAndUpdate(InterviewModel, { _id: interviewId }, { participants });
      if (result) {
        res.status(200).json({ status: "ok", statusCode: 200, interview: result });
      } else {
        next(new ErrorHandler("Internal server error", 500));
      }
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default updateInterview;
