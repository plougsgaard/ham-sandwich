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
