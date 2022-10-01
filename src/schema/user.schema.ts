import { omit } from 'lodash';
import {string,object,TypeOf, number} from 'zod';

export const createUserSchema = object({
    body : object({
        name : string({
            required_error : "Name is required !!"
        }),
        password: string({
            required_error: "Name is required",
        }).min(6, "Password too short - should be 6 chars minimum"),
        passwordConfirmation: string({
            required_error: "passwordConfirmation is required",
        }),
        email: string({
            required_error: "Email is required",
        }).email("Not a valid email"),
        contactno : string({
            required_error : "Contact number is required"
        }).length(10, "Enter a valid phone number"),
        organisation : string({
            required_error : "Please Enter the Organisation you work in."
        })
    }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">