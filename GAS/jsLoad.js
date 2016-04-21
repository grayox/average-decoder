function enableRead(){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead")}catch(e){alert("UniversalBrowserRead failed")}} // Turn off “same origin policy” in Firefox // Google search: disable same origin policy explorer // Reference: http://romkey.com/2011/04/23/getting-around-same-origin-policy-in-web-browsers/
function load(client,jQuery){ // Returns array of URI strings of the JS files to be loaded based on “client” parameter.
	// Params: @client string — determines case/script list; @jQuery boolean — adds jQuery library if set to true (defaults to false);
	/* Library - keep minimized
		Short version
		https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/scrape.js
		https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/scrapeAuction.html
		https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/googSSdepr.js
		https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/googSSmain.js
		https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/googSSsub.js
		https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsAvm.js
		https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js
		https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsUtil.js
		https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsWrite.js
		Long version
		https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/scrape.js?attredirects=0&d=1
		https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/scrapeAuction.html?attredirects=0&d=1
		https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/googSSdepr.js?attredirects=0&d=1
		https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/googSSmain.js?attredirects=0&d=1
		https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/googSSsub.js?attredirects=0&d=1
		https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsAvm.js?attredirects=0&d=1
		https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js?attredirects=0&d=1
		https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsUtil.js?attredirects=0&d=1
		https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsWrite.js?attredirects=0&d=1
	*/
	/* Deprecate - keep minimized - Deprecated before 5/14/2013
		case "googleScripts":{
			{// JavaScript // Add the following code at the top of each project/file to load the following files.
			//	Load JavaScript library
			//	var CLIENT = "googleScripts";
			//  var LOAD   = "https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js?attredirects=0&d=1";
			//	eval(UrlFetchApp.fetch( LOAD ).getContentText()); // Loads master file containing array of URI strings
			//	var files  = load(CLIENT); // Fetches array of URIs representing JS files library to load per the “client”
			//	var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())} // Evaluates code at each array element, URI.
			}
		//  files[0] = "https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/googSSmain.js?attredirects=0&d=1";
			files[1] = "https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/googSSsub.js?attredirects=0&d=1";
			files[2] = "https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsUtil.js?attredirects=0&d=1";
			files[3] = "https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsAvm.js?attredirects=0&d=1";
			files[4] = "https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsWrite.js?attredirects=0&d=1";
			break;}
		case "browser":{
		//	files[0] = "";
			files[1] = "https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/googSSmain.js?attredirects=0&d=1";
			files[2] = "https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsUtil.js?attredirects=0&d=1";
			files[3] = "https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsAvm.js?attredirects=0&d=1";
			files[4] = "https://www.sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsWrite.js?attredirects=0&d=1";
			break;}
	*/
	/* Deprecate - keep minimized - Deprecated on     5/14/2013
	{// JavaScript // load library // Add the following code at the top of each project/file to load the following files.
			var LOAD = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];
			eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]); // Load master file containing array of URI strings // Fetch array of URIs representing JS files library to load per the “client”
			var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())}} // Evaluates code at each array element, URI.*/
	/* Note - Migrate Google UI service to HTML service to build user interfaces. Reference: http://www.googblogs.com/tag/apps-script/ */
	/* Instructions - added 5/14/2013 to replace deprecated instructions
		1. Open GAS script page (i.e., hosted on Google's servers) containing the main scripts of the function (e.g., doGet(),doPost(),et.al.,etc.)
		2. Add the following function at the top level: >>> function loadLibrary(client){var i,r,cArr,contents="",c=CacheService.getPublicCache(),cache=c.get(client);if(cache){cArr=cache.split(","),i=cArr.length;while(i--){r=c.get(cArr[i]);contents+=r;c.put(cArr[i],r,21600);}}else{var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js",client];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);i=files.length;while(i--){r=UrlFetchApp.fetch(files[i]).getContentText();contents+=r;c.put(files[i],r,21600);}c.put(client,files.toString(),21600);}return contents;}
		3. Inside the other functions on the main page, when needing to add utilities and specialized functions, etc., add a function call as follows:
			a. >>> eval(loadLibrary(<scriptName>)); <<<
				1. <scriptName> examples: "gasSalesPro", "gasDealDigger", "gasMojo", "gasLeadBank".
				2. So, an example of the above instruction example reads: >>> eval(loadLibrary("gasDealDigger")); <<<
			b. On a temporary basis, while phasing out the legacy/older code, add the following: //Deprecate:
				-  For example, the whole line now reads: eval(loadLibrary("gasDealDigger"));//Deprecate: var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---2){eval(UrlFetchApp.fetch(files[i]).getContentText())}
		4. Remember to CLEAR THE CACHE for immediate effect of coding changes. */
	var JQUERY = "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"; // jQuery // Find latest version at jquery.com
	var pick=[],arr=[],files=[
			// , "https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsJSON.js"                  // Keep this file commented out
			   , "https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/gasMain.js"         // [ 1] // Main function calls; can be subdivided to under 100MB limit for caching services
			   , "https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsUtil.js"          // [ 2] // General utilities
			   , "https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsAvm.js"           // [ 3] // Automated Valuation Models specific to DealDigger™ real estate
			   , "https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsWrite.js"         // [ 4] // Writing, mostly to spreadsheets
			   , "https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/scrape.js"          // [ 5] // iMacro scraping macros/scripts for auction.com
			   , "https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/gasSub.js"          // [ 6] // Sub-functions for spreadsheets
			   , "http://www.google.com/jsapi"                                                          // [ 7] // Javascript API for Google; used for browsers, not GAS
			   , "https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/gasMainSP.js"       // [ 8] // Sub-divided main function call — SalesPro™
			   , "https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/gasMainDD.js"       // [ 9] // Sub-divided main function call — DealDigger™
			   , "https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/gasMainOther.js"    // [10] // Sub-divided main function call — Other
			   , "https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/gasMainMojo.js"     // [11] // Sub-divided main function call — Mojo™     // Coming Soon!
			   , "https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/gasMainLB.js"    ]; // [12] // Sub-divided main function call — LeadBank™ // Coming Soon!
	switch(client){        // arr=[ 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12]
		case "googleScripts":{arr=[ 1, 2, 3, 4, 5, 6                  ];break;}
		case "browser"      :{arr=[ 1, 2, 3, 4, 5,    7               ];break;} // References // https://developers.google.com/chart/interactive/docs/gallery/controls#dashboardobject // https://developers.google.com/chart/interactive/docs/reference#dataparam
		case "gasSalesPro"  :{arr=[    2,                8            ];break;}
		case "gasDealDigger":{arr=[    2, 3,                9         ];break;}
		case "gasMojo"      :{arr=[    2,                        11   ];break;} // Coming Soon!
		case "gasLeadBank"  :{arr=[    2,                           12];break;} // Coming Soon!
		default             :{}}if(jQuery){pick.push(JQUERY)}i=arr.length;while(i--){pick.push(files[arr[i]])}return pick}