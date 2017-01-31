#!/bin/bash
# chmod u+x /Users/atlasgroup/Git/CodeBase/Automation/Shell/GitSetup.sh # At command line # Make executable

# I. Parameters

  # 1. New Project's Variables: Enter variables that change for each new project
# App metadata passed to iMacro newapp-firebase.js to read
# Reflect to newapp-firebase.js any changes in the order of the (KEY or) VAL arrays
KEY=()
VAL=()

KEY[0]='Short Name'
VAL[0]='LeadBank' # Short version, no spaces # e.g., 'LeadBank' # manifest.json > "shortName" | browsers/chrome/manifest.json > "name"

KEY[1]='Long Name'
VAL[1]='Lead Bank' # e.g., 'Lead Bank' # manifest.json > "longName"

KEY[2]='Tag Line'
VAL[2]='Referrals. Solved.' # DO NOT USE COMMAS! # Otherwise .csv file will require double quotes # http://wiki.imacros.net/CSV_input

KEY[3]='Description'
VAL[3]='Make referrals to earn referrals.' # index.html > meta | browsers/chrome/manifest.json > "description"

KEY[4]='Google Account'
VAL[4]='josephfcannon' # clarencejvillegas

KEY[5]='Firebase ID'
VAL[5]='sweltering-heat-8577'

KEY[6]='Github Repository Name'
VAL[6]='lantern-console' # Github repo name

KEY[7]='Github Personal Access Token'
VAL[7]='f3438096b110553112b1ea701aa9386aa72cf4dc'

  # 2. Template Project's Variables: Project to be copied or cloned
TEMPLATE='Mojo' # manifest.json > "shortName" | browsers/chrome/manifest.json > "name"
LONGT='Mojo'
TAGT='Credit. Solved.'
DESCT='Turn credit turndowns into sales.' # index.html > meta | browsers/chrome/manifest.json > "description"
FBT='torrid-inferno-5921'

  # 3. User's Variables: Github profile data
# Github username
USER='grayox'
# One-time token showed upon creation only
TOK=${VAL[7]}

  # 4. Array of trings to replace THIS with THAT
THIS=() # from THIS...
THAT=() # ...to THAT
THIS[0]=$TEMPLATE # project name short
THAT[0]=${VAL[0]}
THIS[1]=$LONGT # project name long
THAT[1]=${VAL[1]}
THIS[2]=$TAGT # tag line
THAT[2]=${VAL[2]}
THIS[3]=$DESCT # description
THAT[3]=${VAL[3]}
THIS[4]=$FBT # Firebase ID
THAT[4]=${VAL[5]}

  # 5. Filepaths and URIs
BASE='/Users/atlasgroup'
PATH1="$BASE/Dropbox/CodeBase/Automation/Shell/" # /Users/atlasgroup/Dropbox/CodeBase/Automation/Shell/
PATH2="$BASE/Git/${VAL[0]}/" # /Users/atlasgroup/Git/MyAppNew/
PATH3="$BASE/Dropbox/CodeBase/Automation/NewApp/" # /Users/atlasgroup/Dropbox/CodeBase/Automation/NewApp/
PATH4="$BASE/Git/$TEMPLATE/" # /Users/atlasgroup/Git/MyTemplate/
PATH5="https://github.com/$USER/${VAL[6]}.git" # https://github.com/grayox/foo-bar.git


# II. Routines and Subroutines

# 1. (WriteToFile) Write app metadata to file for iMacro newapp-firebase.js to read
cd $PATH1 && sh WriteToFile.sh "$PATH3" "${KEY[@]}" "${VAL[@]}"

# 2. (GitCreate) Create new Github repository
cd $PATH1 && sh GitCreate.sh "${VAL[6]}" "$TOK"

# 3. (GitCopy) Copy project template
cd $PATH1 && sh GitCopy.sh "$PATH4" "$PATH2"

# 4. (GitReplace) Find and replace; from THIS to THAT
cd $PATH1 && sh GitReplace.sh "$PATH2" "${THIS[@]}" "${THAT[@]}"

# 5. (GitSetup) Initialize and push new project to Github
cd $PATH1 && sh GitSetup.sh "$PATH2" "$PATH5"

# 6. Serve locally
##cd $PATH1 && sh GitServe.sh "$PATH2"