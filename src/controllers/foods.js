import db from '../db'
import _ from 'lodash'
import uuid from 'uuid'

const FIELDS = `
  *`

export const getFoodsWithBrands = async () =>
  await db.many(`
    SELECT ${FIELDS}
    FROM foods_with_brands`)

export const getFoodWithBrands = async (id) =>
  await db.one(`
    SELECT ${FIELDS}
    FROM foods_with_brands
    WHERE id = $(id)`, { id })

export const addFood = async (userId, {
  name,
  brand,
  calories,
  carbohydrates,
  sugars,
  proteins,
  fat,
  saturated,
  fibres,
  salt
}) => {
  const sql = `
    INSERT INTO foods (
      id,
      name,
      calories,
      carbohydrates,
      sugars,
      proteins,
      fat,
      saturated,
      fibres,
      salt,
      created_by
    )
    VALUES (
      $(id),
      $(name),
      $(calories),
      $(carbohydrates),
      $(sugars),
      $(proteins),
      $(fat),
      $(saturated),
      $(fibres),
      $(salt),
      $(userId)
    )
    RETURNING id`
  const values = {
    id: uuid.v4(),
    name,
    calories,
    carbohydrates,
    sugars,
    proteins,
    fat,
    saturated,
    fibres,
    salt,
    userId
  }
  const { id } = await db.one(sql, values)
  return await getFoodWithBrands(id)
}
