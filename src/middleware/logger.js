import moment from 'moment'

const ppns = (ns) => {
  const nss = ns.toFixed(0)
  if (nss.length <= 3) {
    return `${ns}ns`
  }
  if (nss.length <= 6) {
    return `${(ns/1000).toFixed(0)}μs`
  }
  return `${(ns/1000000).toFixed(0)}ms`
}

const logger = async (ctx, next) => {
  const t0 = process.hrtime()
  await next()

  const [ seconds, nanoseconds ] = process.hrtime(t0)
  const time = seconds ? `${seconds}s` : `${ppns(nanoseconds)}`

  const timestamp = moment().format(`YYYY-MM-DD HH:mm:ss:SS`)

  console.log(`${timestamp} - ${ctx.method} ${ctx.url} - ${time}`)
}

export default logger
