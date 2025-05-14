import express from 'express'
import cors from 'cors'
import config from '@/config/config'
import cookieParser from 'cookie-parser'
import { verifyApiKey } from '@/middleware/authMiddleware'
import appDataSource from '@/config/postgres'
import authRouter from '@/routes/auth.route'
import passport from 'passport'

const app = express()

app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    exposedHeaders: ['x-api-key'],
  }),
)
app.use(cookieParser())
app.use(express.json())
app.use(verifyApiKey)

// Initialize Passport
app.use(passport.initialize())

appDataSource
  .initialize()
  .then(() => {
    console.log('✅ PostgreSQL Connected')
  })
  .catch((err) => {
    console.log('❌ PostgreSQL Connection Failed')
    console.log(err)
    process.exit(1)
  })

const apiPrefix = '/api/v1'
app.use(`${apiPrefix}/auth`, authRouter)

app.listen(config.port, () => {
  console.log(`Server is running on port http://localhost:${config.port}`)
})
