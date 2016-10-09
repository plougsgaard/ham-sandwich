import { unauthorized } from '../responses'

/**
 * Protect resources that require authentication.
 *
 * Depends on the `sessionMiddleware` having the `session` prior to this.
 */
const authMiddleware = async (ctx, next) => {
  const { session } = ctx
  if (!session) {
    return unauthorized(ctx)
  } else {
    return await next()
  }
}

export default authMiddleware
