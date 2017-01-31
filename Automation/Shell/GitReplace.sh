#!/bin/bash
# chmod u+x /Users/atlasgroup/Git/CodeBase/Automation/Shell/GitSetup.sh # At command line # Make executable

# Find and replace
# http://stackoverflow.com/a/9709296/1640892 # Longer, automated (wildcard) version
# http://stackoverflow.com/a/525612/1640892 # Used this one

# Path to local directory
LOCAL=$1 # echo "Local: $LOCAL"

# Serialized array of strings passed in as variable argument
A=("$@") # echo "A: ${A[@]}" # foo bar baz bat
LENGTH=${#A[@]} # echo "Length: $LENGTH"
SPLIT=$(( ((LENGTH-1)/2) )) # echo "Split: $SPLIT"

# Replace $THIS
THIS=("${A[@]:1:$SPLIT}") # echo "This: ${THIS[@]}"

# ...with $THAT
THAT=("${A[@]:$((SPLIT+1)):$LENGTH}") # echo "That: ${THAT[@]}"

cd $LOCAL
for i in ${!THIS[@]}; do # http://unix.stackexchange.com/a/278503/167174
  #echo $i
  echo "This[$i]: ${THIS[$i]}"
  echo "That[$i]: ${THAT[$i]}"
  # http://stackoverflow.com/a/9709296/1640892
  # find . -type f -name '*.txt' -exec sed -i '' s/${THIS[$i]}/${THAT[$i]}/ {} +
  # http://stackoverflow.com/a/525612/1640892
  #sed -i -e 's/Get/Fetch/g' test.sh
  #sed -i '' 's/LoanZone/LeadBank/g' index.html manifest.json
  #sed -i '' 's/LoanZone/LeadBank/g' firebase.json app/index.html app/manifest.json app/config.json app/browsers/chrome/manifest.json
  #sed -i '' 's/LoanZone/LeadBank/g' app/manifest.json #firebase.json app/index.html app/manifest.json app/config.json app/browsers/chrome/manifest.json
  sed -i '' "s/${THIS[$i]}/${THAT[$i]}/g" .firebaserc firebase.json index.html manifest.json config.json app/browsers/chrome/manifest.json
done
