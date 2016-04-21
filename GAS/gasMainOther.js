function main_lp(){} // http://www.lpsasap.com/ // Regional auction data. Weekly: CA>8k, AZ~2k, <1k all other states; one scrape page per state; captcha // id:ruthmoffett@suremail.info pw:teleworm1
function main_hubzu(){} // Hubzu // https://www.hubzu.com/portal/searchResult?listingType=AUCN&name=Auction%20Sales
function main_fr(){ // Foreclosure Radar
	function calc   (){
		{ // Parameters
			{ // Column headers
			var colsAdded    = 0;
			var LABEL        = new Array();
				LABEL[1]     = "Price";                                           colsAdded++; // New column	
				LABEL[2]     = "Spread";                                          colsAdded++; // New column
				LABEL[3]     = "Pct";                                             colsAdded++; // New column
				LABEL[4]     = "EstimatedValue";                                               // Col AA
				LABEL[5]     = "EstimatedTotalLoanBalance";                                    // Col AB
				LABEL[6]     = "EstimatedBid";                                                 // Col AK
				LABEL[7]     = "OpeningBid";                                                   // Col AL
				LABEL[8]     = "EstimatedLoanPosition";                                        // Col AN
			}
			{ // Initializations
			var val          = new Array();
			var labColNum    = new Array();
			var PREFIX       = "Copy of ";
			var ROW_START    = 2;
			var PCT_MAX      = 75;
			var startDelete  = false;
			var rowsToInsert = 0;
			var colsToInsert = 0;
			var row          = ROW_START;
			}
			{ // Clip columns
			var INDEX        = new Array();                                                    // For clipping columns. The starting point for each clipped segment.
			var SPAN         = new Array();                                                    // For clipping columns. The number of columns to clip for each clipped segment.
				INDEX[1]     = 41;
				SPAN[1]      = 13;
				INDEX[2]     = 39;
				SPAN[2]      = 1;
				INDEX[3]     = 36;
				SPAN[3]      = 1;
				INDEX[4]     = 29;
				SPAN[4]      = 4;
				INDEX[5]     = 9;
				SPAN[5]      = 11;
				INDEX[6]     = 2;
				SPAN[6]      = 2;
			}
		}
		{ // 1. Copy & sheet/range
			var countRows = range[0][0].getHeight();                                           // Count rows
			var countCols = range[0][0].getWidth();                                            // Count columns
			updateRangesCount( countRows, (countCols+colsAdded) );                             // Update ranges in second ss with counted rows and columns
			sheet[0][0].copyTo(ss[1]);                                                         // Copies input ss to destination ss
			var newSheetName            = PREFIX + sheet[0][0].getName();                      // Construct name of new sheet
			sheet[1][sheet[1].length]   = ss[1].getSheetByName(newSheetName);                  // Define new sheet
			range[1][sheet[1].length-1] = sheet[1][sheet[1].length-1].getDataRange();          // Define new range
			for(var i=1;i<=3;i++){
				rowsToInsert = countRows - sheet[1][i].getMaxRows();                           // Calculates row deficit
				if(rowsToInsert > 0){sheet[1][i].insertRowsAfter(1,rowsToInsert)}              // Inserts rows if necessary
				if(i<3){range[1][SHEET_NAME[1].length].copyTo(range[1][i])}}                   // Copy sheet range to new sheet, “In” and “Calc” pages
			ss[1].setActiveSheet(sheet[1][sheet[1].length-1]);ss[1].deleteActiveSheet();       // Delete imported sheet after preparing sheet for deletion
			range[1][2] = sheet[1][2].getDataRange();                                          // Define range
			range[1][2] = sheet[1][2].getRange(1,1,countRows,(countCols+colsAdded));           // Add new columns to range
			for(i=1;i<=colsAdded;i++){range[1][2].getCell(1,(countCols+i)).setValue(LABEL[i])} // Label new columns
			for(i=1;i<LABEL.length;i++){labColNum[i] = getColNum(sheet[1][2],1,LABEL[i])}      // Fetch column numbers
		}
		{ // 2. Calculate & sort
			for(var row=ROW_START;row<=countRows;row++){                                       // Loop over rows.
				for(i=1+colsAdded;i<LABEL.length;i++){val[i] = range[1][2].getCell(row,labColNum[i]).getValue()} // Fetch variables
				if(!(val[colsAdded+5] > 1)){                                                   // Excludes junior lien positions. Future refinements might want to include jr. lien pos for processing
					if(val[colsAdded+4] > 0){val[1] = Math.round(val[colsAdded+4])}            // Price = Opening bid
					else{                    val[1] = Math.round(val[colsAdded+3])}}           // Price = Estimated bid
				else{val[1] = Math.round(val[colsAdded+2])}                                    // At this time, EstimatedTotalLoanBalance is a figure of marginal utility
				val[2]      = Math.round(val[colsAdded+1] - val[1]);                           // Spread
				val[3]      = Math.round(100*val[1]/val[colsAdded+1]);                         // Spread pct
				for(i=1;i<=colsAdded;i++){range[1][2].getCell(row,countCols+i).setValue(val[i])}     // Writes output
			}	sheet[1][2].getRange(2,1,countRows,(countCols+colsAdded)).sort(countCols+colsAdded); // Sorts rows
		}
		{ // 3. Copy & trim
			colsToInsert = countCols + colsAdded - sheet[1][3].getMaxColumns();                // Calculates column deficit
			if(colsToInsert > 0){sheet[1][3].insertColumns(1,colsToInsert)}                    // Inserts columns if necessary
			updateRangesCount(countRows,(countCols+colsAdded));                                // Update ranges in second ss with counted rows and columns
			range[1][2].copyTo(range[1][3]);                                                   // Copy data from Calc to Prep
			var colPct = getColNum(sheet[1][3], 1, LABEL[3]);                                  // Fetch column number of key variable
			row = ROW_START; countRows = range[1][3].getHeight();                              // Re-initialize row start // Re-calculate row count
			while(!startDelete){startDelete=(range[1][3].getCell(row,colPct).getValue()>PCT_MAX);row++;} // Test/determine trigger row
			row--;sheet[1][3].deleteRows(row,(countRows-row));                                 // Trim rows — deletes rows exceeding cutoff
		//	for(i=1;i<INDEX.length;i++){sheet[1][3].deleteColumns(INDEX[i],SPAN[i])}           // Trim columns
		}
	}
	function formatA(){
		{ // 1. Set parameters.
			var SS_NAME     = new Array();
			SS_NAME[0]      = "In";
			SS_NAME[1]      = "Calc";
			SS_NAME[2]      = "Prep";
			var COLHEADER   = new Array();
			COLHEADER[1]    = "LinkZillow";
			COLHEADER[2]    = "LinkYahoo";
			COLHEADER[3]    = "Type";
			COLHEADER[4]    = "Bed";
			COLHEADER[5]    = "Bath";
			COLHEADER[6]    = "Sqft";
			COLHEADER[7]    = "Lot";
			COLHEADER[8]    = "Year";
			COLHEADER[9]    = "LinkZillowDetails";
			COLHEADER[10]   = "EstZillow";
			COLHEADER[11]   = "LinkEppraisal";
			COLHEADER[12]   = "EstEppraisal";
			COLHEADER[13]   = "LastSoldDate";
			COLHEADER[14]   = "LastSoldPrice";
			COLHEADER[15]   = "TaxAssessedValue";
			var i           = 0;
			var CUTOFF      = 100;
			var ROW_START   = 2;
			var COLS_ADDED  = 15;
			var COL_A       = 1;
			var COL_A_MATCH = "Auction";
			var type_A      = "";
			var deleteRow   = new Boolean();
		}
		{ // 2. Copy range.
			var ss = SpreadsheetApp.getActiveSpreadsheet(); // Initializes spreadsheet.
			ss.setActiveSheet( ss.getSheetByName( SS_NAME[1] ) ); // Sets active sheet.
			ss.duplicateActiveSheet(); // Copies active sheet (input) to process for output.
		}
		{ // 3. Define sheets and ranges.
			var sheet = ss.getSheets()[2];
			sheet.setName( SS_NAME[2] );
			var range = sheet.getDataRange();
			var countRows = range.getHeight();
			var countCols = range.getWidth();
			
			range = sheet.getRange( 1, 1, countRows, (countCols + COLS_ADDED) );
			for(i=1;i<COLHEADER.length;i++){range.getCell(1,(countCols+i)).setValue(COLHEADER[i])} // Names column header
		}
		{ // 4. Trim rows & columns
			var row = ROW_START;
			var spreadPct = range.getCell( row, countCols ).getValue();          // Fetch initial decision variable.
		/*	while(spreadPct <= CUTOFF){                                          // Loop over rows.
				deleteRow = false;                                               // Resets decision variable.
				type_A = range.getCell( row, COL_A ).getValue();                 // Fetch decision value.
				deleteRow = deleteRow || (type_A != COL_A_MATCH);                // Apply boolean logic for decisioning.
				if(deleteRow){sheet.deleteRow(row);row--;}                       // Deletes row. // Keep an accurate value on the row count to stay in range for below calculating rows to delete. 
				row++;
				spreadPct = range.getCell( row, countCols ).getValue();}*/
			countRows = sheet.getDataRange().getHeight();
			sheet.deleteRows(row,(countRows-row+1));                             // Deletes rows exceeding cutoff.
			for(i=1;i<INDEX.length;i++){sheet.deleteColumns(INDEX[i],SPAN[i])}}} // Trim columns.
	function append (){
	//
	// PURPOSE: The purpose of this function is to append the URL links to the output sheet for each situs (subject property).
	// URL links include Zillow, Yahoo and Eppraisal.
	//
		// 1. Example and test variables.
		// var sa = "2056 154th ave se"; // sa = street address
		// var csz = "bellevue, wa"; // csz = (city + state) OR zip
		//
		// 2. Define parameters.
		// a. Stage I — Zillow URL
		var PREFIX         = "http://www.zillow.com/homes/";
		var SUFFIX         = "_rb/";
		var THIS_C         = " ";
		var WITH_C         = "-";
		// b. Stage II — Yahoo URL
		var STEM = "http://realestate.yahoo.com/Homevalues/result.html";
		var WITH_A         = "+";
		var THIS_A_01      = ", ";
		var THIS_A_02      = ",";
		var THIS_A_03      = " ";
		var THIS_A_04      = "++";
		// c. Stage III — Yahoo scrape
		var THIS_B_01      = "$";
		var THIS_B_02      = ",";
		var WITH_B         = "";
		var MARKER_START_A = ">";
		var MARKER_END_A   = "<";
		var MARKER_START_B = "href=\"";
		var MARKER_END_B   = "\"";
		var MARKER_START_C = "<dd>";
		var MARKER_END_C   = "<";
		var MARKER_01      = "Residence: ";
		var MARKER_02      = "Beds: ";
		var MARKER_03      = "Bath: ";
		var MARKER_04      = "Square Feet: ";
		var MARKER_05      = "Lot Size: ";
		var MARKER_06      = "Year Built: ";
		var MARKER_07      = "\"estimates\"";
		var MARKER_11      = "Last Sold Date:";
		var MARKER_12      = "Last Sold Price:";
		var MARKER_13      = "Tax assessed value:";
	// d. Sheets and ranges
		var SHEET_NAME     = "Prep";
		var ROW_START      = 2;
		var COL_START      = 24;
		var COL_STREET     = 3;
		var COL_CITY       = 4;
		var COL_STATE      = 5;
		var COL_ZIP        = 6;
	// e. Initializations
		var row            = ROW_START;
		var col            = COL_START;
		var token          = "";
		var action         = "";
		var responseText   = "";
		var sa             = "";
		var city           = "";
		var state          = "";
		var zip            = "";
	//
	// 3. Define spreadsheet variables
		var ss = SpreadsheetApp.getActiveSpreadsheet(); // Initializes spreadsheet.
		var sheet = ss.getSheetByName( SHEET_NAME );
		var range = sheet.getDataRange();
		var countRows = range.getHeight();
		var countCols = range.getWidth(); Logger.log( "countCols: " + countCols );
	//
	// 4. Create loop.
		while( row <= countRows ){
			// Pickup loop variables and arguments.
			sa = range.getCell( row, COL_STREET ).getValue();
			city = range.getCell( row, COL_CITY ).getValue();
			state = range.getCell( row, COL_STATE ).getValue();
			zip = range.getCell( row, COL_ZIP ).getValue();
			if( zip > 9999 ){csz = zip} // Uses city and state fields if zip field is empty or contains a leading zero.
			else{csz = city + ", " + state}
	//
	// *******************************************************************************************************************
	// *******************************************************************************************************************
	// **                                                                                                               **
	// **                                             STAGE I — Zillow URL                                              **
	// **                                                                                                               **
	// *******************************************************************************************************************
	// *******************************************************************************************************************
	// 
		// PURPOSE: Generate the URL for the indicated resource given the physical address.
		//
		// 1. Generate URL.
		action  = "";
		action += PREFIX;
		action += sa;
		action += ", ";
		action += csz;
		action += SUFFIX;
		// Encode spaces.
		while( action.indexOf( THIS_C ) >= 0 ){
		  action = action.replace( THIS_C, WITH_C );
		}
		//
		// 2. Return.
		// return action;
		Logger.log( "urlZillow: " + action );
		  //
		  { // “Write out” code block.
		  out = range.getCell( row, col ); // Update output cell.
		  out.setValue( action ); // Write to output cell.
		  col++; // Increments column
		  }
		  //
	//
	// *******************************************************************************************************************
	// *******************************************************************************************************************
	// **                                                                                                               **
	// **                                             STAGE II — Yahoo URL                                              **
	// **                                                                                                               **
	// *******************************************************************************************************************
	// *******************************************************************************************************************
		//
		// 1. Construct URL.
		action  = "";
		action += STEM;
		action += "?sa=";
		action += sa;
		action += "&csz=";
		action += csz;
		action += "&search=Search";
		//
		// 2. Make substitutions.
		while( action.indexOf( THIS_A_01 ) >= 0 ){ // For every occurence
		  action = action.replace( THIS_A_01, WITH_A ); // substitute string.
		} // Logger.log( "action: " + action );
		while( action.indexOf( THIS_A_02 ) >= 0 ){ // For every occurence
		  action = action.replace( THIS_A_02, WITH_A ); // substitute string.
		} // Logger.log( "action: " + action );
		while( action.indexOf( THIS_A_03 ) >= 0 ){ // For every occurence
		  action = action.replace( THIS_A_03, WITH_A ); // substitute string.
		} // Logger.log( "action: " + action );
		while( action.indexOf( THIS_A_04 ) >= 0 ){ // For every occurence
		  action = action.replace( THIS_A_04, WITH_A ); // substitute string.
		} // Logger.log( "action: " + action );
		//
		Logger.log("urlYahoo: " + action); // Report product.
		  //
		  { // “Write out” code block.
		  out = range.getCell( row, col ); // Update output cell.
		  out.setValue( action ); // Write to output cell.
		  col++; // Increments column
		  }
		  //
		//
	// *******************************************************************************************************************
	// *******************************************************************************************************************
	// **                                                                                                               **
	// **                                           STAGE III — Scrape Yahoo                                            **
	// **                                                                                                               **
	// *******************************************************************************************************************
	// *******************************************************************************************************************
	//
		// 4. Fetch URL (HTTP GET).
		var response = UrlFetchApp.fetch( action ); // Fetch the URL of the subject. // var responseCode = response.getResponseCode(); // Gets the response code to determine if the given id produces a valid record. // Logger.log( "responseCode: " + responseCode ); // Logs the currently active variable.
		responseText = response.getContentText(); // Get response text; convert to string variable. // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
		//
		// 5. Scrape.
		if( responseText.indexOf( MARKER_01 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
		  responseText = responseText.slice( responseText.indexOf( MARKER_01 ) ); // Grabs string after the prefix (marker). // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
		  responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker). // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
		  token = ""; // Resets the token variable. In case scrape in next statement produces no result.
		  token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
		  while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_01, WITH_B ); // substitute string.
		  }
		  while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_02, WITH_B ); // substitute string.
		  }
		  Logger.log( "type: " + token ); // Logs the currently active variable.
		  {
		  // “Write out” code block.
		  out = range.getCell( row, col ); // Update output cell.
		  out.setValue( token ); // Write to output cell.
		  }
		}
		col++; // Increments column
		  //
		if( responseText.indexOf( MARKER_02 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
		  responseText = responseText.slice( responseText.indexOf( MARKER_02 ) ); // Grabs string after the prefix (marker). // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
		  responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker). // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
		  token = ""; // Resets the token variable. In case scrape in next statement produces no result.
		  token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
		  while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_01, WITH_B ); // substitute string.
		  }
		  while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_02, WITH_B ); // substitute string.
		  }
		  Logger.log( "beds: " + token ); // Logs the currently active variable.
		  //
		  { // “Write out” code block.
		  out = range.getCell( row, col ); // Update output cell.
		  out.setValue( token ); // Write to output cell.
		  }
		}
		col++; // Increments column
		  //
		if( responseText.indexOf( MARKER_03 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
		  responseText = responseText.slice( responseText.indexOf( MARKER_03 ) ); // Grabs string after the prefix (marker).
		  responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
		  token = ""; // Resets the token variable. In case scrape in next statement produces no result.
		  token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
		  while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_01, WITH_B ); // substitute string.
		  }
		  while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_02, WITH_B ); // substitute string.
		  }
		  Logger.log( "bath: " + token ); // Logs the currently active variable.
		  //
		  { // “Write out” code block.
		  out = range.getCell( row, col ); // Update output cell.
		  out.setValue( token ); // Write to output cell.
		  }
		}
		col++; // Increments column
		  //
		if( responseText.indexOf( MARKER_04 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
		  responseText = responseText.slice( responseText.indexOf( MARKER_04 ) ); // Grabs string after the prefix (marker).
		  responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
		  token = ""; // Resets the token variable. In case scrape in next statement produces no result.
		  token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
		  while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_01, WITH_B ); // substitute string.
		  }
		  while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_02, WITH_B ); // substitute string.
		  }
		  Logger.log( "sft: " + token ); // Logs the currently active variable.
		  //
		  { // “Write out” code block.
		  out = range.getCell( row, col ); // Update output cell.
		  out.setValue( token ); // Write to output cell.
		  }
		}
		col++; // Increments column
		  //
		if( responseText.indexOf( MARKER_05 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
		  responseText = responseText.slice( responseText.indexOf( MARKER_05 ) ); // Grabs string after the prefix (marker).
		  responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
		  token = ""; // Resets the token variable. In case scrape in next statement produces no result.
		  token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
		  while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_01, WITH_B ); // substitute string.
		  }
		  while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_02, WITH_B ); // substitute string.
		  }
		  Logger.log( "lot: " + token ); // Logs the currently active variable.
		  //
		  { // “Write out” code block.
		  out = range.getCell( row, col ); // Update output cell.
		  out.setValue( token ); // Write to output cell.
		  }
		}
		col++; // Increments column
		  //
		if( responseText.indexOf( MARKER_06 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
		  responseText = responseText.slice( responseText.indexOf( MARKER_06 ) ); // Grabs string after the prefix (marker).
		  responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
		  token = ""; // Resets the token variable. In case scrape in next statement produces no result.
		  token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
		  while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_01, WITH_B ); // substitute string.
		  }
		  while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_02, WITH_B ); // substitute string.
		  }
		  Logger.log( "yr: " + token ); // Logs the currently active variable.
		  //
		  { // “Write out” code block.
		  out = range.getCell( row, col ); // Update output cell.
		  out.setValue( token ); // Write to output cell.
		  }
		}
		col++; // Increments column
		  //
		if( responseText.indexOf( MARKER_07 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
		  responseText = responseText.slice( responseText.indexOf( MARKER_07 ) ); // Grabs string after the prefix (marker).
		  responseText = responseText.slice( ( responseText.indexOf( MARKER_START_B ) + MARKER_START_B.length ) ); // Grabs string after the prefix (marker).
		  token = ""; // Resets the token variable. In case scrape in next statement produces no result.
		  token = responseText.slice( 0, responseText.indexOf( MARKER_END_B ) ); // Isolates the target string variable.
		  while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_01, WITH_B ); // substitute string.
		  }
		  while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_02, WITH_B ); // substitute string.
		  }
		  Logger.log( "urlZillow: " + token ); // Logs the currently active variable.
		  //
		  { // “Write out” code block.
		  out = range.getCell( row, col ); // Update output cell.
		  out.setValue( token ); // Write to output cell.
		  }
		}
		col++; // Increments column
		  //
		if( responseText.indexOf( MARKER_START_A ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
		  // responseText = responseText.slice( responseText.indexOf( MARKER_08 ) ); // Grabs string after the prefix (marker).
		  responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
		  token = ""; // Resets the token variable. In case scrape in next statement produces no result.
		  token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
		  while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_01, WITH_B ); // substitute string.
		  }
		  while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_02, WITH_B ); // substitute string.
		  }
		  Logger.log( "estZillow: " + token ); // Logs the currently active variable.
		  //
		  { // “Write out” code block.
		  out = range.getCell( row, col ); // Update output cell.
		  out.setValue( token ); // Write to output cell.
		  }
		}
		col++; // Increments column
		  //
		if( responseText.indexOf( MARKER_START_B ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
		  // responseText = responseText.slice( responseText.indexOf( MARKER_09 ) ); // Grabs string after the prefix (marker).
		  responseText = responseText.slice( ( responseText.indexOf( MARKER_START_B ) + MARKER_START_B.length ) ); // Grabs string after the prefix (marker).
		  token = ""; // Resets the token variable. In case scrape in next statement yields no product.
		  token = responseText.slice( 0, responseText.indexOf( MARKER_END_B ) ); // Isolates the target string variable.
		  while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_01, WITH_B ); // substitute string.
		  }
		  while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_02, WITH_B ); // substitute string.
		  }
		  Logger.log( "urlEppraisal: " + token ); // Logs the currently active variable.
		  //
		  { // “Write out” code block.
		  out = range.getCell( row, col ); // Update output cell.
		  out.setValue( token ); // Write to output cell.
		  }
		}
		col++; // Increments column
		  //
		if( responseText.indexOf( MARKER_START_A ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
		  // responseText = responseText.slice( responseText.indexOf( MARKER_10 ) ); // Grabs string after the prefix (marker).
		  responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
		  token = ""; // Resets the token variable. In case scrape in next statement yields no product.
		  token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
		  while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_01, WITH_B ); // substitute string.
		  }
		  while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_02, WITH_B ); // substitute string.
		  }
		  Logger.log( "estEppraisal: " + token ); // Logs the currently active variable.
		  //
		  { // “Write out” code block.
		  out = range.getCell( row, col ); // Update output cell.
		  out.setValue( token ); // Write to output cell.
		  }
		}
		col++; // Increments column
		  //
		if( responseText.indexOf( MARKER_11 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
		  responseText = responseText.slice( responseText.indexOf( MARKER_11 ) ); // Grabs string after the prefix (marker).
		  responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
		  token = ""; // Resets the token variable. In case scrape in next statement yields no product.
		  token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
		  while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_01, WITH_B ); // substitute string.
		  }
		  while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_02, WITH_B ); // substitute string.
		  }
		  Logger.log( "soldDate: " + token ); // Logs the currently active variable.
		  //
		  { // “Write out” code block.
		  out = range.getCell( row, col ); // Update output cell.
		  out.setValue( token ); // Write to output cell.
		  }
		}
		col++; // Increments column
		  //
		if( responseText.indexOf( MARKER_12 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
		  responseText = responseText.slice( responseText.indexOf( MARKER_12 ) ); // Grabs string after the prefix (marker).
		  responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
		  token = ""; // Resets the token variable. In case scrape in next statement yields no product.
		  token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
		  while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_01, WITH_B ); // substitute string.
		  }
		  while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_02, WITH_B ); // substitute string.
		  }
		  Logger.log( "soldPrice: " + token ); // Logs the currently active variable.
		  //
		  { // “Write out” code block.
		  out = range.getCell( row, col ); // Update output cell.
		  out.setValue( token ); // Write to output cell.
		  }
		}
		col++; // Increments column
		  //
		if( responseText.indexOf( MARKER_13 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
		  responseText = responseText.slice( responseText.indexOf( MARKER_13 ) ); // Grabs string after the prefix (marker).
		  responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
		  token = ""; // Resets the token variable. In case scrape in next statement yields no product.
		  token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
		  while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_01, WITH_B ); // substitute string.
		  }
		  while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
			token = token.replace( THIS_B_02, WITH_B ); // substitute string.
		  }
		  Logger.log( "taxVal: " + token ); // Logs the currently active variable.
		  //
		  { // “Write out” code block.
		  out = range.getCell( row, col ); // Update output cell.
		  out.setValue( token ); // Write to output cell.
		  }
		}
		col++; // Increments column
		  //
	// --- *** ----
	// Carriage return = Increment row + Reset column
		row++;
		col = COL_START;
	  } // Return to top of while loop.
	}
	function formatB(){
	  //
	  // 1. Set parameters.
	  var SS_NAME         = new Array();
	  SS_NAME[0]          = "In";
	  SS_NAME[1]          = "Calc";
	  SS_NAME[2]          = "Prep";
	  SS_NAME[3]          = "Out";
	  var COLHEADER       = new Array();
	  COLHEADER[0]        = "";
	  COLHEADER[1]        = "Number_and_street";
	  COLHEADER[2]        = "City";
	  COLHEADER[3]        = "State";
	  COLHEADER[4]        = "Zip";
	  COLHEADER[5]        = "County";
	  COLHEADER[6]        = "Sale_year";
	  COLHEADER[7]        = "Sale_month";
	  COLHEADER[8]        = "Sale_day";
	  COLHEADER[9]        = "Sale_hour";
	  COLHEADER[10]       = "Sale_location";
	  COLHEADER[11]       = "Opening_bid";
	  COLHEADER[12]       = "Estimated_opening_bid";
	  COLHEADER[13]       = "Estimated_lien_position";
	  COLHEADER[14]       = "Estimated_total_encumbrance";
	  COLHEADER[15]       = "Yahoo_link";
	  COLHEADER[16]       = "Zillow_link";
	  COLHEADER[17]       = "Eppraisal_link";
	  COLHEADER[18]       = "Zillow_details_link";
	  COLHEADER[19]       = "Prop_type";
	  COLHEADER[20]       = "Beds";
	  COLHEADER[21]       = "Baths";
	  COLHEADER[22]       = "Sq_feet";
	  COLHEADER[23]       = "Lot_size";
	  COLHEADER[24]       = "Year_built";
	  COLHEADER[25]       = "Last_sold_date";
	  COLHEADER[26]       = "Last_sold_price";
	  COLHEADER[27]       = "Tax_assessed_value";
	  COLHEADER[28]       = "Alternate"; // e.g., “ForeclosureRadar”
	  COLHEADER[29]       = "Zillow";
	  COLHEADER[30]       = "Eppraisal";
	  COLHEADER[31]       = "Auto_estimate";
	  COLHEADER[32]       = "First_margin";
	  COLHEADER[33]       = "First_key_ratio";
	  var p               = new Array(); // Array of value estimates for median statistic.
	  var i               = 0;
	  var j               = 0;
	  var ROW_START       = 2;
	  var COL_START       = 0;
	  var row             = 0;
	  var col             = COL_START;
	  var resultNum       = 0;
	  var resultNum1      = 0;
	  var resultNum2      = 0;
	  var resultStr       = "";
	  var resultStr1      = "";
	  var resultStr2      = "";
	  var COL_LIEN_POS_AN = 22;
	  var COL_OPEN_BID_AL = 20;
	  var COL_EST_BID_AK  = 19;
	  var COL_TOT_BAL_AB  = 15;
	  var lienPos_AN      = 0;
	  var openBid_AL      = 0;
	  var estBid_AK       = 0;
	  var totBal_AB       = 0;
	  var price           = 0;
	  var autoEstimate    = 0;
	  var firstMargin     = 0;
	  var firstKeyRatio   = 0;
	  var encumbrance     = 0;
	  var WITH            = "";
	  var THIS            = ":";
	  //
	  // 2. Insert sheet.
	  var ss = SpreadsheetApp.getActiveSpreadsheet(); // Initializes spreadsheet.
	  ss.insertSheet( SS_NAME[03], 3 );
	  //
	  // 3. Define sheets and ranges.
	  var fromSheet = ss.getSheetByName( SS_NAME[02] );
	  var fromRange = fromSheet.getDataRange();
	  var fromCountRows = fromRange.getHeight();
	  var fromCountCols = fromRange.getWidth();
	  var toSheet = ss.getSheetByName( SS_NAME[03] );
	  var toRange = toSheet.getRange( 1, 1, fromCountRows, HEADER.length );
	  //
	  // 4. Loop to set column headers.
	  for( i=1; i<COLHEADER.length; i++ ){toRange.getCell( 1, i ).setValue( COLHEADER[i] );} // Sets column header
	  //
	  // 5. Translate records — row by row.
	  for( row=ROW_START; row<=fromCountRows; row++ ){
		// COLHEADER[01] = "Number_and_street";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultStr = fromRange.getCell( row, 3 ).getValue();
		  toRange.getCell( row, col ).setValue( resultStr );
		// COLHEADER[02] = "City";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultStr = fromRange.getCell( row, 4 ).getValue();
		  toRange.getCell( row, col ).setValue( resultStr );
		// COLHEADER[03] = "State";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultStr = fromRange.getCell( row, 5 ).getValue();
		  toRange.getCell( row, col ).setValue( resultStr );
		// COLHEADER[04] = "Zip";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultStr = fromRange.getCell( row, 6 ).getValue();
		  toRange.getCell( row, col ).setValue( resultStr );
		// COLHEADER[05] = "County";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultStr = fromRange.getCell( row, 2 ).getValue();
		  toRange.getCell( row, col ).setValue( resultStr );
		// COLHEADER[06] = "Sale_year";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultNum = fromRange.getCell( row, 16 ).getValue().getFullYear();
		  toRange.getCell( row, col ).setValue( resultNum );
		// COLHEADER[07] = "Sale_month"; ** SPECIAL FORMULA ** DO NOT COPY for general use **
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables ** SPECIAL FORMULA ** DO NOT COPY for general use **
		  resultNum = fromRange.getCell( row, 16 ).getValue().getMonth()+1; // Add “1” (+1) because MONTH values appear to begin at zero?
		  toRange.getCell( row, col ).setValue( resultNum ); // ** SPECIAL FORMULA ** DO NOT COPY for general use **
		// COLHEADER[08] = "Sale_day"; ** SPECIAL FORMULA ** DO NOT COPY for general use **
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables ** SPECIAL FORMULA ** DO NOT COPY for general use **
		  resultNum = fromRange.getCell( row, 16 ).getValue().getDate()+1; // Add “1” (+1) because DATE values appear to begin at zero?
		  toRange.getCell( row, col ).setValue( resultNum );  // ** SPECIAL FORMULA ** DO NOT COPY for general use **
		// COLHEADER[09] = "Sale_hour"; ** SPECIAL FORMULA ** DO NOT COPY for general use **
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables  ** SPECIAL FORMULA ** DO NOT COPY for general use **
		  resultNum = 100 * (fromRange.getCell( row, 17 ).getValue().getHours()+1); // Add “1” (+1) because HOUR values appear to begin at zero?
		  resultNum = resultNum + fromRange.getCell( row, 17 ).getValue().getMinutes(); //  ** SPECIAL FORMULA ** DO NOT COPY for general use **
		  toRange.getCell( row, col ).setValue( resultNum );
		// COLHEADER[10] = "Sale_location";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultStr = fromRange.getCell( row, 18 ).getValue();
		  toRange.getCell( row, col ).setValue( resultStr );
		// COLHEADER[11] = "Opening_bid";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultNum = fromRange.getCell( row, 20 ).getValue();
		  toRange.getCell( row, col ).setValue( resultNum );
		// COLHEADER[12] = "Estimated_opening_bid";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultNum = fromRange.getCell( row, 19 ).getValue();
		  toRange.getCell( row, col ).setValue( resultNum );
		// COLHEADER[13] = "Estimated_lien_position";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultNum = fromRange.getCell( row, 21 ).getValue();
		  toRange.getCell( row, col ).setValue( resultNum );
		// COLHEADER[14] = "Estimated_total_encumbrance";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  encumbrance = fromRange.getCell( row, 15 ).getValue(); // Variable must persist to use in later formula. ** SPECIAL FORMULA ** DO NOT COPY for general use **
		  resultNum = encumbrance;
		  toRange.getCell( row, col ).setValue( resultNum );
		// COLHEADER[15] = "Yahoo_link"; **DEPRACATED** Transmission of this field is deprecated. Construct link string in Zoho. Reason: 1. Ampersand causes failure. 
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultStr = fromRange.getCell( row, 25 ).getValue();
		  toRange.getCell( row, col ).setValue( resultStr );
		// COLHEADER[16] = "Zillow_link";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultStr = fromRange.getCell( row, 24 ).getValue();
		  toRange.getCell( row, col ).setValue( resultStr );
		// COLHEADER[17] = "Eppraisal_link"; **DEPRACATED** Transmission of this field is deprecated. Construct link string in Zoho. Reasons: 1. Ampersand causes failure. 2. Url is incorrect.
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultStr = fromRange.getCell( row, 34 ).getValue();
		  toRange.getCell( row, col ).setValue( resultStr );
		// COLHEADER[18] = "Zillow_details_link";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultStr = fromRange.getCell( row, 32 ).getValue();
		  toRange.getCell( row, col ).setValue( resultStr );
		// COLHEADER[19] = "Prop_type";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultStr1 = fromRange.getCell( row, 26 ).getValue();
		  resultStr2 = fromRange.getCell( row, 07 ).getValue();
		  if( resultStr1.length > 0 ){ resultStr = resultStr1; } else{ resultStr = resultStr2; } resultStr1 = ""; resultStr2 = "";
		  toRange.getCell( row, col ).setValue( resultStr );
		// COLHEADER[20] = "Beds";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultNum1 = fromRange.getCell( row, 27 ).getValue();
		  resultNum2 = fromRange.getCell( row, 11 ).getValue();
		  if( resultNum1 > 0 ){ resultNum = resultNum1; } else{ resultNum = resultNum2; } resultNum1 = 0; resultNum2 = 0;
		  toRange.getCell( row, col ).setValue( resultNum );
		// COLHEADER[21] = "Baths";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultNum1 = fromRange.getCell( row, 28 ).getValue();
		  resultNum2 = fromRange.getCell( row, 12 ).getValue();
		  if( resultNum1 > 0 ){ resultNum = resultNum1; } else{ resultNum = resultNum2; } resultNum1 = 0; resultNum2 = 0;
		  toRange.getCell( row, col ).setValue( resultNum );
		// COLHEADER[22] = "Sq_feet";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultNum1 = fromRange.getCell( row, 29 ).getValue();
		  resultNum2 = fromRange.getCell( row, 09 ).getValue();
		  if( resultNum1 > 0 ){ resultNum = resultNum1; } else{ resultNum = resultNum2; } resultNum1 = 0; resultNum2 = 0;
		  toRange.getCell( row, col ).setValue( resultNum );
		// COLHEADER[23] = "Lot_size";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultNum1 = fromRange.getCell( row, 30 ).getValue();
		  resultNum2 = fromRange.getCell( row, 13 ).getValue();
		  if( resultNum1 > 0 ){ resultNum = resultNum1; } else{ resultNum = resultNum2; } resultNum1 = 0; resultNum2 = 0;
		  toRange.getCell( row, col ).setValue( resultNum );;
		// COLHEADER[24] = "Year_built";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultNum1 = fromRange.getCell( row, 31 ).getValue();
		  resultNum2 = fromRange.getCell( row, 10 ).getValue();
		  if( resultNum1 > 0 ){ resultNum = resultNum1; } else{ resultNum = resultNum2; } resultNum1 = 0; resultNum2 = 0;
		  toRange.getCell( row, col ).setValue( resultNum );
		// COLHEADER[25] = "Last_sold_date";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultStr = fromRange.getCell( row, 36 ).getValue();
		  toRange.getCell( row, col ).setValue( resultStr );
		// COLHEADER[26] = "Last_sold_price";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultNum = fromRange.getCell( row, 37 ).getValue();
		  toRange.getCell( row, col ).setValue( resultNum );
		//COLHEADER[27] = "Tax_assessed_value";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultNum = fromRange.getCell( row, 38 ).getValue();
		  toRange.getCell( row, col ).setValue( resultNum );
		// COLHEADER[28] = "Alternate";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultNum = fromRange.getCell( row, 14 ).getValue();
		  if( resultNum > 0 ){ p[j]=resultNum;j++; } // Adds to estimate array to calculate median
		  toRange.getCell( row, col ).setValue( resultNum );
		// COLHEADER[29] = "Zillow";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultNum = fromRange.getCell( row, 33 ).getValue();
		  if( resultNum > 0 ){ p[j]=resultNum;j++; } // Adds to estimate array to calculate median
		  toRange.getCell( row, col ).setValue( resultNum );
		// COLHEADER[30] = "Eppraisal";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultNum = fromRange.getCell( row, 35 ).getValue();
		  if( resultNum > 0 ){ p[j]=resultNum;j++; } // Adds to estimate array to calculate median
		  toRange.getCell( row, col ).setValue( resultNum );
		// COLHEADER[31] = "Auto_estimate";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  autoEstimate = median( p ); // Variable must persist to use in later formula.
		  resultNum = autoEstimate;
		  toRange.getCell( row, col ).setValue( resultNum );
	//
	// Calculate variables.
		lienPos_AN = fromRange.getCell( row, COL_LIEN_POS_AN ).getValue();
		openBid_AL = fromRange.getCell( row, COL_OPEN_BID_AL ).getValue();
		estBid_AK  = fromRange.getCell( row, COL_EST_BID_AK  ).getValue();
		totBal_AB  = fromRange.getCell( row, COL_TOT_BAL_AB  ).getValue();
		if(lienPos_AN == 1){if(openBid_AL > 0){price = openBid_AL} else{price = estBid_AK}} // Includes unknown estimated lien positions as well as 2nd & 3rd lien positions. 
		else{price = totBal_AB} // This estimate needs refining. Should discriminate between 2nd, 3rd & unknown lien positions. And incorporate estimated bids.
		firstMargin = Math.round( autoEstimate - price );
		firstKeyRatio = Math.round( 100*price/autoEstimate );
	//
		//  COLHEADER[32] = "First_margin";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultNum = firstMargin;
		  toRange.getCell( row, col ).setValue( resultNum );
		// COLHEADER[33] = "First_key_ratio";
		col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
		  resultNum = firstKeyRatio;
		  toRange.getCell( row, col ).setValue( resultNum );
		//
	// Reset variables.
		col = COL_START; // Resets column — half carriage return
		resultNum     = 0;
		resultStr     = "";
		lienPos_AN    = 0;
		openBid_AL    = 0;
		estBid_AK     = 0;
		totBal_AB     = 0;
		price         = 0;
		autoEstimate  = 0;
		firstMargin   = 0;
		firstKeyRatio = 0;
		j             = 0;
		p.splice( 0, p.length ); // Deletes all the elements of the array — thereby resetting it.
	  }
	  //
	}
	function write  (){
	/*
	function writeToZoho() {
	//
	// A modified version of this script is labeled “writeToZoho” in the spreadsheet labeled “Scrape REICs and Lenders” in the project labeled “Lenders.”
	// The original version of the script is labeled “writeToZoho” in the spreadsheet labeled “DealDigger™ — Bid Manifest.” 
	/*
	*** --- EXAMPLES --- ***
	//
	******************** EXAMPLE 1 ********************
	<!-- TEST READ -->
	<!-- http://www.w3schools.com/TAGS/tryit.asp?filename=tryhtml_form_method_post -->
	<!-- http://www.w3schools.com/TAGS/att_form_method.asp -->
	<html><body>
	<form method="post" target="_blank" action="http://creator.zoho.com/api/xml/read/apikey=a950d63185b2a5a3d1eb703cc65474d5&ticket=c7fd8ef1662c118df4f8d4cb29e81a38">
	  XMLString:<br>
	  <textarea name="XMLString" rows="6" cols="50">
		<ZohoCreator>
		  <application name="price-list">
			<form name="Products_Type"></form>
		  </application>
		</ZohoCreator>
	  </textarea><br><br>
	  Owner: <input type="text" name="zc_ownername" value="sampleapps" style="font-size:15"><br>
	  <input type="submit" value="Submit XML String" style="font-size:45">
	</form>
	</body></html>
	******************** EXAMPLE 2 ********************
	<!-- TEST WRITE1 -->
	<!-- http://www.w3schools.com/TAGS/tryit.asp?filename=tryhtml_form_method_post -->
	<!-- http://www.w3schools.com/TAGS/att_form_method.asp -->
	<html><body>
	<form action="http://creator.zoho.com/api/json/dealdigger/Inventory/add/" method="post" target="_blank">
	  apiKey: <input type="text" name="apikey" value="a950d63185b2a5a3d1eb703cc65474d5"/><br />
	  ticket: <input type="text" name="ticket" value="c7fd8ef1662c118df4f8d4cb29e81a38"/><br />
	  Project_name: <input type="text" name="Project_name" value="TEST"/><br />
	  <input type="submit" value="Submit" />
	</form>
	</body></html>
	******************** EXAMPLE 3 ********************
	<!-- TEST WRITE2 -->
	<!-- http://www.w3schools.com/TAGS/tryit.asp?filename=tryhtml_form_method_post -->
	<!-- http://www.w3schools.com/TAGS/att_form_method.asp -->
	<!-- https://api.creator.zoho.com/XML-RPC-API-Add-Records.html -->
	<html><body>
	<form method="POST" action="http://creator.zoho.com/api/xml/write" target="_blank">
	 <input type="hidden" name="apikey" id="apikey" value="a950d63185b2a5a3d1eb703cc65474d5">
	 <input type="hidden" name="ticket" id="ticket" value="c7fd8ef1662c118df4f8d4cb29e81a38">
	XMLString:<br>
	<textarea rows="15" cols="50" name="XMLString">
	  <ZohoCreator>
		<applicationlist>
		  <application name="dealdigger">
			<formlist>
			  <form name="Inventory">
				<add>
				  <field name="Project_name">
					<value>TEST</value>
				  </field>
				</add>
			  </form>
			</formlist>
		  </application>
		</applicationlist>
	  </ZohoCreator>
	</textarea>
	<br>
	<input type="submit" value="Add Record" style="font-size:25">
	</form>
	</body></html>
	******************** EXAMPLE 4 ******************** (add via REST)
	POST http://creator.zoho.com/api/xml/dealdigger/Bid_Form/add/
	Content-Type: application/x-www-form-urlencoded
	Content: apikey=a950d63185b2a5a3d1eb703cc65474d5&ticket=6ef3826039ffd8f3cefae232a1a3f061&My_offer=1&Bid_accepted=true
	******************** EXAMPLE 5 ******************** (update via REST)
	POST http://creator.zoho.com/api/xml/dealdigger/Bid_Form/update/
	Content-Type: application/x-www-form-urlencoded
	Content: apikey=a950d63185b2a5a3d1eb703cc65474d5&ticket=6ef3826039ffd8f3cefae232a1a3f061&criteria=My_offer=1&Bid_accepted=false&reloperator=AND
	******************** EXAMPLE 6 ******************** (update via RPC — reference: http://writer.zoho.com/public/help/edit-record-xml/fullpage)
	POST http://creator.zoho.com/api/xml/write/apikey=a950d63185b2a5a3d1eb703cc65474d5&ticket=6ef3826039ffd8f3cefae232a1a3f061
	Content-Type: application/x-www-form-urlencoded
	Content example:
	XMLString=<zohocreator><applicationlist><application name="dealdigger"><formlist><form name="Bid_Form"><update><criteria><reloperator>AND</reloperator>
	<field name="ProjectID" compOperator="EQUALS" value="Weid"></field><field name="BidderID" compOperator="EQUALS" value="foobar2@zippymail.info"></field>
	<field name="SitusID" compOperator="EQUALS" value="262407000006863789"></field><field name="My_offer" compOperator="EQUALS" value="8000"></field></criteria><newvalues>
	<field name="Bid_accepted" value="true"></field></newvalues></update><update><criteria><reloperator>AND</reloperator><field name="ProjectID" compOperator="EQUALS" value="Weid">
	</field><field name="BidderID" compOperator="EQUALS" value="foobar15@zippymail.info"></field><field name="SitusID" compOperator="EQUALS" value="262407000006863795"></field>
	<field name="My_offer" compOperator="EQUALS" value="165000"></field></criteria><newvalues><field name="Bid_accepted" value="true"></field></newvalues></update><update><criteria>
	<reloperator>AND</reloperator><field name="ProjectID" compOperator="EQUALS" value="Weid"></field><field name="BidderID" compOperator="EQUALS" value="foobar2@zippymail.info"></field>
	<field name="SitusID" compOperator="EQUALS" value="262407000006863783"></field><field name="My_offer" compOperator="EQUALS" value="125000"></field></criteria><newvalues>
	<field name="Bid_accepted" value="true"></field></newvalues></update></form><form name="Projects"><update><criteria><reloperator>AND</reloperator>
	<field name="Name" compOperator="EQUALS" value="Weid"></field></criteria><newvalues><field name="Current_offer_set" value="offerSetStringVariable"></field>
	<field name="Sigma_sub_omega" value="1536500"></field><field name="Sigma_sub_beta" value="627000"></field></newvalues></update></form></formlist></application></applicationlist></zohocreator>
	Note: Below is XMLString restated in heirarchical structure
	<zohocreator>
	  <applicationlist>
		<application name="dealdigger">
		  <formlist>
			<form name="Bid_Form">
			  <update>
				<criteria>
				  <reloperator>AND</reloperator>
				  <field name="ProjectID" compOperator="EQUALS" value="Weid"></field>
				  <field name="BidderID" compOperator="EQUALS" value="foobar2@zippymail.info"></field>
				  <field name="SitusID" compOperator="EQUALS" value="262407000006863789"></field>
				  <field name="My_offer" compOperator="EQUALS" value="8000"></field>
				</criteria>
				<newvalues>
				  <field name="Bid_accepted" value="true"></field>
				</newvalues>
			  </update>
			  <update>
				<criteria>
				  <reloperator>AND</reloperator>
				  <field name="ProjectID" compOperator="EQUALS" value="Weid"></field>
				  <field name="BidderID" compOperator="EQUALS" value="foobar15@zippymail.info"></field>
				  <field name="SitusID" compOperator="EQUALS" value="262407000006863795"></field>
				  <field name="My_offer" compOperator="EQUALS" value="165000"></field>
				</criteria>
				<newvalues>
				  <field name="Bid_accepted" value="true"></field>
				</newvalues>
			  </update>
			  <update>
				<criteria>
				  <reloperator>AND</reloperator>
				  <field name="ProjectID" compOperator="EQUALS" value="Weid"></field>
				  <field name="BidderID" compOperator="EQUALS" value="foobar2@zippymail.info"></field>
				  <field name="SitusID" compOperator="EQUALS" value="262407000006863783"></field>
				  <field name="My_offer" compOperator="EQUALS" value="125000"></field>
				</criteria>
				<newvalues>
				  <field name="Bid_accepted" value="true"></field>
				</newvalues>
			  </update>
			</form>
			<form name="Projects">
			  <update>
				<criteria>
				  <reloperator>AND</reloperator>
				  <field name="Name" compOperator="EQUALS" value="Weid"></field>
				</criteria>
				<newvalues>
				  <field name="Current_offer_set" value="offerSetStringVariable"></field>
				  <field name="Sigma_sub_omega" value="1536500"></field>
				  <field name="Sigma_sub_beta" value="627000"></field>
				</newvalues>
			  </update>
			</form>
		  </formlist>
		</application>
	  </applicationlist>
	</zohocreator>
	******************** EXAMPLE 7 ******************** (add via RPC — reference: https://writer.zoho.com/public/help/add-record-xml/fullpage)
	POST http://creator.zoho.com/api/xml/write/apikey=a950d63185b2a5a3d1eb703cc65474d5&ticket=24ac84ca86e1d3fa3c79b2f0f3ef54ba
	Content-Type: application/x-www-form-urlencoded
	Content example:
	XMLString=<ZohoCreator><applicationlist><application name="dealdigger"><formlist><form name="Inventory"><add><field name="Full_address">
	<value>123 Elm St</value></field><field name="Yahoo_link"><value>http://www.yahoo.com</value></field></add><add><field name="Full_address">
	<value>555 Main St</value></field><field name="Yahoo_link"><value>http://www.yahoo.com</value></field>></add></form></formlist></application>
	</applicationlist></ZohoCreator>
	Note: Below is XMLString restated in heirarchical structure
	<ZohoCreator>
	  <applicationlist>
		<application name="dealdigger">
		  <formlist>
			<form name="Inventory">
			  <add>
				<field name="Full_address"><value>123 Elm St</value></field>
				<field name="Yahoo_link"><value>http://www.yahoo.com</value></field>
			  </add>
			  <add>
				<field name="Full_address"><value>555 Main St</value></field>
				<field name="Yahoo_link"><value>http://www.yahoo.com</value></field>
			  </add>
			</form>
		  </formlist>
		</application>
	  </applicationlist>
	</ZohoCreator>
	//
	// *********************************************************************************************************
	// **                                                                                                     **
	// **                                        *** --- LIVE CODE --- ***                                    **
	// **                                                                                                     **
	// *********************************************************************************************************
	*/
	// 1. Parameters
	// a. URL
	var TICKET      = "8b7b09a0575ada8c8295c722e8df583c"; // Refresh ticket every seven days
	var APIKEY      = "a950d63185b2a5a3d1eb703cc65474d5";
	var OPERATION   = "write"; // other options: "add", "update" — Note: Even when “adding” new records, we tend to use the “write” operation because the add operation can be problematic.
	var LANGUAGE    = "xml"; // other options: "csv", "json"
	var STEM        = "http://creator.zoho.com/api/";
	// b. Posting
	var SHEET       = "Out";
	var APPLICATION = "dealdigger";
	var FORM        = "Inventory"; // Previously: "Bid_Form"
	var METHOD      = "POST";
	var TYPE        = "application/x-www-form-urlencoded";
	// c. Parameters
	var OBJTYPE     = "string";
	var START_ROW   = 2;
	var START_COL   = 1;
	var f = 0;
	var g = 0;
	var h = 0;
	var i = 0;
	var j = 0;
	var k = 0;
	// d. Arrays
	var action = "";
	var ACTION_STRING = new Array();
	ACTION_STRING[00] = "";
	ACTION_STRING[01] = STEM;
	ACTION_STRING[02] = LANGUAGE;
	ACTION_STRING[03] = "/";
	ACTION_STRING[04] = OPERATION;
	ACTION_STRING[05] = "/apikey=";
	ACTION_STRING[06] = APIKEY;
	ACTION_STRING[07] = "&ticket=";
	ACTION_STRING[08] = TICKET;
	var myPayload = "";
	var PAYLOAD_STRING = new Array();
	PAYLOAD_STRING[00] = "";
	PAYLOAD_STRING[01] = "XMLString=<ZohoCreator><applicationlist><application name='";
	PAYLOAD_STRING[02] = APPLICATION;
	PAYLOAD_STRING[03] = "'><formlist><form name='"
	PAYLOAD_STRING[04] = FORM;
	PAYLOAD_STRING[05] = "'>";
	PAYLOAD_STRING[06] = "<add>";
	PAYLOAD_STRING[07] = "<field name='";
	PAYLOAD_STRING[08] = "'><value><![CDATA["; // PAYLOAD_STRING[08] = "'><value>";
	PAYLOAD_STRING[09] = "]]></value></field>"; // PAYLOAD_STRING[09] = "</value></field>";
	PAYLOAD_STRING[10] = "</add>";
	PAYLOAD_STRING[11] = "</form></formlist></application></applicationlist></ZohoCreator>";
	var PAYLOAD_PREFIX = 1;
	var PAYLOAD_ADDRECORD = 6;
	var PAYLOAD_ADDFIELD = 7;
	var PAYLOAD_TERMINATE = 11;
	var COL_OMIT = new Array(); // These are the columns to omit from any API/XML transmission.
	COL_OMIT[00] = 15;
	COL_OMIT[01] = 17;
	var THIS = new Array();
	var WITH = new Array();
	THIS[00] = "&";
	WITH[00] = "and"; // Tried: &amp; &amp;amp; %26 &#038 &#038;
	THIS[01] = "%";
	WITH[01] = "";
	var field = new Array();
	field[0] = ""; // Initialize first array element with empty string.
	var value = new Array();
	value[0] = ""; // Initialize first array element with empty string.
	// e. Other
	var d = new Date();
	var dateTime = d.getTime(); // represents milliseconds since 1970/01/01
	var omit = new Boolean();
	//
	// 2. Access output cells
	var ss = SpreadsheetApp.getActiveSpreadsheet();
	var sheet = ss.getSheetByName( SHEET );
	var range = sheet.getDataRange();
	var countCols = range.getWidth();
	var countRows = range.getHeight();
	/*
	// 3. Archive: copy and clear — Copy and archive worksheet and clear 'In' sheet in preparation for next run.
	var newSs = SpreadsheetApp.create( dateTime ); // Creates a new spreadsheet & names it with the value of the offer set ID (timestamp).
	var newUrl = newSs.getUrl(); // Gets the URL of the newly created spreadsheet. // Logger.log( dateTime + " | " + newUrl );
	var sheetCount = ss.getNumSheets(); // Computes the number of sheets to be copied.
	for(i=sheetCount-1;i>=0;i--){ // Copies all sheets to the new spreadsheet.
	  ss.getSheets()[i].copyTo( newSs ); // Gets all the sheets in a spreadsheet and copies this sheet into another spreadsheet.
	}
	ss.getSheetByName( 'In' ).clear(); // Clears the sheet of all content and formatting — in preparation for next run.
	*/
	//
	// 3. Construct action URL. // Example: http://creator.zoho.com/api/xml/write/apikey=a950d63185b2a5a3d1eb703cc65474d5&ticket=24ac84ca86e1d3fa3c79b2f0f3ef54ba
	for( g=1;g<ACTION_STRING.length;g++ ){ action = action + ACTION_STRING[g]; } // Iterate over the array of substrings. // Logger.log( "action: " + action );
	//
	// 4. Contruct field/header array.
	for( k=START_COL;k<=countCols;k++ ){ field[k] = range.getCell( 1, k ).getValue(); } k = 0; // Logger.log( "field: " + field );
	//
	// 5. Construct XML payload.
	for( j=START_ROW;j<=countRows;j++ ){ // Iterate down rows. Insert record string construction here. // for( j=START_ROW;j<3;j++ ){ // Iterate down rows. Insert record string construction here.
		myPayload = ""; // Resets string.
		for( h=PAYLOAD_PREFIX;h<PAYLOAD_ADDRECORD;h++ ){ myPayload += PAYLOAD_STRING[h]; } // Iterate over the array of myPayload substrings. // Logger.log( "h: " + h );
		h = PAYLOAD_ADDRECORD; myPayload += PAYLOAD_STRING[h]; h++; // Start new record.
		for( k=START_COL;k<=countCols;k++ ){ // Iterate across columns. Fetch header at row 1 and value at row j. // for( k=START_COL;k<=27;k++ ){ // Iterate across columns. Fetch header at row 1 and value at row j.
			omit = false; // Reset exclusion switch.
			for( i=0;i<COL_OMIT.length;i++ ){ if( k == COL_OMIT[i] ){omit = true;} } // Test to evaluate if the column is omitted from the XML dataset (due to transmission problems vis-a-vis “&” and “%” characters.)
			if( !omit ){ // Execute if the column number is not “blacklisted” via inclusion in the omit array.
				value[k] = range.getCell( j, k ).getValue();  // Fetch field value.
				if( typeof value[k] == OBJTYPE ){ for(f=0;f<THIS.length;f++){value[k].replace( THIS[f], WITH[f] );} } // Sub for problematic characters (&, %) in strings.
				h = PAYLOAD_ADDFIELD; // Reset string to start next column.
				myPayload += PAYLOAD_STRING[h] + field[k]; h++; // e.g. "Full_address"; h=7
				myPayload += PAYLOAD_STRING[h] + value[k]; h++; // e.g. "123 Elm St"; h=8
				myPayload += PAYLOAD_STRING[h]; h++; // h=9
			}
		}
		myPayload += PAYLOAD_STRING[h]; h++; // h=10
		value.splice( 1, (value.length-1) ); // Reset array of values. Deletes all the elements of the array — thereby resetting it.
		h = PAYLOAD_TERMINATE; myPayload += PAYLOAD_STRING[h]; // Terminates payload string.
	//
	// 6. Execute request.
	  advancedArgs = { method:METHOD, payload:myPayload, contentType:TYPE };
	  response = UrlFetchApp.fetch( action, advancedArgs );
	  Logger.log( "myPayload: " + myPayload );
	  Logger.log( "response: " + response.getContentText() );
	} // End record. Repeat.
	//
	}
	{ // Main
		{ // JavaScript // Add the following code at the top of each project/file to load the following files.
		//	Load JavaScript library
			var CLIENT = "googleScripts";
			var LOAD   = "https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js";
			eval(UrlFetchApp.fetch( LOAD ).getContentText()); // Loads master file containing array of URI strings
			var files  = load(CLIENT); // Fetches array of URIs representing JS files library to load per the “client”
			var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())} // Evaluates code at each array element, URI.
		}
		{ // Parameters
			{ // Sheet/range
			var SS_KEY        = new Array(); // Elements are taken from the URL in the address line of the browser of the open Google Spreadsheet
			SS_KEY[0]         = "0AlLVOoV_2dFtdElDbWhKMGdpZ1FVRzRBd2VCa0F5ZlE"; // From: ForeclosureRadar — load
			SS_KEY[1]         = "0AlLVOoV_2dFtdG45MVpxcXJJWkVDbjJkQWFKQ2xOYUE"; //   To: ForeclosureRadar — scrape
			var SHEET_NAME    = new Array(); // Array of sheet arrays [0][0]
			for(i=0;i<SS_KEY.length;i++){SHEET_NAME[i] = new Array()}
			SHEET_NAME[0][0]  = "Sheet1";
			SHEET_NAME[1][0]  = "Track";
			SHEET_NAME[1][1]  = "In";
			SHEET_NAME[1][2]  = "Calc";
			SHEET_NAME[1][3]  = "Prep";
			SHEET_NAME[1][4]  = "Out";
			var ss            = new Array();
			var sheet         = new Array();
			var range         = new Array();
			for(var i=0;i<SS_KEY.length;i++){ // Loop to define sheets/ranges globally
				ss[i]    = SpreadsheetApp.openById(SS_KEY[i]);
				sheet[i] = new Array();
				range[i] = new Array();
				for(var j=0;j<SHEET_NAME[i].length;j++){sheet[i][j] = ss[i].getSheetByName(SHEET_NAME[i][j])}
			}   updateRangesData();
			}
			{ // Functions
				{ // In-line
			var funcArr       = new Array();          // Define an array of sub-functions to call in order to execute the global script. Call syntax: funcArr[i]();
				funcArr[1]    = function(){calc   ()} // Assign the function to a variable to allow looping to call the function inside the braces.
			//	funcArr[2]    = function(){formatA()} // Reference: http://forums.devshed.com/javascript-development-115/assigning-a-function-to-a-variable-without-it-firing-633070.html
			//	funcArr[3]    = function(){append ()} // Reference: http://stackoverflow.com/questions/1140089/how-does-an-anonymous-function-in-javascript-work <-- best reference
			//	funcArr[4]    = function(){formatB()} // Reference: http://2007-2010.lovemikeg.com/2008/08/17/a-week-in-javascript-patterns-self-invocation/
			//	funcArr[5]    = function(){write  ()}
				}
			/*	{ // AVM
			var labelArr      = new Array();               // Array of column labels for AVM models/functions; Note: Match label names with parameters in func prepA();
			var avmArr        = new Array();               // Define an array of AVM (automatic valuation models) to call to generate an estimate of the ARV (After Repair Value) of the subject.                        
				avmArr[1]     = function(x){return x.avmZillowAPI ()}; labelArr[1]="Zillow";     // ZILLOW
				avmArr[2]     = function(x){return x.avmEppraisal ()}; labelArr[2]="Eppraisal";  // EPPRAISAL
				avmArr[3]     = function(x){return x.avmRealtor   ()}; labelArr[3]="Realtor";    // REALTOR
				avmArr[4]     = function(x){return x.avmRealEstate()}; labelArr[4]="RealEstate"; // REAL ESTATE
				avmArr[5]     = function(x){return x.avmHomeGain  ()}; labelArr[5]="HomeGain";   // HOME GAIN
			var avm           = new Array();for(i=0;i<avmArr.length;i++){avm[i]=new Array()}     // Array of arrays; Local storage of AVM scrape arrays — prevents recurring server requests
				}*/
			}
			{ // Tracking
			var x             = 0;
			var ignitionOn    = new Array();               // Supports restarts: Determines POSITION of existing state of code that has run
			for(i=0;i<=2;i++){                             // Initialize and set to zero, all array elements from [1][0] to [2][3].
				ignitionOn[i] = new Array();               // i: [1] Position of Latest Run Code (“LRC”); [2] Position of code SEARCHING for LRC.
				for(j=0;j<=3;j++){                         // j: [1] Major code block, [2] Minor code block, [3] Row — Note: [2][3] variable is just labeled “row”
					if(j===0){ignitionOn[i][j] = false}    // Array of boolean “switches.” Flips on when code restart reaches the point of last run. [0][0] 
					else{
						if(i===2){ignitionOn[i][j] = -1}
						else     {ignitionOn[i][j] =  0}}}}}
		}
		{ // 1. Fetch tracking variables
			for(i=1;i<ignitionOn[1].length;i++){if(isNumber(range[1][0].getCell(1,i).getValue())){ignitionOn[1][i]=range[1][0].getCell(1,i).getValue()}}} // *** Tracking *** Fetches recorded values to detect leftoff location of lastly executed script. Detects latest blocks & rows to run as recorded & restarts script accordingly.
		{ // 2. Call functions
			for(ii=1;ii<funcArr.length;ii++){                                                                     // Calls all functions/subroutines in sequence.
				x=1;ignitionOn[2][x]++;ignitionOn[0][x]=(ignitionOn[0][x]||(ignitionOn[1][x]==ignitionOn[2][x])); // *** Tracking *** Increments block position & tests ignition
				if( ignitionOn[0][x]){range[1][0].getCell(1,x).setValue(ignitionOn[2][x]);                        // *** Tracking *** Update tracking cell with new value
					ignitionOn[2][2] = -1;									                                      // *** Tracking *** Resets nested counting variable
					funcArr[ii]();} // Calls function. Note: The parentheses “()” invoke the function call. Stating the function name alone, “funcArr[i]” without the parens will have no effect.
				updateRangesData();}} // Updates ranges
	}
}
function uploadPdfOcr(){ // https://gist.github.com/4414152 // This is a sample code to upload a PDF file to Google Drive with OCR in Apps Script. uploadPdfOcr function returns a File object. To run the code provide a developer key for an API Console project with Drive API service enabled.
	authorize();
	var key="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // <-- developer key
	var file=UrlFetchApp.fetch("http://somewhere.com/path/file.pdf").getBlob();
	var metadata={title:file.getName()}
	var params={	method				:	"post"
				,	oAuthServiceName	:	"drive"
				,	oAuthUseToken		:	"always"
				,	contentType			:	"application/pdf"
				,	contentLength		:	file.getBytes().length
				,	payload				:	file.getBytes()};
	var uploadRequest=UrlFetchApp.fetch("https://www.googleapis.com/upload/drive/v2/files/?uploadType=media&ocr=true&key="+key,params);
	var uploadResponse=Utilities.jsonParse(uploadRequest.getContentText());
	var params={	method				:	"put"
				,	oAuthServiceName	:	"drive"
				,	oAuthUseToken		:	"always"
				,	contentType			: 	"application/json"
				,	payload				:	Utilities.jsonStringify(metadata)};
	var metaRequest=UrlFetchApp.fetch("https://www.googleapis.com/drive/v2/files/"+uploadResponse.id+"?key="+key, params)
	return DocsList.getFileById(uploadResponse.id);}
function authorize(){var	oauthConfig=UrlFetchApp.addOAuthService("drive"),scope="https://www.googleapis.com/auth/drive";
							oauthConfig.setConsumerKey     ("anonymous"                                                        );
							oauthConfig.setConsumerSecret  ("anonymous"                                                        );
							oauthConfig.setRequestTokenUrl ("https://www.google.com/accounts/OAuthGetRequestToken?scope="+scope);
							oauthConfig.setAuthorizationUrl("https://accounts.google.com/OAuthAuthorizeToken"                  );
							oauthConfig.setAccessTokenUrl  ("https://www.google.com/accounts/OAuthGetAccessToken"              );}