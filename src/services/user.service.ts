import Logger from "../../core/Logger";
import UserModel, { UserDocument } from "../models/User";
import { FilterQuery } from "mongoose";
import { omit } from "lodash";

class _UserService {
  async findAll() {
    try {
      return await UserModel.find();
    } catch (err) {
      Logger.error("Error in finding all users >>>>>", err);
    }
  }
  // To find user by query
  async findUser(query: FilterQuery<UserDocument>) {
    try {
      return await UserModel.findOne(query);
    } catch (err) {
      Logger.error("Error in finding user with email >>>>>>", err);
      return false;
    }
  }

  async createUser(user: any) {
    try {
      const User = new UserModel(user);
      return await User.save();
    } catch (err) {
      Logger.error("Error in saving user >>>>>", err);
      return false;
    }
  }

  async updateUser(query: any, data: any) {
    try {
      const res = await UserModel.findOneAndUpdate(query, data);
    } catch (err) {
      Logger.error("Error in updating user >>>>>", err);
    }
  }
  // Valid password when we validate locally
  async validatePassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await UserModel.findOne({ email });
    if (!user) return false;
    const isValid = await user.comparePassword(password);
    if (!isValid) return false;
    return omit(user.toJSON(), "password");
  }
}
export const UserService = new _UserService();
