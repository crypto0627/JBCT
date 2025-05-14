import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { redisClient } from '@/config/redis'
import { errorResponse } from '@/utils/response'
import config from '@/config/config'

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.token

  if (!token) {
    return errorResponse(res, 'No token provided', 401)
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      userId: number
    }
    // 檢查 Token 是否在 Redis 黑名單中
    const isBlacklisted = await redisClient.get(`blacklist:${token}`)
    if (isBlacklisted) {
      return errorResponse(res, 'Token is blacklisted', 401)
    }
    req.body.userId = decoded.userId // 設置 userId

    console.log('Decoded JWT:', decoded) // 確認解碼結果
    next()
  } catch {
    errorResponse(res, 'Invalid token', 401)
  }
}

export function verifyApiKey(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const apiKey = req.headers['x-api-key'] as string
  if (apiKey !== config.apiKey) {
    return errorResponse(res, 'Invalid API key', 401)
  }
  next()
}
