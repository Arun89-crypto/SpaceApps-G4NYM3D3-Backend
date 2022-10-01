import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { RoomDocument } from "./room.model";

export interface MessageDocument extends mongoose.Document{
    user : UserDocument["_id"];
    roomId : RoomDocument["_id"];
    message : String;
    createdAt : Date;
    updatedAt : Date;
}

const MessageSchema = new mongoose.Schema(
    {
        user : {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
        roomId : {type : mongoose.Schema.Types.ObjectId, ref: 'Room'},
        message : {type : String, required : true}
    },
    {
        timestamps : true
    }
)

const MessageModel = mongoose.model<MessageDocument>("Message", MessageSchema);

export default MessageModel;