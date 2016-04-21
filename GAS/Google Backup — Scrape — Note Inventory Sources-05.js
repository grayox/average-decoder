// Changelog:
// v05. Instead of storing data as fields and records in tables, store portfolio objects as individual records with each top level property name/key being a unique key identifier for efficient retrieval purposes.
// v05. e.g., {uniqueKey001:{address:{...},rate:{...},ltv:{...},upb:{...}},uniqueKey002:{address:{...},rate:{...},ltv:{...},upb:{...}},...}
// JSON visualization | viewers: http://chris.photobooks.com/json/default.htm | http://www.jsoneditoronline.org/
// Production version of SPREADSHEET: https://docs.google.com/spreadsheet/ccc?key=0AlLVOoV_2dFtdHBVTnNNLVZJME95TW5MclpQeWJtVHc&usp=drive_web#gid=0
// Production version of SCRIPT: .... https://script.google.com/macros/d/10-VtEJGh7i2G5K8v81SenrvV5FnXmbRDCa8fMgONvRUch7jeaEYAD2Ws/edit?template=default&uiv=2&tz=America/Los_Angeles&docTitle=Scrape+—+FCI+Exchange&csid=tpUNsM-VI0OyMnLrZPybmTw.13812451237260572209.8828283907119904598&mid=ACjPJvH1vzO2SKIzI9rErEkO_xHem-yo6EjKmA9gB7n8h2aU_ZW4BYpt2c_Pdgm6cakDFeU3DDkP0Hairg51rqw09rUL_kkKBuu-ZFirtxA3zN9LW8E&hl=en_US
// Dropbox archived: ................ Google Backup — Scrape — Note Inventory Sources — xx
function deleteSheet(){SpreadsheetApp.getActive().deleteSheet(SpreadsheetApp.getActive().getSheetByName("Copy of Scraped 1"))} // Deletes specified sheet
function scrape_serverPost(listOb,detailOb,k){ //@return{null} — posts data to server; @param{obj} listOb — scraped from list page; @param{obj} detailOb — scraped from details page
    var /*k=k||"36sgd2m257w2j0sn5isa",*/payload={k:k,list:JSON.stringify(listOb),detail:JSON.stringify(detailOb)};//Logger.log(JSON.stringify(scraped));
    if(UrlFetchApp.fetch("https://script.google.com/macros/s/AKfycbwT66_MExluhggRGS48QQikDxTzElT7F1WWRImBHoKDqEjFdIs/exec",{method:"post",payload:payload}).getResponseCode()==200){Logger.log("Success!");Logger.log(JSON.stringify(payload));return true}}
// ---------- SOURCE 01 : FCI EXCHANGE ---------- volume estimates: 959 (April 2015), 1171 (Jan 2014)
// Redesign notes: Restarting from v04. Store entire portfolio as data object in text file.
function scrape_fciEx_main(){var ob={data:scrape_fciEx_get("0B1LVOoV_2dFtUmdXNDRvQ2JJZk0")};ob.source="fci";ob.timestamp=new Date().getTime();return LibraryjsUtil.write2doc(ob,{id:"1WKKhUdq9DXbVQMs14yqKcISLflgi1D0wTD24Dz0Lq00"})} // MAIN CALL // Data too big to save >> Logger.log(LibraryjsUtil.dbParse({verb:"post",project:"noteExchange",className:"portfolio",ob:{source:"fci",data:ob}}))}
function scrape_fciEx_get(id){ // @param{string} id Document ID of .txt file, T, hosted on Google Drive. T was constructed by 1. browsing to http://www.fciexchange.com/all-loans.php, 2. Copying source code for each page, 3. Manually clicking "Next" link to go to next page of table, 4. Adding each new page to bottom of text file until all pages have been copied and pasted, 5. Upload file to Google Drive, 6. Opening file and copying ID from URL
    var out={},act="https://googledrive.com/host/"+id/*0B1LVOoV_2dFtUmdXNDRvQ2JJZk0*/,str=UrlFetchApp.fetch(act).getContentText()//,out=LibraryjsUtil.htmlTable2object(str)
  //  , ar=str.match(/<table[\s\S]*?>[\s\S]*?<\/table[\s\S]*?>/gmi),i=ar.length;while(i--){try{out=scrape_fciEx_add2portfolio(out,ar[i])}catch(e){}}
        out=scrape_fciEx_add2portfolio(out,str)
      ; return out}//function test(){print2doc(JSON.stringify(scrape_fciEx_get("0B1LVOoV_2dFtUmdXNDRvQ2JJZk0")))}
function scrape_fciEx_add2portfolio(ob,str){out=ob; // @param{object} ob Beginning portfolio object {uniqueKey001:{...},uniqueKey002:{...},...}; @param{string} str HTML of table of new portfolio items; @return{object} out Portfolio with new items added
    var KEY = [ , "link_details" , "prodId" , "city"    , "state" , "link_sellerListings" , "sellerId" , "foo"         , "loanStatus" , "foo"           , "lienPos" , "foo"              , "balBeg" , "foo"               , "balCur" , "foo"       , "rateNote" , "foo"              ,"ask" , "pctUpb" ]
    ,   QUE = [ , "Product ID :" , ""       , ".html\"" , ""      , "Seller ID :"         , ""         , "Loan Status" , "<td "       , "Lien Position" , "<td "    , "Original Balance" , "<td "   , "Principal Balance" , "<td "   , "Note Rate" , "<td "     , "Indicative Offer" , "<"  , "<td "   ]
    ,   BEG = [ , "href=\""      , ">"      , ">"       , " "     , "href=\""             , ">"        , "<"           , ">"          , "<"             , ">"       , "<"                , ">"      , "<"                 , ">"      , "<"         , ">"        , "<td "             , ">"  , ">"      ]
    ,   END = [ , "\""           , "<"      , ","       , "<"     , "\""                  , "<"        , ">"           , "<"          , ">"             , "<"       , ">"                , "<"      , ">"                 , "<"      , ">"         , "<"        , ">"                , "<"  , "<"      ]
    ,  STEM = "http://www.fciexchange.com",str=str||UrlFetchApp.fetch(STEM+"/all-loans.php").getContentText(),ar=str.split("<tr class=\"rowRedGradient-1\"");ar.shift();//Logger.log(ar.length);}
    var i=ar.length;while(i--){ar[i]=LibraryjsUtil._scrapeDataset(ar[i],KEY,QUE,BEG,END,["$",",","%"," of UPB"],["","","",""]);
    // Special Processing — after inspecting results, we process as follows: 1. Eliminate sold/pending 2. Parse address 3. Parse dates
       if(ar[i].city       . length>200){continue}//"Sold"//var keys=Object.keys(ar[i]),j=keys.length;while(j---3){ar[i][keys[j]]=""}ar[i].city="SOLD";}// Bimodal distribution of results: out.city.length<50:for sale;out.city.length<2100:sold or pending
       if(ar[i].state      . length>  2){try  {ar[i].sa =ar[i].city ;var csz=ar[i].state.split(" ");if(csz[csz.length-1].length >2){ar[i].zip  =csz.pop()}else{ar[i].zip=""}ar[i].state=csz.pop();ar[i].city=csz.join(" "); }catch(e){Logger.log(e.message)}}else{ar[i].sa="";ar[i].zip="";} // If out.state.length>2, state={city state zip}, city={sa}
    // if(ar[i].zip        . length>  0){while(ar[i].zip.length<5){ar[i].zip="0"+ar[i].zip}}ar[i].zip=ar[i].zip.slice(0,5);
    //try{ar[i].sa         = LibraryjsUtil.toCaseTitle (ar[i].sa  )         ;}catch(e){Logger.log(e.message)}
      try{ar[i].city       = LibraryjsUtil.toCaseTitle (ar[i].city)         ;}catch(e){Logger.log(e.message)}
      try{ar[i].state      = LibraryjsUtil.stateConvert(ar[i].state,"abbr") ;}catch(e){Logger.log(e.message)}
      try{ar[i].lienPos    = ar[i].lienPos ? ar[i].lienPos.charAt(0) : "X"  ;}catch(e){Logger.log(e.message)}
      try{ar[i].loanStatus = LibraryjsUtil.convrepl(ar[i].loanStatus,{"Performing":"P","Non Performing":"N","Newly Originated":"O"},"X");}catch(e){Logger.log(e.message)}//Logger.log(ar);//var t={"Performing":"P","Non Performing":"N","Newly Originated":"O"},kys=Object.keys(t);ar[i].loanStatus=(kys.indexOf(ar[i].loanStatus)>-1)?t[ar[i].loanStatus]:"X";}
      out[ar[i].prodId]    = ar[i]}return out}
// ---------- SOURCE 02 : NOTE MARKETPLACE ---------- volume estimates: 210 (Jan 2014)
function scrape_noteMktPl_rss(){ // http://www.notemarketplace.com/
    var act = ["http://www.notemarketplace.com/ad-category/performing-notes-for-sale/feed/"/*vol:110*/,"http://www.notemarketplace.com/ad-category/non-performing-notes/feed/"/*vol:51*/,"http://www.notemarketplace.com/ad-category/new-loans-to-fund/feed/"/*vol:31*/]
    ,   str = UrlFetchApp.fetch(act[0]).getContentText()
    ,   doc = XmlService.parse(str)
    ,    ob = xmlToJson(str);
    Logger.log(JSON.stringify(ob))}
function scrape_noteMktPl_list(page){ // http://www.notemarketplace.com/page/1/?s=What+are+you+looking+for%3F&sa=search&scat=0 // 10 records per page, maximum
    var arr,str,page=page||1,STEM="http://www.notemarketplace.com/page/",PARAMS="/?s=What+are+you+looking+for%3F&sa=search&scat=0" // "http://www.notemarketplace.com/page/2/?s=What+are+you+looking+for%3F&sa=search&scat=0" // Cookie: wordpress_logged_in_77d86343e298525b7c02ca2dcc4fc073=CindyAbbott%7C1386200283%7Cbda07d1986569904ab6876a427817957
    ,   KEY = [ , "link_details_1" , "title_1" , "ask_1"                , "loanStatus"  , "link_seller"     , "sellerId"       , "foo"   , "dateListed_1" , "description"         ]
    ,   QUE = [ , "<a "            , "title"   , "class=\"post-price\"" , "rel=\"tag\"" , "class=\"owner\"" , "rel=\"author\"" , "<span" , "<span"        , "class=\"post-desc\"" ]
    ,   BEG = [ , "href=\""        , "=\""     , ">"                    , ">"           , "href=\""         , ">"              , " "     , ">"            , ">"                   ]
    ,   END = [ , "\""             , "\""      , "<"                    , "<"           , "\""              , "<"              , ">"     , "<"            , "<"                   ]
    ,   act=STEM+page+PARAMS;try{if(UrlFetchApp.fetch(act).getResponseCode()==200){str=UrlFetchApp.fetch(act).getContentText()}else{return}}catch(e){Logger.log(e.message);return}
        arr=str.split("<div class=\"post-left\">");arr.shift();var i=arr.length;while(i--){    arr[i]             = LibraryjsUtil._scrapeDataset(arr[i],KEY,QUE,BEG,END,["$",",","%"],["","",""]);
                                                                  /* Special Processing */ try{arr[i].loanStatus  = LibraryjsUtil.convrepl      (arr[i].loanStatus,{"Performing Notes":"P","Non-Performing Notes":"N","New Loans to Fund":"O"},"X");}catch(e){Logger.log(e.message)}
                                                                                           try{arr[i].state       = LibraryjsUtil.stateConvert  (arr[i].state,"abbr")                 ;}catch(e){Logger.log(e.message)}
                                                                                           try{arr[i].city        = LibraryjsUtil.toCaseTitle   (arr[i].city)                         ;}catch(e){Logger.log(e.message)}
		                                                                                   try{arr[i].title_1     = LibraryjsUtil.toCaseTitle   (arr[i].title_1)                      ;}catch(e){Logger.log(e.message)}
		                                                                                   try{arr[i].description = LibraryjsUtil.toCaseSentence(arr[i].description)                  ;}catch(e){Logger.log(e.message)}
                                                                                           try{arr[i].ask_1       = arr[i].ask_1.replace        ("Best Offer","1")                    ;}catch(e){Logger.log(e.message)}
                                                                                          }/*Logger.log(JSON.stringify(arr));*/return arr}
function scrape_noteMktPl_detail(act/*,PHPSESSID,fciAuth*/){act=act||"www.notemarketplace.com/ads/jonesboro-ga-performing-va-loan/";//PHPSESSID=PHPSESSID||"e7298f7bc17376290d9a070cd043c321";fciAuth=fciAuth||"code1%3Dmarianhiers%26code2%3D3261270600de694a9d55de64e67c88aa";
    var KEY = [ , "ask_2"                , "link_details_2" , "title_2"                     , "balCur"                    , "propVal"              , "description_2"  /*, "link_register"* / , "sa"               */ , "city"           , "state"  , "zip"                , "balBeg"            , "borRate"        , "balloon"      , "am"            , "pmtNote"       , "lastPmtAmount"        , "lastPmtDate"        , "originationDate"   , "maturityDate"   , "lienPosition"   , "balSenior"                     , "ownerOccupied"            , "propertyType"   , "sqft"              , "dateListed_2" , "dateListingExpires" , "sqftLot"      , "rent"                   , "valuationDate"            ]
    ,   QUE = [ , "class=\"post-price\"" , "canonical"      , "<title"                      , "Unpaid Principal Balance:" , "Est. Property Value:" , "og:description" /*, "Address:"     * / , "target=\"_blank\""*/ , "Property City:" , "State:" , "Property Zip Code:" , "Original Balance:" , "Interest Rate:" , "Balloon Pmt:" , "Amortization:" , "Note Payment:" , "Last Payment Amount:" , "Last Payment Date:" , "Origination Date:" , "Maturity Date:" , "Note Position:" , "Senior Loan Balance (if any):" , "Owner Occupied Property:" , "Property Type:" , "Building Sq. Ft.:" , "Listed:"      , "Expires:"           , "Lot Sq. Ft.:" , "Monthly Rental Income:" , "Property Valuation Date:" ]
    ,   BEG = [ , ">"                    , "href=\""        , ">"                           , ">"                         , ">"                    , "content='"      /*, "href=\""      * / , ">"                */ , ">"              , ">"      , ">"                  , ">"                 , ">"              , ">"            , ">"             , ">"             , ">"                    , ">"                  , ">"                 , ">"              , ">"              , "$"                             , ">"                        , ">"              , ">"                 , ">"            , ">"                  , ">"            , ">"                      , ">"                        ]
    ,   END = [ , "<"                    , "\""             , " - Note Marketplace</title>" , "<"                         , "<"                    , "'"              /*, "\""           * / , "<"                */ , "<"              , "<"      , "<"                  , "<"                 , "<"              , "<"            , "<"             , "<"             , "<"                    , "<"                  , "<"                 , "<"              , "<"              , " "                             , "<"                        , "<"              , "<"                 , "<"            , "<"                  , "<"            , "<"                      , "<"                        ]
    ,   str = UrlFetchApp.fetch(act/*,{method:"get",headers:{cookie:{PHPSESSID:PHPSESSID,fciAuth:fciAuth}}}*/).getContentText()//;Logger.log(str);
    ,   out = LibraryjsUtil._scrapeDataset(str,KEY,QUE,BEG,END,["$",",","%"],["","",""],false);
    // Special Processing
        try{out.ask_2         = out.ask_2.replace           ("Best Offer","1")                             ;}catch(e){Logger.log(e.message)}
        try{out.lienPosition  = out.lienPosition           ? out.lienPosition.charAt(0)               :"X" ;}catch(e){Logger.log(e.message)}
        try{out.ownerOccupied = LibraryjsUtil.convrepl      (out.ownerOccupied,{"Yes":"OO","No":"NOO"},"X");}catch(e){Logger.log(e.message)}
        try{out.propertyType  = LibraryjsUtil.convrepl      (out.propertyType ,{"Single Family":"SFR"},"X");}catch(e){Logger.log(e.message)}
        try{out.balloon       = LibraryjsUtil.convrepl      (out.balloon      ,{"Yes":true,"No":false},"X");}catch(e){Logger.log(e.message)}
        try{out.state         = LibraryjsUtil.stateConvert  (out.state,"abbr")                             ;}catch(e){Logger.log(e.message)}
		try{out.sa            = ""                                                                         ;}catch(e){Logger.log(e.message)}
        try{out.city          = LibraryjsUtil.toCaseTitle   (out.city)                                     ;}catch(e){Logger.log(e.message)}
        try{out.title_2       = LibraryjsUtil.toCaseTitle   (out.title_2)                                  ;}catch(e){Logger.log(e.message)}
		try{out.description_2 = LibraryjsUtil.toCaseSentence(out.description_2)                            ;}catch(e){Logger.log(e.message)}
    var dar = ["maturityDate","lastPmtDate","originationDate","valuationDate"],i=dar.length;while(i--){try{var j=0,temp=out[dar[i]].split("/");out[dar[i]]={};
                                                                        /*Skip typos: e.g.,"//"*/while(temp[j]==""){j++}out[dar[i]]["month"]=temp[j++].replace(",","");
                                                                                                 while(temp[j]==""){j++}out[dar[i]]["day"  ]=temp[j++].replace(",","");
                                                                                                 while(temp[j]==""){j++}out[dar[i]]["year" ]=temp[j++].replace(",","");}catch(e){Logger.log(e.message)}}/*Logger.log(JSON.stringify(out));*/return out;}
function scrape_noteMktPl_ss    (page){ // Step 1 of 2 // 1. Do an all inclusive list search with possible multiple pages | 2. Grab all the pages and put them in a SS page. | 3. Come back later to get the details individually, one at a time
    var page=page||0;while(++page==1||out.length){var scraped=scrape_noteMktPl_list(page)/*;Logger.log(JSON.stringify(scraped));*/,out=LibraryjsUtil.ao2aa(LibraryjsUtil._flatten(scraped))/*;Logger.log(out);*/
    ,   rangeOut,sheetOut=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Scraped2");sheetOut.insertRowsAfter(sheetOut.getMaxRows()-1,out.length);rangeOut=sheetOut.getRange(sheetOut.getLastRow()+1,1,out.length,out[0].length);rangeOut.setValues(out);}return}
function scrape_noteMktPl_ss2details(){ /* Step 2 of 2 // 1. Fetch details from SS, row 2 (individually, one at-a-time) | 2. Write to server */ var sheetIn=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Scraped2"),rangeIn=sheetIn.getRange(1,1,2,sheetIn.getLastColumn()),datarr=rangeIn.getValues(),datob=LibraryjsUtil.aa2ao(datarr)[0];if(datob.link_details_1/*.slice(0,31)!="http://www.notemarketplace.com/"*/=="link_details_1"||datob.link_details_1.split("/")[3]!="ads"){sheetIn.deleteRow(2);Logger.log("Deleted header row");return}else{try{var scraped=scrape_noteMktPl_detail(datob.link_details_1)}catch(e){sheetIn.deleteRow(2);Logger.log(e.message+" — Scrape failed. URL: "+datob.link_details_1+" — Deleted row.");return}}if(scrape_serverPost(datob,scraped,"3w34xo2xeuyy8jprgmzg")){sheetIn.deleteRow(2)/*Logger.log("Success!")*/}return} // var x=UrlFetchApp.fetch("https://script.google.com/macros/s/AKfycbwT66_MExluhggRGS48QQikDxTzElT7F1WWRImBHoKDqEjFdIs/exec",{method:"post"});Logger.log(x.getResponseCode());Logger.log(x.getContentText());}
// Save the URL of the latest listing
// On future visits, download each page and record until we hit the latest one, then stop. Save the new latest one then repeat.
function scrape_noteMktPl_getMode1(){while(true){try{scrape_noteMktPl_ss2details()}catch(e){Logger.log(e.message);break;}}} // SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Scraped").deleteRow(2);Deleted inside sub function; Different from code source from where this was copied
function scrape_noteMktPl_getMode2(){ // Automatically update/populate individually, on a schedule // 1. Check latest record ID, increment by one, search by product ID | 2. Scrape list data + details URL | 3. Scrape details. | 4. Store ID for repeat cycle to follow
    while(true){var db=ScriptDb.getMyDb(),r=db.query({table:"counter",source:"noteMktPl"}).next();Logger.log(JSON.stringify(r)); 
                var dataList   = scrape_noteMktPl_list(UrlFetchApp.fetch("http://www.fciexchange.com/all-loans.php?prodId="+(++r.value)).getContentText())[0]//;Logger.log(dataList);
                  , dataDetail = scrape_noteMktPl_detail(dataList.link_details);/*Logger.log(dataDetail);*/scrape_noteMktPl_serverPost(dataList,dataDetail);db.save(r/*{table:"counter",source:"noteMktPl",value:13108}*/)}}
function scrape_noteMktPl_getMode3(){ // Verify for sale at any time, on demand, after bid is made
}
// ---------- SOURCE 03 : MOOLAH LIST ---------- volume estimates: 425 (Jan 2014)
function scrape_moolahList_list(page){ // http://www.moolahlist.com/classifieds/results/15 // 15 records per page, "page" increments by 15 in URL file path
    var arr,str,STEM="http://www.moolahlist.com/classifieds/results/" // ,page=page||15 // http://www.moolahlist.com/classifieds/results/30 // Cookie:
    ,   KEY = [ , "link_details" , "status" , "datePosted" , "state" , "ltv" , "amount" , "propertyType" , "loanType" , "lienPos" , "postedBy" ]
    ,   QUE = [ , "<a "          , "<span " , "<td"        , "<td"   , "<td" , "<td"    , "<td"          , "<td"      , "<td"     , "<td"      ]
    ,   BEG = [ , "href=\""      , ">"      , ">"          , ">"     , ">"   , ">"      , ">"            , ">"        , ">"       , ">"        ]
    ,   END = [ , "\""           , "<"      , "<"          , "<"     , "<"   , "<"      , "<"            , "<"        , "<"       , "<"        ]
    ,   act=STEM+page;try{if(UrlFetchApp.fetch(act).getResponseCode()==200){str=UrlFetchApp.fetch(act).getContentText()}else{return}}catch(e){Logger.log(e.message);return}
        arr=str.split("<tr class=\"link\">");arr.shift();var i=arr.length;while(i--){    arr[i]              = LibraryjsUtil._scrapeDataset(arr[i],KEY,QUE,BEG,END,["$",",","%"],["","",""],true)  ;
                                                            /* Special Processing */ try{arr[i].state        = LibraryjsUtil.stateConvert  (arr[i].state,"abbr")                                   ;}catch(e){Logger.log(e.message)}
                                                                                     try{arr[i].id           = function(){var ar=arr[i].link_details.split("/");return ar.slice(ar.length-1)[0]}() ;}catch(e){Logger.log(e.message)}
                                                                                     try{arr[i].lienPos      = arr[i].lienPos ? arr[i].lienPos.charAt(0) : "X"                                     ;}catch(e){Logger.log(e.message)}
																					 try{arr[i].propertyType = LibraryjsUtil.convrepl(arr[i].propertyType,{"Residential":"SFR","Commercial":"CRE","Multifamily":"MUL","Hospitality":"CRE"},"X");}catch(e){Logger.log(e.message)}
																					}/*Logger.log(JSON.stringify(arr));*/return arr}
function scrape_moolahList_detail(act/*,PHPSESSID,fciAuth*/){act=act||"http://www.moolahlist.com/loans/view/1165";//PHPSESSID=PHPSESSID||"e7298f7bc17376290d9a070cd043c321";fciAuth=fciAuth||"code1%3Dmarianhiers%26code2%3D3261270600de694a9d55de64e67c88aa";
    var KEY = [ , "title" , "datePosted" , "status"   , "loanType"    , "security"   , "amount"        , "collateralValue"    , "availDown"               , "ltv"              , "sa"        , "city"   , "state"   , "propertyType"    , "exitPlan"        , "useOfFunds"      , "applicant"   , "agency"   , "creditGrade"    , "phone"          ]
    ,   QUE = [ , "<h1"   , "<em"        , "Status: " , ">Loan Type<" , ">Security<" , ">Loan Amount<" , ">Collateral Value<" , ">Available Downpayment<" , ">Calculated LTV<" , ">Address<" , ">City<" , ">State<" , ">Property Type<" , ">Exit Strategy<" , ">Loan Proceeds<" , ">Applicant<" , ">Agency<" , ">Credit Grade<" , ">Phone Number<" ]
    ,   BEG = [ , ">"     , ">"          , ">"        , "<td>"        , "<td>"       , "<td>"          , "<td>"               , "<td>"                    , "<td>"             , "<td>"      , "<td>"   , "<td>"    , "<td>"            , "<p>"             , "<p>"             , "<td>"        , "<td>"     , "<td>"           , "<td>"           ]
    ,   END = [ , "<"     , "<"          , "<"        , "<"           , "<"          , "<"             , "<"                  , "<"                       , "<"                , "<"         , "<"      , "<"       , "<"               , "<"               , "<"               , "<"           , "<"        , "<"              , "<"              ]
    ,   str = UrlFetchApp.fetch(act/*,{method:"get",headers:{cookie:{PHPSESSID:PHPSESSID,fciAuth:fciAuth}}}*/).getContentText()//;Logger.log(str);
    ,   out = LibraryjsUtil._scrapeDataset(str,KEY,QUE,BEG,END,["$",",","%"],["","",""],true);
    // Special Processing
        try{out.lienPos       = out.security               ? out.security.charAt(0) : "X" ;}catch(e){Logger.log(e.message)}
        try{out.state         = LibraryjsUtil.stateConvert  (out.state,"abbr")            ;}catch(e){Logger.log(e.message)}
        try{out.sa            = LibraryjsUtil.toCaseTitle   (out.sa)                      ;}catch(e){Logger.log(e.message)}
        try{out.city          = LibraryjsUtil.toCaseTitle   (out.city)                    ;}catch(e){Logger.log(e.message)}
        try{out.propertyType  = LibraryjsUtil.convrepl      (out.propertyType,{"Residential":"SFR","Commercial":"CRE","Multifamily":"MUL","Hospitality":"CRE"},"X");}catch(e){Logger.log(e.message)}
    var dar = ["datePosted"],d=new Date(),i=dar.length;while(i--){try{var j=0,temp=out[dar[i]].split(" ");out[dar[i]]={};
                                   /*Skip typos: e.g.,"//"*/while(temp[j]==""){j++}out[dar[i]]["month"]=temp[j++].replace(",","");
                                   /*Skip typos: e.g.,"//"*/while(temp[j]==""){j++}out[dar[i]]["day"  ]=temp[j++].replace(",","");
							                                                       out[dar[i]]["year" ]=temp[j++].replace(",","");
														             }catch(e){Logger.log(e.message)}}/*Logger.log(JSON.stringify(out));*/return out}
// We will scrape the details page one at a time without any intermediate steps. This is because the page URLs can be predetermined based on its pattern of the product IDs starting at 1 and skipping every 4 numbers, i.e., 1,5,9,13...89,93,97,...
// Strike the above. Upon closer inspection, the pattern changed (to incrementing by "4") at some point after ID 302. Up to that point, the ID sequence seems to increment by one. Therefore, we will scrape the list page first to ensure we do not miss any.
function scrape_moolahList_ss    (page){ // Step 1 of 2 // 1. Do an all inclusive list search with possible multiple pages | 2. Grab all the pages and put them in a SS page. | 3. Come back later to get the details individually, one at a time
    var page=page||0;while(!page||scraped.length){var scraped=scrape_moolahList_list(page)/*;Logger.log(JSON.stringify(scraped));*/,out=LibraryjsUtil.ao2aa(LibraryjsUtil._flatten(scraped))/*;Logger.log(out);*/
    ,   rangeOut,sheetOut=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Scraped3");sheetOut.insertRowsAfter(sheetOut.getMaxRows()-1,out.length);rangeOut=sheetOut.getRange(sheetOut.getLastRow()+1,1,out.length,out[0].length);rangeOut.setValues(out);page+=15}return}
function scrape_moolahList_ss2details(){ /* Step 2 of 2 // 1. Fetch details from SS, row 2 (individually, one at-a-time) | 2. Write to server */ var sheetIn=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Scraped3"),rangeIn=sheetIn.getRange(1,1,2,sheetIn.getLastColumn()),datarr=rangeIn.getValues(),datob=LibraryjsUtil.aa2ao(datarr)[0];if(datob.link_details/*.slice(0,31)!="http://www.notemarketplace.com/"*/=="link_details"/*||datob.link_details.split("/")[3]!="ads"*/){sheetIn.deleteRow(2);Logger.log("Deleted header row");return}else{var scraped=scrape_moolahList_detail(datob.link_details)}if(scrape_serverPost(datob,scraped,"8u0hjrtbd68s3hi1w9kl")){sheetIn.deleteRow(2)/*Logger.log("Success!")*/}return} // var x=UrlFetchApp.fetch("https://script.google.com/macros/s/AKfycbwT66_MExluhggRGS48QQikDxTzElT7F1WWRImBHoKDqEjFdIs/exec",{method:"post"});Logger.log(x.getResponseCode());Logger.log(x.getContentText());}
// Save the URL of the latest listing
// On future visits, download each page and record until we hit the latest one, then stop. Save the new latest one then repeat.
function scrape_moolahList_getMode1(){while(true){try{scrape_moolahList_ss2details()}catch(e){Logger.log(e.message);break;}}} // SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Scraped").deleteRow(2);Deleted inside sub function; Different from code source from where this was copied
function scrape_moolahList_getMode2(){ // Automatically update/populate individually, on a schedule // 1. Check latest record ID, increment by one, search by product ID | 2. Scrape list data + details URL | 3. Scrape details. | 4. Store ID for repeat cycle to follow
    while(true){var db=ScriptDb.getMyDb(),r=db.query({table:"counter",source:"moolahList"}).next();Logger.log(JSON.stringify(r)); 
                var dataList   = scrape_moolahList_list(UrlFetchApp.fetch("http://www.fciexchange.com/all-loans.php?prodId="+(++r.value)).getContentText())[0]//;Logger.log(dataList);
                  , dataDetail = scrape_moolahList_detail(dataList.link_details);/*Logger.log(dataDetail);*/scrape_moolahList_serverPost(dataList,dataDetail);db.save(r/*{table:"counter",source:"moolahList",value:13108}*/)}}
function scrape_moolahList_getMode3(){ // Verify for sale at any time, on demand, after bid is made
}
// ---------- OTHER VENDORS ----------
function baPoint(){ // Skip for now. Large volume. But all commercial is not our target asset class as we seek hard money residential private mortgage debt instruments.
    var response=UrlFetchApp.fetch("https://www.bankassetpoint.com/loanSearchResultsMain.xhtml?windowId=643&page=0&rowsToRender=15"),respHead=response.getAllHeaders(),respCont=response.getContentText();
    Logger.log(respHead);Logger.log(respCont);}
function loanMls(){var page=0
    , cookie = UrlFetchApp.fetch("http://www.loanmls.com/public/do_login/noheaders",{method:"post",payload:{email:"michelleebooth@suremail.info",password:"teleworm"},followRedirects:false,headers:{/*Host:"www.loanmls.com",*/Origin:"http://www.loanmls.com",Referer:"http://www.loanmls.com/"}}).getAllHeaders()["Set-Cookie"]
    , data   = UrlFetchApp.fetch(/*"http://www.loanmls.com/search?ytmy=5"*/"http://www.loanmls.com/search?page="+page+"&sort=display_on&row_mode=table",{method:"get",headers:{Cookie:cookie}}).getContentText() // http://www.loanmls.com/search?page=0&sort=display_on&row_mode=table
    ; Logger.log(data);}
