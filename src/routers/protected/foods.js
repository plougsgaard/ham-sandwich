import KoaRouter from 'koa-router'
import Boom from 'boom'
import _ from 'lodash'

import { sleep } from '../../controllers/util'
import { getFoodsWithBrands, addFood } from '../../controllers/foods'

const router = new KoaRouter()

router.get('/', async (ctx) => {
  ctx.body = await getFoodsWithBrands()
})

router.post('/', async (ctx) => {
  const { user_id } = ctx.session
  const entry = ctx.request.body
  if (_.isEmpty(entry)) {
    ctx.status = 400
    return
  }
  await sleep(1000) // TODO remove fake sleep
  const newEntry = await addFood(user_id, entry)
  ctx.body = newEntry
})

export default router
