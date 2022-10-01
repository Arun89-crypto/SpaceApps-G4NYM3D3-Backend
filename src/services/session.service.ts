import { FilterQuery, UpdateQuery } from 'mongoose'
import { get } from 'lodash'
import config from '../../config/default'
import { UserService } from './user.service'
import { verifyJwt, signJwt } from '../../core/jwt.core'
import SessionModel, { SessionDocument } from '../models/Session'

class _SessionService {
   async createSession(userId: string, email: string, userAgent: string) {
      const savedSession = await SessionModel.findOne({ user: userId })
      if (!savedSession) {
         const session = await SessionModel.create({ user: userId, userAgent, email })
         return session.toJSON()
      } else return savedSession
   }

   async findSessions(query: FilterQuery<SessionDocument>) {
      return SessionModel.find(query).lean()
   }

   async deleteSession(query: FilterQuery<SessionDocument>) {
      return SessionModel.findOneAndRemove(query)
   }

   // Function to reissue access token
   async reIssueAccessToken(refreshToken: string) {
      const { decoded } = await verifyJwt(refreshToken, 'refreshTokenPublicKey')
      if (!decoded || !get(decoded, 'session')) return false
      const session = await SessionModel.findById(get(decoded, 'session'))
      if (!session || !session.valid) return false
      const user = await UserService.findUser({ _id: session.user })
      if (!user) return false
      //@ts-ignore
      const accessToken = signJwt({ ...user, session: session._id }, 'accessTokenPrivateKey', { expiresIn: config.ACCESS_TOKEN_TTL })
      return accessToken
   }
}

export const SessionService = new _SessionService()
