#!/bin/bash
# chmod u+x /Users/atlasgroup/Git/CodeBase/Automation/Shell/GitSetup.sh # At command line # Make executable

# 1. Filepaths and URIs
BASE='/Users/atlasgroup'
PATH1="$BASE/Dropbox/CodeBase/Automation/Shell/" # /Users/atlasgroup/Dropbox/CodeBase/Automation/Shell/
PATH3="$BASE/Dropbox/CodeBase/Automation/NewApp/" # /Users/atlasgroup/Dropbox/CodeBase/Automation/NewApp/

# 2. Get project name
cd $PATH3 && FILE_DATA_PROJECT=`cat projectName.txt`
# And use it to calculate a path
PATH2="$BASE/Git/$FILE_DATA_PROJECT/" # /Users/atlasgroup/Git/MyAppNew/

# 3. Replace old strings...
cd $PATH3 && API_KEY_OLD=`grep \".*\" apikeyOld.txt` # Returns only regex match between quotes # http://www.cyberciti.biz/faq/grep-regular-expressions/
cd $PATH3 && FILE_DATA_OLD=`grep \".*\" fbidOld.txt` # Returns only regex match between quotes # http://www.cyberciti.biz/faq/grep-regular-expressions/
# cd $PATH3 && FILE_DATA_OLD=`cat fbidOld.txt` #FILE_DATA_OLD="JessamyAam" # Prints entire file (including newlines, tabs, invisible characters, etc.)
FILE_DATA_OLD=${FILE_DATA_OLD//\"/} # echo "$FILE_DATA" # http://stackoverflow.com/a/34819300/1640892

# 4. ...with new strings
cd $PATH3 && API_KEY_NEW=`grep -i \".*\" apikeyNew.txt` # Returns only regex match between quotes # http://www.cyberciti.biz/faq/grep-regular-expressions/
cd $PATH3 && FILE_DATA_NEW=`grep -i \".*\" fbidNew.txt` # Returns only regex match between quotes # http://www.cyberciti.biz/faq/grep-regular-expressions/
# cd $PATH3 && FILE_DATA_NEW=`cat fbidNew.txt` # Prints entire file (including newlines, tabs, invisible characters, etc.)
FILE_DATA_NEW=${FILE_DATA_NEW//\"/} # echo "$FILE_DATA" # http://stackoverflow.com/a/34819300/1640892

# 5. Array of trings to replace THIS with THAT
THIS=() # from THIS...
THAT=() # ...to THAT
THIS[0]=$FILE_DATA_OLD
THAT[0]=$FILE_DATA_NEW
THIS[1]=$API_KEY_OLD
THAT[1]=$API_KEY_NEW

# 6. Array of trings to replace THIS with THAT
cd $PATH1 && sh GitReplace.sh "$PATH2" "${THIS[@]}" "${THAT[@]}"
#echo $FILE_DATA_OLD
#echo $FILE_DATA_NEW