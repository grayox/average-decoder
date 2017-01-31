// JSON visualization | viewers: http://chris.photobooks.com/json/default.htm | http://www.jsoneditoronline.org/
// function getEmailQuota(){Logger.log("Remaining email quota: " + MailApp.getRemainingDailyQuota());}
// Note: to accept doPost() from affiliate, (design decision:) must set: Publish > Deploy as web app > Execute the app as: me, Who has access to the app: Anyone, even anonymous // Otherwise, script will not run at server (though, client will receive responseCode=200); client response (200) is Google accounts sign-in page/form  // Decision Benefits: 1. script runs 2. script authorization bypass (i.e., not needed at UI) // Decision Costs: 1. Looser script security; mitigated by a. Site level access restrictions/permissions b. key method (e.g., switch/case k:foo)
// jsUtil: Project key: ML3EbVg2TGajF7030mhZrv7JBVAOpzh88
function auth    (){}
function timer   (){Logger.log(new Date().getTime())}//1388228703613
//function importDataFromFile(id){id=id||"0B1LVOoV_2dFtZGVkQW1MeGNyNnM";ScriptDb.getMyDb().saveBatch(JSON.parse(DocsList.getFileById(id).getContentAsString()),false)} // Imports array of objects from, say, a backup file
function print2doc(str,proj,clas){var desc="Data | "+proj+" | "+clas+" | timestamp:"+new Date().getTime(),id=DriveApp.createFile(desc,str,MimeType.HTML).setDescription(desc);Logger.log("Printed doc ID: "+id)}
function print2ss(){LibraryjsUtil.write2ss(true,showAll(),"Sheet1","1azZ5rq1Sgy2fipwhwd75f9M6jkzvWk4TZmOzH2A4uRg"/*act*/)}
function getValue(vin){
  // http://www.cargurus.com/Cars/instantMarketValueFromVIN.action?startUrl=%2F&carDescription.vin=4T4BF1FK4FR487650
}
/** /
DEPRECATED - Abandoning development of cargurus inventory search engine because no HTML info re: dealer, VIN or database ID for detail query is available from list page; exploring edmunds.com
function searchInventory(zip,page) {page=page||1; // function test(){Logger.log(JSON.stringify(searchInventory(24541,2)))}
  var i,ar,str,out=[],act="http://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?sourceContext=carGurusHomePage_false_0&newSearchFromOverviewPage=true&inventorySearchWidgetType=AUTO&zip=24541&distance=25#resultsPage="+page 
  // http://www.cargurus.com/Cars/autos/carFinderNew.action?zip=24541&yearLowerBound=2000
  // http://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?sourceContext=carGurusHomePage_false_0&newSearchFromOverviewPage=true&inventorySearchWidgetType=AUTO&zip=24541&distance=25#resultsPage=2
  // http://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?sourceContext=carGurusHomePage_false_0&newSearchFromOverviewPage=true&inventorySearchWidgetType=AUTO&entitySelectingHelper.selectedEntity=&entitySelectingHelper.selectedEntity2=&zip=24541&distance=25&searchChanged=true&promotionsOnly=true&modelChanged=true&filtersModified=true
  ,   KEY = [ , 'imgSrc' , 'name'            ]
  ,   QUE = [ , '<img '  , 'itemprop="name"' ]
  ,   BEG = [ , 'src="'  , '>'               ]    
  ,   END = [ , '"'      , '<'               ]
  ,   DEL = [ , null       , null     , ["&nbsp;","\r","\n","  "] , ["\r","\n"," ",","] , null   , null   , [","]       /* , null             * / , [","]        , null        , null             , null        , null         , null                , null             , null              , null             , null          , null           ]
  ,   INS = [ , null       , null     , [""      ,""  ,""  ,""  ] , [""  ,""  ,"" ,"" ] , null   , null   , [""]        /* , null             * / , [""]         , null        , null             , null        , null         , null                , null             , null              , null             , null          , null           ]
  ;   try{str=UrlFetchApp.fetch(act).getContentText().split("staticListingOverviewContents").slice(1).join("")}catch(e){Logger.log("Error wT8sx: "+e.message);return false}//return(str);
      ar=str.split("cg-dealFinder-result-wrap clearfix").slice(1);i=ar.length;while(i--){out[i]=LibraryjsUtil._scrapeDataset(ar[i],KEY,QUE,BEG,END,DEL,INS)}return out}
/**/
function searchInventory(model,zip,radius,page) {page=page||1;radius=radius||25||10;
  var i,ar,str,out=[],act="http://www.edmunds.com/inventory/used/srp.html?radius="+radius+"&zip="+zip+"&model="+model+"&sort=partner_code&currentpage="+page
  // http://www.edmunds.com/inventory/used/srp.html?radius=25&zip=24541&model=Toyota%7CCorolla+Sedan&sort=partner_code&currentpage=1
  // http://www.edmunds.com/inventory/used/local_inventory.html?locationId=10392&franchiseId=747437&zip=24541&radius=50&year=2014&sort=partner_code&currentpage=1&pagesize=10
  // http://www.edmunds.com/inventory/used/local_inventory.html?locationId=10392&franchiseId=747437&zip=24541&radius=50&year=2014&sort=partner_code&currentpage=1&pagesize=10
  ,   KEY = [ , 'imgSrc' , 'name'            ]
  ,   QUE = [ , '<img '  , 'itemprop="name"' ]
  ,   BEG = [ , 'src="'  , '>'               ]    
  ,   END = [ , '"'      , '<'               ]
  ,   DEL = [ , null       , null     , ["&nbsp;","\r","\n","  "] , ["\r","\n"," ",","] , null   , null   , [","]       /* , null             */ , [","]        , null        , null             , null        , null         , null                , null             , null              , null             , null          , null           ]
  ,   INS = [ , null       , null     , [""      ,""  ,""  ,""  ] , [""  ,""  ,"" ,"" ] , null   , null   , [""]        /* , null             */ , [""]         , null        , null             , null        , null         , null                , null             , null              , null             , null          , null           ]
  ;   try{str=UrlFetchApp.fetch(act).getContentText().split("staticListingOverviewContents").slice(1).join("")}catch(e){Logger.log("Error wT8sx: "+e.message);return false}return(str);
      ar=str.split("cg-dealFinder-result-wrap clearfix").slice(1);i=ar.length;while(i--){out[i]=LibraryjsUtil._scrapeDataset(ar[i],KEY,QUE,BEG,END,DEL,INS)}return out}
function test(){print2doc(searchInventory("Toyota%7CCorolla+Sedan",24541,25,2))}





