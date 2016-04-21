function auth    (){}
function print   (str){var desc="Argenta™ Print — timestamp:"+new Date().getTime(),id=DriveApp.createFile(desc,str,MimeType.HTML).setDescription(desc);Logger.log("Printed doc ID: "+id);}
function doGet (e){ // References: https://developers.google.com/apps-script/guides/html-service-communication#private_functions // https://sites.google.com/site/appsscripttutorial/miscellaneous/creating-form-elements-dynamically-using-google-apps-script-gas
    if(e && e.parameter && e.parameter.k){var k=e.parameter.k,m=e.parameter.m,p=e.parameter;switch(k){
           case  /* content service */ "gmjcydpq8k7dsvd9428i"  : return ContentService.createTextOutput(JSON.stringify(avmReportServeData(JSON.stringify(decodeURIComponent(m)))))                                                                          ;break; 
        default                                                : break;}}}
function avmReportServeData(addy){ // Calls jsAvm1 not jsAvm // avmHomeSnap() returns 3 estimates including avmRemax() which might be duplicated
    var    ob        = LibraryjsAvm.avmReport(addy)
      ,    out       = ob.avm
      ;    out.image = ob.imgUrl
   ;return out} //function test(){Logger.log(JSON.stringify(avmReportServeData("12420 SE 223rd Drive, Kent, WA 98031")))}