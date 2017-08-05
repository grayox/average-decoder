'''
VIRTUAL ENVIRONMENT
$ sudo pip install virtualenv # used this successfully
$ pip install --user virtualenv # but sudo is not recommended, so maybe use this?
$ pip install --user virtualenvwrapper # used this successfully

MODULE INVENTORY
# Shows which modules have been imported
'' '
import sys as s
print s.modules.keys()
'' '
...points to the directory the packages are installed.
This helped me identify the version mismatch between file directory and IDE interpreter:
File > Default Settings > Project Interpreter

INSTALL PROCEDURE
$ pip install <packagename>
$ pip install requests
$ pip install lxml

Or, if error:
$ pip install --user <packagename>
$ pip install --user requests
$ pip install --user lxml
'''

# https://www.youtube.com/watch?v=cKxRvEZd3Mw
# sudo pip install -U scikit-learn
# import sklearn
from sklearn import tree

features = [[130, 1], [140, 1], [150, 0], [170, 0]]
labels = [0, 0, 1, 1]
clf = tree.DecisionTreeClassifier()
clf = clf.fit(features, labels)
print clf.predict([[150, 0]])
'''
