import {Request, Response } from "express";
import Logger from "../../core/Logger";
import { createMessage, findMessages } from "../service/message.service";


export async function createMessageHandler(req: Request, res: Response){
    try {
        const userid = res.locals.user.user;
        const body = req.body;
        const roomid = req.params.roomId;

        const message = await createMessage(userid, roomid, body.message);
        res.send(message);
    } catch (e:any) {
        Logger.error(e);
    }
}

export async function getMessagesHandler(req: Request, res:Response){
    try {
        const roomid = req.params.roomid;    
        
        const messages = await findMessages({roomId : roomid});
        res.send(messages);
    } catch (e : any) {
        Logger.error(e);
    }
}