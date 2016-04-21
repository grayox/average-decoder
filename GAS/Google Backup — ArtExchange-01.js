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
			  ; if(user){u=LibraryjsUtil.dbParse("get","artExchange","referral",{yEmail:user}).results[0];uynf=u.yNameFull?"value="+u.yNameFull:"";uync=u.yNameComp?"value="+u.yNameComp:"";uyp=u.yPhone?"value="+u.yPhone:"";}
	Logger.log("A: "+user);
	Logger.log("B: "+JSON.stringify(u));
	Logger.log("C: "+uyfn);
	Logger.log("D: "+uycn);
	Logger.log("E: "+uyp);
}*/
// INVENTORY SCRAPING SOURCES: http://www.artbrokerage.com/artists/ 1stdibs, artnet, Amazon
// SHIPPERS / SERVICE PROVIDERS: http://www.maquetteartservices.com/services.html 
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
	        case   /* buy    serve           */ "0x8pasf7we5rww2lkz5y" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(serveBuyers           ( )) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
            case   /* sell   serve           */ "hwqxr7itjfk84di1icyd" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(serveSellers          ( )) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
            case   /* buy    receive         */ "7sg1u1lemgn6jmeud364" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(receiveBuyer          (p)) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
            case   /* sell   receive         */ "08z60i0vvfmuhpjgyfdb" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(receiveSeller         (p)) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
         default                                                       : break;}}
	if(SitesApp.getActiveSite()){var siteName = SitesApp.getActiveSite().getName();switch(siteName){
            case   "onlineartexchange"             : 
					if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
                            case   "buy"           : return HtmlService.createTemplateFromFile  (         "buy.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                            case   "sell"          : return HtmlService.createTemplateFromFile  (        "sell.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                            case   "results"       : return HtmlService.createTemplateFromFile  (     "results.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                            case   "freetrial"     : return HtmlService.createTemplateFromFile  (       "refer.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                            case   "home"          : return HtmlService.createTemplateFromFile  (       "refer.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                         // case   "home"          : return HtmlService.createHtmlOutputFromFile(       "refer.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
                            case   "stats"         : return HtmlService.createHtmlOutputFromFile(       "stats.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
                            case   "crm"           : return HtmlService.createHtmlOutputFromFile(         "crm.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
                            case   "account"       : return account   ();break;
                            case   "manage"        : return manage    ();break;
                            case   "authorize"     : return authorize ();break;
                         default                   :                    ;break;}}
        //  case   "creditrepairnation"            : // acquire inventory
		//			if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
        //                  case   "home"          : return HtmlService.createHtmlOutputFromFile(     "collect.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
		//  			 default                   :                    ;break;}}
         default                                   : break;}}}	
function receiveList(ob){ob.ask=Number(LibraryjsUtil.str2num(ob.ask));var doc=DriveApp.createFile(ob.myFile).setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW),temp=(doc.getMimeType()!="application/octet-stream"/*"image/jpeg","image/png"*/)?LibraryjsUtil.gdrive2imgur(doc.getId()):{};for(x in temp){ob[x]=temp[x]}doc.setTrashed(true);delete ob.myFile;//ob.urlFile=doc.getUrl();ob.urlImage=doc.getDownloadUrl().split("?")[0]; // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
    var user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null;if(user){ob.email=user}LibraryjsUtil.dbParse("post","artExchange","listing",ob);return}//Logger.log(saved)}//return Logger.log(JSON.stringify(ob))} // saved={objectId="CE05GdsyLR",createdAt=2014-07-16T06:45:19.526Z}
function serveBuyers(){var r,ob=[],d=new Date(),t=d.getTime(),user=Session.getUser().getEmail(),arr=LibraryjsUtil.dbParse("get","artExchange","listing"/*,{owner:user}*/).results,i=arr.length,out={"totalResultsCount":i+1,"records":[]};while(i--){out.records[i]={};r=arr[i];
	ob[i] = {
		"nolink"                         : {
				"item"                   : function(){try{return            r.objectId              }catch(e){Logger.log(e.message);return "";}}() //
			,	"artist"                 : function(){try{return            r.artist                }catch(e){Logger.log(e.message);return "";}}() //
			,	"ask"                    : function(){try{return            r.ask                   }catch(e){Logger.log(e.message);return "";}}() //
			,	"category"               : function(){try{return            r.category              }catch(e){Logger.log(e.message);return "";}}() //
			,	"depth"                  : function(){try{return            r.depth                 }catch(e){Logger.log(e.message);return "";}}() //
			,	"height"                 : function(){try{return            r.height                }catch(e){Logger.log(e.message);return "";}}() //
			,	"height"                 : function(){try{return            r.height                }catch(e){Logger.log(e.message);return "";}}() //
			,	"imgId"                  : function(){try{return r.imgId  || "rARv7rH"              }catch(e){Logger.log(e.message);return "";}}() //
			,	"imgUrl"                 : function(){try{return r.imgUrl || "http://i.imgur.com/rARv7rH.jpg"}catch(e){Logger.log(e.message);return "";}}() //
			,	"keywords"               : function(){try{return            r.keywords              }catch(e){Logger.log(e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
			,	"materials"              : function(){try{return            r.materials             }catch(e){Logger.log(e.message);return "";}}() //
			,	"movement"               : function(){try{return            r.movement              }catch(e){Logger.log(e.message);return "";}}() //
			,	"provenance"             : function(){try{return            r.provenance            }catch(e){Logger.log(e.message);return "";}}() //
			,	"subcat"                 : function(){try{return            r.subcat                }catch(e){Logger.log(e.message);return "";}}() //
			,	"title"                  : function(){try{return            r.title                 }catch(e){Logger.log(e.message);return "";}}() //
			,	"width"                  : function(){try{return            r.width                 }catch(e){Logger.log(e.message);return "";}}() //
			,	"year"                   : function(){try{return            r.year                  }catch(e){Logger.log(e.message);return "";}}() //
										   }
	,	"link"		                     : {}
	}
	var keys=Object.keys(ob[i].nolink),z=keys.length;while(z--){out.records[i][keys[z]]=              ob[i].nolink[keys[z]]                                   }
	    keys=Object.keys(ob[i].  link),z=keys.length;while(z--){out.records[i][keys[z]]='<a href="' + ob[i].  link[keys[z]] + '" target="_blank">&#10151;</a>'}//Logger.log(JSON.stringify(out.records[i]));
	}return out}//Logger.log(JSON.stringify(out))}
function serveSellers(){var r,ob=[],d=new Date(),t=d.getTime(),user=Session.getUser().getEmail(),arr=LibraryjsUtil.dbParse("get","artExchange","listing",{email:user}).results,i=arr.length,out={"totalResultsCount":i+1,"records":[]};while(i--){out.records[i]={};r=arr[i];
	ob[i] = {
		"nolink"                         : {
				"item"                   : function(){try{return            r.objectId              }catch(e){Logger.log(e.message);return "";}}() //
			,	"artist"                 : function(){try{return            r.artist                }catch(e){Logger.log(e.message);return "";}}() //
			,	"ask"                    : function(){try{return            r.ask                   }catch(e){Logger.log(e.message);return "";}}() //
			,	"category"               : function(){try{return            r.category              }catch(e){Logger.log(e.message);return "";}}() //
			,	"depth"                  : function(){try{return            r.depth                 }catch(e){Logger.log(e.message);return "";}}() //
			,	"height"                 : function(){try{return            r.height                }catch(e){Logger.log(e.message);return "";}}() //
			,	"imgId"                  : function(){try{return r.imgId  || "rARv7rH"              }catch(e){Logger.log(e.message);return "";}}() //
			,	"imgUrl"                 : function(){try{return r.imgUrl || "http://i.imgur.com/rARv7rH.jpg"}catch(e){Logger.log(e.message);return "";}}() //
			,	"keywords"               : function(){try{return            r.keywords              }catch(e){Logger.log(e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
			,	"materials"              : function(){try{return            r.materials             }catch(e){Logger.log(e.message);return "";}}() //
			,	"movement"               : function(){try{return            r.movement              }catch(e){Logger.log(e.message);return "";}}() //
			,	"provenance"             : function(){try{return            r.provenance            }catch(e){Logger.log(e.message);return "";}}() //
			,	"subcat"                 : function(){try{return            r.subcat                }catch(e){Logger.log(e.message);return "";}}() //
			,	"title"                  : function(){try{return            r.title                 }catch(e){Logger.log(e.message);return "";}}() //
			,	"width"                  : function(){try{return            r.width                 }catch(e){Logger.log(e.message);return "";}}() //
			,	"year"                   : function(){try{return            r.year                  }catch(e){Logger.log(e.message);return "";}}() //
										   }
	,	"link"		                     : {}
	}
	var keys=Object.keys(ob[i].nolink),z=keys.length;while(z--){out.records[i][keys[z]]=              ob[i].nolink[keys[z]]                                   }
	    keys=Object.keys(ob[i].  link),z=keys.length;while(z--){out.records[i][keys[z]]='<a href="' + ob[i].  link[keys[z]] + '" target="_blank">&#10151;</a>'}//Logger.log(JSON.stringify(out.records[i]));
	}return out}//Logger.log(JSON.stringify(out))}
-------------------------------------- form.html (a template kit for implementing forms; must be unpacked) --------------------------------------
function processForm(formObject){var formBlob=formObject.myFile,driveFile=DriveApp.createFile(formBlob);return driveFile.getUrl()} // Goes in Code.gs // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
<form id="myForm"><input name="myFile" type="file"><input type="button" value="Submit" onclick="google.script.run.withSuccessHandler(updateUrl).processForm(this.parentNode);this.parentNode.reset()"></form><div id="output"></div><script>function updateUrl(url){document.getElementById("output").innerHTML='<a href="'+url+'">Got it!</a>'}</script><!--Goes in index.html; Reference: https://developers.google.com/apps-script/guides/html/communication#forms-->
-------------------------------------- results.html --------------------------------------
<!--NOTE: k=fkpmzd4cfq68daws8czk is the unique key for jqxGrid; however, we will hard code the HTML table in GAS .html file and store locally rather than going thru jqxGrid because jqxGrid is not compatible with IExplorer and we must support the browsers of all our clients-->
<!DOCTYPE html><html style="text-align:left;font-family:arial;font-size:100%;color:#777777;"><head><meta charset="utf-8"/></head>
<body><div style="text-align:center;font-size:200%;color:#00DD00;font-weight:900">My referrals</div>
    <?var r,user=Session.getUser().getEmail(),arr=LibraryjsUtil.dbParse("get","artExchange","referral",{yEmail:user}).results,i=arr.length;?>
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
-------------------------------------- buy.html --------------------------------------
<!DOCTYPE html><html><head><meta charset="utf-8"/>
<style>
    html  {text-align:center;font-family:arial;font-size:100%;color:#888888;}
    input {color:#000000;text-align:left ;font-size:90%;padding:1px 2px;xborder:1px solid #000000;border-radius:3px;xwidth:80%;xheight:10px}
	table {border-collapse:separate;border-spacing:15px;}
	td    {color:#888888;vertical-align:top;text-align:center;padding:20px;border-radius:30px;border:8px solid #000000}
</style></head> <!-- function test(){Logger.log(DriveApp.getFileById("0B1LVOoV_2dFtQTBSc05Nc0F2Z00").getDownloadUrl())} -->
<body>Unless otherwise noted, all prices are USD. &ldquo;Best offers&rdquo; might be accepted so bring all offers.
    <table><tbody><tr><?var C=3,j=0,ar=serveBuyers().records,i=ar.length;while(i--){var ask=ar[i].ask?"$"+LibraryjsUtil.numberWithCommas(Math.round(ar[i].ask))/*+" USD OBO"*/:"price available upon request";?>
    <td width="350">
	    <a href="<?!=ar[i].imgUrl?>" target="_blank"><img xwidth="250" src="<?!=ar[i].imgUrl.replace(ar[i].imgId,(ar[i].imgId+"m"))?>" title="Click to enlarge"></a>
		<br><span style="font-size:150%"><?=ar[i].artist?><br>&ldquo;<?=ar[i].title?>&rdquo;<?if(ar[i].provenance){?><span style="font-style:italic;xfont-size:150%;font-weight:bold;font-family:serif" title="<?!=ar[i].provenance?>"> i</span><?}?></span><br><?=ar[i].year?><br><?=ar[i].category?><br><?=ar[i].materials?><br><?=ask?>
		<br><input type="text"     size="29" id="quest" name="quest" placeholder="ask question" title="Ask a question">
		    <input type="text"     size= "6" id="offer" name="offer" placeholder="make offer"   title="Make a non-binding indicative offer">
		<br><input type="button"   value="send" xonclick="myFunction();" style="background:#000000;font-size:100%;color:#FFFFFF;xfont-weight:bold;border-radius:3px;padding:1px 2px;display:inline-block;width:300px;"  title=""><!-- Reference: http://stackoverflow.com/questions/5462251/button-width-in-css3 -->
	</td><?if(!(++j%C)){?></tr><tr><?}?>
<?}?>
</tr></tbody></table></body></html> <!-- Slideshow: http://css-tricks.com/snippets/jquery/simple-auto-playing-slideshow/ -->
-------------------------------------- sell.html --------------------------------------
<!DOCTYPE html><html style="text-align:center;font-family:arial;font-size:100%;color:#888888;"><head><meta charset="utf-8"/>
<!--                                          Grey                                                              Blue                                                              Brown                                                             Green                                                             Purple                                                            Red                                                        --> <!-- Pretty tables -->
<linkx rel="stylesheet" type="text/css" href="https://googledrive.com/host/0B1LVOoV_2dFtMEQxYks5SnY4UDQ" xhref="https://googledrive.com/host/0B1LVOoV_2dFtSEtlUmdQcEZWUEE" xhref="https://googledrive.com/host/0B1LVOoV_2dFtUnBXa242eGlpdzg" xhref="https://googledrive.com/host/0B1LVOoV_2dFtMXFxVFFqalRyNGs" xhref="https://googledrive.com/host/0B1LVOoV_2dFtOTlfTU9xQ1RueWM" xhref="https://googledrive.com/host/0B1LVOoV_2dFta1NwUVZheXR0ZFE"  /> <!-- Pretty tables -->
<link  rel="stylesheet"                 href="https://ssl.gstatic.com/docs/script/css/add-ons.css"> <!-- Google styles | Reference: https://developers.google.com/apps-script/add-ons/css -->
<!--<style>
    input,select  {color:#000000;xheight:100px;font-size:90%;padding:1px 2px;xborder:1px solid #000000;border-radius:3px;}
	select        {color:#888888}
</style>--></head>
<body><?var uynf="",uync="",uyp="",user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null,p=user?("value='"+user+"' disabled"):"placeholder='Your email'"
          ; try{if(user){u=LibraryjsUtil.dbParse("get","artExchange","listing",{email:user}).results[0]}}catch(e){Logger.log(e.message)}try{uynf=u.yNameFull?"value='"+u.yNameFull+"'":""}catch(e){}try{uync=u.yNameComp?"value='"+u.yNameComp+"'":""}catch(e){}try{uyp=u.yPhone?"value='"+u.yPhone+"'":""}catch(e){}?>
  <div style="width:915px;margin:0 auto;xtext-align:left">
    <form id="listing" style="xbackground:grey;xpadding:6px;xborder:2px solid #DDDDDD;border-radius:8px;"><!--References: https://developers.google.com/apps-script/guides/html-service-communication#forms https://developers.google.com/apps-script/guides/html-service-communication#user_objects-->
        </fieldset><br><fieldset style="text-align:left;border-radius:3px"><legend>lister</legend>
            <input type="text"  size="35" id="email"       name="email"       placeholder="email"   <?!=p?>    title="Your email address. Example: johndoe@example.com"        >
		    <input type="text"  size="30" id="name"        name="name"        placeholder="name"    <?!=uynf?> title="Your full first and last names. Example: John Doe, III"  >
            <input type="text"  size="35" id="company"     name="company"     placeholder="company" <?!=uync?> title="The name of your company. Example: Ace Finance, Inc."    >
            <input type="text"  size="11" id="phone"       name="phone"       placeholder="phone"   <?!=uyp?>  title="Your company phone number. Example: 555-555-1212"        > <!--<br><input type="text"   style="color:#888888;xheight:100px;font-size:100%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="35" id="phoneEve" name="phoneEve" placeholder="2nd phone" title="Alternate phone number to reach customer. Example: 555-555-1212" > // Reference: http://stackoverflow.com/questions/1994406/set-image-as-submit-button // Works on jsfiddl.net but not GAS -->
    <!--<br><input type="image" xtype="button" xvalue="submit" onclick="myFunction()" xstyle="font-size:90%;xpadding:15px;xborder-radius:999px;" xsize="100%" src="https://lh5.googleusercontent.com/-eXPQU0DYMXk/U7ZlT3QLazI/AAAAAAAAMGc/aNES2fQIdUs/s800/button.png"                             > -->
        </fieldset>
		<fieldset style="text-align:left;border-radius:3px"><legend>property</legend>
            <input type="file"  style="xbackground:#150035;xfont-size:100%;xcolor:white;xfont-weight:bold;border-radius:999px;xpadding:10px;xdisplay:inline-block;width:175px;" name="myFile"     placeholder="image"      title="Upload image">
            <input type="text"  size="4"  id="ask"         name="ask"         placeholder="price"      title="Asking price. Leave blank to make, 'Available upon request'"> <!--<br><input type="text"   style="color:#888888;xheight:100px;font-size:100%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="35" id="phoneEve" name="phoneEve" placeholder="2nd phone" title="Alternate phone number to reach customer. Example: 555-555-1212" > -->
		    <input type="text"  size="15" id="artist"      name="artist"      placeholder="artist"     title="Artist’s full first and last names. Example: John Doe, III" >
            <input type="text"  size="15" id="title"       name="title"       placeholder="title"      title="Title of the piece/work"       >
            <input type="text"  size="1"  id="year"        name="year"        placeholder="year"       title="Year the piece was created"    > <!--<br><input type="text"   style="color:#888888;xheight:100px;font-size:100%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="35" id="phoneEve" name="phoneEve" placeholder="2nd phone" title="Alternate phone number to reach customer. Example: 555-555-1212" > -->
            <select                                        name="type">
			    <option value=""  selected  > --type--            </option>
			    <option value="Primary"     > Primary             </option>
                <option value="Resale"      > Resale              </option>
            </select>
            <select                                        name="category">
			    <option value=""  selected  > --category--        </option>
			    <option value="Photographs" > Photographs         </option>
                <option value="Prints"      > Prints & multiples  </option>
                <option value="Painting"    > Painting            </option>
                <option value="Sculpture"   > Sculpture           </option>
                <option value="Paper"       > Works on paper      </option>
                <option value="Design"      > Design              </option>
                <option value="Other"       > Other               </option>
            </select>
        <br><input type="checkbox" xchecked name="framed"   title="Check if the work is framed"                  >framed             &nbsp;
            <input type="checkbox" xchecked name="signed"   title="Check if the work is signed by the artist"    >signed             &nbsp;
            <input type="checkbox"  checked name="ctrOff"   title="Check if you will entertain counteroffers"    >counteroffers okay &nbsp;
            <input type="checkbox" xchecked name="mustSell" title="Check if seller is motivated to sell quickly" >must sell          &nbsp;
            <input type="text"  size="22" id="materials"   name="materials"   placeholder="medium or materials"  title="Materials used"                > 
            <input type="text"  size="35" id="keywords"    name="keywords"    placeholder="keywords"             title="Keywords others can search by" >
  	    <br>
        <!--<input type="text"  size="10" id="youtube"     name="youtube"     placeholder="youtube"              title="Link to YouTube video (if any)">-->
            <input type="text"  size="2"  id="height"      name="height"      placeholder="height"               title="Height in inches"              > 
            <input type="text"  size="1"  id="width"       name="width"       placeholder="width"                title="Width in inches"               > 
            <input type="text"  size="1"  id="depth"       name="depth"       placeholder="depth"                title="Depth in inches"               > 
            <input type="text"  size="2"  id="edition"     name="edition"     placeholder="edition"              title="Edition number"                > 
            <input type="text"  size="12" id="auctionID"   name="auctionID"   placeholder="auctionID"            title="Auction identification number" >
		    <select                       id="subcat"      name="subcat">
				<option value="000"          >--select subcategory--</option>
				<option value="001"          >19th & 20th Century Posters</option>
				<option value="002"          >19th Century European Art</option>
				<option value="003"          >19th Century Sculpture</option>
				<option value="004"          >20th Century British Art</option>
				<option value="005"          >20th Century Decorative Art & Design</option>
				<option value="006"          >African & Oceanic Art</option>
				<option value="007"          >American Art</option>
				<option value="008"          >American Folk Art</option>
				<option value="009"          >American Decorative Arts</option>
				<option value="010"          >Antiquities</option>
				<option value="011"          >Asian 20th Century & Contemporary Art</option>
				<option value="012"          >Australian Art</option>
				<option value="013"          >British & Irish Art</option>
				<option value="014"          >British Art on Paper</option>
				<option value="015"          >Chinese Ceramics & Works of Art</option>
				<option value="016"          >Chinese Classical & Modern Paintings</option>
				<option value="017"          >European Ceramics & Glass</option>
				<option value="018"          >European Decorative Objects & Early Sculpture</option>
				<option value="019"          >European Sculpture</option>
				<option value="020"          >Exploration and Travel Art</option>
				<option value="021"          >German & Austrian Art</option>
				<option value="022"          >Impressionist & Modern Art</option>
				<option value="023"          >Indian & Southeast Asian Art</option>
				<option value="024"          >Irish Art</option>
				<option value="025"          >Islamic Art</option>
				<option value="026"          >Japanese Art</option>
				<option value="027"          >Korean Art</option>
				<option value="028"          >Latin American Art</option>
				<option value="029"          >Maritime Pictures</option>
				<option value="030"          >Modern & Contemporary Arab & Iranian Art</option>
				<option value="031"          >Modern & Contemporary Indian Art</option>
				<option value="032"          >Old Master & Early British Paintings</option>
				<option value="033"          >Old Master Drawings</option>
				<option value="034"          >Orientalist Art</option>
				<option value="035"          >Post-War & Contemporary Art</option>
				<option value="036"          >Russian Pictures</option>
				<option value="037"          >Russian Works of Art & Fabergé</option>
				<option value="038"          >Scottish Art</option>
				<option value="039"          >South African Art</option>
				<option value="040"          >Southeast Asian Modern & Contemporary Art</option>
				<option value="041"          >Spanish Art</option>
				<option value="042"          >Sporting Art</option>
				<option value="043"          >Swiss Art</option>
				<option value="044"          >Victorian & British Impressionist Pictures</option>
            </select>
			<select             style="color:#888888;xheight:100px;font-size: 90%;padding: 1px  2px;xborder:1px solid #000000;border-radius:  3px;" title="Artist’s home country" name="homeCountry">
				<option value="0"   >--select artist country--</option>
				<option value="Aborigine"    >Aborigine</option>
				<option value="Afghanistan"  >Afghanistan</option>
				<option value="Albania"      >Albania</option>
				<option value="Algeria"      >Algeria</option>
				<option value="Angola"       >Angola</option>
				<option value="Antigua"      >Antigua</option>
				<option value="Argentina"    >Argentina</option>
				<option value="Armenia"      >Armenia</option>
				<option value="Australia"    >Australia</option>
				<option value="Austria"      >Austria</option>
				<option value="Azerbaijan"   >Azerbaijan</option>
				<option value="Bahamas"      >Bahamas</option>
				<option value="Bahrain"      >Bahrain</option>
				<option value="Bali"         >Bali</option>
				<option value="Bangladesh"   >Bangladesh</option>
				<option value="Belarus"      >Belarus</option>
				<option value="Belgium"      >Belgium</option>
				<option value="Bengal"       >Bengal</option>
				<option value="Benin"        >Benin</option>
				<option value="Bermuda"      >Bermuda</option>
				<option value="Bohemia"      >Bohemia</option>
				<option value="Bolivia"      >Bolivia</option>
				<option value="Bosnia"       >Bosnia</option>
				<option value="Brazil"       >Brazil</option>
				<option value="Brunei"       >Brunei</option>
				<option value="Bulgaria"     >Bulgaria</option>
				<option value="Burkina Faso" >Burkina Faso</option>
				<option value="Burma"        >Burma</option>
				<option value="Cambodia"     >Cambodia</option>
				<option value="Cameroon"     >Cameroon</option>
				<option value="Canada"       >Canada</option>
				<option value="Caribbean"    >Caribbean</option>
				<option value="Central African Republic">Central African Republic</option>
				<option value="Chile"        >Chile</option>
				<option value="China"        >China</option>
				<option value="Colombia"     >Colombia</option>
				<option value="Congo"        >Congo</option>
				<option value="Costa Rica"   >Costa Rica</option>
				<option value="Croatia"      >Croatia</option>
				<option value="Cuba"         >Cuba</option>
				<option value="Cyprus"       >Cyprus</option>
				<option value="Czech Republic">Czech Republic</option>
				<option value="Czechoslovakia">Czechoslovakia</option>
				<option value="Denmark"      >Denmark</option>
				<option value="Dominican Republic">Dominican Republic</option>
				<option value="Ecuador"      >Ecuador</option>
				<option value="Egypt"        >Egypt</option>
				<option value="Emirates"     >Emirates</option>
				<option value="England"      >England</option>
				<option value="Eritrea">Eritrea</option>
				<option value="Estonia">Estonia</option>
				<option value="Ethiopia">Ethiopia</option>
				<option value="Philippines">Philippines</option>
				<option value="Finland">Finland</option>
				<option value="Flanders">Flanders</option>
				<option value="France">France</option>
				<option value="Gabon">Gabon</option>
				<option value="Georgia">Georgia</option>
				<option value="Germany">Germany</option>
				<option value="Ghana">Ghana</option>
				<option value="Greece">Greece</option>
				<option value="Greenland">Greenland</option>
				<option value="Guadalajara">Guadalajara</option>
				<option value="Guadeloupe">Guadeloupe</option>
				<option value="Guatemala">Guatemala</option>
				<option value="Guyana">Guyana</option>
				<option value="Haiti">Haiti</option>
				<option value="Hawaii">Hawaii</option>
				<option value="Honduras">Honduras</option>
				<option value="Hungary">Hungary</option>
				<option value="Iceland">Iceland</option>
				<option value="India">India</option>
				<option value="Indonesia">Indonesia</option>
				<option value="Inuit">Inuit</option>
				<option value="Iran">Iran</option>
				<option value="Iraq">Iraq</option>
				<option value="Ireland">Ireland</option>
				<option value="Israel">Israel</option>
				<option value="Italy">Italy</option>
				<option value="Ivory Coast">Ivory Coast</option>
				<option value="Jamaica">Jamaica</option>
				<option value="Japan">Japan</option>
				<option value="Java">Java</option>
				<option value="Jordan">Jordan</option>
				<option value="Kazakhstan">Kazakhstan</option>
				<option value="Kenya">Kenya</option>
				<option value="South Korea">South Korea</option>
				<option value="Kosovo">Kosovo</option>
				<option value="Kuwait">Kuwait</option>
				<option value="Kyrgyzstan">Kyrgyzstan</option>
				<option value="Laos">Laos</option>
				<option value="Latvia">Latvia</option>
				<option value="Lebanon">Lebanon</option>
				<option value="Liberia">Liberia</option>
				<option value="Libya">Libya</option>
				<option value="Liechtenstein">Liechtenstein</option>
				<option value="Lithuania">Lithuania</option>
				<option value="Luxembourg">Luxembourg</option>
				<option value="Macedonia">Macedonia</option>
				<option value="Malagasy">Malagasy</option>
				<option value="Malawi">Malawi</option>
				<option value="Malaysia">Malaysia</option>
				<option value="Mali">Mali</option>
				<option value="Malta">Malta</option>
				<option value="Mauritia">Mauritia</option>
				<option value="Mexic0">Mexic0</option>
				<option value="Moldova">Moldova</option>
				<option value="Monaco">Monaco</option>
				<option value="Mongolia">Mongolia</option>
				<option value="Montenegro">Montenegro</option>
				<option value="Morocco">Morocco</option>
				<option value="Mozambique">Mozambique</option>
				<option value="Myanmar">Myanmar</option>
				<option value="Namibia">Namibia</option>
				<option value="Native America">Native America</option>
				<option value="Nepal">Nepal</option>
				<option value="Netherlands">Netherlands</option>
				<option value="New Zealand">New Zealand</option>
				<option value="Nicaragua">Nicaragua</option>
				<option value="Nigeria">Nigeria</option>
				<option value="North Korea">North Korea</option>
				<option value="Ireland">Ireland</option>
				<option value="Norway">Norway</option>
				<option value="Oaxaca">Oaxaca</option>
				<option value="Oman">Oman</option>
				<option value="Pakistan">Pakistan</option>
				<option value="Palau">Palau</option>
				<option value="Palestine">Palestine</option>
				<option value="Panama">Panama</option>
				<option value="Paraguay">Paraguay</option>
				<option value="Peru">Peru</option>
				<option value="Poland">Poland</option>
				<option value="Polynesia">Polynesia</option>
				<option value="Portugal">Portugal</option>
				<option value="Puerto Rico">Puerto Rico</option>
				<option value="Qatar">Qatar</option>
				<option value="Romania">Romania</option>
				<option value="Russia">Russia</option>
				<option value="El Salvador">El Salvador</option>
				<option value="Saudi Arabia">Saudi Arabia</option>
				<option value="Scandinavia">Scandinavia</option>
				<option value="Scotland">Scotland</option>
				<option value="Senegal">Senegal</option>
				<option value="Serbia">Serbia</option>
				<option value="Silesia">Silesia</option>
				<option value="Singapore">Singapore</option>
				<option value="Slovakia">Slovakia</option>
				<option value="Slovenia">Slovenia</option>
				<option value="South Africa">South Africa</option>
				<option value="Spain">Spain</option>
				<option value="Sri Lanka">Sri Lanka</option>
				<option value="Sudan">Sudan</option>
				<option value="Surinam">Surinam</option>
				<option value="Swaziland">Swaziland</option>
				<option value="Sweden">Sweden</option>
				<option value="Switzerland">Switzerland</option>
				<option value="Syria">Syria</option>
				<option value="Tahiti">Tahiti</option>
				<option value="Taiwan">Taiwan</option>
				<option value="Tanzania">Tanzania</option>
				<option value="Thailand">Thailand</option>
				<option value="Tibet">Tibet</option>
				<option value="Togolese">Togolese</option>
				<option value="Trinidad">Trinidad</option>
				<option value="Tunisia">Tunisia</option>
				<option value="Turkey">Turkey</option>
				<option value="Turkmenistan">Turkmenistan</option>
				<option value="Uganda">Uganda</option>
				<option value="Ukraine">Ukraine</option>
				<option value="United States">United States</option>
				<option value="United Kingdom">United Kingdom</option>
				<option value="Uruguay">Uruguay</option>
				<option value="Uzbekistan">Uzbekistan</option>
				<option value="Venezuela">Venezuela</option>
				<option value="Vietnam">Vietnam</option>
				<option value="Wales">Wales</option>
				<option value="Yemen">Yemen</option>
				<option value="Yugoslavia">Yugoslavia</option>
				<option value="Zambia">Zambia</option>
				<option value="Zimbabwe">Zimbabwe</option>
		    </select>
		<textarea style="color:#000000;font-family:arial;font-size:90%;padding:1px 2px;xborder:1px solid #000000;border-radius:3px;" rows="2" cols="140" form="listing" id="provenance" name="provenance" placeholder="provenance" title="Please provide for works over $20k" ></textarea> <!--<br><input type="text"   style="color:#888888;xheight:100px;font-size:100%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="35" id="phoneEve" name="phoneEve" placeholder="2nd phone" title="Alternate phone number to reach customer. Example: 555-555-1212" > -->
        </fieldset>
		<input type="button" value="List art for sale" onclick="myFunction()" style="xbackground:#000000;font-size:100%;xcolor:#FFFFFF;xfont-weight:bold;xborder-radius:3px;xpadding:1px 2px;xdisplay:inline-block;width:915px;" title=""><!-- Reference: http://stackoverflow.com/questions/5462251/button-width-in-css3 -->
	</form></div>
<script>
function onFailure(e){alert(e.message)}function onSuccess(){}//document.getElementById("result").innerHTML=str}//iframe doesn't work bc get request is only sent on page load. So we have the user click a link. //"<iframe src='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00' width='1200' height='1200'></iframe>"}//alert(/*"Input received!"* /document.getElementById("address").value)}
function myFunction(){//alert(/*document.forms["referral"]["cFullName"].value/*"Hello world"*/);document.forms["referral"]/*getElementById("referral")*/.reset();}//;document.getElementById("result").innerHTML="<img src='https://lh4.googleusercontent.com/-S3rRVyRoXeA/U62uSnnsXLI/AAAAAAAAMA4/N10K1jdADPY/s800/ajax-loader.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).receiveList(this.parentNode);this.parentNode.reset();document.getElementById("provenance").value="";}//**IMPORTANT**“this” gets the “name” property of the parent element, i.e., the form tag/element. In order to use the “this.parnentNote” method (as opposed to the document.getElementById() method) verify the form element has a proper “name” property. Otherwise, the function will fail “silently.”//document.getElementById("address").value)}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
</script></body></html>
<!-- -------------------------------------- OBSO --------------------------------------
		    <select             style="color:#888888;xheight:100px;font-size: 90%;padding: 1px  2px;xborder:1px solid #000000;border-radius:  3px;"  name="movement">
				<option value="0"   >--select movement--</option>
				<option value="2351">19th Century Photography</option>
				<option value="994">Aboriginal Australian</option>
				<option value="982">Abstract</option>
				<option value="1032">Abstract Expressionism</option>
				<option value="2125">Abstract Illusionism</option>
				<option value="1064">Academic</option>
				<option value="1866">Action Painting</option>
				<option value="1855">Aesthetic Movement</option>
				<option value="1066">African-American</option>
				<option value="1859">American Folk Art</option>
				<option value="1992">American Impressionism</option>
				<option value="1043">American Indian</option>
				<option value="2127">American Neoclassicism</option>
				<option value="2375">American Paintings</option>
				<option value="2126">American Romanticism</option>
				<option value="991">American Scene: Regionalism</option>
				<option value="1588">American Scene: Social Realism</option>
				<option value="1574">Amish</option>
				<option value="1857">Antebellum Era</option>
				<option value="941">Antiquities/ancient art</option>
				<option value="950">Art Deco (ca. 1920s-1930s)</option>
				<option value="1873">Art Informel</option>
				<option value="2384">Art Moderne</option>
				<option value="949">Art Nouveau</option>
				<option value="1013">Art Populaire</option>
				<option value="1549">Arte Povera</option>
				<option value="1065">Arts and Crafts / Mission</option>
				<option value="1081">Ashcan School</option>
				<option value="2426">Asian Contemporary</option>
				<option value="1089">Aubusson</option>
				<option value="1052">Avant-garde</option>
				<option value="1005">Baphuon</option>
				<option value="1056">Barbizon School</option>
				<option value="945">Baroque</option>
				<option value="955">Bauhaus</option>
				<option value="1074">Bay Area Figuration</option>
				<option value="1092">Belgian School</option>
				<option value="1559">Belle &#201;poque</option>
				<option value="956">Biedermeier</option>
				<option value="999">Borlou</option>
				<option value="1617">Buddhist</option>
				<option value="1553">Byzantine</option>
				<option value="1860">California Style</option>
				<option value="1613">Caravaggism</option>
				<option value="1596">Celtic</option>
				<option value="1021">Charles II</option>
				<option value="1012">Charles X</option>
				<option value="1619">Chiaroscuro</option>
				<option value="2353">Chicago Imagists</option>
				<option value="1861">Chinese Modern Period (1911–1945)</option>
				<option value="1885">Chinoiserie (1600–Present)</option>
				<option value="966">Chippendale</option>
				<option value="1858">Civil War/Reconstruction</option>
				<option value="984">Classical</option>
				<option value="1783">Cobra</option>
				<option value="1527">Colonial Period</option>
				<option value="1863">Color Field</option>
				<option value="1058">Conceptual Art</option>
				<option value="1552">Connecticut Impressionism</option>
				<option value="1084">Constructivism</option>
				<option value="952">Contemporary</option>
				<option value="2117">Contemporary Design</option>
				<option value="1068">Contemporary Realism</option>
				<option value="2376">Continental School</option>
				<option value="1548">Cosmic-pop</option>
				<option value="1038">Cubism</option>
				<option value="1075">Dada</option>
				<option value="2207">De Stijl</option>
				<option value="1053">Delftware</option>
				<option value="1898">Der Blaue Reiter</option>
				<option value="1899">Die Br&#252;cke</option>
				<option value="969">Directoire</option>
				<option value="1529">Documentary/Photojournalism</option>
				<option value="1612">Dutch School</option>
				<option value="1856">Early Republic</option>
				<option value="1077">Earthworks/LandArt</option>
				<option value="1087">Ecole de Paris</option>
				<option value="974">Edo Period (1603–1868)</option>
				<option value="954">Edwardian</option>
				<option value="1047">Emerging Artists</option>
				<option value="2118">Emerging Designers</option>
				<option value="995">Empire</option>
				<option value="1016">Eskimo</option>
				<option value="1028">Expressionism</option>
				<option value="2032">Fashion Photography</option>
				<option value="1059">Fauvism</option>
				<option value="1009">Federal</option>
				<option value="2003">Feminist Art</option>
				<option value="1104">Figurative</option>
				<option value="1067">Fluxus</option>
				<option value="986">Folk / Na&#239;ve Art</option>
				<option value="2030">Found object</option>
				<option value="1057">French School</option>
				<option value="1779">Futurism</option>
				<option value="1050">Geometric</option>
				<option value="1901">Geometric Abstraction</option>
				<option value="1002">George I</option>
				<option value="1004">George II</option>
				<option value="996">George III</option>
				<option value="1019">George IV</option>
				<option value="967">George XIII</option>
				<option value="965">Georgian</option>
				<option value="1900">German Expressionism</option>
				<option value="1878">Gilded Age</option>
				<option value="943">Gothic (ca. 1100s-1600s)</option>
				<option value="1062">Graffiti</option>
				<option value="1041">Guangxu (1875–1908, Qing Dynasty)</option>
				<option value="2328">Hague School</option>
				<option value="976">Han Dynasty (206 BC–220 AD)</option>
				<option value="1048">Hard Edge</option>
				<option value="1780">Harlem Renaissance</option>
				<option value="960">Henry II</option>
				<option value="1017">Hepplewhite</option>
				<option value="1061">Hudson River School</option>
				<option value="983">Impressionism</option>
				<option value="1551">Intimism</option>
				<option value="2282">Inuit</option>
				<option value="1606">Iron Age</option>
				<option value="1894">Islamic Art</option>
				<option value="1007">Kangxi (1661–1722, Qing Dynasty)</option>
				<option value="1830">Kinetic Art</option>
				<option value="1023">Lamaistic (Buddhist, Tibet, Mongolia)</option>
				<option value="2203">Latin American</option>
				<option value="1882">Les Nabis</option>
				<option value="1036">Liao Dynasty (907–1125)</option>
				<option value="961">Louis XIII</option>
				<option value="962">Louis XIV (ca. 1643-1715)</option>
				<option value="964">Louis XV / Country Style (1723-1774)</option>
				<option value="968">Louis XVI (ca. 1774-1793)</option>
				<option value="972">Louis-Philippe</option>
				<option value="1082">Luminism</option>
				<option value="1080">Magic Realism</option>
				<option value="1781">Mannerism</option>
				<option value="1045">Medieval</option>
				<option value="975">Meiji Period (1868–1912)</option>
				<option value="1071">Metaphysical</option>
				<option value="1816">Mid-Century Modern Design</option>
				<option value="2445">Middle Eastern Contemporary</option>
				<option value="979">Ming Dynasty (1368–1644)</option>
				<option value="1029">Minimalism</option>
				<option value="987">Modern</option>
				<option value="1888">Momoyama Period (1568–1603)</option>
				<option value="1611">Mono-Ha</option>
				<option value="1892">Mughal Period</option>
				<option value="1887">Muromachi Period (1392–1568)</option>
				<option value="1051">Naive Art</option>
				<option value="973">Napol&#233;on III</option>
				<option value="1572">Naturalism</option>
				<option value="947">Neoclassicism</option>
				<option value="2045">Neo-Conceptualism</option>
				<option value="1867">Neo-Dada</option>
				<option value="1868">Neo-Expressionism</option>
				<option value="1875">Neo-Figurative</option>
				<option value="2257">Neo-Geo</option>
				<option value="1011">Neo-Gothic</option>
				<option value="1091">Neo-Impressionism</option>
				<option value="1006">Neolithic</option>
				<option value="1547">Neo-Pop</option>
				<option value="1550">Neo-Romanticism</option>
				<option value="1807">Neue Sachlichkeit</option>
				<option value="1879">New Realism</option>
				<option value="1904">New Topography</option>
				<option value="2201">New York School</option>
				<option value="2304">Newlyn School</option>
				<option value="1003">Northern Song Dynasty (960–1127)</option>
				<option value="1106">Nude</option>
				<option value="1020">Ogol</option>
				<option value="1079">Old Lyme</option>
				<option value="988">Old Masters</option>
				<option value="1076">Op Art</option>
				<option value="2235">Orientalism</option>
				<option value="2281">Orphism</option>
				<option value="1044">Outsider Art / Art Brut</option>
				<option value="1078">Photorealism</option>
				<option value="1903">Photo-Secession</option>
				<option value="1035">Plein Air</option>
				<option value="2291">Pont-Aven School</option>
				<option value="1027">Pop Art</option>
				<option value="2330">Pop Surrealism</option>
				<option value="1880">Post War European Figuration</option>
				<option value="1046">Post-Impressionism</option>
				<option value="1877">Post-Minimalism</option>
				<option value="1869">Postmodern</option>
				<option value="2112">Post-Painterly Abstraction</option>
				<option value="1614">Pre-Baroque</option>
				<option value="990">Pre-Columbian</option>
				<option value="1556">Pre-Raphaelite</option>
				<option value="2004">Primitivism</option>
				<option value="1555">Purism</option>
				<option value="1025">Qianlong (1736–1795)</option>
				<option value="980">Qing Dynasty (1644–1911)</option>
				<option value="1001">Queen Anne</option>
				<option value="1893">Rajput Painting</option>
				<option value="1782">Rayonism</option>
				<option value="1030">Realism</option>
				<option value="963">R&#233;gence</option>
				<option value="970">Regency</option>
				<option value="944">Renaissance</option>
				<option value="1049">Representational</option>
				<option value="971">Restauration</option>
				<option value="1015">Rimpa School</option>
				<option value="946">Rococo</option>
				<option value="942">Romanesque</option>
				<option value="1037">Romanticism</option>
				<option value="1902">Russian Avant Garde</option>
				<option value="2204">Russian Contemporary</option>
				<option value="1881">Scottish Colourists</option>
				<option value="1063">Secessionist</option>
				<option value="1575">Shaker</option>
				<option value="1034">Shang Dynasty (ca. 1750-1050 BC)</option>
				<option value="997">Sheraton</option>
				<option value="2368">Shin Hanga</option>
				<option value="1747">Socrealism (Russian Socialist Realism)</option>
				<option value="1010">Song Dynasty (960–1279)</option>
				<option value="2369">Sosaku Hanga</option>
				<option value="1618">Southwest Art</option>
				<option value="1748">Soviet Impressionism</option>
				<option value="1072">Spatialism</option>
				<option value="2305">St Ives School</option>
				<option value="1039">Sui Dynasty (581–618)</option>
				<option value="2214">Suprematism</option>
				<option value="992">Surrealism</option>
				<option value="1093">Swiss School</option>
				<option value="1042">Symbolism</option>
				<option value="1040">Synthetism</option>
				<option value="977">Tang Dynasty (618–906)</option>
				<option value="1560">Taos School</option>
				<option value="1628">The Eight</option>
				<option value="1083">Tonalism</option>
				<option value="2290">Traditional Contemporary</option>
				<option value="948">Transition</option>
				<option value="1088">Trompe l&#39;oeil</option>
				<option value="957">Tudor</option>
				<option value="2367">Ukiyo-e</option>
				<option value="2284">Urban / Street Art</option>
				<option value="1014">U-Thong (Thai Buddhist)</option>
				<option value="953">Victorian</option>
				<option value="1073">Vintage</option>
				<option value="1824">Visionary Art</option>
				<option value="1070">Western / Frontier Art</option>
				<option value="1086">White Mountain School</option>
				<option value="959">William and Mary</option>
				<option value="1018">William IV</option>
				<option value="2354">Woodstock School</option>
				<option value="1055">WPA/FSA artists</option>
				<option value="1026">Yong Lo (Yongle, Ming, 1403–1424)</option>
				<option value="1862">Young British Artists</option>
				<option value="978">Yuan Dynasty (1279–1368)</option>
				<option value="2453">ZERO</option>
				<option value="1033">Zhou Dynasty (c.1050–256 BC)</option>
            </select>
		    <select             style="color:#888888;xheight:100px;font-size: 90%;padding: 1px  2px;xborder:1px solid #000000;border-radius:  3px;" name="nationality">
				<option value="0"   >--select artist nationality--</option>
				<option value="138">Aborigine</option>
				<option value="313">Afghani</option>
				<option value="139">Albanian</option>
				<option value="352">Albanian/Macedonian</option>
				<option value="2">Algerian</option>
				<option value="371">Algerian/French</option>
				<option value="3">American</option>
				<option value="412">American/Argentine</option>
				<option value="148">American/Armenian</option>
				<option value="11">American/Australian</option>
				<option value="13">American/Austrian</option>
				<option value="343">American/Belgian</option>
				<option value="375">American/Brazilian</option>
				<option value="162">American/British</option>
				<option value="5">American/Canadian</option>
				<option value="411">American/Chilean</option>
				<option value="27">American/Chinese</option>
				<option value="465">American/Colombian</option>
				<option value="449">American/Croatian</option>
				<option value="174">American/Cuban</option>
				<option value="176">American/Czech</option>
				<option value="35">American/Danish</option>
				<option value="322">American/Dominican</option>
				<option value="182">American/Dutch</option>
				<option value="453">American/Ecuadorian</option>
				<option value="423">American/Ethiopian</option>
				<option value="458">American/Filipino</option>
				<option value="48">American/French</option>
				<option value="202">American/German</option>
				<option value="409">American/Ghanaian</option>
				<option value="211">American/Greek</option>
				<option value="216">American/Hungarian</option>
				<option value="398">American/Indian</option>
				<option value="328">American/Iranian</option>
				<option value="329">American/Iranian</option>
				<option value="331">American/Iraqi</option>
				<option value="224">American/Irish</option>
				<option value="332">American/Israeli</option>
				<option value="73">American/Italian</option>
				<option value="77">American/Japanese</option>
				<option value="239">American/Korean</option>
				<option value="241">American/Latvian</option>
				<option value="422">American/Libyan</option>
				<option value="242">American/Lithuanian</option>
				<option value="246">American/Mexican</option>
				<option value="338">American/Mongolian</option>
				<option value="253">American/New Zealand</option>
				<option value="441">American/Nicaraguan</option>
				<option value="255">American/Norwegian</option>
				<option value="259">American/Peruvian</option>
				<option value="260">American/Polish</option>
				<option value="415">American/Portuguese</option>
				<option value="267">American/Romanian</option>
				<option value="102">American/Russian</option>
				<option value="429">American/Salvadoran</option>
				<option value="278">American/Scottish</option>
				<option value="281">American/Spanish</option>
				<option value="455">American/Sri Lankan</option>
				<option value="288">American/Swedish</option>
				<option value="289">American/Swiss</option>
				<option value="470">American/Taiwanese</option>
				<option value="469">American/Thai</option>
				<option value="442">American/Turkish</option>
				<option value="297">American/Ukrainian</option>
				<option value="299">American/Uruguayan</option>
				<option value="384">American/Venezuelan</option>
				<option value="300">American/Vietnamese</option>
				<option value="302">American/Yugoslavian</option>
				<option value="132">Angolan</option>
				<option value="445">Antiguan</option>
				<option value="8">Argentine</option>
				<option value="397">Argentine/French</option>
				<option value="145">Argentine/Italian</option>
				<option value="146">Argentine/Spanish</option>
				<option value="147">Argentine/Swiss</option>
				<option value="9">Armenian</option>
				<option value="373">Armenian/French</option>
				<option value="10">Australian</option>
				<option value="163">Australian/British</option>
				<option value="324">Australian/Chinese</option>
				<option value="183">Australian/Dutch</option>
				<option value="194">Australian/French</option>
				<option value="383">Australian/Japanese</option>
				<option value="426">Australian/New Zealand</option>
				<option value="270">Australian/Russian</option>
				<option value="12">Austrian</option>
				<option value="434">Austrian/Bulgarian </option>
				<option value="450">Austrian/Chinese </option>
				<option value="177">Austrian/Czech</option>
				<option value="149">Austrian/French</option>
				<option value="150">Austrian/German</option>
				<option value="136">Austrian/Hungarian</option>
				<option value="366">Austrian/Israeli</option>
				<option value="152">Austrian/Mexican</option>
				<option value="261">Austrian/Polish</option>
				<option value="268">Austrian/Romanian</option>
				<option value="153">Austrian/Swiss</option>
				<option value="408">Austrian/Turkish</option>
				<option value="419">Austrian/Ukrainian</option>
				<option value="303">Austrian/Yugoslavian</option>
				<option value="14">Azerbaijanian</option>
				<option value="155">Bahamian</option>
				<option value="348">Bahraini</option>
				<option value="156">Balinese</option>
				<option value="403">Bangladeshi</option>
				<option value="307">Belarusian</option>
				<option value="15">Belgian</option>
				<option value="468">Belgian/Canadian</option>
				<option value="427">Belgian/Chinese</option>
				<option value="418">Belgian/Czech</option>
				<option value="368">Belgian/Danish</option>
				<option value="158">Belgian/French</option>
				<option value="204">Belgian/German</option>
				<option value="405">Belgian/Italian</option>
				<option value="440">Belgian/Japanese</option>
				<option value="404">Belgian/Korean</option>
				<option value="466">Belgian/Polish</option>
				<option value="159">Bengali</option>
				<option value="356">Beninese</option>
				<option value="382">Beninese/French</option>
				<option value="461">Bermudian</option>
				<option value="160">Bohemian</option>
				<option value="16">Bolivian</option>
				<option value="17">Bosnian</option>
				<option value="18">Brazilian</option>
				<option value="428">Brazilian/ Bulgarian</option>
				<option value="431">Brazilian/Chinese</option>
				<option value="161">Brazilian/French</option>
				<option value="53">Brazilian/German</option>
				<option value="228">Brazilian/Italian</option>
				<option value="235">Brazilian/Japanese</option>
				<option value="247">Brazilian/Mexican</option>
				<option value="19">British</option>
				<option value="164">British/Canadian</option>
				<option value="437">British/Chinese</option>
				<option value="184">British/Dutch</option>
				<option value="195">British/French</option>
				<option value="166">British/German</option>
				<option value="217">British/Hungarian</option>
				<option value="406">British/Indian</option>
				<option value="454">British/Israeli</option>
				<option value="357">British/Korean</option>
				<option value="309">British/Palestinian</option>
				<option value="262">British/Polish</option>
				<option value="340">British/Portuguese</option>
				<option value="271">British/Russian</option>
				<option value="459">Bruneian</option>
				<option value="22">Bulgarian</option>
				<option value="169">Bulgarian/Israeli</option>
				<option value="435">Bulgarian/Italian</option>
				<option value="21">Burkinab&#232;</option>
				<option value="129">Burmese</option>
				<option value="353">Cambodian</option>
				<option value="23">Cameroonian</option>
				<option value="457">Cameroonian/French</option>
				<option value="24">Canadian</option>
				<option value="402">Canadian/Chinese</option>
				<option value="325">Canadian/French</option>
				<option value="205">Canadian/German</option>
				<option value="385">Canadian/Honduran</option>
				<option value="218">Canadian/Hungarian</option>
				<option value="374">Canadian/Iranian</option>
				<option value="225">Canadian/Irish</option>
				<option value="443">Canadian/Israeli</option>
				<option value="395">Canadian/Polish</option>
				<option value="416">Canadian/Romanian</option>
				<option value="272">Canadian/Russian</option>
				<option value="282">Canadian/Spanish</option>
				<option value="358">Canadian/Swiss</option>
				<option value="417">Canadian/Ukrainian </option>
				<option value="337">Caribbean</option>
				<option value="326">Central African Republic</option>
				<option value="25">Chilean</option>
				<option value="26">Chinese</option>
				<option value="432">Chinese/Dutch</option>
				<option value="390">Chinese/Filipino</option>
				<option value="392">Chinese/French</option>
				<option value="451">Chinese/Indian</option>
				<option value="394">Chinese/Indonesian</option>
				<option value="401">Chinese/Japanese</option>
				<option value="436">Chinese/Malaysian</option>
				<option value="438">Chinese/New Zealand</option>
				<option value="387">Chinese/Russian</option>
				<option value="425">Chinese/Singaporean</option>
				<option value="446">Chinese/Thai</option>
				<option value="28">Colombian</option>
				<option value="467">Colombian/Mexican</option>
				<option value="137">Congolese</option>
				<option value="29">Costa Rican</option>
				<option value="30">Croatian</option>
				<option value="377">Croatian/Montenegrin</option>
				<option value="31">Cuban</option>
				<option value="305">Cuban/French</option>
				<option value="283">Cuban/Spanish</option>
				<option value="175">Cypriot</option>
				<option value="33">Czech</option>
				<option value="424">Czech/Ecuadorian</option>
				<option value="206">Czech/German</option>
				<option value="367">Czech/Iraqi</option>
				<option value="179">Czech/Swiss</option>
				<option value="180">Czechoslovakian</option>
				<option value="34">Danish</option>
				<option value="54">Danish/German</option>
				<option value="36">Dominican</option>
				<option value="447">Dominican/Uruguayan</option>
				<option value="37">Dutch</option>
				<option value="185">Dutch/French</option>
				<option value="186">Dutch/German</option>
				<option value="187">Dutch/Italian</option>
				<option value="39">Ecuadorian</option>
				<option value="40">Egyptian</option>
				<option value="349">Emirati</option>
				<option value="41">English</option>
				<option value="364">English/German</option>
				<option value="433">Eritrean</option>
				<option value="191">Estonian</option>
				<option value="42">Ethiopian</option>
				<option value="43">Filipino</option>
				<option value="44">Finnish</option>
				<option value="193">Finnish/Swedish</option>
				<option value="45">Flemish</option>
				<option value="229">Flemish/Italian</option>
				<option value="46">French</option>
				<option value="196">French/German</option>
				<option value="197">French/Hungarian</option>
				<option value="379">French/Indian</option>
				<option value="226">French/Israeli</option>
				<option value="198">French/Italian</option>
				<option value="236">French/Japanese</option>
				<option value="439">French/Kuwaiti</option>
				<option value="363">French/Lebanese</option>
				<option value="420">French/Malagasy </option>
				<option value="199">French/Mexican</option>
				<option value="370">French/Moroccan</option>
				<option value="361">French/Peruvian</option>
				<option value="97">French/Polish</option>
				<option value="266">French/Portuguese</option>
				<option value="269">French/Romanian</option>
				<option value="103">French/Russian</option>
				<option value="410">French/Senegalese</option>
				<option value="284">French/Spanish</option>
				<option value="463">French/Sri Lankan</option>
				<option value="290">French/Swiss</option>
				<option value="369">French/Tunisian</option>
				<option value="296">French/Ukrainian</option>
				<option value="124">French/Venezuelan</option>
				<option value="462">French/Vietnamese</option>
				<option value="50">Gabonese</option>
				<option value="201">Georgian</option>
				<option value="51">German</option>
				<option value="207">German/Hungarian</option>
				<option value="407">German/Isreali</option>
				<option value="208">German/Italian</option>
				<option value="323">German/Korean</option>
				<option value="209">German/Mexican</option>
				<option value="90">German/Norwegian</option>
				<option value="263">German/Polish</option>
				<option value="273">German/Russian</option>
				<option value="291">German/Swiss</option>
				<option value="380">German/Venezuelan</option>
				<option value="306">Ghanaian</option>
				<option value="56">Greek</option>
				<option value="57">Greek/Italian</option>
				<option value="391">Greenlander</option>
				<option value="58">Guadalajaran</option>
				<option value="381">Guadeloupian</option>
				<option value="212">Guatemalan</option>
				<option value="213">Guyanese</option>
				<option value="60">Haitian</option>
				<option value="214">Hawaiian</option>
				<option value="215">Honduran</option>
				<option value="61">Hungarian</option>
				<option value="219">Hungarian/Swedish</option>
				<option value="220">Hungarian/Swiss</option>
				<option value="62">Icelandic</option>
				<option value="63">Indian</option>
				<option value="393">Indian/Ukrainian</option>
				<option value="221">Indonesian</option>
				<option value="222">Inuit</option>
				<option value="65">Iranian</option>
				<option value="223">Iraqi</option>
				<option value="66">Irish</option>
				<option value="279">Irish/South African</option>
				<option value="69">Israeli</option>
				<option value="264">Israeli/Polish</option>
				<option value="274">Israeli/Russian</option>
				<option value="378">Israeli/Ukrainian</option>
				<option value="70">Italian</option>
				<option value="232">Italian/Spanish</option>
				<option value="321">Italian/Swiss</option>
				<option value="233">Italian/Uruguayan</option>
				<option value="234">Ivorian</option>
				<option value="75">Jamaican</option>
				<option value="76">Japanese</option>
				<option value="237">Japanese/Swiss</option>
				<option value="238">Javanese</option>
				<option value="310">Jordanian</option>
				<option value="342">Kazakhstani </option>
				<option value="135">Kenyan</option>
				<option value="79">Korean</option>
				<option value="345">Kosovar</option>
				<option value="351">Kuwaiti</option>
				<option value="396">Kyrgyzstani</option>
				<option value="448">Lao</option>
				<option value="80">Latvian</option>
				<option value="81">Lebanese</option>
				<option value="400">Liberian</option>
				<option value="350">Libyan</option>
				<option value="336">Liechtensteiner</option>
				<option value="82">Lithuanian</option>
				<option value="456">Lithuanian/Swiss </option>
				<option value="243">Lithuanian/Uruguayan</option>
				<option value="244">Luxembourger</option>
				<option value="341">Macedonian</option>
				<option value="372">Malagasy</option>
				<option value="399">Malawian</option>
				<option value="83">Malaysian</option>
				<option value="131">Malian</option>
				<option value="245">Maltese</option>
				<option value="389">Mauritian</option>
				<option value="84">Mexican</option>
				<option value="275">Mexican/Russian</option>
				<option value="285">Mexican/Spanish</option>
				<option value="248">Moldavian</option>
				<option value="452">Moldavian/Russian</option>
				<option value="249">Monegasque</option>
				<option value="339">Mongolian</option>
				<option value="335">Montenegrin</option>
				<option value="86">Moroccan</option>
				<option value="251">Mozambican</option>
				<option value="430">Namibian</option>
				<option value="87">Native American</option>
				<option value="421">Nepalese</option>
				<option value="252">New Zealand</option>
				<option value="254">Nicaraguan</option>
				<option value="88">Nigerian</option>
				<option value="388">North Korean</option>
				<option value="327">Northern Irish</option>
				<option value="89">Norwegian</option>
				<option value="91">Oaxacan</option>
				<option value="376">Omani</option>
				<option value="92">Pakistani</option>
				<option value="464">Palauan</option>
				<option value="256">Palestinian</option>
				<option value="93">Panamanian</option>
				<option value="257">Paraguayan</option>
				<option value="258">Persian</option>
				<option value="94">Peruvian</option>
				<option value="96">Polish</option>
				<option value="413">Polish/Ukrainian</option>
				<option value="460">Polish/Venezuelan</option>
				<option value="265">Polynesian</option>
				<option value="128">Portuguese</option>
				<option value="98">Puerto Rican</option>
				<option value="362">Qatari</option>
				<option value="99">Romanian</option>
				<option value="101">Russian</option>
				<option value="414">Russian/Ukrainian</option>
				<option value="312">Salvadoran</option>
				<option value="347">Saudi Arabian</option>
				<option value="277">Scandinavian</option>
				<option value="105">Scottish</option>
				<option value="359">Senegalese</option>
				<option value="308">Serbian</option>
				<option value="330">Silesian</option>
				<option value="130">Singaporean</option>
				<option value="106">Slovakian</option>
				<option value="107">Slovenian</option>
				<option value="108">South African</option>
				<option value="110">Spanish</option>
				<option value="287">Sri Lankan</option>
				<option value="112">Sudanese</option>
				<option value="354">Surinamese</option>
				<option value="355">Swazi</option>
				<option value="113">Swedish</option>
				<option value="114">Swiss</option>
				<option value="116">Syrian</option>
				<option value="386">Tahitian </option>
				<option value="117">Taiwanese</option>
				<option value="292">Tanzanian</option>
				<option value="293">Thai</option>
				<option value="294">Tibetan</option>
				<option value="133">Togolese</option>
				<option value="118">Trinidadian</option>
				<option value="295">Tunisian</option>
				<option value="119">Turkish</option>
				<option value="365">Turkmen</option>
				<option value="360">Ugandan</option>
				<option value="120">Ukrainian</option>
				<option value="121">Uruguayan</option>
				<option value="444">Uzbek</option>
				<option value="123">Venezuelan</option>
				<option value="125">Vietnamese</option>
				<option value="301">Welsh</option>
				<option value="344">Yemeni</option>
				<option value="126">Yugoslavian</option>
				<option value="346">Zambian</option>
				<option value="127">Zimbabwean</option>
		    </select>-->