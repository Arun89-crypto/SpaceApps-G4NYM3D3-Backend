const PORT = 8900
const cors_origin = "http://localhost:3000"

const io = require("socket.io")(PORT, {
    cors : {
        origin : cors_origin
    }
}, console.log(`Socket Server is running at ${PORT}`))

const EVENTS = {
    connection : 'connection',
    disconnection : 'disconnection',
    CLIENT : {
        SEND_MESSAGE : "SEND_MESSAGE",
        GET_MESSAGE : "GET_MESSAGE"
    },
    SERVER : {
        ADD_USER : "ADD_USER",
        GET_USERS : "GET_USERS"
    }
}

let users: any[] = [];

const addUser = (userId:string, socketId:string) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId })
}

const removeUser = (socketId:string) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId:string) => {
    return users.find(user => user.userId === userId)
}

io.on(EVENTS.connection, (socket:any) => {
    console.log("A user is connected");  // JUST FOR TESTING
    
    // Adding the user in univ. user array
    socket.on(EVENTS.SERVER.ADD_USER, (userID:string) => {
        addUser(userID, socket.id);
        console.log(users); // JUST FOR TESTING
        io.emit(EVENTS.SERVER.GET_USERS, users);
    })

    // Send and Get the messages
    socket.on(EVENTS.CLIENT.SEND_MESSAGE, ({ senderID, recieverID, text }: {senderID : string, recieverID : string, text: string}) => {
        const user = getUser(recieverID);
        io.to(user.socketId).emit(EVENTS.CLIENT.GET_MESSAGE, {
            senderID, text
        });
    })

    // On disconnection
    socket.on(EVENTS.disconnection, () => {
        console.log("A user is disconnected");  // JUST FOR TESTING
        removeUser(socket.id);
        io.emit(EVENTS.SERVER.GET_USERS, users);
    })
})