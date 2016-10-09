# Request Examples

Remember to `brew install httpie` (or similar) first if you're not a cool `curl`-hipster.

## login

```
→ http post localhost:8200/auth/login email=a@a.a digest=b89f30366d73367f69e46055bff5778e2e613166868c3394d7ee9e42d843e92e

{
    "expired_at": 1478393667915,
    "token": "2e4518c4-39b0-4e09-a915-bed0b1700085"
}
```

## renew token

```
→ http post localhost:8200/users/renew token:2e4518c4-39b0-4e09-a915-bed0b1700085

{
    "expired_at": "2016-09-04T20:59:58.896Z",
    "token": "2e4518c4-39b0-4e09-a915-bed0b1700085"
}
```

## add

### food/brand combination

```
→ http post http://localhost:8200/foods token:2e4518c4-39b0-4e09-a915-bed0b1700085 < foods_check_sugars.json

```

<!-- http post http://localhost:8200/foods token:eb803c30-2396-44fd-92d0-1c3f8f6b9a31 < foods_check_sugars.json -->
