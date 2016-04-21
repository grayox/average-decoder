#!/bin/bash
# chmod u+x /Users/atlasgroup/Git/CodeBase/Automation/Shell/GitSetup.sh # At command line # Make executable

DIR='CodeBase'
REPO='average-decoder'

TEMPLATE='LoanZone' # Project to copy or clone

USER='grayox' # Github username
TOK='dd4cb8a0d0f11264bc9fbc7156079b9fc9c0176e'

BASESH='/Users/atlasgroup/Git/'
BASEGIT='https://github.com/'
EXT='CodeBase/Automation/Shell/'

PATH1=$BASESH$EXT/ # /Users/atlasgroup/Git/CodeBase/Automation/Shell/
PATH2=$BASESH$DIR/ # /Users/atlasgroup/Git/Themes/
URI=$BASEGIT$USER/$REPO.git # https://github.com/grayox/foo-bar.git

# 1. (GitCreate) Create new Github repository
#cd $PATH1 && sh GitCreate.sh "$REPO" "$TOK"

# 2. Clone project template
#cd $BASESH
#cp -r $TEMPLATE/ $DIR/

# 3. (GitSetup) Initialize and push new project to Github
cd $PATH1 && sh GitSetup.sh "$PATH2" "$URI"

# 4. Serve locally
#cd $PATH2
#gulp serve