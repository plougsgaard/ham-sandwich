------------------------------------------------------------
-- Create users
-- 
-- digest = SHA256(concat(email,password))
-- password is 'secret'
------------------------------------------------------------

INSERT INTO users (email, role, digest) VALUES
  ('a@a.a', 'ADMIN', 'b89f30366d73367f69e46055bff5778e2e613166868c3394d7ee9e42d843e92e'),
  ('eve@eve.com', 'MOD', '5e6e80425121080b58b7fec9321bdbdea87d7bec38b3528ca1cc730cdde55530'),
  ('test@test.com', 'MEMBER', '5e10841754672c68dc78c9333375bf0ed12121bf25580d975e8c7c23b8621236');
