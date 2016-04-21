Array.prototype.acFetch = function(batchSize,pageNum){
	/* Parameters
	this[0] string County ex: "Riverside" — Location of subject properties
	this[1] string State  ex: ......."CA" — Location of subject properties
	batchSize  int .......ex: .......1000 — How many records to include; default sufficiently large to get all records in one county in one batch/page/iteration
	pageNum    int .......ex: ..........1 — Which page of the result to return; Due to large batch size default condition, default here to pageNum=1
	*/
	if(!batchSize){batchSize=1000}if(!pageNum){pageNum=1} // Set default values
    var ACTION   = "http://www.auction.com/ajax/global-search-ajax.php"; // Reference: “How-to-Guide” for scraping AJAX: http://blog.scrapy.org/scraping-ajax-sites-with-scrapy
    var TYPE     = "application/x-www-form-urlencoded; charset=UTF-8";
    var METHOD   = "post";
    var params   = {"propertyCounty":this[0],"propertyState":this[1],"listPaging":batchSize.toString(),"page":pageNum.toString(),"auctionType":"residential","task":"loadAuctionDetails","trusteeSale":"Yes","trusteeSalePostponed":"Yes"}; // "IopCheck":"No","bankOwnedHomesCheck":"No","maxPrice":"Max","maxbath":"5","maxbed":"5","minPrice":"Min","minbath":"0","minbed":"0","pagegroup":"1","shortSaleCheck":"No","showResidentialSubtabs":"Yes","srchdist":"0","tab":"1","view":"1",
    var options  = {contentType:TYPE, method:METHOD, payload:params}; // var HEADERS={"GData-Version":"3.0","If-Match":"*","X-Requested-With":"XMLHttpRequest","Referer":"http://www.auction.com/California/Riverside-County/pre-foreclosure-trustee-real-estate-auctions.html","Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"} //var options   = {"contentType":TYPE, "method":METHOD, "payload":myPayload, "headers":HEADERS}; // var options   = {contentType:TYPE, method:METHOD, payload:myPayload}; // var myPayload = "task=loadAuctionDetails&venueIDs=&tab=1&page=&pagegroup=&listPaging=48&view=1&lateAdditions=&viewUpdatedProperties=&propertyState=CA&propertyCounty=Riverside&cityVal=&propertyZip=&nrDt=&alertType=&venueCode=&TrusteeSaleNumber=&propertyID=&minbed=0&maxbed=5&minbath=0&maxbath=5&minPrice=Min&maxPrice=Max&area=&YearBuilt=&propertyType=&srchdist=0&propertyID=&bankOwnedHomesCheck=No&trusteeSale=Yes&trusteeSalePostponed=Yes&shortSaleCheck=No&IopCheck=No&product_type=&alert=&page=1&pagegroup=1&morelinkStatus=&searchProperty=&sortBy=&sortByOrder=&backUrl=http://www.auction.com/California/Riverside-County/pre-foreclosure-trustee-real-estate-auctions.html&showResidentialSubtabs=Yes&propertyState=CA&propertyCounty=Riverside&srchdist=0&auctionType=residential";
    return UrlFetchApp.fetch(ACTION, options).getContentText();}
/* Description: Programmatically scrape Auction.com via iMacro script application
List of scripts referencing this file: (Useful for updating)
1. https://sites.google.com/site/uz3npr4jk6avafkh5n4b1pknxwptdj/home/scrapeAuction.html */
/* launch.iim(){      // Use inside iMacros Editor // Name and parentheses are not used in the iMacros scripting application
VERSION BUILD=7511734
TAB T=1
TAB CLOSEALLOTHERS
URL GOTO=file:///C:/Users/User/Downloads/scrape.js
}*/
/* sourceFetch.iim(){ // Use inside iMacros Editor // Name and parentheses are not used in the iMacros scripting application
'1. Set parameters
    'a. Test time
        'SET !SINGLESTEP YES
        'SET !EXTRACT_TEST_POPUP YES
    'b. Run time
        VERSION BUILD=7511734
        SET !WAITPAGECOMPLETE YES
        SET !REPLAYSPEED SLOW
'2. Fetch from Auction.com
    'a. Set tabs
        TAB T=1
        'TAB CLOSEALLOTHERS
    'b. Load URI
        URL GOTO=http://www.auction.com/California/Riverside-County/pre-foreclosure-trustee-real-estate-auctions.html
        TAG POS=1 TYPE=SELECT FORM=NAME:srch ATTR=CLASS:select CONTENT=%48
'==========================        
    'c. Extract source/HTML
        'Reference: [1] http://forum.iopus.com/viewtopic.php?f=7&t=11200 : [2] http://wiki.imacros.net/JavaScript
        'SEARCH SOURCE=REGEXP:"([\s\S]*)" EXTRACT="$1" '— works for Firefox 
        SEARCH SOURCE=REGEXP:"(?s)(.*)" EXTRACT="$1" '—works for IE & iMacros browsers only
        'TAG POS=1 TYPE=HTML ATTR=* EXTRACT=HTM 'Complete Page
        'TAG POS=1 TYPE=HTML ATTR=* EXTRACT=TXT 'Complete Page TEXT only
        'TAG POS=1 TYPE=HEAD ATTR=* EXTRACT=HTM 'Page header only
        'TAG POS=1 TYPE=BODY ATTR=* EXTRACT=HTM 'Page body
    'd. Click “next” page (right arrow)
        TAG POS=1 TYPE=IMG ATTR=SRC:http://www.auction.com/images/pagingRight.png
'==========================
'3. Load into Google form
    'URL GOTO=https://docs.google.com/spreadsheet/ccc?key=0AlLVOoV_2dFtdG1STy1nVWNSNjNtUjdxbHg4YUpfS2c#gid=0       
    URL GOTO=https://docs.google.com/spreadsheet/viewform?formkey=dG1STy1nVWNSNjNtUjdxbHg4YUpfS2c6MQ
    TAG POS=1 TYPE=TEXTAREA ATTR=ID:entry_1 CONTENT={{!EXTRACT}}
    WAIT SECONDS=10
    TAG POS=R1 TYPE=INPUT:SUBMIT ATTR=NAME:submit&&VALUE:Submit
}*/
// Reference documentation: http://wiki.imacros.net/JavaScript
{ // Parameters
	var ACTION_SCRAPE = "http://www.auction.com/California/Riverside-County/pre-foreclosure-trustee-real-estate-auctions.html";
	var ACTION_WRITE  = "https://docs.google.com/spreadsheet/viewform?formkey=dG1STy1nVWNSNjNtUjdxbHg4YUpfS2c6MQ"; // https://docs.google.com/spreadsheet/ccc?key=0AlLVOoV_2dFtdG1STy1nVWNSNjNtUjdxbHg4YUpfS2c#gid=0
	var NEXT_LINK     = "http://www.auction.com/images/pagingRight.png";
	var PAGINATION    = 48;
	var macro         = "";
	var extract		  = "";
}
function settings(){                     // Initializes macro/s with standardized settings
    macro  = "CODE:";
	macro += "\n" + "VERSION BUILD=7511734"; // Run time
	macro += "\n" + "SET !WAITPAGECOMPLETE YES";
	macro += "\n" + "SET !REPLAYSPEED MEDIUM"; // Range of values: SLOW, MEDIUM or FAST
//  macro += "\n" + "SET !EXTRACT_TEST_POPUP YES"; // http://wiki.imacros.net/!EXTRACT_TEST_POPUP
    macro += "\n" + "SET !ERRORIGNORE YES";
//	macro += "\n" + "TAB T=1";
//  macro += "\n" + "TAB CLOSEALLOTHERS";
//	macro += "\n" + "SET !SINGLESTEP YES"; // Test time
	return macro;
}
function fetchUri(action, count){        // Load & paginate page
	macro  = settings();
	macro += "\n" + "SET !WAITPAGECOMPLETE YES";
	macro += "\n" + "URL GOTO=" + action; // Load URI
	macro += "\n" + "SET !WAITPAGECOMPLETE YES";
	macro += "\n" + "TAG POS=1 TYPE=SELECT FORM=NAME:srch ATTR=CLASS:select CONTENT=%" + count; // Paginate
	macro += "\n" + "SET !WAITPAGECOMPLETE YES";
	macro += "\n" + "WAIT SECONDS=5";
	return macro;
}
function scrapePage(){                   // Extract page source code/HTML via regexp — regular expression — Reference: http://forum.iopus.com/viewtopic.php?f=7&t=11200
	macro  = settings();
	macro += "\n" + "SET !WAITPAGECOMPLETE YES";
	macro += "\n" + "SEARCH SOURCE=REGEXP:\"(?s)(.*)\" EXTRACT=\"$1\"";
	macro += "\n" + "SET !WAITPAGECOMPLETE YES";
	return macro;
	{ // Notes & Reference: http://forum.iopus.com/viewtopic.php?f=7&t=11200
	//'SEARCH SOURCE=REGEXP:"([\s\S]*)" EXTRACT="$1" '— works for Firefox & iMacros browswers only. Given regexp works for IE. 
	//'TAG POS=1 TYPE=HTML ATTR=* EXTRACT=HTM 'Complete Page
	//'TAG POS=1 TYPE=HTML ATTR=* EXTRACT=TXT 'Complete Page TEXT only
	//'TAG POS=1 TYPE=HEAD ATTR=* EXTRACT=HTM 'Page header only
	//'TAG POS=1 TYPE=BODY ATTR=* EXTRACT=HTM 'Page body
	}
}
function clickNext(){                    // Click “next” page button — right arrow
	macro  = settings();
	macro += "\n" + "SET !WAITPAGECOMPLETE YES";
	macro += "\n" + "TAG POS=1 TYPE=IMG ATTR=SRC:" + NEXT_LINK;
	macro += "\n" + "SET !WAITPAGECOMPLETE YES";
	return macro;
}
function writeToGoogleForm(action, str){ // Load & write/upload into Google form. Ref: http://code.google.com/apis/spreadsheets/data/3.0/developers_guide.html#UpdatingCells | https://docs.google.com/spreadsheet/ccc?key=0AlLVOoV_2dFtdGpmOXE4OWpkeUE5RkJuS0FfakZDWXc&hl=en_US#gid=5
	macro  = settings();
	macro += "\n" + "TAB OPEN"; // 'open a new tab
	macro += "\n" + "SET !WAITPAGECOMPLETE YES";
	macro += "\n" + "TAB T=2"; // 'get new tab to foreground
	macro += "\n" + "SET !WAITPAGECOMPLETE YES";
	macro += "\n" + "URL GOTO=" + action; // 'load page containing the form
	macro += "\n" + "SET !WAITPAGECOMPLETE YES";
	macro += "\n" + "TAG POS=1 TYPE=TEXTAREA ATTR=ID:entry_1 CONTENT=" + str; // Enter string content // CONTENT={{!EXTRACT}} is used within iMacro script editor
	macro += "\n" + "SET !WAITPAGECOMPLETE YES"; // "WAIT SECONDS=10";
	macro += "\n" + "TAG POS=R1 TYPE=INPUT:SUBMIT ATTR=NAME:submit&&VALUE:Submit"; // Press submit
	macro += "\n" + "SET !WAITPAGECOMPLETE YES";
	macro += "\n" + "TAB CLOSE"; // 'close the second tab
	macro += "\n" + "SET !WAITPAGECOMPLETE YES";
	macro += "\n" + "TAB T=1"; // 'Make first tab active again
	macro += "\n" + "SET !WAITPAGECOMPLETE YES";
	return macro;
}
function main_iMacroScrape_ac(){         // Calls all functions within looping logic to execute entire task // 
	alert("Starting scraping session");
	var imacros = new ActiveXObject("imacros"); imacros.iimInit("-ie"); // imacros.iimDisplay("Starting scraping session");
	imacros.iimPlay(fetchUri(ACTION_SCRAPE, PAGINATION)); // Load & paginate page // imacros.iimPlay("SourceFetch"); // Calls script/file from inside IMacros application
	do{ // Loop over all pages — scrape + extract
		imacros.iimPlay(scrapePage()); // Extract source code
		extract += imacros.iimGetExtract(); // Increment extraction variable with new source code
		iret = imacros.iimPlay(clickNext());  // Press right arrow button
		extract = extract.hexEncode(); // Encode the extraction variable in hexadecimal to allow it to be written via HTTP. Ref script: "encode"
		imacros.iimPlay(writeToGoogleForm(ACTION_WRITE, extract)); // Write out via post to Google form
		extract = ""; // Reset variable
	} while(iret > 0)
	alert("Scraping complete"); // alert(extract); // values[2] = extract.hexEncode(); alert(values[2]); // values[2] = extract;
	imacros.iimClose();
}
function main_httpScrape_ac(){
	var ACTION = "http://www.auction.com/California/Riverside-County/pre-foreclosure-trustee-real-estate-auctions.html";
	enableRead();document.write(ACTION.http());
}