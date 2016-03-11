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

## load secret config if it exists
if [[ -f $variables_config ]]
then
  echo "Loading environment from $variables_config"
  source $variables_config
fi

## assertions
echo "Checking environment variables.."
variable_exists REMOTE_HOST
variable_exists REMOTE_PATH
variable_exists NODE_ENV
variable_exists PORT

## build
echo "Building"
babel src -d dist || exit 1

## sc(hhi)p it
echo "Copying files"
ssh $REMOTE_HOST -t "mv $REMOTE_PATH $REMOTE_PATH$(date +%s)"
scp -r dist $REMOTE_HOST:$REMOTE_PATH
scp package.json $REMOTE_HOST:$REMOTE_PATH/
#ssh $REMOTE_HOST -t 'bash -l -c "cd $REMOTE_PATH && npm install && pm2 start ."'
ssh $REMOTE_HOST -t 'bash -l -c ". ~/.nvm/nvm.sh; cd '"$REMOTE_PATH"' && npm install && pm2 restart all"'

## TEMPLATE ssh $REMOTE_HOST -t 'bash -l -c ". ~/.nvm/nvm.sh; "'
## ssh ratio.dk -t 'bash -l -c "cd hamwich && . ~/.nvm/nvm.sh; npm version"'
