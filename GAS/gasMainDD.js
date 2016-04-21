function main_realtor(){var j,m=realtorMarkets(),s=Object.keys(m),i=s.length;while(i--){j=m[s[i]].length;while(j--){realtorScrape(m[s[i]],m[s[i]][j])}}}//Scrapes markets() from Realtor.com
function realtorMarkets(){ // Returns an object specifying all markets from which to fetch data
    /*  Note: This function replaces the following code/structure
        var city  = [,"phoenix"];
        var state = [,"az"     ];
        var j,i=city.length;while(i---1){j=1;while(realtorScrape(j,state[i],city[i])){j++;}} */
    return	{/*
				"AZ"	:	[
							,	"Phoenix"
							,	"Flagstaff"
							]
			,*/ "CA"	:	[/*
							,	"Los-Angeles"	// Check syntax for multiple words by inspecting URL at Realtor.com // Ex. http://www.realtor.com/search/searchresults.aspx?sby=1&pgsz=10&loc=san-diego%2c+ca&pr=false&status=foreclosures&pg=1
							,	"San-Francisco"
							,	"Sacramento"
							,*/	"San-Diego"
							]
			}
}
// Return function here: realtorScrape(state,city)
String.prototype.replaceRealtorDotCom = function(){ // Replaces ’ single quotes with ” double quotes in front of JSON object top-level property identifiers at Realtor.com // var str=":\"1138662264\"},'538940236':{\"ActionType\":";
    var i,str=this,patt=/'\d{9,}'/g,matches=str.match(patt);try{i=matches.length}catch(e){return str;};while(i--){ //var patt=/'538940236'/g; // Generalizes the specific case example given // Reference: http://www.w3schools.com/jsref/jsref_regexp_nxcomma.asp // Array of pattern matches // Loops over all pattern matches
    str=str.replace(matches[i],matches[i].replaceAll("'","\""))}return str;} // Replaces single quotes with double quotes in matched patterns only. Therefore, leaves standing addresses with single quotes (e.g., 123 Roue D'Orro Lane)
function realtorDataGate(ob,maxPrice,sfr){ // @return {array(boolean)} Filter scraped results to upload based on: (i) price, (ii) type (sfr), (iii) freshness & (iv) duplications // Note: Revised 12/31/2012 due to changes in source data structure
    if(maxPrice==null){maxPrice=300000}        if(ob.PropertyPrice > maxPrice             ){return [false,ob];}  // Gate #1 : Price : under $300k
 // if(sfr     ==null){sfr     =true} ;if(sfr){if(/#/.test(ob.address)                    ){return [false,ob];}} // Deprecated: (no "#" in address) 
    if(sfr     ==null){sfr     =true  }if(sfr){if(ob.PropertyType[0]!="Single Family Home"){return [false,ob];}} // Gate #2 : Type  : SFR only 
 // try{ob.JsonData=JSON.parse(ob.JsonData.replaceAll("\\",""))             ;}catch(e){Logger.log(e.message)}    // Deprecated // Convert .JsonData property from string to object
 // try{ob.mlsNumber=ob.JsonData.sn           .scrape("MLS #:"   ," ",")")[1]}catch(e){Logger.log(e.message)}    // Deprecated // Extract/scrape MLS, deposits it at top level property
    try{ob.mlsNumber=ob.ListingID}catch(e){Logger.log(e.message)} // UdbListingId[0] // ob.mprId=ob.MprId // Later, found this is one level deep... ob.WebAddress.scrape("MlsListID","=","&")[1] // "WebAddress":"?MlsName=sandiego&MlsListID=120062061&SourceID=realtor", // ob.AgentBrokerWebsiteA250.scrape("MlsListID","=","&")[1] // "AgentBrokerWebsiteA250":"?MlsName=sandiego&MlsListID=120062061&SourceID=realtor
 // ob.timestamp=Date.parse(new Date());var recentDateParse=ob.JsonData.recentDate.split("-");recentDateParse[2]=recentDateParse[2].getPrefix("T");ob.recentDateParse=Date.parse(new Date(recentDateParse[0],recentDateParse[1],recentDateParse[2])); // Deprecated // Establish date/time variables
	ob.timestamp=Date.parse(new Date());try{ob.recentDateParse=ob.UpdateTime.scrape("Date","(",")")[1]}catch(e){Logger.log(e.message); // Establish date/time variables
                       try{ob.recentDateParse=ob.ListDate  .scrape("Date","(",")")[1]}catch(e){Logger.log(e.message); // "UpdateTime":"/Date(1356678000000)/", // "ListDate":"/Date(1356678000000)/",
						   ob.recentDateParse=ob.timestamp;}}
	if((ob.timestamp-ob.recentDateParse)>(2*1000*60*60*24)								  ){return [false,ob];}  // Gate #3 : // Timing: within 24/48 hours (24 hours became 48 due to UTC offset from local timezone)
 // try{if(ScriptDb.getMyDb().query({source:{mlsNumber:ob.source.mlsNumber}}).getSize()   ){return [false,ob];}}catch(e){Logger.log(e.message)} // Deprecated 12/31/2012
	try{if(ScriptDb.getMyDb().query({        mlsNumber:ob       .mlsNumber }).getSize()   ){return [false,ob];}}catch(e){Logger.log(e.message)} // Gate #4 : // Duplicates: no duplicates in system (by MLS#)
																							return [true ,ob];}  // Return true if all gates are passed
String.prototype.realtorScrapeDetail = function(){ // Returns property data as object // Scrapes property details page from Realtor.com // URL ex. "www.realtor.com/realestateandhomes-detail/1285-Brookes-Ter_San-Diego_CA_92103_M22073-99729";
    var page    = UrlFetchApp.fetch(this).getContentText();
	var scrape1 = page.scrape(",\"Version\":\""            , "\"Listing\":", ",\"LST_Event\":" )[1] + "}"; // a JSON string
    var scrape2 = page.scrape("\"MPRData\":{\"Attributes\"", ":"           , ",\"Cargo\":["    )[1]      ; // a JSON string
    return JSON.parse((scrape1+scrape2).replaceAll("}{",","));                                             // Concat {x:y}{a:b} to {x:y,a:b} in JSON
    /* Data object model — scrape1 — Remarks, comments, listing status, listing date // remarks/comments = r.LST_Attributes[21].attribute_value; listingStatus=r.LST_Categorized_Attributes[1].MoveListingAttributes[0].DisplayValue.getSuffix("Listing Status: "); listingDate=r.LST_Categorized_Attributes[1].MoveListingAttributes[1].DisplayValue.scrape("Listing Date:"," "," ")[1];
{
	"BuyerAgent":{},
	"BuyerOffice":{},
	"Cargo":[],
	"Debug":{
		"BRMsg":"",
		"Cargo":[],
		"ClientMessage":"",
		"DebugString":"",
		"LastLoaded":"",
		"LoadTime":"00:00:00 Last loaded 10\/10\/2012 4:39:09 AM",
		"Version":""
	},
	"ForeClosure":true,
	"ForeClosureRawText":null,
	"ForeClosureText":"Foreclosed",
	"LST_Agent_Parties":[
		{
		"AgentInfo":{
			"AdvInfo":null,
			"LST_Media":[],
			"OfficeInfo":{
				"AdvInfo":null,
				"LST_Brokers":[],
				"address_line":"940 Eastlake Parkway",
				"city":"Chula Vista",
				"datasource_id":555,
				"email":null,
				"fax":null,
				"nrds_office_id":null,
				"office_id":220489,
				"office_name":"Prudential California Realty",
				"phone":"(619)946-1900",
				"source_office_id":"69935",
				"state":"CA",
				"status":null,
				"udb_office_id":19816121,
				"url":null,
				"when_created":"\/Date(1211280300000-0700)\/",
				"when_updated":"\/Date(1348142820000-0700)\/",
				"zip":null
			},
			"address_line":null,
			"agent_id":1290009925,
			"agent_name":"Ruth Reyes",
			"city":"Chula Vista",
			"country":"USA",
			"datasource_id":555,
			"email":null,
			"fax":"(619)421-5606",
			"home_phone":null,
			"idx_enabled":false,
			"mobile_phone":null,
			"nrds_member_id":null,
			"office_id":220489,
			"office_phone":"(619)946-1900",
			"source_agent_id":"658315",
			"state":"CA",
			"status":null,
			"udb_agent_id":0,
			"url":null,
			"when_created":"\/Date(1337256360000-0700)\/",
			"when_updated":"\/Date(1348142820000-0700)\/",
			"zip":"91910"
		},
		"OfficeInfo":{
			"AdvInfo":null,
			"LST_Brokers":[],
			"address_line":"940 Eastlake Parkway",
			"city":"Chula Vista",
			"datasource_id":555,
			"email":null,
			"fax":null,
			"nrds_office_id":null,
			"office_id":220489,
			"office_name":"Prudential California Realty",
			"phone":"(619)946-1900",
			"source_office_id":"69935",
			"state":"CA",
			"status":null,
			"udb_office_id":19816121,
			"url":null,
			"when_created":"\/Date(1211280300000-0700)\/",
			"when_updated":"\/Date(1348142820000-0700)\/",
			"zip":null
			},
		"agent_id":1290009925,
		"listing_id":17792024,
		"office_id":220489,
		"type_id":1,
		"type_name":"agent"
		}
	],
	"LST_Attributes":[
		{ // [0]
		"DisplayValue":"Area: South Bay",
		"Flag":1,
		"PropAttrCatgeory":"Location",
		"SortString":"00000010",
		"attribute_id":112,
		"attribute_value":"South Bay",
		"common_code":"LstArea",
		"propAttrDesc":"Area",
		"propAttrName":"Area",
		"propAttrSource":null,
		"rex_code":"FAREA "
		},
		{ // [1]
		"DisplayValue":"Subdivision: Princess Del Sol",
		"Flag":1,
		"PropAttrCatgeory":"Location",
		"SortString":"00000012",
		"attribute_id":719,
		"attribute_value":"Princess Del Sol",
		"common_code":"Subdivision",
		"propAttrDesc":"Subdivision",
		"propAttrName":"Subdivision",
		"propAttrSource":null,
		"rex_code":"GSUBNM"
		},
		{ // [2]
		"DisplayValue":"2 total full bath(s)",
		"Flag":1,
		"PropAttrCatgeory":"Room description",
		"SortString":"00000030",
		"attribute_id":36,
		"attribute_value":"2",
		"common_code":"BathsFull",
		"propAttrDesc":"Number of full bathrooms",
		"propAttrName":"Number_of_full_bathrooms",
		"propAttrSource":null,
		"rex_code":"IFBA "
		},
		{ // [3]
		"DisplayValue":"1 stories",
		"Flag":1,
		"PropAttrCatgeory":"Story",
		"SortString":"00000044",
		"attribute_id":62,
		"attribute_value":"1",
		"common_code":"Stories",
		"propAttrDesc":"Number of stories",
		"propAttrName":"nbr_story",
		"propAttrSource":null,
		"rex_code":"ESTOR "
		},
		{ // [4]
		"DisplayValue":"Type: Detached",
		"Flag":1,
		"PropAttrCatgeory":"New construction",
		"SortString":"00000053",
		"attribute_id":1355,
		"attribute_value":"Detached",
		"common_code":"Type",
		"propAttrDesc":"New home",
		"propAttrName":"New_home",
		"propAttrSource":null,
		"rex_code":"ITYPEH,GCNNOC,FRENTL,FSALE"
		},
		{ // [5]
		"DisplayValue":"Kitchen",
		"Flag":1,
		"PropAttrCatgeory":"Room description",
		"SortString":"00000059",
		"attribute_id":52,
		"attribute_value":"YES",
		"common_code":"KitchenPresent",
		"propAttrDesc":"Kitchen present",
		"propAttrName":"KitchenPresent",
		"propAttrSource":null,
		"rex_code":"IRKIT "
		},
		{ // [6]
		"DisplayValue":"Master Bedroom is 12x12",
		"Flag":1,
		"PropAttrCatgeory":"Misc",
		"SortString":"00000067",
		"attribute_id":2108,
		"attribute_value":"12x12",
		"common_code":"MasterBedroomArea",
		"propAttrDesc":"Not standardized",
		"propAttrName":"Not_standardized",
		"propAttrSource":null,
		"rex_code":"IDMMBR"
		},
		{ // [7]
		"DisplayValue":"Living room is 16x17",
		"Flag":1,
		"PropAttrCatgeory":"Misc",
		"SortString":"00000068",
		"attribute_id":2107,
		"attribute_value":"16x17",
		"common_code":"LivingRoomArea",
		"propAttrDesc":"Not standardized",
		"propAttrName":"Not_standardized",
		"propAttrSource":null,
		"rex_code":"IDMLV "
		},
		{ // [8]
		"DisplayValue":"Kitchen is 23x8",
		"Flag":1,
		"PropAttrCatgeory":"Misc",
		"SortString":"00000071",
		"attribute_id":2106,
		"attribute_value":"23x8",
		"common_code":"KitchenArea",
		"propAttrDesc":"Not standardized",
		"propAttrName":"Not_standardized",
		"propAttrSource":null,
		"rex_code":"IDMKIT"
		},
		{ // [9]
		"DisplayValue":"2 car garage(s)",
		"Flag":1,
		"PropAttrCatgeory":"Garage\/Parking",
		"SortString":"00000096",
		"attribute_id":49,
		"attribute_value":"2",
		"common_code":"Garage",
		"propAttrDesc":"Garage",
		"propAttrName":"Number_of_garages",
		"propAttrSource":null,
		"rex_code":"EP#GAR, EPGAR"
		},
		{ // [10]
		"DisplayValue":"Attached parking",
		"Flag":1,
		"PropAttrCatgeory":"Misc",
		"SortString":"00000122",
		"attribute_id":778,
		"attribute_value":"Yes",
		"common_code":"AttachedParking",
		"propAttrDesc":"Not standardized",
		"propAttrName":"Not_standardized",
		"propAttrSource":null,
		"rex_code":"EPATTC"
		},
		{ // [11]
		"DisplayValue":"Interior features: Bedroom #2 is 10x10, Bedroom #3 is 10x9, Laundry in the Garage",
		"Flag":0,
		"PropAttrCatgeory":"Interior Features",
		"SortString":"00000136",
		"attribute_id":51,
		"attribute_value":"Bedroom #2 is 10x10, Bedroom #3 is 10x9, Laundry in the Garage",
		"common_code":"IntFeatures",
		"propAttrDesc":"Interior features",
		"propAttrName":"InteriorFeature",
		"propAttrSource":null,
		"rex_code":"INTFTS"
		},
		{ // [12]
		"DisplayValue":"Exterior features: Full Fencing, Covered Patio, Slab Patio",
		"Flag":0,
		"PropAttrCatgeory":"Misc",
		"SortString":"00000139",
		"attribute_id":90,
		"attribute_value":"Full Fencing, Covered Patio, Slab Patio",
		"common_code":"ExtFeatures",
		"propAttrDesc":"Not standardized",
		"propAttrName":"Not_standardized",
		"propAttrSource":null,
		"rex_code":"EXTFTS"
		},
		{ // [13]
		"DisplayValue":"Exterior construction: Stucco Siding, Built on Site",
		"Flag":0,
		"PropAttrCatgeory":"Exterior Features",
		"SortString":"00000140",
		"attribute_id":911,
		"attribute_value":"Stucco Siding, Built on Site",
		"common_code":"Exterior",
		"propAttrDesc":"Exterior features",
		"propAttrName":"Exterior_features",
		"propAttrSource":null,
		"rex_code":"EXTSID"
		},
		{ // [14]
		"DisplayValue":"Roofing: Composition",
		"Flag":0,
		"PropAttrCatgeory":"Exterior Features",
		"SortString":"00000142",
		"attribute_id":124,
		"attribute_value":"Composition",
		"common_code":"Roof",
		"propAttrDesc":"Roof",
		"propAttrName":"Roof",
		"propAttrSource":null,
		"rex_code":"EXRFFT"
		},
		{ // [15]
		"DisplayValue":"Lot features: Lot is 5200 SqFt.",
		"Flag":0,
		"PropAttrCatgeory":"Misc",
		"SortString":"00000242",
		"attribute_id":31,
		"attribute_value":"Lot is 5200 SqFt.",
		"common_code":"LotDescription",
		"propAttrDesc":"Not standardized",
		"propAttrName":"Not_standardized",
		"propAttrSource":null,
		"rex_code":"ELOTFT"
		},
		{ // [16]
		"DisplayValue":"Topography: Level",
		"Flag":1,
		"PropAttrCatgeory":"Misc",
		"SortString":"00000274",
		"attribute_id":912,
		"attribute_value":"Level",
		"common_code":"Topography",
		"propAttrDesc":"Not standardized",
		"propAttrName":"Not_standardized",
		"propAttrSource":null,
		"rex_code":"TOPFTS"
		},
		{ // [17]
		"DisplayValue":"Utilities present: Water Meter on Property, Sewer System Connected",
		"Flag":1,
		"PropAttrCatgeory":"Interior Features",
		"SortString":"00000279",
		"attribute_id":908,
		"attribute_value":"Water Meter on Property, Sewer System Connected",
		"common_code":"UtilitiesPresent",
		"propAttrDesc":"Utilities present",
		"propAttrName":"Utilities_present",
		"propAttrSource":null,
		"rex_code":"UTLFTS"
		},
		{ // [18]
		"DisplayValue":"Foreclosure source name: SDCA",
		"Flag":0,
		"PropAttrCatgeory":"Misc",
		"SortString":"99999999",
		"attribute_id":9,
		"attribute_value":"SDCA",
		"common_code":"LstForeclosureSourceName",
		"propAttrDesc":"Not standardized",
		"propAttrName":"Not_standardized",
		"propAttrSource":null,
		"rex_code":null
		},
		{ // [19]
		"DisplayValue":"Parking features: Garage Parking Description: Attached Garage. Garage Parking Spaces: 2.",
		"Flag":1,
		"PropAttrCatgeory":"Misc",
		"SortString":"99999999",
		"attribute_id":1529,
		"attribute_value":"Garage Parking Description: Attached Garage. Garage Parking Spaces: 2.",
		"common_code":"ParkingFeatures",
		"propAttrDesc":"Not standardized",
		"propAttrName":"Not_standardized",
		"propAttrSource":null,
		"rex_code":"EPATCC,EPATCG,EPPARK"
		},
		{ // [20]
		"DisplayValue":"AdrDisplay: Address display",
		"Flag":0,
		"PropAttrCatgeory":"Misc",
		"SortString":"99999999",
		"attribute_id":1,
		"attribute_value":"Address display",
		"common_code":"AdrDisplay",
		"propAttrDesc":"Not standardized",
		"propAttrName":"Not_standardized",
		"propAttrSource":null,
		"rex_code":null
		},
		{ // [21]
		"DisplayValue":"MLS Description: Single story house in Princess Del Sol Area. Spacious, tiled living room, updated kitchen, 2 car attached garage, laminate flooring in master bedroom, good size backyard with covered patio, gated entrance, easy access to freeway 805, within walking distance to schools, shops and public transportation. Property sold in as-is condition, no FHA or VA due to condition. House needs some work",
		"Flag":0,
		"PropAttrCatgeory":"Remarks",
		"SortString":"99999999",
		"attribute_id":110,
		"attribute_value":"Single story house in Princess Del Sol Area. Spacious, tiled living room, updated kitchen, 2 car attached garage, laminate flooring in master bedroom, good size backyard with covered patio, gated entrance, easy access to freeway 805, within walking distance to schools, shops and public transportation. Property sold in as-is condition, no FHA or VA due to condition. House needs some work",
		"common_code":"InternetRemarks",
		"propAttrDesc":"Public Remarks",
		"propAttrName":"RPLstInternetRemarks",
		"propAttrSource":null,
		"rex_code":null
		},
		{ // [22]
		"DisplayValue":"Property sale type: Foreclosed",
		"Flag":1,
		"PropAttrCatgeory":"Misc",
		"SortString":"99999999",
		"attribute_id":3,
		"attribute_value":"Foreclosed",
		"common_code":"LSTSaleType",
		"propAttrDesc":"Not standardized",
		"propAttrName":"Not_standardized",
		"propAttrSource":null,
		"rex_code":null
		},
		{ // [23]
		"DisplayValue":"Foreclosure source type: Mls",
		"Flag":0,
		"PropAttrCatgeory":"Misc",
		"SortString":"99999999",
		"attribute_id":8,
		"attribute_value":"Mls",
		"common_code":"LstForeclosureSourceType",
		"propAttrDesc":"Not standardized",
		"propAttrName":"Not_standardized",
		"propAttrSource":null,
		"rex_code":null
		},
		{ // [24]
		"DisplayValue":"Living Room",
		"Flag":1,
		"PropAttrCatgeory":"Room description",
		"SortString":"99999999",
		"attribute_id":1523,
		"attribute_value":"YES",
		"common_code":"LivingRoomPresent",
		"propAttrDesc":"LivingRoom Present",
		"propAttrName":"LivingRoomPresent",
		"propAttrSource":null,
		"rex_code":null
		},
		{ // [25]
		"DisplayValue":"Community Name: SOUTH SD",
		"Flag":1,
		"PropAttrCatgeory":"Misc",
		"SortString":"99999999",
		"attribute_id":1512,
		"attribute_value":"SOUTH SD",
		"common_code":"ComName",
		"propAttrDesc":"Not standardized",
		"propAttrName":"Not_standardized",
		"propAttrSource":null,
		"rex_code":null
		}
	],
	"LST_Categorized_Attributes":[
		{ // [0]
		"DisplayName":"ExtFeatures",
		"DisplayOrder":1,
		"ID":3,
		"MoveListingAttributes":
			[
				{ // [0]
				"DisplayName":"Lot Description",
				"DisplayOrder":1400,
				"DisplayValue":"Lot Description: Lot is 5200 SqFt.",
				"ID":31
				}
			]
		},
		{ // [1]
		"DisplayName":"ListingInfo1",
		"DisplayOrder":9,
		"ID":7,
		"MoveListingAttributes":
			[
				{ // [0]
				"DisplayName":"Listing Status",
				"DisplayOrder":5900,
				"DisplayValue":"Listing Status: Contingent",
				"ID":7
				},
				{ // [1]
				"DisplayName":"Listing Date",
				"DisplayOrder":6200,
				"DisplayValue":"Listing Date: 2012-09-13 00:00:00",
				"ID":45
				}
			]
		}
	]
}
*/
	/* Data object model — scrape2 — "TAXES_AMOUNT"
"APN":"4523311200",
"ARCHITECTURE_STYLE":null,
"BATHROOMS_3QTR":null,
"BATHROOMS_FULL":2,
"BATHROOMS_HALF":1,
"BATHROOMS_QUARTER":null,
"BATHROOMS_TOTAL":null,
"BEDROOMS":null,
"ESTIMATED_VALUE":864692,
"ESTIMATED_VALUE_HIGH":null,
"ESTIMATED_VALUE_LOW":null,
"FEATURES":null,
"FULL_STREET_NAME":"Brookes Ter",
"HIGH_SCHOOL":null,
"IS_CELEBRITY_PROPERTY":false,
"LAST_SALE_AMOUNT":707500,
"LAST_SALE_DATE":"\/Date(1059030000000-0700)\/",
"LOT_FEATURES":null,
"LOT_SIZE":null,
"MIDDLE_SCHOOL":null,
"NEIGHBORHOOD":null,
"PROPERTY_TYPE":null,
"PROPERTY_TYPE_STANDARD":"Single Family Home",
"RECENTLY_SOLD":false,
"SCHOOL_DISTRICT":null,
"SQFT":null,
"STATE":null,
"STATUS":null,
"STORIES":2,
"TAXES_AMOUNT":8767,
"TAX_ASSESSED_VALUE":785146,
"TAX_YEAR":2011,
"TOTAL_PARKING_COUNT":0,
"UNITS":null,
"VIEW_CODE":"Y",
"WATERFRONT_FEATURES":null,
"WATERFRONT_PROPERTY":null,
"YEAR_BUILT":1933,
"ZONING":"1"
*/
}
/* LAG COPY — DealDigger™
	{ // Code
function auth (){}
function size (){Logger.log(ScriptDb.getMyDb().query({}).getSize());}
function showAll(){var db=ScriptDb.getMyDb();var results=db.query({});while(results.hasNext()){var r=results.next();Logger.log(/*Utilities.jsonStringify* /JSON.stringify(r));}} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function show (){var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())}showAll();}
function delet(){var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())}deleteAll();}
function doGet(){ // Reference: https://sites.google.com/site/appsscripttutorial/miscellaneous/creating-form-elements-dynamically-using-google-apps-script-gas
 // var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---2){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    var pageName = SitesApp.getActivePage().getName();switch(pageName){
            case   "coo"       : return coo      () ;break;
            case   "agents"    : return agents   () ;break;
            case   "demo"      : return demo     () ;break;
            case   "inventory" : return inventory() ;break;
         default               :                     break;}}     
// ---------------------------------------------------------------- COO ----------------------------------------------------------------
function coo(){ // ------------------------------------------------ COO ----------------------------------------------------------------
    var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---2){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    var r,db=ScriptDb.getMyDb(),result=db.query({/*avm:true,* /table:"situs",tag:{inventory:true}}).sortBy(/*"avm.stat.ratio"* /"price",db.ASCENDING,db.NUMERIC);
    var REP      = 8;
    var app      = UiApp.createApplication();
    var scr      = app.createScrollPanel().setSize("100%","2000");
    var vpan     = app.createVerticalPanel();
    var tab      = app.createFlexTable().setBorderWidth(1);vpan.add(tab);scr.add(vpan);app.add(scr);
    var handler  = app.createServerHandler("handleSubmit").addCallbackElement(vpan);
    var k,j,i,x,com,arv,rep,cof,len,handleRadio=[],radioValue=[],button=[],offer1=[],offer2=[],go=[],LINK=[],PROP=[],HEAD=[
                 "Y","Z","D","E","R","S","H",                 // Links
                 "address","b|b|s","tax|sold|in","psf","grm", // Property fields
                 "rent","ia","price","avm","stat","set","%",  // Property fields
                 "no","go","arv","offer","analysis","repair", // Added    fields
                 "offer","counter","contract","assign","send" // Added    fields
                 ];
    var STYLPATT = ["white","white","white","aliceblue"];var patlen=STYLPATT.length;                                // Alternating color pattern of rows
    function writeHead(row,arr){ii=arr.length;while(ii--){tab.setText          (row,ii,arr[ii]                    ) // Write header row
                                                             .setStyleAttribute(row,ii,"backgroundColor","#150035")
                                                             .setStyleAttribute(row,ii,"color"          ,"white"  )
                                                             .setStyleAttribute(row,ii,"fontWeight"     ,"bold"   );}}
    j=0;while(result.hasNext()){ // Start row counter // Load records
        var ia,grm,psf,r=result.next(),avmStatSet=[],rent=r.avm.dataset.zillow.rentzestimate;
        if(rent){grm=Math.round(r.price/(12*rent));ia=Math.round(r.offer.beforeRepairs.auto/100/*rent/10* /)/10;}else{grm="—";ia="—";} // Compute gross rent margin “grm” // Compute price per income approach “ia”
        if(r.avm.stat.autoEst&&r.avm.combo.sqft){psf=Math.round(r.avm.stat.autoEst/r.avm.combo.sqft)}else{psf="—";} // Compute price per square foot “psf”
        i=r.avm.stat.set.length;while(i--){if(isNumber(r.avm.stat.set[i])){avmStatSet[i]=Math.round(r.avm.stat.set[i]/1000)}}
        if(j%REP==0){writeHead(j,HEAD)} // Write header row if proper spacing
        else{
            try{arv=r.arv                         .value}catch(e){};if(arv==null){arv="—"}; // Strict input // ARV
            try{rep=r.repairs                     .value}catch(e){};if(rep==null){rep="—"}; // Strict input // Repairs
            try{cof=r.counter                     .value}catch(e){};if(cof==null){cof="—"}; // Strict input // Counter
            try{com=r.LST_Attributes[21].attribute_value}catch(e){};if(com==null){com="—"}; // Strict input // Comments
            LINK=[r.ylink,r.avm.dataset.zillow.link,r.avm.dataset.zillow.homedetails,r.avm.dataset.eppraisal.link,r.source.detailpageURL/*r.avm.dataset.realtor.link* /,
                  r.avm.dataset.realEstate.link,r.avm.dataset.homeGain.link,r.maplink];len=LINK.length;
            PROP=[ 
                   "Y","Z","D","E","R","S","H",r.address.full,(r.avm.combo.beds+"|"+r.avm.combo.baths+"|"+Math.round(r.avm.combo.sqft/100)),
                  (Math.round(r.avm.combo.taxVal/1000)+"|"+Math.round(r.avm.combo.lastSoldPrice/1000)+"|"+r.avm.combo.lastSoldYear),psf,grm,r.avm.dataset.zillow.rentzestimate,ia,
                  ((Math.round(r.price/100))/10),Math.round(r.avm.stat.autoEst/1000),(r.avm.stat.sdPct+"|"+r.avm.stat.popCount),avmStatSet,r.avm.stat.ratio
                 ];k=PROP.length;i=k;while(i--){x=PROP[i];if(i<len){ // Reset column counter // Loop to fetch saved data
                tab.setWidget        (j,i  ,app.createAnchor(x,LINK[i]).setTitle("row "+j+" "+com))  // Insert anchor/s for first field
                   .setStyleAttribute(j,i,  "backgroundColor",STYLPATT[j%patlen]);}else{
                tab.setWidget        (j,i  ,app.createLabel(x) .setTitle("row "+j))  // Insert labels for other fields
                   .setStyleAttribute(j,i,  "backgroundColor",STYLPATT[j%patlen]);}} // Set background color // End loop
                // ----------------- Radio buttons -----------------
                radioValue[j] =             app.createTextBox().setId("radioValue"+j).setName("radioValue"+j).setVisible(false);vpan.add(radioValue[j]); // Reference: http://stackoverflow.com/questions/10903963/strange-behaviour-when-using-radiobutton
                                            handleRadio[j] = app.createClientHandler().forTargets(radioValue[j]).setText("no"+j);  // No
                tab.setWidget        (j,k  ,app.createRadioButton(("grp"+j),"").addValueChangeHandler(handleRadio[j])) // No
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // No
                   try{                                                              // Show value, if any
                            if(r.go       ){tab.setWidget(j,k-1,app.createLabel("?").setTitle("row "+j))} // No
                       else if(r.go==false){tab.setWidget(j,k-1,app.createLabel("?").setTitle("row "+j))} // No
                   }catch(err){}
                                            handleRadio[j] = app.createClientHandler().forTargets(radioValue[j]).setText("go"+j);  // Go
                tab.setWidget        (j,k  ,app.createRadioButton(("grp"+j),"").addValueChangeHandler(handleRadio[j])) // Go
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Go
                   try{                                                              // Show value, if any
                            if(r.go       ){tab.setWidget(j,k-1,app.createLabel("?").setTitle("row "+j))} // Go
                       else if(r.go==false){tab.setWidget(j,k-1,app.createLabel("?").setTitle("row "+j))} // Go
                   }catch(err){}
                // ----------------- Labels & boxes -----------------
                tab.setWidget        (j,k  ,app.createLabel(arv)         .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // ARV
                offer1[j] =                 app.createTextBox()         .setWidth("60px").setId("off1"+j).setName("off1"+j).setTitle("Enter your offer")
                tab.setWidget        (j,k  ,offer1[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Offer1 — before repairs
                   try{if(r.offer.beforeRepairs.manual.value){                       // Show current value
                       tab.setWidget (j,k-1,app.createLabel(r.offer.beforeRepairs.manual.value).setTitle("row "+j))}}catch(err){}
                tab.setWidget        (j,k  ,app.createLabel("—")        .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Analysis
                tab.setWidget        (j,k  ,app.createLabel(rep)        .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Repairs
                offer2[j] =                 app.createTextBox()       .setWidth("60px").setId("off2"+j).setName("off2"+j).setTitle("Enter your offer")
                tab.setWidget        (j,k  ,offer2[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Offer2 —  after repairs
                   try{if(r.offer. afterRepairs.manual.value){                       // Show current value
                       tab.setWidget (j,k-1,app.createLabel(r.offer. afterRepairs.manual.value).setTitle("row "+j))}}catch(err){}
                tab.setWidget        (j,k  ,app.createLabel(cof)          .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Counter
                tab.setWidget        (j,k  ,app.createLabel("—")      .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Contract
                tab.setWidget        (j,k  ,app.createLabel("—")    .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Assignment
                button[j] =                 app.createButton("Submit",app.createClientHandler().forEventSource().setText("?OK"/*"Clicked!"* /))
                                               .setId("sub,"+j+","+r.getId()).addClickHandler(handler);
                tab.setWidget        (j,k  ,button[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Submit button
        }j++;}return app;}
// ---------------------------------------------------------------- ******* ----------------------------------------------------------------
// ---------------------------------------------------------------- HANDLER ----------------------------------------------------------------
// ---------------------------------------------------------------- ******* ----------------------------------------------------------------
function sendAlert(){ // Sends email and/or SMS text message to notify agent of incoming “hot” prospect
}
function handleSubmit(e){ // e is event information // We will extract .parameter properties from e // Reference: https://developers.google.com/apps-script/class_serverhandler#addCallbackElement // Reference: https://sites.google.com/site/appsscripttutorial/miscellaneous/creating-form-elements-dynamically-using-google-apps-script-gas
    var app=UiApp.getActiveApplication(),user=Session.getUser().getEmail(),d=new Date().getTime(),p=e.parameter,tag=p.source.split(",");Logger.log(tag[2]);
    db=ScriptDb.getMyDb(),r=db.load(tag[2]/*"S20431525059"* /)/*db.query({id:e.getTag()}).next()* /;
    // ------------- Operator --------------
    if(e.parameter[("radioValue"+tag[1])]==("no"+tag[1])){r.go=false}else if(e.parameter[("radioValue"+tag[1])]==("go"+tag[1])){r.go=true;sendAlert();}; // Go (boolean) // Reference: http://stackoverflow.com/questions/10903963/strange-behaviour-when-using-radiobutton
    try{if(p[("off1"+tag[1])]){                // Offer 1 — Before repairs
        r.offer.beforeRepairs.manual.value     = p[("off1"+tag[1])];
        r.offer.beforeRepairs.manual.source    = user;
        r.offer.beforeRepairs.manual.timestamp = d;
        }}catch(err){Logger.log(err.message)};
    try{if(p[("off2"+tag[1])]){                // Offer 2 — After  repairs
        r.offer. afterRepairs.manual.value     = p[("off2"+tag[1])];
        r.offer. afterRepairs.manual.source    = user;
        r.offer. afterRepairs.manual.timestamp = d;
        }}catch(err){Logger.log(err.message)};
    // --------------- Agent ---------------
    try{if(p[("arv"+tag[1])]){                 // ARV
        r.arv.value                            = p[("arv"+tag[1])];
        r.arv.source                           = user;
        r.arv.timestamp                        = d;
        }}catch(err){Logger.log(err.message)};
    try{if(p[("rep"+tag[1])]){                 // Repairs
        r.repairs.value                        = p[("rep"+tag[1])];
        r.repairs.source                       = user;
        r.repairs.timestamp                    = d;
        }}catch(err){Logger.log(err.message)};
    try{if(p[("cof"+tag[1])]){                 // Counter
        r.counter.value                        = p[("cof"+tag[1])];
        r.counter.source                       = user;
        r.counter.timestamp                    = d;
        }}catch(err){Logger.log(err.message)};
    // -------------------------------------
    db.save(r);app.close();return app;}
// ---------------------------------------------------------------- AGENTS ----------------------------------------------------------------
function agents(){ // --------------------------------------------- AGENTS ----------------------------------------------------------------
    var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---2){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    var r,db=ScriptDb.getMyDb(),result=db.query({go:true,table:"situs",tag:{inventory:true}}).sortBy(/*"avm.stat.ratio"* /"price",db.ASCENDING,db.NUMERIC);
    var REP      = 8;
    var app      = UiApp.createApplication();
    var scr      = app.createScrollPanel().setSize("100%","2000");
    var vpan     = app.createVerticalPanel();
    var tab      = app.createFlexTable().setBorderWidth(1);vpan.add(tab);scr.add(vpan);app.add(scr);
    var handler  = app.createServerHandler("handleSubmit").addCallbackElement(vpan);
    var k,j,i,x,button=[],cof=[],rep=[],arv=[],off1,off2,PROP=[],HEAD=[
                 "address","MLS","price",                      // Property fields
                 "arv","offer","analysis","repair","offer",    // Added    fields
                 "counter","contract/buy","assign/sell","send" // Added    fields
                 ];
    var STYLPATT = ["white","white","white","aliceblue"];var patlen=STYLPATT.length;                                // Alternating color pattern of rows
    function writeHead(row,arr){ii=arr.length;while(ii--){tab.setText          (row,ii,arr[ii]                    ) // Write header row
                                                             .setStyleAttribute(row,ii,"backgroundColor","#150035")
                                                             .setStyleAttribute(row,ii,"color"          ,"white"  )
                                                             .setStyleAttribute(row,ii,"fontWeight"     ,"bold"   );}}
    j=0;while(result.hasNext()){ // Start row counter // Load records
        r=result.next();
        if(j%REP==0){writeHead(j,HEAD)} // Write header row if proper spacing
        else{
            try{off1=r.offer.beforeRepairs.manual.value}catch(e){};if(off1==null){off1="—"}; // Strict input // Offer — before repairs
            try{off2=r.offer. afterRepairs.manual.value}catch(e){};if(off2==null){off2="—"}; // Strict input // Offer —  after repairs
            PROP=[r.address.full,r.source.mlsNumber/*source.JsonData.scrape("(MLS","#: ",")")[1]* /,((Math.round(r.price/100))/10)];
            k=PROP.length;i=k;while(i--){x=PROP[i];if(!i){                                   // Reset column counter // Loop to fetch saved data
                tab.setWidget        (j,i,app.createAnchor(x,r.maplink).setTitle("row "+j))  // Insert link to GoogleMaps
                   .setStyleAttribute(j,i,  "backgroundColor",STYLPATT[j%patlen]);}else{     // Set background color // End loop
                tab.setWidget        (j,i,app.createLabel(x)        .setTitle("row "+j))     // Insert individual row numbers via widget label
                   .setStyleAttribute(j,i,  "backgroundColor",STYLPATT[j%patlen]);}}         // Set background color // End loop
                arv[j] =                  app.createTextBox()       .setWidth("60px").setId("arv"+j).setName("arv"+j).setTag(j+","+r.getId()).setTitle("Enter ARV based on comps")
                tab.setWidget        (j,k,arv[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // ARV — per comps
                   try{if(r.arv.value){                                             // Show current value
                       tab.setWidget (j,k-1,app.createLabel(r.arv.value).setTitle("row "+j))}}catch(err){}
                tab.setWidget        (j,k,app.createLabel(off1)     .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // Offer1 — before repairs
                tab.setWidget        (j,k,app.createFileUpload()    .setWidth("84px").setId("anl"+j).setName("anl"+j).setTitle("Upload property analysis report"))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // Analysis
                rep[j] =                  app.createTextBox()       .setWidth("60px").setId("rep"+j).setName("rep"+j).setTitle("Enter repair cost estimate")
                tab.setWidget        (j,k,rep[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // Repairs
                   try{if(r.repairs.value){                                         // Show current value
                       tab.setWidget (j,k-1,app.createLabel(r.repairs.value).setTitle("row "+j))}}catch(err){}
                tab.setWidget        (j,k,app.createLabel(off2)     .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // Offer2 —  after repairs
                cof[j] =                  app.createTextBox()       .setWidth("60px").setId("cof"+j).setName("cof"+j).setTitle("Enter counter offer")
                tab.setWidget        (j,k,cof[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // Counter
                   try{if(r.counter.value){                                         // Show current value
                       tab.setWidget (j,k-1,app.createLabel(r.counter.value).setTitle("row "+j))}}catch(err){}
                tab.setWidget        (j,k,app.createFileUpload()    .setWidth("84px").setId("con"+j).setName("con"+j).setTitle("Upload accepted contract"))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // Contract
                tab.setWidget        (j,k,app.createFileUpload()    .setWidth("84px").setId("asg"+j).setName("asg"+j).setTitle("Upload assignment"))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // Assignment
                button[j] =               app.createButton("Submit",app.createClientHandler().forEventSource().setText("?OK"/*"Clicked!"* /))
                                             .setId("sub,"+j+","+r.getId()).addClickHandler(handler);
                tab.setWidget        (j,k,button[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);  // Submit button
        }j++;}
    return app;}
// --------------------------------------------------------------- DEMO ---------------------------------------------------------------
function demo(){ // ---------------------------------------------- DEMO ---------------------------------------------------------------
    var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---2){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    var r,db=ScriptDb.getMyDb(),result=db.query({avm:true,tag:{demo:true}}).sortBy("avm.stat.ratio",db.ASCENDING,db.NUMERIC);
    var REP      = 8;
    var app      = UiApp.createApplication();
    var scr      = app.createScrollPanel().setSize("100%","2000");
    var vpan     = app.createVerticalPanel();
    var tab      = app.createFlexTable().setBorderWidth(1);vpan.add(tab);scr.add(vpan);app.add(scr);
    var k,j,i,x,PROP=[],HEAD=["","My offer","%","GRM","ARV?","Rent?","Price","Tax | Sold for | in","Address","B|Ba","SF | Lot | Built"];
    var STYLPATT = ["white","white","white","aliceblue"];var patlen=STYLPATT.length;                                // Alternating color pattern of rows
    function writeHead(row,arr){ii=arr.length;while(ii--){tab.setText          (row,ii,arr[ii]                    ) // Write header row
                                                             .setStyleAttribute(row,ii,"backgroundColor","#150035")
                                                             .setStyleAttribute(row,ii,"color"          ,"white"  )
                                                             .setStyleAttribute(row,ii,"fontWeight"     ,"bold"   );}}
    j=0;while(result.hasNext()){ // Start row counter // Load records
        r=result.next();
        if(j%REP==0){writeHead(j,HEAD)} // Write header row if proper spacing
        else{k=0; // Reset column counter
                tab.setWidget        (j,k,app.createButton("Submit").setTag(r.getId().toString())
                                             .setId("sub"+j).setTitle("Submit your offer").addClickHandler(app.createServerHandler("_handleSubmit")))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]); // Submit button
                tab.setWidget        (j,k,app.createTextBox().setWidth("60px").setId("bid"+j).setName("bid"+j).setTag(r.getId()).setTitle("Enter your offer"))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]); // Offer/bid
            PROP=["","",r.avm.stat.ratio,Math.round(r.price/(12*r.avm.dataset.zillow.rentzestimate)),r.avm.stat.autoEst,
                     r.avm.dataset.zillow.rentzestimate,r.price,(r.avm.combo.taxVal+" | "+r.avm.combo.lastSoldPrice+" | "+r.avm.combo.lastSoldYear),
                     r.address.part,(r.avm.combo.beds+" | "+r.avm.combo.baths),(r.avm.combo.sqft+" | "+r.avm.combo.lot+" | "+r.avm.combo.yrBuilt)];
            i=PROP.length;while((i--)-k){ // Loop to fetch saved data
                if(isNumber(PROP[i])){x=Math.round(PROP[i])}else{x=PROP[i]}       // Round numbers only
                tab.setWidget        (j,i,app.createLabel(x).setTitle("row "+j))  // Insert individual row numbers via widget label
                   .setStyleAttribute(j,i,"backgroundColor",STYLPATT[j%patlen]);} // Set background color
        }j++;}
    return app;}
// -------------------------------------------------------------------- INVENTORY ---------------------------------------------------------------
function inventory(){ // ---------------------------------------------- INVENTORY ---------------------------------------------------------------
    var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---2){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    var r,db=ScriptDb.getMyDb(),result=db.query({}).sortBy("PropertyPrice",db.ASCENDING,db.NUMERIC);
    var REP      = 8;
    var app      = UiApp.createApplication();
    var scr      = app.createScrollPanel().setSize("100%","2000");
    var vpan     = app.createVerticalPanel();
    var tab      = app.createFlexTable().setBorderWidth(1);vpan.add(tab);scr.add(vpan);app.add(scr);
    var i,x,HEAD = ["Price"        ,"Address","City","St"   ,"BR" ,"Ba"  ,"Sqft"       ,"Lot"    ,"Built"    ];
    var k,j,PROP = ["PropertyPrice","address","City","State","bed","bath","ListingSqft","LotSqft","YearBuilt"];
    var STYLPATT = ["white","white","white","aliceblue"];var patlen=STYLPATT.length;                                // Alternating color pattern of rows
    function writeHead(row,arr){ii=arr.length;while(ii--){tab.setText          (row,ii,arr[ii]                    ) // Write header row
                                                             .setStyleAttribute(row,ii,"backgroundColor","#150035")
                                                             .setStyleAttribute(row,ii,"color"          ,"white"  )
                                                             .setStyleAttribute(row,ii,"fontWeight"     ,"bold"   );}}
    j=0;while(result.hasNext()){ // Start row counter // Load records
        r=result.next();
        if(j%REP==0){writeHead(j,HEAD)} // Write header row if proper spacing
        else{i=PROP.length;while(i--){  // Loop to fetch saved data
                if(isNumber(r[PROP[i]])){x=Math.round(r[PROP[i]])}else{x=r[PROP[i]]} // Round numbers only
                tab.setWidget        (j,i,app.createLabel(x).setTitle("row "+j))     // Insert individual row numbers via widget label
                   .setStyleAttribute(j,i,"backgroundColor",STYLPATT[j%patlen]);}    // Set background color
        }j++;}
    return app;}
	}
	{ // Data
function size(){Logger.log(ScriptDb.getMyDb().query({avm:true}).getSize());}
function del(){var db=ScriptDb.getMyDb();var results=db.query({/*avm:true* /});while(results.hasNext()){var r=results.next();db.remove(r);}}
function showOneById(){Logger.log(JSON.stringify(ScriptDb.getMyDb().load("S20431525059")))} // Show one record
function showOneId  (){Logger.log(JSON.stringify(ScriptDb.getMyDb().query({/*address:{street:"5117 Surfbreaker Pt"}* /}).next().getId()))} // Show one record
function showOne    (){Logger.log(JSON.stringify(ScriptDb.getMyDb().query({/*address:{street:"5117 Surfbreaker Pt"}* /}).next()))} // Show one record
function showAll    (){var db=ScriptDb.getMyDb();var r,results=db.query({/*avm:true* /});while(results.hasNext()){r=results.next();Logger.log(/*Utilities.jsonStringify* /JSON.stringify(r));}} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function mod(){var db=ScriptDb.getMyDb();var r,results=db.query({});while(results.hasNext()){r=results.next();
    r.JsonData = JSON.parse(JSON.stringify(eval(r.JsonData)));Logger.log(JSON.stringify(r));
    db.save(r);}}
function dataIn(){var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())}main_realtor();}
function dataAdd(){if(ScriptDb.getMyDb().query({avm:false}).getSize()){ // Append AVM estimates to property object/s // Execution only on subjects with no AVM estimates
    var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    // Need to add condition not to exceed Zillow maximum daily API calls.
    var up,r,db=ScriptDb.getMyDb(),results=db.query({avm:false});while(results.hasNext()){r=results.next();up=realtorDataGate(r,300000,true);db.remove(r);if(up[0]){db.save(avmJson(up[1],"Realtor"));}}}}

function test(){
    var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    Logger.log(JSON.stringify("www.realtor.com/realestateandhomes-detail/1177-Ransom-St_San-Diego_CA_92154_M14523-76662".realtorScrapeDetail()))}
	}
*/
/* LAG COPY — ORIGINAL IN GOOGLE SCRIPTS Scrape — auction.com :: {       // Main — Auction.com — functions must be run independently. Use triggers.
	function acIn (){                                                    // Auction.com
		var LOAD  = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())}var cell=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Input").getRange(1,1,1,1).getCell(1,1);
		var DM    = avmDataModel();var UL=DM[2];var DEL=DM[3];var INS=DM[4];var QUE=DM[5];var BEG=DM[6];var END=DM[7]; // Fetch & load/cache DATA MODEL
		var dR    = ["Riverside","CA"].acFetch(48).split(UL).slice(1);   // FETCH DATA (meta-string), decode & split into ARRAY of RECORDS (raw HTML, pre-scraped version) // trim first record via .splice()
		var i     = dR.length;while(i--){                                // Loop records for scraping
			dR[i] = dR[i].scrapeDataset(false, QUE, BEG, END, DEL, INS); // SPLIT each record into ARRAY of FIELDS; dR[i][j] for each field;
			if(dR[i][ 1]){dR[i][0] = dR[i][ 1].parseAddressA()}          // PARSE ADDRESS
			if(dR[i][16]){dR[i].push(dR[i][16].split("/"))}else{if(dR[i][17]){dR[i].push(dR[i][17].split("/"))}}} // Parse DATE (2 possible locations)
		cell.setValue(dR.furlN4());}                                     // WRITE 4D array to cell as string for storage
	function acOut(){                                                    // Appends AVM, calculates, sorts & writes internally to archive // .length > 4 because null array = [""]
		var LOAD  = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())}var cell=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Input").getRange(1,1,1,1).getCell(1,1);
		if(cell.getValue().toString().length>4){
			var PAKSIZE=3; var OUT=["dealdigger","Inventory"];           // Size of package of records to be processed and written out the DB server // OUT=[applicationName,formName] array for write out
			var DM    = avmDataModel();var fields=DM[0];var types=DM[1]; // Fetch & load/cache DATA MODEL
			var dR    = cell.getValue().replaceAll("\n","").unfurl();    // FETCH data records; unfurl string (into 4D array)
			var dRpak = dR.splice(0,Math.min(PAKSIZE,dR.length));cell.setValue(dR.furlN4()); // Select/extract/“splice” SUBSET; account for short-length case // Replace SUPERSET // Process SUBSET to follow
			var i     = dRpak.length;while(i--){if(isArray(dRpak[i][0])){dRpak[i].push(dRpak[i][0].avmData([dRpak[i][13],dRpak[i][14]]))}else{dRpak.splice(i,1)}} // Append AVM arrays to each data record (4D -> 5D -> 2D) // Reduce 5D array to 2D as prep to write out // Delete record if first element is not an array (i.e., the address) on the presumption that the element resulted from a failed scrape // Note: To log this line, use the following code -> var i=dRpak.length;while(i--){dRpak[i].push(dRpak[i][0].avmData([dRpak[i][9],dRpak[i][10]])).logArrayElements1N5()}
			OUT.concat(dRpak.avmDataPrep(fields,types)).writeToAPI_Zoho();}}} // Write out to Zoho // Simplified example for testing: [APP,FORM,["City", "Zip"],[["city2","22222"],["city3","33333"]]].writeToAPI_Zoho()} // var out=dRpak.avmDataPrep(fields,types);writeToAPI_Zoho(APP,FORM,out[0],out[1]);} // Log as follows // Before: fields.logArrayN5();dRpak.logArrayN5(); // After: compareArrays(out[0],out[1]);
*/
