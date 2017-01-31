#!/bin/bash
# chmod u+x /Users/atlasgroup/Dropbox/CodeBase/Automation/Shell/GitBackup.sh # At command line # Make executable

REPO='average-decoder'
SUB='CodeBase'
#DIR='Dropbox'
DIR='Git'
BASE='/Users/atlasgroup/'

cd $BASE$DIR/$SUB

#git add -A
#git push -u origin master
#git push

git add -A
git commit -m "new commit"
git push -u origin master

#git remote add <name> <url>
#git remote --verbose