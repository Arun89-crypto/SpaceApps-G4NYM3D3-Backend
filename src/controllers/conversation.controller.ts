import { Request, Response } from 'express'
import Logger from '../../core/Logger'
import { ERROR, SUCCESS } from '../../core/responseApi'
import { ConversationService } from '../services/conversation.service'

class _ConversationController {
   // Add Conversation controller
   async addConversation(req: Request, res: Response) {
      try {
         const conv_obj = {
            senderID: req.body.senderID,
            recieverID: req.body.recieverID,
         }
         const conversation = await ConversationService.newConversation(conv_obj)
         res.status(200).json(SUCCESS('Successfully added conversation', conversation))
      } catch (error) {
         Logger.error('Conversation controller adding error >>>>>', error)
         res.status(400).json(ERROR('Error in adding conversation', error, 400))
      }
   }

   // Get user's conversation
   async getConversations(req: Request, res: Response) {
      try {
         const userID = res.locals.user._id
         const conversations = await ConversationService.getConversations(userID)
         res.status(200).json(SUCCESS('Successfully fetched conversation', conversations))
      } catch (error) {
         Logger.error('Conversation controller getting error >>>>>', error)
         res.status(400).json(ERROR('Error in fetching conversation', error, 400))
      }
   }
}

export const ConversationController = new _ConversationController()
