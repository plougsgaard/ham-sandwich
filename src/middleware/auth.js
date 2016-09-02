import Boom from 'boom'
import { getSession } from '../controllers/auth'

/**
 * Protect resources that require authentication.
 *
 * Depends on the `sessionMiddleware` having the `session` prior to this.
 */
const authMiddleware = async (ctx, next) => {
  const { session } = ctx
  if (!session) {
    ctx.body = Boom.unauthorized('(╯°□°）╯︵ ┻━┻')
    ctx.status = 401
  } else {
    return await next()
  }
}

export default authMiddleware
