import mongoose, { Schema } from "mongoose";

export interface ConversationDocument extends mongoose.Document{
    members : Array<{}>
}

const ConversationSchema = new Schema(
    {
        members : [{ type: String }]
    },
    {timestamps : true}
)

const ConversationModel = mongoose.model<ConversationDocument>("Conversation",ConversationSchema);
export default ConversationModel;