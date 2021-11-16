import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    unique: true,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
    default: "",
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
