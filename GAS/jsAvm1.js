function print   (str){var desc="jsAvm Print — timestamp:"+new Date().getTime(),id=DriveApp.createFile(desc,str,MimeType.HTML).setDescription(desc);Logger.log("Printed doc ID: "+id);}
function avmReport(str){return avmJson(str)}
function avmJson (str){var out=avmCore(str); // Main AVM call
  //try{out.combi     = avmComb     (out.avm.dataset                   )}catch(e){Logger.log("Error biSpc: "+e.message)       }
    try{out.avm       = avmStat     (out                               )}catch(e){Logger.log("Error vfypT: "+e.message)       }
    return out}//function test(){/*Logger.log*/print(JSON.stringify(avmJson("5008 corson ave s, seattle, wa")))}//"1505 S Bennett St, seattle, wa" "4009 pittwood dr, danville, va"
function avmCore(str){var out={},addy={}; // Broken out due to asynchronous callbacks making all functions complete before calling avmStat(); otherwise dataset can be incomplete
    function fixAddy(ob1,ob2){var ar=["sa","city","state","zip","full"],i=ar.length;while(i--){if(ob2[ar[i]]){ob1[ar[i]]=ob2[ar[i]]}}}
    try{out.zipRealty = avmZipRealty(str );fixAddy(addy,out.zipRealty  )}catch(e){Logger.log("Error fyeBX: "+e.message);return} // ZipRealty® // Yields 3 estimates: 1. SmartZip®, 2. Zillow®, 3. Eppraisal® (as of 9/10/2015) // Defacto geocode 
    try{out.trulia    = avmTrulia   (str );fixAddy(addy,out.trulia.addy)}catch(e){Logger.log("Error duR4E: "+e.message)       } // Trulia®    // Will not provide estimate on listed properties  // Yields annual taxes — replaces PropertyShark® because it also yields an AVM estimate, thus saving an http fetch / URL call
    try{out.remax     = avmRemax    (addy)/*No fixAddy();ar[0]==null?*/ }catch(e){Logger.log("Error tQa1E: "+e.message)       } // ReMax®     // 350+ estimates of surrounds // Uses Homes.com AVM (so does HomeSnap)
    try{out.homeSnap  = avmHomeSnap (addy)                              }catch(e){Logger.log("Error zHu8A: "+e.message)       } // HomeSnap®  // Scores appreciation and cash flow potential // Uses Homes.com AVM (so does ReMax) // Only works for UNLISTED properties (currently). Listings reorder the data fields and throw off the scrape.
    try{out.realtor   = avmRealtor  (addy)                              }catch(e){Logger.log("Error xNb9B: "+e.message)       } // Realtor®   // As of 9/10/2015 only yields one estimate. Used to --> Yields 3 estimates: 1. DataQuick®, 2. SmartZip®, 3. Eppraisal®
        out.imgUrl="https://maps.googleapis.com/maps/api/streetview?size=640x480&location="+encodeURIComponent(addy.full);return out}
function avmComb(avm){ // Combines property facts from multiple sources into a single source
  /*  Parameters
      @return {object} out — {"beds":"2","baths":"3","sqft":"1275","lot":"2500"} — final set of properties from combined sources
      @param  {object} avm — {...,"zillow":{..."beds":"2","baths":"3","sqft":"1275",...},"trulia":"{..."beds":"2","baths":"3","sqft":"1275",...},...}
  */
  {// Code
  var out={};try{r=avm.zillow.searchresults.response.results.result/*[0]*/                                   } catch(e){Logger.log("Error csqEt: "+e.message)}
try{   if(r              .address.latitude .Text){out.latitude      = r               .address.latitude .Text}
    else if(avm.trulia.dataSet     .latitude      ){out.latitude      = avm.trulia.dataSet      .latitude      }
 // else if(geoGoogle              .latitude      ){out.latitude      = geoGoogle               .latitude      }
 // else if(geoMapQuestCsz         .latitude      ){out.latitude      = geoMapQuestCsz          .latitude      }
                                                                                                               } catch(e){Logger.log("Error ParOv: "+e.message)}
try{   if(r              .address.longitude.Text){out.longitude     = r               .address.longitude.Text}
    else if(avm.trulia.dataSet     .longitude     ){out.latitude      = avm.trulia.dataSet      .longitude     }
 // else if(geoGoogle              .longitude     ){out.longitude     = geoGoogle               .longitude     }
 // else if(geoMapQuestCsz         .longitude     ){out.longitude     = geoMapQuestCsz          .longitude     }
                                                                                                             } catch(e){Logger.log("Error bahqg: "+e.message)}
try{   if(r              .useCode          .Text){out.useCode       = r               .useCode          .Text} // e.g., "SingleFamily" // Not used in display table
    else if(avm.trulia     .useCode               ){out.useCode       = avm.trulia      .useCode               } // else if(avm.realtor.){} // else if(avm.realEstate.){}
                                                    out.useCode       = out             .useCode.replace("SingleFamily"   ,"SFR");
                              out.useCode       = out             .useCode.replace("MultiFamily2To4","M24");
                                                                                                               } catch(e){Logger.log("Error AZyBQ: "+e.message)}
try{   if(r              .bedrooms         .Text){out.beds          = r               .bedrooms         .Text}
    else if(avm.trulia     .beds                  ){                                                           }
    else if(avm.realtor    .beds                  ){out.beds          = avm.realtor     .beds                  }
 // else if(avm.realEstate .beds                  ){out.beds          = avm.realEstate  .beds                  }
    else if(avm.homeSnap   .beds                  ){out.beds          = avm.realtor     .beds                  }}catch(e){Logger.log("Error bahqg: "+e.message)}
try{   if(r              .bathrooms        .Text){out.baths         = r               .bathrooms        .Text}
    else if(avm.trulia     .baths                 ){out.baths         = avm.trulia      .baths                 }
    else if(avm.realtor    .baths                 ){out.baths         = avm.realtor     .baths                 }
 // else if(avm.realEstate .baths                 ){out.baths         = avm.realEstate  .baths                 }
    else if(avm.homeSnap   .baths                 ){out.baths         = avm.realtor     .baths                 }}catch(e){Logger.log("Error I3J2P: "+e.message)}
try{   if(r              .finishedSqFt     .Text){out.sqft          = r               .finishedSqFt     .Text}
    else if(avm.trulia     .sqft                  ){out.sqft          = avm.trulia      .sqft                  }
    else if(avm.realtor    .sqft                  ){out.sqft          = avm.realtor     .sqft                  }
    else if(avm.realEstate .sqft                  ){out.sqft          = avm.realEstate  .sqft                  }}catch(e){Logger.log("Error yuu1t: "+e.message)}
try{   if(r              .lotSizeSqFt      .Text){out.lot           = r.lotSizeSqFt                     .Text} // Not used in display table
 // else if(avm.trulia     .                      ){                                                           }
    else if(avm.realtor    .lot                   ){out.lot           = avm.realtor     .lot                   }
    else if(avm.realEstate .lot                   ){out.lot           = avm.realEstate  .lot                   }}catch(e){Logger.log("Error a2c0Q: "+e.message)}
try{   if(r              .yearBuilt        .Text){out.built         = r.yearBuilt     .Text                  } // Not used in display table
 // else if(avm.trulia     .                      ){                                                           }
    else if(avm.realtor    .built                 ){out.built         = avm.realtor     .built                 }
    else if(avm.realEstate .built                 ){out.built         = avm.realEstate  .built                 }}catch(e){Logger.log("Error jhmY8: "+e.message)}
try{   if(avm.trulia.taxAmt                     ){out.taxAmt        = avm.trulia      .taxAmt                }}catch(e){Logger.log("Error bDiVp: "+e.message)}
try{   if(r              .taxAssessment    .Text){out.taxVal        = r               .taxAssessment    .Text}}catch(e){Logger.log("Error VpRKh: "+e.message)}
try{   if(r              .lastSoldPrice    .Text){out.lastSoldPrice = r               .lastSoldPrice    .Text}}catch(e){Logger.log("Error kybNb: "+e.message)}
try{   if(r              .lastSoldDate     .Text){out.lastSoldDate  = r               .lastSoldDate     .Text}}catch(e){Logger.log("Error LgH28: "+e.message)}  // e.g., "6/16/2013" // Not used in display table // Uses year only instead, requires conversion/processing
try{     if(                                        out.lastSoldDate                    .split("/")[2]){     // Add year extracted from date for economy of presentation // Deprecated 1/4/2012 // if(prop.source.sourceName=="Realtor"){prop.source.detailpageURL="http://www.realtor.com"+prop.source.detailpageURL} // Add prefix to complete URL for details page // prop.source.details=prop.source.detailpageURL.realtorScrapeDetail(); // Add MLS details page info // Includes taxes paid amount for inclusion in income approach calculation to follow
                                                    out.lastSoldYear  = out.lastSoldDate.split("/")[2]
                                              }else{out.lastSoldYear  = ""}                                     }catch(e){Logger.log("Error yC2un: "+e.message)}}
try{   if(r.rentzestimate.amount           .Text){out.rentEstimate  = r.rentzestimate .amount           .Text}
    else if(avm.homeSnap   .rentEst               ){out.rentEstimate  = avm.homeSnap    .rentEst               }}catch(e){Logger.log("Error I3J2P: "+e.message)}
try{   if(avm.homeSnap   .taxEst                ){out.taxExp        = avm.homeSnap    .taxEst                }}catch(e){Logger.log("Error LgH28: "+e.message)}  // e.g., "6/16/2013" // Not used in display table // Uses year only instead, requires conversion/processing
try{   if(avm.realtor    .status                ){out.status        = avm.realtor     .status                }}catch(e){Logger.log("Error LgH28: "+e.message)}  // e.g., "6/16/2013" // Not used in display table // Uses year only instead, requires conversion/processing
    return out}
function avmStat(avm){ // Array.prototype.avmStat=function(bid){ // Returns array of statistics of AVM data points; includes max bid, ARV = median AVM, margin & ratio
  //** /Logger.log/**/print(JSON.stringify(avm)); 
    var out={},avmSet=[],x=Object.keys(avm),i=x.length;while(i--){
        try{if((x[i]==="remax")&&(avm.remax.estimate==avm.homeSnap.estimate)){continue}}catch(e){} // Deduplicate remax estimate — avmHomeSnap() returns 3 estimates including avmRemax() which might be duplicated
        try{if(avm[x[i]].estimate){if(typeof avm[x[i]].estimate=="object"){avmSet=avmSet.concat(avm[x[i]].estimate)} // For zipRealty: A-smartZip, B-zillow, C-eppraisal
                   else{       avmSet.push  (avm[x[i]].estimate)}}}catch(e){Logger.log("Error lJoTH: "+e.message)}} // Array of AVM estimates to pass to descriptiveStatistics()
    out.set      = LibraryjsUtil.clone(avmSet).sort(function(a,b){return b-a}); // Return original bid set (before processing; i.e., removal of outliers)
  var avmStats     = LibraryjsUtil._descriptiveStatistics(avmSet); // Process statistical results + format for output/return // Calculate descriptive statistics of the set of AVM estimates
    out.isOk     = avmStats.IsOk;                          // ISOK   — Boolean; evaluates to TRUE if all inputs reduce to numeric and are included in stat calculations
    out.popCount = avmStats.Count;                         // COUNT  — Returns the count of the population of inputs that reduced to a numeric to be included in the stat calculations
    out.autoEst  = Math.round(avmStats.Median);            // ARV    — MEDIAN of all estimates  //valCalc[2] = avm[1][colZillow];
    out.sdPop    = avmStats.StdDevPop;                     // StdDevPop — Population stardard deviation
    out.sdPct    = Math.ceil(100*(out.sdPop/out.autoEst)); // StdDevPct — Pop std dev as pct% of estimated ARV // Convert to percent; round up to register small values as “1” instead of “0”
    out.sdPop    = Math.ceil(out.sdPop);                   // Round StdDevPop last to minimize rounding error in StdDevPct; round up to register small values as “1” instead of “0”
  return  out}
function avmRealtor(addy){//function test(){var a={sa:"7317 S Dorchester Ave",city:"Chicago",state:"Il",zip:"60619"};Logger.log(JSON.stringify(avmRealtor(a)))}
  function getAct(addy){//return "http://www.realtor.com/realestateandhomes-search/Seattle_WA/98108/5008-Corson-Ave-S","http://www.realtor.com/realestateandhomes-search/_CA/92587/28916-Avenida-Gaviota"
        var THIS = [,"--","=-"," ",",",", "]
        , WITH = [,"-" ,"=" ,"-","-","-" ]
        , STEM = // "http://www.realtor.com/realestateandhomes-search/" // "For Sale"      http://www.realtor.com/realestateandhomes-search/Costa-Mesa_CA/92627/1139-Aviemore-Terrace
                                                                      // "Recently Sold" 
            "http://www.realtor.com/propertyrecord-search/"     // "Not For Sale"  http://www.realtor.com/propertyrecord-search/Shelton_WA/98584/1522-Fairmount-Ave
                                                                          //                 http://www.realtor.com/propertyrecord-search/Costa-Mesa_CA/92627/1147-Aviemore-Terrace
          , out=(STEM+addy.city.replace(/ /g,"-")+"_"+addy.state+"/"+addy.zip+"/"+addy.sa.replace(/ /g,"-")).trim(),i=THIS.length;while(i---1){out=LibraryjsUtil._replaceAll(out,THIS[i],WITH[i])}
        return out}
    var KEY = [ , "url"    , "imgUrl"   , "foo"       , "sa"    , "city"  , "state" , "zip"   , "estimate"  ]
      , QUE = [ , "og:url" , "og:image" , "highlight" , "<span" , "<span" , "<span" , "<span" , "est-price" ]
      , BEG = [ , '="'     , '="'       , ">"         , ">"     , ">"     , ">"     , ">"     , "</span>"   ]
      , END = [ , '"'      , '"'        , ">"         , "<"     , "<"     , "<"     , "<"     , "<"         ]
      , DEL = [ "$" , "," , "&amp;" ]
      , INS = [ ""  , ""  , "&"     ]
      , out,act=getAct(addy),str=UrlFetchApp.fetch(act).getContentText();out=LibraryjsUtil._scrapeDataset(str,KEY,QUE,BEG,END,DEL,INS);out.link=act;delete out.foo;
    //try{out.estimate=out.estimate.replace(/(\$|,)/gi,"")}catch(e){Logger.log("Error lYPpi: "+e.message)}
      return out}//function test(){Logger.log/*print*/(JSON.stringify(avmRealtor({sa:"5008 Corson Ave S",city:"Seattle",state:"WA",zip:"98108"})))}
function avmHomeSnap (addy){ //addy=addy||{city:"Highland Lakes",sa:"27 Lakeshore Dr E",state:"NJ",zip:"07422",csz:"Highland Lakes, NJ 07422",full:"27 Lakeshore Dr E, Highland Lakes, NJ 07422",part:"Lakeshore Dr E, Highland Lakes, NJ 07422",number:"27"};
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
  return out} // function test(){print/*Logger.log*/(JSON.stringify(avmHomeSnap({city:"Seattle",sa:"5008 Corson Ave S",state:"WA","zip":"98108","csz":"Seattle, WA 98108",full:"5008 Corson Ave S, Seattle, WA 98108"})))}
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
function avmTrulia(s){
    var KEY = [ , "estimate"         , "dataProp"                , "dataLoc"           ]
      , QUE = [ , 'itemprop="price"' , "trulia.propertyData.set" , "pdp_location_data" ]
      , BEG = [ , '"'                , "("                       , "="                 ]
      , END = [ , '"'                , ");"                      , ";"                 ]
   // , DEL = [ , null , null ]
   // , INS = [ , null , null ]
      , act="http://www.trulia.com/submit_search/?display_select=for_sale&tst=h&display=for+sale&search="+encodeURIComponent(s)//"5008+corson+ave+s%2C+seattle%2C+wa"
      , str=UrlFetchApp.fetch(act).getContentText(),out=LibraryjsUtil._scrapeDataset(str,KEY,QUE,BEG,END/*,DEL,INS*/);out.link=act;
      out.addy={sa:out.dataLoc.address,city:out.dataProp.city,state:out.dataProp.stateCode,zip:out.dataProp.zipCode,full:out.dataProp.addressForDisplay};
    return out}//function test(){/*Logger.log*/print(JSON.stringify(avmTrulia("5008 corson ave s, seattle, wa")))}
function avmZipRealty(s){                                                   //  smartZip                               zillow                                 eppraisal
    var KEY = [ , "sa"               , "csz"  , "foo"                        , "A_estVal" , "A_estMin" , "A_estMax" , "B_estVal" , "B_estMin" , "B_estMax" , "C_estVal" , "C_estMin" , "C_estMax" ]//, "priceHistory" ]
      , QUE = [ , "Seller Tools for" , "span" , "avm-chart-series--resprice" , "<span"    , "<span"    , "<span"    , "<span"    , "<span"    , "<span"    , "<span"    , "<span"    , "<span"    ]//, "var data ="   ]
      , BEG = [ , ">"                , ">"    , ">"                          , ">"        , ">"        , ">"        , ">"        , ">"        , ">"        , ">"        , ">"        , ">"        ]//, " "            ]
    , END = [ , "<"                , "<"    , ">"                          , "<"        , "<"        , "<"        , "<"        , "<"        , "<"        , "<"        , "<"        , "<"        ]//, ";"            ]
   // , DEL = [ , null   , null ]
   // , INS = [ , null   , null ]
      , str="http://www.ziprealty.com/property/home-value-estimates-submit?src=ss-lp-button-idx&address="+encodeURIComponent(s)//5008%20corson%20ave%20s%2C%20seattle%2C%20wa&"
      , act="http://www.ziprealty.com"+UrlFetchApp.fetch(str).getContentText()
      , res=UrlFetchApp.fetch(act).getContentText()
      , i,u,w,ar=["A_estVal","A_estMin","A_estMax","B_estVal","B_estMin","B_estMax","C_estVal","C_estMin","C_estMax"]
      , out=LibraryjsUtil._scrapeDataset(res,KEY,QUE,BEG,END/*,DEL,INS*/);out.link=act;out.estimate=[];delete out.foo;
      function procNum(v){
          if(!(typeof v=="string"&&v.charAt(0)=="$")){return false}
          else{v=v.replace("$","");var n=v.charAt(v.length-1);v=v.slice(0,-1);
                   if(n=="K"){v*=   1000}
              else if(n=="M"){v*=1000000} return v}}
      i=ar.length;while(i--){u=procNum(out[ar[i]]);if(u){out[ar[i]]=u;if(!!(1+ar[i].search("Val"))){out.estimate.push(out[ar[i]])}}else{delete out[ar[i]]}}
      //out["priceHistory"]=JSON.parse(out["priceHistory"].replace(/(\s|\\)/gmi,""))
        out.full =s;
        out.sa   =out.sa ?LibraryjsUtil.str2caseTitle(out.sa ):false;
        out.csz  =out.csz?LibraryjsUtil.str2caseTitle(out.csz):false;
        w        =out.csz?out.csz.split(",")                  :false;
        out.city =w[0];
        out.state=w[1];
    return out}//function test(){Logger.log/*print*/(JSON.stringify(avmZipRealty("5008 corson ave s, seattle, wa"/*"5045 88th Ave SE, Mercer Island, WA 98040"*/)))}
function avmRemax(addy){//@param{object} addy: full, city, state, zip // Value estimates per Homes.com // 350+ estimates of surrounds
    var KEY = [ , "listingId" , "latitude" , "longitude" , "listingDetailUrl" , "valueSearchType" , "sa"                  , "city"              , "state"              , "zip"              , "lat"      , "lon"      , "estimate"                  , "bed"                 , "bath"                 , "sqft"                    ]
      , QUE = [ , "ListingID" , "Latitude" , "Longitude" , "ListingDetailURL" , "ValueSearchType" , "listing-card-street" , "listing-card-city" , "listing-card-state" , "listing-card-zip" , "data-lat" , "data-lon" , "listing-card-price-amount" , 'itemprop="BedRooms"' , 'itemprop="BathRooms"' , "listing-detail-sqft-val" ]
      , BEG = [ , ">"         , ">"        , ">"         , ">"                , ">"               , ">"                   , ">"                 , ">"                  , ">"                , '"'        , '"'        , ">"                         , ">"                   , ">"                    , ">"                       ]
    , END = [ , "<"         , "<"        , "<"         , "<"                , "<"               , "<"                   , "<"                 , "<"                  , "<"                , '"'        , '"'        , "<"                         , "<"                   , "<"                    , "<"                       ]
   // , DEL = [ , null , null ]
   // , INS = [ , null , null ]
    ,act="http://www.remax.com/homevalues/"+addy.city.replace(" ","")+"-"+addy.state+"-p001.html?query=addr-"+encodeURIComponent(addy.full)//"http://www.remax.com/homevalues/seattle-wa-p001.html?query=addr-5008%20corson%20ave%20s,%20seattle,%20wa"
    ,out={link:act,array:[]},ar=UrlFetchApp.fetch(act).getContentText().split("<article ");ar=ar.slice(1);i=ar/*.reverse()*/.length;while(i--){
           out.array.unshift( LibraryjsUtil._scrapeDataset(ar[i],KEY,QUE,BEG,END/*,DEL,INS*/));
    try{   out.array[0].sa   =LibraryjsUtil.str2caseTitle(out.array[0].sa   )}catch(e){out.array=out.array.shift();continue}
    try{   out.array[0].city =LibraryjsUtil.str2caseTitle(out.array[0].city )}catch(e){out.array=out.array.shift();continue}
    try{   out.array[0].state=LibraryjsUtil.str2caseTitle(out.array[0].state)}catch(e){out.array=out.array.shift();continue}
    try{if(out.array[0].sa.toLowerCase()==addy.sa.toLowerCase()){out.subject=out.array[0];out.estimate=out.subject.estimate}}catch(e){}
    }return out}//function test(){print/*Logger.log*/(JSON.stringify(avmRemax({sa:"5008 corson ave s",city:"seattle",state:"wa",full:"5008 corson ave s, seattle, wa"})))}
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
//    , THIS  = [,"++","=+"," ",",",", "]
//    , WITH  = [,"+" ,"=" ,"+","+","+" ]
    ;
//            1    2    3   4   5
  var act=STEM+ZWSID+"&address="+addy.sa+"&citystatezip="+addy.csz;//,i=THIS.length;while(i---1){act=act.replaceAll(THIS[i],WITH[i])}//;Logger.log("act: %s",act);return;//try{if(!addy.zip){var arr=addy.csz.split(" ");addy.zip=arr[arr.length-1]}}catch(e){Logger.log("Error 41K8t: "+e.message)};//Logger.log("addy: %s",JSON.stringify(addy));return;
  var t=0;do{try{r=/*LibraryjsUtil.xmlToJson()(bug inducing)*/Xml.parse(UrlFetchApp.fetch(act).getContentText(),true)/*.scrapeDataset(out[0],QUE,BEG,END)* /;Logger.log("r: %s",r);return;*/}catch(e){Logger.log("Error I56pe: "+e.message+": Error: avmZillowAPI: "+addy.sa+", "+addy.csz)}t++}while(/*!LibraryjsUtil.isNumber(out[out[0]])&&*/t<tMax) // scrape without forward to unique URL w/ID // Logger.log("Returned Zillow: t="+t+", est="+out[out[0]]);
  var r=JSON.parse(JSON.stringify(r));
    try{if(r.searchresults.response.results.result.length){r.searchresults.response.results.result=r.searchresults.response.results.result[0];Logger.log("Error 8slEi: ALERT! THIS FUNCTION RETURNED AN ARRAY OF PROPERTY MATCHES AND WAS REDUCED ARBITRARILY TO A SINGLE ONE. THIS COULD RESULT IN INCORRECT OUTPUT ABOUT THE SUBJECT!")}}catch(e){Logger.log("Error d8QmC: "+e.message)} // This problem occurs when, say, a property with a unit number such as a condo is the subject. The str2addy function might strip the unit number which causes this function to return an array as the r...results.result // Future improvements should include a means of matching the original string address unit number to one of the returned values in the array. // Fix by adding a new property named unit to the addy object returned by the str2addy() function
  r.link=act;return r} // Deletion (i.e., replacing with out=r;) is bug inducing // Logger.log("out: %s",JSON.stringify(out));return;
