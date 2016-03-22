-- Schema quickstart by https://github.com/danneu

------------------------------------------------------------
------------------------------------------------------------

CREATE TYPE user_role AS ENUM ('ADMIN', 'MOD', 'MEMBER', 'BANNED');

CREATE TABLE users (
  id             uuid PRIMARY KEY,
  role           user_role NOT NULL DEFAULT 'MEMBER'::user_role,
  name           text NOT NULL,
  digest         text NOT NULL,
  email          text UNIQUE NOT NULL,
  --
  last_online_at timestamptz NOT NULL DEFAULT NOW(),
  created_at     timestamptz NOT NULL DEFAULT NOW()
);

-- Speed up lower(email) lookup
CREATE INDEX lower_email ON users (lower(email));

------------------------------------------------------------
------------------------------------------------------------

CREATE TABLE sessions (
  id             uuid PRIMARY KEY,
  user_id        uuid NOT NULL REFERENCES users(id),
  ip_address     inet NOT NULL,
  user_agent     text NULL,
  --
  logged_out_at  timestamptz NULL,
  expired_at     timestamptz NOT NULL DEFAULT NOW() + INTERVAL '2 weeks',
  created_at     timestamptz NOT NULL DEFAULT NOW()
);

-- Speed up user_id FK joins
CREATE INDEX sessions__user_id ON sessions (user_id);

CREATE VIEW active_sessions AS
  SELECT *
  FROM sessions
  WHERE expired_at > NOW()
    AND logged_out_at IS NULL;

------------------------------------------------------------
------------------------------------------------------------

CREATE TABLE reset_tokens (
  user_email     text NOT NULL REFERENCES users(email),
  token          uuid NOT NULL,
  --
  used_at        timestamptz NULL,
  expired_at     timestamptz NOT NULL DEFAULT NOW() + INTERVAL '3 days',
  created_at     timestamptz NOT NULL DEFAULT NOW()
);

CREATE VIEW active_reset_tokens AS
  SELECT *
  FROM reset_tokens
  WHERE expired_at > NOW()
    AND used_at IS NULL;

------------------------------------------------------------
------------------------------------------------------------

CREATE TABLE foods (
  id             uuid PRIMARY KEY,
  name           text NOT NULL,
  --
  calories       smallint NOT NULL DEFAULT 0 CHECK(calories >= 0),
  proteins       real NOT NULL DEFAULT 0 CHECK(proteins >= 0),
  carbohydrates  real NOT NULL DEFAULT 0 CHECK(carbohydrates >= 0),
  sugars         real NOT NULL DEFAULT 0 CHECK(sugars >= 0),
  fat            real NOT NULL DEFAULT 0 CHECK(fat >= 0),
  saturated      real NOT NULL DEFAULT 0 CHECK(saturated >= 0),
  fibres         real NOT NULL DEFAULT 0 CHECK(fibres >= 0),
  salt           real NOT NULL DEFAULT 0 CHECK(salt >= 0),
  --
  created_by     uuid NOT NULL REFERENCES users(id),
  created_at     timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE brands (
  id             uuid PRIMARY KEY,
  name           text NOT NULL,
  --
  created_by     uuid NOT NULL REFERENCES users(id),
  created_at     timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE foods_brands (
  food_id        uuid NOT NULL REFERENCES foods(id),
  brand_id       uuid NOT NULL REFERENCES brands(id),
  --
  created_by     uuid NOT NULL REFERENCES users(id),
  created_at     timestamptz NOT NULL DEFAULT NOW()
);

CREATE VIEW foods_with_brands AS
  SELECT f.*, b.id AS brand_id, b.name AS brand_name
  FROM foods f
  LEFT JOIN foods_brands fb on f.id = fb.food_id
  LEFT JOIN brands b on b.id = fb.brand_id;
