//-------------------------------------- Code.gs --------------------------------------
// JSON visualization | viewer: http://chris.photobooks.com/json/default.htm
// function getEmailQuota(){Logger.log("Remaining email quota: " + MailApp.getRemainingDailyQuota());}
// Note: to accept doPost() from affiliate, (design decision:) must set: Publish > Deploy as web app > Execute the app as: me, Who has access to the app: Anyone, even anonymous // Otherwise, script will not run at server (though, client will receive responseCode=200); client response (200) is Google accounts sign-in page/form  // Decision Benefits: 1. script runs 2. script authorization bypass (i.e., not needed at UI) // Decision Costs: 1. Looser script security; mitigated by a. Site level access restrictions/permissions b. key method (e.g., switch/case k:foo)
function auth    (){}
function timer   (){Logger.log(new Date().getTime())}//1388228703613
function backup  (){var desc="jsAvm Backup — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({});while(results.hasNext()){out.unshift(results.next())}id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);}
function print   (str){var desc="jsAvm Print — timestamp:"+new Date().getTime(),id=DriveApp.createFile(desc,str,MimeType.HTML).setDescription(desc);Logger.log("Printed doc ID: "+id);}
function print_test(str,desc){str=str||JSON.stringify(ScriptDb.getMyDb().load("S337185323966"));desc=desc||"Argenta Print — timestamp:"+new Date().getTime();DriveApp.createFile(desc,str,MimeType.HTML);}
function size    (){var db=ScriptDb.getMyDb();Logger.log(/*ScriptDb.getMyDb()*/db.query({}).getSize());}
function showById(){Logger.log(JSON.stringify(ScriptDb.getMyDb().load("S96280679164")))} // Show one record by ID
function showOne (){Logger.log(/*Utilities.jsonStringify*/JSON.stringify(ScriptDb.getMyDb().query({item:"eXjKqn1"/*/table:"note"/* /"user",user:"atlaslive@gmail.com",seller:true/*,city:"test"*/}).next()));} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function showAll (){var db=ScriptDb.getMyDb(),r,results=db.query({});while(results.hasNext()){r=results.next();Logger.log(/*Utilities.jsonStringify*/JSON.stringify(r));return arr}} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function print2ss(){LibraryjsUtil.write2ss(true,showAll(),"Sheet1","1azZ5rq1Sgy2fipwhwd75f9M6jkzvWk4TZmOzH2A4uRg"/*act*/)}
//function del     (){var xdb=ScriptDb.getMyDb(),arr=[],r,results=db.query({xtable:"note"/*,/*source:"fciEx_foo",* /table:db.not("report"),* /timestamp_posted:db.greaterThan(1388548425377),k:"8u0hjrtbd68s3hi1w9kl",/*"36sgd2m257w2j0sn5isa",* /"report"/* /"bid"/*"user"* /,xcity:"test"/*xseller:true,xuser* /,bidder:"atlaslive@gmail.com"*/});while(results.hasNext()){arr.push(results.next().getId());}db.removeByIdBatch(arr,false);} // Replaced: while(results.hasNext()){r=results.next();db.remove(r);}}
//function mod     (){var xdb=ScriptDb.getMyDb(),arr=[],r,results=db.query({/*item* /city:true,/*db.not(db.anyValue())/*/xtable:"note"/*,pctLtv:db.between(0,1.1),lienPos:db.not(1)/*,/*use* /lienPos:db.anyOf(["1st"/*false,db.not(db.anyValue())/*"Hospitality"/*"Commercial"/*"Apt","Multifamily"* /])/*"Oth"/* /"bid"*/});while(results.hasNext()){r=results.next();try{r.pctLtv=Math.round(100*r.balCur/r.estValue)}catch(e){r.pctLtv="";Logger.log("Error : "+e.message)}/*r.lienPos=1;/*LibraryjsUtil.stateConvert(r.state,"abbr");/*.use="X";/*"CRE";/*"MUL";/*r.city=LibraryjsUtil.toCaseTitle(r.city);/*r.item=LibraryjsUtil.toBase62(Number(r.getId().slice(1)));/*if(r.askPrice==""){r.askPrice=0}/* /r.remove=false;r.accepted=false;/*r.askRate=r.buyRate;r.askPrice=r.buyPts;* /r.bids=[];/*r.table="note";r.datePosted=new Date().getTime();* /var i=r.bids.length;while(i--){/*r.bids[i].timestamp=r.bids[i].time;* /r.bids[i].accepted=false;/*r.bids[i].target_id=r.getId();* /r.bids[i].time=""/* /if(r.bids[i].bidder=="atlaslive@gmail.com"){r.bids.splice(i,1)}* /db.save(r);*/arr.push(r);}db.saveBatch(arr,false)}
// Add to dataset: Homesnap : http://www.homesnap.com/WA/Seattle/1919-Bigelow-Avenue-N
// Using Object.prototype.functionName = function(){...} (FOR OBJECT ONLY) appears to cause the ScriptDb.getMyDb().query({}) method to return null result in GAS. So we must use the function name(){} method instead — UPDATE: Question: Note this problem is not caused when using the Object.prototype.clone function on the jsUtil.js file?
// Test Functions
//function test(){Logger.log(JSON.stringify(avmReport("6840 S Langley Ave #1, chicago, IL",1)))} // Major alert is triggered by this. Error 8slEi
//function test(){Logger.log("RESULT: "+JSON.stringify(avmJson({source:{data:/*"17013 114 ave se, Renton, Wa"* /"5008 corson ave s, seattle, wa",name:"manual"}})))}
//function test(){Logger.log("RESULT: "+JSON.stringify(avmPrep(/*"17013 114 ave se, Renton, Wa"* /"5008 corson ave s, seattle, wa","manual")))}
//function test(){var addy="17013 114 ave se, Renton, Wa",out=JSON.stringify(avmJson({"source":{"name":"manual","data":addy/*,"market":{"city":"Pheonix","state":"AZ"}* /}}));Logger.log(out);print(out)}
//function test(){Logger.log(str2addy("17013 114 ave se, Renton, Wa"))//"5008 corson ave s, seattle, wa"))}
//function test(){var str=UrlFetchApp.fetch("http://express.realquest.com/search.aspx?location=5008%20corson%20ave%20s,%20seattle,%20wa",{followRedirects:true}).getContentText();print(str);}
//function test(){Logger.log(JSON.stringify(avmZillowAPI("661 glendale ave., danville va","16184 Manor, Detroit, MI 48221")))}//"16184 Manor, Detroit, MI 48221")))}//"16741 Ashton Ave., Detroit, MI 48228")))}//"1124 8th Ave, New Brighton, PA 15066")))}
//function test(){Logger.log(JSON.stringify(avmZillowAPI({"sa":"16184 Manor St","city":"Detroit","state":"MI","zip":"48221","csz":"Detroit, MI 48221","full":"16184 Manor St, Detroit, MI 48221","part":"Manor St, Detroit, MI 48221","number":"16184"})))}//"16741 Ashton Ave., Detroit, MI 48228")))}//"1124 8th Ave, New Brighton, PA 15066")))}
//function test(){var out,addy=["1106 N SHEFFIELD AV, INDIANAPOLIS, IN"]//"16184 Manor, Detroit, MI 48221"]//"1919 Bigelow Avenue N, Seattle, WA"]//"5008 coron ave s, seattle, wa","2865 S Meridian St, INDIANAPOLIS, IN","661 glendale ave., danville va","16741 Ashton Ave., Detroit, MI  48228","1124 8th Ave, New Brighton, PA 15066","732 franklin st, westbury, ny 11590"]
//    ,i=addy.length;while(i--){out=JSON.stringify(avmJson({"source":{"name":"manual","data":addy[i]}}));Logger.log(out)}}//;print(out)}}//
//function test(){var out=[],addy=["5008 coron ave s, seattle, wa","2865 S Meridian St, INDIANAPOLIS, IN","661 glendale ave., danville va","16184 Manor, Detroit, MI 48221","16741 Ashton Ave., Detroit, MI  48228","1124 8th Ave, New Brighton, PA 15066","732 franklin st, westbury, ny 11590"]
//    ,i=addy.length;while(i--){out.push(JSON.stringify(avmJson({"source":{"name":"manual","data":addy[i]}})))}print(out)}//;Logger.log(out)}}//
/* Data model — function avmDataModel(){ // Data record array as argument and returns output array prepped to write out to database
	var DB = new Array(); // Database field names
	var  T = new Array(); // Type of data: 0 = nullify/delete; 1 = number; 2 = string; 9 = ignore / do not process;
	{ // Variables — Auction.com
	var UL = "list-property";
	var DEL=["\""]; // DELETE this (get replaced)
	var INS=[ "" ]; // INSERT this (replace with)
	}
	{ // Arrays
	//        0    1     2        3       4     5              6                 7        8                                                              9        10               11             12           13               14            15       16              17          18             19      20            21             22                     23             24           25             26                     27           28         29           
	//        0    1     2        3       4     5              6                 7                                                                                                                                                                                                                                                                                                                                              0            1          2            
	//       0 (added) Address Array                                                      1                                                              2        3                4              5            6                7             8        9               10          11             12      13            14             15                     16             17           18             19                    20 (added) date                       Here: Add/push() AVM array — SEE DATA MODEL in jsAvm.js file function/method: .avmData()
	var T  =[ 9   ,9    ,9       ,9      ,9    ,9             ,9                ,9        ,9                                                             ,9       ,1               ,9             ,9           ,9               ,9            ,9       ,9              ,9          ,9             ,9      ,0            ,0             ,0                     ,0             ,0           ,9             ,9                    ,9            ,9         ,9           ];
	var DB =[["sa","csz","Number","State","Zip","Full_address","Partial_address","County"],"Address"                                                     ,"imgSrc","NOS_amt"       ,"PP_to"       ,"Type"      ,"TSNo"          ,"PropIDno"   ,"ItemNo","Sale_location","Sale_hour","Sale_minutes","am_pm","Open_bid"   ,"Start_bid"   ,"PreVal"              ,"Auction_date","Start_date","AucType"     ,"tsHidID"            ,["Sale_month","Sale_day","Sale_year"]];
	var QUE=[                                                                             ,""                                                            ,""      ,"Notice of Sale","Postponed To","Asset type","Trustee Number","Property ID","Item"  ,"Sale Location","Time"     ,""            ,""     ,"Opening Bid","Starting Bid","Previously Valued at","Auction Date","Start Date","Auction Type","id="                ];
	var BEG=[                                                                             ,"http://www.auction.com/California/residential-auction-asset/","src=\"","$"             ,":"           ,":"         ,"&nbsp;"        ,">"          ,">"     ,">"            ,">"        ,""            ,""     ,"$"          ,"$"           ,"$"                   ," "           ," "         ,":"           ,"trusteeSaleHidden_" ];
	var END=[                                                                             ,"'"                                                           ,"\""    ,"<"             ,"&"           ,"<"         ,"<"             ,"<"          ,"<"     ,"<"            ,":"        ," "           ,"."    ,"<"          ,"<"           ,"<"                   ,"<"           ,"<"         ,"<"           ,"\""                 ];
	}
								  var i =  T.length;                    // Increment up the Type array, T
								  var L = DB.length;                    // Use a variable to automatically handle changes in array length
	DB[L]                               = new Array();                  // Append/push() data
	{ DB[L][0]                          = new Array();                  // AVM statistics
		T[i++]=0; //DB[L][0][0]         = "isOk";                //  30 // ISOK      — Boolean; evaluates to TRUE if all inputs reduce to numeric and are included in stat calculations
		T[i++]=9;   DB[L][0][1]         = "PopCount";            //  31 // COUNT     — Returns the count of the population of inputs that reduced to a numeric to be included in the stat calculations // Size count of the population of AVM estimates
	//	T[i++]=9;   DB[L][0][2]         = "Opening_bid";         //  32 // BID       — Get max; consolidate multiple(two) bid values into one
		T[i++]=9;   DB[L][0][3]         = "Auto_estimate";       //  33 // ARV       — MEDIAN of all estimates  //valCalc[2] = avm[1][colZillow];
		T[i++]=9;   DB[L][0][4]         = "First_margin";        //  34 // MARGIN    — calculate margin
		T[i++]=9;   DB[L][0][5]         = "First_key_ratio";     //  35 // RATIO     — calculate ratio
		T[i++]=9;   DB[L][0][6]         = "StdDevPop";           //  36 // StdDevPop — Population stardard deviation
		T[i++]=9;   DB[L][0][7]         = "StdDevPct";           //  37 // StdDevPct — Pop std dev as pct% of estimated ARV
	}
	{ DB[L][1]                          = new Array();                  // AVM labels // Note: DB[L][1] = DB.avmData();
		T[i++]=0; //DB[L][1][0]         = "Combined";            //  38
		T[i++]=0; //DB[L][1][1]         = "Zillow";              //  39
		T[i++]=0; //DB[L][1][2]         = "Eppraisal";           //  40
		T[i++]=0; //DB[L][1][3]         = "Realtor";             //  41
		T[i++]=0; //DB[L][1][4]         = "RealEstate";          //  42
		T[i++]=0;	DB[L][1][5]         = "HomeGain";            //  43
	}
	{ DB[L][2]                          = new Array();                  // AVM — Combined (property data)
		T[i++]=0; //DB[L][2][0]         = null                   //  44 // URL of scraped object
		T[i++]=9;   DB[L][2][1]         = "Beds"                 //  45 // Beds
		T[i++]=9;   DB[L][2][2]         = "Baths";               //  46 // Baths
		T[i++]=9;   DB[L][2][3]         = "Sqft";                //  47 // Sqft
		T[i++]=9;   DB[L][2][4]         = "Lot";                 //  48 // Lot
		T[i++]=9;   DB[L][2][5]         = "Year_built";          //  49 // Year built
		T[i++]=9;   DB[L][2][6]         = "Tax_assessed_value";  //  50 // Tax assessed value
		T[i++]=9;   DB[L][2][7]         = "Last_sold_date";      //  51
		T[i++]=9;   DB[L][2][8]         = "Last_sold_price";     //  52
	}
	{ DB[L][3]                          = new Array();                  // AVM DATASETS
		T[i++]=0; //DB[L][3][0]         = null                   //  53
		{			DB[L][3][1]         = new Array();                  // AVM — Zillow
		T[i++]=9; 		DB[L][3][1][0]  = "Zillow_link";         //  54 // URL of scraped object
		T[i++]=0;     //DB[L][3][1][1]  = "Z_pointer";           //  55 // Points to element number of ARV estimate
		T[i++]=9; 		DB[L][3][1][2]  = "zpid";                //  56
		T[i++]=9; 		DB[L][3][1][3]  = "Zillow_details_link"; //  57 // "homedetails";
		T[i++]=0;     //DB[L][3][1][4]  = "graphsanddata";       //  58
		T[i++]=0;     //DB[L][3][1][5]  = "mapthishome";         //  59
		T[i++]=0;     //DB[L][3][1][6]  = "myestimator";         //  60
		T[i++]=0;     //DB[L][3][1][7]  = "comparables";         //  61
		T[i++]=0;     //DB[L][3][1][8]  = "street";              //  62
		T[i++]=0;     //DB[L][3][1][9]  = "Zip";                 //  63 // "zipcode";
		T[i++]=9;       DB[L][3][1][10] = "City";                //  64 // "city";
		T[i++]=0;     //DB[L][3][1][11] = "State";               //  65 // "state";
		T[i++]=0;     //DB[L][3][1][12] = "latitude";            //  66
		T[i++]=0;     //DB[L][3][1][13] = "longitude";           //  67
		T[i++]=0;     //DB[L][3][1][14] = "FIPScounty";          //  68 // Ex: "6065" — Number code only, not word string such as, say, "Riverside"
		T[i++]=0;     //DB[L][3][1][15] = "useCode";             //  69
		T[i++]=0;     //DB[L][3][1][16] = "taxAssessmentYear";   //  70 
		T[i++]=0;     //DB[L][3][1][17] = "taxAssessment";       //  71 // Original single source of data, therefore not pulled here (omitted) but pulled from above combined source
		T[i++]=9;  		DB[L][3][1][18] = "Z_Year_built";        //  72 // "yearBuilt";
		T[i++]=9; 		DB[L][3][1][19] = "Z_Lot";               //  73 // "lotSizeSqFt";
		T[i++]=9; 		DB[L][3][1][20] = "Z_Sqft";              //  74 // "finishedSqFt";
		T[i++]=9; 		DB[L][3][1][21] = "Z_Baths";             //  75 // "bathrooms";
		T[i++]=9; 		DB[L][3][1][22] = "Z_Beds";              //  76 // "bedrooms";
		T[i++]=0;     //DB[L][3][1][23] = "lastSoldDate";        //  77 // Original single source of data, therefore not pulled here (omitted) but pulled from above combined source
		T[i++]=0;     //DB[L][3][1][24] = "lastSoldPrice";       //  78 // Original single source of data, therefore not pulled here (omitted) but pulled from above combined source
		T[i++]=9; 		DB[L][3][1][25] = "Zillow";              //  79 // "zestimate";
		T[i++]=0;     //DB[L][3][1][26] = "last-updated-zest";   //  80
		T[i++]=0;     //DB[L][3][1][27] = "duration-zest";       //  81
		T[i++]=0;     //DB[L][3][1][28] = "valueChange-zest";    //  82
		T[i++]=0;     //DB[L][3][1][29] = "rangeLow-zest";       //  83
		T[i++]=0;     //DB[L][3][1][30] = "rangeHigh-zest";      //  84
		T[i++]=0;     //DB[L][3][1][31] = "percentile-zest";     //  85
		T[i++]=0;     //DB[L][3][1][32] = "rentzestimate";       //  86
		T[i++]=0;     //DB[L][3][1][33] = "last-updated-rent";   //  87
		T[i++]=0;     //DB[L][3][1][34] = "duration-rent";       //  88
		T[i++]=0;     //DB[L][3][1][35] = "valueChange-rent";    //  89
		T[i++]=0;     //DB[L][3][1][36] = "rangeLow-rent";       //  90
		T[i++]=0;     //DB[L][3][1][37] = "rangeHigh-rent";      //  91
		T[i++]=0;     //DB[L][3][1][38] = "regionId";            //  92
		T[i++]=0;     //DB[L][3][1][39] = "regionType";          //  93
		T[i++]=0;     //DB[L][3][1][40] = "regionName";          //  94
		T[i++]=0;     //DB[L][3][1][41] = "overview";            //  95
		T[i++]=0;     //DB[L][3][1][42] = "forSaleByOwner";      //  96
		T[i++]=0;     	DB[L][3][1][43] = "forSale";             //  97
		}
		{			DB[L][3][2]         = new Array();                  // AVM — Eppraisal
		T[i++]=9; 		DB[L][3][2][0]  = "Eppraisal_link";      //  98 // URL of scraped object
		T[i++]=0;     //DB[L][3][2][1]  = "E_pointer";           //  99 // Points to element number of ARV estimate
		T[i++]=9; 		DB[L][3][2][2]  = "Eppraisal";           // 100 // "Value Estimate";
		T[i++]=0;     //DB[L][3][2][3]  = "Low Estimate";        // 101
		T[i++]=0;     //DB[L][3][2][4]  = "High Estimate";       // 102
		T[i++]=0;     //DB[L][3][2][5]  = "Void";                // 103 // “Dummy” variable in this AVM (created for scraping purposes)
		T[i++]=9; 		DB[L][3][2][6]  = "E_Beds";              // 104
		T[i++]=9; 		DB[L][3][2][7]  = "E_Baths";             // 105
		T[i++]=9; 		DB[L][3][2][8]  = "E_Sqft";              // 106
		T[i++]=9; 		DB[L][3][2][9]  = "E_Lot";               // 107
		}
		{			DB[L][3][3]         = new Array();                  // AVM — Realtor
		T[i++]=9; 		DB[L][3][3][0]  = "Realtor_link";        // 108 // URL of scraped object
		T[i++]=0;     //DB[L][3][3][1]  = "R_pointer";           // 109 // Points to element number of ARV estimate
		T[i++]=0;     //DB[L][3][3][2]  = "R_Status";            // 110
		T[i++]=1; 		DB[L][3][3][3]  = "R_Beds";              // 111
		T[i++]=1; 		DB[L][3][3][4]  = "R_Baths";             // 112
		T[i++]=1; 		DB[L][3][3][5]  = "R_Sqft";              // 113
		T[i++]=1; 		DB[L][3][3][6]  = "R_Lot";               // 114
		T[i++]=1; 		DB[L][3][3][7]  = "Realtor";             // 115 // "Estimated Value";
		T[i++]=0;     //DB[L][3][3][8]  = "R_valPerSF";          // 116
		T[i++]=0;     //DB[L][3][3][9]  = "R_propType";          // 117
		T[i++]=9; 		DB[L][3][3][10] = "R_Year_built";        // 118
		T[i++]=0;     //DB[L][3][3][11] = "R_Neighborhood";      // 119
		T[i++]=0;     //DB[L][3][3][12] = "R_Style";             // 120
		T[i++]=0;     	DB[L][3][3][13] = "R_Stories";           // 121
		}
		{			DB[L][3][4]         = new Array();                  // AVM — RealEstate
		T[i++]=9; 		DB[L][3][4][0]  = "RealEstate_link";     // 122 // URL of scraped object
		T[i++]=0;     //DB[L][3][4][1]  = "A_pointer";           // 123 // Points to element number of ARV estimate
		T[i++]=9; 		DB[L][3][4][2]  = "RealEstate";          // 124 // "Estimated Value";
		T[i++]=9; 		DB[L][3][4][3]  = "A_Beds";              // 125
		T[i++]=9; 		DB[L][3][4][4]  = "A_Baths";             // 126
		T[i++]=9; 		DB[L][3][4][5]  = "A_Sqft";              // 127
		T[i++]=9; 		DB[L][3][4][6]  = "A_Year_built";        // 128 // "YrBuilt";
		T[i++]=0;     //DB[L][3][4][7]  = "A_Stories";           // 129
		T[i++]=9; 		DB[L][3][4][8]  = "A_Lot";               // 130
		}
		{			DB[L][3][5]         = new Array();                  // AVM — HomeGain
		T[i++]=9; 		DB[L][3][5][0]  = "HomeGain_link";       // 131 // URL of scraped object
		T[i++]=0;     //DB[L][3][5][1]  = "H_pointer";           // 132 // Points to element number of ARV estimate
		T[i++]=9; 	    DB[L][3][5][2]  = "HomeGain";            // 133 // Median/avg low/high estimates
		T[i++]=0; 	  //DB[L][3][5][3]  = "H_Est_low";           // 134 // Low  estimate
		T[i++]=0; 	  //DB[L][3][5][4]  = "H_Est_high";          // 135 // High estimate
		}
	}
		//  0  1 2  3   4   5   6   7
	return [DB,T,UL,DEL,INS,QUE,BEG,END]                         // Returns array of arrays
}*/
/* Data model — array
    arr[0]    = stats
    arr[1]    = avmList
    arr[2]    = empty
    arr[3][1] = zillow
    arr[3][2] = eppraisal
    arr[3][3] = realtor
    arr[3][4] = realestate
    arr[3][5] = homegain
*/
/* Data model — object — added properties
	var situs =	{
				//  "mlsNumber" :	120062061          	// Added via realtorDataGate()
				//	"timestamp"	:	1356678000000      	// Added via realtorDataGate()
				//	"recentDateParse":1356678000000    	// Added via realtorDataGate()
				//	"tags"		:	["demo","agents"]  	// array  — Might coincide with individual pages/views // DEPRECATED — replaced with .is_x as follows... // Note: Because JavaScript does not support easily finding array items // Reference: http://stackoverflow.com/questions/143847/best-way-to-find-an-item-in-a-javascript-array
				//	"is_demo"	:	true // Means this record will appear on the page labeled "demo"       // DEPRECATED — replaced with is.x:true, is.y:true, etc.
				//	"is_agents"	:	true // Means this record will appear on the page labeled "agents"     // DEPRECATED — replaced with is.x:true, is.y:true, etc.
				//	"is_inventory":	true // Means this record will appear on the page labeled "inventory"  // DEPRECATED — replaced with is.x:true, is.y:true, etc.
				,	"tag"		:	{                                                                      // Resolved deprecation: use nested query syntax — example: see below // DEPRECATED — replaced with above schema; query is.x is not supported
										"demo"			:	true                                           // var result = db.query({address: {city: "Cleveland", state: db.not("TX")}});
									,	"agents"		:	true                                           // DEPRECATED — demo page will use live deals, not one from an “off” market (e.g., Sacramento, when target market is, say, San Diego, for example)
									,	"inventory"		:	true										   // DEPRECATED — see above
									}
				,	"table"		:	"situs" or "agent"	// string — Indicates which data/type of record; This data model is for table:"inventory"
				,	"source"  	:	{																	   // DEPRECATED 12/31/2012 in realtorDataGate()
										"sourceName"	:	"Realtor"
									,	"mlsNumber"		:	120048198
									,	"field1"		:	"value1"
									,	"field2"		:	"value2"
										...
									,	"details"		:	{ ...see data object model in, say, String.prototype.realtorScrapeDetail, for example
															}
									}
				,	"market"	:	{
										"state"			:	"los-angeles"
									,	"city"			:	"ca"
									}
				,	"go"		:	true/false (boolean)
				,	"maplink"	:	"https://maps.google.com/maps?q=888+Rosecrans+St,+San+Diego,+CA+92106"
				,	"ylink"		:	"http://realestate.yahoo.com/Homevalues/result.html?search=Search&sa="+address.sa+"&csz="+address.csz
				,	"price"   	:	92500
				,	"offer"		:	{
										"beforeRepairs"	:	{
																"auto"		:	255150
															,	"manual"	:	{
																				,	"value"			:	295550
																				,	"timestamp"		:	1332313200000
																				,	"source"		:	"username@domain"
																				}
															}
									,	"afterRepairs"	:	{
																"auto"		:	255150
															,	"manual"	:	{
																				,	"value"			:	295550
																				,	"timestamp"		:	1332313200000
																				,	"source"		:	"username@domain"
																				}
															}
									}
				,	"arv"		:	{
									,	"value"			:	295550
									,	"timestamp"		:	1332313200000
									,	"source"		:	"username@domain" // Email of agent (presumably) // We will overwrite old ARV estimates. Due to complications in fetching latest ARV value. i.e, need to sort etc. // The following is obsolete // The key here is a timestamp value; multiple ARVs will be keyed by their timestamp; must sort by timestamp to get latest arv
									}
				,	"repairs"	:	{
									,	"value"			:	295550
									,	"timestamp"		:	1332313200000
									,	"source"		:	"username@domain" // Email of agent (presumably) // We will overwrite old ARV estimates. Due to complications in fetching latest ARV value. i.e, need to sort etc. // The following is obsolete // The key here is a timestamp value; multiple ARVs will be keyed by their timestamp; must sort by timestamp to get latest arv
									}
				,	"counter"		:	{
									,	"value"			:	295550
									,	"timestamp"		:	1332313200000
									,	"source"		:	"username@domain" // Email of agent (presumably) // We will overwrite old ARV estimates. Due to complications in fetching latest ARV value. i.e, need to sort etc. // The following is obsolete // The key here is a timestamp value; multiple ARVs will be keyed by their timestamp; must sort by timestamp to get latest arv
									}
				,	"analysis"		:	{
									,	"link"			:	www.something.somewhere.com
									,	"timestamp"		:	1332313200000
									,	"source"		:	"username@domain" // Email of agent (presumably) // We will overwrite old ARV estimates. Due to complications in fetching latest ARV value. i.e, need to sort etc. // The following is obsolete // The key here is a timestamp value; multiple ARVs will be keyed by their timestamp; must sort by timestamp to get latest arv
									}
				,	"contract"		:	{
									,	"link"			:	www.something.somewhere.com
									,	"timestamp"		:	1332313200000
									,	"source"		:	"username@domain" // Email of agent (presumably) // We will overwrite old ARV estimates. Due to complications in fetching latest ARV value. i.e, need to sort etc. // The following is obsolete // The key here is a timestamp value; multiple ARVs will be keyed by their timestamp; must sort by timestamp to get latest arv
									}
				,	"assignment"	:	{
									,	"link"			:	www.something.somewhere.com
									,	"timestamp"		:	1332313200000
									,	"source"		:	"username@domain" // Email of agent (presumably) // We will overwrite old ARV estimates. Due to complications in fetching latest ARV value. i.e, need to sort etc. // The following is obsolete // The key here is a timestamp value; multiple ARVs will be keyed by their timestamp; must sort by timestamp to get latest arv
									}
				,	"apn"		:	"5227024019"
				,	"timestamp"	:	1332313200000
				,	"JsonData"	:	{
										"lid"			:	"1139068056"
									,	"sn"			:	"2701 2Nd Ave # 207, San Diego, CA 92103 (MLS #: 120048198)"
									,	"adr"			:	"2701 2nd Ave # 207"
									,	"mid"			:	"1005454437"
									,	"recentDate"	:	"2012-09-22T00:00:00-07:00"
									,	"ct"			:	"San Diego"
									,	"ps"			:	0
									}
				, 	"address" 	: 	{
										"street"    	:	"10514 Kalmia St"
									, 	"city"      	: 	"Los Angeles"
									, 	"state"     	: 	"CA"
									, 	"zip"       	: 	"90002"
									, 	"unparsed"  	: 	""
									, 	"csz"       	: 	""
									, 	"number"    	: 	""
									, 	"full"      	: 	""
									, 	"part"      	: 	""
									, 	"county"    	: 	""
									}
				, 	"avm"     	: 	{
										"stat"      	: 	{						
																"isOk"            	:	"" 				// ISOK      — Boolean; evaluates to TRUE if all inputs reduce to numeric and are included in stat calculations
															, 	"popCount"        	:	"" 				// COUNT     — Returns the count of the population of inputs that reduced to a numeric to be included in the stat calculations // Size count of the population of AVM estimates
															, 	"openBid"         	:	"" 				// BID       — Get max; consolidate multiple(two) bid values into one
															, 	"autoEst"         	: 	"" 				// ARV       — MEDIAN of all estimates  //valCalc[2] = avm[1][colZillow];
															, 	"margin"         	: 	"" 				// MARGIN    — calculate margin
															, 	"ratio"   	        : 	"" 				// RATIO     — calculate ratio
															, 	"sdPop"           	: 	"" 				// sdPop     — Population stardard deviation
															, 	"sdPct"           	: 	"" 				// sdPct     — Pop std dev as pct% of estimated ARV
															,	"set"				:	"" 				// set		— The set of avm estimates sorted in numerically ascending order
															}
									,	"combo"     	: 	{
																"beds"            	: 	3 				// Beds
															, 	"baths"           	: 	3            	// Baths
															, 	"sqft"            	: 	1255         	// Sqft
															, 	"lot"             	: 	2955         	// Lot
															, 	"yrBuilt"         	: 	1953         	// Year built
															, 	"taxVal"          	: 	175980       	// Tax assessed value
															, 	"lastSoldDate"    	: 	"07/15/2004"      
															, 	"lastSoldPrice"   	: 	237000
															, 	"lastSoldYear"   	: 	2004
															}
									, 	"dataset"   	: 	{
																"zillow"          	: 	{
																							"link"              	: 	"" // URL of scraped object
																						, 	"pointer"           	: 	"" // Points to element number of ARV estimate
																						, 	"zpid"              	:	""
																						, 	"homedetails"       	: 	"" // Link to home details
																						, 	"graphsanddata"     	: 	""
																						, 	"mapthishome"       	: 	""
																						, 	"myestimator"     		: 	""
																						, 	"comparables"       	: 	""
																						, 	"street"            	: 	""
																						, 	"zipcode"           	: 	""
																						, 	"city"              	: 	""
																						, 	"state"             	: 	""
																						, 	"latitude"          	: 	""
																						, 	"longitude"         	: 	""
																						, 	"FIPScounty"        	: 	"" // Ex: "6065" — Number code only, not word string such as, say, "Riverside"
																						, 	"useCode"           	: 	""
																						, 	"taxAssessmentYear" 	: 	"" 
																						, 	"taxAssessment"     	: 	""
																						, 	"yearBuilt"         	: 	""
																						, 	"lotSizeSqFt"      	 	:	""
																						, 	"finishedSqFt"      	: 	""
																						,	"bathrooms"         	: 	""
																						, 	"bedrooms"          	: 	""
																						, 	"lastSoldDate"      	: 	""
																						, 	"lastSoldPrice"     	: 	""
																						, 	"estimate"          	: 	"" // "zestimate"
																						, 	"last-updated-zest" 	: 	""
																						, 	"duration-zest"     	: 	""
																						, 	"valueChange-zest"  	: 	""
																						, 	"rangeLow-zest"     	: 	""
																						, 	"rangeHigh-zest"    	: 	""
																						, 	"percentile-zest"   	: 	""
																						, 	"rentzestimate"     	: 	""
																						,	"last-updated-rent" 	: 	""
																						, 	"duration-rent"     	: 	""
																						, 	"valueChange-rent"  	: 	""
																						, 	"rangeLow-rent"     	: 	""
																						, 	"rangeHigh-rent"    	: 	""
																						, 	"regionId"          	: 	""
																						, 	"regionType"        	: 	""
																						, 	"regionName"        	: 	""
																						, 	"overview"          	: 	""
																						, 	"forSaleByOwner"    	: 	""
																						, 	"forSale"           	: 	""
																						}
															,	"realtor"    		: 	{
																							"link"              	: 	"" // URL of scraped object
																						, 	"pointer"           	: 	"" // Points to element number of ARV estimate
																						, 	"status"            	: 	""
																						, 	"beds"              	: 	""
																						, 	"baths"             	: 	""
																						, 	"sqft"              	: 	""
																						, 	"lot"               	: 	""
																						, 	"estimate"          	: 	"" // "Estimated Value";
																						, 	"valPerSF"          	: 	""
																						, 	"propType"          	: 	""
																						, 	"yrBuilt"           	: 	""
																						, 	"neighborhood"      	: 	""
																						, 	"style"	             	: 	""
																						, 	"stories"           	: 	""
																						}
															, 	"eppraisal"  		: 	{
																							"link"              	: 	"" // URL of scraped object
																						, 	"pointer"           	: 	"" // Points to element number of ARV estimate
																						, 	"estimate"          	: 	"" // "Value Estimate";
																						, 	"estimateLow"       	: 	""
																						, 	"estimateHigh"      	: 	""
																						, 	"void"              	: 	"" // “Dummy” variable in this AVM (created for scraping purposes)
																						, 	"beds"              	: 	""
																						, 	"baths"             	: 	""
																						, 	"sqft"              	: 	""
																						, 	"lot"               	: 	""
																						}
															, 	"realEstate" 		: 	{
																							"link"              	: 	"" // URL of scraped object
																						, 	"pointer"           	: 	"" // Points to element number of ARV estimate
																						, 	"estimate"          	: 	"" // "Estimated Value"
																						, 	"beds"              	: 	""
																						, 	"baths"             	: 	""
																						, 	"sqft"              	: 	""
																						, 	"yrBuilt"           	: 	""
																						, 	"stories"           	: 	""
																						, 	"lot"               	: 	""
																						}
															, 	"homeGain"   		: 	{
																						"link"              	: 	"" // URL of scraped object
																					, 	"pointer"           	: 	"" // Points to element number of ARV estimate
																					, 	"estimate"          	: 	"" // Median/avg low/high estimates
																					, 	"estimateLow"       	: 	"" // Low  estimate
																					, 	"estimateHigh"      	: 	"" // High estimate
																						}
															, 	"BofA"       		: 	{ // http://realestatecenter.bankofamerica.com/tools/marketvalue.aspx
																						}
															, 	"chase"      		: 	{ // https://www.chase.com/online/Home-Lending/home-value-estimator.htm
																						}
															}
									}
				}
*/
/* Data model — object — scraped from source i.e. Realtor.com
{
"DetailPageURL":null,
"ListDate":"/Date(1356678000000)/",
"IsSold":false,
"AgentAdvertiserId":409633,
"PropertyType":["Single Family Home"],
"IsForeclosed":true,
"IsCoBroker":true,
"HasVideo":false,
"IsMultipleListing":false,
"TypeId":null,
"IsShowCase":false,
"SourceListingID":null,
"ListingInfoFlag":0,
"RealtorID":0,
"SquareFeet":1412,
"IsPriceReduced":false,
"VideoURL":null,
"HasTour":false,
"ListingID":548624556,
"RelatedListings":[],
"IsNewListing":true,
"IsAdverstised":true,
"ProductFlags":{
"IsFeaturedHomes":false,
"IsHomepageStdOffice":false,
"IsHomepageShowcaseOffice":false,
"IsOfficeFocalPoint":false,
"IsCoShowLite":false,
"IsListingEnhancementOfficeStd":false,
"ExtensionData":{
},
"IsListingEnhancementAgentStd":false,
"BITMASK":0,
"IsHomepageShowcaseAgent":false,
"IsOfficeShowcaseList":false,
"IsDisplayAdsGeoRdc":false,
"IsBuyerAssist":false,
"HasTopProducer":false,
"IsAgentFocalPoint":false,
"IsFeaturedCMA":false,
"IsListingEnhancementAgentShowcase":false,
"IsMarketSnapshot":false,
"IsListingEnhancementOfficeShowcase":false,
"IsRealEstateFinancialPlanningSystem":false,
"IsFeaturedMortgage":false,
"IsListingShowcaseOnMoveDotCom":false,
"IsHomepageStdAgent":false
},
"SquareFeetLot":9700,
"Country":"USA",
"Features":null,
"Messages":[
],
"IsOfficeStandard":false,
"StreetAddress4Display":null,
"Price":467500,
"Headline":null,
"HasMessage":false,
"Longitude":-117.022476,
"UdbListingId":[
"1140816963"
],
"ListingTypeID":0,
"RelatedListingsCount":0,
"Bath":2,
"Bed":3,
"BrandBox":{
"HasAnimatedSignRider":false,
"Phone":"",
"HasWebAddress":true,
"Name":"Bancroft Realty",
"Text":"",
"ListingStateValue":"CA",
"CF":{
"SuppressSchoolData":false,
"C21A490":false,
"NRTA510":false,
"SuppressListingCreateDate":false,
"BrokerAddressLine":"5173 Waring Rd. #155",
"OpenHouseInfoA410":null,
"IsSalesRestrictedStates":false,
"RequestMoreDetailsA310":false,
"BrokerAddressState":"CA",
"Caption4LDP":null,
"Caption4SRP":null,
"HeadlineA320":null,
"Send2FriendA290":true,
"PrintA300":true,
"OpenHouseIconA130":null,
"DisableMapping":false,
"HeadlineA180":null,
"PhotoCountIndicatorA120":false,
"SuppressForeclosure":false,
"SaveSearchA210":false,
"ContactMeA230":false,
"SchoolsSectionA450":true,
"BrokerAddressCity":"San Diego",
"IsFeaturedMortgage":false,
"SuppressSalesHistory":false,
"MMW_Display":0,
"UseCalculatedValue4SoldPrice":false,
"ShowFcmaCta":false,
"PropertyFeaturesSectionA430":true,
"BrokerName":"Bancroft Realty",
"SpecializationsA260":false,
"EnableAdvertiseId":false,
"DisplayLargeOfficeLogo":false,
"SuppressLatLon":false,
"RealtyAllianceA500":false,
"CustomPropertyDescriptionA380":null,
"BrokerPhone":"(619)713-0197",
"PhotoCountA110":15,
"VideoIconA400":null,
"AnimatedSignRiderA160":null,
"VirtualTourIconA140":null,
"SuppressTaxAssessment":false,
"DisplayHoustonHomeValueLink":false,
"IsHoustonFCMAZip":false,
"EmbeddedSend2FriendA480":true,
"ASR4LDP":null,
"LogoA200":null,
"ShowPhotoCoinA360":false,
"DisplayBrokerPhone":false,
"AskQuestionA460":false,
"PhotoCountA270":15,
"AgentBusinessCardA340":false,
"ExtensionData":{
},
"ColorDifferentiationA100":false,
"OtherListingsA370":false,
"MapSectionA440":true,
"VideoIconA150":null,
"TollFreeNumberA330":null,
"DesignationsA240":null,
"DisplayBrokerAddress":false,
"BrokerAddressZip":null,
"SaveListingA280":true,
"Template":3,
"SuppressAddress":false,
"VirtualTourIconA390":null,
"SaveListingButtonA190":true,
"SuppressListingSqft":false,
"SendFriendA220":false,
"NeighborhoodInformationA420":true,
"SpecialMessageBoxA381":null,
"RequestMoreDetailsA470":false,
"SuppressNeighborhood":false,
"CustomPropertyDescriptionA170":null,
"BuyerOfficeBusinessCardA350":false,
"BuyerAgentBusinessCardA340":false,
"OfficeBusinessCardA350":false,
"AgentBrokerWebsiteA250":"?MlsName=sandiego&MlsListID=120062061&SourceID=realtor"
},
"HasName":true,
"WebAddress":"?MlsName=sandiego&MlsListID=120062061&SourceID=realtor",
"Address":"",
"AnimatedSignRider":null,
"HasText":false,
"IsPopulated":true
},
"HasPriceReducedKey":false,
"HasBranding":true,
"OpenHouseEndDate":[
],
"Start":null,
"MprId":"1493526487",
"PriceReducedDate":null,
"OfficeAdvertiserId":null,
"QueryString":null,
"TypeID":null,
"OpenHouseStartDate":[
],
"AgentOfficeID":0,
"Year":1972,
"Units":0,
"OfficeName":[
"Bancroft Realty"
],
"RealtorName":null,
"Latitude":32.808151,
"PhotoUrl":"http://p.rdcpix.com/v01/l437cff43-m0s.jpg",
"Zip":"92119",
"StartingPointIndex":null,
"OpenHouse":0,
"Neighborhoods":null,
"UpdateTime":"/Date(1356678000000)/",
"PhotoCount":15,
"ShowForeclosed":false,
"PropertyStatus":[
"Active"
],
"City":"San Diego",
"IsOffMarket":false,
"Exceptions":null,
"Apn":null,
"County":"San Diego",
"State":"CA",
"IsBasic":true,
"EnhancedTour":false,
"TourURL":null,
"BrokerLogoInfo":{
"ClickAction":null,
"Caption":null,
"Url":null,
"AdvertiserId":0,
"Photo":null
},
"VideoFlag":null,
"ControlFlags":{
"SuppressSchoolData":false,
"C21A490":false,
"NRTA510":false,
"SuppressListingCreateDate":false,
"BrokerAddressLine":"5173 Waring Rd. #155",
"OpenHouseInfoA410":null,
"IsSalesRestrictedStates":false,
"RequestMoreDetailsA310":false,
"BrokerAddressState":"CA",
"Caption4LDP":null,
"Caption4SRP":null,
"HeadlineA320":null,
"Send2FriendA290":true,
"PrintA300":true,
"OpenHouseIconA130":null,
"DisableMapping":false,
"HeadlineA180":null,
"PhotoCountIndicatorA120":false,
"SuppressForeclosure":false,
"SaveSearchA210":false,
"ContactMeA230":false,
"SchoolsSectionA450":true,
"BrokerAddressCity":"San Diego",
"IsFeaturedMortgage":false,
"SuppressSalesHistory":false,
"MMW_Display":0,
"UseCalculatedValue4SoldPrice":false,
"ShowFcmaCta":false,
"PropertyFeaturesSectionA430":true,
"BrokerName":"Bancroft Realty",
"SpecializationsA260":false,
"EnableAdvertiseId":false,
"DisplayLargeOfficeLogo":false,
"SuppressLatLon":false,
"RealtyAllianceA500":false,
"CustomPropertyDescriptionA380":null,
"BrokerPhone":"(619)713-0197",
"PhotoCountA110":15,
"VideoIconA400":null,
"AnimatedSignRiderA160":null,
"VirtualTourIconA140":null,
"SuppressTaxAssessment":false,
"DisplayHoustonHomeValueLink":false,
"IsHoustonFCMAZip":false,
"EmbeddedSend2FriendA480":true,
"ASR4LDP":null,
"LogoA200":null,
"ShowPhotoCoinA360":false,
"DisplayBrokerPhone":false,
"AskQuestionA460":false,
"PhotoCountA270":15,
"AgentBusinessCardA340":false,
"ExtensionData":{
},
"ColorDifferentiationA100":false,
"OtherListingsA370":false,
"MapSectionA440":true,
"VideoIconA150":null,
"TollFreeNumberA330":null,
"DesignationsA240":null,
"DisplayBrokerAddress":false,
"BrokerAddressZip":null,
"SaveListingA280":true,
"Template":3,
"SuppressAddress":false,
"VirtualTourIconA390":null,
"SaveListingButtonA190":true,
"SuppressListingSqft":false,
"SendFriendA220":false,
"NeighborhoodInformationA420":true,
"SpecialMessageBoxA381":null,
"RequestMoreDetailsA470":false,
"SuppressNeighborhood":false,
"CustomPropertyDescriptionA170":null,
"BuyerOfficeBusinessCardA350":false,
"BuyerAgentBusinessCardA340":false,
"OfficeBusinessCardA350":false,
"AgentBrokerWebsiteA250":"?MlsName=sandiego&MlsListID=120062061&SourceID=realtor"
},
"StreetAddress":"6807 Barker Way",
"SoldDate":null,
"HasException":false
}
*/
function avmJson        (propIn         ){ // MAIN AVM CALL! // When adding new data source, go to avmPrep(), and add new case; // When adding new AVM, 1. Go to avmData() then add new property to avm.dataset. 2. Add try{prop.link.x=...} to this function 3. Update output source. (e.g., Argenta-02-js/serveAvmReport argenta-gviz-03.html
	/* Archive
	//	var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())}
		var keystat    = ["isOk","popCount","openBid","autoEst","margin" ,"ratio" ,"sdPop"       ,"sdPct"        ,"set"]
		  , keycombo   = ["beds","baths"   ,"sqft"   ,"lot"    ,"yrBuilt","taxVal","lastSoldDate","lastSoldPrice"      ]
		  , keyset     = { "zillow"     :       ["link","pointer","zpid"    ,"homedetails","graphsanddata","mapthishome","myestimator","comparables","street"  ,"zipcode" ,"city"   ,"state"       ,"latitude","longitude","FIPScounty","useCode","taxAssessmentYear","taxAssessment","yearBuilt","lotSizeSqFt","finishedSqFt","bathrooms","bedrooms","lastSoldDate","lastSoldPrice","estimate","last-updated-zest","duration-zest","valueChange-zest","rangeLow-zest","rangeHigh-zest","percentile-zest","rentzestimate","last-updated-rent","duration-rent","valueChange-rent","rangeLow-rent","rangeHigh-rent","regionId","regionType","regionName","overview","forSaleByOwner","forSale"]
						 , "eppraisal"  :       ["link","pointer","estimate","estimateLow","estimateHigh" ,"void"       ,"beds"       ,"baths"      ,"sqft"    ,"lot"]
						 , "realtor"    : [] // ["link","pointer","status"  ,"beds"       ,"baths"        ,"sqft"       ,"lot"        ,"estimate"   ,"valPerSF","propType","yrBuilt","neighborhood","style"   ,"stories"]
						 , "realEstate" :       ["link","pointer","estimate","beds"       ,"baths","sqft" ,"yrBuilt"    ,"stories"    ,"lot"]
						 , "homeGain"   :       ["link","pointer","estimate","estimateLow","estimateHigh"]
						 , "trulia"	  	:       ["link","pointer","estimate"]}
		  , keysetKeys = Object.keys(keyset);
		//	addy							= avmPrepOut  (prop.address     ),
		//	arr								= addy.avmData([prop.price],true);
		//	prop.tag.agents					= true;
		//	prop.avm    	                = {};
			prop.avm.stat  		            = {};i=keystat   .length;while(i--){try{prop.avm.stat   [keystat   [i]]=arr[0][i  ];}catch(e){}} // Add AVM statistics
			prop.avm.combo  	            = {};i=keycombo  .length;while(i--){try{prop.avm.combo  [keycombo  [i]]=arr[2][i+1];}catch(e){}} // Add AVM combined facts
			prop.avm.dataset	            = {};i=keysetKeys.length;while(i--)    {prop.avm.dataset[keysetKeys[i]]={};
												 j=keyset[keysetKeys[i]].length;while(j--){try{prop.avm.dataset[keysetKeys[i]][keyset[keysetKeys[i]][j]]=arr[3][i+1][j];}catch(e){}}} // Add AVM datasets * /
	*/
	/* Parameters  // Notation/JSDoc reference: https://developers.google.com/closure/compiler/docs/js-for-compiler https://developers.google.com/apps-script/guide_libraries?hl=en
		@return {object} prop   — data-populated object model of subject property ("situs") under consideration for purchase; Example: {"avm":{"dataset":{"zillow":{"searchresults":{"request":{"citystatezip":{"Text":"75229"},"address":{"Text":"3255 Whitehall Drive"}},"schemalocation":"http://www.zillow.com/static/xsd/SearchResults.xsd http://www.zillowstatic.com/vstatic/3ab58af/static/xsd/SearchResults.xsd","response":{"results":{"result":{"lastSoldDate":{"Text":"05/17/2004"},"yearBuilt":{"Text":"1965"},"bathrooms":{"Text":"4.0"},"localRealEstate":{"region":{"type":"neighborhood","id":"275090","name":"Preston Hollow","links":{"forSaleByOwner":{"Text":"http://www.zillow.com/preston-hollow-dallas-tx/fsbo/"},"forSale":{"Text":"http://www.zillow.com/preston-hollow-dallas-tx/"},"overview":{"Text":"http://www.zillow.com/local-info/TX-Dallas/Preston-Hollow/r_275090/"}}}},"bedrooms":{"Text":"6"},"finishedSqFt":{"Text":"3297"},"taxAssessment":{"Text":"274660.0"},"lotSizeSqFt":{"Text":"12066"},"useCode":{"Text":"SingleFamily"},"taxAssessmentYear":{"Text":"2014"},"FIPScounty":{"Text":"48113"},"zpid":{"Text":"26809363"},"zestimate":{"percentile":{"Text":"0"},"amount":{"currency":"USD","Text":"328467"},"oneWeekChange":{"deprecated":"true"},"valueChange":{"currency":"USD","Text":"-985","duration":"30"},"valuationRange":{"low":{"currency":"USD","Text":"279197"},"high":{"currency":"USD","Text":"371168"}},"last_updated":{"Text":"01/13/2015"}},"rentzestimate":{"amount":{"currency":"USD","Text":"2348"},"oneWeekChange":{"deprecated":"true"},"valueChange":{"currency":"USD","Text":"145","duration":"30"},"valuationRange":{"low":{"currency":"USD","Text":"1644"},"high":{"currency":"USD","Text":"2700"}},"last_updated":{"Text":"01/12/2015"}},"links":{"comparables":{"Text":"http://www.zillow.com/homes/comps/26809363_zpid/"},"homedetails":{"Text":"http://www.zillow.com/homedetails/3255-Whitehall-Dr-Dallas-TX-75229/26809363_zpid/"},"mapthishome":{"Text":"http://www.zillow.com/homes/26809363_zpid/"},"graphsanddata":{"Text":"http://www.zillow.com/homedetails/3255-Whitehall-Dr-Dallas-TX-75229/26809363_zpid/#charts-and-data"}},"address":{"street":{"Text":"3255 Whitehall Dr"},"city":{"Text":"Dallas"},"longitude":{"Text":"-96.866545"},"latitude":{"Text":"32.901069"},"state":{"Text":"TX"},"zipcode":{"Text":"75229"}}}}},"message":{"text":{"Text":"Request successfully processed"},"code":{"Text":"0"}},"xsi":"urn:x-prefix:xsi"},"link":"http://www.zillow.com/webservice/GetDeepSearchResults.htm?rentzestimate=true&zws-id=X1-ZWz1dy7ynmuayz_4aijl&address=3255 Whitehall Drive&citystatezip=75229","estimate":"328467"},"trulia":{"beds":"6","baths":"4","sqft":"3297","lot":"n/a","yrBuilt":"1965","estimate":false,"dataSet":{"id":"3166021937","feedId":1004,"hash":"163f96267fcf4fa666ec4224ea2767e","neighborhood":"Preston Hollow","neighborhoodId":"6186","zipCode":"75229","city":"Dallas","county":"Dallas","countyFIPS":"48113","stateCode":"TX","stateName":"Texas","latitude":32.90107,"longitude":-96.86655,"addressForDisplay":"3255 Whitehall Drive, Dallas TX","addressForUrl":"3255-Whitehall-Dr-Dallas-TX-75229","streetNumber":"3255","street":"Whitehall Dr","apartmentNumber":null,"urlType":null,"status":"For Sale","listingId":"3166021937","locationId":"71155","type":"SINGLE-FAMILY HOME","typeDisplay":"Single-Family Home","numBedrooms":6,"numBathrooms":4,"numPartialBathrooms":0,"numFullBathrooms":4,"siteId":"10342744","siteUrl":"www.cbdfw.com","listingType":0,"dmaId":190,"claimed":null,"numBeds":6,"indexSource":"For Sale","isForeclosure":false,"foreclosureStatus":"","isSrpFeatured":true,"price":237500,"sqft":3297,"isRental":false,"isRentalCommunity":false,"hasStreetView":"-1","showStreetView":"1","blockStreetView":false,"walkScore":48,"photos":["ps.69/f/0/5/4/picture-uh=181bd69747f317c4f07bc77890a02-ps=f054ba626ccd3d48152cf618d7df8315.jpg:15","ps.69/e/1/1/1/picture-uh=fe73332d7f30252c702233ebb09561-ps=e1111d762e45d9b9464c8345896625.jpg:15","ps.69/8/a/5/1/picture-uh=65b4637c2c0ebfb1e242f15bfd8a036-ps=8a5174fcf5f54f4dfcd2a02b7311d1ce.jpg:15","ps.69/2/e/c/6/picture-uh=b9d7aeb51f2314db6c5367a4bcd8e5-ps=2ec63992561fb56b2a1f1142f372685.jpg:15","ps.69/8/7/9/c/picture-uh=a177ddb3dcfff1458c89dfcfd9c47b-ps=879c469467c656fe808bd2f19b37e7ae.jpg:15","ps.69/9/7/6/f/picture-uh=12c6cd459d7b80b79c8526263cc596b8-ps=976ff6ee7acdd735adbbe65e625e80.jpg:15","ps.69/5/0/b/a/picture-uh=5fe7a7b5bf7322253d13c604772cada-ps=50bafe911da7a1febd9765cd785c05c.jpg:15","ps.69/9/a/1/a/picture-uh=5de9bfe11b5a6cdb49ce6509eff93a5-ps=9a1aae4472dba9ae4afd4a91ca235e7.jpg:15"],"adCampaign":null,"hasPhotos":true,"userHidden":null,"userLiked":null,"isAddressNotDisclosed":false,"_isDefault":true,"intersectionName":null,"agentClaimable":true,"pdpURL":"/property/3166021937-3255-Whitehall-Dr-Dallas-TX-75229","thumbnail":"http://thumbs.trulia-cdn.com/pictures/thumbs/ps.69/f/0/5/4/picture-uh=181bd69747f317c4f07bc77890a02-ps=f054ba626ccd3d48152cf618d7df8315.jpg","formattedPrice":"$237,500","shortDescription":"3255 Whitehall Dr","formattedBedAndBath":"6bd, 4 full ba","formattedSqft":"3,297 sqft","dataPhotos":"{\"photos\":[{\"thumbnail_url\":\"http:\\/\\/thumbs.trulia-cdn.com\\/pictures\\/thumbs\\/ps.69\\/f\\/0\\/5\\/4\\/picture-uh=181bd69747f317c4f07bc77890a02-ps=f054ba626ccd3d48152cf618d7df8315.jpg\",\"standard_url\":\"http:\\/\\/thumbs.trulia-cdn.com\\/pictures\\/thumbs_4\\/ps.69\\/f\\/0\\/5\\/4\\/picture-uh=181bd69747f317c4f07bc77890a02-ps=f054ba626ccd3d48152cf618d7df8315-3255-Whitehall-Dr-Dallas-TX-75229.jpg\",\"raw_path\":\"ps.69\\/f\\/0\\/5\\/4\\/picture-uh=181bd69747f317c4f07bc77890a02-ps=f054ba626ccd3d48152cf618d7df8315.jpg\",\"thumbsBitmap\":null},{\"thumbnail_url\":\"http:\\/\\/thumbs.trulia-cdn.com\\/pictures\\/thumbs\\/ps.69\\/e\\/1\\/1\\/1\\/picture-uh=fe73332d7f30252c702233ebb09561-ps=e1111d762e45d9b9464c8345896625.jpg\",\"standard_url\":\"http:\\/\\/thumbs.trulia-cdn.com\\/pictures\\/thumbs_4\\/ps.69\\/e\\/1\\/1\\/1\\/picture-uh=fe73332d7f30252c702233ebb09561-ps=e1111d762e45d9b9464c8345896625.jpg\",\"raw_path\":\"ps.69\\/e\\/1\\/1\\/1\\/picture-uh=fe73332d7f30252c702233ebb09561-ps=e1111d762e45d9b9464c8345896625.jpg\",\"thumbsBitmap\":null},{\"thumbnail_url\":\"http:\\/\\/thumbs.trulia-cdn.com\\/pictures\\/thumbs\\/ps.69\\/8\\/a\\/5\\/1\\/picture-uh=65b4637c2c0ebfb1e242f15bfd8a036-ps=8a5174fcf5f54f4dfcd2a02b7311d1ce.jpg\",\"standard_url\":\"http:\\/\\/thumbs.trulia-cdn.com\\/pictures\\/thumbs_4\\/ps.69\\/8\\/a\\/5\\/1\\/picture-uh=65b4637c2c0ebfb1e242f15bfd8a036-ps=8a5174fcf5f54f4dfcd2a02b7311d1ce.jpg\",\"raw_path\":\"ps.69\\/8\\/a\\/5\\/1\\/picture-uh=65b4637c2c0ebfb1e242f15bfd8a036-ps=8a5174fcf5f54f4dfcd2a02b7311d1ce.jpg\",\"thumbsBitmap\":null},{\"thumbnail_url\":\"http:\\/\\/thumbs.trulia-cdn.com\\/pictures\\/thumbs\\/ps.69\\/2\\/e\\/c\\/6\\/picture-uh=b9d7aeb51f2314db6c5367a4bcd8e5-ps=2ec63992561fb56b2a1f1142f372685.jpg\",\"standard_url\":\"http:\\/\\/thumbs.trulia-cdn.com\\/pictures\\/thumbs_4\\/ps.69\\/2\\/e\\/c\\/6\\/picture-uh=b9d7aeb51f2314db6c5367a4bcd8e5-ps=2ec63992561fb56b2a1f1142f372685.jpg\",\"raw_path\":\"ps.69\\/2\\/e\\/c\\/6\\/picture-uh=b9d7aeb51f2314db6c5367a4bcd8e5-ps=2ec63992561fb56b2a1f1142f372685.jpg\",\"thumbsBitmap\":null},{\"thumbnail_url\":\"http:\\/\\/thumbs.trulia-cdn.com\\/pictures\\/thumbs\\/ps.69\\/8\\/7\\/9\\/c\\/picture-uh=a177ddb3dcfff1458c89dfcfd9c47b-ps=879c469467c656fe808bd2f19b37e7ae.jpg\",\"standard_url\":\"http:\\/\\/thumbs.trulia-cdn.com\\/pictures\\/thumbs_4\\/ps.69\\/8\\/7\\/9\\/c\\/picture-uh=a177ddb3dcfff1458c89dfcfd9c47b-ps=879c469467c656fe808bd2f19b37e7ae.jpg\",\"raw_path\":\"ps.69\\/8\\/7\\/9\\/c\\/picture-uh=a177ddb3dcfff1458c89dfcfd9c47b-ps=879c469467c656fe808bd2f19b37e7ae.jpg\",\"thumbsBitmap\":null},{\"thumbnail_url\":\"http:\\/\\/thumbs.trulia-cdn.com\\/pictures\\/thumbs\\/ps.69\\/9\\/7\\/6\\/f\\/picture-uh=12c6cd459d7b80b79c8526263cc596b8-ps=976ff6ee7acdd735adbbe65e625e80.jpg\",\"standard_url\":\"http:\\/\\/thumbs.trulia-cdn.com\\/pictures\\/thumbs_4\\/ps.69\\/9\\/7\\/6\\/f\\/picture-uh=12c6cd459d7b80b79c8526263cc596b8-ps=976ff6ee7acdd735adbbe65e625e80.jpg\",\"raw_path\":\"ps.69\\/9\\/7\\/6\\/f\\/picture-uh=12c6cd459d7b80b79c8526263cc596b8-ps=976ff6ee7acdd735adbbe65e625e80.jpg\",\"thumbsBitmap\":null},{\"thumbnail_url\":\"http:\\/\\/thumbs.trulia-cdn.com\\/pictures\\/thumbs\\/ps.69\\/5\\/0\\/b\\/a\\/picture-uh=5fe7a7b5bf7322253d13c604772cada-ps=50bafe911da7a1febd9765cd785c05c.jpg\",\"standard_url\":\"http:\\/\\/thumbs.trulia-cdn.com\\/pictures\\/thumbs_4\\/ps.69\\/5\\/0\\/b\\/a\\/picture-uh=5fe7a7b5bf7322253d13c604772cada-ps=50bafe911da7a1febd9765cd785c05c.jpg\",\"raw_path\":\"ps.69\\/5\\/0\\/b\\/a\\/picture-uh=5fe7a7b5bf7322253d13c604772cada-ps=50bafe911da7a1febd9765cd785c05c.jpg\",\"thumbsBitmap\":null},{\"thumbnail_url\":\"http:\\/\\/thumbs.trulia-cdn.com\\/pictures\\/thumbs\\/ps.69\\/9\\/a\\/1\\/a\\/picture-uh=5de9bfe11b5a6cdb49ce6509eff93a5-ps=9a1aae4472dba9ae4afd4a91ca235e7.jpg\",\"standard_url\":\"http:\\/\\/thumbs.trulia-cdn.com\\/pictures\\/thumbs_4\\/ps.69\\/9\\/a\\/1\\/a\\/picture-uh=5de9bfe11b5a6cdb49ce6509eff93a5-ps=9a1aae4472dba9ae4afd4a91ca235e7.jpg\",\"raw_path\":\"ps.69\\/9\\/a\\/1\\/a\\/picture-uh=5de9bfe11b5a6cdb49ce6509eff93a5-ps=9a1aae4472dba9ae4afd4a91ca235e7.jpg\",\"thumbsBitmap\":null}],\"static_map_path\":\"http:\\/\\/maps.googleapis.com\\/maps\\/api\\/staticmap?client=gme-truliainc&zoom=18&size=640x480&maptype=satellite&sensor=false&center=32.90107%2C-96.86655&signature=UhjsP8QlII4piLOvOwez6tgIBIM=\"}","isBuilder":false,"isBuilderCommunity":false,"isPlan":false,"isSpec":false,"isPromotedCommunity":false,"builderName":null,"builderCommunityId":null,"userClaimed":false},"locationData":{"neighborhood":{"locationId":"86307","name":"Preston Hollow","locationType":"neighborhood","altId":"6186"},"state":{"locationId":"44","name":"Texas","locationType":"state","altId":"TX"},"county":{"locationId":"58","name":"Dallas County","locationType":"county","altId":"48113"},"city":{"locationId":"11249","name":"Dallas","locationType":"city","altId":"68627"},"propertyId":"3166021937","addressHash":"163f96267fcf4fa666ec4224ea2767e","address":"3255 Whitehall Dr","zipCode":{"locationId":"71155","name":"75229","locationType":"zipCode","altName":"75229","altId":"75229"},"geohash":"9vg55trytgc","latitude":32.90107,"longitude":-96.86655,"unknown":true,"isCountySupportsValuation":false},"comps":"{\"for sale\":[{\"t\":\"for_sale\",\"y\":32.900047,\"x\":-96.866585,\"a\":\"KENILWORTH ESTATES\",\"s\":\"TX\",\"c\":\"Dallas\",\"z\":\"75229\",\"p\":\"252,500\",\"ph\":\"62e99c7da7b985e9c865bb4cd78843a9\",\"n\":\"\",\"pt\":\"Single-Family Home\",\"i\":\"thumbs\\/ps.65\\/7\\/9\\/8\\/5\\/picture-uh=9ff2c116e52a1e14b7f6c515df7d823-ps=79859d103ff599b68ccc62d82ea6462.jpg\",\"ib\":\"thumbs_big\\/ps.65\\/7\\/9\\/8\\/5\\/picture-uh=9ff2c116e52a1e14b7f6c515df7d823-ps=79859d103ff599b68ccc62d82ea6462.jpg\",\"sd\":\"\",\"br\":\"4\",\"ba\":\"3\",\"sf\":\"2,000\",\"pps\":\"126\",\"cs\":\"\",\"id\":\"1074311844\",\"u\":\"\\/property\\/1074311844-KENILWORTH-ESTATES-3243-Jubilee-Trl-Dallas-TX-75229\",\"lt\":\"for_sale\",\"fc\":false,\"v\":null,\"vd\":null,\"uh\":null,\"sa\":\"\",\"sid\":11116357,\"ls\":\"For Sale\",\"streetviewImage\":\"http:\\/\\/maps.googleapis.com\\/maps\\/api\\/streetview?client=gme-truliainc&size=70x50&sensor=false&location=32.900047%2C-96.866585&signature=7eKKIym-Te840dAS7YOpl-l3Rag=\",\"satelliteImage\":\"http:\\/\\/maps.googleapis.com\\/maps\\/api\\/staticmap?client=gme-truliainc&zoom=18&size=70x50&maptype=satellite&sensor=false&center=32.900047%2C-96.866585&signature=FOKQzoa9nFdCYRJRrOORsZBsUew=\",\"fl\":\"0\"},{\"t\":\"for_sale\",\"y\":32.899433,\"x\":-96.867584,\"a\":\"3218 Jubilee Trl\",\"s\":\"TX\",\"c\":\"Dallas\",\"z\":\"75229\",\"p\":\"299,000\",\"ph\":\"c14c70b5d73915c4054fd22441e967\",\"n\":\"\",\"pt\":\"Single-Family Home\",\"i\":\"thumbs\\/ps.69\\/1\\/c\\/3\\/4\\/picture-uh=c9645ee489d0a7c01440293a11e8293a-ps=1c348c6f7d3ee0d421ab35eb3d3687.jpg\",\"ib\":\"thumbs_big\\/ps.69\\/1\\/c\\/3\\/4\\/picture-uh=c9645ee489d0a7c01440293a11e8293a-ps=1c348c6f7d3ee0d421ab35eb3d3687.jpg\",\"sd\":\"\",\"br\":\"3\",\"ba\":\"2&frac12","detail":{"photo":"no","long":"no","ad":"no","error":true,"html":"Error: Property data not found.","success":true,"errors":[]},"link":"http://www.trulia.com/property/3166021937-3255-Whitehall-Dr-Dallas-TX-75229"},"homeSnap":{"low":false,"estimate":false,"high":false,"foo":false,"beds":false,"heating":false,"pmtEst":false,"bathsFull":false,"basement":false,"rentEst":false,"bathsHalf":false,"stories":"1","taxEst":false,"sqft":false,"addressStories":false,"homeScore":false,"lot":false,"fireplaces":false,"investorScore":false,"lastSaleDate":false,"lastSalePrice":false,"yearBuilt":false,"link":"http://www.homesnap.com/TX/Dallas/3255-Whitehall-Drive"},"realtor":{"status":"Active","beds":false,"baths":"4","sqft":false,"lot":"0.28 Acres","built":"1965","link":"http://www.realtor.com/propertyrecord-search/Dallas_Texas/75229/3255-Whitehall-Drive"},"dataQuick":{},"smartZip":{},"eppraisal":{},"realEstate":{"estimate":false,"beds":"Buy","baths":"Homes for Sale","sqft":"Open Houses","built":false,"stories":"Foreclosures","lot":"New Homes","link":"http://www.realestate.com/homevalues/3255-Whitehall-Drive,Dallas,Texas/"}},"combi":{"useCode":"SFR","beds":"6","baths":"4.0","sqft":"3297","lot":"12066","built":"1965","taxVal":"274660.0","lastSoldDate":"05/17/2004","lastSoldYear":"2004"},"stat":{"ob":{"zillow":"328467"},"set":["328467"],"isOk":true,"popCount":1,"autoEst":328467,"margin":null,"ratio":null,"sdPop":0,"sdPct":0}},"address":{"sa":"3255 Whitehall Drive","city":"Dallas","state":"Texas","zip":"75229","county":"Dallas County","csz":"Dallas, Texas 75229","full":"3255 Whitehall Drive, Dallas, Texas 75229","part":"Whitehall Drive, Dallas, Texas 75229","number":"3255"},"isRaw":false,"table":"situs","source":{"name":"manual","data":"3255 Whitehall Dr, Dallas, TX 75229"},"link":{"gmap":"https://maps.google.com/maps?q=3255+Whitehall+Drive,+Dallas,+Texas+75229","zillow":"http://www.zillow.com/homes/3255-Whitehall-Drive,-75229_rb/","propertyShark":"http://www.propertyshark.com/","neighborhoodScout":"http://www.neighborhoodscout.com/","zipSkinny":"http://zipskinny.com/index.php?zip=75229","chase":"https://www.chase.com/mortgage/mortgage-resources/home-value-estimator","boa":"http://realestatecenter.bankofamerica.com/tools/marketvalue.aspx","homesCom":"http://www.homes.com/Home-Prices/","homeSnap":"http://www.homesnap.com/TX/Dallas/3255-Whitehall-Drive","trulia":"http://www.trulia.com/property/3166021937-3255-Whitehall-Dr-Dallas-TX-75229","realEstate":"http://www.realestate.com/homevalues/3255-Whitehall-Drive,Dallas,Texas/","realtor":"http://www.realtor.com/propertyrecord-search/Dallas_Texas/75229/3255-Whitehall-Drive","photo":false},"offer":{"beforeRepairs":{"auto":null,"manual":{}},"afterRepairs":{"manual":{}}},"incomeApproach":null,"arv":{},"repairs":{},"counter":{},"analysis":{},"contract":{},"assignment":{}}
		@param  {object} propIn — {"source":{"name":"Realtor","data":{foo}},"market":{"city":"Pheonix","state":"AZ"}} — "data": original string or object representing subject as obtained from source; could be scraped web page string, spreadsheet cells, etc. (e.g., {...data:scraped[i]...})
		@param  {string} source — label, naming source of data | Value range: "manual" (single line text field from web form) , "ZipRealty" (email feeder) , "ChuckWillman" (email + ss attachment to Gdoc) , "Realtor" (scraping Realtor.com) , "KennethGreen" (hand entered spreadsheet)
	*/
	/* Sample Calls
	    function realtorScrape(inState,inCity){...out[i]={isRaw:true,source:{name:"Realtor",data:scraped[i]},market:{city:"San-Diego",state:"CA"}};}return out}
		function realtorScrape_call(city,state){db=ScriptDb.getMyDb(),arr=realtorScrape("San-Diego","CA");db.saveBatch(arr,false);return}
		function realtorAddAvm(){var db=ScriptDb.getMyDb(),r,q,results=db.query({isRaw:true});while(results.hasNext()){r=results.next();q=LibraryjsAvm.avmJson(r);db.save(q);db.remove(r);}}	
	*/
	/* Test
	    function test(){var addy="5008 corson ave s, seattle, wa",out=JSON.stringify(avmJson({"source":{"name":"manual","data":addy/*,"market":{"city":"Pheonix","state":"AZ"}* /}}));Logger.log(out);print(out)}
	    function test(){var addy="3255 Whitehall Dr, Dallas, TX 75229";print(JSON.stringify(avmJson({"source":{"name":"manual","data":addy/*,"market":{"city":"Pheonix","state":"AZ"}* /}})))}
        function test(){var addy="11462 Cromwell Ct, Dallas, TX 75229"//"1919 Bigelow Ave N, Seattle, Wa 98109" //{city:"Seattle",sa:"1919 Bigelow Ave N",state:"WA","zip":"98109","csz":"Seattle, WA 98109","full":"1919 Bigelow Ave N, Seattle, WA 98109","part":"Bigelow Ave N, Seattle, WA 98109","number":"1919"}
                 ;print(JSON.stringify(avmJson({"source":{"name":"manual","data":addy/*,"market":{"city":"Pheonix","state":"AZ"}* /}})))}
		function test(){var addy="7318 S Dorchester Ave, Chicago IL"//"11462 Cromwell Ct, Dallas, TX 75229"//"1919 Bigelow Ave N, Seattle, Wa 98109" //{city:"Seattle",sa:"1919 Bigelow Ave N",state:"WA","zip":"98109","csz":"Seattle, WA 98109","full":"1919 Bigelow Ave N, Seattle, WA 98109","part":"Bigelow Ave N, Seattle, WA 98109","number":"1919"}
				 ;print2doc(JSON.stringify(avmJson({"source":{"name":"manual","data":addy/*,"market":{"city":"Pheonix","state":"AZ"}* /}},2)),"jsAvm","avmJson")}
	*/
	/* Display Variables
		r.price
		r.offer.beforeRepairs.auto
		r.avm.stat.autoEst
		r.avm.stat.set.length
		r.avm.stat.ratio
		r.avm.stat.sdPct
		r.avm.stat.popCount
		r.avm.stat.set[i]
		r.arv.value
		r.repairs.value
		r.counter.value
		r.source.detailpageURL
		r.LST_Attributes[21].attribute_value
		r.address.street
		r.address.full
		r.link.yahoo
		r.link.gmap
		r.avm.dataset.zillow.    link
		r.avm.dataset.zillow.    homedetails
		r.avm.dataset.zillow.    rentzestimate
		r.avm.dataset.trulia.    link
		r.avm.dataset.eppraisal. link
		r.avm.dataset.realtor.   link
		r.avm.dataset.realEstate.link
		r.avm.dataset.homeGain.  link
		"http://www.propertyshark.com/"
		"http://www.neighborhoodscout.com"
		"http://zipskinny.com/index.php?zip="+r.address.zip
		"https://www.chase.com/mortgage/mortgage-resources/home-value-estimator"
		"http://realestatecenter.bankofamerica.com/tools/marketvalue.aspx"
		"http://www.homes.com/Home-Prices/"
	*/
	{//Code
	var		prep				            = avmPrep(propIn.source.data   ,propIn.source.name);if(prep.avmZillowAPI/*geoSource=="avmZillowAPI"*/){prep.ask=prep.avmZillowAPI;delete prep.avmZillowAPI}
	var		prop   	              			= avmData(prep.address,prep.ask,propIn.source.name);if(typeof prep.ask=="object"){delete prep.ask} // Duplicate of ZillowAPI AVM
			prop.isRaw						= false;
			prop.table                      = "situs";
			prop.source						= propIn.source;
			prop.ask						= prep.ask;
			prop.link                       = {};
	try{	prop.link.gmap          		= linkGoogleMaps(prop.address)                                            }catch(e){Logger.log("Error 2K4Kz: "+e.message)}
 // try{	prop.link.yahoo                 = linkYahoo     (prop.address)                                            }catch(e){Logger.log("Error SiVia: "+e.message)}
	try{	prop.link.zillow                = linkZillow    (prop.address)                                            }catch(e){Logger.log("Error NmMC8: "+e.message)}
	try{	prop.link.propertyShark         = "http://www.propertyshark.com/"                                         }catch(e){Logger.log("Error hA7GR: "+e.message)}		
	try{	prop.link.neighborhoodScout     = "http://www.neighborhoodscout.com/"                                     }catch(e){Logger.log("Error GDhMT: "+e.message)}		
	try{	prop.link.cityData              = "http://www.city-data.com/"                                             }catch(e){Logger.log("Error FTDGo: "+e.message)}		
	try{	prop.link.esriZip               = "http://www.esri.com/data/esri_data/ziptapestry"                        }catch(e){Logger.log("Error FTDGo: "+e.message)}		
	try{	prop.link.zipRealty             = "http://www.ziprealty.com/"                                             }catch(e){Logger.log("Error FTDGo: "+e.message)}		
 //         prop.link.zipSkinny             = "http://zipskinny.com/index.php?zip="		
 //;try{    prop.link.zipSkinny            += prop.address.zip                                                        }catch(e){Logger.log("Error G6WdW: "+e.message)}		
	try{	prop.link.chase                 = "https://www.chase.com/mortgage/mortgage-resources/home-value-estimator"}catch(e){Logger.log("Error eBhKX: "+e.message)}		
	try{	prop.link.boa                   = "http://realestatecenter.bankofamerica.com/tools/marketvalue.aspx"      }catch(e){Logger.log("Error ChLup: "+e.message)}		
	try{	prop.link.homesCom              = "http://www.homes.com/Home-Prices/"                                     }catch(e){Logger.log("Error hnNhw: "+e.message)}		
	try{	prop.link.movotoRe              = "http://www.movoto.com/"                                                }catch(e){Logger.log("Error hnNhw: "+e.message)}		
            prop.link.movotoDemo            = "http://www.movoto.com/"		
   ;try{    prop.link.movotoDemo           += prop.address.city.replace(/( |,)/gi,"-")+"-"+prop.address.state+"/"+prop.address.zip+"/demographics/"}catch(e){Logger.log("Error G6WdW: "+e.message);prop.link.movotoDemo+="demographics/"}		
	try{	prop.link.homeSnap              = prop.avm.dataset.homeSnap  .link                                        }catch(e){Logger.log("Error JLC1v: "+e.message)}		
 // try{    prop.link.coreLogic             = prop.avm.dataset.coreLogic .link                                        }catch(e){Logger.log("Error      : "+e.message)}		
	try{	prop.link.trulia                = prop.avm.dataset.trulia    .link                                        }catch(e){Logger.log("Error 3phKn: "+e.message)}		
	try{	prop.link.realEstate            = prop.avm.dataset.realEstate.link                                        }catch(e){Logger.log("Error lsqvM: "+e.message)}		
	try{	prop.link.realtor               =(propIn.source.name == "Realtor") ? prop.source.data.link_detail
	                                                                           : prop.avm.dataset.realtor.link        }catch(e){Logger.log("Error ZIWXC: "+e.message)}		
	try{	prop.link.photo                 =(propIn.source.name == "Realtor") ? prop.source.data.link_photo : false  }catch(e){Logger.log("Error h83fm: "+e.message)}
			prop.offer			            = {};
			prop.offer.beforeRepairs        = {};
	try{	prop.incomeApproach             = LibraryjsUtil.incomeApproach(prop.ask,prop.avm.dataset.zillow.rentzestimate,prop.source.propertyTax/*details.TAXES_AMOUNT*/,5000,5000)}catch(e){Logger.log("Error iNuBP: "+e.message)} // Add initial offer (before repairs) as determined by income approach
			prop.offer.beforeRepairs.auto   = prop.incomeApproach; // Add initial offer (before repairs) as determined by income approach
			prop.offer.beforeRepairs.manual = {};
			prop.offer.afterRepairs         = {};
			prop.offer.afterRepairs.manual  = {};
			prop.arv                        = {};
			prop.repairs					= {};
			prop.counter					= {};
			prop.analysis					= {};
			prop.contract					= {};
			prop.assignment					= {};
	return  prop;}}
function avmPrep        (scraped ,source){ // function test(){Logger.log("RESULT: "+JSON.stringify(avmPrep("17013 114 ave se, Renton, Wa"/*"5008 corson ave s, seattle, wa"*/,"manual")))}
    var out={};out.address={};             // @return{object} subject address; @param{string} source — "Realtor"||/*"RealtyTrac"*/"ChuckWillman"||"ZipRealty"; @param{object} scraped from source // Purpose: Standardize/normalize address keys of scraped property (situs) objects
    switch(source){ // Note: scraped is source.data (i.e., as scraped from source / unprocessed)
        case "manual"                            : try{scraped=/*LibraryjsUtil.*/str2addy(scraped)}catch(e){scraped={geoSource:false};Logger.log("Error T5daq: "+e.message)}
		                                           if(!scraped){return false}switch(scraped.geoSource){
		    case "avmZillowAPI"                  : var r=scraped.searchresults.response.results.result/*[0]*/.address  ;//Logger.log("geoSource: "+scraped.geoSource);
                //  try{out["apn"    ]			 = scraped["address"]["apn"          ]                                 ;}catch(e){Logger.log("Error RjTI0: "+e.message)}                              // Deprecated 12/31/2012 
                //  try{out["ask"    ] 			 = scraped["address"]["price"        ]                                 ;}catch(e){Logger.log("Error ZTBX9: "+e.message)} // scraped["PropertyPrice"]; // Deprecated 12/31/2012 
                    try{out["latitude"         ] = scraped["latitude"                ]                                 ;}catch(e){Logger.log("Error CwP1J: "+e.message)}
                    try{out["longitude"        ] = scraped["longitude"               ]                                 ;}catch(e){Logger.log("Error WElpm: "+e.message)}
                    try{out["address"]["sa"    ] = r.street .Text                                                      ;}catch(e){Logger.log("Error BQqVi: "+e.message)} // scraped["address"      ]; // Deprecated 12/31/2012 
                    try{out["address"]["city"  ] = r.city   .Text                                                      ;}catch(e){Logger.log("Error pVTOk: "+e.message)}
                    try{out["address"]["state" ] = r.state  .Text                                                      ;}catch(e){Logger.log("Error kNNhD: "+e.message)}
                    try{out["address"]["zip"   ] = r.zipcode.Text                                                      ;}catch(e){Logger.log("Error i34IS: "+e.message)}
                //  try{out["address"]["county"] = r.county                                                            ;}catch(e){Logger.log("Error uxACu: "+e.message)}
                    try{out["address"]["csz"   ] = out.address.city + ", " + out.address.state + " " + out.address.zip ;}catch(e){Logger.log("Error TtpsW: "+e.message)}
                //  try{out["address"]["csz"   ] = scraped["address"]["csz"		     ]                                 ;}catch(e){Logger.log("Error Ou7Fd: "+e.message)}
                    try{out["address"]["full"  ] = out.address.sa   + ", " + out.address.csz                           ;}catch(e){Logger.log("Error OR4qV: "+e.message)}
                    try{out["address"]["part"  ] = out.address.full.getSuffix(" ").trim()                              ;}catch(e){Logger.log("Error mjvlL: "+e.message)}
                    try{out["address"]["number"] = out.address.full.getPrefix(" ").trim()                              ;}catch(e){Logger.log("Error H07pW: "+e.message)}
                    try{out["avmZillowAPI"     ] = scraped                                                             ;}catch(e){Logger.log("Error mKzKI: "+e.message)}
			        break;
			case "geoGoogle"                     :                                                                      //Logger.log("geoSource: "+scraped.geoSource);
			    //  try{                  var r  = LibraryjsUtil.geoGoogleGetAddyComponents(scraped)                    }catch(e){Logger.log("Error QhdQo: "+e.message)} // r variable and function necessary because geoGoogle returns address compents embedded in nested array
                //  try{out["apn"    ]			 = scraped["address"]["apn"          ]                                 ;}catch(e){Logger.log("Error RoEG5: "+e.message)}                              // Deprecated 12/31/2012 
                //  try{out["ask"    ] 			 = scraped["address"]["price"        ]                                 ;}catch(e){Logger.log("Error ydEZJ: "+e.message)} // scraped["PropertyPrice"]; // Deprecated 12/31/2012 
                    try{out["latitude"         ] = scraped["latitude"                ]                                 ;}catch(e){Logger.log("Error 52Woj: "+e.message)}
                    try{out["longitude"        ] = scraped["longitude"               ]                                 ;}catch(e){Logger.log("Error b2eMH: "+e.message)}
                    try{out["address"]["sa"    ] = /*r*/scraped.number + " " + /*r*/scraped.street                     ;}catch(e){Logger.log("Error aPG7o: "+e.message)} // scraped["address"      ]; // Deprecated 12/31/2012 
                    try{out["address"]["city"  ] = /*r*/scraped.city                                                   ;}catch(e){Logger.log("Error zLSD6: "+e.message)}
                    try{out["address"]["state" ] = /*r*/scraped.state                                                  ;}catch(e){Logger.log("Error A10at: "+e.message)}
                    try{out["address"]["zip"   ] = /*r*/scraped.zip                                                    ;}catch(e){Logger.log("Error T9bkX: "+e.message)}
                    try{out["address"]["county"] = /*r*/scraped.county                                                 ;}catch(e){Logger.log("Error 9fBHm: "+e.message)}
                    try{out["address"]["csz"   ] = out.address.city + ", " + out.address.state + " " + out.address.zip ;}catch(e){Logger.log("Error fw4fV: "+e.message)}
                    try{out["address"]["full"  ] = out.address.sa   + ", " + out.address.csz                           ;}catch(e){Logger.log("Error Fjs1v: "+e.message)}
                    try{out["address"]["part"  ] = out.address.full.getSuffix(" ").trim()                              ;}catch(e){Logger.log("Error QTHMl: "+e.message)}
                    try{out["address"]["number"] =      scraped.number                                                 ;}catch(e){Logger.log("Error XUO6k: "+e.message)}
                //  try{out["address"]["number"] = out.address.full.getPrefix(" ").trim()                              ;}catch(e){Logger.log("Error XUO6k: "+e.message)}
                    break;
			case "geoMapQuestCsz"                :                                                                      //Logger.log("geoSource: "+scraped.geoSource);
                    try{out                      = scraped                                                             ;}catch(e){Logger.log("Error R0g2Q: "+e.message)}                              // Deprecated 12/31/2012 
				//  try{out["apn"    ]			 = scraped["address"]["apn"          ]                                 ;}catch(e){Logger.log("Error PCz6j: "+e.message)}                              // Deprecated 12/31/2012 
                //  try{out["ask"    ] 			 = scraped["address"]["price"        ]                                 ;}catch(e){Logger.log("Error NL8bN: "+e.message)} // scraped["PropertyPrice"]; // Deprecated 12/31/2012 
                //  try{out["latitude"         ] = scraped["latitude"                ]                                 ;}catch(e){Logger.log("Error O3LzC: "+e.message)}
                //  try{out["longitude"        ] = scraped["longitude"               ]                                 ;}catch(e){Logger.log("Error r4vUW: "+e.message)}
                //  try{out["address"]["sa"    ] = scraped .address.house_number + " " + scraped.address.road          ;}catch(e){Logger.log("Error lmjdo: "+e.message)} // scraped["address"      ]; // Deprecated 12/31/2012 
                //  try{out["address"]["city"  ] = scraped["address"]["city"         ]                                 ;}catch(e){Logger.log("Error c21RV: "+e.message)}
                //  try{out["address"]["state" ] = scraped["address"]["state"        ] /*Not standard e.g., "penna"*/  ;}catch(e){Logger.log("Error 4q0nf: "+e.message)}
                //  try{out["address"]["zip"   ] = scraped["address"]["postcode"     ]                                 ;}catch(e){Logger.log("Error 9Z4i1: "+e.message)}
                //  try{out["address"]["county"] = scraped["address"]["county"		 ]                                 ;}catch(e){Logger.log("Error gZ8HU: "+e.message)}
                //  try{out["address"]["csz"   ] = out.address.city + ", " + out.address.state + " " + out.address.zip ;}catch(e){Logger.log("Error aY5lv: "+e.message)}
                //  try{out["address"]["csz"   ] = scraped["address"]["csz"		     ]                                 ;}catch(e){Logger.log("Error oFU3c: "+e.message)}
                //  try{out["address"]["full"  ] = out.address.sa   + ", " + out.address.csz                           ;}catch(e){Logger.log("Error wtQfb: "+e.message)}
                //  try{out["address"]["part"  ] = out.address.full.getSuffix(" ").trim()                              ;}catch(e){Logger.log("Error 5PD1J: "+e.message)}
                //  try{out["address"]["number"] = out.address.full.getPrefix(" ").trim()                              ;}catch(e){Logger.log("Error AL2mF: "+e.message)}
                //  try{out["address"]["number"] = scraped["address"]["house_number" ]                                 ;}catch(e){Logger.log("Error KkxnT: "+e.message)}
                    break;
	    	default                              : return false}
			break;
		case "ZipRealty"                         :
                //  try{out["apn"    ]			 = scraped["apn"          ]                                            ;}catch(e){Logger.log("Error 5t4lO: "+e.message)}                              // Deprecated 12/31/2012 
                    try{out["ask"    ] 			 = scraped["price"        ]                                            ;}catch(e){Logger.log("Error 9epW2: "+e.message)} // scraped["PropertyPrice"]; // Deprecated 12/31/2012 
                    try{out["address"]["sa"    ] = scraped["street"       ]                                            ;}catch(e){Logger.log("Error CNgLy: "+e.message)} // scraped["address"      ]; // Deprecated 12/31/2012 
                //  try{out["address"]["city"  ] = scraped["city"         ]                                            ;}catch(e){Logger.log("Error p1JZ8: "+e.message)}
                //  try{out["address"]["state" ] = scraped["state"        ]                                            ;}catch(e){Logger.log("Error HtxRG: "+e.message)}
                //  try{out["address"]["zip"   ] = scraped["zip"		  ]                                            ;}catch(e){Logger.log("Error 9tZLH: "+e.message)}
                //  try{out["address"]["county"] = scraped["county"		  ]                                            ;}catch(e){Logger.log("Error UBJQJ: "+e.message)}
                //  try{out["address"]["csz"   ] = out.address.city + ", " + out.address.state + " " + out.address.zip ;}catch(e){Logger.log("Error D8qdt: "+e.message)}
                    try{out["address"]["csz"   ] = scraped["csz"		  ] 										   ;}catch(e){Logger.log("Error 8Hglh: "+e.message)}
                    try{out["address"]["full"  ] = out.address.sa   + ", " + out.address.csz                           ;}catch(e){Logger.log("Error UWnij: "+e.message)}
                    try{out["address"]["part"  ] = out.address.full.getSuffix(" ").trim()                              ;}catch(e){Logger.log("Error cv8JL: "+e.message)}
                    try{out["address"]["number"] = out.address.full.getPrefix(" ").trim()                              ;}catch(e){Logger.log("Error TSDY8: "+e.message)}
                    break;
		case "Realtor"                           :
                //  try{out["apn"    ]			 = scraped["apn"          ]                                            ;}catch(e){Logger.log("Error ufYZe: "+e.message)}                              // Deprecated 12/31/2012 
                    try{out["ask"    ] 			 = scraped["listingPrice" ]                                            ;}catch(e){Logger.log("Error bm0lD: "+e.message)} // scraped["PropertyPrice"]; // Deprecated 12/31/2012 
                    try{out["address"]["sa"    ] = scraped["sa"           ]                                            ;}catch(e){Logger.log("Error hE4wv: "+e.message)} // scraped["address"      ]; // Deprecated 12/31/2012 
                    try{out["address"]["city"  ] = scraped["city"         ]                                            ;}catch(e){Logger.log("Error tH7c5: "+e.message)}
                    try{out["address"]["state" ] = scraped["state"        ]                                            ;}catch(e){Logger.log("Error mL7cn: "+e.message)}
                    try{out["address"]["zip"   ] = scraped["zip"		  ]                                            ;}catch(e){Logger.log("Error gtKvf: "+e.message)}
                //  try{out["address"]["county"] = scraped["county"		  ]                                            ;}catch(e){Logger.log("Error bYv62: "+e.message)}
                    try{out["address"]["csz"   ] = out.address.city + ", " + out.address.state + " " + out.address.zip ;}catch(e){Logger.log("Error BPRho: "+e.message)}
                    try{out["address"]["full"  ] = out.address.sa   + ", " + out.address.csz                           ;}catch(e){Logger.log("Error 1q63w: "+e.message)}
                    try{out["address"]["part"  ] = out.address.full.getSuffix(" ").trim()                              ;}catch(e){Logger.log("Error Vg9iH: "+e.message)}
                    try{out["address"]["number"] = out.address.full.getPrefix(" ").trim()                              ;}catch(e){Logger.log("Error 6VC3o: "+e.message)}
                    break;
    //  case "RealtyTrac"                        :
		case "ChuckWillman"                      : // Appears to have downloaded spreadsheet from RealtyTrac
                    try{out["apn"    ]			 = scraped["Apn"          ]                                            ;}catch(e){Logger.log("Error vIEip: "+e.message)}                              // Deprecated 12/31/2012 
                    try{out["ask"    ] 			 = scraped["OpenBid"      ] + scraped["TaxOwed"]                       ;}catch(e){Logger.log("Error 3nCgm: "+e.message)} // scraped["PropertyPrice"]; // Deprecated 12/31/2012 
                    try{out["address"]["sa"    ] = scraped["Address"      ]                                            ;}catch(e){Logger.log("Error xYcIA: "+e.message)} // scraped["address"      ]; // Deprecated 12/31/2012 
                    try{out["address"]["city"  ] = scraped["City"         ]                                            ;}catch(e){Logger.log("Error ljMPj: "+e.message)}
                    try{out["address"]["state" ] = /*scraped["State"      ]*/ "AZ"                                     ;}catch(e){Logger.log("Error xgie8: "+e.message)}
                    try{out["address"]["zip"   ] = scraped["Zip"		  ]                                            ;}catch(e){Logger.log("Error Tu4ed: "+e.message)}
                //  try{out["address"]["county"] = scraped["County"		  ]                                            ;}catch(e){Logger.log("Error YVY0j: "+e.message)}
                    try{out["address"]["csz"   ] = out.address.city + ", " + out.address.state + " " + out.address.zip ;}catch(e){Logger.log("Error nQffA: "+e.message)}
                    try{out["address"]["full"  ] = out.address.sa   + ", " + out.address.csz                           ;}catch(e){Logger.log("Error KGOk8: "+e.message)}
                    try{out["address"]["part"  ] = out.address.full.getSuffix(" ").trim()                              ;}catch(e){Logger.log("Error iaMVb: "+e.message)}
                    try{out["address"]["number"] = out.address.full.getPrefix(" ").trim()                              ;}catch(e){Logger.log("Error 1Xray: "+e.message)}
                    break;
        default:break;}try{if(!out.address.csz){var arr=out.address.csz.split(" ");out.address.zip=arr[arr.length-1]}}catch(e){Logger.log("Error DgSqy: "+e.message)}return out;}
function avmData        (addy,ask,source){ // addy=addy||"12204 12th Ave NW, Seattle, WA 98177";//"29711 Byron Pl, Los Angeles, CA, 91384"*/"5115 Longfellow Street, Los Angeles, CA, 90042" // Calls 3 functions: 1: avmXyz()(AVM dataset sources), 2: avmStat()(dataset statistics), 3: avmComb() (combines property facts) // Array.prototype.avmData=function(bid,jso)
	/*	Parameters
	//		@return {object}  out    — {"address":{foo},"avm":{"dataset":{foo},"stat":{foo},"combo":{foo}}} // array of 3 arrays: stat, headers, datasets
	//		@param  {object}  addy   — address (see avmZillowAPI() for details)
	//		@param  {array }  ask    — "opening bid" or "list price" from seller
	//		@param  {string}  source — "Realtor" || ("RealtyTrac") "ChuckWillman" || "ZipRealty"
	*/
	/*	Archive
	6/10/2013
		Parameters
			@return {array}   returns array of 3 arrays: stat, headers, datasets
			@param  {array}   this  — address (see avmZillowAPI() for details)
			@param  {array}   bid   — two bids; "opening bid" or "list price" from seller; formatted as array to allow for mutliple "bids" in competitive bidding scenario
			@param  {boolean} jso   — true if return is complete arrary to construct JavaSript object result
	{// Parameters
	var out   =[],j,i=4;while(i--){out[i]=[]} // out[][]:[0][stats array = avmStat(bid)];[1][labels];[2][estimate arrays][];[3][combined property data] // Initialize two-dimensional array: out[][] // out[1]: Array of column labels for AVM models/functions; Note: Match label names with parameters in func prepA();
	var avm   =[];i=1; // Define an array of AVM (automatic valuation models) to call to generate an estimate of the ARV (After Repair Value) of the subject.                        
		avm[i]=function(x){return x.avmZillowAPI (     )};out[1][i++]="Zillow"       ; /* i= 1 — Z ZILLOW * / out[3][1]=avm[1](this); // Run immediately to fetch geocoded address
	//	avm[i]=function(x){return x.avmEppraisal (1,jso)};out[1][i++]="Eppraisal"    ; // i= 2 — E EPPRAISAL // jso=false will return hex encoded URL link
		avm[i]=function(x){return x.avmTrulia    (     )};out[1][i++]="Trulia"       ; // i= 2 — T TRULIA
		avm[i]=function(x){return x.avmRealtor   (     )};out[1][i++]="Realtor"      ; // i= 3 — R REALTOR
		avm[i]=function(x){return x.avmRealEstate(     )};out[1][i++]="RealEstate"   ; // i= 4 — A REAL ESTATE
		avm[i]=function(x){return x.avmHomeGain  (     )};out[1][i++]="HomeGain"     ; // i= 5 — H HOME GAIN
		avm[i]=function(x){return x.propertyShark(     )};out[1][i++]="PropertyShark"; // i= 5 — P PROPERTY SHARK
	}
	{// Code
	if(this.length==0){return out[1]}else{                         // Returns function labels only; used to set column headers in the main
		i=avm.length;while(i---2){out[3][i] = avm[i](this)}        // Set out[3] — AVM datasets
		                          out[0]    = out[3].avmStat(bid); // Set out[0] — statistics
									// i  0 1 Bed        2 Bath       3 Sqft       4 Lot        5 Year       6 Tax     7 Sold on 8 Sold for  // Combine AVM property data				  
									// j	 0 1 2 3 4 5  0 1 2 3 4 5  0 1 2 3 4 5  0 1 2 3 4 5	 0 1 2 3 45   0 1 2345  0 1 2345  0 1 2345
									//         Z E R A H	Z E R A H    Z E R A H    Z E R A H    Z E R AH     Z ERAH    Z ERAH    Z ERAH
									var y,X=[,[,22,6,4,3,],[,21,7,5,4,],[,20,8,6,5,],[,19,9,7,8,],[,18,,10,6,],[,17,,,,],[,23,,,,],[,24,,,,]]; // Define AVM locations of property data
									i=X.length;while(i---1){out[2][i]="";j=X[i].length;while(j---1){if((X[i][j])&&(out[3][j][X[i][j]])){
										y=out[3][j][X[i][j]];if(LibraryjsUtil.isNumber(y)||LibraryjsUtil.isNumber(y.replaceAll("/",""))){out[2][i]=y;}}}}} // Set values // All combo values must be either numbers or dates, not html strings, for example
	9/16/2014: Replaced by: if(typeof addy=="string"){addy=str2addy(addy)}
	   {addy=function(){//function testFunction(addy){
            if(typeof addy=="string"){var addyout={};//Logger.log("addy1: %s \n geoGoogleCsz(): %s",addy,JSON.stringify(LibraryjsUtil.geoGoogleCsz(addy)));return;
                if(  LibraryjsUtil.   geoGoogle     (addy)){addyout =  LibraryjsUtil.   geoGoogleCsz  (addy)/*.geoGoogle  * /.address} // Insert out.geoGoogle.address into AVM call
		      //if(/*LibraryjsUtil.* /geoMapQuestCsz(addy)){addyout =/*LibraryjsUtil.* /geoMapQuestCsz(addy)/*.geoMapQuest* /.address}
			    return addyout}else{return addy}
                        /*function test(){var ARR=[//"test error response",
                                                     "5115 Longfellow Street, Los Angeles, CA, 90042"
                                                  ,  "29711 Byron Pl, Los Angeles, CA, 91384"
                                                  ,  "12204 12th Ave NW, Seattle, WA 98177"
                                                  ],out=[],i=ARR.length;while(i--){out.push(testFunction(ARR[i]))}Logger.log(JSON.stringify(out))}* /
			}();//Logger.log("addy2: %s",JSON.stringify(addy));//return;}*/
	{// Code							   // Key Metrics update (1/7/2014) added HomeSnap — whose AVM est might be from SmartZip — more to follow... // Key Metrics: 4 URL calls = 6 AVM estimates (previously 5 and 7 but HomeGain stopped providing estimates) + 1 annual taxes (per Trulia®) // This is the most efficient yield of alternative combinations/sequencing
		if(typeof addy=="string"){addy=str2addy(addy)}
		var           out                    = {};
			          out.avm                = {};
			          out.avm.dataset	     = {};
	  	              out.avm.dataset.zillow = function(){try{return ask.avmZillowAPI}catch(e){Logger.log("Error HDdIH: "+e.message);return avmZillowAPI(addy)}}() //Logger.log("addy: %s \n out: %s",JSON.stringify(addy),JSON.stringify(out));return; // Zillow® API
		try { var r = out.avm.dataset.zillow.searchresults.response.results.result/*[0]*/.address;if(/*(!verifyAddy(addy)) && */verifyAddy({sa:r.street.Text,city:r.city.Text,state:r.state.Text,zip:r.zipcode.Text})){ // Backfill address if necessary and available // Note: Eliminated if(!verifyAddy(addy)) because, for example, geoMapQuestCsz returns state="penna" for addy="1124 8th Ave New Brighton, PA 15066"; need to substitute standardizd ZillowApi value for state in this case
			                                           out.address		     = {};
								                       out.address.sa        = r.street   .Text                                                    || addy.sa        ;
									                   out.address.city      = r.city     .Text                                                    || addy.city      ;
									                   out.address.state     = r.state    .Text                                                    || addy.state     ;
									                   out.address.zip       = r.zipcode  .Text                                                    || addy.zip       ;
									                   out.address.latitude  = r.latitude .Text                                                    || addy.latitude  ;
									                   out.address.longitude = r.longitude.Text                                                    || addy.longitude ;
													   out.address.csz       = out.address.city + ", " + out.address.state + " " + out.address.zip || addy.csz       ;
													   out.address.full      = out.address.sa   + ", " + out.address.csz                           || addy.full      ;
													   out.address.part      = out.address.full.getSuffix(" ").trim()                              || addy.part      ;
													   out.address.number    = out.address.full.getPrefix(" ").trim()                              || addy.number    ;
	                                             }else{out.address = addy } }catch(e){Logger.log("Error 9jacD: "+e.message)}
        try{out.avm.dataset.trulia     = avmTrulia    (out.address		  );}catch(e){Logger.log("Error duR4E: "+e.message)} // Trulia®    // Will not provide estimate on listed properties  // Yields annual taxes — replaces PropertyShark® because it also yields an AVM estimate, thus saving an http fetch / URL call
        try{out.avm.dataset.homeSnap   = avmHomeSnap  (out.address		  );}catch(e){Logger.log("Error zHu8A: "+e.message)} // HomeSnap®  // Scores appreciation and cash flow potential // Only works for UNLISTED properties (currently). Listings reorder the data fields and throw off the scrape.
    if(source=="Realtor"){
        try{out.avm.dataset.eppraisal  = avmEppraisal (out.address		  );}catch(e){Logger.log("Error RjqK2: "+e.message)} // Eppraisal® // Replaced by Realtor® (when Realtor® is not the source)
   }else{
		try{out.avm.dataset.realtor    = avmRealtor   (out.address		  );}catch(e){Logger.log("Error xNb9B: "+e.message)} // Realtor®   // Yields 3 estimates: 1. DataQuick®, 2. SmartZip®, 3. Eppraisal®
	    try{out.avm.dataset.dataQuick  = {estimate:out.avm.dataset.realtor.dataQuick_est,high:out.avm.dataset.realtor.dataQuick_high,low:out.avm.dataset.realtor.dataQuick_low}}catch(e){Logger.log("Error sWIjZ: "+e.message)} // DataQuick®
	    try{out.avm.dataset.smartZip   = {estimate:out.avm.dataset.realtor. smartZip_est,high:out.avm.dataset.realtor. smartZip_high,low:out.avm.dataset.realtor. smartZip_low}}catch(e){Logger.log("Error JoNxx: "+e.message)} // SmartZip®
        try{out.avm.dataset.eppraisal  = {estimate:out.avm.dataset.realtor.eppraisal_est,high:out.avm.dataset.realtor.eppraisal_high,low:out.avm.dataset.realtor.eppraisal_low}}catch(e){Logger.log("Error QPbdY: "+e.message)} // Eppraisal®	
      //try{out.avm.dataset.realEstate = avmRealEstate(out.address		  );}catch(e){Logger.log("Error rrZ91: "+e.message)} // RealEstate®
      //try{out.avm.dataset.homeGain   = avmHomeGain  (out.address		  );}catch(e){Logger.log("Error sFt6t: "+e.message)} // HomeGain®  // Deprecated 11/11/2013 because HomeGain stopped providing estimates
        try{out.avm.combi              = avmComb	  (out.avm.dataset    );}catch(e){Logger.log("Error biSpc: "+e.message)}
        try{out.avm.stat			   = avmStat      (out.avm.dataset,ask);}catch(e){Logger.log("Error vfypT: "+e.message)}
    /*Logger.log(JSON.stringify(out));*/return out}}}
function avmComb		(avm		    ){ // Combines property facts from multiple sources into a single source
	/*	Parameters
			@return {object} out — {"beds":"2","baths":"3","sqft":"1275","lot":"2500"} — final set of properties from combined sources
			@param  {object} avm — {...,"zillow":{..."beds":"2","baths":"3","sqft":"1275",...},"trulia":"{..."beds":"2","baths":"3","sqft":"1275",...},...}
	*/
	{// Code
	var out={};try{r=avm.zillow.searchresults.response.results.result/*[0]*/                                   } catch(e){Logger.log("Error csqEt: "+e.message)}
try{	 if(r              .address.latitude .Text){out.latitude      = r               .address.latitude .Text}
    else if(avm.trulia.dataSet     .latitude      ){out.latitude      = avm.trulia.dataSet      .latitude      }
 // else if(geoGoogle              .latitude      ){out.latitude      = geoGoogle               .latitude      }
 // else if(geoMapQuestCsz         .latitude      ){out.latitude      = geoMapQuestCsz          .latitude      }
                                                                                                               } catch(e){Logger.log("Error ParOv: "+e.message)}
try{	 if(r              .address.longitude.Text){out.longitude     = r               .address.longitude.Text}
    else if(avm.trulia.dataSet     .longitude     ){out.latitude      = avm.trulia.dataSet      .longitude     }
 // else if(geoGoogle              .longitude     ){out.longitude     = geoGoogle               .longitude     }
 // else if(geoMapQuestCsz         .longitude     ){out.longitude     = geoMapQuestCsz          .longitude     }
	                                                                                                           } catch(e){Logger.log("Error bahqg: "+e.message)}
try{	 if(r              .useCode          .Text){out.useCode       = r               .useCode          .Text} // e.g., "SingleFamily" // Not used in display table
    else if(avm.trulia     .useCode               ){out.useCode       = avm.trulia      .useCode               } // else if(avm.realtor.){} // else if(avm.realEstate.){}
                                                    out.useCode       = out             .useCode.replace("SingleFamily"   ,"SFR");
											        out.useCode       = out             .useCode.replace("MultiFamily2To4","M24");
                                                                                                               } catch(e){Logger.log("Error AZyBQ: "+e.message)}
try{	 if(r              .bedrooms         .Text){out.beds          = r               .bedrooms         .Text}
    else if(avm.trulia     .beds                  ){                                                           }
    else if(avm.realtor    .beds                  ){out.beds          = avm.realtor     .beds                  }
 // else if(avm.realEstate .beds                  ){out.beds          = avm.realEstate  .beds                  }
    else if(avm.homeSnap   .beds                  ){out.beds          = avm.realtor     .beds                  }}catch(e){Logger.log("Error bahqg: "+e.message)}
try{	 if(r              .bathrooms        .Text){out.baths         = r               .bathrooms        .Text}
    else if(avm.trulia     .baths                 ){out.baths         = avm.trulia      .baths                 }
    else if(avm.realtor    .baths                 ){out.baths         = avm.realtor     .baths                 }
 // else if(avm.realEstate .baths                 ){out.baths         = avm.realEstate  .baths                 }
    else if(avm.homeSnap   .baths                 ){out.baths         = avm.realtor     .baths                 }}catch(e){Logger.log("Error I3J2P: "+e.message)}
try{	 if(r              .finishedSqFt     .Text){out.sqft          = r               .finishedSqFt     .Text}
    else if(avm.trulia     .sqft                  ){out.sqft          = avm.trulia      .sqft                  }
    else if(avm.realtor    .sqft                  ){out.sqft          = avm.realtor     .sqft                  }
    else if(avm.realEstate .sqft                  ){out.sqft          = avm.realEstate  .sqft                  }}catch(e){Logger.log("Error yuu1t: "+e.message)}
try{	 if(r              .lotSizeSqFt      .Text){out.lot           = r.lotSizeSqFt                     .Text} // Not used in display table
 // else if(avm.trulia     .                      ){                                                           }
    else if(avm.realtor    .lot                   ){out.lot           = avm.realtor     .lot                   }
    else if(avm.realEstate .lot                   ){out.lot           = avm.realEstate  .lot                   }}catch(e){Logger.log("Error a2c0Q: "+e.message)}
try{	 if(r              .yearBuilt        .Text){out.built         = r.yearBuilt     .Text                  } // Not used in display table
 // else if(avm.trulia     .                      ){                                                           }
    else if(avm.realtor    .built                 ){out.built         = avm.realtor     .built                 }
    else if(avm.realEstate .built                 ){out.built         = avm.realEstate  .built                 }}catch(e){Logger.log("Error jhmY8: "+e.message)}
try{	 if(avm.trulia.taxAmt                     ){out.taxAmt        = avm.trulia      .taxAmt                }}catch(e){Logger.log("Error bDiVp: "+e.message)}
try{	 if(r              .taxAssessment    .Text){out.taxVal        = r               .taxAssessment    .Text}}catch(e){Logger.log("Error VpRKh: "+e.message)}
try{	 if(r              .lastSoldPrice    .Text){out.lastSoldPrice = r               .lastSoldPrice    .Text}}catch(e){Logger.log("Error kybNb: "+e.message)}
try{	 if(r              .lastSoldDate     .Text){out.lastSoldDate  = r               .lastSoldDate     .Text}}catch(e){Logger.log("Error LgH28: "+e.message)}  // e.g., "6/16/2013" // Not used in display table // Uses year only instead, requires conversion/processing
try{     if(                                        out.lastSoldDate                    .split("/")[2]){     // Add year extracted from date for economy of presentation // Deprecated 1/4/2012 // if(prop.source.sourceName=="Realtor"){prop.source.detailpageURL="http://www.realtor.com"+prop.source.detailpageURL} // Add prefix to complete URL for details page // prop.source.details=prop.source.detailpageURL.realtorScrapeDetail(); // Add MLS details page info // Includes taxes paid amount for inclusion in income approach calculation to follow
                                                    out.lastSoldYear  = out.lastSoldDate.split("/")[2]
                                              }else{out.lastSoldYear  = ""}                                     }catch(e){Logger.log("Error yC2un: "+e.message)}}
try{	 if(r.rentzestimate.amount           .Text){out.rentEstimate  = r.rentzestimate .amount           .Text}
    else if(avm.homeSnap   .rentEst               ){out.rentEstimate  = avm.homeSnap    .rentEst               }}catch(e){Logger.log("Error I3J2P: "+e.message)}
try{	 if(avm.homeSnap   .taxEst                ){out.taxExp        = avm.homeSnap    .taxEst                }}catch(e){Logger.log("Error LgH28: "+e.message)}  // e.g., "6/16/2013" // Not used in display table // Uses year only instead, requires conversion/processing
try{	 if(avm.realtor    .status                ){out.status        = avm.realtor     .status                }}catch(e){Logger.log("Error LgH28: "+e.message)}  // e.g., "6/16/2013" // Not used in display table // Uses year only instead, requires conversion/processing
    return out}
function avmStat        (avm     ,ask   ){ // Array.prototype.avmStat       =function(bid     ){ // Returns array of statistics of AVM data points; includes max bid, ARV = median AVM, margin & ratio
	/*	Archive
			6/15/2013
				//	Parameters
						@param  {array } bid — "opening bid" or "list price" from seller; formatted as array to allow for mutliple "bids" in competitive bidding scenario
				{// Code                                                     	    // this[][]: [array of AVM estimators; e.g., Zillow, etc.][AVM output array; 0 element ID $value est]
					var avmStats,avmSet=[],out=[],i=this.length;while(i---1){if(this[i][1]){avmSet.push(this[i][this[i][1]])}} // out: output array; avmSet: array of AVM estimates to pass to median fxn; // Initialize elements — construct avmSet, array of AVM estimates only // Add value to array iff (iff = "if and only if") value exists.
						out[2]=0;i=bid.length;while(i--){try{bid[i]=bid[i].replaceAll(",","");}catch(e){}if(bid[i]>out[2]){out[2]=bid[i]}} // BID    — Get max; consolidate multiple(two) bid values into one
						out[8]   = LibraryjsUtil.clone(avmSet).sort(function(a,b){return b-a});   // Return original bid set (before processing; i.e., removal of outliers)
						avmStats = avmSet.descriptiveStatistics();                  // Process statistical results + format for output/return // Calculate descriptive statistics of the set of AVM estimates
						out[0]   = avmStats.IsOk;                                   // ISOK   — Boolean; evaluates to TRUE if all inputs reduce to numeric and are included in stat calculations
						out[1]   = avmStats.Count;                                  // COUNT  — Returns the count of the population of inputs that reduced to a numeric to be included in the stat calculations
					//  out[2]   calculated outside loop for efficiency — see above // BID    — Calculated outside loop for efficiency — see above
						out[3]   = Math.round(avmStats.Median);                     // ARV    — MEDIAN of all estimates  //valCalc[2] = avm[1][colZillow];
						out[4]   = out[3] - out[2];                                 // MARGIN — calculate margin
						out[5]   = Math.ceil(100*(out[2]/out[3]));                  // RATIO  — calculate ratio // Convert to percent; round up
						out[6]   = avmStats.StdDevPop;                              // StdDevPop — Population stardard deviation
						out[7]   = Math.ceil(100*(out[6]/out[3]));                  // StdDevPct — Pop std dev as pct% of estimated ARV // Convert to percent; round up to register small values as “1” instead of “0”
						out[6]   = Math.ceil(out[6]);                               // Round StdDevPop last to minimize rounding error in StdDevPct; round up to register small values as “1” instead of “0”
				return  out}}
			Prior to 6/15/2013
				Note: This function replaced the following inline code
				avmSet = avmSet.splice(0,avmSet.length);                                                    // Reset
				for(i=1;i<avm.length;i++){if(avm[i][0]){avmSet.push(avm[i][avm[i][0]])}}                    // Add value to array iff (iff = "if and only if") value exists.
				valCalc[1] = 0;for(i=1;i<colBid.length;i++){if(valBid[i]>valCalc[1]){valCalc[1]=valBid[i]}} // BID     — Get max; consolidate multiple(two) bid values into one
				valCalc[2] = avmSet.median();                                                               // ARV     — calculate median value  //valCalc[2] = avm[1][colZillow];
				valCalc[3] = valCalc[2] - valCalc[1];                                                       // MARGIN  — calculate margin
				valCalc[4] = valCalc[1] / valCalc[2];                                                       // RATIO   — calculate ratio
				valCalc[4] = Math.ceil(100*valCalc[4]);                                                     // Convert to percent; round up
				// Parameters                                         			// array this — AVM estimates array, must extract integer estimates, arr[arr[1]]; array bid — bids dollar value;
					var MAX_SPREAD = 16;                                        // Empirically determined maximum StdDevPct above which we will delete primary outlier
					var MIN_COUNT  = 2;                                         // Minimum population size of AVM estimates
				do{ if( out[7]>MAX_SPREAD){avmSet=avmSet.deleteOutlier(out[3])} // Deprecated outlier deletion scheme // It did not produce the desired results // Delete primary outlier (value farthest from the median/“target”) when StdDevPct “spread” exceeds limit
				}while((out[7]>MAX_SPREAD) && (out[1]>MIN_COUNT))	            // Repeat if “spread” is too large and we have enough estimates
	*/
	/*	Parameters
		@return {object} out — {"isOk":true,"popCount":"foo","autoEst":"foo","margin":"foo","ratio":"foo","sdPop":"foo","sdPct":"foo","set":"foo"}
		@param  {object} avm — {...,"zillow":{..."estimate":"125000",...},"trulia":"{..."estimate":"128000",...},...}
		@param  {array } ask — "opening bid" or "list price" from seller; formatted as array to allow for mutliple "bids" in competitive bidding scenario
	*/
	/*  Sources
		    realtor    — 3 estimates (when not also the source)
						   DataQuick = average([low,high])
						   SmartZip  = average([low,high])
						   Eppraisal = average([low,high])
			homeSnap   — 1 estimate (possibly provided by SmartZip or DataQuick) // Only works for UNLISTED properties (currently). Listings reorder the data fields and throw off the scrape.
			realEstate — 1 estimate
			zillow     — 1 estimate
			trulia     — 1 estimate   = bestOf([list,sales])
			homeGain   — 0 estimate   = average([low,high]) — Formerly 1 estimate but decided to stop providing estimates. We will temporarily discontinue using them, monitor their status and possibly resume if they re-enter the space
	*/
	{// Code
		var out={},avmSet=[],x=Object.keys(avm),i=x.length;out.ob={};while(i--){try{if(avm[x[i]].estimate){avmSet.push(avm[x[i]].estimate);out.ob[x[i]]=avm[x[i]].estimate}}catch(e){Logger.log("Error lJoTH: "+e.message)}} // array of AVM estimates to pass to descriptiveStatistics()
			out.set      = LibraryjsUtil.clone(avmSet).sort(function(a,b){return b-a}); // Return original bid set (before processing; i.e., removal of outliers)
		var	avmStats     = LibraryjsUtil._descriptiveStatistics(avmSet); // Process statistical results + format for output/return // Calculate descriptive statistics of the set of AVM estimates
			out.isOk     = avmStats.IsOk;                          // ISOK   — Boolean; evaluates to TRUE if all inputs reduce to numeric and are included in stat calculations
			out.popCount = avmStats.Count;                         // COUNT  — Returns the count of the population of inputs that reduced to a numeric to be included in the stat calculations
			out.autoEst  = Math.round(avmStats.Median);            // ARV    — MEDIAN of all estimates  //valCalc[2] = avm[1][colZillow];
			out.margin   = out.autoEst - ask;                      // MARGIN — calculate margin
			out.ratio    = Math.ceil(100*(ask/out.autoEst));       // RATIO  — calculate ratio // Convert to percent; round up
			out.sdPop    = avmStats.StdDevPop;                     // StdDevPop — Population stardard deviation
			out.sdPct    = Math.ceil(100*(out.sdPop/out.autoEst)); // StdDevPct — Pop std dev as pct% of estimated ARV // Convert to percent; round up to register small values as “1” instead of “0”
			out.sdPop    = Math.ceil(out.sdPop);                   // Round StdDevPop last to minimize rounding error in StdDevPct; round up to register small values as “1” instead of “0”
	return 	out}}
function avmZillowAPI   (addy    ,tMax  ){ // Array.prototype.avmZillowAPI  =function(tMax    ){ // Fetch data from Zillow API. 
    // Need to add new version of avmZillowAPI() that first queries mapQuest() to find addy params for avmZillowAPI() call. This will reduce the number of double calls to separate the addy params.
	/* References
		// Corelogic....... http://express.realquest.com/search.aspx?location=5008%20corson%20ave%20s,%20seattle,%20wa
		// Chase/Corelogic. https://www.chase.com/online/Home-Lending/home-value-estimator.htm
		// BofA............ http://realestatecenter.bankofamerica.com/tools/marketvalue.aspx
		// Zillow less..... http://www.zillow.com/howto/api/GetSearchResults.htm
		// Zillow more..... http://www.zillow.com/howto/api/GetDeepSearchResults.htm
		// Sample API call. http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=<ZWSID>&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA
	*/
	/* Archive
		Notes: 
			// The method for acquiring most of the property data is to use the Yahoo Real Estate web site because Zillow requires a property ID
			// first in order to access the property data. Yahoo provides this property ID and a subset of property details also supplied to Yahoo from Zillow.
			// Therefore, this method of using Yahoo is the quickest, most efficient method to acquire the property data.
			// The above paragraph is no longer true as Yahoo and Zillow have implemented anti-scraping measures.
		6/10/2013 — converted output from array to object
			0. Initialize test arguments.
		// var sa      = "2114 Bigelow Ave";
		// var csz     = "Seattle, Wa";
		var out        = new Array();
			out[0]     = 24; // This is the special element that contains the element number of the AVM estimate; a key self-contained reference within the function. // Deprecated // Note: The [0] element “points” to the element in the returned array containing the AVM “single figure” estimate of value.
		Arguments
				tMax   = tMax||1; // Max unsuccessful attempts
			var sa     = this[0]; // "sa" .............. Example: 32445 Stonewood Way (f/k/a "Number_and_street")
			var csz    = this[1]; // "csz" ............. Example: LAKE ELSINORE CA 92530
			var num    = this[2]; // "Number" .......... Example: 32445
			var state  = this[3]; // "State" ........... Example: CA
			var zip    = this[4]; // "Zip" ............. Example: 92530
			var full   = this[5]; // "Full_address" .... Example: 32445 Stonewood Way, LAKE ELSINORE CA 92530
			var part   = this[6]; // "Partial_address" . Example: Stonewood Way, LAKE ELSINORE CA 92530
		6/10/2013 — parsing variables replaced by .xmlToJson(); now returns object instead of array
			var KEY = new Array();
			var QUE = new Array();
			var BEG = new Array();
			var END = new Array();
			KEY[0]  = "Zestimate is element number";
			KEY[1]  = "zpid";
			QUE[1]  = "<zpid";
			BEG[1]  = ">";
			END[1]  = "<";
			KEY[2]  = "homedetails";
			QUE[2]  = "<homedetails";
			BEG[2]  = ">";
			END[2]  = "<";
			KEY[3]  = "graphsanddata";
			QUE[3]  = "<graphsanddata";
			BEG[3]  = ">";
			END[3]  = "<";
			KEY[4]  = "mapthishome";
			QUE[4]  = "<mapthishome";
			BEG[4]  = ">";
			END[4]  = "<";
			KEY[5]  = "myestimator";
			QUE[5]  = "<myestimator";
			BEG[5]  = ">";
			END[5]  = "<";
			KEY[6]  = "comparables";
			QUE[6]  = "<comparables";
			BEG[6]  = ">";
			END[6]  = "<";
			KEY[7]  = "street";
			QUE[7]  = "<street";
			BEG[7]  = ">";
			END[7]  = "<";
			KEY[8]  = "zipcode";
			QUE[8]  = "<zipcode";
			BEG[8]  = ">";
			END[8]  = "<";
			KEY[9]  = "city";
			QUE[9]  = "<city";
			BEG[9]  = ">";
			END[9]  = "<";
			KEY[10] = "state";
			QUE[10] = "<state";
			BEG[10] = ">";
			END[10] = "<";
			KEY[11] = "latitude";
			QUE[11] = "<latitude";
			BEG[11] = ">";
			END[11] = "<";
			KEY[12] = "longitude";
			QUE[12] = "<longitude";
			BEG[12] = ">";
			END[12] = "<";
			KEY[13] = "FIPScounty";
			QUE[13] = "<FIPScounty";
			BEG[13] = ">";
			END[13] = "<";
			KEY[14] = "useCode";
			QUE[14] = "<useCode";
			BEG[14] = ">";
			END[14] = "<";
			KEY[15] = "taxAssessmentYear";
			QUE[15] = "<taxAssessmentYear";
			BEG[15] = ">";
			END[15] = "<";
			KEY[16] = "taxAssessment";
			QUE[16] = "<taxAssessment";
			BEG[16] = ">";
			END[16] = "<";
			KEY[17] = "yearBuilt";
			QUE[17] = "<yearBuilt";
			BEG[17] = ">";
			END[17] = "<";
			KEY[18] = "lotSizeSqFt";
			QUE[18] = "<lotSizeSqFt";
			BEG[18] = ">";
			END[18] = "<";
			KEY[19] = "finishedSqFt";
			QUE[19] = "<finishedSqFt";
			BEG[19] = ">";
			END[19] = "<";
			KEY[20] = "bathrooms";
			QUE[20] = "<bathrooms";
			BEG[20] = ">";
			END[20] = "<";
			KEY[21] = "bedrooms";
			QUE[21] = "<bedrooms";
			BEG[21] = ">";
			END[21] = "<";
			KEY[22] = "lastSoldDate";
			QUE[22] = "<lastSoldDate";
			BEG[22] = ">";
			END[22] = "<";
			KEY[23] = "lastSoldPrice";
			QUE[23] = "<lastSoldPrice";
			BEG[23] = ">";
			END[23] = "<";
			KEY[24] = "zestimate";
			QUE[24] = "<zestimate>";
			BEG[24] = ">";
			END[24] = "<";
			KEY[25] = "last-updated-zest";
			QUE[25] = "<last-updated";
			BEG[25] = ">";
			END[25] = "<";
			KEY[26] = "duration-zest";
			QUE[26] = "<valueChange";
			BEG[26] = "duration=\"";
			END[26] = "\"";
			KEY[27] = "valueChange-zest";
			QUE[27] = "\"";
			BEG[27] = ">";
			END[27] = "<";
			KEY[28] = "rangeLow-zest";
			QUE[28] = "<low";
			BEG[28] = ">";
			END[28] = "<";
			KEY[29] = "rangeHigh-zest";
			QUE[29] = "<high";
			BEG[29] = ">";
			END[29] = "<";
			KEY[30] = "percentile-zest";
			QUE[30] = "<percentile";
			BEG[30] = ">";
			END[30] = "<";
			KEY[31] = "rentzestimate";
			QUE[31] = "<rentzestimate>";
			BEG[31] = ">";
			END[31] = "<";
			KEY[32] = "last-updated-rent";
			QUE[32] = "<last-updated";
			BEG[32] = ">";
			END[32] = "<";
			KEY[33] = "duration-rent";
			QUE[33] = "<valueChange";
			BEG[33] = "duration=\"";
			END[33] = "\"";
			KEY[34] = "valueChange-rent";
			QUE[34] = "\"";
			BEG[34] = ">";
			END[34] = "<";
			KEY[35] = "rangeLow-rent";
			QUE[35] = "<low";
			BEG[35] = ">";
			END[35] = "<";
			KEY[36] = "rangeHigh-rent";
			QUE[36] = "<high";
			BEG[36] = ">";
			END[36] = "<";
			KEY[37] = "regionId";
			QUE[37] = "<region";
			BEG[37] = "id=\"";
			END[37] = "\"";
			KEY[38] = "regionType";
			QUE[38] = "type=";
			BEG[38] = "\"";
			END[38] = "\"";
			KEY[39] = "regionName";
			QUE[39] = "name=";
			BEG[39] = "\"";
			END[39] = "\"";
			KEY[40] = "overview";
			QUE[40] = "<overview";
			BEG[40] = ">";
			END[40] = "<";
			KEY[41] = "forSaleByOwner";
			QUE[41] = "<forSaleByOwner";
			BEG[41] = ">";
			END[41] = "<";
			KEY[42] = "forSale";
			QUE[42] = "<forSale";
			BEG[42] = ">";
			END[42] = "<";
		Prior to 6/10/2013, replaced following code block inline:
		{ // 4. Fetch URL (HTTP GET).
			var response     = UrlFetchApp.fetch(action); // Fetch the URL of the subject. // var responseCode = response.getResponseCode(); // Gets the response code to determine if the given id produces a valid record.
			var responseText = response.getContentText(); // Get response text; convert to string variable.
		}
		{ // 5. Scrape
			for(var i=1;i<BEG.length;i++){ // Loop over FIELDS.
				if((responseText.indexOf(QUE[i])>-1)&&(responseText.indexOf(BEG[i])>-1)&&(responseText.indexOf(END[i])>-1)){ // Condition on existence of marker/s and element/s (token/s).
					dataset[i]  = responseText.getSuffix(QUE[i]).getSuffix(BEG[i]).getPrefix(END[i]);                        // Scrape via queue plus two token markers
					responseText = responseText.getSuffix(dataset[i]); }}                                                                         // Truncate source for next scrape iteration
		}
		{ // 6. Return
			return dataset; // return [1, 999999];
		}*/
	/* Sample code
			SAMPLE CALLS / Test
			  http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1czg9fsh6vf_26nu3&address=2114 Bigelow Ave&citystatezip=Seattle, Wa
			  function test(){Logger.log(JSON.stringify(Xml.parse(UrlFetchApp.fetch("http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1czg9fsh6vf_26nu3&address=2114 Bigelow Ave&citystatezip=Seattle, Wa").getContentText(),true)))}
			SAMPLE RESPONSE — JSON | Visualize @http://chris.photobooks.com/json/ | Google search: json visualization chris
			   {"searchresults":{"request":{"citystatezip":{"Text":"Seattle, Wa"},"address":{"Text":"2114 Bigelow Ave"}},"schemalocation":"http://www.zillow.com/static/xsd/SearchResults.xsd http://www.zillowstatic.com/vstatic/6ec2563/static/xsd/SearchResults.xsd","response":{"results":{"result":{"localRealEstate":{"region":{"type":"neighborhood","zindexValue":{"Text":"653,000"},"id":"271856","name":"East Queen Anne","links":{"forSaleByOwner":{"Text":"http://www.zillow.com/east-queen-anne-seattle-wa/fsbo/"},"forSale":{"Text":"http://www.zillow.com/east-queen-anne-seattle-wa/"},"overview":{"Text":"http://www.zillow.com/local-info/WA-Seattle/East-Queen-Anne/r_271856/"}}}},"zpid":{"Text":"48749425"},"zestimate":{"percentile":{"Text":"0"},"amount":{"currency":"USD","Text":"1386729"},"oneWeekChange":{"deprecated":"true"},"valueChange":{"currency":"USD","Text":"35142","duration":"30"},"valuationRange":{"low":{"currency":"USD","Text":"1289658"},"high":{"currency":"USD","Text":"1525402"}},"last_updated":{"Text":"09/11/2014"}},"links":{"comparables":{"Text":"http://www.zillow.com/homes/comps/48749425_zpid/"},"homedetails":{"Text":"http://www.zillow.com/homedetails/2114-Bigelow-Ave-N-Seattle-WA-98109/48749425_zpid/"},"mapthishome":{"Text":"http://www.zillow.com/homes/48749425_zpid/"},"graphsanddata":{"Text":"http://www.zillow.com/homedetails/2114-Bigelow-Ave-N-Seattle-WA-98109/48749425_zpid/#charts-and-data"}},"address":{"street":{"Text":"2114 Bigelow Ave N"},"city":{"Text":"Seattle"},"longitude":{"Text":"-122.347938"},"latitude":{"Text":"47.637933"},"state":{"Text":"WA"},"zipcode":{"Text":"98109"}}}}},"message":{"text":{"Text":"Request successfully processed"},"code":{"Text":"0"}},"xsi":"urn:x-prefix:xsi"}}
			SAMPLE RESPONSE — XML
			<?xml version="1.0" encoding="utf-8"?><SearchResults:searchresults
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
			xsi:schemaLocation="http://www.zillow.com/static/xsd/SearchResults.xsd http://www.zillowstatic.com/vstatic/11346f0ed65354ce3e550eff2713981a/static/xsd/SearchResults.xsd" 
			xmlns:SearchResults="http://www.zillow.com/static/xsd/SearchResults.xsd">
			<request>
				<address>2114 Bigelow Ave</address>
				<citystatezip>Seattle, Wa</citystatezip>
			</request>
			<message>
				<text>Request successfully processed</text>
				<code>0</code>
			</message>
			<response>
				<results>
					<result>
						<zpid>48749425</zpid>
						<links>
							<homedetails>http://www.zillow.com/homedetails/2114-Bigelow-Ave-N-Seattle-WA-98109/48749425_zpid/</homedetails>
							<graphsanddata>http://www.zillow.com/homedetails/2114-Bigelow-Ave-N-Seattle-WA-98109/48749425_zpid/#charts-and-data</graphsanddata>
							<mapthishome>http://www.zillow.com/homes/48749425_zpid/</mapthishome>
							<myestimator>http://www.zillow.com/myestimator/Edit.htm?zprop=48749425</myestimator>
							<myzestimator deprecated="true">http://www.zillow.com/myestimator/Edit.htm zprop=48749425</myzestimator>
							<comparables>http://www.zillow.com/homes/comps/48749425_zpid/</comparables>
						</links>
						<address>
							<street>2114 Bigelow Ave N</street>
							<zipcode>98109</zipcode>
							<city>Seattle</city>
							<state>WA</state>
							<latitude>47.637933</latitude>
							<longitude>-122.347938</longitude>
						</address>
						<FIPScounty>53033</FIPScounty>
						<useCode>SingleFamily</useCode>
						<taxAssessmentYear>2010</taxAssessmentYear>
						<taxAssessment>872000.0</taxAssessment>
						<yearBuilt>1924</yearBuilt>
						<lotSizeSqFt>4680</lotSizeSqFt>
						<finishedSqFt>3470</finishedSqFt>
						<bathrooms>3.0</bathrooms>
						<bedrooms>4</bedrooms>
						<lastSoldDate>11/26/2008</lastSoldDate>
						<lastSoldPrice currency="USD">1025000</lastSoldPrice>
						<zestimate>
							<amount currency="USD">1003400</amount>
							<last-updated>01/04/2012</last-updated>
							<oneWeekChange deprecated="true"></oneWeekChange>
							<valueChange duration="30" currency="USD">-11100</valueChange>
							<valuationRange>
								<low currency="USD">802720</low>
								<high currency="USD">1184012</high>
							</valuationRange>
							<percentile>0</percentile>
						</zestimate>
						<rentzestimate>
							<amount currency="USD">3736</amount>
							<last-updated>01/06/2012</last-updated>
							<oneWeekChange deprecated="true"></oneWeekChange>
							<valueChange duration="30" currency="USD">-236</valueChange>
							<valuationRange>
								<low currency="USD">3213</low>
								<high currency="USD">5044</high>
							</valuationRange>
						</rentzestimate>
						<localRealEstate>
							<region id="271856" type="neighborhood" name="East Queen Anne">
								<links>
									<overview>http://www.zillow.com/local-info/WA-Seattle/East-Queen-Anne/r_271856/</overview>
									<forSaleByOwner>http://www.zillow.com/homes/fsbo/East-Queen-Anne-Seattle-WA/</forSaleByOwner>
									<forSale>http://www.zillow.com/homes/for_sale/East-Queen-Anne-Seattle-WA/</forSale>
								</links>
							</region>
						</localRealEstate>
					</result>
				</results>
			</response>
			</SearchResults:searchresults>
			<!-- H:118  T:187ms  S:916  R:Mon Jan 09 15:38:22 PST 2012 B:3.0.134687.20120106111024919-comp_rel_a -->
	*/
	/* Test variables
			addy       = {}                                           ; // 3224 E Desert Cove Avenue, Phoenix AZ 85028
			addy.sa    = "3224 E Desert Cove Avenue"                  ; // "sa" .............. Example: 32445 Stonewood Way (f/k/a "Number_and_street")
			addy.csz   =                            "Phoenix AZ 85028"; // "csz" ............. Example: LAKE ELSINORE CA 92530
			addy.num   = "3224"                                       ; // "Number" .......... Example: 32445
			addy.state =                                    "AZ"      ; // "State" ........... Example: CA
			addy.zip   =                                       "85028"; // "Zip" ............. Example: 92530
			addy.full  = "3224 E Desert Cove Avenue, Phoenix AZ 85028"; // "Full_address" .... Example: 32445 Stonewood Way, LAKE ELSINORE CA 92530
			addy.part  =      "E Desert Cove Avenue, Phoenix AZ 85028"; // "Partial_address" . Example: Stonewood Way, LAKE ELSINORE CA 92530
	*/
    var a,b,b1,c,c1,num,q,r,ob,re=/(^\d+ *- *\d+$)/gmi/*matches "1716-1718"*/,out=avmZillowAPI_fetchApi(addy);try{q=out.searchresults.response.results.result.length}catch(e){Logger.log("Error rr9W8: "+e.message);q=true}// /(^\d+ *- *\d+$)/gmi (Regex matches 7316-7318 — parsed from 7316-7318 S Dorchester Ave, Chicago IL)
	try{num=(typeof addy=="string")?addy.split(" ")[0]:addy.sa.split(" ")[0];b1=out.searchresults.response.results.result.address.street.Text.split(" ")[0];b=b1!=num;}catch(e){Logger.log("Error MCIls: "+e.message);b=true}if(b&&b1){
	try{c1=Boolean(b1.match(re))?b1.match(re):b1;b1=b1.toString();num=Boolean(num.match(re))?num.match(re):num;num=num.toString();c=LibraryjsUtil.addyMultiMatch(num,c1)||LibraryjsUtil.addyMultiMatch(c1,num)}catch(e){Logger.log("Error kkIZo: "+e.message);c=false}}
	try{if(parseInt(out.searchresults.message.code/*text*/.Text)||((q||b)&&!c)){a=addy.sa?(addy.sa+", "+addy.csz):(addy+function(){if(addy.sa==addy.csz){return ""}else{return (", "+addy.csz)}}());ob=LibraryjsUtil.geoGoogle(a); // Redo criteria include: 1. Result does not include a subject. 2. Result includes more than one subject. 3. Street number of subject does not match street number of input address (Due to imprecision of original addy parameter. i.e., addy.sa==addy.csz) 4. &&!c in the case where num="1717" (S Dorchester Ave, Chicago IL) and c="1716-1718" (S Dorchester Ave, Chicago IL) // Code the logic to use the ob=LibraryjsUtil.geoGoogle(a) method as a last resort only because it passes a string to the avmZillowAPI_fetchApi(addy) function instead of a parsed address object. Which in turn creates the funky and unreliable {sa:addy,csz:addy} object as parameter
 // if(out.searchresults.message["limit-warning"]=="true"){// Stop using this ZWSID, switch to new API key} // Limit 1,000/key/day // Reference: http://www.zillow.com/howto/api/GetSearchResults.htm
	if(typeof ob=="object"){out=avmZillowAPI_fetchApi({sa:(ob.number+" "+ob.street),csz:(ob.city+", "+ob.state+" "+ob.zip)})}else{}}}catch(e){Logger.log("Error ws3lx: "+e.message)} // Following comment has been addressed by code surrounding error CFE1h outside this function // Inside else, try to fetch using geoMaqQuest(); While doing so, employ use of geoGoogleCsz() and geoMapQuestCsz() consistently everywhere. This may include renaming geoMapQuest() to geoMapQuestFetch() and geoMapQuestCsz() to geoMapQuest() as the called function // This address (1124 8th Ave, New Brighton, PA 15066) returns an array (i.e., ...results.result[]). Presumably, because the two-word city, "New Brighton" presents a parsing problem when calling the zillowApi() with an unparsed address; therefore, the street name and city/state/zip fields are filled with the entire address string. Solution: We will try and test for a results array returned by zillowApi() and re-parse using one of the geocoders (Google or MapQuest).
    try{out.estimate=out/*.r.avm.dataset.zillow*/.searchresults.response.results.result/*[0]*/.zestimate.amount.Text}catch(e){Logger.log("Error lufFF: "+e.message)}return out} // Append URL, return // Deprecated 6/10/2013 // out[0]++;out.unshift(this.urlZillow()); // Inserts details link URL into first (zeroth) element of the output array (and slides all other elements down one)
function avmZillowAPI_fetchApi(addy){
		addy  = (typeof addy=="object")?{sa:addy.sa,csz:addy.zip}:{sa:addy,csz:addy}; //addy||"12204 12th Ave NW, Seattle, WA 98177"//"29711 Byron Pl, Los Angeles, CA, 91384"*/"5115 Longfellow Street, Los Angeles, CA, 90042" // This string is obso because: typeof(addy)=="object";typeof(addy)!="string";
	var tMax  = 1; // tMax || 1; // Max unsuccessful attempts
	var ZWSID = zillowAPIcredentials().zwsid
	  , STEM  = "http://www.zillow.com/webservice/GetDeepSearchResults.htm?rentzestimate=true&zws-id="
//	  , THIS  = [,"++","=+"," ",",",", "]
//	  , WITH  = [,"+" ,"=" ,"+","+","+" ]
	  ;
//			      1    2    3   4   5
	var act=STEM+ZWSID+"&address="+addy.sa+"&citystatezip="+addy.csz;//,i=THIS.length;while(i---1){act=act.replaceAll(THIS[i],WITH[i])}//;Logger.log("act: %s",act);return;//try{if(!addy.zip){var arr=addy.csz.split(" ");addy.zip=arr[arr.length-1]}}catch(e){Logger.log("Error 41K8t: "+e.message)};//Logger.log("addy: %s",JSON.stringify(addy));return;
	var t=0;do{try{r=/*LibraryjsUtil.xmlToJson()(bug inducing)*/Xml.parse(UrlFetchApp.fetch(act).getContentText(),true)/*.scrapeDataset(out[0],QUE,BEG,END)* /;Logger.log("r: %s",r);return;*/}catch(e){Logger.log("Error I56pe: "+e.message+": Error: avmZillowAPI: "+addy.sa+", "+addy.csz)}t++}while(/*!LibraryjsUtil.isNumber(out[out[0]])&&*/t<tMax) // scrape without forward to unique URL w/ID // Logger.log("Returned Zillow: t="+t+", est="+out[out[0]]);
	var r=JSON.parse(JSON.stringify(r));
    try{if(r.searchresults.response.results.result.length){r.searchresults.response.results.result=r.searchresults.response.results.result[0];Logger.log("Error 8slEi: ALERT! THIS FUNCTION RETURNED AN ARRAY OF PROPERTY MATCHES AND WAS REDUCED ARBITRARILY TO A SINGLE ONE. THIS COULD RESULT IN INCORRECT OUTPUT ABOUT THE SUBJECT!")}}catch(e){Logger.log("Error d8QmC: "+e.message)} // This problem occurs when, say, a property with a unit number such as a condo is the subject. The str2addy function might strip the unit number which causes this function to return an array as the r...results.result // Future improvements should include a means of matching the original string address unit number to one of the returned values in the array. // Fix by adding a new property named unit to the addy object returned by the str2addy() function
	r.link=act;return r} // Deletion (i.e., replacing with out=r;) is bug inducing // Logger.log("out: %s",JSON.stringify(out));return;
function avmHomeSnap (addy    ,tMax  ){ //addy=addy||{city:"Highland Lakes",sa:"27 Lakeshore Dr E",state:"NJ",zip:"07422",csz:"Highland Lakes, NJ 07422",full:"27 Lakeshore Dr E, Highland Lakes, NJ 07422",part:"Lakeshore Dr E, Highland Lakes, NJ 07422",number:"27"};
    var KEY = [ , "low"                 , "estimate"                , "high"                 , "foo"              , "estimate" , "foo"    , "beds" , "foo"       , "heating" , "foo"                , "pmtEst" , "foo"          , "bathsFull" , "foo"        , "basement" , "foo"             , "rentEst" , "foo"          , "bathsHalf" , "foo"       , "stories" , "foo"            , "taxEst" , "foo"     , "sqft" , "foo"               , "addressStories" , "foo"        , "homeScore" , "foo"        , "lot" , "foo"          , "fireplaces" , "foo"            , "investorScore" , "foo"              , "lastSaleDate" , "foo"               , "lastSalePrice" , "foo"          , "yearBuilt" ]
	,   QUE = [ , "valueEstimateLow\">" , "valueEstimateCurrent\">" , "valueEstimateHigh\">" , ">Value Estimate<" , "<"        , ">Beds<" , "<"    , ">Heating<" , "<"       , ">Payment Estimate<" , "<"      , ">Baths Full<" , "<"         , ">Basement<" , "<"        , ">Rent Estimate<" , "<"       , ">Baths Half<" , "<"         , ">Stories<" , "<"       , ">Tax Estimate<" , "<"      , ">Sq Ft<" , "<"    , ">Address Stories<" , "<"              , "HomeScore<" , "<"         , ">Lot Size<" , "<"   , ">Fireplaces<" , "<"          , "InvestorScore<" , "<"             , ">Last Sale Date<" , "<"            , ">Last Sale Price<" , "<"             , ">Year Built<" , "<"         ]
	,   BEG = [ , ">"                   , ">"                       , ">"                    , "/"                , ">"        , "/"      , ">"    , "/"         , ">"       , "/"                  , ">"      , "/"            , ">"         , "/"          , ">"        , "/"               , ">"       , "/"            , ">"         , "/"         , ">"       , "/"              , ">"      , "/"       , ">"    , "/"                 , ">"              , "/"          , ">"         , "/"          , ">"   , "/"            , ">"          , "/"              , ">"             , "/"                , ">"            , "/"                 , ">"             , "/"            , ">"         ]
	,   END = [ , "<"                   , "<"                       , "<"                    , ">"                , "<"        , ">"      , "<"    , ">"         , "<"       , ">"                  , "<"      , ">"            , "<"         , ">"          , "<"        , ">"               , "<"       , ">"            , "<"         , ">"         , "<"       , ">"              , "<"      , ">"       , "<"    , ">"                 , "<"              , ">"          , "<"         , ">"          , "<"   , ">"            , "<"          , ">"              , "<"             , ">"                , "<"            , ">"                 , "<"             , ">"            , "<"         ]
	,   DEL = [ "$" , "," ]
    ,   INS = [ ""  , ""  ]
    ,   act = "http://www.homesnap.com"+UrlFetchApp.fetch(("http://www.homesnap.com/search?q="+encodeURIComponent(addy.full)),{followRedirects:false/*,muteHttpExceptions:true*/}).getHeaders().Location//Problems occur when addy.sa contains abbreviated street addresses; so we need a two-step scrape to find correct address//"http://www.homesnap.com/"+addy.state+"/"+LibraryjsUtil._replaceAll(addy.city," ","-")+"/"+LibraryjsUtil._replaceAll(addy.sa," ","-") // Ex. "http://www.homesnap.com/WA/Seattle/1919-Bigelow-Avenue-N"
        if(act=="http://www.homesnap.comundefined"){act=avmHomeSnap_list2url(addy)}
    var data=UrlFetchApp.fetch(act/*,{muteHttpExceptions:true}*/).getContentText(),out=LibraryjsUtil._scrapeDataset(data,KEY,QUE,BEG,END,DEL,INS);out.link=act;
	try{out.baths=(1*function(){return(out.bathsFull*1==out.bathsFull)?out.bathsFull:0}() + 0.5*function(){return(out.bathsHalf*1==out.bathsHalf)?out.bathsHalf:0}())||""}catch(e){Logger.log("Error 0SON7: "+e.message);out.baths=""}
	/*Logger.log(JSON.stringify(out));*/return out} // function test(){addy={city:"Seattle",sa:"5008 Corson Ave S",state:"WA","zip":"98108","csz":"Seattle, WA 98108",full:"5008 Corson Ave S, Seattle, WA 98108"};Logger.log(JSON.stringify(avmHomeSnap(addy)))}
function avmHomeSnap_list2url(addy){//@return{string} — Url of matching subject from a list 
    var KEY = [ , "link" , "ad" ]
	  , QUE = [ , "href" , "id" ]
	  , BEG = [ , '"'    , ">"  ]
	  , END = [ , '"'    , "<"  ]
	  , DEL = [ , null   , null ]
      , INS = [ , null   , null ]
      , out=[],i,ar,adar,zip,num,STEM="http://www.homesnap.com"
      ;try{ar=UrlFetchApp.fetch((STEM+"/search?q="+encodeURIComponent(addy.full)),{followRedirects:true/*,muteHttpExceptions:true*/}).getContentText().split(' class="listView"')[1].split(' class="result"').slice(1)}catch(e){"Error U7ftR: "+e.message;return}
      ;i=ar.reverse().length;while(i--){out[i]=LibraryjsUtil._scrapeDataset(ar[i],KEY,QUE,BEG,END,DEL,INS);
	        adar=out[i]["ad"].split(" ");num=adar[0];zip=adar[adar.length-1]; // Interpret a matched address as a matched street number and a matched zip code. Considering the candidate made its way to this list in the first place, that might be sufficient?
            if(num==addy.number&&zip==addy.zip){return STEM+out[i]["link"]}}return} // function test(){Logger.log(avmHomeSnap_new({city:"Highland Lakes",sa:"27 Lakeshore Dr E",state:"NJ","zip":"07422","csz":"Highland Lakes, NJ 07422","full":"27 Lakeshore Dr E, Highland Lakes, NJ 07422","part":"Lakeshore Dr E, Highland Lakes, NJ 07422","number":"27"}))}
function avmEppraisal   (addy    ,tMax  ){ // Array.prototype.avmEppraisal  =function(tMax,jso){ // Unsuspended 1/10/2014 when Realtor.com is source because Eppraisal estimate not provided when Realtor.com is source — SUSPENDED 6/10/2013 — // Realtor.com currently supplies this data scrape so we have deleted this function from the process flow for now
	/* References
		http://www.eppraisal.com/Search/Property.mvc?a=10389+Brookway+Pl&z=92505                  <-...start here
		http://www.eppraisal.com/Home-Values-10389-brookway-pl-riverside-ca-92505-189228069.mvc   <—...forwards here, scrape codes & reformat GET
	*/
	/* Archive 
		var GET_SUFFIX   = "http://www.eppraisal.com/home-values-"
		  , GET_PREFIX   = ".mvc"
		  , INCL_SUFFX   = true;
		var t=0,tMax=tMax||1,data=UrlFetchApp.fetch(act).getContentText()/*.urlForwardTo(GET_SUFFIX,GET_PREFIX,INCL_SUFFX)* /;do{try{out=LibraryjsUtil._scrapeDataset(data,KEY,QUE,BEG,END,DEL,INS)}catch(e){Logger.log(e.message+": Error: avmEppraisal: "+addy.sa+", "+addy.csz)}t++}while(t<tMax) out.link=act; // Forward to unique URL w/ID, scrape & return // Logger.log("Returned Eppraisal: t="+t+", est="+out[out[0]]);
		Arguments
				tMax  = tMax||1; // Max unsuccessful attempts
			var sa    = this[0]; // "sa" .............. Example: 32445 Stonewood Way (f/k/a "Number_and_street")
			var csz   = this[1]; // "csz" ............. Example: LAKE ELSINORE CA 92530
			var num   = this[2]; // "Number" .......... Example: 32445
			var state = this[3]; // "State" ........... Example: CA
			var zip   = this[4]; // "Zip" ............. Example: 92530
			var full  = this[5]; // "Full_address" .... Example: 32445 Stonewood Way, LAKE ELSINORE CA 92530
			var part  = this[6]; // "Partial_address" . Example: Stonewood Way, LAKE ELSINORE CA 92530
		Parameters	
			// Note: The [0] element “points” to the element in the returned array containing the AVM “single figure” estimate of value.
			var out          = new Array();
			out[0]           = 1; // This is the special element that contains the element number of the AVM estimate; a key self-contained reference within the function.
	*/
	/* Test variables
			addy       = {}                                           ; // 3224 E Desert Cove Avenue, Phoenix AZ 85028
			addy.sa    = "3224 E Desert Cove Avenue"                  ; // "sa" .............. Example: 32445 Stonewood Way (f/k/a "Number_and_street")
			addy.csz   =                            "Phoenix AZ 85028"; // "csz" ............. Example: LAKE ELSINORE CA 92530
			addy.num   = "3224"                                       ; // "Number" .......... Example: 32445
			addy.state =                                    "AZ"      ; // "State" ........... Example: CA
			addy.zip   =                                       "85028"; // "Zip" ............. Example: 92530
			addy.full  = "3224 E Desert Cove Avenue, Phoenix AZ 85028"; // "Full_address" .... Example: 32445 Stonewood Way, LAKE ELSINORE CA 92530
			addy.part  =      "E Desert Cove Avenue, Phoenix AZ 85028"; // "Partial_address" . Example: Stonewood Way, LAKE ELSINORE CA 92530
	*/
	{ // 1. Parameters
		   				// 0 1    2    3   4   5
		var S            = "http://www.eppraisal.com"
		  , STEM         = S + "/Search/Property.mvc?a="
		  , THIS         = [,"++","=+"," ",",",", "]
		  , WITH         = [,"+" ,"=" ,"+","+","+" ]
		  ;				                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 //   0 1                     2         3          4                    5       6       7      8
		var KEY          = [ , "sa_1"          , "city"            , "state"         , "zip"        , "foo"      , "sa_2" , "foo"         , "apn" , "foo"     , "zoning" , "foo"   , "beds" , "foo"    , "baths" , "foo"   , "sqft" , "foo"    , "acres" , "foo"      , "lotAreaSf" , "foo"   , "pool" , "foo"        , "fireplace" , "foo"        , "heatType" , "foo"    , "garage" , "foo"            , "basementArea" , "foo"        , "roofType" , "foo"       , "airCond" , "foo"         , "taxVal" , "foo"             , "taxAmt" , "foo"     , "county" , "foo"       , "township" , "foo"              , "zipFull" , "foo"          , "subdivision" , "link_valEppraisal" , "link_valZillow" ] // = [,"estimate"           ,"est_low","est_high","foo"                ,"beds","baths","sqft","lot"  ]
		  , QUE          = [ , "streetAddress" , "addressLocality" , "addressRegion" , "postalCode" , "Address:" , "<"    , "APN/Parcel:" , "<"   , "zoning:" , "<"      , "Beds:" , "<"    , "Baths:" , "<"     , "Sqft:" , "<"    , "Acres:" , "<"     , "Lot Area" , "<"         , "Pool:" , "<"    , "Fireplace:" , "<"         , "Heat Type:" , "<"        , "Garage" , "<"      , "Basement Area:" , "<"            , "Roof Type:" , "<"        , "Air Cond:" , "<"       , "Assessment:" , "<"      , "Property Taxes:" , "<"      , "County:" , "<"      , "Township:" , "<"        , "Full PostalCode:" , "<"       , "Subdivision:" , "<"           , "#eppraisal_val"    , "#zillowval"     ] // = [,"Valuation Estimates","Low:"   ,"High:"   ,"Bed Bath Sqft Acres",";"   ,","    ,","   ,","    ]
		  , BEG 	     = [ , ">"             , ">"               , ">"             , ">"          , "<"        , ">"    , "<"           , ">"   , "<"       , ">"      , "<"     , ">"    , "<"      , ">"     , "<"     , ">"    , "<"      , ">"     , "<"        , ">"         , "<"     , ">"    , "<"          , ">"         , "<"          , ">"        , "<"      , ">"      , "<"              , ">"            , "<"          , ">"        , "<"         , ">"       , "<"           , ">"      , "<"               , ">"      , "<"       , ">"      , "<"         , ">"        , "<"                , ">"       , "<"            , ">"           , "(\""               , "(\""            ] // = [,"$"                  ,"$"      ,"$"       ,"<p "                ,">"   ," "    ," "   ," "    ]
		  , END          = [ , "<"             , "<"               , "<"             , "<"          , ">"        , "<"    , ">"           , "<"   , ">"       , "<"      , ">"     , "<"    , ">"      , "<"     , ">"     , "<"    , ">"      , "<"     , ">"        , "<"         , ">"     , "<"    , ">"          , "<"         , ">"          , "<"        , ">"      , "<"      , ">"              , "<"            , ">"          , "<"        , ">"         , "<"       , ">"           , "<"      , ">"               , "<"      , ">"       , "<"      , ">"         , "<"        , ">"                , "<"       , ">"            , "<"           , "\""                , "\""             ] // = [,"<"                  ,"<"      ,"<"       ,"style="             ,"Bed" ,"Bath" ,"Sq"  ,"Acres"]		var KEY          = [ , "sa_1"          , "city"            , "state"         , "zip"        , "foo"      , "sa_2" , "foo"         , "apn" , "foo"     , "zoning" , "foo"   , "beds" , "foo"    , "baths" , "foo"   , "sqft" , "foo"    , "acres" , "foo"      , "lotAreaSf" , "foo"   , "pool" , "foo"        , "fireplace" , "foo"        , "heatType" , "foo"    , "garage" , "foo"            , "basementArea" , "foo"        , "roofType" , "foo"       , "airCond" , "foo"         , "taxVal" , "foo"             , "taxAmt" , "foo"     , "county" , "foo"       , "township" , "foo"              , "zipFull" , "foo"          , "subdivision" , "link_valEppraisal" , "link_valZillow" ] // = [,"estimate"           ,"est_low","est_high","foo"                ,"beds","baths","sqft","lot"  ]
		  , KEY_E        = [ ,          "estimate" , "low"            , "high"            ]
		  , QUE_E        = [ ,          ">"        , "Low:"           , "High:"           ]
		  , BEG_E        = [ ,          "$"        , "$"              , "$"               ]
		  , END_E        = [ ,          "<"        , "<"              , "<"               ]
		  , KEY_Z        = [ , "link" , "estimate" , "low"            , "high"            ]
		  , QUE_Z        = [ , "href" , ">"        , "zillowLowValue" , "zillowHighValue" ]
		  , BEG_Z        = [ , "'"    , "$"        , "$"              , "$"               ]
		  , END_Z        = [ , "'"    , "<"        , "<"              , "<"               ]
		  , DEL=["$",","],INS=["",""];
	}
	{ // 2. URL, forward, scrape & return
		var data,data_E,data_Z,t=0,tMax=tMax||1,act=(STEM+addy.sa+"&z="+addy.zip).trim(),i=THIS.length;while(i---1){{act=act.replaceAll(THIS[i],WITH[i])}} // www.eppraisal.com/home-values/property_lookup_eppraisal?a=3224%20E%20Desert%20Cove%20Ave&z=85028&propid=42918012 // var act="http://www.eppraisal.com/Search/Property.mvc?a=10389+Brookway+Pl&z=92505"; // http://www.eppraisal.com/Search/Property.mvc?a=2930+Via+Toscana+St+%23101&z=92879 // Unit# 101 is represented by the string: +%23101
		    data   = UrlFetchApp.fetch(act                    ).getContentText();do{try{out                =LibraryjsUtil._scrapeDataset(data  ,KEY  ,QUE  ,BEG  ,END  ,DEL,INS);out.link=act                             ;}catch(e){Logger.log(e.message+": Error: avmEppraisal: "+addy.sa+", "+addy.csz)}t++}while(t<tMax)out.value={}; // Forward to unique URL w/ID, scrape & return // Logger.log("Returned Eppraisal: t="+t+", est="+out[out[0]]);
		try{data_E = UrlFetchApp.fetch(S+out.link_valEppraisal).getContentText();       out.value.eppraisal=LibraryjsUtil._scrapeDataset(data_E,KEY_E,QUE_E,BEG_E,END_E,DEL,INS);out.estimate=out.value.eppraisal.estimate;}catch(e){Logger.log("Error 9KUv8: "+e.message)}
		try{data_Z = UrlFetchApp.fetch(S+out.link_valZillow   ).getContentText();       out.value.zillow   =LibraryjsUtil._scrapeDataset(data_Z,KEY_Z,QUE_Z,BEG_Z,END_Z,DEL,INS)                                           }catch(e){Logger.log("Error cKZQD: "+e.message)}
		/*Logger.log(JSON.stringify(out));*/return out}}
function avmTrulia      (addy    ,tMax  ){ // Will not provide estimate on listed properties // Array.prototype.avmTrulia     =function(tMax    ){ // Won't currently scrape the redirect. Try using session variables/cookies. (solved. http call automatically follows redirects.)
 // http://www.trulia.com/_ajax/Maps/InfoWindowAjax/json/?t=a&bounds=0%2C-100%2C0%2C-0&mode=hover&tplname=small&primary=0&state=WA&w=&tpl=0&bc=false&pid=803900 // Found per Chrome > Developer Tools ( > Inspect Element ) > Network tab
	/* References
		// Google search: free home valuation tool
		// Result:        Trulia.com
		// http://www.trulia.com/validate.php?tst=h&display=estimate&search=3224+E+Desert+Cove+Ave%2C+85028
	*/
	/* Archive	
		6/11/2013 — Arrays
		Arguments
		    tMax  = tMax||1; // Max unsuccessful attempts
		var sa    = this[0]; // "sa" .............. Example: 32445 Stonewood Way (f/k/a "Number_and_street")
		var csz   = this[1]; // "csz" ............. Example: LAKE ELSINORE CA 92530
		var num   = this[2]; // "Number" .......... Example: 32445
		var state = this[3]; // "State" ........... Example: CA
		var zip   = this[4]; // "Zip" ............. Example: 92530
		var full  = this[5]; // "Full_address" .... Example: 32445 Stonewood Way, LAKE ELSINORE CA 92530
		var part  = this[6]; // "Partial_address" . Example: Stonewood Way, LAKE ELSINORE CA 92530
		var out   = [1]; // This is the special element that contains the element number of the AVM estimate; a key self-contained reference within the function.
		Note: The [0] element “points” to the element in the returned array containing the AVM “single figure” estimate of value.
	*/
	/* Test variables
			addy       = {}                                           ; // 3224 E Desert Cove Avenue, Phoenix AZ 85028
			addy.sa    = "3224 E Desert Cove Avenue"                  ; // "sa" .............. Example: 32445 Stonewood Way (f/k/a "Number_and_street")
			addy.csz   =                            "Phoenix AZ 85028"; // "csz" ............. Example: LAKE ELSINORE CA 92530
			addy.num   = "3224"                                       ; // "Number" .......... Example: 32445
			addy.state =                                    "AZ"      ; // "State" ........... Example: CA
			addy.zip   =                                       "85028"; // "Zip" ............. Example: 92530
			addy.full  = "3224 E Desert Cove Avenue, Phoenix AZ 85028"; // "Full_address" .... Example: 32445 Stonewood Way, LAKE ELSINORE CA 92530
			addy.part  =      "E Desert Cove Avenue, Phoenix AZ 85028"; // "Partial_address" . Example: Stonewood Way, LAKE ELSINORE CA 92530
	* /
            addy = {
                 zip    : "98584"                                 // "85027"
               , full   : "1522 Fairmount Ave, Shelton, WA 98584" // "613 W Mcrae Dr, Phoenix, AZ 85027"
               , sa	    : "1522 Fairmount Ave"                    // "613 W Mcrae Dr"
               , csz    : "Shelton, WA 98584"                     // "Phoenix, AZ 85027"
               , state  : "WA"                                    // "AZ"
               , number : "1522"                                  // "613"
               , part   : "Fairmount Ave, Shelton, WA 98584"      // "W Mcrae Dr, Phoenix, AZ 85027"
               , city   : "Shelton"                               // "Phoenix"
               },ask=127974.04;*/
	/* function test(){
	addy       = {}                                           ; // 3224 E Desert Cove Avenue, Phoenix AZ 85028
	addy.sa    = "3224 E Desert Cove Avenue"                  ; // "sa" .............. Example: 32445 Stonewood Way (f/k/a "Number_and_street")
	addy.csz   =                            "Phoenix AZ 85028"; // "csz" ............. Example: LAKE ELSINORE CA 92530
	addy.num   = "3224"                                       ; // "Number" .......... Example: 32445
	addy.state =                                    "AZ"      ; // "State" ........... Example: CA
	addy.zip   =                                       "85028"; // "Zip" ............. Example: 92530
	addy.full  = "3224 E Desert Cove Avenue, Phoenix AZ 85028"; // "Full_address" .... Example: 32445 Stonewood Way, LAKE ELSINORE CA 92530
	addy.part  =      "E Desert Cove Avenue, Phoenix AZ 85028"; // "Partial_address" . Example: Stonewood Way, LAKE ELSINORE CA 92530
    var id = avmTrulia(addy).dataSet.id;//Logger.log(id);
 // Logger.log/*print* /(JSON.stringify(avmTrulia(addy)));
}*/
	{ // 1. Parameters
			tMax  = tMax || 1; // Max unsuccessful attempts // var GET_SUFFIX="",GET_PREFIX="",INCL_SUFFX=false; // Not applicable; no forwarding
		var STEM  = "http://www.trulia.com/validate.php?tst=h&display=estimate&search=";
	             // 0 1    2    3    4   5   6    7    8
		var THIS  = [,"-/","--",", ",","," ","=-","-/","/-"]
		  , WITH  = [,"/" ,"-" ,"-" ,"-","-","=" ,"/" ,"-" ]
		/*, THISA = [,"," ,"$" ," " ,"<"                   ]
		  , WITHA = [,""  ,""  ,""  ,""                    ]             
		*/;      // 0 1                      2                    3                    4                 5                                6                            7
	/*	var KEY   = [,"baths"               ,"sqft"              ,"useCode"           ,"estimate"       ,"desc"                          ,"taxAmt1"                   ,"taxAmt2"        ]
Changes   , QUE   = [,"property_attribute\"","property_attribute","property_attribute","property_price" ,"Description provided by Trulia","property_taxes_info_module","class=\"bold\">"]
made      , BEG   = [,">"                   ,">"                 ,">"                 ,"$"              ,"</b>"                          ,"class=\"bold\">"           ,"$"              ]
prior     , END   = [," bath"               ," sqft"             ,"<"                 ,"<"              ,"</div>"                        ,"/"                         ,"/"              ]
to        , DEL   = [,null                  ,[","," "]           ,null                ,[",","$"," ","<"],null                            ,[",","$"," ","<"]           ,[",","$"," ","<"]]
11/14/2013, INS   = [,null                  ,["" ,"" ]           ,null                ,["" ,"" ,"" ,"" ],null                            ,["" ,"" ,"" ,"" ]           ,["" ,"" ,"" ,"" ]]
	*/	         // 0 1                      2                    3                    4                 5                                6                            7                          8                         9
        var KEY   = [,"beds"                ,"baths"             ,"sqft"              ,"lot"            ,"yrBuilt"                       ,"estimate"                  ,"dataSet"                 ,"locationData"           ,"comps"                   ]
		  , QUE   = [,"Beds:"               ,"Baths:"            ,"Sqft:"             ,"Lot size:"      ,"Year Built:"                   ,"typeEmphasize mvn\">"      ,"trulia.propertyData.set" ,"pdp_location_data"      ,"trulia.pdp.comps_markers"]
		  , BEG   = [,"_val\">"             ,"_val\">"           ,"_val\">"           ,"_val\">"        ,"_val\">"                       ,"$"                         ,"("                       ,"="                      ,"="                       ]
		  , END   = [,"<"                   ,"<"                 ,"<"                 ,"<"              ,"<"                             ,"<"                         ,");"                      ,";"                      ,";"                       ]
		  , DEL   = [,null                  ,null                ,[","," "]           ,null             ,null                            ,[",","$"," ","<"]           ,null                      ,null                     ,null                      ]
		  , INS   = [,null                  ,null                ,["" ,"" ]           ,null             ,null                            ,["" ,"" ,"" ,"" ]           ,null                      ,null                     ,null                      ]    
          ; //      0 1                                               2
		var KEYA  = [,"est_list"                                     ,"est_sales"                                          ]
		  , QUEA  = [,"average list price for similar homes for sale","average sales price for similar recently sold homes"]
		  , BEGA  = [,"$"                                            ,"$"                                                  ]
		  , ENDA  = [,"<"                                            ,"."                                                  ]
		  , DELA  = [,[",","$"," ","<"]                              ,[",","$"," ","<"]                                    ]
		  , INSA  = [,["" ,"" ,"" ,"" ]                              ,["" ,"" ,"" ,"" ]                                    ];
	}
	{ // 2. URL, scrape, parse & return	
         // Logger.log(UrlFetchApp.fetch("transform.php?dappName=Trulia_test&transformer=HTML&applyToUrl=http%3A%2F%2Fwww.trulia.com%2Fhomes%2FArizona%2FPhoenix%2Fsold%2F20453881-3224-E-Desert-Cove-Ave-Phoenix-AZ-85028").getContentText());
	     // Logger.log(UrlFetchApp.fetch("http://scrape4me.com/api?url=http%3A%2F%2Fwww.trulia.com%2Fhomes%2FArizona%2FPhoenix%2Fsold%2F20453881-3224-E-Desert-Cove-Ave-Phoenix-AZ-85028&elm=&ch=ch"                       ).getContentText());
            var out={},act=(STEM+addy.sa.replace(/ /gi,"+")+"%2C+"+addy.zip).trim(),t=0, // URL: "http://www.trulia.com/validate.php?tst=h&display=estimate&search=3224+E+Desert+Cove+Ave%2C+85028" forwards to "http://www.trulia.com/homes/Arizona/Phoenix/sold/20453881-3224-E-Desert-Cove-Ave-Phoenix-AZ-85028"
			    act="http://www.trulia.com"+UrlFetchApp.fetch(act,{followRedirects:false}).getHeaders().Location,data=UrlFetchApp.fetch(act/*.urlForwardTo(GET_SUFFIX,GET_PREFIX,INCL_SUFFX)*/).getContentText(); // Logger.log(JSON.stringify(UrlFetchApp.fetch("http://www.trulia.com/homes/Arizona/Phoenix/sold/20453881-3224-E-Desert-Cove-Ave-Phoenix-AZ-85028",{followRedirects:false}).getAllHeaders()) /*.getContentText()* /);
            do{try{         out=LibraryjsUtil._scrapeDataset(data,/*out[0]*/KEY,QUE,BEG,END,DEL,INS                    ) }catch(e){Logger.log("Error bH675: "+e.message+"... Property address: "+addy.sa+", "+addy.csz)}t++}while(/*!LibraryjsUtil.isNumber(out[out[0]])&&*/t<tMax) // scrape & return (no forward to unique URL w/ID) // Logger.log("Returned Trulia: t="+t+", est="+out[out[0]]);
               try{         out.dataSet         =  JSON.parse(                 out.dataSet                             ) }catch(e){Logger.log("Error fbWG6: "+e.message+"... Property address: "+addy.sa+", "+addy.csz)}
               try{      if(out.taxAmt1        === Number(out.taxAmt1       )){out.taxAmt=parseInt(out.taxAmt1         )}
			        else if(out.taxAmt2        === Number(out.taxAmt2       )){out.taxAmt=parseInt(out.taxAmt2         )}}catch(e){Logger.log("Error cmbK8: "+e.message+"... Property address: "+addy.sa+", "+addy.csz)}
			   try{      if(out.desc){out.desc=LibraryjsUtil._scrapeDataset(out.desc,KEYA,QUEA,BEGA,ENDA,DELA,INSA     )}}catch(e){Logger.log("Error WQ2eB: "+e.message+"... Property address: "+addy.sa+", "+addy.csz)}
               try{      if(out.desc.est_sales === Number(out.desc.est_sales)){out.estimate=parseInt(out.desc.est_sales)}
                    else if(out.desc.est_list  === Number(out.desc.est_list )){out.estimate=parseInt(out.desc.est_list )}}catch(e){Logger.log("Error pREtx: "+e.message+"... Property address: "+addy.sa+", "+addy.csz)}
               try{         out.detail          =  avmTrulia_detail           (out.dataSet.stateCode,out.dataSet.id)     }catch(e){Logger.log("Error vMLk9: "+e.message+"... Property address: "+addy.sa+", "+addy.csz)}
	           try{      if(out.estimate       !=  1 * out.estimate          ){out.estimate=false                       }}catch(e){Logger.log("Error tSOtD: "+e.message+"... Property address: "+addy.sa+", "+addy.csz)}	
	           try{         out.estimate        =      out.estimate ||         out.detail.fields.VAL.replace(/,/gi,"")   }catch(e){Logger.log("Error fbOR7: "+e.message+"... Property address: "+addy.sa+", "+addy.csz)}	
	     // This comment applies to following two lines: delete : Had to delete dataSet.dataPhotos and dataSet.photos because certain escaped and unescaped quotation marks (and other formatting issues) were causing error in the JSON notation at the LibraryjsUtil.null2str() operation. So we solved it by deleting the .photos and .dataPhotos since that object has only appeared on about 1% of the tested use cases so far. 
		       // Future development: should try a more robust solution for the null2str operation to add back the deleted properties if/when there is a use for them. e.g., out.comps seems a likely useful candidate.
			   delete out.dataSet.dataPhotos // Caused by "12420 SE 223rd Drive, Kent, WA 98031"
	       // ;delete out.dataSet.    photos // Caused by "3 Pochuck Dr, Vernon NJ" // Originally thought this property was causing the error, but after testing, determined it was actually out.comps that was causing the error.
	          ;delete out.comps              // Caused by "3 Pochuck Dr, Vernon NJ"
	          ;       out.link=act;/*Logger.log("Trulia: "+JSON.stringify(out));*/return out}} // Append URL, return // Deprecated 6/10/2013 // out[0]++;out.unshift(action); // Inserts details link URL into first (zeroth) element of the output array (and slides all other elements down one) 
function avmTrulia_detail(state,id){
 // var ACT="http://www.trulia.com/_ajax/Maps/InfoWindowAjax/json/?t=a&bounds=0%2C-100%2C0%2C-0&mode=hover&tplname=small&primary=0&state=WA&w=&tpl=0&bc=false&pid=803900"
 // var ACT="http://www.trulia.com/_ajax/Maps/InfoWindowAjax/json/?t=a&bounds=0%2C-100%2C0%2C-0&mode=hover&tplname=small&primary=0&w=&tpl=0&bc=false&state=AZ&pid=20453881"
    var ACT="http://www.trulia.com/_ajax/Maps/InfoWindowAjax/json/?t=a&bounds=0%2C-100%2C0%2C-0&mode=hover&tplname=small&primary=0&w=&tpl=0&bc=false&state="+state/*AZ*/+"&pid="+id/*20453881*/
      , r=UrlFetchApp.fetch(ACT,{followRedirects:false});return JSON.parse(r.getContentText())} // print/*Logger.log*/(r.getContentText());//Logger.log(r.getHeaders());
function avmRealtor     (addy    ,tMax  ){//function test(){var a={sa:"7317 S Dorchester Ave",city:"Chicago",state:"Il",zip:"60619"};Logger.log(JSON.stringify(avmRealtor(a)))}
	{ // 1. Parameters
		    tMax       = tMax || 1; // Max unsuccessful attempts
		var STEM       = // "http://www.realtor.com/realestateandhomes-search/" // "For Sale"      http://www.realtor.com/realestateandhomes-search/Costa-Mesa_CA/92627/1139-Aviemore-Terrace
		                                                                        // "Recently Sold" 
							"http://www.realtor.com/propertyrecord-search/"     // "Not For Sale"  http://www.realtor.com/propertyrecord-search/Shelton_WA/98584/1522-Fairmount-Ave
                                                                                //                 http://www.realtor.com/propertyrecord-search/Costa-Mesa_CA/92627/1147-Aviemore-Terrace
          , THIS       = [,"--","=-"," ",",",", "]
		  , WITH       = [,"-" ,"=" ,"-","-","-" ]                           // ">Address<" occurs elsewhere
		  ,	KEY 	   = [,"url"   ,"foo"      ,"sa"   ,"city" ,"state","zip"  ,"link_address","status","price"  ,"beds","baths","sqft",["foo"     ,"foo","smartZip_est","foo","smartZip_low","foo","smartZip_high"],["foo"      ,"foo","dataQuick_est","foo","dataQuick_low","foo","dataQuick_high"],["foo"      ,"foo","eppraisal_est","foo","eppraisal_low","foo","eppraisal_high"]]
		  ,	QUE        = [,"og:url","highlight","<span","<span","<span","<span",">Status<"    ,"<td"   ,"<td"    ,"<td" ,"<td"  ,"<td" ,["SmartZip","<l" ,"<span"       ,"<l" ,"<span"       ,"<l" ,"<span"        ],["DataQuick","<l" ,"<span"        ,"<l" ,"<span"        ,"<l" ,"<span"         ],["Eppraisal","<l" ,"<span"        ,"<l" ,"<span"        ,"<l" ,"<span"         ]]
		  ,	BEG        = [,"=\""   ,">"        ,">"    ,">"    ,">"    ,">"    ,"<td>"        ,">"     ,">"      ,">"   ,">"    ,">"   ,["<ul"     ,"i"  ,">"           ,"i"  ,">"           ,"i"  ,">"            ],["<ul"      ,"i"  ,">"            ,"i"  ,">"            ,"i"  ,">"             ],["<ul"      ,"i"  ,">"            ,"i"  ,">"            ,"i"  ,">"             ]]
		  , END        = [,"\""    ,">"        ,"<"    ,"<"    ,"<"    ,"<"    ,"</td>"       ,"<"     ,"<"      ,"<"   ,"<"    ,"<"   ,[">"       ,">"  ,"<"           ,">"  ,"<"           ,">"  ,"<"            ],[">"        ,">"  ,"<"            ,">"  ,"<"            ,">"  ,"<"             ],[">"        ,">"  ,"<"            ,">"  ,"<"            ,">"  ,"<"             ]]
		  , DEL        = [,null    ,null       ,null   ,[","]  ,null   ,null   ,null          ,null    ,["$",","],null  ,null   ,[","] ,[null      ,null ,["$",","]     ,null ,["$",","]     ,null ,["$",","]      ],[null       ,null ,["$",","]      ,null ,["$",","]      ,null ,["$",","]       ],[null       ,null ,["$",","]      ,null ,["$",","]      ,null ,["$",","]       ]]
		  , INS        = [,null    ,null       ,null   ,["" ]  ,null   ,null   ,null          ,null    ,["" ,"" ],null  ,null   ,["" ] ,[null      ,null ,["" ,"" ]     ,null ,["" ,"" ]     ,null ,["" ,"" ]      ],[null       ,null ,["" ,"" ]      ,null ,["" ,"" ]      ,null ,["" ,"" ]       ],[null       ,null ,["" ,"" ]      ,null ,["" ,"" ]      ,null ,["" ,"" ]       ]]
		  ;			  // 0,1        2           3       4       5       6       7              8        9         10             11     120         1     2              3     4              5     6                 130               1               2                 90               1               2              
	}
	{ // 2. URL, forward, scrape, parse & return
		var out={},act=(STEM+addy.city.replace(/ /g,"-")+"_"+addy.state+"/"+addy.zip+"/"+addy.sa.replace(/ /g,"-")).trim(),i=THIS.length;while(i---1){act=act.replaceAll(THIS[i],WITH[i])} // var act="http://www.realtor.com/realestateandhomes-search/_CA/92587/28916-Avenida-Gaviota";                                
	 // /*LibraryjsBackup.*/print2doc(UrlFetchApp.fetch(act,{options:{followredirects:true}}).getContentText(),"jsAvm","avmRealtor")}}
        var t=0;do{try{out=LibraryjsUtil._scrapeDataset(UrlFetchApp.fetch(act,{options:{followredirects:true}}/*.urlForwardTo(GET_SUFFIX,GET_PREFIX,INCL_SUFFX)*/).getContentText(),/*out[0]*/KEY,QUE,BEG,END,DEL,INS)}catch(e){Logger.log(/*e.message+*/": Error: avmRealtor: "+addy.sa+", "+addy.csz)}t++}while(/*!LibraryjsUtil.isNumber(out[out[0]])&&*/t<tMax) // Forward to unique URL w/ID, scrape & return // Logger.log("Returned Realtor: t="+t+", est="+out[out[0]]);
		if(!parseInt(out.smartZip_est )){out.smartZip_est =""}else{if(!parseInt(out.smartZip_low )){out.smartZip_low =1*out.smartZip_est -10000}if(!parseInt(out.smartZip_high )){out.smartZip_high =1*out.smartZip_est +10000}}
        if(!parseInt(out.dataQuick_est)){out.dataQuick_est=""}else{if(!parseInt(out.dataQuick_low)){out.dataQuick_low=1*out.dataQuick_est-10000}if(!parseInt(out.dataQuick_high)){out.dataQuick_high=1*out.dataQuick_est+10000}}
        if(!parseInt(out.eppraisal_est)){out.eppraisal_est=""}else{if(!parseInt(out.eppraisal_low)){out.eppraisal_low=1*out.eppraisal_est-10000}if(!parseInt(out.eppraisal_high)){out.eppraisal_high=1*out.eppraisal_est+10000}}
        /*for(x in out){i=THISA.length;while(i---1){if(out[x]){out[x]=out[x].replaceAll(THISA[i],WITHA[i])}}}*/out.link=out.url||act;/*Logger.log("Realtor.com: %s",JSON.stringify(out));*/return out}}
/*function avmRealEstate(addy    ,tMax  ){ // Array.prototype.avmRealEstate =function(tMax    ){
	/* References
		// Google search: free home valuation tool
		// Result:        RealEstate.com
		// http://www.realestate.com/WA/Seattle/20669487-5008-Corson-Ave-S-Seattle-WA-98108-property.aspx
		// http://www.realestate.com/homevalues/5008+corson+ave+s,+Seattle,+WA+98108/
		// http://www.realestate.com/homevalues/32445+Stonewood+Way,+92530/
		// http://www.realestate.com/homevalues/7816+w+foothill+dr,peoria,az,85383/ <-- Currently, use this format; as others above have been deprecated
	* /
	/* Archive
		    tMax  = tMax||1; // Max unsuccessful attempts
		var sa    = this[0]; // "sa" .............. Example: 32445 Stonewood Way (f/k/a "Number_and_street")
		var csz   = this[1]; // "csz" ............. Example: LAKE ELSINORE CA 92530
		var num   = this[2]; // "Number" .......... Example: 32445
		var state = this[3]; // "State" ........... Example: CA
		var zip   = this[4]; // "Zip" ............. Example: 92530
		var full  = this[5]; // "Full_address" .... Example: 32445 Stonewood Way, LAKE ELSINORE CA 92530
		var part  = this[6]; // "Partial_address" . Example: Stonewood Way, LAKE ELSINORE CA 92530
		// Note: The [0] element “points” to the element in the returned array containing the AVM “single figure” estimate of value.
		var out        = new Array();
		out[0]         = 1; // This is the special element that contains the element number of the AVM estimate; a key self-contained reference within the function.
	* /
	/* Test variables
			addy       = {}                                           ; // 3224 E Desert Cove Avenue, Phoenix AZ 85028
			addy.sa    = "32445 Stonewood Way"                        ; // "sa" .............. Example: 32445 Stonewood Way (f/k/a "Number_and_street")
			addy.csz   =                      "Lake Elsinore CA 92530"; // "csz" ............. Example: LAKE ELSINORE CA 92530
			addy.num   = "32445"                                      ; // "Number" .......... Example: 32445
			addy.state =                                    "CA"      ; // "State" ........... Example: CA
			addy.zip   =                                       "92530"; // "Zip" ............. Example: 92530
			addy.full  = "32445 Stonewood Way, Lake Elsinore CA 92530"; // "Full_address" .... Example: 32445 Stonewood Way, LAKE ELSINORE CA 92530
			addy.part  =       "Stonewood Way, Lake Elsinore CA 92530"; // "Partial_address" . Example: Stonewood Way, LAKE ELSINORE CA 92530
	* /
	{ // 1. Parameters
		    tMax = tMax || 1; // Max unsuccessful attempts
		var STEM = "http://www.realestate.com/homevalues/"; // var GET_SUFFIX = "";var GET_PREFIX = "";INCL_SUFFX = false; // Not applicable; no forwarding
		var THIS = [,",,","--"," ",", "]
		  , WITH = [,"," ,"-" ,"-","," ] // For WITH[3], use "-" instead of "+" because "+" gets deleted in write operation to database.
		  ; //     0 1                             2       3       4       5        6         7
		var KEY  = [,"estimate"                   ,"beds" ,"baths","sqft" ,"built" ,"stories","lot"  ]
		  , QUE  = [,"view-homevalues-homesummary","<span","<span","<span","Built" ,"<span"  ,"<span"]
		  , BEG  = [,"$"                          ,">"    ,">"    ,">"    ,"<span>",">"      ,">"    ]
		  , END  = [,"<"                          ,"<"    ,"<"    ,"<"    ,","     ,"<"      ,"<"    ]
		  , DEL  = [,["$",","]                    ,null   ,null   ,null   ,null    ,null     ,null   ]
		  , INS  = [,["" ,"" ]                    ,null   ,null   ,null   ,null    ,null     ,null   ];	
	}
	{ // 2. URL, (do not forward), scrape, parse & return
		var out={},act=(STEM+addy.full.getPrefix(addy.state)+","+addy.state+"/").trim(),i=THIS.length;while(i---1){act=act.replaceAll(THIS[i],WITH[i])} // http://www.realestate.com/homevalues/32445+Stonewood+Way,LAKE+ELSINORE,CA/
		var t=0;do{try{out=LibraryjsUtil._scrapeDataset(UrlFetchApp.fetch(act).getContentText(),/*out[0]* /KEY,QUE,BEG,END,DEL,INS)}catch(e){Logger.log(e.message+": Error: avmRealEstate: "+addy.sa+", "+addy.csz)}t++}while(/*!LibraryjsUtil.isNumber(out[out[0]])&&* /t<tMax) // scrape & return (no forward to unique URL w/ID) // Logger.log("Returned RealEstate: t="+t+", est="+out[out[0]]);
		/*for(x in out){i=THISA.length;while(i---1){if(out[x]){out[x]=out[x].replaceAll(THISA[i],WITHA[i])}}}* /out.link=act;return out}}*/
/*function avmHomeGain  (addy    ,tMax  ){ // Array.prototype.avmHomeGain   =function(tMax    ){ // Deprecated. 9/16/2014. Now, they forward you to an agent's web site when they promise to give you a free home value estimate. Bait and switch.
	/* References
		// Google search: free home valuation tool
		// Result:        HomeGain.com
		// http://www.homegain.com/homevalues/Seattle-WA/98109/2114-Bigelow-Ave-N
	* /
	/* Archive
		// Note: The [0] element “points” to the element in the returned array containing the AVM “single figure” estimate of value.
		var out   = [1]    ; // This is the special element that contains the element number of the AVM estimate; a key self-contained reference within the function.
		    tMax  = tMax||1; // Max unsuccessful attempts
		var sa    = this[0]; // "sa" .............. Example: 32445 Stonewood Way (f/k/a "Number_and_street")
		var csz   = this[1]; // "csz" ............. Example: LAKE ELSINORE CA 92530
		var num   = this[2]; // "Number" .......... Example: 32445
		var state = this[3]; // "State" ........... Example: CA
		var zip   = this[4]; // "Zip" ............. Example: 92530
		var full  = this[5]; // "Full_address" .... Example: 32445 Stonewood Way, LAKE ELSINORE CA 92530
		var part  = this[6]; // "Partial_address" . Example: Stonewood Way, LAKE ELSINORE CA 92530
		i=THISA.length;while(i---1){out.range=out.range.replaceAll(THISA[i],WITHA[i])} // Returns array: out = [1, false, "819503-962025"]
		var out = out.concat(out[2].split(DELIM));                                     // Returns array: out = [1, false, "819503-962025", "819503", "962025"]
		out[2]  = (Math.round((Number(out[3])+Number(out[4]))/2));}                    // Returns array: out = [1, false, "819503-962025", "819503", "962025", 890764] // Average the two numbers to determine AVM estimate
		out[3]=out[4];out[4]=out[5];return out}}                                       // Returns array: out = [action, 2, 890764] or out=[action, 2, false, "819503-962025", "819503", "962025", 890764]
	* /
	/* Test variables
			addy       = {}                                           ; // 3224 E Desert Cove Avenue, Phoenix AZ 85028
			addy.sa    = "3224 E Desert Cove Avenue"                  ; // "sa" .............. Example: 32445 Stonewood Way (f/k/a "Number_and_street")
			addy.csz   =                            "Phoenix AZ 85028"; // "csz" ............. Example: LAKE ELSINORE CA 92530
			addy.num   = "3224"                                       ; // "Number" .......... Example: 32445
			addy.state =                                    "AZ"      ; // "State" ........... Example: CA
			addy.zip   =                                       "85028"; // "Zip" ............. Example: 92530
			addy.full  = "3224 E Desert Cove Avenue, Phoenix AZ 85028"; // "Full_address" .... Example: 32445 Stonewood Way, LAKE ELSINORE CA 92530
			addy.part  =      "E Desert Cove Avenue, Phoenix AZ 85028"; // "Partial_address" . Example: Stonewood Way, LAKE ELSINORE CA 92530
	* /
	{ // 1. Parameters
			tMax  = tMax || 1; // Max unsuccessful attempts
		var STEM  = "http://www.homegain.com/homevalues/"; // var GET_SUFFIX = "",GET_PREFIX = "",INCL_SUFFX = false; // Not applicable; no forwarding
				 // 0 1    2    3    4   5   6    7    8
		var THIS  = [,"-/","--",", ",","," ","=-","-/","/-"]
		  , WITH  = [,"/" ,"-" ,"-" ,"-","-","=" ,"/" ,"-" ]
		  ;    //   0 1   2   3
		var THISA = [",","$"," "]
		  , WITHA = ["" ,"" ,"" ];
		var KEY   = [,"estimate"                                                        ,"range"              ]
		  , QUE   = [,"http://homegain.icanbuy.com//mortgage-calculator/home-values?ID=","Home Value Estimate"]
		  , BEG   = [,"&home_value="                                                    ,"$"                  ]
		  , END   = [,"&"                                                               ,"*"                  ]
		  , DEL   = [,["$",","," "]                                                     ,["$",","," "]        ]
		  , INS   = [,["" ,"" ,"" ]                                                     ,["" ,"" ,"" ]        ];
	}
	{ // 2. URL, scrape, parse & return
		var i,act=(STEM+addy.csz.getPrefix(addy.zip)+"/"+addy.zip+"/"+addy.sa).trim();i=THIS.length;while(i---1){act=act.replaceAll(THIS[i],WITH[i])} // var act="http://www.homegain.com/homevalues/Seattle-WA/98109/2114-Bigelow-Ave-N" // Input: array [4, "819,503 - $962,025"]; Output: array [4, 819503, 962025, 890764] where [3]=([1]+[2])/2
		var t=0;do{try{out=LibraryjsUtil._scrapeDataset(UrlFetchApp.fetch(act).getContentText(),/*out[0]* /KEY,QUE,BEG,END,DEL,INS)}catch(e){Logger.log(e.message+": Error: avmHomeGain: "+addy.sa+", "+addy.csz)}t++}while(/*!LibraryjsUtil.isNumber(out[out[0]])&&* /t<tMax) // scrape & return (no forward to unique URL w/ID) // Returns [3,"819503-962025"] // Logger.log("Returned HomeGain: t="+t+", est="+out[out[0]]);
		out.link=act;if(LibraryjsUtil.isNumber(parseInt(out.estimate))){out.estimate=parseInt(out.estimate);}else if(out.range){i=THISA.length;while(i--){out.range=out.range.replaceAll(THISA[i],WITHA[i])}var arr=out.range.split("-");out.high=arr[0];out.low=arr[1];out.estimate=Math.round((Number(out.high)+Number(out.low))/2);}return out;}} // Input: array [2, false, "819,503 - $962,025"];
*/
/*function avmCoreLogic (addy    ,tMax  ){ // WORK IN PROCESS. Need to figure out scrape. Uses encoded PID parameter on GET to deliver target result. However, PID is returned in a prior call to: POST http://express.realquest.com/services/ExpressServices.asmx/validateLocation {newLocation:"1919 Bigelow Ave N,Seattle,wa,98109"} that throws error when reproduced: "Request format is unrecognized for URL unexpectedly ending in '/validateLocation'."
 // Sample URLs: GET  http://express.realquest.com/search.aspx?location=5008%20corson%20ave%20s,%20seattle,%20wa
 //              GET  http://express.realquest.com/reports/PropertyDetail_HTML.aspx?format=HTML&PID=GUZTAMZTPQZDONBRGEYDANJWGV6DKMBQHB6EGT2SKNHU4ICBKZCSAU34PQ4TQMJQHA&lat=47.556797&lon=-122.318121&isParcelCentroid=false
 //     KEY >>   GET  http://express.realquest.com/reports/PropertyDetail_HTML.aspx?format=HTML&PID=GUZTAMZTPQZDONBRGEYDANJWGV6DKMBQHB6EGT2SKNHU4ICBKZCSAU34PQ4TQMJQHA // Found per Chrome > Developer Tools > Network > RQX.Report.js > Rquet Headers > Referer
 //              GET  http://express.realquest.com/services/propertydetailreport.ashx?format=HTML&PID=GUZTAMZTPQZDONBRGEYDANJWGV6DKMBQHB6EGT2SKNHU4ICBKZCSAU34PQ4TQMJQHA&lat=47.556797&lon=-122.318121&isParcelCentroid=false
 // data object  POST http://express.realquest.com/services/ExpressServices.asmx/validateLocation
 // addy=addy||{city:"seattle",sa:"1919 Bigelow Avenue N",state:"wa",full:"1919 Bigelow Avenue N, seattle, wa"}// Only works for UNLISTED properties (currently). Listings reorder the data fields and throw off the scrape.
 // var KEY = [ , "est_low"             , "est_mid"                 , "est_high"             , "foo"              , "estimate" , "foo"    , "beds" , "foo"       , "heating" , "foo"                , "pmtEst" , "foo"          , "bathsFull" , "foo"        , "basement" , "foo"             , "rentEst" , "foo"          , "bathsHalf" , "foo"       , "stories" , "foo"            , "taxEst" , "foo"     , "sqft" , "foo"               , "addressStories" , "foo"        , "homeScore" , "foo"        , "lot" , "foo"          , "fireplaces" , "foo"            , "investorScore" , "foo"              , "lastSaleDate" , "foo"               , "lastSalePrice" , "foo"          , "yearBuilt" ]
 //	,   QUE = [ , "valueEstimateLow\">" , "valueEstimateCurrent\">" , "valueEstimateHigh\">" , ">Value Estimate<" , "<"        , ">Beds<" , "<"    , ">Heating<" , "<"       , ">Payment Estimate<" , "<"      , ">Baths Full<" , "<"         , ">Basement<" , "<"        , ">Rent Estimate<" , "<"       , ">Baths Half<" , "<"         , ">Stories<" , "<"       , ">Tax Estimate<" , "<"      , ">Sq Ft<" , "<"    , ">Address Stories<" , "<"              , "HomeScore<" , "<"         , ">Lot Size<" , "<"   , ">Fireplaces<" , "<"          , "InvestorScore<" , "<"             , ">Last Sale Date<" , "<"            , ">Last Sale Price<" , "<"             , ">Year Built<" , "<"         ]
 //	,   BEG = [ , ">"                   , ">"                       , ">"                    , "/"                , ">"        , "/"      , ">"    , "/"         , ">"       , "/"                  , ">"      , "/"            , ">"         , "/"          , ">"        , "/"               , ">"       , "/"            , ">"         , "/"         , ">"       , "/"              , ">"      , "/"       , ">"    , "/"                 , ">"              , "/"          , ">"         , "/"          , ">"   , "/"            , ">"          , "/"              , ">"             , "/"                , ">"            , "/"                 , ">"             , "/"            , ">"         ]
 //	,   END = [ , "<"                   , "<"                       , "<"                    , ">"                , "<"        , ">"      , "<"    , ">"         , "<"       , ">"                  , "<"      , ">"            , "<"         , ">"          , "<"        , ">"               , "<"       , ">"            , "<"         , ">"         , "<"       , ">"              , "<"      , ">"       , "<"    , ">"                 , "<"              , ">"          , "<"         , ">"          , "<"   , ">"            , "<"          , ">"              , "<"             , ">"                , "<"            , ">"                 , "<"             , ">"            , "<"         ]
 //	,   DEL = [ "$" , "," ] , 
    var act = "http://express.realquest.com/reports/PropertyDetail_HTML.aspx?PID=GUZTAMZTPQYTMOBZGQYDAMBZGV6DCOJRHF6EESKHIVGE6VZAIFLEKICOPR6DSOBRGA4Q"//"http://express.realquest.com/reports/PropertyDetail_HTML.aspx?format=JSON&PID=GUZTAMZTPQYTMOBZGQYDAMBZGV6DCOJRHF6EESKHIVGE6VZAIFLEKICOPR6DSOBRGA4Q&lat=47.636269&lon=-122.348713&isParcelCentroid=false"//"http://express.realquest.com/services/ExpressServices.asmx/validateLocation"//"http://express.realquest.com/search.aspx?location="+encodeURIcomponent(addy.full) // Ex. "http://express.realquest.com/search.aspx?location=11462%20Cromwell%20Ct,Dallas,TX%20,75229"
 // ,   INS = [ ""  , ""  ] , 
    data=UrlFetchApp.fetch(act/*,{muteHttpExceptions:true}* /).getContentText();//,out=LibraryjsUtil._scrapeDataset(data,KEY,QUE,BEG,END,DEL,INS);out.link=act;
    Logger.log(JSON.stringify(/*out* /data));return /*out* /data}*/
function avmBofA(){} // Need to decode SecurityToken // https://docs.google.com/spreadsheets/d/1mKkW538JASIRbGxfkcj6wPuh8o5TfEqdVFj3_FE7gcc/edit#gid=0
function avmBofA_addyValid(str){var ACT="http://realestatecenter.bankofamerica.com/include/ajax/api.aspx",par={op:"ValidateAddress",subjAddress:str};return JSON.parse((UrlFetchApp.fetch(ACT,{method:"post",payload:par}).getContentText()))} //function test(){Logger.log(JSON.stringify(avmBofA_addyValid("5008 corson ave s, seattle, wa")))}
function avmBofA_homeFacts(){ // Use only for home facts and tax data; Do not use for home value estimates // Estimate not provided directly; suspect they calculate avg (median) price per SF of comps, then apply to subject to get estimate
    var ar=[],i=1/*4*/;while(i--){
    var ACT="http://xml.sitexdata.com/restapi/Service/ADDRESSSEARCH/55E68A07-FEFC-4C78-A16A-C10B937174CE_1/5008%20corson%20ave%20s%20%20seattle%20%20wa/128_1/_/Data?noCacheIE=4&callback=Result"+i
      , r=JSON.parse(UrlFetchApp.fetch(ACT).getContentText().slice(9,-3));//,s=r.PropertyData.ComparableSales.ComparableSale,psf=[],j=s.length;while(j--){psf.push(s[j]["PricePerSQFT"])}Logger.log("psf: %s",psf);//var t=LibraryjsUtil._descriptiveStatistics(psf);r.estimate=t.Median*r.PropertyData.Assessment.BuildingArea;Logger.log("Estimate: %s, Median: %s, StdDevPop: %s, StdDevEst: %s",r.estimate,t.Median,t.StdDevPop,t.StdDevEst);
    ar.push(r)}/*print(ar)*/return ar[0]} // function test(){/*Logger.log*/print(JSON.stringify(avmBofA_homeFacts()))}
function testCoreLogic_direct(){
    var ACT  = "http://express.realquest.com/services/ExpressServices.asmx"
      , head = /*{}*/{"Content-Type":"text/xml; charset=utf-8","SOAPAction":"http://express.realquest.com/validateLocation"}
//    ; head["Content-Type"] = "text/xml; charset=utf-8"
//    ; head["SOAPAction"  ] = "http://express.realquest.com/validateLocation"
    //; head["Host"        ] = "10.48.64.77" // Causes internal server error. Omitting works.
   ;var pay  = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><validateLocation xmlns="http://express.realquest.com"><newLocation>5008 corson ave s, seattle, wa</newLocation></validateLocation></soap:Body></soap:Envelope>'
      , r    = UrlFetchApp.fetch(ACT,{method:"post",headers:head,payload:pay});
    Logger.log(r);
 // Logger.log(r.getAllHeaders);
 // Logger.log(r.getHeaders());print(r.getContentText());
}
function testCoreLogic_proxy(){ // Chase and Fifth Third
    var ACT = "https://valuemap.corelogic.com/ValueMapService.asmx/GetPropertyInfoReport"
      , pay = { Address            : "5008  CORSON AVE S , SEATTLE WA 98108-2323"
              , currentValue       : 0
              , languageCode       : "en-US"
              , leadNumber         : 0
              , licenseCode        : "466da03e6fc94611bc70d907e4ac7089" // Chase
           // , licenseCode        : "692927fb056749afaabc555b37de9eee" // Fifth Third
              , livingArea         : 0
              , numBaths           : 0
              , numBeds            : 0
              , numTotalRooms      : 0
              , propertyType       : ""
              , renderPropListHTML : true
              , requestType        : "New"
              , yearBuilt          : 0
              }
      , r   = UrlFetchApp.fetch(ACT,{method:"post",payload:pay,muteHttpExceptions:true/*,followRedirects:false*/});
    /*print/*/Logger.log(r.getContentText())//;Logger.log(r.getHeaders());
}
function linkGoogleMaps (addy           ){return  "https://maps.google.com/maps?q="+addy.sa.replace(/ /g,"+")/*.replaceAll(" ","+")*/+",+"+addy.city.replace(/ /g,"+")/*.replaceAll(" ","+")*/+",+"+addy.state+"+"+addy.zip;} // Construct link to GoogleMaps // https://maps.google.com/maps?q=888+Rosecrans+St,+San+Diego,+CA+92106 // address obj // var street="888 Rosecrans St",city="San Diego",state="CA",zip="92106",out="";
//function linkYahoo    (addy           ){return ("http://realestate.yahoo.com/Homevalues/result.html?search=Search&sa="+addy.sa+"&csz="+addy.csz).replaceAll(" ","+")} // Deprecated. 9/6/2014. Yahoo no longer provides comprehensive property data. Instead they now only focus on listed property.
function linkZillow     (addy           ){var STEM="http://www.zillow.com/homes/",mid=(typeof addy=="object")?(addy.sa+",-"+addy.zip):addy;return (STEM+mid+"_rb/").replace(/ /g,"-")} // Example out: http://www.zillow.com/homes/1789-E-Oakland-St,85225_rb/
function linkZipRealty  (addy           ){return  "http://www.ziprealty.com/xhr/autocomplete_mls_city?query="+escape(addy.full)} // Example out: http://www.ziprealty.com/xhr/autocomplete_mls_city?query=6781%20Pilot%20Wy%2C%20San%20Diego%2C%20CA%2092114 // var address.full="6781 Pilot Wy, San Diego, CA 92114";
/*Array.prototype.urlYahoo      = function(){ // Deprecated. 9/6/2014. Yahoo no longer provides comprehensive property data. Instead they now only focus on listed property. // Construct search URL for Yahoo®  property search // Example: http://realestate.yahoo.com/Homevalues/result.html?sa=38124+Placer+Creek+St&csz=92562&search=Search
	var sa    = this[0]; // "sa" .............. Example: 32445 Stonewood Way (f/k/a "Number_and_street")
	var csz   = this[1]; // "csz" ............. Example: LAKE ELSINORE CA 92530
	var num   = this[2]; // "Number" .......... Example: 32445
	var state = this[3]; // "State" ........... Example: CA
	var zip   = this[4]; // "Zip" ............. Example: 92530
	var full  = this[5]; // "Full_address" .... Example: 32445 Stonewood Way, LAKE ELSINORE CA 92530
	var part  = this[6]; // "Partial_address" . Example: Stonewood Way, LAKE ELSINORE CA 92530
	return ("http://realestate.yahoo.com/Homevalues/result.html?sa=" + sa + "&csz=" + zip + "&search=Search").replaceAll(" ","+")} */
/*Array.prototype.urlZillow     = function(){ // Construct search URL for Zillow® property search // Example: http://www.zillow.com/homes/2056-154th-ave-se,-98007_rb/
	var sa    = this[0]; // "sa" .............. Example: 32445 Stonewood Way (f/k/a "Number_and_street")
	var csz   = this[1]; // "csz" ............. Example: LAKE ELSINORE CA 92530
	var num   = this[2]; // "Number" .......... Example: 32445
	var state = this[3]; // "State" ........... Example: CA
	var zip   = this[4]; // "Zip" ............. Example: 92530
	var full  = this[5]; // "Full_address" .... Example: 32445 Stonewood Way, LAKE ELSINORE CA 92530
	var part  = this[6]; // "Partial_address" . Example: Stonewood Way, LAKE ELSINORE CA 92530
	return ("http://www.zillow.com/homes/"+sa+", "+zip+"_rb/").replace(/ /g,"-")/*.replaceAll(" ","-")* /}*/		
Array.prototype.propertyShark = function(){ // Pull tax records to use in income approach // Didn't use: Realtor.com: Details URL not included; Zillow: Anti-scrape; Yahoo: Anti-scrape; Others: Data not reliable
    // Sample output: {"propertySharkUrl":"http://www.propertyshark.com/mason/Property/11153478","propertyTax":9433.75,"taxYear":2013,"salePrice":995000,"saleDate":"11/18/2008","parcelID":"168940-0490"}
    // POST http://www.propertyshark.com/mason/UI/homepage_search.html
	// search_type=address&search_token=2114+Bigelow+Ave+N&location=98109 // Post content to body using parameter string... // Do not use only parameters. // params={"search_type":"address","search_token":"","location":""}; // Otherwise, this only returns default record (i.e. a specific, fixed address, i.e. 4411 Phinney Ave N, King County, WA)
	// {"location":"98109","search_token":"2114 Bigelow Ave N","search_type":"address"}
	// {"contentType":"application/x-www-form-urlencoded"}
	// http://www.propertyshark.com/mason/Property/21153478
    var LAB=[,"parcelID"      ,"saleDate"      ,"salePrice"      ,"taxYear"      ,"propertyTax"      ]
      , QUE=[,"Parcel ID</th>","Sale date</th>","Sale price</th>","Tax year</th>","Property tax</th>"]
      , BEG=[,">"             ,">"             ,">"              ,">"            ,">"                ]
      , END=[,"<"             ,"<"             ,"<"              ,"<"            ,"<"                ],DEL=["$",","],INS=["",""];
    try{var propkey=UrlFetchApp.fetch("http://www.propertyshark.com/mason/UI/homepage_search.html",{method:"POST",payload:("search_type=address&search_token="+this[0]/*2114+Bigelow+Ave+N*/+"&location="+this[4]/*98109*/).replaceAll(" ","+"),contentType:"application/x-www-form-urlencoded"}).getContentText().scrape("propkey","=","&")[1],
        act="http://www.propertyshark.com/mason/Property/"+propkey,out={"propertySharkUrl":act},arr=LibraryjsUtil._scrapeDataset(UrlFetchApp.fetch(act).getContentText(),/*0,*/QUE,BEG,END,DEL,INS),i=LAB.length;while(i---1){out[LAB[i]]=arr[i]}}catch(e){Logger.log("Error : "+e.message);return {};}return out}
function verifyAddy(r){var ar=["sa","city","state","zip"],i=ar.length;try{while(i--){if(!r[ar[i]].length){return false}}}catch(e){Logger.log("Error xzXKE: "+e.message);return false}return true}
function str2addy(str){var q,r,out;
    try{         out=  LibraryjsUtil.  geoMapQuestCsz  (str) ; if( out.geoSource   ){ return out  }}catch(e){Logger.log("Error 9fLG4: geoMapQuest () did not return a match. "+e.message)} // geoSource=="geoMapQuest" // Logger.log(JSON.stringify(out));
    try{         out=  LibraryjsUtil.  geoGoogle       (str) ; if( out.geoSource   ){ return out  }}catch(e){Logger.log("Error 2cgh4: geoGoogle   () did not return a match. "+e.message)} // geoSource=="geoGoogle" 
	try{         out=/*LibraryjsAvm .*/avmZillowAPI    (str)                                       }catch(e){Logger.log("Error dqeJa: avmZillowAPI() did not return a match. "+e.message)}
    try{       r=out.searchresults.response.results.result/*[0]*/.address;q={sa:r.street.Text,city:r.city.Text,state:r.state.Text,zip:r.zipcode.Text}
	if(!parseInt(out.searchresults.message.code/*text*/.Text)/*=="Request successfully processed"*/&&verifyAddy(q)) // Reference: API codes and messages http://www.zillow.com/howto/api/GetUpdatedPropertyDetails.htm
		                                                {out.geoSource="avmZillowAPI";return out  }}catch(e){Logger.log("Error swKxN: "+e.message)}
	               Logger       .log                    (   "Geocoders failed"      );return false;
    // The purpose of this function is to document and provide guidance for future versions if/when available resource change. I.e., new geocoding tools enter the marketplace and, perhaps, some leave. 
	/* Test Function
	function test(){var out=[],ARR=[ "10813 Rutherford Ct, Jacksonville, FL 32257"
								   , "5162 S Wallace St, Seattle, WA 98178"
								   , "1447 Putnam Dr, Charleston, SC 29412"
								   , "55 Navarre St, Boston, MA 02131"
								   , "2050 Forest St, Denver, CO 80207"
								   ],i=ARR.length;while(i--){out.push({mapquest : LibraryjsUtil. geoMapQuest(ARR[i]) // This works. Use this over googleOb because the data model is simpler.
                        // (Deprecated 1/15/2015. Use geoGoogle()) // ,googleOb : LibraryjsUtil. geoGoogleOb(ARR[i]) // This works. Use this as a backup if mapquest changes/morphs/deprecates.
																   // ,google   : LibraryjsUtil. geoGoogle  (ARR[i]) // Returns string only.
																   // ,yahoo    : LibraryjsUtil._geoYahoo   (ARR[i]) // Do not use. Obsolete.
																	  })}Logger.log(JSON.stringify(out))}*/
}
function zillowAPIcredentials(){var ar=["X1-ZWz1czg9fsh6vf_26nu3" // 01 // Request new: https://www.zillow.com/webservice/Registration.htm https://www.zillow.com/user/Register.htm http://www.zillow.com/howto/api/APIOverview.htm // http://getairmail.com/ // http://www.wordgenerator.net/fake-word-generator.php
                                       ,"X1-ZWz1dxt5xafhmz_3qukz" // 02 // https://sites.google.com/site/invectrus/
                                       ,"X1-ZWz1dxws5bv40b_6bk45" // 03 // https://sites.google.com/site/bulkreoproject/
                                       ,"X1-ZWz1dxxjrrfvnv_6v82r" // 04 // http://thomaspbarger.wix.com/vallume
                                       ,"X1-ZWz1b2kdgd2i2z_7aoby" // 05 // http://thomaspbarger.wix.com/hexteria
                                       ,"X1-ZWz1b2e0ks04y3_1u0pu" // 06 // http://thomaspbarger.wix.com/chorally
                                       ,"X1-ZWz1dy6v70l7gr_3if65" // 07 // http://thomaspbarger.wix.com/camembert
                                       ,"X1-ZWz1dy7ynmuayz_4aijl" // 08 // http://thomaspbarger.wix.com/boxscape
                                       ,"X1-ZWz1dyendekzyj_91vx7" // 09 // http://thomaspbarger.wix.com/glomtom
                                    // ,"" // xx //
									   ],n=ar.length,x=Math.round(1000*n*Math.random())%n;return {zwsid:ar[x]}} // Limit: 1,000 calls per API key per day // function test(){var out=[],i=50;while(i--){out.push(zillowAPIcredentials())}Logger.log(out)}
function nhoodZillow_link (state,city,nhood){return ("http://www.zillow.com/"+nhood+"-"+city+"-"+state+"/home-values/").replace(/ /g,"-")} // Sample call: GET http://www.zillow.com/rainier-view-seattle-wa/home-values/ // function test(){var str=UrlFetchApp.fetch(nhoodZillow_link("WA","Seattle","Rainier View")).getContentText();Logger.log(str);print(str)}
function nhoodZillow_api  (state,city,nhood){ // (CO-)MAIN CALL for neighborhood data // References | API documentation: http://www.zillow.com/howto/api/GetDemographics.htm | view JSON: http://chris.photobooks.com/json/default.htm | minify JSON: http://www.httputility.net/json-minifier.aspx | view XML: http://xmlgrid.net/ http://codebeautify.org/xmlviewer/
    // Sample call: http://www.zillow.com/webservice/GetDemographics.htm?zws-id=<ZWSID>&state=WA&city=Seattle&neighborhood=Ballard
	// var nhood=avmZillowAPI().searchresults.response.results.result/*[0]*/.localRealEstate.region.name
	// Sample response XML (http://codebeautify.org/xmlviewer/): <demographics><request><state>WA</state><city>Seattle</city><neighborhood>Ballard</neighborhood></request><message><text>Request successfully processed</text><code>0</code></message><response><region><id>250017</id><state>Washington</state><city>Seattle</city><neighborhood>Ballard</neighborhood><latitude>47.668304</latitude><longitude>-122.384601</longitude></region><links><main>http://www.zillow.com/local-info/WA-Seattle/Ballard/r_250017/</main><affordability>http://www.zillow.com/local-info/WA-Seattle/Ballard-home-value/r_250017/</affordability><homesandrealestate>http://www.zillow.com/local-info/WA-Seattle/Ballard-homes/r_250017/</homesandrealestate><people>http://www.zillow.com/local-info/WA-Seattle/Ballard-people/r_250017/</people><forSale>http://www.zillow.com/ballard-seattle-wa/</forSale><forSaleByOwner>http://www.zillow.com/homes/fsbo/Ballard-Seattle-WA/</forSaleByOwner><foreclosures>http://www.zillow.com/ballard-seattle-wa/fore_lt/</foreclosures><recentlySold>http://www.zillow.com/homes/recently_sold/Ballard-Seattle-WA/</recentlySold></links><charts><chart><name>Median Condo Value</name></chart><chart><name>Median Home Value</name></chart><chart><name>Dollars Per Square Feet</name></chart><chart><name deprecated="true">Zillow Home Value Index Distribution</name></chart><chart><name>Home Type</name></chart><chart><name deprecated="true">Owners vs. Renters</name></chart><chart><name>Home Size in Square Feet</name></chart><chart><name>Year Built</name></chart></charts><market deprecated="true"></market><pages><page><name>Affordability</name><tables><table><name>Affordability Data</name><data><attribute><name>Zillow Home Value Index</name><values><neighborhood><value type="USD">330600</value></neighborhood><city><value type="USD">383000</value></city><nation><value type="USD">191200</value></nation></values></attribute><attribute><name>Median Single Family Home Value</name><values><neighborhood><value type="USD">389300</value></neighborhood><city><value type="USD">409600</value></city><nation><value type="USD">192800</value></nation></values></attribute><attribute><name>Median Condo Value</name><values><neighborhood><value type="USD">295200</value></neighborhood><city><value type="USD">305300</value></city><nation><value type="USD">181300</value></nation></values></attribute><attribute><name>Median 2-Bedroom Home Value</name><values><neighborhood><value type="USD">341100</value></neighborhood><city><value type="USD">342000</value></city><nation><value type="USD">149800</value></nation></values></attribute><attribute><name>Median 3-Bedroom Home Value</name><values><neighborhood><value type="USD">378700</value></neighborhood><city><value type="USD">409000</value></city><nation><value type="USD">174300</value></nation></values></attribute><attribute><name>Median 4-Bedroom Home Value</name><values><neighborhood><value type="USD">441500</value></neighborhood><city><value type="USD">479900</value></city><nation><value type="USD">263500</value></nation></values></attribute><attribute><name>Percent Homes Decreasing</name><values><neighborhood><value type="percent">0.859</value></neighborhood><city><value type="percent">0.825</value></city><nation><value type="percent">0.693</value></nation></values></attribute><attribute><name>Percent Listing Price Reduction</name><values><neighborhood><value type="percent">0.21</value></neighborhood><city><value type="percent">0.236</value></city><nation><value type="percent">0.247</value></nation></values></attribute><attribute><name>Median List Price Per Sq Ft</name><values><neighborhood><value type="USD">304</value></neighborhood><city><value type="USD">280</value></city><nation><value type="USD">115</value></nation></values></attribute><attribute><name>Median List Price</name><values><neighborhood><value type="USD">330000</value></neighborhood><city><value type="USD">449000</value></city><nation><value type="USD">215000</value></nation></values></attribute><attribute><name>Median Sale Price</name><values><neighborhood><value type="USD">333800</value></neighborhood><city><value type="USD">380600</value></city><nation><value type="USD">210600</value></nation></values></attribute><attribute><name>Homes For Sale</name><values><neighborhood><value>105</value></neighborhood><city><value>7492</value></city><nation><value>3512252</value></nation></values></attribute><attribute><name>Homes Recently Sold</name><values><neighborhood><value>13</value></neighborhood><city><value>750</value></city><nation><value>272365</value></nation></values></attribute><attribute><name>Property Tax</name><values><neighborhood><value type="USD">2735</value></neighborhood><city><value type="USD">3456</value></city><nation><value type="USD">2192</value></nation></values></attribute><attribute><name>Turnover (Sold Within Last Yr.)</name><values><neighborhood><value type="percent">0.091</value></neighborhood><city><value type="percent">0.039</value></city><nation><value type="percent">0.035</value></nation></values></attribute><attribute><name>Median Value Per Sq Ft</name><values><neighborhood><value type="USD">370</value></neighborhood><city><value type="USD">328</value></city><nation><value type="USD">118</value></nation></values></attribute><attribute><name>1-Yr. Change</name><values><neighborhood><value type="percent">-0.086</value></neighborhood><city><value type="percent">-0.102</value></city><nation><value type="percent">-0.076</value></nation></values></attribute><attribute><name>>Homes For Sale By Owner</name><values><neighborhood><value>5</value></neighborhood><city><value>205</value></city><nation><value>25194</value></nation></values></attribute><attribute><name>>New Construction</name><values><neighborhood><value>0</value></neighborhood><city><value>12</value></city><nation><value>102395</value></nation></values></attribute><attribute><name>>Foreclosures</name><values><neighborhood><value>1</value></neighborhood><city><value>404</value></city><nation><value>664546</value></nation></values></attribute></data></table></tables></page><page><name>Homes Real Estate</name><tables><table><name>Homes Real Estate Data</name><data><attribute><name>Owners</name><values><neighborhood><value type="percent">0.35028618</value></neighborhood><city><value type="percent">0.48412441</value></city><nation><value type="percent">0.66268764</value></nation></values></attribute><attribute><name>Renters</name><values><neighborhood><value type="percent">0.64971382</value></neighborhood><city><value type="percent">0.51587559</value></city><nation><value type="percent">0.33731236</value></nation></values></attribute><attribute><name>Median Home Size (Sq. Ft.)</name><values><neighborhood><value>1230</value></neighborhood><city><value>1460</value></city><nation><value>1548</value></nation></values></attribute><attribute><name>Avg. Year Built</name><values><neighborhood><value>1980</value></neighborhood><city><value>1948</value></city><nation><value>1974</value></nation></values></attribute><attribute><name>Single-Family Homes</name><values><neighborhood><value type="percent">0.3128767123287671</value></neighborhood><city><value type="percent">0.7606991687356031</value></city><nation><value type="percent">0.7866848290049298</value></nation></values></attribute><attribute><name>Condos</name><values><neighborhood><value type="percent">0.4263013698630137</value></neighborhood><city><value type="percent">0.17935175082098562</value></city><nation><value type="percent">0.10635880824351963</value></nation></values></attribute></data></table><table><name>BuiltYear</name><data><attribute><name>>2000</name><value type="percent">0.33095890410958906</value></attribute><attribute><name>1900-1919</name><value type="percent">0.24054794520547945</value></attribute><attribute><name>1920-1939</name><value type="percent">0.057534246575342465</value></attribute><attribute><name>1940-1959</name><value type="percent">0.06301369863013699</value></attribute><attribute><name>1960-1979</name><value type="percent">0.12876712328767123</value></attribute><attribute><name>1980-1999</name><value type="percent">0.17917808219178083</value></attribute></data></table><table><name>Census Summary-HomeSize</name><data><attribute><name>1000sqft</name><value type="percent">0.3942470389170897</value></attribute><attribute><name>3600sqft</name><value type="percent">0.025380710659898477</value></attribute><attribute><name>1000-1400sqft</name><value type="percent">0.24591088550479415</value></attribute><attribute><name>1400-1800sqft</name><value type="percent">0.14438804286520024</value></attribute><attribute><name>1800-2400sqft</name><value type="percent">0.1065989847715736</value></attribute><attribute><name>2400-3600sqft</name><value type="percent">0.08347433728144388</value></attribute></data></table><table><name>Census Summary-HomeType</name><data><attribute><name>Condo</name><value type="percent">0.4263013698630137</value></attribute><attribute><name>Other</name><value type="percent">0.2608219178082192</value></attribute><attribute><name>SingleFamily</name><value type="percent">0.3128767123287671</value></attribute></data></table><table><name>Census Summary-Occupancy</name><data><attribute><name>Own</name><value type="percent">0.35028618</value></attribute><attribute><name>Rent</name><value type="percent">0.64971382</value></attribute></data></table></tables></page><page><name>People</name><tables><table><name>People Data</name><data><attribute><name>Median Household Income</name><values><neighborhood><value currency="USD">41202.9453206937</value></neighborhood><city><value currency="USD">45736</value></city><nation><value currency="USD">44512.0130806292</value></nation></values></attribute><attribute><name>Single Males</name><values><neighborhood><value type="percent">0.218182040689239</value></neighborhood><city><value type="percent">0.230033266826908</value></city><nation><value type="percent">0.146462187349365</value></nation></values></attribute><attribute><name>Single Females</name><values><neighborhood><value type="percent">0.197726979090431</value></neighborhood><city><value type="percent">0.187486853578992</value></city><nation><value type="percent">0.124578258618535</value></nation></values></attribute><attribute><name>Median Age</name><values><neighborhood><value>39</value></neighborhood><city><value>37</value></city><nation><value>36</value></nation></values></attribute><attribute><name>Homes With Kids</name><values><neighborhood><value type="percent">0.149933859172205</value></neighborhood><city><value type="percent">0.181808339938523</value></city><nation><value type="percent">0.313623902816284</value></nation></values></attribute><attribute><name>Average Household Size</name><values><neighborhood><value>1.82278897942217</value></neighborhood><city><value>2.08</value></city><nation><value>2.58883240001203</value></nation></values></attribute><attribute><name>Average Commute Time (Minutes)</name><values><neighborhood><value>26.56776121676753</value></neighborhood><city><value>26.6363786935206</value></city><nation><value>26.375545725891282</value></nation></values></attribute></data></table><table><name>Census Summary-AgeDecade</name><data><attribute><name>70s</name><value type="percent">0.114872901061</value></attribute><attribute><name>0s</name><value type="percent">0.0698273234810158</value></attribute><attribute><name>10s</name><value type="percent">0.0614721332267584</value></attribute><attribute><name>20s</name><value type="percent">0.210411237406907</value></attribute><attribute><name>30s</name><value type="percent">0.222130722421361</value></attribute><attribute><name>40s</name><value type="percent">0.159760457231474</value></attribute><attribute><name>50s</name><value type="percent">0.100382039995932</value></attribute><attribute><name>60s</name><value type="percent">0.0611431851755522</value></attribute></data></table><table><name>Census Summary-CommuteTime</name><data><attribute><name>10min</name><value type="percent">0.116523248268039</value></attribute><attribute><name>60min</name><value type="percent">0.0482377198229543</value></attribute><attribute><name>10-20min</name><value type="percent">0.266281330068427</value></attribute><attribute><name>20-30min</name><value type="percent">0.255069379257092</value></attribute><attribute><name>30-45min</name><value type="percent">0.189151878627933</value></attribute><attribute><name>45-60min</name><value type="percent">0.124736443955555</value></attribute></data></table><table><name>Census Summary-Household</name><data><attribute><name>NoKids</name><value type="percent">0.850066140827795</value></attribute><attribute><name>WithKids</name><value type="percent">0.149933859172205</value></attribute></data></table><table><name>Census Summary-RelationshipStatus</name><data><attribute><name>Divorced-Female</name><value type="percent">0.0854375513590899</value></attribute><attribute><name>Divorced-Male</name><value type="percent">0.0602982799519792</value></attribute><attribute><name>Married-Female</name><value type="percent">0.178297193386233</value></attribute><attribute><name>Married-Male</name><value type="percent">0.186687382837076</value></attribute><attribute><name>Single-Female</name><value type="percent">0.197726979090431</value></attribute><attribute><name>Single-Male</name><value type="percent">0.218182040689239</value></attribute><attribute><name>Widowed-Female</name><value type="percent">0.0632616593158969</value></attribute><attribute><name>Widowed-Male</name><value type="percent">0.0101089133700551</value></attribute></data></table></tables><segmentation><liveshere><title>Makin' It Singles</title><name>Upper-scale urban singles.</name><description>Pre-middle-age to middle-age singles with upper-scale incomes. May or may not own their own home. Most have college educations and are employed in mid-management professions.</description></liveshere><liveshere><title>Aspiring Urbanites</title><name>Urban singles with moderate income.</name><description>Low- to middle-income singles over a wide age range. Some have a college education. They work in a variety of occupations, including some management-level positions.</description></liveshere><liveshere><title>Bright Lights, Big City</title><name>Very mobile singles living in the city.</name><description>Singles ranging in age from early 20s to mid-40s who have moved to an urban setting. Most rent their apartment or condo. Some have a college education and work in services and the professional sector.</description></liveshere></segmentation><uniqueness><category type="Education"><characteristic>Bachelor's degrees</characteristic></category><category type="Employment"><characteristic>Females working for non-profits</characteristic><characteristic>Self-employed (unincorporated businesses)</characteristic><characteristic>Work in arts, design, entertainment, sports, or media occupations</characteristic><characteristic>Work in computer or mathematical occupations</characteristic><characteristic>Work in office and administrative support occupations</characteristic></category><category type="People Culture"><characteristic>Born in the Midwest</characteristic><characteristic>Born in the Northeast</characteristic><characteristic>Born in the South</characteristic><characteristic>Divorced females</characteristic><characteristic>Single females</characteristic><characteristic>Single males</characteristic><characteristic>Widowed females</characteristic></category><category type="Transportation"><characteristic>Get to work by bicycle</characteristic><characteristic>Get to work by bus</characteristic></category></uniqueness></page></pages></response></demographics>
	// Sample response JSON (http://www.httputility.net/json-minifier.aspx) : {"demographics":{"request":{"state":"WA","city":"Seattle","neighborhood":"Ballard"},"message":{"text":"Request successfully processed","code":"0"},"response":{"region":{"id":"250017","state":"Washington","city":"Seattle","neighborhood":"Ballard","latitude":"47.668304","longitude":"122.384601"},"links":{"main":"http://www.zillow.com/local-info/WA-Seattle/Ballard/r_250017/","affordability":"http://www.zillow.com/local-info/WA-Seattle/Ballard-home-value/r_250017/","homesandrealestate":"http://www.zillow.com/local-info/WA-Seattle/Ballard-homes/r_250017/","people":"http://www.zillow.com/local-info/WA-Seattle/Ballard-people/r_250017/","forSale":"http://www.zillow.com/ballard-seattle-wa/","forSaleByOwner":"http://www.zillow.com/homes/fsbo/Ballard-Seattle-WA/","foreclosures":"http://www.zillow.com/ballard-seattle-wa/fore_lt/","recentlySold":"http://www.zillow.com/homes/recently_sold/Ballard-Seattle-WA/"},"charts":{"chart":[{"name":"Median Condo Value"},{"name":"Median Home Value"},{"name":"Dollars Per Square Feet"},{"name":{"deprecated":"true","text":"Zillow Home Value Index Distribution"}},{"name":"Home Type"},{"name":{"deprecated":"true","text":"Owners vs. Renters"}},{"name":"Home Size in Square Feet"},{"name":"Year Built"}]},"market":{"deprecated":"true"},"pages":{"page":[{"name":"Affordability","tables":{"table":{"name":"Affordability Data","data":{"attribute":[{"name":"Zillow Home Value Index","values":{"neighborhood":{"value":{"type":"USD","text":"330600"}},"city":{"value":{"type":"USD","text":"383000"}},"nation":{"value":{"type":"USD","text":"191200"}}}},{"name":"Median Single Family Home Value","values":{"neighborhood":{"value":{"type":"USD","text":"389300"}},"city":{"value":{"type":"USD","text":"409600"}},"nation":{"value":{"type":"USD","text":"192800"}}}},{"name":"Median Condo Value","values":{"neighborhood":{"value":{"type":"USD","text":"295200"}},"city":{"value":{"type":"USD","text":"305300"}},"nation":{"value":{"type":"USD","text":"181300"}}}},{"name":"Median 2-Bedroom Home Value","values":{"neighborhood":{"value":{"type":"USD","text":"341100"}},"city":{"value":{"type":"USD","text":"342000"}},"nation":{"value":{"type":"USD","text":"149800"}}}},{"name":"Median 3-Bedroom Home Value","values":{"neighborhood":{"value":{"type":"USD","text":"378700"}},"city":{"value":{"type":"USD","text":"409000"}},"nation":{"value":{"type":"USD","text":"174300"}}}},{"name":"Median 4-Bedroom Home Value","values":{"neighborhood":{"value":{"type":"USD","text":"441500"}},"city":{"value":{"type":"USD","text":"479900"}},"nation":{"value":{"type":"USD","text":"263500"}}}},{"name":"Percent Homes Decreasing","values":{"neighborhood":{"value":{"type":"percent","text":"0.859"}},"city":{"value":{"type":"percent","text":"0.825"}},"nation":{"value":{"type":"percent","text":"0.693"}}}},{"name":"Percent Listing Price Reduction","values":{"neighborhood":{"value":{"type":"percent","text":"0.21"}},"city":{"value":{"type":"percent","text":"0.236"}},"nation":{"value":{"type":"percent","text":"0.247"}}}},{"name":"Median List Price Per Sq Ft","values":{"neighborhood":{"value":{"type":"USD","text":"304"}},"city":{"value":{"type":"USD","text":"280"}},"nation":{"value":{"type":"USD","text":"115"}}}},{"name":"Median List Price","values":{"neighborhood":{"value":{"type":"USD","text":"330000"}},"city":{"value":{"type":"USD","text":"449000"}},"nation":{"value":{"type":"USD","text":"215000"}}}},{"name":"Median Sale Price","values":{"neighborhood":{"value":{"type":"USD","text":"333800"}},"city":{"value":{"type":"USD","text":"380600"}},"nation":{"value":{"type":"USD","text":"210600"}}}},{"name":"Homes For Sale","values":{"neighborhood":{"value":"105"},"city":{"value":"7492"},"nation":{"value":"3512252"}}},{"name":"Homes Recently Sold","values":{"neighborhood":{"value":"13"},"city":{"value":"750"},"nation":{"value":"272365"}}},{"name":"Property Tax","values":{"neighborhood":{"value":{"type":"USD","text":"2735"}},"city":{"value":{"type":"USD","text":"3456"}},"nation":{"value":{"type":"USD","text":"2192"}}}},{"name":"Turnover (Sold Within Last Yr.)","values":{"neighborhood":{"value":{"type":"percent","text":"0.091"}},"city":{"value":{"type":"percent","text":"0.039"}},"nation":{"value":{"type":"percent","text":"0.035"}}}},{"name":"Median Value Per Sq Ft","values":{"neighborhood":{"value":{"type":"USD","text":"370"}},"city":{"value":{"type":"USD","text":"328"}},"nation":{"value":{"type":"USD","text":"118"}}}},{"name":"1-Yr. Change","values":{"neighborhood":{"value":{"type":"percent","text":"0.086"}},"city":{"value":{"type":"percent","text":"0.102"}},"nation":{"value":{"type":"percent","text":"0.076"}}}},{"name":">Homes For Sale By Owner","values":{"neighborhood":{"value":"5"},"city":{"value":"205"},"nation":{"value":"25194"}}},{"name":">New Construction","values":{"neighborhood":{"value":"0"},"city":{"value":"12"},"nation":{"value":"102395"}}},{"name":">Foreclosures","values":{"neighborhood":{"value":"1"},"city":{"value":"404"},"nation":{"value":"664546"}}}]}}}},{"name":"Homes Real Estate","tables":{"table":[{"name":"Homes Real Estate Data","data":{"attribute":[{"name":"Owners","values":{"neighborhood":{"value":{"type":"percent","text":"0.35028618"}},"city":{"value":{"type":"percent","text":"0.48412441"}},"nation":{"value":{"type":"percent","text":"0.66268764"}}}},{"name":"Renters","values":{"neighborhood":{"value":{"type":"percent","text":"0.64971382"}},"city":{"value":{"type":"percent","text":"0.51587559"}},"nation":{"value":{"type":"percent","text":"0.33731236"}}}},{"name":"Median Home Size (Sq. Ft.)","values":{"neighborhood":{"value":"1230"},"city":{"value":"1460"},"nation":{"value":"1548"}}},{"name":"Avg. Year Built","values":{"neighborhood":{"value":"1980"},"city":{"value":"1948"},"nation":{"value":"1974"}}},{"name":"Single-Family Homes","values":{"neighborhood":{"value":{"type":"percent","text":"0.3128767123287671"}},"city":{"value":{"type":"percent","text":"0.7606991687356031"}},"nation":{"value":{"type":"percent","text":"0.7866848290049298"}}}},{"name":"Condos","values":{"neighborhood":{"value":{"type":"percent","text":"0.4263013698630137"}},"city":{"value":{"type":"percent","text":"0.17935175082098562"}},"nation":{"value":{"type":"percent","text":"0.10635880824351963"}}}}]}},{"name":"BuiltYear","data":{"attribute":[{"name":">2000","value":{"type":"percent","text":"0.33095890410958906"}},{"name":"1900-1919","value":{"type":"percent","text":"0.24054794520547945"}},{"name":"1920-1939","value":{"type":"percent","text":"0.057534246575342465"}},{"name":"1940-1959","value":{"type":"percent","text":"0.06301369863013699"}},{"name":"1960-1979","value":{"type":"percent","text":"0.12876712328767123"}},{"name":"1980-1999","value":{"type":"percent","text":"0.17917808219178083"}}]}},{"name":"Census Summary-HomeSize","data":{"attribute":[{"name":"1000sqft","value":{"type":"percent","text":"0.3942470389170897"}},{"name":"3600sqft","value":{"type":"percent","text":"0.025380710659898477"}},{"name":"1000-1400sqft","value":{"type":"percent","text":"0.24591088550479415"}},{"name":"1400-1800sqft","value":{"type":"percent","text":"0.14438804286520024"}},{"name":"1800-2400sqft","value":{"type":"percent","text":"0.1065989847715736"}},{"name":"2400-3600sqft","value":{"type":"percent","text":"0.08347433728144388"}}]}},{"name":"Census Summary-HomeType","data":{"attribute":[{"name":"Condo","value":{"type":"percent","text":"0.4263013698630137"}},{"name":"Other","value":{"type":"percent","text":"0.2608219178082192"}},{"name":"SingleFamily","value":{"type":"percent","text":"0.3128767123287671"}}]}},{"name":"Census Summary-Occupancy","data":{"attribute":[{"name":"Own","value":{"type":"percent","text":"0.35028618"}},{"name":"Rent","value":{"type":"percent","text":"0.64971382"}}]}}]}},{"name":"People","tables":{"table":[{"name":"People Data","data":{"attribute":[{"name":"Median Household Income","values":{"neighborhood":{"value":{"currency":"USD","text":"41202.9453206937"}},"city":{"value":{"currency":"USD","text":"45736"}},"nation":{"value":{"currency":"USD","text":"44512.0130806292"}}}},{"name":"Single Males","values":{"neighborhood":{"value":{"type":"percent","text":"0.218182040689239"}},"city":{"value":{"type":"percent","text":"0.230033266826908"}},"nation":{"value":{"type":"percent","text":"0.146462187349365"}}}},{"name":"Single Females","values":{"neighborhood":{"value":{"type":"percent","text":"0.197726979090431"}},"city":{"value":{"type":"percent","text":"0.187486853578992"}},"nation":{"value":{"type":"percent","text":"0.124578258618535"}}}},{"name":"Median Age","values":{"neighborhood":{"value":"39"},"city":{"value":"37"},"nation":{"value":"36"}}},{"name":"Homes With Kids","values":{"neighborhood":{"value":{"type":"percent","text":"0.149933859172205"}},"city":{"value":{"type":"percent","text":"0.181808339938523"}},"nation":{"value":{"type":"percent","text":"0.313623902816284"}}}},{"name":"Average Household Size","values":{"neighborhood":{"value":"1.82278897942217"},"city":{"value":"2.08"},"nation":{"value":"2.58883240001203"}}},{"name":"Average Commute Time (Minutes)","values":{"neighborhood":{"value":"26.56776121676753"},"city":{"value":"26.6363786935206"},"nation":{"value":"26.375545725891282"}}}]}},{"name":"Census Summary-AgeDecade","data":{"attribute":[{"name":"70s","value":{"type":"percent","text":"0.114872901061"}},{"name":"0s","value":{"type":"percent","text":"0.0698273234810158"}},{"name":"10s","value":{"type":"percent","text":"0.0614721332267584"}},{"name":"20s","value":{"type":"percent","text":"0.210411237406907"}},{"name":"30s","value":{"type":"percent","text":"0.222130722421361"}},{"name":"40s","value":{"type":"percent","text":"0.159760457231474"}},{"name":"50s","value":{"type":"percent","text":"0.100382039995932"}},{"name":"60s","value":{"type":"percent","text":"0.0611431851755522"}}]}},{"name":"Census Summary-CommuteTime","data":{"attribute":[{"name":"10min","value":{"type":"percent","text":"0.116523248268039"}},{"name":"60min","value":{"type":"percent","text":"0.0482377198229543"}},{"name":"10-20min","value":{"type":"percent","text":"0.266281330068427"}},{"name":"20-30min","value":{"type":"percent","text":"0.255069379257092"}},{"name":"30-45min","value":{"type":"percent","text":"0.189151878627933"}},{"name":"45-60min","value":{"type":"percent","text":"0.124736443955555"}}]}},{"name":"Census Summary-Household","data":{"attribute":[{"name":"NoKids","value":{"type":"percent","text":"0.850066140827795"}},{"name":"WithKids","value":{"type":"percent","text":"0.149933859172205"}}]}},{"name":"Census Summary-RelationshipStatus","data":{"attribute":[{"name":"Divorced-Female","value":{"type":"percent","text":"0.0854375513590899"}},{"name":"Divorced-Male","value":{"type":"percent","text":"0.0602982799519792"}},{"name":"Married-Female","value":{"type":"percent","text":"0.178297193386233"}},{"name":"Married-Male","value":{"type":"percent","text":"0.186687382837076"}},{"name":"Single-Female","value":{"type":"percent","text":"0.197726979090431"}},{"name":"Single-Male","value":{"type":"percent","text":"0.218182040689239"}},{"name":"Widowed-Female","value":{"type":"percent","text":"0.0632616593158969"}},{"name":"Widowed-Male","value":{"type":"percent","text":"0.0101089133700551"}}]}}]},"segmentation":{"liveshere":[{"title":"Makin' It Singles","name":"Upper-scale urban singles.","description":"Pre-middle-age to middle-age singles with upper-scale incomes. May or may not own their own home. Most have college educations and are employed in mid-management professions."},{"title":"Aspiring Urbanites","name":"Urban singles with moderate income.","description":"Low- to middle-income singles over a wide age range. Some have a college education. They work in a variety of occupations, including some management-level positions."},{"title":"Bright Lights, Big City","name":"Very mobile singles living in the city.","description":"Singles ranging in age from early 20s to mid-40s who have moved to an urban setting. Most rent their apartment or condo. Some have a college education and work in services and the professional sector."}]},"uniqueness":{"category":[{"type":"Education","characteristic":"Bachelor's degrees"},{"type":"Employment","characteristic":["Females working for non-profits","Self-employed (unincorporated businesses)","Work in arts, design, entertainment, sports, or media occupations","Work in computer or mathematical occupations","Work in office and administrative support occupations"]},{"type":"People Culture","characteristic":["Born in the Midwest","Born in the Northeast","Born in the South","Divorced females","Single females","Single males","Widowed females"]},{"type":"Transportation","characteristic":["Get to work by bicycle","Get to work by bus"]}]}}]}}}}
    var ZWSID = zillowAPIcredentials().zwsid,act="http://www.zillow.com/webservice/GetDemographics.htm?zws-id="+ZWSID+"&state="+state+"&city="+city+"&neighborhood="+nhood;try{return Xml.parse(UrlFetchApp.fetch(act).getContentText(),true)}catch(e){Logger.log("Error 0vzGS: "+e.message);return false}} // function test(){Logger.log(JSON.stringify(nhoodZillow_api("wa","seattle","ballard")))}
function nhoodZillow_fetch(state,city,nhood){ // (CO-)MAIN CALL for neighborhood data // Scrapes Zillow neighborhood page: http://www.zillow.com/rainier-view-seattle-wa/home-values/ 
    // Sample call: var nhood=avmZillowAPI().searchresults.response.results.result/*[0]*/.localRealEstate.region.name
    // Sample call: var r=LibraryjsAvm.avmJson({"source":{"name":"manual","data":decodeURI(addy)}}),n=LibraryjsAvm.nhoodZillow_fetch(r.address.state,r.address.city,r.avm.dataset.zillow.searchresults.response.results.result/*[0]*/.localRealEstate.region.name)
    //             344027             Rainier View         8  -122.271292,47.495551,-122.24086,47.506415  16037               Seattle                     6                           102001                    United States                $249,900
    var KEY = [ , "regId"          , "regName"          , "regType"          , "regMbr"          , "parId"                 , "parName"                 , "parType"                 , "natId"                 , "natName"                  , "indexSubject"   , "foo"                , "mktHealth"       , "foo"                           , "foo"   , "fcVal0"    , "fcLab0"    , "foo"   , "fcVal1"    , "fcLab1"    , "foo"   , "fcVal2"    , "fcLab2"    , "foo"                  , "nb1link" , "nb1name" , "nb1price" , "nb2link" , "nb2name" , "nb2price" , "nb3link" , "nb3name" , "nb3price" , "nb4link" , "nb4name" , "nb4price" , "nb5link" , "nb5name" , "nb5price" , "nb6link" , "nb6name" , "nb6price" , "nb7link" , "nb7name" , "nb7price" , "nb8link" , "nb8name" , "nb8price" , "nb9link" , "nb9name" , "nb9price" ]
	,   QUE = [ , "data-region-id" , "data-region-name" , "data-region-type" , "data-region-mbr" , "data-parent-region-id" , "data-parent-region-name" , "data-parent-region-type" , "data-nation-region-id" , "data-nation-region-name"  , "module-heading" , "Market Health</h2>" , "class=\"value\"" , "Homes foreclosed (per 10,000)" , "bar-1" , "bar-value" , "bar-label" , "bar-2" , "bar-value" , "bar-label" , "bar-3" , "bar-value" , "bar-label" , "Nearby Neighborhoods" , "href"    , "Nearby"  , "price"    , "href"    , "Nearby"  , "price"    , "href"    , "Nearby"  , "price"    , "href"    , "Nearby"  , "price"    , "href"    , "Nearby"  , "price"    , "href"    , "Nearby"  , "price"    , "href"    , "Nearby"  , "price"    , "href"    , "Nearby"  , "price"    , "href"    , "Nearby"  , "price"    ]
	,   BEG = [ , "\""             , "\""               , "\""               , "\""              , "\""                    , "\""                      , "\""                      , "\""                    , "\""                       , "$"              , "<"                  , ">"               , "<"                             , ">"     , ">"         , ">"         , ">"     , ">"         , ">"         , ">"     , ">"         , ">"         , "<tbody"               , "\""      , ">"       , "$"        , "\""      , ">"       , "$"        , "\""      , ">"       , "$"        , "\""      , ">"       , "$"        , "\""      , ">"       , "$"        , "\""      , ">"       , "$"        , "\""      , ">"       , "$"        , "\""      , ">"       , "$"        , "\""      , ">"       , "$"        ]
	,   END = [ , "\""             , "\""               , "\""               , "\""              , "\""                    , "\""                      , "\""                      , "\""                    , "\""                       , "<"              , ">"                  , "/"               , ">"                             , "<"     , " "         , "<"         , "<"     , " "         , "<"         , "<"     , " "         , "<"         , "<tr"                  , "\""      , "<"       , "<"        , "\""      , "<"       , "<"        , "\""      , "<"       , "<"        , "\""      , "<"       , "<"        , "\""      , "<"       , "<"        , "\""      , "<"       , "<"        , "\""      , "<"       , "<"        , "\""      , "<"       , "<"        , "\""      , "<"       , "<"        ]
	,   DEL = [ "$" , "," ] , act = nhoodZillow_link(state,city,nhood)
    ,   INS = [ ""  , ""  ] ; try{data=UrlFetchApp.fetch(act).getContentText()}catch(e){Logger.log("Error iyeT5: "+e.message);return false}var out=LibraryjsUtil._scrapeDataset(data,KEY,QUE,BEG,END,DEL,INS);out.link=act;//Logger.log(data)}
    /*Logger.log(JSON.stringify(out));*/return out}	//function test(){Logger.log(JSON.stringify(nhoodZillow_fetch("wa","seattle","rainier view")))}
function populateLinks(r){//@return{object} Links contained in the given AVM object //@param{object} r an AVM object returned from avmJson() // Return NULL to avoid type mismatch when uploading to Parse DB via API
    return  {	"link_boa"               : function(){try{return  /*ok*/    r.link.boa                                              }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"link_chase"             : function(){try{return  /*ok*/    r.link.chase                                            }catch(e){Logger.log("Error oYYpm: "+e.message);return null;}}() //
            ,	"link_cityData"          : function(){try{return            r.link.cityData                                         }catch(e){Logger.log("Error lsRlw: "+e.message);return null;}}() // Errors: L1 local; L2 site suspected; L3 site confirmed; OK works; ok works but must copy/paste address
            ,	"link_eppraisal"         : function(){try{return  /*L1*/    r.avm.dataset.eppraisal.link                            }catch(e){Logger.log("Error lsRlw: "+e.message);return null;}}() // Errors: L1 local; L2 site suspected; L3 site confirmed; OK works; ok works but must copy/paste address
            ,	"link_esriZip"           : function(){try{return            r.link.esriZip                                          }catch(e){Logger.log("Error lsRlw: "+e.message);return null;}}() // Errors: L1 local; L2 site suspected; L3 site confirmed; OK works; ok works but must copy/paste address
            ,	"link_movotoRe"          : function(){try{return            r.link.movotoRe                                         }catch(e){Logger.log("Error lsRlw: "+e.message);return null;}}() // Errors: L1 local; L2 site suspected; L3 site confirmed; OK works; ok works but must copy/paste address
            ,	"link_movotoDemo"        : function(){try{return            r.link.movotoDemo                                       }catch(e){Logger.log("Error lsRlw: "+e.message);return null;}}() // Errors: L1 local; L2 site suspected; L3 site confirmed; OK works; ok works but must copy/paste address
			,	"link_googleMap"         : function(){try{return  /*OK*/    r.link.gmap                                             }catch(e){Logger.log("Error BDfn6: "+e.message);return null;}}() //
		//	,	"link_homeGain"          : function(){try{return  /*XX*/    r.avm.dataset.homeGain.link                             }catch(e){Logger.log("Error TYCOa: "+e.message);return null;}}() //
			,	"link_homesCom"          : function(){try{return  /*ok*/    r.link.homesCom                                         }catch(e){Logger.log("Error Fsz1y: "+e.message);return null;}}() //
			,	"link_homeSnap"          : function(){try{return            r.link.homeSnap                                         }catch(e){Logger.log("Error Fsz1y: "+e.message);return null;}}() //
			,	"link_neighborhoodScout" : function(){try{return  /*ok*/    r.link.neighborhoodScout                                }catch(e){Logger.log("Error iN7SP: "+e.message);return null;}}() //
		  	,	"link_propertyShark"     : function(){try{return  /*ok*/    r.link.propertyShark                                    }catch(e){Logger.log("Error IhqsL: "+e.message);return null;}}() //
		//	,	"link_realEstate"        : function(){try{return  /*XX*/    r.avm.dataset.realEstate.link                           }catch(e){Logger.log("Error ULKe3: "+e.message);return null;}}() //
			,	"link_realtor"           : function(){try{return  /*OK*/    r.avm.dataset.realtor.link                              }catch(e){Logger.log("Error ntN9S: "+e.message);return null;}}() //
			,	"link_trulia"            : function(){try{return  /*OK*/    r.avm.dataset.trulia.link                               }catch(e){Logger.log("Error OpN7A: "+e.message);return null;}}() //
			,	"link_yahoo"             : function(){try{return  /*OK*/    r.link.yahoo	   					                    }catch(e){Logger.log("Error jKGFY: "+e.message);return null;}}() //
			,	"link_zillow"            : function(){try{return  /*OK*/    r.link.zillow                                           }catch(e){Logger.log("Error 9Z5Gn: "+e.message);return null;}}() //
			,	"link_zillowdetails"     : function(){try{return  /*OK*/    r.avm.dataset.zillow.searchresults.response.results.result/*zil[i]*/.links.homedetails.Text}catch(e){Logger.log("Error dBjEz: "+e.message);return null;}}() //
			,	"link_zipRealty"         : function(){try{return            r.link.zipRealty                                        }catch(e){Logger.log("Error Gx2c1: "+e.message);return null;}}() //    
		//	,	"link_zipSkinny"         : function(){try{return  /*XX*/    r.link.zipSkinny                                        }catch(e){Logger.log("Error r7Zro: "+e.message);return null;}}() //
			}}
function populateFacts(r){//@return{object} Facts contained in the given AVM object //@param{object} r an AVM object returned from avmJson() // Return NULL to avoid type mismatch when uploading to Parse DB via API
    return  {	"arv"                    : function(){try{return            r.arv                         .value                    }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() // "arv" Strict input // ARV
			,	"ask"                    : function(){try{return            r.ask                                                   }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"ask_round"              : function(){try{return Math.round(r.ask                                 / 1000 )          }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"autoEst"                : function(){try{return            r.avm.stat.autoEst                                      }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"autoEst_round"          : function(){try{return Math.round(r.avm.stat.autoEst                    / 1000 )          }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"avmStatSet"             : function(){try{return            r.avm.stat.set                                          }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() // "avmStatSet" Array of AVM statistics
			,	"baths"                  : function(){try{return            r.avm.combi.baths                                       }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"beds"                   : function(){try{return            r.avm.combi.beds                                        }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"city"                   : function(){try{return            r.address.city                                          }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"cof"                    : function(){try{return            r.counter                     .value                    }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() // "cof" Strict input // Counter
			,	"com"                    : function(){try{return            r.LST_Attributes[21].attribute_value                    }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() // "com" Strict input // Comments 
			,	"full"                   : function(){try{return            r.address.full                                          }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"grm"                    : function(){try{return Math.round(r.ask/(12*Number(r.avm.dataset.zillow.searchresults.response.results.result/*zil[i]*/.rentzestimate.amount.Text)))}catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() // "grm" Compute gross rent margin
			,	"ia"                     : function(){try{return            r.incomeApproach                                        }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() // "ia"  Compute price per income approach
			,	"ia_round"               : function(){try{return Math.round(r.incomeApproach                      / 1000 )          }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
            ,   "item"                   : function(){try{return            r.item                                                  }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"lastSoldPrice"          : function(){try{return            r.avm.combi.lastSoldPrice                               }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"lastSoldPrice_round"    : function(){try{return Math.round(r.avm.combi.lastSoldPrice             / 1000 )          }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"lastSoldYear"           : function(){try{return            r.avm.combi.lastSoldYear                                }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"latitude"               : function(){try{return            r.avm.combi.latitude                                    }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"longitude"              : function(){try{return            r.avm.combi.longitude                                   }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"lot"                    : function(){try{return            r.avm.combi.lot                                         }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"lot_round"              : function(){try{return Math.round(r.avm.combi.lot                       /  100 )          }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"popCount"               : function(){try{return            r.avm.stat.popCount                                     }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"psf"                    : function(){try{return Math.round(r.ask/*avm.stat.autoEst*//r.avm.combi.sqft)             }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() // "psf" Compute price per square foot
			,	"ratio"                  : function(){try{return            r.avm.stat.ratio                                        }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() // "rent"
			,	"rent"                   : function(){try{return Math.round(r.avm.dataset.zillow.searchresults.response.results.result/*zil[i]*/.rentzestimate.amount.Text             )}catch(e){Logger.log(e.message);return null;}}() //
			,	"rent_round"             : function(){try{return Math.round(r.avm.dataset.zillow.searchresults.response.results.result/*zil[i]*/.rentzestimate.amount.Text      /  100 )}catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"rentEst"                : function(){try{return            r.avm.combi.rentEst                                     }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"rep"                    : function(){try{return            r.repairs                     .value                    }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() // "rep" Strict input // Repairs
			,	"sa"                     : function(){try{return            r.address.sa                                            }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"sdPct"                  : function(){try{return            r.avm.stat.sdPct                                        }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"sf"                     : function(){try{return            r.avm.combi.sqft                                        }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"sf_round"               : function(){try{return Math.round(r.avm.combi.sqft                      /  100 )          }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"state"                  : function(){try{return            r.address.state                                         }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
            ,	"status"                 : function(){try{return            r.avm.combi.status                                      }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
            ,	"useCode_alt"            : function(){try{return            r.avm.combi.useCode                                     }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"taxAmt"                 : function(){try{return            r.avm.combi.taxAmt                                      }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"taxAmt_round"           : function(){try{return Math.round(r.avm.combi.taxAmt                    /  100 )          }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"taxExp"                 : function(){try{return            r.avm.combi.taxExp                                      }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"taxExp_round"           : function(){try{return Math.round(r.avm.combi.taxExp                    /  100 )          }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
            ,	"taxVal"                 : function(){try{return            r.avm.combi.taxVal                                      }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"taxVal_round"           : function(){try{return Math.round(r.avm.combi.taxVal                    / 1000 )          }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
            ,	"yearBuilt"              : function(){try{return            r.avm.combi.built                                       }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
			,	"zip"                    : function(){try{return            r.address.zip                                           }catch(e){Logger.log("Error eHa8m: "+e.message);return null;}}() //
										   }
}
function avmReport(ob/*item,avmJson,addy,exit*/){ob.exit=ob.exit||1;//ob.showgate=ob.showgate||false;//@param{object} ob eg., {item:"string",avmJson:{object},addy:"string",exit:integer} //@param{string} ob.item objectId of situs //@param{string} ob.addy (eg., "3255 Whitehall Dr, Dallas, TX 75229")//@param{object} avmJson output of avmJson() method //@param{integer} ob.exit - instructs function how much data to append to return object; different applications require different data sets // exit==1, called by Argenta; exit==2, called by DealDigger;
    //ob.addy=ob.addy||"3255 Whitehall Dr, Dallas, TX 75229";//function test(){var out=JSON.stringify(LibraryjsAvm.avmReport("5115 Longfellow Street, Los Angeles, CA, 90042"));Logger.log(out);print(out)}//Logger.log(addy);//print(JSON.stringify(LibraryjsAvm.avmJson({"source":{"name":"manual","data":addy}/*,"market":{"city":"Pheonix","state":"AZ"}*/})));
      var R=0.5,S=1,out={},t=new Date().getTime(),r;if(ob.avmJson){r=ob.avmJson}else{r=ob.item?function(){var x=LibraryjsUtil.dbParse({verb:"get",project:"dealDigger",className:"situs",obid:ob.item});
	  if((x.avmJson && x.avmJson_stamp) && (((t-x.avmJson_stamp)/(1000*60*60*24))<30/*Max report age*/)){return x.avmJson}else{var addy=x.importOb.PropertyAddress + ", " + x.importOb.City + ", IL"
		          , y = avmJson({"source":{"name":"manual","data":decodeURI(   addy).replace(/(\+|\-)/gi," ")}/*,"market":{"city":"Pheonix","state":"AZ"}*/});LibraryjsUtil.dbParse({verb:"put",project:"dealDigger",className:"situs",obid:ob.item,ob:{avmJson:y,avmJson_stamp:t}})}}()
	  :/*LibraryjsAvm.*/avmJson({"source":{"name":"manual","data":decodeURI(ob.addy).replace(/(\+|\-)/gi," ")}/*,"market":{"city":"Pheonix","state":"AZ"}*/})}
      ;try{var nn = r.avm.dataset.zillow.searchresults.response.results.result.localRealEstate.region.name,n=[/*LibraryjsAvm.*/nhoodZillow_fetch(r.address.state,r.address.city,nn),/*LibraryjsAvm.*/nhoodZillow_api(r.address.state,r.address.city,nn)]
	  }catch(e){var nn="",n=["",""];Logger.log("Error 5c5il: "+e.message)}
	  // print(JSON.stringify({r:r,n:n})); // Data model : {"r":{"avm":{"dataset":{"zillow":{"searchresults":{"request":{"citystatezip":{"Text":"90042"},"address":{"Text":"5116 Longfellow St"}},"schemalocation":"http://www.zillow.com/static/xsd/SearchResults.xsd http://www.zillowstatic.com/vstatic/6eb1265/static/xsd/SearchResults.xsd","response":{"results":{"result":{"lastSoldDate":{"Text":"06/24/1992"},"yearBuilt":{"Text":"1925"},"bathrooms":{"Text":"3.0"},"localRealEstate":{"region":{"type":"neighborhood","zindexValue":{"Text":"545,000"},"id":"115609","name":"Highland Park","links":{"forSaleByOwner":{"Text":"http://www.zillow.com/highland-park-los-angeles-ca/fsbo/"},"forSale":{"Text":"http://www.zillow.com/highland-park-los-angeles-ca/"},"overview":{"Text":"http://www.zillow.com/local-info/CA-Los-Angeles/Highland-Park/r_115609/"}}}},"bedrooms":{"Text":"5"},"finishedSqFt":{"Text":"1854"},"taxAssessment":{"Text":"302285.0"},"lotSizeSqFt":{"Text":"4900"},"useCode":{"Text":"SingleFamily"},"taxAssessmentYear":{"Text":"2013"},"lastSoldPrice":{"currency":"USD","Text":"159000"},"FIPScounty":{"Text":"6037"},"zpid":{"Text":"20761923"},"zestimate":{"percentile":{"Text":"0"},"amount":{"currency":"USD","Text":"749086"},"oneWeekChange":{"deprecated":"true"},"valueChange":{"currency":"USD","Text":"46266","duration":"30"},"valuationRange":{"low":{"currency":"USD","Text":"704141"},"high":{"currency":"USD","Text":"801522"}},"last_updated":{"Text":"09/18/2014"}},"rentzestimate":{"amount":{"currency":"USD","Text":"2659"},"oneWeekChange":{"deprecated":"true"},"valueChange":{"currency":"USD","Text":"6","duration":"30"},"valuationRange":{"low":{"currency":"USD","Text":"1994"},"high":{"currency":"USD","Text":"3430"}},"last_updated":{"Text":"07/07/2014"}},"links":{"comparables":{"Text":"http://www.zillow.com/homes/comps/20761923_zpid/"},"homedetails":{"Text":"http://www.zillow.com/homedetails/5116-Longfellow-St-Los-Angeles-CA-90042/20761923_zpid/"},"mapthishome":{"Text":"http://www.zillow.com/homes/20761923_zpid/"},"graphsanddata":{"Text":"http://www.zillow.com/homedetails/5116-Longfellow-St-Los-Angeles-CA-90042/20761923_zpid/#charts-and-data"}},"totalRooms":{"Text":"8"},"address":{"street":{"Text":"5116 Longfellow St"},"city":{"Text":"Los Angeles"},"longitude":{"Text":"-118.197347"},"latitude":{"Text":"34.103437"},"state":{"Text":"CA"},"zipcode":{"Text":"90042"}}}}},"message":{"text":{"Text":"Request successfully processed"},"code":{"Text":"0"}},"xsi":"urn:x-prefix:xsi"},"estimate":"749086","link":"http://www.zillow.com/webservice/GetDeepSearchResults.htm?rentzestimate=true&zws-id=X1-ZWz1czg9fsh6vf_26nu3&address=5116+Longfellow+St&citystatezip=90042"},"trulia":{"beds":"5","baths":"3","sqft":"1854","lot":"n/a","yrBuilt":"1925","estimate":"615000","dataSet":"{\"id\":4030273,\"feedId\":null,\"hash\":\"2a6ddb90396b6d482bb3e377f182eaec\",\"neighborhood\":\"Eagle Rock\",\"neighborhoodId\":7225,\"zipCode\":\"90042\",\"city\":\"Los Angeles\",\"county\":\"Los Angeles\",\"countyFIPS\":\"06037\",\"stateCode\":\"CA\",\"stateName\":\"California\",\"latitude\":34.103436,\"longitude\":-118.19735,\"addressForDisplay\":\"5116 Longfellow Street, Los Angeles CA\",\"addressForUrl\":\"5116-Longfellow-St-Los-Angeles-CA-90042\",\"streetNumber\":\"5116\",\"street\":\"Longfellow St\",\"apartmentNumber\":null,\"urlType\":null,\"status\":\"Assessor\",\"listingId\":null,\"locationId\":\"76108\",\"type\":\"SINGLE-FAMILY HOME\",\"typeDisplay\":\"Single-Family Home\",\"numBedrooms\":5,\"numBathrooms\":3,\"numPartialBathrooms\":null,\"numFullBathrooms\":3,\"siteId\":null,\"siteUrl\":null,\"listingType\":null,\"dmaId\":31,\"claimed\":null,\"numBeds\":5,\"indexSource\":\"Assessor\",\"isForeclosure\":false,\"foreclosureStatus\":\"\",\"isSrpFeatured\":false,\"price\":null,\"sqft\":1854,\"isRental\":false,\"isRentalCommunity\":false,\"hasStreetView\":\"-1\",\"showStreetView\":\"1\",\"blockStreetView\":false,\"walkScore\":null,\"photos\":null,\"adCampaign\":null,\"hasPhotos\":false,\"userHidden\":null,\"userLiked\":null,\"isAddressNotDisclosed\":false,\"_isDefault\":true,\"intersectionName\":null,\"agentClaimable\":true,\"pdpURL\":\"\\/homes\\/California\\/Los_Angeles\\/sold\\/4030273-5116-Longfellow-St-Los-Angeles-CA-90042\",\"thumbnail\":null,\"formattedPrice\":\"\",\"shortDescription\":\"5116 Longfellow St\",\"formattedBedAndBath\":\"5bd, 3 full ba\",\"formattedSqft\":\"1,854 sqft\",\"dataPhotos\":\"{\\\"photos\\\":[],\\\"static_map_path\\\":\\\"http:\\\\\\/\\\\\\/maps.googleapis.com\\\\\\/maps\\\\\\/api\\\\\\/staticmap?client=gme-truliainc&zoom=18&size=640x480&maptype=satellite&sensor=false&center=34.103436%2C-118.19735&signature=VqfEHISt49VrreIMlcMIitieXk0=\\\"}\",\"isBuilder\":null,\"isBuilderCommunity\":false,\"isPlan\":false,\"isSpec\":false,\"userClaimed\":false});\n  pdp_location_data = {\"neighborhood\":{\"locationId\":\"87346\",\"name\":\"Eagle Rock\",\"locationType\":\"neighborhood\",\"altId\":\"7225\"},\"state\":{\"locationId\":\"5\",\"name\":\"California\",\"locationType\":\"state\",\"altId\":\"CA\"},\"county\":{\"locationId\":\"57\",\"name\":\"Los Angeles County\",\"locationType\":\"county\",\"altId\":\"06037\"},\"city\":{\"locationId\":\"22637\",\"name\":\"Los Angeles\",\"locationType\":\"city\",\"altId\":\"4396\"},\"propertyId\":4030273,\"addressHash\":null,\"address\":\"5116 Longfellow St\",\"zipCode\":{\"locationId\":\"76108\",\"name\":\"90042\",\"locationType\":\"zipCode\",\"altName\":\"90042\",\"altId\":\"90042\"},\"geohash\":\"9q5fn276fj5z\",\"latitude\":34.103436,\"longitude\":-118.19735,\"unknown\":true,\"isCountySupportsValuation\":false};\n  trulia.pdp.comps_markers = {\"for sale\":[],\"sold\":[]};\n  trulia.pdp.streetViewBlocked = false;\n  trulia.pdp.isCountySupportsValuation = pdp_location_data.isCountySupportsValuation;\n\n  var _RENTALS_PARTNER_NAME = \"\";\n  var _SPANLONG = pdp_location_data.longitude;\n  var _SPANLAT  = pdp_location_data.latitude;\n  var _CENLONG  = pdp_location_data.longitude;\n  var _CENLAT   = pdp_location_data.latitude;\n  var _LOCATION_UNKNOWN = pdp_location_data.unknown;\n\n  // global vars, may be used on all tabs\n  var _IMAGE_SERVER = 'http://static.trulia-cdn.com';\n  var _JS_SERVER_ROOT = 'http://static.trulia-cdn.com/javascript/G33_34/';\n  var _MAPTILE_SERVER = 'http://tiles.trulia.com/';\n  var _HEATMAP_VERSIONS = {\"domain\":\"http:\\/\\/tiles.trulia.com\",\"singles_living_alone\":{\"uri\":\"tiles\\/singles_living_alone\",\"version\":\"20140709\"},\"wildfires\":{\"uri\":\"tiles\\/wildfires\",\"version\":\"20130910\"},\"shopping\":{\"uri\":\"tiles\\/shopping\",\"version\":\"20140809\"},\"tornados\":{\"uri\":\"tiles\\/tornados\",\"version\":\"20140530\"},\"valuations\":{\"uri\":\"tiles\\/valuations\",\"version\":\"20140214\"},\"beauty\":{\"uri\":\"tiles\\/beauty\",\"version\":\"20140809\"},\"percent_married\":{\"uri\":\"tiles\\/percent_married\",\"version\":\"20140709\"},\"crime_heatmap\":{\"uri\":\"tiles\\/crime_heatmap\",\"version\":\"20140114\"},\"median_age\":{\"uri\":\"tiles\\/median_age\",\"version\":\"20140709\"},\"rental_prices\":{\"uri\":\"tiles\\/rental_prices\",\"version\":\"20140828\"},\"groceries\":{\"uri\":\"tiles\\/groceries\",\"version\":\"20140809\"},\"hurricanes\":{\"uri\":\"tiles\\/hurricanes\",\"version\":\"20140530\"},\"percent_multiunit\":{\"uri\":\"tiles\\/percent_multiunit\",\"version\":\"20140709\"},\"schools\":{\"uri\":\"tiles\\/schools\",\"version\":\"20130910\"},\"seismic_hazard\":{\"uri\":\"tiles\\/seismic_hazard\",\"version\":\"20130910\"},\"gyms\":{\"uri\":\"tiles\\/gyms\",\"version\":\"20140809\"},\"arts\":{\"uri\":\"tiles\\/arts\",\"version\":\"20140809\"},\"median_move_in_year\":{\"uri\":\"tiles\\/median_move_in_year\",\"version\":\"20140709\"},\"year_built\":{\"uri\":\"tiles\\/year_built\",\"version\":\"20140709\"},\"home_prices_sales_sqft\":{\"uri\":\"tiles\\/home_prices_sales_sqft\",\"version\":\"20131231\"},\"percent_college\":{\"uri\":\"tiles\\/percent_college\",\"version\":\"20140709\"},\"cafes\":{\"uri\":\"tiles\\/cafes\",\"version\":\"20140809\"},\"commute_time\":{\"uri\":\"tiles\\/commute_time\",\"version\":\"20140709\"},\"owner_occupied\":{\"uri\":\"tiles\\/owner_occupied\",\"version\":\"20140709\"},\"home_prices_sales\":{\"uri\":\"tiles\\/home_prices_sales\",\"version\":\"20131231\"},\"faults\":{\"uri\":\"tiles\\/faults\",\"version\":\"20130910\"},\"nightlife\":{\"uri\":\"tiles\\/nightlife\",\"version\":\"20140809\"},\"transit\":{\"uri\":\"tiles\\/transit\",\"version\":\"20140709\"},\"flood_zones\":{\"uri\":\"tiles\\/flood_zones\",\"version\":\"20130910_02\"},\"parcels\":{\"uri\":\"tiles\\/parcels\",\"version\":\"20140218\"},\"home_prices_listings\":{\"uri\":\"tiles\\/home_prices_listings\",\"version\":\"20140116\"},\"restaurants\":{\"uri\":\"tiles\\/restaurants\",\"version\":\"20140809\"},\"rental_prices_nolabel\":{\"uri\":\"tiles\\/rental_prices_nolabel\",\"version\":\"20140828\"}};\n\n  var _SHOW_PARCEL_BOUNDARIES = 1;\n\n  // compare tab\n  var thumbs_root = '';\n\n  // schools tab\n  var _default_zoom_level = '15';\n  var _default_map_view = 'G_MAP_TYPE';\n  var _show_poi = '0';\n\n  var direction = 0;\n  var z_details_pg = 1;\n\n  //used by the maps to determine if we can show street view and the address\n  // AI: will be refactored\n  var showStreetview = true;\n  var showAddressControl = true;\n\n  \n    var showMarvinGardensTest = false;\n  \n  _feature_pdp_photo_player_ad_enabled = true;\n</ script>\n\n<script src=\"//maps.google.com/maps/api/js?v=3.17&client=gme-truliainc&sensor=false&libraries=geometry\"></script>\n<script src=\"http://static.trulia-cdn.com/javascript/G33_34/include/js/pdp.js?v=G33_34\"></script>\n<script src=\"http://static.trulia-cdn.com/javascript/G33_34/include/js/maps_v3.js?v=G33_34\" defer></script>\n\n  \n<script type=\"text/template\" id=\"popupModuleTemplate\">\n  <div class=\"modal box boxBasic backgroundBasic pbs\" style=\"position:absolute\" data-title=\"5116 Longfellow St\">\n    <div class=\"boxHead boxHeadBasic pas\"><h3 id=\"glanceModalTitle\"></h3></div>\n    <div class=\"boxBody pbl\">\n      <button class=\"boxClose\"><span role=\"presentation\">&times;</span><span class=\"hideVisually\">Close</span></button>\n      <div id=\"glanceMapDetailInfoContainer\" class=\"places_detail_info_container overlayFullWidth\">\n        <div id=\"glanceMapDetailInfo\" class=\"places_detail_info box boxBasic man h7\"></div>\n      </div>\n      <div id=\"glanceMap\" style=\"height:300px;width:625px\"></div>\n      <div id=\"glanceMapAttribution\" class=\"h8 typeLowlight line\"></div>\n      <div id=\"glanceInfoWindow\" class=\"places_ui_labels map-infoWindow\"></div>\n      <div id=\"glanceHoverWindow\" class=\"places_ui_labels map-infoWindow\"></div>\n      <div id=\"glanceModalTable\"></div>\n    </div>\n  </div>\n</script>\n\n<script type=\"text/template\" id=\"photoPlayerInterstitialTemplate\">\n  <div id=\"< %= divId %>\">\n    <div class=\"h7 interstitialThumbnail blm\">\n      <div class=\"line\">\n        <div class=\"col cols8\">\n          <img class=\"interstitialThumbnailImg\" src=\"< %= agentPicture %>\">\n        </div>\n        <div class=\"col lastCol plm\">\n          <span class=\"typeEmphasize\">\n              < % if (agentName.length > 15)\n                 {\n                    print(agentName.substring(0,12) + '...');\n                 }\n                 else\n                 {\n                    print(agentName);\n                 }\n              %>\n          </span><br>\n          < % print(numPhotos + (numPhotos == 1? ' photo' : ' photos')","locationData":false,"comps":false,"link":"http://www.trulia.com/homes/California/Los_Angeles/sold/4030273-5116-Longfellow-St-Los-Angeles-CA-90042"},"homeSnap":{"low":"456280","estimate":"536800","high":"617320","foo":"div","beds":"5","heating":"Floor / Wall","pmtEst":"--","bathsFull":"3","basement":false,"rentEst":"2430","bathsHalf":"--","stories":false,"taxEst":"3778","sqft":"1854","addressStories":false,"homeScore":"71","lot":"0.11","fireplaces":false,"investorScore":"52","lastSaleDate":"--","lastSalePrice":"--","yearBuilt":"1925","link":"http://www.homesnap.com/CA/Los-Angeles/5116-Longfellow-Street"},"realtor":{"status":"Not For Sale","beds":"5","baths":"3","sqft":"1854","lot":"4900 Sq Ft Lot","built":"1925","smartZip_est":"463100","smartZip_low":"393635","smartZip_high":"532565","dataQuick_est":"549758","dataQuick_low":"419392","dataQuick_high":"680123","eppraisal_est":"480392","eppraisal_low":"408333","eppraisal_high":"552451","link":"http://www.realtor.com/propertyrecord-search/Los-Angeles_CA/90042/5116-Longfellow-St"},"dataQuick":{"estimate":"549758","high":"680123","low":"419392"},"smartZip":{"estimate":"463100","high":"532565","low":"393635"},"eppraisal":{"estimate":"480392","high":"552451","low":"408333"},"realEstate":{"estimate":"361172","beds":"5","baths":"3","sqft":"1854","built":"1925","stories":"1","lot":"0.11","link":"http://www.realestate.com/homevalues/5116-Longfellow-St,Los-Angeles,CA/"}},"combi":{"useCode":"SFR","beds":"5","baths":"3.0","sqft":"1854","lot":"4900","built":"1925","taxVal":"302285.0","lastSoldPrice":"159000","lastSoldDate":"06/24/1992","lastSoldYear":"1992"},"stat":{"ob":{"realEstate":"361172","eppraisal":"480392","smartZip":"463100","dataQuick":"549758","homeSnap":"536800","trulia":"615000","zillow":"749086"},"set":["749086","615000","549758","536800","480392","463100","361172"],"isOk":true,"popCount":7,"autoEst":536800,"margin":null,"ratio":null,"sdPop":113897,"sdPct":22}},"address":{"sa":"5116 Longfellow St","city":"Los Angeles","state":"CA","zip":"90042","csz":"Los Angeles, CA 90042","full":"5116 Longfellow St, Los Angeles, CA 90042","part":"Longfellow St, Los Angeles, CA 90042","number":"5116"},"isRaw":false,"table":"situs","source":{"name":"manual","data":"5115 Longfellow Street, Los Angeles, CA, 90042"},"link":{"gmap":"https://maps.google.com/maps?q=5116+Longfellow+St,+Los+Angeles,+CA+90042","zillow":"http://www.zillow.com/homes/5116-Longfellow-St,-90042_rb/","propertyShark":"http://www.propertyshark.com/","neighborhoodScout":"http://www.neighborhoodscout.com/","zipSkinny":"http://zipskinny.com/index.php?zip=90042","chase":"https://www.chase.com/mortgage/mortgage-resources/home-value-estimator","boa":"http://realestatecenter.bankofamerica.com/tools/marketvalue.aspx","homesCom":"http://www.homes.com/Home-Prices/","homeSnap":"http://www.homesnap.com/CA/Los-Angeles/5116-Longfellow-Street","trulia":"http://www.trulia.com/homes/California/Los_Angeles/sold/4030273-5116-Longfellow-St-Los-Angeles-CA-90042","realEstate":"http://www.realestate.com/homevalues/5116-Longfellow-St,Los-Angeles,CA/","realtor":"http://www.realtor.com/propertyrecord-search/Los-Angeles_CA/90042/5116-Longfellow-St","photo":false},"offer":{"beforeRepairs":{"auto":null,"manual":{}},"afterRepairs":{"manual":{}}},"incomeApproach":null,"arv":{},"repairs":{},"counter":{},"analysis":{},"contract":{},"assignment":{}},"n":[{"regId":"115609","regName":"Highland Park","regType":"8","regMbr":"-118.20815534.102023-118.16558634.133961","parId":"12447","parName":"Los Angeles","parType":"6","natId":"102001","natName":"United States","indexSubject":"545000","foo":"class=\"entries\">","mktHealth":"9.2","fcVal0":"2.2","fcLab0":"Highland Park","fcVal1":"2.2","fcLab1":"Los Angeles","fcVal2":"4.3","fcLab2":"United States","nb1link":"/south-arroyo-pasadena-ca/home-values/","nb1name":"South Arroyo","nb1price":"1005700","nb2link":"/glenoake-canyon-glendale-ca/home-values/","nb2name":"Glenoake Canyon","nb2price":"809000","nb3link":"/eagle-rock-los-angeles-ca/home-values/","nb3name":"Eagle Rock","nb3price":"670300","nb4link":"/mount-washington-los-angeles-ca/home-values/","nb4name":"Mount Washington","nb4price":"652000","nb5link":"/glassell-park-los-angeles-ca/home-values/","nb5name":"Glassell Park","nb5price":"590800","nb6link":"/hermon-los-angeles-ca/home-values/","nb6name":"Hermon","nb6price":"499300","nb7link":"/cypress-park-los-angeles-ca/home-values/","nb7name":"Cypress Park","nb7price":"489900","nb8link":"/montecito-heights-los-angeles-ca/home-values/","nb8name":"Montecito Heights","nb8price":"427900","nb9link":"/el-sereno-los-angeles-ca/home-values/","nb9name":"El Sereno","nb9price":"383400","link":"http://www.zillow.com/Highland-Park-Los-Angeles-CA/home-values/"},{"demographics":{"request":{"city":{"Text":"Los Angeles"},"neighborhood":{"Text":"Highland Park"},"state":{"Text":"CA"}},"schemalocation":"http://www.zillow.com/static/xsd/Demographics.xsd http://www.zillowstatic.com/vstatic/6eb1265/static/xsd/Demographics.xsd","response":{"market":{"deprecated":"true"},"region":{"zmmrateurl":{"Text":"http://www.zillow.com/mortgage-rates/ca/los-angeles/"},"city":{"Text":"Los Angeles"},"longitude":{"Text":"-118.18687"},"neighborhood":{"Text":"Highland Park"},"latitude":{"Text":"34.117992"},"state":{"Text":"California"},"id":{"Text":"115609"}},"pages":{"page":[{"name":{"Text":"Affordability"},"tables":{"table":{"data":{"attribute":[{"values":{"city":{"value":{"type":"USD","Text":"525200"}},"neighborhood":{"value":{"type":"USD","Text":"545000"}},"nation":{"value":{"type":"USD","Text":"175600"}}},"name":{"Text":"Zillow Home Value Index"}},{"values":{"city":{"value":{"type":"USD","Text":"561800"}},"neighborhood":{"value":{"type":"USD","Text":"553200"}},"nation":{"value":{"type":"USD","Text":"175300"}}},"name":{"Text":"Median Single Family Home Value"}},{"values":{"city":{"value":{"type":"USD","Text":"427200"}},"nation":{"value":{"type":"USD","Text":"178400"}}},"name":{"Text":"Median Condo Value"}},{"values":{"city":{"value":{"type":"USD","Text":"451500"}},"neighborhood":{"value":{"type":"USD","Text":"503300"}},"nation":{"value":{"type":"USD","Text":"135100"}}},"name":{"Text":"Median 2-Bedroom Home Value"}},{"values":{"city":{"value":{"type":"USD","Text":"505600"}},"neighborhood":{"value":{"type":"USD","Text":"599700"}},"nation":{"value":{"type":"USD","Text":"169300"}}},"name":{"Text":"Median 3-Bedroom Home Value"}},{"values":{"city":{"value":{"type":"USD","Text":"670900"}},"neighborhood":{"value":{"type":"USD","Text":"670800"}},"nation":{"value":{"type":"USD","Text":"284300"}}},"name":{"Text":"Median 4-Bedroom Home Value"}},{"values":{"city":{"value":{"type":"percent","Text":"0.12"}},"neighborhood":{"value":{"type":"percent","Text":"0.14"}},"nation":{"value":{"type":"percent","Text":"0.276"}}},"name":{"Text":"Percent Homes Decreasing"}},{"values":{"city":{"value":{"type":"percent","Text":"0.333"}},"neighborhood":{"value":{"type":"percent","Text":"0.27"}},"nation":{"value":{"type":"percent","Text":"0.367"}}},"name":{"Text":"Percent Listing Price Reduction"}},{"values":{"city":{"value":{"type":"USD","Text":"360"}},"neighborhood":{"value":{"type":"USD","Text":"468"}},"nation":{"value":{"type":"USD","Text":"112"}}},"name":{"Text":"Median List Price Per Sq Ft"}},{"values":{"city":{"value":{"type":"USD","Text":"580000"}},"neighborhood":{"value":{"type":"USD","Text":"500000"}},"nation":{"value":{"type":"USD","Text":"215000"}}},"name":{"Text":"Median List Price"}},{"values":{"city":{"value":{"type":"USD","Text":"540400"}},"neighborhood":{"value":{"type":"USD","Text":"514800"}},"nation":{"value":{"type":"USD","Text":"215500"}}},"name":{"Text":"Median Sale Price"}},{"values":{"city":{"value":{"Text":"0"}},"neighborhood":{"value":{"Text":"0"}},"nation":{"value":{"Text":"0"}}},"name":{"Text":"Homes For Sale"}},{"values":{"city":{"value":{"Text":"0"}},"neighborhood":{"value":{"Text":"0"}},"nation":{"value":{"Text":"0"}}},"name":{"Text":"Homes Recently Sold"}},{"values":{"city":{"value":{"type":"USD","Text":"3422"}},"neighborhood":{"value":{"type":"USD","Text":"2581"}},"nation":{"value":{"type":"USD","Text":"2081"}}},"name":{"Text":"Property Tax"}},{"values":{"city":{"value":{"type":"percent","Text":"0.045"}},"neighborhood":{"value":{"type":"percent","Text":"0.042"}},"nation":{"value":{"type":"percent","Text":"0.04"}}},"name":{"Text":"Turnover (Sold Within Last Yr.)"}},{"values":{"city":{"value":{"type":"USD","Text":"371"}},"neighborhood":{"value":{"type":"USD","Text":"395"}},"nation":{"value":{"type":"USD","Text":"120"}}},"name":{"Text":"Median Value Per Sq Ft"}},{"values":{"city":{"value":{"type":"percent","Text":"0.111"}},"neighborhood":{"value":{"type":"percent","Text":"0.107"}},"nation":{"value":{"type":"percent","Text":"0.066"}}},"name":{"Text":"1-Yr. Change"}},{"values":{"city":{"value":{}},"neighborhood":{"value":{}},"nation":{"value":{}}},"name":{"Text":"Homes For Sale By Owner"}},{"values":{"city":{"value":{}},"neighborhood":{"value":{}},"nation":{"value":{}}},"name":{"Text":"New Construction"}},{"values":{"city":{"value":{}},"neighborhood":{"value":{}},"nation":{"value":{}}},"name":{"Text":"Foreclosures"}}]},"name":{"Text":"Affordability Data"}}}},{"name":{"Text":"Homes & Real Estate"},"tables":{"table":[{"data":{"attribute":[{"values":{"city":{"value":{"type":"percent","Text":"0.38564544"}},"neighborhood":{"value":{"type":"percent","Text":"0.34724894"}},"nation":{"value":{"type":"percent","Text":"0.66268764"}}},"name":{"Text":"Owners"}},{"values":{"city":{"value":{"type":"percent","Text":"0.61435456"}},"neighborhood":{"value":{"type":"percent","Text":"0.65275106"}},"nation":{"value":{"type":"percent","Text":"0.33731236"}}},"name":{"Text":"Renters"}},{"values":{"city":{"value":{"Text":"1586"}},"neighborhood":{"value":{"Text":"1296"}}},"name":{"Text":"Median Home Size (Sq. Ft.)"}},{"values":{"city":{"value":{"Text":"1952"}},"neighborhood":{"value":{"Text":"1923"}}},"name":{"Text":"Avg. Year Built"}},{"values":{"city":{"value":{"type":"percent","Text":"0.6296068291882"}},"neighborhood":{"value":{"type":"percent","Text":"0.6764875794338"}}},"name":{"Text":"Single-Family Homes"}},{"values":{"city":{"value":{"type":"percent","Text":"0.1751662152179"}},"neighborhood":{"value":{"type":"percent","Text":"0.0399768919699"}}},"name":{"Text":"Condos"}}]},"name":{"Text":"Homes & Real Estate Data"}},{"data":{"attribute":[{"value":{"type":"percent","Text":"0.0142418661755"},"name":{"Text":"<1900"}},{"value":{"type":"percent","Text":"0.0114180478821"},"name":{"Text":">2000"}},{"value":{"type":"percent","Text":"0.2570902394106"},"name":{"Text":"1900-1919"}},{"value":{"type":"percent","Text":"0.424554941682"},"name":{"Text":"1920-1939"}},{"value":{"type":"percent","Text":"0.1170042971147"},"name":{"Text":"1940-1959"}},{"value":{"type":"percent","Text":"0.1263351749539"},"name":{"Text":"1960-1979"}},{"value":{"type":"percent","Text":"0.0493554327808"},"name":{"Text":"1980-1999"}}]},"name":{"Text":"BuiltYear"}},{"data":{"attribute":[{"value":{"type":"percent","Text":"0.2721222578259"},"name":{"Text":"<1000sqft"}},{"value":{"type":"percent","Text":"0.0454769534138"},"name":{"Text":">3600sqft"}},{"value":{"type":"percent","Text":"0.2959083066305"},"name":{"Text":"1000-1400sqft"}},{"value":{"type":"percent","Text":"0.1727877742174"},"name":{"Text":"1400-1800sqft"}},{"value":{"type":"percent","Text":"0.1249691890559"},"name":{"Text":"1800-2400sqft"}},{"value":{"type":"percent","Text":"0.0743159970421"},"name":{"Text":"2400-3600sqft"}}]},"name":{"Text":"Census Summary-HomeSize"}},{"data":{"attribute":[{"value":{"type":"percent","Text":"0.0399768919699"},"name":{"Text":"Condo"}},{"value":{"type":"percent","Text":"0.2835355285961"},"name":{"Text":"Other"}},{"value":{"type":"percent","Text":"0.6764875794338"},"name":{"Text":"SingleFamily"}}]},"name":{"Text":"Census Summary-HomeType"}},{"data":{"attribute":[{"value":{"type":"percent","Text":"0.34724894"},"name":{"Text":"Own"}},{"value":{"type":"percent","Text":"0.65275106"},"name":{"Text":"Rent"}}]},"name":{"Text":"Census Summary-Occupancy"}}]}},{"segmentation":{"liveshere":[{"description":{"Text":"Born outside the U.S., they have moved to the U.S. and live in the city. Wide age range. Some have a high school or college education, and they work in a variety of occupations."},"title":{"Text":"Foreign-born Urbanites"},"name":{"Text":"Foreign-born individuals who live in city."}},{"description":{"Text":"Mixed educational status with some having a high school education and some college. Combined income low-to-moderate."},"title":{"Text":"Stretched Budgets"},"name":{"Text":"Lower-scale urban couples with children."}},{"description":{"Text":"Pre-middle-age to middle-age singles with upper-scale incomes. May or may not own their own home. Most have college educations and are employed in mid-management professions."},"title":{"Text":"Makin' It Singles"},"name":{"Text":"Upper-scale urban singles."}}]},"uniqueness":{"category":[{"type":"Education","characteristic":{"Text":"Did not complete high school"}},{"type":"Employment","characteristic":[{"Text":"Work in construction and extraction occupations"},{"Text":"Work in personal care and service occupations"},{"Text":"Work in production occupations"}]},{"type":"People & Culture","characteristic":[{"Text":"Not U.S. citizens"},{"Text":"Separated females"},{"Text":"Single females"},{"Text":"Single males"},{"Text":"Speak Spanish or Spanish Creole"}]},{"type":"Transportation","characteristic":[{"Text":"Carpool to work"},{"Text":"Get to work by bus"}]}]},"name":{"Text":"People"},"tables":{"table":[{"data":{"attribute":[{"values":{"city":{"value":{"currency":"USD","Text":"36687"}},"neighborhood":{"value":{"currency":"USD","Text":"34791.3972980957"}},"nation":{"value":{"currency":"USD","Text":"44512.0130806292"}}},"name":{"Text":"Median Household Income"}},{"values":{"city":{"value":{"type":"percent","Text":"0.202873449846198"}},"neighborhood":{"value":{"type":"percent","Text":"0.201457805106603"}},"nation":{"value":{"type":"percent","Text":"0.146462187349365"}}},"name":{"Text":"Single Males"}},{"values":{"city":{"value":{"type":"percent","Text":"0.168171518410535"}},"neighborhood":{"value":{"type":"percent","Text":"0.175584818056711"}},"nation":{"value":{"type":"percent","Text":"0.124578258618535"}}},"name":{"Text":"Single Females"}},{"values":{"city":{"value":{"Text":"33"}},"neighborhood":{"value":{"Text":"31"}},"nation":{"value":{"Text":"36"}}},"name":{"Text":"Median Age"}},{"values":{"city":{"value":{"type":"percent","Text":"0.323370742333792"}},"neighborhood":{"value":{"type":"percent","Text":"0.392563567005895"}},"nation":{"value":{"type":"percent","Text":"0.313623902816284"}}},"name":{"Text":"Homes With Kids"}},{"values":{"city":{"value":{"Text":"2.83"}},"neighborhood":{"value":{"Text":"3.12509169641722"}},"nation":{"value":{"Text":"2.58883240001203"}}},"name":{"Text":"Average Household Size"}},{"values":{"city":{"value":{"Text":"30.50620080937762"}},"neighborhood":{"value":{"Text":"33.12401815367537"}},"nation":{"value":{"Text":"26.375545725891282"}}},"name":{"Text":"Average Commute Time (Minutes)"}}]},"name":{"Text":"People Data"}},{"data":{"attribute":[{"value":{"type":"percent","Text":"0.046518409059168"},"name":{"Text":">=70s"}},{"value":{"type":"percent","Text":"0.194359506273126"},"name":{"Text":"0s"}},{"value":{"type":"percent","Text":"0.14456236096734"},"name":{"Text":"10s"}},{"value":{"type":"percent","Text":"0.17307610334621"},"name":{"Text":"20s"}},{"value":{"type":"percent","Text":"0.170846521112171"},"name":{"Text":"30s"}},{"value":{"type":"percent","Text":"0.126503839978541"},"name":{"Text":"40s"}},{"value":{"type":"percent","Text":"0.0880524181936073"},"name":{"Text":"50s"}},{"value":{"type":"percent","Text":"0.0560808410698363"},"name":{"Text":"60s"}}]},"name":{"Text":"Census Summary-AgeDecade"}},{"data":{"attribute":[{"value":{"type":"percent","Text":"0.0450672877329415"},"name":{"Text":"<10min"}},{"value":{"type":"percent","Text":"0.121051651493561"},"name":{"Text":">=60min"}},{"value":{"type":"percent","Text":"0.22959738423589"},"name":{"Text":"10-20min"}},{"value":{"type":"percent","Text":"0.186747291257352"},"name":{"Text":"20-30min"}},{"value":{"type":"percent","Text":"0.244821023256296"},"name":{"Text":"30-45min"}},{"value":{"type":"percent","Text":"0.172715362023959"},"name":{"Text":"45-60min"}}]},"name":{"Text":"Census Summary-CommuteTime"}},{"data":{"attribute":[{"value":{"type":"percent","Text":"0.607436432994105"},"name":{"Text":"NoKids"}},{"value":{"type":"percent","Text":"0.392563567005895"},"name":{"Text":"WithKids"}}]},"name":{"Text":"Census Summary-Household"}},{"data":{"attribute":[{"value":{"type":"percent","Text":"0.0599989185393609"},"name":{"Text":"Divorced-Female"}},{"value":{"type":"percent","Text":"0.0249471301888779"},"name":{"Text":"Divorced-Male"}},{"value":{"type":"percent","Text":"0.247580088008653"},"name":{"Text":"Married-Female"}},{"value":{"type":"percent","Text":"0.245740837928742"},"name":{"Text":"Married-Male"}},{"value":{"type":"percent","Text":"0.175584818056711"},"name":{"Text":"Single-Female"}},{"value":{"type":"percent","Text":"0.201457805106603"},"name":{"Text":"Single-Male"}},{"value":{"type":"percent","Text":"0.0353835129791575"},"name":{"Text":"Widowed-Female"}},{"value":{"type":"percent","Text":"0.00930688919189388"},"name":{"Text":"Widowed-Male"}}]},"name":{"Text":"Census Summary-RelationshipStatus"}}]}}]},"links":{"recentlySold":{"Text":"http://www.zillow.com/highland-park-los-angeles-ca/sold/"},"affordability":{"Text":"http://www.zillow.com/local-info/CA-Los-Angeles/Highland-Park-home-value/r_115609/"},"people":{"Text":"http://www.zillow.com/local-info/CA-Los-Angeles/Highland-Park-people/r_115609/"},"forSaleByOwner":{"Text":"http://www.zillow.com/highland-park-los-angeles-ca/fsbo/"},"foreclosures":{"Text":"http://www.zillow.com/highland-park-los-angeles-ca/pmf_pt/"},"homesandrealestate":{"Text":"http://www.zillow.com/local-info/CA-Los-Angeles/Highland-Park-homes/r_115609/"},"main":{"Text":"http://www.zillow.com/highland-park-los-angeles-ca/"},"forSale":{"Text":"http://www.zillow.com/highland-park-los-angeles-ca/"}},"charts":{"chart":[{"url":{"Text":"http://www.zillow.com/app?chartType=affordability_avgCondoValue&graphType=barChart&regionId=115609&regionType=8&service=chart"},"name":{"Text":"Median Condo Value"}},{"url":{"Text":"http://www.zillow.com/app?chartType=affordability_avgHomeValue&graphType=barChart&regionId=115609&regionType=8&service=chart"},"name":{"Text":"Median Home Value"}},{"url":{"Text":"http://www.zillow.com/app?chartType=affordability_pricePerSqft&graphType=barChart&regionId=115609&regionType=8&service=chart"},"name":{"Text":"Dollars Per Square Feet"}},{"url":{"Text":"http://www.zillow.com/app?chartType=affordability_ZindexByDistribution&graphType=barChart&regionId=115609&regionType=8&service=chart"},"name":{"deprecated":"true","Text":"Zillow Home Value Index Distribution"}},{"url":{"Text":"http://www.zillow.com/app?chartType=home_homeType&graphType=barChart&regionId=115609&regionType=8&service=chart"},"name":{"Text":"Home Type"}},{"url":{"Text":"http://www.zillow.com/app?chartType=home_ownVsRent&graphType=barChart&regionId=115609&regionType=8&service=chart"},"name":{"deprecated":"true","Text":"Owners vs. Renters"}},{"url":{"Text":"http://www.zillow.com/app?chartType=home_homeSize&graphType=barChart&regionId=115609&regionType=8&service=chart"},"name":{"Text":"Home Size in Square Feet"}},{"url":{"Text":"http://www.zillow.com/app?chartType=home_yearBuilt&graphType=barChart&regionId=115609&regionType=8&service=chart"},"name":{"Text":"Year Built"}}]}},"message":{"text":{"Text":"Request successfully processed"},"code":{"Text":"0"}},"xsi":"urn:x-prefix:xsi"}}]}
	  ; var mm = function(){try{return r.avm        .stat       .autoEst   ||""                                                                       }catch(e){Logger.log("Error 6IFZM: "+e.message);return ""}}()
	  ; var ms = function(){try{return r.avm        .stat       .sdPop     ||""                                                                       }catch(e){Logger.log("Error v2AC6: "+e.message);return ""}}()
	  ; var ml = function(){try{return mm?mm-(ms*S)                          :0                                                                       }catch(e){Logger.log("Error 7EWoH: "+e.message);return ""}}()
	  ; var mh = function(){try{return mm?parseInt(mm,10)+parseInt((ms*S),10):0                                                                       }catch(e){Logger.log("Error ERHP9: "+e.message);return ""}}()
   /* ; var cm = function(){try{return r.avm.dataset.coreLogic  .estimate  ||""                                                                       }catch(e){Logger.log("Error xVAOQ: "+e.message);return ""}}()
	  ; var cl = function(){try{return r.avm.dataset.coreLogic  .low       ||""                                                                       }catch(e){Logger.log("Error t5k3Z: "+e.message);return ""}}()
	  ; var ch = function(){try{return r.avm.dataset.coreLogic  .high      ||""                                                                       }catch(e){Logger.log("Error EXfdr: "+e.message);return ""}}()
   */ ; var hm = function(){try{return r.avm.dataset.homeSnap   .estimate  ||""                                                                       }catch(e){Logger.log("Error qVABg: "+e.message);return ""}}()
	  ; var hl = function(){try{return r.avm.dataset.homeSnap   .low       ||""                                                                       }catch(e){Logger.log("Error ZdpHe: "+e.message);return ""}}()
	  ; var hh = function(){try{return r.avm.dataset.homeSnap   .high      ||""                                                                       }catch(e){Logger.log("Error wiX2M: "+e.message);return ""}}()
	  ; var zm = function(){try{return r.avm.dataset.zillow     .estimate  ||""                                                                       }catch(e){Logger.log("Error JrExi: "+e.message);return ""}}()
	  ; var zl = function(){try{return r.avm.dataset.zillow     .searchresults.response.results.result.zestimate.valuationRange.low .Text   ||""      }catch(e){Logger.log("Error 6LjHK: "+e.message);return ""}}()
	  ; var zh = function(){try{return r.avm.dataset.zillow     .searchresults.response.results.result.zestimate.valuationRange.high.Text   ||""      }catch(e){Logger.log("Error zihkV: "+e.message);return ""}}()
	  ; var tm = function(){try{return r.avm.dataset.trulia     .estimate  ||""                                                                       }catch(e){Logger.log("Error Xnf6f: "+e.message);return ""}}()
	  ; var tl = function(){try{return tm?tm-(ms*R)                          :0                                                                       }catch(e){Logger.log("Error IDXaJ: "+e.message);return ""}}()
	  ; var th = function(){try{return tm?parseInt(tm,10)+parseInt((ms*R),10):0                                                                       }catch(e){Logger.log("Error D0e0k: "+e.message);return ""}}()
	  ; var dm = function(){try{return r.avm.dataset.dataQuick  .estimate  ||""                                                                       }catch(e){Logger.log("Error 7iaOo: "+e.message);return ""}}()
	  ; var dl = function(){try{return r.avm.dataset.dataQuick  .low       ||""                                                                       }catch(e){Logger.log("Error jriDA: "+e.message);return ""}}()
	  ; var dh = function(){try{return r.avm.dataset.dataQuick  .high      ||""                                                                       }catch(e){Logger.log("Error htoor: "+e.message);return ""}}()
	  ; var sm = function(){try{return r.avm.dataset.smartZip   .estimate  ||""                                                                       }catch(e){Logger.log("Error 2MX31: "+e.message);return ""}}()
	  ; var sl = function(){try{return r.avm.dataset.smartZip   .low       ||""                                                                       }catch(e){Logger.log("Error Oon3k: "+e.message);return ""}}()
	  ; var sh = function(){try{return r.avm.dataset.smartZip   .high      ||""                                                                       }catch(e){Logger.log("Error efya2: "+e.message);return ""}}()
	  ; var em = function(){try{return r.avm.dataset.eppraisal  .estimate  ||""                                                                       }catch(e){Logger.log("Error K5sfl: "+e.message);return ""}}()
	  ; var el = function(){try{return r.avm.dataset.eppraisal  .low       ||""                                                                       }catch(e){Logger.log("Error BzbEl: "+e.message);return ""}}()
	  ; var eh = function(){try{return r.avm.dataset.eppraisal  .high      ||""                                                                       }catch(e){Logger.log("Error r8wWb: "+e.message);return ""}}()
   /* ; var rm = function(){try{return r.avm.dataset.realEstate .estimate  ||""                                                                       }catch(e){Logger.log("Error DJXqn: "+e.message);return ""}}()
	  ; var rl = function(){try{return rm?rm-(ms*R)                          :0                                                                       }catch(e){Logger.log("Error Z3qAc: "+e.message);return ""}}()
	  ; var rh = function(){try{return rm?parseInt(rm,10)+parseInt((ms*R),10):0                                                                       }catch(e){Logger.log("Error YF4Ux: "+e.message);return ""}}()
   */ ; out.options=//{title:/*"Dashboard for "+*/function(){try{return r.address.full/*5115 Longfellow St, Los Angeles, CA 90042"*/                  }catch(e){Logger.log("Error KfpiD: "+e.message);return ob.addy}}()
	           /*,*/{isStacked:true,legend:{position:"none"/*"top"*/},series:{0:{"color":"transparent"},1:{"color":"#428bca"},2:{"color":"#428bca"}},intervals:{"lineWidth":1,"barWidth":0.7/*0.618="Golden Ratio"*/},theme:"maximized"}
	  ; out.dataValue = [ [              "Source"                    , "Estimate"      , "Low range"     , { role  : "style" }                               , "High range"    , { role  : "style" }                               ]
                     // , [              "Median"                    , 433844-110491   , 110491          , "stroke-width:1;stroke-color:white"               , 110491          , "stroke-width:1;stroke-color:white"               ]
                        , [              "Median"                    , ml /*mm-ms*/    , ms*S            , "stroke-width:1;stroke-color:white"               , ms*S            , "stroke-width:1;stroke-color:white"               ]
                     // , [ ob.showgate? "CoreLogic"  : "Estimate -" , cl              , cm    - cl      , "stroke-width:1;stroke-color:white;color:#cccccc" , ch    - cm      , "stroke-width:1;stroke-color:white;color:#cccccc" ] // CoreLogic must be added later after we figure out the scrape
                        , [ ob.showgate? "HomeSnap"   : "Estimate A" , hl              , hm    - hl      , "stroke-width:1;stroke-color:white;color:#cccccc" , hh    - hm      , "stroke-width:1;stroke-color:white;color:#cccccc" ]
                     // , [ ob.showgate? "Zillow"     : "Estimate -" , 597220          , 628653-597220   , "stroke-width:1;stroke-color:white;color:#cccccc" , 660086-628653   , "stroke-width:1;stroke-color:white;color:#cccccc" ]
                        , [ ob.showgate? "Zillow"     : "Estimate B" , zl              , zm    - zl      , "stroke-width:1;stroke-color:white;color:#cccccc" , zh    - zm      , "stroke-width:1;stroke-color:white;color:#cccccc" ]
                     // , [ ob.showgate? "Trulia"     : "Estimate -" , 509000-110491   , 110491          , "stroke-width:1;stroke-color:white;color:#cccccc" , 110491          , "stroke-width:1;stroke-color:white;color:#cccccc" ] // If no range, use populastion stdDev
                        , [ ob.showgate? "Trulia"     : "Estimate C" , tl /*tm-ms*/    , tm    - tl/*ms*/, "stroke-width:1;stroke-color:white;color:#cccccc" , th    - tm/*ms*/, "stroke-width:1;stroke-color:white;color:#cccccc" ] // If no range, use populastion stdDev
                     // , [ ob.showgate? "DataQuick"  : "Estimate -" , 396149          , 511356-396149   , "stroke-width:1;stroke-color:white;color:#cccccc" , 626562-511356   , "stroke-width:1;stroke-color:white;color:#cccccc" ]
                        , [ ob.showgate? "DataQuick"  : "Estimate D" , dl              , dm    - dl      , "stroke-width:1;stroke-color:white;color:#cccccc" , dh    - dm      , "stroke-width:1;stroke-color:white;color:#cccccc" ]
                     // , [ ob.showgate? "SmartZip"   : "Estimate -" , 300104          , 326200-300104   , "stroke-width:1;stroke-color:white;color:#cccccc" , 352296-326200   , "stroke-width:1;stroke-color:white;color:#cccccc" ]
                        , [ ob.showgate? "SmartZip"   : "Estimate E" , sl              , sm    - sl      , "stroke-width:1;stroke-color:white;color:#cccccc" , sh    - sm      , "stroke-width:1;stroke-color:white;color:#cccccc" ]
                     // , [ ob.showgate? "Eppraisal"  : "Estimate -" , 304884          , 358687-304884   , "stroke-width:1;stroke-color:white;color:#cccccc" , 412490-358687   , "stroke-width:1;stroke-color:white;color:#cccccc" ]
                        , [ ob.showgate? "Eppraisal"  : "Estimate F" , el              , em    - el      , "stroke-width:1;stroke-color:white;color:#cccccc" , eh    - em      , "stroke-width:1;stroke-color:white;color:#cccccc" ]
                     // , [ ob.showgate? "RealEstate" : "Estimate -" , 347631-110491   , 110491          , "stroke-width:1;stroke-color:white;color:#cccccc" , 110491          , "stroke-width:1;stroke-color:white;color:#cccccc" ]]// If no range, use populastion stdDev
                     // , [ ob.showgate? "RealEstate" : "Estimate -" , rl /*rm-ms*/    , rm    - rl/*ms*/, "stroke-width:1;stroke-color:white;color:#cccccc" , rh    - rm/*ms*/, "stroke-width:1;stroke-color:white;color:#cccccc" ]]// If no range, use populastion stdDev
     ]; out.dataTable = [ [              "Source"                    , "Estimate"      , "Low range"                                                         , "High range"                                                        ]
                     // , [              "Median"                    , 433844          , 433844-110491                                                       , 433844+110491                                                       ]
                        , [              "Median"                    , mm              , ml                                                                  , mh                                                                  ]
                     // , [ ob.showgate? "CoreLogic"  : "Estimate -" , cm              , cl  CoreLogic must be added later after we figure out the scrape    , ch                                                                  ]
                     // , [ ob.showgate? "Zillow"     : "Estimate -" , 628653          , 597220                                                              , 660086                                                              ]
                        , [ ob.showgate? "HomeSnap"   : "Estimate A" , hm              , hl                                                                  , hh                                                                  ]
                        , [ ob.showgate? "Zillow"     : "Estimate B" , zm              , zl                                                                  , zh                                                                  ]
                     // , [ ob.showgate? "Trulia"     : "Estimate -" , 509000          , 509000-110491                                                       , 509000+110491                                                       ] //,  "color : #428bca"  ] // If no range, use populastion stdDev
                        , [ ob.showgate? "Trulia"     : "Estimate C" , tm              , tl                                                                  , th                                                                  ] //,  "color : #428bca"  ] // If no range, use populastion stdDev
                     // , [ ob.showgate? "DataQuick"  : "Estimate -" , 511356          , 396149                                                              , 626562                                                              ] //,  "color : #428bca"  ] // Bootstrap Colors: @brand-primary:#428bca http://getbootstrap.com/customize/#less-variables
                        , [ ob.showgate? "DataQuick"  : "Estimate D" , dm              , dl                                                                  , dh                                                                  ] //,  "color : #428bca"  ]
                     // , [ ob.showgate? "SmartZip"   : "Estimate -" , 326200          , 300104                                                              , 352296                                                              ] //,  "color : #428bca"  ]
                        , [ ob.showgate? "SmartZip"   : "Estimate E" , sm              , sl                                                                  , sh                                                                  ] //,  "color : #428bca"  ]
                     // , [ ob.showgate? "Eppraisal"  : "Estimate -" , 358687          , 304884                                                              , 412490                                                              ] //,  "color : #428bca"  ]
                        , [ ob.showgate? "Eppraisal"  : "Estimate F" , em              , el                                                                  , eh                                                                  ] //,  "color : #428bca"  ]
                     // , [ ob.showgate? "RealEstate" : "Estimate -" , rm              , rl                                                                  , rh                                                                  ]]//,  "color : #428bca"  ] // If no range, use populastion stdDev
	 ]; out.dataAttr  = [ [ "Label"      , "Value"    /* Attributes */                                                                                                                                                                                                                                                                    ]
                     // , [ ob.showgate? "RealEstate" : "Estimate -" , 347631          , 347631-110491                                                       , 347631+110491                                                       ]]//,  "color : #428bca"  ] // If no range, use populastion stdDev
	                    , [ "Market"     , function(){try{var x = 10*n[0].mktHealth                                                                                                                                                     ;return LibraryjsUtil.isNumber(x)?x:0}catch(e){Logger.log("Error MSUNi: "+e.message);return 0}}()]
	                    , [ "Value"      , function(){try{var x = r.avm.dataset.homeSnap.homeScore                                                                                                                                      ;return LibraryjsUtil.isNumber(x)?x:0}catch(e){Logger.log("Error TaFxH: "+e.message);return 0}}()]
						, [ "Investor"   , function(){try{var x = r.avm.dataset.homeSnap.investorScore                                                                                                                                  ;return LibraryjsUtil.isNumber(x)?x:0}catch(e){Logger.log("Error PBGep: "+e.message);return 0}}()]
						, [ "Income"     , function(){try{var x = LibraryjsUtil.getIncomePercentile(n[1].demographics.response.pages.page[2].tables.table[0].data.attribute[0].values.neighborhood/*.city,.nation*/.value.Text)         ;return LibraryjsUtil.isNumber(x)?x:0}catch(e){Logger.log("Error i6C22: "+e.message);return 0}}()]
						, [ "Nhood"      , function(){try{var x = LibraryjsUtil.normalizeRatio(r.avm.dataset.zillow.estimate,n[0].indexSubject)                                                                                         ;return LibraryjsUtil.isNumber(x)?x:0}catch(e){Logger.log("Error A9MKD: "+e.message);return 0}}()]
						, [ "Forecl"     , function(){try{var x = LibraryjsUtil.normalizeRatio(n[0].fcVal0,n[0].fcVal2)                                                                                                                 ;return LibraryjsUtil.isNumber(x)?x:0}catch(e){Logger.log("Error SXBSp: "+e.message);return 0}}()]
						, [ "Section"    , function(){try{var x = LibraryjsUtil.percentile(n[0].indexSubject,function(){var out=[],i=10;while(i--){var str="nb"+i+"price";if(n[0][str]==1*n[0][str]){out.push(n[0][str])}}return out}());return LibraryjsUtil.isNumber(x)?x:0}catch(e){Logger.log("Error iN0xv: "+e.message);return 0}}()]
						]
	  ; out.link = populateLinks(r) //r.link; //linksPopulate() might be a more comprehensive method of collecting all the links than r.link. // Requires verification
	  ; out.fact = populateFacts(r)
	  ; out.avm  = r;
	if(ob.exit==1){LibraryjsUtil.dbParse({verb:"post",project:"argenta",className:"avmReport",ob:out});return out} // Called by Argenta™ main
    if(ob.exit==2){var exit2 = { avm_est        : mm , avm_high        : mh , avm_low        : ml
	                  //       , coreLogic_est  : cm , coreLogic_high  : ch , coreLogic_low  : cl
	                           , homeSnap_est   : hm , homeSnap_high   : hh , homeSnap_low   : hl
	                           , zillow_est     : zm , zillow_high     : zh , zillow_low     : zl
	                           , trulia_est     : tm , trulia_high     : th , trulia_low     : tl
		                       , dataQuick_est  : dm , dataQuick_high  : dh , dataQuick_low  : dl
	                           , smartZip_est   : sm , smartZip_high   : sh , smartZip_low   : sl
	                           , eppraisal_est  : em , eppraisal_high  : eh , eppraisal_low  : el
	                  //       , realEstate_est : rm , realEstate_high : rh , realEstate_low : rl
	                           } ,i=out.dataAttr.length;while(i---1){exit2[out.dataAttr[i][0]]=out.dataAttr[i][1].toString()}
						     var keys=Object.keys(out.link),j=keys.length;while(j--){                       exit2[keys[j]]=out["link"][keys[j]]}
						         keys=Object.keys(out.fact),j=keys.length;while(j--){                       exit2[keys[j]]=out["fact"][keys[j]]}
						         keys=Object.keys(exit2   ),j=keys.length;while(j--){if(exit2[keys[j]]==""){exit2[keys[j]]=null               }}
			    return exit2} // Called by DealDigger™ main
	return out} // function test(){Logger.log(JSON.stringify(avmReport("7318 S Dorchester Ave, Chicago IL",1)))} // 12420 SE 223rd Drive, Kent, WA 98031 // 2635 E 79th St, Chicago, IL 60619
function avmZipRealty(s){                     //  smartZip                               zillow                                 eppraisal
    var KEY = [ , "foo"                        , "A_estVal" , "A_estMin" , "A_estMax" , "B_estVal" , "B_estMin" , "B_estMax" , "C_estVal" , "C_estMin" , "C_estMax" ]//, "priceHistory" ]
      , QUE = [ , "avm-chart-series--resprice" , "<span"    , "<span"    , "<span"    , "<span"    , "<span"    , "<span"    , "<span"    , "<span"    , "<span"    ]//, "var data ="   ]
  	  , BEG = [ , ">"                          , ">"        , ">"        , ">"        , ">"        , ">"        , ">"        , ">"        , ">"        , ">"        ]//, " "            ]
	  , END = [ , ">"                          , "<"        , "<"        , "<"        , "<"        , "<"        , "<"        , "<"        , "<"        , "<"        ]//, ";"            ]
   // , DEL = [ , null   , null ]
   // , INS = [ , null   , null ]
      , str="http://www.ziprealty.com/property/home-value-estimates-submit?src=ss-lp-button-idx&address="+encodeURIComponent(s)//5008%20corson%20ave%20s%2C%20seattle%2C%20wa&"
      , act="http://www.ziprealty.com"+UrlFetchApp.fetch(str).getContentText()
      , res=UrlFetchApp.fetch(act).getContentText()
      , out=LibraryjsUtil._scrapeDataset(res,KEY,QUE,BEG,END/*,DEL,INS*/);
      delete out.foo;var n,keys=Object.keys(out),i=keys.length;while(i--){
          if(!(typeof out[keys[i]]=="string"&&out[keys[i]].charAt(0)=="$")){
              if(false){}//(keys[i]=="priceHistory"){out[keys[i]]=/*JSON.parse*/(out[keys[i]].replace(/(\s|\\)/gmi,""))}
              else{delete out[keys[i]]}continue}
          else{out[keys[i]]=out[keys[i]].replace("$","");n=out[keys[i]].charAt(out[keys[i]].length-1);out[keys[i]]=out[keys[i]].slice(0,-1);
                   if(n=="K"){out[keys[i]]*=   1000}
              else if(n=="M"){out[keys[i]]*=1000000}}}
    return out}//function test(){Logger.log/*print*/(JSON.stringify(avmZipRealty(/*"5008 corson ave s, seattle, wa"*/"5045 88th Ave SE, Mercer Island, WA 98040")))}
function avmRemax(addy){//@param{object} addy: str, city, state, zip // Value estimates per Homes.com
    var KEY = [ , "listingId" , "latitude" , "longitude" , "listingDetailUrl" , "valueSearchType" , "sa"                  , "city"              , "state"              , "zip"              , "lat"      , "lon"      , "estimate"                  , "bed"                 , "bath"                 , "sqft"                    ]
      , QUE = [ , "ListingID" , "Latitude" , "Longitude" , "ListingDetailURL" , "ValueSearchType" , "listing-card-street" , "listing-card-city" , "listing-card-state" , "listing-card-zip" , "data-lat" , "data-lon" , "listing-card-price-amount" , 'itemprop="BedRooms"' , 'itemprop="BathRooms"' , "listing-detail-sqft-val" ]
  	  , BEG = [ , ">"         , ">"        , ">"         , ">"                , ">"               , ">"                   , ">"                 , ">"                  , ">"                , '"'        , '"'        , ">"                         , ">"                   , ">"                    , ">"                       ]
	  , END = [ , "<"         , "<"        , "<"         , "<"                , "<"               , "<"                   , "<"                 , "<"                  , "<"                , '"'        , '"'        , "<"                         , "<"                   , "<"                    , "<"                       ]
   // , DEL = [ , null , null ]
   // , INS = [ , null , null ]
    ,out=[],act="http://www.remax.com/homevalues/"+addy.city.replace(" ","")+"-"+addy.state+"-p001.html?query=addr-"+encodeURIComponent(addy.str)//"http://www.remax.com/homevalues/seattle-wa-p001.html?query=addr-5008%20corson%20ave%20s,%20seattle,%20wa"
    ,ar=UrlFetchApp.fetch(act).getContentText().split("<article ");ar=ar.slice(1);i=ar/*.reverse()*/.length;while(i--){
        out[i]=LibraryjsUtil._scrapeDataset(ar[i],KEY,QUE,BEG,END/*,DEL,INS*/);
        out[i].sa   =LibraryjsUtil.str2caseTitle(out[i].sa   );
        out[i].city =LibraryjsUtil.str2caseTitle(out[i].city );
        out[i].state=LibraryjsUtil.str2caseTitle(out[i].state);
        }return out}//function test(){/*print*/Logger.log(avmRemax({str:"5008 corson ave s, seattle, wa",city:"seattle",state:"wa"}))}
