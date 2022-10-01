import {Request, Response } from "express";
import Logger from "../../core/Logger";
import { createRoom, deleteRoom, findRoom, findRooms } from "../service/room.service";


export async function createRoomHandler(req: Request, res:Response){
    try {
        const userid = res.locals.user.user;
        const body = req.body;

        const room = await createRoom(userid, body.roomname);
        res.send(room);
    } catch (e:any) {
        Logger.error(e);
    }
}

export async function getRoomsHandler(req: Request, res:Response){
    try {
        const rooms = await findRooms();
        res.send(rooms);
    } catch (e : any) {
        Logger.error(e);
    }
}

export async function deleteRoomsHandler(req: Request, res : Response){
    try {
        const userid = res.locals.user.user;
        const roomId = req.params.roomId;

        const room = await findRoom({_id : roomId});
        //@ts-ignore
        if (room.user !== userid){
            res.send("You can delete this room").status(403);
        }

        const deleteroom = await deleteRoom({_id : roomId});

        res.send(deleteroom);
    } catch (e : any) {
        Logger.error(e);
    }
}