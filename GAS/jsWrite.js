function oAuth_requestToken(){ // Implement oAuth
	STEM = "https://accounts.google.com/o/oauth2/auth?"; // Reference: http://code.google.com/apis/accounts/docs/OAuth2UserAgent.html
	var params = "";
	var HEADER_LABEL = new Array();
	var HEADER_VALUE = new Array();
	HEADER_LABEL[1]  = "response_type";
	HEADER_VALUE[1]  = "token";
	HEADER_LABEL[2]  = "client_id";
	HEADER_VALUE[2]  = "640214129080.apps.googleusercontent.com";
	HEADER_LABEL[3]  = "redirect_uri";
	HEADER_VALUE[3]  = "https://creator.zoho.com/atlasgroup/dealdigger/";
	HEADER_LABEL[4]  = "scope";
	HEADER_VALUE[4]  = "https://spreadsheets.google.com/feeds"; // https%3A%2F%2Fspreadsheets.google.com%2Ffeeds
	HEADER_LABEL[5]  = "state";
	HEADER_VALUE[5]  = "";
	HEADER_LABEL[6]  = "approval_prompt";
	HEADER_VALUE[6]  = "auto";
	for(i=1;i<HEADER_LABEL.length;i++){params+="&"+HEADER_LABEL[i]+"="+HEADER_VALUE[i];}
	action = STEM + params; alert(action);
}
function writeToAPI_Google(entry, spreadsheetKey, worksheetId, row, col){ // Write to API — Google Spreadsheets
			{ // Tutorial
				{ // Variables
// key = 0AlLVOoV_2dFtdGpmOXE4OWpkeUE5RkJuS0FfakZDWXc; // from visual inspection of the URI by manual visitation via signed-in browser; (NOT via GET request to Google spreadsheet lookup utility).
// worksheetId = od6;  // Can be obtained from GET list of spreadsheets. Examples: od6, od4, od5, od7, oda, odb, odc, odd, etc.
				}
				{ // URI
// PUT https://spreadsheets.google.com/feeds/cells/0AlLVOoV_2dFtdGpmOXE4OWpkeUE5RkJuS0FfakZDWXc/od6/private/full/R1C1
				}
				{ // Headers
// Content-Type: application/atom+xml
// GData-Version: 3.0
// If-Match: *
// Auth: DQAAALsAAABTVeGdUmzRcBITzQhT7ZutV1i2txd6znuo21VokaZ8K_irPuCqCGFq21ivJmpa8E0k1WJ4HGRyqqlv5gpTyyWsMlqqzjSBWqAAIXGwHZ54SLKGpFjH00R_feZF686J-GU2flHnr3Y2y5NGtrmxzrtWHfH3aXP2XtJb0q0RcV_fxoTnjN9aiXOUBe6CXlWPn8dMNymb7v2o0-ddKOVQ2rZ2TSAaq6a3H0EXnng5P_MfJY9A7WNd8ai9y3Ieip5Bpnw
				}
				{ // Content — Example
// <entry xmlns="http://www.w3.org/2005/Atom"
//     xmlns:gs="http://schemas.google.com/spreadsheets/2006">
//  <id>https://spreadsheets.google.com/feeds/cells/0AlLVOoV_2dFtdGpmOXE4OWpkeUE5RkJuS0FfakZDWXc/od6/private/full/R1C1</id>
//   <link rel="edit" type="application/atom+xml"
//     href="https://spreadsheets.google.com/feeds/cells/0AlLVOoV_2dFtdGpmOXE4OWpkeUE5RkJuS0FfakZDWXc/od6/private/full/R1C1"/>
//   <gs:cell row="1" col="1" inputValue="300"/>
// </entry>
				}
				{ // Content — Template
// <entry xmlns="http://www.w3.org/2005/Atom"
//     xmlns:gs="http://schemas.google.com/spreadsheets/2006">
//   <id>https://spreadsheets.google.com/feeds/cells/key/worksheetId/private/full/R2C4</id>
//   <link rel="edit" type="application/atom+xml"
//     href="https://spreadsheets.google.com/feeds/cells/key/worksheetId/private/full/R2C4"/>
//   <gs:cell row="2" col="4" inputValue="300"/>
// </entry>
				}
			}
			{ // Parameters
			//	ACTION = "https://spreadsheets.google.com/feeds/cells/0AlLVOoV_2dFtdGpmOXE4OWpkeUE5RkJuS0FfakZDWXc/od6/private/full/R1C1";
			}
	{ // Headers
		var HEADER_LABEL = new Array();
		var HEADER_VALUE = new Array();
		HEADER_LABEL[1]  = "Content-Type";
		HEADER_VALUE[1]  = "application/atom+xml";
		HEADER_LABEL[2]  = "GData-Version";
		HEADER_VALUE[2]  = "3.0";
		HEADER_LABEL[3]  = "If-Match";
		HEADER_VALUE[3]  = "*";
		HEADER_LABEL[4]  = "Authorization";
		HEADER_VALUE[4]  = "DQAAALsAAABTVeGdUmzRcBITzQhT7ZutV1i2txd6znuo21VokaZ8K_irPuCqCGFq21ivJmpa8E0k1WJ4HGRyqqlv5gpTyyWsMlqqzjSBWqAAIXGwHZ54SLKGpFjH00R_feZF686J-GU2flHnr3Y2y5NGtrmxzrtWHfH3aXP2XtJb0q0RcV_fxoTnjN9aiXOUBe6CXlWPn8dMNymb7v2o0-ddKOVQ2rZ2TSAaq6a3H0EXnng5P_MfJY9A7WNd8ai9y3Ieip5Bpnw";
	}
	{ // Parameters
		spreadsheetKey   = "0AlLVOoV_2dFtdGpmOXE4OWpkeUE5RkJuS0FfakZDWXc"; // from visual inspection of the URI by manual visitation via signed-in browser; (NOT via GET request to Google spreadsheet lookup utility).
		worksheetId      = "od6"; // Can be obtained from GET list of spreadsheets. Examples: od6, od4, od5, od7, oda, odb, odc, odd, etc.
		row              = 1;
		col              = 1;
		entry            = 300;
	}
	{ // Variables
		{ // Action URI
		var action = "";
		action += "https://spreadsheets.google.com/feeds/cells/";
		action += spreadsheetKey; // Spreadsheet Key (Document ID): e.g., "0AlLVOoV_2dFtdGpmOXE4OWpkeUE5RkJuS0FfakZDWXc"
		action += "/";
		action += worksheetId; // Worksheet ID: e.g., "od6"
		action += "/private/full/R";
		action += row; // Row: e.g., 2
		action += "C";
		action += col; // Column: e.g., 4  // Test: action  = "https://secure.echosign.com/services/EchoSignDocumentService9";
		}
		{ // HTTP Payload
		var payload = "";
		payload += "<?xml version='1.0' encoding='UTF-8'?><entry xmlns=\"http://www.w3.org/2005/Atom\" xmlns:gs=\"http://schemas.google.com/spreadsheets/2006\"><id>";
		payload += action;
		payload += "</id><link rel=\"edit\" type=\"application/atom+xml\" href=\"";
		payload += action;
		payload += "\"/><gs:cell row=\"1\" col=\"1\" inputValue=\"";
		payload += entry; // E.g., 300
		payload += "\"/></entry>"; // alert(payload); // Test: payload  = "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"><soap:Body><testPing><apiKey>SZ4F86SD35Z3Z</apiKey></testPing></soap:Body></soap:Envelope>";
		}
	}
	{ // HTTP Request — Reference: http://www.w3schools.com/dom/dom_http.asp NOTE: USE GOOGLE URL SERVICES instead. XMLHttpRequest object won’t work due to single origin policy prohibiting cross-domain resource sharing
		xmlhttp = new XMLHttpRequest(); // Define new HTTP XML Object
		xmlhttp.open("PUT", action, true);
		for(i=1;i<HEADER_LABEL.length;i++){xmlhttp.setRequestHeader(HEADER_LABEL[i], HEADER_VALUE[i]);} //alert(HEADER_LABEL + HEADER_VALUE);
		xmlhttp.send(payload);
	}
}
Array.prototype.writeToAPI_Zoho = function(){ // Write to API — Zoho
	/*  XML Examples — Reference: https://api.creator.zoho.com/XML-RPC-API-Add-Records.html#HTTP_Method
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
POST http://creator.zoho.com/api/xml/dealdigger/Inventory/add/
Content-Type: application/x-www-form-urlencoded
Content: apikey=a950d63185b2a5a3d1eb703cc65474d5&ticket=6ef3826039ffd8f3cefae232a1a3f061&My_offer=1&Bid_accepted=true
******************** EXAMPLE 5 ******************** (update via REST)
POST http://creator.zoho.com/api/xml/dealdigger/Inventory/update/
Content-Type: application/x-www-form-urlencoded
Content: apikey=a950d63185b2a5a3d1eb703cc65474d5&ticket=6ef3826039ffd8f3cefae232a1a3f061&criteria=My_offer=1&Bid_accepted=false&reloperator=AND
******************** EXAMPLE 6 ******************** (update via RPC — reference: http://writer.zoho.com/public/help/edit-record-xml/fullpage)
POST http://creator.zoho.com/api/xml/write/apikey=a950d63185b2a5a3d1eb703cc65474d5&ticket=6ef3826039ffd8f3cefae232a1a3f061
Content-Type: application/x-www-form-urlencoded
Content example:
XMLString=<zohocreator><applicationlist><application name="dealdigger"><formlist><form name="Inventory"><update><criteria><reloperator>AND</reloperator>
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
	/*  Test values
		var ticket          = "2674e07ef7a4883a2ca4809f304ee9fc"; // Refresh ticket every seven days
		var applicationName = "dealdigger";
		var formName        = "Data";                             // Previously: "Inventory" // Previously: "Bid_Form"
		var fields          = ["Source", "Data"];
		var values          = [["src1","dat1"],["src2","dat2"]];
	*/
	{ // Parameters
		/*   Notes
			1. Input arrays (“fields” & “values”) often originate as a data table with column headers.
			2. Google Spreadsheet functions allows the range.getValues() method to extract the data table as a 2D-array[][]: [rowIndex][colIndex]
			3. The javascript array method .shift() can be applied to the data table 2D array.
			4. .shift() method removes 1st element of array & returns that element. References: http://www.w3schools.com/jsref/jsref_shift.asp, http://www.w3schools.com/jsref/jsref_obj_array.asp
			5. Example: function writeRangeToZoho(r1,r2,app,form){var values=range[r1][r2].getValues();writeToAPI_Zoho(app,form,values.shift(),values);} — Note: “... values.shift(),values ...”
			6. After values.shift() method is applied to function arguments, the resulting values argument is a 2D array [][] to be processed by this function
			7. “fields” can be either 1D or 2D array. An early test is made and classification variable assigned accordingly.
		*/
		{ // Arguments — input array = [applicationName, formName, fields, values]
		var applicationName = this[0]; // string	— e.g. "dealdigger";
		var formName 		= this[1]; // string	— e.g. "Inventory";
		var fields 			= this[2]; // 1D array	— think: top row of column headers in a data table
		var values 			= this[3]; // 2D array	— think: body of the data table containing records but no field/column headers, i.e. [recordIndex][fieldIndex] or [row][col]
		}
		{ // URL params
		var APIKEY        = "a950d63185b2a5a3d1eb703cc65474d5"; // var TICKET = "2987f30098a038ffcec139a4ffbcef4e"; // Refresh ticket every seven days
		var OPERATION     = "write";                            // other options: "add", "update" — Note: Even when “adding” new records, we tend to use the “write” operation because the add operation can be problematic.
		var LANGUAGE      = "xml";                              // other options: "csv", "json"
		var STEM          = "https://creator.zoho.com/api/";
		var METHOD        = "POST";                             // var APPLICATION = "dealdigger"; // var FORM = "Inventory"; // Previously: "Bid_Form"
		}
		{ // URL string
		var ticket        = writeToAPI_ZohoTicket();
		var ACTION_STRING = new Array();
		ACTION_STRING[1]  = STEM;
		ACTION_STRING[2]  = LANGUAGE;
		ACTION_STRING[3]  = "/";
		ACTION_STRING[4]  = OPERATION;
		ACTION_STRING[5]  = "/apikey=";
		ACTION_STRING[6]  = APIKEY;
		ACTION_STRING[7]  = "&ticket=";
		ACTION_STRING[8]  = ticket;
		}
		{ // Headers
		var HEADER_LABEL  = new Array();
		var HEADER_VALUE  = new Array();
		HEADER_LABEL[1]   = "Content-Type";
		HEADER_VALUE[1]   = "application/x-www-form-urlencoded";
		}
		{ // Other
		var n2=false;var field,j,i=fields.length;while((i--) && (!n2)){n2 = isArray(fields[i])} // “fields” can be either 1D or 2D array; if 2D, then n2==true;
		}
	}
	{ // 1. Payload
		var 		payload  = "";                  // Initialize payload construction
					payload += "XMLString=<ZohoCreator><applicationlist><application name='";       // Start cap
					payload += applicationName;
					payload += "'><formlist><form name='"
					payload += formName;
					payload += "'>";
			i=values.reverse().length;while(i--){//var leni=values.length;for(i=0;i<leni;i++){ // Loop over RECORDS
					payload += "<add>";
				if(n2){var lenj=fields[i].length}else{var lenj=fields.length} // NOTE: When array order matters, use "for" loop with j++ inside nested loop (using "while"/j--/.reverse() creates an error because .reverse() occurs on every loop iteration
			//	if(n2){var j=fields[i].reverse().length}else{var j=fields.reverse().length}
				/*while(j--){*/for(j=0;j<lenj;j++){ // Loop over FIELDS
					payload += "<field name='"; if(n2){field = fields[i][j]}else{field = fields[j]} // Fetch proper array element reference depending on 1D or 2D
					payload += field;               // e.g. "Full_address"
					payload += "'><value>";         // PAYLOAD_STRING[8] = "'><value><![CDATA[";
					payload += values[i][j];        // e.g. "123 Elm St"
					payload += "</value></field>";  // PAYLOAD_STRING[9] = "]]></value></field>";
				}	payload += "</add>";
			}		payload += "</form></formlist></application></applicationlist></ZohoCreator>";} // End cap
	{ // 2. URL + HTTP
		var i,action="";i=ACTION_STRING.reverse().length-1;while(i--){action+=ACTION_STRING[i]}  // Action URL — Example: http://creator.zoho.com/api/xml/write/apikey=a950d63185b2a5a3d1eb703cc65474d5&ticket=24ac84ca86e1d3fa3c79b2f0f3ef54ba
	//	try{var respTxt = action.http(METHOD, payload, HEADER_LABEL, HEADER_VALUE).responseText} // Execute HTTP Request — Exclude this method; It will not work due to browser “same origin policy” (Reference: http://en.wikipedia.org/wiki/Same_origin_policy)
	//	catch(e){Logger.log(e.message+": Error:writeToAPI_Zoho@method:http();Used UrlFetchApp.fetch()");   // Execute HTTP Request via Google Spreadsheets
		var advancedArgs = {method:METHOD, payload:payload, contentType:HEADER_VALUE[1]};
		var respTxt      = UrlFetchApp.fetch(action, advancedArgs).getContentText();}}
function writeToAPI_ZohoTicket(){ // Returns ticket value — fetches new one, if necessary
	/*	ticket object/array
		ticket[0] boolean true = expired; false = not expired
		ticket[1] string  ticket value/number
		ticket[2] date    timestamp/date of issue */
	{ // Parameters
		var buffer     = 1;                                              // Number of days to fetch/update ticket prior to expiry.
		var SS_KEY     = "0AlLVOoV_2dFtdHJWQ3NOQXBiWW5BRE1KNlZHNEtPYVE"; // Elements are taken from the URL in the address line of the browser of the open Google Spreadsheet
		var SHEET_NAME = "Sheet1";
		var range      = SpreadsheetApp.openById(SS_KEY).getSheetByName(SHEET_NAME).getRange(1,1,2,2);}
	{ // Code
		var i, now                  = +new Date;                      // number of milliseconds since the epoch (epoch = Jan 1, 1970)
		var               ticket    = new Array();                    // Initialize new ticket object as array of properties
		i=3;while(i---1){ ticket[i] = range.getCell(2,i).getValue()}  // Fetch ticket properties array [0]:expiry(boolean),[1]:value(long),[2]:timestamp(long — milliseconds since epoch)
		                  ticket[0] = (((now)>(ticket[2]+(1000*60*60*24*(7-buffer))))||(!ticket[2])); // Evaluate expiry — 7 days minus buffer (true = expired)
		if(ticket[0])	{ ticket[1] = writeToAPI_ZohoTicketFetch();   // If old ticket has expired... // ... update with new ticket NUMBER/VALUE
						  ticket[2] = now;                            // update TIMESTAMP
			i=3;while(i---1){range.getCell(2,i).setValue(ticket[i])}} // update CELLS with new values
		return ticket[1];}}
function writeToAPI_ZohoTicketFetch(){ // Fetches new ticket, parses, updates records & returns value
	{ // Sample Code: @Zoho
	/*	Test
map xml.apiTest()
{
    // 1. Select API URL.
    // a. For server-to-server Checkout API requests
    // ApiUrl = "https://sandbox.google.com/checkout/api/checkout/v2/merchantCheckout/Merchant/459875034068098/diagnose";
    // b. For Order Processing API requests
    // ApiUrl = "https://sandbox.google.com/checkout/api/checkout/v2/request/Merchant/459875034068098/diagnose";
    // c. For API Callback
    ApiUrl = "";
    ApiUrl = ApiUrl + "http://creator.zoho.com/api/xml/salespro/Google_Checkout_API_Callback/add/";
    ApiUrl = ApiUrl + "?apikey=a950d63185b2a5a3d1eb703cc65474d5";
    ApiUrl = ApiUrl + "&ticket=28c5bea669c983957fd961cf5051048a";
    ApiUrl = ApiUrl + "&Data=test";
    //
    // 2. Execute post task.
    // a. Put data map.
    xmlMap = map();
    xmlMap.put("<key>", "<value>");
    // b. Post.
    xmlResponse = postUrl(ApiUrl, xmlMap,false);
    //
    // 3. Return to call.
    return xmlResponse;
}*/
	/*	Get
map xml.apiTicket_Get()
{
    // PURPOSE
    // WHEN IT IS TIME TO UPDATE THE API TICKET, DO NOT USE THIS FUNCTION.
    // INSTEAD USE THE FUNCTION LABELED “apiTicket_Update.”
    // The purpose of this function is to retrieve a new API ticket upon the expiration of the old one.
    // It must be executed manually at the present time.
    // This function also replaces the old ticket and logs it in the account codes table view.
    //
    // 1. Store parameters
    // a. Username
    u  =  Account_Codes  [(Item_key_name == "Username" && ((Type == "All" && Product == "Account") && Vendor == "Zoho"))];
    Username = u.Item_value;
    // b. Password
    p  =  Account_Codes  [(Item_key_name == "Password" && ((Type == "All" && Product == "Account") && Vendor == "Zoho"))];
    Password = p.Item_value;
    //
    // 2. Construct URL string.
    Url = "";
    Url = Url + "https://accounts.zoho.com/login?";
    Url = Url + "servicename=ZohoCreator&";
    Url = Url + "FROM_AGENT=true&";
    Url = Url + "LOGIN_ID=";
    Url = Url + Username;
    Url = Url + "&PASSWORD=";
    Url = Url + Password;
    //
    // 3. Execute HTTP GET method.
    Response = getUrl(Url,false);
    return Response;
}*/
	/*	Parse
map xml.apiTicket_Parse()
{
    // WHEN IT IS TIME TO UPDATE THE API TICKET, DO NOT USE THIS FUNCTION.
    // INSTEAD USE THE FUNCTION LABELED “apiTicket_Update.”
    //
    // 1. Generate input map by calling the apiTicket function.
    InputMap = thisapp.xml.apiTicket_Get();
    /*
---------- Sub for test ----------
InputMap=map();
InputMap.put("responseCode","200");
InputMap.put("responseText","##Tue May 25 03:26:44 PDT 2010GETUSERNAME=nullWARNING=nullPASS_EXPIRY=-1TICKET=9f7e9bc6bda60562ac0f07dced09ad43RESULT=TRUE");
----------------------------------
* /
    // 2. Parse the key/value pair of the response map.
    InputCode = InputMap.get("responseCode");
    InputText = InputMap.get("responseText");
    //
    /* ---------- ************ ----------
    MarkerMap = map();
    MarkerMap.put("TimeStamp", "GETUSERNAME=");
    MarkerMap.put("GetUsername", "WARNING=");
    MarkerMap.put("Warning", "PASS_EXPIRY=");
    MarkerMap.put("PassExpiry", "TICKET=");
    MarkerMap.put("Ticket", "RESULT=");
    MarkerMapKeys = MarkerMap.keys();
    ------------ ************ ---------- * /
    //
    // 3. Initialize the output map.
    OutputMap = map();
    //
    // 4. Put the response code key/value pair to the output map.
    ResponseCode = InputCode;
    OutputMap.put("ResponseCode", ResponseCode);
    //
    // 5. Remove leading characters of the response and input text.
    Marker = " ";
    Kernel = InputText.getPrefix(Marker);
    InputText = InputText.removeFirstOccurence(Kernel);
    InputText = InputText.removeFirstOccurence(Marker);
    //
    // 6. Parse InputText...
    //
    // a. Get key.
    Key = "TimeStamp";
    Marker = "GETUSERNAME=";
    // --- Copy and paste ---
    Value = InputText.getPrefix(Marker);
    InputText = InputText.removeFirstOccurence(Value);
    InputText = InputText.removeFirstOccurence(Marker);
    OutputMap.put(Key, Value);
    //
    // b. Get key.
    Key = "GetUsername";
    Marker = "WARNING=";
    // --- Copy and paste ---
    Value = InputText.getPrefix(Marker);
    InputText = InputText.removeFirstOccurence(Value);
    InputText = InputText.removeFirstOccurence(Marker);
    OutputMap.put(Key, Value);
    //
    // c. Get key.
    Key = "Warning";
    Marker = "PASS_EXPIRY=";
    // --- Copy and paste ---
    Value = InputText.getPrefix(Marker);
    InputText = InputText.removeFirstOccurence(Value);
    InputText = InputText.removeFirstOccurence(Marker);
    OutputMap.put(Key, Value);
    //
    // d. Get key.
    Key = "PassExpiry";
    Marker = "TICKET=";
    // --- Copy and paste ---
    Value = InputText.getPrefix(Marker);
    InputText = InputText.removeFirstOccurence(Value);
    InputText = InputText.removeFirstOccurence(Marker);
    OutputMap.put(Key, Value);
    //
    // e. Get key.
    Key = "Ticket";
    Marker = "RESULT=";
    // --- Copy and paste ---
    Value = InputText.getPrefix(Marker);
    InputText = InputText.removeFirstOccurence(Value);
    InputText = InputText.removeFirstOccurence(Marker);
    OutputMap.put(Key, Value);
    //
    // f. Get final key.
    Key = "Result";
    Value = InputText;
    // --- Copy and paste ---
    OutputMap.put(Key, Value);
    //
    // 7. Return output.
    return OutputMap;
}*/
	/*	Update — use this to update ticket
void xml.apiTicket_Update()
{
    // PURPOSE
    // * * WHEN IT IS TIME TO UPDATE THE API TICKET, USE THIS FUNCTION. * *
    // Execute this function to get a new API ticket.
    // This function calls all other sub-functions.
    // To pick up the new API key value, go to the view labeled “Account Codes View.”
    //
    // 1. Delete prior ticket record.
    if (count(Account_Codes[((Type == "Prior" && Product == "API Ticket") && Vendor == "Zoho")])  >  0)
    {
        delete from Account_Codes[ ((Type == "Prior" && Product == "API Ticket") && Vendor == "Zoho") ];
    }
    //
    // 2. Re-label current record as "prior".
    if (count(Account_Codes[((Type == "Current" && Product == "API Ticket") && Vendor == "Zoho")])  >  0)
    {
        for each r in Account_Codes  [((Type == "Current" && Product == "API Ticket") && Vendor == "Zoho")]
        {
            r.Type = "Prior";
        }
    }
    //
    // 3. Add new record and label it "current".
    apiTicketMap = thisapp.xml.apiTicket_Parse();
    apiTicketMapKeys = apiTicketMap.keys();
    for each x in apiTicketMapKeys
    {
        insert into Account_Codes
        [
            Added_User = zoho.loginuser
            Item_key_name = x
            Item_value = apiTicketMap.get(x)
            Product = "API Ticket"
            Type = "Current"
            Vendor = "Zoho"
        ]
    }
}*/
	}
	{ // Parameters
		{ // Action
		var USERNAME  = "atlasgroup";
		var PASSWORD  = "lulu440amoura";
		var action    = "";
		var ACTION    = new Array();
			ACTION[1] = "https://accounts.zoho.com/login?";
			ACTION[2] = "servicename=ZohoCreator&";
			ACTION[3] = "FROM_AGENT=true&";
			ACTION[4] = "LOGIN_ID=";
			ACTION[5] = USERNAME;
			ACTION[6] = "&PASSWORD=";
			ACTION[7] = PASSWORD;
		}
		{ // Parse  // var ticketStr = "##Tue May 25 03:26:44 PDT 2010GETUSERNAME=nullWARNING=nullPASS_EXPIRY=-1TICKET=9f7e9bc6bda60562ac0f07dced09ad43RESULT=TRUE";
		//          0  1           2      3         4            5        6
		var LAB  = ["","TimeStamp","User","Warning","PassExpiry","Ticket","Result"];
		var QUE  = ["","#"        ,"NAME","ING"    ,"EXPIRY"    ,"KET"   ,"SULT"  ];
		var BEG  = ["","#"        ,"="   ,"="      ,"="         ,"="     ,"="     ];
		var END  = ["","GETUSER"  ,"WARN","PASS_"  ,"TIC"       ,"RE"    ,"E"     ];
		var MARK = 5;}}
	{ // Code
		var i=ACTION.reverse().length-1;while(i--)/*var len=ACTION.length;for(var i=1;i<len;i++)*/{action+=ACTION[i]}         // Construct action URL
		try     {var ticketStr = action.http("GET").responseText}             // HTTP GET request via standard browser
		catch(e){var ticketStr = UrlFetchApp.fetch(action).getContentText()}  // Alternate GET via Google Spreadsheets (if browser is not used to send request)
		return ticketStr.scrapeDataset(MARK, QUE, BEG, END)[MARK];}}
{ /* Fusion Tables: https://sites.google.com/site/scriptsexamples/custom-methods/fusion-tables-class/fusion-source
/**
 * ---FusionService---
 *
 *  Copyright (c) 2011 James Ferreira
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * FusionService 
 * @ author James Ferreira
 * @ documentation http://goo.gl/pBSvF
 *
 * @ requires Script Insert ID: ?????
 *           ObjService http://goo.gl/JdEHW
 *
 * @ requires The Fusion Table ID MUST be set in a Script property. 
 *           This will allow you to change it at anytime using
 *           ScriptProperties.setProperty('FUSION_ID', '<your ID>'); 
 *
 *
 * Search for records in a Fusion Table 
 *
 * @ params {string}  target   Quoted column name(s) ('First Name', 'Last Name') OR (*) for all 
 * @ params {string}  where    valid statement see http://goo.gl/SkHI1
 *                            'Last Name' CONTAINS IGNORING CASE 'Ferr' 
 *                             AND 'First Name' CONTAINS IGNORING CASE 'J'" 
 *
 * @ returns {array}           [[headers],[match row],[match row]...]
 *                            If no match returns []
 * /
function searchFusion(target, where){
  var values = [];
  if (target == '*'){
    var headers = getFusionHeaders();
    for(var i in headers){
      values.push("'"+headers[i]+"'"); 
    }   
  }else{
    values.push(target); 
  }
  var arrayResult = fusionRequest("get", "SELECT "+values.toString()+",ROWID FROM "+
                                  FUSION_ID+" WHERE "+ where).split(/\n/);
  for (var i in arrayResult){
    arrayResult[i] = arrayResult[i].split(/,/); 
  }
  arrayResult.splice(arrayResult.length-1, 1);
  return arrayResult;
}

/**
 * Updates a record in the Fusion table
 * Note: fusionObj must contain rowid of Fusion table record
 *
 * @ params  {object}  fusionObj  object with properties from cameled column names
 * @ returns {string}             OK if successful
 * /
function writeFusionObj(fusionObj){
  var values = [];
  var headers = getFusionHeaders();   
  for(var i in headers){
    if (fusionObj[camelString(headers[i])] != undefined)
    values.push("'"+headers[i] +"'='"+fusionObj[camelString(headers[i])]+"'"); 
  }  
 return fusionRequest("post", "UPDATE "+FUSION_ID+" SET "+values.toString()+
                      " WHERE ROWID = '"+fusionObj.rowid+"'") 
}

/**
 * Add a new record to a Fusion table
 *
 * @ params  {object}  fusionObj  object with properties from cameled column names
 * @ returns {integer}            rowid useful for unique ID of record
 * /
function insertFusionObj(fusionObj){
  var values = [];
  var columns =[];
  var headers = getFusionHeaders(); 
  
  for(var i in headers){
    columns.push("'"+headers[i] +"'");
    values.push("'"+fusionObj[camelString(headers[i])]+"'"); 
  }  
  return parseInt(fusionRequest("post", "INSERT INTO "+FUSION_ID+
                    " ("+columns.toString()+") VALUES ("+values.toString()+")").substring(5));
}

/**
 * Get the Fusion row ID for a given column header and unique value
 *
 * @ returns {integer}    Fusion ROWID for record
 * /
function getFusionROWID(header, key){
 return parseInt(fusionRequest("get", "SELECT ROWID FROM "+FUSION_ID+
                               " WHERE '"+header+"'='"+key+"'").substring(5));
}

/**
 * get the column header names from Fusion Table
 *
 * @ returns {array}    [header, header, ...]
 * /
function getFusionHeaders(){
  var headers = [];
  var result = fusionRequest("get", "DESCRIBE "+FUSION_ID).split(/\n/);
    for (var i in result){
    result[i] = result[i].split(/,/); 
    headers.push(result[i][1]);  
  }  
  headers.splice(0, 1);
  headers.splice(headers.length-1, 1);
  return headers;  
}

/**
 * Deletes a record in the Fusion Table
 *
 * @ params  {string}  rowid  the ID of a Fusion table row
 * /
function deleteFusionRow(rowid){  
   fusionRequest("post", "DELETE FROM "+FUSION_ID+" WHERE ROWID = '"+rowid+"'");  
}

/**
 * The get or post request to the Fusion API 
 *
 * @ params  {string}  reqMethod  get or post
 * @ params  {string}  sql        String  A sgl type request see http://goo.gl/aVP3B
 * @ returns {integer}            Fusion rowid useful for unique ID of record
 * /
function fusionRequest(method, sql) {

  var url = "https://www.google.com/fusiontables/api/query";
  
  if (USE_OAUTH){
    var fetchArgs = googleOAuth_();   
  }else{
    var fetchArgs = new Object();
    fetchArgs.headers = {"Authorization": "GoogleLogin auth=" + getAuthToken_()};
  } 
  fetchArgs.method = method; 
   
  if( method == 'get' ) {
    url += '?sql='+sql;
    fetchArgs.payload = null;
  } else{
    fetchArgs.payload = 'sql='+sql;
  } 
  return UrlFetchApp.fetch(url, fetchArgs).getContentText(); 
}

/**
 * @ private for OAuth
 * /
function googleOAuth_() {
  var oAuthConfig = UrlFetchApp.addOAuthService('fusion');
  oAuthConfig.setRequestTokenUrl("https://www.google.com/accounts/"+
             "OAuthGetRequestToken?scope=https://www.google.com/fusiontables/api/query");
  oAuthConfig.setAuthorizationUrl("https://www.google.com/accounts/OAuthAuthorizeToken");
  oAuthConfig.setAccessTokenUrl("https://www.google.com/accounts/OAuthGetAccessToken");
  oAuthConfig.setConsumerKey('anonymous');
  oAuthConfig.setConsumerSecret('anonymous');
  return {oAuthServiceName:'fusion', oAuthUseToken:"always"};
}


/**
 * @ private for client Auth
 * @ returns String(auth token for a user)
 * / 
function getAuthToken_() {

  var response = UrlFetchApp.fetch("https://www.google.com/accounts/ClientLogin", {
      method: "post",
      payload: "accountType=GOOGLE" +
               "&Email=" + ScriptProperties.getProperty('CUSTOMER_KEY') + 
               "&Passwd=" + encodeURIComponent(ScriptProperties.getProperty('CUSTOMER_SECRET'))+ 
               "&service=fusiontables" +
               "&Source=testing"
  });
  var responseStr = response.getContentText();
  responseStr = responseStr.slice(responseStr.search("Auth=") + 5, responseStr.length);
  responseStr = responseStr.replace(/\n/g, "");
  return responseStr;
}


/**
 * Used to authenticate to Fusion Tables
 * Run it twice!
 * /
function doOAuth(){
  var method = 'get';
  var sql = "SHOW TABLES";  
  Logger.log(fusionRequest(method,sql));
}

var USE_OAUTH = true; 
var FUSION_ID = ScriptProperties.getProperty('FUSION_ID');
*/
}