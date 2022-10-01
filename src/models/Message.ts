import mongoose, { Schema } from "mongoose";
import { ConversationDocument } from "./Conversation";
import { UserDocument } from "./User";

export interface MessageDocument extends mongoose.Document{
    conversationID : ConversationDocument["_id"],
    senderID : UserDocument["_id"],
    text : String
}

const MessageSchema = new Schema(
    {
        conversationID : {type : mongoose.Schema.Types.ObjectId, ref : "Conversation"},
        senderID : {type : mongoose.Schema.Types.ObjectId, ref : "User"},
        text : {type : String}
    },
    {timestamps : true}
)

const MessageModel = mongoose.model<MessageDocument>("Message", MessageSchema);
export default MessageModel;