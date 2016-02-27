import bunyan from 'bunyan'
import restify from 'restify'

export const log = bunyan.createLogger({
  name: process.env.NAME || 'ham-sandwich',
  streams: [
    {
      level: (process.env.LOG_LEVEL || 'info'),
      stream: process.stderr
    },
    {
      // This ensures that if we get a WARN or above all debug records
      // related to that request are spewed to stderr - makes it nice
      // filter out debug messages in prod, but still dump on user
      // errors so you can debug problems
      level: 'debug',
      type: 'raw',
      stream: new restify.bunyan.RequestCaptureStream({
        level: bunyan.WARN,
        maxRecords: 100,
        maxRequestIds: 1000,
        stream: process.stderr
      })
    }
  ],
  serializers: restify.bunyan.serializers
})
