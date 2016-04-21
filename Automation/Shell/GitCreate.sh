#!/bin/bash
# chmod u+x /Users/atlasgroup/Git/CodeBase/Automation/Shell/GitSetup.sh # At command line # Make executable

# Creates github repository via API

# NAME='foo-bar'
# The name of the repo we're creating
NAME=$1

# TOK='abcdefghijklmnopqrstuvwxyz0123456789abcd'
# From Github. Only shown once, at mint time.
TOK=$2

BASE='https://api.github.com/'
EXT='user/repos'
URL=$BASE$EXT

cd $PATH
#curl -H "Authorization: token $TOK" --data '{"name":"foo-bar"}' https://api.github.com/user/repos
#curl -H "Authorization: token $TOK" --data '{"name":"foo-bar"}' $URL
curl -H "Authorization: token $TOK" --data "{\"name\":\"$NAME\"}" $URL # Use (escaped) double quotes because single quotes prevent variable expansion