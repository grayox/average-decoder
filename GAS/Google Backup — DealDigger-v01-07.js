// JSON visualization | viewers: http://chris.photobooks.com/json/default.htm | http://www.jsoneditoronline.org/
// function getEmailQuota(){Logger.log("Remaining email quota: " + MailApp.getRemainingDailyQuota());}
// Note: to accept doPost() from affiliate, (design decision:) must set: Publish > Deploy as web app > Execute the app as: me, Who has access to the app: Anyone, even anonymous // Otherwise, script will not run at server (though, client will receive responseCode=200); client response (200) is Google accounts sign-in page/form  // Decision Benefits: 1. script runs 2. script authorization bypass (i.e., not needed at UI) // Decision Costs: 1. Looser script security; mitigated by a. Site level access restrictions/permissions b. key method (e.g., switch/case k:foo)
function auth    (){}
function timer   (){Logger.log(new Date().getTime())}//1388228703613
//function importDataFromFile(id){id=id||"0B1LVOoV_2dFtZGVkQW1MeGNyNnM";ScriptDb.getMyDb().saveBatch(JSON.parse(DocsList.getFileById(id).getContentAsString()),false)} // Imports array of objects from, say, a backup file
function backup  (){var desc="Scrape Realtor Backup — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({});while(results.hasNext()){out./*unshift*/push(results.next())}id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);}
function print   (){var desc="Scrape Realtor Print — timestamp:"+new Date().getTime(),id,out=[],db=ScriptDb.getMyDb(),results=db.query({table:"filesList"/*isRaw:false* /source:{name:"ZipRealty"/*db.not("Realtor")* /}*/});while(results.hasNext()){out./*unshift*/push(results.next())}out.reverse();id=DriveApp.createFile(desc,JSON.stringify(out),MimeType.HTML).setDescription(desc);Logger.log(id);} // .push() is faster than .unshift() // Reference: http://jsperf.com/array-push-vs-unshift
function print_test(str,desc){str=str||JSON.stringify(ScriptDb.getMyDb().load("S337185323966"));desc=desc||"Scrape Realtor Print — timestamp:"+new Date().getTime();DriveApp.createFile(desc,str,MimeType.HTML);}
function size    (){var db=ScriptDb.getMyDb();Logger.log(db.query({/*isRaw:false*/source:{name:"ZipRealty"/*db.not("Realtor")*/}}).getSize())}
function showById(){Logger.log(JSON.stringify(ScriptDb.getMyDb().load("S96280679164")))} // Show one record by ID
function showOne (){var db=ScriptDb.getMyDb();Logger.log(JSON.stringify(db.query({item:"MH7rUOs"/*source:{name:"ZipRealty"}/*table:db.anyValue()/*isRaw:false*/}).next()));} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function showAll (){var db=ScriptDb.getMyDb(),arr=[],r,results=db.query({table:"filesList"});while(results.hasNext()){r=results.next();arr.push(r)}Logger.log(JSON.stringify(arr));return arr} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function print2ss(){LibraryjsUtil.write2ss(true,showAll(),"Sheet1","1azZ5rq1Sgy2fipwhwd75f9M6jkzvWk4TZmOzH2A4uRg"/*act*/)}
//function del     (){var xdb=ScriptDb.getMyDb(),arr=[],r,results=db.query({table:"filesList"/*isRaw:false* /source:{name:"ZipRealty"/*,db.not("Realtor")* /}*/});while(results.hasNext()){arr.push(results.next().getId());}db.removeByIdBatch(arr,false);} // Replaced: while(results.hasNext()){r=results.next();db.remove(r);}}
//function mod     (){var db=ScriptDb.getMyDb(),arr=[],r,results=db.query({source:{name:"ZipRealty"},table:"situs"/*"note"/*lienPos:db.anyOf(["1st",false,db.not(db.anyValue())])*/});while(results.hasNext()){r=results.next();try{/*r.statusArray.sort(function(a,b){var x="timestamp";return(a[x]-b[x])}).reverse();*/var i=r.statusArray.length;while(i--){if(r.statusArray[i].status=="Clicked"){r.statusCurrent={status:"Clicked",timestamp:r.statusArray[i].timestamp};break;}else if(r.statusArray[i].status=="Opened"){r.statusCurrent={status:"Opened",timestamp:r.statusArray[i].timestamp}}}/*while(r.bids[0].bidder!="ssanchez0322@gmail.com"){Logger.log(r.bids[0]);r.bids.shift()}*/}catch(e){Logger.log(e.message)}/*r.lienPos=1;*/arr.push(r);}db.saveBatch(arr,false)} //function mod    (){var db=ScriptDb.getMyDb(),arr=[],r,results=db.query({source:{name:"ZipRealty"},table:"situs"/*"note"/*lienPos:db.anyOf(["1st",false,db.not(db.anyValue())])*/});while(results.hasNext()){r=results.next();j=r.bids.length;while(j--){if(r.bids[j].amount==0){r.bids.splice(j,1)}}arr.push(r)}db.saveBatch(arr,false)}
//function getEmailQuota(){Logger.log("Remaining email quota: " + MailApp.getRemainingDailyQuota());}
//function testCall(){Logger.log(UrlFetchApp.fetch("https://script.google.com/macros/s/AKfycbx_mgY9DdVYpBA3iGI2CYE0Aq3CbKrCrPQUJZu5S1unVUYaRP0/exec?k=9l4y95xhwwi8q2hbkslp&callback=jQuery1101041615460510365665_1390895886465&filterscount=0&groupscount=0&pagenum=0&pagesize=20&recordstartindex=0&recordendindex=18&featureClass=P&style=full&maxRows=50&_=1390895886466").getContentText())}
/*function marketData(){ // Replaced by m=LibraryjsUtil.DDgetMarketData("CA","Los Angeles") var out = // Note: "emailHour" — a number between 1 and 12 representing the latest hour (AM or PM) of any email received from ZipRealty. We will fetch the emails via trigger at the indicated hour plus 2 every 12 hours (AM and PM). Ex: If markets.emailHour == 4, we will fetch emails at 6am and 6pm.
    { "markets" : [ // MARKETS designate one or more BUYERS // Agents assigned to buyers, not markets, to minimize agent/buyer crosstalk
                    /*   0 * / { "state":"CA" , "city":"Los Angeles" , "buyers":[0] /* , "agents":[0] * / , "emailHour": 9/*see note* / , "rss":{"zipRealty":{ "Redux":"12toeb4-atcsow-7cg"  , "Foreclosure":"12tpwtc-atcsow-4g"   , "Shortsales":"12tzs7s-atcsow-1avs" , "Keyword_01":"12tp788-atcsow-109k" }} }
	          //  , /*   1 * / { "state":"CA" , "city":"San Diego"   , "buyers":[0] /* , "agents":[0] * / , "emailHour": 4/*see note* / , "rss":{"zipRealty":{ "Redux":"12toe5k-a1m6g0-18lk" , "Foreclosure":"12touao-a1m6g0-1oqo" , "Shortsales":"12toe5k-a1m6g0-18lk" , "Keyword_01":"12say00-a1m6g0-1ikg" }} }
              //  , /*   2 * / { "state":"CA" , "city":"Fresno"      , "buyers":[ ] /* , "agents":[ ] * / , "emailHour":""/*see note* / , "rss":{"zipRealty":{ "Redux":""                    , "Foreclosure":""                    , "Shortsales":""                    , "Keyword_01":""                    }} }
              //  , /*   3 * / { "state":""   , "city":""            , "buyers":[ ] /* , "agents":[ ] * / , "emailHour":""/*see note* / , "rss":{"zipRealty":{ "Redux":""                    , "Foreclosure":""                    , "Shortsales":""                    , "Keyword_01":""                    }} }
	              ]
	, "buyers"  : [ // BUYERS assigned to one or more MARKETS
	                /*   0 * / { "markets":[0,1] , "email":"ssanchez0322@gmail.com" , "phone":"3105690600" , "lastName":"Sanchez" , "firstName":"Stacy" , "agreement":"https://docs.google.com/file/d/0B1LVOoV_2dFtbVVoNlVJQ0VNQlk/preview" }
	          //  , /*   1 * / { "markets":[   ] , "email":""                       , "phone":""           , "lastName":""        , "firstName":""      , "agreement":"" }
	              ]
	, "agents"  : [ // AGENTS assigned to one or more BUYERS
	                /*   0 * / { "buyers" :[0  ] , "email":"mktgru@lemtg.com"       , "phone":"6192533000" , "lastName":"Green"   , "firstName":"Ken"   , "agreement":"" }
	          //  , /*   1 * / { "buyers" :[   ] , "email":""                       , "phone":""           , "lastName":""        , "firstName":""      , "agreement":"" }
	              ]
	};return out} */
/* Selected data structures: status, listingAgent
status
    auto
	    current
		    timestamp : integer
			status    : "new" , "sent" , "opened" , "clicked" , "countered" , "accepted"
		array
		    timestamp
			status
	manual
	    current
		    timestamp
			status    : "Reviewing" , "Rejected" , "Countered" , "Accepted"
		array
		    timestamp
			status
	isBid       :        boolean,bids   :[{bidder:user,amount:p.MyBid,timestamp:t,confirmed:false}] // Different structure because bids at top level is already working i.e., entrenchment/inertia
	isAppended  : {value:boolean,records:[{timestamp,agentEmail}],method:"auto"||"manual"} // replaced: isAppended_manual : boolean , isAppended_records  : [{timestamp , agentEmail }]
	                                                                                       // replaced: isAppended_auto   : boolean , isAppended_records  : [{timestamp , agentEmail }]
	isOffer     : {value:boolean,records:[{timestamp,docId        }]                     } // replaced:                   : boolean , isOffer_records     : [{timestamp , docId      }]
	isEmailed   : {value:boolean,records:[{timestamp,agentEmail   }]                     } // replaced:                   : boolean , isEmailed_records   : [{timestamp , agentEmail }]
	isOpened    : {value:boolean,records:[{timestamp              }]                     } // replaced:                   : boolean , isOpened_records    : [{timestamp}]
	isClicked   : {value:boolean,records:[{timestamp              }]                     } // replaced:                   : boolean , isClicked_records   : [{timestamp}]
	isAccepted  : {value:boolean,records:[{timestamp              }]                     } // replaced:                   : boolean , isAccepted_records  : [{timestamp}]
	isRejected  : {value:boolean,records:[{timestamp,counterAmount}]                     } // replaced:                   : boolean , isRejected_records  : [{timestamp , counterAmount}]
	isCountered : {value:boolean,records:[{timestamp              }]                     } // replaced:                   : boolean , isCountered_records : [{timestamp}]
table:"agent"
    name                                                                                   // replaced:                   : r.detail.listingAgent.name
	licNum                                                                                 // replaced:                   : r.detail.listingAgent.licNum
	email
	    auto[]
	    manual[]
	phone
	    auto[]
		manual[]
*/
function autoFlow(){ var db=ScriptDb.getMyDb(),ar=[],d=new Date(),t=d.getTime(),count          // try Utilities.sleep(1000) between calls to db query
                       ,  Q=[{table:"mlsListing"                                             } // mls  MLS listings in the system // runtime: 4.8|1.7|1.5s @ size 30k | size 0  < 0.1s
                            ,{table:"situs"                                                  } // sit  Situses in the system
                            ,{table:"situs",status:{isBid      :       true                 }} // bid  Bids made              // Different structure already working, entrenchment/inertia
                         // ,{table:"situs",status:{isBid:true,isAppended:{value:true},isOffer:db.not(db.anyValue())}}        // pCon Offers pending construction
                            ,{table:"situs",status:{isAppended :{value:true,method:"auto"  }}} // apa  Appended automatically // replaced: isAppended_auto   + isAppended_record
                            ,{table:"situs",status:{isAppended :{value:true,method:"manual"}}} // apm  Appended manually      // replaced: isAppended_manual + isAppended_record	
                            ,{table:"situs",status:{isOffer    :{value:true                }}} // off  Offers constructed
                            ,{table:"situs",status:{isEmailed  :{value:true                }}} // sent Emails sent	
                            ,{table:"situs",status:{isOpened   :{value:true                }}} // op   Emails opened	
                            ,{table:"situs",status:{isClicked  :{value:true                }}} // cl   Emails clicked
                            ,{table:"situs",status:{isRejected :{value:true                }}} // re   Emails rejected
                            ,{table:"situs",status:{isCountered:{value:true                }}} // co   Emails countered
                            ,{table:"situs",status:{isAccepted :{value:true                }}} // acc  Emails accepted
                            ,{table:"situs",isAuction:true,timestamp:db.greaterThan(t-(1000*60*60*24))} // auc Auction properties offered
    ],i=Q.length;if(d.getMinutes()<16){while(i--){count=db.query(Q[i]).getSize()||0;ar.push(count)}ar.push(t);ar.reverse(); // getMinutes() limits function to 1/hr@15min trigger intervals
    LibraryjsUtil.write2ss(false,ar,"Report","1ASaJ_W0ha248DgFl2R9XWQ5M1kaAnb2RpqUlMjpB2hc")}  // Write results to ss // runtime: 8.5|4.2|4.4s
 /* try{ac_scrapeListSearch("Los Angeles","CA")}catch(e){Logger.log(e.message)}  //  1 Day // if( true                       ) -> table:"situs",source:{name:"Auction"}
    try{LibraryjsUtil.setItemString_auto({table:situs,item:db.not(db.anyValue())})}catch(e){Logger.log(e.message)} // For auction situses
	try{scrape_zipRealty_getMode2()}catch(e){Logger.log(e.message)} //  1 Day // if( true                               ) -> table:"situs"
 // try{emailOffer_auto          ()}catch(e){Logger.log(e.message)} // 15 Min // if( isOffer    && !isEmailed           ) -> isEmailed // Trigger auto email from agent user event to ensure from email address is agent/user's
	try{constructOffer_auto      ()}catch(e){Logger.log(e.message)} // 15 Min // if( isAppended &&  isBid && latestHit  ) -> isOffer // replaced: if(db.anyOf([isAppended_auto,isAppended_manual])&&isBid)
    try{appendAgent_auto         ()}catch(e){Logger.log(e.message)} //  1 Day // if( isAppended ==  null                ) -> isAppended
    try{homeseekers_fetchEmail   ()}catch(e){Logger.log(e.message)} //  1 Hr  // if( true                               ) -> table:"mlsListing" // runtime: 57s
    try{write2ss_mlsListings     ()}catch(e){Logger.log(e.message)} // 15 Min // if( true                               ) -> ss by ID
*/}
// --------------------------- INCOMING DATA SOURCE: SCRAPE : HOMESEEKERS.COM per MLSCLOUD.COM/--------------------------- http://www.homeseekers.com/homes-for-sale/CA/Monrovia/91016/416-Jeffries-Avenue-120326316 <<from http://www.homeseekers.com/Listing/ListingSearch.aspx?Search=90ee28c8-4f8b-4965-96b0-cc83d0deb575&ListingNumber=214006939 <<from http://idp.mrmls.safemls.net/idp/Authn/UserPassword <<from http://www.mlscloud.com/
// Use this secondary data pull to append: listing agent email addy, phone number and verify listing status and price // Realtor.com does not supply agent email // At a later time, add an automatic search result email from this (local) MLS to add reduncancy to the primary data source (ZipRealty)
function homeseekers_fetchEmail(){ //1 TRIGGER/hour // Adapted from zipRealty_fetchEmail // Scrape email from Home Seekers @homeseekers.com of new property listings // @return{arr[ob]} — Array of properties/situs as objects from parsed string
	var KEY = [ , "link_detail" , "mlsNum_1" , "mlsNum_2" , "table"/*"foo"*/ , "link_agent" , "agent_name" , "agent_email" , "agent_phone" , "agent_broker"                 ]
    ,   QUE = [ , "href="       , "MLS"      , "MLS#:"    , "Contact:"       , "href="      , "<span"      , "REALTOR"     , ""            , "Listing Provided Courtesy Of" ]
    ,   BEG = [ , "\""          , ":"        , "\">"      , "<td "           , "\""         , ">"          , ","           , ""            , ":"                            ]
    ,   END = [ , "\""          , "\""       , "<"        , ">"              , "\""         , "<"          , ","           , "<"           , "<"                            ]
	,   d=new Date(),db=ScriptDb.getMyDb(),data=[],report=[d.getYear(),d.getMonth()+1,d.getDate(),d.getHours(),0/*[4]sum*/,0/*[5]max*/],out=[],msg,msgs=[],threads=GmailApp.search('from:"csmanager@crmls.org" subject:"New Search Results"'),i,j,k=threads.length;while(k--){data[/*--*/k]=[];msgs[k]=threads[k].getMessages();j=msgs[k].length;while(j--){data[k][/*--*/j]=[];msg=msgs[k][j].getBody();//print_test(msg);
    ; /*msg=msg.split("EMAIL")[1];*/var arr=msg.split("<hr>"/*"visit_button"*/).slice(1/*0,-1*/);i=arr.length;report[4]+=i;report[5]=Math.max(i,report[5]);/*report.push(i);if(i>8){report.push("k:"+k+",j:"+j)};*/while(i--){//Logger.log(k+","+j+","+i);
	                                 data[k][j][i]              = LibraryjsUtil._scrapeDataset(arr[i],KEY,QUE,BEG,END,["$",",","%"],["","",""],true);
      /* Special Processing */ //try{          var temp         =                           msgs[k][j]   .getSubject().split(":")[1].split("|")  }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].table/*foo*/ = "mlsListing"/*""*/                                                             }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].source       = "homeseekers.com"                                                              }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].timestamp    = new Date().getTime()                                                           }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].mlsNum_1     =                           data[k][j][i].mlsNum_1    .trim()                    }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].mlsNum_2     =                           data[k][j][i].mlsNum_2    .trim()                    }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].agent_email  =                           data[k][j][i].agent_email .trim().replace(/<WBR>/gi,"")/*.toLowerCase()*/.split("<")[0] }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].agent_name   = LibraryjsUtil.toCaseTitle(data[k][j][i].agent_name  .trim())                   }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].agent_broker = LibraryjsUtil.toCaseTitle(data[k][j][i].agent_broker.trim())                   }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].agent_phone  =                           data[k][j][i].agent_phone .trim().replace(/\D/gi,"") }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].link_detail  =                           data[k][j][i].link_detail .trim().replace(/Account\/SeamlessLogin.aspx\S+2Fhomes-for-sale2F/gi,"homes-for-sale/").replace(/2F/g,"/") }catch(e){Logger.log(e.message)} //function test(){var STR=["http://www.homeseekers.com/Account/SeamlessLogin.aspx?el=38xzU2ELn0iFAPyt1TYnGD3tqBViDHFfb2IWApIS9gMiGAL00RwGSlHoDUY2fGMsj&amp;referer=2Fhomes-for-sale2FCA2FRiverside2F925042F5576-Hardwick-120654131"]Logger.log(STR[0].replace(/Account\/SeamlessLogin.aspx\S+2Fhomes-for-sale2F/gi,"homes-for-sale/").replace(/2F/g,"/"));}
                               //try{data[k][j][i].useCode      = LibraryjsUtil.convrepl   (data[k][j][i].useCode.trim(),{"Single Family":"SFR","Condo/Townhouse":"C/T","Condo":"CON","Multi-Family":"MUL"/*,"Commercial":"CRE","Hospitality":"CRE"* /},data[k][j][i].useCode);}catch(e){Logger.log(e.message)}
                         // out[i]* /data[k][j][i].isRaw=true;data[k][j][i].source={name:"ZipRealty"/*,data:data[k][j][i]* /};data[k][j][i].market={city:inCity,state:inState}; // Moved to scrape_zipRealty_ss2details() because here, could not read object from (flat) ss field and under zipRealty_scrapeDetail(act,pre), was under root.detail instead of at root.
                            out.push(data[k][j][i])}msgs[k][j].moveToTrash();//db.saveBatch(data[k][j],false);//LibraryjsUtil.write2ss(true,data[k][j],"ScrapedEmail","0AlLVOoV_2dFtdGhYUWRRNFB0Z1JMeENETk1McnFJWHc");
						  }}db.saveBatch(out,false);LibraryjsUtil.write2ss(false,[report],/*"Sheet1"*/"Data","1oppaTtG1y6JbmAPOseINpL6AJ4ssVKr17r_jIe7TPGg")}//print_test(JSON.stringify(/*out/*data*/report),"homeseekers_fetchEmail")}//return /*out* /data*/}
/* function homeseekers_fetchPagelink(){ // @return{string} — Link to details page contained in first email of first thread from Home Seekers @homeseekers.com of new property listings
    // NOTE: We archive this function because its original purpose is not possible. Originally, we noticed the automatic email notices sent from the site was limited to only 10 properties each.
    // So we planned to navigate to the details page where we thought all the properties would be listed. We were wrong. Only 10 properties were listed on the details page too.
    // So we decided to go with the original email scraping procedure but generating 26 (one per letter of the phonetic alphabet) saved searches (as we noticed there were no duplicates).
    // We think this approach will be good for up to 26x10=260 new listings per hour (the update period).
	var KEY  = [ , "foo"   , "link"  ]
    ,   QUE  = [ , "<span" , "href=" ]
    ,   BEG  = [ , "<br"   , "\""    ]
    ,   END  = [ , ">"     , "\""    ]
    ,   body = GmailApp.search('from:"csmanager@crmls.org" subject:"New Search Results"')[0].getMessages()[0].getBody()
    ,   link = LibraryjsUtil._scrapeDataset(body,KEY,QUE,BEG,END,[],[],true).link.replace(/amp;/gi,"")
    ,   str  = UrlFetchApp.fetch(link).getContentText()
    ;   print_test(str)} */
// --------------------------- INCOMING DATA SOURCE: SCRAPE : HUBZU.COM ---------------------------
// Others: http://www.realtybid.com/ http://www.bid4assets.com/
// Google search: online house auction
// --------------------------- INCOMING DATA SOURCE: SCRAPE : AUCTION.COM ---------------------------
function ac_scrapeDetail(act){//act="www.auction.com"+act; //act=act||"www.auction.com/California/residential-auction-asset/1743148-11078-126-W-118TH-ST-LOS-ANGELES-CA-90061-O460";
    var KEY = [ , "currentBid"   , "bidDeposit"   , "preValTo"              , "biddingStarts"   , "biddingEnds" ]
    ,   QUE = [ , "Current Bid:" , "Bid Deposit:" , "Previously Valued To:" , "Bidding Starts:" , "Ends:"       ]
    ,   BEG = [ , "$"            , "$"            , "$"                     , ">"               , ">"           ]
    ,   END = [ , "<"            , "<"            , "<"                     , "<"               , "<"           ]
	try{var str=UrlFetchApp.fetch(act).getContentText()}catch(e){Logger.log(e.message);return} //Logger.log(act);}
	                             var out                = LibraryjsUtil._scrapeDataset(str,KEY,QUE,BEG,END,["$",",","%"],["","",""],true);
	  /* Special Processing */// try{out.propertyType   = LibraryjsUtil.convrepl   (out.propertyType,{"Single Family Home":"SFR"/*,"Commercial":"CRE","Multifamily":"MUL","Hospitality":"CRE"* /},arr[i].propertyType);             }catch(e){Logger.log(e.message)}
                              // try{out.sa             = LibraryjsUtil.toCaseTitle(out.sa  );                                                                                                                                      }catch(e){Logger.log(e.message)}
                              // try{out.city           = LibraryjsUtil.toCaseTitle(out.city);                                                                                                                                      }catch(e){Logger.log(e.message)}
                              // try{out.isActive       = Boolean(out.ask);                                                                                                                                                         }catch(e){Logger.log(e.message)}
                              // try{out                = {isRaw:true;out.source={name:"zipRealty",data:data[i]},market:{city:inCity,state:inState}};                                                                               }catch(e){Logger.log(e.message)}
                              // try{out.avm            = zipRealty_scrapeAvm(out.link_avm); // Disabled 4/11/2014 due to "sweep all" "blanket" strategy // Also, null values showing in returned dataset                           }catch(e){Logger.log(e.message)}
								 /*print_test(JSON.stringify(out));* /Logger.log(JSON.stringify(out));*/return out}
/*function ac_scrapeDetail_test(){
    var ARR = [  "http://www.auction.com/California/residential-auction-asset/1344842-11078-5115-LONGFELLOW-STREET-LOS-ANGELES-CA-90042-O460"
               , "http://www.auction.com/California/residential-auction-asset/1743142-11078-29711-BYRON-PL-LOS-ANGELES-CA-91384-O460"
               , "http://www.auction.com/California/residential-auction-asset/1743148-11078-126-W-118TH-ST-LOS-ANGELES-CA-90061-O460"
               , "http://www.auction.com/California/residential-auction-asset/1712287-11078-8020-LANGDON-AVE-116-LOS-ANGELES-CA-91406-O460"
              ],out=[],i=ARR.length;while(i--){out.push(ac_scrapeDetail(ARR[i]))}Logger.log(JSON.stringify(out))}*/
function ac_scrapeList(act){ // @return{object} // act=act||"http://www.auction.com/search?miles=25&location=los+angeles%2C+ca&auction_type=residential&limit=50&offset=50";
    var KEY = [ , "r"                        ] // "propId_1"     , "foo"     , "acItemNum_1" , "cs" , "link_detail_1" , "propId_2"     , "link_photo" , "link_detail_2" , "sa" , "csz" , "useCode"     , "propId_3"     , "acItemNum_2" , "beds" , "baths" , "sqft" ]
    ,   QUE = [ , "ADC.model.search_result"  ] // "property-id=" , "Item #:" , "<"           , "<"  , "href="         , "property-id=" , "src="       , "href="         , " "  , "/"   , "Asset Type:" , "Property ID:" , "Item #:"     , "<li"  , "<li"   , "<li"  ]
    ,   BEG = [ , "="                        ] // "\""           , "<"       , ">"           , ">"  , "\""            , "\""           , "\""         , "\""            , ">"  , ">"   , ">"           , ">"            , ">"           , ">"    , ">"     , ">"    ]
    ,   END = [ , "ADC.model.search_filters" ] // "\""           , ">"       , "<"           , "<"  , "\""            , "\""           , "\""         , "\""            , "<"  , "<"   , "<"           , "<"            , "<"           , " "    , " "     , " "    ]
    ;   try{var str=UrlFetchApp.fetch(act).getContentText()}catch(e){Logger.log(e.message);return} // Abandoned scraping HTML page in favor of scraping JSON data object at bottom of page; might return to HTML scrape if/when necessary
	        var out=JSON.parse(LibraryjsUtil._scrapeDataset(str,KEY,QUE,BEG,END,[/*"$",",","%"*/],[/*""/*"","",""*/],true).r.trim().slice(0,-1));//.slice() removes semicolon at end
	      /*print_test(JSON.stringify(out));Logger.log(JSON.stringify(out));*/return out}
function ac_scrapeListSearch(city,state){var LIMIT=50,MILES=25,offset=0,actNext,db=ScriptDb.getMyDb();city=city||"Los Angeles";state=state||"CA";
 // var act = "http://www.auction.com/search?auction_type=residential&limit="+LIMIT+"&miles="+MILES+"&location="+city.toLowerCase().replace(/ /g,"+")+"%2C+"+state.toLowerCase()
	var act = "http://www.auction.com/search?search=los+angeles%2C+ca&auction_start_date_max=2014-06-30&auction_start_date_min=2014-06-25&auction_type=residential&asset_type=All_Residential&limit=48&miles=100&offset=0" // "miles" parameter (25, 50, 100, 250) sets search radius // "limit" parameter (12=default, 24 or 48) sets quantity shown per page // "offset" parameter (whole number multiples of "limit" parameter) sets pagination
	,   out = ac_scrapeList(act),count=out.total,t=new Date().getTime();
	do{var keys=Object.keys(out.list),arr=[]/*,darr=[]*/,i=keys.length;
	    while(i--){var /*addMkt=true,j,s,*/r=out.list[keys[i]];
	        if(db.query({table:"situs",source:{name:"Auction"},url:r.url})){continue} //Replaces the following code; Idea: just skip if an existing record is found; Use continue command. Simplify. I think we were trying to do too many manipulations; Still need to get item string after save. //,q={table:"situs",source:{name:"Auction"},url:r.url/*,/*global_* /property_id:r./*global_* /property_id,/*,bid:db.anyValue()*/},results=db.query(q);// Finds matching existing record (by property_id) //if(results.getSize()){// Starts conditional //s=results.next();// Loads existing record //darr.push(s.getId());// Deletes existing record // r.bids=s.bids;r.markets=s.markets;j=r.markets.length;while(j--){if(r.markets[j].state==state&&r.markets[j].city==city){addMkt==false;break;}}}else{r.markets=[];r.bids=[];} // If this property already has bids//if(addMkt){r.markets.push({"city":city,"state":state})}
         // Special Processing
		    r.market={"city":city,"state":state};r.timestamp=t;r.table="situs";r.source={"name":"Auction"};r.strikeDate=r.auction_start_date.split("-")/*[YYYY,MM,DD];start_date as end_date only exists for only 60%*/;r.property_address=LibraryjsUtil.toCaseTitle(r.property_address);r.property_city=LibraryjsUtil.toCaseTitle(r.property_city);r.useCode=LibraryjsUtil.convrepl(r.property_type,{"Condo":"CON","Duplex":"DUP","Multi-family":"MUL","Multi-Family":"MUL"},r.property_type);
            try{r.ratio=Math.round(100*r.starting_bid/r.previously_valued_to)}catch(e){Logger.log("%s...starting_bid:%s...previously_valued_to:%s",e.message,r.starting_bid,r.previously_valued_to)}r.isAuction=true;r.isActive=true/*Boolean(/*strikeDate[]||auction_start_date>today)*/;r.isRedux=false;r.isFixer=false;r.isForeclosure=Boolean(r.product_type=="Foreclosure/Trustee"||r.product_type=="Bank Owned");r.isShortSale=Boolean(r.product_type=="Short Sale");
		    arr.push(r)}
	    db.saveBatch(arr,false);//db.removeByIdBatch(darr,false); // LibraryjsUtil.write2ss(true,arr,"ScrapedAuction","1wfOfPeKO9PxmrN6W6OypSrc0uuxG1OH1UZYD1Ow4eBU"); // Problem: Successive loop cycles do not keep field headings in fixed sequential order, making fields misalign in table; Solutions: Bypass SS and save directly to DB
	    offset+=LIMIT;actNext=act+"&offset="+offset;try{out=ac_scrapeList(actNext)}catch(e){Logger.log(e.message);return}}while(count>offset)return}
// --------------------------- INCOMING DATA SOURCE: SCRAPE : ZIP REALTY ---------------------------
function zipRealty_fetchEmail(){ // Forked to homeseekers_fetchEmail // Scrape email from Zip Realty @ziprealty.com of new property listings // @return{arr[ob]} — Array of properties/situs as objects from parsed string
    function getZipDetailUrl(fstr){//fstr=fstr||"2Fproperty2F4410-DELTA-ST-_UNIT_28-SAN-DIEGO-CA-921132F97536712Fdetail"
            fstr                  = fstr                 .replace( /^2Fproperty2F/ , "/property/" )
                                                         .replace(  /2Fdetail$/    , "/detail"    )
        var farr1                 = fstr                 .split  ( "/"                            )
          , farr2                 = farr1[2]             .split  ( "-"                            )
          ; farr2[farr2.length-1] = farr2[farr2.length-1].replace( "2F"            , "/"          )
          ; farr1[2]              = farr2                .join   ( "-"                            )
          ; fstr                  = farr1                .join   ( "/"                            )
          ; /*Logger.log(str);*/return "http://www.ziprealty.com"+fstr}
	var KEY = [ , "link_detail_redirect_1" , "sa"      , "csz"  , "ask"     , "link_detail_redirect_2" , "link_detail_redirect_3" , "link_photo" , "foo"   , "beds"    , "foo"    , "sqft"    , "foo"    , "baths"   , "foo"       , "lot"     , "foo"       , "ptBaths" , "foo"   , "useCode" ]
    ,   QUE = [ , "href="                  , "<strong" , "<br>" , "<strong" , "<table "                , "href="                  , "src="       , "Beds:" , "<strong" , "Sq ft:" , "<strong" , "Baths:" , "<strong" , "Lot Size:" , "<strong" , "Pt Baths:" , "<strong" , "Type:" , "<strong" ]
    ,   BEG = [ , "\""                     , ">"       , ">"    , ">"       , "href=\""                , "\""                     , "\""         , "<td "  , ">"       , "<td "   , ">"       , "<td "   , ">"       , "<td "      , ">"       , "<td "      , ">"       , "<td "  , ">"       ]
    ,   END = [ , "\""                     , "<"       , "<"    , "<"       , "\""                     , "\""                     , "\""         , ">"     , "<"       , ">"      , "<"       , ">"      , "<"       , ">"         , " "       , ">"         , "<"       , ">"     , "<"       ]
	,   t=new Date().getTime(),data=[],/*out=[],*/msg,msgs=[],threads=GmailApp.search('from:"ziprealty.com" subject:"New listings that match your search: "'),i,j,k=threads.length;while(k--){data[k]=[];msgs[k]=threads[k].getMessages();j=msgs[k].length;while(j--){data[k][j]=[];msg=msgs[k][j].getBody()//[0].getMessages()[0].getBody()//;print_test(str);
    ;   msg=msg.split("EMAIL")[1];var arr=msg.split("visit_button").slice(/*1*/0,-1);i=arr.length;while(i--){//Logger.log(k+","+j+","+i);
	                                 data[k][j][i]               = LibraryjsUtil._scrapeDataset(arr[i],KEY,QUE,BEG,END,["$",",","%"],["","",""],true);
      /* Special Processing */   try{          var temp          =                          msgs[k][j]   .getSubject().split(":")[1].split("|")  }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].reportName    =                          temp      [0].trim()                                 }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].marketState   =                          temp      [1].trim()                                 }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].marketCity    =                          temp      [2].trim()                                 }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].lot           =                        1*data[k][j][i].lot||""                                }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].useCode       = LibraryjsUtil.convrepl ( data[k][j][i].useCode.trim(),{"Single Family":"SFR","Condo/Townhouse":"C/T","Condo":"CON","Multi-Family":"MUL"/*,"Commercial":"CRE","Hospitality":"CRE"*/},data[k][j][i].useCode);}catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].link_detail_1 = getZipDetailUrl        ( data[k][j][i].link_detail_redirect_2.split("=")[1] ) }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].timestamp     = /*If empty string "",*/  t /*study spreadsheet header where data is written*/ }catch(e){Logger.log(e.message)}
                                 try{data[k][j][i].isActive      =                          true                                                 }catch(e){Logger.log(e.message)}
						      // try{data[k][j][i].detail        = zipRealty_scrapeDetail ( data[k][j][i].link_detail_1                        ) }catch(e){Logger.log(e.message)} // Just store email data for now; scrape details later in separate task
                      // /*out[i]* / data[k][j][i].isRaw=true;data[k][j][i].source={name:"ZipRealty"/*,data:data[k][j][i]* /};data[k][j][i].market={city:inCity,state:inState}; // Moved to scrape_zipRealty_ss2details() because here, could not read object from (flat) ss field and under zipRealty_scrapeDetail(act,pre), was under root.detail instead of at root.
                                 }LibraryjsUtil.write2ss(true,data[k][j],"ScrapedEmail","0AlLVOoV_2dFtdGhYUWRRNFB0Z1JMeENETk1McnFJWHc");msgs[k][j].moveToTrash();
								 }}/*print_test(/ * /Logger.log(JSON.stringify(data));*/return /*out* /data*/}
function zipRealty_fetchRSS(){var FILE="12tp788-atcsow-109k",//var ob=LibraryjsUtil.rss2json("http://www.ziprealty.com/rss/zipnotify/12tp788-atcsow-109k",75);return ob
    /*md=marketData(),*/i,temp,NUM=75,STEM="http://www.ziprealty.com/rss/zipnotify/",/*FILE[i]=md.foo* /i=FILE.length,arr=[];while(i--){arr[i]=*/data=LibraryjsUtil.rss2json(STEM+FILE/*[i]*/,NUM),out=data.responseData.feed.entries;//Logger.log(JSON.stringify(out))//}
    /* Special Processing */   try{ temp               =  data.responseData.feed.title.split("-")[1].split("|")  }catch(e){Logger.log(e.message)}i=out.length;while(i--){
                               try{ out[i].reportName  =                                     temp[0].trim()      }catch(e){Logger.log(e.message)}
                               try{ out[i].marketState =                                     temp[1].trim()      }catch(e){Logger.log(e.message)}
                               try{ out[i].marketCity  =                                     temp[2].trim()      }catch(e){Logger.log(e.message)}
                               try{ out[i].categories  =  ""                                                     }catch(e){Logger.log(e.message)}
    }LibraryjsUtil.write2ss(true,out,"ScrapedRSS","0AlLVOoV_2dFtdGhYUWRRNFB0Z1JMeENETk1McnFJWHc")}
function zipRealty_getCookies(){var out=UrlFetchApp.fetch("http://www.ziprealty.com/homes/for-sale/search/sandiego/proximity").getAllHeaders()["Set-Cookie"];Logger.log(out);return out}
function zipRealty_fetchList(){var page=0 // Fetches list data; // Separate fetch and scrape functions for convenience // Getting session variables is challenging on this web site vis a vis multiple server calls
    , payload   = { doSubmit         :  true
                  , distance         :  25.0
                  , keywords/*_01*/  : '"needs"            OR "TLC"        OR "fixer"    OR "repairs"'
              //  , keywords/*_02*/  : '"bring all offers" OR "contractor" OR "handyman" OR	"developer"'
              //  , keywords/*_03*/  : '"probate"          OR "develop"    OR "rehab"    OR "as-is"'
              //  , keywords/*_04*/  : // Every market must be analyzed individually and search terms created unique to each market // Analysis: https://docs.google.com/spreadsheet/ccc?key=0AlLVOoV_2dFtdDVZNkFUcURHMjVFY1FVV216VDhKbHc#gid=0 // "Fixers" query uses '"TLC" OR "fixer" OR "contractor" OR "as-is"'// max 4 search terms // don't use: 'rehab' (includes newly rehabbed) // "TLC" OR "fixer" OR "contractor" OR "as-is" == default "fixer upper" search generated by system
                  , proximity_street : "3130 Logan Ave"
                  , proximity_city   : "san diego"
                  , proximity_state  : "ca"
                  , proximity_zip    : "92113"
                  , results_per_page :  100 // 15 30 50 100
                  , searchButton     : "Search Now"
                  , sort             : "date_desc"
                  }//,home_sq_feet:,interest:,is_age_restricted:,is_fixer_upper:,is_foreclosure:,is_new_construction:,is_short_sale:,last_visit:,listing_price_max:,listing_price_min:,lot_sq_feet:,min_bedrooms:,min_full_baths:,min_garage_spaces:,num_mfr_units:,percent_reduced:,year_built_from:,year_built_to://,cookieStr=UrlFetchApp.fetch("http://www.ziprealty.com/homes/for-sale/search/sandiego/proximity",{/*followRedirects:false,/*method:"post",payload:{email:"email@example.com",password:"pswd"},headers:{Cookie:cookie}*/}).getAllHeaders()["Set-Cookie"]//,cookieObj=LibraryjsUtil.cookieParse(cookieStr)//,cookie=LibraryjsUtil.cookieStringify(cookieObj)
    , cookie    = /*zipRealty_getCookies()*/ // "JSESSIONID=BA209B7CE0AA1A9BC4EBF40A27AF76C4.vwapp7b;" // GAS
                                             // "JSESSIONID=FBF9A210A151799E707ACE27126D8B6B.vwapp4b;" // POSTER
                                                "JSESSIONID=9F2E624165E3EB003C5CBD1C95DADAE5.vwapp7b;" // CHROME DEVELOPER //**  Note: We paused development here. We could not get the scripted URL fetch to return successfully. We think the session IDs (cookies, JSESSIONID, website_user_id, etc.) is the problem. Now we must search manually, then copy the html source of the returned search results and paste them into the spreadsheet; then scrape the spreadsheet.
                                             // "JSESSIONID=608EE08150C51D9FAD31564AB8D4169A.vwapp2b; Domain=.ziprealty.com; Path=/; HttpOnly, website_user_id=431427847;" // LOCAL
    // Logger.log(UrlFetchApp.fetch("http://www.ziprealty.com/homes/for-sale/search/sandiego/proximity",{method:"post",payload:payload/*,headers:{Cookie:cookie}*/}).getAllHeaders()["Set-Cookie"])
    , data   // = UrlFetchApp.fetch("http://www.ziprealty.com/homes-for-sale/search-results/sandiego/detailed",{method:"get",headers:{Cookie:cookie}}).getContentText()
             // = UrlFetchApp.fetch("http://www.ziprealty.com/homes/for-sale/search/sandiego/saved?action=search&home_search_id=58631364")            .getContentText() // KEYWORD — SAN DIEGO
                = scrape_zipRealty_ss() // Fetch data from spreadsheet temporarily until we can automate the fetching process
	; /*Logger.log* /print_test(/*JSON.stringify(* /data/*cookie* /);*/return data}
function zipRealty_scrapeList(str,inCity,inState){str=str||zipRealty_fetchList();inCity=inCity||"San-Diego";inState=inState||"CA";var i,data=[],out=[] // @return{arr[ob]} — Array of properties/situs as objects from parsed string // @param{str} — List html doc returned from search
    ,   KEY = [ , "mlsNumber_1"  , "mlsName" , "isForeclosure"   , "link_detail_1" , "link_photo"                           , "numOfPhotos" , "ask"             , "reduxPct"          , "link_detail_2" , "sa"      , "csz"  , "nhood_1"      , "nhood_2" , "beds"    , "baths"   , "useCode" , "sqft"    , "psf"     , "lot"     , "yrBuilt" , "ageInDays" , "foo"                              , "comments_1" , "comments_2" ]
    ,   QUE = [ , "name="        , "value="  , "<div "           , "href="         , "PhotoUtil.setAndResizeImageOverflow(" , "strong"      , "font-list-price" , "pricereduced_icon" , "href="         , "<strong" , "<div" , "Neighborhood" , " "       , "<strong" , "<strong" , "<strong" , "<strong" , "<strong" , "<strong" , "<strong" , "<strong"   , "toggle_div__parent--height-trans" , "<div "      , "<div "      ]
    ,   BEG = [ , "\""           , "\""      , "photobox--180__" , "\""            , "'"                                    , ">"           , "<strong>"        , "Price reduced by"  , "\""            , ">"       , ">"    , ":"            , ">"       , ">"       , ">"       , ">"       , ">"       , ">"       , ">"       , ">"       , ">"         , " "                                , ">"          , ">"          ]
    ,   END = [ , "\""           , "\""      , "\""              , "\""            , "'"                                    , " Photos"     , "<"               , "%"                 , "\""            , "<"       , "<"    , "\""           , "<"       , "<"       , "<"       , "<"       , "<"       , "<"       , "<"       , "<"       , "<"         , ">"                                , "<"          , "<"          ]
	,   search=LibraryjsUtil._scrapeDataset(str,[,"title"],[,"Saved search:"],[," "],[,"\""],[],[],true),arr=str.split("show-on-hover__parent results-row").slice(1);i=arr.length;while(i--){
	                                 data[i] = LibraryjsUtil._scrapeDataset(arr[i],KEY,QUE,BEG,END,["$",",","%"],["","",""],true);
                              /*     data[i].isPriceReduced = (arr[i].indexOf("i-price-reduced"  )>-1);
                                     data[i].isForeclosure  = (arr[i].indexOf("badge-foreclosure")>-1);
                                     data[i].isBankOwned    = (arr[i].indexOf("badge-bank-owned" )>-1);//Logger.log(isForeclosure);Logger.log(isPriceReduced);Logger.log(isBankOwned);}
      /* Special Processing */ //try{data[i].sa             = LibraryjsUtil.toCaseTitle(data[i].sa                           );}catch(e){Logger.log(e.message)}
                               //try{data[i].city           = LibraryjsUtil.toCaseTitle(data[i].city                         );}catch(e){Logger.log(e.message)}
	                             if (data[i].beds          != data[i].beds*1){data[i].ageInDays=data[i].lot;data[i].yrBuilt=data[i].psf;data[i].lot=data[i].sqft;data[i].psf=data[i].useCode;data[i].sqft=data[i].baths;data[i].useCode=data[i].beds;data[i].baths="";data[i].beds="";} // Adjusts for intermittent missing field data // Shifts field results
								 try{data[i].useCode        = LibraryjsUtil.convrepl(data[i].useCode,{"CND/TWN":"C/T"/*,"Commercial":"CRE","Multifamily":"MUL","Hospitality":"CRE"*/},data[i].useCode);}catch(e){Logger.log(e.message)}
                                 try{data[i].searchTitle    =                        search .title                            ;}catch(e){Logger.log(e.message)}
                                 try{data[i].mlsNumber_2    =                        data[i].mlsName  .split("|")[0]          ;}catch(e){Logger.log(e.message)}
                                 try{data[i].mlsName        =                        data[i].mlsName  .split("|")[1]          ;}catch(e){Logger.log(e.message)}
                                 try{data[i].ageInDays      =                        data[i].ageInDays.split(" ")[0]          ;}catch(e){Logger.log(e.message)}
                                 try{data[i].ask_high       =                        data[i].ask      .split("-")[1].trim()   ;}catch(e){Logger.log(e.message);data[i].ask_high="";}
                                 try{data[i].ask            =                        data[i].ask      .split("-")[0].trim()   ;}catch(e){Logger.log(e.message)}
                                 try{data[i].isForeclosure  = (data[i].isForeclosure == "foreclosure")                        ;}catch(e){Logger.log(e.message)}
                                 try{data[i].isShortSale    = (data[i].ask_high       >  0)                                   ;}catch(e){Logger.log(e.message)}
                      //   /*out[i]*/data[i].isRaw=true;data[i].source={name:"ZipRealty"/*,data:data[i]*/};data[i].market={city:inCity,state:inState}; // Moved to scrape_zipRealty_ss2details() because here, could not read object from (flat) ss field and under zipRealty_scrapeDetail(act,pre), was under root.detail instead of at root.
                                    }/*print_test(/ * /Logger.log(JSON.stringify(data));*/return /*out*/data}
function zipRealty_scrapeDetail(act){//act="http://www.ziprealty.com"+act; //act=act||"http://www.ziprealty.com/property/3130-LOGAN-AVE-SAN-DIEGO-CA-92113/10509683/detail";
    var KEY = [ , "title_1" , "canonical" , "title_2"    , "link_photo_1" , "link_photo_2"       , "link_detail_1" , "siteName"     , "og_type"    , "latitude"    , "longitude"    , "sa"                , "city"        , "state"      , "zip"            , "country"         , "itemprop_name"     , "link_detail_2"    , "ask"       , "reduxPct"          , "reduxAmt"   , "reduxDate" , "link_requestShowing" , "link_like"  , "neighborhood_1"  , "neighborhood_2" , "schoolDistrict_1"    , "schoolDistrict_2" /* , "corePropDetails"         , "beds"    , "baths"   , "type"    , "sqft"    , "yrBuilt" , "link_photo_3"              , "listIdOb_1" , "listIdOb_2"                   , "lot"              */ , "latestUpdate"         , "ageInDays"                    , "listDate" , "psf"               , "link_estPmt"                          , "estPmt" , "mlsSource_1" , "mlsNumber_1" , "status"  , "views"  , "popularity"  , "foo"     , "comments" , "listIdOb_3"                   , "mlsNumber_2"        , "mlsSource_2"        /* , "foo"               , "foo"      , "laundry" , "foo"      , "kitchen" , "foo"           , "kitchenDim" , "foo"               , "livingRmDim" , "foo"             , "masterBrDim" , "foo"      , "parking" , "foo"     , "siding" , "foo"              , "lotDescription" , "foo"        , "roofType" , "foo"           , "countOfStories" , "foo"            , "storiesDesc" , "foo"       , "lotSize" , "foo"      , "heating" , "foo"    , "water" , "foo"    , "sewer" , "foo"              , "schoolDistrict_3" , "foo"     , "county" , "foo"                , "propertySubType" , "foo"                   , "tractOrSubdivision" , "foo"           , "crossStreet" , "foo"          , "assessments" */ , "foo"          , "listedBy"/*Broker*/ , "foo"            , "la"/*Agent*/ , "foo"                    , "link_avm"               , "pH"                     , "link_schoolDistrict" , "schoolDistrict_4" , "schoolScore"    , "schoolDistrict_5" , "link_schoolsNearby"                          , "foo"                       , "foo"  , "pub_beds" , "foo"        , "pub_bathsFull" , "foo"           , "pub_bathsPartial" , "foo"           , "pub_propertyType" , "foo"     , "pub_sqft" , "foo"      , "pub_lot" , "foo"        , "pub_yrBuilt" , "foo"  , "pub_zip" , "foo" , "pub_apn" , "foo"    , "pub_source" ]
    ,   QUE = [ , "<title"  , "canonical" , "og:title"   , "og:image"     , "itemprop=\"image\"" , "og:url"        , "og:site_name" , "og:type"    , "og:latitude" , "og:longitude" , "og:street-address" , "og:locality" , "og:region"  , "og:postal-code" , "og:country-name" , "itemprop=\"name\"" , "itemprop=\"url\"" , "For Sale:" , "pricereduced_icon" , "Reduced by" , "on"        , "IFPC.show("          , "IFPC.show(" , "class=\"nHood\"" , " "              , "class=\"sDistrict\"" , " "                /* , "id=\"corePropDetails\""  , "<strong" , "<strong" , "<strong" , "<strong" , "<strong" , "ZipRealty.photos.MLSPhoto" , "var home "  , "javascript:showSaveHomePanel" , ">Lot&nbsp;Size:<" */ , "last_updated_tooltip" , "Days&nbsp;on&nbsp;ZipRealty:" , "Listed:"  , "Price/sq&nbsp;ft:" , "Estimated&nbsp;Monthly&nbsp;Payment:" , ">"      , "Source:"     , "MLS&nbsp;#:" , "Status:" , "Views:" , "Popularity:" , ">Print<" , "<span "   , "javascript:showSaveNotePanel" , "name=\"mlsNumber\"" , "name=\"mlsSource\"" /* , "Interior Features" , "Laundry:" , "<td "    , "Kitchen:" , "<td "    , "Kitchen Dim.:" , "<td "       , "Living Room Dim.:" , "<td "        , "Master BR Dim.:" , "<td "        , "Parking:" , "<td "    , "Siding:" , "<td "   , "Lot Description:" , "<td "           , "Roof Type:" , "<td "     , "# of Stories:" , "<td "           , "Stories Desc.:" , "<td "        , "Lot Size:" , "<td "    , "Heating:" , "<td "    , "Water:" , "<td "  , "Sewer:" , "<td "  , "School District:" , "<td "             , "County:" , "<td "   , "Property Sub-type:" , "<td "            , "Tract or Subdivision:" , "<td "               , "Cross Street:" , "<td "        , "Assessments:" , "<td "        */ , "courtesy of:" , "<td "               , "Listing agent:" , "<td "        , "price-estimates-widget" , "price-estimates-widget" , "class=\"pricehistory\"" , "School District:"    , ""                 , "icoSchoolScore" , "School District:" , "document.getElementById(\"schools-widget\")" , "Public Record Information" , "Beds" , "<td "     , "Full Baths" , "<td "          , "Partial Baths" , "<td "             , "Property Type" , "<td "             , "Sq. Ft." , "<td "     , "Lot Size" , "<td "    , "Year Built" , "<td "        , "FIPS" , "<td "    , "APN" , "<td "    , "Source" , "<td "       ]
    ,   BEG = [ , ">"       , "href=\""   , "content=\"" , "content=\""   , "content=\""         , "content=\""    , "content=\""   , "content=\"" , "content=\""  , "content=\""   , "content=\""        , "content=\""  , "content=\"" , "content=\""     , "content=\""      , "content=\""        , "content=\""       , "<strong>"  , "Price reduced by"  , "$"          , " "         , "\'"                  , "\'"         , "Neighborhood:"   , ">"              , "title=\""            , ">"                /* , ">"                       , ">"       , ">"       , ">"       , ">"       , ">"       , "\'"                        , "="          , "("                            , "<dd>"             */ , ">"                    , "<dd>"                         , "<dd>"     , "<dd>"              , "href=\""                              , "$"      , "<dd>"        , "<dd>"        , "<dd>"    , "<dd>"   , " "           , "<div "   , ">"        , "("                            , "value=\""           , "value=\""           /* , "<"                 , "<"        , ">"       , "<"        , ">"       , "<"             , ">"          , "<"                 , ">"           , "<"               , ">"           , "<"        , ">"       , "<"       , ">"      , "<"                , ">"              , "<"          , ">"        , "<"             , ">"              , "<"              , ">"           , "<"         , ">"       , "<"        , ">"       , "<"      , ">"     , "<"      , ">"     , "<"                , ">"                , "<"       , ">"      , "<"                  , ">"               , "<"                     , ">"                  , "<"             , ">"           , "<"            , ">"           */ , "<"            , ">"                  , "<"              , ">"           , "\""                     , "'"                      , ">"                      , "href=\""             , ">"                , ">"              , ">"                , "\'"                                          , "<"                         , "<"    , ">"        , "<"          , ">"             , "<"             , ">"                , "<"             , ">"                , "<"       , ">"        , "<"        , ">"       , "<"          , ">"           , "<"    , ">"       , "<"   , ">"       , "<"      , ">"          ]
    ,   END = [ , "<"       , "\""        , "\""         , "\""           , "\""                 , "\""            , "\""           , "\""         , "\""          , "\""           , "\""                , "\""          , "\""         , "\""             , "\""              , "\""                , "\""               , "<"         , "%"                 , " "          , "<"         , "\'"                  , "\'"         , "\""              , "<"              , "\""                  , "<"                /* , "</div>"                  , "<"       , "<"       , "<"       , "<"       , "<"       , "\'"                        , ";"          , ")"                            , " "                */ , "<"                    , "<"                            , "<"        , "<"                 , "\""                                   , "<"      , "<"           , "<"           , "<"       , "<"      , "\""          , "</div>"  , "<"        , ")"                            , "\""                 , "\""                 /* , ">"                 , "</td>"    , "<"       , "</td>"    , "<"       , "</td>"         , "<"          , "</td>"             , "<"           , "</td>"           , "<"           , "</td>"    , "<"       , "</td>"   , "<"      , "</td>"            , "<"              , "</td>"      , "<"        , "</td>"         , "<"              , "</td>"          , "<"           , "</td>"     , "<"       , "</td>"    , "<"       , "</td>"  , "<"     , "</td>"  , "<"     , "</td>"            , "<"                , "</td>"   , "<"      , "</td>"              , "<"               , "</td>"                 , "<"                  , "</td>"         , "<"           , "</td>"        , "<"           */ , "</td>"        , "<"                  , "</td>"          , "<"           , ">"                      , "'"                      , "</table>"               , "\""                  , "<"                , "<"              , "<"                , "\'"                                          , ">"                         , ">"    , "<"        , ">"          , "<"             , ">"             , "<"                , ">"             , "<"                , ">"       , "<"        , ">"        , "<"       , ">"          , "<"           , ">"    , "<"       , ">"   , "<"       , ">"      , "<"          ]
	try{var str=UrlFetchApp.fetch(act).getContentText()}catch(e){Logger.log(e.message);return} //Logger.log(act);}
	                             var out                = LibraryjsUtil._scrapeDataset(str,KEY,QUE,BEG,END,["$",",","%"],["","",""],true);
	  /* Special Processing */// try{out.propertyType   = LibraryjsUtil.convrepl   (out.propertyType,{"Single Family Home":"SFR"/*,"Commercial":"CRE","Multifamily":"MUL","Hospitality":"CRE"* /},arr[i].propertyType);             }catch(e){Logger.log(e.message)}
                                 try{out.sa             = LibraryjsUtil.toCaseTitle(out.sa  );                                                                                                                                      }catch(e){Logger.log(e.message)}
                                 try{out.city           = LibraryjsUtil.toCaseTitle(out.city);                                                                                                                                      }catch(e){Logger.log(e.message)}
                                 try{out.isActive       = Boolean(out.ask);                                                                                                                                                         }catch(e){Logger.log(e.message)}
                              // try{out                = {isRaw:true;out.source={name:"zipRealty",data:data[i]},market:{city:inCity,state:inState}};                                                                               }catch(e){Logger.log(e.message)}
                              // try{out.avm            = zipRealty_scrapeAvm(out.link_avm); // Disabled 4/11/2014 due to "sweep all" "blanket" strategy // Also, null values showing in returned dataset                           }catch(e){Logger.log(e.message)}
                                 try{out.strikeDate     = out.listDate.split("/"); /*[MM,DD,YY]*/ out.strikeDate.unshift(out.strikeDate.pop());out.strikeDate[0]=20+out.strikeDate[0]; /*[YYYY,MM,DD] - yields standard format per MLS above*/     }catch(e){Logger.log(e.message)}
                                 try{out.pH             = out.pH.replace(/( |\n|<\/tr>|<\/th>|<\/td>|<strong>|<\/strong>|<spanclass=\"zRed\">|<\/span>)/g,"");                                                                      }catch(e){Logger.log(e.message)}
                                 try{out.priceHistory   = function(){var i,ar=out.pH.split("<tr>");ar.shift();ar[0]=ar[0].split("<th>");ar[0].shift();i=ar.length;while(i---1){ar[i]=ar[i].split("<td>");ar[i].shift();}return ar}()}catch(e){Logger.log(e.message)}
                                 try{out.listingAgent   = function(){var ar=out.la.split(" (Lic. #");ar[1]=ar[1].replace(")","").trim();return {name:ar[0],licNum:ar[1]}}()}catch(e){Logger.log(e.message);out.listingAgent=out.la} // r.detail.listingAgent={name:"foo",licNum:"bar"}
								 /*print_test(JSON.stringify(out));* /Logger.log(JSON.stringify(out));*/return out}
function zipRealty_scrapeAvm   (act){act="http://www.ziprealty.com"+act; //act=act||"http://www.ziprealty.com/property/async/avm?addressId=10509683&lp=199900"; // AVM is AJAX call at/from source
    var KEY = [ , /* "link_pricingTool" , */ "avmEst_smartZip"            , "avmEst_zillow"            , "avmEst_eppraisal"            ]
    ,   QUE = [ , /* "href"             , */ "avm-chart-series--resprice" , "avm-chart-series--zillow" , "avm-chart-series--eppraisal" ]
    ,   BEG = [ , /* "\""               , */ "$"                          , "$"                        , "$"                           ]
    ,   END = [ , /* "?"                , */ "<"                          , "<"                        , "<"                           ]
    ;   try{var str=UrlFetchApp.fetch(act).getContentText()}catch(e){Logger.log(e.message);return}//Logger.log(act);Logger.log(str);
	                             var out = LibraryjsUtil._scrapeDataset(str,KEY,QUE,BEG,END,["$",",","%"],["","",""],false);
        /* Special Processing */                                          try{out.avmEst_zillow    =                  out.avmEst_zillow   .replace("K","000") }catch(e){Logger.log(e.message)}
		                                                                  try{out.avmEst_smartZip  =                  out.avmEst_smartZip .replace("K","000") }catch(e){Logger.log(e.message)}
                                                                          try{out.avmEst_eppraisal =                  out.avmEst_eppraisal.replace("K","000") }catch(e){Logger.log(e.message)}
							  try{if(out.avmEst_zillow   .search("M")>-1){try{out.avmEst_zillow    = 1000000 * Number(out.avmEst_zillow   .replace("M",""   ))}catch(e){Logger.log(e.message)}}}catch(e){Logger.log(e.message)}
							  try{if(out.avmEst_smartZip .search("M")>-1){try{out.avmEst_smartZip  = 1000000 * Number(out.avmEst_smartZip .replace("M",""   ))}catch(e){Logger.log(e.message)}}}catch(e){Logger.log(e.message)}
							  try{if(out.avmEst_eppraisal.search("M")>-1){try{out.avmEst_eppraisal = 1000000 * Number(out.avmEst_eppraisal.replace("M",""   ))}catch(e){Logger.log(e.message)}}}catch(e){Logger.log(e.message)}
        var arr=[],k=Object.keys(out),i=k.length;while(i--){if(out[k[i]]==1*out[k[i]]){arr.push(out[k[i]])}}
		                         try{out.estimate = Math.round(LibraryjsUtil._descriptiveStatistics(arr).Median)}catch(e){Logger.log(e.message)}
                                 /*print_test(JSON.stringify(out));* /Logger.log(JSON.stringify(out));*/return out}
function zipRealty_appendRecord(ob){var db=ScriptDb.getMyDb();ob.latestHit=new Date().getTime();ob.status={isBid:false,isAppended:{value:false,records:[]},isOffer:{value:false,records:[]},isEmailed:{value:false,records:[]}};ob.isActive=ob.detail.isActive;ob.isRaw=true;ob.isAuction=false;ob.table="situs";ob.source={name:"ZipRealty"/*,data:ob*/};/*ob.market={city:inCity,state:inState};*/try{ob.sa=ob.detail.sa/*Sometimes ob.sa="Open House:"*/}catch(e){Logger.log(e.message);return}try{ob.ratio=Math.round(100*ob.ask/ob.detail.avm.estimate)}catch(e){Logger.log(e.message)}
    if(!db.query({link_detail_1:ob.link_detail_1/*mlsName:ob.mlsName,mlsNumber_2:ob.mlsNumber_2*/}).getSize()){r=db.load(db.save(ob).getId());r.item=LibraryjsUtil.toBase62(Number(r.getId().slice(1)));db.save(r)}}
function scrape_zipRealty_ss2details(sheetName,linkName){var r,db=ScriptDb.getMyDb(),sheetIn=SpreadsheetApp./*getActiveSpreadsheet()*/openByUrl("https://docs.google.com/spreadsheet/ccc?key=0AlLVOoV_2dFtdGhYUWRRNFB0Z1JMeENETk1McnFJWHc#gid=0").getSheetByName(sheetName);
    do{var rangeIn=sheetIn.getRange(1,1,2,sheetIn.getLastColumn()),datarr=rangeIn.getValues(),datob=LibraryjsUtil.aa2ao(datarr)[0];if(datob.link_detail_redirect_1.slice(0,4)=="http"){/*if(!db.query(q).getSize()){}*/datob.detail=zipRealty_scrapeDetail(datob[linkName]);/*Logger.log(datob);*/zipRealty_appendRecord(datob);}sheetIn.deleteRow(2);}while(!rangeIn.isBlank())return} // if(/*scrape_serverPost(datob,scraped,"36sgd2m257w2j0sn5isa") // var x=UrlFetchApp.fetch("https://script.google.com/macros/s/AKfycbwT66_MExluhggRGS48QQikDxTzElT7F1WWRImBHoKDqEjFdIs/exec",{method:"post"});Logger.log(x.getResponseCode());Logger.log(x.getContentText());}
// Imported and adapted from Google Backup — Scrape — Note Inventory Sources.04.js — fciEx section (due to similar data structure, i.e. copy/paste html doc source code)
// The data collection procedure includes the following three modes. When we do a search all, we can sort the results by ID which is numerically chronological.
// We need to scrape the list pages to get the detail page URLs. So when scraping the initial batch, we load all the list results into a spreadsheet, then scrape each SS row individually for details.
// The second mode is ongoing maintenance whereby we set a 15 minute trigger to test for by searching the existence of the next ID in sequence. If the search returns a hit, we scrape the list page then immediately scrape for details.
// The final mode checks for the existence of a given product ID upon receipt of a bid or indicative offer by the client’s server. This is to see if the asset has been sold between the scrape and the bid.
// Step 1 of 3 // Manually copy HTML source code from zipRealty auto search/query; Paste source code into SS page named “Source”; Use top row only, start at first column and paste each page on a separate cell moving from left to right across the page in row one
function scrape_zipRealty_ss        (){ // Step 2 of 3 // 1. Fetch manually posted raw data from SS page named “Source” | 2. Scrape on list page at source | 3. Post to SS page named “Scraped”
    var ACT="https://docs.google.com/spreadsheet/ccc?key=0AlLVOoV_2dFtdGhYUWRRNFB0Z1JMeENETk1McnFJWHc#gid=0",ss=SpreadsheetApp./*getActiveSpreadsheet()*/openByUrl(ACT),sheetIn=ss.getSheetByName("Source"),rangeIn=sheetIn.getRange(1,1,1,sheetIn.getLastColumn()),datarr=rangeIn.getValues()[0];//Logger.log(* /print_test(JSON.stringify(datarr));
    var out=[],i=datarr.length;while(i--){out[i]=zipRealty_scrapeList(datarr[i])}LibraryjsUtil.write2ss(true,out,"Scraped",ACT);return}//Logger.log(out);
function scrape_zipRealty_getMode1(){scrape_zipRealty_ss2details("Scraped"     ,"link_detail_1")} // Step 3 of 3 // 1. Fetch details from SS (individually, one at-a-time) | 2. Write to server // Manually populate by batch // Step 1 of 3 // 1. Identify latest scraped ID | 2. Find unscraped IDs at source | 3. Manually copy from the source and paste to the SS page named “Source” // Step 2 of 3: Execute scrape_fciEx_ss() (If updating, set rangeIn columns to 1) // Step 3 of 3: Execute scrape_fciEx_ss2details() via executing this function
function scrape_zipRealty_getMode2(){ // 1 TRIGGER/day (with specified hour time frame or 1/hr planning 22 or 23 failures to achieve update within the hour of new data receipt)
                                      // var i,m=marketData(),hh=new Date().getHours()/*%12*/;// On a schedule and automatic trigger: 1. scrape emails and RSS feeds and place results into spreadsheets acting as temporary holding queues. 2. Scrape details from holding queues and save to database subject to non-duplication / update parameters
                                         zipRealty_fetchEmail();
								      // zipRealty_fetchRSS  (); 
                                         scrape_zipRealty_ss2details("ScrapedEmail","link_detail_1" );
								      // scrape_zipRealty_ss2details("ScrapedRSS"  ,"link"          );
							          // if(hh==7)
                                      //   {i=m.markets.length;while(i--){ac_scrapeListSearch(m.markets[i].city,m.markets[i].state)}} // Technically, this line is not a ZipRealty scrape but Auction.com instead
									}
//function scrape_zipRealty_getMode3(){} // Verify for sale at any time, on demand, after bid is made // Not applicable to this data source at this time.
// --------------------------- INCOMING DATA SOURCE: SCRAPE : HOMEPATH.COM ---------------------------
// http://www.homepath.com/listing/search?q=Los+Angeles%2C+CA&pi=&pa=&bdi=&bhi=&x=31&y=10
// --------------------------- INCOMING DATA SOURCE: SCRAPE : REALTOR.COM ---------------------------
function realtorScrape(inState,inCity){//var inState=inState||"CA",inCity=inCity||"San-Diego";//Not case-sensitive//Returns array of situs objects from Realtor.com foreclosure MLS listings//URL:http://www.realtor.com/foreclosures/San-Diego_CA/sby-1/pg-2?pgsz=200//Alt URL:act="http://www.realtor.com/search/searchresults.aspx?sby=1&pgsz=10&loc=phoenix%2c+az&pr=false&status=foreclosures&pg=1"; // var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())} // Notes: For scraping page-by-page, need to determine 3rd argument (token) in scrape function. Hopefully, this will work at least until scrape volume reaches 200 and we need to paginate.
    var i,str,data=[],out=[],act="http://www.realtor.com/foreclosures/"+inCity+"_"+inState+"/type-single-family-home"+"/sby-1"/*+"/pg-"+(++pg)*/+"?ml=4&pgsz=200" // "http://www.realtor.com/foreclosures/San-Diego_CA/type-single-family-home/sby-1?ml=4&pgsz=200"
    ,   KEY = [ , "link" , "address_long_1" , "link_photo" , "address_long_2" , "sa"                     , "city"         , "state"          , "zip"            , "latitude"   , "longitude"  , "listingPrice"  , "beds"         , "baths"         , "sqft"         , "lot"          , "propertyType"          , "brokeredBy"          ]
    ,   QUE = [ , "href" , "title"          , "src"        , "alt"            , "listing-street-address" , "listing-city" , "listing-region" , "listing-postal" , "latitude"   , "longitude"  , "listing-price" , "listing-beds" , "listing-baths" , "listing-sqft" , "listing-sqft" , "listing-property-type" , "listing-brokered-by" ]
    ,   BEG = [ , "\""   , "\""             , "\""         , "\""             , ">"                      , ">"            , ">"              , ">"              , "content=\"" , "content=\"" , "$"             , "<em>"         , "<em>"          , "<em>"         , "<em>"         , ">"                     , ":"                   ]
    ,   END = [ , "\""   , "\""             , "\""         , "\""             , "<"                      , "<"            , "<"              , "<"              , "\""         , "\""         , "<"             , "<"            , "<"             , "<"            , "<"            , "<"                     , "\""                  ]
    ;   try{str=UrlFetchApp.fetch(act).getContentText()}catch(e){Logger.log(e.message);return} //Logger.log(act);}
	var arr=str.split("listing-wrap").slice(5);i=arr.length;while(i--){data[i]                = LibraryjsUtil._scrapeDataset(arr[i],KEY,QUE,BEG,END,["$",",","%"],["","",""],true);
                                                                       data[i].isPriceReduced = (arr[i].indexOf("i-price-reduced"  )>-1);
                                                                       data[i].isForeclosure  = (arr[i].indexOf("badge-foreclosure")>-1);
                                                                       data[i].isBankOwned    = (arr[i].indexOf("badge-bank-owned" )>-1);//Logger.log(isForeclosure);Logger.log(isPriceReduced);Logger.log(isBankOwned);}
							              /* Special Processing */ try{data[i].propertyType   = LibraryjsUtil.convrepl   (data[i].propertyType,{"Single Family Home":"SFR"/*,"Commercial":"CRE","Multifamily":"MUL","Hospitality":"CRE"*/},arr[i].propertyType);}catch(e){Logger.log(e.message)}
                                                                   try{data[i].sa             = LibraryjsUtil.toCaseTitle(data[i].sa                                                                                                                          );}catch(e){Logger.log(e.message)}
                                                                   try{data[i].city           = LibraryjsUtil.toCaseTitle(data[i].city                                                                                                                        );}catch(e){Logger.log(e.message)}
                                                                        out[i]                = {isRaw:true,source:{name:"Realtor",data:data[i]},market:{city:inCity,state:inState}};
                                                                      }/*print_test(JSON.stringify(out));/*Logger.log(JSON.stringify(out));*/return out}
function realtorScrape_call(city,state){db=ScriptDb.getMyDb(),arr=realtorScrape("San-Diego","CA");/*Logger.log(arr)*/db.saveBatch(arr,false);return} // OBSO -> // Instructions: To load db with data, 1. Run realtorScrape_call(city,state); 2. Run realtorAddAvm();
function realtorAddAvm(){var db=ScriptDb.getMyDb(),r,q,results=db.query({isRaw:true});while(results.hasNext()){r=results.next();q=LibraryjsAvm.avmJson(r);q.item=LibraryjsUtil.toBase62(Number(r.getId().slice(1)));db.save(q);db.remove(r);}} // Add this function on a trigger (e.g. 10 minutes) when sourcing from Realtor.com
// ============================== IMPORTED and ADAPTED FROM DEALDIGGER™ ==============================
// ----------------------- Code.gs -----------------------
//function doPost(e){return x.y();}
//function doGet(){return ContentService.createTextOutput("Hello World").setMimeType(ContentService.MimeType.TEXT)}
//function doGet(e){ // References: https://developers.google.com/apps-script/guides/html-service-communication#private_functions // https://sites.google.com/site/appsscripttutorial/miscellaneous/creating-form-elements-dynamically-using-google-apps-script-gas
 // if(e && e.parameter && e.parameter.jsoncallback){return ContentService.createTextOutput("foo({result:'<strong>Hello</strong> World'});").setMimeType(ContentService.MimeType.TEXT);}
function doGet(e){ // References: https://developers.google.com/apps-script/guides/html-service-communication#private_functions // https://sites.google.com/site/appsscripttutorial/miscellaneous/creating-form-elements-dynamically-using-google-apps-script-gas
    if(e && e.parameter && e.parameter.k){var k=e.parameter.k,m=e.parameter.m,p=e.parameter;switch(k){
            case   /* test                   */ "uy8mi25thrp8t2l0zt7y" : return ContentService.createTextOutput("Hello World"                                                                            ).setMimeType(ContentService.MimeType.  TEXT /*JSON*/           );break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
			case   /* buyer  register        */ "fruif01iaqqdgmqq1glu" : return ContentService.createTextOutput(e.parameter.jsoncallback+"({'result':'<div style=\"overflow:hidden\"><iframe scrolling=\"no\"   style=\"xmargin-top:-200px;width:100%;height:1200px;\" src=\"https://sites.google.com/site/dealdiggeronline/parties/buyer/register-buyer#sites-canvas-main-content\"    ></iframe></div>'})").setMimeType(ContentService.MimeType./*TEXT */JSON             );break;
            case   /* buyer  serve Realtor   */ "9l4y95xhwwi8q2hbkslp" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(serveBuyers_a         ( )) + ")"           ).setMimeType(ContentService.MimeType./*TEXT* /JSON*/JAVASCRIPT );break; // Use .setMimeType(ContentService.MimeType.JAVASCRIPT) to fix error: Refused to execute script from <URL> because its MIME type ('application/json'||'text/plain') is not executable, and strict MIME type checking is enabled.
            case   /* buyer  serve ZipRealty */ "5rmywv9gdz0e5mlnoeye" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(serveBuyers_b         ( )) + ")"           ).setMimeType(ContentService.MimeType./*TEXT* /JSON*/JAVASCRIPT );break; 
            case   /* buyer  serve Auction   */ "2qh4ftl3dpzqg6wovlam" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(serveBuyers_c         ( )) + ")"           ).setMimeType(ContentService.MimeType./*TEXT* /JSON*/JAVASCRIPT );break; 
            case   /* buyer  receive         */ "2kpco3hg68eo6alklck6" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(receiveBuyer          (p)) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
            case   /* agent  serve Realtor   */ "q82jtqjv098lh1y1n1f4" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(serveAgents_a         ( )) + ")"           ).setMimeType(ContentService.MimeType./*TEXT* /JSON*/JAVASCRIPT );break; 
            case   /* agent  serve ZipRealty */ "s312dywjhqj8flzzg350" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(serveAgents_b         ( )) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
            case   /* agent  serve Auction   */ "asfquyaqffplleoyfk1e" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(serveAgents_c         ( )) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
            case   /* agent  receive         */ "nmpk3kkow3dgri7zwu30" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(receiveAgent          (p)) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
            case   /* lender serve ZipRealty */ "kdwjyokydw92t4wbn1y5" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(serveLenders_b        ( )) + ")"           ).setMimeType(ContentService.MimeType./*TEXT* /JSON*/JAVASCRIPT );break; 
            case   /* lender receive         */ "udys49wmxq10akjr533q" : return ContentService.createTextOutput(e.parameter.    callback+"(" + JSON.stringify(receiveLender         (p)) + ")"           ).setMimeType(ContentService.MimeType./*TEXT /*JSON*/JAVASCRIPT );break; 
            case   /* offer  serve feedback  */ "46bawio3def1vhprh9uq" : return ContentService.createTextOutput(                               JSON.stringify(ScriptDb.getMyDb().query({item:m}).next()) ).setMimeType(ContentService.MimeType.  TEXT /*JSON*/           );break; 
         // case   /* agent  create ss       */ "fpno5a5ibld1jlw4jjcu" : var h=HtmlService.createTemplateFromFile("ssExport")/*;h.m=m Parameter*/;return h.evaluate()           ;break; // Debug: {var t=HtmlService.createTemplateFromFile("researcher").evaluate();Logger.log(t.getCodeWithComments);return t;}).setMimeType(ContentService.MimeType.TEXT/*JSON*/);break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
         default                                                       : break;}}
    if(SitesApp.getActivePage()){var pageName = SitesApp.getActivePage().getName();switch(pageName){
            case   "authorize" : return authorize                           (          ).setSandboxMode(HtmlService.SandboxMode.NATIVE )           ;break;
         // case   "buyer"     : return HtmlService.createTemplateFromFile  ("reports" ).evaluate()                                                ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
			case   "sandbox"   : return HtmlService.createHtmlOutputFromFile("sandbox2").setSandboxMode(HtmlService.SandboxMode.NATIVE )           ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
			case   "buyer"     : return HtmlService.createHtmlOutputFromFile("reports" ).setSandboxMode(HtmlService.SandboxMode.NATIVE )           ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
			case   "agent"     : return HtmlService.createHtmlOutputFromFile("reports" ).setSandboxMode(HtmlService.SandboxMode.NATIVE )           ;break; // Reference: https://developers.google.com/apps-script/guides/html-service-caja#setsandboxmode
            case   "export"    : var ss=SpreadsheetApp.create("ss"+new Date().getTime());LibraryjsUtil.write2ss(true,serveAgents_b().records,"Sheet1",ss.getId());return HtmlService.createHtmlOutput("<div align='center'><a href='"+ss.getUrl()+"'>Click</a></div>");break; // Debug: {var t=HtmlService.createTemplateFromFile("researcher").evaluate();Logger.log(t.getCodeWithComments);return t;}).setMimeType(ContentService.MimeType.TEXT/*JSON*/);break; // References // http://www.dimpost.com/2012/12/iframe-how-to-display-specific-part-of.html // http://stackoverflow.com/questions/5676672/how-do-i-crop-the-contents-of-an-iframe-to-show-a-part-of-a-page/14004622#14004622
         default               : break;}}}
// ---------------------------------------------------------------- AUTHPAGE ----------------------------------------------------------------
function authorize(){return HtmlService.createHtmlOutput(/*Session.getUser().getEmail()+*/"<div align='center' style='color:#808080;font-family:verdana;color:#1925AF;font-weight:bold;margin-top:15px;'>Authorization successful!<div style='color:#808080;font-size:smaller;font-weight:normal;'>You may now access all features</div><img src='https://lh5.googleusercontent.com/-BIZ7mfp5ckk/TVZR8NYKMKI/AAAAAAAABS0/SR1Pg44rAGs/s1600/checkmark1.jpg'></div>")}
// ------------------------------------------------------------------ DEALS -------------------------------------------------------------------
function emailOffer_auto    (){/*<strike>1 TRIGGER/day</strike>upon agent user event*/var ID="1i5E3NoITWHZs-cU02hmVrX25z5LczSWupx2-_HHRlM4",user=Session.getUser().getEmail()
    , db = ScriptDb.getMyDb(),m=LibraryjsUtil.queryArray(LibraryjsUtil.ss2ao(ID,"Markets"),{Agent:user},"RETURN_ALL")
	, q  = {table:"situs",source:{name:"ZipRealty"},marketCity:m.City,marketState:m.State,isAppended:{value:true},isOffer:{value:true},isEmailed:{value:false}} // Add case: agent serves multiple markets // isEmailed.value=false in constructOffer_auto()
	, result=db.query(q);while(result.hasNext()){r=result.next();
	try{var emailSuccess = emailOffer(r)}catch(e){Logger.log(e.message)}
		if (emailSuccess){ // Email offer + report same
				r.status.isEmailed.value=true;
			if(!r.status.isEmailed.records){r.status.isEmailed.records=[]} // Logger.log("%s,%s",r.status.isEmailed,r.status.isEmailed.records);
				r.status.isEmailed.records.unshift({timestamp:t,agentEmail:r.status.isAppended.records[0].agentEmail})}db.save(r)}return}
function emailOffer(r/*docId,emailTo,itemNo*/){r=r||db.query({item:itemNo}).next();var itemNo=/*itemNo||*/r.item/*||"MHInLUs"/*"MHwxp00"*/,db=ScriptDb.getMyDb(),/*,la=db.query({table:"agent",licNum:r.detail.listingAgent.licNum}).next()||r.detail.listingAgent,*/docId=/*docId*/r.bids[0].docId||/*"1pDaWLWqnODwU-WQLpuwjH_FJ88dgANz2_wloziQp85k"*/"1ShkqxfCvKEKCp8c_oo8ovznRT5oi70-8c_kTT3tF0nA",m=LibraryjsUtil.ddGetMarketData(r.marketState,r.marketCity),emailTo="bruce.p.nolan@gmail.com"/*r.mlsListing.agent_email /*"atlaslive@gmail.com"/*r.statusArray[0]* /r.listingAgent.email* /la.email.auto[0]||la.email.manual[0]/** /*/,t=new Date().getTime(),doc=DriveApp.getFileById(docId),docName=doc.getName(),arr=docName.split("|"),sa=arr[0].split(",")[0].trim() // Reference: http://ctrlq.org/code/19117-save-gmail-as-pdf // doc=DocsList.createFile("body.html","This is content as a string","text/html") // Actual size: 8.11MB // Gmail 25MB per http://email.about.com/od/gmailtips/qt/Message_and_Attachment_Size_Limits_in_Gmail.htm // 2GB limit per GDrive manual DL notice // 10MB limit per https://support.google.com/drive/answer/37603?hl=en // Debugging Note: In response to the error message: "We're sorry, a server error occurred. Please wait a bit and try again. (line 20, file "Test2")" we tracked down and deleted a carriage return/line feed immediately following the .png image at the bottom of RPA4 (page 6/14) which seemed to fix the problem
    ,urlWeb=m.agent.WebUrl/*"http://alticorerealty.com/AgentRoster?op=agent&act=webprofile&agent_id=1857592119"*/,urlPhoto=m.agent.PhotoUrl/*"https://lh5.googleusercontent.com/-gFvSJU9ks8I/U04wrA5GglI/AAAAAAAAK_g/R-j54csSR58/s144/KenGreen.jpg"*/,urlLogo=m.agent.MastheadUrl/*"https://lh3.googleusercontent.com/-S6PeqOjlYe0/U1R7Hjh0iDI/AAAAAAAALGc/YgIjFUfIEng/s800/masthead-alticore.png"/*Registers outgoing email only ,urlWebBeacon="https://script.google.com/macros/s/AKfycbwvVW94y9Cbm82c2LfCr3umxSVw-RPuRqVN1paCX1N0CGfUSAuU/exec?k=73gtzu48hxf3nv2e8n4h&m="+itemNo/*"MH7rUG3"* /,webBeaconBlob=UrlFetchApp.fetch(urlWebBeacon)*/,photoBlob=UrlFetchApp.fetch(urlPhoto).getBlob().setName("Photo"),logoBlob=UrlFetchApp.fetch(urlLogo).getBlob().setName("Company Logo"),str="Please accept<span  title=\"Our client is a professional investor who purchases a prodigious volume of local distressed properties at a discount. They always close quickly, with cash. They seek to make a deal today at the fair price for investors in this business.\"> our <img src=\"https://lh5.googleusercontent.com/-7tzncf2rnG4/U0uHa9qCtcI/AAAAAAAAK-E/1FtM0mKhmvw/s144/Information_Sign.jpg\" height=\"14\"> client&rsquo;s </span>attached offer to purchase "+sa/*123 Main St*/+" for "+arr[2]/*$90,000*/.trim()+" cash. Please click &#9758;"    
    +" <a href=\"https://script.google.com/macros/s/AKfycbwvVW94y9Cbm82c2LfCr3umxSVw-RPuRqVN1paCX1N0CGfUSAuU/exec?k=w5c079zl5n3unb2xrcts&m="+itemNo/*4z90ftmvunnjbo2xc8ib\"*/+"\" title=\"Click here if you want to ACCEPT the offer\" ><button type=\"button\" onclick=\"window.location.href=''\"><span style=\"color:#00D800;font-weight:bold\"  >&#10004;</span> Accept</button ></a>"
    +" <a href=\"https://script.google.com/macros/s/AKfycbwvVW94y9Cbm82c2LfCr3umxSVw-RPuRqVN1paCX1N0CGfUSAuU/exec?k=7rj390d9aoyun6ys7244&m="+itemNo/*4z90ftmvunnjbo2xc8ib\"*/+"\" title=\"Click here if you want to REJECT the offer\" ><button type=\"button\" onclick=\"window.location.href=''\"><span style=\"color:red    ;font-weight:normal\">&#10006;</span> Reject</button ></a>" // Round button corners // Reference: http://stackoverflow.com/questions/9777546/portable-round-corners-on-html-button // style=\"-moz-border-radius: 5px;-webkit-border-radius:5px;-khtml-border-radius:5px;border-radius:5px;border-width:1px;border-color:black;\"
    +" <a href=\"https://script.google.com/macros/s/AKfycbwvVW94y9Cbm82c2LfCr3umxSVw-RPuRqVN1paCX1N0CGfUSAuU/exec?k=7rj390d9aoyun6ys7244&m="+itemNo/*4z90ftmvunnjbo2xc8ib\"*/+"\" title=\"Click here if you want to COUNTER the offer\"><button type=\"button\" onclick=\"window.location.href=''\"><span style=\"color:blue   ;font-weight:normal\">&#10226;</span> Counter</button></a>"
    +"<br><br><a href='"+urlWeb+"'><img src='cid:photo' height='90'><img src='cid:logo' height='90'></a><img src='https://script.google.com/macros/s/AKfycbwvVW94y9Cbm82c2LfCr3umxSVw-RPuRqVN1paCX1N0CGfUSAuU/exec?k=73gtzu48hxf3nv2e8n4h&m="+itemNo/*MH7rUG3*/+"'>" // ,urlAcc="http://alticorerealty.com/",bAcc   ="https://lh4.googleusercontent.com/-Scc6e1vxx7s/U0i1bz7YukI/AAAAAAAAK6E/d-HgDdDeBn0/s400/buttonAccept.png"          ,bAccBlob=UrlFetchApp.fetch(bAcc   ).getBlob().setName("Button Accept" ) // ,sAcc   ="https://lh6.googleusercontent.com/-9XjJKgIJfNE/U0i7WyFa0WI/AAAAAAAAK7s/QDXMVxxgSPM/s144/greencheck-transparent.png",sAccBlob=UrlFetchApp.fetch(sAcc   ).getBlob().setName("Symbol Accept" ) // ,urlRej="http://alticorerealty.com/",bRej   ="https://lh4.googleusercontent.com/-wJ9QKAvw-Gw/U0i1cUYO__I/AAAAAAAAK6c/HXeiYGzJIg8/s400/buttonReject.png"          ,bRejBlob=UrlFetchApp.fetch(bRej   ).getBlob().setName("Button Reject" ) // ,sRej   ="https://lh5.googleusercontent.com/-9vIkIXNcNGM/U0i7WyxlgiI/AAAAAAAAK7w/WDBIyEXfYsg/s144/redx.png"                  ,sRejBlob=UrlFetchApp.fetch(sRej   ).getBlob().setName("Symbol Reject" ) // ,urlCof="http://alticorerealty.com/",bCof   ="https://lh5.googleusercontent.com/-uG_-NR2g-Wg/U0i1cafXhmI/AAAAAAAAK6I/hyPAiJjPKJA/s400/buttonCounter.png"         ,bCofBlob=UrlFetchApp.fetch(bCof   ).getBlob().setName("Button Counter") // ,sCof   ="https://lh3.googleusercontent.com/-kxllpnfBUIk/Ux-qRjdJ2eI/AAAAAAAAJoU/aMcpZk44PDo/s144/large.png"                 ,sCofBlob=UrlFetchApp.fetch(sCof   ).getBlob().setName("Symbol Counter")
    ,pdf={fileName:"Cash Offer to Purchase "+sa+" for "+arr[2].trim(),content:doc.getAs("application/pdf").getBytes(),mimeType:"application/pdf"};/*Logger.log(docName);Logger.log(arr);*/MailApp.sendEmail(emailTo,"Cash Offer for "+docName,"",{attachments:[pdf],name:("Realtor, "+m.agent.FirstName/*Kenneth*/+" "+m.agent.LastName/*Green*/),/*noReply:true,*/htmlBody:str,inlineImages:{photo:photoBlob,logo:logoBlob/*,webBeacon:webBeaconBlob*/}/*,from:"atlaslive@gmail.com"GMailApp.getAliases()*/}) //DocsList.getFileById(doc.getId()).setTrashed(true) // Not working: function gdoc2pdf(id){id=id||/*"1S9LjaFTQ-3d5gQm-uAnCuHiBp6FfBare5vo6T02Knt4"*/"1zzUR5C6azVlntx3SdG1PsKoPI-lYnDasgkUFlUdVZYA";var doc=DriveApp.getFileById(id)/*.getAs("application/pdf").setContentType("application/pdf")*/;DriveApp.getRootFolder().createFile("Test",doc.getAs("application/pdf").getBytes(),MimeType.PDF);}
    SpreadsheetApp.openById("1ASaJ_W0ha248DgFl2R9XWQ5M1kaAnb2RpqUlMjpB2hc").getSheetByName("Sent")/*.getSheets()[2]/*.insertRowBefore(2)*/.appendRow([t,itemNo,r.detail.ask,r.bids[0].amount,r.sa,r.csz]); // Write to SS // write2ss()
    UrlFetchApp.fetch("https://script.google.com/macros/s/AKfycbwvVW94y9Cbm82c2LfCr3umxSVw-RPuRqVN1paCX1N0CGfUSAuU/exec",{method:"post",payload:{m:JSON.stringify(r),k:"t46o64lmmi14fclw3zjf"}});return true} // Post to DB //function test(){Logger.log(UrlFetchApp.fetch("https://script.google.com/macros/s/AKfycbwvVW94y9Cbm82c2LfCr3umxSVw-RPuRqVN1paCX1N0CGfUSAuU/exec",{method:"post",payload:{k:"t46o64lmmi14fclw3zjf",m:{j:5,o:"n"}}}).getContentText()) // Post to DB}
function constructOffer_auto(ageMin){ageMin=ageMin||/*30*/1;//1 TRIGGER/day//@param{int} min days to lookback//@return{void} Construct new offers if still for sale //pseudocode: query(DB);loop(r){write([r.ask,r.linkUrl]);if(r.ask){write(r.bid);constructOffer(r);}}
    var t=new Date().getTime(),db=ScriptDb.getMyDb(),r,s,m=0,n=0,p=0,q={table:"situs",isActive:true,latestHit:db.lessThan(t-ageMin*1000*60*60*24),status:{isAppended:{value:true},isBid:true}/*,item:"MH50xkR"/*db.not(db.anyValue())*/},results=db.query(q);while(results.hasNext()){r=results.next();
        try{s=zipRealty_scrapeDetail(r.detail.link_detail_1);if(s.ask){r.isActive=true;var newPrice=r.bids[0].amount/*Math.min(s.ask,r.bids[0].amount) >> Two issues: 1. (Current) policy to not reduce bids; also for auctions; 2. If status!=active, r.ask==null/0/undefined >> bid==0*/;Logger.log("m:"+(++m)+" | item:"+r.item+" | ask:"+s.ask+" | bid:"+r.bids[0].amount+" | "+s.link_detail_1);
            r.ask=s.ask;r.bids.unshift({amount:newPrice,bidder:r.bids[0].bidder,confirmed:false,timestamp:t});r.bids[0].docId=LibraryjsUtil.constructOffer(r);}else{r.isActive=false;Logger.log("n:"+(++n)+" | "+r.detail.link_detail_1)}} // Record intentionally not added to bids table to distinguish this auto update from manual bids by buyers
        catch(e){/*r.isActive=false;*/Logger.log("p:"+(++p));Logger.log(e.message)/*Logger.log(JSON.stringify(s))*/}if(s.status==null){s.status={}}
 /* Note: constructOffer() must be called by automated trigger to control visibility of the source googleDoc template to the user.
		try{var offerId      = LibraryjsUtil.constructOffer(r)}catch(e){Logger.log(e.message)}
		    if (offerId){
			        r.status.isOffer.value=true;
		        if(!r.status.isOffer.records){r.status.isOffer.records=[]} // Logger.log("%s,%s",r.status.isOffer,r.status.isOffer.records);
		            r.status.isOffer.records.unshift({timestamp:t,docId:offerId})}db.save(r); */
		if(!r.status.isOffer  ){r.status.isOffer  ={records:[]}}r.status.isOffer  .value=true ;r.status.isOffer.records.unshift({timestamp:t,docId:doc.getId()});
        if(!r.status.isEmailed){r.status.isEmailed={records:[]}}r.status.isEmailed.value=false;
		r.latestHit=t;db.save(r)}} // http://www.1728.org/halflife.htm t47b115e52h41 h41b50t30e30
function appendAgent_auto(){/*1 TRIGGER/day*/var db=ScriptDb.getMyDb(),q={table:"situs",source:{name:"ZipRealty"},status:{isAppended:{value:false}}/*,mlsListing:db.not(db.anyValue())*/},result=db.query(q);while(result.hasNext()){appendAgent(result.next())}}
function appendAgent(s/*situs*/){var i=0,ar=[],t=new Date().getTime(),db=ScriptDb.getMyDb(),q={table:"mlsListing",mlsNum_1:db.anyOf([s.detail.mlsNumber_1,s.detail.mlsNumber_2]),mlsNum_2:db.anyOf([s.detail.mlsNumber_1,s.detail.mlsNumber_2])},result=db.query(q);
    while(result.hasNext()){var r=result.next();ar.push(r.getId());if((!(i++))&&(!s.mlsListing)){// Note: If future revisions find email addresses are available via manual lookup, examine if the problem is that there are potentially multiple updates to the MLS listing that are not being picked up by the code because we status as isAppended even if !LibraryjsUtil.isEmail(r.mlsListing.agent_email)
	    if(s.status==undefined){s.status={}}if(!s.status.isAppended){s.status.isAppended={records:[]}}s.status.isAppended.value=true;s.status.isAppended.method="auto";if(s.status.isAppended.records==null){s.status.isAppended.records=[]}s.status.isAppended.records.unshift({timestamp:t,agentEmail:/*s.mlsListing*/r.agent_email})
	    s.mlsListing=r;db.save(s)}}db.removeByIdBatch(ar,false);return LibraryjsUtil.isEmail(s.mlsListing.agent_email)?true:false} // Ignores multiple listings/data and deletes them
/*function appendAgent2(){ // Future development. This function will automatically search the "agent" table for agent license number and update email fields upon receiving new bids (receiveBuyer()) and possibly new records (scrape())
    try{var la=db.query({table:"agent",licNum:r.detail.listingAgent.licNum}).next();return r.mlsListing.agent_email||(la.email.auto[0]||la.email.manual[0])}catch(e){Logger.log(e.message);return "";}}() // 
*/
function update_ss2status(){ // 1. Fetch status details from SS (individually, one at-a-time) | 2. Write to server // Adapted from scrape_fciEx_ss2details()
    var sheetName=["Clicked"/*,"Opened"*/],db=ScriptDb.getMyDb(),sheetIn=SpreadsheetApp/*.getActiveSpreadsheet()*/.openById("1ASaJ_W0ha248DgFl2R9XWQ5M1kaAnb2RpqUlMjpB2hc").getSheetByName(sheetName[0]);do{
    var rangeIn=sheetIn.getRange(1,1,2,sheetIn.getLastColumn()),ar=rangeIn.getValues(),ob=LibraryjsUtil.aa2ao(ar)[0];//Logger.log(JSON.stringify(ob));// Modified code after this comment does not apply because data is being pulled, not pushed //,scraped=scrape_fciEx_detail(datob.link_details);if(!scraped){sheetIn.deleteRow(2);return};if(scrape_serverPost(datob,scraped,"36sgd2m257w2j0sn5isa")){sheetIn.deleteRow(2)}return} // var x=UrlFetchApp.fetch("https://script.google.com/macros/s/AKfycbwT66_MExluhggRGS48QQikDxTzElT7F1WWRImBHoKDqEjFdIs/exec",{method:"post"});Logger.log(x.getResponseCode());Logger.log(x.getContentText());}
    var r=db.query({item:ob.item}).next();if(r.status==undefined){r.status={}}if(r.status.auto==undefined){r.status.auto={}}if(r/*.statusArray*/.status.auto.array==undefined){r/*.statusArray*/.status.auto.array=[]}ob.status=sheetName[0];r/*.statusArray*/.status.auto.array.unshift(ob);r/*.statusArray*/.status.auto.array.sort(function(a,b){var x="timestamp";return(a[x]-b[x])}).reverse();//ar[0]=newest
    try{if(ob.price=="TRUE"){GmailApp.sendEmail("atlaslive@gmail.com,6192533000@mms.att.net,alticore.ken@gmail.com","Accepted Offer!",r.sa+", "+r.csz);}}catch(e){Logger.log(e.message)} // Email accepted offer notice
	var i=r/*.statusArray*/.status.auto.array.length;while(i--){if(r/*.statusArray*/.status.auto.array[i].status=="Clicked"){r/*.statusCurrent*/.status.auto.current={status:"Clicked",timestamp:r/*.statusArray*/.status.auto.array[i].timestamp};break;}else if(r/*.statusArray*/.status.auto.array[i].status=="Opened"){r/*.statusCurrent*/.status.auto.current={status:"Opened",timestamp:r/*.statusArray*/.status.auto.array[i].timestamp}}} // Update r.status.auto.current
    if(db.save(r)){sheetIn.deleteRow(2)}}while(LibraryjsUtil.isObject(ob));return}
function serveBuyers_a(){/*r.com*/var ob=[],arr=[],i,j,k,r,t=[],zil=[],user=Session.getUser().getEmail(),out={"totalResultsCount":0,"records":[]},db=ScriptDb.getMyDb(),results=db.query({table:"situs",isRaw:false,source:{name:"Realtor"/*"ZipRealty"/*"ChuckWillman"/*"KennethGreen"*/}}).sortBy("avm.stat.ratio",db.ASCENDING/*DESCENDING*/,db.NUMERIC/*LEXICAL*/);while(results.hasNext()){r=results.next();i=out.totalResultsCount++;
	out.records[i]={};try{if(r.avm.dataset.zillow.searchresults.response.results.result){zil[i]=r.avm.dataset.zillow.searchresults.response.results.result}}catch(e){Logger.log(e.message);zil[i]={};} // Shortcut to Zillow results
	try{out.records[i].MyBid=LibraryjsUtil.queryArray(r.bids,{bidder:user},"amount","HIGH")}catch(e){Logger.log(e.message)}; // "MyBid" // try{if(r.bids){arr[i]=r.bids;j=arr[i].length;while(j--){t[j]=0;if(arr[i][j].bidder==user&&(arr[i][j].timestamp>t[j])/*&&(!arr[i][j].confirmed)*/){t[j]=arr[i][j].timestamp;out.records[i].MyBid=arr[i][j].amount}}}}catch(e){Logger.log(e.message)}; // "MyBid"
	ob[i] = {
		"nolink"                         : {
				"arv"                    : function(){try{return            r.arv                         .value                    }catch(e){Logger.log(e.message);return "";}}() // "arv" Strict input // ARV
			,	"ask"                    : function(){try{return            r.ask                                                   }catch(e){Logger.log(e.message);return "";}}() //
			,	"ask_round"              : function(){try{return Math.round(r.ask                                 / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"autoEst"                : function(){try{return            r.avm.stat.autoEst                                      }catch(e){Logger.log(e.message);return "";}}() //
			,	"autoEst_round"          : function(){try{return Math.round(r.avm.stat.autoEst                    / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"avmStatSet"             : function(){try{return            r.avm.stat.set                                          }catch(e){Logger.log(e.message);return "";}}() // "avmStatSet" Array of AVM statistics
			,	"baths"                  : function(){try{return            r.avm.combi.baths                                       }catch(e){Logger.log(e.message);return "";}}() //
			,	"beds"                   : function(){try{return            r.avm.combi.beds                                        }catch(e){Logger.log(e.message);return "";}}() //
			,	"city"                   : function(){try{return            r.address.city                                          }catch(e){Logger.log(e.message);return "";}}() //
			,	"cof"                    : function(){try{return            r.counter                     .value                    }catch(e){Logger.log(e.message);return "";}}() // "cof" Strict input // Counter
			,	"com"                    : function(){try{return            r.LST_Attributes[21].attribute_value                    }catch(e){Logger.log(e.message);return "";}}() // "com" Strict input // Comments 
			,	"full"                   : function(){try{return            r.address.full                                          }catch(e){Logger.log(e.message);return "";}}() //
			,	"grm"                    : function(){try{return Math.round(r.ask/(12*Number(zil[i].rentzestimate.amount.Text)))    }catch(e){Logger.log(e.message);return "";}}() // "grm" Compute gross rent margin
			,	"ia"                     : function(){try{return            r.incomeApproach                                        }catch(e){Logger.log(e.message);return "";}}() // "ia"  Compute price per income approach
			,	"ia_round"               : function(){try{return Math.round(r.incomeApproach                      / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
            ,   "item"                   : function(){try{return            r.item                                                  }catch(e){Logger.log(e.message);return "";}}() //
			,	"lastSoldPrice"          : function(){try{return            r.avm.combi.lastSoldPrice                               }catch(e){Logger.log(e.message);return "";}}() //
			,	"lastSoldPrice_round"    : function(){try{return Math.round(r.avm.combi.lastSoldPrice             / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"lastSoldYear"           : function(){try{return            r.avm.combi.lastSoldYear                                }catch(e){Logger.log(e.message);return "";}}() //
			,	"lot"                    : function(){try{return            r.avm.combi.lot.Text                                    }catch(e){Logger.log(e.message);return "";}}() //
			,	"lot_round"              : function(){try{return Math.round(r.avm.combi.lot.Text                  /  100 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"popCount"               : function(){try{return            r.avm.stat.popCount                                     }catch(e){Logger.log(e.message);return "";}}() //
			,	"psf"                    : function(){try{return Math.round(r.ask/*avm.stat.autoEst*//r.avm.combi.sqft)             }catch(e){Logger.log(e.message);return "";}}() // "psf" Compute price per square foot
			,	"ratio"                  : function(){try{return            r.avm.stat.ratio                                        }catch(e){Logger.log(e.message);return "";}}() // "rent"
			,	"rent"                   : function(){try{return Math.round(zil[i].rentzestimate.amount.Text             )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"rent_round"             : function(){try{return Math.round(zil[i].rentzestimate.amount.Text      /  100 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"rep"                    : function(){try{return            r.repairs                     .value                    }catch(e){Logger.log(e.message);return "";}}() // "rep" Strict input // Repairs
			,	"sa"                     : function(){try{return            r.address.sa                                            }catch(e){Logger.log(e.message);return "";}}() //
			,	"sdPct"                  : function(){try{return            r.avm.stat.sdPct                                        }catch(e){Logger.log(e.message);return "";}}() //
			,	"sf"                     : function(){try{return            r.avm.combi.sqft                                        }catch(e){Logger.log(e.message);return "";}}() //
			,	"sf_round"               : function(){try{return Math.round(r.avm.combi.sqft                      /  100 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"state"                  : function(){try{return            r.address.state                                         }catch(e){Logger.log(e.message);return "";}}() //
            ,	"useCode"                : function(){try{return            r.avm.combi.useCode                                     }catch(e){Logger.log(e.message);return "";}}() //
			,	"taxAmt"                 : function(){try{return            r.avm.combi.taxAmt                                      }catch(e){Logger.log(e.message);return "";}}() //
			,	"taxAmt_round"           : function(){try{return Math.round(r.avm.combi.taxAmt                    /  100 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"taxVal"                 : function(){try{return            r.avm.combi.taxVal                                      }catch(e){Logger.log(e.message);return "";}}() //
			,	"taxVal_round"           : function(){try{return Math.round(r.avm.combi.taxVal                    / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
            ,	"yearBuilt"              : function(){try{return            r.avm.combi.built                                       }catch(e){Logger.log(e.message);return "";}}() //
			,	"zip"                    : function(){try{return            r.address.zip                                           }catch(e){Logger.log(e.message);return "";}}() //
										   }
	,	"link"		                     : {
				"link_boa"               : function(){try{return  /*ok*/    r.link.boa                                              }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_chase"             : function(){try{return  /*ok*/    r.link.chase                                            }catch(e){Logger.log(e.message);return "";}}() //
            ,	"link_eppraisal"         : function(){try{return  /*L1*/    r.avm.dataset.eppraisal.link                            }catch(e){Logger.log(e.message);return "";}}() // Errors: L1 local; L2 site suspected; L3 site confirmed; OK works; ok works but must copy/paste address
			,	"link_googleMap"         : function(){try{return  /*OK*/    r.link.gmap                                             }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_homeGain"          : function(){try{return  /*L3*/    r.avm.dataset.homeGain.link                             }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_homesCom"          : function(){try{return  /*ok*/    r.link.homesCom                                         }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_neighborhoodScout" : function(){try{return  /*ok*/    r.link.neighborhoodScout                                }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_propertyShark"     : function(){try{return  /*ok*/    r.link.propertyShark                                    }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_realEstate"        : function(){try{return  /*OK*/    r.avm.dataset.realEstate.link                           }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_realtor"           : function(){try{return  /*OK*/    r.avm.dataset.realtor.link                              }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_trulia"            : function(){try{return  /*OK*/    r.avm.dataset.trulia.link                               }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_yahoo"             : function(){try{return  /*OK*/    r.link.yahoo	   					                    }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_zillow"            : function(){try{return  /*OK*/    r.link.zillow                                           }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_zillowdetails"     : function(){try{return  /*OK*/    zil[i].links.homedetails.Text                           }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_zipRealty"         : function(){try{return            ""                                                      }catch(e){Logger.log(e.message);return "";}}() //            
			,	"link_zipSkinny"         : function(){try{return  /*ok*/    r.link.zipSkinny                                        }catch(e){Logger.log(e.message);return "";}}() //
										   }
	} // db_id MyBid // arv rep cof com city state zip sa useCode beds baths sf sf_round lot lot_round yearBuilt taxVal taxVal_round lastSoldPrice lastSoldPrice_round lastSoldYear taxAmt taxAmt_round ask ask_round autoEst autoEst_round sdPct popCount rent rent_round ratio grm ia ia_round psf avmStatSet // link_googleMap link_yahoo link_zillow link_zillowdetails link_eppraisal link_realtor link_realEstate link_homeGain link_trulia link_propertyShark link_neighborhoodScout link_zipSkinny link_chase link_boa link_homesCom
	var keys=Object.keys(ob[i].nolink),z=keys.length;while(z--){out.records[i][keys[z]]=              ob[i].nolink[keys[z]]                                   }
		keys=Object.keys(ob[i].  link),z=keys.length;while(z--){out.records[i][keys[z]]='<a href="' + ob[i].  link[keys[z]] + '" target="_blank">&#10151;</a>'}Logger.log(JSON.stringify(out.records[i]));
	}return out;}
function serveBuyers_b(){/*zip*/var ob=[],arr=[],bid=[],i,j,k,r,t=[],zil=[],d=new Date(),t=d.getTime(),user=Session.getUser().getEmail(),out={"totalResultsCount":0,"records":[]},db=ScriptDb.getMyDb(),results=db.query({table:"situs"/*,isActive:true/*,isRaw:true*/,source:{name:db.anyOf([/*"Auction",*/"ZipRealty"])}}).sortBy("ratio",db.ASCENDING/*DESCENDING*/,db.NUMERIC/*LEXICAL*/);while(results.hasNext()){r=results.next();i=out.totalResultsCount++;out.records[i]={};m=LibraryjsUtil.ddGetMarketData(r.marketState,r.marketCity);try{bid[i]=LibraryjsUtil.queryArray(r.bids,{bidder:/*m.buyer.Email/*user/*/"ssanchez0322@gmail.com"},"RETURN_ALL","FIRST")}catch(e){Logger.log(e.message)}//Logger.log(JSON.stringify(r));//out.records[i]={};try{out.records[i].MyBid=LibraryjsUtil.queryArray(r.bids,{bidder:user},"amount","HIGH")}catch(e){Logger.log(e.message)}; // "MyBid" // try{if(r.bids){arr[i]=r.bids;j=arr[i].length;while(j--){t[j]=0;if(arr[i][j].bidder==user&&(arr[i][j].timestamp>t[j])/*&&(!arr[i][j].confirmed)*/){t[j]=arr[i][j].timestamp;out.records[i].MyBid=arr[i][j].amount}}}}catch(e){Logger.log(e.message)}; // "MyBid"
	ob[i] = {
		"nolink"                         : {
				"age"                    : function(){try{var yyyy = function(){try{return r.strikeDate[0]}catch(e){/*Logger.log(e);*/return r.detail.strikeDate[0]}}()
				                                         ,      mm = function(){try{return r.strikeDate[1]}catch(e){/*Logger.log(e);*/return r.detail.strikeDate[1]}}()
                                                         ,      dd = function(){try{return r.strikeDate[2]}catch(e){/*Logger.log(e);*/return r.detail.strikeDate[2]}}()
														 ; d.setFullYear(yyyy,mm-1,dd-1);return Math.ceil((t-d)/(1000*60*60*24))    }catch(e){Logger.log(e.message);return "";}}() // r.ageInDays 
			, 	"ask"                    : function(){try{return            r.ask                  || r.starting_bid                }catch(e){Logger.log(e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
			, 	"ask_high"               : function(){try{return            r.ask_high                                              }catch(e){Logger.log(e.message);return "";}}() //
			,	"ask_round"              : function(){try{return Math.round(r.ask                  /  1000 )                        }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"autoEst"                : function(){try{return            r.previously_valued_to || r.detail.avm.estimate         }catch(e){Logger.log(e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
			,	"autoEst_round"          : function(){try{return Math.round(r.detail.avm.estimate  /  1000 )                        }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"baths"                  : function(){try{return            r.baths                                                 }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"beds"                   : function(){try{return            r.beds                                                  }catch(e){Logger.log(e.message);return "";}}() //
			,	"city"                   : function(){try{return            r.property_city        || r.detail.city                 }catch(e){Logger.log(e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
		//	,	"csz"                    : function(){try{return            r.csz                                                   }catch(e){Logger.log(e.message);return "";}}() //
		// 	,	"cof"                    : function(){try{return            r.counter                     .value                    }catch(e){Logger.log(e.message);return "";}}() // "cof" Strict input // Counter
			,	"com"                    : function(){try{return            r.comments_1                                            }catch(e){Logger.log(e.message);return "";}}() // "com" Strict input // Comments 
			,	"deltaPrice"             : function(){try{return            r.ask - bid[i].amount                                   }catch(e){Logger.log(e.message);return "";}}() //
			,	"deltaTime"/*status*/    : function(){try{return Math.floor((t-Math.max(r.status.auto.current.timestamp,r.status.manual.current.timestamp))/(1000*60*60*24))  }catch(e){Logger.log(e.message);return  0;}}() //
		//	,	"full"                   : function(){try{return            r.address.full                                          }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"grm"                    : function(){try{return Math.round(r.ask/(12*Number(zil[i].rentzestimate.amount.Text)))    }catch(e){Logger.log(e.message);return "";}}() // "grm" Compute gross rent margin
		//	,	"isActive"               : function(){try{return            r.isActive                                              }catch(e){Logger.log(e.message);return "";}}() //
            ,   "isAuction"              : function(){try{return            r.isAuction                                             }catch(e){Logger.log(e.message);return "";}}() //
        //  ,   "isFixer"                : function(){try{return            r.isFixer                                               }catch(e){Logger.log(e.message);return "";}}() //
        //  ,   "isForeclosure"          : function(){try{return            r.isForeclosure                                         }catch(e){Logger.log(e.message);return "";}}() //
        //  ,   "isRedux"                : function(){try{return            r.isRedux                                               }catch(e){Logger.log(e.message);return "";}}() //
        //  ,   "isShortSale"            : function(){try{return            r.isShortSale                                           }catch(e){Logger.log(e.message);return "";}}() //
            ,   "item"                   : function(){try{              if(!r.item){LibraryjsUtil.setItemString(r)} return r.item   }catch(e){Logger.log(e.message);return "";}}() // Note: This function will result in "floating" (i.e. "changing") item numbers, particularly when auction.com entries are updated because a new record is saved
		//	,	"lot"                    : function(){try{return            r.lot                                                   }catch(e){Logger.log(e.message);return "";}}() //
			,	"MyBid"                  : function(){try{return            bid[i].amount                                           }catch(e){Logger.log(e.message);return "";}}() // r.bids[0].amount returned bids made by other users aka administrator
		//	,	"popCount"               : function(){try{return            r.avm.stat.popCount                                     }catch(e){Logger.log(e.message);return "";}}() //
			,	"psf"                    : function(){try{return            r.psf                                                   }catch(e){Logger.log(e.message);return "";}}() // "psf" Compute price per square foot
			,	"ratio"                  : function(){try{return            r.ratio                                                 }catch(e){Logger.log(e.message);return "";}}() // "rent"
			,	"sa"                     : function(){try{return            r.property_address     || r.sa                          }catch(e){Logger.log(e.message);return "";}}() //
			,	"sf"                     : function(){try{return            r.sqft                                                  }catch(e){Logger.log(e.message);return "";}}() //
			,	"sf_round"               : function(){try{return Math.round(r.sqft                 /   100 )                        }catch(e){Logger.log(e.message);return "";}}() //
			,	"state"                  : function(){try{return            r.property_state       || r.detail.state                }catch(e){Logger.log(e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
			,	"statusAuto"             : function(){try{return            r.status.auto  .current.status || r.status.auto  .array[0].status }catch(e){Logger.log(e.message);return "New" ;}}() // 
			,	"statusManual"           : function(){try{return            r.status.manual.current.status || r.status.manual.array[0].status }catch(e){Logger.log(e.message);return ""    ;}}() // 
            ,	"useCode"                : function(){try{return            r.useCode                                               }catch(e){Logger.log(e.message);return "";}}() //
            ,	"yearBuilt"              : function(){try{return            r.yrBuilt                                               }catch(e){Logger.log(e.message);return "";}}() //
			,	"zip"                    : function(){try{return            r.property_zip||(r.detail.zip||r.csz.split(" ").pop())  }catch(e){Logger.log(e.message);return "";}}() // Reversing order of conditional || results in no zip data for auctions // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
										   }
	,	"link"		                     : {}
	}
	var keys=Object.keys(ob[i].nolink),z=keys.length;while(z--){out.records[i][keys[z]]=              ob[i].nolink[keys[z]]                                   }
	    keys=Object.keys(ob[i].  link),z=keys.length;while(z--){out.records[i][keys[z]]='<a href="' + ob[i].  link[keys[z]] + '" target="_blank">&#10151;</a>'}//Logger.log(JSON.stringify(out.records[i]));
	}return out;}
function serveBuyers_c(){/*auc*/var ob=[],arr=[],bid=[],i,j,k,r,t=[],zil=[],d=new Date(),t=d.getTime(),user=Session.getUser().getEmail(),out={"totalResultsCount":0,"records":[]},db=ScriptDb.getMyDb(),results=db.query({table:"situs"/*,isActive:true/*,isRaw:true*/,source:{name:db.anyOf(["Auction"/*,"ZipRealty"*/])}}).sortBy("ratio",db.ASCENDING/*DESCENDING*/,db.NUMERIC/*LEXICAL*/);while(results.hasNext()){r=results.next();i=out.totalResultsCount++;out.records[i]={};m=LibraryjsUtil.ddGetMarketData(r.marketState,r.marketCity);try{bid[i]=LibraryjsUtil.queryArray(r.bids,{bidder:/*m.buyer.Email/*user/*/"ssanchez0322@gmail.com"},"RETURN_ALL","FIRST")}catch(e){Logger.log(e.message)}//Logger.log(JSON.stringify(r));//out.records[i]={};try{out.records[i].MyBid=LibraryjsUtil.queryArray(r.bids,{bidder:user},"amount","HIGH")}catch(e){Logger.log(e.message)}; // "MyBid" // try{if(r.bids){arr[i]=r.bids;j=arr[i].length;while(j--){t[j]=0;if(arr[i][j].bidder==user&&(arr[i][j].timestamp>t[j])/*&&(!arr[i][j].confirmed)*/){t[j]=arr[i][j].timestamp;out.records[i].MyBid=arr[i][j].amount}}}}catch(e){Logger.log(e.message)}; // "MyBid"
	ob[i] = {
		"nolink"                         : {
				"age"                    : function(){try{var yyyy = function(){try{return r.strikeDate[0]}catch(e){/*Logger.log(e);*/return r.detail.strikeDate[0]}}()
				                                         ,      mm = function(){try{return r.strikeDate[1]}catch(e){/*Logger.log(e);*/return r.detail.strikeDate[1]}}()
                                                         ,      dd = function(){try{return r.strikeDate[2]}catch(e){/*Logger.log(e);*/return r.detail.strikeDate[2]}}()
														 ; d.setFullYear(yyyy,mm-1,dd-1);return Math.ceil((t-d)/(1000*60*60*24))    }catch(e){Logger.log(e.message);return "";}}() // r.ageInDays 
			,	"city"                   : function(){try{return            r.property_city        || r.detail.city                 }catch(e){Logger.log(e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
			,	"costRepairs"            : function(){try{return            r.costRepairs                                           }catch(e){Logger.log(e.message);return "";}}() //
			,	"costTitle"              : function(){try{return            r.costTitleClear /*1st pos,tax liens,hoa*/              }catch(e){Logger.log(e.message);return "";}}() //
			,	"costTrans"              : function(){try{return            r.costTransaction/*auc fee,our fee,title ins,prop ins*/ }catch(e){Logger.log(e.message);return "";}}() //
            ,   "item"                   : function(){try{              if(!r.item){LibraryjsUtil.setItemString(r)} return r.item   }catch(e){Logger.log(e.message);return "";}}() // Note: This function will result in "floating" (i.e. "changing") item numbers, particularly when auction.com entries are updated because a new record is saved
		//	, 	"open"                   : function(){try{return            r.ask                  || r.starting_bid                }catch(e){Logger.log(e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
			,	"MyBid"                  : function(){try{return            bid[i].amount                                           }catch(e){Logger.log(e.message);return "";}}() // r.bids[0].amount returned bids made by other users aka administrator
			,	"priceHammer"            : function(){try{return bid[i].amount-r.costRepairs-r.costTitleClear-r.costTransaction     }catch(e){Logger.log(e.message);return "";}}() // r.bids[0].amount returned bids made by other users aka administrator
			,	"sa"                     : function(){try{return            r.property_address     || r.sa                          }catch(e){Logger.log(e.message);return "";}}() //
			,	"state"                  : function(){try{return            r.property_state       || r.detail.state                }catch(e){Logger.log(e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
            ,	"useCode"                : function(){try{return            r.useCode                                               }catch(e){Logger.log(e.message);return "";}}() //
			,	"zip"                    : function(){try{return            r.property_zip||(r.detail.zip||r.csz.split(" ").pop())  }catch(e){Logger.log(e.message);return "";}}() // Reversing order of conditional || results in no zip data for auctions // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
										   }
	,	"link"		                     : {}
	}
	var keys=Object.keys(ob[i].nolink),z=keys.length;while(z--){out.records[i][keys[z]]=              ob[i].nolink[keys[z]]                                   }
	    keys=Object.keys(ob[i].  link),z=keys.length;while(z--){out.records[i][keys[z]]='<a href="' + ob[i].  link[keys[z]] + '" target="_blank">&#10151;</a>'}//Logger.log(JSON.stringify(out.records[i]));
	}return out;}
function receiveBuyer(p){p=p||{"item":"MH7rUG3","k":"2kpco3hg68eo6alklck6","MyBid":"94"};Logger.log(JSON.stringify(p));
	var db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),t=new Date().getTime(),r=db.load(/*p.db_id*/db.query({item:p.item}).next().getId()),docId;//var ob={};ob[t]=p.MyBid;if(r.bids==null){r.bids={};r.bids[user]=[];r.bids[user].unshift(ob);}else{r.bids[user].unshift(ob);} // Gets latest bid
    if(!highBid){highBid={timestamp:t,amount:0}}if(p.MyBid>highBid.amount){highBid={timestamp:t,bidder:user,amount:p.MyBid}}
	if( r.bids==null){r.bids=[]}                                                 if(r.status                ==null){r.status={}}
	    r.bids   .unshift({bidder:user,amount:p.MyBid,timestamp:t,confirmed:false});r.status.isBid          = true;db.save(r);appendAgent(r);
	/* Note: Do not use the following code. It automatically constructs and sends offers. Instead, use automatic triggers to generate the offer. This will create the offer in the owner's folder to maintain control of the proprietary google doc templates for contract construction.
             Manually run cleanupFiles(); if you think agent might have created an offer. And use a manual trigger upon an agent-caused user event to generate the email. This will allow the email to be sent from the agent's email address.
	if(!r.status){r.status={}}if(!r.status.isAppended        ){r.status.isAppended        ={}}
	                          if(!r.status.isOffer           ){r.status.isOffer           ={}}
	                          if(!r.status.isEmailed         ){r.status.isEmailed         ={}}
							  if(!r.status.isAppended.records){r.status.isAppended.records=[]}
							  if(!r.status.isOffer   .records){r.status.isOffer   .records=[]}
							  if(!r.status.isEmailed .records){r.status.isEmailed .records=[]} // Prep isAppend + isEmailed report
    appendAgent(r);db.save(r);
	if(r.status.isAppended.value){
            try{var offerId      = LibraryjsUtil.constructOffer(r)}catch(e){Logger.log(e.message)}
			    if (offerId){
					    r.status.isOffer.value=true;
				    if(!r.status.isOffer.records){r.status.isOffer.records=[]} // Logger.log("%s,%s",r.status.isOffer,r.status.isOffer.records);
			            r.status.isOffer.records.unshift({timestamp:t,docId:offerId})}db.save(r); 
            try{var emailSuccess =                   emailOffer(r)}catch(e){Logger.log(e.message)}
                if (emailSuccess){ // Email offer + report same
                        r.status.isEmailed.value=true;
			        if(!r.status.isEmailed.records){r.status.isEmailed.records=[]} // Logger.log("%s,%s",r.status.isEmailed,r.status.isEmailed.records);
			            r.status.isEmailed.records.unshift({timestamp:t,agentEmail:___newEmail___})}}db.save(r);
        		//docId=/*LibraryjsUtil.* /constructOffer(r)* /cleanupFiles();* / //r.status.isOffer.value  = true;db.save(r); // r.bids[0].deltaPct=Math.round(100*(1-(r.bids[0].amount/r.ask)));r.bids[0].deltaDollars=r.ask-r.bids[0].amount; // Could use DriveApp.getFileById(id) + .getUrl()&&.getDownloadUrl() but might cost more server time
	  //r.bids[0].docId=docId;                                                  if(!r.status.isOffer.records){r.status.isOffer.records=[]}
      //r.bids[0].docView=LibraryjsUtil.id2url(r.bids[0].docId,"DOC","VIEW"       );r.status.isOffer.records.unshift({timestamp:t,docId:docId});db.save(r);
      //r.bids[0].docDl  =LibraryjsUtil.id2url(r.bids[0].docId,"DOC","DL"         );
      //if(appendAgent(r)/*LibraryjsUtil.isEmail(r.mlsListing.agent_email)* /      ){r.status.isAppended=true;if(r.status.isAppended_records==null){r.status.isAppended_records=[]}r.status.isAppended_records.unshift({timestamp:t,agentEmail:r.mlsListing.agent_email})}db.save(r); // Deleted here because status updates are now made in the appendAgent() function itself
      //if(emailOffer (r)//Files in user's Drive, not owner's; Use trigger instead){r.status.isEmailed =true;if(r.status.isEmailed_records ==null){r.status.isEmailed_records =[]}r.status.isEmailed_records .unshift({timestamp:t,agentEmail:r.mlsListing.agent_email})}db.save(r);
	  */
    return ""}//db.saveBatch([r,{table:"bid",id:r.getId(),amount:p.MyBid,bidder:user,timestamp:t,confirmed:false}],false);return;}
function serveAgents_a(/*r.com*/){var ob=[],arr=[],i,j,k,r,t=[],zil=[],user=Session.getUser().getEmail(),out={"totalResultsCount":0,"records":[]},db=ScriptDb.getMyDb(),results=db.query({bids:db.anyValue(),table:"situs",isRaw:false,source:{name:"Realtor"/*"ZipRealty"/*"ChuckWillman"/*"KennethGreen"*/}}).sortBy("avm.stat.ratio",db.ASCENDING/*DESCENDING*/,db.NUMERIC/*LEXICAL*/);while(results.hasNext()){r=results.next();i=out.totalResultsCount++;
	out.records[i]={};try{if(r.avm.dataset.zillow.searchresults.response.results.result){zil[i]=r.avm.dataset.zillow.searchresults.response.results.result}}catch(e){Logger.log(e.message);zil[i]={};} // Shortcut to Zillow results // try{if(r.bids){arr[i]=r.bids;j=arr[i].length;while(j--){t[j]=0;if(arr[i][j].bidder==user&&(arr[i][j].timestamp>t[j])/*&&(!arr[i][j].confirmed)*/){t[j]=arr[i][j].timestamp;out.records[i].MyBid=arr[i][j].amount}}             }}catch(e){Logger.log(e.message)}; // "MyBid"
	ob[i] = {
		"nolink"                         : {
		//		"arv"                    : function(){try{return            r.arv                         .value                    }catch(e){Logger.log(e.message);return "";}}() // "arv" Strict input // ARV
				"ask"                    : function(){try{return            r.ask                                                   }catch(e){Logger.log(e.message);return "";}}() //
			,	"ask_round"              : function(){try{return Math.round(r.ask                                 / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"autoEst"                : function(){try{return            r.avm.stat.autoEst                                      }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"autoEst_round"          : function(){try{return Math.round(r.avm.stat.autoEst                    / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"avmStatSet"             : function(){try{return            r.avm.stat.set                                          }catch(e){Logger.log(e.message);return "";}}() // "avmStatSet" Array of AVM statistics
			,	"baths"                  : function(){try{return            r.avm.combi.baths                                       }catch(e){Logger.log(e.message);return "";}}() //
			,	"beds"                   : function(){try{return            r.avm.combi.beds                                        }catch(e){Logger.log(e.message);return "";}}() //
			,	"bid"                    : function(){try{return LibraryjsUtil.queryArray(r.bids,{bidder:user},"amount","FIRST")    }catch(e){Logger.log(e.message);return "";}}() // r.bids[0].amount returned bids made by other users aka administrator
			,	"broker"                 : function(){try{return            r.source.data.brokeredBy                                }catch(e){Logger.log(e.message);return "";}}() //
			,	"city"                   : function(){try{return            r.address.city                                          }catch(e){Logger.log(e.message);return "";}}() //
			,	"cof"                    : function(){try{return            r.counter                     .value                    }catch(e){Logger.log(e.message);return "";}}() // "cof" Strict input // Counter
			,	"com"                    : function(){try{return            r.LST_Attributes[21].attribute_value                    }catch(e){Logger.log(e.message);return "";}}() // "com" Strict input // Comments 
			,	"full"                   : function(){try{return            r.address.full                                          }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"grm"                    : function(){try{return Math.round(r.ask/(12*Number(zil[i].rentzestimate.amount.Text)))    }catch(e){Logger.log(e.message);return "";}}() // "grm" Compute gross rent margin
		//	,	"ia"                     : function(){try{return            r.incomeApproach                                        }catch(e){Logger.log(e.message);return "";}}() // "ia"  Compute price per income approach
		//	,	"ia_round"               : function(){try{return Math.round(r.incomeApproach                      / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
            ,   "item"                   : function(){try{return            r.item                                                  }catch(e){Logger.log(e.message);return "";}}() //
			,	"lastSoldPrice"          : function(){try{return            r.avm.combi.lastSoldPrice                               }catch(e){Logger.log(e.message);return "";}}() //
			,	"lastSoldPrice_round"    : function(){try{return Math.round(r.avm.combi.lastSoldPrice             / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"lastSoldYear"           : function(){try{return            r.avm.combi.lastSoldYear                                }catch(e){Logger.log(e.message);return "";}}() //
			,	"lot"                    : function(){try{return            r.avm.combi.lot.Text                                    }catch(e){Logger.log(e.message);return "";}}() //
			,	"lot_round"              : function(){try{return Math.round(r.avm.combi.lot.Text                  /  100 )          }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"popCount"               : function(){try{return            r.avm.stat.popCount                                     }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"psf"                    : function(){try{return Math.round(r.ask/*avm.stat.autoEst*//r.avm.combi.sqft)             }catch(e){Logger.log(e.message);return "";}}() // "psf" Compute price per square foot
		//	,	"ratio"                  : function(){try{return            r.avm.stat.ratio                                        }catch(e){Logger.log(e.message);return "";}}() // "rent"
		//	,	"rent"                   : function(){try{return Math.round(zil[i].rentzestimate.amount.Text             )          }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"rent_round"             : function(){try{return Math.round(zil[i].rentzestimate.amount.Text      /  100 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"rep"                    : function(){try{return            r.repairs                     .value                    }catch(e){Logger.log(e.message);return "";}}() // "rep" Strict input // Repairs
			,	"sa"                     : function(){try{return            r.address.sa                                            }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"sdPct"                  : function(){try{return            r.avm.stat.sdPct                                        }catch(e){Logger.log(e.message);return "";}}() //
			,	"sf"                     : function(){try{return            r.avm.combi.sqft                                        }catch(e){Logger.log(e.message);return "";}}() //
			,	"sf_round"               : function(){try{return Math.round(r.avm.combi.sqft                      /  100 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"state"                  : function(){try{return            r.address.state                                         }catch(e){Logger.log(e.message);return "";}}() //
            ,	"useCode"                : function(){try{return            r.avm.combi.useCode                                     }catch(e){Logger.log(e.message);return "";}}() //
			,	"taxAmt"                 : function(){try{return            r.avm.combi.taxAmt                                      }catch(e){Logger.log(e.message);return "";}}() //
			,	"taxAmt_round"           : function(){try{return Math.round(r.avm.combi.taxAmt                    /  100 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"taxVal"                 : function(){try{return            r.avm.combi.taxVal                                      }catch(e){Logger.log(e.message);return "";}}() //
			,	"taxVal_round"           : function(){try{return Math.round(r.avm.combi.taxVal                    / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
            ,	"yearBuilt"              : function(){try{return            r.avm.combi.built                                       }catch(e){Logger.log(e.message);return "";}}() //
			,	"zip"                    : function(){try{return            r.address.zip                                           }catch(e){Logger.log(e.message);return "";}}() //
										   }
	,	"link"		                     : {
				"link_boa"               : function(){try{return  /*ok*/    r.link.boa                                              }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_chase"             : function(){try{return  /*ok*/    r.link.chase                                            }catch(e){Logger.log(e.message);return "";}}() //
            ,	"link_eppraisal"         : function(){try{return  /*L1*/    r.avm.dataset.eppraisal.link                            }catch(e){Logger.log(e.message);return "";}}() // Errors: L1 local; L2 site suspected; L3 site confirmed; OK works; ok works but must copy/paste address
			,	"link_googleMap"         : function(){try{return  /*OK*/    r.link.gmap                                             }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_homeGain"          : function(){try{return  /*L3*/    r.avm.dataset.homeGain.link                             }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_homesCom"          : function(){try{return  /*ok*/    r.link.homesCom                                         }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_neighborhoodScout" : function(){try{return  /*ok*/    r.link.neighborhoodScout                                }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_propertyShark"     : function(){try{return  /*ok*/    r.link.propertyShark                                    }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_realEstate"        : function(){try{return  /*OK*/    r.avm.dataset.realEstate.link                           }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_realtor"           : function(){try{return  /*OK*/    r.avm.dataset.realtor.link                              }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_trulia"            : function(){try{return  /*OK*/    r.avm.dataset.trulia.link                               }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_yahoo"             : function(){try{return  /*OK*/    r.link.yahoo	   					                    }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_zillow"            : function(){try{return  /*OK*/    r.link.zillow                                           }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_zillowdetails"     : function(){try{return  /*OK*/    zil[i].links.homedetails.Text                           }catch(e){Logger.log(e.message);return "";}}() //
			,	"link_zipRealty"         : function(){try{return            ""                                                      }catch(e){Logger.log(e.message);return "";}}() //            
			,	"link_zipSkinny"         : function(){try{return  /*ok*/    r.link.zipSkinny                                        }catch(e){Logger.log(e.message);return "";}}() //
										   }
	} // db_id MyBid // arv rep cof com city state zip sa useCode beds baths sf sf_round lot lot_round yearBuilt taxVal taxVal_round lastSoldPrice lastSoldPrice_round lastSoldYear taxAmt taxAmt_round ask ask_round autoEst autoEst_round sdPct popCount rent rent_round ratio grm ia ia_round psf avmStatSet // link_googleMap link_yahoo link_zillow link_zillowdetails link_eppraisal link_realtor link_realEstate link_homeGain link_trulia link_propertyShark link_neighborhoodScout link_zipSkinny link_chase link_boa link_homesCom
	var keys=Object.keys(ob[i].nolink),z=keys.length;while(z--){out.records[i][keys[z]]=              ob[i].nolink[keys[z]]                                   }
		keys=Object.keys(ob[i].  link),z=keys.length;while(z--){out.records[i][keys[z]]='<a href="' + ob[i].  link[keys[z]] + '" target="_blank">&#10151;</a>'}Logger.log(JSON.stringify(out.records[i]));
	}return out;}
function serveAgents_b(/*zip*/){var ob=[],arr=[],i,j,k,r,t=[],bid=[],d=new Date(),t=d.getTime(),user=Session.getUser().getEmail(),out={"totalResultsCount":0,"records":[]},db=ScriptDb.getMyDb(),results=db.query({table:"situs",isActive:true/*,isRaw:true*/,source:{name:db.anyOf([/*"Auction",*/"ZipRealty"])}}).sortBy(/*"avm.stat.ratio"*/"ratio",db.ASCENDING/*DESCENDING*/,db.NUMERIC/*LEXICAL*/);while(results.hasNext()){r=results.next();i=out.totalResultsCount++;out.records[i]={};m=LibraryjsUtil.ddGetMarketData(r.marketState,r.marketCity);try{bid[i]=LibraryjsUtil.queryArray(r.bids,{bidder:m.buyer.Email/*"ssanchez0322@gmail.com"*/},"RETURN_ALL","FIRST")}catch(e){Logger.log(e.message)}//try{if(r.bids){arr[i]=r.bids;j=arr[i].length;while(j--){t[j]=0;if(arr[i][j].bidder==user&&(arr[i][j].timestamp>t[j])/*&&(!arr[i][j].confirmed)*/){t[j]=arr[i][j].timestamp;out.records[i].MyBid=arr[i][j].amount}}             }}catch(e){Logger.log(e.message)}; // "MyBid"
	ob[i] = {
		"nolink"                         : {
				"age"                    : function(){try{var yyyy = function(){try{return r.strikeDate[0]}catch(e){/*Logger.log(e);*/return r.detail.strikeDate[0]}}()
				                                         ,      mm = function(){try{return r.strikeDate[1]}catch(e){/*Logger.log(e);*/return r.detail.strikeDate[1]}}()
                                                         ,      dd = function(){try{return r.strikeDate[2]}catch(e){/*Logger.log(e);*/return r.detail.strikeDate[2]}}()
														 ; d.setFullYear(yyyy,mm-1,dd-1);return Math.ceil((t-d)/(1000*60*60*24))          }catch(e){Logger.log(e.message);return ""    ;}}() // r.ageInDays 
			,	"ask"                    : function(){try{return            r.ask                                                         }catch(e){Logger.log(e.message);return ""    ;}}() //
		//	,	"ask_round"              : function(){try{return Math.round(r.ask                                 / 1000 )                }catch(e){Logger.log(e.message);return ""    ;}}() //
		//	,	"autoEst"                : function(){try{return            r.detail.avm.estimate                                         }catch(e){Logger.log(e.message);return ""    ;}}() //
		//	,	"autoEst_round"          : function(){try{return Math.round(r.detail.avm.estimate                 / 1000 )                }catch(e){Logger.log(e.message);return ""    ;}}() //
		//	,	"bid"                    : function(){try{return "<a href='"+OFFER_URL+"' target='_blank'>"+bid[i]+"</a>"                 }catch(e){Logger.log(e.message);return ""    ;}}() // Anchor tag drops formatting
			,	"bid"                    : function(){try{return              bid[i].amount                                               }catch(e){Logger.log(e.message);return ""    ;}}() // r.bids[0].amount returned bids made by other users aka administrator
			,	"city"                   : function(){try{return            r.detail.city                                                 }catch(e){Logger.log(e.message);return ""    ;}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
		//	,	"csz"                    : function(){try{return            r.csz                                                         }catch(e){Logger.log(e.message);return ""    ;}}() //
			,	"deltaPrice"             : function(){try{return            r.ask - bid[i].amount                                         }catch(e){Logger.log(e.message);return ""    ;}}() //
			,	"deltaTime"/*status*/    : function(){try{return Math.floor((t-Math.max(r.status.auto.current.timestamp,r.status.manual.current.timestamp))/(1000*60*60*24))     }catch(e){Logger.log(e.message);return  0;}}() //
			,	"email"                  : function(){try{return            r.status.isAppended.records[0].agentEmail                     }catch(e){Logger.log(e.message);return ""    ;}}() // 
		//	,	"isActive"               : function(){try{return            r.isActive                                                    }catch(e){Logger.log(e.message);return ""    ;}}() //
            ,   "item"                   : function(){try{return            r.item                                                        }catch(e){Logger.log(e.message);return ""    ;}}() //
            ,   "mlsName"                : function(){try{return            r.detail.mlsSource_2/*mlsName*/                               }catch(e){Logger.log(e.message);return ""    ;}}() //
            ,   "mlsNumber"              : function(){try{return            r.detail.mlsNumber_1                                          }catch(e){Logger.log(e.message);return ""    ;}}() // 
			,	"offerDownload"          : function(){try{return (bid[i].docId)?"<a href='"+LibraryjsUtil.id2url(bid[i].docId,"DOC","DL")+"'>&#9660;</a>":""}catch(e){Logger.log(e.message);return ""    ;}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
		//	,	"offerLink"              : function(){try{return "<a href='"+bid[i].docDl   +"' target='_blank'>&#9654;</a>"              }catch(e){Logger.log(e.message);return ""    ;}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
			,	"ratio"                  : function(){try{return Math.round(100*(1-(bid[i].amount/r.ask)))                                }catch(e){Logger.log(e.message);return ""    ;}}() // r.ratio // "rent"
			,	"sa"                     : function(){try{return            r.sa  ||  r.detail.sa                                         }catch(e){Logger.log(e.message);return ""    ;}}() //
			,	"state"                  : function(){try{return            r.detail.state                                                }catch(e){Logger.log(e.message);return ""    ;}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
			,	"statusAuto"             : function(){try{return            r.status.auto  .current.status || r.status.auto  .array[0].status }catch(e){Logger.log(e.message);return "New" ;}}() // 
			,	"statusManual"           : function(){try{return            r.status.manual.current.status || r.status.manual.array[0].status }catch(e){Logger.log(e.message);return ""    ;}}() // 
            ,	"useCode"                : function(){try{return            r.useCode                                                     }catch(e){Logger.log(e.message);return ""    ;}}() //
			,	"zip"                    : function(){try{return            r.detail.zip || r.csz.split(" ").pop()                        }catch(e){Logger.log(e.message);return ""    ;}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
			                               }
	,	"link"		                     : {}
	}
	var keys=Object.keys(ob[i].nolink),z=keys.length;while(z--){out.records[i][keys[z]]=              ob[i].nolink[keys[z]]                                   }
	    keys=Object.keys(ob[i].  link),z=keys.length;while(z--){out.records[i][keys[z]]='<a href="' + ob[i].  link[keys[z]] + '" target="_blank">&#10151;</a>'}//Logger.log(JSON.stringify(out.records[i]));
	}return out;}
function serveAgents_c(){/*auc*/var ob=[],arr=[],bid=[],i,j,k,r,t=[],zil=[],d=new Date(),t=d.getTime(),user=Session.getUser().getEmail(),out={"totalResultsCount":0,"records":[]},db=ScriptDb.getMyDb(),results=db.query({table:"situs"/*,isActive:true/*,isRaw:true*/,source:{name:db.anyOf(["Auction"/*,"ZipRealty"*/])}}).sortBy("ratio",db.ASCENDING/*DESCENDING*/,db.NUMERIC/*LEXICAL*/);while(results.hasNext()){r=results.next();i=out.totalResultsCount++;out.records[i]={};m=LibraryjsUtil.ddGetMarketData(r.marketState,r.marketCity);try{bid[i]=LibraryjsUtil.queryArray(r.bids,{bidder:/*m.buyer.Email/*user/*/"ssanchez0322@gmail.com"},"RETURN_ALL","FIRST")}catch(e){Logger.log(e.message)}//Logger.log(JSON.stringify(r));//out.records[i]={};try{out.records[i].MyBid=LibraryjsUtil.queryArray(r.bids,{bidder:user},"amount","HIGH")}catch(e){Logger.log(e.message)}; // "MyBid" // try{if(r.bids){arr[i]=r.bids;j=arr[i].length;while(j--){t[j]=0;if(arr[i][j].bidder==user&&(arr[i][j].timestamp>t[j])/*&&(!arr[i][j].confirmed)*/){t[j]=arr[i][j].timestamp;out.records[i].MyBid=arr[i][j].amount}}}}catch(e){Logger.log(e.message)}; // "MyBid"
	ob[i] = {
		"nolink"                         : {
				"age"                    : function(){try{var yyyy = function(){try{return r.strikeDate[0]}catch(e){/*Logger.log(e);*/return r.detail.strikeDate[0]}}()
				                                         ,      mm = function(){try{return r.strikeDate[1]}catch(e){/*Logger.log(e);*/return r.detail.strikeDate[1]}}()
                                                         ,      dd = function(){try{return r.strikeDate[2]}catch(e){/*Logger.log(e);*/return r.detail.strikeDate[2]}}()
														 ; d.setFullYear(yyyy,mm-1,dd-1);return Math.ceil((t-d)/(1000*60*60*24))    }catch(e){Logger.log(e.message);return "";}}() // r.ageInDays 
			,	"city"                   : function(){try{return            r.property_city        || r.detail.city                 }catch(e){Logger.log(e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
			,	"costRepairs"            : function(){try{return            r.costRepairs                                           }catch(e){Logger.log(e.message);return "";}}() //
			,	"costTitle"              : function(){try{return            r.costTitleClear /*1st pos,tax liens,hoa*/              }catch(e){Logger.log(e.message);return "";}}() //
			,	"costTrans"              : function(){try{return            r.costTransaction/*auc fee,our fee,title ins,prop ins*/ }catch(e){Logger.log(e.message);return "";}}() //
            ,   "item"                   : function(){try{              if(!r.item){LibraryjsUtil.setItemString(r)} return r.item   }catch(e){Logger.log(e.message);return "";}}() // Note: This function will result in "floating" (i.e. "changing") item numbers, particularly when auction.com entries are updated because a new record is saved
			,	"sa"                     : function(){try{return            r.property_address     || r.sa                          }catch(e){Logger.log(e.message);return "";}}() //
			,	"state"                  : function(){try{return            r.property_state       || r.detail.state                }catch(e){Logger.log(e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
            ,	"useCode"                : function(){try{return            r.useCode                                               }catch(e){Logger.log(e.message);return "";}}() //
			,	"zip"                    : function(){try{return            r.property_zip||(r.detail.zip||r.csz.split(" ").pop())  }catch(e){Logger.log(e.message);return "";}}() // Reversing order of conditional || results in no zip data for auctions // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
										   }
	,	"link"		                     : {}
	}
	var keys=Object.keys(ob[i].nolink),z=keys.length;while(z--){out.records[i][keys[z]]=              ob[i].nolink[keys[z]]                                   }
	    keys=Object.keys(ob[i].  link),z=keys.length;while(z--){out.records[i][keys[z]]='<a href="' + ob[i].  link[keys[z]] + '" target="_blank">&#10151;</a>'}//Logger.log(JSON.stringify(out.records[i]));
	}return out;}
function receiveAgent(p){p=p||{item:"q4JyH1W",email:"bruce.p.nolan@gmail.com"};/*Logger.log(JSON.stringify(p));*/var db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),t=new Date().getTime()
	,la,r=db.load(/*p.db_id*/db.query({item:p.item}).next().getId()),z=p.email.trim().replace(/\s/ig,"").replace(/mailto:/ig,""),newEmail=(LibraryjsUtil.isEmail(z))?z:false; // function test(){var x,ar=["foo","bar@baz.com","mailto:bar@baz.com"],i=ar.length;while(i--){ar[i]=ar[i].trim().replace(/\s/ig,"").replace(/mailto:/ig,"");x=(LibraryjsUtil.isEmail(ar[i]))?ar[i]:false;Logger.log(x);}}
	if(!r.status){r.status={}}if(!r.status.isAppended        ){r.status.isAppended        ={}}
	                          if(!r.status.isOffer           ){r.status.isOffer           ={}}
	                          if(!r.status.isEmailed         ){r.status.isEmailed         ={}}
							  if(!r.status.isAppended.records){r.status.isAppended.records=[]}
							  if(!r.status.isOffer   .records){r.status.isOffer   .records=[]}
							  if(!r.status.isEmailed .records){r.status.isEmailed .records=[]} // Prep isAppend + isEmailed report
	// Add record to separate agent table
	if(db.query({table:"agent",licNum:r.detail.listingAgent.licNum}).getSize()){la=db.query({table:"agent",licNum:r.detail.listingAgent.licNum}).next()}
	else if(r.detail.listingAgent){la=r.detail.listingAgent;la.table="agent"}
	if(!la.email){la.email={}}if(!la.email.manual){la.email.manual=[]}if(newEmail&&(newEmail!=la.email.manual[0])){la.email.manual.unshift(newEmail)}
	db.save(la); // Initialize and update listing agent email // var s={table:"agent",name:r.detail.listingAgent.name,licNum:r.detail.listingAgent.licNum,email:r.statusArray[0].email};db.save(r); // Save listing agent record in "agent" table
	if(newEmail){
	    if(!r.status.isAppended.records[0]||(r.status.isAppended.records[0].agentEmail!=newEmail)){// Fill isAppend report
            r.status.isAppended.value=true;
		    r.status.isAppended.method="manual";
	        r.status.isAppended.records.unshift({timestamp:t,agentEmail:newEmail});db.save(r); // replaces: if(r.status==undefined){r.status={}}if(r.status.manual==undefined){r.status.manual={}}if(r/*.statusArray*/.status.manual.array==undefined){r/*.statusArray*/.status.auto.array=[]}r/*.statusArray*/.status.manual.array.unshift({email:newEmail,status:p.statusManual,timestamp:t}); // Initialize or update status array
            /* Note: constructOffer() must be called by automated trigger to control visibility of the source googleDoc template to the user.
			try{var offerId      = LibraryjsUtil.constructOffer(r)}catch(e){Logger.log(e.message)}
			    if (offerId){
					    r.status.isOffer.value=true;
				    if(!r.status.isOffer.records){r.status.isOffer.records=[]} // Logger.log("%s,%s",r.status.isOffer,r.status.isOffer.records);
			            r.status.isOffer.records.unshift({timestamp:t,docId:offerId})}db.save(r); */
    }}emailOffer_auto(r);return ""} // Email all offers in queue // If new or changed email, send offer + status accordingly // r.statusCurrent={status:r.statusArray[0].status,timestamp:t} // Separate field for query purposes (cancelled)
function serveLenders_b(){var ob=[],arr=[],i,j,k,m,r,t=[],zil=[],user=Session.getUser().getEmail(),out={"totalResultsCount":0,"records":[]},db=ScriptDb.getMyDb(),results=db.query({bids:db.anyValue()/*,table:"situs"/*,isRaw:false*/,source:{name:/*"Realtor"*/"ZipRealty"/*"ChuckWillman"/*"KennethGreen"*/}}).sortBy(/*"avm.stat.ratio"*/"ratio",db.ASCENDING/*DESCENDING*/,db.NUMERIC/*LEXICAL*/);while(results.hasNext()){r=results.next();i=out.totalResultsCount++;m=LibraryjsUtil.ddGetMarketData(r.marketState,r.marketCity);out.records[i]={};//try{if(r.bids){arr[i]=r.bids;j=arr[i].length;while(j--){t[j]=0;if(arr[i][j].bidder==user&&(arr[i][j].timestamp>t[j])/*&&(!arr[i][j].confirmed)*/){t[j]=arr[i][j].timestamp;out.records[i].MyBid=arr[i][j].amount}}}}catch(e){Logger.log(e.message)}; // "MyBid"
	ob[i] = {
		"nolink"                         : {
		//		"age"                    : function(){try{var yyyy = function(){try{return r.strikeDate[0]}catch(e){/*Logger.log(e);*/return r.detail.strikeDate[0]}}()
		//		                                         ,      mm = function(){try{return r.strikeDate[1]}catch(e){/*Logger.log(e);*/return r.detail.strikeDate[1]}}()
        //                                               ,      dd = function(){try{return r.strikeDate[2]}catch(e){/*Logger.log(e);*/return r.detail.strikeDate[2]}}()
		//												 ;var    d = new Date();d.setFullYear(yyyy,mm-1,dd-1) //r.ageInDays 
		//	                                             ;return Math.ceil((new Date().getTime()-d)/ (1000*60*60*24) )              }catch(e){Logger.log(e.message);return "";}}() //
				"ask"                    : function(){try{return            r.ask                                                   }catch(e){Logger.log(e.message);return "";}}() //
			,	"ask_round"              : function(){try{return Math.round(r.ask                                 / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"autoEst"                : function(){try{return            r.detail.avm.estimate                                   }catch(e){Logger.log(e.message);return "";}}() //
			,	"autoEst_round"          : function(){try{return Math.round(r.detail.avm.estimate                 / 1000 )          }catch(e){Logger.log(e.message);return "";}}() //
			,	"bid"                    : function(){try{return LibraryjsUtil.queryArray(r.bids,{bidder:m.buyer.Email},"amount","FIRST")}catch(e){Logger.log(e.message);return "";}}() // r.bids[0].amount returned bids made by other users aka administrator
			,	"city"                   : function(){try{return            r.detail.city                                           }catch(e){Logger.log(e.message);return "";}}() // r.detail.city || foo throws error if no r.detail; instead, use foo || r.detail;
		//	,	"csz"                    : function(){try{return            r.csz                                                   }catch(e){Logger.log(e.message);return "";}}() //
            ,   "item"                   : function(){try{return            r.item                                                  }catch(e){Logger.log(e.message);return "";}}() //
        //  ,   "mlsName"                : function(){try{return            r.detail.mlsSource_2/*mlsName*/                         }catch(e){Logger.log(e.message);return "";}}() //
        //  ,   "mlsNumber"              : function(){try{return            r.detail.mlsNumber_1                                    }catch(e){Logger.log(e.message);return "";}}() //
		//	,	"ratio"                  : function(){try{return            r.ratio                                                 }catch(e){Logger.log(e.message);return "";}}() // "rent"
			,	"sa"                     : function(){try{return            r.sa  ||  r.detail.sa /* "Affiliate with us" */         }catch(e){Logger.log(e.message);return "";}}() //
			,	"state"                  : function(){try{return            r.detail.state                                          }catch(e){Logger.log(e.message);return "";}}() // 
            ,	"useCode"                : function(){try{return            r.useCode                                               }catch(e){Logger.log(e.message);return "";}}() //
			,	"zip"                    : function(){try{return            r.detail.zip                                            }catch(e){Logger.log(e.message);return "";}}() // 
			                               }
	,	"link"		                     : {}
	} // db_id MyBid // arv rep cof com city state zip sa useCode beds baths sf sf_round lot lot_round yearBuilt taxVal taxVal_round lastSoldPrice lastSoldPrice_round lastSoldYear taxAmt taxAmt_round ask ask_round autoEst autoEst_round sdPct popCount rent rent_round ratio grm ia ia_round psf avmStatSet // link_googleMap link_yahoo link_zillow link_zillowdetails link_eppraisal link_realtor link_realEstate link_homeGain link_trulia link_propertyShark link_neighborhoodScout link_zipSkinny link_chase link_boa link_homesCom
	var keys=Object.keys(ob[i].nolink),z=keys.length;while(z--){out.records[i][keys[z]]=              ob[i].nolink[keys[z]]                                   }
		keys=Object.keys(ob[i].  link),z=keys.length;while(z--){out.records[i][keys[z]]='<a href="' + ob[i].  link[keys[z]] + '" target="_blank">&#10151;</a>'}Logger.log(JSON.stringify(out.records[i]));
	}return out;}
function receiveLender(p){//Logger.log(JSON.stringify(p));var db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),d=new Date().getTime(),r=db.load(/*p.db_id*/db.query({item:p.item}).next().getId());//var ob={};ob[d]=p.MyBid;if(r.bids==null){r.bids={};r.bids[user]=[];r.bids[user].unshift(ob);}else{r.bids[user].unshift(ob);} // Gets latest bid
  //if(r.bids==null){r.bids=[]}r.bids.unshift({bidder:user,amount:p.MyBid,timestamp:d,confirmed:false});db.save(r);/*db.saveBatch([r,{table:"bid",id:r.getId(),amount:p.MyBid,bidder:user,timestamp:d,confirmed:false}],false);*/
	return ""}
function dataReport(){var ID="1ASaJ_W0ha248DgFl2R9XWQ5M1kaAnb2RpqUlMjpB2hc",out={orgChart:[],treeMap:[],pieChart:[]},arr=LibraryjsUtil.ao2aa(LibraryjsUtil.ss2ao(ID,"Data"))
   ,i=arr.length;while(i--){out.treeMap.push(arr[i].reverse().slice(1));out.orgChart.push(arr[i].slice(1,-1));arr[i].splice(2,1);out.pieChart.push(arr[i].slice(1,-1));}
   out.orgChart.reverse();out.treeMap.reverse();out.colChart=out.pieChart.reverse();out.barChart=out.colChart;/*Logger.log(JSON.stringify(out));*/return out}//function arrTest(){return [["Field","Parent","Count"],["Leads","",""],["Pend Ops","Leads",20],["Opportunities","Leads","---"],["Offers","Opportunities","---"],["Pend Offer","Opportunities","---"],["Pend Send","Offers",20],["Sent","Offers","---"],["Pend Bid","Pend Offer",20],["Pend Append","Pend Offer",20],["Pend Construct","Pend Offer",10],["Pend Open","Sent",10],["Opened","Sent","---"],["Replied","Opened","---"],["Rejected","Replied",5],["Countered","Replied",5],["Accepted","Replied","---"],["Pend Reply","Opened",5],["Closed","Accepted",3],["Pend Close","Accepted",2]]}
-------------------------------------- form.html (a template kit for implementing forms; must be unpacked) --------------------------------------
function processForm(formObject){var formBlob=formObject.myFile,driveFile=DriveApp.createFile(formBlob);return driveFile.getUrl()} // Goes in Code.gs // Reference: https://developers.google.com/apps-script/guides/html-service-communication#forms
<form id="myForm"><input name="myFile" type="file"><input type="button" value="Submit" onclick="google.script.run.withSuccessHandler(updateUrl).processForm(this.parentNode)"></form><div id="output"></div><script>function updateUrl(url){document.getElementById("output").innerHTML='<a href="'+url+'">Got it!</a>'}</script><!--Goes in index.html; Reference: https://developers.google.com/apps-script/guides/html/communication#forms-->
-------------------------------------------- reports.html --------------------------------------------
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>
      Data Visualization
    </title>
    <script type="text/javascript" src="//www.google.com/jsapi"></script>
    <script type="text/javascript">
      google.load("visualization","1",{packages:["corechart","orgchart","treemap"]});
    </script>
    <script type="text/javascript">//function onSuccess(ob){alert(JSON.stringify(ob));return ob}
	  function getData(ob){google.script.run.withSuccessHandler(drawVisualization).dataReport()} // Reference: https://developers.google.com/apps-script/guides/html/reference/run#withSuccessHandler(Function)
      function drawVisualization(data){
	    var data_orgChart = google.visualization.arrayToDataTable(data.orgChart)//[["Field","Parent"],["Leads",""],["Pend Ops","Leads"],["Opportunities","Leads"],["Offers","Opportunities"],["Pend Offer","Opportunities"],["Pend Send","Offers"],["Sent","Offers"],["Pend Bid","Pend Offer"],["Pend Append","Pend Offer"],["Pend Construct","Pend Offer"],["Pend Open","Sent"],["Opened","Sent"],["Replied","Opened"],["Rejected","Replied"],["Countered","Replied"],["Accepted","Replied"],["Pend Reply","Opened"],["Closed","Accepted"],["Pend Close","Accepted"]]);//var arr = [["Field","Parent","Count"],["Leads","",""],["Pend Ops","Leads",20],["Opportunities","Leads","---"],["Offers","Opportunities","---"],["Pend Offer","Opportunities","---"],["Pend Send","Offers",20],["Sent","Offers","---"],["Pend Bid","Pend Offer",20],["Pend Append","Pend Offer",20],["Pend Construct","Pend Offer",10],["Pend Open","Sent",10],["Opened","Sent","---"],["Replied","Opened","---"],["Rejected","Replied",5],["Countered","Replied",5],["Accepted","Replied","---"],["Pend Reply","Opened",5],["Closed","Accepted",3],["Pend Close","Accepted",2]];//var arr = google.script.run.withSuccessHandler(onSuccess).dataReport();
          , data_treeMap  = google.visualization.arrayToDataTable(data.treeMap )//arr);
          , data_pieChart = google.visualization.arrayToDataTable(data.pieChart)
          , data_barChart = google.visualization.arrayToDataTable(data.barChart)
        //, data_colChart = google.visualization.arrayToDataTable(data.colChart)
		;
        new google.visualization.OrgChart(document.getElementById("orgChart")).draw(data_orgChart,{size:"small",allowHtml:true,allowCollapse:true}); // Reference: https://google-developers.appspot.com/chart/interactive/docs/gallery/orgchart#customproperties
        new google.visualization.TreeMap (document.getElementById("treeMap" )).draw(data_treeMap ,{                                                  // Reference: https://google-developers.appspot.com/chart/interactive/docs/gallery/treemap
		 // title         : "Current Inventory"
		    maxDepth      :  7
	      , maxPostDepth  :  0
	      , hintOpacity   :  1
          , minColor      : "red"
          , midColor      : "yellow"
          , maxColor      : "green"
          , headerHeight  :  15
          , fontColor     : "grey"
          , showScale     :  true
		  });
		new google.visualization.PieChart(document.getElementById("pieChart")).draw(data_pieChart,{                                                  // Reference: https://developers.google.com/chart/interactive/docs/gallery/piechart#rotating
		    legend        : "none"
          , pieSliceText  : "label"
       // , title         : ""
	      , pieHole       :  0.4
       // , pieStartAngle :  100
	      , is3D          :  false
		  });
		new google.visualization.BarChart(document.getElementById("barChart")).draw(data_barChart,{                                                  // Reference: https://developers.google.com/chart/interactive/docs/gallery/columnchart
	   //   title         : "Status"
       // , width         :  600
	   // , height        :  400
       // , hAxis         : {title : "Volume"}
	   //   theme         : "maximized"
	   // , animation     : { duration : 1500 , easing : "out" }
		  });
	}
	google.setOnLoadCallback(/*drawVisualization*/getData);
    </script>
  </head>
  <body style="font-family:arial;border:0 none;">
    <table>
	  <tbody>
		<tr>
		  <td><div id="pieChart" style="width:700px;height:500px;"></div></td>
		  <td><div id="barChart" style="width:700px;height:500px;"></div></td>
		</tr>
	    <tr>
		  <td><div id="orgChart" style="width:700px;height:600px;"></div></td>
		  <td><a href="http://en.wikipedia.org/wiki/Treemapping" target="_blank" title="Drill down: left click; Move up: right click; Green: high pct% change; Red: low pct% change">
		        <img src="https://lh3.googleusercontent.com/-rTGw7TdwnUw/U4RFrEWWYkI/AAAAAAAALZE/i-LbxjeERto/s144/Information_Sign%2520-%2520Copy.png" height="20"></a>
		      <div id="treeMap"  style="width:700px;height:600px;"></div></td>
		</tr>
	  </tbody>
    </table>
  </body>
</html>