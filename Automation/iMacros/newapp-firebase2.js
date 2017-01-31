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

// Load data source
var load,data,datsrc="/Users/atlasgroup/Dropbox/CodeBase/Automation/NewApp/data.csv";
load  =  "CODE:"; // Also copied to read-data.iim // Reference: http://stackoverflow.com/a/17615678/1640892
load +=  "SET !DATASOURCE " + datsrc + "\n";
load +=  "SET !DATASOURCE_LINE 2"    + "\n"; // {{!LOOP}}

// Extract data from arbitrary column of source
function getData(col){
  iimPlay(load + "SET !EXTRACT {{!COL" + col +"}}");
  return iimGetExtract();  
}//alert(getData(6));

/**/
// Arguments
  // This section contains the values unique to the new app
  // Column order is set by GitNew.sh (/Users/atlasgroup/Dropbox/CodeBase/Automation/Shell/GitNew.sh)
var     short = getData(1) // "LeadBank" // Short version, no spaces
  ,      long = getData(2) // "Lead Bank" // Long version
  ,       tag = getData(3) // "Credit. Solved."
  ,     user1 = getData(5) // "clarencejvillegas" // gilliammaryw clarencejvillegas
  ,      fbid = getData(6) // "torrid-inferno-5921"

  // Below this line are calculated variables and arguments that won't typically change from project to project
  ,     user2 = "brucepnolan"
  ,     email = "bruce.p.nolan@gmail.com"
  ,        p1 = "teleworm"
  ,        p2 = "tele1worm"
  ,    byWhom = "Codebase"

  // Below this line are computed values for variables
  ,        cr = {goog:{},face:{},twit:{}}
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
  ,    fbAuth = "https://console.firebase.google.com/project/<FBID>/authentication/providers"
  ,     uriFb = fbAuth.split("<FBID>").join(fbid) // https://console.firebase.google.com/project/torrid-inferno-5921/authentication/providers
  ,  secRules = '{"rules":{"users":{"$uid":{".read":"auth != null && auth.uid === $uid",".write":"auth != null && auth.uid === $uid"}},"widgets":{".read":true,".write":true}}}'
  ;


/**/
iimPlay("tab-close-all.iim");
/** /
// Login
// Login to Google to enable automatic login to Firebase
iimPlay("google-logout.iim");
iimSet("u", user1);
iimSet("p", p1);
iimPlay("google-login.iim");
iimPlay("firebase-login.iim");
/**/

/** /
// Firebase - security rules
iimSet("rules", secRules);
iimPlay("firebase-security.iim");
/**/

/**/
// Google
// https://firebase.google.com/docs/auth/web/google-signin
iimSet("app", long.split(" ").join("<SP>"));
iimPlay("google-newapp.iim"); // For second and future apps under current username
//iimPlay("google-newapp-new.iim"); // For first app under current username
/** /
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
/** /

/** /
// Facebook
// https://firebase.google.com/docs/auth/web/facebook-login
iimPlay("facebook-logout.iim");
iimSet("u", email);
iimSet("p", p1);
iimPlay("facebook-login.iim");
iimSet("app", short);
iimSet("email", email);
iimPlay("facebook-credentials-set.iim");
iimSet("app", short);
iimSet("p", p1);
iimPlay("facebook-credentials-get.iim");
cr.face.id  = iimGetExtract(1);
cr.face.sec = iimGetExtract(2);
//alert("cr.face: " + JSON.stringify(cr.face));
// Set Facebook callback
var faceSettings = ["https://developers.facebook.com/apps/",cr.face.id,"/settings/basic/"].join("");
iimSet("uri", faceSettings); // https://developers.facebook.com/apps/216930848690170/settings/advanced/
//iimSet("callback", urlFace); // https://auth.firebase.com/v2/torrid-inferno-5921/auth/facebook/callback
iimSet("callback", callAuth);
iimPlay("facebook-callback-set.iim");
// Port Facebook credentials into Firebase
iimSet("uri", uriFb);
iimSet("id", cr.face.id);
iimSet("secret", cr.face.sec);
iimPlay("firebase-facebook.iim");
iimPlay("facebook-logout.iim");
/**/

/** /
// Twitter
// https://firebase.google.com/docs/auth/web/twitter-login
iimPlay("twitter-logout.iim");
iimSet("u", user2);
iimSet("p", p2);
iimPlay("twitter-login.iim");
iimSet("app", byTitle);
iimSet("tagline", tagLine);
iimSet("urlsite", urlSite);
//iimSet("callback", urlTwit);
iimSet("callback", callAuth);
iimPlay("twitter-credentials-set.iim");
iimSet("app", byTitleSp);
iimPlay("twitter-credentials-get.iim");
cr.twit.id  = iimGetExtract(1);
cr.twit.sec = iimGetExtract(2);
//alert("cr.twit: " + JSON.stringify(cr.twit));
// Port Twitter credentials into Firebase
iimSet("uri", uriFb);
iimSet("id", cr.twit.id);
iimSet("secret", cr.twit.sec);
iimPlay("firebase-twitter.iim");
iimPlay("twitter-logout.iim");
/**/

/** /
// Logout
//iimPlay("google-logout.iim"); // Remain logged into Google to remain logged into Firebase; move logout to end of script;
iimPlay("tab-close-all.iim");
/**/