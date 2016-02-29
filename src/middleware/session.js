import { getSession } from '../controllers/auth'

const sessionMiddleware = async (ctx, next) => {
  const { token } = ctx.req.headers
  ctx.session = await getSession(token)
  return await next()
}

export default sessionMiddleware
