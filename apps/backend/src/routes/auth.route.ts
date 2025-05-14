import express, { Request, Response, NextFunction } from 'express'
import passport from '@/config/passport'
import { authMiddleware } from '@/middleware/authMiddleware'
import { User } from '@/entities/User'
import config from '@/config/config'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/me', authMiddleware, (req: Request, res: Response) => {
  res.json(req.body.userId)
})

// Google OAuth routes
router.get('/google/login', passport.authenticate('google', {
  scope: ['profile', 'email'],
  state: crypto.randomBytes(32).toString('hex'),
}))

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as User
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          email: user.email,
          picture: user.picture,
        },
        config.jwtSecret,
        {
          algorithm: 'HS256',
          expiresIn: '7d',
        }
      )

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'none',
        path: '/',
      })

      res.redirect(`${config.frontendUrl}/auth/google/callback`)
    } catch (error) {
      next(error)
    }
  }
)

// GitHub OAuth routes
router.get('/github/login', passport.authenticate('github', {
  scope: ['user:email'],
  state: crypto.randomBytes(32).toString('hex'),
}))

router.get('/github/callback',
  passport.authenticate('github', { session: false }),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as User
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          email: user.email,
          picture: user.picture,
        },
        config.jwtSecret,
        {
          algorithm: 'HS256',
          expiresIn: '7d',
        }
      )

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'none',
        path: '/',
      })

      res.redirect(`${config.frontendUrl}/auth/github/callback`)
    } catch (error) {
      next(error)
    }
  }
)

export default router
