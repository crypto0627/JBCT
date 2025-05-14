import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { Profile } from 'passport'
import { VerifyCallback } from 'passport-oauth2'
import appDataSource from '../postgres'
import { User } from '@/entities/User'
import config from '../config'
import crypto from 'crypto'

// Configure Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientId,
      clientSecret: config.google.clientSecret,
      callbackURL: `${config.apiUrl}/api/v1/auth/google/callback`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const userRepo = appDataSource.getRepository(User)
        const existingUser = await userRepo.findOne({
          where: { email: profile.emails?.[0].value },
        })

        if (existingUser) {
          return done(null, existingUser)
        }

        const user = userRepo.create({
          id: crypto.randomBytes(16).toString('hex'),
          email: profile.emails?.[0].value,
          username: profile.displayName,
          picture: profile.photos?.[0].value,
        })

        await userRepo.save(user)
        return done(null, user)
      } catch (error) {
        return done(error as Error)
      }
    }
  )
)

// Configure Passport GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: config.github.clientId,
      clientSecret: config.github.clientSecret,
      callbackURL: `${config.apiUrl}/api/v1/auth/github/callback`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const userRepo = appDataSource.getRepository(User)
        const existingUser = await userRepo.findOne({
          where: { email: profile.emails?.[0].value },
        })

        if (existingUser) {
          return done(null, existingUser)
        }

        const user = userRepo.create({
          id: crypto.randomBytes(16).toString('hex'),
          email: profile.emails?.[0].value,
          username: profile.displayName || profile.username,
          picture: profile.photos?.[0].value,
        })

        await userRepo.save(user)
        return done(null, user)
      } catch (error) {
        return done(error as Error)
      }
    }
  )
)

// Serialize user for the session
passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

// Deserialize user from the session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await appDataSource.getRepository(User).findOne({ where: { id } })
    done(null, user)
  } catch (error) {
    done(error)
  }
})

export default passport 