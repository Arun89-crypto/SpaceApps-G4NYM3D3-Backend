import Logger from "../../core/Logger";
import ConversationModel from "../models/Conversation";

class _ConversationService{
    // creating new conversations
    async newConversation({senderID, recieverID}: {
        senderID : string,
        recieverID : string
    }){
        try {
            const Conversation = new ConversationModel({
                members : [senderID, recieverID]
            });
            return await Conversation.save();
        } catch (error) {
            Logger.error("Error in creating conversation >>>>>", error);
            return error
        }
    }

    // getting the conversations for a user
    async getConversations(userID : string){
        try {
            const Conversations = await ConversationModel.find({
                members : {$in : [userID]}
            });
            return Conversations;
        } catch (error) {
            Logger.error("Error in getting the conversations >>>>",error);
            return error;
        }
    }
}

export const ConversationService = new _ConversationService();