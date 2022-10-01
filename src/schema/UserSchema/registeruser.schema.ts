import { string, object, TypeOf } from 'zod'

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'First Name is required !!',
    }),
    lastName: string({
      required_error: 'Last Name is required !!',
    }),
    password: string({
      required_error: 'Name is required',
    }).min(8, 'Password too short - should be 8 chars minimum'),
    passwordConfirmation: string({
      required_error: 'passwordConfirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  }),
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>
