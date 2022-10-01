import { object, string } from "zod";

const payload = {
    body : object({
        roomname : string({
            required_error : "In order to create a room you need a name"
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

export const createRoomSchema = object({...payload, ...params});
export const deleteRoomSchema = object({...params});