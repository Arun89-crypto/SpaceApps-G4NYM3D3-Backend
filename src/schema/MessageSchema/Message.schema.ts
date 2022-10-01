import { object, string } from 'zod'

export const createMessageSchema = object({
  body: object({
    conversationID: string({
      required_error: 'Coversation ID is required',
    }),
    text: string({
      required_error: 'String cannot be blank and should have a length',
    }).min(1),
  }),
})
