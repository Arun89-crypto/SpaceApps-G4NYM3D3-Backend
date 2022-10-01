import MessageModel, {MessageDocument} from "../model/message.model"
import {FilterQuery,UpdateQuery,QueryOptions} from 'mongoose';

export async function createMessage(userId : string, roomId : string, msg : string){
    const message = await MessageModel.create({user : userId, roomId: roomId, message : msg});
    return message.toJSON();
}

export async function findMessages(query :FilterQuery<MessageDocument>,options : QueryOptions = {lean: true}){
    return MessageModel.find(query, {}, options);
}
