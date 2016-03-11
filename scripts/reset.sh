#!/bin/bash

## helpers
function variable_exists {
  if [[ -z ${!1} ]];
  then
    echo "  $1.. ERROR"
    exit 1
  else
    echo "  $1.. OK - ${!1:0:4}[snip]"
  fi
}

## variables
variables_config="variables.config"

if [ "$1" = "remote" ]
then
  echo "Reset DB - remote"

  ## load secret config if it exists
  if [[ -f $variables_config ]]
  then
    echo "Loading environment from $variables_config"
    source $variables_config
  fi

  ## assertions (remote)
  variable_exists DB_REMOTE_HOST

  host=$DB_REMOTE_HOST
else
  echo "Reset DB - local"

  echo "Setting defaults (probably want this in local)"

  DB_USER=${DB_USER:-development}
  DB_PASS=${DB_PASS:-development}
  DB_NAME=${DB_NAME:-hamwich}
  host=${DB_HOST:-localhost}
fi

## assertions
echo "Checking environment variables.."
variable_exists host
variable_exists DB_USER
variable_exists DB_NAME
variable_exists DB_PASS

echo "Creating ~/.pgpass"
echo "$host:5432:*:$DB_USER:$DB_PASS" > ~/.pgpass
chmod 0600 ~/.pgpass

echo "Dropping database $DB_USER@$host:$DB_NAME"
dropdb --if-exists -h $host -U $DB_USER $DB_NAME || exit 1

echo "Creating database $DB_USER@$host:$DB_NAME"
createdb -h $host -U $DB_USER -O $DB_USER $DB_NAME || exit 1

echo "Creating relations"
psql -h $host -U $DB_USER -d $DB_NAME -f ./sql/schema.sql || exit 1

echo "Hydrating"
psql -h $host -U $DB_USER -d $DB_NAME -f ./sql/seed.sql || exit 1

echo "Removing ~/.pgpass"
rm ~/.pgpass
