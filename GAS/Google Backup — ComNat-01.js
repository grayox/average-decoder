function auth    (){}
function timer   (){Logger.log(new Date().getTime())}//1388228703613
function backup  (){var desc="Argenta™ Backup — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({});while(results.hasNext()){out.unshift(results.next())}id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);}
function print   (){var desc="Argenta™ Print — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({table:"note"});while(results.hasNext()){out.unshift(results.next())}id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);}
function print_test(str,desc){str=str||JSON.stringify(ScriptDb.getMyDb().load("S337185323966"));desc=desc||"Argenta Print — timestamp:"+new Date().getTime();DriveApp.createFile(desc,str,MimeType.HTML);}
function size    (){var db=ScriptDb.getMyDb();Logger.log(/*ScriptDb.getMyDb()*/db.query({}).getSize());}
function showById(){Logger.log(JSON.stringify(ScriptDb.getMyDb().load("S96280679164")))} // Show one record by ID
function showOne (){Logger.log(JSON.stringify(ScriptDb.getMyDb().query({table:"refer"/*phone1:"8018281825"*/}).next()))} // Show one record
function showAll (){var db=ScriptDb.getMyDb(),arr=[],r,results=db.query({/*table:"account"*//*"refer"*/});while(results.hasNext()){r=results.next();arr.push(r)}Logger.log(JSON.stringify(arr));return arr} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function print2ss(){LibraryjsUtil.write2ss(true,showAll(),"Sheet1","1azZ5rq1Sgy2fipwhwd75f9M6jkzvWk4TZmOzH2A4uRg"/*act*/)}
//function del     (){var db=ScriptDb.getMyDb();var results=db.query({phone1:"8018281825"});while(results.hasNext()){var r=results.next();db.remove(r);}}
//function mod     (){var db=ScriptDb.getMyDb(),r,results=db.query({/*table:"account",email:db.not(Session.getUser().getEmail())*/});while(results.hasNext()){r=results.next();//r.JsonData = JSON.parse(JSON.stringify(eval(r.JsonData)));r.count={"balance":332,"deposits":360,"withdrawals":28};Logger.log(JSON.stringify(r));r.addedUser="benharvill@gmail.com";db.save(r);}}
//function test(){Logger.log(UserProperties.getProperties())}
/*function test(){
	var uyfn="",uycn="",uyp="",user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null,p=user?("value='"+user+"' disabled"):"placeholder='Your email'"
			  ; if(user){u=LibraryjsUtil.dbParse("get","alpha","referral",{yEmail:user}).results[0];uynf=u.yNameFull?"value="+u.yNameFull:"";uync=u.yNameComp?"value="+u.yNameComp:"";uyp=u.yPhone?"value="+u.yPhone:"";}
	Logger.log("A: "+user);
	Logger.log("B: "+JSON.stringify(u));
	Logger.log("C: "+uyfn);
	Logger.log("D: "+uycn);
	Logger.log("E: "+uyp);
}*/
function doPost(e){ScriptDb.getMyDb().save(e.parameters);/*return;*/var out=ContentService.createTextOutput();out.setContent(JSON.stringify(e.parameters));return out;} // CreditReady: userId=2472, pswd=p@ssword, url=https://secure.progrexion.com/fsaffiliates/creditready/ // https://developers.google.com/apps-script/uiapp?hl=en#doGetParams // https://developers.google.com/apps-script/content_service?hl=en // Example: // <SCRIPT URL>?start=1325437200&end=1325439000;new Date(Number(request.parameters.start)*1000);new Date(Number(request.parameters.end)*1000));
function doGet  (){ // References : https://developers.google.com/apps-script/uiapp, https://developers.google.com/apps-script/uiapp#ServerHandlers
    if(SitesApp.getActiveSite()){var siteName = SitesApp.getActiveSite().getName();switch(siteName){
            case   "communicadonation"             : 
					if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
                            case   "home"          : return HtmlService.createHtmlOutputFromFile(       "stats.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
                         default                   :                    ;break;}}
     /*     case   "creditrepairnation"            : // acquire inventory
					if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
                            case   "home"          : return HtmlService.createHtmlOutputFromFile(     "collect.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
						 default                   :                    ;break;}}
      */ default                                   : break;}}}	
function receiveRefer(ob){var name=ob.cNameFull.split(" "),user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null;if(user){ob.yEmail=user}ob.cNameFirst=name[0];ob.cNameLast=name[1]; // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
    var saved=LibraryjsUtil.dbParse("post","alpha","referral",ob);ob.vendor=saved.objectId;var str=postLead(ob);ob.efolks=JSON.parse(('{"'+str.replace(/\n/gi,'","').replace(/:/gi,'":"')+'"}').replace(/,""}/gi,"}"));LibraryjsUtil.dbParse("put","alpha","referral",saved.objectId,ob)}//Logger.log(saved)}//return Logger.log(JSON.stringify(ob))} // saved={objectId="CE05GdsyLR",createdAt=2014-07-16T06:45:19.526Z}
function postLead(ob){ // Reference: https://www.efolks.com/publishers/posting.html#post-examples // act="https://www.efolks.com/webservices/leads_incoming.php?login=Atlas_ws&password=atlas123&return_type=simple&aid=5677&cid=100&wid=sub1&vendor=A123456&first_name=Testy&last_name=McTester&email=testing-20140715-02@example.com&ip_address=204.44.133.44&service=CREDIT_REPORT_REPAIR&zip=84101&address1=123+anywhere+st.&daytime_phone=801-432-4321&opt_in=1&extr_info=extra1&source_uri=https%3A%2F%2Fwww.efolks.com%2Fpublishers%2Fposting.html"
    var act="https://www.efolks.com/webservices/leads_incoming.php?"
      , par={ login         : "Atlas_ws"
            , password      : "atlas123"
            , return_type   : "simple"
            , aid           : "5677"
            , cid           : "100"
            , service       : "CREDIT_REPORT_REPAIR"  // The "service" field doesn't usually have a direct relationship to any form field inputs. Usually some Javascript or back-end code will be needed to build this field before sending to us unless, for example, your form is an implicit "CREDIT_REPORT_REPAIR" collector.
            , wid           : "sub1"                  // Wildcard ID. this is an optional way to sub-divide campaigns. It can contain alphanumeric characters, spaces, underscores(_), dashes(-), exclamation points(!), dots(.), and pipes(|). This can be useful for reporting.
            , vendor        : ob.vendor               // Example: "A123456" // Vendor field is a free-form identification field (up to 32 characters) that we store with each lead and also pass back in each response. This is typically used to send us your lead identifier. It could be a form field, but usually is not.
         // , extr_info     : "extra1"                // The notes and extra_info fields are just used for additional information regarding a lead. The notes field will be passed on and visible to our fulfillment partners. This can be a form field input, but does not have to be.
            , source_uri    : "https%3A%2F%2Fwww.efolks.com%2Fpublishers%2Fposting.html"
            , ip_address    : "204.44.133.44"
         // , opt_in        : "1"
            , first_name    : ob.cNameFirst           // Example: "Testy"
            , last_name     : ob.cNameLast            // Example: "McTester"
            , email         : ob.cEmail               // "testing-20140717-10@example.com"
            , zip           : ob.cZip                 // "84101"
         // , address1      : "123+anywhere+st."
            , daytime_phone : ob.cPhone               // "801-432-4321"
            }/*,out=*/;return UrlFetchApp.fetch(act+LibraryjsUtil.ob2httpGetParams(par)).getContentText()}//;Logger.log(out)} // sample from efolks: @return{str}: "uid:6d059020efcf4a7fbc30be9497aa1144,status:bad,test_mode:yes,details:Duplicate Submission,warning:ignoring_unknown_fields:extr_info,vendor:A123456,confirmation_code:2056898"
-------------------------------------- form.html (a template kit for implementing forms; must be unpacked) --------------------------------------
function processForm(formObject){var formBlob=formObject.myFile,driveFile=DriveApp.createFile(formBlob);return driveFile.getUrl()} // Goes in Code.gs // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
<form id="myForm"><input name="myFile" type="file"><input type="button" value="Submit" onclick="google.script.run.withSuccessHandler(updateUrl).processForm(this.parentNode);this.parentNode.reset()"></form><div id="output"></div><script>function updateUrl(url){document.getElementById("output").innerHTML='<a href="'+url+'">Got it!</a>'}</script><!--Goes in index.html; Reference: https://developers.google.com/apps-script/guides/html/communication#forms-->
-------------------------------------- refer.html --------------------------------------
<!DOCTYPE html><html style="text-align:center;font-family:arial;font-size:100%;color:#777777;"><head><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<body>
  <div style="width:100%;margin:0 auto;text-align:center">
    <img src="<!DOCTYPE html><html style="text-align:center;font-family:arial;font-size:100%;color:#777777;"><head><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><!-- Publicly viewable lead collector -->
<body>
  <div style="width:100%;margin:0 auto;text-align:center">
    <img src="https://lh3.googleusercontent.com/-cwD5K99xQ7I/U8yCV_zvOYI/AAAAAAAAMQE/dBH2MSFv-XE/s800/CreditRepair.png" height="65">
    <form id="referral" style="xbackground:grey;xpadding:6px;xborder:2px solid #DDDDDD;border-radius:8px;"><!--References: https://developers.google.com/apps-script/guides/html-service-communication#forms https://developers.google.com/apps-script/guides/html-service-communication#user_objects-->
        <input type="text"  style="xcolor:#008800;xheight:100px;font-size: 90%;padding:10px 20px;xborder:1px solid #00DD00;border-radius:999px;" size="22" id="cNameFull" name="cNameFull" placeholder="Name"  title="Your full first and last names. Example: John Doe, III" >
        <input type="text"  style="xcolor:#008800;xheight:100px;font-size: 90%;padding:10px 20px;xborder:1px solid #00DD00;border-radius:999px;" size="22" id="cEmail"    name="cEmail"    placeholder="Email" title="Your email address. Example: johndoe@example.com"       >
        <input type="text"  style="xcolor:#008800;xheight:100px;font-size: 90%;padding:10px 20px;xborder:1px solid #00DD00;border-radius:999px;" size="2"  id="cZip"      name="cZip"      placeholder="Zip"   title="Your 5-digit zip code. Example: 02139"                  >
        <input type="text"  style="xcolor:#008800;xheight:100px;font-size: 90%;padding:10px 20px;xborder:1px solid #00DD00;border-radius:999px;" size="15" id="cPhone"    name="cPhone"    placeholder="Phone" title="Best phone number to reach you. Example: 555-555-1212"  > <!--<br><input type="text"   style="color:#888888;xheight:100px;font-size:100%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="35" id="phoneEve" name="phoneEve" placeholder="2nd phone" title="Alternate phone number to reach customer. Example: 555-555-1212" > -->
    <br><input type="button" value="Submit" onclick="myFunction();" style="background:#FF9933;font-size:100%;color:black;font-weight:bold;border-radius:999px;padding:10px 20px;display:inline-block;width:700px;"> <!-- Reference: http://stackoverflow.com/questions/5462251/button-width-in-css3 -->
	</form></div><table style="margin:0px auto"><tbody><tr><td width="700" style="font-size:80%;text-align:justify;text-justify:newspaper">By clicking &#8220;Submit&#8221; I agree by electronic signature to be contacted about credit repair or credit repair marketing by a live agent, artificial or prerecorded voice, and SMS text at my residential or cellular number, dialed manually or by autodialer, and by email (consent to be contacted is not a condition to purchase services);</td></tr></tbody></table>
<script>
function onFailure(e){alert(e.message)}function onSuccess(){}//document.getElementById("result").innerHTML=str}//iframe doesn't work bc get request is only sent on page load. So we have the user click a link. //"<iframe src='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00' width='1200' height='1200'></iframe>"}//alert(/*"Input received!"* /document.getElementById("address").value)}
function myFunction(){//alert(/*document.forms["referral"]["cFullName"].value/*"Hello world"*/);document.forms["referral"]/*getElementById("referral")*/.reset();}//;document.getElementById("result").innerHTML="<img src='https://lh4.googleusercontent.com/-S3rRVyRoXeA/U62uSnnsXLI/AAAAAAAAMA4/N10K1jdADPY/s800/ajax-loader.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).receiveRefer(this.parentNode);this.parentNode.reset()}//document.getElementById("address").value)}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
</script></body></html>">
    <form id="referral" style="xbackground:grey;xpadding:6px;xborder:2px solid #DDDDDD;border-radius:8px;"><!--References: https://developers.google.com/apps-script/guides/html-service-communication#forms https://developers.google.com/apps-script/guides/html-service-communication#user_objects-->
        <input type="text"  style="xcolor:#008800;xheight:100px;font-size: 90%;padding:10px 20px;xborder:1px solid #00DD00;border-radius:999px;" size="22" id="cNameFull" name="cNameFull" placeholder="Name"  title="Your full first and last names. Example: John Doe, III" >
        <input type="text"  style="xcolor:#008800;xheight:100px;font-size: 90%;padding:10px 20px;xborder:1px solid #00DD00;border-radius:999px;" size="22" id="cEmail"    name="cEmail"    placeholder="Email" title="Your email address. Example: johndoe@example.com"       >
        <input type="text"  style="xcolor:#008800;xheight:100px;font-size: 90%;padding:10px 20px;xborder:1px solid #00DD00;border-radius:999px;" size="2"  id="cZip"      name="cZip"      placeholder="Zip"   title="Your 5-digit zip code. Example: 02139"                  >
        <input type="text"  style="xcolor:#008800;xheight:100px;font-size: 90%;padding:10px 20px;xborder:1px solid #00DD00;border-radius:999px;" size="15" id="cPhone"    name="cPhone"    placeholder="Phone" title="Best phone number to reach you. Example: 555-555-1212"  > <!--<br><input type="text"   style="color:#888888;xheight:100px;font-size:100%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="35" id="phoneEve" name="phoneEve" placeholder="2nd phone" title="Alternate phone number to reach customer. Example: 555-555-1212" > -->
    <br><input type="button" value="Submit" onclick="myFunction();" style="background:#FF9933;font-size:100%;color:black;font-weight:bold;border-radius:999px;padding:10px 20px;display:inline-block;width:700px;"> <!-- Reference: http://stackoverflow.com/questions/5462251/button-width-in-css3 -->
	</form></div><table style="margin:0px auto"><tbody><tr><td width="700" style="font-size:80%;text-align:justify;text-justify:newspaper">By clicking &#8220;Submit&#8221; I agree by electronic signature to be contacted about credit repair or credit repair marketing by a live agent, artificial or prerecorded voice, and SMS text at my residential or cellular number, dialed manually or by autodialer, and by email (consent to be contacted is not a condition to purchase services);</td></tr></tbody></table>
<script>
function onFailure(e){alert(e.message)}function onSuccess(){}//document.getElementById("result").innerHTML=str}//iframe doesn't work bc get request is only sent on page load. So we have the user click a link. //"<iframe src='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00' width='1200' height='1200'></iframe>"}//alert(/*"Input received!"* /document.getElementById("address").value)}
function myFunction(){//alert(/*document.forms["referral"]["cFullName"].value/*"Hello world"*/);document.forms["referral"]/*getElementById("referral")*/.reset();}//;document.getElementById("result").innerHTML="<img src='https://lh4.googleusercontent.com/-S3rRVyRoXeA/U62uSnnsXLI/AAAAAAAAMA4/N10K1jdADPY/s800/ajax-loader.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).receiveRefer(this.parentNode);this.parentNode.reset()}//**IMPORTANT**“this” gets the “name” property of the parent element, i.e., the form tag/element. In order to use the “this.parnentNote” method (as opposed to the document.getElementById() method) verify the form element has a proper “name” property. Otherwise, the function will fail “silently.”//document.getElementById("address").value)}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
</script></body></html>
