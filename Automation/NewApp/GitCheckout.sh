#!/bin/bash
# chmod u+x /Users/atlasgroup/Git/CodeBase/Automation/Shell/GitCheckout.sh # At command line # Make executable

# Checks out project from Github.
# Useful for viewing a demo by running in local browser # http://stackoverflow.com/a/37777277/1640892

# Example Code
# npm install -g bower
# npm install -g polymer-cli
#
# Trial 1
# Begin Procedure
# git clone https://github.com/firebase/polymerfire.git
# cd polymerfire
# bower install
# polymer serve
# open http://localhost:8080/components/polymerfire/demo/
# End Procedure
#
# Trial 2
# Begin Procedure
# git clone https://github.com/vaadin/expense-manager-demo.git
# cd expense-manager-demo
# bower install
# polymer serve
# open http://localhost:8080/
# End Procedure

# Note: Must run 'open' command manually for now. Until can implement a fix.
# Running from script produces the following error:
# error "fatal: could not create work tree dir 'expense-manager-demo'.: Permission denied" number 128

# User input variables
USER='vaadin' # Name of Github user # e.g., vaadin firebase
REPO='expense-manager-demo' # Name of Github repository # e.g., expense-manager-demo polymerfire

# Parameters
BASE='https://github.com'
P="$BASE/$USER/$REPO.git" # 'https://github.com/firebase/polymerfire.git'

# Instructions
git clone $P
##cd "$REPO" && bower install && polymer serve
# To open demo...
#open http://localhost:8080/components/polymerfire/demo/
#open http://localhost:8080/components/$REPO/demo/
# To open main...
#open http://localhost:8080/
