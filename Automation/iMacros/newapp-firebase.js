// This file controls all macros necessary to setup user auth and login credentials for new app on Firebase.
// Auth vendors include Google, Facebook and Twitter.
// https://firebase.google.com/docs/auth/#key_functions

// References:
// http://wiki.imacros.net/iMacros_for_Firefox#Javascript_Scripting_Interface
// http://wiki.imacros.net/FAQ#Q:_Can_a_macro_start_another_macro.3F
// http://wiki.imacros.net/FAQ#Q:_How_to_pass_values_from_one_macro_to_the_next.3F
// http://forum.imacros.net/viewtopic.php?f=11&t=6412 // iimPlay() function to run another macro?
// http://forum.imacros.net/viewtopic.php?f=11&t=5897 // Passing Arguments to Sub Scripts
// http://forum.imacros.net/viewtopic.php?f=2&t=11828&p=35476#p35476 // Passing Arguments to Sub Scripts
// http://forum.imacros.net/viewtopic.php?f=11&t=4509&p=12248 // Variables set with iimSet lose values after next iimPlay?

/** /
Reading local file to merge data with iMacros JavaScript
http://wiki.imacros.net/Form_Filling#Input_from_Comma_Separated_Data_.28CSV.29_File
http://wiki.imacros.net/Demo-Loop-Csv-2-Web
http://wiki.imacros.net/Demo-Datasource
http://wiki.imacros.net/!DATASOURCE
http://stackoverflow.com/a/14802171/1640892
http://stackoverflow.com/a/17615678/1640892
/**/

/**/
// Parameters
// In this section are static variables and arguments that won't typically change from project to project
// Start section
var       user2 = "brucepnolan"
,         email = "bruce.p.nolan@gmail.com"
,            p1 = "teleworm"
,            p2 = "tele1worm"
,        byWhom = "Codebase"
,    fileOld_fb = "fbidOld.txt"
,    fileNew_fb = "fbidNew.txt"
,   fileOld_api = "apikeyOld.txt"
,   fileNew_api = "apikeyNew.txt"
;

// Start Script

/**/
iimPlay("tab-close-all.iim");
/**/

// Load data source
var load,data,myFile="data.csv",myDir="/Users/atlasgroup/Dropbox/CodeBase/Automation/NewApp",
datsrc = [ myDir, myFile ].join("/");
load   =  "CODE:"; // Also copied to read-data.iim // Reference: http://stackoverflow.com/a/17615678/1640892
load  +=  "SET !DATASOURCE " + datsrc + "\n";
load  +=  "SET !DATASOURCE_LINE 2"    + "\n"; // {{!LOOP}}

// Extract data from arbitrary column of source
function getData(col){
  iimPlay(load + "SET !EXTRACT {{!COL" + col +"}}");
  return iimGetExtract();
}//alert(getData(6));

/**/
// Arguments
  // This section contains the values unique to the new app
  // Column order is set by GitNew.sh (/Users/atlasgroup/Dropbox/CodeBase/Automation/Shell/GitNew.sh)
	// Add one '1' to getData(x) because getData is one-indexed whereas VAL[x] is zero-indexed.
var     short = getData(1) // "ExpenseManager" // "Captiva" // "LeadBank" // Short version, no spaces
  ,      long = getData(2) // "Expense Manager" // "Captiva Markets" // "Lead Bank" // Long version
  ,       tag = getData(3) // "Managing Expenses" // "Template. Solved." // "Credit. Solved."
  ,     user1 = getData(5) // "Simplified expense tracking." // "maryranderson133" //  "clarencejvillegas" // gilliammaryw clarencejvillegas
  ,      fbpn = getData(6) // "Green Comet" // "Liberating Architect" // "Jessamy Aam" // Firebase project name
  , apikeyOld = getData(9) // "AIzaSyDTP-eiQezleFsV2WddFBAhF_WEzx_8v_g" // "AIzaSyDTP-eiQezleFsV2WddFBAhF_WEzx_8v_g" // Firebase API key
  ;


/**/
// Login
// Login to Google to enable automatic login to Firebase
iimPlay("google-logout.iim");
iimSet("u", user1);
iimSet("p", p1);
iimPlay("google-login.iim");
/**/

/**/
// Firebase
// Create new Firebase project
iimSet("app", fbpn.split(" ").join("<SP>"));
iimPlay("firebase-newapp.iim");
/**/
// Get Firebase ID
iimPlay("firebase-geturl.iim"); // Undeprecated 7/4/2016 // Deprecated 6/1/2016 in favor of grabbing URL from firebase-newapp.iim (read comments in that file) // Moving to new function produces null value for s
var s = iimGetExtract(1) //;alert(s); y(x);
  // Parse URL containing FBID
	//,	fbid = s.match(/project\/(.+)\/overview/)[1]; // Deprecated 7/4/2016 // Extracts jessamy-aam from: https://console.firebase.google.com/project/jessamy-aam/overview
    , fbid = s.match(/(.+)\.firebaseio\.com/)[1]; // Extracts jessamy-aam from: jessamy-aam.firebaseio.com
  // var fbid = "liberating-architect"; //alert(fbid); y(x);
/**/
//
// Write Firebase IDs to file
/**/
// Write new ID, extracted just above...
iimSet("data", fbid);
iimSet("folder", myDir);
iimSet("file", fileNew_fb);
iimSet("name", myDir + "/" + fileNew_fb);
iimPlay("write-to-file.iim");
// ...and prepare to replace old ID
iimSet("data", fbpn);
iimSet("folder", myDir);
iimSet("file", fileOld_fb);
iimSet("name", myDir + "/" + fileOld_fb);
iimPlay("write-to-file.iim");
/**/
//
/**/
// Get Firebase ID
iimSet("fbid", fbid); //iimSet("fbid", "green-comet");
iimPlay("firebase-getapikey.iim");
var t = iimGetExtract(1) // "foo"
	,	apikeyNew = t.match(/\"(.+)\"/)[1]; // foo
//alert(apikeyNew);
/**/
// Write Firebase API keys to file
/**/
// Write new API key, extracted just above...
iimSet("data", apikeyNew);
iimSet("folder", myDir);
iimSet("file", fileNew_api);
iimSet("name", myDir + "/" + fileNew_api);
iimPlay("write-to-file.iim");
/**/
// ...and prepare to replace old API key...
iimSet("data", apikeyOld);
iimSet("folder", myDir);
iimSet("file", fileOld_api);
iimSet("name", myDir + "/" + fileOld_api);
iimPlay("write-to-file.iim");
/**/

/**/
// In this section are computed values for variables
// Do not refactor or move this section because depends on valued collected via above subfunctions // fbid
// Start section
var        cr = {goog:{},face:{},twit:{}}
  ,   tagLine = tag.split(" ").join("<SP>")
  ,   byTitle = short + " by " + byWhom // Fixes Twitter error: "App name already in use."
  , byTitleSp = byTitle.split(" ").join("<SP>")
  ,  siteBase = "https://<FBID>.firebaseapp.com"
  ,   urlSite = siteBase.split("<FBID>").join(fbid)
  ,  callAuth = urlSite + "/__/auth/handler"
  ,  callBase = "https://auth.firebase.com/v2/<FBID>/auth/<VENDOR>/callback"
  ,   urlCall = callBase.split("<FBID>").join(fbid)
  ,   urlGoog = urlCall.split("<VENDOR>").join("google")
  ,   urlFace = urlCall.split("<VENDOR>").join("facebook")
  ,   urlTwit = urlCall.split("<VENDOR>").join("twitter")
  , fbConsole = "https://console.firebase.google.com/project/" + fbid + "/"
  ,    fbAuth = fbConsole + "authentication/providers" // https://console.firebase.google.com/project/torrid-inferno-5921/authentication/providers
  ,     fbSec = fbConsole + "database/rules" // https://console.firebase.google.com/project/liberating-architect/database/rules
  ;
// End section
/**/

// Begin deprecated
/** // DEPRECATED 6/24/2016 - Will deploy security rules at CLI using document seurity-rules.json // Event playback does not 'select all' if text dimensions change
// Firebase - security rules DEPRECATED 6/24/2016 - Will deploy security rules at CLI using document seurity-rules.json // Event playback does not 'select all' if text dimensions change
// ,secRules = '{"rules":{"users":{"$uid":{".read":"auth != null && auth.uid === $uid",".write":"auth != null && auth.uid === $uid"}},"widgets":{".read":true,".write":true}}}' // Firebase - security rules DEPRECATED 6/24/2016 - Will deploy security rules at CLI using document seurity-rules.json // Event playback does not 'select all' if text dimensions change
iimSet("uri", fbSec); // https://console.firebase.google.com/project/liberating-architect/database/rules
iimSet("rules", secRules);
iimPlay("firebase-security.iim");
/**/
// End deprecated

// Begin deprecated
/** // DEPRECATED 5/29/2016 - Firebase update eliminated need to independently setup Google
// Google - DEPRECATED 5/29/2016 - Firebase update eliminated need to independently setup Google
// https://firebase.google.com/docs/auth/web/google-signin
iimSet("app", short);
iimSet("project", fbid);
iimSet("callback1", urlGoog);
iimSet("callback2", callAuth);
iimPlay("google-credentials-set.iim");
iimPlay("google-credentials-get.iim");
cr.goog.id  = iimGetExtract(1);
cr.goog.sec = iimGetExtract(2);
//alert("cr.goog: " + JSON.stringify(cr.goog));
// Port Google credentials into Firebase
iimSet("id", cr.goog.id);
iimSet("secret", cr.goog.sec);
iimPlay("firebase-google.iim");
//iimPlay("google-logout.iim"); // Remain logged into Google to remain logged into Firebase; move logout to end of script;
/**/
// End deprecated

/**/
// Google
iimSet("uri", fbAuth);
iimPlay("firebase-google.iim");
/**/

/**/
// Facebook
// https://firebase.google.com/docs/auth/web/facebook-login
iimPlay("facebook-logout.iim");
iimSet("u", email);
iimSet("p", p1);
iimPlay("facebook-login.iim");
/**/
iimSet("app", short);
iimSet("email", email);
iimPlay("facebook-credentials-set.iim");
/**/
iimSet("app", short);
iimSet("p", p1);
iimPlay("facebook-credentials-get.iim");
cr.face.id   = iimGetExtract(1);
cr.face.sec  = iimGetExtract(2);
cr.face.base = "https://developers.facebook.com/sa/apps/" + cr.face.id + "/";
//alert("cr.face: " + JSON.stringify(cr.face));
/**/
// Set Facebook callback // http://stackoverflow.com/a/37449912/1640892
// Add
iimSet("uri", cr.face.base + "dashboard/"); // https://developers.facebook.com/apps/1730240533921828/dashboard/
iimPlay("facebook-callback-add.iim");
/**/
// Set
iimSet("uri", cr.face.base + "fb-login/"); // https://developers.facebook.com/sa/apps/1730240533921828/fb-login/
iimSet("callback", callAuth); // Replaces -> // iimSet("callback", urlFace); // https://auth.firebase.com/v2/torrid-inferno-5921/auth/facebook/callback // Changed with Firebase upgrade update 5/25/2016
iimPlay("facebook-callback-set.iim");
/**/
// Port Facebook credentials into Firebase
//alert(cr.face.id);
//alert(cr.face.sec);
iimSet("uri", fbAuth);
iimSet("id", cr.face.id);
iimSet("secret", cr.face.sec);
iimPlay("firebase-facebook.iim");
iimPlay("facebook-logout.iim");
/**/

/**/
// Twitter
// https://firebase.google.com/docs/auth/web/twitter-login
iimPlay("twitter-logout.iim");
iimSet("u", user2);
iimSet("p", p2);
iimPlay("twitter-login.iim");
/**/
iimSet("app", byTitle);
iimSet("tagline", tagLine);
iimSet("urlsite", urlSite);
iimSet("callback", callAuth); // Replaces -> // iimSet("callback", urlTwit);
iimPlay("twitter-credentials-set.iim");
/**/
iimSet("app", byTitleSp);
iimPlay("twitter-credentials-get.iim");
cr.twit.id  = iimGetExtract(1);
cr.twit.sec = iimGetExtract(2);
//alert("cr.twit: " + JSON.stringify(cr.twit));
/**/
// Port Twitter credentials into Firebase
iimSet("uri", fbAuth);
iimSet("id", cr.twit.id);
iimSet("secret", cr.twit.sec);
iimPlay("firebase-twitter.iim");
iimPlay("twitter-logout.iim");
/**/

/**/
// Logout
// iimPlay("google-logout.iim"); // Remain logged into Google to remain logged into Firebase; move logout to end of script;
// Cleanup
iimPlay("tab-close-all.iim");
/**/
