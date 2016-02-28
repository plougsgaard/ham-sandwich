import KoaRouter from 'koa-router'

const router = new KoaRouter()

const fakeData = [
  { name: 'Ben' },
  { name: 'Dario' },
  { name: 'Bran' }
]

router.get('/users', (ctx) => {
  ctx.body = fakeData
})

export default router
