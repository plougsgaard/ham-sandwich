------------------------------------------------------------
-- users
--
-- digest = SHA256(concat(email,password))
-- password is 'secret'
------------------------------------------------------------

INSERT INTO users (id, email, role, name, digest) VALUES
  ('526b896f-00f0-4823-9338-1faf530c35cc', 'a@a.a', 'ADMIN', 'Abraham Anthon', 'b89f30366d73367f69e46055bff5778e2e613166868c3394d7ee9e42d843e92e'),
  ('e3e19f38-31ed-45b1-8424-565488390daf', 'eve@eve.com', 'MOD', 'Evelyn Everest', '5e6e80425121080b58b7fec9321bdbdea87d7bec38b3528ca1cc730cdde55530'),
  ('f4ac6cd1-f3ce-400f-913a-b6c1b5b5cf3f', 'test@test.com', 'MEMBER', 'Tesy Tomato Grundwald', '5e10841754672c68dc78c9333375bf0ed12121bf25580d975e8c7c23b8621236');

------------------------------------------------------------
-- foods
------------------------------------------------------------

INSERT INTO foods (created_by, id, name, calories, carbohydrates) VALUES
  ('526b896f-00f0-4823-9338-1faf530c35cc', '5363a8fd-9d28-4ec9-a9b6-a8ed36dab6b1', 'Økologisk Æblemost', 43, 11);
INSERT INTO foods (created_by, id, name, calories, carbohydrates) VALUES
  ('526b896f-00f0-4823-9338-1faf530c35cc', '07dd4505-2ef7-4b22-a242-02e9ea2d190a', 'Orange Juice with Bits', 44, 9.1);

------------------------------------------------------------
-- brands
------------------------------------------------------------

INSERT INTO brands (created_by, id, name) VALUES
  ('526b896f-00f0-4823-9338-1faf530c35cc', '6d2b8662-cf12-4c60-91f5-a693fc06a9fb', 'Princip'),
  ('526b896f-00f0-4823-9338-1faf530c35cc', 'a4a28c5c-3c9f-4597-9a75-716de5599bb8', 'Homemade'),
  ('526b896f-00f0-4823-9338-1faf530c35cc', '34a3ca13-0b0e-4356-a732-fa0ab34cc4da', 'Juicorganic');

------------------------------------------------------------
-- foods_brands
------------------------------------------------------------

INSERT INTO foods_brands (created_by, food_id, brand_id) VALUES
  ('526b896f-00f0-4823-9338-1faf530c35cc', '5363a8fd-9d28-4ec9-a9b6-a8ed36dab6b1', '34a3ca13-0b0e-4356-a732-fa0ab34cc4da');
