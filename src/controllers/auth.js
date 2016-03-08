import db from '../db'
import _ from 'lodash'
import uuid from 'uuid'

const FIELDS = `
  id,
  user_id,
  ip_address,
  user_agent,
  expired_at,
  created_at`

export const getSession = async (sessionId) => {
  const sql = `
    SELECT ${FIELDS}
    FROM active_sessions
    WHERE id = $(sessionId)`
  const values = {
    sessionId
  }
  try {
    return await db.one(sql, values)
  }
  catch (err) {
    return null
  }
}

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
  return await db.one(sql, values)
}

export const login = async ({ email, digest }) => {
  const userId = (await getUserId(email, digest)).id
  const id = uuid.v4()
  const sql = `
    INSERT INTO sessions (id, user_id, ip_address, user_agent, expired_at)
    VALUES ($(id), $(userId), $(ip)::inet, $(agent), NOW() + $(interval)::interval)
    RETURNING id AS token`
  const values = {
    id,
    userId,
    ip: '192.168.0.1',
    agent: 'curl',
    interval: '2 weeks'
  }
  return await db.one(sql, values)
}

export const logout = async (sessionId) => {
  const sql = `
    UPDATE sessions
    SET logged_out_at = NOW()
    WHERE id = $(sessionId)`
  const values = {
    sessionId
  }
  return await db.none(sql, values)
}

export const resetRequest = async (email) => {
  const sql = `
    INSERT INTO reset_tokens (user_email, token)
    VALUES ($(email), $(token))
    RETURNING token`
  const values = {
    email,
    token: uuid.v4()
  }
  return await db.one(sql, values)
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
