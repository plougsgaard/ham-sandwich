import { QueryResultError } from 'pg-promise'

const errors = async (ctx, next) => {
  try {
    await next()
  }
  catch (err) {
    if (err instanceof QueryResultError) {
      ctx.status = 404
    } else {
      console.error(err)
      ctx.status = 500
    }
  }
}

export default errors
