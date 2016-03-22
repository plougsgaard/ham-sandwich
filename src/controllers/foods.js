import db from '../db'
import _ from 'lodash'

import { getSession } from './auth'

const FIELDS = `
  *`

export const getFoodsWithBrands = async () =>
  await db.many(`
    SELECT ${FIELDS}
    FROM foods_with_brands`)
