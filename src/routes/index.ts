import express from 'express'
import { UserController } from '../controllers/user.controller'
import fetchUser from '../middlewares/fetchUser'

export const route = express.Router()

// --------------   USER ROUTES ---------------

// To find all the users
route.get('/findAllUser', fetchUser, UserController.findAll)

// To get user details
route.get('/profile/:profileid', fetchUser, UserController.findOneById)

// To update user
route.post('/profile', fetchUser, UserController.UpdateOne)
