# Ham Sandwich?

*'Tis the name given to the sandwich.*

A **REST** server for **nodejs** using

- Koa2 (async/await)
- Postgres (no ORM)
- A dash of *imagination*

## Interface

Examples use `http` from [httpie](https://github.com/jkbrzt/httpie).

#### Login

`http post http://<HOST>:<PORT>/auth/login`

Result:
```
HTTP/1.1 200 OK

{
  "token": "b0e34510-37d7-4916-b116-7e2c17925ad1"
}
```

#### Logout

`http post http://<HOST>:<PORT>/auth/logout token:<TOKEN>`

Result:
```
HTTP/1.1 204 No Content
```

#### Get Users

`http get http://<HOST>:<PORT>/users token:<TOKEN>`

Result*:
```
HTTP/1.1 200 OK

[..]
```

\*actual result omitted for brevity.

## PostgreSQL 9.4.x on Debian 8

This happens to be my current setup and these are my notes.

`sudo apt-get install postgresql-9.4 postgresql-client-9.4`

Enable remote access.

`sudo echo "host all all 0.0.0.0/0 md5" >> /etc/postgresql/9.4/main/pg_hba.conf`

`sudo echo "listen_addresses = '*'" >> /etc/postgresql/9.4/main/postgresql.conf`

Restart and reload. Machine gun approach.

`sudo service postgresql reload`

`sudo service postgresql restart`

Create a user with its own database for good measure.

`createuser development -d -P -r`

This will prompt for a password. Come up with a great one using `apg`.

`createdb -O development development`

