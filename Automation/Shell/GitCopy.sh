#!/bin/bash
# chmod u+x /Users/atlasgroup/Git/CodeBase/Automation/Shell/GitCopy.sh # At command line # Make executable

# TEMPLATE='OldApp/'
# Name of project template to copy
TEMPLATE=$1

# DIR='NewApp/'
# New directory name
DIR=$2

# Copy files recursively into new directory
#echo 'TEMPLATE: '$TEMPLATE
#echo 'DIR: '$DIR
cp -R $TEMPLATE $DIR
# git clone
