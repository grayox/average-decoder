function write2doc(str, id){ // To retrieve, call retrieveDataFromDoc(id) // Write to doc write2doc() because writing to spreadsheet write2ss() threw errors for large data sets
    if(typeof str=="object"){str=JSON.stringify(str)} // Converts objects to JSON strings when necessary
    var doc=id?DocumentApp.openById(id):DocumentApp.create("New"),t=doc.getBody().editAsText(),len=t.getText().length; // Edit existing doc if ID, else create new
    if(len){t.deleteText(0,len-1)}t.insertText(0,str);return}//function test(){var ar=[[1,2,3,4,5,6,7,8],[1,2,3,4,5,6,7,8],[1,2,3,4,5,6,7,8]],ID="1ikEnj1uuT2-vgjbWszalr8NFPOnYOGeI5nYuxXk1SYs";write2doc(ar,ID)}
function scrape_netFlix(){
    var QUERY = ""//"YzE9MTAwMDAwMCZjMj03OTIyODE2MjUxNDI2NDMzNzU5MzU0Mzk1MDMzNSZsdHlwZT00MCZvPTE4"
    ,   SSID  = ""//"1IBQSJJlr2uNRelowopF9nJuckx-hHzl8XjhgkeeWeVU"
    ,   SHEET = "Sheet2"
    ,a=scrapeQuery(QUERY);LibraryjsUtil.write2ss(true,a,SHEET,SSID,true);
}
function scrapeQuery(q){var out=[],run=true,i=1;while(run){var a=scrapePage(q,i++);if(a.length){out=out.concat(a)}else{run=false}}return out}
function scrapePage(q, page){ // http://usa.newonnetflix.info/catalog/rating/all/8 // 9 thru 2 // 5244 available
    // @{str} q: Query search string, copied from URL after advanced search // @{int} page: Page number in scraping sequence
    var KEY = [ , "price"                     , "cashflow"                  , "title"     , "link"  , "desc"              , "data-id"               , "headline"       ]//"data"          ]
    ,   QUE = [ , "class=\"asking\""          , "Cash Flow:"                , "<a title=" , "href=" , "<p class=\"desc\"" , "<div data-listing-id=" , "data-headline=" ]//"numberOfItems" ]
    ,   BEG = [ , "<b>"                       , ">"                         , "\""        , "\""    , ">"                 , "\""                    , "\""             ]//","             ]
    ,   END = [ , "</"                        , "<"                         , "\""        , "\""    , "<"                 , "\""                    , "\""             ]//"</script>"     ]
    ,  REPL = [ , ["$", ",", "Not Disclosed"] , ["$", ",", "Not Disclosed"] ,             ,         ,                     ,                         ,                  ]
    ,  WITH = [ , ["" , "" , "--"           ] , ["" , "" , "--"           ] ,             ,         ,                     ,                         ,                  ]
    ,  tail = "buy-a-business-for-sale/page-"+page+"/?q="+q //"buy-a-business-for-sale/page-2/?q="YzE9MTAwMDAwMCZjMj03OTIyODE2MjUxNDI2NDMzNzU5MzU0Mzk1MDMzNSZsdHlwZT00MCZvPTE4"
    ,  STEM = "http://www.bizquest.com",src=src||UrlFetchApp.fetch(/*[STEM, tail].join("/")*/"http://usa.newonnetflix.info/catalog/rating/all/8").getContentText();write2doc(src);return;//,a=src.split("<div class=\"result basic\">");a.shift();//Logger.log(arr.length);var out=LibraryjsUtil._scrapeDataset(src,KEY,QUE,BEG,END,[],[]);write2doc(out);
    var i=a.length;while(i--){a[i]=LibraryjsUtil._scrapeDataset(a[i],KEY,QUE,BEG,END,REPL,WITH);
    /** /
    // Special Processing — after inspecting results, we process as follows: 1. Eliminate sold/pending 2. Parse address 3. Parse dates
       if(a[i].city       . length>200){var keys=Object.keys(a[i]),j=keys.length;while(j---3){a[i][keys[j]]=""}a[i].city="SOLD";}// Bimodal distribution of results: out.city.length<50:for sale;out.city.length<2100:sold or pending
       if(a[i].state      . length>  2){try  {a[i].sa =a[i].city ;var csz=a[i].state.split(" ");if(csz[csz.length-1].length >2){a[i].zip  =csz.pop()}else{a[i].zip=""}arr[i].state=csz.pop();arr[i].city=csz.join(" "); }catch(e){Logger.log(e.message)}}else{arr[i].sa="";arr[i].zip="";} // If out.state.length>2, state={city state zip}, city={sa}
       if(a[i].zip        . length>  0){while(a[i].zip.length<5){a[i].zip="0"+arr[i].zip}}a[i].zip=a[i].zip.slice(0,5);
      try{a[i].sa         = LibraryjsUtil.toCaseTitle (a[i].sa  )         ;}catch(e){Logger.log(e.message)}
      try{a[i].city       = LibraryjsUtil.toCaseTitle (a[i].city)         ;}catch(e){Logger.log(e.message)}
      try{a[i].state      = LibraryjsUtil.stateConvert(a[i].state,"abbr") ;}catch(e){Logger.log(e.message)}
      try{a[i].lienPos    = a[i].lienPos ? arr[i].lienPos.charAt(0) : "X" ;}catch(e){Logger.log(e.message)}
      try{a[i].loanStatus = LibraryjsUtil.convrepl(a[i].loanStatus,{"Performing":"P","Non Performing":"N","Newly Originated":"O"},"X");}catch(e){Logger.log(e.message)}//Logger.log(a);//var t={"Performing":"P","Non Performing":"N","Newly Originated":"O"},kys=Object.keys(t);arr[i].loanStatus=(kys.indexOf(arr[i].loanStatus)>-1)?t[arr[i].loanStatus]:"X";}
    /**/
      try{a[i].title      = LibraryjsUtil.toCaseTitle(a[i].title)         ;}catch(e){Logger.log(e.message)}
      try{a[i].headline   = LibraryjsUtil.toCaseTitle(a[i].headline)      ;}catch(e){Logger.log(e.message)}
      try{a[i].desc       = LibraryjsUtil.toCaseSentence(a[i].desc)       ;}catch(e){Logger.log(e.message)}
      try{a[i].price      = parseInt(a[i].price)                          ;}catch(e){Logger.log(e.message)}
      try{a[i].cashflow   = parseInt(a[i].cashflow)                       ;}catch(e){Logger.log(e.message)}
      try{a[i].link       = a[i].link.split("/?q=")[0]                    ;}catch(e){Logger.log(e.message)}
      try{a[i].id         = a[i].link.split("/").pop()                    ;}catch(e){Logger.log(e.message)}
    }//LibraryjsUtil.write2ss(true, a, "Sheet1", "1IBQSJJlr2uNRelowopF9nJuckx-hHzl8XjhgkeeWeVU", true);//Logger.log(a);
    return a}
