#!/bin/bash
# chmod u+x /Users/atlasgroup/Dropbox/CodeBase/Automation/Shell/GitBackup.sh # At command line # Make executable

F='CodeBase'
D='Git'
S='Dropbox'
BASE='/Users/atlasgroup'
SRC="$BASE/$S" # /Users/atlasgroup/Dropbox
DIR="$BASE/$D" # /Users/atlasgroup/Git


# Copy CodeBase directory from Dropbox to Git
# cp -R "$SRC$F/" "$DIR$F/" # Does not work per http://stackoverflow.com/questions/37080976/error-copying-directories-at-command-line-using-cp/37081202
[[ ! -d "$SRC/$F/" ]] || rm -rf "$DIR/$F/" ; cp -R "$SRC/$F/" "$DIR/$F/" # checks if $dest exists; if it does recursively remove it, then copy $source to $dest # http://stackoverflow.com/a/37083692/1640892

# Iterate thru all files in Git directory and push to remote backup repositories
for i in `ls $DIR/`; do
    echo $i
    cd "$DIR/$i"
    # git push
    # The following procedure updates an existing remote repository
    # To create a new repository, follow below ITEM 2
    # Most common procedure has been to (1) follow steps in ITEM 1. (2) Follow below steps. (3) In step 3, use -f (not -u) (if necessary)
    # See ITEM 4 shortcut summary of above
    git add -A
    git commit -m "new commit"
    git push -u origin master # to force update, use: $ git push -f origin master # Error might read like below ITEM 3
done
#   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
#
# ITEM A - HOW TO CHANGE USER AND CREDENTIALS
# Reference: https://help.github.com/articles/changing-a-remote-s-url/
# Procedure:
# git remote add origin https://github.com/maria-le/redux
# git remote -v
# git remote set-url origin https://github.com/maria-le/redux
#
# git config --list
#
# git config github.user "grayox"
# git config github.token "dd4cb8a0d0f11264bc9fbc7156079b9fc9c0176e"
# git config credential.https://github.com.grayox "grayox"
#
# git config github.user "maria-le"
# git config github.token "982dce956655c06fc4b8d9e5d799d25990c877c3"
# git config credential.https://github.com.maria-le "maria-le"
#
#   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
#
# ITEM A - HOW TO SUBMIT A PULL REQUEST
# Reference: https://github.com/robdodson/mark-down
# Procedure:
#   1. Fork it!
#   2. Create your feature branch: git checkout -b my-new-feature
#   3. Commit your changes: git commit -m 'Add some feature'
#   4. Push to the branch: git push origin my-new-feature
#   5. Submit a pull request :D
#   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
#
# ITEM 1 - HOW TO CHANGE REMOTE ORIGIN
# Reference: https://help.github.com/articles/changing-a-remote-s-url/
# Procedure:
#   1. Open Terminal.
#   2. Change the current working directory to your local project.
#   3. List your existing remotes in order to get the name of the remote you want to change.
#      $ git remote -v
#        origin  git@github.com:USERNAME/REPOSITORY.git (fetch)
#        origin  git@github.com:USERNAME/REPOSITORY.git (push)
#   4. Change your remote's URL from SSH to HTTPS with the git remote set-url command.
#      $ git remote set-url origin https://github.com/USERNAME/OTHERREPOSITORY.git
#      Example: $ git remote set-url origin https://github.com/grayox/emna01
#   5. Verify that the remote URL has changed.
#      $ git remote -v
#        # Verify new remote URL
#        origin  https://github.com/USERNAME/OTHERREPOSITORY.git (fetch)
#        origin  https://github.com/USERNAME/OTHERREPOSITORY.git (push)
#
#   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
#
# ITEM 2 - Create a new repository on the command line
# Note1: Here are instructions how to setup on Github: http://superuser.com/q/1067831/471181
# Note2: Historically, I have not used this method. Instead, I have created new repo manually on github,
# then updated with push (and any necessary orign url resets via ITEM 1: $ git remote set-url...)
# $ echo "# emna02" >> README.md
# $ git init
# $ git add README.md   # Adds a single file to be tracked by git
# $ git add *           # ...  Adds all files to be tracked
# $ git add -A          # Also adds all files to be tracked
# $ git commit -m "first commit"
# $ git remote add origin https://github.com/grayox/brass-beagle-06
# $ git push -u origin master
#
#   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
#
# ITEM 3 - Error message when attempting $ git push -u origin master
# To https://github.com/grayox/bronze-pineapple
# ! [rejected]        master -> master (fetch first)
# error: failed to push some refs to 'https://github.com/grayox/bronze-pineapple'
# hint: Updates were rejected because the remote contains work that you do
# hint: not have locally. This is usually caused by another repository pushing
# hint: to the same ref. You may want to first integrate the remote changes
# hint: (e.g., 'git pull ...') before pushing again.
# hint: See the 'Note about fast-forwards' in 'git push --help' for details.
#
#   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
#
# ITEM 4 - Shortcut procedure summary for backing up github remote repository
#   ------------ verify key backup operations ------------
#   # First, ensure you documented the changes made to the new version and what the plan is for the next version (todo)
#   # Document above changes and todo on the file named dropbox/<appname>/<vx>/README.md
#   ------------ START HERE - create and point git to new remote repository ------------
#   # For convenience, increment sample code by '1' for each task completed (for next time)
#   $ cd dropbox/swap/v05  #            # positions in correct directory
#   $ git remote -v        # (optional) # background info, describes remote repository # optional but RECOMMENDED | skip at your own risk
#   # !important ——— Manually create new repository ——— !important --> login to github using grayox
#   $ git remote set-url origin https://github.com/grayox/brass-beagle-05  # corrects remote location if necessary
#   $ git remote -v    # double checks new remote directory location has been set correctly
#   --- continue here with backup operations ---
#   $ git add -A
#   $ git commit -m "new commit"
#   $ git push -u origin master
#         -OR- (if above `push` command fails, "force" update with...)
#   $ git push -f origin master
#
#   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
