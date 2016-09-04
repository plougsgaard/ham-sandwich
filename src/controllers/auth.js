import db from '../db'
import _ from 'lodash'
import uuid from 'uuid'

import { SESSION_TTL, EXPIRED_AT, CREATED_AT } from '../db'

/**
 * @return { id, user_id } | { error }
 */
export const getSession = async (sessionId) => {
  const sql = `
    SELECT id,user_id
    FROM active_sessions
    WHERE id = $(sessionId)`
  const values = {
    sessionId
  }
  try {
    return await db.one(sql, values)
  } catch (error) {
    if (!error) {
      return { error: true }
    }
    return { error }
  }
}

/**
 * @return { id } | { error }
 */
const getUserId = async (email, digest) => {
  const sql = `
    SELECT id
    FROM users
    WHERE email = lower($(email))
    AND digest = $(digest)`
  const values = {
    email,
    digest
  }
  try {
    return await db.one(sql, values)
  } catch (error) {
    if (!error) {
      return { error: true }
    }
    return { error }
  }
}

/**
 * @return { token, expired_at } | { error }
 */
export const login = async ({ email, digest }) => {
  const { error, id: userId } = await getUserId(email, digest)
  if (error) {
    return { error }
  }
  const id = uuid.v4()
  const sql = `
    INSERT INTO sessions (id, user_id, ip_address, user_agent, expired_at)
    VALUES ($(id), $(userId), $(ip)::inet, $(agent), NOW() + $(interval)::interval)
    RETURNING id AS token, ${EXPIRED_AT}`
  const values = {
    id,
    userId,
    ip: '192.168.0.1',
    agent: 'curl',
    interval: SESSION_TTL
  }
  try {
    return await db.one(sql, values)
  } catch (error) {
    if (!error) {
      return { error: true }
    }
    return { error }
  }
}

/**
 * @return undefined | { error }
 */
export const logout = async (sessionId) => {
  const sql = `
    UPDATE sessions
    SET logout_at = NOW()
    WHERE id = $(sessionId)`
  const values = {
    sessionId
  }
  try {
    return await db.none(sql, values)
  } catch (error) {
    if (!error) {
      return { error: true }
    }
    return { error }
  }
}

/**
 * @return { token } | { error }
 */
export const resetRequest = async (email) => {
  const sql = `
    INSERT INTO reset_tokens (user_email, token)
    VALUES ($(email), $(token))
    RETURNING token`
  const values = {
    email,
    token: uuid.v4()
  }
  try {
    return await db.one(sql, values)
  } catch (error) {
    if (!error) {
      return { error: true }
    }
    return { error }
  }
}

export const resetConfirm = async ({ token, digest }) => {
  const selectInActiveSql = `
    SELECT user_email as email
    FROM active_reset_tokens
    WHERE token = $(token)`
  const updateUsersSql = `
    UPDATE users
    SET digest = $(digest)
    WHERE email IN (${selectInActiveSql})`
  const updateTokensSql = `
    UPDATE reset_tokens
    SET used_at = NOW()
    WHERE token = $(token)
      AND used_at IS NULL`
  const values = {
    digest,
    token
  }
  return await db.tx((transaction) => transaction.batch([
    // role of `one` is to fail the transaction if the token isn't valid
    transaction.one(selectInActiveSql, values),
    transaction.none(updateUsersSql, values),
    transaction.none(updateTokensSql, values)
  ]))
}

export const renewSession = async (sessionId) => {
  const sql = `
    UPDATE sessions
    SET expired_at = NOW() + $(interval)::interval
    WHERE id = $(sessionId)
    RETURNING
      id AS token,
      ${EXPIRED_AT}`
  const values = {
    sessionId,
    interval: SESSION_TTL
  }
  return await db.one(sql, values)
}
