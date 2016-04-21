function print2doc(str,proj,clas){var desc="Backup | "+proj+" | "+clas+" | timestamp:"+new Date().getTime(),id=DriveApp.createFile(desc,str,MimeType.HTML).setDescription(desc);Logger.log("Printed doc ID: "+id)}
// Instructions: Run the two following functions one at a time to load the dex.com phone categories and sub-categories into a firebase.
function _dex_getCategories(){ // Step 1 of 2 – Gets top-level categories
  var t=new Date().getTime(),out={},ar=LibraryjsUtil.getHtmlData("http://www.dexknows.com/browse-directory",/\"http:\/\/www\.dexknows\.com\/local\/(\w+\/\">.+)<\/a>/gm)//return ar;
  ,i=ar.length;while(i--){ar[i]=ar[i].split('/">');ar[i][1]=ar[i][1].replace(/&amp;/g,"&");out[ar[i][0]]={"displayName":ar[i][1]}}
  LibraryjsUtil.write2fb("torrid-heat-2303","dex/categories/","put",out)}//function test(){/*print2doc*/Logger.log(_dex_getCategories())}
function _dex_getCategoryDetails(){ // Step 2 of 2 – Gets subcategories //var RE=/\"(http:\/\/www\.dexknows\.com\/local\/health_care\/.+\/".+)<\/span>/gm
  var re,act,str,ar,obj,ob=LibraryjsUtil.write2fb("torrid-heat-2303","dex/categories/","get"),keys=Object.keys(ob),j,i=keys.length;while(i--){
    out={};ar=[];re=new RegExp('\"(http:\/\/www\.dexknows\.com\/local\/'+keys[i]+'\/.+\/".+)<\/span>','gm');
    act="http://www.dexknows.com/local/"+keys[i]+"/";str=UrlFetchApp.fetch(act).getContentText().split("By State")[0];
    ar=LibraryjsUtil.getRegExpMatches(re,str);j=ar.length;while(j--){
      ar[j]=ar[j].split("\"><span>");ar[j][1]=ar[j][1].replace(/&amp;/g,"&");out[ar[j][1]]={"link":ar[j][0]};
      LibraryjsUtil.write2fb("torrid-heat-2303",("dex/categories/"+keys[i]+"/subcategories/"),"put",out)}}}//function test(){_dex_getCategoryDetails()}

