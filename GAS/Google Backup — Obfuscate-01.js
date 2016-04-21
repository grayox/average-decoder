// ------------------------------- CODE -------------------------------  Stored at dropbox: Google Backup � Obfuscate-01.js
// Instructions:
// 1. Open spreadsheet: Host URLs � Obfuscate Obfuscation Obscure � Google Drive | JS Fiddle � https://docs.google.com/spreadsheet/ccc?key=0AlLVOoV_2dFtdFp4VmNNcURaN1BvNzdHbEowaHR0OFE&usp=drive_web#gid=1
// 2. Open script editor
// 3. Copy and paste (tested html/js code) into spreadsheet cell �A2�(row 2, col 1) � NOTE: MUST click INSIDE the cell prior to pasting; otherwise double-quote situation will break the scripts that follow
// 4. Press tab to escape above cell after pasting
// 5. Run obfuscate() function
// 6. Go inside spreadsheet cell �B2�(row 2, col 2) � NOTE: MUST again click INSIDE the cell prior to copying
// 7. Paste resulting code (now obfuscated) into target document for upload, production and public exposure
//
function obfuscate(id){ // Note: User must click inside the output cell, then cut/copy. Clicking outside the cell to highlight it before cut/copy produces double-double quotes ("").
 // var id="BDX7e",pre="!DOCTYPE",act="http://jsfiddle.net/BDX7e/13/"/*"http://jsfiddle.net/"+id*/,arr=UrlFetchApp.fetch(act).getContentText().split(pre),html="<"+pre+arr.pop();html=LibraryjsUtil.htmlCleanup(html);html=LibraryjsUtil.removeComments_html(html);html=LibraryjsUtil._scrape(html,"","","</html>")[1]+"</html>"; // html=LibraryjsUtil.removeComments_js(html); <-- breaks it // Remove html comments before js // *Issue* Remove js converts, say "http://www.example.com" to "http:" // Logger.log(html);
    var range=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Obfuscation").getRange(1,1,2,2),html=range.getCell(2,1).getValue(); // Insert code directly into spreadsheet
 // var range=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Obfuscation").getRange(1,1,2);range.getCell(1,1).setValue(id);range.getCell(2,1).setValue(html);
    var htmOb=mergeScriptSourceDataIntoHTML(html);//html=html.slice(-50000/*0,1000000* /);* /Logger.log(html.script_out);//tags=getTags(html); // // var temp=new Date()+"\nThis is a typical paragraph."
    var js=compileCode(htmOb.script/*_out*/);range.getCell(2,2).setValue(htmOb.main.split(htmOb.script).join("<script>"+js+"</script>")); // postToHost(js,["14RY9BYek5952NCVKCWyYRj4DYbK7-pwrtm_SgBgh1e0","1AouaKPmNY_-ugyHLraFR7wvPtUoTAJvMxnJgKTUtBA0"]); // URL https://docs.google.com/document/d/14RY9BYek5952NCVKCWyYRj4DYbK7-pwrtm_SgBgh1e0/edit
}
function mergeScriptSourceDataIntoHTML(str){str=str.replace(/<!--[\s\S]*?-->/g,"").replace(/<title[\s\S]*?>[\s\S]*?<\/title>/g,"").replace(/(\n\r|\n|\r)/gm,"<1br />").replace(/\t/g,"").replace(/\s+/g," ").replace(/\<1br \/>/gi,"\n"); // Immediately remove comments + white spaces from html
 // @param  {string} str � Original html doc as string with links (urls) embedded in <head> (for script, style and link tags)
 // @return {object}     � main : New html document as string with links (urls) fetched and merged to main html doc body as strings, script_out : Script tag inner html
    var purl=/ src[\s]*?=[\s]*?"[\S]*?"/g,patt={"link":/<link [\s\S]*?>/g,"style":/<style[\s\S]*?>[\s\S]*?<\/style>/g,/*"script_all"*/"script":/<script[\s\S]*?>[\s\S]*?<\/script>/g};//,"script_out":/<script[\s\S]*?[?! src][\s\S]*?>[\s\S]*?<\/script>/g,*/"script_url":/<script[\s\S]*? src[\s]*?=[\s]*?"[\S]*?"[\s\S]*?>[\s\S]*?<\/script>/g};
    var sTag,code,act,matches={},keys=Object.keys(patt),j,i=keys.length;while(i--){try{if(str.match(patt[keys[i]])){matches[keys[i]]=str.match(patt[keys[i]])}}catch(e){Logger.log(e.message)}}; // for(var j in patt){matches[i]=str.match(patt[i])} produces weird 'escapes' patterns so we avoid it // Replace this following line with negated string ?!. Update: Can not get reg exp to work. Will, instead, use last element in <script> tag match array as script_out // Search Term: regular expression not a string // References: http://stackoverflow.com/questions/406230/regular-expression-to-match-string-not-containing-a-word http://w3schools.com/jsref/jsref_regexp_nfollow_not.asp // i=matches.script_all.length;while(i--){j=matches.script_url.length;while(j--){if(matches.script_url[i].indexOf(matches.script_all[j]==-1)){matches.script_out=matches.script_all[i];sTag=matches.script_out.match(/<script[\s\S]*?>/)[0];break;}}} // Find matches.script_out // Id matches.script_out[] by comparing elements of matches.script_all[] with matches.script_url[] // Pseudocode: matches.script_out=(matches.script_all!=matches.script_url);
    i=matches.script/*_url*/.reverse().length;/*while(i---1){act=matches.script/*_url* /[i].match(purl)[0].split('"')[1];code=UrlFetchApp.fetch(act).getContentText().replace(/\/\*[\s\S]*?\*\//g,""); // Fetch matches.script_url and merge into matches.script_out // Iteratively append source code to matches.script_out // Fetch source code from urls of matches.script_url // Pseudocode: while(i--){matches.script_out+=fetch(matches.script_url[i])}
        sTag=matches.script/*_out* /[0].match(/<script[\s\S]*?>/);str=str.split(matches.script/*_out* /[0]).join(sTag+code+(matches.script/*_out* /[0].split(sTag).join(""))); // Replace script_out inner html in main string
        matches.script/*_out* /[0]=sTag+code+(matches.script/*_out* /[0].split(sTag).join("")); // Update script_out (now matches.script[0]) definition as reference variable // Logger.log(matches.script_out.length);
        str=str.split(matches.script/*_url* /[i]).join("");} Return minimum script (immediately) because Closure Compiler capacity limit.*/ // Delete script_url (now matches.script[0]) in main string
    return {main:str,script/*_out*/:matches.script/*_out*/[0]}}
function compileCode(str){ // Compiler sequence: 1. http://closure-compiler.appspot.com/compile 2. http://www.daftlogic.com/includes/ajax/jsobs.php // Test/reverse/beautify: http://jsbeautifier.org/ // Other compilers (not used): html:http://www.willpeavy.com/minifier/ | http://htmlobfuscator.com/ | http://colddata.com/developers/online_tools/obfuscator.shtml#obfuscator_view
 // @param  {string} str � Original html doc as string with links (urls) embedded in <head> (for script, style and link tags)
 // @return {string} out � Encoded javascript; after run through a series of encoders/obfuscators; needs to be inserted into an html script tag
    var out=str.replace(/<script[\s\S]*?>/g,"").split("</script>").join("");out=compilerClosure(out);out=compilerDaftLogic(out);return out}
function compilerClosure(js){ // Reference: http://closure-compiler.appspot.com/home // https://developers.google.com/closure/compiler/docs/api-tutorial3 // https://developers.google.com/closure/compiler/docs/compilation_levels?csw=1 // js="function add(){var x='hello',y='world';return x+' '+y}";
    var payload={"js_code":js,/*"code_url":codeUrl,*/"compilation_level":/*"WHITESPACE_ONLY"*/"SIMPLE_OPTIMIZATIONS"/*"ADVANCED_OPTIMIZATIONS"*/,"output_format":"text","output_info":"compiled_code"},headers={"Content-type":"application/x-www-form-urlencoded"}
   ,act="http://closure-compiler.appspot.com/compile",params={"method":"post","headers":headers,"payload":payload},out=UrlFetchApp.fetch(act,params).getContentText();return out;}
function compilerDaftLogic(js){ // Reference: http://www.daftlogic.com/projects-online-javascript-obfuscator.htm
    var act="http://www.daftlogic.com/includes/ajax/jsobs.php",payload={"input":js/*,"rn":682*/},headers={"Content-type":"application/x-www-form-urlencoded"} // Online form appears to generate a random 6-digit integer as form parameter "rn" but with no bearing on final result
   ,params={"method":"post","headers":headers,"payload":payload},out=UrlFetchApp.fetch(act,params).getContentText();return out;}
// function postToHost(str,arr){ // Max character count is approx 1 million per document. Therefore, we split the file into multiple docs and upload individually. Then html page fetches via <script src="url">
 // @param  {string} str � String of compiled/encoded javascript
 // @param  {array } arr � Array[] of document IDs {strings} to post/host javascript
 // @return {void  }     � Uploads data as string to all documents specified in incoming array parameter
 // var i,start=0,end=0,len=arr.length,unit=str.length/len;for(i=0;i<len;i++){Logger.log(str);end=str.indexOf(str.match(/function[\s]*?([\s\S]*?)[\s]*?{[\s\S]*?}/)[0],start+unit*(i+1));Logger.log("start: "+start+"; end: "+end);DocumentApp.openById(arr[i]).getBody().appendParagraph(str.slice(start,end));start=end;}return}
// function getTags(str){
 // @param  {string} str � Original html doc as string with links (urls) embedded in <head> (for script, style and link tags)
 // @return {object} matches � {link:array[] of <link> tags, style:array[] of <style> tags, script_all:array[] comprehensive array of all <script> tags, script_url:array[] of <script> tags containing src attribute containing url, script_out: string of <script> tag with inner javascript}
 // var purl=/ src[\s]*?=[\s]*?"[\S]*?"/g,patt={"link":/<link [\s\S]*?>/g,"style":/<style[\s\S]*?>[\s\S]*?<\/style>/g,"script_all":/<script[\s\S]*?>[\s\S]*?<\/script>/g,"script_url":/<script[\s\S]*? src[\s]*?=[\s]*?"[\S]*?"[\s\S]*?>[\s\S]*?<\/script>/g};
 // var sTag,matches={},keys=Object.keys(patt),i=keys.length;while(i--){/*Logger.log(keys[i]);*/matches[keys[i]]=str.match(patt[keys[i]])}; // for(var j in patt){matches[i]=str.match(patt[i])} produces wierd 'escapes' patterns so we avoid it
 // i=matches.script_all.length;while(i--){if(matches.script_url.indexOf(matches.script_all[i]==-1)){matches.script_out=matches.script_all[i];sTag=matches.script_out.match(/<script[\s\S]*?>/)[0];break;}} // Find matches.script_out // Pseudocode: matches.script_out=(matches.script_all!=matches.script_url); // Id matches.script_out[] by comparing elements of matches.script_all[] with matches.script_url[]
 // return matches}
// ---------------------------- UTILITIES ----------------------------
/**
 * Retrieves all the rows in the active spreadsheet that contain data and logs the
 * values for each row.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function readRows() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  for (var i = 0; i <= numRows - 1; i++) {
    var row = values[i];
    Logger.log(row);
  }
};

/**
 * Adds a custom menu to the active spreadsheet, containing a single menu item
 * for invoking the readRows() function specified above.
 * The onOpen() function, when defined, is automatically invoked whenever the
 * spreadsheet is opened.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Read Data",
    functionName : "readRows"
  }];
  sheet.addMenu("Script Center Menu", entries);
};

