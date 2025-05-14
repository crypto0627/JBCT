import dotenv from 'dotenv'

dotenv.config()

interface Config {
  port: number
  nodeEnv: string
  postgres: {
    host: string
    port: number
    username: string
    password: string
    database: string
  }
  redis: {
    host: string
    port: number
  }
  frontendUrl: string
  domain: string
  apiKey: string
  jwtSecret: string
  apiUrl: string
  google: {
    clientId: string
    clientSecret: string
  }
  github: {
    clientId: string
    clientSecret: string
  }
}

const config: Config = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  postgres: {
    host: process.env.POSTGRES_HOST || 'postgres',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'jakekuo',
    password: process.env.POSTGRES_PASSWORD || 'Testuser001',
    database: process.env.POSTGRES_NAME || 'jbct_db',
  },
  redis: {
    host: process.env.REDIS_HOST || 'redis',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  domain: process.env.DOMAIN || 'localhost',
  apiKey: process.env.API_KEY || 'hello_jbct_api_key',
  jwtSecret: process.env.JWT_SECRET || 'hello_jbct_jwt_secret',
  apiUrl: process.env.API_URL || 'http://localhost:3001',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || 'hello_jbct_google_client_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'hello_jbct_google_client_secret',
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID || 'hello_jbct_github_client_id',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'hello_jbct_github_client_secret',
  },
}

export default config
