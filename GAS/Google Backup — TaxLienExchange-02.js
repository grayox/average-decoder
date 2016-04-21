//-------------------------------------- Code.gs --------------------------------------
// JSON visualization | viewer: http://chris.photobooks.com/json/default.htm
// function getEmailQuota(){Logger.log("Remaining email quota: " + MailApp.getRemainingDailyQuota());}
// Note: to accept doPost() from affiliate, (design decision:) must set: Publish > Deploy as web app > Execute the app as: me, Who has access to the app: Anyone, even anonymous // Otherwise, script will not run at server (though, client will receive responseCode=200); client response (200) is Google accounts sign-in page/form  // Decision Benefits: 1. script runs 2. script authorization bypass (i.e., not needed at UI) // Decision Costs: 1. Looser script security; mitigated by a. Site level access restrictions/permissions b. key method (e.g., switch/case k:foo)
function auth    (){}
function timer   (){Logger.log(new Date().getTime())}//1388228703613
function backup  (){var desc="Argenta™ Backup — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({});while(results.hasNext()){out.unshift(results.next())}id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);}
function print_dbScript(){var desc="Argenta™ Print — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({table:"note"});while(results.hasNext()){out.unshift(results.next())}id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);}
function print(str,desc){str=str||JSON.stringify(ScriptDb.getMyDb().load("S337185323966"));desc=desc||"TaxLienExchange Print — timestamp:"+new Date().getTime();DriveApp.createFile(desc,str,MimeType.HTML);}
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
	        case   /* table  serve         */ "hyg0hu5umfobawuzwi1f" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(serveTable           ( )) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
            case   /* table  receive       */ "owos3zj5e6xvcmu6lje1" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(receiveTable         (p)) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
         default                                                     : break;}}
	if(SitesApp.getActiveSite()){var siteName = SitesApp.getActiveSite().getName();switch(siteName){
            case   "taxlienexchange"               : 
					if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
                            case   "home"          : return HtmlService.createTemplateFromFile  (       "order.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                            case   "charts"        : return HtmlService.createTemplateFromFile  (       "chart.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                         // case   "home"          : return HtmlService.createHtmlOutputFromFile(       "order.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
                         // case   "authorize"     : return authorize ();break;
                         default                   :                    ;break;}}
        //  case   "creditrepairnation"            : // acquire inventory
		//			if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
        //                  case   "home"          : return HtmlService.createHtmlOutputFromFile(     "collect.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
		//  			 default                   :                    ;break;}}
         default                                   : break;}}}
function authorize(){return HtmlService.createHtmlOutput("<div align='center' style='color:#808080;font-family:verdana;color:orange;font-weight:bold;margin-top:15px;'>Authorization successful!<div style='color:#808080;font-size:smaller;font-weight:normal;'>You may now access all features</div><img src='https://lh5.googleusercontent.com/-a81AytXYq0Q/Umtn0FrFdhI/AAAAAAAAIyE/xCYArSNCR1k/s144/orange-check-mark.png' height='100'></div>")}
//function receiveTable(p){var user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null;MailApp.sendEmail({name:"TaxLienExchange",to:ob.email,subject:"Your limit order has been filled",htmlBody:(""+p.item+","+p.price+","+p.volume+","+p.type")});if(user){ob.owner=user}/*ob.nameFirst=name[0];ob.nameLast=name[1];*/LibraryjsUtil.dbParse({verb:"post",project:"mojo",className:"invitation",ob:ob})} // Example: @return{objectId="CE05GdsyLR",createdAt=2014-07-16T06:45:19.526Z} // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
function orderMatchArr(arr){//@return{array} Orders matching input array (excludes duplicates and user's own orders) //@param{array} Orders (usually all users orders)
    var out=[],temp,j,user=Session.getActiveUser().getEmail(),i=arr.length;while(i--){temp=orderMatch(arr[i]);
    j=temp.length;while(j--){if(temp[j]["email"]!=user&&!LibraryjsUtil.queryArray(out,{objectId:temp[j]["objectId"]},"objectId").length){out.push(temp[j])}}}
    return out}//function test(){var user=Session.getActiveUser().getEmail(),ar=LibraryjsUtil.dbParse({verb:"get",project:"taxLienExchange",className:"order",query:{email:user,status:"Open"}}).results;Logger.log(JSON.stringify(orderMatchArr(ar)))}
function orderMatch(ob){//ob=ob||{price:10,volume:5,type:"Buy"/*"Sell"*/,name:"Atlas",phone:"2064862010",email:"atlaslive@gmail.com"}//@return{array or false} all open orders "matching" this order or false if no matches //@param{object} ob: the order that needs matching //function test(){Logger.log(JSON.stringify(orderMatch({yield:5.25,volume:5,type:"Buy",name:"Atlas",phone:"2064862010",email:"atlaslive@gmail.com"})))} //function test(){Logger.log(JSON.stringify(orderMatch({yield:2,volume:5,type:"Buy"/*"Sell"*/,name:"Atlas",phone:"2064862010",email:"atlaslive@gmail.com"})))}
    var ar,q={},op=(ob.type=="Sell"/*"Buy"*/)?"$lte":"$gte";q[op]=ob.yield/*price*/;ar=LibraryjsUtil.dbParse({verb:"get",project:"taxLienExchange",className:"order",query:{status:"Open",/*price*/yield:q,type:{"$ne":ob.type}},sortBy:"yield"}).results;return ar}//(ar.length>0)?ar:false}//Logger.log(ar)} // Reference: https://www.parse.com/docs/rest#queries
function orderFill(ob){//ob=ob||{price:3.6,volume:500,type:"Buy"/*"Sell"*/,name:"Atlas",phone:"2064862010",email:"atlaslive@gmail.com"}//@return{void} "fills" all open orders "matching" this order //@param{object} ob: the order that needs matching
    var bal=ob.volume,ar=orderMatch(ob)/*.results.sort(function(a,b){var x="price";return(a[x]-b[x])})*/,i=ar.length;if(ob.type=="Buy"){ar.reverse()}//Logger.log(JSON.stringify(ar)); // Reference: https://www.parse.com/docs/rest#queries
    while(bal&&i--){                      ar[i].status               = "Pending"              ;
                                      //  ar[i].counterpartyName     = ob.name                ;
                                          ar[i].counterparty/*Email*/= ob.email               ;
                                      //  ar[i].counterpartyPhone    = ob.phone               ;
                                          if(bal>=ar[i].volume){bal -= ar[i].volume           }
                                          else                 {       ar[i].volume-=bal;bal=0}
                                          LibraryjsUtil.dbParse({verb:"put" ,project:"taxLienExchange",className:"order",ob:ar[i],obid:ar[i].objectId})
                   }if(bal){ob.volume=bal;LibraryjsUtil.dbParse({verb:"post",project:"taxLienExchange",className:"order",ob:ob                       })}}
function userUpdate_receive(ob){var u=Session.getUser().getEmail();/*LibraryjsUtil.dbParse("put","taxLienExchange","user",{email:u},{current:false});*/ob.email=u;ob.current=true;return LibraryjsUtil.dbParse({verb:"post",project:"taxLienExchange",className:"user",ob:ob})}//ob.price=Number(ob.price);ob.volume=Number(ob.volume);
function order_receive(ob){var AR=["yield","volume"],i=AR.length;while(i--){ob[AR[i]]=Number(ob[AR[i]])}ob.email=Session.getUser().getEmail();ob.status="Open";orderFill(ob);return LibraryjsUtil.dbParse({verb:"post",project:"taxLienExchange",className:"order",ob:ob})}//ob.price=Number(ob.price);ob.volume=Number(ob.volume);
function order_cancel (id){var user=Session.getUser().getEmail();LibraryjsUtil.dbParse({verb:"put",project:"taxLienExchange",className:"order",obid:id,ob:{status:"Cancelled",counterparty:user}})}
function order_fill   (id){var user=Session.getUser().getEmail();LibraryjsUtil.dbParse({verb:"put",project:"taxLienExchange",className:"order",obid:id,ob:{status:"Pending"  ,counterparty:user}})
    }//MailApp.sendEmail(["a.handy@sofadvisory.com","atlaslive@gmail.com"],"Argenta! was called "+out.Argenta.apiCalls+" times","during the 24-hour period ending "+out.date/*,{name:"Atlas",htmlBody:""}*/)}
function serveTable(){var r,ob=[],d=new Date(),t=d.getTime(),user=Session.getUser().getEmail()//,ar=LibraryjsUtil.dbParse("get","taxLienExchange"/*"marketMaker"*/,"order"/*,{owner:user},{status:"Open"}*/).results.sort(function(a,b){var x="price";return(a[x]-b[x])})
                                                                                                 ar=LibraryjsUtil.dbParse({verb:"get",project:"taxLienExchange",className:"order",sortBy:"yield"}).results,i=ar.length,out={"totalResultsCount":i+1,"records":[]};while(i--){out.records[i]={};r=ar[i];
	ob[i] = {
		"nolink"                         : {
				"item"                   : function(){try{return            r.objectId                              }catch(e){Logger.log(e.message);return "";}}() //
			,	"email"                  : function(){try{return            r.email                                 }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"fill"                   : function(){try{return              false                                 }catch(e){Logger.log(e.message);return "";}}() //
			,	"price"                  : function(){try{return                                r.yield             }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"priceStr"               : function(){try{return LibraryjsUtil.num2cur         (r.price,2)          }catch(e){Logger.log(e.message);return "";}}() //
			,	"priceStr"               : function(){try{return            r.yield.toFixed(2)+"%"                  }catch(e){Logger.log(e.message);return "";}}() //
			,	"status"                 : function(){try{return            r.status                                }catch(e){Logger.log(e.message);return "";}}() //
			,	"datePosted"             : function(){try{return LibraryjsUtil.timestamp2days(new Date(r.createdAt).getTime())}catch(e){Logger.log(e.message);return "";}}() //
			,	"dateFilled"             : function(){try{return LibraryjsUtil.timestamp2days(new Date(r.updatedAt).getTime())}catch(e){Logger.log(e.message);return "";}}() //
			,	"type"                   : function(){try{return            r.type                                  }catch(e){Logger.log(e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
			,	"volume"                 : function(){try{return                                r.volume            }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"volStr"                 : function(){try{return LibraryjsUtil.numberWithCommas(r.volume  )         }catch(e){Logger.log(e.message);return "";}}() //
			,	"volStr"                 : function(){try{return LibraryjsUtil.num2cur         (r.volume,0)         }catch(e){Logger.log(e.message);return "";}}() //
										   }
	,	"link"		                     : {}
	}
	var keys=Object.keys(ob[i].nolink),z=keys.length;while(z--){out.records[i][keys[z]]=              ob[i].nolink[keys[z]]                                   }
	    keys=Object.keys(ob[i].  link),z=keys.length;while(z--){out.records[i][keys[z]]='<a href="' + ob[i].  link[keys[z]] + '" target="_blank">&#10151;</a>'}//Logger.log(JSON.stringify(out.records[i]));
	}return out}//Logger.log(JSON.stringify(out))}
-------------------------------------- form.html (a template kit for implementing forms; must be unpacked) --------------------------------------
function processForm(formObject){var formBlob=formObject.myFile,driveFile=DriveApp.createFile(formBlob);return driveFile.getUrl()} // Goes in Code.gs // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
<form id="myForm"><input name="myFile" type="file"><input type="button" value="Submit" onclick="google.script.run.withSuccessHandler(updateUrl).processForm(this.parentNode);this.parentNode.reset()"></form><div id="output"></div><script>function updateUrl(url){document.getElementById("output").innerHTML='<a href="'+url+'">Got it!</a>'}</script><!--Goes in index.html; Reference: https://developers.google.com/apps-script/guides/html/communication#forms-->
-------------------------------------- chart.html --------------------------------------
<!DOCTYPE html><html>
<head>
    <meta charset="utf-8"/> <!--Improve search box: http://view.jquerymobile.com/1.4.0/demos/controlgroup/#Textinputs -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!--                                         Grey                                                              Blue                                                              Brown                                                             Green                                                             Purple                                                            Red                                                        -->
<!--<link rel="stylesheet" type="text/css" href="https://googledrive.com/host/0B1LVOoV_2dFtMEQxYks5SnY4UDQ" xhref="https://googledrive.com/host/0B1LVOoV_2dFtSEtlUmdQcEZWUEE" xhref="https://googledrive.com/host/0B1LVOoV_2dFtUnBXa242eGlpdzg" xhref="https://googledrive.com/host/0B1LVOoV_2dFtMXFxVFFqalRyNGs" xhref="https://googledrive.com/host/0B1LVOoV_2dFtOTlfTU9xQ1RueWM" xhref="https://googledrive.com/host/0B1LVOoV_2dFta1NwUVZheXR0ZFE"  />
<!--<link rel="stylesheet"                 href="https://ssl.gstatic.com/docs/script/css/add-ons.css"> <!-- Reference: https://developers.google.com/apps-script/add-ons/css -->
    <link rel="stylesheet" href="//www.fuelcdn.com/fuelux/3.2.1/css/fuelux.min.css"><!-- http://getfuelux.com/getting-started.html#templates Fuel UX extends Bootstrap with additional lightweight JavaScript controls for your web applications. -->
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bo/3.2.0/css/bootstrap.min.css"> <!-- Latest compiled and minified CSS --> <!-- http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css --> <!-- Color definitions: http://getbootstrap.com/customize/#colors | Blue:#428bca(hover:#3071a9) -->
<!--<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css"> <!-- Optional theme -->
<!--<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons.css"> <!-- Google styles | Reference: https://developers.google.com/apps-script/add-ons/css -->
<!--<link rel="stylesheet" href="https://googledrive.com/host/0B1LVOoV_2dFtMzM0LXE2QTU4b1E"><!--Tables-->
    <style></style>
</head>
<body><div class="container-fluid">
    <?var r=LibraryjsUtil.getBankRates();?>
	<div class="row">
	<div class="col-xs-5 col-xs-offset-3"><div class="panel panel-default"><div class="panel-heading" xstyle="text-align:center">Bond Yield and Market Rate Indexes
						  <!--<span class="glyphicon glyphicon-question-sign"></span>--><img height="15" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="The Bond Buyer 20 bond index is a barometer for yields on tax-free bonds issued by state governments and local municipalities. The Fannie Mae 30-year mortgage commitment for delivery within 60 days helps mortgage lenders determine what rates to charge on 30-year fixed rate mortgages that are to be sold to Fannie Mae within the next 60 days. The LIBOR rates, which stand for London Interbank Offered Rate, are benchmark interest rates for many adjustable rate mortgages, business loans, and financial instruments traded on global financial markets."></div>
		<div class="panel-body datagrid" xclass="" xstyle="margin:auto;width:300px;xwidth:50%">
		<table class="table table-striped table-hover" xstyle="text-align:center;margin:auto;width:100%"><thead><th></th><th></th><th>This week</th><th>Month ago</th><th>Year ago</th></thead><tfoot><tr><td colspan="5" style="font-size:80%;text-align:right">Updated: <?=r.updated?></td></tr></tfoot>
		<tbody>
		<tr><td><!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" class="help-icon" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="What it means: Bond Buyer is a daily publication, commonly known as the Red Book, featuring many essential statistics and index figures relative to the fixed income markets. This index tracks the prices of a selected group of municipal bonds. How it’s used: It’s an index that is used to set the cost of municipal debt. It helps indicate the direction of municipal bond prices, but otherwise has little impact on most ordinary investors."></td>
		    <td>Bond Buyer’s 20 bond index    </td><td><?=r.bb_wk  ?></td><td><?=r.bb_mo  ?></td><td><?=r.bb_yr  ?></td></tr>
		<tr><td><!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" class="help-icon" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="What it means: FFNMA is the stock symbol for Fannie Mae, a corporation created by Congress to support the secondary mortgage market. It buys mortgages from lenders, securitizes them, and sells the securities to investors. The index measures mortgage commitments (Mtg Com) for delivery (del) within 30 to 60 days; that is the required net yield on mortgage loans that lenders sell to FNMA, which in turn sells mortgage-backed securities to investors. How it’s used: It’s an index that is used primarily by lenders that sell their loans to Fannie Mae. The lenders use it to price their loans. It has little direct impact on ordinary investors."></td>
		    <td>FNMA 30 yr Mtg Com del 60 days</td><td><?=r.fm_wk  ?></td><td><?=r.fm_mo  ?></td><td><?=r.fm_yr  ?></td></tr>
		<tr><td><!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" class="help-icon" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="What it means: This is the interest rate charged by banks to brokers for money used to finance investors’ margin loans. How it’s used: This is the benchmark rate for what investors pay to buy securities on margin. A service charge or markup is typically added by the broker."></td>
		    <td>Call Money                    </td><td><?=r.cm_wk  ?></td><td><?=r.cm_mo  ?></td><td><?=r.cm_yr  ?></td></tr>
		<tr><td><!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" class="help-icon" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="What it means: LIBOR stands for London Interbank Offered Rate. It’s the rate of interest at which banks offer to lend money to one another in the wholesale money markets in London. It is a standard financial index used in U.S. capital markets and can be found in the Wall Street Journal. In general, its changes have been smaller than changes in the prime rate. How it’s used: It’s an index that is used to set the cost of various variable-rate loans. Lenders use such an index, which varies, to adjust interest rates as economic conditions change. They then add a certain number of percentage points called a margin, which doesn't vary, to the index to establish the interest rate you must pay. When this index goes up, interest rates on any loans tied to it also go up. Although it is increasingly used for consumer loans, it has traditionally been a reference figure for corporate financial transactions."></td>
		    <td>1 Month LIBOR Rate            </td><td><?=r.L30_wk ?></td><td><?=r.L30_mo ?></td><td><?=r.L30_yr ?></td></tr>
		<tr><td><!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" class="help-icon" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="What it means: LIBOR stands for London Interbank Offered Rate. It’s the rate of interest at which banks offer to lend money to one another in the wholesale money markets in London. It is a standard financial index used in U.S. capital markets and can be found in the Wall Street Journal. In general, its changes have been smaller than changes in the prime rate. How it’s used: It’s an index that is used to set the cost of various variable-rate loans. Lenders use such an index, which varies, to adjust interest rates as economic conditions change. They then add a certain number of percentage points called a margin, which doesn't vary, to the index to establish the interest rate you must pay. When this index goes up, interest rates on any loans tied to it also go up. Although it is increasingly used for consumer loans, it has traditionally been a reference figure for corporate financial transactions."></td>
		    <td>3 Month LIBOR Rate            </td><td><?=r.L90_wk ?></td><td><?=r.L90_mo ?></td><td><?=r.L90_yr ?></td></tr>
		<tr><td><!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" class="help-icon" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="What it means: LIBOR stands for London Interbank Offered Rate. It’s the rate of interest at which banks offer to lend money to one another in the wholesale money markets in London. It is a standard financial index used in U.S. capital markets and can be found in the Wall Street Journal. In general, its changes have been smaller than changes in the prime rate. How it’s used: It’s an index that is used to set the cost of various variable-rate loans. Lenders use such an index, which varies, to adjust interest rates as economic conditions change. They then add a certain number of percentage points called a margin, which doesn't vary, to the index to establish the interest rate you must pay. When this index goes up, interest rates on any loans tied to it also go up. Although it is increasingly used for consumer loans, it has traditionally been a reference figure for corporate financial transactions."></td>
		    <td>6 Month LIBOR Rate            </td><td><?=r.L180_wk?></td><td><?=r.L180_mo?></td><td><?=r.L180_yr?></td></tr>
		<tr><td><!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" class="help-icon" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="What it means: LIBOR stands for London Interbank Offered Rate. It’s the rate of interest at which banks offer to lend money to one another in the wholesale money markets in London. It is a standard financial index used in U.S. capital markets and can be found in the Wall Street Journal. In general, its changes have been smaller than changes in the prime rate. How it’s used: It’s an index that is used to set the cost of various variable-rate loans. Lenders use such an index, which varies, to adjust interest rates as economic conditions change. They then add a certain number of percentage points called a margin, which doesn't vary, to the index to establish the interest rate you must pay. When this index goes up, interest rates on any loans tied to it also go up. Although it is increasingly used for consumer loans, it has traditionally been a reference figure for corporate financial transactions."></td>
		    <td>1 Year LIBOR Rate             </td><td><?=r.L365_wk?></td><td><?=r.L365_mo?></td><td><?=r.L365_yr?></td></tr>
		</tbody></table></div></div></div></div></div>
<script src="//code.jquery.com/jquery.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src="//www.fuelcdn.com/fuelux/3.2.1/js/fuelux.min.js"></script>
</body></html>
-------------------------------------- order.html --------------------------------------
<!DOCTYPE html><html>
<head>
    <meta charset="utf-8"/> <!--Improve search box: http://view.jquerymobile.com/1.4.0/demos/controlgroup/#Textinputs -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!--                                         Grey                                                              Blue                                                              Brown                                                             Green                                                             Purple                                                            Red                                                        -->
<!--<link rel="stylesheet" type="text/css" href="https://googledrive.com/host/0B1LVOoV_2dFtMEQxYks5SnY4UDQ" xhref="https://googledrive.com/host/0B1LVOoV_2dFtSEtlUmdQcEZWUEE" xhref="https://googledrive.com/host/0B1LVOoV_2dFtUnBXa242eGlpdzg" xhref="https://googledrive.com/host/0B1LVOoV_2dFtMXFxVFFqalRyNGs" xhref="https://googledrive.com/host/0B1LVOoV_2dFtOTlfTU9xQ1RueWM" xhref="https://googledrive.com/host/0B1LVOoV_2dFta1NwUVZheXR0ZFE"  />
<!--<link rel="stylesheet"                 href="https://ssl.gstatic.com/docs/script/css/add-ons.css"> <!-- Reference: https://developers.google.com/apps-script/add-ons/css -->
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"> <!-- Latest compiled and minified CSS --> <!-- http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css --> <!-- Color definitions: http://getbootstrap.com/customize/#colors | Blue:#428bca(hover:#3071a9) -->
    <link rel="stylesheet" href="//www.fuelcdn.com/fuelux/3.2.1/css/fuelux.min.css"><!-- http://getfuelux.com/getting-started.html#templates Fuel UX extends Bootstrap with additional lightweight JavaScript controls for your web applications. -->
<!--<link rel="stylesheet" href="https://googledrive.com/host/0B1LVOoV_2dFtalpJaXZlSVlNbkU"> <!-- Hosted version of above file (v3.3.1) — Doesn't work yet -->
<!--<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css"> <!-- Optional theme -->
<!--<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons.css"> <!-- Google styles | Reference: https://developers.google.com/apps-script/add-ons/css -->
<!--<link rel="stylesheet" href="https://googledrive.com/host/0B1LVOoV_2dFtMzM0LXE2QTU4b1E"><!--Tables-->
<!--<script type="text/javascript" charset="utf8" src="https://googledrive.com/host/0B1LVOoV_2dFtRE9QbU5iem9JM0U"></script>--> <!-- bootstrap.min.js -->
	<style>
	   xform         {xbackground:grey;xpadding:6px;xborder:2px solid #DDDDDD;border-radius:8px}
	   xdiv.container{xwidth:770px;xmargin:0 auto;xtext-align:left}
	   xfieldset     {text-align:left;border-radius:3px}
       xselect       {color:#888888;text-align:center}
       xinput        {color:#000000;xheight:100px;font-size:90%;padding:1px 2px;xborder:1px solid #000000;border-radius:3px;text-align:left}
        input,select,
	   .form-control {width:auto;padding:7px 10px;border-radius:5px;xmargin-bottom:3px;xcolor-blue-button-primary:#428bca;xcolor-blue-button-hover:#3071a9;xcolor:#3e0901;text-align:center;}
	   .help-element {padding-right:0px}
	   .help-cell    {padding-left:0px}
	   .help-icon    {float:left}
		html         {text-align:left;font-family:sans-sarif;font-size:100%;color:#888888;"}
	   #volume,#yield{width: 80px;border-radius:0px;border-style:solid;border-width:1px;border-color:#CCCCCC;padding:7px 10px;}
	   #volume       {width:120px;border-radius:0px 5px 5px 0px;}
	   #phone        {width:120px}
	    h1           {font-size:150%;font-weight:bold  ;color:#BBBBBB;text-align:center}
	    h2           {font-size:150%;font-weight:normal;color:#000000}
	    hr           {width:400px}
		th           {text-align:center}
		td           {padding:3px 5px;vertical-align:middle}
    </style>
</head>
<body><div class="container-fluid">
      <?var user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null,arr,mm=orderMatchArr(LibraryjsUtil.dbParse({verb:"get",project:"taxLienExchange",className:"order",query:{email:user,status:"Open"}}).results)
	            ,ar_mm=[],ar_ao=[],ar_mo=[],ar_ap=[],ar_mp=[],ar_ac=[],ar_mc=[],ar=serveTable().records,i=ar.length;while(i--){
		    if(ar[i].status=="Open"   ){ar_ao.push(ar[i]);        if(ar[i].email==user){ar_mo.push(ar[i])}} // Load open    arrays , all + my
		    if(ar[i].status=="Pending"){ar_ap.push(ar[i]);        if(ar[i].email==user){ar_mp.push(ar[i])}} // Load pending arrays , all + my
		    if(ar[i].status=="Closed" ){ar_ac.push(ar[i]);        if(ar[i].email==user){ar_mc.push(ar[i])}} // Load closed  arrays , all + my
		    if(LibraryjsUtil.queryArray(mm,{objectId:ar[i]["item"]},"objectId").length){ar_mm.push(ar[i]) } // Load matched orders ,       my
	   }arr=ar_ao;
	    var mp,i=arr.length,temp=arr[i-1].type;while(i--){if(temp!=arr[i].type){mp=[arr[i].price,arr[i+1].price].sort(function(a,b){return(a-b)});break}else{temp=arr[i].type}}?>
	<!-- <div class="row"> Market price panel was here </div> -->
      <?var uynf="",uync="",uyp="",p=user?("value='"+user+"' disabled"):"placeholder='Your email'"
          ; try{if(user){u=LibraryjsUtil.dbParse({verb:"get",project:"taxLienExchange",className:"user",query:{email:user}}).results[0]}}catch(e){Logger.log(e.message)}try{uynf=u.yNameFull?"value='"+u.yNameFull+"'":""}catch(e){}
		                                                                                                                                                                try{uync=u.yNameComp?"value='"+u.yNameComp+"'":""}catch(e){}
		                        																																		try{uyp =u.yPhone   ?"value='"+u.yPhone   +"'":""}catch(e){}?>
	<div class="row">
	<div class="col-xs-6"><div class="panel panel-primary"><div class="panel-heading">Create a New Order
	                      <!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" src="https://lh5.googleusercontent.com/-Czi3VENVvuw/VGR4WFWA_CI/AAAAAAAANIQ/l99_UI8Shb0/s144/question.png" title="Place your indicative (non-binding) “limit order” for a tax lien certificate here. A limit order is an order where you specify your buy or sell price and wait for a counterparty to come along and match it. Or, you can look at open orders and match one that has already been placed.">
	                      <!--<span class="glyphicon glyphicon-question-sign"></span>-- ><img height="15" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png">
	                      <!--<span class="glyphicon glyphicon-plus-sign"    ></span>-- ><img height="14" src="https://lh4.googleusercontent.com/-qfsYcPDhFpk/VGMjemXK03I/AAAAAAAANF8/mj2BfzU0e44/s800/icons-plus.png">--></div>
    <form id="order" name="order" class="form-inline" role="form"><!--References: https://developers.google.com/apps-script/guides/html-service-communication#forms https://developers.google.com/apps-script/guides/html-service-communication#user_objects-->
  		<table><tbody><tr>
	    <td class="help-element">
		    <span class="form-group">
				<label for="type" hidden>Type</label>
				<select class="form-control"  required name="type" id="type" >
					<option value=""      >--Type--</option>
					<option value="Buy"   >  Buy   </option>
					<option value="Sell"  >  Sell  </option>
				</select>
		    </span>
		</td><td class="help-cell">
			<!--<span class="glyphicon glyphicon-info-sign"    ></span>-- ><img height="14" class="help-icon" src="https://lh5.googleusercontent.com/-pvPShtKaFV8/VGMjeK4ZUNI/AAAAAAAANGA/qslBHr6vaTQ/s800/icon-info.png">
            <!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" class="help-icon" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="There are two types of orders: “Buy” and “Sell.”">
		</td><td class="help-element">
		    <span class="form-group">
				<label for="yield" hidden>Yield</label>
				<span class="input-group">
					<span class="input-group-addon">Target Yield</span>
					<input class="form-control" type="number" xsize="5" id="yield" name="yield" required  placeholder="Rate"  min="0" max="72" step="0.25" >
					<span class="input-group-addon">%</span>
			</span></span>
		</td><td class="help-cell">
			<!--<span class="glyphicon glyphicon-question-sign"></span>--><img height="15" class="help-icon" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="Rate of effective yield you offer (to sell) or seek (to buy)? The “current yield.” Annual earned interest divided by trade price.">
		<td><td class="help-element">
		    <span class="form-group">
			<label for="volume" hidden>Volume</label>
            <span class="input-group">
                <span class="input-group-addon">$</span>
                <input class="form-control" type="number" xsize="5" id="volume" name="volume" required  placeholder="Volume" min="0" step="1" > 
			</span></span>
		</td><td class="help-cell">
     		<!--<span class="glyphicon glyphicon-question-sign"></span>--><img height="15" class="help-icon" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="Dollar volume you seek to trade. Enter the face value of the certificate/s you seek to sell. Or, if buyer, the total investment you want to make. We calculate discounts and premiums from the agreed yield and payoff amount of the certificate; then, accordingly, adjust the amount the seller receives.">
		</td><td style="width:100%" >
	    <!--<input  type="button" class="btn btn-block btn-primary" role="button" xclass="blue|#428bca" value="Submit" onclick="google.script.run.withSuccessHandler().processForm_registerBuyer(this.parentNode);alert('Updated received!\n\nNow, refresh page to see updated max bids.');"> <!-- Reference: http://stackoverflow.com/questions/5462251/button-width-in-css3 -->
		    <input  type="button" class="btn btn-block btn-primary" role="button" xclass="blue|#428bca" value="Submit" onclick="myFunction_orderCreate();alert('Success!\n\nWe received your order.');" title="" ><!-- Reference: http://stackoverflow.com/questions/5462251/button-width-in-css3 -->
        <!--<div class="btn-group">
            <button type="button" class="btn btn-block btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Submit <span class="caret"></span></button>
                <ul class="dropdown-menu" role="menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li class="divider"></li>
                    <li><a href="#">Separated link</a></li>
                </ul></div>-->
		</td>
		</tr></tbody></table>
	</form></div></div>
	<div class="col-xs-1 xcol-xs-offset-6"><div class="panel xpanel-success panel-default"><div class="panel-heading" style="text-align:center">Market
						  <!--<span class="glyphicon glyphicon-question-sign"></span>--><img height="15" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="Lowest yield open buy order and highest yield open sell order."></div>
		<div xclass="datagrid" xclass="panel-body" xstyle="margin:auto;width:300px;xwidth:50%">
		<table xclass="table table-striped table-hover" style="text-align:center;margin:auto;width:100%"><thead><th>Buy</th><th>Sell</th></thead>
		<tbody><tr>
		<td><span class="label label-success"><?=function(){try{return /*LibraryjsUtil.num2cur*/(mp[0]).toFixed(2)}catch(e){Logger.log("Error B2Rcy: "+e.message);return "--"}}()?></span></td>
		<td><span class="label label-danger" ><?=function(){try{return /*LibraryjsUtil.num2cur*/(mp[1]).toFixed(2)}catch(e){Logger.log("Error G2OfN: "+e.message);return "--"}}()?></span></td>
		</tr></tbody></table></div></div></div>
	<div class="col-xs-5"><div class="panel panel-default"><div class="panel-heading">Update My Contact Info
	                      <!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="We notify you when a counterparty fills one or more of your orders.">
	                      <!--<span class="glyphicon glyphicon-user"         ></span>-- ><img height="14" src="https://lh4.googleusercontent.com/-qfsYcPDhFpk/VGMjemXK03I/AAAAAAAANF8/mj2BfzU0e44/s800/icons-plus.png">--></div>
    <form id="userUpdate" name="userUpdate" class="form-inline" role="form"><!--References: https://developers.google.com/apps-script/guides/html-service-communication#forms https://developers.google.com/apps-script/guides/html-service-communication#user_objects-->
  		<table><tbody><tr>
                 <td><input class="form-control" type="text"  xsize="30" id="email"  name="email"  placeholder="Email"   <?!=p?>    title="Your email address. Example: johndoe@example.com"        >
            </td><td><input class="form-control" type="text"  xsize="25" id="name"   name="name"   placeholder="Name"    <?!=uynf?> title="Your full first and last names. Example: John Doe, III"  >
            </td><td><input class="form-control" type="text"  xsize="11" id="phone"  name="phone"  placeholder="Phone"   <?!=uyp?>  title="Your company phone number. Example: 555-555-1212"        > <!--<br><input type="text"   style="color:#888888;xheight:100px;font-size:100%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="35" id="phoneEve" name="phoneEve" placeholder="2nd phone" title="Alternate phone number to reach customer. Example: 555-555-1212" > // Reference: http://stackoverflow.com/questions/1994406/set-image-as-submit-button // Works on jsfiddl.net but not GAS -->
		    </td><td><input type="button" class="btn xbtn-block btn-default" role="button" xclass="blue|#428bca" value="Update" onclick="myFunction_userUpdate();alert('Success!\n\nWe received your order.\n\nRefresh your browser to see your new order.');" title="" ><!-- Reference: http://stackoverflow.com/questions/5462251/button-width-in-css3 -->
		    </td></tr></tbody></table>
	</form></div></div>
	</div><div class="row">
			<div class="col-xs-3">
				<div class="panel panel-default"><div class="panel-heading">My Open Orders
	                      <!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="List of all your unfilled orders. Click “Cancel” to delete.">
	                      <!--<span class="glyphicon glyphicon-user"         ></span>-- ><img height="14" src="https://lh4.googleusercontent.com/-qfsYcPDhFpk/VGMjemXK03I/AAAAAAAANF8/mj2BfzU0e44/s800/icons-plus.png">--></div>
					<!--<h1>My open orders</h1>-->
					<div class="panel-body">
						<div class="datagrid" xclass="panel-body" xstyle="margin:auto;width:300px;xwidth:50%">
							<table class="table table-striped table-hover"><thead><th>Item</th><th>Type</th><th>Volume</th><th>Yield<!--Price--></th><th title="Cancel order">&#x2717;</th></thead><tfoot><tr><td colspan="6"><div id="no-paging" xid="paging">&nbsp;<!--<ul><li><a href="#" ><span>Previous</span></a></li><li><a href="#" class="active"><span>1</span></a></li><li><a href="#"><span>2</span></a></li><li><a href="#"><span>3</span></a></li><li><a href="#"><span>4</span></a></li><li><a href="#"><span>5</span></a></li><li><a href="#"><span>Next</span></a></li></ul>--></div></td></tr></tfoot>
							<tbody><?arr=ar_mo.reverse();i=arr.length;while(i--){var strAlt=(i%2)?"class='alt'":"";//vol=arr[i].volume?LibraryjsUtil.numberWithCommas(arr[i].volume):"",price=arr[i].price ?"$"+LibraryjsUtil.numberWithCommas(arr[i].price ):""
								 ?><tr <?!=strAlt?>><td title="This is the order made by your counterparty"><?=arr[i].item?></td><td style="text-align:center" title="This is what your counterparty wants to do. If this column says Buy, then to fill the order, you will Sell. And vice versa."><?=arr[i].type?></td><td style="text-align:right" title="The number of shares to be traded"><?=arr[i].volStr?></td><td title="The transaction price" style="text-align:right"><?=arr[i].priceStr?></td>
								    <td>
										<input type="checkbox" xchecked onClick="myFunction_orderCancel(<?=arr[i].item?>)" name="cancelOrder" title="Check to cancel order.">
									<!--<div class="checkbox checkbox-custom" id="myCheckbox" data-initialize="checkbox">
											<input type="checkbox" xchecked class="sr-only" onClick="myFunction_orderCancel(<?=arr[i].item?>)" name="cancelOrder" title="Check to cancel order." value="">
										</div>-->
									</td>
								   </tr><?}?>
							</tbody></table></div>
				    </div>
				</div>
				<div class="panel panel-default"><div class="panel-heading">My Pending Orders
	                      <!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="List of all your filled orders in process to close.">
	                      <!--<span class="glyphicon glyphicon-user"         ></span>-- ><img height="14" src="https://lh4.googleusercontent.com/-qfsYcPDhFpk/VGMjemXK03I/AAAAAAAANF8/mj2BfzU0e44/s800/icons-plus.png">--></div>
					<!--<h1>My pending orders</h1>-->
					<div class="panel-body">
						<div class="datagrid" xclass="panel-body" xstyle="margin:auto;width:300px;xwidth:50%">
							<table class="table table-striped table-hover"><thead><th>Item</th><th>Type</th><th>Volume</th><th>Yield<!--Price--></th><th title="Cancel order">&#x2717;</th></thead><tfoot><tr><td colspan="6"><div id="no-paging" xid="paging">&nbsp;<!--<ul><li><a href="#" ><span>Previous</span></a></li><li><a href="#" class="active"><span>1</span></a></li><li><a href="#"><span>2</span></a></li><li><a href="#"><span>3</span></a></li><li><a href="#"><span>4</span></a></li><li><a href="#"><span>5</span></a></li><li><a href="#"><span>Next</span></a></li></ul>--></div></td></tr></tfoot>
							<tbody><?arr=ar_mp.reverse();i=arr.length;while(i--){var strAlt=(i%2)?"class='alt'":"";//vol=arr[i].volume?LibraryjsUtil.numberWithCommas(arr[i].volume):"",price=arr[i].price ?"$"+LibraryjsUtil.numberWithCommas(arr[i].price ):""
								 ?><tr <?!=strAlt?>><td title="This is the order made by your counterparty"><?=arr[i].item?></td><td style="text-align:center" title="This is what your counterparty wants to do. If this column says Buy, then to fill the order, you will Sell. And vice versa."><?=arr[i].type?></td><td style="text-align:right" title="The number of shares to be traded"><?=arr[i].volStr?></td><td title="The transaction price" style="text-align:right"><?=arr[i].priceStr?></td>
								   <td><input type="checkbox" xchecked onClick="myFunction_orderCancel(<?=arr[i].item?>)"  name="cancelOrder" title="Check to cancel order."></td>
								   </tr><?}?>
							</tbody></table></div>
				    </div>
				</div>
				<div class="panel panel-default"><div class="panel-heading">My Closed Orders
	                      <!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="List of most recent closed trades.">
	                      <!--<span class="glyphicon glyphicon-user"         ></span>-- ><img height="14" src="https://lh4.googleusercontent.com/-qfsYcPDhFpk/VGMjemXK03I/AAAAAAAANF8/mj2BfzU0e44/s800/icons-plus.png">--></div>
					<!--<h1>My closed orders</h1>-->
					<div class="panel-body">
						<div class="datagrid" xclass="panel-body" xstyle="margin:auto;width:300px;xwidth:50%">
							<table class="table table-striped table-hover"><thead><th>Item</th><th>Type</th><th>Volume</th><th>Yield<!--Price--></th><!--<th>Fill</th>--></thead><tfoot><tr><td colspan="5"><div id="no-paging" xid="paging">&nbsp;<!--<ul><li><a href="#" ><span>Previous</span></a></li><li><a href="#" class="active"><span>1</span></a></li><li><a href="#"><span>2</span></a></li><li><a href="#"><span>3</span></a></li><li><a href="#"><span>4</span></a></li><li><a href="#"><span>5</span></a></li><li><a href="#"><span>Next</span></a></li></ul>--></div></td></tr></tfoot>
							<tbody><?arr=ar_mc.reverse();i=arr.length;while(i--){var strAlt=(i%2)?"class='alt'":"";//vol=arr[i].volume?LibraryjsUtil.numberWithCommas(arr[i].volume):"",price=arr[i].price ?"$"+LibraryjsUtil.numberWithCommas(arr[i].price ):""
								 ?><tr <?!=strAlt?>><td title="This is the order made by your counterparty"><?=arr[i].item?></td><td style="text-align:center" title="This is what your counterparty wants to do. If this column says Buy, then to fill the order, you will Sell. And vice versa."><?=arr[i].type?></td><td style="text-align:right" title="The number of shares to be traded"><?=arr[i].volStr?></td><td title="The transaction price" style="text-align:right"><?=arr[i].priceStr?></td>
								   <!--<td><input type="checkbox" xchecked xonClick="alert('A')"  name="fillOrder" title="Check to fill this order. To fill an order means to take the opposite side of the transaction. i.e., Buy if the order is to sell. And vice versa."></td>-->
								   </tr><?}?>
							</tbody></table></div>
				    </div>
				</div>
			</div>
			<div class="col-xs-3">
				<div class="panel panel-success"><div class="panel-heading">My Matched Orders
	                      <!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="All open orders that “match” your open orders. Check the “fill” box to accept the order and move it to pending.">
	                      <!--<span class="glyphicon glyphicon-user"         ></span>-- ><img height="14" src="https://lh4.googleusercontent.com/-qfsYcPDhFpk/VGMjemXK03I/AAAAAAAANF8/mj2BfzU0e44/s800/icons-plus.png">--></div>
					<!--<h1>All open orders</h1>-->
					<div class="panel-body">
						<div class="datagrid" xclass="panel-body" xstyle="margin:auto;width:300px;xwidth:50%">
							<table class="table table-striped table-hover"><thead><th>Item</th><th>Type</th><th>Volume</th><th>Yield<!--Price--></th><th>Fill</th></thead><tfoot><tr><td colspan="6"><div id="no-paging" xid="paging">&nbsp;<!--<ul><li><a href="#" ><span>Previous</span></a></li><li><a href="#" class="active"><span>1</span></a></li><li><a href="#"><span>2</span></a></li><li><a href="#"><span>3</span></a></li><li><a href="#"><span>4</span></a></li><li><a href="#"><span>5</span></a></li><li><a href="#"><span>Next</span></a></li></ul>--></div></td></tr></tfoot>
							<tbody><?arr=ar_mm.reverse();i=arr.length;while(i--){var strAlt=(i%2)?"class='alt'":"";//vol=arr[i].volume?LibraryjsUtil.numberWithCommas(arr[i].volume):"",price=arr[i].price ?"$"+LibraryjsUtil.numberWithCommas(arr[i].price ):""
								 ?><tr <?!=strAlt?>><td title="This is the order made by your counterparty"><?=arr[i].item?></td><td style="text-align:center" title="This is what your counterparty wants to do. If this column says Buy, then to fill the order, you will Sell. And vice versa."><?=arr[i].type?></td><td style="text-align:right" title="The number of shares to be traded"><?=arr[i].volStr?></td><td title="The transaction price" style="text-align:right"><?=arr[i].priceStr?></td>
								   <td><input type="checkbox" xchecked onClick="myFunction_orderFill(<?=arr[i].item?>)"  name="fillOrder" title="Check to fill this order. To fill an order means to take the opposite side of the transaction. i.e., Buy if the order is to sell. And vice versa."></td>
								   </tr><?}?>
							</tbody></table></div>
				    </div>
				</div>
				<div class="panel panel-danger"><div class="panel-heading">All Open Orders
	                      <!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="List of unfilled orders others have placed. Become the counterparty and do a trade by checking the “fill” box.">
	                      <!--<span class="glyphicon glyphicon-user"         ></span>-- ><img height="14" src="https://lh4.googleusercontent.com/-qfsYcPDhFpk/VGMjemXK03I/AAAAAAAANF8/mj2BfzU0e44/s800/icons-plus.png">--></div>
					<!--<h1>All open orders</h1>-->
					<div class="panel-body">
						<div class="datagrid" xclass="panel-body" xstyle="margin:auto;width:300px;xwidth:50%">
							<table class="table table-striped table-hover"><thead><th>Item</th><th>Type</th><th>Volume</th><th>Yield<!--Price--></th><th>Fill</th></thead><tfoot><tr><td colspan="6"><div id="no-paging" xid="paging">&nbsp;<!--<ul><li><a href="#" ><span>Previous</span></a></li><li><a href="#" class="active"><span>1</span></a></li><li><a href="#"><span>2</span></a></li><li><a href="#"><span>3</span></a></li><li><a href="#"><span>4</span></a></li><li><a href="#"><span>5</span></a></li><li><a href="#"><span>Next</span></a></li></ul>--></div></td></tr></tfoot>
							<tbody><?arr=ar_ao.reverse();i=arr.length;while(i--){var strAlt=(i%2)?"class='alt'":"";//vol=arr[i].volume?LibraryjsUtil.numberWithCommas(arr[i].volume):"",price=arr[i].price ?"$"+LibraryjsUtil.numberWithCommas(arr[i].price ):""
								 ?><tr <?!=strAlt?>><td title="This is the order made by your counterparty"><?=arr[i].item?></td><td style="text-align:center" title="This is what your counterparty wants to do. If this column says Buy, then to fill the order, you will Sell. And vice versa."><?=arr[i].type?></td><td style="text-align:right" title="The number of shares to be traded"><?=arr[i].volStr?></td><td title="The transaction price" style="text-align:right"><?=arr[i].priceStr?></td>
								   <td><input type="checkbox" xchecked onClick="myFunction_orderFill(<?=arr[i].item?>)"  name="fillOrder" title="Check to fill this order. To fill an order means to take the opposite side of the transaction. i.e., Buy if the order is to sell. And vice versa."></td>
								   </tr><?}?>
							</tbody></table></div>
				    </div>
				</div>
			</div>
			<div class="col-xs-3">
				<div class="panel panel-default"><div class="panel-heading">All Pending Transactions
	                      <!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="List of all filled orders in process to close.">
	                      <!--<span class="glyphicon glyphicon-user"         ></span>-- ><img height="14" src="https://lh4.googleusercontent.com/-qfsYcPDhFpk/VGMjemXK03I/AAAAAAAANF8/mj2BfzU0e44/s800/icons-plus.png">--></div>
					<!--<h1>All pending orders</h1>-->
					<div class="panel-body">
						<div class="datagrid" xclass="panel-body" xstyle="margin:auto;width:300px;xwidth:50%">
							<table class="table table-striped table-hover"><thead><th>Item</th><th>Age</th><th>Volume</th><th>Yield<!--Price--></th><!--<th>Fill</th>--></thead><tfoot><tr><td colspan="5"><div id="no-paging" xid="paging">&nbsp;<!--<ul><li><a href="#" ><span>Previous</span></a></li><li><a href="#" class="active"><span>1</span></a></li><li><a href="#"><span>2</span></a></li><li><a href="#"><span>3</span></a></li><li><a href="#"><span>4</span></a></li><li><a href="#"><span>5</span></a></li><li><a href="#"><span>Next</span></a></li></ul>--></div></td></tr></tfoot>
							<tbody><?arr=ar_ap.reverse();i=arr.length;while(i--){var strAlt=(i%2)?"class='alt'":"";//vol=arr[i].volume?LibraryjsUtil.numberWithCommas(arr[i].volume):"",price=arr[i].price ?"$"+LibraryjsUtil.numberWithCommas(arr[i].price ):""
								 ?><tr <?!=strAlt?>><td title="This is the order made by your counterparty"><?=arr[i].item?></td><td style="text-align:center" title="How many days ago the order was filled"><?=arr[i].dateFilled?></td><td style="text-align:right" title="The number of shares to be traded"><?=arr[i].volStr?></td><td title="The transaction price" style="text-align:right"><?=arr[i].priceStr?></td>
								   <!--<td><input type="checkbox" xchecked xonClick="alert('A')"  name="fillOrder" title="Check to fill this order. To fill an order means to take the opposite side of the transaction. i.e., Buy if the order is to sell. And vice versa."></td>-->
								   </tr><?}?>
							</tbody></table></div>
				    </div>
				</div>
			</div>
			<div class="col-xs-3">
				<div class="panel panel-default"><div class="panel-heading">All Closed Transactions
	                      <!--<span class="glyphicon glyphicon-question-sign"></span> --><img height="15" src="https://lh6.googleusercontent.com/-eY7ym_Fp4BM/VGMjeM1ugiI/AAAAAAAANGI/nCzT6fqLUjM/s800/icon-question.png" title="List of most recent closed trades.">
	                      <!--<span class="glyphicon glyphicon-user"         ></span>-- ><img height="14" src="https://lh4.googleusercontent.com/-qfsYcPDhFpk/VGMjemXK03I/AAAAAAAANF8/mj2BfzU0e44/s800/icons-plus.png">--></div>
					<!--<h1>All closed orders</h1>-->
					<div class="panel-body">
						<div class="datagrid" xclass="panel-body" xstyle="margin:auto;width:300px;xwidth:50%">
							<table class="table table-striped table-hover"><thead><th>Item</th><th>Age</th><th>Volume</th><th>Yield<!--Price--></th><!--<th>Fill</th>--></thead><tfoot><tr><td colspan="5"><div id="no-paging" xid="paging">&nbsp;<!--<ul><li><a href="#" ><span>Previous</span></a></li><li><a href="#" class="active"><span>1</span></a></li><li><a href="#"><span>2</span></a></li><li><a href="#"><span>3</span></a></li><li><a href="#"><span>4</span></a></li><li><a href="#"><span>5</span></a></li><li><a href="#"><span>Next</span></a></li></ul>--></div></td></tr></tfoot>
							<tbody><?arr=ar_ac.reverse();i=arr.length;while(i--){var strAlt=(i%2)?"class='alt'":"";//vol=arr[i].volume?LibraryjsUtil.numberWithCommas(arr[i].volume):"",price=arr[i].price ?"$"+LibraryjsUtil.numberWithCommas(arr[i].price ):""
								 ?><tr <?!=strAlt?>><td title="This is the order made by your counterparty"><?=arr[i].item?></td><td style="text-align:center" title="How many days ago the order was filled"><?=arr[i].dateFilled?></td><td style="text-align:right" title="The number of shares to be traded"><?=arr[i].volStr?></td><td title="The transaction price" style="text-align:right"><?=arr[i].priceStr?></td>
								   <!--<td><input type="checkbox" xchecked xonClick="alert('A')"  name="fillOrder" title="Check to fill this order. To fill an order means to take the opposite side of the transaction. i.e., Buy if the order is to sell. And vice versa."></td>-->
								   </tr><?}?>
							</tbody></table></div>
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
$("#myCheckbox").checkbox();
function onFailure(e){alert(e.message)}function onSuccess(){}//document.getElementById("result").innerHTML=str}//iframe doesn't work bc get request is only sent on page load. So we have the user click a link. //"<iframe src='https://googledrive.com/host/0B1LVOoV_2dFtNUZuRTZ6T0pPT00' width='1200' height='1200'></iframe>"}//alert(/*"Input received!"* /document.getElementById("address").value)}
function myFunction_orderFill  (obid){google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).order_fill  (obid);alert("Success!\n\nWe filled item# "+obid+".\n\nRefresh your browser to view it in your “My Pending Orders” table.")}
function myFunction_orderCancel(obid){google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).order_cancel(obid);alert("We deleted item# "+obid)}
function myFunction_orderCreate(){var r=document.getElementById("order")//alert(/*document.forms["referral"]["cFullName"].value/*"Hello world"*/);document.forms["referral"]/*getElementById("referral")*/.reset();}//;document.getElementById("result").innerHTML="<img src='https://lh4.googleusercontent.com/-S3rRVyRoXeA/U62uSnnsXLI/AAAAAAAAMA4/N10K1jdADPY/s800/ajax-loader.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).order_receive(r/*this.parentNode*/);/*this.parentNode*/r.reset()}//**IMPORTANT**“this” gets the “name” property of the parent element, i.e., the form tag/element. In order to use the “this.parnentNote” method (as opposed to the document.getElementById() method) verify the form element has a proper “name” property. Otherwise, the function will fail “silently.”//document.getElementById("address").value)}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
function myFunction_userUpdate(){var r=document.getElementById("userUpdate")//alert(/*document.forms["referral"]["cFullName"].value/*"Hello world"*/);document.forms["referral"]/*getElementById("referral")*/.reset();}//;document.getElementById("result").innerHTML="<img src='https://lh4.googleusercontent.com/-S3rRVyRoXeA/U62uSnnsXLI/AAAAAAAAMA4/N10K1jdADPY/s800/ajax-loader.gif'>";
    google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).userUpdate_receive(r/*this.parentNode*/)}//*this.parentNode*/r.reset()}//**IMPORTANT**“this” gets the “name” property of the parent element, i.e., the form tag/element. In order to use the “this.parnentNote” method (as opposed to the document.getElementById() method) verify the form element has a proper “name” property. Otherwise, the function will fail “silently.”//document.getElementById("address").value)}//document.getElementById("address").value}//Date()} //xonclick="google.script.run.withSuccessHandler(updateButton).withUserObject(this).processForm_registerSeller(this.parentNode)" //function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
</script></body></html>
