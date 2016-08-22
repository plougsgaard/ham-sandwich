import { getSession } from '../controllers/auth'

/**
 * Decorate the context `ctx` with the session (the user).
 * 
 * If the `token` is invalid the session becomes `null`.
 * The session object is used by controllers to determine rights and permissions.
 * For requests requiring authentication this step helps the `authMiddleware`.
 */
const sessionMiddleware = async (ctx, next) => {
  const { token } = ctx.req.headers
  ctx.session = await getSession(token)
  return await next()
}

export default sessionMiddleware
