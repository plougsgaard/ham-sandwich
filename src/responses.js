const getError = (status, error, message) => ({
  status,
  body: {
    error,
    message,
    status
  }
})

const getResponse = (status, body) => ({
  status,
  body
})

const createdBody = {
  message: 'ヽ(^。^)ノ'
}
export const created = (ctx, body = createdBody) =>
  Object.assign(ctx, getResponse(201, body))

const noContentBody = {
  title: 'No Content',
  message: '(=^・・^=)'
}
export const noContent = (ctx, body = noContentBody) =>
  Object.assign(ctx, getResponse(204, body))

const badRequestText = {
  error: 'Bad Request',
  message: '(・へ・)'
}
export const badRequest = (ctx, error = badRequestText.error, message = badRequestText.message) =>
  Object.assign(ctx, getError(400, error, message))

const unauthorizedText = {
  error: 'Unauthorized',
  message: '(╯°□°）╯︵ ┻━┻'
}
export const unauthorized = (ctx, error = unauthorizedText.error, message = unauthorizedText.message) =>
  Object.assign(ctx, getError(401, error, message))

const notFoundText = {
  error: 'Not Found',
  message: '┬─┬ノ( º _ ºノ)'
}
export const notFound = (ctx, error = notFoundText.error, message = notFoundText.message) =>
  Object.assign(ctx, getError(404, error, message))

const badImplementationText = {
  error: 'Bad Implementation',
  message: '¯\(º o)/¯'
}
export const badImplementation = (ctx, error = badImplementationText.error, message = badImplementationText.message) =>
  Object.assign(ctx, getError(500, error, message))
