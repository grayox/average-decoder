#!/bin/bash
# chmod u+x /Users/atlasgroup/Git/CodeBase/Automation/Shell/GitSetup.sh # At command line # Make executable

# Creates github repository via API
# http://superuser.com/a/1067852/471181

# NAME='foo-bar'
# Name of repo to be created
NAME=$1

# TOK='abcdefghijklmnopqrstuvwxyz0123456789abcd'
# From Github. Only shown once, at mint time.
TOK=$2

BASE='https://api.github.com/'
EXT='user/repos'
URL=$BASE$EXT

#echo "Token: $TOK"
#echo "Name: $NAME"
#echo "Url: $URL"
#curl -H "Authorization: token abcdefghijklmnopqrstuvwxyz0123456789abcd" --data '{"name":"foo-bar"}' https://api.github.com/user/repos
#curl -H "Authorization: token $TOK" --data '{"name":"foo-bar"}' https://api.github.com/user/repos
#curl -H "Authorization: token $TOK" --data '{"name":"foo-bar"}' $URL
curl -H "Authorization: token $TOK" --data "{\"name\":\"$NAME\"}" $URL # Use (escaped) double quotes because single quotes prevent variable expansion
