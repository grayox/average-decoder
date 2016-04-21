#!/bin/bash
# chmod u+x /Users/atlasgroup/Git/CodeBase/Automation/Shell/GitBackup.sh # At command line # Make executable

DIR='/Users/atlasgroup/Git/'

for i in `ls $DIR`; do
  cd $DIR$i
  git push
done