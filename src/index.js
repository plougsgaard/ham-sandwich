// needs to be run before everything else
require('babel-core/register')
require('babel-polyfill')

// and then we can bootstrap the server
require('./server')()
