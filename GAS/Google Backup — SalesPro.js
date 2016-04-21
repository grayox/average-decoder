// --------------------------------------------------------------------- Code.gs ---------------------------------------------------------------------
function auth(){}
// ---------------------------------------------------------------- FUSION TABLE ----------------------------------------------------------------
// References   // https://developers.google.com/fusiontables/docs/sample_code
// Instructions // http://kh-samples.googlecode.com/svn/trunk/code/instructions.html
// Sample Code  // http://kh-samples.googlecode.com/svn/trunk/code/appsscript.js
// function FTcodes(){var out={"username":"andromedovega.project@gmail.com","password":"WKGnxUUjXF","docid":"1ME6qh-7eDndknoJE5PnsCEsFqGYj0CJ0ahFVrvo","addressColumn":"Zip","latlngColumn":"Location"};return out;}
function FTkeys(tableName){switch(tableName){ // Returns column set of FT column values given a table
    case   "leads" : return {/*"Timestamp":"timestamp",*/"Owner":"owner","Link":"link","Last Edit":"latestSubmit","Callback":"callback","Status":"disposition","Company Name":"name","Phone":"phone","City":"city","St":"state","Location":"latlng"};break;
    case   "apply" : return {};break;
    default        :          ;break;}}
/*
function onFormSubmit(e){/*Submit data to Fusion Tables when form is submitted* /var sheet=SpreadsheetApp.getActiveSheet(),row=sheet.getLastRow();init();var rowId=createRecord(e.namedValues);if(!rowId){rowId=-1}insertRowId(rowId,row);}// Get row number of newly entered data. // Make sure rowid column is there // Insert into Fusion Table values entered into form, mapped by question
function init(){/*Initialize spreadsheet by adding rowid column* /var sheet=SpreadsheetApp.getActiveSheet(),lastColumn=sheet.getLastColumn(),lastHeaderValue=sheet.getRange(1,lastColumn).getValue();if(lastHeaderValue!="rowid"){sheet.getRange(1,++lastColumn).setValue("rowid")}}
function insertRowId(rowId,row){var sheet=SpreadsheetApp.getActiveSheet();sheet.getRange(row,sheet.getLastColumn()).setValue(rowId);}// Add rowid from INSERT to corresponding row in spreadsheet. // @param {string} rowId The row id of the inserted row. // @param {number} row The row number to enter the rowid in.
*/
function FTpopulate(){var db=ScriptDb.getMyDb(),result=db.query({table:"leads"});while(result.hasNext()){createRecord(result.next())}}
function FTcreateRecord(ob){var d=new Date(); // Create Fusion Table record // @param{object} record to insert into Fusion Table // @return{string} rowid if successful, otherwise null.
    /*ob=ScriptDb.getMyDb().query({table:"leads"/*,owner:"benharvill@gmail.com"/*apply"/*,email:user* /}).next();* /ob.timestamp=d;*/ob.link="http://www.google.com";ob.latlng=ob.latitude+","+ob.longitude;ob.latestSubmit=Math.floor((d.getTime()-ob.latestSubmit)/(1000*60*60*24));ob.callback=Math.floor((ob.callback-d.getTime())/(1000*60*60*24));
    var docid=ScriptProperties.getProperty("docid"),ftKeys=FTkeys(ob.table),keys=Object.keys(ftKeys),val,vals=[],i=keys.length;while(i--){val=ob[ftKeys[keys[i]]]; // List keys and values for INSERT statement // Make certain ob.latlng="47.38...,-120.37..." (for example) as special key "latlng" maps to special field "Location" in Fusion Table
        //if(addressColumn&&key==addressColumn){var latlng=geocode(val);latlngColumn=latlngColumn.replace(/'/g,"\\\'");keys.push(latlngColumn);vals.push(latlng);}// If address key was specified, geocode its value
        if(val&&typeof val!="string"){val=val.toString();val=val.replace(/'/g,"\\\'");}vals.unshift(val);} // Format keys, vals, push/unshift to array
    var response=queryFt("INSERT INTO "+docid+" ('"+keys.join("','")+"') "+"VALUES ('"+vals.join("','")+"')");if(response){return response[1][0];}} // Insert one record, return rowid
function geocode(address){/*Geocode address @param{string} address, user-entered @return{string} geocoded results*/var results=Maps.newGeocoder().geocode(address);Logger.log("Geocoding: "+address);if(results.status=="OK"){var bestResult=results.results[0],lat=bestResult.geometry.location.lat,lng=bestResult.geometry.location.lng,latLng=lat+","+lng;Logger.log("Results: "+latLng);return latLng;}else{Logger.log("Error geocoding: "+address);Logger.log(results.status);return "0,0";}}
function queryFt(query){var response=run(query);// Query Fusion Tables, rerun if unsuccessful // @param {string} query, query to execute // @return{?Array} the Fusion Table response formated as an array if query was successful. Returns null if not.
    if(response==-1){response=run(query)}/*If query failed with 401 or 500 error, try again only once*/if(response==-1||response==-2){return}return response}/*If query failed again, or failed for some other reason, return*/
function run(query){// Send query to Fusion Tables and catch any errors // @param{string} query, query to execute // @return{Array|number} Fusion Table response formatted as array if successful, -1 if a 401 or 500 error occurred, -2 if some other error occurred
    var FUSION_URL="https://www.google.com/fusiontables/api/query",method="post",lowercaseQuery=query.toLowerCase();if(lowercaseQuery.indexOf("select")==0||lowercaseQuery.indexOf("show")==0||lowercaseQuery.indexOf("describe")==0){method="get"} // FUSION_URL for Fusion Tables API
    var token=ScriptProperties.getProperty("token");if(!token){token=getGAauthenticationToken();if(!token){return -2}}var url,response,sql=encodeURIComponent(query);
    try{if(method=="get"){url=FUSION_URL+"?sql="+sql;response=UrlFetchApp.fetch(url,{method:method,headers:{"Authorization":"GoogleLogin auth="+token}});}else{response=UrlFetchApp.fetch(FUSION_URL,{method:method,headers:{"Authorization":"GoogleLogin auth="+token},payload:"sql="+sql});}} 
    catch(err){if(err.message.search("401")!=-1){/*If auth failed, fetch new token*/token=getGAauthenticationToken();if(!token){return -2}return -1}else if(err.message.search("500")!=-1){/*If too many requests, sleep*/Utilities.sleep(3000);return -1;}
        else{Logger.log("The failing query: "+decodeURIComponent(sql));var docid=ScriptProperties.getProperty("docid");if(!docid){Logger.log("The script is missing a docid Project Property");}
            if(err.message.search("Bad column reference")!=-1){Logger.log("Looks like the column names in the form do not match "+"the column names in the table. Make sure these match!");}
            var addressColumn=ScriptProperties.getProperty("addressColumn"),latlngColumn=ScriptProperties.getProperty("latlngColumn");if(addressColumn&&!latlngColumn){Logger.log("Since you added an addressColumn project property, you also need to add a latlngColumn property");}Logger.log(err.message);return -2;}}
    response=response.getContentText();response=CSV2Matrix(response);return response;}
function getGAauthenticationToken(){var username,password,response;// Get auth token using Client Login. Save token to Script Property "token". // @return {?string} auth token.
    try{username=ScriptProperties.getProperty("username");if(!username){throw new Error("Missing username in Project Properties.");}}catch(err){Logger.log("Error authenticating username.");Logger.log(err.message);return;}username=encodeURIComponent(username);
    try{password=ScriptProperties.getProperty("password");if(!password){throw new Error("Missing password in Project Properties.");}}catch(err){Logger.log("Error authenticating password.");Logger.log(err.message);return;}password=encodeURIComponent(password);
    try{response=UrlFetchApp.fetch("https://www.google.com/accounts/ClientLogin",{method:"post",payload:"accountType=GOOGLE&Email="+username+"&Passwd="+password+"&service=fusiontables&Source=googledocs"});}catch(err){Logger.log("Error authenticating.");Logger.log(err.message);return;}
    var tokens=response.getContentText(),token=tokens.slice(tokens.search("Auth=")+5,tokens.length);token=token.replace(/\n/g,"");ScriptProperties.setProperty("token",token);return token;}
function CSV2Matrix(strData,strDelimiter){strDelimiter=(strDelimiter||",");// Parse CSV return values into array of objects // @param {string} strData The string data to parse into an array; @param {string} strDelimiter The string delimiter; @return {Array} An array of objects containing the parsed values // Copied and adapted from here: // http://www.bennadel.com/blog/1504-Ask-Ben-Parsing-CSV-Strings-With-Javascript-Exec-Regular-Expression-Command.htm
    var objPattern=new RegExp('(\\'+strDelimiter+'|\\r?\\n|\\r|^)'+'(?:"([^"]*(?:""[^"]*)*)\"|'+'([^"\\'+strDelimiter+'\\r\\n]*))','gi'),arrData=[[]],arrMatches=null;while(arrMatches=objPattern.exec(strData)){
        var strMatchedDelimiter=arrMatches[1];if(strMatchedDelimiter.length&&(strMatchedDelimiter!=strDelimiter)){arrData.push([]);}if(arrMatches[2]){var strMatchedValue=arrMatches[2].replace(/'""'/g,'"');}else{var strMatchedValue=arrMatches[3];}arrData[arrData.length-1].push(strMatchedValue);}
    if(arrData[arrData.length-1].length==0||arrData[arrData.length-1][0].length==0){arrData.pop();}return arrData;}
function sync(){/*Sync Fusion Table to form data. Run periodically.*/init();var sheet=SpreadsheetApp.getActiveSheet(),lastRow=sheet.getLastRow(),lastColumn=sheet.getLastColumn(),spreadsheetData=sheet.getRange(1,1,lastRow,lastColumn).getValues(),spreadsheetMap={};convertToMap(spreadsheetData,spreadsheetMap); // Check to make sure the rowid column is there // Convert spreadsheet data to dictionary
    var columns=spreadsheetData[0],escapedColumns=[];for(var i=0;i<columns.length;i++){var columnName=columns[i];columnName=columnName.replace(/'/g,"\\\'");escapedColumns.push(columnName);} // Get the columns in the spreadsheet and escape any single quotes
    var ftMap={},docid=ScriptProperties.getProperty("docid"),query=("SELECT '"+escapedColumns.join("','")+"' FROM "+docid),ftResults=queryFt(query);if(!ftResults){return}convertToMap(ftResults,ftMap); // Get the data from the table and convert to a dictionary
    var addressColumn=ScriptProperties.getProperty("addressColumn"),latlngColumn=ScriptProperties.getProperty("latlngColumn"); // Get the properties associated with this Script
    for(var rowId in ftMap){var spreadsheetRow=spreadsheetMap[rowId];if(spreadsheetRow){var updates=[],tableRow=ftMap[rowId];for(var column in tableRow){var tableValue=tableRow[column],spreadsheetValue=spreadsheetRow[column]; // Determine if each Fusion Table row still exists in Spreadsheet. If so, make sure values equal. If not, update Fusion Table data. If row doesn't exist in spreadsheet, delete row from table.
        if(tableValue!=spreadsheetValue){if(addressColumn==column){var latlng=geocode(spreadsheetValue);latlngColumn=latlngColumn.replace(/'/g,"\\\'");updates.push("'"+latlngColumn+"' = '"+latlng+"'");}
        if(typeof spreadsheetValue!='string'){spreadsheetValue=spreadsheetValue.toString();}spreadsheetValue=spreadsheetValue.replace(/'/g,"\\\'");column=column.replace(/'/g,"\\\'");updates.push("'"+column+"' = '"+spreadsheetValue+"'");}}
        if(updates.length){queryFt("UPDATE "+docid+" SET "+updates.join(",")+" WHERE rowid = '"+rowId+"'");Utilities.sleep(3000);}}else{queryFt("DELETE FROM "+docid+" WHERE rowid = '"+rowId+"'");Utilities.sleep(3000);}} // If there are updates, send UPDATE query // Else if row doesn't exist in spreadsheet, delete it from table
    var failedInserts=spreadsheetMap[-1];for(var i=0;failedInserts&&i<failedInserts.length;i++){var rowId=createRecord(failedInserts[i]);if(!rowId){rowId=-1;}insertRowId(rowId,failedInserts[i]["spreadsheetRowNum"]);Utilities.sleep(3000);}} // Insert into Fusion Table all data that failed to insert. These rows were given rowid of -1 or have blank rowid.
function convertToMap(array,map){// Converts form and table data to dictionary, mapping rowid to column values. If rowid == -1 or null, rowid is mapped to list of column values of failed inserts. @param {Array} array An array of data, the first row contains headers. @param {Object} map The resulting dictionary of row id mapped to columns. {rowid:{column:value,...} | [{{column:value,...}}],}.
    var columns=array[0];for(var i=1;i<array.length;i++){var row=array[i],rowId=row[row.length-1],columnMap={};for(var j=0;j<row.length-1;j++){var columnName=columns[j],columnValue=row[j];columnMap[columnName]=columnValue;}if(rowId==-1||!rowId){if(!map[-1]){map[-1]=[];}/*Add spreadsheet row number to map*/columnMap["spreadsheetRowNum"]=i+1;map[-1].push(columnMap);}else{map[rowId]=columnMap;}}}
//==============================================================================
/* function showAliases(){ //var LOAD   = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    Logger.log(GmailApp.getAliases())} */ 
// FOR doPost() CALLBACK METHOD:
// function doPost(e){/*ScriptDb.getMyDb().save(e.parameter);*/return ContentService.createTextOutput(/*).setContent(*/"Salespro says: "+JSON.stringify(e/*.parameter*/))/*.setMimeType(ContentService.MimeType.JSON)*/} // References // https://developers.google.com/apps-script/uiapp?hl=en#doGetParams // https://developers.google.com/apps-script/content_service?hl=en // Example: // <SCRIPT URL>?start=1325437200&end=1325439000;new Date(Number(request.parameters.start)*1000);new Date(Number(request.parameters.end)*1000));
// function doGet (e){/*ScriptDb.getMyDb().save(e.parameter);*/return ContentService.createTextOutput(/*).setContent(*/"Salespro says: "+JSON.stringify(e/*.parameter*/))/*.setMimeType(ContentService.MimeType.JSON)*/} // References // https://developers.google.com/apps-script/uiapp?hl=en#doGetParams // https://developers.google.com/apps-script/content_service?hl=en // Example: // <SCRIPT URL>?start=1325437200&end=1325439000;new Date(Number(request.parameters.start)*1000);new Date(Number(request.parameters.end)*1000));
// function doPost(e){return ContentService.createTextOutput("User says: "+JSON.stringify(e))}
// Testing site: http://hurl.it/
// Works // https://script.google.com/macros/s/AKfycbzWZv9WUp7rUtOxZhhwuXPpuNXuvPGpiHyrcYrPeNLiusOWzazo/exec
// Not   // https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec
// Solution to doPost() // Reference: http://stackoverflow.com/questions/13591488/doposte-does-not-return-parameters-but-dogete-does
// 1. Publish > Deploy as web app > Execute the app as == me // Use this setting
// 2. Client must be set up to "follow redirects" in order to receive server response
// 3. Conclusion/hypothesis: We must use a separate app and published URL to receive callbacks ** Need to setup then change callback URL @hellosign via hellosign_callback_url() **

function authBasic(un,pw){/*Return authorization header*///var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    return ("Basic "+(un+":"+pw).base64Encode())} // Given username+password, returns authorization header for basic authorization // Reference: http://en.wikipedia.org/wiki/Basic_access_authentication // Authorization: Basic c2FsZXNwcm8uaGVsbG9zaWduQGdtYWlsLmNvbTp0ZWxld29ybQ== (pw="teleworm") // Authorization: Basic c2FsZXNwcm8uaGVsbG9zaWduQGdtYWlsLmNvbTp0ZWxld29ybTEyMw== (pw="teleworm123")
function hellosign(){var ref = // Returns object of references for HelloSign™ vendor/domain // Reference: http://www.hellosign.com/api/reference
    {   "username"     : "salespro.hellosign@gmail.com"
    ,   "password"     : "teleworm123"
    ,   "callback_url" : "https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec" // This is the SalesPro™ published URL
    ,   "account_id"   : "3d0d1d911716630136f7647a8adec550945b9590"
    ,   "apikey"       : "efda4207db1642eca84e4ab162ca8b490cd2c425e258edc55c951abe22a99f19"
    ,   "apiUrl"       : "https://api.hellosign.com/v3/" // Add extension at calling function // E.g., var ext="account";
    ,   "I9_link"      : "https://www.hellosign.com/s/91eab3ef"
    ,   "I9_link_id"   : "da8a432b7403b5a477050b3aea2802d4745c68f5"
    ,   "I9_form_id"   : "368f2bf16704a6ea233014142c80e9cb5d5e9cbf"
    ,   "W9_link"      : "https://www.hellosign.com/s/fad56d80"
    ,   "W9_link_id"   : "1ed9adc74ac8e707e481a89f8ffd4b9eb955e5cc"
    ,   "W9_form_id"   : "69f171b939cc750e41d4a987334db0c3e1b7f705"
    };return ref}
function hellosign_account(){var ext="account",r=hellosign(),act=r.apiUrl+ext;return UrlFetchApp.fetch(act,{"headers":{"Authorization":authBasic(r.username,r.password)}}).getContentText()} // Returns account info
function hellosign_callback_url(){var ext="account",r=hellosign(),act=r.apiUrl+ext;return UrlFetchApp.fetch(act,{"method":"post","payload":{"callback_url":r.callback_url},"headers":{"Authorization":authBasic(r.username,r.password)}}).getContentText()} // Changes callback_url to given argument

// QUICKBOOKS API: Intuit Partner Platform // https://ipp.developer.intuit.com/0010_Intuit_Partner_Platform/0050_Data_Services/0400_QuickBooks_Online/Check

//function auth     (    )
//function showGates(    ){var arr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB","AC","AD","FA","FB","FC","FD","FE","FF","FG","FH","FI","FJ","FK"],i=arr.length;while(i--){size(arr[i]);}}
//function size     (gate){var user=Session.getUser().getEmail();Logger.log(gate+": "+ScriptDb.getMyDb().query({table:/*"recruiter"*/"bug"/*"recruiter"/*/ ,gate:gate/* /"leads"/*"apply",email:user*/}).getSize());}
function size     (    ){var db=ScriptDb.getMyDb(),user=Session.getUser().getEmail();Logger.log(ScriptDb.getMyDb().query({table:/*"recruiter"/*/"apply"/*"bug"* /,gate:gate/* /"leads"/*,/*name:db.anyOf(["Watters Autoland Inc","George White Chevrolet-Pontiac","Modern Motors Inc"])/* /disposition:"active"/*owner:/*"bruce.p.nolan@gmail.com"/* /db.not(db.anyOf(["benharvill@gmail.com","atlaslive@gmail.com","jrcamf@gmail.com"]))/*,temperature:2/*owner:db.not("benharvill@gmail.com")*/}).getSize());}
function del      (    ){var arr=[],db=ScriptDb.getMyDb(),results=db.query({table:"recruiter"/*"bug"* /"l____",/*disposition:"active"* /owner:db.not(db.anyOf(["benharvill@gmail.com","atlaslive@gmail.com","jrcamf@gmail.com"]))/*"bruce.p.nolan@gmail.com"*/});while(results.hasNext()){arr.push(results.next().getId());}db.removeByIdBatch(arr,false);} // Replaced: //function del (){var db=ScriptDb.getMyDb();var results=db.query({table:/*"recruiter"*/"bug"});while(results.hasNext()){var r=results.next();db.remove(r);}}
//function showId   (    ){Logger.log(JSON.stringify(ScriptDb.getMyDb().query({table:/*"recruiter"/*"apply"/*/"leads"/*"bug"/*/,owner:"atlaslive@gmail.com"/*,name:"Toyota Of Des Moines"/*phone:""*/}).next().getId()))} // Show one record's ID
function showOne  (    ){Logger.log(JSON.stringify(ScriptDb.getMyDb().query({table:"recruiter"/*"apply"/* /"leads",disposition:"active"/*"bug"* /,name:"Watters Autoland Inc"/*phone:""*/}).next()))} // Show one record
function showAll  (    ){var user=/*Session.getUser().getEmail()*/"benharvill@gmail.com",db=ScriptDb.getMyDb(),q={table:"leads",client:"mojo",/*addedUser:user,*/owner:user,disposition:db.anyOf(["active","-Reason to not call back-"])/*,callback:db.lessThan(new Date().getTime())/*,temperature:db.lessThan(6)*/};var r,results=db.query(q/*{table:"recruiter"/* /"apply"/*"bug"/*,r:{name:"Willey Suzuki"}/*"leads",* /phone:"(765) 643-8880"/*owner:"jrcamf@gmail.com"/*benharvill@gmail.com,disposition:true/*,email:user* /}*/);Logger.log(results.getSize());/*var i=5;*/while(/*i--*/results.hasNext()){r=results.next();Logger.log(/*Utilities.jsonStringify*/JSON.stringify(r));}} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
//function mod      (    ){var db=ScriptDb.getMyDb(),r,results=db.query({table:"leads"/*,name:db.anyOf(["Watters Autoland Inc","George White Chevrolet-Pontiac","Modern Motors Inc"])/*disposition:"-Select one-"/*temperature:6/*,name:"Larsen Auto Ctr"/*phone:"(763) 755-5444"*/});while(results.hasNext()){r=results.next();
//                                /*r.latestSubmit=new Date().getTime();r.callback=r.latestSubmit+3*1000*60*60*24;* /r.temperature=2;* /r.disposition="-Reason to not call back-"* /r.owner="benharvill@gmail.com";*/if(!("disposition" in r)){r.disposition="active";db.save(r);}}}
//function test_doPost(){var r=hellosign(),act=r.callback_url;return UrlFetchApp.fetch(act,{"method":"post","payload":"testA=abc&testB=bcd&testC=cde"/*{"testA":"abc","testB":"bcd","testC":"cde"}*/}).getContentText()}
//function getEmailQuota(){Logger.log("Remaining email quota: " + MailApp.getRemainingDailyQuota());}
function setAlias(){ // Assigns unique code name (U.S. city) to each user account. Used for reporting / stack ranking purposes // Warning: Script will fail when user count exceeds 385 as this is the number of code names (U.S. cities) available. Next, consider using world cities, then states, countries, etc. 
 // var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    var i,r,n=listOfUScities(),db=ScriptDb.getMyDb(),result=db.query({table:"apply"});while(result.hasNext()){r=result.next();i=Math.floor(Math.random()*n.length);r.alias=n.splice(i,1)[0];db.save(r);}}
function doGet(e){ // References: https://developers.google.com/apps-script/guides/html-service-communication#private_functions // https://sites.google.com/site/appsscripttutorial/miscellaneous/creating-form-elements-dynamically-using-google-apps-script-gas // https://developers.google.com/apps-script/uiapp, https://developers.google.com/apps-script/uiapp#ServerHandlers
 // if(e && e.parameter && e.parameter.jsoncallback){return ContentService.createTextOutput("foo({result:'<strong>Hello</strong> World'});").setMimeType(ContentService.MimeType.TEXT);}
    if(e && e.parameter && e.parameter.k){var k=e.parameter.k,m=e.parameter.m;switch(k){
            case                          "lkis28ae4vouxe11uxp8" : return dataTableConstructor ( )                                                                  ;break;   // for table array
            case                          "jj860hvegjp1xxy7pvv1" : return dataTableConstructor1( )                                                                  ;break;   // for table constructor
            case                          "43c85lg8keybsne29uln" : return dataTableConstructor2(m)                                                                  ;break;   // for table only (recruit-the-recruiter)
         // case                          "g8h2j7kdhkztj0awyeii" : return ContentService.createTextOutput("<iframe src='https://docs.google.com/document/d/1ICsRuk5aOyvAi7kehyKkn6IHVosQRMhdY0F-2d6tP8o/preview' width='100%' height='900' scrolling=no seamless=true title='Sales Training Manual'></iframe>").setMimeType(ContentService.MimeType.TEXT);break;
         // case                          "g8h2j7kdhkztj0awyeii" : return ContentService.createTextOutput("({\"result\":\"<strong>Hello</strong> World\"})").setMimeType(ContentService.MimeType.JSON); // Reference: http://stackoverflow.com/questions/3889001/jquery-cross-domain-load-self-constructing-widget
         // case                          "g8h2j7kdhkztj0awyeii" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<strong>Hello</strong> World'})").setMimeType(ContentService.MimeType.JSON); // jQuery automatically appends jsoncallback value (e.g. "jquery000123") to url as a parameter so server must parse it and return it as function name (e.g., "jquery000123({object data goes here})") // Reference: http://stackoverflow.com/questions/3889001/jquery-cross-domain-load-self-constructing-widget
	     // case   /* registration-rvp */ "0xfhu6awm1r9n8kqrovu" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':"+HtmlService.createHtmlOutputFromFile('register').getContent()+"})").setMimeType(ContentService.MimeType.JSON);
            case   /* map     		   */ "gdslw113lzfsc6wa2v1n" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\" margin-top:-250px;width:100%;height:100%\" src=\"https://docs.google.com/drawings/d/1psVkX2kzru26B2ohPMfSAk11cjL0b4irKdl_G_Gqo2U/preview\"                                                     ></iframe>      '})").setMimeType(ContentService.MimeType.JSON);
            case   /* mj-compensation  */ "wcpl6sip4o3ckbsn7s35" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"https://docs.google.com/document/d/1QbOJEkf1pAixgyQ0F_6it-kei7jYjW2hD80zrn_wwPs/preview\"                                                     ></iframe>      '})").setMimeType(ContentService.MimeType.JSON);
            case   /* ic-agreement     */ "0cfv6jxlo0k54welbuzq" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"https://docs.google.com/document/d/1WKej9OueDc6bD5cU1VOZ11tJ-WLORWrpPzhFC3xcqRY/preview\"                                                     ></iframe>      '})").setMimeType(ContentService.MimeType.JSON);
            case   /* comp-plan        */ "girawkl6om80ywfhro2s" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"https://docs.google.com/document/d/1ROjvOBVDwX7q1gKITyaYYtEYICY5JQAEBmpxcAyIv1E/preview\"                                                     ></iframe>      '})").setMimeType(ContentService.MimeType.JSON);
            case   /* tax-instructions */ "64kpc143tlc75mf9al07" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"https://docs.google.com/document/d/12zCJJoGIFRzPpyzB03goUIBKw-QkS38x0RkBuGWRurU/preview\"                                                     ></iframe>      '})").setMimeType(ContentService.MimeType.JSON);
            case   /* training-manual  */ "wlrvffv3rnk88txtwiwb" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"https://docs.google.com/document/d/1ICsRuk5aOyvAi7kehyKkn6IHVosQRMhdY0F-2d6tP8o/preview\"                                                     ></iframe>      '})").setMimeType(ContentService.MimeType.JSON);
         // case   /* w9-eSign         */ "a3t7giowyqxihx6f132k" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"https://www.hellosign.com/editor/getStarted?guid=fad56d80\"                                                                                   ></iframe>      '})").setMimeType(ContentService.MimeType.JSON);
            case   /* w9-pdf           */ "5bpixbf4mhokjsdh311t" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"http://www.irs.gov/pub/irs-pdf/fw9.pdf\"                                                                                                      ></iframe>      '})").setMimeType(ContentService.MimeType.JSON);
			case   /* w8-pdf           */ "ydl609qvq0eacb4ntbut" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"http://www.irs.gov/pub/irs-pdf/fw8ben.pdf\"                                                                                                   ></iframe>      '})").setMimeType(ContentService.MimeType.JSON);
            case   /* teleconference   */ "refjdofdwhebuvm1hy5o" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"http://www.google.com/hangouts/\"                                                                                                             ></iframe>      '})").setMimeType(ContentService.MimeType.JSON);
			case   /* dd-training      */ "k44vvesra4juvvcxggll" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"http://www.youtube.com/embed/2CNd6OGdMO8?\" frameborder=\"0\" allowfullscreen                                                                 ></iframe>      '})").setMimeType(ContentService.MimeType.JSON); // lolcats: v=2CNd6OGdMO8
      	    case   /* mt-training      */ "8opdkclgo6yjk4bjkirv" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"http://www.youtube.com/embed/2CNd6OGdMO8?\" frameborder=\"0\" allowfullscreen                                                                 ></iframe>      '})").setMimeType(ContentService.MimeType.JSON); // lolcats: v=2CNd6OGdMO8
			case   /* wh-training      */ "66fyw8nzurcyfm3169ki" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"http://www.youtube.com/embed/2CNd6OGdMO8?\" frameborder=\"0\" allowfullscreen                                                                 ></iframe>      '})").setMimeType(ContentService.MimeType.JSON); // lolcats: v=2CNd6OGdMO8
      		case   /* lb-training      */ "9iuhimtmdtl6olzj2hby" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"http://www.youtube.com/embed/2CNd6OGdMO8?\" frameborder=\"0\" allowfullscreen                                                                 ></iframe>      '})").setMimeType(ContentService.MimeType.JSON); // lolcats: v=2CNd6OGdMO8
      		case   /* mj-training      */ "72it6dil9bg2g0ca3o3b" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<iframe style=\"xmargin-top:-200px;width:100%;height:100%\" src=\"http://www.youtube.com/embed/i3aExu11e1o?\" frameborder=\"0\" allowfullscreen                                                                 ></iframe>      '})").setMimeType(ContentService.MimeType.JSON); // lolcats: v=2CNd6OGdMO8
            case   /* w9-eSign         */ "a3t7giowyqxihx6f132k" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bTaY-umWq04/UKVWnKQq5-I/AAAAAAAAD3s/dDtgQsquOD4/s1600/Under-Construction.jpg\"                                            ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
			case   /* w8-eSign         */ "t2t0902k7zl65ygxei91" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bTaY-umWq04/UKVWnKQq5-I/AAAAAAAAD3s/dDtgQsquOD4/s1600/Under-Construction.jpg\"                                            ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
            case   /* paycheck     	   */ "bhd16ci0wr2lxxnm29bg" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bTaY-umWq04/UKVWnKQq5-I/AAAAAAAAD3s/dDtgQsquOD4/s1600/Under-Construction.jpg\"                                            ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
      		case   /* lb-leads         */ "bzldlnqvltnc9g6e0xij" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bTaY-umWq04/UKVWnKQq5-I/AAAAAAAAD3s/dDtgQsquOD4/s1600/Under-Construction.jpg\"                                            ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
			case   /* dd-leads     	   */ "j2hsapogqnfps6u9qu6e" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bTaY-umWq04/UKVWnKQq5-I/AAAAAAAAD3s/dDtgQsquOD4/s1600/Under-Construction.jpg\"                                            ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
            case   /* mt-leads     	   */ "eymqott0sqqznq9sjqfp" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bTaY-umWq04/UKVWnKQq5-I/AAAAAAAAD3s/dDtgQsquOD4/s1600/Under-Construction.jpg\"                                            ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
			case   /* wh-leads     	   */ "c58znini41mzpy5sw909" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bTaY-umWq04/UKVWnKQq5-I/AAAAAAAAD3s/dDtgQsquOD4/s1600/Under-Construction.jpg\"                                            ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
            case   /* account     	   */ "g8h2j7kdhkztj0awyeii" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                             ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
            case   /* compensation     */ "289o4xjp0ttdunoobk68" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                             ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
            case   /* citizen-us       */ "xdot5r4nqoizy1jzndqc" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                             ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
            case   /* citizen-nonus    */ "8nhrwzvarn8kazpflpp3" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                             ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
            case   /* taxdocs     	   */ "51ttwqmx6wht8b0bapck" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                             ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
        	case   /* products     	   */ "a8nw1s8xtje7ssg27143" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                             ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
        	case   /* mojo     		   */ "cx8q5r0wmtovarzgozpz" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                             ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
			case   /* leadbank     	   */ "ivqd7wb6jw18lagrdutv" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                             ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
			case   /* dealdigger       */ "a11f766les5e63wig66o" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                             ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
			case   /* mondo			   */ "ifcfzujugtzcf4ey1a51" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                             ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
    		case   /* wellhaven        */ "gthmlsn250rt3l2pt2rj" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                             ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
			case   /* recruit     	   */ "rrfzp7oum5ucoxem78iq" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                             ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
			case   /* communicate      */ "hcqa5px07ykh0xuivr1h" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                             ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
            case   /* reports     	   */ "70clhluv4thq5sa8e0r7" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"margin-left:50px;margin-top:50px;\"><img src=\"https://lh4.googleusercontent.com/-bz-QzShfbx4/Uddv4FBoplI/AAAAAAAAHaM/iFNaaL5RB9M/s1600/My-Documents-icon.png\"                                             ></div>'})").setMimeType(ContentService.MimeType.JSON); // https://lh4.googleusercontent.com/-9n6JR11XRqQ/Ucu6JBqkKsI/AAAAAAAAHSY/W-PstIIS8a4/s1600/Folder-Data-icon.png
            case   /* registration-rvp */ "0xfhu6awm1r9n8kqrovu" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"no\"   style=\"xmargin-top:-200px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/team/rvp/apply-rvp#sites-canvas-main-content\"  ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON); // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
			case   /* mj-leads     	   */ "6j1irvdgpny8s85tmyle" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"no\"   style=\"xmargin-top:-200px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/products/mojo#sites-canvas-main-content\"       ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON); // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
			case   /* recruit-send     */ "vdi4dog0uxzw2hp3qijr" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"no\"   style=\"xmargin-top:-200px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/manage/recruit#sites-canvas-main-content\"      ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON); // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
			case   /* recruit-track    */ "q9bg6cghxv47y8q3bsp3" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"no\"   style=\"xmargin-top:-200px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/manage/recruit#sites-canvas-main-content\"      ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON); // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
			case   /* reports-dash     */ "6przyjigmlb482rcvj9h" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"no\"   style=\"xmargin-top:-200px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/manage/dashboard#sites-canvas-main-content\"    ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON); // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* sp-dashboard     */ "9rxj1f5i6pacjmvlsy8o" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"no\"   style=\"xmargin-top:-200px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/manage/dashboard#sites-canvas-main-content\"    ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON); // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            // Pages below this line do respond to the # anchor for <iframe> but we use negative margins to enable scrolling while limiting to top edge
            case   /* bugs-features    */ "sbtbrudws25mh30u5w7k" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"auto\" style=\" margin-top:-240px;width:100%;height:1500px;\" src=\"https://sites.google.com/site/gosalespro/manage/bugs-features\"                          ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON); // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
			// Pages below this line do not respond to # anchor for <iframe> so we used negative margins which also limit scrolling above top edge
            case   /* registration-sp  */ "oquov5gxksujhxuyljfu" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"auto\" style=\" margin-top:-150px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/team/sp/apply#sites-canvas-main-content\"       ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON); // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* objectives       */ "01hjwn67rgdl8zpakqkz" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"auto\" style=\" margin-top:-250px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/manage/objectives#sites-canvas-main-content\"   ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON); // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
			case   /* announcements    */ "pcc1qdkz8msvmyrhp7qv" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"auto\" style=\" margin-top:-180px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/admin/announcements#sites-canvas-main-content\" ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON); // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
            case   /* discussion       */ "jcqf4v2jsq3jt32l4hps" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"auto\" style=\" margin-top:-250px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/manage/discuss\"                                ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON); // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
			case   /* reports-ratios   */ "h6nhxx95ddaiyapps92d" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"auto\" style=\" margin-top:-200px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/manage/mojo-reports#sites-canvas-main-content\" ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON); // Eventually, make page more general (i.e., not mojo-reports, maybe just reports?)  // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
			case   /* mj-ratios        */ "22vi5w7p5w9axkmzboug" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"auto\" style=\" margin-top:-200px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/gosalespro/manage/mojo-reports#sites-canvas-main-content\" ></iframe></div>'})").setMimeType(ContentService.MimeType.JSON); // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622     
         default                          :                                                                                                  ;break;}} 
    var pageName = /*"rvp"*/SitesApp.getActivePage().getName();switch(pageName){
            case   "apply"                : return apply                               (     )                                               ;break;
            case   "apply-rvp"         // : return apply                               (     )                                               ;break;
                                          : return HtmlService.createHtmlOutputFromFile("register");                                         ;break;
            case   "mojo"                 : return mojo_leads                          (e    )                                               ;break;   // e.parameter.z calls record ID
            case   "mojo-original"        : return mojo_leads                          (e    )                                               ;break;
            case   "mojo-reports"         : return mojo_reports                        (     )                                               ;break;   // aka “Results”
            case   "reports"              : return reports                             (     )                                               ;break;
            case   "recruiter"            : return recruitersHomePage                  (e    )                                               ;break;
            case   "recruit"              : return recruitTheRecruiters                (     )                                               ;break;
         // case   "coo"                  : return coo                                 (     )                                               ;break;
         // case   "rvp"                  : return HtmlService.createHtmlOutputFromFile("rvp").setSandboxMode(HtmlService.SandboxMode.NATIVE);break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja?hl=en#setsandboxmode
            case   "dashboard"            : return                                                                                           ;break;
            case   "authorize"            : return authorize                           (     )                                               ;break;
            case   "experimental"         : return coo/*experimental*/                 (     )                                               ;break;
//
//          case   "wholesaler_data"      : return HtmlService.createTemplateFromFile  ("wholesaler_data"  ).evaluate();break;
//
         default                          :                                ;break;}}
function processForm(formObject){var formBlob=formObject.myFile,driveFile=DriveApp.createFile(formBlob);return driveFile.getUrl();}
/*function doPost(e){var pageName = SitesApp.getActivePage().getName();switch(pageName){
            case   "recruit"              : return handleRTR            (e);break;
         default                          :                                ;break;}}*/
//function loadLibrary(client){var i,r,cArr,contents="",c=CacheService.getPublicCache(),cache=c.get(client);if(cache){cArr=cache.split(","),i=cArr.length;while(i--){r=c.get(cArr[i]);contents+=r;c.put(cArr[i],r,21600);}}else{var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js",client];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);i=files.length;while(i--){r=UrlFetchApp.fetch(files[i]).getContentText();contents+=r;c.put(files[i],r,21600);}c.put(client,files.toString(),21600);}return contents;}
// --------------------------------------------------------- DATA TABLE CONSTRUCTOR --------------------------------------------------------- @https://developers.google.com/chart/interactive/docs/reference#DataTable
function dataTableConstructor(){/*Dashboard*///var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    var db=ScriptDb.getMyDb(),dt=[["ID","Link","Own",/*"Region",*/"Pre","E","Nex","T","Disposition","Company","Phone","City","St","Geo","Notes"]],i=1,notelink,link,own,r,result=db.query({table:"leads"}),d=new Date().getTime();while(result.hasNext()){r=result.next();if(r.owner){own=r.owner.slice(0,4)}else{/*continue;*/own="none";}
    link="<a target='_blank' title='"+r.history+"' href='https://sites.google.com/site/gosalespro/products/mojo?z="+r.getId().rc4Encrypt("IDQfyT21I1").hexEncode()+"'>click</a>";if(r.history){notelink=link+"<span title='"+r.history+"'> "+r.history.slice(0,100)+"</span>"}else{notelink=""}//dt=[['Country code','Population','Density'],['CN',1322970000,137],['IN',1130130000,336],['US',303605941,31],['ID',231627000,117],['BR',186315468,22],['PK',162652500,198],['BD',158665000,1045],['NG',148093000,142],['RU',141933955,8.4],['JP',127790000,339]];//dt=[['Country code','Population','Density'],['CA',36553215,83.85],['TX',23904380,30.75],['NY',19297729,155.18],['FL',18251243,114.43],['IL',12852548,86.27],['PA',12432792,105.8],['OH',11466917,107.05],['MI',10071822,67.55],['GA',9544750,54.59],['NC',9061032,63.8]];
    dt.push([i++,link,own,/*r.regionName,*/(Math.floor((d-r.latestSubmit)/(1000*60*60*24))||-1),(Math.floor((d-r.latestEmail)/(1000*60*60*24))||-1),(Math.floor((r.callback-d)/(1000*60*60*24))||0),r.temperature||"",r.disposition||"",r.name,r.phone,r.city,r.state,"US-"+r.state,notelink])}
    return ContentService.createTextOutput("drawVisualization("+JSON.stringify(dt)+")").setMimeType(ContentService.MimeType.JSON)}
function dataTableConstructor1(){//var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    var db=ScriptDb.getMyDb(),d=new Date().getTime(),user=Session.getUser().getEmail(),dt={},i=1,notelink,link,own,r,result;if(user=="atlaslive@gmail.com"||user=="benharvill@gmail.com"){result=db.query({table:"leads"})}else{result=db.query({table:"leads",owner:user/*"jrcamf@gmail.com"*/})}
    dt.cols=[{id:"ID"         ,label:"ID"         ,type:"number"}
            ,{id:"Link"       ,label:"Link"       ,type:"string"}
            ,{id:"Own"        ,label:"Own"        ,type:"string"}
         // ,{id:"Region"     ,label:"Region"     ,type:"string"}
            ,{id:"Pre"        ,label:"Pre"        ,type:"number"}
            ,{id:"E"          ,label:"E"          ,type:"number"}
            ,{id:"Nex"        ,label:"Nex"        ,type:"number"}
            ,{id:"T"          ,label:"T"          ,type:"string"}
            ,{id:"Disposition",label:"Disposition",type:"string"}
            ,{id:"Company"    ,label:"Company"    ,type:"string"}
            ,{id:"Phone"      ,label:"Phone"      ,type:"string"}
            ,{id:"City"       ,label:"City"       ,type:"string"}
            ,{id:"Geo"        ,label:"St"         ,type:"string"}
         // ,{id:"Geo"        ,label:"Geo"        ,type:"string"}
            ,{id:"Notes"      ,label:"Notes"      ,type:"string"}];
    dt.rows=[];while(result.hasNext()){r=result.next();if(r.owner){own=r.owner.slice(0,4)}else{/*continue;*/own="none";}link="<a target='_blank' title='"+r.history+"' href='https://sites.google.com/site/gosalespro/products/mojo?z="+r.getId().rc4Encrypt("IDQfyT21I1").hexEncode()+"'>click</a>";if(r.history){notelink=link+"<span title='"+r.history+"'> "+r.history.slice(0,100)+"</span>"}else{notelink=""}//dt=[['Country code','Population','Density'],['CN',1322970000,137],['IN',1130130000,336],['US',303605941,31],['ID',231627000,117],['BR',186315468,22],['PK',162652500,198],['BD',158665000,1045],['NG',148093000,142],['RU',141933955,8.4],['JP',127790000,339]];//dt=[['Country code','Population','Density'],['CA',36553215,83.85],['TX',23904380,30.75],['NY',19297729,155.18],['FL',18251243,114.43],['IL',12852548,86.27],['PA',12432792,105.8],['OH',11466917,107.05],['MI',10071822,67.55],['GA',9544750,54.59],['NC',9061032,63.8]];
    dt.rows.push({c:[{v:                 i++                                          }     // ID
                    ,{v:                 link                                         }     // Link
                    ,{v:                 own                                          }     // Own
                 // ,{v:               r.regionName                                   }     // Region
                    ,{v:(Math.floor((d-r.latestSubmit)/(1000*60*60*24))||-1)          }     // Pre
                    ,{v:(Math.floor((d-r.latestEmail )/(1000*60*60*24))||-1)          }     // E
                    ,{v:(Math.floor((  r.callback-d  )/(1000*60*60*24))|| 0)          }     // Nex
                    ,{v:               r.temperature                   ||""           }     // Temperature
                    ,{v:               r.disposition                   ||""           }     // Disposition
                    ,{v:               r.name                                         }     // Company
                    ,{v:               r.phone                                        }     // Phone
                    ,{v:               r.city                                         }     // City
                    ,{v:         "US-"+r.state                              ,f:r.state}     // St
                 // ,{v:         "US-"+r.state                                        }     // Geo
                    ,{v:                 notelink                                     }]})} // Notes
    return ContentService.createTextOutput("drawVisualization("+JSON.stringify(dt)+")").setMimeType(ContentService.MimeType.JSON)} // return ContentService.createTextOutput("google.visualization.Query.setResponse({version:'0.6',status:'ok',table:"+JSON.stringify(dt)+"})").setMimeType(ContentService.MimeType.JSON)} // var temp="// Data table response"+"/n"+"google.visualization.Query.setResponse({\"version\":\"0.6\",\"status\":\"ok\",\"sig\":\"1664774139\",\"table\":{\"cols\":[{\"id\":\"A\",\"label\":\"A - Name\",\"type\":\"string\",\"pattern\":\"\"},{\"id\":\"B\",\"label\":\"B - Department\",\"type\":\"string\",\"pattern\":\"\"},{\"id\":\"C\",\"label\":\"C - Country\",\"type\":\"string\",\"pattern\":\"\"},{\"id\":\"D\",\"label\":\"D - Continenet\",\"type\":\"string\",\"pattern\":\"\"},{\"id\":\"E\",\"label\":\"E - Expanes\",\"type\":\"number\",\"pattern\":\"#0.###############\"},{\"id\":\"F\",\"label\":\"Revenue\",\"type\":\"number\",\"pattern\":\"#0.###############\"},{\"id\":\"G\",\"label\":\"G - Adoption\",\"type\":\"number\",\"pattern\":\"#0.###############\"}],\"rows\":[{\"c\":[{\"v\":\"Josh\"},{\"v\":\"Food\"},{\"v\":\"China\"},{\"v\":\"Asia\"},{\"v\":5000.0,\"f\":\"5000\"},{\"v\":12000.0,\"f\":\"12000\"},{\"v\":58.0,\"f\":\"58\"}]},{\"c\":[{\"v\":\"Joe\"},{\"v\":\"Food\"},{\"v\":\"India\"},{\"v\":\"Asia\"},{\"v\":6500.0,\"f\":\"6500\"},{\"v\":52000.0,\"f\":\"52000\"},{\"v\":89.0,\"f\":\"89\"}]},{\"c\":[{\"v\":\"Gili\"},{\"v\":\"Cloths\"},{\"v\":\"United States\"},{\"v\":\"America\"},{\"v\":5900.0,\"f\":\"5900\"},{\"v\":36900.0,\"f\":\"36900\"},{\"v\":97.0,\"f\":\"97\"}]},{\"c\":[{\"v\":\"Peter\"},{\"v\":\"Food\"},{\"v\":\"Indonesia\"},{\"v\":\"Asia\"},{\"v\":2300.0,\"f\":\"2300\"},{\"v\":12000.0,\"f\":\"12000\"},{\"v\":65.0,\"f\":\"65\"}]},{\"c\":[{\"v\":\"Moshes\"},{\"v\":\"Food\"},{\"v\":\"Brazil\"},{\"v\":\"America\"},{\"v\":2980.0,\"f\":\"2980\"},{\"v\":50222.0,\"f\":\"50222\"},{\"v\":59.0,\"f\":\"59\"}]},{\"c\":[{\"v\":\"Gram\"},{\"v\":\"Food\"},{\"v\":\"Pakistan\"},{\"v\":\"Asia\"},{\"v\":2700.0,\"f\":\"2700\"},{\"v\":89777.0,\"f\":\"89777\"},{\"v\":80.0,\"f\":\"80\"}]},{\"c\":[{\"v\":\"Nickol\"},{\"v\":\"Cloths\"},{\"v\":\"Bangladesh\"},{\"v\":\"Asia\"},{\"v\":6500.0,\"f\":\"6500\"},{\"v\":58000.0,\"f\":\"58000\"},{\"v\":89.0,\"f\":\"89\"}]},{\"c\":[{\"v\":\"Avraham\"},{\"v\":\"Food\"},{\"v\":\"Nigeria\"},{\"v\":\"Africa\"},{\"v\":9000.0,\"f\":\"9000\"},{\"v\":32000.0,\"f\":\"32000\"},{\"v\":83.0,\"f\":\"83\"}]},{\"c\":[{\"v\":\"Dani\"},{\"v\":\"Cloths\"},{\"v\":\"Russia\"},{\"v\":\"Asia\"},{\"v\":7000.0,\"f\":\"7000\"},{\"v\":69000.0,\"f\":\"69000\"},{\"v\":87.0,\"f\":\"87\"}]},{\"c\":[{\"v\":\"Mili\"},{\"v\":\"Cloths\"},{\"v\":\"Japan\"},{\"v\":\"Asia\"},{\"v\":3240.0,\"f\":\"3240\"},{\"v\":64000.0,\"f\":\"64000\"},{\"v\":80.0,\"f\":\"80\"}]},{\"c\":[{\"v\":\"Toni\"},{\"v\":\"Food\"},{\"v\":\"England\"},{\"v\":\"Europe\"},{\"v\":2100.0,\"f\":\"2100\"},{\"v\":12000.0,\"f\":\"12000\"},{\"v\":95.0,\"f\":\"95\"}]},{\"c\":[{\"v\":\"Bill\"},{\"v\":\"Food\"},{\"v\":\"Franch\"},{\"v\":\"Europe\"},{\"v\":0.0,\"f\":\"0\"},{\"v\":98000.0,\"f\":\"98000\"},{\"v\":45.0,\"f\":\"45\"}]},{\"c\":[{\"v\":\"Tivoli\"},{\"v\":\"Food\"},{\"v\":\"Sudan\"},{\"v\":\"Africa\"},{\"v\":3290.0,\"f\":\"3290\"},{\"v\":18000.0,\"f\":\"18000\"},{\"v\":80.0,\"f\":\"80\"}]}]}});";//return ContentService.createTextOutput(temp).setMimeType(ContentService.MimeType.JSON)}
function dataTableConstructor2(m){/*Recruiting;m=0:apply,1:recruiter*/ //var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    var db=ScriptDb.getMyDb(),d=new Date().getTime(),user=Session.getUser().getEmail(),x=["apply","recruiter"],dt={},i=1,notelink,link,own,r,result;if(user=="atlaslive@gmail.com"||user=="benharvill@gmail.com"){result=db.query({table:x[m]})}else{result=db.query({table:x[m],owner:user/*"jrcamf@gmail.com"*/})}
    dt.cols=[{id:"ID"         ,label:"ID"         ,type:"number"}
            ,{id:"Ago"        ,label:"Ago"        ,type:"number"}
            ,{id:"Own"        ,label:"Own"        ,type:"string"}
            ,{id:"Class"      ,label:"Class"      ,type:"string"}
            ,{id:"Name"       ,label:"Name"       ,type:"string"}
            ,{id:"Phone"      ,label:"Phone"      ,type:"string"}
            ,{id:"Email"      ,label:"Email"      ,type:"string"}];
    dt.rows=[];while(result.hasNext()){r=result.next();if(r.owner){own=r.owner.slice(0,4)}else{/*continue;*/own="none";}link="<a target='_blank' title='"+r.history+"' href='https://sites.google.com/site/gosalespro/products/mojo?z="+r.getId().rc4Encrypt("IDQfyT21I1").hexEncode()+"'>click</a>";if(r.history){notelink=link+"<span title='"+r.history+"'> "+r.history.slice(0,100)+"</span>"}else{notelink=""}//dt=[['Country code','Population','Density'],['CN',1322970000,137],['IN',1130130000,336],['US',303605941,31],['ID',231627000,117],['BR',186315468,22],['PK',162652500,198],['BD',158665000,1045],['NG',148093000,142],['RU',141933955,8.4],['JP',127790000,339]];//dt=[['Country code','Population','Density'],['CA',36553215,83.85],['TX',23904380,30.75],['NY',19297729,155.18],['FL',18251243,114.43],['IL',12852548,86.27],['PA',12432792,105.8],['OH',11466917,107.05],['MI',10071822,67.55],['GA',9544750,54.59],['NC',9061032,63.8]];
    dt.rows.push({c:[{v:                 i++                                          }     // ID
                    ,{v:(Math.floor((d-r.emailedOn   )/(1000*60*60*24))||-1)          }     // Ago
                    ,{v:                 own                                          }     // Own
                    ,{v:               r.class                                        }     // Class
                    ,{v:               r.name                                         }     // Name
                    ,{v:               r.phone                                        }     // Phone
                    ,{v:               r.email                                        }]})} // Email
    return ContentService.createTextOutput("drawVisualization("+JSON.stringify(dt)+")").setMimeType(ContentService.MimeType.JSON)} // return ContentService.createTextOutput("google.visualization.Query.setResponse({version:'0.6',status:'ok',table:"+JSON.stringify(dt)+"})").setMimeType(ContentService.MimeType.JSON)} // var temp="// Data table response"+"/n"+"google.visualization.Query.setResponse({\"version\":\"0.6\",\"status\":\"ok\",\"sig\":\"1664774139\",\"table\":{\"cols\":[{\"id\":\"A\",\"label\":\"A - Name\",\"type\":\"string\",\"pattern\":\"\"},{\"id\":\"B\",\"label\":\"B - Department\",\"type\":\"string\",\"pattern\":\"\"},{\"id\":\"C\",\"label\":\"C - Country\",\"type\":\"string\",\"pattern\":\"\"},{\"id\":\"D\",\"label\":\"D - Continenet\",\"type\":\"string\",\"pattern\":\"\"},{\"id\":\"E\",\"label\":\"E - Expanes\",\"type\":\"number\",\"pattern\":\"#0.###############\"},{\"id\":\"F\",\"label\":\"Revenue\",\"type\":\"number\",\"pattern\":\"#0.###############\"},{\"id\":\"G\",\"label\":\"G - Adoption\",\"type\":\"number\",\"pattern\":\"#0.###############\"}],\"rows\":[{\"c\":[{\"v\":\"Josh\"},{\"v\":\"Food\"},{\"v\":\"China\"},{\"v\":\"Asia\"},{\"v\":5000.0,\"f\":\"5000\"},{\"v\":12000.0,\"f\":\"12000\"},{\"v\":58.0,\"f\":\"58\"}]},{\"c\":[{\"v\":\"Joe\"},{\"v\":\"Food\"},{\"v\":\"India\"},{\"v\":\"Asia\"},{\"v\":6500.0,\"f\":\"6500\"},{\"v\":52000.0,\"f\":\"52000\"},{\"v\":89.0,\"f\":\"89\"}]},{\"c\":[{\"v\":\"Gili\"},{\"v\":\"Cloths\"},{\"v\":\"United States\"},{\"v\":\"America\"},{\"v\":5900.0,\"f\":\"5900\"},{\"v\":36900.0,\"f\":\"36900\"},{\"v\":97.0,\"f\":\"97\"}]},{\"c\":[{\"v\":\"Peter\"},{\"v\":\"Food\"},{\"v\":\"Indonesia\"},{\"v\":\"Asia\"},{\"v\":2300.0,\"f\":\"2300\"},{\"v\":12000.0,\"f\":\"12000\"},{\"v\":65.0,\"f\":\"65\"}]},{\"c\":[{\"v\":\"Moshes\"},{\"v\":\"Food\"},{\"v\":\"Brazil\"},{\"v\":\"America\"},{\"v\":2980.0,\"f\":\"2980\"},{\"v\":50222.0,\"f\":\"50222\"},{\"v\":59.0,\"f\":\"59\"}]},{\"c\":[{\"v\":\"Gram\"},{\"v\":\"Food\"},{\"v\":\"Pakistan\"},{\"v\":\"Asia\"},{\"v\":2700.0,\"f\":\"2700\"},{\"v\":89777.0,\"f\":\"89777\"},{\"v\":80.0,\"f\":\"80\"}]},{\"c\":[{\"v\":\"Nickol\"},{\"v\":\"Cloths\"},{\"v\":\"Bangladesh\"},{\"v\":\"Asia\"},{\"v\":6500.0,\"f\":\"6500\"},{\"v\":58000.0,\"f\":\"58000\"},{\"v\":89.0,\"f\":\"89\"}]},{\"c\":[{\"v\":\"Avraham\"},{\"v\":\"Food\"},{\"v\":\"Nigeria\"},{\"v\":\"Africa\"},{\"v\":9000.0,\"f\":\"9000\"},{\"v\":32000.0,\"f\":\"32000\"},{\"v\":83.0,\"f\":\"83\"}]},{\"c\":[{\"v\":\"Dani\"},{\"v\":\"Cloths\"},{\"v\":\"Russia\"},{\"v\":\"Asia\"},{\"v\":7000.0,\"f\":\"7000\"},{\"v\":69000.0,\"f\":\"69000\"},{\"v\":87.0,\"f\":\"87\"}]},{\"c\":[{\"v\":\"Mili\"},{\"v\":\"Cloths\"},{\"v\":\"Japan\"},{\"v\":\"Asia\"},{\"v\":3240.0,\"f\":\"3240\"},{\"v\":64000.0,\"f\":\"64000\"},{\"v\":80.0,\"f\":\"80\"}]},{\"c\":[{\"v\":\"Toni\"},{\"v\":\"Food\"},{\"v\":\"England\"},{\"v\":\"Europe\"},{\"v\":2100.0,\"f\":\"2100\"},{\"v\":12000.0,\"f\":\"12000\"},{\"v\":95.0,\"f\":\"95\"}]},{\"c\":[{\"v\":\"Bill\"},{\"v\":\"Food\"},{\"v\":\"Franch\"},{\"v\":\"Europe\"},{\"v\":0.0,\"f\":\"0\"},{\"v\":98000.0,\"f\":\"98000\"},{\"v\":45.0,\"f\":\"45\"}]},{\"c\":[{\"v\":\"Tivoli\"},{\"v\":\"Food\"},{\"v\":\"Sudan\"},{\"v\":\"Africa\"},{\"v\":3290.0,\"f\":\"3290\"},{\"v\":18000.0,\"f\":\"18000\"},{\"v\":80.0,\"f\":\"80\"}]}]}});";//return ContentService.createTextOutput(temp).setMimeType(ContentService.MimeType.JSON)}
// ---------------------------------------------------------------- AUTHPAGE ----------------------------------------------------------------
function authorize(){return HtmlService.createHtmlOutput("<div align='center' style='color:#808080;font-family:verdana;color:red;font-weight:bold;margin-top:15px;'>Authorization successful!<div style='color:#808080;font-size:smaller;font-weight:normal;'>You may now access all features</div><img src='https://lh5.googleusercontent.com/-qNeC7Kx1A0E/TUhNBYG_UMI/AAAAAAAABLc/8E-fJS1hcn0/s144/checkmark.jpg' height='100'></div>")}
// ---------------------------------------------------------------- APPLY ----------------------------------------------------------------
function handleSubmitApply(e){
    var app=UiApp.getActiveApplication(),user=Session.getUser().getEmail(),db=ScriptDb.getMyDb(),r=db.query({table:"apply",email:user}).next(),ob=e.parameter,reg=ob.regionName_tag.split(",");ob.updatedTime=new Date().getTime();ob.table="apply";ob.regionNumber=1+reg.indexOf(ob.regionName); // Prepare save-object
    if(r){var delId=r.getId(),rcloned=JSON.parse(JSON.stringify(r));r=ob;r.count=rcloned.count;r.addedTime=rcloned.addedTime;db.save(r);db.remove(db.load(delId));} // Update existing record, if it exists // Schema... // Header: var acctSum=app.createLabel(bal+" balance, available "+avail).setId("acctSum").setTag(bal+","+avail);vpan.add(acctSum); // Body: var bal,added,owned,added=db.query({table:"deposit",addedUser:user}).getSize();owned=db.query({table:"deposit",owner:user}).getSize();bal=added-owned; // Handler: var t=p.acctSum_tag.split(",");app.getElementById("acctSum").setTag((--t[0])+","+(--t[1])).setText(t[0]+" balance, available "+t[1]);break; // Reset balance summary
    else{ob.addedUser=user;ob.addedTime=new Date().getTime();db.save(ob);} // Else save new object // Apply stamps: user, time; // Save // Debug: app.getElementById("msg").setStyleAttribute("color","blue").setText(i+all[i]);
    app.getElementById("b0").setText("Save");app.getElementById("pic").setVisible(false);app.getElementById("word").setVisible(false);app.close();return app;} // Reset buttons and graphics // Clean up, close & return — note: return is REQUIRED for widget to actually close
function apply(){ // --------------------------------------------- APPLY -----------------------------------------------------------------
    //var LOAD = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    var app  = UiApp.createApplication(),user=Session.getUser().getEmail(),db=ScriptDb.getMyDb(),grid=app.createGrid(10,4),y=0,x=0,na="",ph="",ad="",re="",bn="",rn="",an="";if(db.query({table:"apply",email:user}).getSize()){r=db.query({table:"apply",email:user}).next()}else if(e&&e.parameter&&e.parameter.z){r=db.load(e.parameter.z.hexDecode().rc4Decrypt("0KWuuYtZy0"));}if(r){na=r.name;ph=r.phone;ad=r.address;bn=r.bankName;rn=r.routingNo;an=r.bankAcctNo;} // Set values of string variables to match existing record
    var vpan = app.createVerticalPanel().add(grid);app.add(vpan);
    var msg  = app.createLabel("Ready"    ).setId("msg" ).setVisible(false).setStyleAttribute("color","red"); // Debug
    var word = app.createLabel("Saving...").setId("word").setVisible(false).setStyleAttribute("color","#FF0000");var SRC="https://lh4.googleusercontent.com/-sc678cHQVB0/UIER_ilAZ2I/AAAAAAAADho/C16a_vyaG5s/s800/ajax-loader-red.gif";
    var pic  = app.createImage(SRC        ).setId("pic" ).setVisible(false);
    var h0   = app.createServerHandler("handleSubmitApply").addCallbackElement(vpan);
    var b0   = app.createButton("Save",app.createClientHandler().forEventSource().setText("Wait...").forTargets([pic,word]).setVisible(true)).addClickHandler(h0).setId("b0");
    var list = app.createListBox().setName("regionName").setId("regionName").addItem ("-Region-").setTitle("Select your region"),sr=salesRegions().slice(1).reverse();
    i=sr.length;while(i--){list.addItem(sr[i])}list.setTag(sr.reverse());if(r){list.setSelectedIndex(r.regionNumber)}
    /* -------------------------------------------------------- */ // First column /* -------------------------------------------------------- */
    grid.setWidget(y++,x,pic                                                                                                            ); // Load   graphic
    grid.setWidget(y++,x,word                                                                                                           ); // Saving notice
    grid.setWidget(y++,x,msg                                                                                                            ); // Debug  message
    /* ---------------------------------------------------- */ y=0;x++; // Next column /* ---------------------------------------------------- */
    grid.setWidget(y++,x,b0                                                                                                             ); // Submit button
    grid.setWidget(y++,x,app.createLabel   ("Email"         )                                                                           );
    grid.setWidget(y++,x,app.createLabel   ("Full name"     )                                                                           );
    grid.setWidget(y++,x,app.createLabel   ("Phone number"  )                                                                           );
    grid.setWidget(y++,x,app.createLabel   ("Full address"  )                                                                           );
    grid.setWidget(y++,x,app.createLabel   ("Bank name"     )                                                                           );
    grid.setWidget(y++,x,app.createLabel   ("Routing number")                                                                           );
    grid.setWidget(y++,x,app.createLabel   ("Account number")                                                                           );
    /* ---------------------------------------------------- */ y=0;x++; // Next column /* ---------------------------------------------------- */
    grid.setWidget(y++,x,list                                                                                                           );
    grid.setWidget(y++,x,app.createTextBox (                ).setName("email"     ).setId("email"     ).setValue(user).setEnabled(false));
    grid.setWidget(y++,x,app.createTextBox (                ).setName("name"      ).setId("name"      ).setValue( na )                  );
    grid.setWidget(y++,x,app.createTextBox (                ).setName("phone"     ).setId("phone"     ).setValue( ph ).setMaxLength( 10));
    grid.setWidget(y++,x,app.createTextArea(                ).setName("address"   ).setId("address"   ).setValue( ad )                  );
    grid.setWidget(y++,x,app.createTextBox (                ).setName("bankName"  ).setId("bankName"  ).setValue( bn )                  );
    grid.setWidget(y++,x,app.createTextBox (                ).setName("routingNo" ).setId("routingNo" ).setValue( rn ).setMaxLength(  9));
    grid.setWidget(y++,x,app.createTextBox (                ).setName("bankAcctNo").setId("bankAcctNo").setValue( an )                  );
    return app;} // Display
// ------------------------------------------------- RECRUITERS HOME PAGE (TABS PAGE) ---------------------------------------------------------
function recruitersHomePage(e){var app=UiApp.createApplication(),ob={Account:recruiterAccount(e),Refer:recruiterRefer()},keys=Object.keys(ob).reverse(),tabPanel=app.createDecoratedTabPanel(),i=keys.length;while(i--){tabPanel.add(app.createScrollPanel().setWidth("500").setHeight("250").add(ob[keys[i]]),keys[i]).setAnimationEnabled(true)}return app.add(tabPanel.selectTab(0))} // To convert to using tab panels, on all refered funcs: 1. UiApp./*create* /getActiveApplication(); 2. var form=app.createFormPanel(); 3. form.add(vpan);app.add(form); 4. return /*app* /form; Note: Replace form w/ tab if rendering a table. // Reference: https://sites.google.com/site/appsscripttutorial/user-interface/tab-panel // Note: On 12/11/2013 decided to use tab panels instead of radio buttons to display day,week,month,etc.; because radio buttons are too difficult to implement due to asynchronious server handler calls; ob={"Production":mojo_production(),...} ...see Deprecated Code
// ------------------------------------------------------ RECRUITERS HOME PAGE ----------------------------------------------------------------
function email_caller(m){//var LOAD = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    var app=UiApp.getActiveApplication(),db=ScriptDb.getMyDb(),u=db.query({table:"recruiter",email:m[1].owner}).next(),aTag="<a href='https://sites.google.com/site/gosalespro/team/sp/apply?z="+m[0].rc4Encrypt("0KWuuYtZy0").hexEncode()+"'>",head="Congratulations! You’re Hired!",body=aTag+"Click here</a> to start now.<br/><br/>"+aTag+"<img src='cid:flyer'></a>",flyerBlob=UrlFetchApp.fetch("https://lh6.googleusercontent.com/-405Wvbv6mkQ/UV94F2qb_PI/AAAAAAAAGMw/Wngi1c4pIYY/s1600/YouAreHired.png").getBlob().setName("flyerBlob");MailApp./*GmailApp.*/sendEmail(m[1].email||m[1].email1,head,"",{name:u.name,noReply:true,htmlBody:body,inlineImages:{flyer:flyerBlob}/*,from:"atlaslive@gmail.com"GMailApp.getAliases()*/});/*app.close();*/return app;} // Send email // Link only, no image: GmailApp.sendEmail(m.email,head,"",{name:u.name,noReply:true,htmlBody:body}); // Link only, no image: body="<a href=\"https://sites.google.com/site/mojocreditproject/account\">Click here</a>for free trial and money-back guarantee.";
function handleRecruiter_account(e){var app=UiApp.getActiveApplication(),user=Session.getUser().getEmail(),db=ScriptDb.getMyDb(),ob=e.parameter,r=db.load(ob.email_tag);r.updatedTime=new Date().getTime();r.history+="{"+r.updatedTime+":"+JSON.stringify(r)+"}";for(x in ob){if(!ob.hasOwnProperty(x)){continue;}r[x]=ob[x];}db.save(r); // Update existing record
    app.getElementById("b0").setText("Save");app.getElementById("pic").setVisible(false);app.getElementById("word").setVisible(false);app.add(app.createLabel("Saved!")).add(app.createLabel("Refresh [f5]"));/*app.close();*/return app;} // Reset buttons and graphics // Clean up, close & return — note: return is REQUIRED for widget to actually close
function handleRecruiter_refer(e){var app=UiApp.getActiveApplication(),user=Session.getUser().getEmail(),db=ScriptDb.getMyDb(),d=new Date(),arr=["name1","phone1","email1"],r,i,ob=e.parameter;ob.addedTime=d.getTime();ob.table="apply";ob.owner=user;if(db.query({table:"apply",email1:ob.email1}).getSize()){r=db.query({table:"apply",email1:ob.email1}).next()}else{r=db.save(ob);}email_caller([r.getId(),r]);app.add(app.createLabel("Success! emailed to ‘"+r.email1+"’")).add(app.createLabel("Refresh [f5]"));app.getElementById("b1").setText("Send");app.getElementById("pic1").setVisible(false);app.getElementById("word1").setVisible(false);i=arr.length;while(i--){app.getElementById(arr[i]).setValue("");}/*app.close();*/return app;} // Reset buttons and graphics // Clean up, close & return — note: return is REQUIRED for widget to actually close //app.getElementById("pic").setVisible(false);app.getElementById("word").setVisible(false);while(i--){app.getElementById(arr[i]).setText("")}app.close();return app;
// ------------------------------------------------------ RECRUITERS HOME PAGE ----------------------------------------------------------------
function recruiterAccount(e){ // Recruiters’ signup and contact information
    //var LOAD = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    var app  = UiApp./*create*/getActiveApplication(),user=Session.getUser().getEmail(),db=ScriptDb.getMyDb(),grid=app.createGrid(10,4),y=0,x=0,r=false,na="",ph="",em="",/*ad="",bn="",*/rn="",an="";if(db.query({table:"recruiter",email:user}).getSize()){r=db.query({table:"recruiter",email:user}).next()}else if(e&&e.parameter&&e.parameter.z){r=db.load(e.parameter.z.hexDecode().rc4Decrypt("NJmev7gH3j"))}if(r){if(r.name){na=r.name;}if(r.phone){ph=r.phone;}if(r.email){em=r.email;}if(r.routingNo){rn=r.routingNo;}if(r.bankAcctNo){an=r.bankAcctNo;}} // Set values of string variables to match existing record
    var form = app.createFormPanel();
    var vpan = app.createVerticalPanel().add(grid);/*app*/form.add(vpan); // To convert to using tab panels, on all refered funcs: 1. UiApp./*create* /getActiveApplication(); 2. var form=app.createFormPanel(); 3. form.add(vpan);app.add(form); 4. return /*app* /form; Note: Replace form w/ tab if rendering a table.
    var msg  = app.createLabel("Ready"     ).setId("msg" ).setVisible(false).setStyleAttribute("color","red"); // Debug
    var word = app.createLabel("Saving..." ).setId("word").setVisible(false).setStyleAttribute("color","#FF0000");var SRC="https://lh4.googleusercontent.com/-sc678cHQVB0/UIER_ilAZ2I/AAAAAAAADho/C16a_vyaG5s/s800/ajax-loader-red.gif";
    var pic  = app.createImage(SRC         ).setId("pic" ).setVisible(false);
    var h0   = app.createServerHandler("handleRecruiter_account").addCallbackElement(vpan);
    var b0   = app.createButton("Save",app.createClientHandler().forEventSource().setText("Wait...").forTargets([pic,word]).setVisible(true)).addClickHandler(h0).setId("b0");
    /* -------------------------------------------------------- */ // First column /* -------------------------------------------------------- */
    grid.setWidget(y++,x,pic                                                                                                           ); // Load   graphic
    grid.setWidget(y++,x,word                                                                                                          ); // Saving notice
    grid.setWidget(y++,x,msg                                                                                                           ); // Debug  message
    /* ---------------------------------------------------- */ y=0;x++; // Next column /* ---------------------------------------------------- */
    grid.setWidget(y++,x,b0                                                                                                            ); // Submit button
    grid.setWidget(y++,x,app.createLabel  ("Name"          )                                                                           );
    grid.setWidget(y++,x,app.createLabel  ("Phone"         )                                                                           );
    grid.setWidget(y++,x,app.createLabel  ("Routing number")                                                                           );
    grid.setWidget(y++,x,app.createLabel  ("Account number")                                                                           );
    /* ---------------------------------------------------- */ y=0;x++; // Next column /* ---------------------------------------------------- */
    grid.setWidget(y++,x,app.createTextBox().setName("email"     ).setId("email"     ).setValue(em).setEnabled(false).setTag(r.getId()));
    grid.setWidget(y++,x,app.createTextBox().setName("name"      ).setId("name"      ).setValue(na)                                    );
    grid.setWidget(y++,x,app.createTextBox().setName("phone"     ).setId("phone"     ).setValue(ph).setMaxLength( 10)                  );
    grid.setWidget(y++,x,app.createTextBox().setName("routingNo" ).setId("routingNo" ).setValue(rn).setMaxLength(  9)                  );
    grid.setWidget(y++,x,app.createTextBox().setName("bankAcctNo").setId("bankAcctNo").setValue(an)                                    );
    return /*app*/form;} // Display // IMPORTANT: Return "form" (not "app") when using tabs
function recruiterRefer(){ // Form for recruiters to submit their referrals // -------------------------------------------------------------------------------------------------------------------------------------------------
    //var LOAD  = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    var app   = UiApp./*create*/getActiveApplication(),user=Session.getUser().getEmail(),db=ScriptDb.getMyDb(),grid1=app.createGrid(10,4),y=0,x=0;//,na="",ph="",ad="",re="",bn="",rn="",an="",r=db.query({table:"recruiters",email:user}).next();if(r){na=r.name;ph=r.phone;ad=r.address;bn=r.bankName;rn=r.routingNo;an=r.bankAcctNo;} // Set values of string variables to match existing record
    var form1 = app.createFormPanel();
    var vpan1 = app.createVerticalPanel().add(grid1);/*app*/form1.add(vpan1); // To convert to using tab panels, on all refered funcs: 1. UiApp./*create* /getActiveApplication(); 2. var form=app.createFormPanel(); 3. form.add(vpan);app.add(form); 4. return /*app* /form; Note: Replace form w/ tab if rendering a table.
    var msg1  = app.createLabel("Ready"     ).setId("msg1" ).setVisible(false).setStyleAttribute("color","red"); // Debug
    var word1 = app.createLabel("Sending...").setId("word1").setVisible(false).setStyleAttribute("color","#FF0000");var SRC="https://lh4.googleusercontent.com/-sc678cHQVB0/UIER_ilAZ2I/AAAAAAAADho/C16a_vyaG5s/s800/ajax-loader-red.gif";
    var pic1  = app.createImage(SRC         ).setId("pic1" ).setVisible(false);
    var h1    = app.createServerHandler("handleRecruiter_refer").addCallbackElement(vpan1);
    var b1    = app.createButton("Send",app.createClientHandler().forEventSource().setText("Wait...").forTargets([pic1,word1]).setVisible(true)).addClickHandler(h1).setId("b1");
    /* -------------------------------------------------------- */ // First column /* -------------------------------------------------------- */
    grid1.setWidget(y++,x,pic1                                                                                         ); // Load   graphic
    grid1.setWidget(y++,x,word1                                                                                        ); // Saving notice
    grid1.setWidget(y++,x,msg1                                                                                         ); // Debug  message
    /* ---------------------------------------------------- */ y=0;x++; // Next column /* ---------------------------------------------------- */
    grid1.setWidget(y++,x,b1                                                                                           ); // Submit button
    grid1.setWidget(y++,x,app.createLabel  ("Name" )                                                                   );
    grid1.setWidget(y++,x,app.createLabel  ("Phone")                                                                   );
    grid1.setWidget(y++,x,app.createLabel  ("Email")                                                                   );
    /* ---------------------------------------------------- */ y=0;x++; // Next column /* ---------------------------------------------------- */
    grid1.setWidget(y++,x,app.createTextBox(       ).setName("owner1").setId("owner1").setValue(user).setEnabled(false));
    grid1.setWidget(y++,x,app.createTextBox(       ).setName("name1" ).setId("name1" )                                 );
    grid1.setWidget(y++,x,app.createTextBox(       ).setName("phone1").setId("phone1").setMaxLength(10)                );
    grid1.setWidget(y++,x,app.createTextBox(       ).setName("email1").setId("email1")                                 );
    return /*app*/form1;} // Display // IMPORTANT: Return "form" (not "app") when using tabs
//function recruiterTrack(){} // Report with one record per referral showing status, activity, production and payment/settlement
// ------------------------------------------------- RECRUIT THE RECRUITERS (TABS PAGE) ---------------------------------------------------------
function recruitTheRecruiters(){var app=UiApp.createApplication(),ob={Send:rtrSend(),Track:rtrTrack()/*,Receive:rtrReceive()*/},keys=Object.keys(ob).reverse(),tabPanel=app.createDecoratedTabPanel(),i=keys.length;while(i--){tabPanel.add(app.createScrollPanel().setWidth("500").setHeight("250").add(ob[keys[i]]),keys[i]).setAnimationEnabled(true)}app.close();return app.add(tabPanel.selectTab(0))} // To convert to using tab panels, on all refered funcs: 1. UiApp./*create* /getActiveApplication(); 2. var form=app.createFormPanel(); 3. form.add(vpan);app.add(form); 4. return /*app* /form; Note: Replace form w/ tab if rendering a table. // Reference: https://sites.google.com/site/appsscripttutorial/user-interface/tab-panel // Note: On 12/11/2013 decided to use tab panels instead of radio buttons to display day,week,month,etc.; because radio buttons are too difficult to implement due to asynchronious server handler calls; ob={"Production":mojo_production(),...} ...see Deprecated Code
// ------------------------------------------------------ RECRUIT THE RECRUITERS ----------------------------------------------------------------
function email_RTR(m){eval(loadLibrary("gasSalesPro"));var app=UiApp.getActiveApplication(),db=ScriptDb.getMyDb(),u=db.query({table:"apply",email:m[1].owner}).next(),aTag="<a href='https://sites.google.com/site/gosalespro/team/recruiter?z="+m[0].rc4Encrypt("NJmev7gH3j").hexEncode()+"'>",head="SalesPro™ Wants Your Leftovers",body=aTag+"Click</a> for up to $7,500 per online referral.<br/><br/>"+aTag+"<img src='cid:flyer'></a>",flyerBlob=UrlFetchApp.fetch("https://lh6.googleusercontent.com/-KRr2F7zPhQE/UTvJSmf0TrI/AAAAAAAAGFw/tIGeD09wQwc/s1600/RecruitingFlyer.png").getBlob().setName("flyerBlob");MailApp./*GmailApp.*/sendEmail(m[1].email,head,"",{name:u.name,noReply:true,htmlBody:body,inlineImages:{flyer:flyerBlob}/*,from:"atlaslive@gmail.com"GMailApp.getAliases()*/});/*app.close();*/return app;} // Send email // Link only, no image: GmailApp.sendEmail(m.email,head,"",{name:u.name,noReply:true,htmlBody:body}); // Link only, no image: body="<a href=\"https://sites.google.com/site/mojocreditproject/account\">Click here</a>for free trial and money-back guarantee.";
function handleRTR(e){var app=UiApp.getActiveApplication()/*.remove(0)*/,user=Session.getUser().getEmail(),db=ScriptDb.getMyDb(),d=new Date(),dstr=(d.getUTCMonth()+1)+"/"+d.getUTCDate()+"/"+d.getUTCFullYear(),arr=["name","phone","email"],r,i,ob=e.parameter;ob.addedTime=d.getTime();ob.table="recruiter";ob.owner=user;ob.emailedOn=d.getTime();ob.history="Emailed on "+dstr+";";if(db.query({table:"recruiter",email:ob.email}).getSize()){db.remove(db.query({table:"recruiter",email:ob.email}).next());}r=db.save(ob);switch(r.class){case "Recuiter":email_RTR([r.getId(),r]);break;case "Caller":email_caller([r.getId(),r]);break;default:break;}app.add(app.createLabel("Success! emailed to ‘"+r.email+"’")).add(app.createLabel("Refresh [f5]"));app.getElementById("b0").setText("Send");app.getElementById("pic").setVisible(false);app.getElementById("word").setVisible(false);app.getElementById("Caller").setValue(false);app.getElementById("Recruiter").setValue(true);app.getElementById("class").setText("Recuiter");i=arr.length;while(i--){app.getElementById(arr[i]).setValue("");}/*app.close();*/return app;} // Reset buttons and graphics // Clean up, close & return — note: return is REQUIRED for widget to actually close //app.getElementById("pic").setVisible(false);app.getElementById("word").setVisible(false);while(i--){app.getElementById(arr[i]).setText("")}app.close();return app;
// ------------------------------------------------------ RECRUIT THE RECRUITERS ----------------------------------------------------------------
function rtrTrack(){var app=UiApp.getActiveApplication(),grid=app.createGrid(1,1);app.add(grid.setWidget(0,0,app.createHTML("See ‘Tracking’ tab to right <span style='font-size:16px;color:red;'>?</span>")));return grid;}
function rtrSend(){ // Enter prospect data and automatically send email flyer/pitch/invitation
    //var LOAD = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    var app  = UiApp./*create*/getActiveApplication(),user=Session.getUser().getEmail(),db=ScriptDb.getMyDb(),grid=app.createGrid(10,4),y=0,x=0,arr=["grp","Caller","Recruiter"],tit=["What type of recruit is this?","This is a CALLER — a ‘direct recruit’","This is a RECRUITER — they will recruit callers for us"];//,na="",ph="",ad="",re="",bn="",rn="",an="",r=db.query({table:"recruiters",email:user}).next();if(r){na=r.name;ph=r.phone;ad=r.address;bn=r.bankName;rn=r.routingNo;an=r.bankAcctNo;} // Set values of string variables to match existing record
    var form = app/*.createVerticalPanel()/*/.createFormPanel();app.add(form); // To convert to using tab panels, on all refered funcs: 1. UiApp./*create* /getActiveApplication(); 2. var form=app.createFormPanel(); 3. form.add(vpan);app.add(form); 4. return /*app* /form; Note: Replace form w/ tab if rendering a table.
    var vpan = app.createVerticalPanel().add(grid);/*app*/form.add(vpan); // vpan.add(app.createSubmitButton("Submit")).add(app.createResetButton("Reset"));    
    var msg  = app.createLabel("Ready"     ).setId("msg" ).setVisible(false).setStyleAttribute("color","red"); // Debug
    var word = app.createLabel("Sending...").setId("word").setVisible(false).setStyleAttribute("color","#FF0000");var SRC="https://lh4.googleusercontent.com/-sc678cHQVB0/UIER_ilAZ2I/AAAAAAAADho/C16a_vyaG5s/s800/ajax-loader-red.gif";
    var pic  = app.createImage(SRC         ).setId("pic" ).setVisible(false);
    var h0   = app.createServerHandler("handleRTR").addCallbackElement(/*vpan*/form);
    var b0   = app.createButton("Send",app.createClientHandler().forEventSource().setText("Wait...").forTargets([pic,word]).setVisible(true)).addClickHandler(h0).setId("b0");
    var hr=[2],radioValue=app.createTextBox().setName("class").setId("class").setVisible(false).setText(arr[hr[0]]),i=arr.length;while(i---1){hr[i]=app.createClientHandler().forTargets(radioValue).setText/*.setValue==error*/(arr[i]);} // Reference: http://stackoverflow.com/questions/10903963/strange-behaviour-when-using-radiobutton
    /* -------------------------------------------------------- */ // First column /* -------------------------------------------------------- */
    grid.setWidget(y++,x,pic                                                                                            ); // Load   graphic
    grid.setWidget(y++,x,word                                                                                           ); // Saving notice
    grid.setWidget(y++,x,msg                                                                                            ); // Debug  message
    /* ---------------------------------------------------- */ y=0;x++; // Next column /* ---------------------------------------------------- */
    grid.setWidget(y++,x,b0                                                                                             ); // Submit button
    grid.setWidget(y++,x,app.createLabel   ("Name" )                                                                    );
    grid.setWidget(y++,x,app.createLabel   ("Phone")                                                                    );
    grid.setWidget(y++,x,app.createLabel   ("Email")                                                                    );
    grid.setWidget(y++,x,app.createLabel   ("Class").setTitle(tit[0])                                                   );
    grid.setWidget(y++,x,radioValue                                                                                     ); // Holds value of radio buttons; invisible; could do: vpan.add();
    /* ---------------------------------------------------- */ y=0;x++; // Next column /* ---------------------------------------------------- */
    grid.setWidget(y++,x,app.createTextBox (        ).setName("owner" ).setId("owner" ).setValue(user).setEnabled(false));
    grid.setWidget(y++,x,app.createTextBox (        ).setName("name"  ).setId("name"  )                                 );
    grid.setWidget(y++,x,app.createTextBox (        ).setName("phone" ).setId("phone" ).setMaxLength(10)                );
    grid.setWidget(y++,x,app.createTextBox (        ).setName("email" ).setId("email" )                                 );
    grid.setWidget(y++,x,app.createRadioButton(arr[0],arr[1]).setId(arr[1]).setTitle(tit[1]).setValue(false).addValueChangeHandler(hr[1]));
    grid.setWidget(y++,x,app.createRadioButton(arr[0],arr[2]).setId(arr[2]).setTitle(tit[2]).setValue(true ).addValueChangeHandler(hr[2]));
    app.close();return /*app*/form;} // Display // IMPORTANT: Return "form" (not "app") when using tabs
function rtrReceive(){} // Generates one record for each referral made by a recruiter; Summarizes referral activity (called, hired, refused/out, calls*, emails*, production) *=optional
// --------------------------------------------------------------- MOJO_LEADS ----------------------------------------------------------------
function mojo_tabSet(tab,rId){var r=ScriptDb.getMyDb().load(rId);tab.setTag(rId).setText(0,0,r.name).setText(0,1,r.phone).setText(1,0,r.city).setText(1,1,r.state);return tab} // tab is flextable, r is next record // Example call: tab=tabSet(tab,upNext(r));
function mojo_resetGrid(sId){var arrText=["namePerson","email","days","notes"],arrList=["position","temperature","disposition"],app=UiApp.getActiveApplication(),db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),s=db.load(sId),d=new Date(),dstr=(d.getUTCMonth()+1)+"/"+d.getUTCDate()+"/"+d.getUTCFullYear(),i=arrText.length;
               if(!s.history){s.history="On "+dstr+", "+s.name+" received by "+user+";"}if(!s.owner){s.owner=user;db.save(s);} // Set new owner/history
               app.getElementById("histo"   ).setText (s.history )                 ;                                           // Load  history field
    while(i--){app.getElementById(arrText[i]).setValue(""        )}i=arrList.length;                                           // Reset text boxes to empty
    while(i--){app.getElementById(arrList[i]).setSelectedIndex(-1)}                ;return;}                                   // Reset list boxes to empty
function mojo_upNextId(obId){//obId="S7239891396"; // Given record ID, returns ID of next record in queue // If none, fetch new batch
    //var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    var app=UiApp.getActiveApplication(),db=ScriptDb.getMyDb(),user=Session.getUser().getEmail()/*"benharvill@gmail.com"*/,u=db.query({table:"apply",email:user}).next(),d=new Date(),dtime=d.getTime(),r,q={table:"leads",client:"mojo",/*addedUser:user,*/owner:user,disposition:db.anyOf(["active","-Reason to not call back-"]),callback:db.lessThan(dtime)/*,temperature:db.lessThan(6)*/};
 //      if(db.query(q).getSize()){                     r=db.query(q).sortBy("temperature",db.ASCENDING,db.NUMERIC).next();return r.getId();} // Prioritizes hottest leads first, via "temperature" property // Programming note: Make sure to use "else if" not "if" in these types of situations where order of execution is important. Otherwise, javascript will process commands in a quasi-random sequence and, thereby, thoroughly messing up the result.
 // else if(db.query(q).getSize()){delete q.temperature;r=db.query(q).sortBy("callback"   ,db.ASCENDING,db.NUMERIC).next();return r.getId();} // If no temperature rated leads exist, pull a non-temperature-rated lead
 // else if(db.query(q).getSize()){                    ;r=db.query(q).sortBy("addedTime"  ,db.ASCENDING,db.NUMERIC).next();return r.getId();} // Next, get leads "in queue" vis-a-vis addedUser property
    try{r=db.query(q).sortBy("temperature",db.ASCENDING,db.NUMERIC).next();return r.getId();}catch(error){
    var statesList=statesInReg(u.regionNumber),result=db.query({table:"leads",client:"mojo",state:db.anyOf(statesList)}),x="",nex,i; // Moved some of the following criteria into query statement // See below note @mojo_handleSubmitLeads() re: bug tracking //while(result.hasNext()){r=result.next();//Loop:All//...existing records//if(r.state.getState(5)!=u.regionNumber){r=false;continue;}//Skip:Region//...is different from caller (Update: this condition is now added to query)//if(dtime<r.callback){r=false;continue;}//Skip:Call//...callback time has not yet arrived//if(r.getId()==obId){r=false;continue;}//Skip:Next//...if lead was passed to this function//i.e. start with next lead in queue//if(r.owner&&r.owner!=user){r=false;continue;}//Skip:Other//...lead belongs to another caller//if(r.disposition&&r.disposition!="-Select one- *MUST UPDATE*CAUSED ERROR*"){r=false;continue;}//Skip:Disp//...lead has been "dispositioned"//if(r){return r.getId();}}//If r persists, return its ID//Else, re/set URL then fetch new batch below//return main_dex("mojo",x.dexNext(u.regionNumber)).getId();}}// Returns next record, if one; Else fetches new batch, saves it and returns
        try{x=db.load(obId).url}catch(err){x=""}i=30;while(i--){nex=x.dexNext(u.regionNumber);try{return main_dex("mojo",nex)[0];}catch(err){x=nex;}}}} // Returns next record, if one; Else fetches new batch, saves it and returns
function mojo_handleSubmitEmail(e){var app=UiApp.getActiveApplication(),db=ScriptDb.getMyDb(),p=e.parameter,user=Session.getUser().getEmail(),u=db.query({table:"apply",email:user}).next(),tab=app.getElementById("tab"),r=db.load(p.tab_tag),d=new Date(),dstr=(d.getUTCMonth()+1)+"/"+d.getUTCDate()+"/"+d.getUTCFullYear(),
    head="Mojo™ = 15-35% more sales",body="<a href=\"https://sites.google.com/site/mojocreditproject/account\">Click here</a> for free trial and money-back guarantee.<br/><br/><a href=\"https://sites.google.com/site/mojocreditproject/account\"><img src='cid:mojoLogo'></a>",// Link only, no image: body="<a href=\"https://sites.google.com/site/mojocreditproject/account\">Click here</a>for free trial and money-back guarantee.";
    mojoLogoBlob=UrlFetchApp.fetch("https://lh5.googleusercontent.com/-Y3OGhOQteFk/UQSH9E74ugI/AAAAAAAAFlA/gK7bLDZwcXY/s800/mojo.png").getBlob().setName("mojoLogoBlob");MailApp./*GmailApp.*/sendEmail(p.email,head,"",{name:u.name,noReply:true,htmlBody:body,inlineImages:{mojoLogo:mojoLogoBlob}/*,from:"atlaslive@gmail.com"GMailApp.getAliases()*/}); // Send email // Link only, no image: GmailApp.sendEmail(p.email,head,"",{name:u.name,noReply:true,htmlBody:body});
    r.history="On "+dstr+", "+user+" emailed "+p.position+" "+p.name+" at "+p.email+"; "+p.history;app.getElementById("histo").setValue(r.history);r.latestEmail=d.getTime();db.save(r);app.close();return app;}
function mojo_handleSubmitLeads(e){var app=UiApp.getActiveApplication(),db=ScriptDb.getMyDb(),p=e.parameter,user=Session.getUser().getEmail(),u=db.query({table:"apply",email:user}).next(),tab=app.getElementById("tab"),r=db.load(p.tab_tag),d=new Date(),dstr=(d.getUTCMonth()+1)+"/"+d.getUTCDate()+"/"+d.getUTCFullYear();
    r.history+="On "+dstr+" "+user+", spoke to "+p.position+" "+p.name+" ("+(p.email||"")+") "+p.notes+"; ";if(p.days){r.callback=(d.getTime()+(p.days*1000*60*60*24));r.history+="To call back in "+p.days+" days;";}if(p.temperature){r.temperature=p.temperature[0];r.history+="T"+p.temperature+";";}if(p.disposition){r.disposition=p.disposition;r.history+="Disposition: \""+p.disposition+"\";";} // Update history
    r.latestSubmit=d.getTime();/*r.FTrowid=FTcreateRecord(r);*/db.save(r);app.getElementById("b0").setText("Submit");app.getElementById("b1").setText("Send");app.getElementById("pic").setVisible(false);var rNextId=mojo_upNextId(r.getId());mojo_tabSet(tab,rNextId);mojo_resetGrid(rNextId);app.close();return app;} // Clean up, close & return — note: RETURN is REQUIRED
function mojo_leads(e){ // -------------------------------------------- MOJO_LEADS ---------------------------------------------------------------- // References: https://developers.google.com/apps-script/uiapp, https://developers.google.com/apps-script/uiapp#ServerHandlers
 // var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    if(e.parameter.z/*via anchor tag*/){var rId=e.parameter.z.hexDecode().rc4Decrypt("IDQfyT21I1")}else{rId=mojo_upNextId()}var app=UiApp.createApplication(),user=Session.getUser().getEmail(),db=ScriptDb.getMyDb(),u=db.query({table:"apply",email:user}).next(),r=db.load(rId),d=new Date(),dstr=(d.getUTCMonth()+1)+"/"+d.getUTCDate()+"/"+d.getUTCFullYear(),y=0,x=0,vpan=app.createVerticalPanel(),tab=app.createFlexTable().setId("tab").setWidth("95%").setBorderWidth(3).setCellPadding(3).setCellSpacing(3);
    mojo_tabSet(tab,r.getId());app.add(vpan);vpan.add(tab);var grid=app.createGrid(11,4);vpan.add(grid); // Lead info table
    var pic = app.createImage        ("https://lh4.googleusercontent.com/-sc678cHQVB0/UIER_ilAZ2I/AAAAAAAADho/C16a_vyaG5s/s800/ajax-loader-red.gif" ).setVisible(false  ).setId("pic");
    var h0  = app.createServerHandler("mojo_handleSubmitLeads").addCallbackElement(vpan); // Submit handler
    var h1  = app.createServerHandler("mojo_handleSubmitEmail").addCallbackElement(vpan); // Email  handler
    var b0  = app.createButton       ("Submit",app.createClientHandler().forEventSource().setText("Wait...").forTargets([pic]).setVisible(true)     ).addClickHandler(h0).setId("b0" ); // Submit button
    var b1  = app.createButton       ("Send"  ,app.createClientHandler().forEventSource().setText("Sent!"  )                                        ).addClickHandler(h1).setId("b1" ); // Email  button
    grid.setWidget(y++,x,app.createLabel("Position"   )                                                     );
    grid.setWidget(y++,x,app.createLabel("Name"       )                                                     );
    grid.setWidget(y++,x,app.createLabel("Email"      )                                                     );
                   y++; // Email button
    grid.setWidget(y++,x,app.createLabel("Callback"   ).setTitle("Days until you call back"                ));
    grid.setWidget(y++,x,app.createLabel("Notes"      )                                                     );
    grid.setWidget(y++,x,app.createLabel("Temperature").setTitle("Sales funnel management"                 ));
    grid.setWidget(y++,x,app.createLabel("Disposition").setTitle("Result/outcome — Reason not to call back"));
    grid.setWidget(y++,x,pic                                                      ); // Load graphic
    /* ---------------------------------------------------- */ y=0;x++; // Next column /* ---------------------------------------------------- */
    grid.setWidget(y++,x,app.createListBox ().addItem("-Select one-"           ).setId("position").setName("position").setTitle("Per gatekeeper")
                                             .addItem("Finance Director"       )
                                             .addItem("Finance Manager"        )
                                             .addItem("Special Finance Manager")
                                             .addItem("Sales Manager"          )
                                             .addItem("General Sales Manager"  )
                                             .addItem("General Manager"        )
                                             .addItem("Owner/Broker/Dealer/CEO")
                                             .addItem("Other"                  ));
    grid.setWidget(y++,x,app.createTextBox ().setId("namePerson" ).setName("namePerson" )                                     .setTitle("First + last"                 ));
    grid.setWidget(y++,x,app.createTextBox ().setId("email"      ).setName("email"      )                                                                               );
    grid.setWidget(y++,x,b1                                                                                                                                             );
    grid.setWidget(y++,x,app.createTextBox ().setId("days"       ).setName("days"       ).setWidth("30"                      ).setTitle("Days until you call back"     ));
    grid.setWidget(y++,x,app.createTextArea().setId("notes"      ).setName("notes"      )                                     .setTitle("Reminders + additional details such as additional contact numbers, tasks, promises or \"deals\""));
    grid.setWidget(y++,x,app.createListBox ().setId("temperature").setName("temperature").addItem("-Select one- (optional)"  ).setTitle("Subjective evaluation")
                                                                                         .addItem("1-Hot (ready to act)"     )
                                                                                         .addItem("2-Luke hot"               )
                                                                                         .addItem("3-Warm (questioning)"     )
                                                                                         .addItem("4-Luke warm"              )
                                                                                         .addItem("5-Cool (skeptical)"       )
                                                                                         .addItem("Unknown"                  ));
    grid.setWidget(y++,x,app.createListBox ().setId("disposition").setName("disposition").addItem("-Reason to not call back-").setTitle("Select one")
                                                                                         .addItem("Price"                    )
                                                                                         .addItem("Product"                  )
                                                                                         .addItem("Unknown"                  )
                                                                                         .addItem("Gatekeeper"               )
                                                                                         .addItem("Other"                    )
                                                                                         .addItem("Duplicate"                )
                                                                                         .addItem("Bad number"               )
                                                                                         .addItem("Wrong category"           )
                                                                                         .addItem("Sold"                     ));
    grid.setWidget(y++,x,b0);if(!r.history){r.history="On "+dstr+", "+r.name+" received by "+user+";"}if(!r.owner){r.owner=user;db.save(r);}
    grid.setWidget(y++,x,app.createScrollPanel().setPixelSize(250,265).add(app.createLabel().setId("histo").setText(r.history))); // Note: Used "histo" for ID to not conflict with r.history data field
    /* ---------------------------------------------------- */ y=0;x++; // Next column /* ---------------------------------------------------- */
    y++;y++;y++;y++;return app;} // Return + display
// ---------------------------------------------------------------- MOJO_REPORTS (TABS PAGE) ----------------------------------------------------------------
function mojo_reports(){var app=UiApp.createApplication(),ob={Day:mojo_production(1),Week:mojo_production(7),Month:mojo_production(30),Quarter:mojo_production(90),Year:mojo_production(365),Call:mojo_inventory("call"),Trial:mojo_inventory("trial"),Sold:mojo_inventory("sold")},keys=Object.keys(ob).reverse(),tabPanel=app.createDecoratedTabPanel(),i=keys.length;while(i--){tabPanel.add(app.createScrollPanel().setWidth("1000").setHeight("500").add(ob[keys[i]]),keys[i]).setAnimationEnabled(true)}return app.add(tabPanel.selectTab(0))} // To make tab panel work: 1. UiApp.createApplication(); 2. form=app.createFormPanel; 3. app.add(form); 4. return form; // Reference: https://sites.google.com/site/appsscripttutorial/user-interface/tab-panel // Note: On 12/11/2013 decided to use tab panels instead of radio buttons to display day,week,month,etc.; because radio buttons are too difficult to implement due to asynchronious server handler calls; ob={"Production":mojo_production(),...} ...see Deprecated Code
// ---------------------------------------------------------------- MOJO_INVENTORY ----------------------------------------------------------------
//function mojoInventory_handleSubmit(e){app.close();return app;}
function mojo_inventory(class){ // -------------------------------- MOJO_INVENTORY ----------------------------------------------------------------
    //var LOAD     = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    var db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),/*u=db.query({table:"apply",email:user}).next(),*/d=new Date().getTime(),result,avail,len,j,i,x,r,t=[],view=[],STEM="https://sites.google.com/site/gosalespro/products/mojo?z=";//avail=result.getSize();
    var app      = UiApp.getActiveApplication();/*UiApp.createApplication();*/ // To convert to using tab panels, on all refered funcs: 1. UiApp./*create* /getActiveApplication(); 2. var form=app.createFormPanel(); 3. form.add(vpan);app.add(form); 4. return /*app* /form; Note: Replace form w/ tab if rendering a table.
    var form     = app.createFormPanel       ();
    var scr      = app.createScrollPanel     ().setSize("100%","5000");
    var vpan     = app.createVerticalPanel   ();
    var tab      = app.createFlexTable       ().setBorderWidth(1);vpan.add(tab);scr.add(vpan);form.add(scr);app.add(form); // Deleting these .add methods appears important for some reports? This case appears an exception
    var handler  = app.createServerHandler   ("mojoInventory_handleSubmit").addCallbackElement(vpan);
    var HEAD     = ["Link","Days","Phone","Name","Company","City","State"];
    var STYLPATT = ["white","white","white","white","#E2E2E2","white","white","white"];var patlen=STYLPATT.length; // Color pattern // www.w3schools.com/tags/ref_colorpicker.asp // #FF8C00 (darkorange), #FFE8CC (lighter shade)
    function writeHead(row,arr){var ii=arr.length;while(ii--){tab.setText          (row,ii,arr[ii]                    ) // Write header row
                                                                 .setStyleAttribute(row,ii,"backgroundColor","red"    )
                                                                 .setStyleAttribute(row,ii,"color"          ,"white"  )
                                                                 .setStyleAttribute(row,ii,"fontWeight"     ,"bold"   );}}
    switch(class){
        case "call" :result=db.query({table:"leads",owner:user}).sortBy("callback",db.ASCENDING,db.NUMERIC); break;
        case "trial":result=db.query({table:"leads",owner:user}).sortBy("callback",db.ASCENDING,db.NUMERIC); break;
        case "sold" :result=db.query({table:"leads",owner:user}).sortBy("callback",db.ASCENDING,db.NUMERIC); break;default:;}
    j=0;while(result.hasNext()){if(j%patlen==0){writeHead(j,HEAD)}else{r=result.next(); // Start row counter // Load records // Write header row if proper spacing
        view=[(Math.floor((r.callback-d)/(1000*60*60*24))),r.phone,r.namePerson,r.name,r.city,r.state];var act=STEM+(r.getId().rc4Encrypt("IDQfyT21I1").hexEncode());
        tab.setWidget(j,  0,app.createAnchor("Click",act)).setStyleAttribute(j,  0,"backgroundColor",STYLPATT[j%patlen]);i=view.length;while(i--){/*x=view[i];*/
        tab.setWidget(j,i+1,app.createLabel (view[i]    )).setStyleAttribute(j,i+1,"backgroundColor",STYLPATT[j%patlen]);}}j++;}app.close();return form/*app*/;}
// ---------------------------------------------------------------- MOJO_PRODUCTION ----------------------------------------------------------------
function mojoProduction_handleSubmit(e){app.close();return app;}
function mojo_production(n){ // ----------------------------------- MOJO_PRODUCTION ----------------------------------------------------------------
    //var LOAD     = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    var db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),u=db.query({table:"apply",email:user}).next(),result=db.query({table:"apply"}),d=new Date().getTime(),act,avail,bg,j,i,x,r,view=[],t=[],a=[],STEM="https://sites.google.com/site/gosalespro/products/mojo?z=";i=3;while(i--){a[i]=d-n*1000*60*60*24*i}//result=db.query({table:"leads",owner:user,latestSubmit:db.greaterThanOrEqualTo(d.getTime()-1000*60*60*24*1)}).sortBy("callback",db.ASCENDING,db.NUMERIC),STEM="https://sites.google.com/site/gosalespro/products/mojo?z=";//avail=result.getSize();
    var app      = UiApp.getActiveApplication();/*UiApp.createApplication();*/ // To convert to using tab panels, on all refered funcs: 1. UiApp./*create* /getActiveApplication(); 2. var form=app.createFormPanel(); 3. form.add(vpan);app.add(form); 4. return /*app* /form; Note: Replace form w/ tab if rendering a table.
    var form     = app.createFormPanel       ();
    var scr      = app.createScrollPanel     ().setSize("100%","5000");
    var vpan     = app.createVerticalPanel   ();
    var tab      = app.createFlexTable       ().setBorderWidth(1);//vpan.add(tab);scr.add(vpan);form.add(scr);app.add(form); // Deleting these .add methods appears important for some reports?
    var handler  = app.createServerHandler   ("mojoProduction_handleSubmit").addCallbackElement(vpan);
    var HEAD     = ["Link","R","User Alias","Out","las","bes","%","Email","las","bes","%","Add","las","bes","%","Back","las","bes",/*"%","Ex","las","bes",*/"%","Trial","las","bes","%","Sold","las","bes","%","$","las","bes"];
    var STYLPATT = ["white","white","white","white","#E2E2E2","white","white","white"];var patlen=STYLPATT.length; // Color pattern // www.w3schools.com/tags/ref_colorpicker.asp // #FF8C00 (darkorange), #FFE8CC (lighter shade)
    function writeHead(row,arr){var ii=arr.length;while(ii--){tab.setText          (row,ii,arr[ii]                    ) // Write header row
                                                                 .setStyleAttribute(row,ii,"backgroundColor","red"    )
                                                                 .setStyleAttribute(row,ii,"color"          ,"white"  )
                                                                 .setStyleAttribute(row,ii,"fontWeight"     ,"bold"   );}}
    j=0;while(result.hasNext()){r=result.next();i=0;view[j]=[]; // Start row counter // Load records // Write header row if proper spacing // view=[n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n];
        view[j][i]=r.regionNumber       ;t[i++]="Region number"      ; // vvv This column vvv is shifted up one or two rows for formatting/alignment purposes
//Logger.log("A");
view[j][i]=r.alias              ;t[i++]="Code name"          ;var x0 =db.count({table:"leads"/*,owner:r.email*/,latestSubmit:db.between(a[1],a[0])                                 }); // Can update by periodically by running setAlias(), say, monthly
//Logger.log("B");
        view[j][i]=x0                   ;t[i++]="Outbound calls made";var x0L=db.count({table:"leads",owner:r.email,latestSubmit:db.between(a[2],a[1])                                 }); // Calls // var n_ob={"day":1,"week":7,"month":30,"quarter":90,"year":365}
        view[j][i]=x0L                  ;t[i++]="Last period"        ;
        view[j][i]="TBD"                ;t[i++]="Best period"        ;var x1 =db.count({table:"leads",owner:r.email,latestEmail :db.between(a[1],a[0])                                 });
        view[j][i]=Math.round(100*x1/x0);t[i++]="% of outbound"      ;var x1L=db.count({table:"leads",owner:r.email,latestEmail :db.between(a[2],a[1])                                 });
        view[j][i]=x1                   ;t[i++]="Emails sent"        ; // Emails
        view[j][i]=x1L                  ;t[i++]="Last period"        ;
        view[j][i]="TBD"                ;t[i++]="Best period"        ;var x2 =db.count({table:"leads",owner:r.email,latestSubmit:db.between(a[1],a[0]),callback :db.greaterThan(d     )});
        view[j][i]=Math.round(100*x2/x0);t[i++]="% of outbound"      ;var x2L=db.count({table:"leads",owner:r.email,latestSubmit:db.between(a[2],a[1]),callback :db.greaterThan(d     )});
        view[j][i]=x2                   ;t[i++]="Callbacks added?"   ; // Callbacks added // Stopped here. vvv Must continue formatting below. vvv
        view[j][i]=x2L                  ;t[i++]="Last period"        ; // *IMPROVEMENT NEEDED* Needs to be db.greaterThan(r.latestSubmit + 1 day)
        view[j][i]="TBD"                                                                                                      ;t[i++]="Best period"        ;
        view[j][i]="%"                                                                                                        ;t[i++]="% of outbound"      ;
        view[j][i]=db.count({table:"leads",owner:r.email,latestSubmit:db.between(a[1],a[0]),addedTime:db.lessThan   (a[1]/n)});t[i++]="Callbacks made"     ; // Callbacks made
        view[j][i]=db.count({table:"leads",owner:r.email,latestSubmit:db.between(a[2],a[1]),addedTime:db.lessThan   (a[1]/n)});t[i++]="Last period"        ;
        view[j][i]="TBD"                                                                                                      ;t[i++]="Best period"        ;
     /* view[j][i]="%"                                                                                                        ;t[i++]="% of outbound"      ; 
        view[j][i]=db.count({table:"leads",owner:r.email,latestSubmit:db.between(a[1],a[0]),disposition: db.anyValue(      )});t[i++]="Deals killed?"      ; // Dead deals
        view[j][i]=db.count({table:"leads",owner:r.email,latestSubmit:db.between(a[2],a[1]),disposition: db.anyValue(      )});t[i++]="Last period"        ; // *IMPROVEMENT NEEDED* Now includes "sold"; need to exclude "sold
        view[j][i]="TBD"                                                                                                      ;t[i++]="Best period"        ; */
        view[j][i]="%"                                                                                                        ;t[i++]="% of outbound"      ;
        view[j][i]=db.count({table:"leads",owner:r.email,latestSubmit:db.between(a[1],a[0]),disposition:"sold"              });t[i++]="Free trials began"  ; // Free trials
        view[j][i]=db.count({table:"leads",owner:r.email,latestSubmit:db.between(a[2],a[1]),disposition:"sold"              });t[i++]="Last period"        ;
        view[j][i]="TBD"                                                                                                      ;t[i++]="Best period"        ;
        view[j][i]="%"                                                                                                        ;t[i++]="% of outbound"      ;
        view[j][i]=db.count({table:"leads",owner:r.email,latestSubmit:db.between(a[1],a[0]),disposition:"sold"              });t[i++]="Sold/paid?"         ; // Paid
        view[j][i]=db.count({table:"leads",owner:r.email,latestSubmit:db.between(a[2],a[1]),disposition:"sold"              });t[i++]="Last period"        ; // *IMPROVEMENT NEEDED* Needs to tie into accounting/ACH reporting receivables management
        view[j][i]="TBD"                                                                                                      ;t[i++]="Best period"        ;
        view[j][i]="%"                                                                                                        ;t[i++]="% of outbound"      ;
        view[j][i]=db.count({table:"leads",owner:r.email,latestSubmit:db.between(a[1],a[0]),disposition:"sold"              });t[i++]="Earnings?"          ; // Earned
        view[j][i]=db.count({table:"leads",owner:r.email,latestSubmit:db.between(a[2],a[1]),disposition:"sold"              });t[i++]="Last period"        ; // *IMPROVEMENT NEEDED* Needs to tie into accounting/ACH reporting payroll/payables management
        view[j][i]="TBD"                                                                                                      ;t[i++]="Best period"        ;
        view[j][i]=(r.email==user);j++;}view.sort2dArray(2).reverse();for(j=0;j<view.length;j++){i=view[j].length;if(view[j][--i]){bg="yellow"}else{bg=STYLPATT[j%patlen]} // Set background color for user’s row
            if(j%patlen==0){writeHead(j,HEAD);view.splice(j,0,"");i++;}else{act=STEM/*+(r.getId().rc4Encrypt("IDQfyT21I1").hexEncode())*/;
                tab.setWidget(j,  0,app.createAnchor("Click",act).setTitle("Lead")).setStyleAttribute(j,  0,"backgroundColor",bg);while(i--){/*x=view[i];*/
                tab.setWidget(j,i+1,app.createLabel (view[j][i] ).setTitle(t[i]  )).setStyleAttribute(j,i+1,"backgroundColor",bg);}}}app.close();return tab/*form*//*app*/;} // Call determines return type
// ---------------------------------------------------------------- REPORTS ----------------------------------------------------------------
function handleSubmitCoo(e){app.close();return app;}
function reports(){ // Reference: https://sites.google.com/site/appsscripttutorial/user-interface/tab-panel // Note: On 12/11/2013 decided to use tab panels instead of radio buttons to display day,week,month,etc.; because radio buttons are too difficult to implement due to asynchronious server handler calls; ob={"Production":mojo_production(),...} ...see Deprecated Code
    var app=UiApp.createApplication(),ob={Reports1:reports1(),Reports2:reports1()},keys=Object.keys(ob).reverse(),tabPanel=app.createDecoratedTabPanel(),i=keys.length;
    while(i--){tabPanel.add(app.createScrollPanel().setWidth("100%").setHeight("100%").add(ob[keys[i]]),keys[i]).setAnimationEnabled(true)}return app.add(tabPanel.selectTab(0))}
function reports1(){ // -------------------------------------------- REPORTS1 ---------------------------------------------------------------- // Reference // https://code.google.com/apis/ajax/playground/?type=visualization#group // https://developers.google.com/apps-script/articles/charts_dashboard // https://developers.google.com/chart/interactive/docs/reference#DataView
    var r,db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),u=db.query({table:"apply",email:user}).next(),d=new Date().getTime(),result=db.query({table:"leads",owner:user}).sortBy("addedDate",db.DESCENDING,db.NUMERIC);
    var data = Charts.newDataTable()
                     .addColumn(Charts.ColumnType.NUMBER,"Days"   )
                     .addColumn(Charts.ColumnType.STRING,"Phone"  )
                     .addColumn(Charts.ColumnType.STRING,"Name"   )
                     .addColumn(Charts.ColumnType.STRING,"Company")
                     .addColumn(Charts.ColumnType.STRING,"City"   )
                     .addColumn(Charts.ColumnType.STRING,"State"  );while(result.hasNext()){r=result.next();if(r.callback){cb=Math.floor((r.callback-d)/(1000*60*60*24))}else{cb=-100}data.addRow([cb,r.phone,r.namePerson,r.name,r.city,r.state])}data.build();               
    var dataGrp      = google.visualization.data.group(data,[5],[{'column':0,'aggregation':google.visualization.data.sum,'type':'number'}]); // Reference: https://code.google.com/apis/ajax/playground/?type=visualization#group // Group dt by column 0, and show column 3 aggregated by sum. var grouped_dt = google.visualization.data.group(dt,[0],[{'column':3,'aggregation':google.visualization.data.sum,'type':'number'}]);
    var filterAge    = Charts.newNumberRangeFilter().setFilterColumnLabel ("Days"                                          ).build();
    var filterGender = Charts.newCategoryFilter   ().setFilterColumnLabel ("State"                                         ).build();
    var chartPie     = Charts.newPieChart         ().setDataViewDefinition(Charts.newDataViewDefinition().setColumns([5,0])).build();
    var chartBar     = Charts.newBarChart         ().setDataViewDefinition(Charts.newDataViewDefinition().setColumns([5,0])).build();
    var chartTable   = Charts.newTableChart       ()                                                                        .build();
    var dashboard    = Charts.newDashboardPanel   ().setDataTable(data).bind([filterAge,filterGender],[chartPie,chartBar,chartTable]).build();
    var uiApp        = UiApp./*createApplication*/getActiveApplication();
    dashboard.add(uiApp.createHorizontalPanel().add(uiApp.createVerticalPanel  ().setSpacing(10).add(filterAge).add(filterGender).add(chartTable))
                                               .add(uiApp.createHorizontalPanel().setSpacing(10).add(chartPie ).add(chartBar    )));/*uiApp.add(dashboard);*/return dashboard/*uiApp*/;}
function reports2(){return} // ---------------------------------- REPORTS2 ------------------------------------------------------------- // Reference // https://developers.google.com/apps-script/articles/charts_dashboard // https://developers.google.com/chart/interactive/docs/reference#DataView
// ---------------------------------------------------------------- COO ----------------------------------------------------------------
function handleSubmitCoo(e){app.close();return app;}
function coo(){ // Reference: https://sites.google.com/site/appsscripttutorial/user-interface/tab-panel // Note: On 12/11/2013 decided to use tab panels instead of radio buttons to display day,week,month,etc.; because radio buttons are too difficult to implement due to asynchronious server handler calls; ob={"Production":mojo_production(),...} ...see Deprecated Code
    var app=UiApp.createApplication(),ob={Calls:coo_calls(),Users:coo_users()},keys=Object.keys(ob).reverse(),tabPanel=app.createDecoratedTabPanel(),i=keys.length;
    while(i--){tabPanel.add(app.createScrollPanel().setWidth("100%").setHeight("100%").add(ob[keys[i]]),keys[i]).setAnimationEnabled(true)}return app.add(tabPanel.selectTab(0))}
/*function coo_users(){ // ------------------------------- COO_USERS (DEPRECATED) ------------------------------------------------------
    var db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),u=db.query({table:"apply",email:user}).next(),d=new Date().getTime(),avail,j,i,x,r,view=[],
        result=db.query({table:"apply"/*,owner:user* /}).sortBy("addedDate",db.DESCENDING,db.NUMERIC);//avail=result.getSize();
    var app      = UiApp.getActiveApplication();/*UiApp.createApplication();* /
    var form     = app.createFormPanel    ();
    var scr      = app.createScrollPanel  ().setSize("100%","100%");
    var vpan     = app.createVerticalPanel();
    var tab      = app.createFlexTable    ().setBorderWidth(1);//vpan.add(tab);scr.add(vpan);form.add(scr);app.add(form); // Deleting these .add methods appears important for some reports?
    var handler  = app.createServerHandler("handleSubmitArchive").addCallbackElement(vpan);
    var HEAD     = [/*"Timestamp",* /"Name","Email","Region","#","Alias"];
    var STYLPATT = ["white","white","white","white","#E2E2E2","white","white","white"];var patlen=STYLPATT.length; // Color pattern // www.w3schools.com/tags/ref_colorpicker.asp // #FF8C00 (darkorange), #FFE8CC (lighter shade)
    function writeHead(row,arr){var ii=arr.length;while(ii--){tab.setText          (row,ii,arr[ii]                    ) // Write header row
                                                                 .setStyleAttribute(row,ii,"backgroundColor","red"    )
                                                                 .setStyleAttribute(row,ii,"color"          ,"white"  )
                                                                 .setStyleAttribute(row,ii,"fontWeight"     ,"bold"   );}}
    j=0;while(result.hasNext()){if(j%patlen==0){writeHead(j,HEAD)}else{r=result.next(); // Start row counter // Load records // Write header row if proper spacing
        view=[/*(Math.floor((d-r.addedTime)/(1000*60*60*24))+" days ago"),* /r.name,r.email,r.regionName,r.regionNumber,r.alias];
        i=view.length;while(i--){x=view[i];tab.setWidget(j,i,app.createLabel(x)).setStyleAttribute(j,i,"backgroundColor",STYLPATT[j%patlen]);}}j++;}app.close();return tab/*form*//*app* /;}*/
function coo_users(){ // -------------------------------------------- COO_USERS ---------------------------------------------------------------- // Reference // https://developers.google.com/apps-script/articles/charts_dashboard // https://developers.google.com/chart/interactive/docs/reference#DataView
    var r,db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),u=db.query({table:"apply",email:user}).next(),d=new Date().getTime(),result=db.query({table:"apply"}).sortBy("addedDate",db.DESCENDING,db.NUMERIC);
    var data = Charts.newDataTable()
                     .addColumn(Charts.ColumnType.STRING,"Name"  ) // .addColumn(Charts.ColumnType.STRING,"Email" )
                     .addColumn(Charts.ColumnType.STRING,"Alias" )
                     .addColumn(Charts.ColumnType.STRING,"Region")
                     .addColumn(Charts.ColumnType.NUMBER,"No"    );while(result.hasNext()){r=result.next();data.addRow([r.name,r.alias,/*r.email,*/r.regionName,r.regionNumber])}data.build();               
    var filterAge    = Charts.newNumberRangeFilter().setFilterColumnLabel ("No"                                            ).build();
    var filterGender = Charts.newCategoryFilter   ().setFilterColumnLabel ("Region"                                        ).build();
    var chartPie     = Charts.newPieChart         ().setDataViewDefinition(Charts.newDataViewDefinition().setColumns([0,3])).build();
    var chartBar     = Charts.newBarChart         ().setDataViewDefinition(Charts.newDataViewDefinition().setColumns([0,3])).build();
    var chartTable   = Charts.newTableChart       ()                                                                        .build();
    var dashboard    = Charts.newDashboardPanel   ().setDataTable(data).bind([filterAge,filterGender],[chartPie,chartBar,chartTable]).build();
    var uiApp        = UiApp./*createApplication*/getActiveApplication();
    dashboard.add(uiApp.createHorizontalPanel().add(uiApp.createVerticalPanel  ().setSpacing(10).add(filterAge).add(filterGender).add(chartTable))
                                               .add(uiApp.createHorizontalPanel().setSpacing(10).add(chartPie ).add(chartBar    )));/*uiApp.add(dashboard);*/return dashboard/*uiApp*/;}
function coo_calls(){ // -------------------------------------------- COO_CALLS ---------------------------------------------------------------- // Reference // https://developers.google.com/apps-script/articles/charts_dashboard // https://developers.google.com/chart/interactive/docs/reference#DataView
    var r,i,j,contr=[],chart=[],uiApp=UiApp.getActiveApplication(),db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),u=db.query({table:"apply",email:user}).next(),d=new Date().getTime(),opts={"page":"enable","pageSize":10,"pagingButtonsConfiguration":"auto","pagingSymbols":{prev:"prev",next:"next"}},result=db.query({table:"leads"}).sortBy("addedDate",db.DESCENDING,db.NUMERIC);
    var data   = Charts.newDataTable()
                       .addColumn(Charts.ColumnType.NUMBER,"ID"      )
                       .addColumn(Charts.ColumnType.STRING,"Owner"   )/*
                       .addColumn(Charts.ColumnType.STRING,"Region"  )
                       .addColumn(Charts.ColumnType.STRING,"Link"    )*/
                       .addColumn(Charts.ColumnType.NUMBER,"Pre"     )
                       .addColumn(Charts.ColumnType.NUMBER,"Nex"     )
                       .addColumn(Charts.ColumnType.STRING,"Status"  )
                       .addColumn(Charts.ColumnType.STRING,"Company" )
                       .addColumn(Charts.ColumnType.STRING,"Phone"   )
                       .addColumn(Charts.ColumnType.STRING,"City"    )
                       .addColumn(Charts.ColumnType.STRING,"St"      );i=1;while(result.hasNext()){r=result.next();data.addRow([i++,r.owner/*,r.regionName,"http://www.google.com"*/,(Math.floor((d-r.latestSubmit)/(1000*60*60*24))||0),(Math.floor((r.callback-d)/(1000*60*60*24))||0),r.disposition,r.name,r.phone,r.city,r.state])}data.build();i=0;j=0;
    chart[j++] = Charts.newScatterChart     ().setDataViewDefinition(Charts.newDataViewDefinition().setColumns([2,3])).setXAxisTitle("Nex").setXAxisTitle("Pre").build();
    chart[j++] = Charts.newColumnChart      ().setDataViewDefinition(Charts.newDataViewDefinition().setColumns([1,2]))                                          .build(); 
    chart[j++] = Charts.newPieChart         ().setDataViewDefinition(Charts.newDataViewDefinition().setColumns([1,2]))                                          .build();
    contr[i++] = Charts.newCategoryFilter   ().setFilterColumnLabel("Owner"  ).setLabel("").setCaption("Owner"  )                                               .build();
    contr[i++] = Charts.newCategoryFilter   ().setFilterColumnLabel("St"     ).setLabel("").setCaption("State"  )                                               .build();
    contr[i++] = Charts.newCategoryFilter   ().setFilterColumnLabel("City"   ).setLabel("").setCaption("City"   )                                               .build();
    contr[i++] = Charts.newNumberRangeFilter().setFilterColumnLabel("Pre"    )                                                                                  .build();
    contr[i++] = Charts.newCategoryFilter   ().setFilterColumnLabel("Status" ).setLabel("").setCaption("Status" )                                               .build();
    contr[i++] = Charts.newCategoryFilter   ().setFilterColumnLabel("Company").setLabel("").setCaption("Company")                                               .build();
    contr[i++] = Charts.newCategoryFilter   ().setFilterColumnLabel("Phone"  ).setLabel("").setCaption("Phone"  )                                               .build();
    contr[i++] = Charts.newNumberRangeFilter().setFilterColumnLabel("Nex"    )                                                                                  .build();
    chart[j++] = Charts.newTableChart       ().setDimensions(1000,1200/*w,h*/).enablePaging(15)                                                                 .build();
    var dash   = Charts.newDashboardPanel   ().setDataTable(data).bind(contr,chart)                                                                             .build();i=0;j=0;
        dash.add(uiApp.createVerticalPanel().add(uiApp.createHorizontalPanel().setSpacing(10).add(chart[j++]).add(chart[j++]).add(chart[j++])                )
                                            .add(uiApp.createHorizontalPanel().setSpacing(10).add(contr[i++]).add(contr[i++]).add(contr[i++]).add(contr[i++]))
                                            .add(uiApp.createHorizontalPanel().setSpacing(10).add(contr[i++]).add(contr[i++]).add(contr[i++]).add(contr[i++]))
                                            .add(uiApp.createHorizontalPanel().setSpacing(10).add(chart[j++])                                                ));return dash;}
// ---------------------------------------------------------------- rvp.html ---------------------------------------------------------------- // https://code.google.com/apis/ajax/playground/?type=visualization#group
<html>
<head>
    <title id='Description'>Navigation with jqxTree</title>
    <link rel="stylesheet" href="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqx.base.css?attredirects=0&d=1" type="text/css" />
    <link rel="stylesheet" href="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqx.bootstrap.css?attredirects=0&d=1" type="text/css" />
    <script type="text/javascript" charset="utf8" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/gettheme.js?attredirects=0&d=1"></script>
<!--<script type="text/javascript" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jquery-1.8.3.min.js?attredirects=0&d=1"></script>-->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
    <script type="text/javascript" charset="utf8" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqxcore.js?attredirects=0&d=1"></script>
    <script type="text/javascript" charset="utf8" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqxbuttons.js?attredirects=0&d=1"></script>
    <script type="text/javascript" charset="utf8" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqxscrollbar.js?attredirects=0&d=1"></script>
    <script type="text/javascript" charset="utf8" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqxpanel.js?attredirects=0&d=1"></script>
    <script type="text/javascript" charset="utf8" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqxtree.js?attredirects=0&d=1"></script>
    <script type="text/javascript" charset="utf8" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqxexpander.js?attredirects=0&d=1"></script>
    <script type="text/javascript" charset="utf8" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqxsplitter.js?attredirects=0&d=1"></script>
    <script type="text/javascript" charset="utf8">
        $(document).ready(function () {
            var theme = "bootstrap"/*getDemoTheme()*/,
            urlMap = { "Sales_Training_Manual" : "https://docs.google.com/document/d/1ICsRuk5aOyvAi7kehyKkn6IHVosQRMhdY0F-2d6tP8o/preview"
                     , "Training_Mojo"         : "http://www.youtube.com/embed/i3aExu11e1o?" // <iframe width="560" height="315" src="" frameborder="0" allowfullscreen></iframe>
                     , "Register"              : "https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?k=g8h2j7kdhkztj0awyeii"
                     , "Comp_Plan"             : "https://docs.google.com/document/d/1ROjvOBVDwX7q1gKITyaYYtEYICY5JQAEBmpxcAyIv1E/preview"
            };
            // Create jqxTree
            $("#splitter").jqxSplitter({ theme: theme, width: '100%', height: 1400, panels: [{ size: 215}] });
            $('#jqxTree').jqxTree({ theme: theme, height: '100%', width: '100%' });
            $('#jqxTree').on('select', function (event) {
                $("#ContentPanel").html("<iframe src='"        + urlMap[event.args.element.id]+ "'  style='height:100%;width:100%;'></iframe>");
             // $("#ContentPanel").html("<div style='margin: 10px;'>" + urlMap[event.args.element.id] + "                                   </div>   ");
             // $("#ContentPanel").html("<div style='margin: 10px;'>" + event.args.element.id + "                                   </div>   ");
             // $("#ContentPanel").html("<iframe src='https://docs.google.com/document/d/1ICsRuk5aOyvAi7kehyKkn6IHVosQRMhdY0F-2d6tP8o/preview' width='100%' height='900' scrolling=no seamless=true title='Sales Training Manual'></iframe>");
             // $("#ContentPanel").html("<iframe src='" + event.args.element.id + "'  style='height:100%;width:100%;'></iframe>");
            });
        });
    </script>
</head>
<body class='default'>
    <div id="splitter">
        <div>
            <div style="border: none;" id='jqxTree'>
                <ul>
                    <li id="Account"          item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">Account               </span>
                        <ul>
                    <li id="Register"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Register              </span>
                    <li id="Comp_Plan"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Comp Plan             </span>
                    <li id="Paycheck"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Paycheck              </span>
                        </ul>
                    </li>
                    <li id="Products"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">Products              </span>
                        <ul>
                    <li id="Sales_Training_Manual"  item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Sales Training Manual </span>
                    <li id="Mojo"            item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">Mojo™                 </span>
                            <ul>
                    <li id="Training_Mojo"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh6.googleusercontent.com/-YuDG2RH3zIU/Uc1WlaqL4xI/AAAAAAAAHVQ/CzMjXFCKtpI/s144/ca.png'  height='16' width='15'><span item-title="true">Product Training Video</span></li>
                    <li id="Leads"            item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Leads + Scripts       </span></li>
                            </ul>
                    </li>
                    <li id="LeadBank"        item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">LeadBank™             </span>
                            <ul>
                    <li id="Training"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh6.googleusercontent.com/-YuDG2RH3zIU/Uc1WlaqL4xI/AAAAAAAAHVQ/CzMjXFCKtpI/s144/ca.png'  height='16' width='15'><span item-title="true">Product Training Video</span></li>
                    <li id="Leads"            item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Leads + Scripts       </span></li>
                            </ul>
                    </li>
                    <li id="DealDigger"      item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">DealDigger™           </span>
                            <ul>
                    <li id="Training"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh6.googleusercontent.com/-YuDG2RH3zIU/Uc1WlaqL4xI/AAAAAAAAHVQ/CzMjXFCKtpI/s144/ca.png'  height='16' width='15'><span item-title="true">Product Training Video</span></li>
                    <li id="Leads"            item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Leads + Scripts       </span></li>
                            </ul>
                    </li>
                    <li id="Mondo"           item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">Mondo™                </span>
                            <ul>
                    <li id="Training"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh6.googleusercontent.com/-YuDG2RH3zIU/Uc1WlaqL4xI/AAAAAAAAHVQ/CzMjXFCKtpI/s144/ca.png'  height='16' width='15'><span item-title="true">Product Training Video</span></li>
                    <li id="Leads"            item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Leads + Scripts       </span></li>
                            </ul>
                    </li>
                    <li id="Wellhaven™"       item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">Wellhaven™            </span>
                            <ul>
                    <li id="Training"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh6.googleusercontent.com/-YuDG2RH3zIU/Uc1WlaqL4xI/AAAAAAAAHVQ/CzMjXFCKtpI/s144/ca.png'  height='16' width='15'><span item-title="true">Product Training Video</span></li>
                    <li id="Leads"            item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Leads + Scripts       </span></li>
                            </ul>
                    </li>
                        </ul>
                    </li>
                    <li id="Recruit"          item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">Recruit          </span>
                <ul>
                    <li id="Send"             item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Send             </span></li>
                    <li id="Track"            item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Track            </span></li>
                </ul></li>
                    <li id="Communicate"      item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">Communicate      </span>
                <ul>
                    <li id="Teleconference"   item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Teleconference   </span></li>
                    <li id="Objectives"       item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Objectives       </span></li>
                    <li id="Discussion"       item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Discussion       </span></li>
                    <li id="Bugs & Features"  item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Bugs & Features  </span></li>
                    <li id="Incompatiblities" item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Incompatiblities </span></li>
                </ul></li>
                </ul>
            </div>
        </div>
        <div id="ContentPanel"></div>
    </div>
</body>
</html>
// ---------------------------------------------------------------- EXPERIMENTAL ----------------------------------------------------------------
function experimental(){}
// --------------------------------------------------------------------- NACHA.gs ---------------------------------------------------------------------
function NACHA_codes(){var out={"idFile":1261121855,"idCompany":1261121855,"folder":"ACH_1","validationLink":"https://safe-t-validate.wellsfargo.com"};return out;}

function tester(){
    Logger.log(NACHA_verifyRoutingNo("274976196"));
}
function SCC(){return {"bo":" 200","cr":"220","dr":"225"}}
function routingNo(){return {"Wells Fargo":"091000019","LaSalle":" 07100050","StandardFed":" 07200080"}}
function NACHA_verifyRoutingNo(rtno){rtno=rtno.toString().split(" ").join("");return NACHA_checkDigit(rtno)==rtno.substr(-1,1)} // Returns true if routing number’s last (9th) digit equals "checkDigit()" of first 8
function NACHA_checkDigit(rtn){ // Finds 9th digit of bank routing number, given the first 8 // rtn = "Routing transit number" // Reference: https://docs.google.com/open?id=1E5ggDuRSQWsuCTG8v7Ukt1769x6JDaMfJqvuO4WkJ5omDhUox62NARL-k8iy // Page 24
    var weights=[3,7,1,3,7,1,3,7],rtn=rtn.toString().split(" ").join(""),i=weights.length,len=rtn.length;if(len>i){rtn=rtn.substr(0,i)}else if(len<i){while(rtn.length<i){rtn="0"+rtn}}
    var arr=rtn.split(""),checksum=0;while(i--){checksum+=arr[i]*weights[i]}return (10-checksum%10)%10;}
String.prototype.ff=function(len,jus,dec){var str=this;if(dec){str=str.replace(".","")}; // Field Format // len = int, total length of result; jus = string, justification: left ("L") or right ("R"); dec = boolean, contains a decimal point
    if(str.length>len){str=str.substr(0,len)}else{switch(jus){case "L":while(str.length<len){str+=" ";}break;case "R":while(str.length<len){str="0"+str;}break;}}return str.toUpperCase()}
function recordFiller(len){var str="";if(!len){len=94}while(str.length<len){str+="9";}return str}
function recordFileHeader(senderName,senderTin,im,mod,ref){ // tin=10-digit "Tax ID Number" // im=1 or 2 // References // NACHA specs: https://docs.google.com/open?id=0B1LVOoV_2dFtUkVtZXotVWRuNlU // Tutorial: https://docs.google.com/open?id=0B1LVOoV_2dFtOFZiWnd0V1VSclk
    var des=[,{"rn":" 071000505","name":"LaSalle Bank N.A."},{"rn":" 072000805","name":"Standard Federal Bank"}],d=new Date(),yy=(d.getUTCFullYear()%100).toString().ff(2,"R",false),mo=(d.getUTCMonth()+1).toString().ff(2,"R",false),dd=d.getUTCDate().toString().ff(2,"R",false),hh=d.getUTCHours().toString().ff(2,"R",false),mm=d.getUTCMinutes().toString().ff(2,"R",false);
    var arr     = []                           ; // File Header Record
        arr[ 1] = "1"         .ff( 1,"L",false); // Record Type Code // The code identifying the File Header Record is 1
        arr[ 2] = "01"        .ff( 2,"L",false); // Priority Code // The lower the number, the higher processing priority. Currently,only 01 is used
        arr[ 3] = des[im].rn  .ff(10,"R",false); // Immediate Destination // LaSalle Bank N.A. or Standard Federal Bank’s transit routing number preceded by a blank (071000505 for LaSalle and 072000805 for Standard Federal)
        arr[ 4] = senderTin   .ff(10,"R",false); // Immediate Origin // Your 10-digit company number. The use of an IRS Federal Tax Identification Number as a company identification is recommended. Otherwise, ABN AMRO will create a unique number for your company
        arr[ 5] = (yy+mo+dd)  .ff( 6,"L",false); // File Creation Date // YYMMDD // The date you created the input file
        arr[ 6] = (hh+mm)     .ff( 4,"L",false); // File Creation Time // HHMM // Time of day you created the input file. This field is used to distinguish between input files if you submit more than one per day
        arr[ 7] = mod         .ff( 1,"L",false); // File ID Modifier // Code to distinguish among multiple input files. Label the first (or only) file “A”, and continue in sequence (A-Z). If more than one file is delivered, they must have different modifiers
        arr[ 8] = "094"       .ff( 3,"L",false); // Record Size // Number of bytes per record. Enter "094"
        arr[ 9] = "10"        .ff( 2,"L",false); // Blocking Factor // Block at "10"
        arr[10] = "1"         .ff( 1,"L",false); // Format Code // Currently there is only one code. Enter "1"
        arr[11] = des[im].name.ff(23,"L",false); // Immediate Destination Name // Enter "LaSalle Bank" or "Standard Federal Bank"
        arr[12] = senderName  .ff(23,"L",false); // Immediate Origin Name // Your company’s name, up to 23 characters
        arr[13] = ref         .ff( 8,"L",false); // Reference Code // Optional field you may use to describe input file for internal accounting purposes
    return arr.join("");} //function tester(){Logger.log(recordFileHeader("Atlas","1234567890","1","A","12345678"));}
function recordBatchHeader(scc,coName,dd,coTin,sec,des,entryDate,bank,batchNo){var s=SCC(),r=routingNo();
    var arr     = []                           ; // Batch Header Record
        arr[ 1] = "5"         .ff( 1,"L",false); // Record Type Code // The code identifying the Batch Header record is 5
        arr[ 2] = s[scc]      .ff( 3,"L",false); // Service Class Code // Identifies the type of entries in the batch: 200 - ACH Entries Mixed Debits and Credits, 220 - ACH Credits Only, 225 - ACH Debits Only
        arr[ 3] = coName      .ff(16,"L",false); // Company Name // Your company name, up to 16 characters. This name may appear on the receivers’ statements prepared by the Receiving Financial Institution.
        arr[ 4] = dd          .ff(20,"L",false); // Company Discretionary Data // For your company’s internal use, if desired. No specific format is required
        arr[ 5] = coTin       .ff(10,"R",false); // Company Identification // Your 10-digit company number. Identical to the number in field 4 of the File Header Record, unless multiple companies/divisions are provided in one transmission
        arr[ 6] = sec         .ff( 3,"L",false); // Standard Entry Class Code // Identifies the entries in the batch. Common standard entry class codes are PPD (Prearranged Payments and Deposit entries) for consumer items, CCD (Cash Concentration and Disbursement entries), CTX (Corporate Trade Exchange entries) for corporate transactions, TEL (Telephone initiated entries), and WEB (Authorization received via the Internet). // References: // http://www.suncorp.coop/pdfs/pdf_achnews/ach_code_card.pdf // http://www.achdirect.com/resources/seccodes.asp
        arr[ 7] = des         .ff(10,"L",false); // Company Entry Description // Your description of the transaction. This may be printed on the receivers’ bank statement by the Receiving Financial Institution. (i.e. Payroll)
        arr[ 8] = ""          .ff( 6,"L",false); // Company Descriptive Date // The date you choose to identify the transactions. This date may be printed on the participants’ bank statement by the Receiving Financial Institution // Note: We will choose to leave blank
        arr[ 9] = entryDate   .ff( 6,"L",false); // Effective Entry Date // Date transactions are to be posted to the participants’ account.
        arr[10] = ""          .ff( 3,"L",false); // Settlement Date (Julian) // Reserved // Leave this field blank
        arr[11] = "1"         .ff( 1,"L",false); // Originator Status Code // Enter “1”. This identifies LaSalle/Standard Federal as a depository financial institution, which is bound by the rules of the ACH.
        arr[12] = r[bank]     .ff( 8,"R",false); // Originating DFI Identification // Financial Institution // Enter LaSalle’s routing transit number 07100050, or Standard Federal’s transit routing number of 07200080
        arr[13] = batchNo     .ff( 7,"R",false); // Batch Number // Number batches sequentially.
    return arr.join("");}
/*function recordEntryDetail_WEB(trCode,recRout,cd){
    var arr     = []                           ; // Entry Detail Record (WEB)
        arr[ 1] = "6"         .ff( 1,"L",false); // Record Type Code // The code identifying an Entry Detail Record is 6
        arr[ 2] = trCode      .ff( 2,"R",false); // Transaction Code // Two digit code identifying the account type at the receiving financial institution: 22 - Deposit destined for a Checking Account 23 - Prenotification for a checking credit 24 - Zero dollar with remittance into Checking Account 27 - Debit destined for a Checking Account 28 - Prenotification for a checking debit 29 - Zero dollar with remittance into Checking Account 32 - Deposit destined for a Savings Account 33 - Prenotification for a savings credit 34 - Zero dollar with remittance into Savings Account 37 - Debit destined for a Savings Account 38 - Prenotification for a Savings debit 39 - Zero dollar with remittance into Savings Account
        arr[ 3] = recRout     .ff( 8,"R",false); // Receiving DFI Identification // Transit routing number of the receiver’s financial institution
        arr[ 4] = cd          .ff( 1,"L",false); // Check Digit // The ninth digits of the receiving financial institutions transit routing number /* Here, restart writing implementation
        arr[ 5] = coTin       .ff(17,"L",false); // Company Identification // Your 10-digit company number. Identical to the number in field 4 of the File Header Record, unless multiple companies/divisions are provided in one transmission
        arr[ 6] = sec         .ff(10,"R",true ); // Standard Entry Class Code // Identifies the entries in the batch. Common standard entry class codes are PPD (Prearranged Payments and Deposit entries) for consumer items, CCD (Cash Concentration and Disbursement entries), CTX (Corporate Trade Exchange entries) for corporate transactions, TEL (Telephone initiated entries), and WEB (Authorization received via the Internet). // Reference: http://www.achdirect.com/resources/seccodes.asp
        arr[ 7] = des         .ff(15,"L",false); // Company Entry Description // Your description of the transaction. This may be printed on the receivers’ bank statement by the Receiving Financial Institution. (i.e. Payroll)
        arr[ 8] = ""          .ff(22,"L",false); // Company Descriptive Date // The date you choose to identify the transactions. This date may be printed on the participants’ bank statement by the Receiving Financial Institution // Note: We will choose to leave blank
        arr[ 9] = entryDate   .ff( 2,"L",false); // Effective Entry Date // Date transactions are to be posted to the participants’ account.
        arr[10] = ""          .ff( 1,"L",false); // Settlement Date (Julian) // Reserved // Leave this field blank
        arr[11] = "1"         .ff(15,"L",false); // Originator Status Code // Enter “1”. This identifies LaSalle/Standard Federal as a depository financial institution, which is bound by the rules of the ACH.
    return arr.join("");}*/
function recordEntryDetail_CTX(trCode,recRout,cd,acctNo,amount,recName,add,trace){
    var arr     = []                           ; // Entry Detail Record (CTX)
        arr[ 1] = "6"         .ff( 1,"L",false); // Record Type Code // The code identifying an Entry Detail Record is 6
        arr[ 2] = trCode      .ff( 2,"R",false); // Transaction Code // Two digit code identifying the account type at the receiving financial institution: 22 - Deposit destined for a Checking Account 23 - Prenotification for a checking credit 24 - Zero dollar with remittance into Checking Account 27 - Debit destined for a Checking Account 28 - Prenotification for a checking debit 29 - Zero dollar with remittance into Checking Account 32 - Deposit destined for a Savings Account 33 - Prenotification for a savings credit 34 - Zero dollar with remittance into Savings Account 37 - Debit destined for a Savings Account 38 - Prenotification for a Savings debit 39 - Zero dollar with remittance into Savings Account
        arr[ 3] = recRout     .ff( 8,"R",false); // Receiving DFI Identification // Transit routing number of the receiver’s financial institution
        arr[ 4] = cd          .ff( 1,"L",false); // Check Digit // The ninth digits of the receiving financial institutions transit routing number
        arr[ 5] = acctNo      .ff(17,"L",false); // DFI Account Number // Receiver’s account number at their financial institution. Left justify
        arr[ 6] = amount      .ff(10,"R",true ); // Total Amount // Transaction amount in dollars with two decimal places. Left zero fill if necessary. Enter 10 zeros for prenotes.
        arr[ 7] = ""/*recID*/ .ff(15,"L",false); // Identification Number (optional) // Receiver’s identification number. This number may be printed on the receiver’s bank statement by the Receiving Financial Institution.
        arr[ 8] = "0"         .ff( 4,"R",false); // Number of Addenda Records // The number of addenda records accompanying the CTX entry detail record
        arr[ 9] = recName     .ff(16,"L",false); // Receiving Company Name / ID Number // Name of receiver
        arr[10] = ""          .ff( 2,"L",false); // Reserved // Leave blank
        arr[11] = ""          .ff( 2,"L",false); // Discretionary Data // For your company’s internal use if desired. No specific format is required.
        arr[12] = add         .ff( 1,"L",false); // Addenda Record Indicator // If there is no addenda accompanying this transaction enter “0”. If addenda is accompanying the transaction enter “1”.
        arr[13] = trace       .ff(15,"L",false); // Trace Number // LaSalle will assign a trace number. This number will be unique to the transaction and will help identify the transaction in case of an inquiry.
    return arr.join("");} //function tester(){Logger.log(recordEntryDetail_CTX("22"," 07200080","7","123456789012","1593.23","Savannah J. Henkle","0","12345678"));}
function recordAddenda_CTX(info,seqNumAdd,seqNumEnt){
    var arr     = []                           ; // Addenda Record (CTX)
        arr[ 1] = "7"         .ff( 1,"L",false); // Record Type Code // The code identifying an Entry Detail Record is 7
        arr[ 2] = "05"        .ff( 2,"L",false); // Addenda Type Code // Two digit code identifying the type of information contained in the addenda record: 02 - Used for the POS, MTE and SHR standard entry classes. The Addenda information is used for terminal location information. 05 - Used for CCD, CTX and PPD standard entry classes. The Addenda information contains additional payment related information. 98 - Used for Notification of Change entries. The addenda record contains the correct information. 99 - Used for Return Entries.
        arr[ 3] = info        .ff(80,"L",false); // Payment Related Information // This field contains additional information associated with the payment. The information can be in either ANSI or UN/EDIFACT format.
        arr[ 4] = seqNumAdd   .ff( 4,"L",false); // Addenda Sequence Number // This number is consecutively assigned to each addenda record. The first addenda sequence number must always be a “1.”
        arr[ 5] = seqNumEnt   .ff( 7,"L",false); // Entry Detail Sequence Number // This number is the same as the last seven digits of the trace number of the related Entry Detail record.
    return arr.join("");} //function tester(){Logger.log(recordEntryDetail_CTX("22"," 07200080","7","123456789012","1593.23","Savannah J. Henkle","0","12345678"));}
function recordBatchControl(scc,ct,eh,batchAmtDr,batchAmtCr,coTin,bank,batchNo){var s=SCC(),r=routingNo();
    var arr     = []                           ; // Batch Control Record
        arr[ 1] = "8"         .ff( 1,"L",false); // Record Type Code // The code identifying the Batch Control Record is 8
        arr[ 2] = s[scc]      .ff( 3,"L",false); // Service Class Code // Identifies the type of entries in the batch: 200 - ACH Entries Mixed Debits and Credits, 220 - ACH Credits Only, 225 - ACH Debits Only        arr[ 3] = recRout     .ff( 6,"R",false); // Receiving DFI Identification // Transit routing number of the receiver’s financial institution
        arr[ 3] = ct          .ff( 6,"R",false); // Entry/Addenda Count // Total number of entry detail and addenda records processed within the batch. This field requires six positions; right justify and use leading zeros.
        arr[ 4] = eh          .ff(10,"R",false); // Entry Hash // Total of all positions 4-11 on each 6 record (Detail). Only use the final 10 positions in the entry
        arr[ 5] = batchAmtDr  .ff(12,"R",true ); // Total Debit  Entry Dollar Amount // Dollar totals of debit  entries within the batch. If none, zero fill the field
        arr[ 6] = batchAmtCr  .ff(12,"R",true ); // Total Credit Entry Dollar Amount // Dollar totals of credit entries within the batch. If none, zero fill the field
        arr[ 5] = coTin       .ff(10,"R",false); // Company Identification // This should match the company identification number used in the corresponding batch header record, field 5.
        arr[ 8] = ""          .ff(19,"L",false); // Message Authentication Code // This is an optional field. Please leave this field blank.
        arr[ 9] = ""          .ff( 6,"L",false); // Reserved // This field is reserved for Federal Reserve use. Please leave this field blank.
        arr[10] = r[bank]     .ff( 8,"L",false); // Originating Financial Institution ID // Enter LaSalle’s routing number 07100050, or Standard Federal’s transit routing number of 07200080
        arr[11] = batchNo     .ff( 7,"R",false); // Batch Number // Number of the batch associated with this control record
    return arr.join("");}
function recordFileControl(ctbatch,ctblock,ctentry,eh,fileAmtDr,fileAmtCr){
    var arr     = []                           ; // File Control Record
        arr[ 1] = "9"         .ff( 1,"L",false); // Record Type Code // The code for the File Control Record is 9
        arr[ 2] = ctbatch     .ff( 6,"R",false); // Batch Count // The total number of batch header records in the file
        arr[ 3] = ctblock     .ff( 6,"R",false); // Block Count // The total number of physical blocks on the file, including the File Header and File Control records
        arr[ 4] = ctentry     .ff( 8,"R",false); // Entry/Addenda Count // Total number of entry detail and addenda records on the file
        arr[ 5] = eh          .ff(10,"R",false); // Entry Hash // Total of all positions 4-11 on each 6 record (Detail). Only use the final 10 positions in the entry
        arr[ 5] = fileAmtDr   .ff(12,"R",true ); // Total Debit  Entry Dollar Amount // Dollar totals of debit  entries within the file. If none, zero fill the field
        arr[ 6] = fileAmtCr   .ff(12,"R",true ); // Total Credit Entry Dollar Amount // Dollar totals of credit entries within the file. If none, zero fill the field
        arr[ 8] = ""          .ff(39,"L",false); // Reserved // Leave this field blank
    return arr.join("");}
// --------------------------------------------------------------------- Tester.gs ---------------------------------------------------------------------
function tester(){Logger.log(main_dex("mojo","http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-amery-wi/?st=0").getId())} // http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-aberdeen-sd/?st=0
function tester1(){}
function testEmail(){MailApp./*GmailApp.*/sendEmail("test_adwhpaseqkhvhhl@suremail.info","head","",{name:"u.name",noReply:true,htmlBody:"body"/*,from:"atlaslive@gmail.com"GMailApp.getAliases()*/});}
// --------------------------------------------------------------------- rvp.html ---------------------------------------------------------------------
<html>
<head>
    <title id='Description'>Navigation with jqxTree</title>
    <link rel="stylesheet" href="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqx.base.css?attredirects=0&d=1" type="text/css" />
    <link rel="stylesheet" href="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqx.bootstrap.css?attredirects=0&d=1" type="text/css" />
    <script type="text/javascript" charset="utf8" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/gettheme.js?attredirects=0&d=1"></script>
<!--<script type="text/javascript" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jquery-1.8.3.min.js?attredirects=0&d=1"></script>-->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
    <script type="text/javascript" charset="utf8" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqxcore.js?attredirects=0&d=1"></script>
    <script type="text/javascript" charset="utf8" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqxbuttons.js?attredirects=0&d=1"></script>
    <script type="text/javascript" charset="utf8" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqxscrollbar.js?attredirects=0&d=1"></script>
    <script type="text/javascript" charset="utf8" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqxpanel.js?attredirects=0&d=1"></script>
    <script type="text/javascript" charset="utf8" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqxtree.js?attredirects=0&d=1"></script>
    <script type="text/javascript" charset="utf8" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqxexpander.js?attredirects=0&d=1"></script>
    <script type="text/javascript" charset="utf8" src="https://www.sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jqxsplitter.js?attredirects=0&d=1"></script>
    <script type="text/javascript" charset="utf8">
        $(document).ready(function () {
            var theme = "bootstrap"/*getDemoTheme()*/,
            urlMap = { "Sales_Training_Manual" : "https://docs.google.com/document/d/1ICsRuk5aOyvAi7kehyKkn6IHVosQRMhdY0F-2d6tP8o/preview"
					 , "Training_Mojo"         : "http://www.youtube.com/embed/i3aExu11e1o?" // <iframe width="560" height="315" src="" frameborder="0" allowfullscreen></iframe>
					 , "Register"              : "https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?k=g8h2j7kdhkztj0awyeii"
					 , "Comp_Plan"             : "https://docs.google.com/document/d/1ROjvOBVDwX7q1gKITyaYYtEYICY5JQAEBmpxcAyIv1E/preview"
			};
            // Create jqxTree
            $("#splitter").jqxSplitter({ theme: theme, width: '100%', height: 1400, panels: [{ size: 215}] });
            $('#jqxTree').jqxTree({ theme: theme, height: '100%', width: '100%' });
            $('#jqxTree').on('select', function (event) {
                $("#ContentPanel").html("<iframe src='"        + urlMap[event.args.element.id]+ "'  style='height:100%;width:100%;'></iframe>");
             // $("#ContentPanel").html("<div style='margin: 10px;'>" + urlMap[event.args.element.id] + "                                   </div>   ");
			 // $("#ContentPanel").html("<div style='margin: 10px;'>" + event.args.element.id + "                                   </div>   ");
			 //	$("#ContentPanel").html("<iframe src='https://docs.google.com/document/d/1ICsRuk5aOyvAi7kehyKkn6IHVosQRMhdY0F-2d6tP8o/preview' width='100%' height='900' scrolling=no seamless=true title='Sales Training Manual'></iframe>");
             // $("#ContentPanel").html("<iframe src='" + event.args.element.id + "'  style='height:100%;width:100%;'></iframe>");
			});
        });
    </script>
</head>
<body class='default'>
    <div id="splitter">
        <div>
            <div style="border: none;" id='jqxTree'>
                <ul>
                    <li id="Account"          item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">Account               </span>
						<ul>
					<li id="Register"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Register              </span>
					<li id="Comp_Plan"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Comp Plan             </span>
					<li id="Paycheck"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Paycheck              </span>
						</ul>
					</li>
                    <li id="Products"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">Products              </span>
						<ul>
					<li id="Sales_Training_Manual"  item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Sales Training Manual </span>
					<li id="Mojo"            item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">Mojo™                 </span>
							<ul>
					<li id="Training_Mojo"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh6.googleusercontent.com/-YuDG2RH3zIU/Uc1WlaqL4xI/AAAAAAAAHVQ/CzMjXFCKtpI/s144/ca.png'  height='16' width='15'><span item-title="true">Product Training Video</span></li>
					<li id="Leads"            item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Leads + Scripts       </span></li>
							</ul>
					</li>
					<li id="LeadBank"        item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">LeadBank™             </span>
							<ul>
					<li id="Training"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh6.googleusercontent.com/-YuDG2RH3zIU/Uc1WlaqL4xI/AAAAAAAAHVQ/CzMjXFCKtpI/s144/ca.png'  height='16' width='15'><span item-title="true">Product Training Video</span></li>
					<li id="Leads"            item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Leads + Scripts       </span></li>
							</ul>
					</li>
					<li id="DealDigger"      item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">DealDigger™           </span>
							<ul>
					<li id="Training"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh6.googleusercontent.com/-YuDG2RH3zIU/Uc1WlaqL4xI/AAAAAAAAHVQ/CzMjXFCKtpI/s144/ca.png'  height='16' width='15'><span item-title="true">Product Training Video</span></li>
					<li id="Leads"            item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Leads + Scripts       </span></li>
							</ul>
					</li>
					<li id="Mondo"           item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">Mondo™                </span>
							<ul>
					<li id="Training"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh6.googleusercontent.com/-YuDG2RH3zIU/Uc1WlaqL4xI/AAAAAAAAHVQ/CzMjXFCKtpI/s144/ca.png'  height='16' width='15'><span item-title="true">Product Training Video</span></li>
					<li id="Leads"            item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Leads + Scripts       </span></li>
							</ul>
					</li>
					<li id="Wellhaven™"       item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">Wellhaven™            </span>
							<ul>
					<li id="Training"         item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh6.googleusercontent.com/-YuDG2RH3zIU/Uc1WlaqL4xI/AAAAAAAAHVQ/CzMjXFCKtpI/s144/ca.png'  height='16' width='15'><span item-title="true">Product Training Video</span></li>
					<li id="Leads"            item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Leads + Scripts       </span></li>
							</ul>
					</li>
						</ul>
					</li>
					<li id="Recruit"          item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">Recruit          </span>
				<ul>
					<li id="Send"             item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Send             </span></li>
					<li id="Track"            item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Track            </span></li>
				</ul></li>
					<li id="Communicate"      item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh3.googleusercontent.com/-yE2_TlpZCHs/UcbF_zBVAGI/AAAAAAAAG6Y/-OabDQrlz0o/s800/folder.png'                    ><span item-title="true">Communicate      </span>
				<ul>
					<li id="Teleconference"   item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Teleconference   </span></li>
					<li id="Objectives"       item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Objectives       </span></li>
					<li id="Discussion"       item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Discussion       </span></li>
					<li id="Bugs & Features"  item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Bugs & Features  </span></li>
					<li id="Incompatiblities" item-expanded='false'><img style='float:left;margin-right:5px;' src='https://lh4.googleusercontent.com/-F4UqLP_bP_M/UczaETY2UcI/AAAAAAAAHUs/NN4AIe4RGVk/s144/doc.png' height='16'           ><span item-title="true">Incompatiblities </span></li>
				</ul></li>
				</ul>
            </div>
        </div>
        <div id="ContentPanel"></div>
    </div>
</body>
</html>
// --------------------------------------------------------------------- gasMainSP.gs ---------------------------------------------------------------------
function main_dex(client,act){ // Scrapes page, adds labels, saves records, returns one record // www.dexknows.com // Notes: 30 results per page - 4 rotating ads = 26 useable results // Reference: https://developers.google.com/apps-script/scriptdb
 /* Archive
    NOTE: The following function has been deprecated and replaced by main_dex() which uses JSON // Partially due to more efficient scrape processing due to use of JSON
String.prototype.dexScrape = function(){ // www.dexknows.com // Notes: 30 results per page - 4 rotating ads = 26 useable results //this: action="http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-greenville-sc/?st=30"; // Sample call: "http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-greenville-sc/?st=30".dexScrape(); // http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-greenville-sc/?distance=0&sort=&view=list&where=Greenville%2C+SC&st=30&pageset=1
    var LOAD = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    var doc  = SpreadsheetApp.openById("0AlLVOoV_2dFtdEZqMFdZN2VNMk55VXRGWHhmeThEU2c");var lastRow=doc.getLastRow();var cell=doc.getRange('a1').offset(lastRow, 0); // Determine last populated row in spreadsheet // Locate next free cell in column A
    var LI="id:parseInt";var QUE=["name:","street:","city:","state:","phone:","profileurl:","websiteurl:","dkid:","categoryprettyname:"];var REP="\"";var MARK=new Array();var j,i=QUE.length;while(i--){MARK[i]=REP}
    var FIELDS=["Source_URL","Company_name","Street","City","State","Phone_string","Profile_URL","Website_URL","Source_ID","Category","Phone_number"];
    var data=UrlFetchApp.fetch(this).getContentText().split(LI);i=data.length;while(i--){data[i]=data[i].scrapeDataset(false,QUE,MARK,MARK,false,false);j=data[i].length;while(j--){try{data[i][j]=data[i][j].replaceAll("%26","and");}catch(e){}}data[i][0]=this.hexEncode();if(data[i][6]){data[i][6]=data[i][6].hexEncode();}if(data[i][7]){data[i][7]=data[i][7].hexEncode();}if(data[i][5]){data[i].push(data[i][5].stripDigits())}}data.shift(); // Fetch+scrape // var START="<!-- results-->";var LI="<div class=\"details\">";
    //Logger.log(data);//doc.getActiveSheet().getRange(lastRow+1,1,data.length,data[0].length).setValues(data); //var db=ScriptDb.getMyDb();var result=db.saveBatch(data,false); // Database operations // Reference: https://developers.google.com/apps-script/scriptdb // Batch save dataset
    //data = data.slice(-1);Logger.log(data);["salespro","Lead_USAcredit",FIELDS,data].writeToAPI_Zoho();}*/
    // var LOAD   = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    // if(client==null){client="mojo";}if(act==null){act="www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-greenville-sc/?st=0";}
	var ob,db=ScriptDb.getMyDb(),d=new Date().getTime(),user=Session.getUser().getEmail(),data=UrlFetchApp.fetch(act).getContentText().split("addPoint");i=data.length; // Increment "st" by 30 // URL shortened from act="http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-greenville-sc/?distance=0&sort=&view=list&where=Greenville%2C+SC&st=30&pageset=1";
    while(i---1){ob=JSON.parse(decodeURIComponent(data[i].scrape("","(",");")[1].replace("{","{\"").replaceAll("+"," ").replaceAll("parseFloat(","").replaceAll("parseInt(","").replaceAll("\",","\",\"").replaceAll(":\"","\":\"").replaceAll("),","),\"").replaceAll("\"),","\",").replaceAll("\",\" ","\",\""))); // (Below) If query finds a duplicate, skip saving via continue
    if(db.query({id:ob.id,phone:ob.phone,table:"leads",client:client}).getSize()){continue;}else{ob.source="dex";ob.addedUser=user;ob.disposition="active";ob.table="leads";ob.url=act;ob.addedTime=d;ob.callback=d;db.save(ob);}}return [db.query({addedTime:ob.addedTime}).next().getId(),ob];} // Return [id,ob] // It is challenging to grab ob.id // db.query(ob) does not work; therefore, we query on ob.addedTime
Array.prototype.dexAddyJoin = function(){var out=LibraryjsUtil.clone(this);if(out.length>9){out[9]=out[9].join("=")}if(out.length>9){out[8]=out[8].join("-")}return out.join("/")} // Returns string from addy array // Example: "http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-greenville-sc/?st=60"
String.prototype.dexCityNext = function(city){var r=this.dexCityList(),i=r.indexOf(city);if(++i<r.length){return r[i]}else{return false}} // Given this = stateAbbr and city param, (Example: "nc".dexNextCity("winston_salem"), return next city in list on state page at www.dexknows.com/.../geo/s-nc; return first city if no city param; return false if last city on page
String.prototype.dexCityList = function(){ // Given this = lower-case state abbreviation, return array of cities from www.dexknows.com // Data starts at element [0], not element [1]
    var i,out = UrlFetchApp.fetch("http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/s-"+this+"/").getContentText().scrape("Browse By City","<","</div>")[1].split("href=\"/local/automotive/vehicle_sales/auto_dealers/geo/c-");out.shift(); // Fetch list
    i=out.length;while(i--){out[i]=out[i].getPrefix("-"+this)}return out} // Trim each element // Return // Note: Use long URL stem + Brows by City instead of "www.dexknows.com/geo/s-" + Browse by Metro because (1) short URL does not yield city list and (2) complete company data is on city pages only
String.prototype.dexNext = function(rNum){ // Given string this: previous URL, return URL of next batch (new page, then city, then state)
 // var LOAD   = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
        //        0    1 2                3     4          5             6            7   8               9
		// this = "http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-greenville-sc/?st=60";
		//                                                                                 0 1          2  0   1
	if(this==""){var newState=givenRegionSelectStateAbbr(rNum),newCity=givenStateAbbrGetRandomCity(newState),
		url="http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-"+newCity+"-"+newState+"/?st=-30"}else{var url=this}
	var next,addy=url.split("/");addy[8]=addy[8].split("-");addy[9]=addy[9].split("=");
    /* WHEN OUT OF BETA/TEST, UNCOMMENT THIS SECTION
	if(!(addy[8][2].stateTestHr())){addy[9][1]=0;addy[8][2]=stateFetch(addy[8][2]);addy[8][1]=addy[8][2].dexCityNext(addy[8][1]);} // If call window for state has closed, reset page, fetch new state, fetch new city
	else{*/addy[9][1]=parseInt(addy[9][1])+30;/*}WHEN OUT OF BETA/TEST, UNCOMMENT THIS SECTION*/// page++ (increment page)
	next=addy.dexAddyJoin();addy[9][1]=0;                                          // Construct URL // Reset page in case we need to increment city
	while(!(/class=\"results\"/i.test(UrlFetchApp.fetch(next).getContentText()))){ // While no city data
		addy[8][1]=addy[8][2].dexCityNext(addy[8][1]);                             // city++ (increment city)
		if(!addy[8][1]){addy[8][2]=stateFetch(addy[8][2]);addy[8][1]=addy[8][2].dexCityNext();} // If no city, fetch new state, fetch new city
		next=addy.dexAddyJoin();}                                                  // Construct URL to try again
	return next}
function DST(){ // Boolean — true if DST (Daylight Savings Time) // Reference: http://www.mresoftware.com/simpleDST.htm
	var today = new Date;
	var yr = today.getFullYear();
	var dst_start = new Date("March 14, "+yr+" 02:00:00"); // 2nd Sunday in March can't occur after the 14th 
	var dst_end = new Date("November 07, "+yr+" 02:00:00"); // 1st Sunday in November can't occur after the 7th
	var day = dst_start.getDay(); // day of week of 14th
	dst_start.setDate(14-day); // Calculate 2nd Sunday in March of this year
	day = dst_end.getDay(); // day of the week of 7th
	dst_end.setDate(7-day); // Calculate first Sunday in November of this year
	return (today >= dst_start && today < dst_end)} //does today fall inside of DST period? // Return accordingly
function salesRegions(){return [,/*1*/"California",/*2*/"West",/*3*/"Midwest",/*4*/"Texas",/*5*/"South",/*6*/"Atlantic",/*7*/"East",/*8*/"North"]} // Returns array of region names in position of their region number // Documents // Map https://docs.google.com/drawings/d/1psVkX2kzru26B2ohPMfSAk11cjL0b4irKdl_G_Gqo2U/edit // Spreadsheet https://docs.google.com/spreadsheet/ccc?key=0AlLVOoV_2dFtdFptbDZiaFhobXJSXzdiSkl4UEd2WGc#gid=0
String.prototype.getState = function(j){var r=stateData(),i=r[3].length;while(i--){if(r[3][i]==this.toLowerCase()){return r[j][i]}}} // this str state abbr, j int dataset, return j=2:name,j=4:timezone,j=5:region,j=6:population // see stateData() // Example: "nc".getState(5)=6 , the region number
function statesInReg(x){var /*x=this,*/out=[],r=stateData(),i=r[5].length;while(i--){if(x==r[5][i]){out.push(r[3][i].toUpperCase())}}return out} // Given region number, return array of state (abbreviations) in that region
function stateData(){return [ // Returns array: [0-NULL, 1-"go codes" (i.e, whether we call that state), 2-name, 3-abbreviation, 4-time zones, 5-region, 6-population]
    /*0*/	//	0         1        2                3         4          5            6          7             8          9                      10        11        12     13       14      15         16        17      18       19         20          21      22         23              24         25          26            27         28        29         30       31              32           33           34         35               36             37                          38       39         40       41             42            43             44               45             46          47       48      49        50               51         52           53              54          55            // [0] Null
    /*1*/	, 	[true     ,true    ,false           ,true     ,true      ,true        ,true      ,true         ,true      ,true                  ,true     ,true     ,false ,true    ,true   ,true      ,true     ,true   ,true    ,true      ,true       ,true   ,true      ,true           ,true      ,true       ,true         ,true      ,true     ,true      ,true    ,true           ,true        ,true        ,true      ,true            ,true          ,false                      ,true    ,true      ,true    ,true          ,false        ,true          ,true            ,true          ,true       ,true    ,true   ,true     ,false           ,true      ,true        ,true           ,true       ,true     ]   // [1] Boolean true if we will call that state
    /*2*/	, 	["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa" ,"Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Marianas Islands","Ohio"  ,"Oklahoma","Oregon","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas" ,"Utah" ,"Vermont","Virgin Islands","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]   // [2] State name
    /*3*/	, 	["al"     ,"ak"    ,"as"            ,"az"     ,"ar"      ,"ca"        ,"co"      ,"ct"         ,"de"      ,"dc"                  ,"fl"     ,"ga"     ,"gu"  ,"hi"    ,"id"   ,"il"      ,"in"     ,"ia"   ,"ks"    ,"ky"      ,"la"       ,"me"   ,"md"      ,"ma"           ,"mi"      ,"mn"       ,"ms"         ,"mo"      ,"mt"     ,"ne"      ,"nv"    ,"nh"           ,"nj"        ,"nm"        ,"ny"      ,"nc"            ,"nd"          ,"mp"                       ,"oh"    ,"ok"      ,"or"    ,"pa"          ,"pr"         ,"ri"          ,"sc"            ,"sd"          ,"tn"       ,"tx"    ,"ut"   ,"vt"     ,"vi"            ,"va"      ,"wa"        ,"wv"           ,"wi"       ,"wy"     ]   // [3] State abbreviation
    /*4*/	, 	[-5       ,-9      ,-11             ,-7       ,-6        ,-8          ,-7        ,-5           ,-5        ,-5                    ,-5       ,-5       ,10    ,-10     ,-7     ,-6        ,-5       ,-6     ,-6      ,-6        ,-6         ,-5     ,-5        ,-5             ,-5        ,-6         ,-6           ,-6        ,-7       ,-6        ,-8      ,-5             ,-5          ,-7          ,-5        ,-5              ,-6            ,10                         ,-5      ,-6        ,-8      ,-5            ,-4           ,-5            ,-5              ,-7            ,-6         ,-6      ,-7     ,-5       ,-4              ,-5        ,-8          ,-5             ,-6         ,-7       ]   // [4] Time zone
	/*5*/	, 	[5        ,2       ,8               ,2        ,4         ,1           ,2         ,8            ,7         ,7                     ,6        ,6        ,8     ,3       ,2      ,3         ,5        ,3      ,4       ,5         ,5          ,8      ,7         ,8              ,3         ,3          ,5            ,5         ,2        ,2         ,2       ,8              ,8           ,2           ,8         ,6               ,2             ,8                          ,7       ,4         ,2       ,7             ,4            ,8             ,6               ,2             ,5          ,4       ,2      ,8        ,8               ,7         ,2           ,5              ,3          ,2        ]   // [5] U.S. Sales Regions
	/*6*/	, 	[4779736  ,710231  ,55519           ,6392017  ,2915918   ,37253956    ,5029196   ,3574097      ,897934    ,601723                ,18801310 ,9687653  ,159358,1360301 ,1567582,12830632  ,6483802  ,3046355,2853118 ,4339367   ,4533372    ,1328361,5773552   ,6547629        ,9883640   ,5303925    ,2967297      ,5988927   ,989415   ,1826341   ,2700551 ,1316470        ,8791894     ,2059179     ,19378102  ,9535483         ,672591        ,53883                      ,11536504,3751351   ,3831074 ,12702379      ,3725789      ,1052567       ,4625364         ,814180        ,6346105    ,25145561,2763885,625741   ,106405          ,8001024   ,6724540     ,1852994        ,5686986    ,563626   ]]} // [6] Population data per 4/1/2010 http://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_population
function callHours(){return /*[9,10,14,15,16,17]*/[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]} // Call windows:9-11am,2-6pm // Return array representing call hour windows
function stateFetch(prev){var x=prev.stateRegion(),r=stateData(),i=r[3].length;while(i--){if((x==r[3][i].stateRegion())&&r[3][i].stateTestHr()&&r[3][i].stateTestGo()){return r[3][i]}}return false} // Select state to dial based on region matchup + Time Zone + best times to call // prev: abbreviation of current state
function givenRegionSelectStateAbbr(rNum){var r=stateData(),i=Math.floor((Math.random()*r[1].length));while(!(r[1][i]&&(rNum==r[5][i]))){if(!i){i=(r[1].length-1)}else{i--}}return r[3][i]} // Returns a randomly selected STATE abbreviation given a REGION number
function givenStateAbbrGetRandomCity(st){var r=st.dexCityList(),i=0/*Math.floor((Math.random()*r[1].length))*/;return r[i];} // Returns a randomly selected CITY given a STATE abbreviation // Note: For now, "random" is first element [0] — because dexCityList() does not "wrap" after last element is reached
String.prototype.stateTestHr = function(){var r=stateData(),s=this.toString().toLowerCase();return ((callHours().indexOf(new Date().getUTCHours()+DST()+r[4][r[3].indexOf(s)]))>=0)} // Boolean — given state abbreviation, return boolean representing whether it is calling hours in that state
String.prototype.stateTestGo = function(){var r=stateData(),s=this.toString().toLowerCase();return r[1][r[3].indexOf(s)]} // Boolean — given state abbreviation, return boolean representing whether we call in that state // Mainly to skip calling U.S. non-state territories
String.prototype.stateRegion = function(){var r=stateData(),s=this.toString().toLowerCase();return r[5][r[3].indexOf(s)]} // Returns region number of this string - state abbreviation
// --------------------------------------------------------------------- register.html ---------------------------------------------------------------------
<html style="font-family:arial;font-size:small;">
    <head>
        <script>
            function updateUrl(url) {
                var div = document.getElementById('output');
                div.innerHTML = '<a href="' + url + '">Got it!</a>';}
        </script>
    </head>
    <body>
        <form id="myForm">
            <table><tbody>
                <tr><td>Email          </td><td><input type="text" name="email"       ></td></tr>
                <tr><td>Full name      </td><td><input type="text" name="name"        ></td></tr>
                <tr><td>Phone number   </td><td><input type="text" name="phone"       ></td></tr>
                <tr><td>Full address   </td><td><input type="text" name="address"     ></td></tr>
                <tr><td>Bank name      </td><td><input type="text" name="bankname"    ></td></tr>
                <tr><td>Routing number </td><td><input type="text" name="routingno"   ></td></tr>
                <tr><td>Account number </td><td><input type="text" name="accountno"   ></td></tr>
                <tr><td>Contract       </td><td><input type="file" name="docContract" ></td></tr>
                <tr><td>Tax documents  </td><td><input type="file" name="docTax"      ></td></tr>
                <tr><td><input type="button" value="Submit" onclick="google.script.run.withSuccessHandler(updateUrl).processForm(this.parentNode)"> </td><td></td></tr>
            </tbody></table>
        </form>
        <div id="output"></div>
    </body>
</html>
