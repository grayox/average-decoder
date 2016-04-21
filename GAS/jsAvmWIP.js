// Code below this point is "work in process"
Core Logic http://express.realquest.com/search.aspx?location=11462%20Cromwell%20Ct,Dallas,TX%20,75229
Array .prototype.avmBofA        = function(tMax          ){ // http://realestatecenter.bankofamerica.com/tools/marketvalue.aspx | http://realestatecenter.bankofamerica.com/pages/home-valuation1
}
Array .prototype.avmChase       = function(tMax          ){ // https://www.chase.com/online/Home-Lending/home-value-estimator.htm | https://www.chase.com/mortgage/mortgage-resources/home-value-estimator
}
Array .prototype.avmZipRealty   = function(tMax          ){ // Uses HomeGain, Zillow and Eppraisal for AVM estimates
// Yields estimates from Zillow, HomeGain and Eppraisal.
// Sample 1st URL: http://www.ziprealty.com/property/locate-new?doSubmit=1&singleLineInput=6889+W+Irwin+Ave%2C+85339 // Obso: http://www.ziprealty.com/xhr/autocomplete_mls_city?query=6781%20Pilot%20Wy%2C%20San%20Diego%2C%20CA%2092114
//		Response headers: {...,"Location":"http://www.ziprealty.com/property/6889-W-IRWIN-AVE-LAVEEN-AZ-85339/1886493/detail",...}
// Sample 2nd URL: http://www.ziprealty.com/property/6781-PILOT-WAY-SAN-DIEGO-CA-92114/10283486/detail
// Google search: free home valuation tool
// Note: Popularity score can be useful
}
Array .prototype.avmYahoo       = function(tMax          ){ // *Currently contains sub functions that need to be extracted*
// Yields estimates from Zillow and Eppraisal. Deploys anti-scraping technology.
//
// Define functions
//
// *******************************************************************************************************************
// *******************************************************************************************************************
// **                                                                                                               **
// **                                                  Scrape Yahoo                                                 **
// **                                                                                                               **
// *******************************************************************************************************************
// *******************************************************************************************************************
function scrapeYahoo( sa, csz ){
//
// 0. Define functions — Copy and paste the following fxns in the main code body that calls this fxn.
// function delay(){foo="bar";} // Necessary to delay server requests to avoid tripping security / usage constraints
// function delayInSeconds( sec ){var t = setTimeout("delay()", sec*1000);} // call: delayInSeconds(3); Where 3 = sec = number of seconds to delay. Note: Do not use t as that is a reserved variable.
//
// 1. Define parameters
var STEM       = "http://realestate.yahoo.com/Homevalues/result.html";
var dataset    = new Array();
var THIS       = new Array();
var WITH       = new Array();
THIS[1]       = ", ";
WITH[1]       = "+";
THIS[2]       = ",";
WITH[2]       = "+";
THIS[3]       = " ";
WITH[3]       = "+";
THIS[4]       = "++";
WITH[4]       = "+";
THIS[5]       = "=+";
WITH[5]       = "=";
var FIELD_NAME = new Array();
var MARKER_QUE = new Array();
var MARKER_BEG = new Array();
var MARKER_END = new Array();
FIELD_NAME[1] = "Type";
MARKER_QUE[1] = "Residence: ";
MARKER_BEG[1] = ">";
MARKER_END[1] = "<";
FIELD_NAME[2] = "Bed";
MARKER_QUE[2] = "Beds: ";
MARKER_BEG[2] = ">";
MARKER_END[2] = "<";
FIELD_NAME[3] = "Bath";
MARKER_QUE[3] = "Bath: ";
MARKER_BEG[3] = ">";
MARKER_END[3] = "<";
FIELD_NAME[4] = "Sqft";
MARKER_QUE[4] = "Square Feet: ";
MARKER_BEG[4] = ">";
MARKER_END[4] = "<";
FIELD_NAME[5] = "Lot";
MARKER_QUE[5] = "Lot Size: ";
MARKER_BEG[5] = ">";
MARKER_END[5] = "<";
FIELD_NAME[6] = "Built In";
MARKER_QUE[6] = "Year Built: ";
MARKER_BEG[6] = ">";
MARKER_END[6] = "<";
FIELD_NAME[7] = "Void";
MARKER_QUE[7] = "\"estimates\"";
MARKER_BEG[7] = "homedetails/"; // Zillow link URL = "http://www.zillow.com/homedetails/" + dataset[i]
MARKER_END[7] = "\"";
FIELD_NAME[8] = "Zillow Zestimate";
MARKER_QUE[8] = ">";
MARKER_BEG[8] = "$"; // Zestimate
MARKER_END[8] = "<";
FIELD_NAME[9] = "Eppraisal Estimate";
MARKER_QUE[9] = "Eppraisal.com";
MARKER_BEG[9] = "$"; // Eppraisal estimate
MARKER_END[9] = "<";
FIELD_NAME[10] = "Last Sold Date";
MARKER_QUE[10] = "Last Sold Date:";
MARKER_BEG[10] = "<dd>";
MARKER_END[10] = "<";
FIELD_NAME[11] = "Last Sold Price";
MARKER_QUE[11] = "Last Sold Price:";
MARKER_BEG[11] = "<dd>$";
MARKER_END[11] = "<";
FIELD_NAME[12] = "Tax Value";
MARKER_QUE[12] = "Tax assessed value:";
MARKER_BEG[12] = "<dd>$";
MARKER_END[12] = "<";
//
// 2. Construct URL.
var action = "";
action     = action + STEM;
action     = action + "?search=Search&sa=";
action     = action + sa;
action     = action + "&csz=";
action     = action + csz;
//
// 3. Substitute characters in URL.
for( h=1; h<THIS.length; h++ ){ while( action.indexOf( THIS[h] ) > -1 ){ action = action.replaceAll( THIS[h], WITH[h] ); }}
//
// 4. Fetch URL (HTTP GET).
var response = UrlFetchApp.fetch( action ); // Fetch the URL of the subject. // var responseCode = response.getResponseCode(); // Gets the response code to determine if the given id produces a valid record.
var responseText = response.getContentText(); // Get response text; convert to string variable.
//
// 5. Scrape
for( i=1; i<MARKER_BEG.length; i++ ){ // Loop over FIELDS.
  if( ( responseText.indexOf( MARKER_QUE[i] ) > -1 ) && ( responseText.indexOf( MARKER_BEG[i] ) > -1 ) && ( responseText.indexOf( MARKER_END[i] ) > -1 ) ){ // Condition on existence of marker/s and element/s (token/s).
    responseText = responseText.slice( ( responseText.indexOf( MARKER_QUE[i] ) + MARKER_QUE[i].length ) ); // Grabs string AFTER the PREFIX (marker).
    responseText = responseText.slice( ( responseText.indexOf( MARKER_BEG[i] ) + MARKER_BEG[i].length ) ); // Grabs string AFTER the PREFIX (marker).
    dataset[i]   = responseText.slice( 0,responseText.indexOf( MARKER_END[i] ) ); // Grabs string BEFORE the SUFFIX (marker).
    responseText = responseText.slice( ( responseText.indexOf( dataset[i] ) + dataset[i].length ) ); // Grabs string AFTER the PREFIX (marker).
  }
}
// 6. Return
return dataset; 
}
// *******************************************************************************************************************
// *******************************************************************************************************************
//
// PURPOSE: The purpose of this function is to parse the scraped address and collect the property variables (price estimate, br, ba, sf, etc.)
// We will use the median of five estimates: Zillow.com, Eppraisal.com, Trulia.com, Homes.com, Realtor.com.
// Notes: • Zillow and Eppraisal will come from scraping the Yahoo Real Estate site. • Google search: real estate automatic value estimate
//
// 1. Define test variables.
// var ADDRESS_STRING = "1261604-1760-9491-Capiland-Road-DESERT-HOT-SPRINGS-CA-92240";
//
// 2. Define parameters.
// var addressStr = ADDRESS_STRING;
var DELIMITER = "-";
var START_INDEX = 2;
var DELAY = 3; // Seconds to delay server requests for security/capacity constraint purposes. Below code must multiply times 1000 to convert to milliseconds.
var sa = "";
var csz = "";
var cszSubstr = false;
var addressArray = new Array();
var yahoo = new Array();
var THIS = new Array();
var WITH = new Array();
THIS[1] = "$";
WITH[1] = "";
THIS[2] = ",";
WITH[2] = "";
var Y_COLHEADER = new Array();
Y_COLHEADER[1] = "Type";
Y_COLHEADER[2] = "BR";
Y_COLHEADER[3] = "BA";
Y_COLHEADER[4] = "SF";
Y_COLHEADER[5] = "Lot";
Y_COLHEADER[6] = "Built";
Y_COLHEADER[7] = "ZillowLink";
Y_COLHEADER[8] = "Zillow";
Y_COLHEADER[9] = "Eppraisal";
Y_COLHEADER[10] = "Sold";
Y_COLHEADER[11] = "For";
Y_COLHEADER[12] = "Tax";
// Sheets and ranges
var SHEET_FROM  = "Start";
var SHEET_TO    = "Prep";
var START_ROW   = 2;
var ADDRESS_COL = 1;
// Spreadsheet
var ss        = SpreadsheetApp.getActiveSpreadsheet(); // Initializes spreadsheet.
var sheetFrom = ss.getSheetByName( SHEET_FROM );
var rangeFrom = sheetFrom.getDataRange();
var countRows = rangeFrom.getHeight();
var countCols = rangeFrom.getWidth();
var sheetTo   = ss.getSheetByName( SHEET_TO ); // Copy & name sheet
var rangeTo   = sheetTo.getRange( 1, 1, countRows, (countCols + Y_COLHEADER.length) ); // Define new range
var COL_SA    = 10; // Needs updating for accuracy
var COL_CSZ   = 11; // Needs updating for accuracy
//
// 3. Prep output sheet
rangeTo.clearContent(); // Clears for writing
rangeFrom.copyValuesToRange( sheetTo, 1, countCols, 1, countRows ); // Copies range to new sheet
for( m=1; m<Y_COLHEADER.length; m++ ){ rangeTo.getCell( 1, (countCols + m) ).setValue( Y_COLHEADER[m] ); }  // Write column headers
// for( n=START_ROW; n<=countRows; n++ ){ // Loop all rows
for( n=START_ROW; n<=START_ROW+5; n++ ){ // Loop all rows
  sa  = rangeTo.getCell( n, COL_SA  ).getValue(); // Fetch new input value
  csz = rangeTo.getCell( n, COL_CSZ ).getValue(); // Fetch new input value
  //
  // 4. Scrape and write
  Utilities.sleep( DELAY * 1000 ); // delayInSeconds( DELAY ); // Delay to avoid server request limits : Scheme replaced by Utilities.sleep(milliseconds) // function delay(){foo="bar";} // Necessary to delay server requests to avoid tripping security/usage constraints : Scheme replaced by Utilities.sleep(milliseconds) // function delayInSeconds( sec ){var t = setTimeout("delay()", sec*1000);} // call: delayInSeconds(3); Where 3 = t = number of seconds to delay : Scheme replaced by Utilities.sleep(milliseconds)
  yahoo = scrapeYahoo( sa, csz ); // Call scraping fxn array.
  // for(j=1;j<=yahoo.length;j++){for(k=1;k<THIS.length;k++){while(yahoo[j].indexOf(THIS[k])>-1){yahoo[j]=yahoo[j].replace(THIS[k],WITH[k]);}}}
  for( p=1; p<(Y_COLHEADER.length); p++ ){ rangeTo.getCell( n, (countCols + p) ).setValue( yahoo[p] ); } // Write scraped data out to cells.
  yahoo.splice( 0, yahoo.length ); // Resets variables
}}
// Redfin® | https://www.redfin.com/what-is-my-home-worth
// Fifth Third Bank | https://secure.53.com/mortgage/app/homevalue
/* function scrapeChase(){ // https://www.chase.com/online/Home-Lending/home-value-estimator.htm
	Location: https://valuemap.facorelogic.com/ValueMapService.asmx/GetPropertyInfoReport
	Headers:
		POST /ValueMapService.asmx/GetPropertyInfoReport HTTP/1.1
		Host: valuemap.facorelogic.com
		User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:15.0) Gecko/20100101 Firefox/15.0.1
		Accept: text/html,application/xhtml+xml,application/xml;q=0.9,* /*;q=0.8
		Accept-Language: en-us,en;q=0.5
		Accept-Encoding: gzip, deflate
		Content-Type: application/json; charset=utf-8
		Referer: https://valuemap.facorelogic.com/ValueMapMin.aspx?licenseCode=7b8d1ade5eb445ffbb25a3e7373cd933
		Content-Length: 299
		Cookie: __utma=211327122.553432545.1326041025.1348745444.1349228766.8; ValueMapUserID=2b45ec38-d157-41b4-9460-2f488e343b82; ValueMapVC=3; __utmz=211327122.1349228766.8.6.utmcsr=chase.com|utmccn=(referral)|utmcmd=referral|utmcct=/online/Home-Lending/home-value-estimator.htm; VM_SEARCH_HISTORY_WITH_RANK=%5B%7B%20ID%3A%20%27274110-0565%7C53033%27%2CAddress%3A%20%275008%20%20CORSON%20AVE%20%27%2CZIP%3A%2798108%27%2CRank%3A%206%2CSearchDate%3A%20new%20Date%28%27Tue%20Oct%2002%202012%2018%3A48%3A15%20GMT-0700%20%28Pacific%20Daylight%20Time%29%27%29%7D%5D; ValueMapSID=f5cb339e-5af9-480b-8507-53f91d95a2a5; __utmc=211327122; __utmb=211327122.6.10.1349228766
		DNT: 1
		Connection: keep-alive
		Pragma: no-cache
		Cache-Control: no-cache
	
bottomRightLatitude 32.916093565143264
bottomRightLongitude -117.1526348590851
licenseCode "7b8d1ade5eb445ffbb25a3e7373cd933"
licenseType "SC"
requestID 42040372
topLeftLatitude 32.9183271506031
topLeftLongitude -117.15620756149293
Source
{"licenseCode":"7b8d1ade5eb445ffbb25a3e7373cd933","licenseType":"SC","requestID":42040372,"topLeftLatitude":32.9183271506031,"topLeftLongitude":-117.15620756149293,"bottomRightLatitude":32.916093565143264,"bottomRightLongitude":-117.1526348590851}
}
*/
/* DataQuick® reference: http://www.dataquick.com/products/valuation/avm/
Industry-Leading Automated Valuation Models
In addition to DataQuick CMV and ValueSmart, we offer the following industry-leading models:
Freddie Mac's Home Value Explorer® (HVE)
Fiserv's Characteristics and Sales Analysis (CASA)
Collateral Analytics’ caValue
CoreLogic’s Home Price Analyzer (HPA)
CoreLogic’s PASS
CoreLogic’s PowerBASE 6.0
CoreLogic’s ValuePoint4
Real Info's i-VAL™
Real Info’s realAssessment
LPS SiteXValue
LPS ValueSure™
Vero's VeroVALUE
IntelliReal’s iAVM
*/
// City Data | http://www.city-data.com/zips/30438.html
// API List  | http://www.programmableweb.com/news/40-real-estate-apis-zillow-trulia-walk-score/2012/02/15