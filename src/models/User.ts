import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
var findOrCreate = require('mongoose-findorcreate')

export interface UserDocument extends mongoose.Document {
  email: String;
  googleId: String;
  firstName: String;
  lastName: String;
  username: String;
  userType: String;
  bio: String;
  country: String;
  dob: Date;
  industry: String;
  isCompany: Boolean;
  profileImage: String;
  coverImage: String;
  socialUrl: Array<{}>;
  posts: Array<{}>;
  createdAt: Date;
  password: String;
  comparePassword(candidatePassword: string): Promise<Boolean>; // To compare the entered password if loggin in locally
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String },
    googleId: { type: String },
    firstName: { type: String },
    lastName: { type: String, required: true },
    username: { type: String },
    userType: { type: String, required: true, default: "patreon" },
    bio: { type: String },
    country: { type: String, required: true, default: "India" },
    dob: { type: Date },
    industry: { type: String },
    isComapany: { type: Boolean, default: false },
    // followingMe: [{ type: Schema.Types.ObjectId }],
    // followedByMe: [{ type: Schema.Types.ObjectId }],
    profileImage: { type: String },
    coverImage: { type: String },
    socialUrl: [{ platform: { type: String }, url: { type: String } }],
    posts: [{ type: Schema.Types.ObjectId }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

UserSchema.plugin(findOrCreate)

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt
    .compare(candidatePassword, <string>user.password)
    .catch((e: any) => false);
};

export default model("User", UserSchema);