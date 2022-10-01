import { Request, Response } from 'express'
import Logger from '../../core/Logger'
import { UserService } from '../services/user.service'
import SendMail from '../../core/nodemailer.core'
import { SUCCESS, ERROR } from '../../core/responseApi'
import { signToken, verifyToken } from '../../core/jwt.core'
import bcrypt from 'bcrypt'

class _UserController {
   async findAll(req: Request, res: Response) {
      try {
         const result = await UserService.findAll()
         res.status(200).json(SUCCESS('Successfully fetched users', result))
      } catch (err) {
         res.status(400).json(ERROR('Error in fetching users', err))
      }
   }

   async findOneById(req: Request, res: Response) {
      try {
         const userId = req.params.profileid
         const result = await UserService.findUser({ _id: userId })
         if (result) res.status(200).json(SUCCESS('Successfully fetched user', result))
         else res.status(404).json(ERROR('User not found', null, 404))
      } catch (err) {
         res.status(400).json(ERROR('Something went wrong', err, 400))
      }
   }

   async createUser(req: Request, res: Response) {
      try {
         const body = req.body
         // generating password hash
         const saltRounds = 10
         const salt = await bcrypt.genSaltSync(saltRounds)
         const hash = await bcrypt.hashSync(body.password, salt)
         body.password = hash
         const user = await UserService.createUser(body)
         if (!user.email) {
            res.status(400).json(ERROR('Something went wrong', null, 400))
         }
         res.status(200).json(SUCCESS('User Created successfully !!', user))
      } catch (err) {
         res.status(400).json(ERROR('Something went wrong', err, 400))
      }
   }

   async UpdateOne(req: Request, res: Response) {
      try {
         const userId = res.locals.user._id
         const result = await UserService.updateUser({ _id: userId }, req.body)
         res.status(200).json(SUCCESS('User is updated successfully!!', result))
      } catch (err) {
         res.status(400).json(ERROR('Something went wrong', err, 400))
      }
   }

   async ForgotPasswordEmailService(req: Request, res: Response) {
      const { email } = req.body
      const user = await UserService.findUser({ email })
      if (!user) {
         return res.status(400).json(ERROR("The user with this email doesn't exist", null, 400))
      }
      const token = await signToken({ user }, { expiresIn: '15m' })
      const link = `http://localhost:3000/auth/resetPassword/${user._id}/${token}`
      console.log(link) // Add email facility here
      SendMail(email, link)
         .then((result) => console.log(result))
         .catch((error) => console.log(error))
      res.status(201).json(SUCCESS('Reset Password Link has been sent to your mail', null))
   }

   async ResetPasswordWebsiteService(req: Request, res: Response) {
      const { id, token } = req.params
      const { decoded, expired } = await verifyToken(token)
      if (!decoded || expired) {
         return res.status(404).json(ERROR('Link is expired now try again', null, 404))
      }
      const user = await UserService.findUser({ _id: id })
      if (user) res.render('reset-password-page', { email: user.email })
      else res.status(400).json(ERROR('Something wrong!! please try after some time', null))
   }

   async ResetPasswordService(req: Request, res: Response) {
      const body = req.body
      const { id, token } = req.params
      const user = await UserService.findUser({ _id: id })
      if (!user || user._id != id) {
         return res.status(404).json(ERROR("The user doesn't exist!! or ID is invalid!!", null, 404))
      }
      const { decoded, expired } = await verifyToken(token)
      if (!decoded || expired) {
         return res.status(401).json(ERROR('Link is expired now try again', null, 401))
      }

      const saltRounds = 10
      const salt = await bcrypt.genSaltSync(saltRounds)
      const hash = await bcrypt.hashSync(body.password, salt)
      const newUser = await UserService.updateUser({ _id: id }, { password: hash })
      res.status(201).json(SUCCESS('Successfully Reset Password', newUser))
   }
}

export const UserController = new _UserController()
