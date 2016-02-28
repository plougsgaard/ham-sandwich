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

*actual result omitted for brevity.
