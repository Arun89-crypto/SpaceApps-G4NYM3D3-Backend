import Logger from "../../core/Logger";
import MessageModel from "../models/Message";

class _MessageService {
    // To send the message
    async addMessage(userID : string,message : any){
        try {
            const Message = new MessageModel({
                senderID:userID,
                text : message.text,
                conversationID : message.conversationID
            });
            return await Message.save();
        } catch (error) {
            Logger.error("Error in adding the message >>>>>",error);
            return error;
        }
    }

    // To get the messages
    async getMessages(conversationID : string){
        try {
            const messages = await MessageModel.find({
                conversationID : conversationID
            });
            return messages;
        } catch (error) {
            Logger.error("Error in getting the messages >>>>>", error);
            return error;
        }
    }
}

export const MessageService = new _MessageService();