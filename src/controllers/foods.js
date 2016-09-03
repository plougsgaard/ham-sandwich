import db from '../db'
import _ from 'lodash'
import uuid from 'uuid'

import { CREATED_AT } from '../db'

import { getBrandByName, addBrand } from './brands'

const FIELDS = `
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
  created_by,
  ${CREATED_AT},
  brand_id,
  brand_name`

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
  const brandRow = _.first(await getBrandByName(brand)) || await addBrand(userId, brand)
  const { id } = await db.one(sql, values)
  db.none(`
    INSERT INTO foods_brands (
      food_id,
      brand_id,
      created_by
    )
    VALUES (
      $(foodId),
      $(brandId),
      $(userId)
    )`, {
      foodId: id,
      brandId: brandRow.id,
      userId
    })
  return await getFoodWithBrands(id)
}

export const deleteFood = async (userId, foodId) => {
  return await db.one(`
    UPDATE foods
    SET deleted_at = NOW()
    WHERE id = $(foodId)
    AND created_by = $(userId)
    RETURNING id`, {
      foodId,
      userId
    })
}
