import Boom from 'boom'
import { QueryResultError } from 'pg-promise'

const errors = async (ctx, next) => {
  try {
    await next()
  }
  catch (err) {
    if (err instanceof QueryResultError) {
      ctx.body = Boom.notFound('¯\(º o)/¯')
      ctx.status = 404
    } else {
      ctx.body = Boom.badImplementation('Welp')
      ctx.status = 500
    }
  }
}

export default errors
