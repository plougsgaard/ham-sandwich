import pgPromise from 'pg-promise'

import {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS
} from '../config'

const config = {
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASS
}

const database = pgPromise({})(config)
export default database
