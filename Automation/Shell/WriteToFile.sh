#!/bin/bash
# chmod u+x /Users/atlasgroup/Git/CodeBase/Automation/Shell/GitSetup.sh # At command line # Make executable

# (WriteToFile) Write app metadata to file for iMacro newapp-firebase.js to read

# Find and replace
# http://stackoverflow.com/a/9709296/1640892 # Longer, automated (wildcard) version
# http://stackoverflow.com/a/525612/1640892 # Used this one

# Path to local directory
LOCAL=$1 # echo "Local: $LOCAL"

DELEMETER=','

# Serialized array of strings passed in as variable argument
A=("$@") # echo "A: ${A[@]}" # foo bar baz bat

# Add delemeter to each array element
function join { local IFS="$1"; shift; echo "$*"; } # http://stackoverflow.com/a/17841619/1640892 # http://stackoverflow.com/a/8743103/1640892
# join $DELEMETER "${A[@]}"

# Split single array into two sub-array
LENGTH=${#A[@]} # echo "Length: $LENGTH"
SPLIT=$(( ((LENGTH-1)/2) )) # echo "Split: $SPLIT"

KEY=("${A[@]:1:$SPLIT}") # echo "key: ${KEY[@]}"
K=$( join $DELEMETER "${KEY[@]}" ) # echo "K: $K"
echo "$K" > "$LOCAL/data.csv" # > creates / overwrites file # http://stackoverflow.com/a/4662971/1640892

VAL=("${A[@]:$((SPLIT+1)):$LENGTH}") # echo "val: ${VAL[@]}"
V=$( join $DELEMETER "${VAL[@]}" ) # echo "V: $V"
echo "$V" >> "$LOCAL/data.csv" # >> appends # Add new line
echo "${VAL[0]}" > "$LOCAL/projectName.txt" # > creates / overwrites file # http://stackoverflow.com/a/4662971/1640892 # echo ${VAL[0]} | tee $LOCAL/projectName.txt # http://stackoverflow.com/a/22713704/1640892
