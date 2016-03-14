-- Schema quickstart by https://github.com/danneu

------------------------------------------------------------
------------------------------------------------------------

CREATE TYPE user_role AS ENUM ('ADMIN', 'MOD', 'MEMBER', 'BANNED');

CREATE TABLE users (
  id             serial PRIMARY KEY,
  role           user_role NOT NULL DEFAULT 'MEMBER'::user_role,
  name           text NOT NULL,
  digest         text NOT NULL,
  email          text UNIQUE NOT NULL,
  last_online_at timestamptz NOT NULL DEFAULT NOW(),
  created_at     timestamptz NOT NULL DEFAULT NOW()
);

-- Speed up lower(email) lookup
CREATE INDEX lower_email ON users (lower(email));

------------------------------------------------------------
------------------------------------------------------------

CREATE TABLE sessions (
  id            uuid PRIMARY KEY,
  user_id       int  NOT NULL REFERENCES users(id),
  ip_address    inet NOT NULL,
  user_agent    text NULL,
  logged_out_at timestamptz NULL,
  expired_at    timestamptz NOT NULL DEFAULT NOW() + INTERVAL '2 weeks',
  created_at    timestamptz NOT NULL DEFAULT NOW()
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
  user_email    text NOT NULL REFERENCES users(email),
  token         uuid NOT NULL,
  used_at       timestamptz NULL,
  expired_at    timestamptz NOT NULL DEFAULT NOW() + INTERVAL '3 days',
  created_at    timestamptz NOT NULL DEFAULT NOW()
);

CREATE VIEW active_reset_tokens AS
  SELECT *
  FROM reset_tokens
  WHERE expired_at > NOW()
    AND used_at IS NULL;
