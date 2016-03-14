import db from '../db'
import _ from 'lodash'

const FIELDS = `
  id,
  name,
  uname,
  role,
  email,
  last_online_at,
  created_at`

export const getUserById = async (userId) =>
  await db.one(`
    SELECT ${FIELDS}
    FROM users
    WHERE id = $(userId)
  `, { userId })

export const getUsers = async () =>
  await db.any(`
    SELECT ${FIELDS}
    FROM users
  `)
