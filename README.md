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

`sudo apt-get install postgresql-9.4 postgresql-client-9.4 postgresql-contrib-9.4`

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

### One last thing

The scripts work a lot better if `development` is a superuser.

Start psql as the `postgres` user.

`sudo -u postgres psql`

In the `psql` console:

`ALTER USER development WITH SUPERUSER;`

## nodejs and pm2 on Debian 8

Get `nvm`.

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash`

Install `node`.

`nvm install v5.8.0`

Install `pm2`.

`npm i pm2 -g`

## Setup reverse proxy vhost

`sudo emacs /etc/apache2/sites-available/api.example.com.conf`

```
<VirtualHost *:80>
ServerName api.example.com
ProxyPreserveHost on
ProxyPass / http://localhost:9999/
ProxyPassReverse / http://localhost:9999/
</VirtualHost>
```

`sudo a2ensite api.example.com && sudo service apache2 restart`

## Config

The scripts require a bunch of environment variables. You may optionally set them in `variables.conf`.

Example layout:

```
#!/bin/sh
export NODE_ENV=production
export DB_HOST="localhost"
export DB_NAME="hamwich"
export DB_PORT=5432
export DB_USER="development"
export DB_PASS="development"
export DB_REMOTE_HOST=example.com
export PORT=9999
export SCP_HOST="example.com"
export SCP_PATH="~/hamwich/"
```
