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

# from lxml import html
# import requests

# '''
import urllib2

url = 'http://usa.newonnetflix.info/catalog/rating/all/8'

req = urllib2.Request(url)
response = urllib2.urlopen(req)
page = response.read()
print page

'''
assert isinstance(page.content, object)
tree = html.fromstring(page.content)

# This will create a list of buyers:
buyers = tree.xpath('//div[@title="buyer-name"]/text()')
# This will create a list of prices
prices = tree.xpath('//span[@class="item-price"]/text()')

print 'Buyers: ', buyers
print 'Prices: ', prices
'''


