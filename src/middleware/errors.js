import { errors } from 'pg-promise'

import { badRequest, notFound, badImplementation } from '../responses'

/**
 * Catch and react to certain errors in handling requests.
 *
 * This likely isn't a good way to handle errors.
 */
const errorsMiddleware = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof errors.QueryResultError) {
      return notFound(ctx)
    }
    const { routine, detail, constraint, table, column } = err
    switch (routine) {
      case 'ExecConstraints':
        return badRequest(ctx, 'Constraint Violated', { constraint, detail, table, column })
      default:
        // if we aren't able to determine more we should probably log the error
        console.error(err)
        return badImplementation(ctx)
    }
  }
}

export default errorsMiddleware
