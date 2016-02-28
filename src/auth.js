import { getSession } from './controllers/auth'

const authMiddleware = async (ctx, next) => {
  const { path } = ctx
  if (path.indexOf('/auth') === 0) {
    return next()
  }
  const { token } = ctx.req.headers
  const session = await getSession(token)
  if (!session) {
    ctx.status = 401
    ctx.body = `${token} is not a session.`
  } else {
    return next()
  }
}

export default authMiddleware
