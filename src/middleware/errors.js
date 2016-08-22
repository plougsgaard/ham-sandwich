import Boom from 'boom'
import { QueryResultError } from 'pg-promise'

/**
 * Catch and react to certain errors in handling requests.
 * 
 * This likely isn't a good way to handle errors.
 */
const errorsMiddleware = async (ctx, next) => {
  try {
    await next()
  }
  catch (err) {
    console.error(err)
    if (err instanceof QueryResultError) {
      ctx.body = Boom.notFound('¯\(º o)/¯')
      ctx.status = 404
    } else {
      ctx.body = Boom.badImplementation('Welp')
      ctx.status = 500
    }
  }
}

export default errorsMiddleware
