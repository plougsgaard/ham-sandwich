------------------------------------------------------------
------------------------------------------------------------
--
-- Premature optimization is the root of all evil and this
-- schema file is full of it.
--
-- (>_<)
--
-- I'll show myself out.
--
------------------------------------------------------------
------------------------------------------------------------

-- Enable the uuid functions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

------------------------------------------------------------
------------------------------------------------------------

CREATE TABLE users (
  id uuid PRIMARY KEY,
  role text NOT NULL DEFAULT 'user',
  name text NOT NULL,
  digest text NOT NULL,
  email text UNIQUE NOT NULL,
  --
  last_online_at timestamptz NOT NULL DEFAULT NOW(),
  created_at timestamptz NOT NULL DEFAULT NOW()
  --
  CONSTRAINT role_kind CHECK(role IN ('user', 'admin'))
);

-- Speed up lower(email) lookup
CREATE INDEX lower_email ON users (LOWER(email));

------------------------------------------------------------
------------------------------------------------------------

CREATE TABLE sessions (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id),
  ip_address inet NOT NULL,
  user_agent text NULL,
  --
  logout_at timestamptz NULL,
  expired_at timestamptz NOT NULL DEFAULT NOW() + INTERVAL '2 weeks',
  created_at timestamptz NOT NULL DEFAULT NOW()
);

-- Speed up user_id FK joins
CREATE INDEX sessions__user_id ON sessions (user_id);

CREATE VIEW active_sessions AS
  SELECT id, user_id, expired_at
  FROM sessions
  WHERE expired_at > NOW()
    AND logout_at IS NULL;

------------------------------------------------------------
------------------------------------------------------------

CREATE TABLE reset_tokens (
  user_email text NOT NULL REFERENCES users(email),
  token uuid NOT NULL,
  --
  used_at timestamptz NULL,
  expired_at timestamptz NOT NULL DEFAULT NOW() + INTERVAL '3 days',
  created_at timestamptz NOT NULL DEFAULT NOW()
);

-- Speed up lower(email) lookup
CREATE INDEX reset_tokens__lower_user_email ON reset_tokens (LOWER(user_email));

CREATE VIEW active_reset_tokens AS
  SELECT user_email
  FROM reset_tokens
  WHERE expired_at > NOW()
    AND used_at IS NULL;

------------------------------------------------------------
------------------------------------------------------------

CREATE TABLE foods (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  --
  calories real NULL,
  proteins real NULL,
  carbohydrates real NULL,
  sugars real NULL,
  fat real NULL,
  saturated real NULL,
  fibres real NULL,
  salt real NULL,
  --
  created_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT NOW(),
  deleted_at timestamptz NULL
  --
  CONSTRAINT calories_positive CHECK(calories >= 0)
  CONSTRAINT proteins_positive CHECK(proteins >= 0)
  CONSTRAINT carbohydrates_positive CHECK(carbohydrates >= 0)
  CONSTRAINT sugars_positive CHECK(sugars >= 0)
  CONSTRAINT sugars_lte_carbohydrates CHECK (sugars <= carbohydrates)
  CONSTRAINT fat_positive CHECK(fat >= 0)
  CONSTRAINT saturated_positive CHECK(saturated >= 0)
  CONSTRAINT saturated_lte_fat CHECK(saturated <= fat)
  CONSTRAINT fibres_positive CHECK(fibres >= 0)
  CONSTRAINT salt_positive CHECK(salt >= 0)
);

------------------------------------------------------------
------------------------------------------------------------

CREATE TABLE brands (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  --
  created_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT NOW()
);

------------------------------------------------------------
------------------------------------------------------------

CREATE TABLE foods_brands (
  food_id uuid NOT NULL REFERENCES foods(id),
  brand_id uuid NOT NULL REFERENCES brands(id),
  --
  created_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT NOW()
);

------------------------------------------------------------
------------------------------------------------------------

CREATE VIEW foods_with_brands AS
  SELECT f.*, b.id AS brand_id, b.name AS brand_name
  FROM foods f
  LEFT JOIN foods_brands fb on f.id = fb.food_id
  LEFT JOIN brands b on b.id = fb.brand_id
  WHERE f.deleted_at IS NULL;
