import _ from 'lodash'

const cleanBodyMiddleware = async (ctx, next) => {
  if (_.get(ctx, 'request.body')) {
    ctx.request.body = _.omitBy(ctx.request.body, (v) => _.isUndefined(v) || '' === _.trim(v))
  }
  return await next()
}

export default cleanBodyMiddleware
