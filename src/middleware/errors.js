import { QueryResultError } from 'pg-promise'

import { notFound, badImplementation } from '../responses'

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
      return notFound(ctx)
    } else {
      return badImplementation(ctx)
    }
  }
}

export default errorsMiddleware
