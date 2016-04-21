function getBid_smhf(){ // http://www.sellmyhousefast.com/homeinfo_zs.php, http://www.cashoffers.com/homeinfo_zs.php
    var payload = {CurrentState:"submit",/*PDID:"HD2YSM46S2CSBQ",*/newtv:"no",domain:"type-in",ZipCode:"12010",County:"Montgomery",City:"Amsterdam",State:"NY",FirstName:"Marsha",LastName:"Hernandez",EmailAddress:"marshaehernandez@suremail.info",HomePhone:"2064862010",UrgencyToSale:"ASAP",IsHomeListed:"No",CurrentOnPayments:"No",Address:"17 Jay St",EstimatedHomeValue:74000,NumberOfBedrooms:4,NumberOfBathrooms:2,HeardAbout:"Internet",HeardAbout_DetailsI:"Google",HeardAbout_DetailsTV:"",HeardAbout_Details_Channel:""}
 // ,   cookie  = UrlFetchApp.fetch("http://www.loanmls.com/public/do_login/noheaders",{method:"post",payload:{email:"marshaehernandez@suremail.info",password:"teleworm"},followRedirects:false,headers:{/*Host:"www.loanmls.com",*/Origin:"http://www.loanmls.com",Referer:"http://www.loanmls.com/"}}).getAllHeaders()["Set-Cookie"]
    ;   Logger.log(data.getAllHeaders());Logger.log(data.getContentText());}
    ,   data    = UrlFetchApp.fetch("http://www.sellmyhousefast.com/homeinfo_zs.php",{method:"post",payload:payload,/*headers:{Cookie:cookie}*/}).getContentText()

 /* Source    */ [ "actionUrl"                                           , "fName"      , "lName"     , "email"                          , "phone"      , "sa"              , "city"      , "state" , "zip"     , "beds"             , "baths"             , "sqft" , "estVal"                         ,,,,,,,,,,,,,  ]
 /* Example   */ [ "http://www.example.com"                              , "Marsha"     , "Hernandez" , "marshaehernandez@suremail.info" , "2064862010" , "17 Jay St"       , "Amsterdam" , "NY"    , "12010"   ,  3                 ,  2                  ,  1500  ,  74000                           ,,,,,,,,,,,,,  ]
 /* Vendor 1  */ [ "http://www.sellmyhousefast.com/homeinfo_zs.php"      , "FirstName"  , "LastName"  , "EmailAddress"                   , "HomePhone"  , "Address"         , "City"      , "State" , "ZipCode" , "NumberOfBedrooms" , "NumberOfBathrooms" , false  , "EstimatedHomeValue"             ,CurrentState:"submit",/*PDID:"HD2YSM46S2CSBQ",*/newtv:"no",domain:"type-in",County:"Montgomery",UrgencyToSale:"ASAP",IsHomeListed:"No",CurrentOnPayments:"No",HeardAbout:"Internet",HeardAbout_DetailsI:"Google",HeardAbout_DetailsTV:"",HeardAbout_Details_Channel:""} ,,,,,,,,,,,,,,,,  ]
 // Vendor 1Xa   [ "http://www.cashoffers.com/homeinfo_zs.php"           , Same as above — "Home Buyer's Network"                                                                                                                                                                                          ]
 /* Vendor 2  */ [ "http://www.fasthomeoffer.com/buymyhouse/default.asp" , "fname"      , "lname"     , "email"                          , "phcell"     , "address"         , "City"      , "state" , "zip"     , "beds"             , "baths"             , "sqft" ,  false                           , partnerid:0,phhome:,phwork:,garage:,pool:,occupied:,propertytype:,listed:,listedprice:,value:,valuesource:,askprice:,repairs:,sellingreason:,mortbal1:,mortint1:,mortpmt1:,mortbal2:,mortint2:,mortpmt2:,behind:,amtbehind:,howfound:,notes: ,,,,,,,,,,,,,,,,  ]
 // Vendor X1    [ "http://www.zbuyer.com/"                              , 3-step form + phone validation + pin code + click to email + 2 more click thrus = get automated offer + promise to be contacted by investor                                                                                                          ]
 // Vendor 3  */ [ "http://www.1800sellnow.com/referrals.html"           , Form Submission Error                                                                                                                                                                                                                  ]
 /* Vendor 4  */ [ "http://housecashnow.com/wp-admin/admin-ajax.php"     , "first_name" , "last_name" , "email"                          , "phone"      , "address"/*Full*/ ,  false      ,  false  ,  false    ,  false             ,  false              ,  false , "asking_price" /*"Best Offer"*/" ,"currently_listed_on_the_market:No","comments__situation:","iwac_submitted:true","iwac_abval","iwac_abval_two","iwac_adminajax:http://housecashnow.com/wp-admin/admin-ajax.php","iwac_form_id:601","action:iwajax_submit"                                                       ]

 
Norma J. Barefield
NormaJBarefield@suremail.info
478-369-6384
2045 Graystone Lakes
Macon, GA 31201
MasterCard: 5346 1601 6972 6209
Exp 6/2019
Request URL:http://www.realtytrac.com/mapsearch/auctions/ca/san-bernardino-county/ ... http://www.realtytrac.com/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=default,asc&itemsper=50
Request Method:GET
Status Code:200 OK
Request Headersview source
Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Encoding:gzip,deflate,sdch
Accept-Language:en-US,en;q=0.8
Connection:keep-alive
Cookie:OX_plg=swf|shk|pm; ASP.NET_SessionId=aj3jdetgbn2esrwhotnl1c2x; ASPSESSIONIDASDTRBBA=EENLJKPCFABCIEFJOCANFPHK; 4LB=ASP1389201778; ShowBrowserUpgradePopup=0; optimizelyEndUserId=oeu1389230461321r0.6742789067793638; __gads=ID=60240158f2c93ebb:T=1389230455:S=ALNI_Mb92wtYgCz_k3IHUIEIr6WBg-KJCQ; GoogleTestCookie=PDSA; Cobrand302TrialVer=2; V3Test=3; RTVisitorID=77685bce-8c2c-497d-8b0b-67e825ae7a87; RTSessionID=3c65250e-e131-491d-b629-bcb7afca19ef; visitor=W3siVXNlcldlYlNlc3Npb25JRCI6IjNjNjUyNTBlLWUxMzEtNDkxZC1iNjI5LWJjYjdhZmNhMTllZiIsIlNlc3Npb25LZXkiOiJSVFRlc3RfSG9tZVNjb3JlVGVzdF8xMDAiLCJTZXNzaW9uVmFsdWUiOiJUcnVlIiwiQ3JlYXRpb25EYXRlIjpudWxsLCJVcGRhdGVEYXRlIjpudWxsfV0=; RTVistorIDTracking=55ba2e3c-a49c-46ee-a1dd-163b88025f47; ASPSESSIONIDCAQTQDCB=MOGDGIADJODDPOKMCPMEJPEP; profileCom=d55e9b41; ABTest=Member=False; RealtyTracLogin=F794ED65%2DE5EB%2D4C15%2D8D29%2DA6693A27A839; .REALTYTRAC=394BF5F86C077EFC7127E5B2DBDB1007451A52922CAD79CC7032BA5B0A74C7791C36BEC3E2D16EE389CC4A0B6CD28BA95BC8D2F055EF6C95AB750777F39D53CCC0281330A81898E727E3F30D188598B33A64BEA1DB473C90CE2FED9BFDD406ED3F91D1CCA10AC9968489BCDBFF9FCC2B0AEC005A3C518908B675D943B0EE5B37D9662BA62B09A310621C5DD7E683B516E25EBBD25151BF9CC9814EDA058D60CA19C34D21BBC392891E530CE3EABE1A6D9FA4D5D8FDFF60DE0D75B8D9A8E7CFA4AD788F25F03829BBDD6F0066619F62BBFEEB86D70D6665FC11F191D4A228AA1AFBC2BB8CDF4A950A4CD4C3B1799C26000FE811A353ED7041590B375A298398C009203EFC4483EEFF73FCE5990562D7F170CBD84DE319F056F09F3DAF366DF6D28B03DF8A165378273AF528E63223BE4A985993C9EB447B49C557006F371AC11CBB24BF20EF2C2B5725B60DE53A47D87E47256CF233BFCA2BBEDA95BC8AF1825F63098A2A498F21963908A46C719658517789960E5A60CD0DA31449DA90365A9E9FEB4513; profile=D55E9B41; PropertyIdsCookie=AAEAAAD/////AQAAAAAAAAAEAQAAAH5TeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0YDFbW1N5c3RlbS5JbnQzMiwgbXNjb3JsaWIsIFZlcnNpb249NC4wLjAuMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj1iNzdhNWM1NjE5MzRlMDg5XV0DAAAABl9pdGVtcwVfc2l6ZQhfdmVyc2lvbgcAAAgICAkCAAAAAgAAAAIAAAAPAgAAAAQAAAAIHc1LAGSEbAgAAAAAAAAAAAs=; ASPSESSIONIDSQRBTQDA=FAPBKJADCJCLENFKIKOKEPID; AID=; RealtyTracTestingFramework=14x-1=26; HBXcobraShown=13562; cobraAccount=13562; optimizelyCustomEvents=%7B%22oeu1389230461321r0.6742789067793638%22%3A%5B%22reg1_-_save_%26_continue%22%2C%22billing_button%22%2C%22reg2_button_(click)%22%5D%7D; FreeTrialVer=5; _ga=GA1.2.101924903.1389230462; session=W3siVXNlcldlYlNlc3Npb25JRCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsIlNlc3Npb25LZXkiOiJNYXBQb3NpdGlvbiIsIlNlc3Npb25WYWx1ZSI6bnVsbCwiQ3JlYXRpb25EYXRlIjpudWxsLCJVcGRhdGVEYXRlIjpudWxsfV0=; CurrentAdvancedRequest={"STab":null,"Latitude":0,"Longitude":0,"BasicRequest":{"Zip":null,"CountyCode":null,"City":null,"Address":null,"ParcelNumber":null,"PropertyID":null,"NeighborhoodID":null,"NeighborhoodName":null,"ExactZip":false,"SearchType":6,"LatitudeRange":null,"LongitudeRange":null},"AdvancedRequest":{"USS":true,"PropertyTabType":null,"PropertySubTabName":null,"DatabaseType":0,"PropertyType":"","Rating":31,"PriceFrom":null,"PriceTo":null,"BedroomCountFrom":0,"BedroomCountTo":null,"BathroomCountFrom":0,"BathroomCountTo":null,"SquareFeetFrom":0,"SquareFeetTo":null,"FromDate":null,"ToDate":null,"DateRange":-10,"SortField":512,"SortFieldMap":4,"RecordsPerPage":10,"ExcludeSuppliers":[],"IncludeSuppliers":[],"UFA":false,"SM":0,"HSF":null,"HST":null,"EF":null,"ET":null,"LTVF":null,"LTVT":null,"LN":null,"LotSize":0,"LotSizeTo":null,"YF":null,"YT":null,"ListedForeclosures":1,"Bankruptcies":1,"IncludeTrusteeSalesAuctions":null,"IncludeBankOwnedAuctions":null,"IncludeNonDistressedAuctions":null,"AuctionDateFrom":null,"AuctionDateTo":null,"AuctionDateRange":-10,"BrokerId":null},"CurrentPage":0,"ResultType":0,"IsMapVisible":false,"ZoomLevel":14,"MapPosition":null,"IsInteractiveRequest":false,"IsMf":false,"CheckedTypes":null,"IsBasicSearchRequest":false,"OfferEnabledVendorName":null,"OodleRequestType":0}; LastPageViewed=/mapsearch/auctions/ca/san-bernardino-county/; optimizelySegments=%7B%22363140012%22%3A%22referral%22%2C%22364770012%22%3A%22false%22%2C%22369310017%22%3A%22gc%22%2C%22560850464%22%3A%22none%22%7D; optimizelyBuckets=%7B%22548751241%22%3A%22546450237%22%7D; __utma=38979488.101924903.1389230462.1389236575.1389237626.4; __utmb=38979488.8.10.1389237626; __utmc=38979488; __utmz=38979488.1389237626.4.3.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=realtytrac%20auctions; __utmv=38979488.|2=Member%20Type=No%20Account=1; __session:0.6590567925013602:=http:; loadtab=no; DefaultSearchPage=false; ASP.NetCoAccount=13562; LastSearch=San%20Bernardino%20county%2c%20CA
Host:www.realtytrac.com
User-Agent:Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36

RealtyTrac
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=9">
	 <title>San Bernardino County Auctions - Home Foreclosure and Trustee Sale Auctions</title>
        <meta name="description" content="San Bernardino County, CA real estate auctions, government auctions and notice of foreclosure sales" />
        <meta name="keywords" content="San Bernardino County California foreclosure auctions,  trustee sales, sheriffs sales, San Bernardino County notice of foreclosure sales, California foreclosed home auctions, CA public real estate auctions, properties, listings" />
  
    <link href="//i3.realtytrac.com/UI/styles/dashboard.css?v=28&amp;d=20140108" rel="stylesheet" type="text/css" />
    <link href="//i3.realtytrac.com/UI/styles/common.css?v=42&amp;d=20140108" rel="stylesheet" type="text/css" />   
    <link href="//i1.realtytrac.com/UI/styles/rating.css?v=11&amp;d=20140108" rel="stylesheet" type="text/css" />
    <link href="//i2.realtytrac.com/UI/styles/collection.css?v=12&amp;d=20140108" rel="stylesheet" type="text/css" />   
    <link href="//i1.realtytrac.com/UI/styles/Mapsearch/RT_SEOPage_style.css?v=14&amp;d=20140108" rel="stylesheet" type="text/css" />
    <link href="//i3.realtytrac.com/UI/styles/jquery.bxslider.css?v=4&amp;d=20140108" rel="stylesheet" type="text/css" />
    <script src="//i2.realtytrac.com/Scripts/jquery-1.7.2.min.js?d=20140108" type="text/javascript"></script>   
    <script src="//i1.realtytrac.com/jscript/jquery/jquery-1.8.23-ui.min.js?d=20140108" type="text/javascript"></script>
    <script src="//i2.realtytrac.com/Scripts/jquery.tools-1.2.7.min.js?d=20140108" type="text/javascript"></script>
  
    <script src="//i3.realtytrac.com/UI/jscript/common.js?v=44&amp;d=20140108" type="text/javascript"></script>
	<script src="//i1.realtytrac.com/UI/jscript/easyXDM/easyXDM.min.js?d=20140108" type="text/javascript"></script>
    <script src="//i2.realtytrac.com/jscript/headersearch.js?v=34&amp;d=20140108" type="text/javascript"></script>
    <script src="//i1.realtytrac.com/jscript/jquery/masked-input-rtrac-mod.js?d=20140108" type="text/javascript"></script>
    <script src="//i2.realtytrac.com/UI/jscript/Common/PropertyInfoToolBox.js?v=21&amp;d=20140108" type="text/javascript"></script>
    <script src="//i3.realtytrac.com/jscript/CustomControls.js?v=42&amp;d=20140108" type="text/javascript"></script>
    <script src="//i2.realtytrac.com/UI/jscript/MapSearch/MapSearch.js?v=21&amp;d=20140108" type="text/javascript"></script>
    <script src="//i3.realtytrac.com/Scripts/jquery_session.js?d=20140108" type="text/javascript"></script>
    <script src="//i3.realtytrac.com/jscript/jquery/jquery.bt.min.js?v=11&amp;d=20140108" type="text/javascript"></script>     
    <script src="//i1.realtytrac.com/UI/jscript/jquery.bxslider.min.js?v=2&amp;d=20140108" type="text/javascript"></script>    
<script src="//cdn.optimizely.com/js/361650383.js"></script>
    <script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-22949028-3']);
    _gaq.push(['_trackPageview']);
    //_gaq.push(['_setCustomVar', 1, 'Platform Version', '2.0', 1]);
    _gaq.push(['_setDomainName', 'realtytrac.com']);

    //more var to check duplicate Broker shown
    var brokerShownGAID = "";

        
            _gaq.push(['_setCustomVar', 1, 'Login State', 'Logged In', 2]);
        

    _gaq.push(['_setCustomVar', 2, 'Member Type', 'No Account', 1]);

    (function() {
        var ga = document.createElement('script'); 
        ga.type = 'text/javascript'; 
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; 
        s.parentNode.insertBefore(ga, s);
    })();
</script>    
    <link href="//i2.realtytrac.com/UI/styles/mapsearch/mapsearch.css?v=23&amp;d=20140108" rel="stylesheet" type="text/css" />


    <script language="javascript" type="text/javascript">
        
        var g_JsModel = {
            "appPath": "http://www.realtytrac.com/"
           };

           $(function () {
               RemoveSkypeExtrasManager();
           });
 
    </script>
</head>
<body>
<!-- Google Tag Manager -->
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-NM77L5"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NM77L5');</script>
<!-- End Google Tag Manager -->    
    <div class="container" style="margin-top:215px;">
        <div class="centerer">
            <div id="Content">
                <div class="leftContent">
                    
<div class="wrapper container">
    <div id="pageContent" class="main">

    <div class="breadcrumbs">
        <ul class="clearfix">
    <li>
        <div itemscope itemtype="http://data-vocabulary.org/Breadcrumb">

                <a href="/" itemprop="url" title="Home"><span itemprop="title">Home</span></a>
        </div>
    </li>
                        <li>&gt;</li> 
    <li>
        <div itemscope itemtype="http://data-vocabulary.org/Breadcrumb">

                <a href="/mapsearch/auctions/" itemprop="url" title="Auctions"><span itemprop="title">Auctions</span></a>
        </div>
    </li>
                        <li>&gt;</li> 
    <li>
        <div itemscope itemtype="http://data-vocabulary.org/Breadcrumb">

                <a href="/mapsearch/auctions/ca/" itemprop="url" title="California"><span itemprop="title"><span itemprop='addressRegion'>California</span></span></a>
        </div>
    </li>
                        <li>&gt;</li> 
    <li>
        <div itemscope itemtype="http://data-vocabulary.org/Breadcrumb">

                <span itemprop="title" title="San Bernardino County"><span itemprop='addressRegion'>San Bernardino County</span></span>
        </div>
    </li>

        </ul>
    </div> 


<h1 class='search-results-title' itemprop='address' itemscope itemtype='http://schema.org/PostalAddress'><span itemprop='addressRegion'>San Bernardino County</span> Auctions &nbsp;<span class="amp">&amp;</span>&nbsp;<span itemprop='addressRegion'>San Bernardino County</span> Trustee Sales</h1>        <div class="active-filters">
            <ul>
                    <li>Filters: Showing all properties, all prices</li>
                
                    <li class="refine-search"><a href="javascript:void(0);" class="advancedSearchLink">Refine
                        Search</a></li>
                    <li class="save-search">
                        <a id="searchSavedMssg" style="display: none;" class="searchSaved">Search saved<span
                            class="searchSavedNotification">This search has been saved<span class="corner"></span></span></a>
                        <a id="searchSavedLink" href="javascript:void(0);" onclick="EnableSaveSearch(&#39;true&#39;);">
                            Save Search</a>
                </li>
            </ul>
        </div>
        <div class="rtTabs results-result-tab tab-container clearfix">
        
    <div class="property-tab rtTabs">
    <div class="tabs">
        <ul id="propertyTabs">
                    <li><a class="property-tab-mapsearch" href="/mapsearch/ca/san-bernardino-county-foreclosures.html?sortbyfield=default,asc"><span class="text">All Foreclosures </span></a></li>
                    <li><a class="property-tab-mapsearch" href="/mapsearch/pre-foreclosures/ca/san-bernardino-county/?sortbyfield=default,asc"><span class="text">Pre-foreclosures </span></a></li>
                     <li class="active" wf="auctions"><a><span class="text">Auctions </span></a></li>
                    <li><a class="property-tab-mapsearch" href="/mapsearch/bank-owned-properties/ca/san-bernardino-county/?sortbyfield=default,asc"><span class="text">Bank Owned </span></a></li>
                    <li><a class="property-tab-mapsearch" href="/mapsearch/real-estate/ca/san-bernardino-county/?sortbyfield=default,asc"><span class="text">Homes For Sale </span></a></li>
                    <li><a class="property-tab-mapsearch" href="/mapsearch/sold/ca/san-bernardino-county/?sortbyfield=default,asc"><span class="text">Recently Sold </span></a></li>
       </ul>
    </div>
</div>

<script type="text/javascript">
    $(function () {
        function _SetTabs() {
            $(".rtTabs").each(function (i) {

                var thisJq = $(this);

                thisJq.find('.tabs ul li').each(function (ind) {
                    $(this).css("z-index", 9 - ind);
                });

            });
        }
        _SetTabs();
    });  

</script>
    <div class="auctionSubFiltersBar">
        <span class="title">Include </span>&nbsp;
<input checked="checked" data-val="true" data-val-required="The IsChecked field is required." id="TrusteeSales" name="checkBox.IsChecked" onclick="SetAuctionDisplayState();" type="checkbox" value="true" /><input name="checkBox.IsChecked" type="hidden" value="false" />            <label for="TrusteeSales">Trustee Sales</label>&nbsp;
<input checked="checked" id="BankAuctions" name="checkBox.IsChecked" onclick="SetAuctionDisplayState();" type="checkbox" value="true" /><input name="checkBox.IsChecked" type="hidden" value="false" />            <label for="BankAuctions">Bank Auctions</label>&nbsp;
    </div>
                <div class="tabs-content">
                    <div class="tab-content active">
            
<div class="user-toolbox">
    <ul class="clearfix">
        <li class="checkbox">
            <input type="checkbox" id="chkSelectAll" /></li>
                    <li class="download" ><a id="propertiesDownloadLink" href="javascript:void(0);">Download</a></li>
            <li class="clear-download"><a href="javascript:void(0);" >Clear Download Selections</a></li>
                    <li class="per-page">
                <select id="viewsPerPage" name="pagination">
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=default,asc&amp;itemsper=10"  selected="selected" >10 Per Page</option>
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=default,asc&amp;itemsper=25" >25 Per Page</option>
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=default,asc&amp;itemsper=50" >50 Per Page</option>
                </select>
            </li>				
                    <li class="sort">
                <select id="sortBy">
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=featured,desc" >Sort by: Featured</option>
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=default,desc" >Sort by: Auction Date (starting later)</option>
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=default,asc"  selected="selected" >Sort by: Auction Date (starting soon)</option>
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=price,asc" >Sort by: Opening Bid (low to high)</option>
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=price,desc" >Sort by: Opening Bid (high to low)</option>
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=pricepersqftdisplay,asc" >Sort by: Price / Sq. Ft. (low to high)</option>
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=pricepersqftdisplay,desc" >Sort by: Price / Sq. Ft. (high to low)</option>
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=beds,desc" >Sort by: Beds</option>
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=baths,desc" >Sort by: Baths</option>
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=squarefeet,desc" >Sort by: Square Feet</option>
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=listed,desc" >Sort by: Status</option>
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=equity,asc" >Sort by: Equity (low to high)</option>
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=equity,desc" >Sort by: Equity (high to low)</option>
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=ltv,asc" >Sort by: LTV (low to high)</option>
                        <option value="/mapsearch/auctions/ca/san-bernardino-county/?sortbyfield=ltv,desc" >Sort by: LTV (high to low)</option>
                </select>
            </li>
        
    </ul>
</div>
<div class="compare-panel clearfix" style="display:none;">
    <ul class="clearfix">
        <li>COMPARE</li>
        <li class="compare-panel-items">
            <ul>
                <li class="property-item">1</li>
                <li class="property-item">2</li>
                <li class="property-item">3</li>
                <li class="property-item">4</li>
                <li class="property-item">5</li>
            </ul>
        </li>
        <li class="buttons"><a href="javascript:void(0);" onclick="GenerateComparePageUrl();">VIEW (<span id="comparePropertyCount">0</span>)</a>
        &nbsp;|&nbsp;
        <a href="javascript:void(0);" onclick="ClearComparePropertyCheckBoxes();">CLEAR</a></li>
    </ul>
    <input type="hidden" id="compareSelectedCount" value="0"/>
</div>
                    </div>
                </div>
                <div id="housesList" class="houses-list">
            



<div class="house  alt   clearfix">
        <div class="checkbox">
            <input type="checkbox" name="chkPropertyID" value="52567451" />
        </div>
    <div class="thumb empty-pic">
        <a href="/propertydetails/ca/chino-hills/91709/grenview-way/52567451">
            <img ncid='propertyListPhoto' hdnsrc='/birdseyeimage/propertyimage.ashx?propid=52567451&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894422603&amp;latitude=33.966333&amp;longitude=-117.683994'  id="ThumbProperty_52567451" src="/birdseyeimage/propertyimage.ashx?propid=52567451&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894422603&amp;latitude=33.966333&amp;longitude=-117.683994" alt="5555 Grenview Way, Chino Hills, CA 91709" width="125" height="94" onerror="ListPropertyImageOnError('#ThumbProperty_52567451');"/>
        </a>
	</div>
    <div class="content" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
        <a href="/propertydetails/ca/chino-hills/91709/grenview-way/52567451" class="propertyLink" title="5555 Grenview Way, Chino Hills, CA 91709"><span itemprop='streetAddress'>5555 Grenview Way</span>, <span itemprop='addressLocality'>Chino Hills</span>, <span itemprop='addressRegion'>CA</span> <span itemprop='postalCode'>91709</span> </a>
                <ul class="info clearfix">
			<li class="date">Auction Date 1/9/2014</li>
			<li>4 Bed</li>
			<li>2.5 Bath</li>
			<li>2,098 Sq/Ft</li>
			<li class="last">4,000 SQ/FT LOT</li>
		</ul>
        <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
            <p class="price">Est. Opening Bid <a href="/propertydetails/ca/chino-hills/91709/grenview-way/52567451"><span class="spanPrice" itemprop="price"><strong>$539,266</strong></span></a> <span>($257 SQ/FT)</span>  - Equity/LTV  <a href="/propertydetails/ca/chino-hills/91709/grenview-way/52567451"><strong>-$507,249/202%</strong></a></p>
        </div>
        <div class="property-user-toolbox"> 
         
<div class="rating4">
        
        <div id="myratingId" class="parent_rating">
                MY RATING
            </div>
        
    <div  style="display: inline-block;" parcelid="40510995"  propertyid="52567451" propertyWatchSettingId="0"  currentrating="0" userid="115909063"  class="rate_widget">
            <div id="1" class="star_1 ratings_stars" text="Bad">
            </div>
            <div id="2" class="star_2 ratings_stars" text="Not Bad">
            </div>
            <div id="3" class="star_3 ratings_stars" text="Average">
            </div>
            <div id="4" class="star_4 ratings_stars" text="Good">
            </div>
            <div id="5" class="star_5 ratings_stars" text="Very Good">
            </div>
        
    </div>
</div>
 
      
									
            <ul id="shareMenu52567451" class="action">
                <li class="clickSave"  parcelid="40510995"  propertyid="52567451" propertyWatchSettingId="0">
    <a><span class="ico"></span><span class="savespan">Save</span></a>
</li>
            
 

                    <li class="collect"><a href="javascript:void;" onclick="showPopUpCollectionDialog(this,'40510995','52567451');PropertyTooltip.CollectMenuClick();"><span class="ico"></span>Collect</a></li>
                
                <li class="share"><a href="javascript:void;"  id="shareLink52567451" onclick="PropertyTooltip.ShareInit([{&#39;PropertyID&#39;:&#39;52567451&#39;,&#39;PropertyParcelID&#39;:&#39;0&#39;,&#39;PropertyStatus&#39;:&#39;Auction&#39;,&#39;Address&#39;:&#39;5555 Grenview Way, Chino Hills, CA 91709&#39;,&#39;PriceType&#39;:&#39;Est. Opening Bid&#39;,&#39;Price&#39;:&#39;539266.0000&#39;,&#39;ImageUrl&#39;:&#39;http://www.realtytrac.com/birdseyeimage/propertyimage.ashx?propid=52567451&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894422603&amp;latitude=33.966333&amp;longitude=-117.683994&#39;,&#39;PropertyDetailUrl&#39;:&#39;http://www.realtytrac.com/propertydetails/ca/chino-hills/91709/grenview-way/52567451&#39;,&#39;MapSearchUrl&#39;:&#39;http://www.realtytrac.com/mapsearch/ca/san-bernardino-county/chino-hills/91709/?address=5555 grenview way, chino hills, ca 91709&amp;lat=33.966333&amp;lon=-117.683994&#39;}], &#39;4&#39;, &#39;2.500000&#39;, &#39;&#39;); PropertyTooltip.ShareMenuShow(this, &#39;52567451&#39;);"><span class="ico"></span>Share</a></li>
            
				<li class="compare">
					<div class="loadingLabel" data-id="divLoadingLabel">Loading ...
                    </div>

					<div style="display: none; margin-top:-5px;" class="compareItemBtn" data-id="divCompareSection">
						<input id="chkCompareProperty_52567451" type="checkbox" name="chkComparePropertyID" value="52567451"/>
                        <a id="CompareProperty_52567451" onclick="if(this.innerHTML == 'Compare') $('#chkCompareProperty_52567451').click();">Compare</a>
					</div>
				</li>
            </ul>
          </div>
    </div>
</div>





<div class="house  alt   clearfix">
        <div class="checkbox">
            <input type="checkbox" name="chkPropertyID" value="52578812" />
        </div>
    <div class="thumb empty-pic">
        <a href="/propertydetails/ca/ontario/91762/n-elderberry-ave/52578812">
            <img ncid='propertyListPhoto' hdnsrc='/birdseyeimage/propertyimage.ashx?propid=52578812&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.069419&amp;longitude=-117.674027'  id="ThumbProperty_52578812" src="/birdseyeimage/propertyimage.ashx?propid=52578812&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.069419&amp;longitude=-117.674027" alt="522 N Elderberry Ave, Ontario, CA 91762" width="125" height="94" onerror="ListPropertyImageOnError('#ThumbProperty_52578812');"/>
        </a>
	</div>
    <div class="content" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
        <a href="/propertydetails/ca/ontario/91762/n-elderberry-ave/52578812" class="propertyLink" title="522 N Elderberry Ave, Ontario, CA 91762"><span itemprop='streetAddress'>522 N Elderberry Ave</span>, <span itemprop='addressLocality'>Ontario</span>, <span itemprop='addressRegion'>CA</span> <span itemprop='postalCode'>91762</span> </a>
                <ul class="info clearfix">
			<li class="date">Auction Date 1/9/2014</li>
			<li>4 Bed</li>
			<li>2 Bath</li>
			<li>1,184 Sq/Ft</li>
			<li class="last">6,758 SQ/FT LOT</li>
		</ul>
        <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
            <p class="price">Est. Opening Bid <a href="/propertydetails/ca/ontario/91762/n-elderberry-ave/52578812"><span class="spanPrice" itemprop="price"><strong>$307,288</strong></span></a> <span>($260 SQ/FT)</span>  - Equity/LTV  <a href="/propertydetails/ca/ontario/91762/n-elderberry-ave/52578812"><strong>$42,065/85%</strong></a></p>
        </div>
        <div class="property-user-toolbox"> 
         
<div class="rating4">
        
        <div id="myratingId" class="parent_rating">
                MY RATING
            </div>
        
    <div  style="display: inline-block;" parcelid="20174408"  propertyid="52578812" propertyWatchSettingId="0"  currentrating="0" userid="115909063"  class="rate_widget">
            <div id="1" class="star_1 ratings_stars" text="Bad">
            </div>
            <div id="2" class="star_2 ratings_stars" text="Not Bad">
            </div>
            <div id="3" class="star_3 ratings_stars" text="Average">
            </div>
            <div id="4" class="star_4 ratings_stars" text="Good">
            </div>
            <div id="5" class="star_5 ratings_stars" text="Very Good">
            </div>
        
    </div>
</div>
 
      
									
            <ul id="shareMenu52578812" class="action">
                <li class="clickSave"  parcelid="20174408"  propertyid="52578812" propertyWatchSettingId="0">
    <a><span class="ico"></span><span class="savespan">Save</span></a>
</li>
            
 

                    <li class="collect"><a href="javascript:void;" onclick="showPopUpCollectionDialog(this,'20174408','52578812');PropertyTooltip.CollectMenuClick();"><span class="ico"></span>Collect</a></li>
                
                <li class="share"><a href="javascript:void;"  id="shareLink52578812" onclick="PropertyTooltip.ShareInit([{&#39;PropertyID&#39;:&#39;52578812&#39;,&#39;PropertyParcelID&#39;:&#39;0&#39;,&#39;PropertyStatus&#39;:&#39;Auction&#39;,&#39;Address&#39;:&#39;522 N Elderberry Ave, Ontario, CA 91762&#39;,&#39;PriceType&#39;:&#39;Est. Opening Bid&#39;,&#39;Price&#39;:&#39;307288.0000&#39;,&#39;ImageUrl&#39;:&#39;http://www.realtytrac.com/birdseyeimage/propertyimage.ashx?propid=52578812&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.069419&amp;longitude=-117.674027&#39;,&#39;PropertyDetailUrl&#39;:&#39;http://www.realtytrac.com/propertydetails/ca/ontario/91762/n-elderberry-ave/52578812&#39;,&#39;MapSearchUrl&#39;:&#39;http://www.realtytrac.com/mapsearch/ca/san-bernardino-county/ontario/91762/?address=522 n elderberry ave, ontario, ca 91762&amp;lat=34.069419&amp;lon=-117.674027&#39;}], &#39;4&#39;, &#39;2.000000&#39;, &#39;&#39;); PropertyTooltip.ShareMenuShow(this, &#39;52578812&#39;);"><span class="ico"></span>Share</a></li>
            
				<li class="compare">
					<div class="loadingLabel" data-id="divLoadingLabel">Loading ...
                    </div>

					<div style="display: none; margin-top:-5px;" class="compareItemBtn" data-id="divCompareSection">
						<input id="chkCompareProperty_52578812" type="checkbox" name="chkComparePropertyID" value="52578812"/>
                        <a id="CompareProperty_52578812" onclick="if(this.innerHTML == 'Compare') $('#chkCompareProperty_52578812').click();">Compare</a>
					</div>
				</li>
            </ul>
          </div>
    </div>
</div>





<div class="house  alt   clearfix">
        <div class="checkbox">
            <input type="checkbox" name="chkPropertyID" value="52675384" />
        </div>
    <div class="thumb empty-pic">
        <a href="/propertydetails/ca/hesperia/92345/deodar-st/52675384">
            <img ncid='propertyListPhoto' hdnsrc='/birdseyeimage/propertyimage.ashx?propid=52675384&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.457539&amp;longitude=-117.266227'  id="ThumbProperty_52675384" src="/birdseyeimage/propertyimage.ashx?propid=52675384&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.457539&amp;longitude=-117.266227" alt="18204 Deodar St, Hesperia, CA 92345" width="125" height="94" onerror="ListPropertyImageOnError('#ThumbProperty_52675384');"/>
        </a>
	</div>
    <div class="content" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
        <a href="/propertydetails/ca/hesperia/92345/deodar-st/52675384" class="propertyLink" title="18204 Deodar St, Hesperia, CA 92345"><span itemprop='streetAddress'>18204 Deodar St</span>, <span itemprop='addressLocality'>Hesperia</span>, <span itemprop='addressRegion'>CA</span> <span itemprop='postalCode'>92345</span> </a>
                <ul class="info clearfix">
			<li class="date">Auction Date 1/9/2014</li>
			<li>3 Bed</li>
			<li>2 Bath</li>
			<li>1,559 Sq/Ft</li>
			<li class="last">20,085 SQ/FT LOT</li>
		</ul>
        <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
            <p class="price">Est. Opening Bid <a href="/propertydetails/ca/hesperia/92345/deodar-st/52675384"><span class="spanPrice" itemprop="price"><strong>$88,252</strong></span></a> <span>($57 SQ/FT)</span>  - Equity/LTV  <a href="/propertydetails/ca/hesperia/92345/deodar-st/52675384"><strong>$57,313/61%</strong></a></p>
        </div>
        <div class="property-user-toolbox"> 
         
<div class="rating4">
        
        <div id="myratingId" class="parent_rating">
                MY RATING
            </div>
        
    <div  style="display: inline-block;" parcelid="4967709"  propertyid="52675384" propertyWatchSettingId="0"  currentrating="0" userid="115909063"  class="rate_widget">
            <div id="1" class="star_1 ratings_stars" text="Bad">
            </div>
            <div id="2" class="star_2 ratings_stars" text="Not Bad">
            </div>
            <div id="3" class="star_3 ratings_stars" text="Average">
            </div>
            <div id="4" class="star_4 ratings_stars" text="Good">
            </div>
            <div id="5" class="star_5 ratings_stars" text="Very Good">
            </div>
        
    </div>
</div>
 
      
									
            <ul id="shareMenu52675384" class="action">
                <li class="clickSave"  parcelid="4967709"  propertyid="52675384" propertyWatchSettingId="0">
    <a><span class="ico"></span><span class="savespan">Save</span></a>
</li>
            
 

                    <li class="collect"><a href="javascript:void;" onclick="showPopUpCollectionDialog(this,'4967709','52675384');PropertyTooltip.CollectMenuClick();"><span class="ico"></span>Collect</a></li>
                
                <li class="share"><a href="javascript:void;"  id="shareLink52675384" onclick="PropertyTooltip.ShareInit([{&#39;PropertyID&#39;:&#39;52675384&#39;,&#39;PropertyParcelID&#39;:&#39;0&#39;,&#39;PropertyStatus&#39;:&#39;Auction&#39;,&#39;Address&#39;:&#39;18204 Deodar St, Hesperia, CA 92345&#39;,&#39;PriceType&#39;:&#39;Est. Opening Bid&#39;,&#39;Price&#39;:&#39;88252.0000&#39;,&#39;ImageUrl&#39;:&#39;http://www.realtytrac.com/birdseyeimage/propertyimage.ashx?propid=52675384&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.457539&amp;longitude=-117.266227&#39;,&#39;PropertyDetailUrl&#39;:&#39;http://www.realtytrac.com/propertydetails/ca/hesperia/92345/deodar-st/52675384&#39;,&#39;MapSearchUrl&#39;:&#39;http://www.realtytrac.com/mapsearch/ca/san-bernardino-county/hesperia/92345/?address=18204 deodar st, hesperia, ca 92345&amp;lat=34.457539&amp;lon=-117.266227&#39;}], &#39;3&#39;, &#39;2.000000&#39;, &#39;&#39;); PropertyTooltip.ShareMenuShow(this, &#39;52675384&#39;);"><span class="ico"></span>Share</a></li>
            
				<li class="compare">
					<div class="loadingLabel" data-id="divLoadingLabel">Loading ...
                    </div>

					<div style="display: none; margin-top:-5px;" class="compareItemBtn" data-id="divCompareSection">
						<input id="chkCompareProperty_52675384" type="checkbox" name="chkComparePropertyID" value="52675384"/>
                        <a id="CompareProperty_52675384" onclick="if(this.innerHTML == 'Compare') $('#chkCompareProperty_52675384').click();">Compare</a>
					</div>
				</li>
            </ul>
          </div>
    </div>
</div>





<div class="house  alt   clearfix">
        <div class="checkbox">
            <input type="checkbox" name="chkPropertyID" value="52711291" />
        </div>
    <div class="thumb empty-pic">
        <a href="/propertydetails/ca/rancho-cucamonga/91739/santa-maria-dr/52711291">
            <img ncid='propertyListPhoto' hdnsrc='/birdseyeimage/propertyimage.ashx?propid=52711291&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.148848&amp;longitude=-117.503031'  id="ThumbProperty_52711291" src="/birdseyeimage/propertyimage.ashx?propid=52711291&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.148848&amp;longitude=-117.503031" alt="13729 Santa Maria Dr, Rancho Cucamonga, CA 91739" width="125" height="94" onerror="ListPropertyImageOnError('#ThumbProperty_52711291');"/>
        </a>
	</div>
    <div class="content" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
        <a href="/propertydetails/ca/rancho-cucamonga/91739/santa-maria-dr/52711291" class="propertyLink" title="13729 Santa Maria Dr, Rancho Cucamonga, CA 91739"><span itemprop='streetAddress'>13729 Santa Maria Dr</span>, <span itemprop='addressLocality'>Rancho Cucamonga</span>, <span itemprop='addressRegion'>CA</span> <span itemprop='postalCode'>91739</span> </a>
                <ul class="info clearfix">
			<li class="date">Auction Date 1/9/2014</li>
			<li>4 Bed</li>
			<li>2.5 Bath</li>
			<li>2,378 Sq/Ft</li>
			<li class="last">6,888 SQ/FT LOT</li>
		</ul>
        <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
            <p class="price">Est. Opening Bid <a href="/propertydetails/ca/rancho-cucamonga/91739/santa-maria-dr/52711291"><span class="spanPrice" itemprop="price"><strong>$405,143</strong></span></a> <span>($170 SQ/FT)</span>  - Equity/LTV  <a href="/propertydetails/ca/rancho-cucamonga/91739/santa-maria-dr/52711291"><strong>$52,341/88%</strong></a></p>
        </div>
        <div class="property-user-toolbox"> 
         
<div class="rating4">
        
        <div id="myratingId" class="parent_rating">
                MY RATING
            </div>
        
    <div  style="display: inline-block;" parcelid="16015392"  propertyid="52711291" propertyWatchSettingId="0"  currentrating="0" userid="115909063"  class="rate_widget">
            <div id="1" class="star_1 ratings_stars" text="Bad">
            </div>
            <div id="2" class="star_2 ratings_stars" text="Not Bad">
            </div>
            <div id="3" class="star_3 ratings_stars" text="Average">
            </div>
            <div id="4" class="star_4 ratings_stars" text="Good">
            </div>
            <div id="5" class="star_5 ratings_stars" text="Very Good">
            </div>
        
    </div>
</div>
 
      
									
            <ul id="shareMenu52711291" class="action">
                <li class="clickSave"  parcelid="16015392"  propertyid="52711291" propertyWatchSettingId="0">
    <a><span class="ico"></span><span class="savespan">Save</span></a>
</li>
            
 

                    <li class="collect"><a href="javascript:void;" onclick="showPopUpCollectionDialog(this,'16015392','52711291');PropertyTooltip.CollectMenuClick();"><span class="ico"></span>Collect</a></li>
                
                <li class="share"><a href="javascript:void;"  id="shareLink52711291" onclick="PropertyTooltip.ShareInit([{&#39;PropertyID&#39;:&#39;52711291&#39;,&#39;PropertyParcelID&#39;:&#39;0&#39;,&#39;PropertyStatus&#39;:&#39;Auction&#39;,&#39;Address&#39;:&#39;13729 Santa Maria Dr, Rancho Cucamonga, CA 91739&#39;,&#39;PriceType&#39;:&#39;Est. Opening Bid&#39;,&#39;Price&#39;:&#39;405143.0000&#39;,&#39;ImageUrl&#39;:&#39;http://www.realtytrac.com/birdseyeimage/propertyimage.ashx?propid=52711291&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.148848&amp;longitude=-117.503031&#39;,&#39;PropertyDetailUrl&#39;:&#39;http://www.realtytrac.com/propertydetails/ca/rancho-cucamonga/91739/santa-maria-dr/52711291&#39;,&#39;MapSearchUrl&#39;:&#39;http://www.realtytrac.com/mapsearch/ca/san-bernardino-county/rancho-cucamonga/91739/?address=13729 santa maria dr, rancho cucamonga, ca 91739&amp;lat=34.148848&amp;lon=-117.503031&#39;}], &#39;4&#39;, &#39;2.500000&#39;, &#39;&#39;); PropertyTooltip.ShareMenuShow(this, &#39;52711291&#39;);"><span class="ico"></span>Share</a></li>
            
				<li class="compare">
					<div class="loadingLabel" data-id="divLoadingLabel">Loading ...
                    </div>

					<div style="display: none; margin-top:-5px;" class="compareItemBtn" data-id="divCompareSection">
						<input id="chkCompareProperty_52711291" type="checkbox" name="chkComparePropertyID" value="52711291"/>
                        <a id="CompareProperty_52711291" onclick="if(this.innerHTML == 'Compare') $('#chkCompareProperty_52711291').click();">Compare</a>
					</div>
				</li>
            </ul>
          </div>
    </div>
</div>





<div class="house  alt   clearfix">
        <div class="checkbox">
            <input type="checkbox" name="chkPropertyID" value="52711313" />
        </div>
    <div class="thumb empty-pic">
        <a href="/propertydetails/ca/san-bernardino/92401/n-d-st/52711313">
            <img ncid='propertyListPhoto' hdnsrc='/birdseyeimage/propertyimage.ashx?propid=52711313&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.110883&amp;longitude=-117.292509'  id="ThumbProperty_52711313" src="/birdseyeimage/propertyimage.ashx?propid=52711313&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.110883&amp;longitude=-117.292509" alt="634 N D St, San Bernardino, CA 92401" width="125" height="94" onerror="ListPropertyImageOnError('#ThumbProperty_52711313');"/>
        </a>
	</div>
    <div class="content" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
        <a href="/propertydetails/ca/san-bernardino/92401/n-d-st/52711313" class="propertyLink" title="634 N D St, San Bernardino, CA 92401"><span itemprop='streetAddress'>634 N D St</span>, <span itemprop='addressLocality'>San Bernardino</span>, <span itemprop='addressRegion'>CA</span> <span itemprop='postalCode'>92401</span> </a>
                <ul class="info clearfix">
			<li class="date">Auction Date 1/9/2014</li>
			<li>NA Bed</li>
			<li>NA Bath</li>
			<li>6,913 Sq/Ft</li>
			<li class="last">20,750 SQ/FT LOT</li>
		</ul>
        <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
            <p class="price">Est. Opening Bid <a href="/propertydetails/ca/san-bernardino/92401/n-d-st/52711313"><span class="spanPrice" itemprop="price"><strong>$352,754</strong></span></a> <span>($51 SQ/FT)</span>  - Equity/LTV  <a href="/propertydetails/ca/san-bernardino/92401/n-d-st/52711313"><strong>N/A</strong></a></p>
        </div>
        <div class="property-user-toolbox"> 
         
<div class="rating4">
        
        <div id="myratingId" class="parent_rating">
                MY RATING
            </div>
        
    <div  style="display: inline-block;" parcelid="43976795"  propertyid="52711313" propertyWatchSettingId="0"  currentrating="0" userid="115909063"  class="rate_widget">
            <div id="1" class="star_1 ratings_stars" text="Bad">
            </div>
            <div id="2" class="star_2 ratings_stars" text="Not Bad">
            </div>
            <div id="3" class="star_3 ratings_stars" text="Average">
            </div>
            <div id="4" class="star_4 ratings_stars" text="Good">
            </div>
            <div id="5" class="star_5 ratings_stars" text="Very Good">
            </div>
        
    </div>
</div>
 
      
									
            <ul id="shareMenu52711313" class="action">
                <li class="clickSave"  parcelid="43976795"  propertyid="52711313" propertyWatchSettingId="0">
    <a><span class="ico"></span><span class="savespan">Save</span></a>
</li>
            
 

                    <li class="collect"><a href="javascript:void;" onclick="showPopUpCollectionDialog(this,'43976795','52711313');PropertyTooltip.CollectMenuClick();"><span class="ico"></span>Collect</a></li>
                
                <li class="share"><a href="javascript:void;"  id="shareLink52711313" onclick="PropertyTooltip.ShareInit([{&#39;PropertyID&#39;:&#39;52711313&#39;,&#39;PropertyParcelID&#39;:&#39;0&#39;,&#39;PropertyStatus&#39;:&#39;Auction&#39;,&#39;Address&#39;:&#39;634 N D St, San Bernardino, CA 92401&#39;,&#39;PriceType&#39;:&#39;Est. Opening Bid&#39;,&#39;Price&#39;:&#39;352754.0000&#39;,&#39;ImageUrl&#39;:&#39;http://www.realtytrac.com/birdseyeimage/propertyimage.ashx?propid=52711313&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.110883&amp;longitude=-117.292509&#39;,&#39;PropertyDetailUrl&#39;:&#39;http://www.realtytrac.com/propertydetails/ca/san-bernardino/92401/n-d-st/52711313&#39;,&#39;MapSearchUrl&#39;:&#39;http://www.realtytrac.com/mapsearch/ca/san-bernardino-county/san-bernardino/92401/?address=634 n d st, san bernardino, ca 92401&amp;lat=34.110883&amp;lon=-117.292509&#39;}], &#39;0&#39;, &#39;0.000000&#39;, &#39;&#39;); PropertyTooltip.ShareMenuShow(this, &#39;52711313&#39;);"><span class="ico"></span>Share</a></li>
            
				<li class="compare">
					<div class="loadingLabel" data-id="divLoadingLabel">Loading ...
                    </div>

					<div style="display: none; margin-top:-5px;" class="compareItemBtn" data-id="divCompareSection">
						<input id="chkCompareProperty_52711313" type="checkbox" name="chkComparePropertyID" value="52711313"/>
                        <a id="CompareProperty_52711313" onclick="if(this.innerHTML == 'Compare') $('#chkCompareProperty_52711313').click();">Compare</a>
					</div>
				</li>
            </ul>
          </div>
    </div>
</div>





<div class="house  alt   clearfix">
        <div class="checkbox">
            <input type="checkbox" name="chkPropertyID" value="52711314" />
        </div>
    <div class="thumb empty-pic">
        <a href="/propertydetails/ca/victorville/92392/luna-rd/52711314">
            <img ncid='propertyListPhoto' hdnsrc='/birdseyeimage/propertyimage.ashx?propid=52711314&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.492393&amp;longitude=-117.388725'  id="ThumbProperty_52711314" src="/birdseyeimage/propertyimage.ashx?propid=52711314&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.492393&amp;longitude=-117.388725" alt="12584 Luna Rd, Victorville, CA 92392" width="125" height="94" onerror="ListPropertyImageOnError('#ThumbProperty_52711314');"/>
        </a>
	</div>
    <div class="content" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
        <a href="/propertydetails/ca/victorville/92392/luna-rd/52711314" class="propertyLink" title="12584 Luna Rd, Victorville, CA 92392"><span itemprop='streetAddress'>12584 Luna Rd</span>, <span itemprop='addressLocality'>Victorville</span>, <span itemprop='addressRegion'>CA</span> <span itemprop='postalCode'>92392</span> </a>
                <ul class="info clearfix">
			<li class="date">Auction Date 1/9/2014</li>
			<li>7 Bed</li>
			<li>4 Bath</li>
			<li>3,732 Sq/Ft</li>
			<li class="last">6,014 SQ/FT LOT</li>
		</ul>
        <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
            <p class="price">Est. Opening Bid <a href="/propertydetails/ca/victorville/92392/luna-rd/52711314"><span class="spanPrice" itemprop="price"><strong>$343,597</strong></span></a> <span>($92 SQ/FT)</span>  - Equity/LTV  <a href="/propertydetails/ca/victorville/92392/luna-rd/52711314"><strong>-$169,500/167%</strong></a></p>
        </div>
        <div class="property-user-toolbox"> 
         
<div class="rating4">
        
        <div id="myratingId" class="parent_rating">
                MY RATING
            </div>
        
    <div  style="display: inline-block;" parcelid="11426406"  propertyid="52711314" propertyWatchSettingId="0"  currentrating="0" userid="115909063"  class="rate_widget">
            <div id="1" class="star_1 ratings_stars" text="Bad">
            </div>
            <div id="2" class="star_2 ratings_stars" text="Not Bad">
            </div>
            <div id="3" class="star_3 ratings_stars" text="Average">
            </div>
            <div id="4" class="star_4 ratings_stars" text="Good">
            </div>
            <div id="5" class="star_5 ratings_stars" text="Very Good">
            </div>
        
    </div>
</div>
 
      
									
            <ul id="shareMenu52711314" class="action">
                <li class="clickSave"  parcelid="11426406"  propertyid="52711314" propertyWatchSettingId="0">
    <a><span class="ico"></span><span class="savespan">Save</span></a>
</li>
            
 

                    <li class="collect"><a href="javascript:void;" onclick="showPopUpCollectionDialog(this,'11426406','52711314');PropertyTooltip.CollectMenuClick();"><span class="ico"></span>Collect</a></li>
                
                <li class="share"><a href="javascript:void;"  id="shareLink52711314" onclick="PropertyTooltip.ShareInit([{&#39;PropertyID&#39;:&#39;52711314&#39;,&#39;PropertyParcelID&#39;:&#39;0&#39;,&#39;PropertyStatus&#39;:&#39;Auction&#39;,&#39;Address&#39;:&#39;12584 Luna Rd, Victorville, CA 92392&#39;,&#39;PriceType&#39;:&#39;Est. Opening Bid&#39;,&#39;Price&#39;:&#39;343597.0000&#39;,&#39;ImageUrl&#39;:&#39;http://www.realtytrac.com/birdseyeimage/propertyimage.ashx?propid=52711314&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.492393&amp;longitude=-117.388725&#39;,&#39;PropertyDetailUrl&#39;:&#39;http://www.realtytrac.com/propertydetails/ca/victorville/92392/luna-rd/52711314&#39;,&#39;MapSearchUrl&#39;:&#39;http://www.realtytrac.com/mapsearch/ca/san-bernardino-county/victorville/92392/?address=12584 luna rd, victorville, ca 92392&amp;lat=34.492393&amp;lon=-117.388725&#39;}], &#39;7&#39;, &#39;4.000000&#39;, &#39;&#39;); PropertyTooltip.ShareMenuShow(this, &#39;52711314&#39;);"><span class="ico"></span>Share</a></li>
            
				<li class="compare">
					<div class="loadingLabel" data-id="divLoadingLabel">Loading ...
                    </div>

					<div style="display: none; margin-top:-5px;" class="compareItemBtn" data-id="divCompareSection">
						<input id="chkCompareProperty_52711314" type="checkbox" name="chkComparePropertyID" value="52711314"/>
                        <a id="CompareProperty_52711314" onclick="if(this.innerHTML == 'Compare') $('#chkCompareProperty_52711314').click();">Compare</a>
					</div>
				</li>
            </ul>
          </div>
    </div>
</div>





<div class="house  alt   clearfix">
        <div class="checkbox">
            <input type="checkbox" name="chkPropertyID" value="52743866" />
        </div>
    <div class="thumb empty-pic">
        <a href="/propertydetails/ca/apple-valley/92307/quinnault-rd/52743866">
            <img ncid='propertyListPhoto' hdnsrc='/birdseyeimage/propertyimage.ashx?propid=52743866&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.517513&amp;longitude=-117.18206'  id="ThumbProperty_52743866" src="/birdseyeimage/propertyimage.ashx?propid=52743866&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.517513&amp;longitude=-117.18206" alt="14625 Quinnault Rd, Apple Valley, CA 92307" width="125" height="94" onerror="ListPropertyImageOnError('#ThumbProperty_52743866');"/>
        </a>
	</div>
    <div class="content" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
        <a href="/propertydetails/ca/apple-valley/92307/quinnault-rd/52743866" class="propertyLink" title="14625 Quinnault Rd, Apple Valley, CA 92307"><span itemprop='streetAddress'>14625 Quinnault Rd</span>, <span itemprop='addressLocality'>Apple Valley</span>, <span itemprop='addressRegion'>CA</span> <span itemprop='postalCode'>92307</span> </a>
                <ul class="info clearfix">
			<li class="date">Auction Date 1/9/2014</li>
			<li>3 Bed</li>
			<li>2 Bath</li>
			<li>1,248 Sq/Ft</li>
			<li class="last">20,750 SQ/FT LOT</li>
		</ul>
        <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
            <p class="price">Est. Opening Bid <a href="/propertydetails/ca/apple-valley/92307/quinnault-rd/52743866"><span class="spanPrice" itemprop="price"><strong>$151,340</strong></span></a> <span>($121 SQ/FT)</span>  - Equity/LTV  <a href="/propertydetails/ca/apple-valley/92307/quinnault-rd/52743866"><strong>-$230,098/300%</strong></a></p>
        </div>
        <div class="property-user-toolbox"> 
         
<div class="rating4">
        
        <div id="myratingId" class="parent_rating">
                MY RATING
            </div>
        
    <div  style="display: inline-block;" parcelid="157023859"  propertyid="52743866" propertyWatchSettingId="0"  currentrating="0" userid="115909063"  class="rate_widget">
            <div id="1" class="star_1 ratings_stars" text="Bad">
            </div>
            <div id="2" class="star_2 ratings_stars" text="Not Bad">
            </div>
            <div id="3" class="star_3 ratings_stars" text="Average">
            </div>
            <div id="4" class="star_4 ratings_stars" text="Good">
            </div>
            <div id="5" class="star_5 ratings_stars" text="Very Good">
            </div>
        
    </div>
</div>
 
      
									
            <ul id="shareMenu52743866" class="action">
                <li class="clickSave"  parcelid="157023859"  propertyid="52743866" propertyWatchSettingId="0">
    <a><span class="ico"></span><span class="savespan">Save</span></a>
</li>
            
 

                    <li class="collect"><a href="javascript:void;" onclick="showPopUpCollectionDialog(this,'157023859','52743866');PropertyTooltip.CollectMenuClick();"><span class="ico"></span>Collect</a></li>
                
                <li class="share"><a href="javascript:void;"  id="shareLink52743866" onclick="PropertyTooltip.ShareInit([{&#39;PropertyID&#39;:&#39;52743866&#39;,&#39;PropertyParcelID&#39;:&#39;0&#39;,&#39;PropertyStatus&#39;:&#39;Auction&#39;,&#39;Address&#39;:&#39;14625 Quinnault Rd, Apple Valley, CA 92307&#39;,&#39;PriceType&#39;:&#39;Est. Opening Bid&#39;,&#39;Price&#39;:&#39;151340.0000&#39;,&#39;ImageUrl&#39;:&#39;http://www.realtytrac.com/birdseyeimage/propertyimage.ashx?propid=52743866&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.517513&amp;longitude=-117.18206&#39;,&#39;PropertyDetailUrl&#39;:&#39;http://www.realtytrac.com/propertydetails/ca/apple-valley/92307/quinnault-rd/52743866&#39;,&#39;MapSearchUrl&#39;:&#39;http://www.realtytrac.com/mapsearch/ca/san-bernardino-county/apple-valley/92307/?address=14625 quinnault rd, apple valley, ca 92307&amp;lat=34.517513&amp;lon=-117.18206&#39;}], &#39;3&#39;, &#39;2.000000&#39;, &#39;&#39;); PropertyTooltip.ShareMenuShow(this, &#39;52743866&#39;);"><span class="ico"></span>Share</a></li>
            
				<li class="compare">
					<div class="loadingLabel" data-id="divLoadingLabel">Loading ...
                    </div>

					<div style="display: none; margin-top:-5px;" class="compareItemBtn" data-id="divCompareSection">
						<input id="chkCompareProperty_52743866" type="checkbox" name="chkComparePropertyID" value="52743866"/>
                        <a id="CompareProperty_52743866" onclick="if(this.innerHTML == 'Compare') $('#chkCompareProperty_52743866').click();">Compare</a>
					</div>
				</li>
            </ul>
          </div>
    </div>
</div>





<div class="house  alt   clearfix">
        <div class="checkbox">
            <input type="checkbox" name="chkPropertyID" value="52743867" />
        </div>
    <div class="thumb empty-pic">
        <a href="/propertydetails/ca/grand-terrace/92313/orangewood-ct/52743867">
            <img ncid='propertyListPhoto' hdnsrc='/birdseyeimage/propertyimage.ashx?propid=52743867&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.031436&amp;longitude=-117.303461'  id="ThumbProperty_52743867" src="/birdseyeimage/propertyimage.ashx?propid=52743867&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.031436&amp;longitude=-117.303461" alt="22980 Orangewood Ct, Grand Terrace, CA 92313" width="125" height="94" onerror="ListPropertyImageOnError('#ThumbProperty_52743867');"/>
        </a>
	</div>
    <div class="content" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
        <a href="/propertydetails/ca/grand-terrace/92313/orangewood-ct/52743867" class="propertyLink" title="22980 Orangewood Ct, Grand Terrace, CA 92313"><span itemprop='streetAddress'>22980 Orangewood Ct</span>, <span itemprop='addressLocality'>Grand Terrace</span>, <span itemprop='addressRegion'>CA</span> <span itemprop='postalCode'>92313</span> </a>
                <ul class="info clearfix">
			<li class="date">Auction Date 1/9/2014</li>
			<li>4 Bed</li>
			<li>2 Bath</li>
			<li>1,750 Sq/Ft</li>
			<li class="last">12,672 SQ/FT LOT</li>
		</ul>
        <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
            <p class="price">Est. Opening Bid <a href="/propertydetails/ca/grand-terrace/92313/orangewood-ct/52743867"><span class="spanPrice" itemprop="price"><strong>$399,425</strong></span></a> <span>($228 SQ/FT)</span>  - Equity/LTV  <a href="/propertydetails/ca/grand-terrace/92313/orangewood-ct/52743867"><strong>$222,570/26%</strong></a></p>
        </div>
        <div class="property-user-toolbox"> 
         
<div class="rating4">
        
        <div id="myratingId" class="parent_rating">
                MY RATING
            </div>
        
    <div  style="display: inline-block;" parcelid="11424459"  propertyid="52743867" propertyWatchSettingId="0"  currentrating="0" userid="115909063"  class="rate_widget">
            <div id="1" class="star_1 ratings_stars" text="Bad">
            </div>
            <div id="2" class="star_2 ratings_stars" text="Not Bad">
            </div>
            <div id="3" class="star_3 ratings_stars" text="Average">
            </div>
            <div id="4" class="star_4 ratings_stars" text="Good">
            </div>
            <div id="5" class="star_5 ratings_stars" text="Very Good">
            </div>
        
    </div>
</div>
 
      
									
            <ul id="shareMenu52743867" class="action">
                <li class="clickSave"  parcelid="11424459"  propertyid="52743867" propertyWatchSettingId="0">
    <a><span class="ico"></span><span class="savespan">Save</span></a>
</li>
            
 

                    <li class="collect"><a href="javascript:void;" onclick="showPopUpCollectionDialog(this,'11424459','52743867');PropertyTooltip.CollectMenuClick();"><span class="ico"></span>Collect</a></li>
                
                <li class="share"><a href="javascript:void;"  id="shareLink52743867" onclick="PropertyTooltip.ShareInit([{&#39;PropertyID&#39;:&#39;52743867&#39;,&#39;PropertyParcelID&#39;:&#39;0&#39;,&#39;PropertyStatus&#39;:&#39;Auction&#39;,&#39;Address&#39;:&#39;22980 Orangewood Ct, Grand Terrace, CA 92313&#39;,&#39;PriceType&#39;:&#39;Est. Opening Bid&#39;,&#39;Price&#39;:&#39;399425.0000&#39;,&#39;ImageUrl&#39;:&#39;http://www.realtytrac.com/birdseyeimage/propertyimage.ashx?propid=52743867&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.031436&amp;longitude=-117.303461&#39;,&#39;PropertyDetailUrl&#39;:&#39;http://www.realtytrac.com/propertydetails/ca/grand-terrace/92313/orangewood-ct/52743867&#39;,&#39;MapSearchUrl&#39;:&#39;http://www.realtytrac.com/mapsearch/ca/san-bernardino-county/grand-terrace/92313/?address=22980 orangewood ct, grand terrace, ca 92313&amp;lat=34.031436&amp;lon=-117.303461&#39;}], &#39;4&#39;, &#39;2.000000&#39;, &#39;&#39;); PropertyTooltip.ShareMenuShow(this, &#39;52743867&#39;);"><span class="ico"></span>Share</a></li>
            
				<li class="compare">
					<div class="loadingLabel" data-id="divLoadingLabel">Loading ...
                    </div>

					<div style="display: none; margin-top:-5px;" class="compareItemBtn" data-id="divCompareSection">
						<input id="chkCompareProperty_52743867" type="checkbox" name="chkComparePropertyID" value="52743867"/>
                        <a id="CompareProperty_52743867" onclick="if(this.innerHTML == 'Compare') $('#chkCompareProperty_52743867').click();">Compare</a>
					</div>
				</li>
            </ul>
          </div>
    </div>
</div>





<div class="house  alt   clearfix">
        <div class="checkbox">
            <input type="checkbox" name="chkPropertyID" value="52752601" />
        </div>
    <div class="thumb empty-pic">
        <a href="/propertydetails/ca/ontario/91761/e-maitland-st/52752601">
            <img ncid='propertyListPhoto' hdnsrc='/birdseyeimage/propertyimage.ashx?propid=52752601&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.053307&amp;longitude=-117.647934'  id="ThumbProperty_52752601" src="/birdseyeimage/propertyimage.ashx?propid=52752601&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.053307&amp;longitude=-117.647934" alt="310 E Maitland St, Ontario, CA 91761" width="125" height="94" onerror="ListPropertyImageOnError('#ThumbProperty_52752601');"/>
        </a>
	</div>
    <div class="content" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
        <a href="/propertydetails/ca/ontario/91761/e-maitland-st/52752601" class="propertyLink" title="310 E Maitland St, Ontario, CA 91761"><span itemprop='streetAddress'>310 E Maitland St</span>, <span itemprop='addressLocality'>Ontario</span>, <span itemprop='addressRegion'>CA</span> <span itemprop='postalCode'>91761</span> </a>
                <ul class="info clearfix">
			<li class="date">Auction Date 1/9/2014</li>
			<li>2 Bed</li>
			<li>1 Bath</li>
			<li>624 Sq/Ft</li>
			<li class="last">6,200 SQ/FT LOT</li>
		</ul>
        <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
            <p class="price">Est. Opening Bid <a href="/propertydetails/ca/ontario/91761/e-maitland-st/52752601"><span class="spanPrice" itemprop="price"><strong>$257,042</strong></span></a> <span>($412 SQ/FT)</span>  - Equity/LTV  <a href="/propertydetails/ca/ontario/91761/e-maitland-st/52752601"><strong>-$204,454/210%</strong></a></p>
        </div>
        <div class="property-user-toolbox"> 
         
<div class="rating4">
        
        <div id="myratingId" class="parent_rating">
                MY RATING
            </div>
        
    <div  style="display: inline-block;" parcelid="157073504"  propertyid="52752601" propertyWatchSettingId="0"  currentrating="0" userid="115909063"  class="rate_widget">
            <div id="1" class="star_1 ratings_stars" text="Bad">
            </div>
            <div id="2" class="star_2 ratings_stars" text="Not Bad">
            </div>
            <div id="3" class="star_3 ratings_stars" text="Average">
            </div>
            <div id="4" class="star_4 ratings_stars" text="Good">
            </div>
            <div id="5" class="star_5 ratings_stars" text="Very Good">
            </div>
        
    </div>
</div>
 
      
									
            <ul id="shareMenu52752601" class="action">
                <li class="clickSave"  parcelid="157073504"  propertyid="52752601" propertyWatchSettingId="0">
    <a><span class="ico"></span><span class="savespan">Save</span></a>
</li>
            
 

                    <li class="collect"><a href="javascript:void;" onclick="showPopUpCollectionDialog(this,'157073504','52752601');PropertyTooltip.CollectMenuClick();"><span class="ico"></span>Collect</a></li>
                
                <li class="share"><a href="javascript:void;"  id="shareLink52752601" onclick="PropertyTooltip.ShareInit([{&#39;PropertyID&#39;:&#39;52752601&#39;,&#39;PropertyParcelID&#39;:&#39;0&#39;,&#39;PropertyStatus&#39;:&#39;Auction&#39;,&#39;Address&#39;:&#39;310 E Maitland St, Ontario, CA 91761&#39;,&#39;PriceType&#39;:&#39;Est. Opening Bid&#39;,&#39;Price&#39;:&#39;257042.0000&#39;,&#39;ImageUrl&#39;:&#39;http://www.realtytrac.com/birdseyeimage/propertyimage.ashx?propid=52752601&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.053307&amp;longitude=-117.647934&#39;,&#39;PropertyDetailUrl&#39;:&#39;http://www.realtytrac.com/propertydetails/ca/ontario/91761/e-maitland-st/52752601&#39;,&#39;MapSearchUrl&#39;:&#39;http://www.realtytrac.com/mapsearch/ca/san-bernardino-county/ontario/91761/?address=310 e maitland st, ontario, ca 91761&amp;lat=34.053307&amp;lon=-117.647934&#39;}], &#39;2&#39;, &#39;1.000000&#39;, &#39;&#39;); PropertyTooltip.ShareMenuShow(this, &#39;52752601&#39;);"><span class="ico"></span>Share</a></li>
            
				<li class="compare">
					<div class="loadingLabel" data-id="divLoadingLabel">Loading ...
                    </div>

					<div style="display: none; margin-top:-5px;" class="compareItemBtn" data-id="divCompareSection">
						<input id="chkCompareProperty_52752601" type="checkbox" name="chkComparePropertyID" value="52752601"/>
                        <a id="CompareProperty_52752601" onclick="if(this.innerHTML == 'Compare') $('#chkCompareProperty_52752601').click();">Compare</a>
					</div>
				</li>
            </ul>
          </div>
    </div>
</div>





<div class="house  alt   clearfix">
        <div class="checkbox">
            <input type="checkbox" name="chkPropertyID" value="52752602" />
        </div>
    <div class="thumb empty-pic">
        <a href="/propertydetails/ca/rancho-cucamonga/91730/cedarwood-ln/52752602">
            <img ncid='propertyListPhoto' hdnsrc='/birdseyeimage/propertyimage.ashx?propid=52752602&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.10378&amp;longitude=-117.62125'  id="ThumbProperty_52752602" src="/birdseyeimage/propertyimage.ashx?propid=52752602&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.10378&amp;longitude=-117.62125" alt="8425 Cedarwood Ln, Rancho Cucamonga, CA 91730" width="125" height="94" onerror="ListPropertyImageOnError('#ThumbProperty_52752602');"/>
        </a>
	</div>
    <div class="content" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
        <a href="/propertydetails/ca/rancho-cucamonga/91730/cedarwood-ln/52752602" class="propertyLink" title="8425 Cedarwood Ln, Rancho Cucamonga, CA 91730"><span itemprop='streetAddress'>8425 Cedarwood Ln</span>, <span itemprop='addressLocality'>Rancho Cucamonga</span>, <span itemprop='addressRegion'>CA</span> <span itemprop='postalCode'>91730</span> </a>
                <ul class="info clearfix">
			<li class="date">Auction Date 1/9/2014</li>
			<li>2 Bed</li>
			<li>2 Bath</li>
			<li>1,246 Sq/Ft</li>
			<li class="last">2,000 SQ/FT LOT</li>
		</ul>
        <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
            <p class="price">Est. Opening Bid <a href="/propertydetails/ca/rancho-cucamonga/91730/cedarwood-ln/52752602"><span class="spanPrice" itemprop="price"><strong>$6,960</strong></span></a> <span>($6 SQ/FT)</span>  - Equity/LTV  <a href="/propertydetails/ca/rancho-cucamonga/91730/cedarwood-ln/52752602"><strong>$172,076/44%</strong></a></p>
        </div>
        <div class="property-user-toolbox"> 
         
<div class="rating4">
        
        <div id="myratingId" class="parent_rating">
                MY RATING
            </div>
        
    <div  style="display: inline-block;" parcelid="3264260"  propertyid="52752602" propertyWatchSettingId="0"  currentrating="0" userid="115909063"  class="rate_widget">
            <div id="1" class="star_1 ratings_stars" text="Bad">
            </div>
            <div id="2" class="star_2 ratings_stars" text="Not Bad">
            </div>
            <div id="3" class="star_3 ratings_stars" text="Average">
            </div>
            <div id="4" class="star_4 ratings_stars" text="Good">
            </div>
            <div id="5" class="star_5 ratings_stars" text="Very Good">
            </div>
        
    </div>
</div>
 
      
									
            <ul id="shareMenu52752602" class="action">
                <li class="clickSave"  parcelid="3264260"  propertyid="52752602" propertyWatchSettingId="0">
    <a><span class="ico"></span><span class="savespan">Save</span></a>
</li>
            
 

                    <li class="collect"><a href="javascript:void;" onclick="showPopUpCollectionDialog(this,'3264260','52752602');PropertyTooltip.CollectMenuClick();"><span class="ico"></span>Collect</a></li>
                
                <li class="share"><a href="javascript:void;"  id="shareLink52752602" onclick="PropertyTooltip.ShareInit([{&#39;PropertyID&#39;:&#39;52752602&#39;,&#39;PropertyParcelID&#39;:&#39;0&#39;,&#39;PropertyStatus&#39;:&#39;Auction&#39;,&#39;Address&#39;:&#39;8425 Cedarwood Ln, Rancho Cucamonga, CA 91730&#39;,&#39;PriceType&#39;:&#39;Est. Opening Bid&#39;,&#39;Price&#39;:&#39;6960.0000&#39;,&#39;ImageUrl&#39;:&#39;http://www.realtytrac.com/birdseyeimage/propertyimage.ashx?propid=52752602&amp;z=30&amp;tn=true&amp;src=mp&amp;_t=635248062894578603&amp;latitude=34.10378&amp;longitude=-117.62125&#39;,&#39;PropertyDetailUrl&#39;:&#39;http://www.realtytrac.com/propertydetails/ca/rancho-cucamonga/91730/cedarwood-ln/52752602&#39;,&#39;MapSearchUrl&#39;:&#39;http://www.realtytrac.com/mapsearch/ca/san-bernardino-county/rancho-cucamonga/91730/?address=8425 cedarwood ln, rancho cucamonga, ca 91730&amp;lat=34.10378&amp;lon=-117.62125&#39;}], &#39;2&#39;, &#39;2.000000&#39;, &#39;&#39;); PropertyTooltip.ShareMenuShow(this, &#39;52752602&#39;);"><span class="ico"></span>Share</a></li>
            
				<li class="compare">
					<div class="loadingLabel" data-id="divLoadingLabel">Loading ...
                    </div>

					<div style="display: none; margin-top:-5px;" class="compareItemBtn" data-id="divCompareSection">
						<input id="chkCompareProperty_52752602" type="checkbox" name="chkComparePropertyID" value="52752602"/>
                        <a id="CompareProperty_52752602" onclick="if(this.innerHTML == 'Compare') $('#chkCompareProperty_52752602').click();">Compare</a>
					</div>
				</li>
            </ul>
          </div>
    </div>
</div>


                
                
                </div>
    <div class="pagination clearfix">
        

    <span class="current">1</span>
    <a class="page" href="/mapsearch/auctions/ca/san-bernardino-county/p-2?sortbyfield=default,asc">2</a>
    <a class="page" href="/mapsearch/auctions/ca/san-bernardino-county/p-3?sortbyfield=default,asc">3</a>
    <a class="page" href="/mapsearch/auctions/ca/san-bernardino-county/p-4?sortbyfield=default,asc">4</a>
    <a class="page" href="/mapsearch/auctions/ca/san-bernardino-county/p-5?sortbyfield=default,asc">5</a>
    <a class="page" href="/mapsearch/auctions/ca/san-bernardino-county/p-6?sortbyfield=default,asc">6</a>

            <a class="page" href="/mapsearch/auctions/ca/san-bernardino-county/p-135?sortbyfield=default,asc">..135</a>

			<a class="next" href="/mapsearch/auctions/ca/san-bernardino-county/p-2?sortbyfield=default,asc">Next &raquo;</a>	  
        
        <span class="jump">
		    Jump To Page
		    <input type="text" id="pageNav_PageNumber" class="text" maxPage="135" />
		    of 135
		    <a id="lnkJumpToPage" class="go button" href="/mapsearch/auctions/ca/san-bernardino-county/p-0?sortbyfield=default,asc" onclick="$.SearchResults.Paging.JumpToPage(); return false;">GO!</a>
		</span>
        <div id="paging_error" style="display:none;">
            You have entered an invalid page number. Please try again.
        </div>
    </div>	 
                <input id="propID" type="hidden" value="" />

                <div class="agentsList" id="DynamicLocalAgentWidgetCNT" tab-name="Auction" 
                    brokerID="0">
                </div>       
            <div class="sponsored-partner-links">
                <div class="industryBrains">
    <div id="divSponsorAds">
    </div>
</div>

<script type="text/javascript">
    if (typeof($) != "undefined")
    {
    	$(document).ready(function () {
    		var script = document.createElement('script');
    		script.src = '/adser/textlinksver2.ashx?rnd=' + Math.floor(Math.random() * 10001);
    		script.type = 'text/javascript';
    		script.charset = 'UTF-8';
    		document.getElementById('divSponsorAds').appendChild(script);
    	});
    }
</script>
            </div>

                <p class="small">The information at this site is provided solely for informational purposes and does not constitute an offer to sell, rent, or advertise real estate outside the state in which the owner of the site is licensed. The owner is not making any warranties or representations concerning any of these properties including their availability. Information at this site and its property ratings are deemed reliable but not guaranteed and should be independently verified. Any redistribution or resale is strictly prohibited. All trademarks herein are property of their respective owners.</p>
                <p class="small">Properties on this site labeled as Bank-Owned may be owned by the bank or managed by the bank for others. </p>
        </div>
    </div>

</div>

<div id="shareMenuListCnt" ncid="shareMenuList" class="share-menu-list-container" style="display:none;">
    <a class="shareMenu prev" href="javascript:void;" onclick="PropertyTooltip.ShareWithEmailClick();">Share Via Email</a>
    <a class="shareMenu next last" href="javascript:void;"  onclick="PropertyTooltip.ShareWithFacebookClick();">Share With Facebook</a>
    <div class="top-corner"></div>
    <input type="hidden" id="shareMenuListID" value=""/>
</div>

    <script type="text/javascript">
        $(function () {
            if ($.SearchResults != null) {
                $.SearchResults.Toolbar.Init(false, "/MapSearch/download/DownloadAsync");
            }
        });
    </script>

<div id="mapItContainer" class="mapItContainer" style="display: none;">
    <div class="corner"></div>
    <a href="javascript:void(0);" onclick="$.SearchResults.MapIt.HideBox();" id="cnt-close" class="close"></a>
    <div id="mapItMap" class="mapItMap"></div>
    <div class="navigationLinks">
        <a id="mapItPropertyDetailsUrl" class="left" href="javascript:void(0);">View Property Details Map &raquo;</a>
        <a id="mapItUrl" class="right" href="javascript:void(0);" onclick="UpdateDefaultSearchType(true, this); return false;">Switch this entire search to Map Mode &raquo;</a>
    </div>
</div>




<div id="SaveSearchDialog" class="custom-overlay overlay"  style="display: none;">
    <a href="javascript:void(0);" class="close">Close</a>
    <div class="clearfix" id="saveSearchContent">
        <h2> SAVE THIS SEARCH</h2>
        <p>Save this search and receive email updates when new listings matching your criteria come online.</p>
<form action="" id="SaveSearchForm" method="post"><input data-val="true" data-val-number="The field UserId must be a number." data-val-required="The UserId field is required." id="UserId" name="UserId" type="hidden" value="115909063" /><input id="FullSearchRequest" name="FullSearchRequest" type="hidden" value="{&quot;STab&quot;:null,&quot;Latitude&quot;:0,&quot;Longitude&quot;:0,&quot;BasicRequest&quot;:{&quot;Zip&quot;:null,&quot;CountyCode&quot;:&quot;CASB&quot;,&quot;City&quot;:null,&quot;Address&quot;:null,&quot;ParcelNumber&quot;:null,&quot;PropertyID&quot;:null,&quot;NeighborhoodID&quot;:null,&quot;NeighborhoodName&quot;:null,&quot;ExactZip&quot;:false,&quot;SearchType&quot;:1,&quot;LatitudeRange&quot;:null,&quot;LongitudeRange&quot;:null},&quot;AdvancedRequest&quot;:{&quot;USS&quot;:true,&quot;PropertyTabType&quot;:null,&quot;PropertySubTabName&quot;:&quot;Auction&quot;,&quot;DatabaseType&quot;:0,&quot;PropertyType&quot;:&quot;&quot;,&quot;Rating&quot;:31,&quot;PriceFrom&quot;:null,&quot;PriceTo&quot;:null,&quot;BedroomCountFrom&quot;:0,&quot;BedroomCountTo&quot;:null,&quot;BathroomCountFrom&quot;:0,&quot;BathroomCountTo&quot;:null,&quot;SquareFeetFrom&quot;:0,&quot;SquareFeetTo&quot;:null,&quot;FromDate&quot;:null,&quot;ToDate&quot;:null,&quot;DateRange&quot;:-10,&quot;SortField&quot;:512,&quot;SortFieldMap&quot;:4,&quot;RecordsPerPage&quot;:10,&quot;ExcludeSuppliers&quot;:[],&quot;IncludeSuppliers&quot;:[],&quot;UFA&quot;:false,&quot;SM&quot;:9,&quot;HSF&quot;:null,&quot;HST&quot;:null,&quot;EF&quot;:null,&quot;ET&quot;:null,&quot;LTVF&quot;:null,&quot;LTVT&quot;:null,&quot;LN&quot;:null,&quot;LotSize&quot;:0,&quot;LotSizeTo&quot;:null,&quot;YF&quot;:null,&quot;YT&quot;:null,&quot;ListedForeclosures&quot;:1,&quot;Bankruptcies&quot;:1,&quot;IncludeTrusteeSalesAuctions&quot;:null,&quot;IncludeBankOwnedAuctions&quot;:null,&quot;IncludeNonDistressedAuctions&quot;:null,&quot;AuctionDateFrom&quot;:null,&quot;AuctionDateTo&quot;:null,&quot;AuctionDateRange&quot;:-10,&quot;BrokerId&quot;:null},&quot;CurrentPage&quot;:0,&quot;ResultType&quot;:0,&quot;IsMapVisible&quot;:false,&quot;ZoomLevel&quot;:14,&quot;MapPosition&quot;:null,&quot;IsInteractiveRequest&quot;:false,&quot;IsMf&quot;:false,&quot;CheckedTypes&quot;:null,&quot;IsBasicSearchRequest&quot;:false,&quot;OfferEnabledVendorName&quot;:null,&quot;OodleRequestType&quot;:0}" /><input data-val="true" data-val-number="The field SavedSearchId must be a number." data-val-required="The SavedSearchId field is required." id="SavedSearchId" name="SavedSearchId" type="hidden" value="0" /><input data-val="true" data-val-required="The IsUpdate field is required." id="IsUpdate" name="IsUpdate" type="hidden" value="False" />            <div class="input-form clearfix save-search-form">
                <div class="title">
                    <label for="SearchName">Search Name</label>
                </div>
                <div class="inputs">
                    <input data-val="true" data-val-required="Required" id="SearchName" name="SearchName" type="text" value="San Bernardino county, CA" />
                </div>
                <span id="saveSearchError" style="display:none;">Required<span class="corner"></span></span>
            </div>
            <div class="input-form clearfix">
                <input checked="checked" data-val="true" data-val-required="The Notify field is required." id="Notify" name="Notify" type="checkbox" value="true" /><input name="Notify" type="hidden" value="false" /><label>Notify me by email when new properties match this search</label>
            </div>
            <div class="input-form clearfix" style="text-align:right;">
                <input id="btnSaveSearchSubmit" type="submit" class="color_button_uppercase" value="Save Search" />
            </div>
            <span class="error" style="display: none;"></span>
            <script type="text/javascript">
                    $(function () {
                        $("#btnSaveSearchSubmit").click(function (event) {
                            event.preventDefault();
                            submitSaveSearchForm("#btnSaveSearchSubmit", "#SaveSearchForm", "/geo/header/savesearch");
                        });

                    });
            </script>
</form>    </div>
    <div id="saveSearchSuccess" class="clearfix" style="display: none;">
         <h2>Saved Successfully!</h2>
         <p>You have successfully saved this search.</p>
         <p><a href="javascript:void;" onclick="$('#SaveSearchDialog').overlay().close();">Close this dialog</a></p>
    </div>    
</div>
                </div>
                <div class="rightContent">
<div class="sidebar">
            <div class="agentBanner real-estate-specialist sidebar-widget clearfix agentContactLeadForm onMapBanner">
            <h2 class="overlayheader newbanner">
LOCAL REAL ESTATE AGENT</h2>

            <span class="newpremier" style="display:none;"></span>    
        <div class="content clearfix agent-overlay" style="margin-top:-10px">
            <div class="thumb" style="width:80px">    <img src="/rnshared/pics/users/102547/ExclusiveTerritoryBanner.gif" alt="" width="60px" height="75px" class="agentImage" onerror="this.src='/ui/images/default_agent_avatar.jpg';" style="margin-right:5px;"/>
</div>
            <div class="descriptionnewbanner" >
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="">
                                        <p class="name" style="font-size:12pt">JOSE SANCHEZ</p>
                                <div class="otherInfo">
                                        <p class="position company" style="line-height:1.1em !important">RealEstateAuctions.com Worldwide Inc.</p>
                                                                        
                                </div>
                            </td>
                             </tr>
                             <tr>
                                 <td style="vertical-align: bottom">
                                 </td>
                        </tr>
                    </table>
            </div>
            <br class="clearfloat" />
                    <ul class="tabContent no-dragg">
                <li class=active c-index="1">
                    
                    <form id="agentLeadFormInternal" class="contactItems">
                        <div class="agentUserTypeSelect field2 clearfix" >
      
        <select data-val="true" data-val-required="The Type field is required." id="Type" name="Type"><option value="Buyer">Looking to buy a home</option>
<option value="Seller">Looking to sell a home</option>
<option value="BuyerAndSeller">Looking to buy and sell a home</option>
</select>
        <p class="overlay_error_short" style="display: none;">
            <span class="tip"></span>Required</p>
    </div>
    <div class="field2 clearfix">        
<input data-val="true" data-val-required="The Name field is required." id="Name" name="Name" type="text" value="Norma " />        <p class="overlay_error_short" style="display: none;">
            <span class="tip"></span>Required</p>
    </div>
    <div class="field2 clearfix">
<input data-val="true" data-val-required="The Phone field is required." id="Phone" name="Phone" type="text" value="4783696384" />        
        <p class="overlay_error_short" style="display: none;">
            <span class="tip"></span>Invalid</p>
    </div>
    <div class="field2 clearfix">
<input data-val="true" data-val-required="The Email field is required." id="Email" name="Email" type="text" value="normajbarefield@mailinator.com" />        <p class="overlay_error_short" style="display: none;">
            <span class="tip"></span>Required</p>
    </div>
    <div class="field2 clearfix">       
        <textarea class="text-box multi-line" id="Message" name="Message">
I am interested in homes in San Bernardino County, CA</textarea>
        <input type="hidden" class="searchAreaName" value="San Bernardino County, CA" />
    </div>
    <div class="field clearfix" style="float:left;">
        <input type="button" class="agentcolor_button submitBtn contactAgentButton" value="CONTACT AGENT" onclick="SubmitAgentLeadInternal(&#39;MapSearch&#39;);" />
    </div>
            <div class="field2adlink"><a target="_blank" href="/agentproduct/professional">Learn how to become a featured agent</a></div>
<input id="Address" name="Address" type="hidden" value="" /><input id="City" name="City" type="hidden" value="" /><input id="CountyCode" name="CountyCode" type="hidden" value="CASB" /><input id="Zip" name="Zip" type="hidden" value="" /><input id="StateCode" name="StateCode" type="hidden" value="" /><input data-val="true" data-val-number="The field ParcelID must be a number." id="ParcelID" name="ParcelID" type="hidden" value="" /><input data-val="true" data-val-number="The field PropertyID must be a number." id="PropertyID" name="PropertyID" type="hidden" value="" /><input data-val="true" data-val-required="The IsNearBy field is required." id="IsNearBy" name="IsNearBy" type="hidden" value="False" /><input class="agentLeadSourceType" data-val="true" data-val-required="The LeadSource field is required." id="LeadSource" name="LeadSource" type="hidden" value="LTSR" />    <input name="AgentPK" type="hidden" value="81259" />

                    </form>
                        <p class="success successItems">
        <br />
        Thank You!</p>
    <p class="successItems">
        Your info has been successfully sent to <span id="agentBanner_Name">JOSE SANCHEZ</span>.
    </p>
    <p class="successItems">
        If you are not contacted by the agent within 24 hours, please call 877-888-8722.</p>

                </li>
                    </ul>
            
                       
            <div id="agent-search-div">
            </div>
                        
            <br class="clearfloat" />
        </div>
    </div>
    <div id="agentOverlayContainer" style="display: none;" class="agentContactLeadForm">
        <div class="agent-overlay overlay fixOverlayPosition">
            <a href="javascript:void(0);" class="close">Close</a>
            <h2 class="overlayheader">
Local Real Estate Agent            </h2>
                <span class="mapPremier" style="display:none;">Premier</span>    
            <div id="contactForm" class="profile clearfix">
                <div class="contact_form_inner_cont">
                    <img id="imgAgentPic" src="/rnshared/pics/users/102547/ExclusiveTerritoryBanner.gif" alt="" width="67" class="agentImage" onerror="this.src='/ui/images/default_agent_avatar.jpg';" />
                    <div class="description">
                        <p class="name submitForm">
JOSE SANCHEZ                                                            <br />
                                <span>RealEstateAuctions.com Worldwide Inc.</span>
                                                    </p>
                        <p class="agentSpeciality">
I am available to assist you in purchasing a foreclosure property or another property best suited to your needs. Buying or selling, I am here to act as your local real estate specialist. I can also assist you with 1031 exchanges and probate.                        </p>
                    </div>
                    <br class="clearfloat" />
                </div>
                    <form id="agentLeadForm" class="contactItems">
                        <div class="agentUserTypeSelect field2 clearfix" >
      
        <select id="Type" name="Type"><option value="Buyer">Looking to buy a home</option>
<option value="Seller">Looking to sell a home</option>
<option value="BuyerAndSeller">Looking to buy and sell a home</option>
</select>
        <p class="overlay_error_short" style="display: none;">
            <span class="tip"></span>Required</p>
    </div>
    <div class="field2 clearfix">        
<input id="Name" name="Name" type="text" value="Norma " />        <p class="overlay_error_short" style="display: none;">
            <span class="tip"></span>Required</p>
    </div>
    <div class="field2 clearfix">
<input id="Phone" name="Phone" type="text" value="4783696384" />        
        <p class="overlay_error_short" style="display: none;">
            <span class="tip"></span>Invalid</p>
    </div>
    <div class="field2 clearfix">
<input id="Email" name="Email" type="text" value="normajbarefield@mailinator.com" />        <p class="overlay_error_short" style="display: none;">
            <span class="tip"></span>Required</p>
    </div>
    <div class="field2 clearfix">       
        <textarea class="text-box multi-line" id="Message" name="Message">
I am interested in homes in San Bernardino County, CA</textarea>
        <input type="hidden" class="searchAreaName" value="San Bernardino County, CA" />
    </div>
    <div class="field clearfix" style="float:left;">
        <input type="button" class="agentcolor_button submitBtn contactAgentButton" value="CONTACT AGENT" onclick="SubmitAgentLead(&#39;Map&#39;);" />
    </div>
            <div class="field2adlink"><a target="_blank" href="/agentproduct/professional">Learn how to become a featured agent</a></div>
<input id="Address" name="Address" type="hidden" value="" /><input id="City" name="City" type="hidden" value="" /><input id="CountyCode" name="CountyCode" type="hidden" value="CASB" /><input id="Zip" name="Zip" type="hidden" value="" /><input id="StateCode" name="StateCode" type="hidden" value="" /><input id="ParcelID" name="ParcelID" type="hidden" value="" /><input id="PropertyID" name="PropertyID" type="hidden" value="" /><input id="IsNearBy" name="IsNearBy" type="hidden" value="False" /><input class="agentLeadSourceType" id="LeadSource" name="LeadSource" type="hidden" value="LTSR" />    <input name="AgentPK" type="hidden" value="81259" />

                    </form>
                    <p class="success successItems">
        <br />
        Thank You!</p>
    <p class="successItems">
        Your info has been successfully sent to <span id="agentBanner_Name">JOSE SANCHEZ</span>.
    </p>
    <p class="successItems">
        If you are not contacted by the agent within 24 hours, please call 877-888-8722.</p>

            </div>
        </div>
    </div>
    <script type="text/javascript">
           

        //GA tracking for broker
        var GAID = "";
        //check is GAID already shown
        if (GAID != "") {
            _gaq.push(['_setAccount', GAID],
              ['_trackPageview']);           

        }       
        </script>
        <div class="rightsidebarpaddingbottom">
        </div>
        <div>

<script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];

        
        $(function ()
        {
            var gads = document.createElement('script');
            gads.async = true;
            gads.type = 'text/javascript';
            var useSSL = 'https:' == document.location.protocol;
            gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
            var node = document.getElementsByTagName('script')[0];
            node.parentNode.insertBefore(gads, node);
        });
        
</script>  

<script type='text/javascript'>
    googletag.cmd.push(function () {
        googletag.defineSlot('/6584879/RT_SEARCH_RECTANGLE_1', [300, 250], 'div-gpt-ad-1358895528900-1').addService(googletag.pubads()).setTargeting('stateabbr', 'CA');
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>
 
<!-- RT_Map_Search_Rectangle_1 -->
<div id='div-gpt-ad-1358895528900-1' style='width:300px; height:250px;'>
<script type='text/javascript'>
    googletag.cmd.push(function () { googletag.display('div-gpt-ad-1358895528900-1'); });
</script>
</div>

</div>
        <div class="rightsidebarpaddingbottom">
        </div>
    <script type="text/javascript">
    $(function () { LoadRecentSearchesSideBar(); });
</script>

<div class="clear"></div>
<div class="recentPropertiesPlaceholder">
</div>
<div class="clearfix"></div>
    <div class="rightsidebarpaddingbottom">
    </div>
<div>

<script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];

</script>  

<script type='text/javascript'>
    googletag.cmd.push(function () {
        googletag.defineSlot('/6584879/RT_SEARCH_RECTANGLE_2', [300, 250], 'div-gpt-ad-1358895528900-2').addService(googletag.pubads()).setTargeting('stateabbr', 'CA');
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>
 
<!-- RT_Map_Search_Rectangle_2 -->
<div id='div-gpt-ad-1358895528900-2' style='width:300px; height:250px;'>
<script type='text/javascript'>
    googletag.cmd.push(function () { googletag.display('div-gpt-ad-1358895528900-2'); });
</script>
</div>
</div>
        <div class="rightsidebarpaddingbottom">
        </div>
     <div>

<script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];

</script>  

<script type='text/javascript'>
    googletag.cmd.push(function () {
        googletag.defineSlot('/6584879/RT_SEARCH_RECTANGLE_3', [300, 250], 'div-gpt-ad-1378851297176-0').addService(googletag.pubads()).setTargeting('stateabbr', 'CA');
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>
 
<!-- RT_Map_Search_Rectangle_3 -->
<div id='div-gpt-ad-1378851297176-0' style='width:300px; height:250px;'>
<script type='text/javascript'>
    googletag.cmd.push(function () { googletag.display('div-gpt-ad-1378851297176-0'); });
</script>
</div>
</div>
        <div class="rightsidebarpaddingbottom">
           
        </div>
     <div>

<script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];

</script>  

<script type='text/javascript'>
    googletag.cmd.push(function () {
        googletag.defineSlot('/6584879/RT_SEARCH_RECTANGLE_4', [300, 250], 'div-gpt-ad-1378851297176-1').addService(googletag.pubads()).setTargeting('stateabbr', 'CA');
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>
 
<!-- RT_Map_Search_Rectangle_4 -->
<div id='div-gpt-ad-1378851297176-1' style='width:300px; height:250px;'>
<script type='text/javascript'>
    googletag.cmd.push(function () { googletag.display('div-gpt-ad-1378851297176-1'); });
</script>
</div>
</div>
        <div class="rightsidebarpaddingbottom">
          
        </div>
</div>
                </div>
                <div class="clearfloat">
                </div>
            </div>

        <div id="SEODynamicFooterCNT" tab-name="Auction"></div>
            <!--begin footer-->
<div class="footer">
    <div class="trademarks">
        <p><span style="width:180px;">&nbsp;</span>&copy; 1996-<script language="javascript" type="text/javascript"> var giYear = new Date(); document.write(giYear.getFullYear())</script> Renwood RealtyTrac LLC. All Rights reserved | 
        <a href="/pub/privacy.html" name="&lid=Privacy - Footer" target="_blank" >Privacy</a> | 
        <a href="/pub/terms.html" name="&lid=Terms - Footer" target="_blank" >Terms of Use</a>
        <span class="socialNetsFooter">
            <a href="http://www.facebook.com/realtytrac" id="lnkFbFooter" name="fb - Footer" target="_blank" class="fbImgFooter"></a>
            <a href="http://twitter.com/realtytrac" id="lnkTwFooter" name="tw - Footer" target="_blank" class="twImgFooter"></a>
            <a href="http://www.youtube.com/user/realtytrac" id="lnkYtFooter" name="yt - Footer" target="_blank" class="ytImgFooter"></a>
        </span>
        </p>        
    </div>
    
    <div class="footer_links">
        <p>
                Inside RealtyTrac             
    <a href="/mapsearch/real-estate/" >Find a Home</a>
         |
    <a href="/agentsearch" >Find an Agent</a>
         |
    <a href="/dashboard" >My RealtyTrac</a>
         |
    <a href="/statsandtrends" >Stats & Trends</a>
         |
    <a href="/finance/" >Finance Center</a>
         |
    <a href="http://www.realtytrac.com/real-estate-guides"          target="_blank"
>Real Estate Guides</a>
 <br />
                            For Professionals             
    <a href="/investors" >Investors</a>
         |
    <a href="/agentproduct" >Agents</a>
         |
    <a href="/advertisingcenter/" >Advertisers</a>
         |
    <a href="/datalink/partner.aspx" >Partners</a>
         |
    <a href="http://data.realtytrac.com"          target="_blank"
>Data Sales</a>
         |
    <a href="http://mega.realtytrac.com"          target="_blank"
>Marketing Lists</a>
         |
    <a href="http://insidetrac.realtytrac.com"          target="_blank"
>InsideTrac Login</a>
 <br />
                            Company Info             
    <a href="/company-info" >About Us</a>
         |
    <a href="/companyinfo/contact" >Contact Us</a>
         |
    <a href="/content/news-and-opinion" >News Room</a>
         |
    <a href="http://www.foreclosurepulse.com"          target="_blank"
>Foreclosure Pulse</a>
 <br />
        </p>
        <div style="" id="dFeedback"></div>
    </div>
</div>
<!--end footer-->        </div>
    </div>
    
    <script src="//i1.realtytrac.com/UI/jscript/MapSearch/SearchResultToolbar.js?v=15&amp;d=20140108" type="text/javascript"></script>
    <script src="//i1.realtytrac.com/UI/jscript/Common/collection.js?v=15&amp;d=20140108" type="text/javascript"></script>
<script src="//i1.realtytrac.com/UI/jscript/thirdparty/bingmap/mapcontrol.ashx.js?d=20140108" type="text/javascript"></script>    <script src="//i1.realtytrac.com/Scripts/jquery_session.js?d=20140108" type="text/javascript"></script>
    <script type="text/javascript">
        $(function() {
            $.SearchResults.Init('AiSImhq1M-I30KFb_EgffPyCg5KAxycLkq1NomxoF1l4PdY6tNTbZdLQCdLRrRZA');
        });


    </script>

<!-------------------------------
CoBrandCompany :    Natural Search
CoBrandPK :         302
CoBrandAccount :    13562
ServerIP cookie :   
ServerIP header :   192.168.100.10
Time: 1/8/2014 7:31:28 PM
------------------------------->
        <div class="leaderboard" style="position:absolute;width:100%;top:0">
        <div class="leaderboard_ad">
                <div>

<script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];

</script>  

<script type='text/javascript'>
    googletag.cmd.push(function () {
        googletag.defineSlot('/6584879/RT_SEARCH_LEADERBOARD', [728, 90], 'div-gpt-ad-1358895528900-0').addService(googletag.pubads()).setTargeting('stateabbr', 'CA');
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>
 
 
<!-- RT_Map_Search_Leaderboard -->
<div id='div-gpt-ad-1358895528900-0' style='width:728px; height:90px;'>
<script type='text/javascript'>
    googletag.cmd.push(function () { googletag.display('div-gpt-ad-1358895528900-0'); });
</script>
</div>
</div>

        </div>
    </div>
    <div style="position:absolute;width:100%;top:103px">








<div class="header  headerV3" id="RT_SearchCnr">
    <div class="topLinks">
        <a href="/" class="logoLink">
            <div class="logo" title="RealtyTrac, find foreclosures, real estate and home facts">&nbsp;</div>
        </a>
            <ul class="navigationButtons">
                <li class="selected"><a href="/mapsearch/us.html">HOMES</a></li>
                <li ><a href="/statsandtrends" class="trendsbutton">TRENDS</a></li>
                <li ><a href="/agentsearch" class="agentbutton">AGENTS</a></li>
                <li ><a href="/broker-network" class="brokersbutton">BROKERS</a></li>
                <li ><a href="/content/news-and-opinion" class="news">NEWS</a></li>
                <li class="expandMoreMenu"><a href="javascript:void(0);">MORE<span class="arrowdark">&nbsp;</span></a></li>
            </ul>
        <ul class="accountButtons">
                            <li class="memberIcon loggedInButton"><a href="javascript:void(0);" id="loggedUserNam" class="showAccountMenu"><span class="icon">&nbsp;</span>WELCOME Norma<span class="arrowdark">&nbsp;</span></a></li>
           
        </ul>
    </div>
        <div id="moreNavigationMenu" class="dropDownMenuContent dropDownSearchMenu">
        <div class="top-corner"></div>
        <ul>
            <li class="first"><a href="/finance/">Mortgages</a></li>
            <li><a href="http://www.realtytrac.com/real-estate-guides">Real Estate Guides</a></li>
            <li><a href="/203k">203K Loans</a></li>
            <li class="last"><a href="javascript:void(0);" class="helpLink">Help</a></li>
        </ul>
    </div>

        <div id="realEstateProsMenu" class="dropDownMenuContent dropDownSearchMenu">
        <div class="top-corner"></div>
        <ul>
            <li class="first"><a href="/agentproduct">Agent Products</a></li>
            <li class="last"><a href="/network">Broker Network</a></li>           
        </ul>
    </div>



    <div class="clearfloat"></div>
    
        <div class="searchbarback">
            <div class="searchpanel">
                <div class="searchHeaderContent">
                    <div class="searchHeaderMenu">
                        <a id="searchHeaderDropDownNav" href="javascript:void(0);"><span id="selectedTxt">
                                Search Homes
                        </span><span class="corner"></span>
                            <input type="hidden" id="searchType" name="searchType" value="MapSearch" /></a>
                        <div id="searchHeaderDropDown" class="dropDownMenuContent dropDownSearchMenu">
                            <div class="top-corner">
                            </div>
                            <ul>
                                <li class="first"><a href="javascript:void(0);" onclick="dropDownSearchMenuSelect('MapSearch');">
                                    Search Homes</a></li>
								    <li><a href="javascript:void(0);" onclick="dropDownSearchMenuSelect('Property');">
										    Search Prop ID</a></li>
                                <li><a href="javascript:void(0);" onclick="dropDownSearchMenuSelect('TrendCenter');">
                                    Stats & Trends</a></li>
                                <li class="last"><a href="javascript:void(0);" onclick="dropDownSearchMenuSelect('AgentSearch');">
                                    Find An Agent</a></li>
                            </ul>
                        </div>
                    </div>
                    <input type="text" name="txtSearch" id="txtSearch" ncid="SH_txtSearch" class="search_input"
                            value="San Bernardino county, CA" watermark="" />
                    <input type="button" id="header_searchspot" class="search_hotspot" />
                    <input type="hidden" name="ShowNewStatsAndTrends" ncid="SH_ShowNewStatsAndTrends" value="value" />
                </div>
                <ul class="buttonsPanel">
                    <li>
                        <a href="javascript:void(0);" class="filters advancedSearchLink" >
                            <span>&nbsp;</span>
                            <label>filters</label>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0);" onclick="EnableSaveSearch(true);" class="save">
                            <span>&nbsp;</span>
                            <label>save</label>
                        </a>
                    </li>
                                        <li>
                        <a href="/map/ca/san-bernardino-county/" onclick="UpdateDefaultSearchType(true, $(this)); return false;" class="map">
                            <span>&nbsp;</span>
                            <label>map</label>
                        </a>
                    </li>
                </ul>
                <ul class="userMenu">
                        <li><a href="/dashboard">My RealtyTrac</a></li>
                        <li><span class="separator"></span></li>
                        <li><a id="headerRecentSearches" href="javascript:HeaderViewSearches();">SEARCHES</a></li>
                        <li><span class="separator"></span></li>
                        <li><a id="headerPropertyList" href="javascript:HeaderViewProperties();">PROPERTIES</a></li>
                </ul>            
                    <div class="invalidAddressPopupDivCnr">
        <div id="invalidAddressPopupDiv" class="clsValidationSummary" style="display: none;">
            <div id="customMessage" class="hiddenElement" style="display: none;">
                <a href="javascript:CloseInvalidAddressHeaderPopup();" class="popupCloseLnk"><span
                    class="buttonX"></span></a>
            </div>
            <div id="invalidAddressMessage" style="display: block;">
                <a href="javascript:CloseInvalidAddressHeaderPopup();" class="popupCloseLnk"><span
                    class="buttonX" title=""></span></a>The location you are looking for cannot
                be found. <br/><br/>Suggestions:
                <ul class="invalidAddress">
                    <li>Type in a city and state when searching for an address.</li>
                    <li>Include a comma between your address and city.</li>
                    <li>Verify that your address and city are spelled correctly.</li>
                    <li>Try entering just a ZIP code.</li>
                </ul>
                <strong id="headerLinksTitle" style="display: none;">Did you mean:</strong>
                <ul id="headerLocationsList" class="invalidAddress">
                </ul>
            </div>
        </div>
    </div>

            </div>
        </div>
        <div class="filtersContainer">
        <div id="quickSearchDropDown" style="display: none;">
    <input type="hidden" id="txtSearchID" value="0" />
    <div class="advancedOptionsContent">
        <div class="ShowOnSavedSearchPage">
            <h3 id="shTitle">
                Edit Your Saved Search</h3>
            <div>
                <span class="title">Location</span>
                <input id="txtMapToSearchText" disabled="disabled" />
            </div>
            <div>
                <span class="title">Search Name</span>
                <input id="txtMapToSearchName" />
            </div>
        </div>
        <div class="clearfix filters-panel">
            <div class="advSearch-boxes input-options-panel">
                <div class="bedBathPriceFilters">
                    <span class="title" >Price ($)</span>
                        <input style="width: 73px;" type="text" class="priceInput" id="txtPriceMin" cb="SH_txtPriceMin" value="No Min" onfocus="if(this.value=='No Min'){this.value='';}" onblur="if(this.value==''){this.value='No Min';}"/>&nbsp;to&nbsp;<input style="width: 73px;" type="text" class="priceInput"  id="txtPriceMax" cb="SH_txtPriceMax" value="No Max"  onfocus="if(this.value=='No Max'){this.value='';}" onblur="if(this.value==''){this.value='No Max';}"/>
                        </span> 
                </div>
                <div class="bedBathPriceFilters">
                    <span class="title">Bedrooms</span>
                    <select name="beds" id="SH_ddlBeds">
                    </select>&nbsp;to&nbsp;<select name="bedsMax" id="SH_ddlBedsMax"></select>
                </div>
                <div class="bedBathPriceFilters">
                    <span class="title">Bathrooms</span>
                    <select name="baths" id="SH_ddlBaths">
                    </select>&nbsp;to&nbsp;<select name="bathsMax" id="SH_ddlBathsMax"></select>
                </div>
                <div class="bedBathPriceFilters ">
                    <span class="title">Home Size</span>
                    <select name="sqFt" id="SH_ddlSqFt">
                    </select>&nbsp;to&nbsp;<select name="sqFtMax" id="SH_ddlSqFtMax"></select>
                </div>
                <div class="bedBathPriceFilters">
                    <span class="title">Lot Size</span>
                    <select name="lotSize" id="SH_ddlLotSize">
                    </select>&nbsp;to&nbsp;<select name="lotSizeMax" id="SH_ddlLotSizeMax"></select>
                </div>
                <div id="datesSearchBox" class="clearfix">
                    <div id="divYearBuilt" class="item_options">
                        <span class="title">Year Built</span>
                        <select name="ddlYearBuiltFrom" id="SH_ddlYearBuiltFrom">
                        </select>&nbsp;to&nbsp;<select name="ddlYearBuiltTo" id="SH_ddlYearBuiltTo"></select>
                    </div>
                    <div class="item_options">
                        <span class="title">Entry Date</span>
                        <div class="selectDateInput">
                            <div id="EntryDate">
                                <span id="titleEntryDateSelected">Any</span>
                                <input type="hidden" value="" ncid="SH_txtDateBegin" />
                                <input type="hidden" value="" ncid="SH_txtDateEnd" />
                                <div class="button">
                                    <span class="corner"></span>
                                </div>
                            </div>
                            <div class="container" id="entryDateCnt">
                                <a value="null">Any</a> <a value="0">Today</a> <a value="7">Within last 7 days</a>
                                <a value="14">Within last 14 days</a> <a value="30">Within last 30 days</a> <a value="60">
                                    Within last 60 days</a> <a value="90">Within last 90 days</a> <a value="120">Within
                                        last 120 days</a> <a value="6m">Within last 6 months</a> <a value="12m">Within last
                                            12 months</a> <a value="24m">Within last 24 months</a> <a value="36m">Within last 36
                                                months</a>
                                <div class="inputcnt">
                                    Custom date range
                                    <input type="text" id="dateRangeFrom" value="From" />
                                    -
                                    <input type="text" id="dateRangeTo" value="To" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="propertyTypesBox" class="advSearch-boxes">
                <ul id="residentialCbxs">
                    <li>
                        <p>
                            Residential Listings</p>
                    </li>
                    <li>
                        <input type="checkbox" checked="checked" value="AR" id="SH_cbxAllResidential" />All
                        Residential:
                        <ul id="SH_allResidentialCbxs">
                            <li>
                                <input type="checkbox" value="SF" id="SH_cbxSingleFamily" />Single Family</li>
                            <li>
                                <input type="checkbox" value="CT" id="SH_cbxCondo" />Condo / Townhouse</li>
                            <li>
                                <input type="checkbox" value="M2" id="SH_cbxMultiFamily2" />Multi Family (2-4 units)</li>
                            <li>
                                <input type="checkbox" value="M5" id="SH_cbxMultiFamily5" />Multi Family (5+ units)</li>
                            <li>
                                <input type="checkbox" value="MM" id="SH_cbxMobile" />Mobile/Manufactured</li>
                            <li>
                                <input type="checkbox" value="FR" id="SH_cbxFarm" />Farm/Ranch</li>
                            <li>
                                <input type="checkbox" value="RV" id="SH_cbxVacant" />Vacant Land</li>
                        </ul>
                    </li>
                </ul>
                <ul id="commercialCbxs">
                    <li>
                        <p>
                            Commercial Properties</p>
                    </li>
                    <li>
                        <input type="checkbox" checked="checked" value="AC" id="SH_cbxAllCommercial" name="" />All
                        Commercial:
                        <ul id="SH_allCommercialCbxs">
                            <li>
                                <input type="checkbox" value="RE" id="SH_cbxRetail" />Retail</li>
                            <li>
                                <input type="checkbox" value="OF" id="SH_cbxOffice" />Office</li>
                            <li>
                                <input type="checkbox" value="IN" id="SH_cbxIndustrial" />Industrial</li>
                        </ul>
                    </li>
                    <li style="padding: 15px 0px 0px 0px;">
                        <p>
                            <input type="checkbox" checked="checked" value="AO" id="SH_cbxOther" />Other:</p>
                        <ul>
                            <li>
                                <label>
                                    <input ncid='SH_tbxPropOther' type="text" onblur="if(this.value==''){this.value='Enter code';}"
                                        onfocus="if(this.value=='Enter code'){this.value='';}" id="tbxPropOther" size="8"
                                        cb='SH_tbxPropOther' />
                                </label>
                                <br />
                                <a onclick="javascript:window.open(document.location.protocol + '//www.realtytrac.com/pub/proptypecodes.html', '', 'width=800, scrollbars=1, menubar=0, location=0, toolbar=0, status=0'); return false;"
                                    href="javascript:;">View codes</a> </li>
                        </ul>
                    </li>
                </ul>
                <br class="clearer" />
            </div>
        </div>
        <div class="submit_panel clearfix">
            <div class="HideOnSavedSearchPage">
                <a id="resetSearch" class="reset_filters">Reset options</a>
            </div>
            <div class="ShowOnSavedSearchPage" style="float: left; padding-left: 85px; width: 100%;border:none;height:28px;">
                <a href="javascript:void(0);" onclick="javascript:resetSearchAdvance();" class="reset_filters">Reset options</a>
                <input type="button" class="color_button SubmitOnSavedSearchPage" style="float: right;
                    margin-right: 160px;" value="SAVE SEARCH" />
                <input type="button" class="color_button CancelOnSavedSearchPage" onclick="window.location.reload(true);"
                    style="float: right; margin-right: 20px;" value="CANCEL" />
            </div>
            <div class="HideOnSavedSearchPage">
                <input type="button" class="color_button searchSubmitButton" value="SUBMIT SEARCH" />
                <text>&nbsp;&nbsp;or&nbsp;&nbsp;</text>
                    
                    <input type="button" id="save_custom_search" class="color_button" value="SAVE AS CUSTOM SEARCH" />
                    <div id="save_options_form" class="save_options_form" style="display: none;">
                        <div class="corner_border">
                            <div class="corner">
                            </div>
                        </div>
                        <a class="close" href="javascript:void(0);" onclick="$('#save_options_form').hide(); return false;"></a>
                        <h1> SAVE THIS CUSTOM SEARCH</h1>
                        <span>Name</span>&nbsp;<input id="txtSearchName" name="searchName" type="text" />&nbsp;<input
                            id="saveSearch" type="button" class="color_button" value="Save" />
                    </div>

                   

                    
            </div>
        </div>
    </div>
    <div class="supplementalOptionsBarMember">
    </div>
    <div class="supplementalOptionsContent supplementalOptionsContentMember">
                
                    <div class="headerMember">
                        Premium Features
                    </div>
                
        <div id="rtRatingsBox" class="advSearch-boxes input-options-panel">
            <div class="equityLVTpanel clearfix">
                <span class="title" style="width: 66px;">Equity ($)</span>
                <input type="text" onblur="if(this.value==''){this.value='No Min';}"
                                                            onfocus="if(this.value=='No Min'){this.value='';}" id="txtEquityMin" cb="SH_txtEquityMin"
                                                            value="No Min" />
                <span>to</span>
                <input type="text" onblur="if(this.value==''){this.value='No Max';}"
                        onfocus="if(this.value=='No Max'){this.value='';}" id="txtEquityMax" cb="SH_txtEquityMax"
                        value="No Max" />
            </div>
            <div class="equityLVTpanel clearfix netEquityLoanToValueTab">
                <span class="title" style="width: 70px; float: left; margin: 5px 0;">LTV</span>
                <input type="text" class="homeScoreInput" style="padding: 2px; width: 50px;" onblur="if(this.value=='' || this.value=='0%'){this.value='No Min';}" onfocus="if(this.value=='No Min'){this.value='';}"
                    id="txtLoanToValueMin" cb="SH_txtLoanToValueMin" value="No Min" />
                <div id="netequityLoantovalueMin" class="floatLeft">
                            <a class="spinnerButton spinnerUp" href="javascript:void('0');"></a>
                            <a class="spinnerButton spinnerDown" href="javascript:void('0');"></a>
                </div> 
                <span class="floatLeft" style="padding: 5px 3px 5px 3px;">to</span>
                <input type="text" class="homeScoreInput" style="padding: 2px; width: 50px;" onblur="if(this.value==''){ this.value = 'No Max';}"
                        onfocus="if(this.value==($(this).attr('maxValue') + '%') || this.value == 'No Max'){this.value='';}" id="txtLoanToValueMax" cb="SH_txtLoanToValueMax"
                            value="No Max" maxValue="500" /> 
                <div class="floatLeft" id="netequityLoantovalueMax">
                        <a href="javascript:void('0');" class="spinnerButton spinnerUp"></a>
                        <a href="javascript:void('0');" class="spinnerButton spinnerDown"></a>
                </div>
            </div>
                <div id="rtLenderName" class="item_options">
                    <span class="title">Lender Name</span><span class="questionMarkIcon" id="quickSearchLender"></span><br />
                        <input type="text" id="txtLenderName" cb="SH_txtLenderName" />
                </div>
            <div class="item_options">
                <span class="title">Auction date</span><br />
                <div class="selectDateInput selectDateInput-auction">
                    <div id="AuctionDate">
                        <span id="titleAuctionDateSelected">Any</span>
                        <input type="hidden" value="" ncid="SH_txtAuctionDateBegin" />
                        <input type="hidden" value="" ncid="SH_txtAuctionDateEnd" />
                        <div class="button">
                            <span class="corner"></span>
                        </div>
                    </div>
                    <div class="container" id="auctionDateCnt">
                        <a value="null">Any</a> <a value="0">Today</a> <a value="-1">Tomorrow</a> <a value="7">
                            Within next 7 days</a> <a value="14">Within next 14 days</a> <a value="30">Within next
                                30 days</a> <a value="60">Within next 60 days</a> <a value="90">Within next 90 days</a>
                        <div class="inputcnt">
                            Custom date range<br />
                            <input type="text" id="auctionDateFrom" value="From" />
                            -
                            <input type="text" id="auctionDateTo" value="To" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix" style="padding: 3px 0px;">
                <div style="float: left; width: 120px; padding: 0px 5px 0px 0px; display: inline-block;">
                    <span>Listed Foreclosures</span><br />
                    <select id="SearchBarModel_ListedPropertiesDisplay" name="SearchBarModel.ListedPropertiesDisplay"><option value="1">Include</option>
<option value="0">Exclude</option>
<option value="2">Only Show</option>
</select>
                </div>
                <div style="float: left; width: 120px; padding: 0px 5px 0px 0px; display: inline-block;">
                    <span>Bankruptcies</span><br />
                    <select id="SearchBarModel_BankruptciesDisplay" name="SearchBarModel.BankruptciesDisplay"><option value="1">Include</option>
<option value="0">Exclude</option>
<option value="2">Only Show</option>
</select>
                </div>
            </div>
        </div>
    </div>
</div>
        </div>


            <form id="logoutForm" method="post" action="/r/logout"> 
                
<div class="accountMenu" style="display: none;">
    <div class="accountMenuContent dropDownMenuContent dropDownSearchMenu">
        <div class="top-corner"></div>
                   
<ul id="ulAccountMenu">
<li><a href="/dashboard">My RealtyTrac</a></li><li><a href="/dashboard/emailalerts">Email Alerts</a></li><li><a href="#logout">Log Out</a></li></ul>
 <script type="text/javascript">
    $(function () {
        $('#ulAccountMenu li:first').addClass("first");
        $('#ulAccountMenu li:last').addClass("last");
        $('#ulAccountMenu li:last a').addClass("logoutHeaderLink");

        $(".logoutHeaderLink").click(function (event) {
            event.preventDefault();

            if (typeof (DoLogout) != "undefined") {
                DoLogout();
            }
        }).attr("href", "#logout").attr("onclick", "");
    });
</script>

    </div>
</div>
<div class="logoutBox" style="display: none;">
    <div class="loginBoxContent">
        <input type="hidden" name="currentUrl" value="http://www.realtytrac.com/mapsearch/auctions/ca/san-bernardino-county/"/>
        <input type="submit" id="" value="Sign out" />
    </div>
</div>

            </form>

        <div id="menu" style="display: none;" class="tooltip_menu_searches">
            <div id="triangle">
            </div>
            <div id="tooltip_menu">
                <div class="headersearchitems">
                    <div id="recentSearchesHeaderContainer"><img src="/UI/images/loading.gif" alt="loading..." /></div>
                            
                    <div id="savedSearchesHeaderContainer"><img src="/UI/images/loading.gif" alt="loading..." /></div>
                            
                </div>
                <div class="headeritemsBottom">
                    <a href='/dashboard/savedsearches'>Go to Saved Searches in My RealtyTrac</a>
                </div>
            </div>
        </div>
        <div id="menu1" style="display: none;" class="tooltip_menu_properties">
            <div id="triangle1">
            </div>
            <div id="tooltip_menu1">
                <div class="headersearchitems">
                    <div id="lastPropertiesHeaderContainer"><img src="/UI/images/loading.gif" alt="loading..." /></div>
                    <div id="savedPropertiesHeaderContainer"><img src="/UI/images/loading.gif" alt="loading..." /></div>
                </div>
                <div class="headeritemsBottom">
                    <a href='/dashboard/savedproperties'>Go to Saved Properties in My RealtyTrac</a>
                </div>
            </div>
        </div>
</div>

<div class="clearfloat"></div>



<script type="text/javascript">
    var gUseSearchHeader = true;
    var g_HeaderEngineData = { 'isWhiteSite': false, 'isDataLink': false, 'isCustomFreeSite': false };

        
        var g_SearchHeaderData = {
            'textboxID': 'txtSearch',
            'listSearch': "searchOptions.searchEngine.ProcessAddressSearch($('#searchType').val(),'txtSearch', false);",
                        'trendSearch': "searchOptions.searchEngine.ProcessAddressSearch($('#searchType').val(),'txtSearch', false);",
                        'mapSearch': "searchOptions.searchEngine.ProcessAddressSearch($('#searchType').val(),'txtSearch', false);",
                        'btnSearchHomesID': 'SH_searchHomes',
                        'btnSearchTrendsID': 'SH_searchTrends',
                        'ddlSavedSearchesID': 'ddlSavedSearch',
                        'searchCodeMapSearch': 'SRLP',
                        'searchCodeTrendCenter': 'SRLT',
                        'searchCodeValueTrack': 'SRLH'
                    };
             

    $(function ()
    {



    });
    
setTimeout(function () {
    var a = document.createElement("script");
    var b = document.getElementsByTagName("script")[0];
    a.src = document.location.protocol + "//dnn506yrbagrg.cloudfront.net/pages/scripts/0018/5538.js?" + Math.floor(new Date().getTime() / 3600000);
    a.async = true; a.type = "text/javascript"; b.parentNode.insertBefore(a, b)
}, 1);
</script>    </div>
    <div id="overlayexposeMask" style="display:none;position:absolute;background:#000;width:100%;height:2800px;z-index :2000;opacity:0.6;top:0; left:0 "></div>
    <div id="divLogin" style="background-color:#FFFFFF; display:none;position:absolute;top:0px;left:0px;z-index :2000;">
        <iframe id="frmLogin" style="width:100%;height:100%;"></iframe>
    </div>
</body>
</html>

----------------- detail --------------------


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<script>_udn = "realtytrac.com";</script>

<!-- Google Analytics Content Experiment code -->
<script>function utmx_section(){}function utmx(){}(function(){var
k='62698171-20',d=document,l=d.location,c=d.cookie;
if(l.search.indexOf('utm_expid='+k)>0)return;
function f(n){if(c){var i=c.indexOf(n+'=');if(i>-1){var j=c.
indexOf(';',i);return escape(c.substring(i+n.length+1,j<0?c.
length:j))}}}var x=f('__utmx'),xx=f('__utmxx'),h=l.hash;d.write(
'<sc'+'ript src="'+'http'+(l.protocol=='https:'?'s://ssl':
'://www')+'.google-analytics.com/ga_exp.js?'+'utmxkey='+k+
'&utmx='+(x?x:'')+'&utmxx='+(xx?xx:'')+'&utmxtime='+new Date().
valueOf()+(h?'&utmxhash='+escape(h.substr(1)):'')+
'" type="text/javascript" charset="utf-8"><\/sc'+'ript>')})();
</script><script>utmx('url','A/B');</script><!-- End of Google Analytics Content Experiment code -->

     
    <meta http-equiv="X-UA-Compatible" content="IE=9">
    <title>Chino Hills, CA foreclosure - Obsidian Ct, Chino Hills, CA 91709 - RealtyTrac</title>
        <meta name="description" content="Chino Hills, CA foreclosure, Obsidian Ct, Chino Hills, CA 91709 - 1675 sq ft, 3 bedrooms, 2.50 bathrooms single family residence. View this Home Value at Obsidian Ct." />
        <meta name="keywords" content="Chino Hills, CA foreclosure, Obsidian Ct, Chino Hills CA,RealtyTrac, California home values, real estate" />
        <meta name="author" content="RealtyTrac" />

    
    <link href="//i2.realtytrac.com/UI/styles/dashboard.css?v=28&amp;d=20140108" rel="stylesheet" type="text/css" />
    <link href="//i2.realtytrac.com/UI/styles/RT2.css?v=16&amp;d=20140108" rel="stylesheet" type="text/css" />
    <link href="//i2.realtytrac.com/UI/styles/common.css?v=42&amp;d=20140108" rel="stylesheet" type="text/css" />   
    <link href="//i2.realtytrac.com/UI/styles/Map/map.css?v=25&amp;d=20140108" rel="stylesheet" type="text/css" />
    <link href="//i2.realtytrac.com/UI/styles/property.css?v=19&amp;d=20140108" rel="stylesheet" type="text/css" />  
    <link href="//i3.realtytrac.com/UI/styles/rating.css?v=11&amp;d=20140108" rel="stylesheet" type="text/css" />
    <link href="//i2.realtytrac.com/UI/styles/collection.css?v=12&amp;d=20140108" rel="stylesheet" type="text/css" />    
    <link href="//i3.realtytrac.com/UI/styles/jquery.ad-gallery.css?d=20140108" rel="stylesheet" type="text/css" />
    <script src="//i3.realtytrac.com/Scripts/jquery-1.8.2.min.js?d=20140108" type="text/javascript"></script>
    <script src="//i1.realtytrac.com/jscript/jquery/jquery-1.8.23-ui.min.js?d=20140108" type="text/javascript"></script>
    <script src="//i2.realtytrac.com/Scripts/jquery.tools-1.2.7.min.js?d=20140108" type="text/javascript"></script>
    <script src="//i2.realtytrac.com/UI/jscript/common.js?v=44&amp;d=20140108" type="text/javascript"></script>
	<script src="//i2.realtytrac.com/UI/jscript/easyXDM/easyXDM.min.js?d=20140108" type="text/javascript"></script>
    <script src="//i1.realtytrac.com/UI/jscript/Common/Property.js?v=20&amp;d=20140108" type="text/javascript"></script>
    <script src="//i1.realtytrac.com/jscript/jquery/masked-input-rtrac-mod.js?d=20140108" type="text/javascript"></script>
    <script src="//i1.realtytrac.com/UI/jscript/propertydetails/propertypage.js?v=17&amp;d=20140108" type="text/javascript"></script>
    <script src="//i2.realtytrac.com/UI/jscript/Common/PropertyInfoToolBox.js?v=21&amp;d=20140108" type="text/javascript"></script>
    <script src="//i2.realtytrac.com/UI/jscript/Common/collection.js?v=15&amp;d=20140108" type="text/javascript"></script>
    <script src="//i1.realtytrac.com/UI/jscript/MapSearch/SearchResultToolbar.js?v=15&amp;d=20140108" type="text/javascript"></script>
    <script src="//i3.realtytrac.com/jscript/CustomControls.js?v=42&amp;d=20140108" type="text/javascript"></script>
    <script src="//i2.realtytrac.com/jscript/headersearch.js?v=34&amp;d=20140108" type="text/javascript"></script>
    <script src="//i2.realtytrac.com/UI/jscript/jquery.ad-gallery.min.js?v=11&amp;d=20140108" type="text/javascript"></script>
    <script src="//i2.realtytrac.com/UI/jscript/jquery.jeditable.js?d=20140108" type="text/javascript"></script>
<script src="//cdn.optimizely.com/js/361650383.js"></script>
    <script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-22949028-3']);
    _gaq.push(['_trackPageview']);
    //_gaq.push(['_setCustomVar', 1, 'Platform Version', '2.0', 1]);
    _gaq.push(['_setDomainName', 'realtytrac.com']);

    //more var to check duplicate Broker shown
    var brokerShownGAID = "";

        
            _gaq.push(['_setCustomVar', 1, 'Login State', 'Logged In', 2]);
        

    _gaq.push(['_setCustomVar', 2, 'Member Type', 'No Account', 1]);

    (function() {
        var ga = document.createElement('script'); 
        ga.type = 'text/javascript'; 
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; 
        s.parentNode.insertBefore(ga, s);
    })();
</script>    
    <script language="javascript" type="text/javascript">
        var g_JsModel = {
            "appPath": "http://www.realtytrac.com/"
        }; 
    </script>



	  <script type="text/javascript">
	      $(document).ready(function () {
	        InitPropertyNotes();
	  		setImagesGallery(false);
	  	});
    </script>
</head>
<body>
<!-- Google Tag Manager -->
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-NM77L5"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NM77L5');</script>
<!-- End Google Tag Manager -->    
    <div class="container" style="margin-top:215px;">
        <div class="centerer">
            <div id="Content">
                
    <div class="breadcrumbs">
        <ul class="clearfix">
    <li>
        <div itemscope itemtype="http://data-vocabulary.org/Breadcrumb">

                <a href="/" itemprop="url" title="Home"><span itemprop="title">Home</span></a>
        </div>
    </li>
                        <li>&gt;</li> 
    <li>
        <div itemscope itemtype="http://data-vocabulary.org/Breadcrumb">

                <a href="/mapsearch/auctions/" itemprop="url" title="Auctions"><span itemprop="title">Auctions</span></a>
        </div>
    </li>
                        <li>&gt;</li> 
    <li>
        <div itemscope itemtype="http://data-vocabulary.org/Breadcrumb">

                <a href="/mapsearch/auctions/ca/" itemprop="url" title="California"><span itemprop="title">California</span></a>
        </div>
    </li>
                        <li>&gt;</li> 
    <li>
        <div itemscope itemtype="http://data-vocabulary.org/Breadcrumb">

                <a href="/mapsearch/auctions/ca/san-bernardino-county/" itemprop="url" title="San Bernardino County"><span itemprop="title">San Bernardino County</span></a>
        </div>
    </li>
                        <li>&gt;</li> 
    <li>
        <div itemscope itemtype="http://data-vocabulary.org/Breadcrumb">

                <a href="/mapsearch/auctions/ca/san-bernardino-county/chino-hills/" itemprop="url" title="Chino Hills"><span itemprop="title">Chino Hills</span></a>
        </div>
    </li>
                        <li>&gt;</li> 
    <li>
        <div itemscope itemtype="http://data-vocabulary.org/Breadcrumb">

                <a href="/mapsearch/auctions/ca/san-bernardino-county/chino-hills/91709/" itemprop="url" title="91709"><span itemprop="title">91709</span></a>
        </div>
    </li>
                        <li>&gt;</li> 
    <li>
        <div itemscope itemtype="http://data-vocabulary.org/Breadcrumb">

                <span itemprop="title" title="15604 Obsidian Ct">15604 Obsidian Ct</span>
        </div>
    </li>

        </ul>
    </div> 


    <div class="property-title" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress"><h1 class="property-title"  itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
<span class="address" itemprop="streetAddress">15604 OBSIDIAN CT</span>, <span class="address" itemprop="addressLocality">CHINO HILLS</span>, <span class="address" itemprop="addressRegion">CA</span> <span class="address" itemprop="postalCode">91709</span>    </h1></div>

<div class="clearfloat">
</div>


                <div class="leftContent">
                    <div class="tabContents" style="margin-top: 62px;">
                        <div class="clear"></div>
<div class="infoBody">
    
<script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];

        
        $(function ()
        {
            var gads = document.createElement('script');
            gads.async = true;
            gads.type = 'text/javascript';
            var useSSL = 'https:' == document.location.protocol;
            gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
            var node = document.getElementsByTagName('script')[0];
            node.parentNode.insertBefore(gads, node);
        });
        
</script>  

<script type='text/javascript'>
               googletag.cmd.push(function () {
                   googletag.defineSlot('/6584879/RT_TLPD1', [468, 18], 'div-gpt-ad-1350655581918-0').addService(googletag.pubads());
                   googletag.pubads().enableSingleRequest();
                   googletag.enableServices();
               });
</script> 
 <!-- RT_TLPD1 -->
<div id="div-gpt-ad-1350655581918-0" class="adtext">
    <script type='text/javascript'>
        googletag.cmd.push(function () { googletag.display('div-gpt-ad-1350655581918-0'); });
    </script>
</div>
    <div class="property-slider-container clearfix property-info-page">
    <div class="big-image customizedImg314W224H">
            <img src="/birdseyeimage/propertyimage.ashx?cs=true&amp;z=30&amp;v=N&amp;_t=635248070635922603&amp;propid=52883713&amp;latitude=33.969849&amp;longitude=-117.756538" alt="15604 Obsidian Ct, Chino Hills, CA 91709" onerror="this.src='/ui/images/Property/no_photo_L.jpg?var=1';"/>
    </div>
        <div class="property-slider-text">
    <div id="propertySnapshot">
        <ul>
            <li class="status">
                <span class="title">Status:</span><span class="marketStatus ">Auction</span>
                    <span class="subType">(Notice of Trustee&#39;s Sale)</span>
            </li>
        </ul>
        <ul class="snapshotPriceData info">
            <li class="clearfix">
                <span class="gray-text name">Est. Opening Bid:</span>
                    <span class="price value">$325,290</span>

            </li>
            <li>
                <a href="javascript:void(0);"><span class="blue-text agentContactForm agentRequestLink clearleft">Get a free professional valuation</span></a>
            </li>
        </ul>
        <ul class="snapshotPriceData info">
            <li class="clearfix">
                <span class="gray-text name">Est. payment:</span>
                    <span class="price value">$1,125/MO</span>
            </li>
            <li>
                <a id="currentMortgageRates" property-value="325290.0000" property-zip="91709" href="javascript:void(0);" class="blue-text clearleft currentMortgageRates">Compare Mortgage Rates</a>
            </li>
        </ul>
    </div>




<ul class="info clearfix">
    <li class="clearfix"><span class="name">Type</span> <span class="value">
        Single Family Residence
    </span></li>
        <li class="clearfix"><span class="name">Bedrooms</span> <span class="value">
        3
    </span></li>

        <li class="clearfix"><span class="name">Bathrooms</span> <span class="value">
        2.5
    </span></li>

        <li class="clearfix"><span class="name">Size</span> <span class="value">
        1,675 Sq Ft
    </span></li>

        <li class="clearfix"><span class="name">Lot Size</span> <span class="value">
        8,075 Sq Ft
    </span></li>

    <li class="clearfix"><span class="name">Year Built</span> <span class="value">
        1986
    </span></li>
</ul>
<ul class="info clearfix">



    <li class="clearfix"><span class="name">Bidding starts on</span> <span class="value">
        1/10/14
    </span></li>
    
    <li class="clearfix"><span class="name">Days On RealtyTrac</span> <a id="nod_onForeclosureStage"
        href="javascript:void(0);" class="blue-text clearleft">22</a> </li>                    
    <div id="nod_onForeclosureStage_Desc">
        <span class="tiparrow" id="tiparrow"></span>
        <div>
            <div>
                <h3 class="alignleft">
                    Days on RealtyTrac</h3>
            </div>
            <div class='close alignright'>
                Close
            </div>
            <div class="clear">
            </div>
            <br />
                <div class="tiptext">The number of days property has been on the RealtyTrac website in the current foreclosure stage. On average, foreclosures will be on RealtyTrac website 200-400 days before selling.</div>
        </div>
    </div>        

    <li class="clearfix"><span class="name">Estimated Value</span> <span class="value">
        $563,124
    </span></li>

        <li class="clearfix"><span class="name">Property ID</span> <span class="value">
        52883713
    </span></li>


</ul>
                                                <!-- Commented for now
<div class="homefacts_button"></div>
-->        </div>
    </div>
</div>

<div>
    <div class="detailsBlock">
        <h2>Foreclosure Details</h2>
        <br />
        <div class="property-table-block">
            <table class="foreclosure-table maxW" cellspacing="0" cellpadding="0">
    <tr class="odd">
        <td>
            <span class="foreclosureDetailLabel">Foreclosure Status
            </span>
        </td>
        <td class="data">
            <span class="value">
                Auction
            </span>
        </td>
    </tr>
    <tr class="even">
        <td>
            <span class="foreclosureDetailLabel">Recording Date
                    <div class="tooltipcontainer tipbox" style="display: none; width: 200px">
                    <span class="tiparrow" id="tiparrow2"></span>
                            Date the foreclosure document (notice of default, notice of sale) or loan document (mortgage, deed of trust, etc.) was filed with the county recorder’s office.
                    </div>
            </span>
        </td>
        <td class="data">
            <span class="value">
                    <span style = "">
12/18/13            </span>

            </span>
        </td>
    </tr>
    <tr class="odd">
        <td>
            <span class="foreclosureDetailLabel">Entered Date
        <div class="tooltipcontainer tipbox" style="display: none; width: 200px">
            <span class="tiparrow" id="tiparrow2"></span>
            Date when RealtyTrac received and posted the information.
        </div>   
            </span>
        </td>
        <td class="data">
            <span class="value">
                12/23/13
            </span>
        </td>
    </tr>
    <tr class="even">
        <td>
            <span class="foreclosureDetailLabel">Foreclosure Loan
            </span>
        </td>
        <td class="data">
            <span class="value">
                    <span style = "">
$325,290            </span>

            </span>
        </td>
    </tr>
    <tr class="odd">
        <td>
            <span class="foreclosureDetailLabel">Document Number
                    <div class="tooltipcontainer tipbox" style="display: none; width: 200px">
                    <span class="tiparrow" id="tiparrow2"></span>
                            The number assigned to the document filed with the county recorder’s office from which property information originates.
                    </div>
            </span>
        </td>
        <td class="data">
            <span class="value">
                    <span style = "">
201300540540            </span>

            </span>
        </td>
    </tr>
    <tr class="even">
        <td>
            <span class="foreclosureDetailLabel">TS Number
                    <div class="tooltipcontainer tipbox" style="display: none; width: 200px">
                    <span class="tiparrow" id="tiparrow2"></span>
                            The number assigned to a property by the trustee. Used by trustee to track status of foreclosure and auction proceedings.
                    </div>
            </span>
        </td>
        <td class="data">
            <span class="value">
                    <span style = "">
117106            </span>

            </span>
        </td>
    </tr>

            </table>
        </div>
        <div class="textBlock">
                <div>
                    Auction is the second stage of the foreclosure process. It begins when the trustee
                    or lender files a notice of sale announcing a date and location of the public foreclosure
                    auction. If the property does not sell to a 3rd party at the public auction, ownership
                    of the home will be transferred to the lender.</div>
                <a href="#" id="learnToBuyAtAuction" class="blue-text learnToBuyAtAuction">Learn how to buy at auctions</a>
                <br /> 
        </div>
    </div>
</div>

       
    


<table class="property-table maxW" cellspacing="0" cellpadding="0">
<tr>
        <th colspan="5">
            AUCTION DETAILS
        </th>
</tr>
    <tr class="odd">
        <td>
            <span class="foreclosureDetailLabel">Auction Date
                    <div class="tooltipcontainer tipbox" style="display: none; width: 200px">
                    <span class="tiparrow" id="tiparrow2"></span>
                            The tentative public auction date recorded on the foreclosure notice. The public auction cannot occur before this date, but the auction can be canceled or postponed to a later date without a new notice being recorded. RealtyTrac tracks postponements and cancellations, but you can also call the trustee to verify the date.
                    </div>
            </span>
        </td>
        <td class="data">
            <span class="value">
                    <span style = "">
1/10/2014 12:00:00 AM            </span>

            </span>
        </td>
    </tr>
    <tr class="even">
        <td>
            <span class="foreclosureDetailLabel">Opening Bid
                    <div class="tooltipcontainer tipbox" style="display: none; width: 200px">
                    <span class="tiparrow" id="tiparrow2"></span>
                            Amount set for a starting bid on the purchase of the property at the trustee&#39;s sale (auction). Usually based on the remaining loan balance still owed to the lender. In some states the trustee is allowed to include fees and costs associated with preparing for auction in the opening bid.
                    </div>
            </span>
        </td>
        <td class="data">
            <span class="value">
                    <span style = "">
$325,290            </span>

            </span>
        </td>
    </tr>
    <tr class="odd">
        <td>
            <span class="foreclosureDetailLabel">Location
            </span>
        </td>
        <td class="data">
            <span class="value">
                    <span style = "">
351 N ARROWHEAD AVE, SAN BERNARDINO, CA (MAIN ENTRANCE)            </span>

            </span>
        </td>
    </tr>


</table>
<table class="equity-table maxW" cellspacing="0" cellpadding="0">
    <tr>
        <th colspan="5">
            <h2>
                EQUITY & LOAN TO VALUE</h2>
        </th>
    </tr>
    <tr>
        <td colspan="5">
            <table class="maxW" cellspacing="0" cellpadding="0">
                <tr>
                    <td>
                            <div class="floatLeft semiCol marginTop5px">
        <table class="equitytable_partial maxW">
            <tr>
                    <th>
        <span class="foreclosureDetailLabel ">
            Estimated Value
        </span>
    </th>
    <th>
        <span class="foreclosureDetailLabel ">
            Total Loans
                <div class="tooltipcontainer tipbox" style="display: none; width: 200px; color:#666">
                    <span class="tiparrow" id="tiparrow2"></span>
                    The total of all the original loan amounts for all open loans known to exist on the property.  If only one open loan exists, the total loan amount would be the original loan amount for that one loan.
                </div>
        </span>
    </th>
    <th>
        <span class="foreclosureDetailLabel ">
            Equity
                <div class="tooltipcontainer tipbox" style="display: none; width: 200px; color:#666">
                    <span class="tiparrow" id="tiparrow2"></span>
                    Remaining property value after subtracting total value of open loans.  It is calculated by subtracting total loan amount from estimated value.
                </div>
        </span>
    </th>

            </tr>
            <tr>
                <td>
                    $563,124
                </td>
                <td>
                        <span style = "">
$318,800            </span>

                </td>
                <td>
 
                        <span style = "">
$244,324            </span>

                </td>
            </tr>
        </table>
    </div> 
    <div class="floatRight semiCol marginTop5px">
        <table class="equitytable_partial maxW">
            <tr>
                    <th>
        <span class="foreclosureDetailLabel ">
            Loan-to-Value
                <div class="tooltipcontainer tipbox" style="display: none; width: 200px; color:#666">
                    <span class="tiparrow" id="tiparrow2"></span>
                    The total value of open loans as a percentage of the estimated market value; or estimated total loan amount divided by estimated value.  If LTV is above 100 percent, it indicates the estimated total loan amount exceeds the estimated value.
                </div>
        </span>
    </th>
    <th>
        <span class="foreclosureDetailLabel ">
            Equity as a % of Mkt Value
                <div class="tooltipcontainer tipbox" style="display: none; width: 200px; color:#666">
                    <span class="tiparrow" id="tiparrow2"></span>
                    Equity amount expressed as a percent of market value.  Calculation is equity amount divided by market value.
                </div>
        </span>
    </th>

            </tr>
            <tr>
                <td>
                        <span style = "">
56.61 %            </span>

                </td>
                <td>
                        <span style = "">
43.39 %            </span>

                </td>
            </tr>
        </table>
    </div>

                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>
            <table class="maxW" cellspacing="0" cellpadding="0">
                
            </table>
        </td>
    </tr>
</table>

<table class="currentloans maxW" cellspacing="0" cellpadding="0">
<tr>
<th colspan="6" class="noBorderLeft">
        <h2>CURRENT LOANS</h2>
</th>
</tr>
    <tr class="">
        <th>
        <span class="foreclosureDetailLabel ">
            Position
                <div class="tooltipcontainer tipbox" style="display: none; width: 200px; color:#666">
                    <span class="tiparrow" id="tiparrow2"></span>
                    The position of the loan relative to the other known open loans. Loan position defines the order the lenders will be able to collect on any debt secured by the property.
                </div>
        </span>
    </th>
    <th>
        <span class="foreclosureDetailLabel ">
            Loan Date
                <div class="tooltipcontainer tipbox" style="display: none; width: 200px; color:#666">
                    <span class="tiparrow" id="tiparrow2"></span>
                    The date the loan was issued
                </div>
        </span>
    </th>
    <th>
        <span class="foreclosureDetailLabel ">
            Lender
                <div class="tooltipcontainer tipbox" style="display: none; width: 200px; color:#666">
                    <span class="tiparrow" id="tiparrow2"></span>
                    The lender that originally issued the loan to the borrower.  This is not necessarily the current lender as loans frequently change hands.
                </div>
        </span>
    </th>
    <th>
        <span class="foreclosureDetailLabel ">
            Est. Int. Rate
        </span>
    </th>
    <th>
        <span class="foreclosureDetailLabel ">
            Type
        </span>
    </th>
    <th>
        <span class="foreclosureDetailLabel ">
            Loan Amount
                <div class="tooltipcontainer tipbox" style="display: none; width: 200px; color:#666">
                    <span class="tiparrow" id="tiparrow2"></span>
                    The loan amount when the loan was first issued.
                </div>
        </span>
    </th>

    </tr>
    <tr class=odd>
                <td> 1 </td>
                <td>     <span style = "">
5/7/07            </span>
 </td>
                <td>     <span style = "">
Bank Of America            </span>
   </td>
                <td>     <span style = "">
6.39 %            </span>
 </td>
                <td>     <span style = "">
FIXED            </span>
       </td>
                <td>     <span style = "">
$318,800            </span>
 </td>               
    </tr>

</table>
<table class="additionalproperty maxW" cellspacing="0" cellpadding="0">
    <tr>
        <th colspan="5">
            <h2>
                Additional Property Info And Taxes</h2>
        </th>
    </tr>
    <tr>
        <td colspan="5">
            <div class="floatLeft semiCol setMargin">
                <table class="additionalproperty_partial maxW">
                    <tr>
    <tr class="odd">
        <td>
            <span class="foreclosureDetailLabel">Parcel Number
                    <div class="tooltipcontainer tipbox" style="display: none; width: 200px">
                    <span class="tiparrow" id="tiparrow2"></span>
                            Also known as Assessor&#39;s Parcel Number (APN), it is a unique number assigned by a taxing authority (i.e., a county) that identifies the location of a property
                    </div>
            </span>
        </td>
        <td class="data">
            <span class="value">
                    <span style = "">
1031211270000            </span>

            </span>
        </td>
    </tr>
    <tr class="even">
        <td>
            <span class="foreclosureDetailLabel">Lot Number
                    <div class="tooltipcontainer tipbox" style="display: none; width: 200px">
                    <span class="tiparrow" id="tiparrow2"></span>
                            Determined by the surveyors when the neighborhood was originally built, the number is included on the county assessor’s map of the neighborhood where the property is located.
                    </div>
            </span>
        </td>
        <td class="data">
            <span class="value">
                    <span style = "">
40                </span>

            </span>
        </td>
    </tr>

                    </tr>
                </table>
            </div>
            <div class="floatRight semiCol setMargin">
                <table class="additionalproperty_partial maxW">
                    <tr>
    <tr class="odd">
        <td>
            <span class="foreclosureDetailLabel">Land
                    <div class="tooltipcontainer tipbox" style="display: none; width: 200px">
                    <span class="tiparrow" id="tiparrow2"></span>
                            Last assessed value of the land itself (without attachments) as calculated by the county assessor’s office.
                    </div>
            </span>
        </td>
        <td class="data">
            <span class="value">
                    <span style = "">
$113,369            </span>

            </span>
        </td>
    </tr>
    <tr class="even">
        <td>
            <span class="foreclosureDetailLabel">Improvements
                    <div class="tooltipcontainer tipbox" style="display: none; width: 200px">
                    <span class="tiparrow" id="tiparrow2"></span>
                            Last assessed value of any improvements (like buildings and swimming pools) attached to the land as calculated by the county assessor’s office.
                    </div>
            </span>
        </td>
        <td class="data">
            <span class="value">
                    <span style = "">
$210,541            </span>

            </span>
        </td>
    </tr>
    <tr class="odd">
        <td>
            <span class="foreclosureDetailLabel">Total
                    <div class="tooltipcontainer tipbox" style="display: none; width: 200px">
                    <span class="tiparrow" id="tiparrow2"></span>
                            The total value of both land and improvements/attachments to the land (such as buildings) as calculated by the county tax assessor’s office on a given day. Please contact the county assessor’s office for information on how assessments are calculated in that particular county
                    </div>
            </span>
        </td>
        <td class="data">
            <span class="value">
                    <span style = "">
$323,910            </span>

            </span>
        </td>
    </tr>
    <tr class="even">
        <td>
            <span class="foreclosureDetailLabel">Taxes (2013)
            </span>
        </td>
        <td class="data">
            <span class="value">
                    <span style = "">
$3,302.47 (1.02 %)            </span>

            </span>
        </td>
    </tr>

                    </tr>
                </table>
            </div>
        </td>
    </tr>
</table>



<table class="equity-table maxW" cellspacing="0" cellpadding="0">
    <tr>
        <th colspan="3">
            <h2>Foreclosure Contact Info</h2>
        </th>
    </tr>
    <tr>
    
        <th>
        <span class="foreclosureDetailLabel ">
            Owner
        </span>
    </th>
    <th>
        <span class="foreclosureDetailLabel ">
            Trustee
                <div class="tooltipcontainer tipbox" style="display: none; width: 200px; color:#666">
                    <span class="tiparrow" id="tiparrow2"></span>
                    A party who holds a property’s “title” for the benefit of others. For foreclosure, the trustee often holds title for the benefit of both the trustor (borrower) and beneficiary (lender). Usually the trustee files the foreclosure paperwork and oversees any public auction.
                </div>
        </span>
    </th>
    <th>
        <span class="foreclosureDetailLabel ">
            Lender
                <div class="tooltipcontainer tipbox" style="display: none; width: 200px; color:#666">
                    <span class="tiparrow" id="tiparrow2"></span>
                    The original source of a loan to a borrower and the entity that initiates the foreclosure proceedings. Also referred to as a &quot;beneficiary.&quot;
                </div>
        </span>
    </th>

                                         
    </tr>
    <tr>
        <td class="equalwidth">
            <table cellpadding="2" cellspacing="2" class="setWidth200px">
                Narvasa, Raul B Et Al<br />15604 Obsidian Ct<br />Chino Hills, CA 91709
            </table>
        </td>
        <td class="equalwidth">
            <table cellpadding="2" cellspacing="2" class="setWidth200px">
                The Mortgage Law Firm PLC<br />43180 BUSINESS PARK DR STE 202<br />Temecula, CA 92590<br />619-465-8200
            </table>
        </td>
        <td class="equalwidth">
            <table cellpadding="2" cellspacing="2" class="setWidth200px">
            The Mortgage Law Firm PLC<br />43180 BUSINESS PARK DRIVE, SUITE 202<br />Temecula, CA 92590<br />619-465-8200
            
            </table>
        </td>
    </tr>
</table>


<script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];

</script>  
<script type='text/javascript'>
    googletag.cmd.push(function () {
        googletag.defineSlot('/6584879/RT_TLPD2', [468, 18], 'div-gpt-ad-1350655610461-0').addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>
<!-- RT_TLPD2 -->
 <div id='div-gpt-ad-1350655610461-0' class="adtext">
        <script type='text/javascript'>
            googletag.cmd.push(function () { googletag.display('div-gpt-ad-1350655610461-0'); });
        </script>
    </div>
<div id="leadListingFormDialog" style="display: none;" class="agentContactLeadForm">
    <div class="agent-overlay overlay">
        <a href="javascript:void(0);" class="close">Close</a>
        <h2>
            Contact the listing agent
        </h2>
        <div class="description">
            <p class="agentSpeciality silverGrayBg">
                RealtyTrac will send your information to , who will provide you with detailed
                information regarding this property.
            </p>
        </div>
        <div id="showConfirm" class="clearfix">
            <p class="successLeadItems">
                Your information has been sent to .</p>
            <p class="successLeadItems">
                If you are not contacted by the agent within the next 24 hours, please call 877-888-8722.</p>
        </div>
        <div id="contactForm" class="clearfix">            
            <br class="clearfloat" />
<form action="" id="partnerLeadForm" method="post">                <div class="field clearfix">
                    <label>
                        First Name</label>
                    <input class="text-box single-line" data-val="true" data-val-required="The FirstName field is required." id="FirstName" name="FirstName" type="text" value="" />
                    <p class="overlay_error_short" style="display: none;">
                        <span class="tip"></span>Required</p>
                </div>
                <div class="field clearfix">
                    <label>
                        Last Name</label>
                    <input class="text-box single-line" data-val="true" data-val-required="The LastName field is required." id="LastName" name="LastName" type="text" value="" />
                    <p class="overlay_error_short" style="display: none;">
                        <span class="tip"></span>Required</p>
                </div>
                <div class="field clearfix">
                    <label>
                        Email</label>
                    <input class="text-box single-line" data-val="true" data-val-required="The Email field is required." id="Email" name="Email" type="text" value="" />
                    <p class="overlay_error_short" style="display: none;">
                        <span class="tip"></span>Required</p>
                </div>
                <div class="field clearfix">
                    <label>
                        Phone</label>
                    <input class="text-box single-line" data-val="true" data-val-required="The Phone field is required." id="Phone" name="Phone" type="text" value="" />
                    <p class="overlay_error_short" style="display: none;">
                        <span class="tip"></span>Invalid</p>
                </div>
                <div class="field clearfix">
                    <label>
                        Message</label>                    
                    <textarea class="text-box multi-line" id="Message" name="Message">
</textarea>
                </div>
<input id="ListingAgentName" name="ListingAgentName" type="hidden" value="" /><input id="ListingAgentEmail" name="ListingAgentEmail" type="hidden" value="" /><input data-val="true" data-val-number="The field UserId must be a number." data-val-required="The UserId field is required." id="UserId" name="UserId" type="hidden" value="115909063" /><input data-val="true" data-val-number="The field PartnerLeadId must be a number." id="PartnerLeadId" name="PartnerLeadId" type="hidden" value="0" /><input data-val="true" data-val-number="The field PropertyId must be a number." id="PropertyId" name="PropertyId" type="hidden" value="52883713" /><input id="PropertyAddress" name="PropertyAddress" type="hidden" value="15604 Obsidian Ct, Chino Hills, CA 91709" />                <div class="field clearfix marginLeft60px">
                    <input type="submit" id="partnerLeadSubmit" class="color_button submitBtn" value="Contact Agent"/>
                </div>
                <div class="field clearfix marginLeft60px">By clicking above you agree to our</div>
                <div class="field clearfix everbluelink marginLeft60px">
                    <a target="_blank" href="/pub/terms.html" name="&amp;lid=Terms - Footer"><u>Terms of Use</u></a> and <a target="_blank" href="/pub/privacy.html" name="&amp;lid=Terms - Footer"><u>Privacy Policy</u></a>
                </div>
</form>        </div>
    </div>
</div>
<script type="text/javascript">
    $(function () {

        $("#partnerLeadSubmit").click(function (event) {

            event.preventDefault();
            SubmitListingAgent();
        });
    });
</script>
    <div id="AwaitingAuctionStatusMessage" style="display: none;">
        <div class="corner">
        </div>
        <a href="javascript:void(0);" onclick="$('#AwaitingAuctionStatusMessage').hide();"
            id="cnt-close" class="close"></a>
        <div class="content">
            <h1>
                AWAITING UPDATE ON AUCTION STATUS</h1>
            <p>
                The most recently scheduled auction date for this property has passed and we are
                awaiting a status update. Possible updates include auction cancellation, auction
                postponement with a new auction date, or transfer to the lender, in which case the
                property would be classified as bank owned (REO).
            </p>
        </div>
    </div>

                    </div>

                    <div style="position:absolute;top:64px;">
<div class="property-tab rtTabs">
    <div class="tabs" title="15604 Obsidian Ct, Chino Hills, CA, 91709, home property information">
        <ul style="z-index:0;">
                        <li class="active"><a><span class="text">Property Info</span></a></li>
                        <li><a href="/propertydetails/ca/chino-hills/91709/obsidian-ct/history/52883713"><span class="text">History</span></a></li>
                        <li><a href="/propertydetails/ca/chino-hills/91709/obsidian-ct/comps/52883713"><span class="text">Comps</span></a></li>
                        <li><a href="/propertydetails/ca/chino-hills/91709/obsidian-ct/schools/52883713"><span class="text">Schools</span></a></li>
                        <li><a href="/propertydetails/ca/chino-hills/91709/obsidian-ct/environment/52883713"><span class="text">Environment</span></a></li>
                        <li><a href="/propertydetails/ca/chino-hills/91709/obsidian-ct/economics/52883713"><span class="text">Economics</span></a></li>
                        <li><a href="/propertydetails/ca/chino-hills/91709/obsidian-ct/map/52883713"><span class="text">Map</span></a></li>
            
            
                        <li><a href="/propertydetails/ca/chino-hills/91709/obsidian-ct/trends/52883713"><span class="text">Trends</span></a></li>
        </ul>
    </div>
</div>
                    




<div class="tab-content active">
    <div class="property-user-toolbox">
        <ul class="toolbarlist">

                <li id="addReportIssue" class="" onclick="showPopUpReportIssueDialog(49095020, 52883713, &#39;http://www.realtytrac.com/propertydetails/ca/chino-hills/91709/obsidian-ct/52883713&#39;, &#39;NoticeOfForeclosureSale&#39;, &#39;15604 Obsidian Ct, Chino Hills, CA 91709&#39;)" >
        <div class = "issue">
        </div>
        REPORT ISSUE
    </li>

                <li id="" class="agentContactForm toolbarAgentLink" onclick="" >
        <div class = "agent">
        </div>
        CONTACT AGENT
    </li>

                <li id="li_notes" class="" onclick="" >
        <div class = "notes">
        </div>
        NOTES
    </li>

            
                <li id="li_flyer" class="" onclick="OnFlyerClick(49095020, 0)" >
        <div class = "flyer">
        </div>
        FLYER
    </li>

    <li id="" class="share-menu-parent" onclick="PropertyTooltip.ShareInit([{&#39;PropertyID&#39;:&#39;52883713&#39;,&#39;PropertyParcelID&#39;:&#39;0&#39;,&#39;PropertyStatus&#39;:&#39;NoticeOfForeclosureSale&#39;,&#39;Address&#39;:&#39;Obsidian Ct, Chino Hills, CA 91709&#39;,&#39;PriceType&#39;:&#39;Est. Opening Bid&#39;,&#39;Price&#39;:&#39;325290.0000&#39;,&#39;ImageUrl&#39;:&#39;http://www.realtytrac.com/images/image_na.gif&#39;,&#39;PropertyDetailUrl&#39;:&#39;http://www.realtytrac.com/propertydetails/ca/chino-hills/91709/obsidian-ct/52883713&#39;,&#39;MapSearchUrl&#39;:&#39;http://www.realtytrac.com/mapsearch/ca/san-bernardino-county/chino-hills/91709/?address=15604 obsidian ct, chino hills, ca 91709&amp;lat=33.969849&amp;lon=-117.756538&#39;}], &#39;3&#39;, &#39;2.50&#39;, &#39;&#39;); PropertyTooltip.ShareMenuClick(&#39;#shareMenuList52883713&#39;);" >
        <div class = "share">
        </div>
        SHARE
    </li>
                <li id="openAddCollectionPopup" class="" onclick="showPopUpCollectionDialog(this,49095020, 52883713)" >
        <div class = "collect">
        </div>
        COLLECT
    </li>

<li class="clickSave"  parcelid="49095020"  propertyid="52883713" propertyWatchSettingId="0">
    <div class="save"></div> 
   <span id="savedButtonText" class="savespan">Save</span> 
</li>
            
 
        </ul>

<div class="rating4">
        
        <div id="myratingId" class="parent_rating">
                MY RATING
            </div>
        
    <div  style="display: inline-block;" parcelid="49095020"  propertyid="52883713" propertyWatchSettingId="0"  currentrating="0" userid="115909063"  class="rate_widget">
            <div id="1" class="star_1 ratings_stars" text="Bad">
            </div>
            <div id="2" class="star_2 ratings_stars" text="Not Bad">
            </div>
            <div id="3" class="star_3 ratings_stars" text="Average">
            </div>
            <div id="4" class="star_4 ratings_stars" text="Good">
            </div>
            <div id="5" class="star_5 ratings_stars" text="Very Good">
            </div>
        
    </div>
</div>
        

<div id="note-toolbox" parcelid="49095020"  propertyid="52883713" propertyWatchSettingId="0">                       
    <div class="note_box_closed">
        <div id="note_text"></div>
        <div class="note_box_links_closed"><a href="javascript:void(0);" onclick="openNotes();">View</a>  | <a href="javascript:void(0);" onclick="DeleteNotes();">Delete</a></div>                                
    </div>
    <div id="notestTabImage" class="note_tab_closed" onclick="ToggleNotes();"><div class="note"></div>NOTES</div>
</div>

<div id="deleteDialog" class="modal_dialog" style="z-index: 999;">	
    <p>Are you sure want to delete the notes for this property ?</p>	  
    <div id="deleteNotesModal" class="dialogbuttonsCentered">
        <span>
            <input value="CANCEL" type="button" class="grey_button" onclick="$('#deleteDialog').overlay().close();" />
            <input value="DELETE" type="button" class="grey_button" onclick="DeleteNotesConfirm(); $('#deleteDialog').overlay().close();" />
        </span>
    </div>
</div>
<div id="disgardChangesDialog" class="modal_dialog" style="z-index: 999;">	
    <p>Norma, you have made changes to your notes on this property without saving !</p>	
    <div id="disgardNotesModal" class="dialogbuttonsCentered">
        <span>
            <input value="DISCARD CHANGES" type="button" class="grey_button_large"  onclick="$('#disgardChangesDialog').removeAttr('save'); $('#disgardChangesDialog').overlay().close();" />
            <input value="SAVE MY CHANGE" type="button" class="grey_button_large" onclick="$('#disgardChangesDialog').attr('save', true); $('#disgardChangesDialog').overlay().close(); $('#notes_save_link').click();" />
        </span>
    </div>
</div>
<div id="errorMessPop" class="modal_dialog">
    <div id="errorMess"></div>
<div style="margin: 0 auto; text-align:center; width:180px; margin-top:20px;text-transform:uppercase" class="color_link">
    <a href="javascript:;" onclick="$('#errorMessPop').overlay().close();">Ok</a>
    </div>
    <div style="clear:both"></div>
    <div id="errorMessHelp">Need help? Contact customer service at 877-888-8722</div>
</div>    </div>
        <div id="shareMenuList52883713" ncid="shareMenuList" class="share-menu-list-container " style="display: none;">
            <a class="shareMenu prev" href="javascript:void;" onclick="PropertyTooltip.ShareWithEmailClick();">
                Share Via Email</a> <a class="shareMenu next last" href="javascript:void;" onclick="PropertyTooltip.ShareWithFacebookClick();">
                    Share With Facebook</a>
            <div class="top-corner">
            </div>
        </div>
    <div id="shareViaEmail" class="share-email-overlay overlay" style="display: none;">
    <a id="closeLink" href="javascript:void(0)" class="close">Close</a>
    <div class="clearfix content-panel">
        <div id="shareViaEmailContent">
            <h2>Share This Property</h2>
            <p style="color:#a7a6a4;">Share property details with friends, family or clients</p>
				<div class="section validation">
				    <span id="sentEmailError" class="error" style="display: none;">Sorry. Email hasn't been sent.</span>
				    <span id="emptyEmailError" class="error" style="display: none;">Please enter an email address</span> 
                <span id="invalidEmailError"class="error" style="display: none;">The email address is not valid</span>
            </div>
            <div class="section clearfix">
                <div class="title"><br />Share With</div>
                <div class="inputs">
                    <input id="txtMailList" type="text" /><input type="button" class="add" value="+" onclick="$('#savedContacts').toggle();" /></div>
            </div>
            <div class="section"><p>*Separate multiple emails with a comma.</p></div>
            
            <div class="section validation">
                <span id="emptyUserEmailError" class="error" style="display: none;">Please enter an email address</span> 
                <span id="invalidUserEmailError" class="error" style="display: none;">The email address is not valid</span>
            </div>
            <div class="section clearfix">
                <div class="title"><br />Your Email</div>
                <div class="inputs">
                    <input id="txtUserEmail" type="text" value="normajbarefield@mailinator.com"/></div>
            </div>
            
            <div class="section validation">
                <span id="emptyNameError" class="error" style="display: none;">Please enter your name</span>
            </div>
            <div class="section clearfix">
                <div class="title"><br />Your Name</div>
                <div class="inputs">
                    <input id="txtUserName" type="text" value="Norma " /></div>
            </div>
            <div class="section clearfix"><div class="title">&nbsp;</div>
                <div class="inputs"><input type="button" value="Share" onclick="PropertyTooltip.SharePropertyClick();" /></div>
            </div>
        </div>
        <div id="shareViaEmailOk" style="display: none;">
            <h2>Shared Successfully!</h2>
            <p>You have successfully shared this property with:</p>
            <ul id="sharedList"></ul>
            <br />
            <p><a href="javascript:void;" onclick="$('#closeLink').click();">Close this dialog</a></p>
        </div>
        <div id="savedContacts" class="contact_list">
            <p class="saved_contacts_title">Choose from your saved contacts</p>
            <div id="contacts_cont">

            </div>
            <div class="seperate_line"></div>
            <form id="frmAddContact">
                <div id="addContactForm" class="add_contact_form">
                    <table cellpadding="3" cellspacing="3">
                        <tr>
                            <td class="label">Name</td>
                            <td><input type="text" id="newContactName" name="newContactName"/></td>
                        </tr>
                        <tr>
                          <td colspan="2" style="height:10px"></td>
                        </tr>
                        <tr>
                            <td class="section validation" colspan="2">
                                <span id="emptyNewEmailError" class="error" style="display: none;">Please enter an email
                                    address</span> <span id="invalidNewEmailError" class="error" style="display: none;">
                                        The email address is not valid</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">Email</td>
                            <td><input type="text" id="newContactEmail" name="newContactEmail"/></td>
                        </tr>
                        <tr>
                            <td class="label"></td>
                            <td><a href="javascript:void;" onclick="addContact();">Add Contact</a></td>
                        </tr>
                    </table>
                </div>
            </form>
            <a class="add_more_button closed" href="javascript:void" onclick="toggleContactForm();">Add More</a>
            <div class="clear"></div>
            <input type="button"  value="DONE" onclick="var x=[];$('#savedContacts  input:checked[type=checkbox]').each(function(i, el){x[i] = el.value;}); $('#txtMailList').attr('value', x.join(', '));$('#savedContacts input[type=checkbox]').attr('checked', false);$('#savedContacts').hide();" />
            <input type="button" class="link"  value="Cancel" onclick="$('#savedContacts input[type=checkbox]').attr('checked', false);$('#savedContacts').hide();" />
        </div>
    </div>
</div>

</div>
                    </div>
                    
                </div>
                <div class="rightContent">
                         
        





    <div id="howToBuyWidget">
            
            <h1>HOW TO BUY THIS HOME</h1>

                <p class="itemText">Buying an unlisted auction requires that you attend the public sale of the home and usually requires that you purchase the property with cash. If the public sale date is weeks away, there may still be time to buy from the homeowner prior to the auction.</p>
            
            

                
    


            
            
            <h1>Next Steps</h1>

            
            

                
        <ul class="    
        numeric-ul
    
">
                
                    
        <li>View the Auction Details on this page to confirm the public sale date, time and location.</li>
    

                
                
                    
        <li>            <a href="javascript:void(0);">
                <span class="blue-text agentContactForm agentRequestLinkHowToBuy clearleft">Contact a local agent for help</span>
            </a>
</li>
    

                
                
                    
        <li>Have your agent contact the homeowner to express interest in the property, or attend the auction and bid on the property.</li>
    

                
        </ul>
    


            
            
            <h1>Additional Resources</h1>

            
            

                
        <ul class="    
        notnumeric-ul
    
">
                
                    
        <li>            <a href="javascript:void(0);" class="blue-text learnToBuyAtAuction">Read more about buying auctions</a>
</li>
    

                
                
                    
        <li>            
            <a id="mortgageRates" property-value="325290.0000" property-zip="91709" href="javascript:void(0);" class="blue-text clearleft currentMortgageRates">Check current mortgage rates</a>
            
</li>
    

                
                
                    
        <li>            <a href="http://www.realtytrac.com/training/foreclosurebuying101.html" target="_blank" class="blue-text">View our Foreclosure Buying 101 webinar</a>
</li>
    

                
                
                    
        <li>            <a href="https://www.gofreecredit.com/r/520a8684ed/?fname=&lname=&zip=&email=&phone1=&address1=&city=&state=&subid=" target="_blank" class="blue-text">Get your free credit score</a>
</li>
    

                
        </ul>
    


            
    </div>

                        <div class="sidebar">
            <div class="agentBanner real-estate-specialist sidebar-widget clearfix agentContactLeadForm onMapBanner">
            <h2 class="overlayheader newbanner">
GET INFO ON THIS HOME</h2>

            <span class="newpremier" style="display:none;"></span>    
        <div class="content clearfix agent-overlay" style="margin-top:-10px">
            <div class="thumb" style="width:80px">    <img src="/ui/images/default_agent_avatar.jpg" alt="" width="80px" height="100px" class="agentImage" onerror="this.src='/ui/images/default_agent_avatar.jpg';" style="margin-right:5px;"/>
</div>
            <div class="descriptionnewbanner" >
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="">
                                <div class="otherInfo">
                                                                        
                                </div>
                            </td>
                             </tr>
                             <tr>
                                 <td style="vertical-align: bottom">
                                 </td>
                        </tr>
                    </table>
                            <p class="agentSpeciality">
                                Get information on these properties from a local real estate agent
                            </p>
            </div>
            <br class="clearfloat" />
                    <ul class="tabContent no-dragg">
                <li class=active c-index="1">
                    
                    <form id="agentLeadFormInternal" class="contactItems">
                        <div class="agentUserTypeSelect field2 clearfix"  style="display: none;" >
      
        <select data-val="true" data-val-required="The Type field is required." id="Type" name="Type"><option value="Seller">Requesting a professional valuation</option>
<option selected="selected" value="Buyer">Interested in buying this home</option>
<option value="Seller">Interested in selling this home</option>
</select>
        <p class="overlay_error_short" style="display: none;">
            <span class="tip"></span>Required</p>
    </div>
    <div class="field2 clearfix">        
<input data-val="true" data-val-required="The Name field is required." id="Name" name="Name" type="text" value="Norma " />        <p class="overlay_error_short" style="display: none;">
            <span class="tip"></span>Required</p>
    </div>
    <div class="field2 clearfix">
<input data-val="true" data-val-required="The Phone field is required." id="Phone" name="Phone" type="text" value="4783696384" />        
        <p class="overlay_error_short" style="display: none;">
            <span class="tip"></span>Invalid</p>
    </div>
    <div class="field2 clearfix">
<input data-val="true" data-val-required="The Email field is required." id="Email" name="Email" type="text" value="normajbarefield@mailinator.com" />        <p class="overlay_error_short" style="display: none;">
            <span class="tip"></span>Required</p>
    </div>
    <div class="field clearfix" style="float:left;">
        <input type="button" class="agentcolor_button submitBtn contactAgentButton" value="CONTACT AGENT" onclick="SubmitAgentLeadInternal(&#39;PropDetails&#39;);" />
    </div>
            <div class="field2adlink fontbold">Are you a real estate agent? <a target="_blank" href="/agentproduct/premier">Advertise here</a></div>
<input id="Address" name="Address" type="hidden" value="15604 Obsidian Ct" /><input id="City" name="City" type="hidden" value="Chino Hills" /><input id="CountyCode" name="CountyCode" type="hidden" value="" /><input id="Zip" name="Zip" type="hidden" value="91709" /><input id="StateCode" name="StateCode" type="hidden" value="CA" /><input data-val="true" data-val-number="The field ParcelID must be a number." id="ParcelID" name="ParcelID" type="hidden" value="49095020" /><input data-val="true" data-val-number="The field PropertyID must be a number." id="PropertyID" name="PropertyID" type="hidden" value="52883713" /><input data-val="true" data-val-required="The IsNearBy field is required." id="IsNearBy" name="IsNearBy" type="hidden" value="True" /><input class="agentLeadSourceType" data-val="true" data-val-required="The LeadSource field is required." id="LeadSource" name="LeadSource" type="hidden" value="LTPD" />    <input name="AgentPK" type="hidden" value="76994" />

                    </form>
                        <p class="success successItems">
        <br />
        Thank You!</p>
    <p class="successItems">
        Your info has been successfully sent.</p>   
    <p class="successItems">
        If you are not contacted by the agent within 24 hours, please call 877-888-8722.</p>

                </li>
                    </ul>
            
                       
            <div id="agent-search-div">
            </div>
                        
            <br class="clearfloat" />
        </div>
    </div>
    <div id="agentOverlayContainer" style="display: none;" class="agentContactLeadForm">
        <div class="agent-overlay overlay fixOverlayPosition">
            <a href="javascript:void(0);" class="close">Close</a>
            <h2 class="overlayheader">
GET INFO ON THIS HOME            </h2>
                <span class="mapPremier" style="display:none;">Premier</span>    
            <div id="contactForm" class="profile clearfix">
                <div class="contact_form_inner_cont">
                    <img id="imgAgentPic" src="/ui/images/default_agent_avatar.jpg" alt="" width="67" class="agentImage" onerror="this.src='/ui/images/default_agent_avatar.jpg';" />
                    <div class="description">
                        <p class="name submitForm">
                                                                                </p>
                        <p class="agentSpeciality">
Get information on these properties from a local real estate agent                        </p>
                    </div>
                    <br class="clearfloat" />
                </div>
                    <form id="agentLeadForm" class="contactItems">
                        <div class="agentUserTypeSelect field2 clearfix"  style="display: none;" >
      
        <select id="Type" name="Type"><option value="Seller">Requesting a professional valuation</option>
<option selected="selected" value="Buyer">Interested in buying this home</option>
<option value="Seller">Interested in selling this home</option>
</select>
        <p class="overlay_error_short" style="display: none;">
            <span class="tip"></span>Required</p>
    </div>
    <div class="field2 clearfix">        
<input id="Name" name="Name" type="text" value="Norma " />        <p class="overlay_error_short" style="display: none;">
            <span class="tip"></span>Required</p>
    </div>
    <div class="field2 clearfix">
<input id="Phone" name="Phone" type="text" value="4783696384" />        
        <p class="overlay_error_short" style="display: none;">
            <span class="tip"></span>Invalid</p>
    </div>
    <div class="field2 clearfix">
<input id="Email" name="Email" type="text" value="normajbarefield@mailinator.com" />        <p class="overlay_error_short" style="display: none;">
            <span class="tip"></span>Required</p>
    </div>
    <div class="field clearfix" style="float:left;">
        <input type="button" class="agentcolor_button submitBtn contactAgentButton" value="CONTACT AGENT" onclick="SubmitAgentLead(&#39;PropDetails&#39;);" />
    </div>
            <div class="field2adlink fontbold">Are you a real estate agent? <a target="_blank" href="/agentproduct/premier">Advertise here</a></div>
<input id="Address" name="Address" type="hidden" value="15604 Obsidian Ct" /><input id="City" name="City" type="hidden" value="Chino Hills" /><input id="CountyCode" name="CountyCode" type="hidden" value="" /><input id="Zip" name="Zip" type="hidden" value="91709" /><input id="StateCode" name="StateCode" type="hidden" value="CA" /><input id="ParcelID" name="ParcelID" type="hidden" value="49095020" /><input id="PropertyID" name="PropertyID" type="hidden" value="52883713" /><input id="IsNearBy" name="IsNearBy" type="hidden" value="True" /><input class="agentLeadSourceType" id="LeadSource" name="LeadSource" type="hidden" value="LTPD" />    <input name="AgentPK" type="hidden" value="76994" />

                    </form>
                    <p class="success successItems">
        <br />
        Thank You!</p>
    <p class="successItems">
        Your info has been successfully sent.</p>   
    <p class="successItems">
        If you are not contacted by the agent within 24 hours, please call 877-888-8722.</p>

            </div>
        </div>
    </div>
    <script type="text/javascript">
           

        //GA tracking for broker
        var GAID = "";
        //check is GAID already shown
        if (GAID != "") {
            _gaq.push(['_setAccount', GAID],
              ['_trackPageview']);           

        }       
        </script>
        <div class="rightsidebarpaddingbottom">
        </div>
        <div>

<script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];

</script>  

<script type='text/javascript'>
    googletag.cmd.push(function () {
        googletag.defineSlot('/6584879/RT_PROPERTY_RECTANGLE_1', [300, 250], 'div-gpt-ad-1358896157878-1').addService(googletag.pubads()).setTargeting('stateabbr', 'CA');
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>
<!-- RT_Property_Details_Rectangle_1 -->
<div id='div-gpt-ad-1358896157878-1' style='width:300px; height:250px;'>
<script type='text/javascript'>
    googletag.cmd.push(function () { googletag.display('div-gpt-ad-1358896157878-1'); });
</script>
</div>
</div>
        <div class="rightsidebarpaddingbottom">
        </div>
    <script type="text/javascript">
    $(function () { LoadRecentSearchesSideBar(); });
</script>

<div class="clear"></div>
<div class="recentPropertiesPlaceholder">
</div>
<div class="clearfix"></div>
    <div class="rightsidebarpaddingbottom">
    </div>
<div>

<script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];

</script>  

<script type='text/javascript'>
    googletag.cmd.push(function () {
        googletag.defineSlot('/6584879/RT_PROPERTY_RECTANGLE_2', [300, 250], 'div-gpt-ad-1358896157878-2').addService(googletag.pubads()).setTargeting('stateabbr', 'CA');
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>
<!-- RT_Property_Details_Rectangle_2 -->
<div id='div-gpt-ad-1358896157878-2' style='width:300px; height:250px;'>
<script type='text/javascript'>
    googletag.cmd.push(function () { googletag.display('div-gpt-ad-1358896157878-2'); });
</script>
</div>


</div>
        <div class="rightsidebarpaddingbottom">
        </div>
     <div>

<script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];

</script>  

<script type='text/javascript'>
    googletag.cmd.push(function () {
        googletag.defineSlot('/6584879/RT_PROPERTY_RECTANGLE_3', [300, 250], 'div-gpt-ad-1378851244811-0').addService(googletag.pubads()).setTargeting('stateabbr', 'CA');
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>
<!-- RT_Property_Details_Rectangle_3 -->
<div id='div-gpt-ad-1378851244811-0' style='width:300px; height:250px;'>
   
<script type='text/javascript'>
    googletag.cmd.push(function () { googletag.display('div-gpt-ad-1378851244811-0'); });
</script>
</div>


</div>
        <div class="rightsidebarpaddingbottom">
           
        </div>
     <div>

<script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];

</script>  

<script type='text/javascript'>
    googletag.cmd.push(function () {
        googletag.defineSlot('/6584879/RT_PROPERTY_RECTANGLE_4', [300, 250], 'div-gpt-ad-1378851244811-1').addService(googletag.pubads()).setTargeting('stateabbr', 'CA');
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>
<!-- RT_Property_Details_Rectangle_4 -->
<div id='div-gpt-ad-1378851244811-1' style='width:300px; height:250px;'>
   
<script type='text/javascript'>
    googletag.cmd.push(function () { googletag.display('div-gpt-ad-1378851244811-1'); });
</script>
</div>


</div>
        <div class="rightsidebarpaddingbottom">
          
        </div>
</div>
                </div>
     <br />
    <div class="Nearbycontainer" >
   
        <div class="Nearbytitle">
            SELECT NEARBY FORECLOSURE & BANK OWNED PROPERTIES
        </div>
            <div class="Nearbyitem">
                    <div class="Nearbyimage">
        <img src="/ui/images/jpeg.jpeg" height = "30" alt="16593 Catena Dr, Chino Hills, CA 91709" onerror="this.src='/ui/images/Property/no_photo_XS.jpg?var=1';"/>
    </div>
    <div class="Nearbydescription">
        <a href="/propertydetails/ca/chino-hills/91709/16593-catena-dr/51848357" title="16593 Catena Dr,Chino Hills, CA 91709">16593 Catena Dr</a>
    </div>
    <div class="Nearbyprice">
        NA
    </div>
    <div class="Nearbydistance">
        0.50 Miles away
    </div>
    <div class="Nearbystatus">
        Auction
    </div>


            </div>
            <div class="Nearbyitem NearbyaltItem">
                    <div class="Nearbyimage">
        <img src="/ui/images/jpeg-1.jpeg" height = "30" alt="2263 Vellano Club Dr, Chino Hills, CA 91709" onerror="this.src='/ui/images/Property/no_photo_XS.jpg?var=1';"/>
    </div>
    <div class="Nearbydescription">
        <a href="/propertydetails/ca/chino-hills/91709/2263-vellano-club-dr/45933592" title="2263 Vellano Club Dr,Chino Hills, CA 91709">2263 Vellano Club Dr</a>
    </div>
    <div class="Nearbyprice">
        $1,275,000
    </div>
    <div class="Nearbydistance">
        0.69 Miles away
    </div>
    <div class="Nearbystatus">
        Bank Owned
    </div>


            </div>
            <div class="Nearbyitem">
                    <div class="Nearbyimage">
        <img src="/ui/images/jpeg-2.jpeg" height = "30" alt="16263 Rainbow Ridge Rd, Chino Hills, CA 91709" onerror="this.src='/ui/images/Property/no_photo_XS.jpg?var=1';"/>
    </div>
    <div class="Nearbydescription">
        <a href="/propertydetails/ca/chino-hills/91709/16263-rainbow-ridge-rd/52918216" title="16263 Rainbow Ridge Rd,Chino Hills, CA 91709">16263 Rainbow Ridge Rd</a>
    </div>
    <div class="Nearbyprice">
        $1,266,094
    </div>
    <div class="Nearbydistance">
        0.91 Miles away
    </div>
    <div class="Nearbystatus">
        Auction
    </div>


            </div>
            <div class="Nearbyitem NearbyaltItem">
                    <div class="Nearbyimage">
        <img src="/ui/images/jpeg-3.jpeg" height = "30" alt="16825 Hay Dr, Chino Hills, CA 91709" onerror="this.src='/ui/images/Property/no_photo_XS.jpg?var=1';"/>
    </div>
    <div class="Nearbydescription">
        <a href="/propertydetails/ca/chino-hills/91709/16825-hay-dr/48342069" title="16825 Hay Dr,Chino Hills, CA 91709">16825 Hay Dr</a>
    </div>
    <div class="Nearbyprice">
        $230,405
    </div>
    <div class="Nearbydistance">
        1.38 Miles away
    </div>
    <div class="Nearbystatus">
        Bank Owned
    </div>


            </div>
            <div class="Nearbyitem">
                    <div class="Nearbyimage">
        <img src="/ui/images/jpeg-4.jpeg" height = "30" alt="15995 Oak Hill Dr, Chino Hills, CA 91709" onerror="this.src='/ui/images/Property/no_photo_XS.jpg?var=1';"/>
    </div>
    <div class="Nearbydescription">
        <a href="/propertydetails/ca/chino-hills/91709/15995-oak-hill-dr/52628279" title="15995 Oak Hill Dr,Chino Hills, CA 91709">15995 Oak Hill Dr</a>
    </div>
    <div class="Nearbyprice">
        $458,490
    </div>
    <div class="Nearbydistance">
        1.48 Miles away
    </div>
    <div class="Nearbystatus">
        Auction
    </div>


            </div>

    </div>
    <div class="Nearbycontainer" >
   
        <div class="Nearbytitle">
            NEARBY REAL ESTATE LISTINGS
        </div>
            <div class="Nearbyitem">
                    <div class="Nearbyimage">
        <img src="http://i1.realtytrac.com/rnshared/pics/mls/crmls/71636110/tn.jpg" height = "30" alt="2403 Milano # TE, Chino Hills, CA 91709" onerror="this.src='/ui/images/Property/no_photo_XS.jpg?var=1';"/>
    </div>
    <div class="Nearbydescription">
        <a href="/property/ca/chino-hills/91709/2403-milano-te/219399892" title="2403 Milano # TE,Chino Hills, CA 91709">2403 Milano # TE</a>
    </div>
    <div class="Nearbyprice">
        $1,890,000
    </div>
    <div class="Nearbydistance">
        NA Miles away
    </div>
    <div class="Nearbystatus">
        For Sale
    </div>


            </div>
            <div class="Nearbyitem NearbyaltItem">
                    <div class="Nearbyimage">
        <img src="http://i1.realtytrac.com/rnshared/pics/mls/crmls/70015309/tn.jpg" height = "30" alt="2355 Milano # Te, Chino Hills, CA 91709" onerror="this.src='/ui/images/Property/no_photo_XS.jpg?var=1';"/>
    </div>
    <div class="Nearbydescription">
        <a href="/property/ca/chino-hills/91709/2355-milano-te/216958690" title="2355 Milano # Te,Chino Hills, CA 91709">2355 Milano # Te</a>
    </div>
    <div class="Nearbyprice">
        $1,888,000
    </div>
    <div class="Nearbydistance">
        0.09 Miles away
    </div>
    <div class="Nearbystatus">
        For Sale
    </div>


            </div>
            <div class="Nearbyitem">
                    <div class="Nearbyimage">
        <img src="http://i2.realtytrac.com/rnshared/pics/mls/crmls/66051994/tn.jpg" height = "30" alt="2268 Verona Ct, Chino Hills, CA 91709" onerror="this.src='/ui/images/Property/no_photo_XS.jpg?var=1';"/>
    </div>
    <div class="Nearbydescription">
        <a href="/property/ca/chino-hills/91709/2268-verona-ct/216337382" title="2268 Verona Ct,Chino Hills, CA 91709">2268 Verona Ct</a>
    </div>
    <div class="Nearbyprice">
        $3,880,000
    </div>
    <div class="Nearbydistance">
        0.22 Miles away
    </div>
    <div class="Nearbystatus">
        For Sale
    </div>


            </div>
            <div class="Nearbyitem NearbyaltItem">
                    <div class="Nearbyimage">
        <img src="http://i1.realtytrac.com/rnshared/pics/mls/crmls/72504327/tn.jpg" height = "30" alt="16683 Catena Dr, Chino Hills, CA 91709" onerror="this.src='/ui/images/Property/no_photo_XS.jpg?var=1';"/>
    </div>
    <div class="Nearbydescription">
        <a href="/property/ca/chino-hills/91709/16683-catena-dr/14298245" title="16683 Catena Dr,Chino Hills, CA 91709">16683 Catena Dr</a>
    </div>
    <div class="Nearbyprice">
        $2,099,999
    </div>
    <div class="Nearbydistance">
        0.41 Miles away
    </div>
    <div class="Nearbystatus">
        For Sale
    </div>


            </div>
            <div class="Nearbyitem">
                    <div class="Nearbyimage">
        <img src="http://i2.realtytrac.com/rnshared/pics/mls/crmls/72664376/tn.jpg" height = "30" alt="16665 Catena Dr, Chino Hills, CA 91709" onerror="this.src='/ui/images/Property/no_photo_XS.jpg?var=1';"/>
    </div>
    <div class="Nearbydescription">
        <a href="/property/ca/chino-hills/91709/16665-catena-dr/14112108" title="16665 Catena Dr,Chino Hills, CA 91709">16665 Catena Dr</a>
    </div>
    <div class="Nearbyprice">
        $2,680,000
    </div>
    <div class="Nearbydistance">
        0.44 Miles away
    </div>
    <div class="Nearbystatus">
        For Sale
    </div>


            </div>

    </div>
                <div class="sponsored-partner-links" style="width: 610px; float: left; clear: none;
                    margin-top: 0;">
                    <div class="industryBrains">
    <div id="divSponsorAds">
    </div>
</div>

<script type="text/javascript">
    if (typeof($) != "undefined")
    {
    	$(document).ready(function () {
    		var script = document.createElement('script');
    		script.src = '/adser/textlinksver2.ashx?rnd=' + Math.floor(Math.random() * 10001);
    		script.type = 'text/javascript';
    		script.charset = 'UTF-8';
    		document.getElementById('divSponsorAds').appendChild(script);
    	});
    }
</script>
                </div>
                <div class="clear">
                </div>
            </div>
            <div>
                <span class="property-bottom-text">The information at this site is provided solely for
                    informational purposes and does not constitute an offer to sell, rent, or advertise
                    real estate outside the state in which the owner of the site is licensed. The owner
                    is not making any warranties or representations concerning any of these properties
                    including their availability. Information at this site and its property ratings
                    are deemed reliable but not guaranteed and should be independently verified. Any
                    redistribution or resale is strictly prohibited. All trademarks herein are property
                    of their respective owners.
                    <br />
                    <br />
                    Properties on this site labeled as Bank-Owned may be owned by the bank or managed
                    by the bank for others. 
                </span>
                <br />
            </div>
<!--begin footer-->
<div class="footer">
    <div class="trademarks">
        <p><span style="width:180px;">&nbsp;</span>&copy; 1996-<script language="javascript" type="text/javascript"> var giYear = new Date(); document.write(giYear.getFullYear())</script> Renwood RealtyTrac LLC. All Rights reserved | 
        <a href="/pub/privacy.html" name="&lid=Privacy - Footer" target="_blank" >Privacy</a> | 
        <a href="/pub/terms.html" name="&lid=Terms - Footer" target="_blank" >Terms of Use</a>
        <span class="socialNetsFooter">
            <a href="http://www.facebook.com/realtytrac" id="lnkFbFooter" name="fb - Footer" target="_blank" class="fbImgFooter"></a>
            <a href="http://twitter.com/realtytrac" id="lnkTwFooter" name="tw - Footer" target="_blank" class="twImgFooter"></a>
            <a href="http://www.youtube.com/user/realtytrac" id="lnkYtFooter" name="yt - Footer" target="_blank" class="ytImgFooter"></a>
        </span>
        </p>        
    </div>
    
    <div class="footer_links">
        <p>
                Inside RealtyTrac             
    <a href="/mapsearch/real-estate/" >Find a Home</a>
         |
    <a href="/agentsearch" >Find an Agent</a>
         |
    <a href="/dashboard" >My RealtyTrac</a>
         |
    <a href="/statsandtrends" >Stats & Trends</a>
         |
    <a href="/finance/" >Finance Center</a>
         |
    <a href="http://www.realtytrac.com/real-estate-guides"          target="_blank"
>Real Estate Guides</a>
 <br />
                            For Professionals             
    <a href="/investors" >Investors</a>
         |
    <a href="/agentproduct" >Agents</a>
         |
    <a href="/advertisingcenter/" >Advertisers</a>
         |
    <a href="/datalink/partner.aspx" >Partners</a>
         |
    <a href="http://data.realtytrac.com"          target="_blank"
>Data Sales</a>
         |
    <a href="http://mega.realtytrac.com"          target="_blank"
>Marketing Lists</a>
         |
    <a href="http://insidetrac.realtytrac.com"          target="_blank"
>InsideTrac Login</a>
 <br />
                            Company Info             
    <a href="/company-info" >About Us</a>
         |
    <a href="/companyinfo/contact" >Contact Us</a>
         |
    <a href="/content/news-and-opinion" >News Room</a>
         |
    <a href="http://www.foreclosurepulse.com"          target="_blank"
>Foreclosure Pulse</a>
 <br />
        </p>
        <div style="" id="dFeedback"></div>
    </div>
</div>
<!--end footer-->
<div class="tooltipcontainer overlay" id="showCalculateContainer" style="z-index:999999" property-value="325290.0000" property-zip="91709">
    <span class="poweredby"></span>
    <a href="javascript:void(0);" class="close">Close</a>
    <iframe id="loanExplorerEmbed" scrolling="no" frameborder="no" width="650" height="460" style="width:650px;border:none;"></iframe> 		
</div>
<script type="text/javascript">
    $(function()
    {
        PropertyTools.Init(null, null, null, null, null, null, null, null, null, null, null, 
                            325290.0000,
                            65058.0000,
                            20, 
                            4.569, 
                            3.617, 
                            3.199);
    });
</script>
        </div>
    </div>

    <div class="leaderboard" style="position:absolute;width:100%;top:0">
        <div class="leaderboard_ad">
                <div>

<script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];

</script>  

<script type='text/javascript'>
    googletag.cmd.push(function () {
        googletag.defineSlot('/6584879/RT_PROPERTY_LEADERBOARD', [728, 90], 'div-gpt-ad-1358896157878-0').addService(googletag.pubads()).setTargeting('stateabbr', 'CA');       
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });
</script>

<!-- RT_Property_Details_Leaderboard -->
<div id='div-gpt-ad-1358896157878-0' style='width:728px; height:90px;'>
<script type='text/javascript'>
    googletag.cmd.push(function () { googletag.display('div-gpt-ad-1358896157878-0'); });
</script>
</div>

</div>

        </div>
    </div>
    <div style="position:absolute;width:100%;top:103px">








<div class="header  headerV3" id="RT_SearchCnr">
    <div class="topLinks">
        <a href="/" class="logoLink">
            <div class="logo" title="RealtyTrac, find foreclosures, real estate and home facts">&nbsp;</div>
        </a>
            <ul class="navigationButtons">
                <li class="selected"><a href="/mapsearch/us.html">HOMES</a></li>
                <li ><a href="/statsandtrends" class="trendsbutton">TRENDS</a></li>
                <li ><a href="/agentsearch" class="agentbutton">AGENTS</a></li>
                <li ><a href="/broker-network" class="brokersbutton">BROKERS</a></li>
                <li ><a href="/content/news-and-opinion" class="news">NEWS</a></li>
                <li class="expandMoreMenu"><a href="javascript:void(0);">MORE<span class="arrowdark">&nbsp;</span></a></li>
            </ul>
        <ul class="accountButtons">
                            <li class="memberIcon loggedInButton"><a href="javascript:void(0);" id="loggedUserNam" class="showAccountMenu"><span class="icon">&nbsp;</span>WELCOME Norma<span class="arrowdark">&nbsp;</span></a></li>
           
        </ul>
    </div>
        <div id="moreNavigationMenu" class="dropDownMenuContent dropDownSearchMenu">
        <div class="top-corner"></div>
        <ul>
            <li class="first"><a href="/finance/">Mortgages</a></li>
            <li><a href="http://www.realtytrac.com/real-estate-guides">Real Estate Guides</a></li>
            <li><a href="/203k">203K Loans</a></li>
            <li class="last"><a href="javascript:void(0);" class="helpLink">Help</a></li>
        </ul>
    </div>

        <div id="realEstateProsMenu" class="dropDownMenuContent dropDownSearchMenu">
        <div class="top-corner"></div>
        <ul>
            <li class="first"><a href="/agentproduct">Agent Products</a></li>
            <li class="last"><a href="/network">Broker Network</a></li>           
        </ul>
    </div>



    <div class="clearfloat"></div>
    
        <div class="searchbarback">
            <div class="searchpanel">
                <div class="searchHeaderContent">
                    <div class="searchHeaderMenu">
                        <a id="searchHeaderDropDownNav" href="javascript:void(0);"><span id="selectedTxt">
                                Search Homes
                        </span><span class="corner"></span>
                            <input type="hidden" id="searchType" name="searchType" value="MapSearch" /></a>
                        <div id="searchHeaderDropDown" class="dropDownMenuContent dropDownSearchMenu">
                            <div class="top-corner">
                            </div>
                            <ul>
                                <li class="first"><a href="javascript:void(0);" onclick="dropDownSearchMenuSelect('MapSearch');">
                                    Search Homes</a></li>
								    <li><a href="javascript:void(0);" onclick="dropDownSearchMenuSelect('Property');">
										    Search Prop ID</a></li>
                                <li><a href="javascript:void(0);" onclick="dropDownSearchMenuSelect('TrendCenter');">
                                    Stats & Trends</a></li>
                                <li class="last"><a href="javascript:void(0);" onclick="dropDownSearchMenuSelect('AgentSearch');">
                                    Find An Agent</a></li>
                            </ul>
                        </div>
                    </div>
                    <input type="text" name="txtSearch" id="txtSearch" ncid="SH_txtSearch" class="search_input"
                            value="San Bernardino county, CA" watermark="" />
                    <input type="button" id="header_searchspot" class="search_hotspot" />
                    <input type="hidden" name="ShowNewStatsAndTrends" ncid="SH_ShowNewStatsAndTrends" value="value" />
                </div>
                <ul class="buttonsPanel">
                    <li>
                        <a href="javascript:void(0);" class="filters advancedSearchLink" >
                            <span>&nbsp;</span>
                            <label>filters</label>
                        </a>
                    </li>
                                    </ul>
                <ul class="userMenu">
                        <li><a href="/dashboard">My RealtyTrac</a></li>
                        <li><span class="separator"></span></li>
                        <li><a id="headerRecentSearches" href="javascript:HeaderViewSearches();">SEARCHES</a></li>
                        <li><span class="separator"></span></li>
                        <li><a id="headerPropertyList" href="javascript:HeaderViewProperties();">PROPERTIES</a></li>
                </ul>            
                    <div class="invalidAddressPopupDivCnr">
        <div id="invalidAddressPopupDiv" class="clsValidationSummary" style="display: none;">
            <div id="customMessage" class="hiddenElement" style="display: none;">
                <a href="javascript:CloseInvalidAddressHeaderPopup();" class="popupCloseLnk"><span
                    class="buttonX"></span></a>
            </div>
            <div id="invalidAddressMessage" style="display: block;">
                <a href="javascript:CloseInvalidAddressHeaderPopup();" class="popupCloseLnk"><span
                    class="buttonX" title=""></span></a>The location you are looking for cannot
                be found. <br/><br/>Suggestions:
                <ul class="invalidAddress">
                    <li>Type in a city and state when searching for an address.</li>
                    <li>Include a comma between your address and city.</li>
                    <li>Verify that your address and city are spelled correctly.</li>
                    <li>Try entering just a ZIP code.</li>
                </ul>
                <strong id="headerLinksTitle" style="display: none;">Did you mean:</strong>
                <ul id="headerLocationsList" class="invalidAddress">
                </ul>
            </div>
        </div>
    </div>

            </div>
        </div>
        <div class="filtersContainer">
        <div id="quickSearchDropDown" style="display: none;">
    <input type="hidden" id="txtSearchID" value="0" />
    <div class="advancedOptionsContent">
        <div class="ShowOnSavedSearchPage">
            <h3 id="shTitle">
                Edit Your Saved Search</h3>
            <div>
                <span class="title">Location</span>
                <input id="txtMapToSearchText" disabled="disabled" />
            </div>
            <div>
                <span class="title">Search Name</span>
                <input id="txtMapToSearchName" />
            </div>
        </div>
        <div class="clearfix filters-panel">
            <div class="advSearch-boxes input-options-panel">
                <div class="bedBathPriceFilters">
                    <span class="title" >Price ($)</span>
                        <input style="width: 73px;" type="text" class="priceInput" id="txtPriceMin" cb="SH_txtPriceMin" value="No Min" onfocus="if(this.value=='No Min'){this.value='';}" onblur="if(this.value==''){this.value='No Min';}"/>&nbsp;to&nbsp;<input style="width: 73px;" type="text" class="priceInput"  id="txtPriceMax" cb="SH_txtPriceMax" value="No Max"  onfocus="if(this.value=='No Max'){this.value='';}" onblur="if(this.value==''){this.value='No Max';}"/>
                        </span> 
                </div>
                <div class="bedBathPriceFilters">
                    <span class="title">Bedrooms</span>
                    <select name="beds" id="SH_ddlBeds">
                    </select>&nbsp;to&nbsp;<select name="bedsMax" id="SH_ddlBedsMax"></select>
                </div>
                <div class="bedBathPriceFilters">
                    <span class="title">Bathrooms</span>
                    <select name="baths" id="SH_ddlBaths">
                    </select>&nbsp;to&nbsp;<select name="bathsMax" id="SH_ddlBathsMax"></select>
                </div>
                <div class="bedBathPriceFilters ">
                    <span class="title">Home Size</span>
                    <select name="sqFt" id="SH_ddlSqFt">
                    </select>&nbsp;to&nbsp;<select name="sqFtMax" id="SH_ddlSqFtMax"></select>
                </div>
                <div class="bedBathPriceFilters">
                    <span class="title">Lot Size</span>
                    <select name="lotSize" id="SH_ddlLotSize">
                    </select>&nbsp;to&nbsp;<select name="lotSizeMax" id="SH_ddlLotSizeMax"></select>
                </div>
                <div id="datesSearchBox" class="clearfix">
                    <div id="divYearBuilt" class="item_options">
                        <span class="title">Year Built</span>
                        <select name="ddlYearBuiltFrom" id="SH_ddlYearBuiltFrom">
                        </select>&nbsp;to&nbsp;<select name="ddlYearBuiltTo" id="SH_ddlYearBuiltTo"></select>
                    </div>
                    <div class="item_options">
                        <span class="title">Entry Date</span>
                        <div class="selectDateInput">
                            <div id="EntryDate">
                                <span id="titleEntryDateSelected">Any</span>
                                <input type="hidden" value="" ncid="SH_txtDateBegin" />
                                <input type="hidden" value="" ncid="SH_txtDateEnd" />
                                <div class="button">
                                    <span class="corner"></span>
                                </div>
                            </div>
                            <div class="container" id="entryDateCnt">
                                <a value="null">Any</a> <a value="0">Today</a> <a value="7">Within last 7 days</a>
                                <a value="14">Within last 14 days</a> <a value="30">Within last 30 days</a> <a value="60">
                                    Within last 60 days</a> <a value="90">Within last 90 days</a> <a value="120">Within
                                        last 120 days</a> <a value="6m">Within last 6 months</a> <a value="12m">Within last
                                            12 months</a> <a value="24m">Within last 24 months</a> <a value="36m">Within last 36
                                                months</a>
                                <div class="inputcnt">
                                    Custom date range
                                    <input type="text" id="dateRangeFrom" value="From" />
                                    -
                                    <input type="text" id="dateRangeTo" value="To" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="propertyTypesBox" class="advSearch-boxes">
                <ul id="residentialCbxs">
                    <li>
                        <p>
                            Residential Listings</p>
                    </li>
                    <li>
                        <input type="checkbox" checked="checked" value="AR" id="SH_cbxAllResidential" />All
                        Residential:
                        <ul id="SH_allResidentialCbxs">
                            <li>
                                <input type="checkbox" value="SF" id="SH_cbxSingleFamily" />Single Family</li>
                            <li>
                                <input type="checkbox" value="CT" id="SH_cbxCondo" />Condo / Townhouse</li>
                            <li>
                                <input type="checkbox" value="M2" id="SH_cbxMultiFamily2" />Multi Family (2-4 units)</li>
                            <li>
                                <input type="checkbox" value="M5" id="SH_cbxMultiFamily5" />Multi Family (5+ units)</li>
                            <li>
                                <input type="checkbox" value="MM" id="SH_cbxMobile" />Mobile/Manufactured</li>
                            <li>
                                <input type="checkbox" value="FR" id="SH_cbxFarm" />Farm/Ranch</li>
                            <li>
                                <input type="checkbox" value="RV" id="SH_cbxVacant" />Vacant Land</li>
                        </ul>
                    </li>
                </ul>
                <ul id="commercialCbxs">
                    <li>
                        <p>
                            Commercial Properties</p>
                    </li>
                    <li>
                        <input type="checkbox" checked="checked" value="AC" id="SH_cbxAllCommercial" name="" />All
                        Commercial:
                        <ul id="SH_allCommercialCbxs">
                            <li>
                                <input type="checkbox" value="RE" id="SH_cbxRetail" />Retail</li>
                            <li>
                                <input type="checkbox" value="OF" id="SH_cbxOffice" />Office</li>
                            <li>
                                <input type="checkbox" value="IN" id="SH_cbxIndustrial" />Industrial</li>
                        </ul>
                    </li>
                    <li style="padding: 15px 0px 0px 0px;">
                        <p>
                            <input type="checkbox" checked="checked" value="AO" id="SH_cbxOther" />Other:</p>
                        <ul>
                            <li>
                                <label>
                                    <input ncid='SH_tbxPropOther' type="text" onblur="if(this.value==''){this.value='Enter code';}"
                                        onfocus="if(this.value=='Enter code'){this.value='';}" id="tbxPropOther" size="8"
                                        cb='SH_tbxPropOther' />
                                </label>
                                <br />
                                <a onclick="javascript:window.open(document.location.protocol + '//www.realtytrac.com/pub/proptypecodes.html', '', 'width=800, scrollbars=1, menubar=0, location=0, toolbar=0, status=0'); return false;"
                                    href="javascript:;">View codes</a> </li>
                        </ul>
                    </li>
                </ul>
                <br class="clearer" />
            </div>
        </div>
        <div class="submit_panel clearfix">
            <div class="HideOnSavedSearchPage">
                <a id="resetSearch" class="reset_filters">Reset options</a>
            </div>
            <div class="ShowOnSavedSearchPage" style="float: left; padding-left: 85px; width: 100%;border:none;height:28px;">
                <a href="javascript:void(0);" onclick="javascript:resetSearchAdvance();" class="reset_filters">Reset options</a>
                <input type="button" class="color_button SubmitOnSavedSearchPage" style="float: right;
                    margin-right: 160px;" value="SAVE SEARCH" />
                <input type="button" class="color_button CancelOnSavedSearchPage" onclick="window.location.reload(true);"
                    style="float: right; margin-right: 20px;" value="CANCEL" />
            </div>
            <div class="HideOnSavedSearchPage">
                <input type="button" class="color_button searchSubmitButton" value="SUBMIT SEARCH" />
                <text>&nbsp;&nbsp;or&nbsp;&nbsp;</text>
                    
                    <input type="button" id="save_custom_search" class="color_button" value="SAVE AS CUSTOM SEARCH" />
                    <div id="save_options_form" class="save_options_form" style="display: none;">
                        <div class="corner_border">
                            <div class="corner">
                            </div>
                        </div>
                        <a class="close" href="javascript:void(0);" onclick="$('#save_options_form').hide(); return false;"></a>
                        <h1> SAVE THIS CUSTOM SEARCH</h1>
                        <span>Name</span>nbsp;<input id="txtSearchName" name="searchName" type="text" />&nbsp;<input
                            id="saveSearch" type="button" class="color_button" value="Save" />
                    </div>

                   

                    
            </div>
        </div>
    </div>
    <div class="supplementalOptionsBarMember">
    </div>
    <div class="supplementalOptionsContent supplementalOptionsContentMember">
                
                    <div class="headerMember">
                        Premium Features
                    </div>
                
        <div id="rtRatingsBox" class="advSearch-boxes input-options-panel">
            <div class="equityLVTpanel clearfix">
                <span class="title" style="width: 66px;">Equity ($)</span>
                <input type="text" onblur="if(this.value==''){this.value='No Min';}"
                                                            onfocus="if(this.value=='No Min'){this.value='';}" id="txtEquityMin" cb="SH_txtEquityMin"
                                                            value="No Min" />
                <span>to</span>
                <input type="text" onblur="if(this.value==''){this.value='No Max';}"
                        onfocus="if(this.value=='No Max'){this.value='';}" id="txtEquityMax" cb="SH_txtEquityMax"
                        value="No Max" />
            </div>
            <div class="equityLVTpanel clearfix netEquityLoanToValueTab">
                <span class="title" style="width: 70px; float: left; margin: 5px 0;">LTV</span>
                <input type="text" class="homeScoreInput" style="padding: 2px; width: 50px;" onblur="if(this.value=='' || this.value=='0%'){this.value='No Min';}" onfocus="if(this.value=='No Min'){this.value='';}"
                    id="txtLoanToValueMin" cb="SH_txtLoanToValueMin" value="No Min" />
                <div id="netequityLoantovalueMin" class="floatLeft">
                            <a class="spinnerButton spinnerUp" href="javascript:void('0');"></a>
                            <a class="spinnerButton spinnerDown" href="javascript:void('0');"></a>
                </div> 
                <span class="floatLeft" style="padding: 5px 3px 5px 3px;">to</span>
                <input type="text" class="homeScoreInput" style="padding: 2px; width: 50px;" onblur="if(this.value==''){ this.value = 'No Max';}"
                        onfocus="if(this.value==($(this).attr('maxValue') + '%') || this.value == 'No Max'){this.value='';}" id="txtLoanToValueMax" cb="SH_txtLoanToValueMax"
                            value="No Max" maxValue="500" /> 
                <div class="floatLeft" id="netequityLoantovalueMax">
                        <a href="javascript:void('0');" class="spinnerButton spinnerUp"></a>
                        <a href="javascript:void('0');" class="spinnerButton spinnerDown"></a>
                </div>
            </div>
                <div id="rtLenderName" class="item_options">
                    <span class="title">Lender Name</span><span class="questionMarkIcon" id="quickSearchLender"></span><br />
                        <input type="text" id="txtLenderName" cb="SH_txtLenderName" />
                </div>
            <div class="item_options">
                <span class="title">Auction date</span><br />
                <div class="selectDateInput selectDateInput-auction">
                    <div id="AuctionDate">
                        <span id="titleAuctionDateSelected">Any</span>
                        <input type="hidden" value="" ncid="SH_txtAuctionDateBegin" />
                        <input type="hidden" value="" ncid="SH_txtAuctionDateEnd" />
                        <div class="button">
                            <span class="corner"></span>
                        </div>
                    </div>
                    <div class="container" id="auctionDateCnt">
                        <a value="null">Any</a> <a value="0">Today</a> <a value="-1">Tomorrow</a> <a value="7">
                            Within next 7 days</a> <a value="14">Within next 14 days</a> <a value="30">Within next
                                30 days</a> <a value="60">Within next 60 days</a> <a value="90">Within next 90 days</a>
                        <div class="inputcnt">
                            Custom date range<br />
                            <input type="text" id="auctionDateFrom" value="From" />
                            -
                            <input type="text" id="auctionDateTo" value="To" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix" style="padding: 3px 0px;">
                <div style="float: left; width: 120px; padding: 0px 5px 0px 0px; display: inline-block;">
                    <span>Listed Foreclosures</span><br />
                    <select id="SearchBarModel_ListedPropertiesDisplay" name="SearchBarModel.ListedPropertiesDisplay"><option value="1">Include</option>
<option value="0">Exclude</option>
<option value="2">Only Show</option>
</select>
                </div>
                <div style="float: left; width: 120px; padding: 0px 5px 0px 0px; display: inline-block;">
                    <span>Bankruptcies</span><br />
                    <select id="SearchBarModel_BankruptciesDisplay" name="SearchBarModel.BankruptciesDisplay"><option value="1">Include</option>
<option value="0">Exclude</option>
<option value="2">Only Show</option>
</select>
                </div>
            </div>
        </div>
    </div>
</div>
        </div>


            <form id="logoutForm" method="post" action="/r/logout"> 
                
<div class="accountMenu" style="display: none;">
    <div class="accountMenuContent dropDownMenuContent dropDownSearchMenu">
        <div class="top-corner"></div>
                   
<ul id="ulAccountMenu">
<li><a href="/dashboard">My RealtyTrac</a></li><li><a href="/dashboard/emailalerts">Email Alerts</a></li><li><a href="#logout">Log Out</a></li></ul>
 <script type="text/javascript">
    $(function () {
        $('#ulAccountMenu li:first').addClass("first");
        $('#ulAccountMenu li:last').addClass("last");
        $('#ulAccountMenu li:last a').addClass("logoutHeaderLink");

        $(".logoutHeaderLink").click(function (event) {
            event.preventDefault();

            if (typeof (DoLogout) != "undefined") {
                DoLogout();
            }
        }).attr("href", "#logout").attr("onclick", "");
    });
</script>

    </div>
</div>
<div class="logoutBox" style="display: none;">
    <div class="loginBoxContent">
        <input type="hidden" name="currentUrl" value="http://www.realtytrac.com/propertydetails/ca/chino-hills/91709/obsidian-ct/52883713"/>
        <input type="submit" id="" value="Sign out" />
    </div>
</div>

            </form>

        <div id="menu" style="display: none;" class="tooltip_menu_searches">
            <div id="triangle">
            </div>
            <div id="tooltip_menu">
                <div class="headersearchitems">
                    <div id="recentSearchesHeaderContainer"><img src="/UI/images/loading.gif" alt="loading..." /></div>
                            
                    <div id="savedSearchesHeaderContainer"><img src="/UI/images/loading.gif" alt="loading..." /></div>
                            
                </div>
                <div class="headeritemsBottom">
                    <a href='/dashboard/savedsearches'>Go to Saved Searches in My RealtyTrac</a>
                </div>
            </div>
        </div>
        <div id="menu1" style="display: none;" class="tooltip_menu_properties">
            <div id="triangle1">
            </div>
            <div id="tooltip_menu1">
                <div class="headersearchitems">
                    <div id="lastPropertiesHeaderContainer"><img src="/UI/images/loading.gif" alt="loading..." /></div>
                    <div id="savedPropertiesHeaderContainer"><img src="/UI/images/loading.gif" alt="loading..." /></div>
                </div>
                <div class="headeritemsBottom">
                    <a href='/dashboard/savedproperties'>Go to Saved Properties in My RealtyTrac</a>
                </div>
            </div>
        </div>
</div>

<div class="clearfloat"></div>



<script type="text/javascript">
    var gUseSearchHeader = true;
    var g_HeaderEngineData = { 'isWhiteSite': false, 'isDataLink': false, 'isCustomFreeSite': false };

        
        var g_SearchHeaderData = {
            'textboxID': 'txtSearch',
            'listSearch': "searchOptions.searchEngine.ProcessAddressSearch($('#searchType').val(),'txtSearch', false);",
                        'trendSearch': "searchOptions.searchEngine.ProcessAddressSearch($('#searchType').val(),'txtSearch', false);",
                        'mapSearch': "searchOptions.searchEngine.ProcessAddressSearch($('#searchType').val(),'txtSearch', false);",
                        'btnSearchHomesID': 'SH_searchHomes',
                        'btnSearchTrendsID': 'SH_searchTrends',
                        'ddlSavedSearchesID': 'ddlSavedSearch',
                        'searchCodeMapSearch': 'SRLP',
                        'searchCodeTrendCenter': 'SRLT',
                        'searchCodeValueTrack': 'SRLH'
                    };
             

    $(function ()
    {



    });
    
setTimeout(function () {
    var a = document.createElement("script");
    var b = document.getElementsByTagName("script")[0];
    a.src = document.location.protocol + "//dnn506yrbagrg.cloudfront.net/pages/scripts/0018/5538.js?" + Math.floor(new Date().getTime() / 3600000);
    a.async = true; a.type = "text/javascript"; b.parentNode.insertBefore(a, b)
}, 1);
</script>    </div>
<!-------------------------------
CoBrandCompany :    Natural Search
CoBrandPK :         302
CoBrandAccount :    13562
ServerIP cookie :   
ServerIP header :   192.168.100.10
Time: 1/8/2014 7:44:23 PM
------------------------------->
    <div id="overlayexposeMask" style="display: none; position: absolute; background: #000;
        width: 100%; height: 2200px; z-index: 2000; opacity: 0.6; top: 0; left: 0">
    </div>
    <div id="divLogin" style="background-color: #FFFFFF; display: none; position: absolute;
        top: 0px; left: 0px; z-index: 2000;">
        <iframe id="frmLogin" style="width: 100%; height: 100%;"></iframe>
    </div>
<div id="downloadOverlayContainer" style="display:none;">
 <div class="download-properties-overlay overlay">
	    <a href="javascript:void(0);" class="close">Close</a>	
	    <h2>Upgrade your account to print this property</h2>	
	    <p>RealtyTrac provides a service for downloading or printing property records free with a Premium Membership.</p>
	    <p>If you would like immediate access to downloading and printing property records, you can upgrade to our Premium membership today.</p>
            <p>Please wait until 7-day trial ends or call 800-670-2960</p>
    </div>
</div>
    <div id="learnToBuyAtAuction_Dialog" class="modal_dialog_larger2" style="display: none">
    <h2>
        HOW TO BUY AT AUCTION ?
    </h2>
    <div class="shadowboxlistContainer">
        <p>
            <span>Here’s a quick checklist to follow if you are interested in purchasing at the
                public foreclosure auction (NTS, NFS). </span>
        </p>
        <ul class="shadowboxlist">
            <li>
                <h3>
                    1. Prepare your resources
                </h3>
                Make sure that you have the resources in place to purchase the property. You’ll
                need to have readily available cash available because foreclosure home auctions
                usually require full payment in cash. Enlist the help of a buyer’s agent if you’re
                not comfortable attending the auction and bidding on your own. </li>
            <li>
                <h3>
                    2. Confirm property status
                </h3>
                Check the Auction section on this property details page to find out the date, time
                and location of the auction. If it’s the day of the auction, you may want to call
                the trustee or attorneylisted in the <b>Foreclosure Contact Info</b> section of
                this page to check if this auction has been canceled or postponed. While RealtyTrac
                often provide auction updates, many auctions are canceled or postponed at the last
                minutefor a variety of reasons. </li>
            <li>
                <h3>
                    3. Evaluate bargain/investment potential
                </h3>
                Determine if this property represents a good bargain or investment opportunity.
                Start by comparing the property’s <b>Estimated Market value</b> to the <b>Opening Bid</b>
                (if not on the property details page, try calling the trustee or attorney to get
                the opening bid) at the auction or the <b>List Price</b> if the property is listed
                for sale. If either of those amounts is below the estimated value, this may represent
                a good bargain purchase. Also check the <b>Trends</b> tab on the details page to
                seethe average discount that foreclosure buyers are getting in the zip code. That
                will give you an idea of the type of discount to reasonably expect on this real
                estate auction. </li>
            <li>
                <h3>
                    4. Attend the auction and bid
                </h3>
                Bring the necessary funds required to the auction and don’t exceed your pre-determined
                maximum bid amount. Foreclosure auction procedures vary from state to state so it’s
                wise to attend a few auctions just to observe before you go to bid. Of course, if
                the property is listed for sale you or your buyer’s agent can contact the listing
                agent to submit an offer before the scheduled foreclosure auction. </li>
            <li>
                <h3>
                    5. Pay and take possession
                </h3>
                If you submit the winning bid at the auction, the trustee or referee should provide
                a certificate of sale or a trustee’s deed. You’ll either have to pay the full amount
                of your bid on the spot or within a limited timeframe depending on the state. Once
                you’ve satisfied all the necessary requirements, you can take possession of the
                property, which may require eviction of the former owner. If you are a RealtyTrac
                member, you can save an auction property and get email alerts that will notify you
                if the foreclosure status, auction date/time or market status of the property changes.
            </li>
        </ul>
    </div>
    <a class="close" href="javascript:void(0);">Close</a>
</div>
<div id="learnToBuyBankOwned_Dialog" class="modal_dialog_larger2" style="display: none;">
    <h2 class='howtobuy_bankowned'>
        HOW TO BUY BANK OWNED PROPERTIES ?</h2>
    <div class="shadowboxlistContainer">
        <p>
            <span>Here’s a quick checklist to follow if you are interested in purchasing a bank-owned
                (REO) or Government Owned property. Keep in mind that not all of these properties
                are listed for sale with a real estate agent. </span>
        </p>
        <ul class="shadowboxlist">
            <li>
                <h3>
                    1. Prepare your resources
                </h3>
                Make sure that you have the resources in place to purchase this property. <b>Get pre-qualified</b>
                for a loan if you haven’t already and enlist the help of a <b>buyer’s agent</b>
                if you’re not comfortable contacting the bank or listing agent and navigating the
                negotiations and closing process on your own. </li>
            <li>
                <h3>
                    2. Evaluate bargain/investment potential
                </h3>
                Determine if this property represents a good bargain or investment opportunity.
                If the property is listed for sale, a good place to start is to compare the <b>List
                    Price</b> to the property’s <b>Estimated Market Value</b>. If the list price
                is lower than the market value, the property could represent a bargain purchase.
                If the property is not listed for sale, you’ll want to look at the <b>Trends</b>
                tab to see the average discount that foreclosure buyers are getting in the surrounding
                zip code. That will give you an idea of the type of discount to reasonably expect
                on this property. </li>
            <li>
                <h3>
                    3. Contact the lender/bank or listing agent
                </h3>
                If the REO property is listed for sale on the MLS, you or your buyer’s agent can
                simply contact the listing agent. If the REO home is not listed, you or your buyer’s
                agent will need to contact the lender that now owns the property to express your
                interest in the property. Check in the foreclosure details for the Owner to see
                which lender currently owns the property. </li>
            <li>
                <h3>
                    4. Submit an offer and close the deal
                </h3>
                The lender’s REO or asset management department will let you know how you can view
                the inside of the bank-owned property and how to submit an offer for the property.
                If your offer is accepted, both sides simply need to satisfy the terms of the purchase
                agreement to close the deal. Although many lenders will sell the property “as is,”
                meaning you as a buyer are responsible for any needed repairs, you should make your
                offer contingent on a professional home inspection so you are aware of the repairs
                needed.
                <br />
                If you are a RealtyTrac member, you can recommend that you save bank owned properties
                to be alerted by email if the bank-owned home gets listed for sale or if the listing
                price changes. </li>
        </ul>
    </div>
    <a class="close" href="javascript:void(0);">Close</a>
</div>
<div id="learnToBuyPreForeclosures_Dialog" class="modal_dialog_larger2" style="display: none;">
    <h2>
        HOW TO BUY PRE-FORECLOSURES ?
    </h2>
    <div class="shadowboxlistContainer">
        <p>
            <span>Here’s a quick checklist to follow if you are interested in purchasing a pre-foreclosure
                (NOD, LIS) property. </span>
        </p>
        <ul class="shadowboxlist">
            <li>
                <h3>
                    1. Prepare your resources
                </h3>
                Make sure that you have the resources in place to purchase this property. Get pre-qualified
                for a loan if you haven’t already and enlist the help of a buyer’s agent if you’re
                not comfortable contacting the owner or listing agent and navigating the negotiations
                and closing process on your own. </li>
            <li>
                <h3>
                    2. Confirm property status
                </h3>
                Call the trustee or attorneylisted in the <b>Foreclosure Contact Info</b> section
                of the property details page on RealtyTrac to confirm that this property is still
                in pre-foreclosure. Owners in default can stop pre-foreclosure by paying off the
                amount owed (called reinstatement) or by selling the property. </li>
            <li>
                <h3>
                    3. Evaluate bargain/investment potential
                </h3>
                Determine if this property represents a good bargain or investment opportunity.
                If the property is listed for sale, a good place to start is to compare the <b>List
                    Price</b> to the property’s <b>Estimated Market Value</b>. If the list price
                is lower than the market value, the property could represent a bargain purchase.
                If the property is not listed for sale, you’ll want to look at the <b>Trends</b>
                tab to see the average <b>foreclosure discount</b> that foreclosure buyers are getting
                in the surrounding zip code. That will give you an idea of the type of discount
                to reasonably expect on this property. You’ll also want to check if the home has
                any equity by checking the Equity & Loan To Value section – this could help you
                determine whether or not you want to work directly with the owner or pursue a short
                sale (which requires lender approval). </li>
            <li>
                <h3>
                    4. Contact the owner or listing agent
                </h3>
                If the property is listed for sale on the MLS, you or your buyer’s agent can simply
                contact the listing agent. If the property is not listed, you or your buyer’s agent
                will need to contact the owner in default to express your interest in the property.
                Check under <b>Foreclosure Contact Info</b> to find contact information for the
                owner. </li>
            <li>
                <h3>
                    5. Negotiate a purchase agreement and close the deal
                </h3>
                If the owner is interested in selling during pre-foreclosure (which is beneficial
                to the owner’s credit and allows the owner to walk away with something to show for
                any equity), then you’ll need to negotiate the terms of the purchase, enter escrow
                and close the deal before the property is scheduled for public foreclosure auction.
                <br>
                If you are a RealtyTrac member, you can save an auction property and get email alerts
                that will notify you if the foreclosure status, auction date/time or market status
                of the property changes. </li>
        </ul>
    </div>
    <a class="close" href="javascript:void(0);">Close</a>
</div>
<div id="learnToBuyGovernmentOwned_Dialog" class="login-overlay overlay" style="display: none;">
    <a class="close" href="javascript:void(0);">Close</a>
</div>
<div id="recordingDateTip" class="tooltipcontainer" style="display: none; width: 200px">
    <span class="tiparrow" id="tiparrow"></span>Date the foreclosure document (notice
    of default, notice of sale) or loan document (mortgage, deed of trust, etc.) was
    filed with the county recorder’s office.
</div>
<div id="tsNumberTip" class="tooltipcontainer" style="display: none; width: 200px">
    <span class="tiparrow" id="tiparrow"></span>The number assigned to a property by
    the trustee. Used by trustee to track status of foreclosure and auction proceedings.
</div>

    
</body>
</html>
