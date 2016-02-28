import KoaRouter from 'koa-router'

const router = new KoaRouter()

const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

const getSomeNumber = async (seed) => {
  await sleep(2000)
  return {
    'number': (seed + 1)
  }
}

const handleNumber = async (ctx) => {
	ctx.body = await getSomeNumber(42)
}

router.get('/number', handleNumber)

export default router
