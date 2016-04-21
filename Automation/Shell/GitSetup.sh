#!/bin/bash
# chmod u+x /Users/atlasgroup/Git/CodeBase/Automation/Shell/GitSetup.sh # At command line # Make executable

# LOCAL='/Users/atlasgroup/Git/Themes/'
# Local repository location
LOCAL=$1

# REMOTE='https://github.com/grayox/foo-bar.git'
# Remote repository location
REMOTE=$2

cd $LOCAL
# git remote remove origin
git init
git remote add origin $REMOTE
git add -A
git commit -m "first commit"
git push -u origin master
# git push