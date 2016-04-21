function postUrl( pageToScrape ){ // Reference: fxn postUrl in this project — copied from postUrl fxn in scrapeRemax project.
  // PURPOSE: Executes HTTP POST request to server in order to scrape the response.
  var SHEET_NAME       = "Post";
  var MY_METHOD        = "POST";
  var MY_CONTENT_TYPE  = "application/x-www-form-urlencoded"; // "application/x-www-form-urlencoded; charset=utf-8";
  var PARAMS_START_ROW = 2;
  var PARAMS_START_COL = 1;
  var URL_ROW          = 1;
  var URL_COL          = 2;
  var PARAM_NAME       = "page"
  var paramValue       = pageToScrape;
  //
  var ss    = SpreadsheetApp.getActiveSpreadsheet(); // Initializes spreadsheet variable.
  var sheet = ss.getSheetByName( SHEET_NAME ); // Initializes sheet variable.
  var range = sheet.getRange( 1, 1, sheet.getMaxRows(), sheet.getMaxColumns() ); // Initializes range variable; sets to max.
  //
  var actionUrl = range.getCell( URL_ROW, URL_COL ).getValue(); var myHeaders = {};
  var myPayload = PARAM_NAME + "=" + paramValue; // Initialize payload string map.
  var row       = PARAMS_START_ROW; // Initialize row variable to first row of PARAMETER map.
  var col       = PARAMS_START_COL; // Initialize row variable to first col of PARAMETER map.
  var key       = range.getCell( row, col ); // Activates the target data cell for the parameter KEY.
  var value     = range.getCell( row, col+1 ); // Activates the target data cell for the parameter VALUE.
  while(key.getValue().length > 0){ // Iterate over PARAMETER variables; check for end of table.
    myPayload  += "&"+key.getValue()+"="+value.getValue(); row++; // Add parameter/value pair to string map; Increment row; prepare to loop.
    key         = range.getCell( row, col   ); // Updates KEY for looping.
    value       = range.getCell( row, col+1 ); // Updates VALUE for looping.
  }
  //
  var advancedArgs = { // Initialize advancedArgs map.
    method      : MY_METHOD,
    payload     : myPayload,
    contentType : MY_CONTENT_TYPE
  };
  var response     = UrlFetchApp.fetch( actionUrl, advancedArgs );
  var responseText = response.getContentText(); // Get response text; convert to string variable. // Also avail: response.getResponseCode()
  return responseText;
}
function getColNum( sheet, row, target ){ // In a given sheet, return the column number of a column header containing a given string.
	{ // Variables
	// @ sheet     = the sheet variable to be searched.
	// @ row       = the row number to search. Will equal “1” when searching on the first row (“column header”)
	// @ target    = the target string variable to match.
	}
	var i          = 0; // Initialize variable
	var range      = sheet.getDataRange(); // var ss = SpreadsheetApp.getActiveSpreadsheet(); // var sheet = ss.getSheetByName( sheetName );
	var countCols  = range.getWidth();
	var foundMatch = false;
	var colValue   = "";
	if( target.length > 0 ){
		while( !foundMatch && i<countCols ){ i++; // Loop over columns provided no match is found and col is still within data range
			colValue = range.getCell( row, i ).getValue(); // Fetch target string to compare
			foundMatch = (colValue==target); // Test for match
		}
	} else{return false}
	if(foundMatch){return i} else{return false} // Return column number if match is found, false if no match.
}
function updateRangesData(){ // Updates ranges with the data range within a set of spreadsheets and sheets.
	for(var i=0;i<SS_KEY.length;i++){for(var j=0;j<SHEET_NAME[i].length;j++){range[i][j] = sheet[i][j].getDataRange()}} // i: All spreadsheets(ss) in project; j: All sheets in ss[i]
	range[1][0] = sheet[1][0].getRange( 1, 1, sheet[1][0].getMaxRows(), sheet[1][0].getMaxColumns() ); // Define exceptions, gets max range in “tracker” sheet
	return range;
}
function updateRangesMax(){ // Updates ranges within a set of spreadsheets and sheets — using max ranges instead of data ranges.
	for(var i=0;i<SHEET_NAME[1].length;i++){range[1][i] = sheet[1][i].getRange( 1, 1, sheet[1][i].getMaxRows(), sheet[1][i].getMaxColumns())}; // Gets max range for second (“to”) ss only.
	return range;
}
function updateRangesCount(numRow,numCol){for(var i=0;i<SHEET_NAME[1].length;i++){range[1][i]=sheet[1][i].getRange(1,1,numRows,numCols)};return range;} // Updates ranges within a set of spreadsheets and sheets — with a specific (e.g. counted) number of rows and columns. // Gets range for second (“to”) ss only.
function showAll(){var db=ScriptDb.getMyDb();var results=db.query({});while(results.hasNext()){var r=results.next();Logger.log(/*Utilities.jsonStringify*/JSON.stringify(r));}} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function deleteAll(){ // Delete all items from ScriptDb database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
/*  var db=ScriptDb.getMyDb();while(true){
        var result=db.query({}); // get everything, up to limit
        if(result.getSize()==0){break;}
        while(result.hasNext()){db.remove(result.next());}} */
    var db=ScriptDb.getMyDb(),results=db.query({});while(results.hasNext()){r=results.next();Logger.log(JSON.stringify(r));db.remove(r.next());}}