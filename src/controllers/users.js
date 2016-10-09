import db, { LAST_ONLINE_AT, CREATED_AT } from '../db'

import { getSession } from './auth'

const FIELDS = `
  id,
  name,
  role,
  email,
  ${LAST_ONLINE_AT},
  ${CREATED_AT}`

export const getUserById = async (userId) =>
  await db.one(`
    SELECT ${FIELDS}
    FROM users
    WHERE id = $(userId)
  `, { userId })

export const getUserByToken = async (token) => {
  const { user_id } = await getSession(token)
  return await getUserById(user_id)
}

export const getUsers = async () =>
  await db.any(`
    SELECT ${FIELDS}
    FROM users
  `)

export const updateProfile = async (userId, {
  name
}) => {
  const sql = `
    UPDATE users
    SET name = $(name)
    WHERE id = $(userId)
    RETURNING id`
  const values = {
    userId,
    name
  }
  const { id } = await db.one(sql, values)
  return await getUserById(id)
}
