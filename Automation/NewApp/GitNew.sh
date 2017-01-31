#!/bin/bash
# chmod u+x /Users/atlasgroup/Git/CodeBase/Automation/Shell/GitSetup.sh # At command line # Make executable

# Procedure
# New App Automated Build Procedure
  # 01. Get new fake name... www.fakenamegenerator.com
  # 02. Use fake name to open Gmail account
  # 03. Generate random Firebase ID ... http://www.codenamegenerator.com # Color Terms | Microsoft Corporation | Units of Measurement
  # 04. Generate random Github repository name ... http://www.textfixer.com/tools/random-words.php
  # 05. Add new ID info to Google Sheet
  # 06. (optional) Generate Github personal access token (if necessary)
        # Settings > Personal access tokens > Generate new token > Scopes > Repo
  # 07. Enter new app metadata into: Users/atlasgroup/Dropbox/Codebase/Automation/NewApp/GitNew.sh
        # a. Place proper template data in Section II.
        # b. Place new data (above generated) into Section I.
  # 08. Run AppleScript: Users/atlasgroup/Dropbox/Codebase/Automation/NewApp/NewApp.scpt
# What's next?...
  # 01. Run $ polymer serve
  # 02. Edit App
  # 03. Deploy App — by following steps outlined in FirebaseHose.sh

# I. Parameters

  # 1. New Project's Variables: Enter variables that change for each new project
# App metadata passed to iMacro newapp-firebase.js to read
# Reflect to newapp-firebase.js any changes in the order of the (KEY or) VAL arrays
KEY=()
VAL=()

KEY[0]='Short Name'
VAL[0]='ExpenseManager' # Short version, no spaces # e.g., 'LeadBank' # manifest.json > "shortName" | browsers/chrome/manifest.json > "name"

KEY[1]='Long Name'
VAL[1]='Expense Manager' # e.g., 'Lead Bank' # manifest.json > "longName"

KEY[2]='Tag Line'
VAL[2]='Managing Expenses' # DO NOT USE COMMAS! # Otherwise .csv file will require double quotes # http://wiki.imacros.net/CSV_input

KEY[3]='Description'
VAL[3]='Simplified expense tracking.' # index.html > meta | browsers/chrome/manifest.json > "description"

KEY[4]='Google Account' # @gmail.com
VAL[4]='lolachogan' # clarencejvillegas

KEY[5]='Firebase Project Name' # http://www.codenamegenerator.com | Color Terms | Microsoft Corporation | Units of Measurement
VAL[5]='Green Comet' # Firebase project name -- bias for market friendly for URL

KEY[6]='Github Repository Name' # http://www.textfixer.com/tools/random-words.php
VAL[6]='bronze-pineapple' # Github repo name

KEY[7]='Github Personal Access Token' # github.com > logo > Settings > Personal access tokens >
VAL[7]='f3438096b110553112b1ea701aa9386aa72cf4dc' # Token is only shown once, at creation; otherwise, must recreate

#KEY[8]='Firebase API Key'
#VAL[8]= # See Below # Calculated from section 2 value.

  # 2. Template Project's Variables: Project to be copied or cloned
TEMPLATE='ExpenseManager' # VAL[0] Short Name # manifest.json > "shortName" | browsers/chrome/manifest.json > "name"
LONGT='Expense Manager' # VAL[1] Long Name
TAGT='Managing Expenses' # VAL[2] Tag Line
DESCT='Simplified expense tracking.' # VAL[3] Description # index.html > meta | browsers/chrome/manifest.json > "description"
FBT='liberating-architect' # Independent value assigned by Firebase after-the-fact # jessamy-aam # Firbase ID to be replaced
APIKEY='AIzaSyDYfa2hZHT3_9uCMCqcw61nHXQLRASROb0' # Location: Dropbox/Codebase/Automation/NewApp/apikeyNew.txt # Firebase API Key to be replaced

  # 3. User's Variables: Github profile data
# Github username
USER='grayox'
# One-time token showed upon creation only
TOK=${VAL[7]}

  # 4. Calculate and populate API Key
KEY[8]='Firebase API Key'
VAL[8]=$APIKEY

  # 5. Array of trings to replace THIS with THAT
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

  # 6. Filepaths and URIs
BASE='/Users/atlasgroup'
PATH1="$BASE/Dropbox/CodeBase/Automation/Shell" # /Users/atlasgroup/Dropbox/CodeBase/Automation/Shell/
PATH2="$BASE/Git/${VAL[0]}" # /Users/atlasgroup/Git/MyAppNew/
PATH3="$BASE/Dropbox/CodeBase/Automation/NewApp" # /Users/atlasgroup/Dropbox/CodeBase/Automation/NewApp/
#PATH4="$BASE/Git/$TEMPLATE" # /Users/atlasgroup/Git/MyTemplate/
PATH4="$BASE/Local/expense-manager-demo"
PATH5="https://github.com/$USER/${VAL[6]}.git" # https://github.com/grayox/foo-bar.git


# II. Routines and Subroutines

# 1. (WriteToFile) Write app metadata to files for iMacro newapp-firebase.js to read
cd $PATH1 && sh WriteToFile.sh "$PATH3" "${KEY[@]}" "${VAL[@]}" # echo "Stage 1 completed"

# 2. (GitCreate) Create new Github repository
cd $PATH1 && sh GitCreate.sh "${VAL[6]}" "$TOK" # echo "Stage 2 completed"

# 3. (GitCopy) Copy project template
cd $PATH1 && sh GitCopy.sh "$PATH4" "$PATH2" # echo "Stage 3 completed"

# 4. (GitReplace) Find and replace; from THIS to THAT
cd $PATH1 && sh GitReplace.sh "$PATH2" "${THIS[@]}" "${THAT[@]}" # echo "Stage 4 completed"

# 5. (GitSetup) Initialize and push new project to Github
cd $PATH1 && sh GitSetup.sh "$PATH2" "$PATH5" # echo "Stage 5 completed"

# 6. Serve locally
##cd $PATH1 && sh GitServe.sh "$PATH2"
