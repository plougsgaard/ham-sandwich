## login

`http post localhost:8200/auth/login email=a@a.a digest=b89f30366d73367f69e46055bff5778e2e613166868c3394d7ee9e42d843e92e`

->

```
{
    "token": "2e4518c4-39b0-4e09-a915-bed0b1700085"
}
```

## renew token

`http post localhost:8200/users/renew token:2e4518c4-39b0-4e09-a915-bed0b1700085`

->

```
{
    "expired_at": "2016-09-04T20:59:58.896Z",
    "token": "2e4518c4-39b0-4e09-a915-bed0b1700085"
}
```
