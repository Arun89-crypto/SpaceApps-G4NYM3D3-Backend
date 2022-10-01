import express from 'express'
// Schemas
import { createConversationSchema } from '../schema/ConversationSchema/Conversation.schema'
import { createMessageSchema } from '../schema/MessageSchema/Message.schema'
// Middlewares
import fetchUser from '../middlewares/fetchUser'
import validate from '../middlewares/validateResources'
// Controllers
import { ConversationController } from '../controllers/conversation.controller'
import { MessageController } from '../controllers/message.controller'

const convRoutes = express.Router()

// --------------------
// Conversation Routes
// --------------------

// Add conversation with a user
convRoutes.post('/addconv', fetchUser, validate(createConversationSchema), ConversationController.addConversation)

// Get Conversations of a user
convRoutes.get('/getconvs', fetchUser, ConversationController.getConversations)

// --------------------
// Messaging Routes
// --------------------

// Send a message
convRoutes.post('/sendmsg', fetchUser, validate(createMessageSchema), MessageController.sendMessage)

// Get messages of a conversation
convRoutes.get('/getmsgs/:conversationID', fetchUser, MessageController.getMessages)

export default convRoutes
