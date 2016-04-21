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
        ; if(user){u=LibraryjsUtil.dbParse("get","mojo","referral",{yEmail:user}).results[0];uynf=u.yNameFull?"value="+u.yNameFull:"";uync=u.yNameComp?"value="+u.yNameComp:"";uyp=u.yPhone?"value="+u.yPhone:"";}
  Logger.log("A: "+user);
  Logger.log("B: "+JSON.stringify(u));
  Logger.log("C: "+uyfn);
  Logger.log("D: "+uycn);
  Logger.log("E: "+uyp);
}*/
//function xdoPost(e){ScriptDb.getMyDb().save(e.parameters);/*return;*/var out=ContentService.createTextOutput();out.setContent(JSON.stringify(e.parameters));return out;} // CreditReady: userId=2472, pswd=p@ssword, url=https://secure.progrexion.com/fsaffiliates/creditready/ // https://developers.google.com/apps-script/uiapp?hl=en#doGetParams // https://developers.google.com/apps-script/content_service?hl=en // Example: // <SCRIPT URL>?start=1325437200&end=1325439000;new Date(Number(request.parameters.start)*1000);new Date(Number(request.parameters.end)*1000));
  function  doPost(e){ // function xdoPost(e){return ContentService.createTextOutput("Hello World"/*"User says: "+JSON.stringify(e)*/)} // e.postData.getDataAsString()
    if(e && e.parameter && e.parameter.k){var k=e.parameter.k,m=e.parameter.m,p=e.parameter;switch(k){
            case   /* receive from fci */ "36sgd2m257w2j0sn5isa" : return receiveScrape (p,"fciEx"     ) ; break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* receive from nmp */ "3w34xo2xeuyy8jprgmzg" : return receiveScrape (p,"noteMktPl" ) ; break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* receive from ml  */ "8u0hjrtbd68s3hi1w9kl" : return receiveScrape (p,"moolahList") ; break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
         default                                                 :                                       ; break;}}}
// function xdoGet (e){return ContentService.createTextOutput("Hello World")}
   function  doGet (e){ // References : https://developers.google.com/apps-script/uiapp, https://developers.google.com/apps-script/uiapp#ServerHandlers
    if(e && e.parameter && e.parameter.k){var k=e.parameter.k,m=e.parameter.m,p=e.parameter;switch(k){
          case   /* crm    serve           */ "q3d382ib85n0lsz4141w" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(serveCrm              ( )) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
            case   /* crm    receive         */ "gucz92r4k4l9dblje6j1" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(receiveCrm            (p)) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
         default                                                       : break;}}
  if(SitesApp.getActiveSite()){var siteName = SitesApp.getActiveSite().getName();switch(siteName){
            case   "mojocreditproject"             : 
          if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
                            case   "contact"       : return HtmlService.createTemplateFromFile  (       "refer.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                            case   "about"         : return HtmlService.createTemplateFromFile  (       "refer.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                            case   "results"       : return HtmlService.createTemplateFromFile  (     "results.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                            case   "freetrial"     : return HtmlService.createTemplateFromFile  (       "refer.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                            case   "home"          : return HtmlService.createTemplateFromFile  (       "refer.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                         // case   "home"          : return HtmlService.createHtmlOutputFromFile(       "refer.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
                            case   "stats"         : return HtmlService.createHtmlOutputFromFile(       "stats.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
                            case   "crm-qxdgbf12a" : return HtmlService.createHtmlOutputFromFile(         "crm.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
                            case   "account"       : return account   ();break;
                            case   "manage"        : return manage    ();break;
                            case   "authorize"     : return authorize ();break;
                         default                   :                    ;break;}}
            case   "creditrepairnation"            : // acquire inventory
          if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
                            case   "home"          : return HtmlService.createHtmlOutputFromFile(     "collect.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
             default                   :                    ;break;}}
         default                                   : break;}}}  
function updateDex(){if(LibraryjsUtil.dbParse("count","mojo","lead"  ,{"status": {"$exists":false}}).count>5){return}else{ // If there are fewer than x "unstatused" leads (i.e., low buffer/queue), fetch more leads
              var p=0,x=LibraryjsUtil.dbParse("get"  ,"mojo","market",{"$or"   :[{"fetched":false},{"fetched":{"$exists":false}}]}).results[0]; //function test(){Logger.log(LibraryjsUtil.dbParse("get"  ,"mojo","market",{"fetched":{"$exists":false}}).results[0])}
                        LibraryjsUtil.dbParse("put"  ,"mojo","market",x.objectId,{"fetched":true  });do{var loop=main_dex("mojo",x.link+"?st="+(30*(p++)))}while(loop)}return} //"http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-indianapolis-in/?st=60" //"http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-petersburg-in/" //"http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-indianapolis-in/?distance=0&sort=&view=list&where=Indianapolis%2C+IN&st=60&pageset=1"
function main_dex(client,act){ // Also check function of same name in SalesPro script // Scrapes page, adds labels, saves records, returns size of dataset to facilitate pagination inside a while loop // www.dexknows.com // Notes: 30 results per page - 4 rotating ads = 26 useable results // Reference: https://developers.google.com/apps-script/scriptdb // Increment "st" by 30 // URL shortened from act="http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-greenville-sc/?distance=0&sort=&view=list&where=Greenville%2C+SC&st=30&pageset=1";
  var keys,ob,nearby=[],user=Session.getUser().getEmail(),resp=UrlFetchApp.fetch(act).getContentText(),arr=resp.split("<ul class=\"linkList\"")[1].split("</ul>")[0].split("<li>").slice(1),data=resp.split("addPoint").slice(1)
    , FIELDS = ["index","latitude","longitude","id","name","type","street","city","state","zipcode","phone","profileurl","logolocation","encoded_businessid","websiteurl","dkid","dkitem","adgeoid","categoryprettyname"]
    , KEY = [ "" , "link"  , "label" ]
    , QUE = [ "" , "href=" , ""      ]
    , BEG = [ "" , "\""    , ">"     ]
    , END = [ "" , "\""    , "<"     ]
    ,temp,j,i=arr.length;while(i--){temp=LibraryjsUtil._scrapeDataset(arr[i],KEY,QUE,BEG,END);temp[KEY[1]]="http://www.dexknows.com"+temp[KEY[1]];
    if(!LibraryjsUtil.dbParse("count","mojo","market",{"link"/*KEY[1]*/:temp[KEY[1]]}).count){LibraryjsUtil.dbParse("post","mojo","market",temp)}}//;Logger.log(temp)//nearby.push(temp)}//Logger.log(nearby);
    i=data.length;while(i--){ob=JSON.parse(decodeURIComponent(data[i].scrape("","(",");")[1].replace("{","{\"").replaceAll("+"," ").replaceAll("parseFloat(","").replaceAll("parseInt(","").replaceAll("\",","\",\"").replaceAll(":\"","\":\"").replaceAll("),","),\"").replaceAll("\"),","\",").replaceAll("\",\" ","\",\""))); // (Below) If query finds a duplicate, skip saving via continue
    keys=Object.keys(ob);j=keys.length;while(j--){if(FIELDS.indexOf(keys[j])==-1){delete ob[keys[j]]}}ob.company=ob.name;delete ob.name;LibraryjsUtil.dbParse("post","mojo","lead",ob)}return data.length}//function test(){main_dex("mojo","http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-petersburg-in/")}//if(db.query({id:ob.id,phone:ob.phone,table:"leads",client:client}).getSize()){continue;}else{ob.source="dex";ob.addedUser=user;ob.disposition="active";ob.table="leads";ob.url=act;/*db.save*/Logger.log(JSON.stringify(ob))}}}//return [db.query({addedTime:ob.addedTime}).next().getId(),ob];} // Return [id,ob] // It is challenging to grab ob.id // db.query(ob) does not work; therefore, we query on ob.addedTime
function receiveRefer(ob){var i,keys,obj,VEND="efolks",cName=ob.cNameFull.split(" "),yName=ob.yNameFull.split(" "),user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null;if(user){ob.yEmail=user}ob.cNameFirst=cName[0];ob.cNameLast=cName[1];ob.yNameFirst=yName[0];ob.yNameLast=yName[1]; // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
    var saved=LibraryjsUtil.dbParse("post","mojo","referral",ob);ob.vendor=saved.objectId;var str=postLead(ob);obj=JSON.parse(('{"'+str.replace(/\n/gi,'","').replace(/:/gi,'":"')+'"}').replace(/,""}/gi,"}"));ob[VEND]=obj;keys=Object.keys(obj);i=keys.length;while(i--){ob[VEND+"_"+keys[i]]=obj[keys[i]]}LibraryjsUtil.dbParse("put","mojo","referral",saved.objectId,ob)}//Logger.log(saved)}//return Logger.log(JSON.stringify(ob))} // saved={objectId="CE05GdsyLR",createdAt=2014-07-16T06:45:19.526Z}
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
            , email         : ob.cEmail               // "testing-20140721-07@example.com"
            , zip           : ob.cZip                 // "84101"
         // , address1      : "123+anywhere+st."
            , daytime_phone : ob.cPhone               // "801-432-4321"
            }/*,out=*/;return UrlFetchApp.fetch(act+LibraryjsUtil.ob2httpGetParams(par)).getContentText()}//;Logger.log(out)} // sample from efolks: @return{str}: "uid:6d059020efcf4a7fbc30be9497aa1144,status:bad,test_mode:yes,details:Duplicate Submission,warning:ignoring_unknown_fields:extr_info,vendor:A123456,confirmation_code:2056898"
function submitProgrexion(ob){/*ob.affiliate_id="17199";ob.agreement="1";*/var ACT="https://script.google.com/macros/s/AKfycbwi_6ZFl43jCDL0I7ZuoGbCy5xeEUx95Vb-a5HAtr8ta85_00s/exec";ob.tid="2472.0.1";ob.traffic="ob";ob.notes="New lead!"/*"Test only"*/;ob.remote_addr="66.102.15.255";ob.referrer="66.102.0.0";ob.return_type="xml"/*simple,query_string*/;/*ob.postback="";*/ob.returns_url=ACT;ob.sales_url=ACT; // Google IP addys: https://developers.google.com/apps-script/jdbc#accessing // Progrexion documentation https://docs.google.com/file/d/1m_556U2BGOmt0zui8OdYuC0a4AFsIkznTRqJdTgnA4gDzDu3BJOYwCg1Ssqh/edit
   var response=UrlFetchApp.fetch(/*"https://secure.progrexion.com/fsaffiliates/referral.html"*/"http://www.lexingtonlaw.com/_pub/leads/realtime.php",{method:"post",payload:ob});ob.submit=Xml.parse(response.getContentText(),true);ob.submitCode=response.getResponseCode(); // Reference: https://docs.google.com/open?id=1m_556U2BGOmt0zui8OdYuC0a4AFsIkznTRqJdTgnA4gDzDu3BJOYwCg1Ssqh // https://developers.google.com/apps-script/class_xml#parse // https://developers.google.com/apps-script/articles/XML_tutorial
   return ob; // Submit lead to Progrexion // Success if response = 200 // Initialize options + exectute HTTP request (POST) // Reference: https://developers.google.com/apps-script/class_urlfetchapp#fetch
    // --- Below this line is non-integrated site --- Code commented out implements submissions to non-integrated site
    //          0         1           2          3           4         5              6           7      8         9 no               10    11 ok        12 ok       13 ok        14 ok            15               16 ok                                                         17           18      19         20       21                     22 ok             23      24         25         26      27            28 no
    // var PAR=["address","aff_email","aff_name","aff_state","aff_zip","affiliate_id","agreement","city","company","email"           ,"ext","first_name","last_name","main_phone","main_phone_ext","main_phone_ext","notes"                                                      ,"payable_to","phone","position","posted","refer_clients_period","secondary_phone","state","submit.x","submit.y","taxid","website_url","zip"  ];
    // var val=[""       ,""         ,""        ,""         ,""       ,"15997"       ,"1"        ,""    ,""       ,"test%40atlas.com",""   ,"Testatlas" ,"Testatlas","1234567888","99999"         ,"88888"         ,"This+is+a+test.+This+is+only+a+test.+Please+do+not+respond.",""          ,""     ,""        ,"true"  ,""                    ,"1234567899"     ,"AL"   ,"52"      ,"26"      ,""     ,""           ,"12345"];
    // var val=[""       ,""         ,""        ,""         ,""       ,"17199"       ,"1"        ,""    ,""       ,"test%40atlas.com",""   ,"Testatlas" ,"Testatlas","1234567888","99999"         ,"88888"         ,"This+is+a+test.+This+is+only+a+test.+Please+do+not+respond.",""          ,""     ,""        ,"true"  ,""                    ,"1234567899"     ,"AL"   ,"52"      ,"26"      ,""     ,""           ,"12345"];
    // ID#   Pswd      Status  Type       URL
    // 2472  p@ssword  ACTIVE  Production https://tracking.lexingtonlaw.com/reports/main/  // Liz Helm 801-384-4181
    // 15997 RZFBSm    DEFUNCT Live       https://secure.progrexion.com/fsaffiliates/referral.html
    // 17199 Troy17199 DEFUNCT Test       https://secure.progrexion.com/fsaffiliates/referral.html
    // submit@ POST https://secure.progrexion.com/fsaffiliates/referral.html // login@ POST https://secure.progrexion.com/fsaffiliates/?agent_id=15997&agent_pw=RZFBSm
    // Params: address&=aff_email&=aff_name=&aff_state=&aff_zip=&affiliate_id=15997&agreement=1&city=&company=&email=test@testonly.com&ext=&first_name=Testfirst&last_name=Testlast&main_phone=1234567888&main_phone_ext=99999&main_phone_ext=88888&notes=This+is+a+test.+This+is+only+a+test.+Please+do+not+respond.&payable_to=&phone=&position=&posted=true&refer_clients_period=&secondary_phone=1234567899&state=AL&submit.x=52&submit.y=26&taxid=&website_url=&zip=12345&
    // Source: posted=true&affiliate_id=15997&first_name=Testfirst&last_name=Testlast&state=AL&zip=12345&main_phone=1234567888&main_phone_ext=99999&secondary_phone=1234567899&main_phone_ext=88888&email=test%40testonly.com&notes=This+is+a+test.+This+is+only+a+test.+Please+do+not+respond.&agreement=1&aff_name=&company=&position=&refer_clients_period=&address=&city=&aff_state=&aff_zip=&phone=&ext=&aff_email=&website_url=&payable_to=&taxid=&submit.x=52&submit.y=26
}
function fetchResults_Progrexion(){var temp    =UrlFetchApp.fetch("https://secure.progrexion.com/fsaffiliates/"+"index.html"/*+"?redirect_on_login=/fsaffiliates/client-referrals.html"*/,{method:"post",payload:"agent_id=2472&agent_pw=p@ssword",/*p%40ssword*//*followRedirects:false,* /muteHttpExceptions:true,*/validateHttpsCertificates:false,contentType:/*"application/x-www-form-urlencoded"*/"application/xml; charset=utf-8"});Logger.log("TempHeaders: "+temp.getAllHeaders().toSource());Logger.log("TempBody: "+temp.getContentText());
                                   var response=UrlFetchApp.fetch("https://secure.progrexion.com/fsaffiliates/client-referrals.html",{method:"get",/*followRedirects:false,*/muteHttpExceptions:true,validateHttpsCertificates:false,contentType:/*"application/x-www-form-urlencoded"*/"application/xml; charset=utf-8",headers:{Cookie:temp.getHeaders()["Set-Cookie"]}});Logger.log("RespHeaders: "+response.getHeaders().toSource());Logger.log("RespBody: "+response.getContentText());}
function sendInvite(ob){var /*name=ob.nameFull.split(" "),*/user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null;/*SitesApp.getActiveSite().addViewer(ob.email);*/MailApp.sendEmail({name:"Mojo",to:ob.email,subject:"Credit Repair",htmlBody:"Please <a href='https://sites.google.com/site/mojocreditproject/'>visit us</a>."});if(user){ob.owner=user}/*ob.nameFirst=name[0];ob.nameLast=name[1];*/LibraryjsUtil.dbParse("post","mojo","invitation",ob);return} // Example: @return{objectId="CE05GdsyLR",createdAt=2014-07-16T06:45:19.526Z} // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
function receiveCrm(p){if(p.emailSend=="true"){try{sendInvite({email:p.email})}catch(e){Logger.log(e.message)}}var str=p.item;delete p.k;delete p.item;LibraryjsUtil.dbParse("put","mojo","lead",str,p);updateDex();return}//p=p||{item:"q4JyH1W",email:"bruce.p.nolan@gmail.com"};/*Logger.log(JSON.stringify(p));*/var db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),t=new Date().getTime()
function serveCrm(){var r,ob=[],d=new Date(),t=d.getTime(),user=Session.getUser().getEmail(),arr=LibraryjsUtil.dbParse("get","mojo","lead"/*,{owner:user}*/).results,i=arr.length,out={"totalResultsCount":i+1,"records":[]};while(i--){out.records[i]={};r=arr[i];
  ob[i] = {
    "nolink"                         : {
        "item"                   : function(){try{return            r.objectId              }catch(e){Logger.log(e.message);return "";}}() //
      , "company"                : function(){try{return            r.company               }catch(e){Logger.log(e.message);return "";}}() //
      , "dateFollowup"           : function(){try{return            r.dateFollowup          }catch(e){Logger.log(e.message);return "";}}() //
      , "email"                  : function(){try{return            r.email                 }catch(e){Logger.log(e.message);return "";}}() //
      , "emailSend"              : function(){try{return              false                 }catch(e){Logger.log(e.message);return "";}}() //
      , "name"                   : function(){try{return            r.name                  }catch(e){Logger.log(e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
      , "notes"                  : function(){try{return            r.notes                 }catch(e){Logger.log(e.message);return "";}}() //
      , "phone"                  : function(){try{return            r.phone                 }catch(e){Logger.log(e.message);return "";}}() //
      , "status"                 : function(){try{return            r.status                }catch(e){Logger.log(e.message);return "";}}() //
      , "timeZone"               : function(){try{return            r.timeZone              }catch(e){Logger.log(e.message);return "";}}() //
                       }
  , "link"                         : {}
  }
  var keys=Object.keys(ob[i].nolink),z=keys.length;while(z--){out.records[i][keys[z]]=              ob[i].nolink[keys[z]]                                   }
      keys=Object.keys(ob[i].  link),z=keys.length;while(z--){out.records[i][keys[z]]='<a href="' + ob[i].  link[keys[z]] + '" target="_blank">&#10151;</a>'}//Logger.log(JSON.stringify(out.records[i]));
  }return out}//Logger.log(JSON.stringify(out))}
-------------------------------------- form.html (a template kit for implementing forms; must be unpacked) --------------------------------------
function processForm(formObject){var formBlob=formObject.myFile,driveFile=DriveApp.createFile(formBlob);return driveFile.getUrl()} // Goes in Code.gs // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
<form id="myForm"><input name="myFile" type="file"><input type="button" value="Submit" onclick="google.script.run.withSuccessHandler(updateUrl).processForm(this.parentNode);this.parentNode.reset()"></form><div id="output"></div><script>function updateUrl(url){document.getElementById("output").innerHTML='<a href="'+url+'">Got it!</a>'}</script><!--Goes in index.html; Reference: https://developers.google.com/apps-script/guides/html/communication#forms-->
-------------------------------------- crm.html --------------------------------------
<!DOCTYPE html><html style="text-align:center;font-family:arial;font-size:100%;color:#777777;">
<head>
    <meta charset="utf-8"/> <!--Improve search box: http://view.jquerymobile.com/1.4.0/demos/controlgroup/#Textinputs -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"> <!-- Latest compiled and minified CSS --> <!-- http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css --> <!-- Color definitions: http://getbootstrap.com/customize/#colors | Blue:#428bca(hover:#3071a9) -->
<!--<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css"> <!-- Optional theme -->
<!--<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons.css"> <!-- Google styles | Reference: https://developers.google.com/apps-script/add-ons/css -->
<!--<link rel="stylesheet" href="https://googledrive.com/host/0B1LVOoV_2dFtMzM0LXE2QTU4b1E"><!--Tables-->
    <style>
    /*  form       {xbackground:grey;padding:6px;xborder:2px solid #DDDDDD;border-radius:8px;}
        html       {text-align:center;font-family:arial;font-size:100%;color:#888888;}
        legend     {color:#888888;xtext-align:left}
	    table      {border-collapse:separate;border-spacing:15px;}
	    td         {color:#888888;vertical-align:top;text-align:center;padding:20px;border-radius:30px;border:8px solid #000000}
	    col-sm-1   {padding:10px}
	    sup        {font-style:italic;text-decoration:underline}
		input.text {color:#008800;xheight:100px;font-size: 90%;padding:10px 20px;xborder:1px solid #00DD00;border-radius:999px;}
		input.btn  {background:#00dd00;font-size:100%;color:white;font-weight:bold;border-radius:999px;padding:10px 20px;display:inline-block;width:400px;}
    */  input      {padding:7px 10px;border-radius:5px;margin-bottom:3px;xcolor-blue-button-primary:#428bca;xcolor-blue-button-hover:#3071a9;xcolor:#006dcc;xcolor:#0044cc;xcolor:#3e0901;xheight:100px;xfont-size:150%;xborder:5px solid #3e0901;}
    </style>
</head>
<body><div style="width:400px;margin:0 auto;xtext-align:left">
    <form id="referral" style="xbackground:grey;xpadding:6px;xborder:2px solid #DDDDDD;border-radius:8px;"><!--References: https://developers.google.com/apps-script/guides/html-service-communication#forms https://developers.google.com/apps-script/guides/html-service-communication#user_objects-->
        <input type="text"  id="name"  name="name"  placeholder="Name"   title="Prospect’s full first and last names. Example: John Doe, III"     >
        <input type="text"  id="email" name="email" placeholder="Email"  title="Prospect’s email address. Example: johndoe@example.com"           >
    <!--<input type="text"  id="phone" name="phone" placeholder="Phone"  title="Prospect phone number. Numbers only is fine. Example: 5555551212" > -->
	<br><input type="button" class="btn btn-block btn-primary" xclass="blue|#428bca" value="Send invitation" onclick="myFunction();"> <!-- Reference: http://stackoverflow.com/questions/5462251/button-width-in-css3 -->
	</form></div>
<script>
function onFailure(e){alert(e.message)}function onSuccess(){}//document.getElementById("result").innerHTML=str}//iframe doesn't work bc get request is only sent on page load. So we have the user click a link. //"<iframe src='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00' width='1200' height='1200'></iframe>"}//alert(/*"Input received!"* /document.getElementById("address").value)}
function myFunction(){//alert(/*document.forms["referral"]["cFullName"].value/*"Hello world"*/);document.forms["referral"]/*getElementById("referral")*/.reset();}//;document.getElementById("result").innerHTML="<img src='https://lh4.googleusercontent.com/-S3rRVyRoXeA/U62uSnnsXLI/AAAAAAAAMA4/N10K1jdADPY/s800/ajax-loader.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).receiveInvite(this.parentNode);this.parentNode.reset()}//document.getElementById("address").value)}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
</script></body></html>
-------------------------------------- refer.html --------------------------------------
<!DOCTYPE html><html><head>
    <meta charset="utf-8"/> <!--Improve search box: http://view.jquerymobile.com/1.4.0/demos/controlgroup/#Textinputs -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"> <!-- Latest compiled and minified CSS --> <!-- http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css --> <!-- Color definitions: http://getbootstrap.com/customize/#colors | Blue:#428bca(hover:#3071a9) -->
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
    */  input    {padding:7px 10px;border-radius:5px;margin-bottom:3px;xcolor-blue-button-primary:#428bca;xcolor-blue-button-hover:#3071a9;xcolor:#006dcc;xcolor:#0044cc;xcolor:#3e0901;xheight:100px;xfont-size:150%;xborder:5px solid #3e0901;}
    </style>
</head>
<body><?var uynf="",uync="",uyp="",user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null,p=user?("value='"+user+"' disabled"):"placeholder='Your email'"
          ; try{if(user){u=LibraryjsUtil.dbParse("get","alpha","referral",{yEmail:user}).results[0]}}catch(e){Logger.log(e.message)}try{uynf=u.yNameFull?"value='"+u.yNameFull+"'":""}catch(e){}try{uync=u.yNameComp?"value='"+u.yNameComp+"'":""}catch(e){}try{uyp=u.yPhone?"value='"+u.yPhone+"'":""}catch(e){}?>
  <div style="width:790px;margin:0 auto;xtext-align:left">
    <form id="referral" style="xbackground:grey;xpadding:6px;xborder:2px solid #DDDDDD;border-radius:8px;"><!--References: https://developers.google.com/apps-script/guides/html-service-communication#forms https://developers.google.com/apps-script/guides/html-service-communication#user_objects-->
        <input type="text" id="cNameFull" name="cNameFull" placeholder="Customer name"            title="Your customer’s full first and last names. Example: John Doe, III" >
        <input type="text" id="cEmail"    name="cEmail"    placeholder="Customer email"           title="Your customer’s email address. Example: johndoe@example.com"       >
        <input type="text" id="cZip"      name="cZip"      placeholder="Customer zip"             title="Your customer’s 5-digit zip code. Example: 02139"                  >
        <input type="text" id="cPhone"    name="cPhone"    placeholder="Customer phone"           title="Best phone number to reach customer. Example: 555-555-1212"        > <!--<br><input type="text"   style="color:#888888;xheight:100px;font-size:100%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="35" id="phoneEve" name="phoneEve" placeholder="2nd phone" title="Alternate phone number to reach customer. Example: 555-555-1212" > -->
    <br><input type="text" id="yNameFull" name="yNameFull" placeholder="Your name"     <?!=uynf?> title="Your full first and last names. Example: John Doe, III"            >
        <input type="text" id="yEmail"    name="yEmail"                                <?!=p?>    title="Your email address. Example: johndoe@example.com"                  >
        <input type="text" id="yNameComp" name="yNameComp" placeholder="Company name"  <?!=uync?> title="The name of your company. Example: Ace Finance, Inc."              >
        <input type="text" id="yPhone"    name="yPhone"    placeholder="Company phone" <?!=uyp?>  title="Your company phone number. Example: 555-555-1212"                  > <!--<br><input type="text"   style="color:#888888;xheight:100px;font-size:100%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="35" id="phoneEve" name="phoneEve" placeholder="2nd phone" title="Alternate phone number to reach customer. Example: 555-555-1212" > // Reference: http://stackoverflow.com/questions/1994406/set-image-as-submit-button // Works on jsfiddl.net but not GAS -->
<!--<br><input type="image" xtype="button" xvalue="submit" onclick="myFunction()" xstyle="font-size:90%;xpadding:15px;xborder-radius:999px;" xsize="100%" src="https://lh5.googleusercontent.com/-eXPQU0DYMXk/U7ZlT3QLazI/AAAAAAAAMGc/aNES2fQIdUs/s800/button.png"                                         > -->
    <br><input type="button" class="btn btn-block btn-primary" xclass="blue|#428bca" value="Submit turndown and fix credit" onclick="myFunction();" title="Mr. Customer, unfortunately our loan requests were declined today due to your credit score. But we do have a solution. I can send your name and phone number to a licensed attorney who specializes in helping people repair their credit. They are very good at what they do and they can work on getting your score cleaned up so you can come back and buy this [car|house|other] soon. Does that sound good to you? — You may also make the following points: 1. There are fees for services. 2. Client must have an active card (credit or debit) and/or bank account (checking or savings) to make payment. 3. A paralegal will call soon."> <!-- $99 first-work fee & applicable monthly fee thereafter.  --> <!-- Reference: http://stackoverflow.com/questions/5462251/button-width-in-css3 -->
	</form></div>
<script>
function onFailure(e){alert(e.message)}function onSuccess(){}//document.getElementById("result").innerHTML=str}//iframe doesn't work bc get request is only sent on page load. So we have the user click a link. //"<iframe src='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00' width='1200' height='1200'></iframe>"}//alert(/*"Input received!"* /document.getElementById("address").value)}
function myFunction(){//alert(/*document.forms["referral"]["cFullName"].value/*"Hello world"*/);document.forms["referral"]/*getElementById("referral")*/.reset();}//;document.getElementById("result").innerHTML="<img src='https://lh4.googleusercontent.com/-S3rRVyRoXeA/U62uSnnsXLI/AAAAAAAAMA4/N10K1jdADPY/s800/ajax-loader.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).receiveRefer(this.parentNode);this.parentNode.reset()}//document.getElementById("address").value)}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
</script></body></html>
-------------------------------------- results.html --------------------------------------
<!--NOTE: k=fkpmzd4cfq68daws8czk is the unique key for jqxGrid; however, we will hard code the HTML table in GAS .html file and store locally rather than going thru jqxGrid because jqxGrid is not compatible with IExplorer and we must support the browsers of all our clients-->
<!DOCTYPE html><html style="text-align:left;font-family:arial;font-size:100%;color:#777777;"><head><meta charset="utf-8"/></head>
<body><div style="text-align:center;font-size:200%;color:#428bca;font-weight:900">My referrals</div>
    <?var r,user=Session.getUser().getEmail(),arr=LibraryjsUtil.dbParse("get","mojo","referral",{yEmail:user}).results,i=arr.length;?>
    <table style="margin:0px auto">
	    <thead>
		    <th style="padding:10px;text-align:center">Name</th>
		    <th style="padding:10px;text-align:center">Email</th>
		</thead>
	    <tbody><?while(i--){r=arr[i];?>
	        <tr>
	            <td style="padding:10px;font-size:85%"><?=r.cNameFull?></td>
	            <td style="padding:10px;font-size:85%"><?=r.cEmail   ?></td>
	        </tr><?}?>
	    </tbody>
	</table>
</body></html>
-------------------------------------- stats.html --------------------------------------
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>
      Google Visualization API Sample
    </title>
	<style>
        xinput   {padding:7px 10px;border-radius:5px;margin-bottom:3px;xcolor-blue-button-primary:#428bca;xcolor-blue-button-hover:#3071a9;xcolor:#006dcc;xcolor:#0044cc;xcolor:#3e0901;xheight:100px;xfont-size:150%;xborder:5px solid #3e0901;}
        x#vispie {width:600px;height:400px;}
		td       {text-align:center}
	   .d1       {color:#888888;width:25%;vertical-align:top;padding:15px;border-radius:30px;border:10px solid #428bca}
	   .d2       {color:#428bca;font-size:500%;font-weight:900}
    </style>
    <script type="text/javascript" src="//www.google.com/jsapi"></script>
    <script type="text/javascript">
      google.load('visualization', '1', {packages: ['corechart']});
    </script>
    <script type="text/javascript">
      function drawVisualization() {
        // Create and populate the data table.
        var dataCol = google.visualization.arrayToDataTable([
            ['Year'  , 'Items removed' ]
        ,   ['2002'  ,   269196        ]
        ,   ['2003'  ,   354714        ]
        ,   ['2004'  ,   585214        ]
        ,   ['2005'  ,   667366        ]
        ,   ['2006'  ,   609443        ]
        ,   ['2007'  ,   602879        ]
        ,   ['2008'  ,   665515        ]
        ,   ['2009'  ,  1013469        ]
        ,   ['2010'  ,  1297226        ]
        ,   ['2011'  ,  2548948        ]
        ,   ['2012'  ,  3347490        ]
        ,   ['2013'  ,  4833329        ]
        ]);
		var dataPie0 = google.visualization.arrayToDataTable([
            ['Type'                ,  'Count' ]
        ,   ['Enrolled'            ,      65  ]
        ,   ['Not enrolled'        ,     935  ]
        ]);
		var dataPie1 = google.visualization.arrayToDataTable([
            ['Type'                ,  'Count' ]
        ,   ['Removed'             ,  4534593 ]
        ,   ['Not removed'         , 12260196 ]
        ]);
		var dataPie2 = google.visualization.arrayToDataTable([
            ['Type'                ,  'Count' ]
        ,   ['Collection'          ,   923148 ]
        ,   ['Slowpay'             ,   210539 ]
        ,   ['Chargeoff'           ,   121372 ]
        ,   ['Bankruptcy'          ,    58609 ]
        ,   ['Settlement'          ,    28677 ]
        ,   ['Judgment'            ,    28292 ]
        ,   ['Lien'                ,    13631 ]
        ,   ['Repossession'        ,     5168 ]
        ,   ['Foreclosure'         ,     3282 ]
        ,   ['Negative'            ,     1539 ]
        ,   ['Civil claim'         ,      509 ]
        ,   ['Acct in counseling'  ,      319 ]
        ,   ['Garnishment'         ,       50 ]
        ]);
        new google.visualization./*Column*/AreaChart(document.getElementById('visCol' )).draw(dataCol ,{xtheme:"maximized",width:1100,height:600,title:"Items removed each year",hAxis:{title:"Year"},colors:["#428bca"],lineWidth:8/*12*/,pointSize:0/*25*/,animation:{duration:1000,easing:"inAndOut"}});
        new google.visualization.PieChart           (document.getElementById('visPie0')).draw(dataPie0,{xtheme:"maximized",width: 600,height:400,title:"Enrollment as a pct% of all referrals",pieHole:0.5,animation:{duration:1000,easing:"inAndOut"},colors:["#428bca","#3071a9"]});
        new google.visualization.PieChart           (document.getElementById('visPie1')).draw(dataPie1,{xtheme:"maximized",width: 600,height:400,title:"Items removed as pct% of all negative items",pieHole:0.5,animation:{duration:1000,easing:"inAndOut"},colors:["#428bca","#3071a9"]});
        new google.visualization.PieChart           (document.getElementById('visPie2')).draw(dataPie2,{xtheme:"maximized",width: 600,height:400,title:"Items removed by type (4Q2013)",pieHole:0.5,animation:{duration:1000,easing:"inAndOut"},colors:["#070E14","#142A3D","#214665","#2E618D","#356FA2","#3B7DB6","#428bca","#5597CF","#68A2D5","#7BAEDA","#8EB9DF","#A0C5E4","#B3D1EA"]});
		}
      google.setOnLoadCallback(drawVisualization);
    </script>
  </head>
  <body style="font-family:Arial;border:0 none;">
	<table style="border-collapse:separate;border-spacing:10px;"><tbody>
			      <tr><td class="d1"><div class="d2">24</div>attorneys in our network</td>
	                  <td class="d1"><div class="d2">19</div>states spanned by<br>our attorney network</td>
	                  <td class="d1"><div class="d2">50</div>states served by<br>our attorney network</td>
					  <td class="d1"><div class="d2">200+</div>paralegals, agents and personnel<br>in our attorney network</td>
			 </tr><tr><td class="d1"><div class="d2">1991</div>year our attorney network<br>was founded</td>
                      <td class="d1"><div class="d2">500k</div>total clients</td>
	                  <td class="d1"><div class="d2">10.2</div>average negative items<br>removed per client</td>
	                  <td class="d1"><div class="d2">122</div>average days<br>to remove negative items</td>
             </tr></tbody></table>
	<table border="0"><tbody><tr><td width="50%"              ><div id="visPie0"></div></td>
	                             <td width="50%"              >To be filled in later.</td></tr>
						     <tr><td width="50%"              ><div id="visPie1"></div></td>
	                             <td width="50%"              ><div id="visPie2"></div></td></tr>
                             <tr><td width="100%" colspan="2" ><div id="visCol" ></div></td></tr></tbody></table>
  </body>
</html>
-------------------------------------- collect.html --------------------------------------
<!DOCTYPE html><html style="text-align:center;font-family:arial;font-size:100%;color:#777777;"><head><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><!-- Publicly viewable lead collector -->
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
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).receiveRefer(this.parentNode);this.parentNode.reset()}//**IMPORTANT**“this” gets the “name” property of the parent element, i.e., the form tag/element. In order to use the “this.parnentNote” method (as opposed to the document.getElementById() method) verify the form element has a proper “name” property. Otherwise, the function will fail “silently.”//document.getElementById("address").value)}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
</script></body></html>
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