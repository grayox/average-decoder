/* This is now a lag copy. Live copy is at script URL (https://script.google.com/d/15PpDfeiia17tGTBpVNT3n68Y23KY58CgGayjNszrNpmLFi5X1ruH2UTf/edit) SalesPro� > gasMainSP.js
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
    //data = data.slice(-1);Logger.log(data);["salespro","Lead_USAcredit",FIELDS,data].writeToAPI_Zoho();}* /
    // var LOAD   = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())};
    // if(client==null){client="mojo";}if(act==null){act="www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-greenville-sc/?st=0";}
	var ob,db=ScriptDb.getMyDb(),d=new Date().getTime(),user=Session.getUser().getEmail(),data=UrlFetchApp.fetch(act).getContentText().split("addPoint");i=data.length; // Increment "st" by 30 // URL shortened from act="http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-greenville-sc/?distance=0&sort=&view=list&where=Greenville%2C+SC&st=30&pageset=1";
    while(i---1){ob=JSON.parse(decodeURIComponent(data[i].scrape("","(",");")[1].replace("{","{\"").replaceAll("+"," ").replaceAll("parseFloat(","").replaceAll("parseInt(","").replaceAll("\",","\",\"").replaceAll(":\"","\":\"").replaceAll("),","),\"").replaceAll("\"),","\",").replaceAll("\",\" ","\",\""))); // (Below) If query finds a duplicate, skip saving via continue
    if(db.query({id:ob.id,phone:ob.phone,table:"leads",client:client}).getSize()){continue;}else{ob.source="dex";ob.addedUser=user;ob.disposition="active";ob.table="leads";ob.url=act;ob.addedTime=d;ob.callback=d;db.save(ob);}}return [db.query({addedTime:ob.addedTime}).next().getId(),ob];} // Return [id,ob] // It is challenging to grab ob.id // db.query(ob) does not work; therefore, we query on ob.addedTime
Array.prototype.dexAddyJoin = function(){var out=clone(this);if(out.length>9){out[9]=out[9].join("=")}if(out.length>9){out[8]=out[8].join("-")}return out.join("/")} // Returns string from addy array // Example: "http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-greenville-sc/?st=60"
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
	else{* /addy[9][1]=parseInt(addy[9][1])+30;/*}WHEN OUT OF BETA/TEST, UNCOMMENT THIS SECTION* /// page++ (increment page)
	next=addy.dexAddyJoin();addy[9][1]=0;                                          // Construct URL // Reset page in case we need to increment city
	while(!(/class=\"results\"/i.test(UrlFetchApp.fetch(next).getContentText()))){ // While no city data
		addy[8][1]=addy[8][2].dexCityNext(addy[8][1]);                             // city++ (increment city)
		if(!addy[8][1]){addy[8][2]=stateFetch(addy[8][2]);addy[8][1]=addy[8][2].dexCityNext();} // If no city, fetch new state, fetch new city
		next=addy.dexAddyJoin();}                                                  // Construct URL to try again
	return next}
function DST(){ // Boolean � true if DST (Daylight Savings Time) // Reference: http://www.mresoftware.com/simpleDST.htm
	var today = new Date;
	var yr = today.getFullYear();
	var dst_start = new Date("March 14, "+yr+" 02:00:00"); // 2nd Sunday in March can't occur after the 14th 
	var dst_end = new Date("November 07, "+yr+" 02:00:00"); // 1st Sunday in November can't occur after the 7th
	var day = dst_start.getDay(); // day of week of 14th
	dst_start.setDate(14-day); // Calculate 2nd Sunday in March of this year
	day = dst_end.getDay(); // day of the week of 7th
	dst_end.setDate(7-day); // Calculate first Sunday in November of this year
	return (today >= dst_start && today < dst_end)} //does today fall inside of DST period? // Return accordingly
function salesRegions(){return [,/*1* /"California",/*2* /"West",/*3* /"Midwest",/*4* /"Texas",/*5* /"South",/*6* /"Atlantic",/*7* /"East",/*8* /"North"]} // Returns array of region names in position of their region number // Documents // Map https://docs.google.com/drawings/d/1psVkX2kzru26B2ohPMfSAk11cjL0b4irKdl_G_Gqo2U/edit // Spreadsheet https://docs.google.com/spreadsheet/ccc?key=0AlLVOoV_2dFtdFptbDZiaFhobXJSXzdiSkl4UEd2WGc#gid=0
String.prototype.getState = function(j){var r=stateData(),i=r[3].length;while(i--){if(r[3][i]==this.toLowerCase()){return r[j][i]}}} // this str state abbr, j int dataset, return j=2:name,j=4:timezone,j=5:region,j=6:population // see stateData() // Example: "nc".getState(5)=6 , the region number
function statesInReg(x){var /*x=this,* /out=[],r=stateData(),i=r[5].length;while(i--){if(x==r[5][i]){out.push(r[3][i].toUpperCase())}}return out} // Given region number, return array of state (abbreviations) in that region
function stateData(){return [ // Returns array: [0-NULL, 1-"go codes" (i.e, whether we call that state), 2-name, 3-abbreviation, 4-time zones, 5-region, 6-population]
    /*0* /	//	0         1        2                3         4          5            6          7             8          9                      10        11        12     13       14      15         16        17      18       19         20          21      22         23              24         25          26            27         28        29         30       31              32           33           34         35               36             37                          38       39         40       41             42            43             44               45             46          47       48      49        50               51         52           53              54          55            // [0] Null
    /*1* /	, 	[true     ,true    ,false           ,true     ,true      ,true        ,true      ,true         ,true      ,true                  ,true     ,true     ,false ,true    ,true   ,true      ,true     ,true   ,true    ,true      ,true       ,true   ,true      ,true           ,true      ,true       ,true         ,true      ,true     ,true      ,true    ,true           ,true        ,true        ,true      ,true            ,true          ,false                      ,true    ,true      ,true    ,true          ,false        ,true          ,true            ,true          ,true       ,true    ,true   ,true     ,false           ,true      ,true        ,true           ,true       ,true     ]   // [1] Boolean true if we will call that state
    /*2* /	, 	["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa" ,"Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Marianas Islands","Ohio"  ,"Oklahoma","Oregon","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas" ,"Utah" ,"Vermont","Virgin Islands","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]   // [2] State name
    /*3* /	, 	["al"     ,"ak"    ,"as"            ,"az"     ,"ar"      ,"ca"        ,"co"      ,"ct"         ,"de"      ,"dc"                  ,"fl"     ,"ga"     ,"gu"  ,"hi"    ,"id"   ,"il"      ,"in"     ,"ia"   ,"ks"    ,"ky"      ,"la"       ,"me"   ,"md"      ,"ma"           ,"mi"      ,"mn"       ,"ms"         ,"mo"      ,"mt"     ,"ne"      ,"nv"    ,"nh"           ,"nj"        ,"nm"        ,"ny"      ,"nc"            ,"nd"          ,"mp"                       ,"oh"    ,"ok"      ,"or"    ,"pa"          ,"pr"         ,"ri"          ,"sc"            ,"sd"          ,"tn"       ,"tx"    ,"ut"   ,"vt"     ,"vi"            ,"va"      ,"wa"        ,"wv"           ,"wi"       ,"wy"     ]   // [3] State abbreviation
    /*4* /	, 	[-5       ,-9      ,-11             ,-7       ,-6        ,-8          ,-7        ,-5           ,-5        ,-5                    ,-5       ,-5       ,10    ,-10     ,-7     ,-6        ,-5       ,-6     ,-6      ,-6        ,-6         ,-5     ,-5        ,-5             ,-5        ,-6         ,-6           ,-6        ,-7       ,-6        ,-8      ,-5             ,-5          ,-7          ,-5        ,-5              ,-6            ,10                         ,-5      ,-6        ,-8      ,-5            ,-4           ,-5            ,-5              ,-7            ,-6         ,-6      ,-7     ,-5       ,-4              ,-5        ,-8          ,-5             ,-6         ,-7       ]   // [4] Time zone
	/*5* /	, 	[5        ,2       ,8               ,2        ,4         ,1           ,2         ,8            ,7         ,7                     ,6        ,6        ,8     ,3       ,2      ,3         ,5        ,3      ,4       ,5         ,5          ,8      ,7         ,8              ,3         ,3          ,5            ,5         ,2        ,2         ,2       ,8              ,8           ,2           ,8         ,6               ,2             ,8                          ,7       ,4         ,2       ,7             ,4            ,8             ,6               ,2             ,5          ,4       ,2      ,8        ,8               ,7         ,2           ,5              ,3          ,2        ]   // [5] U.S. Sales Regions
	/*6* /	, 	[4779736  ,710231  ,55519           ,6392017  ,2915918   ,37253956    ,5029196   ,3574097      ,897934    ,601723                ,18801310 ,9687653  ,159358,1360301 ,1567582,12830632  ,6483802  ,3046355,2853118 ,4339367   ,4533372    ,1328361,5773552   ,6547629        ,9883640   ,5303925    ,2967297      ,5988927   ,989415   ,1826341   ,2700551 ,1316470        ,8791894     ,2059179     ,19378102  ,9535483         ,672591        ,53883                      ,11536504,3751351   ,3831074 ,12702379      ,3725789      ,1052567       ,4625364         ,814180        ,6346105    ,25145561,2763885,625741   ,106405          ,8001024   ,6724540     ,1852994        ,5686986    ,563626   ]]} // [6] Population data per 4/1/2010 http://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_population
function callHours(){return /*[9,10,14,15,16,17]* /[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]} // Call windows:9-11am,2-6pm // Return array representing call hour windows
function stateFetch(prev){var x=prev.stateRegion(),r=stateData(),i=r[3].length;while(i--){if((x==r[3][i].stateRegion())&&r[3][i].stateTestHr()&&r[3][i].stateTestGo()){return r[3][i]}}return false} // Select state to dial based on region matchup + Time Zone + best times to call // prev: abbreviation of current state
function givenRegionSelectStateAbbr(rNum){var r=stateData(),i=Math.floor((Math.random()*r[1].length));while(!(r[1][i]&&(rNum==r[5][i]))){if(!i){i=(r[1].length-1)}else{i--}}return r[3][i]} // Returns a randomly selected STATE abbreviation given a REGION number
function givenStateAbbrGetRandomCity(st){var r=st.dexCityList(),i=0/*Math.floor((Math.random()*r[1].length))* /;return r[i];} // Returns a randomly selected CITY given a STATE abbreviation // Note: For now, "random" is first element [0] � because dexCityList() does not "wrap" after last element is reached
String.prototype.stateTestHr = function(){var r=stateData(),s=this.toString().toLowerCase();return ((callHours().indexOf(new Date().getUTCHours()+DST()+r[4][r[3].indexOf(s)]))>=0)} // Boolean � given state abbreviation, return boolean representing whether it is calling hours in that state
String.prototype.stateTestGo = function(){var r=stateData(),s=this.toString().toLowerCase();return r[1][r[3].indexOf(s)]} // Boolean � given state abbreviation, return boolean representing whether we call in that state // Mainly to skip calling U.S. non-state territories
String.prototype.stateRegion = function(){var r=stateData(),s=this.toString().toLowerCase();return r[5][r[3].indexOf(s)]} // Returns region number of this string - state abbreviation
*/