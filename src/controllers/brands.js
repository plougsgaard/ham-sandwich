import db from '../db'
import _ from 'lodash'
import uuid from 'uuid'

const FIELDS = `
  *`

export const addBrand = async (userId, name) =>
  await db.one(`
    INSERT INTO brands (
      id,
      name,
      created_by
    )
    VALUES (
      $(id),
      $(name),
      $(userId)
    )
    RETURNING id`, {
      id: uuid.v4(),
      name,
      userId
    })

export const getBrands = async () =>
  await db.many(`
    SELECT ${FIELDS}
    FROM brands`)

export const getBrandByName = async (name) =>
  await db.any(`
    SELECT ${FIELDS}
    FROM brands
    WHERE name = $(name)
    LIMIT 1`, { name })
