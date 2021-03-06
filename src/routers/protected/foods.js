import KoaRouter from 'koa-router'
import _ from 'lodash'

import { created, noContent, badRequest } from '../../responses'

import { sleep } from '../../controllers/util'
import {
  getFoodsWithBrands,
  addFood,
  deleteFood
} from '../../controllers/foods'
import { getFoodImageUploadUrl } from '../../controllers/s3'

const router = new KoaRouter()

router.get('/', async (ctx) => {
  ctx.body = await getFoodsWithBrands()
})

router.post('/:foodId/image', async (ctx) => {
  const { user_id } = ctx.session
  const { foodId } = ctx.params
  if (!foodId) {
    return badRequest(ctx)
  }
  const url = await getFoodImageUploadUrl(foodId)
  return created(ctx, { url })
})

router.post('/', async (ctx) => {
  const { user_id } = ctx.session
  const entry = ctx.request.body
  if (_.isEmpty(entry)) {
    return badRequest(ctx)
  }
  const newEntry = await addFood(user_id, entry)
  return created(ctx, newEntry)
})

router.delete('/', async (ctx) => {
  const { user_id } = ctx.session
  const foodId = _.get(ctx.request, 'body.id')
  if (!foodId) {
    return badRequest(ctx)
  }
  await sleep(1000)
  await deleteFood(user_id, foodId)
  return noContent(ctx)
})

export default router
