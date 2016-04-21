//-------------------------------------- Code.gs --------------------------------------
// JSON visualization | viewer: http://chris.photobooks.com/json/default.htm
// function getEmailQuota(){Logger.log("Remaining email quota: " + MailApp.getRemainingDailyQuota());}
// Note: to accept doPost() from affiliate, (design decision:) must set: Publish > Deploy as web app > Execute the app as: me, Who has access to the app: Anyone, even anonymous // Otherwise, script will not run at server (though, client will receive responseCode=200); client response (200) is Google accounts sign-in page/form  // Decision Benefits: 1. script runs 2. script authorization bypass (i.e., not needed at UI) // Decision Costs: 1. Looser script security; mitigated by a. Site level access restrictions/permissions b. key method (e.g., switch/case k:foo)
function auth    (){}
function timer   (){Logger.log(new Date().getTime())}//1388228703613
function backup  (){var desc="Argenta™ Backup — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({});while(results.hasNext()){out.unshift(results.next())}id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);}
function print   (str){var desc="Argenta™ Print — timestamp:"+new Date().getTime(),id=DriveApp.createFile(desc,str,MimeType.HTML).setDescription(desc);Logger.log("Printed doc ID: "+id);}
//function print   (){var desc="Argenta™ Print — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({table:"note"});while(results.hasNext()){out.unshift(results.next())}id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);}
function print_test(str,desc){str=str||JSON.stringify(ScriptDb.getMyDb().load("S337185323966"));desc=desc||"Argenta Print — timestamp:"+new Date().getTime();DriveApp.createFile(desc,str,MimeType.HTML);}
function size    (){var db=ScriptDb.getMyDb();Logger.log(/*ScriptDb.getMyDb()*/db.query({}).getSize());}
function showById(){Logger.log(JSON.stringify(ScriptDb.getMyDb().load("S96280679164")))} // Show one record by ID
function showOne (){Logger.log(/*Utilities.jsonStringify*/JSON.stringify(ScriptDb.getMyDb().query({item:"eXjKqn1"/*/table:"note"/* /"user",user:"atlaslive@gmail.com",seller:true/*,city:"test"*/}).next()));} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function showAll (){var db=ScriptDb.getMyDb(),r,results=db.query({});while(results.hasNext()){r=results.next();Logger.log(/*Utilities.jsonStringify*/JSON.stringify(r));return arr}} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function print2ss(){LibraryjsUtil.write2ss(true,showAll(),"Sheet1","1azZ5rq1Sgy2fipwhwd75f9M6jkzvWk4TZmOzH2A4uRg"/*act*/)}
//function del     (){var xdb=ScriptDb.getMyDb(),arr=[],r,results=db.query({xtable:"note"/*,/*source:"fciEx_foo",* /table:db.not("report"),* /timestamp_posted:db.greaterThan(1388548425377),k:"8u0hjrtbd68s3hi1w9kl",/*"36sgd2m257w2j0sn5isa",* /"report"/* /"bid"/*"user"* /,xcity:"test"/*xseller:true,xuser* /,bidder:"atlaslive@gmail.com"*/});while(results.hasNext()){arr.push(results.next().getId());}db.removeByIdBatch(arr,false);} // Replaced: while(results.hasNext()){r=results.next();db.remove(r);}}
//function mod     (){var xdb=ScriptDb.getMyDb(),arr=[],r,results=db.query({/*item* /city:true,/*db.not(db.anyValue())/*/xtable:"note"/*,pctLtv:db.between(0,1.1),lienPos:db.not(1)/*,/*use* /lienPos:db.anyOf(["1st"/*false,db.not(db.anyValue())/*"Hospitality"/*"Commercial"/*"Apt","Multifamily"* /])/*"Oth"/* /"bid"*/});while(results.hasNext()){r=results.next();try{r.pctLtv=Math.round(100*r.balCur/r.estValue)}catch(e){r.pctLtv="";Logger.log(e.message)}/*r.lienPos=1;/*LibraryjsUtil.stateConvert(r.state,"abbr");/*.use="X";/*"CRE";/*"MUL";/*r.city=LibraryjsUtil.toCaseTitle(r.city);/*r.item=LibraryjsUtil.toBase62(Number(r.getId().slice(1)));/*if(r.askPrice==""){r.askPrice=0}/* /r.remove=false;r.accepted=false;/*r.askRate=r.buyRate;r.askPrice=r.buyPts;* /r.bids=[];/*r.table="note";r.datePosted=new Date().getTime();* /var i=r.bids.length;while(i--){/*r.bids[i].timestamp=r.bids[i].time;* /r.bids[i].accepted=false;/*r.bids[i].target_id=r.getId();* /r.bids[i].time=""/* /if(r.bids[i].bidder=="atlaslive@gmail.com"){r.bids.splice(i,1)}* /db.save(r);*/arr.push(r);}db.saveBatch(arr,false)}
//function doPost(e){ // function xdoPost(e){return ContentService.createTextOutput("Hello World"/*"User says: "+JSON.stringify(e)*/)} // e.postData.getDataAsString()
//    if(e && e.parameter && e.parameter.k){var k=e.parameter.k,m=e.parameter.m,p=e.parameter;switch(k){
//            case   /* receive from fci */ "36sgd2m257w2j0sn5isa" : return receiveScrape (p,"fciEx"     ) ; break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
//            case   /* receive from nmp */ "3w34xo2xeuyy8jprgmzg" : return receiveScrape (p,"noteMktPl" ) ; break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
//            case   /* receive from ml  */ "8u0hjrtbd68s3hi1w9kl" : return receiveScrape (p,"moolahList") ; break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
//         default                                                 :                                       ; break;}}}
//function xdoGet (e){return ContentService.createTextOutput("Hello World")}
function  doGet (e){ // References: https://developers.google.com/apps-script/guides/html-service-communication#private_functions // https://sites.google.com/site/appsscripttutorial/miscellaneous/creating-form-elements-dynamically-using-google-apps-script-gas
 // if(e && e.parameter && e.parameter.jsoncallback){              return ContentService.createTextOutput("                                      foo({result:'<strong>Hello</strong> World'});").setMimeType(ContentService.MimeType./*TEXT*/JAVASCRIPT);} // https://developers.google.com/apps-script/reference/base/mime-type
 // if(e && e.parameter && e.parameter.jsoncallback){              return ContentService.createTextOutput("jQuery164024488894315436482_1409647426359({result:'<strong>Hello</strong> World'});").setMimeType(ContentService.MimeType./*TEXT*/JAVASCRIPT);} // Must inspect http requests and responses
 // if(e && e.parameter && e.parameter.jsoncallback){              return ContentService.createTextOutput(e.parameter.jsoncallback     +           "({result:'<strong>Hello</strong> World'});").setMimeType(ContentService.MimeType./*TEXT*/JAVASCRIPT);}
    if(e && e.parameter && e.parameter.k){var k=e.parameter.k,m=e.parameter.m,p=e.parameter;switch(k){
 //        case   /* serve marquee    */ "rv8eqwuvdm11f66c431g"  : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(serveMarquee   ( )) + ")").setMimeType(ContentService.MimeType./*JSON*/JAVASCRIPT);break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
           case   /* serve AVM report */ "3bc9cpv6wb54gyqv6kl3"  : return ContentService.createTextOutput(e.parameter.jsoncallback+"(" + JSON.stringify(serveAvmReport ( )) + ")").setMimeType(ContentService.MimeType./*JSON*/JAVASCRIPT);break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
        default                                                  :                                                                                                                                                                         break;}}
	if(SitesApp.getActiveSite()){var siteName = SitesApp.getActiveSite().getName();switch(siteName){
            case   "argentabpo"                                  :
                    if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
                            case   "home"                        : return HtmlService.createHtmlOutputFromFile("home.html"     ).setSandboxMode(HtmlService.SandboxMode.NATIVE);break;
                            case   "signup"                      : return HtmlService.createHtmlOutputFromFile("signup.html"   ).setSandboxMode(HtmlService.SandboxMode.NATIVE);break;
                            case   "order"                       : return HtmlService.createHtmlOutputFromFile("order.html"    ).setSandboxMode(HtmlService.SandboxMode.NATIVE);break;
                            case   "fill"                        : return HtmlService.createHtmlOutputFromFile("fill.html"     ).setSandboxMode(HtmlService.SandboxMode.NATIVE);break;
                            case   "sandbox"                     : return HtmlService.createHtmlOutputFromFile("sandbox.html"  ).setSandboxMode(HtmlService.SandboxMode.NATIVE);break;
                            case   "authorize"                   : return authorize                           (                )                                               ;break;
                         default                                 :                                                                                                              break;}}
        //  case   "creditrepairnation"                          : // acquire inventory
		//			if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
        //                  case   "home"                        : return HtmlService.createHtmlOutputFromFile("collect.html"  ).setSandboxMode(HtmlService.SandboxMode.NATIVE);break;
		//  			 default                                 :                                                                                                             ;break;}}
         default                                                 :                                                                                                              break;}}}
function authorize(){return HtmlService.createHtmlOutput("<div align='center' style='color:#808080;font-family:verdana;color:orange;font-weight:bold;margin-top:15px;'>Authorization successful!<div style='color:#808080;font-size:smaller;font-weight:normal;'>You may now access all features</div><img src='https://lh5.googleusercontent.com/-a81AytXYq0Q/Umtn0FrFdhI/AAAAAAAAIyE/xCYArSNCR1k/s144/orange-check-mark.png' height='100'></div>")}
function receiveSignup(ob){LibraryjsUtil.recordUpdate("argenta","agent",{email:Session.getActiveUser().getEmail()},ob);LibraryjsUtil.zones2zips("argenta","agent","zip",ob)}
function processForm_receiveFundDocs(ob){var i,user=Session.getActiveUser().getEmail(),t=new Date().getTime(),db=ScriptDb.getMyDb(),q={table:"user",seller:true,user:user},r=db.query(q).next();
    if(!r){r=q;r.record=[];r.emailList={current:[],archive:[]};}r.record.unshift(ob);r.record[0].date=t;r.emailList.current.unshift((t+","+ob.emailListString).split(/[\s,]+/)); // function test(){Logger.log("foo bar, zap-foo, baz bat".split(/[\s,]+/))} // Search term: split string by commar or space // Reference: http://stackoverflow.com/questions/1835032/regexp-split-string-by-commas-and-spaces-but-ignore-hyphenated-words
    i=r.emailList.current[0].length;while(i---1){if(r.emailList.archive.indexOf(r.emailList.current[i])==-1){r.emailList.archive.push(r.emailList.current[0][i])}}Logger.log(JSON.stringify(r));db.save(r)}
function processForm_registerSeller(ob){var i,user=Session.getActiveUser().getEmail(),t=new Date().getTime(),db=ScriptDb.getMyDb(),q={table:"user",seller:true,user:user},r=db.query(q).next();
    if(!r){r=q;r.record=[];r.emailList={current:[],archive:[]};}r.record.unshift(ob);r.record[0].timestamp=t;r.emailList.current.unshift((t+","+ob.emailListString).split(/[\s,]+/)); // function test(){Logger.log("foo bar, zap-foo, baz bat".split(/[\s,]+/))} // Search term: split string by commar or space // Reference: http://stackoverflow.com/questions/1835032/regexp-split-string-by-commas-and-spaces-but-ignore-hyphenated-words
    i=r.emailList.current[0].length;while(i---1){if(r.emailList.archive.indexOf(r.emailList.current[i])==-1){r.emailList.archive.push(r.emailList.current[0][i])}}Logger.log(JSON.stringify(r));db.save(r)}
function processForm_addNote(ob){var user=Session.getActiveUser().getEmail(),t=new Date().getTime(),db=ScriptDb.getMyDb(),u=db.query({table:"user",user:user,seller:true}).next(),i,dist=u.emailList.current[0].slice(1),site=SitesApp.getSite("onlinenoteexchange");if(!u.record[0].agreed){Logger.log(user+" did not agree to groundrules.");return}ob.table="note";ob.timestamp_posted=t;ob.seller=user;ob.remove=false;ob.accepted=false;ob.filePic=processPic(ob.filePic);ob.fileDoc=processDoc(ob.fileDoc);if(ob.askPrice==""){ob.askPrice=0};var id=db.save(ob).getId(),r=db.load(id);r.item=LibraryjsUtil.toBase62(Number(id.slice(1)));db.save(r);
    chromeLogoBlob=UrlFetchApp.fetch("https://lh5.googleusercontent.com/-zCLeer1r3ro/Udnn8thtnmI/AAAAAAAAHys/lWkaQnXPv_Q/s144/Google_Chrome_icon_2011.jpg").getBlob().setName("chromeLogoBlob");
    i=dist.length;while(i--){try{site.addViewer(dist[i])}catch(e){Logger.log(dist[i]+": "+e.message)}MailApp.sendEmail({to:dist[i],subject:"New loan: "+r.askRate+"%, "+r.askPrice+" points",htmlBody:("<a href='https://sites.google.com/site/onlinenoteexchange/buy'>Click here</a> (item: "+r.item+") <a href='https://www.google.com/intl/en/chrome/browser/'><img src='cid:chromeLogo' height='15' style='text-decoration:none;border:0;outline:none'></a> <a href='https://www.google.com/intl/en/chrome/browser/'>Chrome required</a>.<br><br>Rate: "+r.askRate+"% +"+r.askPrice+" points<br><br>Collateral:<br>"+r.sa+", "+r.city+", "+r.state+" "+r.zip+"<br>"+r.use+", "+r.beds+" beds, "+r.baths+" baths, "+r.sqft+" sqft, "+"<br><br>Loan Type: "+r.purpose+"<br>Unpaid Principal Balance: $"+r.balCur+"<br>Estimated Value: $"+r.estValue+"<br>LTV: "+r.pctLtv/*+"%<br>Term: "+r.term+" months<br>"*/+"<br>Highlights: "+r.notes),name:"atlaslive@gmail.com",inlineImages:{chromeLogo:chromeLogoBlob/*,youtubeLogo:youtubeLogoBlob*/}});}/*Logger.log(JSON.stringify(ob));*/return}
function sendUserToClient(){var user=Session.getActiveUser().getEmail(),u=ScriptDb.getMyDb().query({table:"user",seller:true,user:user}).next();/*Logger.log(JSON.stringify(r));*/return u;}
function processDoc(blob){try{var id=DocsList.createFile(blob/*.getAs("application/pdf")*/).getId();}catch(e){Logger.log(e.message);return "";}DriveApp.getFileById(id).setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);return DocsList.getFileById(id).getUrl();} // Reference: https://developers.google.com/apps-script/reference/base/composite-blob#getAs(String) // Reference: https://code.google.com/p/google-apps-script-issues/issues/detail?id=1660 see #37, Oct 13, 2012 // Use DocsList instead of DriveApp which will not allow document to be viewed properly
function processPic(blob){if(!blob.length){return ""}return "https://drive.google.com/uc?export=view&id="+DriveApp.createFile(blob/*.getAs("image/jpeg")*/).setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW).getId()} // Image // Reference: http://stackoverflow.com/questions/10311092/displaying-files-e-g-images-stored-in-google-drive-on-a-website // http://stackoverflow.com/questions/14717426/referencing-project-files-with-html-service > http://googleappsdeveloper.blogspot.in/2012/11/announcing-google-drive-site-publishing.html
function getAvmReport(ob)    {Logger.log(ob);var addy=ob.address;print(JSON.stringify(LibraryjsAvm.avmJson({"source":{"name":"manual","data":addy}/*,"market":{"city":"Pheonix","state":"AZ"}*/})));return "<a href='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00'><img src='https://lh4.googleusercontent.com/-WFV1IdXKZvI/U_1KktTMNOI/AAAAAAAAMmM/Ky7L7IOq0Lc/s144/btn.png'></a>"}//JSON.stringify(LibraryjsAvm.avmData(addy))}//addy}//"<strong>Hello</strong> world"}//return HtmlService.createHtmlOutputFromFile("AvmReport.html").setSandboxMode(HtmlService.SandboxMode.NATIVE)}//function test(){print_test(getAvmReport("5115 Longfellow Street, Los Angeles, CA, 90042"))}//"5115 Longfellow Street, Los Angeles, CA, 90042"//"12204 12th Ave NW, Seattle, WA 98177"
function serveAvmReport(addy){Logger.log(ob);var addy=ob.address;print(JSON.stringify(LibraryjsAvm.avmJson({"source":{"name":"manual","data":addy}/*,"market":{"city":"Pheonix","state":"AZ"}*/})));return "<a href='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00'><img src='https://lh4.googleusercontent.com/-WFV1IdXKZvI/U_1KktTMNOI/AAAAAAAAMmM/Ky7L7IOq0Lc/s144/btn.png'></a>"}//JSON.stringify(LibraryjsAvm.avmData(addy))}//addy}//"<strong>Hello</strong> world"}//return HtmlService.createHtmlOutputFromFile("AvmReport.html").setSandboxMode(HtmlService.SandboxMode.NATIVE)}//function test(){print_test(getAvmReport("5115 Longfellow Street, Los Angeles, CA, 90042"))}//"5115 Longfellow Street, Los Angeles, CA, 90042"//"12204 12th Ave NW, Seattle, WA 98177"
-------------------------------------- form.html (a template kit for implementing forms; must be unpacked) --------------------------------------
function processForm(formObject){var formBlob=formObject.myFile,driveFile=DriveApp.createFile(formBlob);return driveFile.getUrl()} // Goes in Code.gs // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
<form id="myForm"><input name="myFile" type="file"><input type="button" value="Submit" onclick="google.script.run.withSuccessHandler(updateUrl).processForm(this.parentNode);this.parentNode.reset()"></form><div id="output"></div><script>function updateUrl(url){document.getElementById("output").innerHTML='<a href="'+url+'">Got it!</a>'}</script><!--Goes in index.html; Reference: https://developers.google.com/apps-script/guides/html/communication#forms-->
-------------------------------------- home.html --------------------------------------
<!DOCTYPE html><html><head>
    <meta charset="utf-8"/> <!--Improve search box: http://view.jquerymobile.com/1.4.0/demos/controlgroup/#Textinputs-->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"> <!-- Latest compiled and minified CSS --> <!-- http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css -->
<!--<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css"> <!-- Optional theme -->
<!--<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons.css"> <!-- Google styles | Reference: https://developers.google.com/apps-script/add-ons/css -->
<!--<link rel="stylesheet" href="https://googledrive.com/host/0B1LVOoV_2dFtMzM0LXE2QTU4b1E"><!--Tables-->
    <style>
    /*  form     {xbackground:grey;padding:6px;xborder:2px solid #DDDDDD;border-radius:8px;}
        html     {text-align:center;font-family:arial;font-size:100%;color:#888888;}
        legend   {color:#888888;xtext-align:left}
	    table    {border-collapse:separate;border-spacing:15px;}
	    td       {color:#888888;vertical-align:top;text-align:center;padding:20px;border-radius:30px;border:8px solid #000000}
	    col-sm-1 {padding:10px}
	    sup      {font-style:italic;text-decoration:underline}
    */  input    {padding:7px 10px;border-radius:5px;margin-bottom:3px;xcolor:#006dcc;xcolor:#0044cc;xcolor:#3e0901;xheight:100px;xfont-size:150%;xborder:5px solid #3e0901;}
    </style>
</head>
<body><div style="width:65%;margin:auto;text-align:center">
    <form id="research"><!--References: https://developers.google.com/apps-script/guides/html-service-communication#forms https://developers.google.com/apps-script/guides/html-service-communication#user_objects-->
        <input type="text" style="width:100%" id="address" name="address" placeholder="Enter address" title="e.g., 123 Main St, Los Angeles, CA 90210">
	<br><input type="button" class="btn btn-block btn-primary" xclass="blue" value="Get free AVM report and check for best BPO price" onclick="myFunction()"> <!-- Reference: http://stackoverflow.com/questions/5462251/button-width-in-css3 -->
	</form><br><div id="result"></div></div>
<script>
function onFailure(e){alert(e.message)}function onSuccess(str){document.getElementById("result").innerHTML=str}//iframe doesn't work bc get request is only sent on page load. So we have the user click a link. //"<iframe src='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00' width='1200' height='1200'></iframe>"}//alert(/*"Input received!"* /document.getElementById("address").value)}
function myFunction(){document.getElementById("result").innerHTML="<img src='https://lh5.googleusercontent.com/-WsUsFefoGLQ/U_1TvMrrfvI/AAAAAAAAMnI/PDrmxMB9aZ4/s800/load666666.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).getAvmReport(this.parentNode)}//Don't use document.getElementById("address").value} because it will not return the entire form (only the address datafield) and if the code is copy/pasted in the future, it will create a bug if the entire form is needed//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" // Note: Use this.parentNode to retrieve all the fields in a form; to get only a single field, use something like: document.getElementById("address").value //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
</script></body></html>
-------------------------------------- signup.html -------------------------------------- 8/24/2014, 8/26/2014 To add features, see file: Bootstrap_Argenta_Signup (Undeprecated) Features: info and question glyphs, formatted tooltips and popovers, iframe for multiple pages on single Google Sites page
<!DOCTYPE html><html><head>
    <meta charset="utf-8"/> <!--Improve search box: http://view.jquerymobile.com/1.4.0/demos/controlgroup/#Textinputs-->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"> <!-- Latest compiled and minified CSS --> <!-- http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css -->
<!--<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css"> <!-- Optional theme -->
<!--<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons.css"> <!-- Google styles | Reference: https://developers.google.com/apps-script/add-ons/css -->
<!--<link rel="stylesheet" href="https://googledrive.com/host/0B1LVOoV_2dFtMzM0LXE2QTU4b1E"><!--Tables-->
    <style>
    /*  form     {xbackground:grey;padding:6px;xborder:2px solid #DDDDDD;border-radius:8px;}
	    html     {text-align:center;font-family:arial;font-size:100%;color:#888888;}
        legend   {color:#888888;xtext-align:left}
	    table    {border-collapse:separate;border-spacing:15px;}
	    td       {color:#888888;vertical-align:top;text-align:center;padding:20px;border-radius:30px;border:8px solid #000000}
	    col-sm-1 {padding:10px}
	    sup      {font-style:italic;text-decoration:underline}
    */  input    {padding:7px 10px;border-radius:5px;xcolor:#006dcc;xcolor:#0044cc;xcolor:#3e0901;xheight:100px;xfont-size:150%;xborder:5px solid #3e0901;}
    </style>
</head>
<body><h1>Agents signup here</h1>
    <form id="myForm" class="form-inline" xclass="form-horizontal"> <!--References: https://developers.google.com/apps-script/guides/html-service-communication#forms https://developers.google.com/apps-script/guides/html-service-communication#user_objects-->
        <!--<fieldset><legend>Company information</legend>-->
		<div class="well"><h2 class="text-left">Registration Form <small>for agents to provide BPO services</small></h2>
		<div class="well"><h4 class="text-left">Your Contact Details</h4>
		    &nbsp;&nbsp;&nbsp;<input type="text" id="email" name="email" placeholder="Email" style="width:200px" title="Example: janedoe@example.com">
            &nbsp;&nbsp;&nbsp;<input type="text" id="name"  name="name"  placeholder="Name"  style="width:200px" title="Example: Jane Doe">
            &nbsp;&nbsp;&nbsp;<input type="text" id="phone" name="phone" placeholder="Phone" style="width:100px" title="Example: 2125551212">
            &nbsp;&nbsp;&nbsp;<input type="text" id="zip"   name="zip"   placeholder="Zip"   style="width: 70px" title="Example: 02139">
		</div>
		<!--</fieldset><fieldset><legend>Pricing</legend>-->
		<div class="well"><h4 class="text-left">BPO Pricing</h4>
		      &nbsp;&nbsp;&nbsp; Zone 1
		          <label class="sr-only" for="radius1">Radius</label><input type="text" size="1" id="radius1" name="radius1" placeholder="Miles" title="Radius in miles for zone 1. Example: 5">
                  <label class="sr-only" for="price1" >Price </label><input type="text" size="1" id="price1"  name="price1"  placeholder="Price" title="Price in dollars for zone 1. Example: 20">
		      &nbsp;&nbsp;&nbsp; Zone 2
		          <label class="sr-only" for="radius2">Radius</label><input type="text" size="1" id="radius2" name="radius2" placeholder="Miles" title="Radius in miles for zone 2. Example: 5">
                  <label class="sr-only" for="price2" >Price </label><input type="text" size="1" id="price2"  name="price2"  placeholder="Price" title="Price in dollars for zone 2. Example: 20">
		      &nbsp;&nbsp;&nbsp; Zone 3
		          <label class="sr-only" for="radius3">Radius</label><input type="text" size="1" id="radius3" name="radius3" placeholder="Miles" title="Radius in miles for zone 3. Example: 5">
                  <label class="sr-only" for="price3" >Price </label><input type="text" size="1" id="price3"  name="price3"  placeholder="Price" title="Price in dollars for zone 3. Example: 20">
		<!--</fieldset>-->
		</div></div>
    <input  type="button" class="btn btn-lg btn-block btn-primary" xclass="blue" onclick=           "myFunction()" value="Submit" xstyle="xtext-align:center;xbackground:#3e0901;xfont-size:100%;xcolor:white;xfont-weight:bold;xpadding:10px 20px;xborder-radius:999px;xdisplay:inline-block;xwidth:770px;" > <!-- Reference: http://stackoverflow.com/questions/5462251/button-width-in-css3 -->
    <input  type="button" class="btn btn-lg btn-block btn-default" xclass="grey" onclick="this.parentNode.reset()" value="Reset"  xstyle="xtext-align:center;xbackground:#3e0901;xfont-size:100%;xcolor:white;xfont-weight:bold;xpadding:10px 20px;xborder-radius:999px;xdisplay:inline-block;xwidth:770px;" >
	</form><br><br><br>
						<table class="table table-striped table-hover" xclass="CSSTableGenerator-gray">
                        <thead><th>Field A</th><th>Field B</th><th>Field C</th></thead>
						<tbody>
						<tr>
						  <td>100</td>
						  <td>200</td>
						  <td>300</td>
						</tr>
						<tr>
						  <td>400</td>
						  <td>500</td>
						  <td>600</td>
						</tr>
						<tr>
						  <td>700</td>
						  <td>800</td>
						  <td>900</td>
						</tr>
						</tbody>
						</table>
<div id="result"></div>
<!--<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script> <!-- Latest compiled and minified JavaScript --> <!-- http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js -->
    <script type="text/javascript">
//$(function(){$("[rel='tooltip']").tooltip();});
//$(document).ready(function(){$("body").tooltip({selector:'[data-toggle=tooltip]'});});
//$('[data-toggle="tooltip"]').tooltip({"placement":"top","html":false,"animation":"true","delay":{"show":0,"hide":0}}); // References: http://jsfiddle.net/LhZpX/ http://stackoverflow.com/questions/18410922/bootstrap-3-0-popovers-and-tooltips
//$('#mark-info'    ).tooltip({"show":true,"placement":"left","title":"We let you specify three pricing zones around your center zip code. This optimizes your pricing flexibility to be more competitive for closer locations and recoup costs if you have to travel farther."});
//$('#mark-question').tooltip({"show":true,"placement":"left","title":"Pricing zones are defined by their distance around your home zone specified in the section labelled Contact Details"});
function onFailure(e){alert(e.message)}function onSuccess(str){document.getElementById("result").innerHTML=str}//iframe doesn't work bc get request is only sent on page load. So we have the user click a link. //"<iframe src='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00' width='1200' height='1200'></iframe>"}//alert(/*"Input received!"* /document.getElementById("address").value)}
function myFunction(){//document.getElementById("result").innerHTML="<img src='https://lh4.googleusercontent.com/-S3rRVyRoXeA/U62uSnnsXLI/AAAAAAAAMA4/N10K1jdADPY/s800/ajax-loader.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).receiveSignup(this.parentNode);this.parentNode.reset()}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" // Note: Use this.parentNode to retrieve all the fields in a form; to get only a single field, use something like: document.getElementById("address").value //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
</script></body></html>