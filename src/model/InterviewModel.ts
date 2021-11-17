import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  question: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  startTime: {
    type: Date,
    required: true,
  },
});

const Interview = mongoose.model("Interview", InterviewSchema);

export default Interview;
