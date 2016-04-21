//----------------------------- Code.gs -----------------------------------
// JSON visualization | viewers: http://chris.photobooks.com/json/default.htm | http://www.jsoneditoronline.org/
// function getEmailQuota(){Logger.log("Remaining email quota: " + MailApp.getRemainingDailyQuota());}
// Note: to accept doPost() from affiliate, (design decision:) must set: Publish > Deploy as web app > Execute the app as: me, Who has access to the app: Anyone, even anonymous // Otherwise, script will not run at server (though, client will receive responseCode=200); client response (200) is Google accounts sign-in page/form  // Decision Benefits: 1. script runs 2. script authorization bypass (i.e., not needed at UI) // Decision Costs: 1. Looser script security; mitigated by a. Site level access restrictions/permissions b. key method (e.g., switch/case k:foo)
function auth   (){}
function timer  (){Logger.log(new Date().getTime())}//1388228703613
//function importDataFromFile(id){id=id||"0B1LVOoV_2dFtZGVkQW1MeGNyNnM";ScriptDb.getMyDb().saveBatch(JSON.parse(DocsList.getFileById(id).getContentAsString()),false)} // Imports array of objects from, say, a backup file
function backup (){var desc="Scrape Realtor Backup — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({});while(results.hasNext()){out.unshift(results.next())}id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);}
function print  (){var desc="Scrape Realtor Print — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({/*isRaw:false*/source:{name:"ZipRealty"/*db.not("Realtor")*/}});while(results.hasNext()){out./*unshift*/push(results.next())}id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);} // .push() is faster than .unshift() // Reference: http://jsperf.com/array-push-vs-unshift
function print_test(str,desc){str=str||JSON.stringify(ScriptDb.getMyDb().load("S337185323966"));desc=desc||"Scrape Realtor Print — timestamp:"+new Date().getTime();DriveApp.createFile(desc,str,MimeType.HTML);}
function size   (){var db=ScriptDb.getMyDb();Logger.log(db.query({/*isRaw:false* /source:{name:"ZipRealty"/*db.not("Realtor")* /}*/}).getSize())}
function showOne(){var db=ScriptDb.getMyDb();Logger.log(JSON.stringify(db.query({item:"MH7rUG3"/*source:{name:"ZipRealty"}/*table:db.anyValue()/*isRaw:false*/}).next()));} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function showAll(){var db=ScriptDb.getMyDb(),arr=[],r,results=db.query({});while(results.hasNext()){r=results.next();arr.push(r)}Logger.log(JSON.stringify(arr))} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
//function del    (){var db=ScriptDb.getMyDb(),arr=[],r,results=xdb.query({/*isRaw:false* /source:{name:"ZipRealty"/*,db.not("Realtor")* /}*/});while(results.hasNext()){arr.push(results.next().getId());}db.removeByIdBatch(arr,false);} // Replaced: while(results.hasNext()){r=results.next();db.remove(r);}}
//function mod    (){var db=ScriptDb.getMyDb(),arr=[],r,results=db.query({source:{name:"ZipRealty"},table:"situs"/*"note"/*lienPos:db.anyOf(["1st",false,db.not(db.anyValue())])*/});while(results.hasNext()){r=results.next();try{while(r.bids[0].bidder!="ssanchez0322@gmail.com"){Logger.log(r.bids[0]);r.bids.shift()}}catch(e){Logger.log(e.message)}/*r.lienPos=1;*/arr.push(r);}db.saveBatch(arr,false)}
//function getEmailQuota(){Logger.log("Remaining email quota: " + MailApp.getRemainingDailyQuota());}
//function testCall(){Logger.log(UrlFetchApp.fetch("https://script.google.com/macros/s/AKfycbx_mgY9DdVYpBA3iGI2CYE0Aq3CbKrCrPQUJZu5S1unVUYaRP0/exec?k=9l4y95xhwwi8q2hbkslp&callback=jQuery1101041615460510365665_1390895886465&filterscount=0&groupscount=0&pagenum=0&pagesize=20&recordstartindex=0&recordendindex=18&featureClass=P&style=full&maxRows=50&_=1390895886466").getContentText())}
function write2ss(arr,n){n=n||"Clicked"/*0*/;arr=arr||[1,2,3];SpreadsheetApp.openById("1ASaJ_W0ha248DgFl2R9XWQ5M1kaAnb2RpqUlMjpB2hc").getSheetByName(n)/*.getSheets()[n]/*.insertRowBefore(2)*/.appendRow(arr)} // @param{array}array to append // @param{int}sheet to append // Reference: https://productforums.google.com/forum/#!topic/docs/_4UMAVqMv58
function doPost(e){//return ContentService.createTextOutput(JSON.stringify(e)/*.parameter.k/*"Hello World"*/).setMimeType(ContentService.MimeType.TEXT/*JSON*/)} //test1
    if(e && e.parameter && e.parameter.k){var k=e.parameter.k,m=e.parameter.m,p=e.parameter;switch(k){ // Reference: Pushing variables to templates // https://developers.google.com/apps-script/guides/html/templates
         // case /* test2  */ "t46o64lmmi14fclw3zjf" : return ContentService.createTextOutput("Hello World"    ).setMimeType(ContentService.MimeType.TEXT/*JSON*/)       ;break;
         // case /* test3  */ "t46o64lmmi14fclw3zjf" : return ContentService.createTextOutput(JSON.stringify(m)).setMimeType(ContentService.MimeType.TEXT/*JSON*/)       ;break;
            case /* Emailed*/ "t46o64lmmi14fclw3zjf" : return ScriptDb.getMyDb().save(JSON.parse(m))                                                                     ;break;
         default                                     :                                                                                                                    break;}}}
function doGet(e){var t=new Date().getTime();//ACT="https://script.google.com/macros/s/AKfycbxi9vLwEEFnmuPOzq0ymv8hZ3XGh0qEeo6swG6US5bNx3LHj6s3/exec?k=46bawio3def1vhprh9uq&m="; // References: https://developers.google.com/apps-script/guides/html-service-communication#private_functions // https://sites.google.com/site/appsscripttutorial/miscellaneous/creating-form-elements-dynamically-using-google-apps-script-gas
    if(e && e.parameter && e.parameter.k){var k=e.parameter.k,m=e.parameter.m,p=e.parameter;switch(k){ // Reference: Pushing variables to templates // https://developers.google.com/apps-script/guides/html/templates
         // case /* test   */ "4z90ftmvunnjbo2xc8ib" : return ContentService.createTextOutput("Hello World").setMimeType(ContentService.MimeType.JAVASCRIPT/*TEXT/*JSON*/);break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
         // case /* Sample */ "htvojvykwjsr68mysbxt" : return HtmlService.createHtmlOutputFromFile("sample").setSandboxMode(HtmlService.SandboxMode.NATIVE)              ;break;
         // case /* Accept */ "w5c079zl5n3unb2xrcts" : return HtmlService.createHtmlOutputFromFile("accept").setSandboxMode(HtmlService.SandboxMode.NATIVE)              ;break;
            case /* Accept */ "w5c079zl5n3unb2xrcts" : var h= HtmlService.createTemplateFromFile  ("accept");h.m=m;write2ss([t,m,"TRUE","TRUE","TRUE","TRUE"],"Clicked"/*0*/);/*Email acceept notice;*/return h.evaluate();break; // Debug: {var t=HtmlService.createTemplateFromFile("researcher").evaluate();Logger.log(t.getCodeWithComments);return t;}
         // case /* Reject */ "7rj390d9aoyun6ys7244" : var h= HtmlService.createTemplateFromFile  ("reject");h.r=JSON.parse(UrlFetchApp.fetch(ACT+m));return h.evaluate();break; // Debug: {var t=HtmlService.createTemplateFromFile("researcher").evaluate();Logger.log(t.getCodeWithComments);return t;}
         // case /* Reject */ "7rj390d9aoyun6ys7244" : return HtmlService.createTemplateFromFile  ("reject").evaluate()                                                  ;break;
            case /* Reject */ "7rj390d9aoyun6ys7244" : var h= HtmlService.createTemplateFromFile  ("reject");h.m=m;return h.evaluate()                                   ;break; // Debug: {var t=HtmlService.createTemplateFromFile("researcher").evaluate();Logger.log(t.getCodeWithComments);return t;}
            case /* Opened */ "73gtzu48hxf3nv2e8n4h" : return write2ss([new Date().getTime(),m],"Opened"/*1*/)                                                           ;break; // return UrlFetchApp.fetch("https://lh6.googleusercontent.com/-N7kwlriZxFY/U0-svhB0ktI/AAAAAAAALDM/WAfEDrpz98g/s800/wb.png").getBlob();
         default                                     :                                                                                                                    break;}}}
//----------------------------- accept.html -----------------------------------
<!DOCTYPE html>
<?var r=ScriptDb.getMyDb().query({item:m/*"MH7rUG3"*/}).next(),n=LibraryjsUtil.ddGetMarketData(r.marketState,r.marketCity)?>
<html style="font-family:arial;text-align:center;xcolor:grey;xbackground-color:black;">
<body style="margin-top:25px;xbackground-color:white;xborder-left-style:solid;xborder-left-size:25%;xborder-left-color:black">
<img src="https://lh6.googleusercontent.com/-UN_Oac4Wk5M/SdGjMwtNOlI/AAAAAAAAAMw/JpaJgFhkStw/s1600/GetTrained.jpg"><!--<img src="https://lh6.googleusercontent.com/-5xO6zqrQtKs/U0i84pfXR4I/AAAAAAAAK8I/MtnjIJHwvNw/s288/greencheck-opaque.png">-->
<div style="font-size:1000%;color:lightgrey;xfont-weight:bold;font-family:arial black">Thanks!</div><h2 style="color:#00AA00">Now please return the signed contract so we can close promptly!</h2>
<br><a href="<?=n.agent.WebUrl/*http://alticorerealty.com/AgentRoster?op=agent&act=webprofile&agent_id=1857592119*/?>"><img height="90" src="<?=n.agent.PhotoUrl/*https://lh5.googleusercontent.com/-gFvSJU9ks8I/U04wrA5GglI/AAAAAAAAK_g/R-j54csSR58/s144/KenGreen.jpg*/?>"><img height="90" src="<?=n.agent.MastheadUrl/*https://lh5.googleusercontent.com/-kRebYZvN02A/UzEcycWG0ZI/AAAAAAAAKIc/IbE9jU85WvU/s800/masthead-alticore.png*/?>"></a>
</body>
</html>
//----------------------------- reject.html -----------------------------------
<!DOCTYPE html>
<?var r=ScriptDb.getMyDb().query({item:m/*"MH7rUG3"*/}).next(),n=LibraryjsUtil.ddGetMarketData(r.marketState,r.marketCity),rPri=r.bids[0].amount,rDis=0.7,rRep=15000,rArv=Math.round((+rPri + +rRep)/rDis);/*rArv="$"+numberWithCommas(rArv);rRep="$"+numberWithCommas(rRep);rPri="$"+numberWithCommas(rPri);*/?>
<html style="font-family:arial;text-align:center;xcolor:grey;xbackground-color:black;">
<body style="margin-top:25px;xbackground-color:white;xborder-left-style:solid;xborder-left-size:25%;xborder-left-color:black">
<div style="text-align:center"><a href="<?=n.agent.WebUrl/*http://alticorerealty.com/AgentRoster?op=agent&act=webprofile&agent_id=1857592119*/?>"><img src="<?=n.agent.MastheadUrl/*https://lh4.googleusercontent.com/-5VGIxYVTPIY/Uy79LV3ktRI/AAAAAAAAKEU/r6HBR82Q8ik/s800/masthead-bluefrog.png*/?>"></a></div>
<a href="<?=n.agent.WebUrl/*http://alticorerealty.com/AgentRoster?op=agent&act=webprofile&agent_id=1857592119*/?>"><img src="<?=n.agent.PhotoUrl/*https://lh5.googleusercontent.com/-gFvSJU9ks8I/U04wrA5GglI/AAAAAAAAK_g/R-j54csSR58/s144/KenGreen.jpg*/?>" height="100"></a>
<h1 style="color:#3399FF;font-style:italic">&ldquo;Let&rsquo;s Make a Deal Right Now!&rdquo;</h1>
<div><a href="https://maps.google.com/maps?q=<?=(r.sa+', '+r.csz)/*949+N+103rd+St,+Seattle,+WA+98133*/?>" target="_blank"><?=r.sa+", "+r.csz/*123 Main Street, Los Angeles CA 90210*/?></a></div><br>
<form>
<table style="margin:0 auto">
<tr><th>        </th><th title="We believe in making our pricing figures transparent. We believe this helps us make more and better deals. Please give us your best figures so we can make this deal today!"                                                                                                                                                  style="text-align:left">Values   <img src="https://lh5.googleusercontent.com/-7tzncf2rnG4/U0uHa9qCtcI/AAAAAAAAK-E/1FtM0mKhmvw/s144/Information_Sign.jpg" height="14"></th><th title="Our client is a professional investor who purchases a prodigious volume of local distressed properties at a discount. They always close quickly, with cash. They seek to make a deal today at the fair price for investors in this business.">Ours <img src="https://lh5.googleusercontent.com/-7tzncf2rnG4/U0uHa9qCtcI/AAAAAAAAK-E/1FtM0mKhmvw/s144/Information_Sign.jpg" height="14"></th><th title="Enter your values in this column. We want to make a deal today! At a fair price.">Yours <img src="https://lh5.googleusercontent.com/-7tzncf2rnG4/U0uHa9qCtcI/AAAAAAAAK-E/1FtM0mKhmvw/s144/Information_Sign.jpg" height="14"></th></tr>
<tr><td>        </td><td title="ARV - After Repair Value. The full market price after all repairs and rehabs are made and the property is placed in top-notch condition. This is the price the end-user would pay for the subject in this top-condition."                                                                                                     style="text-align:left">ARV      <img src="https://lh5.googleusercontent.com/-7tzncf2rnG4/U0uHa9qCtcI/AAAAAAAAK-E/1FtM0mKhmvw/s144/Information_Sign.jpg" height="14"></td><td style="text-align:right"><?=rArv/*$50,000*/?></td><td><input size="7" style="text-align:right" placeholder="<?=rArv/*$50,000*/?>" name="arv"      id="arv"     ></input></td><td style="color:red" title="Change our mind! Enter your figures wherever you think we have it wrong. We have highlighted this field but feel free to markup any field. Let's make a deal today!">&#9664;</td></tr>
<tr><td>&times; </td><td title="Discount - A variable between 0 and 1. Typically, around 70% or 75% depending upon the market. Investors require a return on their investment (as compensation for their time, effort and economic risk) after repairs are completed. Therefore, they require a discount on the purchase price in order to earn that return." style="text-align:left">Discount <img src="https://lh5.googleusercontent.com/-7tzncf2rnG4/U0uHa9qCtcI/AAAAAAAAK-E/1FtM0mKhmvw/s144/Information_Sign.jpg" height="14"></td><td style="text-align:right"><?=rDis/*   0.70*/?></td><td><input size="7" style="text-align:right" placeholder="<?=rDis/*   0.70*/?>" name="discount" id="discount"></input></td><td                                                                                                                                                                                              >       </td></tr>
<tr><td>&minus; </td><td title="Repairs - The total amount of rehab necessary to bring the property to top-notch condition. Remember, if the property is upscale, the fixtures and materials must also be upscale."                                                                                                                                           style="text-align:left">Repairs  <img src="https://lh5.googleusercontent.com/-7tzncf2rnG4/U0uHa9qCtcI/AAAAAAAAK-E/1FtM0mKhmvw/s144/Information_Sign.jpg" height="14"></td><td style="text-align:right"><?=rRep/*$15,000*/?></td><td><input size="7" style="text-align:right" placeholder="<?=rRep/*$15,000*/?>" name="repairs"  id="repairs" ></input></td><td style="color:red" title="Change our mind! Enter your figures wherever you think we have it wrong. We have highlighted this field but feel free to markup any field. Let's make a deal today!">&#9664;</td></tr>
<tr><td>&equals;</td><td title="Price - The result of the calculation from the formula. ARV &times; Discount &minus; Repairs &equals; Price."                                                                                                                                                                                                                 style="text-align:left">Price    <img src="https://lh5.googleusercontent.com/-7tzncf2rnG4/U0uHa9qCtcI/AAAAAAAAK-E/1FtM0mKhmvw/s144/Information_Sign.jpg" height="14"></td><td style="text-align:right"><?=rPri/*$50,000*/?></td><td><input size="7" style="text-align:right" placeholder="<?=rPri/*$50,000*/?>" name="price"    id="price"   ></input></td><td title="This is where you can make a change in your price if you choose to. Or, just as acceptably, describe quantitatively with your above figures how you arrived at your price taking into account the pricing formula and all the variables: ARV, discount and repairs."><img src="https://lh5.googleusercontent.com/-7tzncf2rnG4/U0uHa9qCtcI/AAAAAAAAK-E/1FtM0mKhmvw/s144/Information_Sign.jpg" height="14"></td></tr>
</table><input value="<?=m?>" name="item" id="item" type="hidden"></input><input type="button" value="Submit" onclick="write2server()"></input> <input type="reset" value="Reset"></input><!--<input type="submit" value="Submit">-->
</form>
<br><div style="font-size:x-small;color:grey">powered by <span style="font-weight:bold">Deal<span style="color:red">Maker</span></span>&trade;</div>
<script>
function onFailure(e){alert(e.message)}
function onSuccess( ){alert("Thanks! Now I'll get to work!")}
//function numberWithCommas(x){var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
function write2server(){var t=new Date().getTime()
    , ite = document.getElementById("item"    ).value
    , arv = document.getElementById("arv"     ).value
    , dis = document.getElementById("discount").value
    , rep = document.getElementById("repairs" ).value
    , pri = document.getElementById("price"   ).value
	; google.script.run.withFailureHandler(onFailure).withSuccessHandler(onSuccess).write2ss([t,ite,arv,dis,rep,pri],"Clicked")}
</script>
</body>
</html>
//----------------------------- sample.html -----------------------------------
<!--Reference: https://productforums.google.com/forum/#!topic/docs/_4UMAVqMv58-->
<style>
    body{background-color:#d0e4fe; margin-left:60px; margin-right:60px;}
    p{font-family:"Times New Roman";font-size:20px;}
</style>
<body>
    <p>
        <!-- THIS IS THE TITLE SECTION -->
        <span style="color: blue; font-weight: bold; font-size: 200%">Input what you are offering</span><br>
        <span style="font-weight: bold">All required — enter 'NA' if Not Applicable</span>
    </p>
<script>
function onFailure(e){alert(e.message)              }
function onSuccess( ){alert("Your INPUT was SAVED!")}
</script>
    <form name="input">
        <!-- fieldset draws a border around all the input elements -->
        <fieldset>
            <!-- There are form attributes, like type, name, id -->
            <input type="text" value="Manufacturer"
                class="ss-q-short" id="id_Maker" dir="auto" aria-required="true"
                title=""> <br>
            <br>
            <!-- This adds a space between the input fields -->
            <input type="number" value="999999.95"
                class="ss-q-short" id="id_AskingPrice" dir="auto"
                aria-required="true"> Asking $ No comma or dollar sign.: <br>
            <br> <select name="entry.34654976" id="id_Condition"
                aria-required="true" required="">
                <option value=""></option>
                <option value="Poor">Poor</option>
                <option value="Fair">Fair</option>
                <option value="Good">Good</option>
                <option value="Very Good">Very Good</option>
                <option value="Like New">Like New</option>
            </select> Condition: <br>
            <br> <input type="text" value="Item"
                class="ss-q-short" id="id_ShrtDesc" dir="auto" aria-required="true"
                required="" title=""> Short Description of Item. Eg. Couch,
            TV, Computer, Table Saw, Tires <br>
            <br> <input type="text" value=""
                class="ss-q-short" id="id_Description" dir="auto"
                aria-required="true" required="" title=""> Description of
            the Item. More details. Color, size, length, accessories <br>
            <br> <select id="id_UserID"
                aria-required="true" required="">
                <option value=""></option>
                <option value="Option 1">Option 1</option>
            </select> Sellers User ID <br>
            <br> <input type="button" value="Save Input"
                onclick="WriteInput()"> <input type="reset" value="Reset">
        </fieldset>
    </form>
<!-- This script is Javascript.  It runs in the users browser.  At the end, an Apps Script function is called -->
<!-- This app will not work without another, seperate *.gs file with the AddToSheet function -->
<script>
function WriteInput(){
    var d            = new Date();
    var daMonth      = d.getMonth() + 1;
    var ToInputStrng = (daMonth + "/" + d.getDate() + "/" + d.getFullYear()  + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    var strngTwo     = document.getElementById('id_Maker'      ).value;
    var strngThree   = document.getElementById('id_AskingPrice').value;
    var strngFour    = document.getElementById('id_Condition'  ).value;
    var strngFive    = document.getElementById('id_ShrtDesc'   ).value;
    var strngSix     = document.getElementById('id_Description').value;
    var strngSeven   = document.getElementById('id_UserID'     ).value;
    google.script.run.withFailureHandler(onFailure)
                     .withSuccessHandler(onSuccess)
                     .AddToSheet(ToInputStrng, strngTwo, strngThree, strngFour, strngFive, strngSix, strngSeven);
}
</script>
</body>