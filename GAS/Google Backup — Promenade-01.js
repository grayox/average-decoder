function auth    (){}
function timer   (){Logger.log(new Date().getTime())}//1388228703613
function backup  (){var desc="Promenade™ Backup — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({});while(results.hasNext()){out.unshift(results.next())}id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);}
function print_dbScript(){var desc="Promenade™ Print — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({table:"note"});while(results.hasNext()){out.unshift(results.next())}id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);}
function print(str,desc){str=str||JSON.stringify(ScriptDb.getMyDb().load("S337185323966"));desc=desc||"Promenade™ Print — timestamp:"+new Date().getTime();DriveApp.createFile(desc,str,MimeType.HTML);}
function size    (){var db=ScriptDb.getMyDb();Logger.log(/*ScriptDb.getMyDb()*/db.query({}).getSize());}
function showById(){Logger.log(JSON.stringify(ScriptDb.getMyDb().load("S96280679164")))} // Show one record by ID
function showOne (){Logger.log(/*Utilities.jsonStringify*/JSON.stringify(ScriptDb.getMyDb().query({item:"eXjKqn1"/*/table:"note"/* /"user",user:"atlaslive@gmail.com",seller:true/*,city:"test"*/}).next()));} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function showAll (){var db=ScriptDb.getMyDb(),r,results=db.query({});while(results.hasNext()){r=results.next();Logger.log(/*Utilities.jsonStringify*/JSON.stringify(r));return arr}} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
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
            case   "sofastratcalc"                 : 
					if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
                            case   "company"       : return HtmlService.createTemplateFromFile  (       "refer.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                            case   "results"       : return HtmlService.createTemplateFromFile  (     "results.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                            case   "freetrial"     : return HtmlService.createTemplateFromFile  (       "refer.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                         // case   "home"          : return HtmlService.createTemplateFromFile  (       "stats.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                            case   "home"          : return HtmlService.createHtmlOutputFromFile(       "index.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
                            case   "dashboard"     : return HtmlService.createHtmlOutputFromFile(        "dash.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
                            case   "gallery"       : return HtmlService.createHtmlOutputFromFile(     "gallery.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
                            case   "scenarios"     : return HtmlService.createTemplateFromFile  (   "scenarios.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                            case   "managers"      : return HtmlService.createTemplateFromFile  (    "managers.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                            case   "invite"        : return HtmlService.createTemplateFromFile  (      "invite.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                            case   "account"       : return account   ();break;
                            case   "manage"        : return manage    ();break;
                            case   "authorize"     : return authorize ();break;
                         default                   :                    ;break;}}
            case   "creditrepairnation"            : // acquire inventory
					if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
                            case   "home"          : return HtmlService.createHtmlOutputFromFile(     "collect.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
						 default                   :                    ;break;}}
         default                                   : break;}}}	
function getBenchmarksSS2csv(){return LibraryjsUtil.getBenchmarksSS2csv()}
function receiveInvite(ob){var /*name=ob.nameFull.split(" "),*/user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null;/*SitesApp.getActiveSite().addViewer(ob.email);*/MailApp.sendEmail({name:"Mojo",to:ob.email,subject:"Credit Repair",htmlBody:"Please <a href='https://sites.google.com/site/mojocreditproject/'>visit us</a>."});if(user){ob.owner=user}/*ob.nameFirst=name[0];ob.nameLast=name[1];*/LibraryjsUtil.dbParse("post","mojo","invitation",ob)} // Example: @return{objectId="CE05GdsyLR",createdAt=2014-07-16T06:45:19.526Z} // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
function receiveCrm(p){if(p.emailSend){return receiveInvite({email:p.email})}else{var str=p.item;delete p.k;delete p.item;return LibraryjsUtil.dbParse("put","mojo","lead",str,p)}}//p=p||{item:"q4JyH1W",email:"bruce.p.nolan@gmail.com"};/*Logger.log(JSON.stringify(p));*/var db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),t=new Date().getTime()
function serveCrm(){var r,ob=[],d=new Date(),t=d.getTime(),user=Session.getUser().getEmail(),arr=LibraryjsUtil.dbParse("get","mojo","lead"/*,{owner:user}*/).results,i=arr.length,out={"totalResultsCount":i+1,"records":[]};while(i--){out.records[i]={};r=arr[i];
	ob[i] = {
		"nolink"                         : {
				"item"                   : function(){try{return            r.objectId              }catch(e){Logger.log(e.message);return "";}}() //
			,	"company"                : function(){try{return            r.company               }catch(e){Logger.log(e.message);return "";}}() //
			,	"dateFollowup"           : function(){try{return            r.dateFollowup          }catch(e){Logger.log(e.message);return "";}}() //
			,	"email"                  : function(){try{return            r.email                 }catch(e){Logger.log(e.message);return "";}}() //
			,	"emailSend"              : function(){try{return              false                 }catch(e){Logger.log(e.message);return "";}}() //
			,	"name"                   : function(){try{return            r.name                  }catch(e){Logger.log(e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
			,	"notes"                  : function(){try{return            r.notes                 }catch(e){Logger.log(e.message);return "";}}() //
			,	"phone"                  : function(){try{return            r.phone                 }catch(e){Logger.log(e.message);return "";}}() //
			,	"status"                 : function(){try{return            r.status                }catch(e){Logger.log(e.message);return "";}}() //
			,	"timeZone"               : function(){try{return            r.timeZone              }catch(e){Logger.log(e.message);return "";}}() //
										   }
	,	"link"		                     : {}
	}
	var keys=Object.keys(ob[i].nolink),z=keys.length;while(z--){out.records[i][keys[z]]=              ob[i].nolink[keys[z]]                                   }
	    keys=Object.keys(ob[i].  link),z=keys.length;while(z--){out.records[i][keys[z]]='<a href="' + ob[i].  link[keys[z]] + '" target="_blank">&#10151;</a>'}//Logger.log(JSON.stringify(out.records[i]));
	}return out}//Logger.log(JSON.stringify(out))}
-------------------------------------- form.html (a template kit for implementing forms; must be unpacked) --------------------------------------
function processForm(formObject){var formBlob=formObject.myFile,driveFile=DriveApp.createFile(formBlob);return driveFile.getUrl()} // Goes in Code.gs // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
<form id="myForm"><input name="myFile" type="file"><input type="button" value="Submit" onclick="google.script.run.withSuccessHandler(updateUrl).processForm(this.parentNode);this.parentNode.reset()"></form><div id="output"></div><script>function updateUrl(url){document.getElementById("output").innerHTML='<a href="'+url+'">Got it!</a>'}</script><!--Goes in index.html; Reference: https://developers.google.com/apps-script/guides/html/communication#forms-->
-------------------------------------- gallery.html <!-- See file sofaCharts-xx --> --------------------------------------
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>
      Data Charts
    </title>
    <script type="text/javascript" src="//www.google.com/jsapi"></script>
    <script type="text/javascript">
      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Dinosaur', 'Length'],
          ['Acrocanthosaurus (top-spined lizard)', 12.2],
          ['Albertosaurus (Alberta lizard)', 9.1],
          ['Allosaurus (other lizard)', 12.2],
          ['Apatosaurus (deceptive lizard)', 22.9],
          ['Archaeopteryx (ancient wing)', 0.9],
          ['Argentinosaurus (Argentina lizard)', 36.6],
          ['Baryonyx (heavy claws)', 9.1],
          ['Brachiosaurus (arm lizard)', 30.5],
          ['Ceratosaurus (horned lizard)', 6.1],
          ['Coelophysis (hollow form)', 2.7],
          ['Compsognathus (elegant jaw)', 0.9],
          ['Deinonychus (terrible claw)', 2.7],
          ['Diplodocus (double beam)', 27.1],
          ['Dromicelomimus (emu mimic)', 3.4],
          ['Gallimimus (fowl mimic)', 5.5],
          ['Mamenchisaurus (Mamenchi lizard)', 21.0],
          ['Megalosaurus (big lizard)', 7.9],
          ['Microvenator (small hunter)', 1.2],
          ['Ornithomimus (bird mimic)', 4.6],
          ['Oviraptor (egg robber)', 1.5],
          ['Plateosaurus (flat lizard)', 7.9],
          ['Sauronithoides (narrow-clawed lizard)', 2.0],
          ['Seismosaurus (tremor lizard)', 45.7],
          ['Spinosaurus (spiny lizard)', 12.2],
          ['Supersaurus (super lizard)', 30.5],
          ['Tyrannosaurus (tyrant lizard)', 15.2],
          ['Ultrasaurus (ultra lizard)', 30.5],
          ['Velociraptor (swift robber)', 1.8]]);

        var options = {
          title: 'Lengths of dinosaurs, in meters',
          legend: { position: 'none' },
        };

        var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
    </script>
  </head>
  <body>
    <div id="chart_div" style="width: 900px; height: 500px;"></div>
<script src="//code.jquery.com/jquery.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src="//www.fuelcdn.com/fuelux/3.2.1/js/fuelux.min.js"></script>
  </body>
</html>
-------------------------------------- dash.html --------------------------------------
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>
      Data Charts
    </title>
    <script type="text/javascript" src="//www.google.com/jsapi"></script>
    <script type="text/javascript">
      google.load('visualization', '1', {packages: ['corechart']});
    </script>
    <script type="text/javascript">
      function drawVisualization() {
        // Create and populate the data table.
        var dataCol = google.visualization.arrayToDataTable([
          ['Year'  , 'Items removed' ],
          ['2002'  ,   269196        ] ,
          ['2003'  ,   354714        ] ,
          ['2004'  ,   585214        ] ,
          ['2005'  ,   667366        ] ,
          ['2006'  ,   609443        ] ,
          ['2007'  ,   602879        ] ,
          ['2008'  ,   665515        ] ,
          ['2009'  ,  1013469        ] ,
          ['2010'  ,  1297226        ] ,
          ['2011'  ,  2548948        ] ,
          ['2012'  ,  3347490        ] ,
          ['2013'  ,  4833329        ] ,
        ]);
		var dataPie0 = google.visualization.arrayToDataTable([
          ['Type'                ,  'Count' ] ,
          ['Enrolled'            ,      65  ] ,
          ['Not enrolled'        ,     935  ]
        ]);
		var dataPie1 = google.visualization.arrayToDataTable([
          ['Type'                ,  'Count' ] ,
          ['Removed'             ,  4534593 ] ,
          ['Not removed'         , 12260196 ]
        ]);
		var dataPie2 = google.visualization.arrayToDataTable([
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
        new google.visualization./*Column*/AreaChart(document.getElementById('visCol' )).draw(dataCol ,{xtheme:"maximized",width:1100,height:600,title:"Items removed each year",hAxis:{title:"Year"},colors:["#00BB00"],lineWidth:12,pointSize:25,animation:{duration:1000,easing:"inAndOut"}});
        new google.visualization.PieChart           (document.getElementById('visPie0')).draw(dataPie0,{xtheme:"maximized",width: 600,height:400,title:"Enrollment as a pct% of all referrals",pieHole:0.5,animation:{duration:1000,easing:"inAndOut"},colors:["#00EE00","#008800"]});//,"#00CC00","#00BB00","#00AA00","#009900","#008800","#007700","#006600","#005500","#004400","#003300","#002200"]});
        new google.visualization.PieChart           (document.getElementById('visPie1')).draw(dataPie1,{xtheme:"maximized",width: 600,height:400,title:"Items removed as pct% of all negative items",pieHole:0.5,animation:{duration:1000,easing:"inAndOut"},colors:["#00EE00","#008800"]});//,"#00CC00","#00BB00","#00AA00","#009900","#008800","#007700","#006600","#005500","#004400","#003300","#002200"]});
        new google.visualization.PieChart           (document.getElementById('visPie2')).draw(dataPie2,{xtheme:"maximized",width: 600,height:400,title:"Items removed by type (4Q2013)",pieHole:0.5,animation:{duration:1000,easing:"inAndOut"},colors:["#00EE00","#00DD00","#00CC00","#00BB00","#00AA00","#009900","#008800","#007700","#006600","#005500","#004400","#003300","#002200"]});
		}
      google.setOnLoadCallback(drawVisualization);
    </script>
  </head>
  <body style="font-family:Arial;border:0 none;">
	<table style="border-collapse:separate;border-spacing:10px;"><tbody>
			      <tr><td width="25%" style="color:#888888;vertical-align:top;text-align:center;padding:15px;border-radius:30px;border:10px solid #00BB00;"><div style="font-size:500%;font-weight:900;color:#00BB00">24</div>attorneys in our network</td>
	                  <td width="25%" style="color:#888888;vertical-align:top;text-align:center;padding:15px;border-radius:30px;border:10px solid #00BB00;"><div style="font-size:500%;font-weight:900;color:#00BB00">19</div>states spanned by<br>our attorney network</td>
	                  <td width="25%" style="color:#888888;vertical-align:top;text-align:center;padding:15px;border-radius:30px;border:10px solid #00BB00;"><div style="font-size:500%;font-weight:900;color:#00BB00">50</div>states served by<br>our attorney network</td>
					  <td width="25%" style="color:#888888;vertical-align:top;text-align:center;padding:15px;border-radius:30px;border:10px solid #00BB00;"><div style="font-size:500%;font-weight:900;color:#00BB00">200+</div>paralegals, agents and personnel<br>in our attorney network</td>
			 </tr><tr><td width="25%" style="color:#888888;vertical-align:top;text-align:center;padding:15px;border-radius:30px;border:10px solid #00BB00;"><div style="font-size:500%;font-weight:900;color:#00BB00">1991</div>year our attorney network<br>was founded</td>
                      <td width="25%" style="color:#888888;vertical-align:top;text-align:center;padding:15px;border-radius:30px;border:10px solid #00BB00;"><div style="font-size:500%;font-weight:900;color:#00BB00">500k</div>total clients</td>
	                  <td width="25%" style="color:#888888;vertical-align:top;text-align:center;padding:15px;border-radius:30px;border:10px solid #00BB00;"><div style="font-size:500%;font-weight:900;color:#00BB00">10.2</div>average negative items<br>removed per client</td>
	                  <td width="25%" style="color:#888888;vertical-align:top;text-align:center;padding:15px;border-radius:30px;border:10px solid #00BB00;"><div style="font-size:500%;font-weight:900;color:#00BB00">122</div>average days<br>to remove negative items</td>
             </tr></tbody></table>
	<table border="0"><tbody><tr><td width="50%"              style="text-align:center"><div id="visPie0" xstyle="width:600px;height:400px;"></div></td>
	                             <td width="50%"              style="text-align:center">To be filled in later.                                     </td></tr>
						     <tr><td width="50%"              style="text-align:center"><div id="visPie1" xstyle="width:600px;height:400px;"></div></td>
	                             <td width="50%"              style="text-align:center"><div id="visPie2" xstyle="width:600px;height:400px;"></div></td></tr>
                             <tr><td width="100%" colspan="2" style="text-align:center"><div id="visCol"  xstyle="width:600px;height:400px;"></div></td></tr></tbody></table>
<script src="//code.jquery.com/jquery.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src="//www.fuelcdn.com/fuelux/3.2.1/js/fuelux.min.js"></script>
 </body>
</html>
-------------------------------------- index.html --------------------------------------
<!DOCTYPE html>
<html>
<head>
    <title>Promenade&trade;</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="//www.fuelcdn.com/fuelux/3.2.1/css/fuelux.min.css"><!-- http://getfuelux.com/getting-started.html#templates Fuel UX extends Bootstrap with additional lightweight JavaScript controls for your web applications. -->
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"> <!-- Latest compiled and minified CSS --> <!-- http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css --> <!-- Color definitions: http://getbootstrap.com/customize/#colors | Blue:#428bca(hover:#3071a9) -->
</head>
<body>
<div class="container-fluid">
    <div class="jumbotron" style="text-align:center;padding:65px">
        <h1>Promenade&trade; empowers performance<br>visualization for investment managers.</h1>
        <br><p><a class="btn btn-primary btn-lg" href="https://sites.google.com/site/sofastratcalc/scenarios" role="button" target="_blank">Run a scenario &rsaquo;</a></p>
        <br><p><img src="https://lh6.googleusercontent.com/-vWVsO-omONA/VG99Xr6E8gI/AAAAAAAANMI/faraj6Rii9U/s288/charttoon.png"></p>
    </div>
</div>
<script src="//code.jquery.com/jquery.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src="//www.fuelcdn.com/fuelux/3.2.1/js/fuelux.min.js"></script>
</body>
</html>
-------------------------------------- scenarios.html --------------------------------------
<!DOCTYPE html><html>
<head>
    <meta charset="utf-8"/> <!--Improve search box: http://view.jquerymobile.com/1.4.0/demos/controlgroup/#Textinputs -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!--                                         Grey                                                              Blue                                                              Brown                                                             Green                                                             Purple                                                            Red                                                        -->
<!--<link rel="stylesheet" type="text/css" href="https://googledrive.com/host/0B1LVOoV_2dFtMEQxYks5SnY4UDQ" xhref="https://googledrive.com/host/0B1LVOoV_2dFtSEtlUmdQcEZWUEE" xhref="https://googledrive.com/host/0B1LVOoV_2dFtUnBXa242eGlpdzg" xhref="https://googledrive.com/host/0B1LVOoV_2dFtMXFxVFFqalRyNGs" xhref="https://googledrive.com/host/0B1LVOoV_2dFtOTlfTU9xQ1RueWM" xhref="https://googledrive.com/host/0B1LVOoV_2dFta1NwUVZheXR0ZFE"  />
<!--<link rel="stylesheet"                 href="https://ssl.gstatic.com/docs/script/css/add-ons.css"> <!-- Reference: https://developers.google.com/apps-script/add-ons/css -->
    <link rel="stylesheet" href="//www.fuelcdn.com/fuelux/3.2.1/css/fuelux.min.css"><!-- http://getfuelux.com/getting-started.html#templates Fuel UX extends Bootstrap with additional lightweight JavaScript controls for your web applications. -->
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"> <!-- Latest compiled and minified CSS --> <!-- http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css --> <!-- Color definitions: http://getbootstrap.com/customize/#colors | Blue:#428bca(hover:#3071a9) -->
<!--<link rel="stylesheet" href="https://googledrive.com/host/0B1LVOoV_2dFtalpJaXZlSVlNbkU"> <!-- Hosted version of above file (v3.3.1) — Doesn't work yet -->
<!--<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css"> <!-- Optional theme -->
<!--<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons.css"> <!-- Google styles | Reference: https://developers.google.com/apps-script/add-ons/css -->
<!--<link rel="stylesheet" href="https://googledrive.com/host/0B1LVOoV_2dFtMzM0LXE2QTU4b1E"><!--Tables-->
<!--<script type="text/javascript" charset="utf8" src="https://googledrive.com/host/0B1LVOoV_2dFtRE9QbU5iem9JM0U"></script>--> <!-- bootstrap.min.js -->
	<style>
	    img.displayed {display:block;margin-left:auto;margin-right:auto} 
	</style>
</head>
<body>
<?/*var user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null,arr,ar_ao=[],ar_mo=[],ar_ap=[],ar_mp=[],ar_ac=[],ar_mc=[],ar=serveTable().records,i=ar.length;while(i--){
		if(ar[i].status=="Open"   ){ar_ao.push(ar[i]);if(ar[i].email==user){ar_mo.push(ar[i])}} // Load open    arrays , all + my
		if(ar[i].status=="Pending"){ar_ap.push(ar[i]);if(ar[i].email==user){ar_mp.push(ar[i])}} // Load pending arrays , all + my
		if(ar[i].status=="Closed" ){ar_ac.push(ar[i]);if(ar[i].email==user){ar_mc.push(ar[i])}} // Load closed  arrays , all + my
   }arr=ar_ao;
	var mp,i=arr.length,temp=arr[i-1].type;while(i--){if(temp!=arr[i].type){mp=[arr[i].price,arr[i+1].price].sort(function(a,b){return(a-b)});break}else{temp=arr[i].type}}
	var uynf="",uync="",uyp="",p=user?("value='"+user+"' disabled"):"placeholder='Your email'"
	  ; try{if(user){u=LibraryjsUtil.dbParse({verb:"get",project:"taxLienExchange",className:"user",query:{email:user}}).results[0]}}catch(e){Logger.log(e.message)}try{uynf=u.yNameFull?"value='"+u.yNameFull+"'":""}catch(e){}try{uync=u.yNameComp?"value='"+u.yNameComp+"'":""}catch(e){}try{uyp=u.yPhone?"value='"+u.yPhone+"'":""}catch(e){}
*/?>
<div class="container-fluid">
    <div class="row">
        <div class="col-xs-12">
            <div class="panel panel-default">
                <div class="panel-heading">Run a Scenario</div>
                <div class="panel-body">
                    <div class="row">
                        <form xclass="form-horizontal" class="form" role="form">
                            <div class="col-xs-4">
                                <div class="panel panel-default">
                                    <div class="panel-heading">Inputs</div>
                                    <div class="panel-body">
                                        <div class="col-xs-6">
                                            <div class="form-group">
                                                <label for="dateInception" xhidden class="control-label">Inception Date</label>
                                                <input type="date" class="form-control" name="dateInception" id="dateInception" placeholder="">
                                            </div>
                                            <div class="form-group">
                                                <label for="strategyName" xhidden class="control-label">Strategy Name</label>
                                                <input type="text" class="form-control" name="strategyName" id="strategyName" placeholder="Strategy Name">
                                            </div>
                                            <div class="form-group">
                                                <label for="strategyName1" xhidden class="control-label">Strategy Name</label>
                                                <select class="form-control" xrequired name="strategyName1" id="strategyName1">
                                                    <option value="">--Strategy Name-- </option>
                                                    <option value="stratA"> Strategy Alpha </option>
                                                    <option value="stratB"> Strategy Bravo </option>
                                                    <option value="stratC"> Strategy Charlie </option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="benchmark" xhidden class="control-label">Benchmark</label>
                                                <select class="form-control" xrequired name="benchmark" id="benchmark">
                                                    <option value="">--Benchmark-- </option>
                                                    <option value="sp"> S&P500 TR </option>
                                                    <option value="agg"> AGG </option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="freqRebal" xhidden class="control-label">Rebalance Frequency</label>
                                                <select class="form-control" xrequired name="freqRebal" id="freqRebal">
                                                    <option value="">--Frequency--</option>
                                                    <option value="month"> Monthly </option>
                                                    <option value="day"> Daily </option>
                                                    <option value="week"> Weekly </option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="freqCalFeeMgt" xhidden class="control-label">Mgmt Fee Calc Freq</label>
                                                <select class="form-control" xrequired name="freqCalFeeMgt" id="freqCalFeeMgt">
                                                    <option value="">--Frequency--</option>
                                                    <option value="quarter"> Quarterly </option>
                                                    <option value="annual"> Annual </option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="freqCalFeePerf" xhidden class="control-label">Perf Fee Calc Freq</label>
                                                <select class="form-control" xrequired name="freqCalFeePerf" id="freqCalFeePerf">
                                                    <option value="">--Frequency--</option>
                                                    <option value="quarter"> Quarterly </option>
                                                    <option value="annual"> Annual </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xs-6">
                                            <div class="form-group">
                                                <label for="dateRealMoney" xhidden class="control-label">Real Money Since</label>
                                                <input type="date" class="form-control" name="dateRealMoney" id="dateRealMoney" placeholder="">
                                            </div>
                                            <div class="form-group">
                                                <label for="portval" xhidden class="control-label">Portfolio Value</label>
                                                <span class="input-group">
												<span class="input-group-addon">$</span>
                                                <input class="form-control" type="number" xsize="5" id="portval" name="portval" xrequired placeholder="Portfolio Value" min="0" xmax="100" step="10000">
                                                </span>
                                            </div>
                                            <div class="form-group">
                                                <label for="leverage" xhidden class="control-label">Leverage</label>
                                                <span class="input-group">
												<input class="form-control" type="number" xsize="5" id="leverage" name="leverage" xrequired  placeholder="Leverage"  min="0" max="100" step="0.25" >
												<span class="input-group-addon">%</span>
                                                </span>
                                            </div>
                                            <div class="form-group">
                                                <label for="feeMgt" xhidden class="control-label">Management Fee</label>
                                                <span class="input-group">
												<input class="form-control" type="number" xsize="5" id="feeMgt" name="feeMgt" xrequired  placeholder="Manage Fee"  min="0" max="100" step="0.25" >
												<span class="input-group-addon">%</span>
                                                </span>
                                            </div>
                                            <div class="form-group">
                                                <label for="feePerf" xhidden class="control-label">Performance Fee</label>
                                                <span class="input-group">
												<input class="form-control" type="number" xsize="5" id="feePerf" name="feePerf" xrequired  placeholder="Perform Fee"  min="0" max="100" step="0.25" >
												<span class="input-group-addon">%</span>
                                                </span>
                                            </div>
                                            <div class="form-group">
                                                <label for="cost" xhidden class="control-label">Cost</label>
                                                <span class="input-group">
												<input class="form-control" type="number" xsize="5" id="cost" name="cost" xrequired  placeholder="Cost"  min="0" max="100" step="0.25" >
												<span class="input-group-addon">%</span>
                                                </span>
                                            </div>
                                            <div class="form-group">
                                                <label for="submitButton" xhidden class="control-label">Submit Button</label>
                                                <input type="button" class="btn btn-block btn-primary" role="button" xclass="blue|#428bca" id="submitButton" value="Run!" onclick="myFunction_userUpdate();alert('Success!\nWe received your order.\nRefresh your browser to see your new order.');" title="">
                                                <!-- Reference: http://stackoverflow.com/questions/5462251/button-width-in-css3 -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-8">
                                <div class="panel panel-default">
                                    <div class="panel-heading">Results</div>
                                    <div class="panel-body" style>
                                        <img class="displayed" src="https://lh4.googleusercontent.com/-Cf6ndnsofbc/U5TZ1lGFBJI/AAAAAAAALks/sxKoEj0J0yY/s1600/chart.png">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="//code.jquery.com/jquery.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src="//www.fuelcdn.com/fuelux/3.2.1/js/fuelux.min.js"></script>
<script>
function onFailure(e){alert(e.message)}function onSuccess(){}//document.getElementById("result").innerHTML=str}//iframe doesn't work bc get request is only sent on page load. So we have the user click a link. //"<iframe src='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00' width='1200' height='1200'></iframe>"}//alert(/*"Input received!"* /document.getElementById("address").value)}
function myFunction_order(){var r=document.getElementById("order")//alert(/*document.forms["referral"]["cFullName"].value/*"Hello world"*/);document.forms["referral"]/*getElementById("referral")*/.reset();}//;document.getElementById("result").innerHTML="<img src='https://lh4.googleusercontent.com/-S3rRVyRoXeA/U62uSnnsXLI/AAAAAAAAMA4/N10K1jdADPY/s800/ajax-loader.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).order_receive(r/*this.parentNode*/);/*this.parentNode*/r.reset()}//**IMPORTANT**“this” gets the “name” property of the parent element, i.e., the form tag/element. In order to use the “this.parnentNote” method (as opposed to the document.getElementById() method) verify the form element has a proper “name” property. Otherwise, the function will fail “silently.”//document.getElementById("address").value)}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
function myFunction_userUpdate(){var r=document.getElementById("userUpdate")//alert(/*document.forms["referral"]["cFullName"].value/*"Hello world"*/);document.forms["referral"]/*getElementById("referral")*/.reset();}//;document.getElementById("result").innerHTML="<img src='https://lh4.googleusercontent.com/-S3rRVyRoXeA/U62uSnnsXLI/AAAAAAAAMA4/N10K1jdADPY/s800/ajax-loader.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).userUpdate_receive(r/*this.parentNode*/)}//*this.parentNode*/r.reset()}//**IMPORTANT**“this” gets the “name” property of the parent element, i.e., the form tag/element. In order to use the “this.parnentNote” method (as opposed to the document.getElementById() method) verify the form element has a proper “name” property. Otherwise, the function will fail “silently.”//document.getElementById("address").value)}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
</script></body></html>
-------------------------------------- managers.html --------------------------------------
<!DOCTYPE html><html>
<head>
    <meta charset="utf-8"/> <!--Improve search box: http://view.jquerymobile.com/1.4.0/demos/controlgroup/#Textinputs -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!--                                         Grey                                                              Blue                                                              Brown                                                             Green                                                             Purple                                                            Red                                                        -->
<!--<link rel="stylesheet" type="text/css" href="https://googledrive.com/host/0B1LVOoV_2dFtMEQxYks5SnY4UDQ" xhref="https://googledrive.com/host/0B1LVOoV_2dFtSEtlUmdQcEZWUEE" xhref="https://googledrive.com/host/0B1LVOoV_2dFtUnBXa242eGlpdzg" xhref="https://googledrive.com/host/0B1LVOoV_2dFtMXFxVFFqalRyNGs" xhref="https://googledrive.com/host/0B1LVOoV_2dFtOTlfTU9xQ1RueWM" xhref="https://googledrive.com/host/0B1LVOoV_2dFta1NwUVZheXR0ZFE"  />
<!--<link rel="stylesheet"                 href="https://ssl.gstatic.com/docs/script/css/add-ons.css"> <!-- Reference: https://developers.google.com/apps-script/add-ons/css -->
    <link rel="stylesheet" href="//www.fuelcdn.com/fuelux/3.2.1/css/fuelux.min.css"><!-- http://getfuelux.com/getting-started.html#templates Fuel UX extends Bootstrap with additional lightweight JavaScript controls for your web applications. -->
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"> <!-- Latest compiled and minified CSS --> <!-- http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css --> <!-- Color definitions: http://getbootstrap.com/customize/#colors | Blue:#428bca(hover:#3071a9) -->
<!--<link rel="stylesheet" href="https://googledrive.com/host/0B1LVOoV_2dFtalpJaXZlSVlNbkU"> <!-- Hosted version of above file (v3.3.1) — Doesn't work yet -->
<!--<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css"> <!-- Optional theme -->
<!--<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons.css"> <!-- Google styles | Reference: https://developers.google.com/apps-script/add-ons/css -->
<!--<link rel="stylesheet" href="https://googledrive.com/host/0B1LVOoV_2dFtMzM0LXE2QTU4b1E"><!--Tables-->
<!--<script type="text/javascript" charset="utf8" src="https://googledrive.com/host/0B1LVOoV_2dFtRE9QbU5iem9JM0U"></script>--> <!-- bootstrap.min.js -->
	<style>
	    img.displayed {display:block;margin-left:auto;margin-right:auto} 
	</style>
</head>
<body>
<?/*var user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null,arr,ar_ao=[],ar_mo=[],ar_ap=[],ar_mp=[],ar_ac=[],ar_mc=[],ar=serveTable().records,i=ar.length;while(i--){
		if(ar[i].status=="Open"   ){ar_ao.push(ar[i]);if(ar[i].email==user){ar_mo.push(ar[i])}} // Load open    arrays , all + my
		if(ar[i].status=="Pending"){ar_ap.push(ar[i]);if(ar[i].email==user){ar_mp.push(ar[i])}} // Load pending arrays , all + my
		if(ar[i].status=="Closed" ){ar_ac.push(ar[i]);if(ar[i].email==user){ar_mc.push(ar[i])}} // Load closed  arrays , all + my
   }arr=ar_ao;
	var mp,i=arr.length,temp=arr[i-1].type;while(i--){if(temp!=arr[i].type){mp=[arr[i].price,arr[i+1].price].sort(function(a,b){return(a-b)});break}else{temp=arr[i].type}}
	var uynf="",uync="",uyp="",p=user?("value='"+user+"' disabled"):"placeholder='Your email'"
	  ; try{if(user){u=LibraryjsUtil.dbParse({verb:"get",project:"taxLienExchange",className:"user",query:{email:user}}).results[0]}}catch(e){Logger.log(e.message)}try{uynf=u.yNameFull?"value='"+u.yNameFull+"'":""}catch(e){}try{uync=u.yNameComp?"value='"+u.yNameComp+"'":""}catch(e){}try{uyp=u.yPhone?"value='"+u.yPhone+"'":""}catch(e){}
*/?>
<div class="container-fluid">
    <div class="col-xs-12">
        <div class="row">
            <div class="panel panel-default">
                <div class="panel-heading">Update Section
                    <!--<span class="glyphicon glyphicon-question-sign"></span> -->
                    <img height="15" class="help-icon" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="In the area below and to the right, click the spreadsheet icon to update your performance data. Enter client email addresses in text area, then click update button.">
                </div>
                <div class="panel-body">
                    <form class="form form-inline xform-horizontal" role="form" id="managerInfo">
                        <div class="col-xs-6">
                            <div class="row">
                                <div class="form-group col-xs-4">
                                    <label for="name" xhidden class="control-label">Your Name</label>
                                    <input type="text" class="form-control" name="name" id="name" placeholder="First and last">
                                </div>
                                <div class="form-group col-xs-3">
                                    <label for="phone" xhidden class="control-label">Phone</label>
                                    <input type="text" class="form-control" name="phone" id="phone" placeholder="10-digits">
                                </div>
                                <div class="form-group col-xs-5">
                                    <label for="company" xhidden class="control-label">Company Name</label>
                                    <input type="text" class="form-control" name="company" id="company" placeholder="Your company">
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-xs-12">
                                    <label for="submitButton" hidden class="control-label">Submit Button</label>
                                    <input type="button" class="btn btn-block xbtn-default btn-primary" role="button" xclass="blue|#428bca" id="submitButton" value="Update" onclick="myFunction_userUpdate();alert('Success!');" title="">
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div class="form-group col-xs-12">
                                <label for="emailList" xhidden class="control-label">Email List
                                    <!--<span class="glyphicon glyphicon-question-sign"></span> -->
                                    <img height="15" class="help-icon" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="Enter all the email addresses of your clients; separated by commas">
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<a target="_blank" href="https://docs.google.com/spreadsheets/d/1WkDpkKnJvbmzWcemC5iLgeGgdrHR6UCJCjA92gsKL24/edit" title="Click to open spreadsheet to report your strategy results.">
										<img src="https://lh5.googleusercontent.com/-Z4MWjryYRwE/U1XIbMcXbiI/AAAAAAAALHQ/802n2LzrpXM/s800/tb.png">
									</a>
                                </label>
                                <textarea class="form-control" form="managerInfo" name="emailList" id="emailList" rows="3" placeholder="client1@example.com, client2@example.com, ..."></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="panel panel-default">
                <div class="panel-heading">Benchmark Comparison</div>
                <div class="panel-body"><img class="displayed" src="https://lh4.googleusercontent.com/-Cf6ndnsofbc/U5TZ1lGFBJI/AAAAAAAALks/sxKoEj0J0yY/s1600/chart.png">
                </div>
            </div>
        </div>
    </div>
</div>
<script src="//code.jquery.com/jquery.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src="//www.fuelcdn.com/fuelux/3.2.1/js/fuelux.min.js"></script>
<script>
function onFailure(e){alert(e.message)}function onSuccess(){}//document.getElementById("result").innerHTML=str}//iframe doesn't work bc get request is only sent on page load. So we have the user click a link. //"<iframe src='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00' width='1200' height='1200'></iframe>"}//alert(/*"Input received!"* /document.getElementById("address").value)}
function myFunction_order(){var r=document.getElementById("order")//alert(/*document.forms["referral"]["cFullName"].value/*"Hello world"*/);document.forms["referral"]/*getElementById("referral")*/.reset();}//;document.getElementById("result").innerHTML="<img src='https://lh4.googleusercontent.com/-S3rRVyRoXeA/U62uSnnsXLI/AAAAAAAAMA4/N10K1jdADPY/s800/ajax-loader.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).order_receive(r/*this.parentNode*/);/*this.parentNode*/r.reset()}//**IMPORTANT**“this” gets the “name” property of the parent element, i.e., the form tag/element. In order to use the “this.parnentNote” method (as opposed to the document.getElementById() method) verify the form element has a proper “name” property. Otherwise, the function will fail “silently.”//document.getElementById("address").value)}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
function myFunction_userUpdate(){var r=document.getElementById("userUpdate")//alert(/*document.forms["referral"]["cFullName"].value/*"Hello world"*/);document.forms["referral"]/*getElementById("referral")*/.reset();}//;document.getElementById("result").innerHTML="<img src='https://lh4.googleusercontent.com/-S3rRVyRoXeA/U62uSnnsXLI/AAAAAAAAMA4/N10K1jdADPY/s800/ajax-loader.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).userUpdate_receive(r/*this.parentNode*/)}//*this.parentNode*/r.reset()}//**IMPORTANT**“this” gets the “name” property of the parent element, i.e., the form tag/element. In order to use the “this.parnentNote” method (as opposed to the document.getElementById() method) verify the form element has a proper “name” property. Otherwise, the function will fail “silently.”//document.getElementById("address").value)}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
</script></body></html>
-------------------------------------- invite.html --------------------------------------
<!DOCTYPE html><html>
<head>
    <meta charset="utf-8"/> <!--Improve search box: http://view.jquerymobile.com/1.4.0/demos/controlgroup/#Textinputs -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!--                                         Grey                                                              Blue                                                              Brown                                                             Green                                                             Purple                                                            Red                                                        -->
<!--<link rel="stylesheet" type="text/css" href="https://googledrive.com/host/0B1LVOoV_2dFtMEQxYks5SnY4UDQ" xhref="https://googledrive.com/host/0B1LVOoV_2dFtSEtlUmdQcEZWUEE" xhref="https://googledrive.com/host/0B1LVOoV_2dFtUnBXa242eGlpdzg" xhref="https://googledrive.com/host/0B1LVOoV_2dFtMXFxVFFqalRyNGs" xhref="https://googledrive.com/host/0B1LVOoV_2dFtOTlfTU9xQ1RueWM" xhref="https://googledrive.com/host/0B1LVOoV_2dFta1NwUVZheXR0ZFE"  />
<!--<link rel="stylesheet"                 href="https://ssl.gstatic.com/docs/script/css/add-ons.css"> <!-- Reference: https://developers.google.com/apps-script/add-ons/css -->
    <link rel="stylesheet" href="//www.fuelcdn.com/fuelux/3.2.1/css/fuelux.min.css"><!-- http://getfuelux.com/getting-started.html#templates Fuel UX extends Bootstrap with additional lightweight JavaScript controls for your web applications. -->
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"> <!-- Latest compiled and minified CSS --> <!-- http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css --> <!-- Color definitions: http://getbootstrap.com/customize/#colors | Blue:#428bca(hover:#3071a9) -->
<!--<link rel="stylesheet" href="https://googledrive.com/host/0B1LVOoV_2dFtalpJaXZlSVlNbkU"> <!-- Hosted version of above file (v3.3.1) — Doesn't work yet -->
<!--<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css"> <!-- Optional theme -->
<!--<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons.css"> <!-- Google styles | Reference: https://developers.google.com/apps-script/add-ons/css -->
<!--<link rel="stylesheet" href="https://googledrive.com/host/0B1LVOoV_2dFtMzM0LXE2QTU4b1E"><!--Tables-->
<!--<script type="text/javascript" charset="utf8" src="https://googledrive.com/host/0B1LVOoV_2dFtRE9QbU5iem9JM0U"></script>--> <!-- bootstrap.min.js -->
	<style>
	    img.displayed {display:block;margin-left:auto;margin-right:auto} 
	</style>
</head>
<body>
<?/*var user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null,arr,ar_ao=[],ar_mo=[],ar_ap=[],ar_mp=[],ar_ac=[],ar_mc=[],ar=serveTable().records,i=ar.length;while(i--){
		if(ar[i].status=="Open"   ){ar_ao.push(ar[i]);if(ar[i].email==user){ar_mo.push(ar[i])}} // Load open    arrays , all + my
		if(ar[i].status=="Pending"){ar_ap.push(ar[i]);if(ar[i].email==user){ar_mp.push(ar[i])}} // Load pending arrays , all + my
		if(ar[i].status=="Closed" ){ar_ac.push(ar[i]);if(ar[i].email==user){ar_mc.push(ar[i])}} // Load closed  arrays , all + my
   }arr=ar_ao;
	var mp,i=arr.length,temp=arr[i-1].type;while(i--){if(temp!=arr[i].type){mp=[arr[i].price,arr[i+1].price].sort(function(a,b){return(a-b)});break}else{temp=arr[i].type}}
	var uynf="",uync="",uyp="",p=user?("value='"+user+"' disabled"):"placeholder='Your email'"
	  ; try{if(user){u=LibraryjsUtil.dbParse({verb:"get",project:"taxLienExchange",className:"user",query:{email:user}}).results[0]}}catch(e){Logger.log(e.message)}try{uynf=u.yNameFull?"value='"+u.yNameFull+"'":""}catch(e){}try{uync=u.yNameComp?"value='"+u.yNameComp+"'":""}catch(e){}try{uyp=u.yPhone?"value='"+u.yPhone+"'":""}catch(e){}
*/
?>
<div class="container-fluid">
    <div class="col-xs-6">
        <div class="panel panel-default">
            <div class="panel-heading">Invite New Managers</div>
            <div class="panel-body">
                <form class="form xform-inline xform-horizontal" role="form" id="managerInvite">
                    <div class="form-group col-xs-12">
                        <label for="emailList" xhidden class="control-label">Email List
                            <!--<span class="glyphicon glyphicon-question-sign"></span> -->
                            <img height="15" class="help-icon" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="Invite new managers by entering one or more email addresses separated by commas">
                        </label>
                        <textarea class="form-control placard-field" form="managerInvite" name="emailList" id="emailList" rows="7" placeholder="manager1@example.com, manager2@example.com, ..."></textarea>
                    </div>
                    <div class="form-group col-xs-12">
                        <label for="submitButton" hidden class="control-label">Submit Button</label>
                        <input type="button" class="btn btn-block xbtn-default btn-primary" role="button" xclass="blue|#428bca" id="submitButton" value="Invite" onclick="myFunction_userUpdate();alert('Success!');" title="">
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col-xs-6">
        <div class="panel panel-default">
            <div class="panel-heading">Invitation List</div>
            <div class="panel-body">
				<div class="repeater" id="myRepeater">
					<div class="repeater-header">
						<div class="repeater-header-left">
							<span class="repeater-title">Managers</span>
							<div class="repeater-search">
								<div class="search input-group">
									<input type="search" class="form-control" placeholder="Search" />
									<span class="input-group-btn">
							  <button class="btn btn-default" type="button">
								<span class="glyphicon glyphicon-search"></span>
									<span class="sr-only">Search</span>
									</button>
									</span>
								</div>
							</div>
						</div>
						<div class="repeater-header-right">
							<div class="btn-group selectlist repeater-filters" data-resize="auto">
								<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
									<span class="selected-label">&nbsp;</span>
									<span class="caret"></span>
									<span class="sr-only">Toggle Filters</span>
								</button>
								<ul class="dropdown-menu" role="menu">
									<li data-value="all" data-selected="true"><a href="#">all</a>
									</li>
									<li data-value="some"><a href="#">some</a>
									</li>
									<li data-value="others"><a href="#">others</a>
									</li>
								</ul>
								<input class="hidden hidden-field" name="filterSelection" readonly="readonly" aria-hidden="true" type="text" />
							</div>
							<div class="btn-group repeater-views" data-toggle="buttons">
								<label class="btn btn-default active">
									<input name="repeaterViews" type="radio" value="list"><span class="glyphicon glyphicon-list"></span>
								</label>
								<label class="btn btn-default">
									<input name="repeaterViews" type="radio" value="thumbnail"><span class="glyphicon glyphicon-th"></span>
								</label>
							</div>
						</div>
					</div>
					<div class="repeater-viewport">
						<div class="repeater-canvas"></div>
						<div class="loader repeater-loader"></div>
					</div>
					<div class="repeater-footer">
						<div class="repeater-footer-left">
							<div class="repeater-itemization">
								<span><span class="repeater-start"></span> - <span class="repeater-end"></span> of <span class="repeater-count"></span> items</span>
								<div class="btn-group selectlist" data-resize="auto">
									<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
										<span class="selected-label">&nbsp;</span>
										<span class="caret"></span>
										<span class="sr-only">Toggle Dropdown</span>
									</button>
									<ul class="dropdown-menu" role="menu">
										<li data-value="5"><a href="#">5</a>
										</li>
										<li data-value="10" data-selected="true"><a href="#">10</a>
										</li>
										<li data-value="20"><a href="#">20</a>
										</li>
										<li data-value="50" data-foo="bar" data-fizz="buzz"><a href="#">50</a>
										</li>
										<li data-value="100"><a href="#">100</a>
										</li>
									</ul>
									<input class="hidden hidden-field" name="itemsPerPage" readonly="readonly" aria-hidden="true" type="text" />
								</div>
								<span>Per Page</span>
							</div>
						</div>
						<div class="repeater-footer-right">
							<div class="repeater-pagination">
								<button type="button" class="btn btn-default btn-sm repeater-prev">
									<span class="glyphicon glyphicon-chevron-left"></span>
									<span class="sr-only">Previous Page</span>
								</button>
								<label class="page-label" id="myPageLabel">Page</label>
								<div class="repeater-primaryPaging active">
									<div class="input-group input-append dropdown combobox">
										<input type="text" class="form-control" aria-labelledby="myPageLabel">
										<div class="input-group-btn">
											<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
												<span class="caret"></span>
												<span class="sr-only">Toggle Dropdown</span>
											</button>
											<ul class="dropdown-menu dropdown-menu-right"></ul>
										</div>
									</div>
								</div>
								<input type="text" class="form-control repeater-secondaryPaging" aria-labelledby="myPageLabel">
								<span>of <span class="repeater-pages"></span></span>
								<button type="button" class="btn btn-default btn-sm repeater-next">
									<span class="glyphicon glyphicon-chevron-right"></span>
									<span class="sr-only">Next Page</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
    </div>
</div>
<script src="//code.jquery.com/jquery.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src="//www.fuelcdn.com/fuelux/3.2.1/js/fuelux.min.js"></script>
<script>
var dataSource = function(options, callback){};
$('#myRepeater').repeater({dataSource: dataSource});
function onFailure(e){alert(e.message)}function onSuccess(){}//document.getElementById("result").innerHTML=str}//iframe doesn't work bc get request is only sent on page load. So we have the user click a link. //"<iframe src='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00' width='1200' height='1200'></iframe>"}//alert(/*"Input received!"* /document.getElementById("address").value)}
function myFunction_order(){var r=document.getElementById("order")//alert(/*document.forms["referral"]["cFullName"].value/*"Hello world"*/);document.forms["referral"]/*getElementById("referral")*/.reset();}//;document.getElementById("result").innerHTML="<img src='https://lh4.googleusercontent.com/-S3rRVyRoXeA/U62uSnnsXLI/AAAAAAAAMA4/N10K1jdADPY/s800/ajax-loader.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).order_receive(r/*this.parentNode*/);/*this.parentNode*/r.reset()}//**IMPORTANT**“this” gets the “name” property of the parent element, i.e., the form tag/element. In order to use the “this.parnentNote” method (as opposed to the document.getElementById() method) verify the form element has a proper “name” property. Otherwise, the function will fail “silently.”//document.getElementById("address").value)}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
function myFunction_userUpdate(){var r=document.getElementById("userUpdate")//alert(/*document.forms["referral"]["cFullName"].value/*"Hello world"*/);document.forms["referral"]/*getElementById("referral")*/.reset();}//;document.getElementById("result").innerHTML="<img src='https://lh4.googleusercontent.com/-S3rRVyRoXeA/U62uSnnsXLI/AAAAAAAAMA4/N10K1jdADPY/s800/ajax-loader.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).userUpdate_receive(r/*this.parentNode*/)}//*this.parentNode*/r.reset()}//**IMPORTANT**“this” gets the “name” property of the parent element, i.e., the form tag/element. In order to use the “this.parnentNote” method (as opposed to the document.getElementById() method) verify the form element has a proper “name” property. Otherwise, the function will fail “silently.”//document.getElementById("address").value)}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
</script></body></html>
