import db from '../db'
import uuid from 'uuid'
import _ from 'lodash'

const FIELDS = `
  *`

export const addBarcode = async ({ userId, type, data }) =>
  await db.one(`
    INSERT INTO barcodes (
      id,
      type,
      data,
      created_by
    )
    VALUES (
      $(id),
      $(type),
      $(data),
      $(userId)
    )
    RETURNING id`, {
      id: uuid.v4(),
      type,
      data,
      userId
    })

export const findBarcode = async ({ type, data }) =>
  _.first(
    await db.any(`
      SELECT ${FIELDS}
      FROM barcodes
      WHERE type = $(type)
      AND data = $(data)`, {
        type,
        data
      })
  )
