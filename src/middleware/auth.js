import { getSession } from '../controllers/auth'

const authMiddleware = async (ctx, next) => {
  const { session } = ctx
  if (!session) {
    ctx.status = 401
  } else {
    return await next()
  }
}

export default authMiddleware
