import RoomModel, {RoomDocument} from "../model/room.model";
import {FilterQuery,UpdateQuery,QueryOptions} from 'mongoose';

export async function createRoom(userId : string,roomname : string){
    const room = await RoomModel.create({user : userId});
    return room.toJSON();
}

export async function findRooms(){
    return RoomModel.find();
}

export async function findRoom(query: FilterQuery<RoomDocument>){
    return RoomModel.find(query);
}

export async function findAndUpdateNote(query: FilterQuery<RoomDocument>, update: UpdateQuery<RoomDocument>, options : QueryOptions){
    return RoomModel.findOneAndUpdate(query, update,options)
}

export async function deleteRoom(query: FilterQuery<RoomDocument>){
        return RoomModel.deleteOne(query);
}