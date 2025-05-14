import { Response } from 'express'

export const successResponse = (
  res: Response,
  data: unknown,
  message: string = 'Success',
  statusCode: number = 200,
) => {
  res.status(statusCode).json({ success: true, message, data })
}

export const errorResponse = (
  res: Response,
  message: string = 'Error',
  statusCode: number = 400,
) => {
  res.status(statusCode).json({ success: false, message })
}
