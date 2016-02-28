#!/bin/sh
dropdb hamwich
createdb -O development hamwich
psql -h localhost -d hamwich -c "ALTER SCHEMA public OWNER TO development;"
psql -h localhost -U development -d hamwich -f ./sql/schema.sql
psql -h localhost -U development -d hamwich -f ./sql/seed.sql
