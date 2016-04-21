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
//function mod     (){var db=ScriptDb.getMyDb(),r,results=db.query({/*table:"account",email:db.not(Session.getUser().getEmail())*/});while(results.hasNext()){r=results.next();//r.JsonData = JSON.parse(JSON.stringify(eval(r.JsonData)));r.count={"balance":332,"deposits":360,"withdrawals":28};Logger.log(JSON.stringify(r));
                        r.addedUser="benharvill@gmail.com";db.save(r);}}
function test(){Logger.log(UserProperties.getProperties())}
function fetchResults_Progrexion(){var temp    =UrlFetchApp.fetch("https://secure.progrexion.com/fsaffiliates/"+"index.html"/*+"?redirect_on_login=/fsaffiliates/client-referrals.html"*/,{method:"post",payload:"agent_id=2472&agent_pw=p@ssword",/*p%40ssword*//*followRedirects:false,* /muteHttpExceptions:true,*/validateHttpsCertificates:false,contentType:/*"application/x-www-form-urlencoded"*/"application/xml; charset=utf-8"});Logger.log("TempHeaders: "+temp.getAllHeaders().toSource());Logger.log("TempBody: "+temp.getContentText());
                                   var response=UrlFetchApp.fetch("https://secure.progrexion.com/fsaffiliates/client-referrals.html",{method:"get",/*followRedirects:false,*/muteHttpExceptions:true,validateHttpsCertificates:false,contentType:/*"application/x-www-form-urlencoded"*/"application/xml; charset=utf-8",headers:{Cookie:temp.getHeaders()["Set-Cookie"]}});Logger.log("RespHeaders: "+response.getHeaders().toSource());Logger.log("RespBody: "+response.getContentText());}
function submitProgrexion(ob){/*ob.affiliate_id="17199";ob.agreement="1";*/var ACT="https://script.google.com/macros/s/AKfycbwi_6ZFl43jCDL0I7ZuoGbCy5xeEUx95Vb-a5HAtr8ta85_00s/exec";ob.tid="2472.0.1";ob.traffic="ob";ob.notes="New lead!"/*"Test only"*/;ob.remote_addr="66.102.15.255";ob.referrer="66.102.0.0";ob.return_type="xml"/*simple,query_string*/;/*ob.postback="";*/ob.returns_url=ACT;ob.sales_url=ACT; // Google IP addys: https://developers.google.com/apps-script/jdbc#accessing // Progrexion documentation https://docs.google.com/file/d/1m_556U2BGOmt0zui8OdYuC0a4AFsIkznTRqJdTgnA4gDzDu3BJOYwCg1Ssqh/edit
    var response=UrlFetchApp.fetch(/*"https://secure.progrexion.com/fsaffiliates/referral.html"*/"http://www.lexingtonlaw.com/_pub/leads/realtime.php",{method:"post",payload:ob});ob.submit=Xml.parse(response.getContentText(),true);ob.submitCode=response.getResponseCode(); // Reference: https://docs.google.com/open?id=1m_556U2BGOmt0zui8OdYuC0a4AFsIkznTRqJdTgnA4gDzDu3BJOYwCg1Ssqh // https://developers.google.com/apps-script/class_xml#parse // https://developers.google.com/apps-script/articles/XML_tutorial
    return ob; // Submit lead to Progrexion // Success if response = 200 // Initialize options + exectute HTTP request (POST) // Reference: https://developers.google.com/apps-script/class_urlfetchapp#fetch
    // --- Below this line is non-integrated site --- Code commented out implements submissions to non-integrated site
    //          0         1           2          3           4         5              6           7      8         9 no               10    11 ok        12 ok       13 ok        14 ok            15               16 ok                                                         17           18      19         20       21                     22 ok             23      24         25         26      27            28 no
    // var PAR=["address","aff_email","aff_name","aff_state","aff_zip","affiliate_id","agreement","city","company","email"           ,"ext","first_name","last_name","main_phone","main_phone_ext","main_phone_ext","notes"                                                      ,"payable_to","phone","position","posted","refer_clients_period","secondary_phone","state","submit.x","submit.y","taxid","website_url","zip"  ];
    // var val=[""       ,""         ,""        ,""         ,""       ,"15997"       ,"1"        ,""    ,""       ,"test%40atlas.com",""   ,"Testatlas" ,"Testatlas","1234567888","99999"         ,"88888"         ,"This+is+a+test.+This+is+only+a+test.+Please+do+not+respond.",""          ,""     ,""        ,"true"  ,""                    ,"1234567899"     ,"AL"   ,"52"      ,"26"      ,""     ,""           ,"12345"];
    // var val=[""       ,""         ,""        ,""         ,""       ,"17199"       ,"1"        ,""    ,""       ,"test%40atlas.com",""   ,"Testatlas" ,"Testatlas","1234567888","99999"         ,"88888"         ,"This+is+a+test.+This+is+only+a+test.+Please+do+not+respond.",""          ,""     ,""        ,"true"  ,""                    ,"1234567899"     ,"AL"   ,"52"      ,"26"      ,""     ,""           ,"12345"];
    // ID#   Pswd      Status  Type       URL
    // 2472  p@ssword  ACTIVE  Production https://secure.progrexion.com/fsaffiliates/referral.html
    // 15997 RZFBSm    DEFUNCT Live       https://secure.progrexion.com/fsaffiliates/referral.html
    // 17199 Troy17199 DEFUNCT Test       https://secure.progrexion.com/fsaffiliates/referral.html
    // submit@ POST https://secure.progrexion.com/fsaffiliates/referral.html // login@ POST https://secure.progrexion.com/fsaffiliates/?agent_id=15997&agent_pw=RZFBSm
    // Params: address&=aff_email&=aff_name=&aff_state=&aff_zip=&affiliate_id=15997&agreement=1&city=&company=&email=test@testonly.com&ext=&first_name=Testfirst&last_name=Testlast&main_phone=1234567888&main_phone_ext=99999&main_phone_ext=88888&notes=This+is+a+test.+This+is+only+a+test.+Please+do+not+respond.&payable_to=&phone=&position=&posted=true&refer_clients_period=&secondary_phone=1234567899&state=AL&submit.x=52&submit.y=26&taxid=&website_url=&zip=12345&
    // Source: posted=true&affiliate_id=15997&first_name=Testfirst&last_name=Testlast&state=AL&zip=12345&main_phone=1234567888&main_phone_ext=99999&secondary_phone=1234567899&main_phone_ext=88888&email=test%40testonly.com&notes=This+is+a+test.+This+is+only+a+test.+Please+do+not+respond.&agreement=1&aff_name=&company=&position=&refer_clients_period=&address=&city=&aff_state=&aff_zip=&phone=&ext=&aff_email=&website_url=&payable_to=&taxid=&submit.x=52&submit.y=26
}
function doPost(e){ScriptDb.getMyDb().save(e.parameters);/*return;*/var out=ContentService.createTextOutput();out.setContent(JSON.stringify(e.parameters));return out;} // CreditReady: userId=2472, pswd=p@ssword, url=https://secure.progrexion.com/fsaffiliates/creditready/ // https://developers.google.com/apps-script/uiapp?hl=en#doGetParams // https://developers.google.com/apps-script/content_service?hl=en // Example: // <SCRIPT URL>?start=1325437200&end=1325439000;new Date(Number(request.parameters.start)*1000);new Date(Number(request.parameters.end)*1000));
function doGet  (){ // References : https://developers.google.com/apps-script/uiapp, https://developers.google.com/apps-script/uiapp#ServerHandlers
    var pageName = SitesApp.getActivePage().getName();switch(pageName){
         // case   "home"      : return HtmlService.createHtmlOutputFromFile("refer.html" ).setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
            case   "home"      : return HtmlService.createTemplateFromFile  ("refer.html" ).evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
            case   "data"      : return HtmlService.createHtmlOutputFromFile( "data.html" ).setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
            case   "account"   : return account   ();break;
            case   "manage"    : return manage    ();break;
            case   "authorize" : return authorize ();break;
         default               :                    ;break;}}
function receiveRefer(ob){return Logger.log(JSON.stringify(ob))} // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
-------------------------------------- form.html (a template kit for implementing forms; must be unpacked) --------------------------------------
function processForm(formObject){var formBlob=formObject.myFile,driveFile=DriveApp.createFile(formBlob);return driveFile.getUrl()} // Goes in Code.gs // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
<form id="myForm"><input name="myFile" type="file"><input type="button" value="Submit" onclick="google.script.run.withSuccessHandler(updateUrl).processForm(this.parentNode)"></form><div id="output"></div><script>function updateUrl(url){document.getElementById("output").innerHTML='<a href="'+url+'">Got it!</a>'}</script><!--Goes in index.html; Reference: https://developers.google.com/apps-script/guides/html/communication#forms-->
-------------------------------------- refer.html --------------------------------------
<!DOCTYPE html><html style="text-align:center;font-family:arial;font-size:100%;color:#777777;"><head><meta charset="utf-8"/> <!--Improve search box: http://view.jquerymobile.com/1.4.0/demos/controlgroup/#Textinputs--></head>
<body><div style="width:100%;margin:0 auto;xtext-align:left">
    <form id="referral" style="background:grey;padding:6px;xborder:2px solid #DDDDDD;border-radius:8px;"><!--References: https://developers.google.com/apps-script/guides/html-service-communication#forms https://developers.google.com/apps-script/guides/html-service-communication#user_objects-->
        <input type="text"  style="color:#008800;xheight:100px;font-size: 90%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="15" id="cFullName" name="cFullName" placeholder="Customer name"  title="Your customer’s full first and last names. Example: John Doe, III" >
        <input type="text"  style="color:#008800;xheight:100px;font-size: 90%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="15" id="cEmail"    name="cEmail"    placeholder="Customer email" title="Your customer’s email address. Example: johndoe@example.com"       >
        <input type="text"  style="color:#008800;xheight:100px;font-size: 90%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="15" id="cZip"      name="cZip"      placeholder="Customer zip"   title="Your customer’s 5-digit zip code. Example: 02139"                  >
        <input type="text"  style="color:#008800;xheight:100px;font-size: 90%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="15" id="cPhone"    name="cPhone"    placeholder="Customer phone" title="Best phone number to reach customer. Example: 555-555-1212"        > <!--<br><input type="text"   style="color:#888888;xheight:100px;font-size:100%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="35" id="phoneEve" name="phoneEve" placeholder="2nd phone" title="Alternate phone number to reach customer. Example: 555-555-1212" > -->
    <br><input type="text"  style="color:#008800;xheight:100px;font-size: 90%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="15" id="yfullName" name="yfullName" placeholder="Your name"      title="Your full first and last names. Example: John Doe, III"            >
        <input type="text"  style="color:#008800;xheight:100px;font-size: 90%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="15" id="yEmail"    name="yEmail"    placeholder="Your email"     title="Your email address. Example: johndoe@example.com"                  >
        <input type="text"  style="color:#008800;xheight:100px;font-size: 90%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="15" id="yCompName" name="yCompName" placeholder="Company name"   title="The name of your company. Example: Ace Finance, Inc."              >
        <input type="text"  style="color:#008800;xheight:100px;font-size: 90%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="15" id="yPhone"    name="yPhone"    placeholder="Company phone"  title="Your company phone number. Example: 555-555-1212"                  > <!--<br><input type="text"   style="color:#888888;xheight:100px;font-size:100%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="35" id="phoneEve" name="phoneEve" placeholder="2nd phone" title="Alternate phone number to reach customer. Example: 555-555-1212" > // Reference: http://stackoverflow.com/questions/1994406/set-image-as-submit-button // Works on jsfiddl.net but not GAS -->
<!--<br><input type="image" xtype="button" xvalue="submit" onclick="myFunction()" xstyle="font-size:90%;xpadding:15px;xborder-radius:10px;" xsize="100%" src="https://lh5.googleusercontent.com/-eXPQU0DYMXk/U7ZlT3QLazI/AAAAAAAAMGc/aNES2fQIdUs/s800/button.png"                        > -->
    <br><input type="button" value="Submit turndown and fix credit" onclick="myFunction();" style="background:#00dd00;font-size:100%;color:white;font-weight:bold;border-radius:5px;padding:5px;display:inline-block;width:560px;"> <!-- Reference: http://stackoverflow.com/questions/5462251/button-width-in-css3 -->
	</form></div>
<script>
function onFailure(e){alert(e.message)}function onSuccess(){}//document.getElementById("result").innerHTML=str}//iframe doesn't work bc get request is only sent on page load. So we have the user click a link. //"<iframe src='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00' width='1200' height='1200'></iframe>"}//alert(/*"Input received!"* /document.getElementById("address").value)}
function myFunction(){//alert(/*document.forms["referral"]["cFullName"].value/*"Hello world"*/);document.forms["referral"]/*getElementById("referral")*/.reset();}//;document.getElementById("result").innerHTML="<img src='https://lh4.googleusercontent.com/-S3rRVyRoXeA/U62uSnnsXLI/AAAAAAAAMA4/N10K1jdADPY/s800/ajax-loader.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).receiveRefer(this.parentNode);this.parentNode.reset()}//document.getElementById("address").value)}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
</script></body></html>
-------------------------------------- data.html --------------------------------------
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>
      Google Visualization API Sample
    </title>
    <script type="text/javascript" src="//www.google.com/jsapi"></script>
    <script type="text/javascript">
      google.load('visualization', '1', {packages: ['corechart']});
    </script>
    <script type="text/javascript">
      function drawVisualization() {
        // Create and populate the data table.
        var dataCol = google.visualization.arrayToDataTable([
          ['Year', 'Items removed' ],
          ['2002'  ,   269196  ] ,
          ['2003'  ,   354714  ] ,
          ['2004'  ,   585214  ] ,
          ['2005'  ,   667366  ] ,
          ['2006'  ,   609443  ] ,
          ['2007'  ,   602879  ] ,
          ['2008'  ,   665515  ] ,
          ['2009'  ,  1013469  ] ,
          ['2010'  ,  1297226  ] ,
          ['2011'  ,  2548948  ] ,
          ['2012'  ,  3347490  ] ,
          ['2013'  ,  4833329  ] ,
        ]);
		var dataPie = google.visualization.arrayToDataTable([
          ['Type'                , 'Count' ] ,
          ['Collection'          ,  923148 ] ,
          ['Slowpay'             ,  210539 ] ,
          ['Chargeoff'           ,  121372 ] ,
          ['Bankruptcy'          ,   58609 ] ,
          ['Settlement'          ,   28677 ] ,
          ['Judgment'            ,   28292 ] ,
          ['Lien'                ,   13631 ] ,
          ['Repossession'        ,    5168 ] ,
          ['Foreclosure'         ,    3282 ] ,
          ['Negative'            ,    1539 ] ,
          ['Civil claim'         ,     509 ] ,
          ['Acct in counseling'  ,     319 ] ,
          ['Garnishment'         ,      50 ]
        ]);
        new google.visualization.ColumnChart(document.getElementById('visCol')).draw(dataCol,{xtheme:"maximized",width:600,height:400,title:"Items removed each year",hAxis:{title:"Year"},colors:["#00DD00"],animation:{duration:1000,easing:"inAndOut"}});
        new google.visualization.PieChart   (document.getElementById('visPie')).draw(dataPie,{xtheme:"maximized",width:600,height:400,title:"Items removed by type (4Q2013)",pieHole:0.5,animation:{duration:1000,easing:"inAndOut"},colors:["#00EE00","#00DD00","#00CC00","#00BB00","#00AA00","#009900","#008800","#007700","#006600","#005500","#004400","#003300","#002200"]});
		}
      google.setOnLoadCallback(drawVisualization);
    </script>
  </head>
  <body style="font-family: Arial;border: 0 none;">
    <table border="0"><tbody><tr><td width="50%" style="text-align:center"><div id="visCol" style="width:600px;height:400px;"></div></td>
	                             <td width="50%" style="text-align:center"><div id="visPie" style="width:600px;height:400px;"></div></td></tr></tbody></table>
	<table style="border-collapse:separate;border-spacing:10px;"><tbody>
	              <tr><td width="25%" style="color:#888888;vertical-align:top;text-align:center;padding:15px;border-radius:30px;border:10px solid #00BB00;"><div style="font-size:600%;font-weight:900;color:#00BB00">10.2</div>items removed<br>per client on average</td>
	                  <td width="25%" style="color:#888888;vertical-align:top;text-align:center;padding:15px;border-radius:30px;border:10px solid #00BB00;"><div style="font-size:600%;font-weight:900;color:#00BB00">27%</div>of negative items removed</td>
	                  <td width="25%" style="color:#888888;vertical-align:top;text-align:center;padding:15px;border-radius:30px;border:10px solid #00BB00;"><div style="font-size:600%;font-weight:900;color:#00BB00">122</div>days average turn time</td>
					  <td width="25%" style="color:#888888;vertical-align:top;text-align:center;padding:15px;border-radius:30px;border:10px solid #00BB00;"><div style="font-size:600%;font-weight:900;color:#00BB00">90%</div>of items in top 3 categories<br>(collection, slowpay, chargeoff)</td></tr>
                  </tr></tbody></table>
  </body>
</html>
/* Obsolete
function authorize(){return HtmlService.createHtmlOutput("<div align='center' style='color:#00dd00;font-family:arial;font-weight:bold;margin-top:15px;'>Authorization successful!<div style='color:#808080;font-size:smaller;font-weight:normal;'>You may now access all features</div><img src='https://lh5.googleusercontent.com/-gZ1lSbJnN08/TVZR8eQtlzI/AAAAAAAABS4/_aFxKHGtcH0/s144/Green%2520Check%2520Mark.jpg' height='100'></div>")}
function handleSubmitAccount(e){
    var app=UiApp.getActiveApplication(),user=Session.getUser().getEmail(),db=ScriptDb.getMyDb(),r=db.query({table:"account",email:user}).next(),ob=e.parameter;ob.addedUser=user;ob.updatedTime=new Date().getTime();ob.table="account"; // Prepare save-object
    if(r){var delId=r.getId(),rcloned=JSON.parse(JSON.stringify(r));r=ob;r.count=rcloned.count;r.addedTime=rcloned.addedTime;db.save(r);db.remove(db.load(delId));} // Update existing record, if it exists // Schema... // Header: var acctSum=app.createLabel(bal+" balance, available "+avail).setId("acctSum").setTag(bal+","+avail);vpan.add(acctSum); // Body: var bal,added,owned,added=db.query({table:"deposit",addedUser:user}).getSize();owned=db.query({table:"deposit",owner:user}).getSize();bal=added-owned; // Handler: var t=p.acctSum_tag.split(",");app.getElementById("acctSum").setTag((--t[0])+","+(--t[1])).setText(t[0]+" balance, available "+t[1]);break; // Reset balance summary
    else{ob.addedTime=new Date().getTime();db.save(ob);} // Else save new object // Apply stamps: user, time; // Save // Debug: app.getElementById("msg").setStyleAttribute("color","blue").setText(i+all[i]);
    app.getElementById("b0").setText("Submit");app.getElementById("pic").setVisible(false);app.getElementById("word").setVisible(false); // Reset buttons and graphics
    app.close();return app;} // Clean up, close & return — note: return is REQUIRED for widget to actually close
function account(){
    var app  = UiApp.createApplication(),user=Session.getUser().getEmail(),db=ScriptDb.getMyDb(),r=db.query({table:"account",email:user}).next(),grid=app.createGrid(10,4),y=0,x=0,na="",ph="",co="",ad="",fi="";
               if(r){na=r.name;ph=r.phone;co=r.company;ad=r.address;fi=r.fico;} // Set values of string variables to match existing record
    var vpan = app.createVerticalPanel().add(grid);app.add(vpan);
    var msg  = app.createLabel("Ready"    ).setId("msg" ).setVisible(false).setStyleAttribute("color","blue"); // Debug
    var word = app.createLabel("Saving...").setId("word").setVisible(false).setStyleAttribute("color","#00DD00");var SRC="https://lh4.googleusercontent.com/-iGBnGfnYDhY/UIXGc_gfwlI/AAAAAAAADwg/ORocc6j_iqw/s800/ajax-loader.gif";
    var pic  = app.createImage(SRC).setId("pic" ).setVisible(false);
    var h0   = app.createServerHandler("handleSubmitAccount").addCallbackElement(vpan);
    var b0   = app.createButton("Save",app.createClientHandler().forEventSource().setText("wait...").forTargets([pic,word]).setVisible(true)).addClickHandler(h0).setId("b0");
    /* -------------------------------------------------------- * / // First column /* -------------------------------------------------------- * /
    grid.setWidget(y++,x,pic                                                                                          ); // Load   graphic
    grid.setWidget(y++,x,word                                                                                         ); // Saving notice
    grid.setWidget(y++,x,msg                                                                                          ); // Debug  message
    /* ---------------------------------------------------- * / y=0;x++; // Next column /* ---------------------------------------------------- * /
    grid.setWidget(y++,x,b0                                                                                           ); // Submit button
    grid.setWidget(y++,x,app.createLabel   ("Email"               )                                                   );
    grid.setWidget(y++,x,app.createLabel   ("Full name"           )                                                   );
    grid.setWidget(y++,x,app.createLabel   ("Phone number"        )                                                   );
    grid.setWidget(y++,x,app.createLabel   ("Company name"        )                                                   );
    grid.setWidget(y++,x,app.createLabel   ("Full address"        )                                                   );
    grid.setWidget(y++,x,app.createLabel   ("Target FICO®"        ).setTitle("We’ll notify you when your client reaches this FICO®"));
    /* ---------------------------------------------------- * / y=0;x++; // Next column /* ---------------------------------------------------- * /
    grid.setWidget(y++,x,app.createCheckBox("Receive email notice").setName("byEmail").setId("byEmail").setValue(true));if(r){if(!r.byEmail){app.getElementById("byEmail").setValue(false)}}
    grid.setWidget(y++,x,app.createTextBox (                      )                                    .setValue(user).setEnabled(false));
    grid.setWidget(y++,x,app.createTextBox (                      ).setName("name"   ).setId("name"   ).setValue(na  ));
    grid.setWidget(y++,x,app.createTextBox (                      ).setName("phone"  ).setId("phone"  ).setValue(ph  ).setMaxLength(10));
    grid.setWidget(y++,x,app.createTextBox (                      ).setName("company").setId("company").setValue(co  ));
    grid.setWidget(y++,x,app.createTextArea(                      ).setName("address").setId("address").setValue(ad  ));
    grid.setWidget(y++,x,app.createTextBox (                      ).setName("fico"   ).setId("fico"   ).setValue(fi  ).setMaxLength(3).setWidth(35).setTitle("We’ll notify you when your client reaches this FICO®"));
    return app;} // Display
function handleSubmitRefer(e){ // var e={"parameter":{"name":"Testfirst Testlast","zip":"84105","phone1":"1234567899","phone1":"1234567899","besttime":"Anytime"}};
    var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---2){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    var app=UiApp.getActiveApplication(),db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),u=db.query({table:"account",email:user}).next(),out,arr=["name","email","zip","phone1","phone2"],ob=e.parameter,name=ob.name.splitName()/*,csz=ob.zip.geoGoogleCsz()* /; // Copy all event parameter properties to save-object
    if(ob.besttime=="-Select one-"){ob.besttime="Anytime"}ob.first_name=name.first;ob.last_name=name.last;/*ob.state=csz.state;ob.city=csz.city;* /out=JSON.parse(JSON.stringify(submitProgrexion(ob)));out.table="refer";out.addedUser=user;out.addedTime=new Date().getTime();/*if(csz.county){out.county=csz.county}* /Logger.log(JSON.stringify(out));db.save(out); // Add new params // Apply stamps: user, time; // Submit to vendor // Save // Debug: app.getElementById("msg").setText("A").setVisible(true);
    app.getElementById("b0").setText("Submit");app.getElementById("pic").setVisible(false);app.getElementById("word").setVisible(false); // Reset buttons and graphics
    if(ob.submit.xml_code.status.Text=="rejected_DNC"){app.getElementById("phone2").setValue("");app.getElementById("dnc").setVisible(true)/*app.getElementById("dnc").setVisible(false);* /}
    else{i=arr.length;while(i--){app.getElementById(arr[i]).setValue("")}app.getElementById("cert").setValue(false);app.getElementById("besttime").setSelectedIndex(0);} // Reset fields, check box and select menu
    app.close();return app;}
function refer(){
    var app  = UiApp.createApplication(),user=Session.getUser().getEmail(),grid=app.createGrid(10,4),y=0,x=0;
    var vpan = app.createVerticalPanel().add(grid);app.add(vpan);
    var msg  = app.createLabel("Ready"    ).setId("msg" ).setVisible(false).setStyleAttribute("color","red"    ); // Debug
    var word = app.createLabel("Saving...").setId("word").setVisible(false).setStyleAttribute("color","#00DD00");var SRC="https://lh4.googleusercontent.com/-iGBnGfnYDhY/UIXGc_gfwlI/AAAAAAAADwg/ORocc6j_iqw/s800/ajax-loader.gif";
    var pic  = app.createImage(SRC).setId("pic").setVisible(false);
    var dnc  = app.createLabel("✘ Do-Not-Call. Enter different number.").setId("dnc").setVisible(false).setStyleAttribute("color","red");
    var h0   = app.createServerHandler("handleSubmitRefer").addCallbackElement(vpan);
    var b0   = app.createButton("Submit",app.createClientHandler().forEventSource().setText("Clicked!"/*"✔OK"*/).forTargets([pic,word]).setVisible(true)).addClickHandler(h0).setId("b0");
    /* ------------------------------------------------- * / // First column /* ------------------------------------------------- * /
    grid.setWidget(y++,x,msg                             ); // Debug  message
    grid.setWidget(y++,x,word                            ); // Saving notice
    /* --------------------------------------------- * / y=0;x++; // Next column /* --------------------------------------------- * /
    grid.setWidget(y++,x,pic                             ); // Load   graphic
    grid.setWidget(y++,x,b0                              ); // Submit button
 // grid.setWidget(y++,x,app.createLabel   ("Login"     ));
    grid.setWidget(y++,x,app.createLabel   ("Full name" ));
    grid.setWidget(y++,x,app.createLabel   ("Email"     ));
    grid.setWidget(y++,x,app.createLabel   ("Zip code"  ));
    grid.setWidget(y++,x,app.createLabel   ("Main phone"));
    grid.setWidget(y++,x,app.createLabel   ("Alt phone" ));
    grid.setWidget(y++,x,app.createLabel   ("Best time" ));
    /* --------------------------------------------- * / y=0;x++; // Next column /* --------------------------------------------- * /
                   y++; // Add cell to align
    grid.setWidget(y++,x,app.createCheckBox("Certified").setName("cert").setId("cert"));
 // grid.setWidget(y++,x,app.createTextBox ().setValue(user).setEnabled(false));
    grid.setWidget(y++,x,app.createTextBox ().setName("name"    ).setId("name"    ).setTitle("First + last"             )                 );
    grid.setWidget(y++,x,app.createTextBox ().setName("email"   ).setId("email"   ).setTitle("Client address"           )                 );
    grid.setWidget(y++,x,app.createTextBox ().setName("zip"     ).setId("zip"     ).setTitle("5-digits"                 ).setMaxLength( 5));
    grid.setWidget(y++,x,app.createTextBox ().setName("phone1"  ).setId("phone1"  ).setTitle("10-digits e.g. 2125551212").setMaxLength(10));
    grid.setWidget(y++,x,app.createTextBox ().setName("phone2"  ).setId("phone2"  ).setTitle("10-digits e.g. 2125551212").setMaxLength(10));
    grid.setWidget(y++,x,app.createListBox ().setName("besttime").setId("besttime").addItem ("-Select one-").setTitle("Best time of day to call")
                                                                                   .addItem ("Anytime"     )
                                                                                   .addItem ("Morning"     )
                                                                                   .addItem ("Afternoon"   )
                                                                                   .addItem ("Evening"     ));
    /* --------------------------------------------- * / y=0;x++; // Next column /* --------------------------------------------- * /
    y++;y++;y++;y++;y++;grid.setWidget(y++,x,dnc);return app;} // Do-Not-Call notice// Add cells to align // Display
function handleSubmitManage(e){
    app.close();return app;}
function manage(){
    var db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),u=db.query({table:"account",email:user}).next(),d=new Date().getTime(),avail,j,i,x,r,view=[],
        result=db.query({table:"refer",addedUser:user}).sortBy("addedDate",db.DESCENDING,db.NUMERIC);//avail=result.getSize();
    var app      = UiApp.createApplication();
    var form     = app.createFormPanel    ();
    var scr      = app.createScrollPanel  ().setSize("100%","5000");
    var vpan     = app.createVerticalPanel();//var acctSum=app.createLabel(u.count.balance+" balance, available "+avail).setTag(avail).setId("acctSum");vpan.add(acctSum);
    var tab      = app.createFlexTable    ().setBorderWidth(1);vpan.add(tab);scr.add(vpan);form.add(scr);app.add(form);
    var handler  = app.createServerHandler("handleSubmitArchive").addCallbackElement(vpan);
    var HEAD     = ["Timestamp","Full name","Email","Zip code","Main phone","Alt phone","Best time"/*,"Disposition","Paid"* /];
    var STYLPATT = ["white","white","white","white","#CCF8CC"/*"#B2F5B2"* /,"white","white","white"];var patlen=STYLPATT.length;         // Color pattern // www.w3schools.com/tags/ref_colorpicker.asp // #FF8C00 (darkorange), #FFE8CC (lighter shade)
    function writeHead(row,arr){var ii=arr.length;while(ii--){tab.setText          (row,ii,arr[ii]                    ) // Write header row
                                                                 .setStyleAttribute(row,ii,"backgroundColor","#00DD00")
                                                                 .setStyleAttribute(row,ii,"color"          ,"white"  )
                                                                 .setStyleAttribute(row,ii,"fontWeight"     ,"bold"   );}}
    j=0;while(result.hasNext()){if(j%patlen==0){writeHead(j,HEAD)}else{r=result.next(); // Start row counter // Load records // Write header row if proper spacing
        view=[(Math.floor((d-r.addedTime)/(1000*60*60*24))+" days ago"),r.name,r.email,r.zip,r.phone1,r.phone2,r.besttime];
        i=view.length;while(i--){x=view[i];tab.setWidget(j,i,app.createLabel(x)).setStyleAttribute(j,i,"backgroundColor",STYLPATT[j%patlen]);}}j++;}return app;}
End obso */