//-------------------------------------- Code.gs --------------------------------------
// JSON visualization | viewer: http://chris.photobooks.com/json/default.htm
// function getEmailQuota(){Logger.log("Remaining email quota: " + MailApp.getRemainingDailyQuota());}
// Note: to accept doPost() from affiliate, (design decision:) must set: Publish > Deploy as web app > Execute the app as: me, Who has access to the app: Anyone, even anonymous // Otherwise, script will not run at server (though, client will receive responseCode=200); client response (200) is Google accounts sign-in page/form  // Decision Benefits: 1. script runs 2. script authorization bypass (i.e., not needed at UI) // Decision Costs: 1. Looser script security; mitigated by a. Site level access restrictions/permissions b. key method (e.g., switch/case k:foo)
function auth    (){}
function timer   (){Logger.log(new Date().getTime())}//1388228703613
function backup  (){var desc="Apex™ Backup — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({});while(results.hasNext()){out.unshift(results.next())}id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);}
function print   (str){var desc="Apex™ Print — timestamp:"+new Date().getTime(),id=DriveApp.createFile(desc,str,MimeType.HTML).setDescription(desc);Logger.log("Printed doc ID: "+id);}
//function print   (){var desc="Apex™ Print — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({table:"note"});while(results.hasNext()){out.unshift(results.next())}id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);}
function print_test(str,desc){str=str||JSON.stringify(ScriptDb.getMyDb().load("S337185323966"));desc=desc||"Argenta Print — timestamp:"+new Date().getTime();DriveApp.createFile(desc,str,MimeType.HTML);}
function size    (){var db=ScriptDb.getMyDb();Logger.log(/*ScriptDb.getMyDb()*/db.query({}).getSize());}
function showById(){Logger.log(JSON.stringify(ScriptDb.getMyDb().load("S96280679164")))} // Show one record by ID
function showOne (){Logger.log(/*Utilities.jsonStringify*/JSON.stringify(ScriptDb.getMyDb().query({item:"eXjKqn1"/*/table:"note"/* /"user",user:"atlaslive@gmail.com",seller:true/*,city:"test"*/}).next()));} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function showAll (){var db=ScriptDb.getMyDb(),r,results=db.query({});while(results.hasNext()){r=results.next();Logger.log(/*Utilities.jsonStringify*/JSON.stringify(r));return arr}} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function print2ss(){LibraryjsUtil.write2ss(true,showAll(),"Sheet1","1azZ5rq1Sgy2fipwhwd75f9M6jkzvWk4TZmOzH2A4uRg"/*act*/)}
//function del     (){var xdb=ScriptDb.getMyDb(),arr=[],r,results=db.query({xtable:"note"/*,/*source:"fciEx_foo",* /table:db.not("report"),* /timestamp_posted:db.greaterThan(1388548425377),k:"8u0hjrtbd68s3hi1w9kl",/*"36sgd2m257w2j0sn5isa",* /"report"/* /"bid"/*"user"* /,xcity:"test"/*xseller:true,xuser* /,bidder:"atlaslive@gmail.com"*/});while(results.hasNext()){arr.push(results.next().getId());}db.removeByIdBatch(arr,false);} // Replaced: while(results.hasNext()){r=results.next();db.remove(r);}}
//function mod     (){var xdb=ScriptDb.getMyDb(),arr=[],r,results=db.query({/*item* /city:true,/*db.not(db.anyValue())/*/xtable:"note"/*,pctLtv:db.between(0,1.1),lienPos:db.not(1)/*,/*use* /lienPos:db.anyOf(["1st"/*false,db.not(db.anyValue())/*"Hospitality"/*"Commercial"/*"Apt","Multifamily"* /])/*"Oth"/* /"bid"*/});while(results.hasNext()){r=results.next();try{r.pctLtv=Math.round(100*r.balCur/r.estValue)}catch(e){r.pctLtv="";Logger.log(e.message)}/*r.lienPos=1;/*LibraryjsUtil.stateConvert(r.state,"abbr");/*.use="X";/*"CRE";/*"MUL";/*r.city=LibraryjsUtil.toCaseTitle(r.city);/*r.item=LibraryjsUtil.toBase62(Number(r.getId().slice(1)));/*if(r.askPrice==""){r.askPrice=0}/* /r.remove=false;r.accepted=false;/*r.askRate=r.buyRate;r.askPrice=r.buyPts;* /r.bids=[];/*r.table="note";r.datePosted=new Date().getTime();* /var i=r.bids.length;while(i--){/*r.bids[i].timestamp=r.bids[i].time;* /r.bids[i].accepted=false;/*r.bids[i].target_id=r.getId();* /r.bids[i].time=""/* /if(r.bids[i].bidder=="atlaslive@gmail.com"){r.bids.splice(i,1)}* /db.save(r);*/arr.push(r);}db.saveBatch(arr,false)}
//function xdoPost(e){ScriptDb.getMyDb().save(e.parameters);/*return;*/var out=ContentService.createTextOutput();out.setContent(JSON.stringify(e.parameters));return out;} // CreditReady: userId=2472, pswd=p@ssword, url=https://secure.progrexion.com/fsaffiliates/creditready/ // https://developers.google.com/apps-script/uiapp?hl=en#doGetParams // https://developers.google.com/apps-script/content_service?hl=en // Example: // <SCRIPT URL>?start=1325437200&end=1325439000;new Date(Number(request.parameters.start)*1000);new Date(Number(request.parameters.end)*1000));
  function  doPost(e){ // function xdoPost(e){return ContentService.createTextOutput("Hello World"/*"User says: "+JSON.stringify(e)*/)} // e.postData.getDataAsString()
    if(e && e.parameter && e.parameter.k){var k=e.parameter.k,m=e.parameter.m,p=e.parameter;switch(k){
            case   /* receive from fci */ "u2bmkg3mfkmwrxm0sc6p" : return receiveScrape (p,"fciEx"     ) ; break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* receive from nmp */ "01ql19lrwaw5ow7svkti" : return receiveScrape (p,"noteMktPl" ) ; break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* receive from ml  */ "yq6c90r2fcfrou9ag272" : return receiveScrape (p,"moolahList") ; break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
         default                                                 :                                       ; break;}}}
// function xdoGet (e){return ContentService.createTextOutput("Hello World")}
   function  doGet (e){ // References : https://developers.google.com/apps-script/uiapp, https://developers.google.com/apps-script/uiapp#ServerHandlers
    if(e && e.parameter && e.parameter.k){var k=e.parameter.k,m=e.parameter.m,p=e.parameter;switch(k){
	        case   /* table  serve         */ "lm1ueat08syks8059zoa" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(serveBuyers          ( )) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
            case   /* table  receive       */ "kb1ff3dqdd1zsxvsijdo" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(receiveBuyer         (p)) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
         default                                                     : break;}}
	if(SitesApp.getActiveSite()){var siteName = SitesApp.getActiveSite().getName();switch(siteName){
            case   "apextaxlien"                   : 
					if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
                            case   "home"          : return HtmlService.createTemplateFromFile  (        "list.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                            case   "buy"           : return HtmlService.createTemplateFromFile  (       "Buyer.html").evaluate()                                      ;break;
                         // case   "home"          : return HtmlService.createHtmlOutputFromFile(        "list.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
                            case   "authorize"     : return authorize ();break;
                         default                   :                    ;break;}}
            case   "taxlienexchange"               :
					if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
                            case   "home"          : return HtmlService.createTemplateFromFile  (       "Buyer.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                         // case   "home"          : return HtmlService.createHtmlOutputFromFile(     "collect.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
                         default                   :                    ;break;}}
         default                                   : break;}}}
function authorize(){return HtmlService.createHtmlOutput("<div align='center' style='color:#808080;font-family:verdana;color:orange;font-weight:bold;margin-top:15px;'>Authorization successful!<div style='color:#808080;font-size:smaller;font-weight:normal;'>You may now access all features</div><img src='https://lh5.googleusercontent.com/-a81AytXYq0Q/Umtn0FrFdhI/AAAAAAAAIyE/xCYArSNCR1k/s144/orange-check-mark.png' height='100'></div>")}
//function receiveTable(p){var user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null;MailApp.sendEmail({name:"MarketMaker",to:ob.email,subject:"Your limit order has been filled",htmlBody:(""+p.item+","+p.price+","+p.volume+","+p.type")});if(user){ob.owner=user}/*ob.nameFirst=name[0];ob.nameLast=name[1];*/LibraryjsUtil.dbParse(verb:"post",project:"mojo",className:"invitation",ob:ob)} // Example: @return{objectId="CE05GdsyLR",createdAt=2014-07-16T06:45:19.526Z} // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
//function receiveBuyer(p){var user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null;MailApp.sendEmail({name:"MarketMaker",to:ob.email,subject:"Your limit order has been filled",htmlBody:(""+p.item+","+p.price+","+p.volume+","+p.type")});if(user){ob.owner=user}/*ob.nameFirst=name[0];ob.nameLast=name[1];*/LibraryjsUtil.dbParse(verb:"post",project:"mojo",className:"invitation",ob:ob)} // Example: @return{objectId="CE05GdsyLR",createdAt=2014-07-16T06:45:19.526Z} // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
function scrape(){ // Online source of tax liens — JP Morgan
    var act = "http://www.xspand.com/investors/tax_liens_sale/detail.aspx?t=01&j=02&name=Cuyahoga%20County%20OH"
    ,   out = UrlFetchApp.fetch(act).getContentText()
    ; Logger.log(out);
}
function orderMatch(ob){//ob=ob||{price:10,volume:5,type:"Buy"/*"Sell"*/,name:"Atlas",phone:"2064862010",email:"atlaslive@gmail.com"}//@return{array} all open orders "matching" this order //@param{object} ob: the order that needs matching
    var ar,q={},op=(ob.type=="Buy")?"$lte":"$gte";q[op]=ob.price;ar=LibraryjsUtil.dbParse(verb:"get",project:"apex",className:"order",query:{status:"Open",price:q,type:{"$ne":ob.type}});return ar}//Logger.log(ar)} // Reference: https://www.parse.com/docs/rest#queries
function orderFill(ob){//ob=ob||{price:3.6,volume:500,type:"Buy"/*"Sell"*/,name:"Atlas",phone:"2064862010",email:"atlaslive@gmail.com"}//@return{void} "fills" all open orders "matching" this order //@param{object} ob: the order that needs matching
    var bal=ob.volume,ar=orderMatch(ob).results.sort(function(a,b){var x="price";return(a[x]-b[x])}),i=ar.length;if(ob.type=="Buy"){ar.reverse()}//Logger.log(JSON.stringify(ar)); // Reference: https://www.parse.com/docs/rest#queries
    while(bal&&i--){                      ar[i].status               = "Pending"              ;
                                      //  ar[i].counterpartyName     = ob.name                ;
                                          ar[i].counterparty/*Email*/= ob.email               ;
                                      //  ar[i].counterpartyPhone    = ob.phone               ;
                                          if(bal>=ar[i].volume){bal -= ar[i].volume           }
                                          else                 {       ar[i].volume-=bal;bal=0}
                                          LibraryjsUtil.dbParse(verb:"put" ,project:"apex",className:"order",ob:ar[i],obid:ar[i].objectId)
                   }if(bal){ob.volume=bal;LibraryjsUtil.dbParse(verb:"post",project:"apex",className:"order",ob:ob                       )}}
function receiveOrder(ob){var AR=["price","volume"],i=AR.length;while(i--){ob[AR[i]]=Number(ob[AR[i]])}ob.email=Session.getUser().getEmail();ob.status="Open";return LibraryjsUtil.dbParse(verb:"post",project:"apex",className:"order",ob:ob)}//ob.price=Number(ob.price);ob.volume=Number(ob.volume);
function sendUserToClient(){var user=Session.getActiveUser().getEmail(),u=ScriptDb.getMyDb().query({table:"user",seller:true,user:user}).next();/*Logger.log(JSON.stringify(r));*/return u;}
function serveTable(){var r,ob=[],d=new Date(),t=d.getTime(),user=Session.getUser().getEmail(),ar=LibraryjsUtil.dbParse(verb:"post",project:"apex",className:"order"/*,query:{owner:user,status:"Open"}*/).results.sort(function(a,b){var x="price";return(a[x]-b[x])}),i=ar.length,out={"totalResultsCount":i+1,"records":[]};while(i--){out.records[i]={};r=ar[i];
	ob[i] = {
		"nolink"                         : {
				"item"                   : function(){try{return            r.objectId                   }catch(e){Logger.log("Error VS0dv: "+e.message);return "";}}() //
			,	"email"                  : function(){try{return            r.email                      }catch(e){Logger.log("Error dqQ4d: "+e.message);return "";}}() //
		//	,	"fill"                   : function(){try{return              false                      }catch(e){Logger.log("Error YJmR4: "+e.message);return "";}}() //
			,	"price"                  : function(){try{return                                r.price  }catch(e){Logger.log("Error sibZI: "+e.message);return "";}}() //
			,	"priceStr"               : function(){try{return LibraryjsUtil.num2cur         (r.price )}catch(e){Logger.log("Error r9tK3: "+e.message);return "";}}() //
			,	"status"                 : function(){try{return            r.status                     }catch(e){Logger.log("Error G68tu: "+e.message);return "";}}() //
			,	"type"                   : function(){try{return            r.type                       }catch(e){Logger.log("Error oMrxC: "+e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
			,	"volume"                 : function(){try{return                                r.volume }catch(e){Logger.log("Error 1kbqS: "+e.message);return "";}}() //
			,	"volStr"                 : function(){try{return LibraryjsUtil.numberWithCommas(r.volume)}catch(e){Logger.log("Error jt1D6: "+e.message);return "";}}() //
										   }
	,	"link"		                     : {}
	}
	var keys=Object.keys(ob[i].nolink),z=keys.length;while(z--){out.records[i][keys[z]]=              ob[i].nolink[keys[z]]                                   }
	    keys=Object.keys(ob[i].  link),z=keys.length;while(z--){out.records[i][keys[z]]='<a href="' + ob[i].  link[keys[z]] + '" target="_blank">&#10151;</a>'}//Logger.log(JSON.stringify(out.records[i]));
	}return out}//Logger.log(JSON.stringify(out))}
function authorize(){return HtmlService.createHtmlOutput("<div align='center' style='color:#808080;font-family:verdana;color:orange;font-weight:bold;margin-top:15px;'>Authorization successful!<div style='color:#808080;font-size:smaller;font-weight:normal;'>You may now access all features</div><img src='https://lh5.googleusercontent.com/-a81AytXYq0Q/Umtn0FrFdhI/AAAAAAAAIyE/xCYArSNCR1k/s144/orange-check-mark.png' height='100'></div>")}
function processForm_receiveFundDocs(ob){var i,user=Session.getActiveUser().getEmail(),t=new Date().getTime(),db=ScriptDb.getMyDb(),q={table:"user",seller:true,user:user},r=db.query(q).next();
    if(!r){r=q;r.record=[];r.emailList={current:[],archive:[]};}r.record.unshift(ob);r.record[0].date=t;r.emailList.current.unshift((t+","+ob.emailListString).split(/[\s,]+/)); // function test(){Logger.log("foo bar, zap-foo, baz bat".split(/[\s,]+/))} // Search term: split string by commar or space // Reference: http://stackoverflow.com/questions/1835032/regexp-split-string-by-commas-and-spaces-but-ignore-hyphenated-words
    i=r.emailList.current[0].length;while(i---1){if(r.emailList.archive.indexOf(r.emailList.current[i])==-1){r.emailList.archive.push(r.emailList.current[0][i])}}Logger.log(JSON.stringify(r));db.save(r)}
function processForm_registerSeller(ob){var i,user=Session.getActiveUser().getEmail(),t=new Date().getTime(),db=ScriptDb.getMyDb(),q={table:"user",seller:true,user:user},r=db.query(q).next();
    if(!r){r=q;r.record=[];r.emailList={current:[],archive:[]};}r.record.unshift(ob);r.record[0].timestamp=t;r.emailList.current.unshift((t+","+ob.emailListString).split(/[\s,]+/)); // function test(){Logger.log("foo bar, zap-foo, baz bat".split(/[\s,]+/))} // Search term: split string by commar or space // Reference: http://stackoverflow.com/questions/1835032/regexp-split-string-by-commas-and-spaces-but-ignore-hyphenated-words
    i=r.emailList.current[0].length;while(i---1){if(r.emailList.archive.indexOf(r.emailList.current[i])==-1){r.emailList.archive.push(r.emailList.current[0][i])}}Logger.log(JSON.stringify(r));db.save(r)}
function processForm_registerBuyer(ob){//var formBlob=ob.myFile,driveFile=DriveApp.createFile(formBlob);return driveFile.getUrl()
    ob.email=Session.getActiveUser().getEmail();LibraryjsUtil.dbParse(verb:"update",project:"apex",className:"user","email",ob)} // Goes in Code.gs // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
function processForm_addNote(ob){var user=Session.getActiveUser().getEmail(),t=new Date().getTime(),db=ScriptDb.getMyDb(),u=db.query({table:"user",user:user,seller:true}).next(),i,dist=u.emailList.current[0].slice(1),site=SitesApp.getSite("onlinenoteexchange");if(!u.record[0].agreed){Logger.log(user+" did not agree to groundrules.");return}ob.table="note";ob.timestamp_posted=t;ob.seller=user;ob.remove=false;ob.accepted=false;ob.filePic=processPic(ob.filePic);ob.fileDoc=processDoc(ob.fileDoc);if(ob.askPrice==""){ob.askPrice=0};var id=db.save(ob).getId(),r=db.load(id);r.item=LibraryjsUtil.toBase62(Number(id.slice(1)));db.save(r);
    chromeLogoBlob=UrlFetchApp.fetch("https://lh5.googleusercontent.com/-zCLeer1r3ro/Udnn8thtnmI/AAAAAAAAHys/lWkaQnXPv_Q/s144/Google_Chrome_icon_2011.jpg").getBlob().setName("chromeLogoBlob");
    i=dist.length;while(i--){try{site.addViewer(dist[i])}catch(e){Logger.log(dist[i]+": "+e.message)}MailApp.sendEmail({to:dist[i],subject:"New loan: "+r.askRate+"%, "+r.askPrice+" points",htmlBody:("<a href='https://sites.google.com/site/onlinenoteexchange/buy'>Click here</a> (item: "+r.item+") <a href='https://www.google.com/intl/en/chrome/browser/'><img src='cid:chromeLogo' height='15' style='text-decoration:none;border:0;outline:none'></a> <a href='https://www.google.com/intl/en/chrome/browser/'>Chrome required</a>.<br><br>Rate: "+r.askRate+"% +"+r.askPrice+" points<br><br>Collateral:<br>"+r.sa+", "+r.city+", "+r.state+" "+r.zip+"<br>"+r.use+", "+r.beds+" beds, "+r.baths+" baths, "+r.sqft+" sqft, "+"<br><br>Loan Type: "+r.purpose+"<br>Unpaid Principal Balance: $"+r.balCur+"<br>Estimated Value: $"+r.estValue+"<br>LTV: "+r.pctLtv/*+"%<br>Term: "+r.term+" months<br>"*/+"<br>Highlights: "+r.notes),name:"atlaslive@gmail.com",inlineImages:{chromeLogo:chromeLogoBlob/*,youtubeLogo:youtubeLogoBlob*/}});}/*Logger.log(JSON.stringify(ob));*/return}
function sendUserToClient(){var user=Session.getActiveUser().getEmail(),u=ScriptDb.getMyDb().query({table:"user",seller:true,user:user}).next();/*Logger.log(JSON.stringify(r));*/return u;}
function processDoc(blob){try{var id=DocsList.createFile(blob/*.getAs("application/pdf")*/).getId();}catch(e){Logger.log("Error TfOvV: "+e.message);return "";}DriveApp.getFileById(id).setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);return DocsList.getFileById(id).getUrl();} // Reference: https://developers.google.com/apps-script/reference/base/composite-blob#getAs(String) // Reference: https://code.google.com/p/google-apps-script-issues/issues/detail?id=1660 see #37, Oct 13, 2012 // Use DocsList instead of DriveApp which will not allow document to be viewed properly
function processPic(blob){if(!blob.length){return ""}return "https://drive.google.com/uc?export=view&id="+DriveApp.createFile(blob/*.getAs("image/jpeg")*/).setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW).getId()} // Image // Reference: http://stackoverflow.com/questions/10311092/displaying-files-e-g-images-stored-in-google-drive-on-a-website // http://stackoverflow.com/questions/14717426/referencing-project-files-with-html-service > http://googleappsdeveloper.blogspot.in/2012/11/announcing-google-drive-site-publishing.html
function getAvmReport(addy){return "<a href='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00'><img src='https://lh3.googleusercontent.com/-8Dnm1JNVEME/U7QEBR2B-aI/AAAAAAAAMEc/djtf-w7xIII/s144/color3e0901.png'></a>"}//JSON.stringify(LibraryjsAvm.avmData(addy))}//addy}//"<strong>Hello</strong> world"}//return HtmlService.createHtmlOutputFromFile("AvmReport.html").setSandboxMode(HtmlService.SandboxMode.NATIVE)}//function test(){print_test(getAvmReport("5115 Longfellow Street, Los Angeles, CA, 90042"))}//"5115 Longfellow Street, Los Angeles, CA, 90042"//"12204 12th Ave NW, Seattle, WA 98177"
function listAug(){ // Appends AVM data to raw tax sale data //function test(){Logger.log(JSON.stringify(listAug()))}
    var dataob,out,i,r,SHEET=["Sheet1","Sheet2"],ss=SpreadsheetApp./*getActiveSpreadsheet*/openById("10r-1n8OW5J21aV-l9B3kmttJO7XymQZ2kL06SE3MUoY"),sheetIn=ss.getSheetByName(SHEET[0]);//,rangeOut,rangeIn,sheetOut=ss.getSheetByName(SHEET[1]);if(!sheetOut){sheetOut=ss.insertSheet(SHEET[1],1)}//;Logger.log(JSON.stringify(datob));}
    while(true)/*var j=2;while(j--)*/{var rangeIn=sheetIn.getRange(1,1,2,sheetIn.getLastColumn()),datarr=rangeIn.getValues()/*,head,headerExists=sheetOut.getRange(1,1,1,1).getValue().length*/;datob=LibraryjsUtil.aa2ao(datarr)[0];
	        try{r=LibraryjsAvm.avmJson(({"source":{"name":"manual","data":datob.PropertyAddress+", "+datob.state}})) }catch(e){Logger.log("Error DeIaw: "+e.message);return false}//if(!aug){sheetIn.deleteRow(2);return};if(scrape_serverPost(datob,scraped,"36sgd2m257w2j0sn5isa")){sheetIn.deleteRow(2)}return} // var x=UrlFetchApp.fetch("https://script.google.com/macros/s/AKfycbwT66_MExluhggRGS48QQikDxTzElT7F1WWRImBHoKDqEjFdIs/exec",{method:"post"});Logger.log(x.getResponseCode());Logger.log(x.getContentText());}
            try{datob["sa"           ] =                r .address  .sa                                              }catch(e){Logger.log("Error WFaK6: "+e.message)}
            try{datob["city"         ] =                r .address  .city                                            }catch(e){Logger.log("Error 54WEG: "+e.message)}
            try{datob["state"        ] =                r .address  .state                                           }catch(e){Logger.log("Error JktCk: "+e.message)}
            try{datob["zip"          ] =                r .address  .zip                                             }catch(e){Logger.log("Error fFxLb: "+e.message)}
            try{datob["useCode"      ] =                r .avm.combi.useCode                                         }catch(e){Logger.log("Error PY9x4: "+e.message)}
            try{datob["beds"         ] =                r .avm.combi.beds                                            }catch(e){Logger.log("Error QHYmr: "+e.message)}
            try{datob["baths"        ] =                r .avm.combi.baths                                           }catch(e){Logger.log("Error 8vayN: "+e.message)}
            try{datob["sqft"         ] =                r .avm.combi.sqft                                            }catch(e){Logger.log("Error KPJKq: "+e.message)}
            try{datob["lot"          ] =                r .avm.combi.lot                                             }catch(e){Logger.log("Error 8DhY4: "+e.message)}
            try{datob["built"        ] =                r .avm.combi.built                                           }catch(e){Logger.log("Error W4fAd: "+e.message)}
            try{datob["taxVal"       ] =                r .avm.combi.taxVal                                          }catch(e){Logger.log("Error Xo0SY: "+e.message)}
            try{datob["lastSoldPrice"] =                r .avm.combi.lastSoldPrice                                   }catch(e){Logger.log("Error q7hV5: "+e.message)}
            try{datob["lastSoldDate" ] =                r .avm.combi.lastSoldDate                                    }catch(e){Logger.log("Error yg689: "+e.message)}
            try{datob["lastSoldYear" ] =                r .avm.combi.lastSoldYear                                    }catch(e){Logger.log("Error dtFYm: "+e.message)}
            try{datob["autoEst"      ] =                r .avm.stat .autoEst                                         }catch(e){Logger.log("Error NlyB0: "+e.message)}
            try{datob["popCount"     ] =                r .avm.stat .popCount                                        }catch(e){Logger.log("Error 5WrpT: "+e.message)}
            try{datob["sdPct"        ] =                r .avm.stat .sdPct                                           }catch(e){Logger.log("Error oYX7v: "+e.message)}
	        try{datob["trulia"       ] =                r .link     .trulia                                          }catch(e){Logger.log("Error EH96W: "+e.message)}
            try{datob["gmap"         ] =                r .link     .gmap                                            }catch(e){Logger.log("Error vFgl4: "+e.message)}
            try{datob["zillow"       ] =                r .link     .zillow                                          }catch(e){Logger.log("Error 4DpYl: "+e.message)}
            try{datob["zipSkinny"    ] =                r .link     .zipSkinny                                       }catch(e){Logger.log("Error xxuIC: "+e.message)}
            try{datob["homeSnap"     ] =                r .link     .homeSnap                                        }catch(e){Logger.log("Error Scjxl: "+e.message)}
            try{datob["homesCom"     ] =                r .link     .homesCom                                        }catch(e){Logger.log("Error cAgFl: "+e.message)}
            try{datob["realEstate"   ] =                r .link     .realEstate                                      }catch(e){Logger.log("Error m7k85: "+e.message)}
            try{datob["realtor"      ] =                r .link     .realtor                                         }catch(e){Logger.log("Error X9ppo: "+e.message)}
         // try{datob["archive"      ] = JSON.stringify(r).slice(0,49999)                                            }catch(e){Logger.log("Error soekw: "+e.message)}
            LibraryjsUtil.dbParse("POST","apex","situs",datob);/*out=LibraryjsUtil.ao2aa([datob]);sheetOut.insertRowAfter(1);
			if(headerExists){    head=sheetOut.getRange(1,1,1,out[1].length).getValues();out[2]=[];i=head[0].length;while(i--){out[2][i]=datob[head[0][i]]} // Matches/aligns columns
			                 rangeOut=sheetOut.getRange(2,1,1,out[2].length);rangeOut.setValues([out[2]])} // Deleting this section because going to post directly to DB. Avoids formatting problems caused by SS. e.g., #NUM! reformats as text string, making numbers throw error 
	        else            {rangeOut=sheetOut.getRange(1,1,2,out[0].length);rangeOut.setValues( out    )} */
	                                  sheetIn .deleteRow(2)}return "OK"}
function serveBuyers(){var ob=[],arr=[],i,j,k,r,t=[],zil=[],bidRate="",bidPrice="",bidTime=0,user=Session.getUser().getEmail(),out={"totalResultsCount":0,"records":[]}//,db=ScriptDb.getMyDb()
    , u       = LibraryjsUtil.dbParse("get","apex","user" ).results[0]
    , states  = LibraryjsUtil.dbParse("get","apex","state").results
    , results = LibraryjsUtil.dbParse("get","apex","situs").results,ii=results.length;while(ii--){r=results[ii];i=out.totalResultsCount++;
	try{out.records[i]={db_id:LibraryjsUtil.rc4Encrypt("DktaE",r.objectId)}}catch(e){Logger.log("Error V1elj: "+e.message)}//try{j=r.bids.length;while(j--){if(r.bids[j].bidder==user&&(r.bids[j].timestamp>bidTime)){bidRate=r.bids[j].rate;bidPrice=r.bids[j].points;bidTime=r.bids[j].timestamp;break;}}}catch(e){Logger.log("Error 15qCA: "+e.message);} // try{if(r.bids){arr[i]=r.bids;j=arr[i].length;while(j--){t[j]=0;if(arr[i][j].bidder==user&&(arr[i][j].time>t[j])/*&&(!arr[i][j].confirmed)*/){t[j]=arr[i][j].time;out.records[i].MyBid=arr[i][j].balCur}}}}catch(e){Logger.log("Error HETzh: "+e.message)}; // "MyBid"
	ob[i] = {
		"nolink"                         : {
                "sa"                     : function(){try{return                 r.sa                                          }catch(e){Logger.log("Error WFaK6: "+e.message);return "";}}() //
            ,   "city"                   : function(){try{return                 r.city                                        }catch(e){Logger.log("Error 54WEG: "+e.message);return "";}}() //
            ,   "state"                  : function(){try{return                 r.state                                       }catch(e){Logger.log("Error JktCk: "+e.message);return "";}}() //
            ,   "bidMin"                 : function(){try{return                 r.MinimumBid                                  }catch(e){Logger.log("Error aPU8i: "+e.message);return "";}}() //
        //  ,   "bidMax"                 : function(){try{return              // See below                                     }catch(e){Logger.log("Error 9QfUp: "+e.message);return "";}}() //
            ,   "taxVal"                 : function(){try{return                 r.taxVal                                      }catch(e){Logger.log("Error Xo0SY: "+e.message);return "";}}() //
            ,   "useCode"                : function(){try{return                 r.useCode                                     }catch(e){Logger.log("Error PY9x4: "+e.message);return "";}}() //
            ,   "zip"                    : function(){try{return                 r.zip                                         }catch(e){Logger.log("Error fFxLb: "+e.message);return "";}}() //
            ,   "autoEst"                : function(){try{return                 r.autoEst                                     }catch(e){Logger.log("Error NlyB0: "+e.message);return "";}}() //
            ,   "yieldMax"               : function(){try{return     LibraryjsUtil.queryArray(states,{abbr:r.state},"yield")   }catch(e){Logger.log("Error B82Yp: "+e.message);return "";}}() //
        //  ,   "yieldMin"               : function(){try{return                 u.yieldMin                                    }catch(e){Logger.log("Error nwI4f: "+e.message);return "";}}() //
    	//  ,   "beds"                   : function(){try{return                 r.beds                                        }catch(e){Logger.log("Error QHYmr: "+e.message);return "";}}() //
        //  ,   "baths"                  : function(){try{return                 r.baths                                       }catch(e){Logger.log("Error 8vayN: "+e.message);return "";}}() //
        //  ,   "sqft"                   : function(){try{return                 r.sqft                                        }catch(e){Logger.log("Error KPJKq: "+e.message);return "";}}() //
        //  ,   "lot"                    : function(){try{return                 r.lot                                         }catch(e){Logger.log("Error 8DhY4: "+e.message);return "";}}() //
        //  ,   "built"                  : function(){try{return                 r.built                                       }catch(e){Logger.log("Error W4fAd: "+e.message);return "";}}() //
        //  ,   "lastSoldPrice"          : function(){try{return                 r.lastSoldPrice                               }catch(e){Logger.log("Error q7hV5: "+e.message);return "";}}() //
        //  ,   "lastSoldDate"           : function(){try{return                 r.lastSoldDate                                }catch(e){Logger.log("Error yg689: "+e.message);return "";}}() //
        //  ,   "lastSoldYear"           : function(){try{return                 r.lastSoldYear                                }catch(e){Logger.log("Error dtFYm: "+e.message);return "";}}() //
        //  ,   "popCount"               : function(){try{return                 r.popCount                                    }catch(e){Logger.log("Error 5WrpT: "+e.message);return "";}}() //
        //  ,   "sdPct"                  : function(){try{return                 r.sdPct                                       }catch(e){Logger.log("Error oYX7v: "+e.message);return "";}}() //
	    //  ,   "trulia"                 : function(){try{return                 r.trulia                                      }catch(e){Logger.log("Error EH96W: "+e.message);return "";}}() //
        //  ,   "gmap"                   : function(){try{return                 r.gmap                                        }catch(e){Logger.log("Error vFgl4: "+e.message);return "";}}() //
        //  ,   "zillow"                 : function(){try{return                 r.zillow                                      }catch(e){Logger.log("Error 4DpYl: "+e.message);return "";}}() //
        //  ,   "zipSkinny"              : function(){try{return                 r.zipSkinny                                   }catch(e){Logger.log("Error xxuIC: "+e.message);return "";}}() //
        //  ,   "homeSnap"               : function(){try{return                 r.homeSnap                                    }catch(e){Logger.log("Error Scjxl: "+e.message);return "";}}() //
        //  ,   "homesCom"               : function(){try{return                 r.homesCom                                    }catch(e){Logger.log("Error cAgFl: "+e.message);return "";}}() //
        //  ,   "realEstate"             : function(){try{return                 r.realEstate                                  }catch(e){Logger.log("Error m7k85: "+e.message);return "";}}() //
        //  ,   "realtor"                : function(){try{return                 r.realtor                                     }catch(e){Logger.log("Error X9ppo: "+e.message);return "";}}() //
            							   }
     /* ,   "link"                       : {
				"link_boa"               : function(){try{return  /*ok* /        r.link.boa                                    }catch(e){Logger.log("Error X9trT: "+e.message);return "";}}() //
			,	"link_chase"             : function(){try{return  /*ok* /        r.link.chase                                  }catch(e){Logger.log("Error kQN8M: "+e.message);return "";}}() //
    		,	"link_zipSkinny"         : function(){try{return  /*ok* /        r.link.zipSkinny                              }catch(e){Logger.log("Error 0iaeQ: "+e.message);return "";}}() //
										   } */
            };try{var val=r.autoEst/*||r.taxVal*/;ob[i]["nolink"]["bidMax"]=Math.min(val*u.ratioMax,r.MinimumBid*ob[i]["nolink"]["yieldMax"]/u.yieldMin) }catch(e){Logger.log("Error Expbq: "+e.message);return "";}
	var keys=Object.keys(ob[i].nolink),z=keys.length;while(z--){out.records[i][keys[z]]=              ob[i].nolink[keys[z]]                                   }
     // keys=Object.keys(ob[i].  link),z=keys.length;while(z--){out.records[i][keys[z]]='<a href="' + ob[i].  link[keys[z]] + '" target="_blank">&#10151;</a>'}Logger.log(JSON.stringify(out.records[i]));
	}return out}
-------------------------------------- form.html (a template kit for implementing forms; must be unpacked) --------------------------------------
function processForm(formObject){var formBlob=formObject.myFile,driveFile=DriveApp.createFile(formBlob);return driveFile.getUrl()} // Goes in Code.gs // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
<form id="myForm"><input name="myFile" type="file"><input type="button" value="Submit" onclick="google.script.run.withSuccessHandler(updateUrl).processForm(this.parentNode);this.parentNode.reset()"></form><div id="output"></div><script>function updateUrl(url){document.getElementById("output").innerHTML='<a href="'+url+'">Got it!</a>'}</script><!--Goes in index.html; Reference: https://developers.google.com/apps-script/guides/html/communication#forms-->
-------------------------------------- Buyer.html -------------------------------------------------------------------------------------------
<!DOCTYPE html><html><head>
    <meta charset="utf-8"/> <!--Improve search box: http://view.jquerymobile.com/1.4.0/demos/controlgroup/#Textinputs -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"> <!-- Latest compiled and minified CSS --> <!-- http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css --> <!-- Color definitions: http://getbootstrap.com/customize/#colors | Blue:#428bca(hover:#3071a9) -->
<!--<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css"> <!-- Optional theme -->
<!--<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons.css"> <!-- Google styles | Reference: https://developers.google.com/apps-script/add-ons/css -->
<!--<link rel="stylesheet" href="https://googledrive.com/host/0B1LVOoV_2dFtMzM0LXE2QTU4b1E"><!--Tables-->
    <style>
        input {padding:7px 10px;border-radius:5px;margin-bottom:3px;xcolor-blue-button-primary:#428bca;xcolor-blue-button-hover:#3071a9;xcolor:#006dcc;xcolor:#0044cc;xcolor:#3e0901;xheight:100px;xfont-size:150%;xborder:5px solid #3e0901;}
    </style>
</head>
<body><div style="xwidth:65%;width:350px;margin:auto;text-align:center">
    <?var user=Session.getActiveUser().getEmail(),u,y="",z="";try{u=LibraryjsUtil.dbParse("get","apex","user",{email:user}).results[0]}catch(e){Logger.log("Error HBeaJ: "+e.message)}
	                                                          try{y=u.yieldMin                                                        }catch(e){Logger.log("Error 0v9WR: "+e.message)}
	                                                          try{z=u.ratioMax                                                        }catch(e){Logger.log("Error FihSs: "+e.message)}?>
<!--<form id="myForm"><input name="myFile" type="file"><input type="button" value="Submit" onclick="google.script.run.withSuccessHandler(updateUrl).processForm(this.parentNode);this.parentNode.reset()"></form><div id="output"></div><script>function updateUrl(url){document.getElementById("output").innerHTML='<a href="'+url+'">Got it!</a>'}</script><!--Goes in index.html; Reference: https://developers.google.com/apps-script/guides/html/communication#forms-->
    <form id="research"><!--References: https://developers.google.com/apps-script/guides/html-service-communication#forms https://developers.google.com/apps-script/guides/html-service-communication#user_objects-->
        <table style="width:100%"><tbody>
		<tr><td style="text-align:left">
		    Target<br>Yield</td><td style="padding:0px 10px">
		    <input value="<?=y?>" type="number" style="width:100%;text-align:center" id="yieldMin" name="yieldMin" placeholder="Min" title="Minimum target effective current yield. (Annual interest accrual divided by maximum bid (purchase price).)" min="0" max="72" step="0.25" xonkeyup="updateLink()"> <!-- Note: Must use "onkeyup," otherwise "onkeypress" or "onkeydown" captures input before character is registered; so last character is omitted; usually the last digit of the zip code. -->
		    </td><td style="text-align:left;padding-right:15px">%</td><!--</tr><tr>-->
		    <td style="text-align:left;padding-left:15px">
		    Price<br>Ratio</td><td style="padding:0px 10px">
		    <input value="<?=z?>" type="number" style="width:100%;text-align:center" id="ratioMax" name="ratioMax" placeholder="Max" title="Maximum price ratio. (Maximum bid divided by After Repair Value Estimate — ARV)" min="0" max="100" step="5" xonkeyup="updateLink()"> <!-- Note: Must use "onkeyup," otherwise "onkeypress" or "onkeydown" captures input before character is registered; so last character is omitted; usually the last digit of the zip code. -->
		    </td><td>%</td></tr>
		</tbody></table>
	    <input type="button" class="btn btn-block btn-primary" xclass="blue|#428bca" value="Submit" onclick="google.script.run.withSuccessHandler().processForm_registerBuyer(this.parentNode);alert('Updated received!\nNow, refresh page to see updated max bids.');"> <!-- Reference: http://stackoverflow.com/questions/5462251/button-width-in-css3 -->
	</form><!--<br><div id="result"></div>--></div>
<script>
//function onFailure(e){alert(e.message)}function onSuccess(str){document.getElementById("result").innerHTML=str}//iframe doesn't work bc get request is only sent on page load. So we have the user click a link. //"<iframe src='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00' width='1200' height='1200'></iframe>"}//alert(/*"Input received!"* /document.getElementById("address").value)}
//function myFunction(){document.getElementById("result").innerHTML="<img src='https://lh5.googleusercontent.com/-WsUsFefoGLQ/U_1TvMrrfvI/AAAAAAAAMnI/PDrmxMB9aZ4/s800/load666666.gif'>";
//    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).avmReportGetLink(this.parentNode)}//Don't use document.getElementById("address").value} because it will not return the entire form (only the address datafield) and if the code is copy/pasted in the future, it will create a bug if the entire form is needed//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" // Note: Use this.parentNode to retrieve all the fields in a form; to get only a single field, use something like: document.getElementById("address").value //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
</script></body></html>
-------------------------------------- list0.html --------------------------------------
<html>
  <head>
    <script type='text/javascript' src='https://www.google.com/jsapi'></script>
    <script type='text/javascript'>
      google.load('visualization', '1', {packages:['table']});
      google.setOnLoadCallback(drawTable);
      function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Salary');
        data.addColumn('boolean', 'Full Time Employee');
        data.addRows([
          ['Mike'  , { v : 10000, f : '$10,000'} , true  ]
        , ['Jim'   , { v :  8000, f :  '$8,000'} , false ]
        , ['Alice' , { v : 12500, f : '$12,500'} , true  ]
        , ['Bob'   , { v :  7000, f :  '$7,000'} , true  ]
        ]);

        var table = new google.visualization.Table(document.getElementById('table_div'));
        table.draw(data, {showRowNumber: true});
      }
    </script>
  </head>

  <body>
    <div id='table_div'></div>
  </body>
</html>
-------------------------------------- list.html --------------------------------------
<!DOCTYPE html><html style="text-align:center;font-family:arial;font-size:100%;color:#888888;"><head><meta charset="utf-8"/>
<!--                                         Grey                                                              Blue                                                              Brown                                                             Green                                                             Purple                                                            Red                                                        -->
<link rel="stylesheet" type="text/css" href="https://googledrive.com/host/0B1LVOoV_2dFtMEQxYks5SnY4UDQ" xhref="https://googledrive.com/host/0B1LVOoV_2dFtSEtlUmdQcEZWUEE" xhref="https://googledrive.com/host/0B1LVOoV_2dFtUnBXa242eGlpdzg" xhref="https://googledrive.com/host/0B1LVOoV_2dFtMXFxVFFqalRyNGs" xhref="https://googledrive.com/host/0B1LVOoV_2dFtOTlfTU9xQ1RueWM" xhref="https://googledrive.com/host/0B1LVOoV_2dFta1NwUVZheXR0ZFE"  />
<link rel="stylesheet"                 href="https://ssl.gstatic.com/docs/script/css/add-ons.css"> <!-- Reference: https://developers.google.com/apps-script/add-ons/css -->
<style>
    xinput   {color:#000000;xheight:100px;font-size:90%;padding:1px 2px;xborder:1px solid #000000;border-radius:3px;text-align:left}
    xselect  {color:#888888;text-align:center}
	xform    {xbackground:grey;xpadding:6px;xborder:2px solid #DDDDDD;border-radius:8px}
	fieldset {text-align:left;border-radius:3px}
	h1       {text-align:center;font-size:150%;font-weight:bold;color:#BBBBBB}
	hr       {width:400px}
</style>
</head>
<body><?var user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null,arr,ar_ao=[],ar_mo=[],ar_ap=[],ar_mp=[],ar_ac=[],ar_mc=[],ar=serveTable().records,i=ar.length;while(i--){
		    if(ar[i].status=="Open"   ){ar_ao.push(ar[i]);if(ar[i].email==user){ar_mo.push(ar[i])}} // Load open    arrays , all + my
		    if(ar[i].status=="Pending"){ar_ap.push(ar[i]);if(ar[i].email==user){ar_mp.push(ar[i])}} // Load pending arrays , all + my
		    if(ar[i].status=="Closed" ){ar_ac.push(ar[i]);if(ar[i].email==user){ar_mc.push(ar[i])}} // Load closed  arrays , all + my
	   }arr=ar_ao;
	    var mp,i=arr.length,temp=arr[i-1].type;while(i--){if(temp!=arr[i].type){mp=[arr[i].price,arr[i+1].price].sort(function(a,b){return(a-b)});break}else{temp=arr[i].type}}?><span style="color:red">Sell <?=LibraryjsUtil.num2cur(mp[0])?></span>&nbsp;&nbsp;&nbsp;<span style="color:green">Buy <?=LibraryjsUtil.num2cur(mp[1])?></span>
      <?var uynf="",uync="",uyp="",p=user?("value='"+user+"' disabled"):"placeholder='Your email'"
          ; try{if(user){u=LibraryjsUtil.dbParse("get","marketMaker","usera",{email:user}).results[0]}}catch(e){Logger.log("Error yACsy: "+e.message)}try{uynf=u.yNameFull?"value='"+u.yNameFull+"'":""}catch(e){}try{uync=u.yNameComp?"value='"+u.yNameComp+"'":""}catch(e){}try{uyp=u.yPhone?"value='"+u.yPhone+"'":""}catch(e){}?>
    <div style="width:770px;margin:0 auto;xtext-align:left">
    <form id="listing"><!--References: https://developers.google.com/apps-script/guides/html-service-communication#forms https://developers.google.com/apps-script/guides/html-service-communication#user_objects-->
        <fieldset><legend>Order</legend>
            <input type="text"  size="30" id="email"  name="email"  placeholder="Email"   <?!=p?>    title="Your email address. Example: johndoe@example.com"        >
		    <input type="text"  size="25" id="name"   name="name"   placeholder="Name"    <?!=uynf?> title="Your full first and last names. Example: John Doe, III"  >
            <input type="text"  size="11" id="phone"  name="phone"  placeholder="Phone"   <?!=uyp?>  title="Your company phone number. Example: 555-555-1212"        > <!--<br><input type="text"   style="color:#888888;xheight:100px;font-size:100%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="35" id="phoneEve" name="phoneEve" placeholder="2nd phone" title="Alternate phone number to reach customer. Example: 555-555-1212" > // Reference: http://stackoverflow.com/questions/1994406/set-image-as-submit-button // Works on jsfiddl.net but not GAS -->
            <input type="text"  style="text-align:right"  size="5" id="amount"   name="amount"   placeholder="Amount"  title="Face amount of the lien"       > 
            <input type="text"  style="text-align:right"  size="5" id="price"    name="price"    placeholder="Price"   title="List price seller is asking"   >
            <input type="text"  style="text-align:right"  size="5" id="rate"     name="rate"     placeholder="Rate"    title="Interest rate"                 >
            <input type="text"  style="text-align:left"   size="5" id="address"  name="address"  placeholder="Address" title="Price per share (in USD)"   >
            <input type="text"  style="text-align:left"   size="5" id="county"   name="county"   placeholder="County"  title="Price per share (in USD)"   >
            <input type="text"  style="text-align:left"   size="5" id="state"    name="state"    placeholder="State"   title="Price per share (in USD)"   >
            <input type="file"  style="xbackground:#150035;xfont-size:100%;xcolor:white;xfont-weight:bold;border-radius:999px;xpadding:10px;xdisplay:inline-block;width:175px;" name="myFile"     placeholder="image"      title="Upload image">
		</fieldset>
	    <input type="button" value="Send" onclick="myFunction()" style="xbackground:#000000;font-size:100%;xcolor:#FFFFFF;xfont-weight:bold;xborder-radius:3px;xpadding:1px 2px;xdisplay:inline-block;width:770px;text-align:center" title=""><!-- Reference: http://stackoverflow.com/questions/5462251/button-width-in-css3 -->
	</form></div>
	<h1>All open orders</h1>
        <div class="datagrid" style="margin:auto;width:300px;xwidth:50%">
            <table><thead><th>Item</th><th>Type</th><th>Vol</th><th>Price</th><!--<th>Fill</th>--></thead><tfoot><tr><td colspan="5"><div id="no-paging" xid="paging">&nbsp;<!--<ul><li><a href="#" ><span>Previous</span></a></li><li><a href="#" class="active"><span>1</span></a></li><li><a href="#"><span>2</span></a></li><li><a href="#"><span>3</span></a></li><li><a href="#"><span>4</span></a></li><li><a href="#"><span>5</span></a></li><li><a href="#"><span>Next</span></a></li></ul>--></div></td></tr></tfoot>
            <tbody><?arr=ar_ao.reverse();i=arr.length;while(i--){var strAlt=(i%2)?"class='alt'":"";//vol=arr[i].volume?LibraryjsUtil.numberWithCommas(arr[i].volume):"",price=arr[i].price ?"$"+LibraryjsUtil.numberWithCommas(arr[i].price ):""
                 ?><tr <?!=strAlt?>><td title="This is the order made by your counterparty"><?=arr[i].item?></td><td style="text-align:center" title="This is what your counterparty wants to do. If this column says Buy, then to fill the order, you will Sell. And vice versa."><?=arr[i].type?></td><td style="text-align:right" title="The number of shares to be traded"><?=arr[i].volStr?></td><td title="The transaction price" style="text-align:right"><?=arr[i].priceStr?></td>
	 	           <!--<td><input type="checkbox" xchecked name="fillOrder" title="Check to fill this order. To fill an order means to take the opposite side of the transaction. i.e., Buy if the order is to sell. And vice versa."></td>-->
		           </tr><?}?>
	        </tbody></table></div>
	<h1>My open orders</h1>
        <div class="datagrid" style="margin:auto;width:300px;xwidth:50%">
            <table><thead><th>Item</th><th>Type</th><th>Vol</th><th>Price</th><!--<th>Fill</th>--></thead><tfoot><tr><td colspan="5"><div id="no-paging" xid="paging">&nbsp;<!--<ul><li><a href="#" ><span>Previous</span></a></li><li><a href="#" class="active"><span>1</span></a></li><li><a href="#"><span>2</span></a></li><li><a href="#"><span>3</span></a></li><li><a href="#"><span>4</span></a></li><li><a href="#"><span>5</span></a></li><li><a href="#"><span>Next</span></a></li></ul>--></div></td></tr></tfoot>
            <tbody><?arr=ar_mo.reverse();i=arr.length;while(i--){var strAlt=(i%2)?"class='alt'":"";//vol=arr[i].volume?LibraryjsUtil.numberWithCommas(arr[i].volume):"",price=arr[i].price ?"$"+LibraryjsUtil.numberWithCommas(arr[i].price ):""
                 ?><tr <?!=strAlt?>><td title="This is the order made by your counterparty"><?=arr[i].item?></td><td style="text-align:center" title="This is what your counterparty wants to do. If this column says Buy, then to fill the order, you will Sell. And vice versa."><?=arr[i].type?></td><td style="text-align:right" title="The number of shares to be traded"><?=arr[i].volStr?></td><td title="The transaction price" style="text-align:right"><?=arr[i].priceStr?></td>
	 	           <!--<td><input type="checkbox" xchecked name="fillOrder" title="Check to fill this order. To fill an order means to take the opposite side of the transaction. i.e., Buy if the order is to sell. And vice versa."></td>-->
		           </tr><?}?>
	        </tbody></table></div>
	<hr>
	<h1>My pending orders</h1>
	    <div class="datagrid" style="margin:auto;width:300px;xwidth:50%">
            <table><thead><th>Item</th><th>Type</th><th>Vol</th><th>Price</th><!--<th>Fill</th>--></thead><tfoot><tr><td colspan="5"><div id="no-paging" xid="paging">&nbsp;<!--<ul><li><a href="#" ><span>Previous</span></a></li><li><a href="#" class="active"><span>1</span></a></li><li><a href="#"><span>2</span></a></li><li><a href="#"><span>3</span></a></li><li><a href="#"><span>4</span></a></li><li><a href="#"><span>5</span></a></li><li><a href="#"><span>Next</span></a></li></ul>--></div></td></tr></tfoot>
            <tbody><?arr=ar_mp.reverse();i=arr.length;while(i--){var strAlt=(i%2)?"class='alt'":"";//vol=arr[i].volume?LibraryjsUtil.numberWithCommas(arr[i].volume):"",price=arr[i].price ?"$"+LibraryjsUtil.numberWithCommas(arr[i].price ):""
                 ?><tr <?!=strAlt?>><td title="This is the order made by your counterparty"><?=arr[i].item?></td><td style="text-align:center" title="This is what your counterparty wants to do. If this column says Buy, then to fill the order, you will Sell. And vice versa."><?=arr[i].type?></td><td style="text-align:right" title="The number of shares to be traded"><?=arr[i].volStr?></td><td title="The transaction price" style="text-align:right"><?=arr[i].priceStr?></td>
	 	           <!--<td><input type="checkbox" xchecked name="fillOrder" title="Check to fill this order. To fill an order means to take the opposite side of the transaction. i.e., Buy if the order is to sell. And vice versa."></td>-->
		           </tr><?}?>
	        </tbody></table></div>
	<hr>
	<h1>My closed orders</h1>
	    <div class="datagrid" style="margin:auto;width:300px;xwidth:50%">
            <table><thead><th>Item</th><th>Type</th><th>Vol</th><th>Price</th><!--<th>Fill</th>--></thead><tfoot><tr><td colspan="5"><div id="no-paging" xid="paging">&nbsp;<!--<ul><li><a href="#" ><span>Previous</span></a></li><li><a href="#" class="active"><span>1</span></a></li><li><a href="#"><span>2</span></a></li><li><a href="#"><span>3</span></a></li><li><a href="#"><span>4</span></a></li><li><a href="#"><span>5</span></a></li><li><a href="#"><span>Next</span></a></li></ul>--></div></td></tr></tfoot>
            <tbody><?arr=ar_mc.reverse();i=arr.length;while(i--){var strAlt=(i%2)?"class='alt'":"";//vol=arr[i].volume?LibraryjsUtil.numberWithCommas(arr[i].volume):"",price=arr[i].price ?"$"+LibraryjsUtil.numberWithCommas(arr[i].price ):""
                 ?><tr <?!=strAlt?>><td title="This is the order made by your counterparty"><?=arr[i].item?></td><td style="text-align:center" title="This is what your counterparty wants to do. If this column says Buy, then to fill the order, you will Sell. And vice versa."><?=arr[i].type?></td><td style="text-align:right" title="The number of shares to be traded"><?=arr[i].volStr?></td><td title="The transaction price" style="text-align:right"><?=arr[i].priceStr?></td>
	 	           <!--<td><input type="checkbox" xchecked name="fillOrder" title="Check to fill this order. To fill an order means to take the opposite side of the transaction. i.e., Buy if the order is to sell. And vice versa."></td>-->
		           </tr><?}?>
	        </tbody></table></div>
	<hr>
	<h1>Charts and statistics</h1>
<script>
function onFailure(e){alert(e.message)}function onSuccess(){}//document.getElementById("result").innerHTML=str}//iframe doesn't work bc get request is only sent on page load. So we have the user click a link. //"<iframe src='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00' width='1200' height='1200'></iframe>"}//alert(/*"Input received!"* /document.getElementById("address").value)}
function myFunction(){//alert(/*document.forms["referral"]["cFullName"].value/*"Hello world"*/);document.forms["referral"]/*getElementById("referral")*/.reset();}//;document.getElementById("result").innerHTML="<img src='https://lh4.googleusercontent.com/-S3rRVyRoXeA/U62uSnnsXLI/AAAAAAAAMA4/N10K1jdADPY/s800/ajax-loader.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).receiveOrder(this.parentNode);this.parentNode.reset();}//**IMPORTANT**“this” gets the “name” property of the parent element, i.e., the form tag/element. In order to use the “this.parnentNote” method (as opposed to the document.getElementById() method) verify the form element has a proper “name” property. Otherwise, the function will fail “silently.”//document.getElementById("address").value)}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
</script></body></html>

-------------------------------------- ARCHIVE --------------------------------------
// The following is the WIP attempt to scrape property address details from http://datastore.netronline.com starting with State, County, APN.
// Since that is an ASP.NET page, we decided, instead, to go to each local county assessors office individually and directly.

function test(){/*Logger.log*/print(JSON.stringify(apn2addy("Arizona","Maricopa","13566187")))}
function apn2addy(st,co,apn){var sid=[],vs=[],resp=[],text=[],hdrs=[],head=[],params=[],cookie=[]; // @param{string} st: State // @param{string} co: County // @param{string} st: apn APN // @return{string} address
    head.unshift({})/*;head[0]["Cookie"]="ASP.NET_SessionId="+sid/*"jvi10e2pdaqalc55h1ylms45"*/;head[0]["Accept-Language"]="en-US,en;q=0.5";head[0]["DNT"]="1";head[0]["Accept"]="text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";head[0]["Connection"]="keep-alive";head[0]["Host"]="datastore.netronline.com";head[0]["User-Agent"]="Mozilla/5.0 (Windows NT 6.3; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0";head[0]["Accept-Encoding"]="gzip";
   
    resp.unshift(UrlFetchApp.fetch("http://datastore.netronline.com/"),{method:"get",headers:head[0]});text.unshift(resp[0].getContentText());hdrs.unshift(resp[0].getHeaders());cookie.unshift(hdrs[0]["Set-Cookie"]);
    sid.unshift(cookie[0].getSuffix("ASP.NET_SessionId=").getPrefix(";"));vs.unshift(text[0].split("__VIEWSTATE")[2].split("\"")[2]);

//    return {vs:vs,hdrs:hdrs,sid:sid}}//,text:text}}   
    
      params.unshift({});
//    params[0]["__VIEWSTATE"]=encodeURIComponent(vs[0]);params[0]["__EVENTTARGET"]="CountySelector%24State%24State";params[0]["__EVENTARGUMENT"]="";params[0]["__LASTFOCUS"]="";
 
 params[0]["__EVENTTARGET"]=""
;params[0]["__EVENTARGUMENT"]=""
;params[0]["__LASTFOCUS"]=""
//;params[0]["__VIEWSTATE"]="%2FwEPDwULLTE5NjM5MzMwODEPZBYCAgMPZBYIAgcPZBYEAgQPDxYCHgdWaXNpYmxlZ2RkAgoPDxYCHgRUZXh0BRtXZWRuZXNkYXksIE9jdG9iZXIgMDEsIDIwMTRkZAIJD2QWAgIBD2QWAmYPZBYCAgMPZBYCAgIPZBYEAgEPZBYCAgIPEA8WCB4UQXBwZW5kRGF0YUJvdW5kSXRlbXNnHg1EYXRhVGV4dEZpZWxkBQROYW1lHg5EYXRhVmFsdWVGaWVsZAUCSUQeC18hRGF0YUJvdW5kZ2QQFTQOU2VsZWN0IGEgU3RhdGUHQWxhYmFtYQZBbGFza2EHQXJpem9uYQhBcmthbnNhcwpDYWxpZm9ybmlhCENvbG9yYWRvC0Nvbm5lY3RpY3V0CERlbGF3YXJlFERpc3RyaWN0IG9mIENvbHVtYmlhB0Zsb3JpZGEHR2VvcmdpYQZIYXdhaWkFSWRhaG8ISWxsaW5vaXMHSW5kaWFuYQRJb3dhBkthbnNhcwhLZW50dWNreQlMb3Vpc2lhbmEFTWFpbmUITWFyeWxhbmQNTWFzc2FjaHVzZXR0cwhNaWNoaWdhbglNaW5uZXNvdGELTWlzc2lzc2lwcGkITWlzc291cmkHTW9udGFuYQhOZWJyYXNrYQZOZXZhZGENTmV3IEhhbXBzaGlyZQpOZXcgSmVyc2V5Ck5ldyBNZXhpY28ITmV3IFlvcmsOTm9ydGggQ2Fyb2xpbmEMTm9ydGggRGFrb3RhBE9oaW8IT2tsYWhvbWEGT3JlZ29uDFBlbm5zeWx2YW5pYQxSaG9kZSBJc2xhbmQOU291dGggQ2Fyb2xpbmEMU291dGggRGFrb3RhCVRlbm5lc3NlZQVUZXhhcwRVdGFoB1Zlcm1vbnQIVmlyZ2luaWEKV2FzaGluZ3Rvbg1XZXN0IFZpcmdpbmlhCVdpc2NvbnNpbgdXeW9taW5nFTQBMAEyATMBNAE1ATYBNwE4ATkCMTACMTECMTICMTMCMTQCMTUCMTYCMTcCMTgCMTkCMjACMjECMjICMjMCMjQCMjUCMjYCMjcCMjgCMjkCMzACMzECMzICMzMCMzQCMzUCMzYCMzcCMzgCMzkCNDACNDECNDICNDMCNDQCNDUCNDYCNDcCNDgCNDkCNTACNTECNTIUKwM0Z2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZxYBZmQCAw9kFgICBA8QZBAVAQAVAQEwFCsDAWcWAWZkAgsPDxYCHwBoZBYEZg8WAh4FVmFsdWUFAzEwMmQCAg9kFgRmD2QWAmYPZBYCZg9kFgICAw9kFgJmD2QWAgIBD2QWAmYPDxYCHwEFHlNlbGVjdCBQcm9kdWN0IGluIE1hcmljb3BhLCBBWmRkAgEPZBYCZg9kFgQCAQ8PFgIfAQURTWFyaWNvcGEsIEFyaXpvbmFkZAIDD2QWBGYPFgIfBgUDMTAyZAICDxAPFggfAmcfAwUETmFtZR8EBQJJRB8FZ2QQFQcQU2VsZWN0IGEgUHJvZHVjdBxDb21wYXJhYmxlIFByb3BlcnRpZXMgUmVwb3J0D0RvY3VtZW50IEltYWdlcx5Pd25lcnNoaXAgJiBFbmN1bWJyYW5jZSBSZXBvcnQLUGFyY2VsIE1hcHMWUHJvcGVydHkgRGV0YWlsIFJlcG9ydBZUcmFuc2ZlciBEZXRhaWwgUmVwb3J0FQcBMAEzATgCMTABMgE2ATQUKwMHZ2dnZ2dnZxYBAgVkAg0PDxYCHwBnZBYCZg9kFgRmD2QWAgIBD2QWAgICD2QWAmYPZBYCZg9kFgICAQ9kFggCAw9kFgJmD2QWAgIBD2QWAgICDxAPFggfAmcfAwUETmFtZR8EBQJJRB8FZ2QQFTQOU2VsZWN0IGEgU3RhdGUHQWxhYmFtYQZBbGFza2EHQXJpem9uYQhBcmthbnNhcwpDYWxpZm9ybmlhCENvbG9yYWRvC0Nvbm5lY3RpY3V0CERlbGF3YXJlFERpc3RyaWN0IG9mIENvbHVtYmlhB0Zsb3JpZGEHR2VvcmdpYQZIYXdhaWkFSWRhaG8ISWxsaW5vaXMHSW5kaWFuYQRJb3dhBkthbnNhcwhLZW50dWNreQlMb3Vpc2lhbmEFTWFpbmUITWFyeWxhbmQNTWFzc2FjaHVzZXR0cwhNaWNoaWdhbglNaW5uZXNvdGELTWlzc2lzc2lwcGkITWlzc291cmkHTW9udGFuYQhOZWJyYXNrYQZOZXZhZGENTmV3IEhhbXBzaGlyZQpOZXcgSmVyc2V5Ck5ldyBNZXhpY28ITmV3IFlvcmsOTm9ydGggQ2Fyb2xpbmEMTm9ydGggRGFrb3RhBE9oaW8IT2tsYWhvbWEGT3JlZ29uDFBlbm5zeWx2YW5pYQxSaG9kZSBJc2xhbmQOU291dGggQ2Fyb2xpbmEMU291dGggRGFrb3RhCVRlbm5lc3NlZQVUZXhhcwRVdGFoB1Zlcm1vbnQIVmlyZ2luaWEKV2FzaGluZ3Rvbg1XZXN0IFZpcmdpbmlhCVdpc2NvbnNpbgdXeW9taW5nFTQBMAEyATMBNAE1ATYBNwE4ATkCMTACMTECMTICMTMCMTQCMTUCMTYCMTcCMTgCMTkCMjACMjECMjICMjMCMjQCMjUCMjYCMjcCMjgCMjkCMzACMzECMzICMzMCMzQCMzUCMzYCMzcCMzgCMzkCNDACNDECNDICNDMCNDQCNDUCNDYCNDcCNDgCNDkCNTACNTECNTIUKwM0Z2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZxYBAgNkAgUPZBYCZg9kFgICAQ9kFgICBA8QDxYIHwJnHwMFBE5hbWUfBAUCSUQfBWdkEBUQD1NlbGVjdCBhIENvdW50eQZBcGFjaGUHQ29jaGlzZQhDb2NvbmlubwRHaWxhBkdyYWhhbQhHcmVlbmxlZQZMYSBQYXoITWFyaWNvcGEGTW9oYXZlBk5hdmFqbwRQaW1hBVBpbmFsClNhbnRhIENydXoHWWF2YXBhaQRZdW1hFRABMAI5NQI5NgI5NwI5OAI5OQMxMDADMTAxAzEwMgMxMDMDMTA0AzEwNQMxMDYDMTA3AzEwOAMxMDkUKwMQZ2dnZ2dnZ2dnZ2dnZ2dnZxYBAghkAgoPZBYCZg9kFgICAQ9kFgICAg8QDxYIHwJnHwMFBE5hbWUfBAUCSUQfBWdkEBUHEFNlbGVjdCBhIFByb2R1Y3QcQ29tcGFyYWJsZSBQcm9wZXJ0aWVzIFJlcG9ydA9Eb2N1bWVudCBJbWFnZXMeT3duZXJzaGlwICYgRW5jdW1icmFuY2UgUmVwb3J0C1BhcmNlbCBNYXBzFlByb3BlcnR5IERldGFpbCBSZXBvcnQWVHJhbnNmZXIgRGV0YWlsIFJlcG9ydBUHATABMwE4AjEwATIBNgE0FCsDB2dnZ2dnZ2cWAQIFZAIMDw8WAh8AZ2QWAmYPZBYCZg9kFgQCAw9kFgJmD2QWAgIBD2QWAgIGDxAPFggfAmcfAwULRGVzY3JpcHRpb24fBAUSU2VhcmNoRGVmaW5pdGlvbklEHwVnZBAVBBRTZWxlY3QgYSBTZWFyY2ggVHlwZR5Qcm9wZXJ0eSBEZXRhaWwgYnkgQWRkcmVzcy9aaXAWUHJvcGVydHkgRGV0YWlsIGJ5IEFQThdQcm9wZXJ0eSBEZXRhaWwgYnkgTmFtZRUEATAEMjc3MAQxODY5Azk2OBQrAwRnZ2dnFgECAWQCBw9kFgJmD2QWAmYPDxYCHwBoZBYGZg8WAh8GBQQyNzcwZAIEDxYCHwYFBUZhbHNlZAIGD2QWBGYPZBYCZg9kFgJmDxYCHgtfIUl0ZW1Db3VudAICFgRmD2QWAgIBD2QWBGYPZBYCZg9kFgICAQ8PFgIfAQUOU3RyZWV0IEFkZHJlc3NkZAIBD2QWBGYPZBYCAgEPDxYCHwEFDlN0cmVldCBBZGRyZXNzZGQCAQ9kFgICAQ9kFhRmDxYCHwYFATBkAgIPFgIfBgUKc3RyZWV0bmFtZWQCBg8WAh8GBQMxMDBkAggPFgIfBgUBMWQCDA8WAh8GZWQCDg8WAh8GZWQCEA8QDxYEHwVnHwBoZGQWAGQCEg8PFgYeCENzc0NsYXNzBRlJbnB1dF9UZXh0Ym94X1NlYXJjaEZpZWxkHglNYXhMZW5ndGgCZB4EXyFTQgICFgQeBFNpemUFAjEwHgZvbkJsdXIFf2lmICh0aGlzLnZhbHVlLmxlbmd0aCA8IDEgJiYgdGhpcy52YWx1ZS5sZW5ndGggIT0gMCkgeyBhbGVydCgnVmFsdWUgbXVzdCBiZSBhdCBsZWFzdCAxIGNoYXJhY3RlcnMgaW4gbGVuZ3RoLicpOyB0aGlzLmZvY3VzKCk7IH1kAhQPEA8WAh8AaGRkZGQCFg8PFgIfAGdkZAIBD2QWAgIBD2QWBGYPZBYCZg9kFgICAQ8PFgIfAQUTWmlwIENvZGUgKE9wdGlvbmFsKWRkAgEPZBYEZg9kFgICAQ8PFgIfAQUTWmlwIENvZGUgKE9wdGlvbmFsKWRkAgEPZBYCAgEPZBYSZg8WAh8GBQEwZAICDxYCHwYFA3ppcGQCBg8WAh8GBQIxMGQCCA8WAh8GBQEwZAIMDxYCHwZlZAIODxYCHwZlZAIQDxAPFgQfBWcfAGhkZBYAZAISDw8WBh8IBRlJbnB1dF9UZXh0Ym94X1NlYXJjaEZpZWxkHwkCCh8KAgIWAh8LBQIxMGQCFA8QDxYCHwBoZGRkZAICD2QWAmYPZBYCAgEPD2QWAh4Hb25jbGljawVgYWxlcnQoJ1lvdSBtdXN0IGJlIGEgbWVtYmVyIG9mIHRoaXMgc2l0ZSBvciBiZSBsb2dnZWQgaW4gdG8gc2VhcmNoIGZvciBwcm9kdWN0cycpOyByZXR1cm4gZmFsc2U7ZAIBD2QWAgIBD2QWAgIGD2QWBgIBD2QWAmYPZBYIAgEPDxYCHwEFFlByb3BlcnR5IERldGFpbCBSZXBvcnRkZAIDDw8WAh8BBQhNYXJpY29wYWRkAgUPDxYCHwEFB0FyaXpvbmFkZAIJDw8WAh4LTmF2aWdhdGVVcmwFN2h0dHA6Ly9wdWJsaWNyZWNvcmRzLm5ldHJvbmxpbmUuY29tL3JlY29yZHMucGhwP3N0YXRlPTRkZAIDD2QWAmYPZBYCZg8WAh8HAgMWBmYPZBYCAgEPZBYEZg9kFgRmD2QWAmYPDxYCHw4FeGphdmFzY3JpcHQ6IHNob3dIaWRlVGFibGUoIlZpZXdTZWFyY2hfU2VhcmNoVHlwZXNfY3RsMDBfU2VhcmNoSG9sZGVyIiwgIlZpZXdTZWFyY2hfU2VhcmNoVHlwZXNfY3RsMDBfU2VhcmNoSG9sZGVySW1hZ2UiKWRkAgEPZBYEZg8PFgIfDgV4amF2YXNjcmlwdDogc2hvd0hpZGVUYWJsZSgiVmlld1NlYXJjaF9TZWFyY2hUeXBlc19jdGwwMF9TZWFyY2hIb2xkZXIiLCAiVmlld1NlYXJjaF9TZWFyY2hUeXBlc19jdGwwMF9TZWFyY2hIb2xkZXJJbWFnZSIpZBYCZg8VAR5Qcm9wZXJ0eSBEZXRhaWwgYnkgQWRkcmVzcy9aaXBkAgEPDxYEHwEFDyAtIDxiciAvPjxiciAvPh8AaGRkAgEPZBYCZg9kFgJmD2QWAgIFD2QWAgIGD2QWAmYPZBYCZg9kFgJmDxYCHwcCAhYEZg9kFgICAQ9kFgRmDw8WAh8AaGQWAmYPZBYCAgEPDxYCHwEFDlN0cmVldCBBZGRyZXNzZGQCAQ9kFgRmDw8WAh8AZ2QWAgIBDw8WAh8BBQ5TdHJlZXQgQWRkcmVzc2RkAgEPZBYCAgEPZBYIAhAPEA8WBB8FZx8AaGRkFgBkAhIPDxYGHwgFGUlucHV0X1RleHRib3hfU2VhcmNoRmllbGQfCQJkHwoCAhYEHwsFAjEwHwwFf2lmICh0aGlzLnZhbHVlLmxlbmd0aCA8IDEgJiYgdGhpcy52YWx1ZS5sZW5ndGggIT0gMCkgeyBhbGVydCgnVmFsdWUgbXVzdCBiZSBhdCBsZWFzdCAxIGNoYXJhY3RlcnMgaW4gbGVuZ3RoLicpOyB0aGlzLmZvY3VzKCk7IH1kAhQPEA8WAh8AaGRkZGQCFg8PFgIfAGdkZAIBD2QWAgIBD2QWBGYPDxYCHwBoZBYCZg9kFgICAQ8PFgIfAQUTWmlwIENvZGUgKE9wdGlvbmFsKWRkAgEPZBYEZg8PFgIfAGdkFgICAQ8PFgIfAQUTWmlwIENvZGUgKE9wdGlvbmFsKWRkAgEPZBYCAgEPZBYGAhAPEA8WBB8FZx8AaGRkFgBkAhIPDxYGHwgFGUlucHV0X1RleHRib3hfU2VhcmNoRmllbGQfCQIKHwoCAhYCHwsFAjEwZAIUDxAPFgIfAGhkZGRkAgEPZBYCAgEPZBYEZg9kFgRmD2QWAmYPDxYCHw4FeGphdmFzY3JpcHQ6IHNob3dIaWRlVGFibGUoIlZpZXdTZWFyY2hfU2VhcmNoVHlwZXNfY3RsMDFfU2VhcmNoSG9sZGVyIiwgIlZpZXdTZWFyY2hfU2VhcmNoVHlwZXNfY3RsMDFfU2VhcmNoSG9sZGVySW1hZ2UiKWRkAgEPZBYEZg8PFgIfDgV4amF2YXNjcmlwdDogc2hvd0hpZGVUYWJsZSgiVmlld1NlYXJjaF9TZWFyY2hUeXBlc19jdGwwMV9TZWFyY2hIb2xkZXIiLCAiVmlld1NlYXJjaF9TZWFyY2hUeXBlc19jdGwwMV9TZWFyY2hIb2xkZXJJbWFnZSIpZBYCZg8VARZQcm9wZXJ0eSBEZXRhaWwgYnkgQVBOZAIBDw8WBB8BBQ8gLSA8YnIgLz48YnIgLz4fAGhkZAIBD2QWAmYPZBYCZg9kFgICBQ9kFgICBg9kFgJmD2QWAmYPZBYCZg8WAh8HAgIWBGYPZBYCAgEPZBYEZg8PFgIfAGhkFgJmD2QWAgIBDw8WAh8BBQNBUE5kZAIBD2QWBGYPDxYCHwBnZBYCAgEPDxYCHwEFA0FQTmRkAgEPZBYCAgEPZBYIAhAPEA8WBB8FZx8AaGRkFgBkAhIPDxYGHwgFGUlucHV0X1RleHRib3hfU2VhcmNoRmllbGQfCQIeHwoCAhYEHwsFAjEwHwwFf2lmICh0aGlzLnZhbHVlLmxlbmd0aCA8IDEgJiYgdGhpcy52YWx1ZS5sZW5ndGggIT0gMCkgeyBhbGVydCgnVmFsdWUgbXVzdCBiZSBhdCBsZWFzdCAxIGNoYXJhY3RlcnMgaW4gbGVuZ3RoLicpOyB0aGlzLmZvY3VzKCk7IH1kAhQPEA8WAh8AaGRkZGQCFg8PFgIfAGdkZAIBD2QWAgIBD2QWBGYPDxYCHwBoZBYCZg9kFgICAQ8PFgIfAQUTWmlwIENvZGUgKE9wdGlvbmFsKWRkAgEPZBYEZg8PFgIfAGdkFgICAQ8PFgIfAQUTWmlwIENvZGUgKE9wdGlvbmFsKWRkAgEPZBYCAgEPZBYGAhAPEA8WBB8FZx8AaGRkFgBkAhIPDxYGHwgFGUlucHV0X1RleHRib3hfU2VhcmNoRmllbGQfCQIKHwoCAhYCHwsFAjEwZAIUDxAPFgIfAGhkZGRkAgIPZBYCAgEPZBYEZg9kFgRmD2QWAmYPDxYCHw4FeGphdmFzY3JpcHQ6IHNob3dIaWRlVGFibGUoIlZpZXdTZWFyY2hfU2VhcmNoVHlwZXNfY3RsMDJfU2VhcmNoSG9sZGVyIiwgIlZpZXdTZWFyY2hfU2VhcmNoVHlwZXNfY3RsMDJfU2VhcmNoSG9sZGVySW1hZ2UiKWRkAgEPZBYEZg8PFgIfDgV4amF2YXNjcmlwdDogc2hvd0hpZGVUYWJsZSgiVmlld1NlYXJjaF9TZWFyY2hUeXBlc19jdGwwMl9TZWFyY2hIb2xkZXIiLCAiVmlld1NlYXJjaF9TZWFyY2hUeXBlc19jdGwwMl9TZWFyY2hIb2xkZXJJbWFnZSIpZBYCZg8VARdQcm9wZXJ0eSBEZXRhaWwgYnkgTmFtZWQCAQ8PFgQfAQUPIC0gPGJyIC8%2BPGJyIC8%2BHwBoZGQCAQ9kFgJmD2QWAmYPZBYCAgUPZBYCAgYPZBYCZg9kFgJmD2QWAmYPFgIfBwICFgRmD2QWAgIBD2QWBGYPDxYCHwBoZBYCZg9kFgICAQ8PFgIfAQUJTGFzdCBOYW1lZGQCAQ9kFgRmDw8WAh8AZ2QWAgIBDw8WAh8BBQlMYXN0IE5hbWVkZAIBD2QWAgIBD2QWCAIQDxAPFgQfBWcfAGhkZBYAZAISDw8WBh8IBRlJbnB1dF9UZXh0Ym94X1NlYXJjaEZpZWxkHwkCMh8KAgIWBB8LBQIxMB8MBX9pZiAodGhpcy52YWx1ZS5sZW5ndGggPCAxICYmIHRoaXMudmFsdWUubGVuZ3RoICE9IDApIHsgYWxlcnQoJ1ZhbHVlIG11c3QgYmUgYXQgbGVhc3QgMSBjaGFyYWN0ZXJzIGluIGxlbmd0aC4nKTsgdGhpcy5mb2N1cygpOyB9ZAIUDxAPFgIfAGhkZGRkAhYPDxYCHwBnZGQCAQ9kFgICAQ9kFgRmDw8WAh8AaGQWAmYPZBYCAgEPDxYCHwEFCkZpcnN0IE5hbWVkZAIBD2QWBGYPDxYCHwBnZBYCAgEPDxYCHwEFCkZpcnN0IE5hbWVkZAIBD2QWAgIBD2QWBgIQDxAPFgQfBWcfAGhkZBYAZAISDw8WBh8IBRlJbnB1dF9UZXh0Ym94X1NlYXJjaEZpZWxkHwkCMh8KAgIWAh8LBQIxMGQCFA8QDxYCHwBoZGRkZAIEDw8WAh8AZ2QWAmYPZBYCZg9kFgQCBA8PFgIfAGdkFgICAQ9kFgICAQ8PFgIfAQUWUHJvcGVydHkgRGV0YWlsIFJlcG9ydGRkAgYPZBYCAgEPZBYEAgEPDxYCHwEFFlByb3BlcnR5IERldGFpbCBSZXBvcnRkZAIDDw8WAh8BBdoBRGVwZW5kaW5nIG9uIHJlZ2lvbiBhbmQgdGFyZ2V0IHByb3BlcnR5IGJlaW5nIHNlYXJjaGVkLCBpdCBpcyBwb3NzaWJsZSB0aGF0IG5vdCBhbGwgZmllbGRzIGluIHRoZSByZXBvcnQgd2lsbCBiZSByZXR1cm5lZC4gTkVUUiBwcm92aWRlcyB0aGVzZSByZXBvcnRzICJhcy1pcyIuIEJ5IGNvbW1lbmNpbmcgeW91ciBzZWFyY2ggYWJvdmUsIHlvdSBhZ3JlZSB0byB0aGVzZSB0ZXJtcy5kZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUSTG9naW5TdW1tYXJ5JExvZ2lun%2FnuLIW4gOkboGqqFRSHhJIl8N8%3D"
;params[0]["CountyValue"]="102"
;params[0]["StateValue"]="4"
;params[0]["ProductValue"]="0"
;params[0]["LoginSummary%24TrackValue"]="True"
;params[0]["LoginSummary%24Email"]=""
;params[0]["LoginSummary%24Password"]=""
;params[0]["redirect"]="%2FprodSearch.aspx"
;params[0]["SectionHeaderBar1%24HelpKeywordsValue"]="modify+search%2C+panel%2C+modify"
;params[0]["ModifySearch%24AllowS"]="False"
;params[0]["ModifySearch%24State%24OnlyShowProductStates"]="true"
;params[0]["ModifySearch%24State%24State"]="4"
;params[0]["ModifySearch%24County%24SelectedState"]="4"
;params[0]["ModifySearch%24County%24ProductValue"]="0"
;params[0]["ModifySearch%24County%24County"]="102"
;params[0]["ModifySearch%24ProductDropDown%24CountyValue"]="102"
;params[0]["ModifySearch%24ProductDropDown%24Products"]="6"
;params[0]["ModifySearch%24SearchTypesDropDown%24CountyValue"]="102"
;params[0]["ModifySearch%24SearchTypesDropDown%24ProductValue"]="6"
;params[0]["ModifySearch%24SearchTypesDropDown%24CheckAdminValue"]="1"
;params[0]["ModifySearch%24SearchTypesDropDown%24SearchTypes"]="2770"
;params[0]["ctl03%24HelpKeywordsValue"]="search%2C+search+types"
;params[0]["ViewSearch%24CountyValue"]="102"
;params[0]["ViewSearch%24StateValue"]="4"
;params[0]["ViewSearch%24ProductValue"]="6"
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SectionHeaderBar1%24HelpKeywordsValue"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchTypeIDValue"]="2770"
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24DisplayCaptionOnLeftValue"]="True"
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24AllowSearchingValue"]="false"
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24TypeValue"]="0"
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24ControlNameValue"]="streetname"
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24SizeValue"]="10"
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24MaxLengthValue"]="100"
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24MinLengthValue"]="1"
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24ShowLargeValue"]="1"
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24SelectFieldsValue"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24DefaultDataValue"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24streetname"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24TypeValue"]="0"
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24ControlNameValue"]="zip"
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24SizeValue"]="10"
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24MaxLengthValue"]="10"
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24MinLengthValue"]="0"
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24ShowLargeValue"]="1"
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24SelectFieldsValue"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24DefaultDataValue"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl00%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24zip"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SectionHeaderBar1%24HelpKeywordsValue"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchTypeIDValue"]="1869"
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24DisplayCaptionOnLeftValue"]="True"
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24AllowSearchingValue"]="false"
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24TypeValue"]="0"
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24ControlNameValue"]="apn"
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24SizeValue"]="10"
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24MaxLengthValue"]="30"
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24MinLengthValue"]="1"
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24ShowLargeValue"]="1"
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24SelectFieldsValue"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24DefaultDataValue"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24apn"]="13566187"
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24TypeValue"]="0"
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24ControlNameValue"]="zip"
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24SizeValue"]="10"
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24MaxLengthValue"]="10"
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24MinLengthValue"]="0"
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24ShowLargeValue"]="1"
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24SelectFieldsValue"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24DefaultDataValue"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24zip"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl01%24SearchFieldsDisplay%24Search"]="Search"
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SectionHeaderBar1%24HelpKeywordsValue"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchTypeIDValue"]="968"
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24DisplayCaptionOnLeftValue"]="True"
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24AllowSearchingValue"]="false"
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24TypeValue"]="0"
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24ControlNameValue"]="lastname"
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24SizeValue"]="10"
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24MaxLengthValue"]="50"
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24MinLengthValue"]="1"
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24ShowLargeValue"]="1"
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24SelectFieldsValue"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24DefaultDataValue"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl00%24SearchField%24lastname"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24TypeValue"]="0"
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24ControlNameValue"]="firstname"
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24SizeValue"]="10"
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24MaxLengthValue"]="50"
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24MinLengthValue"]="0"
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24ShowLargeValue"]="1"
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24SelectFieldsValue"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24DefaultDataValue"]=""
;params[0]["ViewSearch%24SearchTypes%24ctl02%24SearchFieldsDisplay%24SearchFields%24ctl01%24SearchField%24firstname"]=""
;params[0]["ctl06%24HelpKeywordsValue"]="products%2C+search+by+product"
;params[0]["ProductListDisplay%24ActiveValue"]="1"
 
;params[0]=LibraryjsUtil.params2str(params[0]);
    
    head.unshift(head[0]);delete head[0]["DNT"];head[0]["Content-Length"]=LibraryjsUtil.str2contentLength(params[0]);head[0]["Cookie"]="ASP.NET_SessionId="+sid[0];head[0]["Contents-Type"]="application/x-www-form-urlencoded";head[0]["Referer"]="http://datastore.netronline.com/";//head[0]["Accept-Language"]="en-US,en;q=0.5";head[0]["DNT"]="1";head[0]["Accept"]="text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";head[0]["Connection"]="keep-alive";head[0]["Host"]="datastore.netronline.com";head[0]["User-Agent"]="Mozilla/5.0 (Windows NT 6.3; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0";head[0]["Accept-Encoding"]="gzip";//head[0]["Content-Length"]="6073";
    
    resp.unshift(UrlFetchApp.fetch("http://datastore.netronline.com/Default.aspx"),{method:"post",headers:head[0],payload:params[0]/*,followHttpRedirects:false*/});text.unshift(resp[0].getContentText());hdrs.unshift(resp[0].getHeaders());cookie.unshift(hdrs[0]["Set-Cookie"]);

    return text[0]} //{vs:vs,head:head,hdrs:hdrs,sid:sid,params:params}}//,text:text}}

//    sid.unshift(cookie[0].getSuffix("ASP.NET_SessionId=").getPrefix(";"));
//    if(sid[0]!=sid[1]){return "sid not equal: "+JSON.stringify(sid)}
//    vs.unshift(text[0].split("__VIEWSTATE")[2].split("\"")[2]);
//    params.unshift(params[0]);params[0]["__VIEWSTATE"]=vs[0];params[0]["__EVENTTARGET"]="CountySelector%24County%24County";
//    head.unshift(head[0]);head[0]["Cookie"]="ASP.NET_SessionId="+sid[0];head[0]["Referer"]="http://datastore.netronline.com/Default.aspx";//head[0]["Content-Length"]="6073";
//    
//    resp.unshift(UrlFetchApp.fetch("http://datastore.netronline.com/Default.aspx"),{method:"post",headers:head[0],payload:params[0],followHttpRedirects:false});text.unshift(resp[0].getContentText());hdrs.unshift(resp[0].getHeaders());cookie.unshift(hdrs[0]["Set-Cookie"]);
//    sid.unshift(cookie[0].getSuffix("ASP.NET_SessionId=").getPrefix(";"));vs.unshift(text[0].split("__VIEWSTATE")[2].split("\"")[2]);params.unshift(params[0]);params[0]["__VIEWSTATE"]=vs[0];params[0]["__EVENTTARGET"]="CountySelector%24County%24County";head.unshift(head[0]);head[0]["Content-Type"]="application/x-www-form-urlencoded";head[0]["Referer"]="http://datastore.netronline.com/";//head[0]["Content-Length"]="6073";
//    
//     
//    return UrlFetchApp.getRequest("http://datastore.netronline.com/")}
//    return LibraryjsUtil.str2contentLength("string")}

// FFEIC Project
//function test(){var str='<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Header><wsse:Security xmlns:wsse="http://schemas.xmlsoap.org/ws/2003/06/secext"><wsse:UsernameToken wsu:Id="sample" xmlns:wsu="http://schemas.xmlsoap.org/ws/2003/06/utility"><wsse:Username>RoseRRoyal</wsse:Username><wsse:Password Type="wsse:PasswordText">Rtbxe8w3bN1UVrgbPPTh</wsse:Password><wsu:Created>2004-05-19T08:44:51Z</wsu:Created></wsse:UsernameToken></wsse:Security><wsse:Security soap:actor="oracle" xmlns:wsse="http://schemas.xmlsoap.org/ws/2003/06/secext"><wsse:UsernameToken wsu:Id="oracle" xmlns:wsu="http://schemas.xmlsoap.org/ws/2003/06/utility"><wsse:Username>RoseRRoyal</wsse:Username><wsse:Password Type="wsse:PasswordText">Rtbxe8w3bN1UVrgbPPTh</wsse:Password><wsu:Created>2004-05-19T08:46:04Z</wsu:Created></wsse:UsernameToken></wsse:Security></soap:Header><soap:Body><TestUserAccess xmlns="http://cdr.ffiec.gov/public/services" /></soap:Body></soap:Envelope>'
//    ;return Logger.log(LibraryjsUtil.str2contentLength(str))}

