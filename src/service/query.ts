import Logger from "./../utils/Logger.js";
import mongoose, { Document} from "mongoose";

export async function findAll(model: mongoose.Model<any, {}, {}, {}>): Promise<Document[] | undefined> {
  try {
    const document: Document[] = await model.find( {} );
    return document;
  } catch (error) {
    Logger.log("Error", error as Error, import.meta.url);
    throw error;
  }
}

export async function insertOne(model: mongoose.Model<any, {}, {}, {}>, data: { [key: string]: any }): Promise<any> {
  try {
    const result = await model.create(data);
    return result;
  } catch (error) {
    Logger.log("Error", error as Error, import.meta.url);
    throw error;
  }
}
