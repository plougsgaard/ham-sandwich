import db from '../db'
import _ from 'lodash'

const FIELDS = `
  *`

export const getBrands = async () =>
  await db.many(`
    SELECT ${FIELDS}
    FROM brands`)
