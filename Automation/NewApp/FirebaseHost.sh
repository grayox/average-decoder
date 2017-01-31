#!/bin/bash
# chmod u+x /Users/atlasgroup/Git/CodeBase/Automation/Shell/FirebaseHost.sh # At command line # Make executable

# Firebase Host
# Implements CLI for static web hosting on Firebase
# https://firebase.google.com/docs/hosting/quickstart#install-the-firebase-cli
# https://youtu.be/pj2lmXVa84U?t=9m43s

# Install proper tooling
  # EACCESS error reference: https://docs.npmjs.com/getting-started/fixing-npm-permissions
  # 1. Install Homebrew # Reference: brew.sh # Ensures NPM is installed properly to avoid EACCESS errors
  #    $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  # 2. Install npm # Reference: brew.sh
  #    $ brew install node
  # 3. Install firebase-tools
  #    $ npm install -g firebase-tools # Non-recurring task # Also updates to newest version (see notice)

# Start procedure
#  1. Open terminal
#  2. Open default browser
#  3. (While in default browser) Log in to correct Firebase owner account
#  4. $ cd path/to/myproject
#  5. $ firebase logout
#  6. $ firebase login
#  7. ? Allow Firebase to collect anonymous CLI usage information? No (n + <Enter>)
#  8. Observe: ✔  Success! Logged in as myaccount@gmail.com
#  8. $ firebase init
#  9. ? What Firebase CLI features do you want to setup for this folder?
# 10. Database (check)
# 11. Hosting (check)
# 12. <Enter>
# 13. ? What file should be used for Database Rules? (database.rules.json) <Enter>
# 14. ? File database.rules.json already exists. Do you want to overwrite it with the Database Rules for undefined from the Firebase Console? (y/N) No (n + <Enter>)
# 15. ? What do you want to use as your public directory? (public) <Enter>
# 16. What file to deploy? build/bundled
# 17. ? Configure as a single-page app (rewrite all urls to /index.html)? (y/N) Yes (y + <Enter>)
# 18. Observe: ✔  Firebase initialization complete!
# 19. $ polymer build
# 20. Edit: polymer.json.fragments
# 21. $ firebase deploy [ --project <alias_or_project_id> ]
# End procedure
