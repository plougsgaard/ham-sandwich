import db from '../db'
import _ from 'lodash'

import { getSession } from './auth'

const FIELDS = `
  id,
  name,
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

export const getUserByToken = async (token) => {
  const session = await getSession(token)
  console.log(token, session)
  const user = await getUserById(session.user_id)
  console.log(user)
  return user
}

export const getUsers = async () =>
  await db.any(`
    SELECT ${FIELDS}
    FROM users
  `)
