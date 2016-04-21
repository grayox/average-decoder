// ----------------------- Code.gs -----------------------
// function auth   (){}
function size   (){Logger.log(ScriptDb.getMyDb().query({source:{/*name:"KennethGreen"*/data:{bid:{amount:db.greaterThan(0)}}}}).getSize());}
function showOne(){Logger.log(/*Utilities.jsonStringify*/JSON.stringify(ScriptDb.getMyDb().query({source:{/*name:"KennethGreen"*/data:{bid:{amount:db.greaterThan(0)}}}}).next()));} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function showAll(){var db=ScriptDb.getMyDb();var results=db.query({source:{name:"ZipRealty"/*"KennethGreen"*/},raw:false});while(results.hasNext()){var r=results.next();Logger.log(/*Utilities.jsonStringify*/JSON.stringify(r));}} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
// function getEmailQuota(){Logger.log("Remaining email quota: " + MailApp.getRemainingDailyQuota());}
function doPost(e){return x.y();}
function doGet(e){ // References: https://developers.google.com/apps-script/guides/html-service-communication#private_functions // https://sites.google.com/site/appsscripttutorial/miscellaneous/creating-form-elements-dynamically-using-google-apps-script-gas
 // if(e && e.parameter && e.parameter.jsoncallback){return ContentService.createTextOutput("foo({result:'<strong>Hello</strong> World'});").setMimeType(ContentService.MimeType.TEXT);}
    if(e && e.parameter && e.parameter.k){var k=e.parameter.k,m=e.parameter.m,p=e.parameter;switch(k){
            case   /* account     	   */ "uaceyes6ubt0nc4ow6ng" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                                                 ></div>'})").setMimeType(ContentService.MimeType.JSON      );break;
            case   /* taxdocs		   */ "qcy0zn273yllnor7daj7" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                                                 ></div>'})").setMimeType(ContentService.MimeType.JSON      );break;
            case   /* citizen-us	   */ "hcx6ce5fj22c0ru0uh7k" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                                                 ></div>'})").setMimeType(ContentService.MimeType.JSON      );break;
            case   /* citizen-nonus	   */ "1w6qu34iki6orhn31va9" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                                                 ></div>'})").setMimeType(ContentService.MimeType.JSON      );break;
            case   /* deals			   */ "2a6ib6wqih1po8amk9kp" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                                                 ></div>'})").setMimeType(ContentService.MimeType.JSON      );break;
            case   /* balances         */ "23gd3r4v88h0qs5l904w" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bTaY-umWq04/UKVWnKQq5-I/AAAAAAAAD3s/dDtgQsquOD4/s1600/Under-Construction.jpg\"                                                                ></div>'})").setMimeType(ContentService.MimeType.JSON      );break;
            case   /* tax-instructions */ "2632vy7qroae9ehameno" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bTaY-umWq04/UKVWnKQq5-I/AAAAAAAAD3s/dDtgQsquOD4/s1600/Under-Construction.jpg\"                                                                ></div>'})").setMimeType(ContentService.MimeType.JSON      );break;
            case   /* w9-eSign		   */ "eii2t8p9pj21o812ondu" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bTaY-umWq04/UKVWnKQq5-I/AAAAAAAAD3s/dDtgQsquOD4/s1600/Under-Construction.jpg\"                                                                ></div>'})").setMimeType(ContentService.MimeType.JSON      );break;
            case   /* w8-eSign		   */ "ahbcktn71r40oq5o6vut" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bTaY-umWq04/UKVWnKQq5-I/AAAAAAAAD3s/dDtgQsquOD4/s1600/Under-Construction.jpg\"                                                                ></div>'})").setMimeType(ContentService.MimeType.JSON      );break;
            case   /* training-manual  */ "tn46yr3m8dovd8pyfzl2" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"https://docs.google.com/document/d/1tPoD_SKBc0ofqvaORp2ldbmKzT6s5cqnPOP81Pq1zk8/preview\"                                                                         ></iframe>      '})").setMimeType(ContentService.MimeType.JSON      );break;
            case   /* w9-pdf		   */ "rcgrp03ur0omffihy6h7" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"http://www.irs.gov/pub/irs-pdf/fw9.pdf\"                                                                                                                          ></iframe>      '})").setMimeType(ContentService.MimeType.JSON      );break;
            case   /* w8-pdf           */ "ydl609qvq0eacb4ntbut" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"http://www.irs.gov/pub/irs-pdf/fw8ben.pdf\"                                                                                                                       ></iframe>      '})").setMimeType(ContentService.MimeType.JSON      );break;
            case   /* register-buyer   */ "fruif01iaqqdgmqq1glu" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"no\"   style=\"xmargin-top:-200px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/dealdiggeronline/parties/buyer/register-buyer#sites-canvas-main-content\"      ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON      );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* private-listing  */ "bim5yiet1iw5m6ey33zr" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bTaY-umWq04/UKVWnKQq5-I/AAAAAAAAD3s/dDtgQsquOD4/s1600/Under-Construction.jpg\"                                                                ></div>'})").setMimeType(ContentService.MimeType.JSON      );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* private-auction  */ "zllhi2v8cx7qre66q3z2" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bTaY-umWq04/UKVWnKQq5-I/AAAAAAAAD3s/dDtgQsquOD4/s1600/Under-Construction.jpg\"                                                                ></div>'})").setMimeType(ContentService.MimeType.JSON      );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
         // case   /* public-listing   */ "cdl2t4npt1vpu0ukq7xw" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"no\"   style=\"xmargin-top:-200px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/dealdiggeronline/parties/buyer/public-listing#sites-canvas-main-content\"      ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON      );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
         // case   /* public-auction   */ "3k6d9487bgr6tc4h6cbl" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"no\"   style=\"xmargin-top:-200px;width:100%;height:1200px;\" src=\"http://jsfiddle.net/Ynp5Z/6/show\"                                                                           ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON      );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
         // case   /* public-auction   */ "3k6d9487bgr6tc4h6cbl" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"no\"   style=\"xmargin-top:-200px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/dealdiggeronline/parties/buyer/public-auction#sites-canvas-main-content\"      ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON      );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* listings         */ "904dtdwo1rqyjaw5spjf" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"no\"   style=\"xmargin-top:-200px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/dealdiggeronline/parties/buyer/listings#sites-canvas-main-content\"            ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON      );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* auctions         */ "nbzuuuhxzxkkn3ln32m4" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"no\"   style=\"xmargin-top:-200px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/dealdiggeronline/parties/buyer/auctions#sites-canvas-main-content\"            ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON      );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* pri-auc-data     */ "i2k7yas4a0t32cxw42v6" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(privateAuction2( )) + ")"                                                                                                                                                                                                                       ).setMimeType(ContentService.MimeType.JSON      );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* pub-auc-data     */ "9l4y95xhwwi8q2hbkslp" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(serveAuctions  ( )) + ")"                                                                                                                                                                                                                       ).setMimeType(ContentService.MimeType.JSON      );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* receive input    */ "2kpco3hg68eo6alklck6" : return                                                                   /* x.y() */ receiveBid     (p)                                                                                                                                                                                                                                                                               ;break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* Serve script JS  */ "k7fvbixefxcc1fy4eqr5" : return ContentService.createTextOutput(                                              serveScript    (k)                                                                                                                                                                                                                              ).setMimeType(ContentService.MimeType.JAVASCRIPT);break;         
            case   /* Serve script CSS */ "rcc6brjymslc37vtpb8y" : return ContentService.createTextOutput(e.parameter.    callback+"(" +                serveScript    (k)  + ")"                                                                                                                                                                                                                       ).setMimeType(ContentService.MimeType.JSON      );break;         
         // case   /* Test  script     */ "ilrav3er4xwaoejqezt2" : return ContentService.createTextOutput(                                               testScript    ( )                                                                                                                                                                                                                              ).setMimeType(ContentService.MimeType.JAVASCRIPT);break;         
         /* case   /* reports-dash    * / "                    " : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"no\"   style=\"xmargin-top:-200px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/manage/dashboard#sites-canvas-main-content\"                        ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON      );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* sp-dashboard    * / "                    " : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"no\"   style=\"xmargin-top:-200px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/manage/dashboard#sites-canvas-main-content\"                        ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON      );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            // Pages below this line do respond to the # anchor for <iframe> but we use negative margins to enable scrolling while limiting to top edge
            case   /* bugs-features   * / "                    " : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"auto\" style=\" margin-top:-240px;width:100%;height:1500px;\" src=\"https://sites.google.com/site/gosalespro/manage/bugs-features\"                                              ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON      );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
			// Pages below this line do not respond to # anchor for <iframe> so we used negative margins which also limit scrolling above top edge
            case   /* registration-sp * / "                    " : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"auto\" style=\" margin-top:-150px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/team/sp/apply#sites-canvas-main-content\"                           ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON      );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* objectives      * / "                    " : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"auto\" style=\" margin-top:-250px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/manage/objectives#sites-canvas-main-content\"                       ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON      );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
			case   /* announcements   * / "                    " : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"auto\" style=\" margin-top:-180px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/admin/announcements#sites-canvas-main-content\"                     ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON      );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            // Data tables below this line.
            // Insert data tables here.
      */ default                                                 :                                                                                                         ;break;}} 
    if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
            case   "public-listing"        : return HtmlService.createTemplateFromFile  ("public-listing"       )                                               .evaluate();break;
            case   "wholesaler_search"     : return HtmlService.createHtmlOutputFromFile("wholesaler_search"    )                                                          ;break; // HtmlService.createHtmlOutput(UrlFetchApp.fetch("https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/gasDD_wholesaler_search.html").getContentText());}
            case   "loan-application"      : return HtmlService.createTemplateFromFile  ("loanApp"              )                                               .evaluate();break;
            case   "researcher"            : return HtmlService.createTemplateFromFile  ("researcher"           )                                               .evaluate();break; // Debug: {var t=HtmlService.createTemplateFromFile("researcher").evaluate();Logger.log(t.getCodeWithComments);return t;}
            case   "agent"                 : return agent                                                                                                                ();break;
            case   "demo"                  : return demo                                                                                                                 ();break;
            case   "inventory"             : return inventory                                                                                                            ();break;                                                                                                     
            case   "sandbox2"              : return HtmlService.createHtmlOutputFromFile("sandbox2"             ).setSandboxMode(HtmlService.SandboxMode.NATIVE           );break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
            case   "lender"                : return HtmlService.createTemplateFromFile  ("lender"               )                                               .evaluate();break;
            case   "buyer_foreclosure"     : return HtmlService.createTemplateFromFile  ("buyer_foreclosure"    )                                               .evaluate();break;
            case   "private-listing"       : return HtmlService.createTemplateFromFile  ("private-listing"      )                                               .evaluate();break;
            case   "public-listing"        : return HtmlService.createTemplateFromFile  ("public-listing"       )                                               .evaluate();break;
            case   "public-auction"        : return HtmlService.createTemplateFromFile  ("public-auction"       )                                               .evaluate();break;
         // case   "private-auction"       : return HtmlService.createTemplateFromFile  ("private-auction"      )                                               .evaluate();break; // This works. But we seek an upgrade to jqWidgets, jqxGrid
         // case   "private-auction"       : return HtmlService.createHtmlOutputFromFile("private-auction1"     )                                                          ;break; // NOT WORKING in html file; switched to iframe jsfiddle // Error message: Invalid script or HTML content: https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqx-all.js?attredirects=0&d=1:29+70920 - 70939: Integer literal 3155378976000000000 doesn't fit in 51 bits https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqx.base.css?attredirects=0&d=1:428+28 - 29: Expected ) not . https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqx.base.css?attredirects=0&d=1:428+5 - 62: Skipping malformed content 
         // case   "private-auction"       : return privateAuction2                                                                                                      ();break; // Use jsonp to populate jqxGrid (jqWidgets data table)
            case   "register-buyer"        : return HtmlService.createHtmlOutputFromFile("register-buyer"       )                                                          ;break;
            case   "register-lender"       : return HtmlService.createHtmlOutputFromFile("register-lender"      )                                                          ;break;
            case   "register-agent"        : return HtmlService.createHtmlOutputFromFile("register-agent"       )                                                          ;break;
            case   "register-auctionAgent" : return HtmlService.createHtmlOutputFromFile("register-auctionAgent")                                                          ;break;
            case   "register-researcher"   : return HtmlService.createHtmlOutputFromFile("register-researcher"  )                                                          ;break;
            case   "register-attorney"     : return HtmlService.createHtmlOutputFromFile("register-attorney"    )                                                          ;break;
         default                           :                                                                                                                                break;}}}
// ------------------------------------------------------------------ UTILITIES -------------------------------------------------------------------
function testScript(){var ob={"x":null || "y"};Logger.log(ob.x);}
function serveScript(k){var out=""/*"document.write('Hello World!')"*/,map={"k7fvbixefxcc1fy4eqr5":["https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqx-all.js?attredirects=0&d=1"]
                                                                           ,"rcc6brjymslc37vtpb8y":["https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqx.base.css?attredirects=0&d=1"
                                                                                                   ,"https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqx.bootstrap.css?attredirects=0&d=1"]},
                            i=map[k].length;while(i--){out+=UrlFetchApp.fetch(map[k][i]);}return out;}
// ------------------------------------------------------------------ DEALS -------------------------------------------------------------------
function serveAuctions(){var ob=[],arr=[],i,j,k,r,t=[],zil=[],user=Session.getUser().getEmail(),out={"totalResultsCount":0,"records":[]},db=ScriptDb.getMyDb(),results=db.query({source:{name:"ZipRealty"/*"ChuckWillman"/*"KennethGreen"*/}});while(results.hasNext()){r=results.next();i=out.totalResultsCount++;
	try{out.records[i]={db_id:r.getId()};}catch(e){Logger.log(e.message)};/*"db_id"*/try{if(r.avm.dataset.zillow.searchresults.response.results.result){zil[i]=r.avm.dataset.zillow.searchresults.response.results.result}}catch(e){Logger.log(e.message);zil[i]={};} // Shortcut to Zillow results
	try{if(r.bids){arr[i]=r.bids;j=arr[i].length;while(j--){t[j]=0;if(arr[i][j].bidder==user&&(arr[i][j].time>t[j])/*&&(!arr[i][j].confirmed)*/){t[j]=arr[i][j].time;out.records[i].MyBid=arr[i][j].amount}}             }}catch(e){Logger.log(e.message)}; // "MyBid"
	ob[i] = {
		"nolink"                         : {
				"arv"                    : function(){try{return            r.arv                         .value                    }catch(e){Logger.log(e.message);return "";}}() // "arv" Strict input // ARV
			,	"rep"                    : function(){try{return            r.repairs                     .value                    }catch(e){Logger.log(e.message);return "";}}() // "rep" Strict input // Repairs
			,	"cof"                    : function(){try{return            r.counter                     .value                    }catch(e){Logger.log(e.message);return "";}}() // "cof" Strict input // Counter
			,	"com"                    : function(){try{return            r.LST_Attributes[21].attribute_value                    }catch(e){Logger.log(e.message);return "";}}() // "com" Strict input // Comments 
			,	"city"                   : function(){try{return            r.address.city                                          }catch(e){Logger.log(e.message);return "";}}() //
			,	"state"                  : function(){try{return            r.address.state                                         }catch(e){Logger.log(e.message);return "";}}() //
			,	"zip"                    : function(){try{return            r.address.zip                                           }catch(e){Logger.log(e.message);return "";}}() //
			,	"sa"                     : function(){try{return            r.address.sa                                            }catch(e){Logger.log(e.message);return "";}}() //
			,	"full"                   : function(){try{return            r.address.full                                          }catch(e){Logger.log(e.message);return "";}}() //
            ,	"useCode"                : function(){try{return            r.avm.combi.useCode                                     }catch(e){Logger.log(e.message);return "";}}() //
			,	"beds"                   : function(){try{return            r.avm.combi.beds                                        }catch(e){Logger.log(e.message);return "";}}() //
			,	"baths"                  : function(){try{return            r.avm.combi.baths                                       }catch(e){Logger.log(e.message);return "";}}() //
			,	"sf"                     : function(){try{return            r.avm.combi.sqft                                        }catch(e){Logger.log(e.message);return "";}}() //
			,	"sf_round"               : function(){try{return Math.round(r.avm.combi.sqft                      /  100 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"lot"                    : function(){try{return            r.avm.combi.lot.Text                                    }catch(e){Logger.log(e.message);return "";}}() //
			,	"lot_round"              : function(){try{return Math.round(r.avm.combi.lot.Text                  /  100 )          }catch(e){Logger.log(e.message);return "";}}() //
            ,	"yearBuilt"              : function(){try{return            r.avm.combi.built                                       }catch(e){Logger.log(e.message);return "";}}() //
			,	"taxVal"                 : function(){try{return            r.avm.combi.taxVal                                      }catch(e){Logger.log(e.message);return "";}}() //
			,	"taxVal_round"           : function(){try{return Math.round(r.avm.combi.taxVal                    / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"lastSoldPrice"          : function(){try{return            r.avm.combi.lastSoldPrice                               }catch(e){Logger.log(e.message);return "";}}() //
			,	"lastSoldPrice_round"    : function(){try{return Math.round(r.avm.combi.lastSoldPrice             / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"lastSoldYear"           : function(){try{return            r.avm.combi.lastSoldYear                                }catch(e){Logger.log(e.message);return "";}}() //
			,	"taxAmt"                 : function(){try{return            r.avm.combi.taxAmt                                      }catch(e){Logger.log(e.message);return "";}}() //
			,	"taxAmt_round"           : function(){try{return Math.round(r.avm.combi.taxAmt                    /  100 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"ask"                    : function(){try{return            r.ask                                                   }catch(e){Logger.log(e.message);return "";}}() //
			,	"ask_round"              : function(){try{return Math.round(r.ask                                 / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"autoEst"                : function(){try{return            r.avm.stat.autoEst                                      }catch(e){Logger.log(e.message);return "";}}() //
			,	"autoEst_round"          : function(){try{return Math.round(r.avm.stat.autoEst                    / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"sdPct"                  : function(){try{return            r.avm.stat.sdPct                                        }catch(e){Logger.log(e.message);return "";}}() //
			,	"popCount"               : function(){try{return            r.avm.stat.popCount                                     }catch(e){Logger.log(e.message);return "";}}() //
			,	"rent"                   : function(){try{return Math.round(zil[i].rentzestimate.amount.Text             )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"rent_round"             : function(){try{return Math.round(zil[i].rentzestimate.amount.Text      /  100 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"ratio"                  : function(){try{return            r.avm.stat.ratio                                        }catch(e){Logger.log(e.message);return "";}}() // "rent"
			,	"grm"                    : function(){try{return Math.round(r.ask/(12*Number(zil[i].rentzestimate.amount.Text)))    }catch(e){Logger.log(e.message);return "";}}() // "grm" Compute gross rent margin
			,	"ia"                     : function(){try{return            r.incomeApproach                                        }catch(e){Logger.log(e.message);return "";}}() // "ia"  Compute price per income approach
			,	"ia_round"               : function(){try{return Math.round(r.incomeApproach                      / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"psf"                    : function(){try{return Math.round(r.avm.stat.autoEst/r.avm.combi.sqft)                    }catch(e){Logger.log(e.message);return "";}}() // "psf" Compute price per square foot
			,	"avmStatSet"             : function(){try{return            r.avm.stat.set                                          }catch(e){Logger.log(e.message);return "";}}() // "avmStatSet" Array of AVM statistics
										   }
	,	"link"		                     : {
				"link_googleMap"         : function(){try{return  /*OK*/    r.link.gmap                                             }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_yahoo"             : function(){try{return  /*OK*/    r.link.yahoo	   					                    }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_zillow"            : function(){try{return  /*OK*/    r.link.zillow                                           }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_zillowdetails"     : function(){try{return  /*OK*/    zil[i].links.homedetails.Text                           }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_zipRealty"         : function(){try{return            ""                                                      }catch(e){Logger.log(e.message);return "";}}() //            
            ,	"link_eppraisal"         : function(){try{return  /*L1*/    r.avm.dataset.eppraisal.link                            }catch(e){Logger.log(e.message);return "";}}() // Errors: L1 local; L2 site suspected; L3 site confirmed; OK works; ok works but must copy/paste address
			,	"link_realtor"           : function(){try{return  /*OK*/    r.avm.dataset.realtor.link                              }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_realEstate"        : function(){try{return  /*OK*/    r.avm.dataset.realEstate.link                           }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_homeGain"          : function(){try{return  /*L3*/    r.avm.dataset.homeGain.link                             }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_trulia"            : function(){try{return  /*OK*/    r.avm.dataset.trulia.link                               }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_propertyShark"     : function(){try{return  /*ok*/    r.link.propertyShark                                    }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_neighborhoodScout" : function(){try{return  /*ok*/    r.link.neighborhoodScout                                }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_zipSkinny"         : function(){try{return  /*ok*/    r.link.zipSkinny                                        }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_chase"             : function(){try{return  /*ok*/    r.link.chase                                            }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_boa"               : function(){try{return  /*ok*/    r.link.boa                                              }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_homesCom"          : function(){try{return  /*ok*/    r.link.homesCom                                         }catch(e){Logger.log(e.message);return "";}}() //
										   }
	} // db_id MyBid // arv rep cof com city state zip sa useCode beds baths sf sf_round lot lot_round yearBuilt taxVal taxVal_round lastSoldPrice lastSoldPrice_round lastSoldYear taxAmt taxAmt_round ask ask_round autoEst autoEst_round sdPct popCount rent rent_round ratio grm ia ia_round psf avmStatSet // link_googleMap link_yahoo link_zillow link_zillowdetails link_eppraisal link_realtor link_realEstate link_homeGain link_trulia link_propertyShark link_neighborhoodScout link_zipSkinny link_chase link_boa link_homesCom
	var keys=Object.keys(ob[i].nolink),z=keys.length;while(z--){out.records[i][keys[z]]=              ob[i].nolink[keys[z]]                                   }
		keys=Object.keys(ob[i].  link),z=keys.length;while(z--){out.records[i][keys[z]]='<a href="' + ob[i].  link[keys[z]] + '" target="_blank">&#10151;</a>'}Logger.log(JSON.stringify(out.records[i]));
	}return out;}
function privateAuction2(){return {};}
function receiveBid(p){Logger.log(JSON.stringify(p));var db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),d=new Date().getTime(),r=db.load(p.db_id);//var ob={};ob[d]=p.MyBid;if(r.bids==null){r.bids={};r.bids[user]=[];r.bids[user].unshift(ob);}else{r.bids[user].unshift(ob);} // Gets latest bid
    if(r.bids==null){r.bids=[]}r.bids.unshift({bidder:user,amount:p.MyBid,time:d,confirmed:false});/*Get latest bid; alternate method above*//*Logger.log(JSON.stringify(r));*/db.saveBatch([r,{table:"bid",id:r.getId(),amount:p.MyBid,bidder:user,time:d,confirmed:false}],false);return;}
// ---------------------------------------------------------------- RESEARCHER ----------------------------------------------------------------
//function processDoc(ob){var id=DocsList.createFile(ob.fileDoc/*.getAs("application/pdf")-untested:https://developers.google.com/apps-script/reference/base/composite-blob#getAs(String)*/).getId();DriveApp.getFileById(id).setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);return DocsList.getFileById(id).getUrl();} // Reference: https://code.google.com/p/google-apps-script-issues/issues/detail?id=1660 see #37, Oct 13, 2012 // Use DocsList instead of DriveApp which will not allow document to be viewed properly
//function processPic(ob){return "https://drive.google.com/uc?export=view&id="+DriveApp.createFile(ob.filePic).setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW).getId()} // Image // Reference: http://stackoverflow.com/questions/10311092/displaying-files-e-g-images-stored-in-google-drive-on-a-website // http://stackoverflow.com/questions/14717426/referencing-project-files-with-html-service > http://googleappsdeveloper.blogspot.in/2012/11/announcing-google-drive-site-publishing.html
function researcher_datTab(){var q={avm:true,table:"situs"},db=ScriptDb.getMyDb(),r,result=db.query(q).sortBy(/*"avm.stat.ratio"*/"price",db.ASCENDING,db.NUMERIC);return result;}
  /*str ="<div id='container'><table cellpadding='0' cellspacing='0' border='1' class='dataTable' id='example'><thead><tr><th>Address</th><th>AVM</th><th>Price</th><th>ARV</th><th><img height='20' width='16' src='https://lh4.googleusercontent.com/-pzIbwCxOu7A/UZp0VvQbt5I/AAAAAAAAGoI/me0Et3XdGRA/s800/icon-document.jpg' title='Upload PDF document'> Report</th><th><img height='20' width='16' src='https://lh4.googleusercontent.com/-4AbRLSyufp4/UZp0RZCA1RI/AAAAAAAAGn8/mra9Y2fkKnE/s144/Gallery.jpg' title='Upload image'> Pictures</th></tr></thead><tbody>";while(result.hasNext()){r=result.next();str+="<tr>";
    str+="<td>"+r.address.full+"</td><td>"+r.avm.stat.autoEst+"</td><td>"+r.price+"</td>";
    str+="<td><input type='text' name='arv' size='7' maxlength='7' ><input value='?' type='button' title='Submit ARV estimate' onclick='google.script.run.withSuccessHandler(updateUrlDoc).processDoc(this.parentNode)'></td>";
    str+="<td><form id='formDoc'><input name ='fileDoc' type='file'><input value='?' type='button' title='Upload PDF document' onclick='google.script.run.withSuccessHandler(updateUrlDoc).processDoc(this.parentNode)'></td>";
    str+="<td><form id='formPic'><input name ='filePic' type='file'><input value='?' type='button' title='Upload image'        onclick='google.script.run.withSuccessHandler(updateUrlPic).processPic(this.parentNode)'></td>";
    str+="</tr>";}str+="</tbody></table></div>";return str;}*/
// ---------------------------------------------------------------- WHOLESALER ----------------------------------------------------------------
function processWholesalerSearchInput(ob){Logger.log(ob);}
// See goAuction() and saveAuctionData(url,ob) on Data.gs // function privateAuction_getData(){var KEY="0AlLVOoV_2dFtdEZHM1dOSGtrTmNfbHMzd0JObDJMUmc";return SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheet/ccc?key="+KEY).getActiveSheet().getDataRange().getValues();}
function publicListing(){return }
function publicListing_getData(){var db=ScriptDb.getMyDb();return db.query({avm:true,table:"situs"/*,tag:{inventory:true}*/}).sortBy(/*"avm.stat.ratio"*/"price",db.ASCENDING,db.NUMERIC)}
function wholesaler_data1(){ // ------------------------------------------------ WHOLESALER ---------------------------------------------------------------- 
    var PAGESIZE=7,pagenum=1,FSA={NORM:{fontSize:"100%",fontWeight:"normal",color:"black"},SEL:{fontSize:"200%",fontWeight:"bold",color:"#150035"}},q={avm:true,table:"situs",tag:{inventory:true}},tagObj={PAGESIZE:PAGESIZE,pagenum:pagenum,FSA:FSA,q:q},db=ScriptDb.getMyDb(),result=db.query(q).sortBy(/*"avm.stat.ratio"*/"price",db.ASCENDING,db.NUMERIC),app=UiApp.createApplication(),form=app.createFormPanel(),gridMain=app.createGrid(2,1).setId("gridMain"),rct=db.query(q).getSize(),pgct=Math.ceil(rct/PAGESIZE),i=pgct+1,gridPages=app.createGrid(1,pgct+1),vpan=handle_wholesaler_data_drawTable(pagenum-1,tagObj),showPageHandler=app.createServerClickHandler("showPage").addCallbackElement(gridMain);tagObj.pgct=pgct;
    while(i---1){gridPages.setWidget(0,i,app.createLabel(i).setId("page"+i).setWidth("15").addClickHandler(showPageHandler))}app.getElementById("page1").setStyleAttributes(FSA.SEL); // (pagination) Reference: https://sites.google.com/site/appsscripttutorial/advanced-examples/pagination-in-apps-script
    gridPages.setWidget(0,0,app.createLabel("Page ").setId("pages").setTag(JSON.stringify(tagObj)));gridMain.setWidget(0,0,gridPages);gridMain.setWidget(1,0,vpan);form.add(gridMain);app.add(form);return app;}
// ---------------------------------------------------------------- ******* ----------------------------------------------------------------
// ---------------------------------------------------------------- HANDLER ----------------------------------------------------------------
// ---------------------------------------------------------------- ******* ----------------------------------------------------------------
function showPage(e){var p=e.parameter,s=p.source,ptag=JSON.parse(p.pages_tag),app=UiApp.getActiveApplication(),pageNum=parseInt(s.substring(4));app.getElementById(s).setStyleAttributes(ptag.FSA.SEL);app.getElementById("page"+ptag.pagenum).setStyleAttributes(ptag.FSA.NORM);ptag.pagenum=pageNum;app.getElementById("pages").setTag(JSON.stringify(ptag));app.getElementById("gridMain").setWidget(1,0,handle_wholesaler_data_drawTable(pageNum-1,ptag));return app;} // (pagination) Reference: https://sites.google.com/site/appsscripttutorial/advanced-examples/pagination-in-apps-script
function handle_wholesaler_data_drawTable(pnum,ptag){var db=ScriptDb.getMyDb(),result=db.query(ptag.q).sortBy(/*"avm.stat.ratio"*/"price",db.ASCENDING,db.NUMERIC).paginate(pnum,ptag.PAGESIZE) // Returns vpan > flex table > data+buttons // ">"=="contains"
    var app=UiApp.getActiveApplication(),vpan=app.createVerticalPanel(),tab=app.createFlexTable().setBorderWidth(1),handler=app.createServerHandler("handleSubmit").addCallbackElement(vpan/*tab*/);vpan.add(tab); // Returned table // Submit button handler
    var r,k,j,i,x,com,arv,rep,cof,len,handleRadio=[],radioValue=[],button=[],offer1=[],offer2=[],go=[],LINK=[],PROP=[],HEAD=[
                 "Y","Z","D","E","R","S","H",                 // Links
                 "address","b|b|s","tax|sold|in","psf","grm", // Property fields
                 "rent","ia","price","avm","stat","set","%",  // Property fields
                 "no","go","arv","offer","analysis","repair", // Added    fields
                 "offer","counter","contract","assign","send" // Added    fields
                 ];
    var STYLPATT = ["white","white","white","white","#E8E6EB","white","white","white"];var patlen=STYLPATT.length;  // Color pattern // www.w3schools.com/tags/ref_colorpicker.asp // #150035
    function writeHead(row,arr){ii=arr.length;while(ii--){tab.setText          (row,ii,arr[ii]                    ) // Write header row
                                                             .setStyleAttribute(row,ii,"backgroundColor","#150035")
                                                             .setStyleAttribute(row,ii,"color"          ,"white"  )
                                                             .setStyleAttribute(row,ii,"fontWeight"     ,"bold"   );}}
    j=0;while(result.hasNext()){ // Start row counter // Load records
        if(j%patlen==0){writeHead(j,HEAD)} // Write header row if proper spacing
        else{
            var ia,grm,psf,r=result.next(),avmStatSet=[],rent=r.avm.dataset.zillow.rentzestimate;
            if(rent){grm=Math.round(r.price/(12*rent));ia=Math.round(r.offer.beforeRepairs.auto/100)/10;}else{grm="—";ia="—";} // Compute gross rent margin “grm” // Compute price per income approach “ia”
            if(r.avm.stat.autoEst&&r.avm.combi.sqft){psf=Math.round(r.avm.stat.autoEst/r.avm.combi.sqft)}else{psf="—";} // Compute price per square foot “psf”
            i=r.avm.stat.set.length;while(i--){if(r.avm.stat.set[i]===Number(r.avm.stat.set[i])){avmStatSet[i]=Math.round(r.avm.stat.set[i]/1000)}}
            try{arv=r.arv                         .value}catch(e){Logger.log(e.message)};if(arv==null){arv="—"}; // Strict input // ARV
            try{rep=r.repairs                     .value}catch(e){Logger.log(e.message)};if(rep==null){rep="—"}; // Strict input // Repairs
            try{cof=r.counter                     .value}catch(e){Logger.log(e.message)};if(cof==null){cof="—"}; // Strict input // Counter
            try{com=r.LST_Attributes[21].attribute_value}catch(e){Logger.log(e.message)};if(com==null){com="—"}; // Strict input // Comments
            LINK=[r.link.yahoo,r.avm.dataset.zillow.link,r.avm.dataset.zillow.homedetails,r.avm.dataset.eppraisal.link,r.source.detailpageURL/*r.avm.dataset.realtor.link*/,
                  r.avm.dataset.realEstate.link,r.avm.dataset.homeGain.link,r.link.gmap];len=LINK.length;
            PROP=[ 
                   "Y","Z","D","E","R","S","H",r.address.full,(r.avm.combi.beds+"|"+r.avm.combi.baths+"|"+Math.round(r.avm.combi.sqft/100)),
                  (Math.round(r.avm.combi.taxVal/1000)+"|"+Math.round(r.avm.combi.lastSoldPrice/1000)+"|"+r.avm.combi.lastSoldYear),psf,grm,r.avm.dataset.zillow.rentzestimate,ia,
                  ((Math.round(r.price/100))/10),Math.round(r.avm.stat.autoEst/1000),(r.avm.stat.sdPct+"|"+r.avm.stat.popCount),avmStatSet,r.avm.stat.ratio
                 ];k=PROP.length;i=k;while(i--){x=PROP[i];if(i<len){ // Reset column counter // Loop to fetch saved data
                tab.setWidget        (j,i  ,app.createAnchor(x,LINK[i]).setTitle("row "+j+" "+com))  // Insert anchor/s for first field
                   .setStyleAttribute(j,i,  "backgroundColor",STYLPATT[j%patlen]);}else{
                tab.setWidget        (j,i  ,app.createLabel(x) .setTitle("row "+j))  // Insert labels for other fields
                   .setStyleAttribute(j,i,  "backgroundColor",STYLPATT[j%patlen]);}} // Set background color // End loop
                // ----------------- Radio buttons -----------------               
                radioValue[j] =             app.createTextBox().setId("radioValue"+j).setName("radioValue"+j).setVisible(false);vpan.add(radioValue[j]); // Reference: http://stackoverflow.com/questions/10903963/strange-behaviour-when-using-radiobutton
                                            handleRadio[j] = app.createClientHandler().forTargets(radioValue[j]).setText/*.setValue==error*/("no"+j);  // No
                tab.setWidget        (j,k  ,app.createRadioButton(("grp"+j),"").addValueChangeHandler(handleRadio[j])) // No
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // No
                   try{                                                              // Show value, if any
                            if(r.go       ){tab.setWidget(j,k-1,app.createLabel("?").setTitle("row "+j)/*.setStyleAttribute("color","green")*/)} // No
                       else if(r.go==false){tab.setWidget(j,k-1,app.createLabel("?").setTitle("row "+j)/*.setStyleAttribute("color","red"  )*/)} // No
                   }catch(err){Logger.log(err.message)}
                                            handleRadio[j] = app.createClientHandler().forTargets(radioValue[j]).setText("go"+j);  // Go
                tab.setWidget        (j,k  ,app.createRadioButton(("grp"+j),"").addValueChangeHandler(handleRadio[j])) // Go
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Go
                   try{                                                              // Show value, if any
                            if(r.go       ){tab.setWidget(j,k-1,app.createLabel("?").setTitle("row "+j)/*.setStyleAttribute("color","green")*/)} // Go
                       else if(r.go==false){tab.setWidget(j,k-1,app.createLabel("?").setTitle("row "+j)/*.setStyleAttribute("color","red"  )*/)} // Go
                   }catch(err){Logger.log(err.message)}
                // ----------------- Labels & boxes -----------------
                tab.setWidget        (j,k  ,app.createLabel(arv)      .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // ARV
                offer1[j] =                 app.createTextBox()       .setWidth("60px").setId(r.getId()+","+j+",off1").setName(r.getId()+","+j+",off1").setTitle("Enter your offer")
                tab.setWidget        (j,k  ,offer1[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Offer1 — before repairs
                   try{if(r.offer.beforeRepairs.manual.value){                       // Show value, if any
                       tab.setWidget (j,k-1,app.createLabel(r.offer.beforeRepairs.manual.value).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                tab.setWidget        (j,k  ,app.createLabel("—")      .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Analysis
                   try{if(r.analysis.value){                                         // Show link, if any
                       tab.setWidget (j,k-1,app.createAnchor("Click",r.analysis.link).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                tab.setWidget        (j,k  ,app.createLabel(rep)      .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Repairs
                offer2[j] =                 app.createTextBox()       .setWidth("60px").setId(r.getId()+","+j+",off2").setName(r.getId()+","+j+",off2").setTitle("Enter your offer")
                tab.setWidget        (j,k  ,offer2[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Offer2 —  after repairs
                   try{if(r.offer. afterRepairs.manual.value){                       // Show value, if any
                       tab.setWidget (j,k-1,app.createLabel(r.offer. afterRepairs.manual.value).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                tab.setWidget        (j,k  ,app.createLabel(cof)      .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Counter
                   try{if(r.counter.value){                                          // Show value, if any
                       tab.setWidget (j,k-1,app.createLabel(r.counter                   .value).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                tab.setWidget        (j,k  ,app.createLabel("—")      .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Contract
                   try{if(r.contract.value){                                         // Show link, if any
                       tab.setWidget (j,k-1,app.createAnchor("Click",r.contract.link).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                tab.setWidget        (j,k  ,app.createLabel("—")      .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Assignment
                   try{if(r.assignment.value){                                       // Show link, if any
                       tab.setWidget (j,k-1,app.createAnchor("Click",r.assignment.link).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                button[j] =                 app.createButton("Submit",app.createClientHandler().forEventSource().setText("Wait..."))
                                               .setId(r.getId()+","+j+",sub").addClickHandler(handler);
                tab.setWidget        (j,k  ,button[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Submit button
        }j++;}
    return vpan/*tab*/;}
function sendAlert(){} // Sends email and/or SMS text message to notify agent of incoming “hot” prospect
function handleSubmit(e){ // e is event information // We will extract .parameter properties from e // Reference: https://developers.google.com/apps-script/class_serverhandler#addCallbackElement // Reference: https://sites.google.com/site/appsscripttutorial/miscellaneous/creating-form-elements-dynamically-using-google-apps-script-gas
    var app=UiApp.getActiveApplication(),user=Session.getUser().getEmail(),d=new Date().getTime(),p=e.parameter,tag=p.source.split(","),db=ScriptDb.getMyDb(),r=db.load(tag[0]); // .setId(r.getId()+","+j+",sub") // tag[0] db record ID (e.g., "S20431525059"); tag[1] row (e.g., 7); tag[2] field type (e.g., "offer", "repair");
    var DOCLIST = ["atlaslive@gmail.com","vicmorrison@msn.com","myhom@lemtg.com","keg1@lemtg.com","biz@lemtg.com"],
        ALERT   = "atlaslive@gmail.com,8049145977@pcs.ntelos.com,vicmorrison@msn.com,6192533000@mms.att.net,myhom@lemtg.com,keg1@lemtg.com,biz@lemtg.com";
    // ------------- Operator --------------
    if(e.parameter[("radioValue"+tag[1])]==("no"+tag[1])){r.go=false}else{if(e.parameter[("radioValue"+tag[1])]==("go"+tag[1])){r.go=true;GmailApp.sendEmail(ALERT,"Incoming *Test Only*",r.address.full);}} // Go (boolean) // Reference: http://stackoverflow.com/questions/10903963/strange-behaviour-when-using-radiobutton // Reference: https://developers.google.com/apps-script/class_gmailapp#sendEmail
    try{if(p[(tag[0]+","+tag[1]+",off")]){     // Offer
        r.offer.beforeRepairs.manual.value     = p[(tag[0]+","+tag[1]+",off")];
        r.offer.beforeRepairs.manual.source    = user;
        r.offer.beforeRepairs.manual.timestamp = d;
        }}catch(err){Logger.log(err.message)}
    try{if(p[(tag[0]+","+tag[1]+",off1")]){    // Offer 1 — Before repairs
        r.offer.beforeRepairs.manual.value     = p[(tag[0]+","+tag[1]+",off1")];
        r.offer.beforeRepairs.manual.source    = user;
        r.offer.beforeRepairs.manual.timestamp = d;GmailApp.sendEmail(ALERT,"*Test Only*, Offer1"         ,r.address.full);
        }}catch(err){Logger.log(err.message)}
    try{if(p[(tag[0]+","+tag[1]+",off2")]){    // Offer 2 — After  repairs
        r.offer. afterRepairs.manual.value     = p[(tag[0]+","+tag[1]+",off2")];
        r.offer. afterRepairs.manual.source    = user;
        r.offer. afterRepairs.manual.timestamp = d;GmailApp.sendEmail(ALERT,"*Test Only*, Offer2"         ,r.address.full);
        }}catch(err){Logger.log(err.message)}
    // --------------- Agent ---------------
    try{if(p[(tag[0]+","+tag[1]+",arv")]){     // ARV
        //app.getElementById(tag[0]+","+tag[1]+",sub").setText(p[(tag[0]+","+tag[1]+",arv")])
        r.arv.value                            = p[(tag[0]+","+tag[1]+",arv")];
        //app.getElementById(tag[0]+","+tag[1]+",sub").setText(1+r.arv.value);
        r.arv.source                           = user;
        r.arv.timestamp                        = d;GmailApp.sendEmail(ALERT,"*Test Only*, ARV"            ,r.address.full);
        }}catch(err){Logger.log(err.message)}
    try{if(p[(tag[0]+","+tag[1]+",rep")]){     // Repairs
        r.repairs.value                        = p[(tag[0]+","+tag[1]+",rep")];
        r.repairs.source                       = user;
        r.repairs.timestamp                    = d;GmailApp.sendEmail(ALERT,"*Test Only*, Repairs"        ,r.address.full);
        }}catch(err){Logger.log(err.message)}
    try{if(p[(tag[0]+","+tag[1]+",cof")]){     // Counter
        r.counter.value                        = p[(tag[0]+","+tag[1]+",cof")];
        r.counter.source                       = user;
        r.counter.timestamp                    = d;GmailApp.sendEmail(ALERT,"*Test Only*, Counter offer"  ,r.address.full);
        }}catch(err){Logger.log(err.message)}
    try{if(p[(tag[0]+","+tag[1]+",anl")]){     // Analysis
        r.analysis.link                        = DocsList.createFile(p[(tag[0]+","+tag[1]+",anl")]).addViewers(DOCLIST).getUrl();
        r.analysis.source                      = user;
        r.analysis.timestamp                   = d;GmailApp.sendEmail(ALERT,"*Test Only*, Analysis"       ,r.address.full);
        }}catch(err){Logger.log(err.message)}
    try{if(p[(tag[0]+","+tag[1]+",con")]){     // Contract/Buy
        r.contract.link                        = DocsList.createFile(p[(tag[0]+","+tag[1]+",con")]).addViewers(DOCLIST).getUrl();
        r.contract.source                      = user;
        r.contract.timestamp                   = d;GmailApp.sendEmail(ALERT,"*Test Only*, Contract/Buy"   ,r.address.full);
        }}catch(err){Logger.log(err.message)}
    try{if(p[(tag[0]+","+tag[1]+",asg")]){     // Assignment/Sell
        r.assignment.link                      = DocsList.createFile(p[(tag[0]+","+tag[1]+",asg")]).addViewers(DOCLIST).getUrl();
        r.assignment.source                    = user;
        r.assignment.timestamp                 = d;GmailApp.sendEmail(ALERT,"*Test Only*, Assignment/Sell",r.address.full);
        }}catch(err){Logger.log(err.message)}
    // -------------------------------------
    db.save(r);app.close();return app;}
// ---------------------------------------------------------------- AGENT ----------------------------------------------------------------
function agent(){ // ---------------------------------------------- AGENT ----------------------------------------------------------------
    loadLibrary("gasDealDigger");//Deprecate: var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---2){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    var r,db=ScriptDb.getMyDb(),result=db.query({go:true,table:"situs",tag:{inventory:true}}).sortBy(/*"avm.stat.ratio""date"*/"price",db.ASCENDING,db.NUMERIC);
    var app      = UiApp.createApplication();
    var form     = app.createFormPanel    ();
    var scr      = app.createScrollPanel  ().setSize("100%","2000");
    var vpan     = app.createVerticalPanel();
    var tab      = app.createFlexTable    ().setBorderWidth(1);vpan.add(tab);scr.add(vpan);form.add(scr);app.add(form);
    var handler  = app.createServerHandler("handleSubmit").addCallbackElement(vpan);
    var k,j,i,x,button=[],cof=[],rep=[],arv=[],off1,off2,PROP=[],HEAD=[
                 "address","MLS","price",                      // Property fields
                 "arv","offer","analysis","repair","offer",    // Added    fields
                 "counter","contract/buy","assign/sell","send" // Added    fields
                 ];
    var STYLPATT = ["white","white","white","white","#E8E6EB","white","white","white"];var patlen=STYLPATT.length;  // Color pattern // www.w3schools.com/tags/ref_colorpicker.asp // #150035
    function writeHead(row,arr){ii=arr.length;while(ii--){tab.setText          (row,ii,arr[ii]                    ) // Write header row
                                                             .setStyleAttribute(row,ii,"backgroundColor","#150035")
                                                             .setStyleAttribute(row,ii,"color"          ,"white"  )
                                                             .setStyleAttribute(row,ii,"fontWeight"     ,"bold"   );}}
    j=0;while(result.hasNext()){ // Start row counter // Load records
        if(j%patlen==0){writeHead(j,HEAD)} // Write header row if proper spacing
        else{r=result.next();
            try{off1=r.offer.beforeRepairs.manual.value}catch(e){Logger.log(e.message)};if(off1==null){off1="—"}; // Strict input // Offer — before repairs
            try{off2=r.offer. afterRepairs.manual.value}catch(e){Logger.log(e.message)};if(off2==null){off2="—"}; // Strict input // Offer —  after repairs
            PROP=[r.address.full,r.source.mlsNumber/*source.JsonData.scrape("(MLS","#: ",")")[1]*/,((Math.round(r.price/100))/10)];
            k=PROP.length;i=k;while(i--){x=PROP[i];if(!i){                                   // Reset column counter // Loop to fetch saved data
                tab.setWidget        (j,i  ,app.createAnchor(x,r.link.gmap).setTitle("Beds:"+r.avm.combi.beds+", Baths: "+r.avm.combi.baths+", SqFt: "+r.avm.combi.sqft))  // Insert link to GoogleMaps
                   .setStyleAttribute(j,i  ,"backgroundColor",STYLPATT[j%patlen]);}else{     // Set background color // End loop
                tab.setWidget        (j,i  ,app.createLabel(x)           .setTitle("row "+j))// Insert individual row numbers via widget label
                   .setStyleAttribute(j,i  ,"backgroundColor",STYLPATT[j%patlen]);}}         // Set background color // End loop
                arv[j] =                    app.createTextBox(          ).setWidth("60px").setId(r.getId()+","+j+",arv").setName(r.getId()+","+j+",arv").setTitle("Enter ARV based on comps")
                tab.setWidget        (j,k  ,arv[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // ARV — per comps
                   try{if(r.arv.value){                                             // Show current value
                       tab.setWidget (j,k-1,app.createLabel(r.arv.value ).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                tab.setWidget        (j,k  ,app.createLabel(off1        ).setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // Offer1 — before repairs
                tab.setWidget        (j,k  ,app.createFileUpload(       ).setWidth("84px").setId(r.getId()+","+j+",anl").setName(r.getId()+","+j+",anl").setTitle("Upload property analysis report"))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // Analysis   // File upload // Reference https://developers.google.com/apps-script/class_fileupload // Reference https://developers.google.com/apps-script/class_formpanel
                   try{if(r.analysis.value){                                        // Show link, if any
                       tab.setWidget (j,k-1,app.createAnchor("Click",r.analysis.link).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                rep[j] =                    app.createTextBox(          ).setWidth("60px").setId(r.getId()+","+j+",rep").setName(r.getId()+","+j+",rep").setTitle("Enter repair cost estimate")
                tab.setWidget        (j,k  ,rep[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // Repairs
                   try{if(r.repairs.value){                                         // Show current value
                       tab.setWidget (j,k-1,app.createLabel(r.repairs.value).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                tab.setWidget        (j,k  ,app.createLabel(off2        ).setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // Offer2 —  after repairs
                cof[j] =                    app.createTextBox(          ).setWidth("60px").setId(r.getId()+","+j+",cof").setName(r.getId()+","+j+",cof").setTitle("Enter counter offer")
                tab.setWidget        (j,k  ,cof[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // Counter
                   try{if(r.counter.value){                                         // Show current value
                       tab.setWidget (j,k-1,app.createLabel(r.counter.value).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                tab.setWidget        (j,k  ,app.createFileUpload(       ).setWidth("84px").setId(r.getId()+","+j+",con").setName(r.getId()+","+j+",con").setTitle("Upload accepted contract"))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // Contract   // File upload // Reference https://developers.google.com/apps-script/class_fileupload // Reference https://developers.google.com/apps-script/class_formpanel
                   try{if(r.contract.value){                                        // Show link, if any
                       tab.setWidget (j,k-1,app.createAnchor("Click",r.contract.link).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                tab.setWidget        (j,k  ,app.createFileUpload(       ).setWidth("84px").setId(r.getId()+","+j+",asg").setName(r.getId()+","+j+",asg").setTitle("Upload assignment"))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // Assignment // File upload // Reference https://developers.google.com/apps-script/class_fileupload // Reference https://developers.google.com/apps-script/class_formpanel
                   try{if(r.assignment.value){                                      // Show link, if any
                       tab.setWidget (j,k-1,app.createAnchor("Click",r.assignment.link).setTitle("row "+j))}}catch(err){Logger.log(err.message)}               
                button[j] =                 app.createButton("Submit",app.createClientHandler().forEventSource().setText("?OK"))
                                               .setId(r.getId()+","+j+",sub").addClickHandler(handler);
                tab.setWidget        (j,k  ,button[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // Submit button
        }j++;}
    return app;}
// ----------------------- Data.gs ----------------------- 
// function auth       (){return}
// function size       (){Logger.log(ScriptDb.getMyDb().query({/*raw:true,*/source:{name:"ZipRealty"}/*arv:true/*PropertyType:"Single Family Home",* /raw:false/*,table:"situs",tag:{inventory:true}*/}).getSize());}
function del        (){var db=ScriptDb.getMyDb(),arr=[],r,results=db.query({/*raw:false*/source:{name:"ZipRealty"}});while(results.hasNext()){arr.push(results.next().getId());}db.removeByIdBatch(arr,false);}// Replaced: while(results.hasNext()){r=results.next();db.remove(r);}}
// function showOneById(){Logger.log(JSON.stringify(ScriptDb.getMyDb().load("S20431525059")))} // Show one record
// function showOneId  (){Logger.log(JSON.stringify(ScriptDb.getMyDb().query({/*address:{street:"5117 Surfbreaker Pt"}*/}).next().getId()))} // Show one record
// function showOne    (){Logger.log(JSON.stringify(ScriptDb.getMyDb().query({/*address:{full:"2480 Manzana Wy, San Diego, CA 92139"}*/}).next()))} // Show one record
// function showOneN   (){var N=5,i=0,db=ScriptDb.getMyDb(),r,results=db.query({});while(results.hasNext()){r=results.next();if(i++==N){Logger.log(JSON.stringify(r))}}} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
// function showAll    (){var db=ScriptDb.getMyDb(),r,results=db.query({/*raw:false,*/source:{name:/*"ZipRealty"*/"ChuckWillman"}});while(results.hasNext()){r=results.next();Logger.log(JSON.stringify(r));}} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function mod        (){var db=ScriptDb.getMyDb(),r,results=db.query({go:"false"/*address:{full:"2480 Manzana Wy, San Diego, CA 92139"}*/});while(results.hasNext()){r=results.next();
    r.go = "";
    // r.JsonData = JSON.parse(JSON.stringify(eval(r.JsonData)));Logger.log(JSON.stringify(r));
    // r.arv = {};r.repairs = {};r.offer = {};r.counter = {};
    /* r.offer = {
                "afterRepairs":{
                               "manual":{/*
                                        "timestamp":1351270109060,
                                        "source":"atlaslive@gmail.com",
                                        "value":""* /
                                        }
                               }
              , "beforeRepairs":{
                                "manual":{/*
                                         "timestamp":1351270109060,
                                         "source":"atlaslive@gmail.com",
                                         "value":""* /
                                         }
                              , "auto":240099
                                }
              }; */
    db.save(r);}}
function dataIn(){main_realtor()}
function dataAdd(source){/*Call this SECOND!*///if(ScriptDb.getMyDb().query({raw:true}).getSize()){ // Append AVM estimates to property object/s // Execution only on subjects with no AVM estimates // Need to add condition not to exceed Zillow maximum daily API calls. //getFiles("gasDealDigger");//Deprecate: var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    var /*source=source||"ChuckWillman",up,*/r,db=ScriptDb.getMyDb(),results=db.query({raw:true});/*switch(source){
        case "Realtor"     :while(results.hasNext()){r=results.next();up=LibraryGasMainDD.realtorDataGate(r,300000,true);db.remove(r);if(up[0]){db.save(LibraryjsAvm.avmJson(up[1],"Realtor"     ));}}break;
        case "ChuckWillman":while(results.hasNext()){r=results.next();                                                   db.remove(r);          db.save(LibraryjsAvm.avmJson(r    ,"ChuckWillman")); }break;
        default:Logger.log("Error: No case match");}*/
        while(results.hasNext()){r=results.next();db.save(LibraryjsAvm.avmJson(r));db.remove(r);}
        return}
function getData_publist1(){return                                GmailApp.search("from:'ZipRealty'"    )[0].getMessages()[0].getBody       ()    /*.getAs("application/pdf")* /.getUrl()*/ } // Search email; return html body as string; Next step: scrape html string
function getData_pubauc1 (){return Logger.log(DriveApp.createFile(GmailApp.search("from:'Chuck Willman'")[0].getMessages()[0].getAttachments()[0])/*.getAs("application/pdf")*/ .getUrl()  )} // Search email; create file; after, must manually convert to GoogleSheets // Conversion from .xls to google spreadsheet not supported
function getData_publist2(){/*Call this FIRST!*/var out=[],arr=getData_publist1().split("http://www.ziprealty.com/L/zip_notify/address_line/home_detail") // @param {str} — html email body; @return {array of obj} — key value pairs for each situs as scraped from email
    ,   key = [,"linkScrape","street" ,"csz"  ,"price"  ,"image" ,"bed"     ,"sqft"    ,"bath"    ,"lot"        ,"ptbath"     ,"type"    ]
    ,   que = [,"?"         ,"<strong","color","<strong","<img " ,">Beds:<" ,">Sq ft:<",">Baths:<",">Lot Size:<",">Pt Baths:<",">Type:<" ]
    ,   beg = [,"redirect=" ,">"      ,">"    ,">"      ,"src=\"","<strong>","<strong>","<strong>","<strong>"   ,"<strong>"   ,"<strong>"]
    ,   end = [,"\""        ,"<"      ,"<"    ,"<"      ,"\""    ,"<"       ,"<"       ,"<"       ,"<"          ,"<"          ,"<"       ] // del=[],ins=[]
    ,temp,i=arr.length;while(i---1){temp={privacy:"public",list:"listing",raw:true,table:"situs",market:{state:"CA",city:"San Diego"},source:{name:"ZipRealty",data:LibraryjsUtil._scrapeDataset(arr[i],key,que,beg,end,false,false)}};temp.source.data.link="http://www.ziprealty.com/"+temp.source.data.linkScrape;out.push(temp);}/*Logger.log(out);*/saveIncomingSiti(out,false);return out;}
function getData_publist3(){var out={}} //@param {array of obj} as scraped; @return {array of obj} — raw plus additional data fields appended
function getData_pubauc2(url){return LibraryjsUtil.aa2ao(SpreadsheetApp.openByUrl(url).getSheets()[0].getDataRange().getValues())} // After converting manually, outputs array of arrays; @return {[][]} — spreadsheet rows and columns
function aucDat2ob(ob,url){var out=[],j=0,temp=getData_pubauc1(url),i=temp.length;while(i--){if(!temp[i]["Date"]){out[j]=ob;ob.source.data=temp[i];j++}}return out} // temp[i]["Date"]=temp[i]["Date"].toString();
function saveIncomingSiti(ob,url){ // If incoming from spreadsheet, @param {string} url — url of spreadsheet; if object from scrape, call with url = false; // e.g., saveIncomingSiti({foo},false);
    if(url){var arr=aucDat2ob(ob,url)}else{var arr=ob}var i,db=ScriptDb.getMyDb(),results=db.saveBatch(arr,false);if(db.allOk(results)){Logger.log("Success!")}else{i=results.length;while(i--){var item=results[i];if((typeof item.success)=='function' && !item.success()){Logger.log(item);}}}} // Gets data from ss with given url and saves it to GAS object store
// When adding new source, go to jsAvm.js. There, avmJson() is main AVM call; instructions say go to avmPrep() and add new case.
// -------- EXECUTABLE --------
function goAuction(){
    var    sourceName = /*"ChuckWillman"*/"KennethGreen";
    switch(sourceName){
        case "ChuckWillman" : return saveIncomingSiti({raw:true,table:"situs",source:{name:"ChuckWillman",privacy:"public" ,list:"auction"},market:{state:"AZ",city:"Phoenix"    }},"https://docs.google.com/spreadsheet/ccc?key=0AlLVOoV_2dFtdEJ4SkEzZFVOVEF3c0FwcFBKeFNFY1E");
        case "KennethGreen" : return saveIncomingSiti({raw:true,table:"situs",source:{name:"KennethGreen",privacy:"private",list:"auction"},market:{state:"CA",city:"San Jacinto"}},"https://docs.google.com/spreadsheet/ccc?key=0AlLVOoV_2dFtdEZHM1dOSGtrTmNfbHMzd0JObDJMUmc");
    }}