import { Request, Response } from 'express'
import Logger from '../../core/Logger'
import { ERROR, SUCCESS } from '../../core/responseApi'
import { MessageService } from '../services/message.service'

class _MessageController {
   // send Message
   async sendMessage(req: Request, res: Response) {
      try {
         const body = {
            conversationID: req.body.conversationID,
            text: req.body.text,
         }
         const user = res.locals.user
         const message = await MessageService.addMessage(user._id, body)
         res.status(200).json(SUCCESS('Successfully sent message', message))
      } catch (error) {
         Logger.error('Message controller sending error >>>>>', error)
         res.status(400).json(ERROR('Error in sending message', error))
      }
   }

   // get Messages for a user
   async getMessages(req: Request, res: Response) {
      try {
         const conversationID = req.params.conversationID
         const messages = await MessageService.getMessages(conversationID)
         res.status(200).json(SUCCESS('Successfully fetched message', messages))
      } catch (error) {
         Logger.error('Message controller getting error >>>>>', error)
         res.status(400).json(ERROR('error in fetching messages', error))
      }
   }
}

export const MessageController = new _MessageController()
