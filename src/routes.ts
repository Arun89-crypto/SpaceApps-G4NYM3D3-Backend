import { Express,Request, Response} from "express";
import { createMessageHandler, getMessagesHandler } from "./controller/message.controller";
import { createRoomHandler, deleteRoomsHandler, getRoomsHandler } from "./controller/room.controller";
import { createUserSessionHandler, deleteSessionsHandler, getUserSessionsHandler } from "./controller/session.controller";
import { createUserHandler  } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validate from "./middleware/validateResources";
import { createMessageSchema, getMessagesSchema } from "./schema/message.schema";
import { createRoomSchema, deleteRoomSchema } from "./schema/room.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

export default function (app: Express) {
    app.get("/healthCheck",(req:Request, res:Response) => {
        res.sendStatus(200);
    })

    // SESSION ROUTES
    // --------------

    // Login User
    app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler);
    // Get User Sessions
    app.get('/api/sessions',requireUser,getUserSessionsHandler);
    // Delete User Sessions
    app.delete('/api/sessions', requireUser, deleteSessionsHandler);

    // USER ROUTES
    // -----------

    // Register User
    app.post('/api/register', validate(createUserSchema), createUserHandler);

    // MESSAGE ROUTES
    // --------------

    // Send Message
    app.post('/api/sendmessage/:roomId', [requireUser, validate(createMessageSchema)], createMessageHandler);
    // Get Messages
    app.get('/api/getmessages/:roomId',[requireUser, validate(getMessagesSchema)], getMessagesHandler)

    // ROOM ROUTES
    // -----------

    // Add Rooms
    app.post('/api/addrooms', [requireUser, validate(createRoomSchema)], createRoomHandler);
    // Get Rooms
    app.get('/api/getrooms', requireUser, getRoomsHandler);
    // Delete Room
    app.delete('/api/deleteroom/:roomId', validate(deleteRoomSchema), deleteRoomsHandler);
}