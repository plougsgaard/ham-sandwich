import KoaRouter from 'koa-router'

import { getBrands } from '../../controllers/brands'

const router = new KoaRouter()

router.get('/', async (ctx) => {
  ctx.body = await getBrands()
})

export default router
