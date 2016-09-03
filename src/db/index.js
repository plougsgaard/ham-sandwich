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

/**
 * Select a column as a UNIX timestamp.
 *
 * This is particularly useful for sending timestamps over the wire.
 *
 * The main idea here is to use these ways of selecting timestamp related
 * columns exclusively so stringified timestamps are never relied upon.
 *
 * @param  {string} column - name of table column
 * @return {string} selector for column extracting the UNIX timestamp
 */
const selectEpochMilliseconds = (column) => `ROUND(EXTRACT(EPOCH FROM ${column}) * 1000) AS ${column}`

export const EXPIRED_AT = selectEpochMilliseconds('expired_at')
export const CREATED_AT = selectEpochMilliseconds('created_at')
export const UPDATED_AT = selectEpochMilliseconds('updated_at')
export const LAST_ONLINE_AT = selectEpochMilliseconds('last_online_at')

/**
 * A session's time to live.
 *
 * @type {String} the time to live, castable to `::interval`
 */
export const SESSION_TTL = '4 weeks'
