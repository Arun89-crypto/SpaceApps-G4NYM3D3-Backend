import { array, object, string } from 'zod'

export const createConversationSchema = object({
  body: object({
    senderID: string({
      required_error: 'Sender ID is required',
    }),
    recieverID: string({
      required_error: 'Reciever ID is required',
    }),
  }),
})
