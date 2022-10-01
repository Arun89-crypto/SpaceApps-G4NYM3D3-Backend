import { object, string } from "zod";

const payload = {
    body : object({
        message : string({
            required_error : "Message text is required"
        })
    })
}

const params = {
    params : object({
        roomid : string({
            required_error : "Room ID is required"
        })
    })
}

export const createMessageSchema = object({...payload, ...params});
export const getMessagesSchema = object({...params});