//-------------------------------------- Code.gs --------------------------------------
// JSON visualization | viewer: http://chris.photobooks.com/json/default.htm
// function getEmailQuota(){Logger.log("Remaining email quota: " + MailApp.getRemainingDailyQuota());}
// Note: to accept doPost() from affiliate, (design decision:) must set: Publish > Deploy as web app > Execute the app as: me, Who has access to the app: Anyone, even anonymous // Otherwise, script will not run at server (though, client will receive responseCode=200); client response (200) is Google accounts sign-in page/form  // Decision Benefits: 1. script runs 2. script authorization bypass (i.e., not needed at UI) // Decision Costs: 1. Looser script security; mitigated by a. Site level access restrictions/permissions b. key method (e.g., switch/case k:foo)
function auth    (){}
function timer   (){Logger.log(new Date().getTime())}//1388228703613
function backup  (){var desc="Argenta™ Backup — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({});while(results.hasNext()){out.unshift(results.next())}id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);}
function print   (){var desc="Argenta™ Print — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({table:"note"});while(results.hasNext()){out.unshift(results.next())}id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);}
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
	        case   /* table  serve         */ "hyg0hu5umfobawuzwi1f" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(serveTable           ( )) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
            case   /* table  receive       */ "owos3zj5e6xvcmu6lje1" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(receiveTable         (p)) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
         default                                                     : break;}}
	if(SitesApp.getActiveSite()){var siteName = SitesApp.getActiveSite().getName();switch(siteName){
            case   "marketmakerlive"               : 
					if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
                            case   "home"          : return HtmlService.createTemplateFromFile  (       "order.html").evaluate()                                      ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
                         // case   "home"          : return HtmlService.createHtmlOutputFromFile(       "order.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
                            case   "authorize"     : return authorize ();break;
                         default                   :                    ;break;}}
        //  case   "creditrepairnation"            : // acquire inventory
		//			if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
        //                  case   "home"          : return HtmlService.createHtmlOutputFromFile(     "collect.html").setSandboxMode(HtmlService.SandboxMode.NATIVE  );break;
		//  			 default                   :                    ;break;}}
         default                                   : break;}}}
function authorize(){return HtmlService.createHtmlOutput("<div align='center' style='color:#808080;font-family:verdana;color:orange;font-weight:bold;margin-top:15px;'>Authorization successful!<div style='color:#808080;font-size:smaller;font-weight:normal;'>You may now access all features</div><img src='https://lh5.googleusercontent.com/-a81AytXYq0Q/Umtn0FrFdhI/AAAAAAAAIyE/xCYArSNCR1k/s144/orange-check-mark.png' height='100'></div>")}
//function receiveTable(p){var user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():null;MailApp.sendEmail({name:"MarketMaker",to:ob.email,subject:"Your limit order has been filled",htmlBody:(""+p.item+","+p.price+","+p.volume+","+p.type")});if(user){ob.owner=user}/*ob.nameFirst=name[0];ob.nameLast=name[1];*/LibraryjsUtil.dbParse("post","mojo","invitation",ob)} // Example: @return{objectId="CE05GdsyLR",createdAt=2014-07-16T06:45:19.526Z} // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
function orderMatch(ob){//ob=ob||{price:10,volume:5,type:"Buy"/*"Sell"*/,name:"Atlas",phone:"2064862010",email:"atlaslive@gmail.com"}//@return{array} all open orders "matching" this order //@param{object} ob: the order that needs matching
    var ar,q={},op=(ob.type=="Buy")?"$lte":"$gte";q[op]=ob.price;ar=LibraryjsUtil.dbParse("get","marketMaker","order",{status:"Open",price:q,type:{"$ne":ob.type}});return ar}//Logger.log(ar)} // Reference: https://www.parse.com/docs/rest#queries
function orderFill(ob){//ob=ob||{price:3.6,volume:500,type:"Buy"/*"Sell"*/,name:"Atlas",phone:"2064862010",email:"atlaslive@gmail.com"}//@return{void} "fills" all open orders "matching" this order //@param{object} ob: the order that needs matching
    var bal=ob.volume,ar=orderMatch(ob).results.sort(function(a,b){var x="price";return(a[x]-b[x])}),i=ar.length;if(ob.type=="Buy"){ar.reverse()}//Logger.log(JSON.stringify(ar)); // Reference: https://www.parse.com/docs/rest#queries
    while(bal&&i--){                      ar[i].status               = "Pending"              ;
                                          ar[i].counterpartyName     = ob.name                ;
                                          ar[i].counterpartyEmail    = ob.email               ;
                                          ar[i].counterpartyPhone    = ob.phone               ;
                                          if(bal>=ar[i].volume){bal -= ar[i].volume           }
                                          else                 {       ar[i].volume-=bal;bal=0}
                                          LibraryjsUtil.dbParse("put" ,"marketMaker","order",ar[i].objectId,ar[i])
                   }if(bal){ob.volume=bal;LibraryjsUtil.dbParse("post","marketMaker","order",ob                  )}}
function receiveOrder(ob){var AR=["price","volume"],i=AR.length;while(i--){ob[AR[i]]=Number(ob[AR[i]])}ob.email=Session.getUser().getEmail();ob.status="Open";return LibraryjsUtil.dbParse("post","marketMaker","order",ob)}//ob.price=Number(ob.price);ob.volume=Number(ob.volume);
function serveTable(){var r,ob=[],d=new Date(),t=d.getTime(),user=Session.getUser().getEmail(),ar=LibraryjsUtil.dbParse("get","marketMaker","order"/*,{owner:user},{status:"Open"}*/).results.sort(function(a,b){var x="price";return(a[x]-b[x])}),i=ar.length,out={"totalResultsCount":i+1,"records":[]};while(i--){out.records[i]={};r=ar[i];
	ob[i] = {
		"nolink"                         : {
				"item"                   : function(){try{return            r.objectId                   }catch(e){Logger.log(e.message);return "";}}() //
			,	"email"                  : function(){try{return            r.email                      }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"fill"                   : function(){try{return              false                      }catch(e){Logger.log(e.message);return "";}}() //
			,	"price"                  : function(){try{return                                r.price  }catch(e){Logger.log(e.message);return "";}}() //
			,	"priceStr"               : function(){try{return LibraryjsUtil.num2cur         (r.price )}catch(e){Logger.log(e.message);return "";}}() //
			,	"status"                 : function(){try{return            r.status                     }catch(e){Logger.log(e.message);return "";}}() //
			,	"type"                   : function(){try{return            r.type                       }catch(e){Logger.log(e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
			,	"volume"                 : function(){try{return                                r.volume }catch(e){Logger.log(e.message);return "";}}() //
			,	"volStr"                 : function(){try{return LibraryjsUtil.numberWithCommas(r.volume)}catch(e){Logger.log(e.message);return "";}}() //
										   }
	,	"link"		                     : {}
	}
	var keys=Object.keys(ob[i].nolink),z=keys.length;while(z--){out.records[i][keys[z]]=              ob[i].nolink[keys[z]]                                   }
	    keys=Object.keys(ob[i].  link),z=keys.length;while(z--){out.records[i][keys[z]]='<a href="' + ob[i].  link[keys[z]] + '" target="_blank">&#10151;</a>'}//Logger.log(JSON.stringify(out.records[i]));
	}return out}//Logger.log(JSON.stringify(out))}
-------------------------------------- form.html (a template kit for implementing forms; must be unpacked) --------------------------------------
function processForm(formObject){var formBlob=formObject.myFile,driveFile=DriveApp.createFile(formBlob);return driveFile.getUrl()} // Goes in Code.gs // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
<form id="myForm"><input name="myFile" type="file"><input type="button" value="Submit" onclick="google.script.run.withSuccessHandler(updateUrl).processForm(this.parentNode);this.parentNode.reset()"></form><div id="output"></div><script>function updateUrl(url){document.getElementById("output").innerHTML='<a href="'+url+'">Got it!</a>'}</script><!--Goes in index.html; Reference: https://developers.google.com/apps-script/guides/html/communication#forms-->
-------------------------------------- order.html --------------------------------------
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
          ; try{if(user){u=LibraryjsUtil.dbParse("get","marketMaker","usera",{email:user}).results[0]}}catch(e){Logger.log(e.message)}try{uynf=u.yNameFull?"value='"+u.yNameFull+"'":""}catch(e){}try{uync=u.yNameComp?"value='"+u.yNameComp+"'":""}catch(e){}try{uyp=u.yPhone?"value='"+u.yPhone+"'":""}catch(e){}?>
    <div style="width:770px;margin:0 auto;xtext-align:left">
    <form id="listing"><!--References: https://developers.google.com/apps-script/guides/html-service-communication#forms https://developers.google.com/apps-script/guides/html-service-communication#user_objects-->
        <fieldset><legend>Order</legend>
            <input type="text"  size="30" id="email"  name="email"  placeholder="Email"   <?!=p?>    title="Your email address. Example: johndoe@example.com"        >
		    <input type="text"  size="25" id="name"   name="name"   placeholder="Name"    <?!=uynf?> title="Your full first and last names. Example: John Doe, III"  >
            <input type="text"  size="11" id="phone"  name="phone"  placeholder="Phone"   <?!=uyp?>  title="Your company phone number. Example: 555-555-1212"        > <!--<br><input type="text"   style="color:#888888;xheight:100px;font-size:100%;padding:5px;xborder:1px solid #00DD00;border-radius:5px;" size="35" id="phoneEve" name="phoneEve" placeholder="2nd phone" title="Alternate phone number to reach customer. Example: 555-555-1212" > // Reference: http://stackoverflow.com/questions/1994406/set-image-as-submit-button // Works on jsfiddl.net but not GAS -->
            <select                                   name="type"   >
			    <option value=""      >--Type--</option>
			    <option value="Buy"   >  Buy   </option>
                <option value="Sell"  >  Sell  </option>
            </select>
            <input type="text"  style="text-align:right"  size="5" id="volume"   name="volume"   placeholder="Volume"  title="Number of shares to trade"  > 
            <input type="text"  style="text-align:right"  size="5" id="price"    name="price"    placeholder="Price"   title="Price per share (in USD)"   >
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
	<h1>All pending orders</h1>
        <div class="datagrid" style="margin:auto;width:300px;xwidth:50%">
            <table><thead><th>Item</th><th>Type</th><th>Vol</th><th>Price</th><!--<th>Fill</th>--></thead><tfoot><tr><td colspan="5"><div id="no-paging" xid="paging">&nbsp;<!--<ul><li><a href="#" ><span>Previous</span></a></li><li><a href="#" class="active"><span>1</span></a></li><li><a href="#"><span>2</span></a></li><li><a href="#"><span>3</span></a></li><li><a href="#"><span>4</span></a></li><li><a href="#"><span>5</span></a></li><li><a href="#"><span>Next</span></a></li></ul>--></div></td></tr></tfoot>
            <tbody><?arr=ar_ap.reverse();i=arr.length;while(i--){var strAlt=(i%2)?"class='alt'":"";//vol=arr[i].volume?LibraryjsUtil.numberWithCommas(arr[i].volume):"",price=arr[i].price ?"$"+LibraryjsUtil.numberWithCommas(arr[i].price ):""
                 ?><tr <?!=strAlt?>><td title="This is the order made by your counterparty"><?=arr[i].item?></td><td style="text-align:center" title="This is what your counterparty wants to do. If this column says Buy, then to fill the order, you will Sell. And vice versa."><?=arr[i].type?></td><td style="text-align:right" title="The number of shares to be traded"><?=arr[i].volStr?></td><td title="The transaction price" style="text-align:right"><?=arr[i].priceStr?></td>
	 	           <!--<td><input type="checkbox" xchecked name="fillOrder" title="Check to fill this order. To fill an order means to take the opposite side of the transaction. i.e., Buy if the order is to sell. And vice versa."></td>-->
		           </tr><?}?>
	        </tbody></table></div>
	<h1>My pending orders</h1>
	    <div class="datagrid" style="margin:auto;width:300px;xwidth:50%">
            <table><thead><th>Item</th><th>Type</th><th>Vol</th><th>Price</th><!--<th>Fill</th>--></thead><tfoot><tr><td colspan="5"><div id="no-paging" xid="paging">&nbsp;<!--<ul><li><a href="#" ><span>Previous</span></a></li><li><a href="#" class="active"><span>1</span></a></li><li><a href="#"><span>2</span></a></li><li><a href="#"><span>3</span></a></li><li><a href="#"><span>4</span></a></li><li><a href="#"><span>5</span></a></li><li><a href="#"><span>Next</span></a></li></ul>--></div></td></tr></tfoot>
            <tbody><?arr=ar_mp.reverse();i=arr.length;while(i--){var strAlt=(i%2)?"class='alt'":"";//vol=arr[i].volume?LibraryjsUtil.numberWithCommas(arr[i].volume):"",price=arr[i].price ?"$"+LibraryjsUtil.numberWithCommas(arr[i].price ):""
                 ?><tr <?!=strAlt?>><td title="This is the order made by your counterparty"><?=arr[i].item?></td><td style="text-align:center" title="This is what your counterparty wants to do. If this column says Buy, then to fill the order, you will Sell. And vice versa."><?=arr[i].type?></td><td style="text-align:right" title="The number of shares to be traded"><?=arr[i].volStr?></td><td title="The transaction price" style="text-align:right"><?=arr[i].priceStr?></td>
	 	           <!--<td><input type="checkbox" xchecked name="fillOrder" title="Check to fill this order. To fill an order means to take the opposite side of the transaction. i.e., Buy if the order is to sell. And vice versa."></td>-->
		           </tr><?}?>
	        </tbody></table></div>
	<hr>
	<h1>All closed orders</h1>
	    <div class="datagrid" style="margin:auto;width:300px;xwidth:50%">
            <table><thead><th>Item</th><th>Type</th><th>Vol</th><th>Price</th><!--<th>Fill</th>--></thead><tfoot><tr><td colspan="5"><div id="no-paging" xid="paging">&nbsp;<!--<ul><li><a href="#" ><span>Previous</span></a></li><li><a href="#" class="active"><span>1</span></a></li><li><a href="#"><span>2</span></a></li><li><a href="#"><span>3</span></a></li><li><a href="#"><span>4</span></a></li><li><a href="#"><span>5</span></a></li><li><a href="#"><span>Next</span></a></li></ul>--></div></td></tr></tfoot>
            <tbody><?arr=ar_ac.reverse();i=arr.length;while(i--){var strAlt=(i%2)?"class='alt'":"";//vol=arr[i].volume?LibraryjsUtil.numberWithCommas(arr[i].volume):"",price=arr[i].price ?"$"+LibraryjsUtil.numberWithCommas(arr[i].price ):""
                 ?><tr <?!=strAlt?>><td title="This is the order made by your counterparty"><?=arr[i].item?></td><td style="text-align:center" title="This is what your counterparty wants to do. If this column says Buy, then to fill the order, you will Sell. And vice versa."><?=arr[i].type?></td><td style="text-align:right" title="The number of shares to be traded"><?=arr[i].volStr?></td><td title="The transaction price" style="text-align:right"><?=arr[i].priceStr?></td>
	 	           <!--<td><input type="checkbox" xchecked name="fillOrder" title="Check to fill this order. To fill an order means to take the opposite side of the transaction. i.e., Buy if the order is to sell. And vice versa."></td>-->
		           </tr><?}?>
	        </tbody></table></div>
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
