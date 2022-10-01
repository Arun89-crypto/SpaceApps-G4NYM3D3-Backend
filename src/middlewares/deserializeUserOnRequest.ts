import { Request, Response, NextFunction } from 'express'
import { get } from 'lodash'
import { verifyJwt } from '../../core/jwt.core'
import { SessionService } from '../services/session.service'

// This middleware will extract the user from the access token (if valid) on every request
export const deserializeUserOnRequest = async (req: Request, res: Response, next: NextFunction) => {
   // for testing (remove afterwards)

   const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')
   const refreshToken = get(req, 'headers.x-refresh')

   // If access token is not there we will forward our function to the next
   if (!accessToken) return next()
   // First we will verify the refresh token
   const { decoded, expired } = verifyJwt(accessToken, 'accessTokenPublicKey')

   // If decoded returned is not null
   if (decoded) {
      res.locals.user = decoded
      return next()
   }

   if (expired && refreshToken) {
      // getting the new access token
      const newAccessToken = await SessionService.reIssueAccessToken(refreshToken)
      if (newAccessToken) {
         // setting the access token in response header
         res.setHeader('x-access-token', newAccessToken)
      }
      // verify the newly generated token in order to get the user
      const result = verifyJwt(newAccessToken.toString(), 'accessTokenPublicKey')
      // Setting the locals.user as the results.decoded
      res.locals.user = result.decoded
      return next()
   }

   return next()
}
