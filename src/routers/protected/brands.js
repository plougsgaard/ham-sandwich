import KoaRouter from 'koa-router'
import Boom from 'boom'
import _ from 'lodash'

import { sleep } from '../../controllers/util'
import { getBrands } from '../../controllers/brands'

const router = new KoaRouter()

router.get('/', async (ctx) => {
  ctx.body = await getBrands()
})

export default router
