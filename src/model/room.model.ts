import mongoose from "mongoose";
import { string } from "zod";
import { UserDocument } from "./user.model";

export interface RoomDocument extends mongoose.Document{
    user : UserDocument["_id"];
    roomname : String;
    createdAt: Date;
    updatedAt : Date;
}

const RoomSchema = new mongoose.Schema(
    {
        user : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
        roomname : {type : String, required : true, unique : true}
    },
    {
        timestamps : true
    }
)

const RoomModel = mongoose.model<RoomDocument>("Room", RoomSchema);

export default RoomModel;