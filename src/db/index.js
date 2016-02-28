const pgp = require('pg-promise')({})
const config = {
  host: 'localhost',
  port: 5432,
  database: 'ham',
  user: 'development',
  password: 'development'
}
const database = pgp(config)
export default database
