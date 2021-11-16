import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  languages: {
    type: [],
    required: true,
  },
  difficulty: {
    type: [],
    required: true,
  },
  lastUpdate: {
    type: Date,
    required: true
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
