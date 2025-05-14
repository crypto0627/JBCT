import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../entities/User'
import config from './config'

const appDataSource = new DataSource({
  type: 'postgres',
  host: config.postgres.host,
  port: config.postgres.port,
  username: config.postgres.username,
  password: config.postgres.password,
  database: config.postgres.database,
  entities: [User],
  migrations:
    process.env.NODE_ENV === 'production'
      ? ['dist/migration/*.js']
      : ['src/migration/*.ts'],
  synchronize: true,
  logging: true,
})
export default appDataSource
