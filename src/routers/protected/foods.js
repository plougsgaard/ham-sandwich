import KoaRouter from 'koa-router'
import Boom from 'boom'
import _ from 'lodash'

import { sleep } from '../../controllers/util'
import { getFoodsWithBrands } from '../../controllers/foods'

const router = new KoaRouter()

router.get('/', async (ctx) => {
  ctx.body = await getFoodsWithBrands()
})

export default router
