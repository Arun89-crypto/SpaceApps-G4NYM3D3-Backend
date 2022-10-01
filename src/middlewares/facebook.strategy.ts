import passport from 'passport'
import config from '../../config/default'
import Logger from '../../core/Logger'
import User from '../models/User'
import { UserService } from '../services/user.service'
var FacebookStrategy = require('passport-facebook').Strategy

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.facebookClientId,
      clientSecret: process.env.facebookClientSecret,
      callbackURL: '/auth/facebook/dashboard',
      passReqToCallback: true,
    },
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      console.log(profile)
      User.findOne({ facebookId: profile.id }, async function (err: Error, user: any) {
        if (err) {
          Logger.error('error in finding user', err)
          return cb(err, null)
        }
        if (!user) {
          const newUser = {
            facebookId: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName || '',
            lastName: profile.name.familyName || '',
            image: profile.photos[0].value || '',
          }
          try {
            await UserService.createUser(newUser)
            Logger.info(`New user - ${profile.displayName} saved to db!`)
          } catch (err) {
            Logger.error('Error in creating user in passport', err)
          }
          cb(null, newUser)
        }
        // Session token functionalities here
        // * Function
        // * Middleware
        cb(null, user)
      })
    }
  )
)

passport.serializeUser((user: any, done: any) => {
  return done(null, user._id)
})

passport.deserializeUser((id: string, done: any) => {
  User.findById(id, (err: Error, doc: any) => {
    // Whatever we return goes to the client and binds to the req.user property
    return done(null, id)
  })
})