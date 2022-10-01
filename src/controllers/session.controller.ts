import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { UserService } from '../services/user.service'
import { SUCCESS, ERROR } from '../../core/responseApi'
import { signJwt } from '../../core/jwt.core'
import { SessionService } from '../services/session.service'
import config from '../../config/default'

class _SessionController {
   async SignUpUser(req: Request, res: Response) {
      const { firstName, lastName, email, password } = req.body
      const FoundUser = await UserService.findUser({ email })
      if (FoundUser) return res.status(409).json(ERROR('User Already Exists', null, 409))
      const hashedPassword = await bcrypt.hash(password, 10)
      const toBeSavedUser = {
         firstName,
         lastName,
         email,
         password: hashedPassword,
      }
      const result = await UserService.createUser(toBeSavedUser)
      if (result) return res.status(201).json(SUCCESS('User successfully created!', '', 201))
      else res.status(500).json(ERROR('Error in registering user', null))
   }

   async SignInUser(req: Request, res: Response) {
      const user: any = await UserService.validatePassword(req.body)
      if (!user) {
         res.status(401).json(ERROR('Invalid Credentials', null, 401))
      } else {
         //@ts-ignore
         const session = await SessionService.createSession(user._id, user.email, req.get('userAgent') || '')
         const accessToken = await signJwt({ ...user, session: session._id }, 'accessTokenPrivateKey', { expiresIn: config.ACCESS_TOKEN_TTL })
         const refreshToken = await signJwt({ ...user, session: session._id }, 'refreshTokenPrivateKey', { expiresIn: config.REFRESH_TOKEN_TTL })
         return res.status(201).json(SUCCESS('Successfully logged in', { accessToken, refreshToken }))
      }
   }

   // Function to reissue access token
   async reIssueAccessToken(req: Request, res: Response) {
      const { refreshToken } = req.body
      const accessToken = await SessionService.reIssueAccessToken(refreshToken)
      if (accessToken) return res.status(201).json(SUCCESS('Successfully Issued token', { accessToken }))
      else return res.status(401).json(ERROR('error in creating token', null, 401))
   }

   async getUserSessionsHandler(req: Request, res: Response) {
      const userId = res.locals.user._id
      const sessions = await SessionService.findSessions({
         user: userId,
         valid: true,
      })
      return res.status(201).json(SUCCESS('Successfully Fetched Sessions', { sessions }))
   }

   async deleteSessionsHandler(req: Request, res: Response) {
      const { sessionId } = req.body
      await SessionService.deleteSession({ _id: sessionId })
      return res.status(201).json(
         SUCCESS('Successfully Deleted Sessions', {
            accessToken: null,
            refreshToken: null,
         })
      )
   }
}

export const SessionController = new _SessionController()
