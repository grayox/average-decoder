function print2doc(str,proj,clas){var desc="Backup | "+proj+" | "+clas+" | timestamp:"+new Date().getTime(),id=DriveApp.createFile(desc,str,MimeType.HTML).setDescription(desc);Logger.log("Printed doc ID: "+id)}
function print2ss(){LibraryjsUtil.write2ss(true,showAll(),"Sheet1","1azZ5rq1Sgy2fipwhwd75f9M6jkzvWk4TZmOzH2A4uRg"/*act*/)}
function dbParse_projectClasses(){
	return {
		argenta    : [ "avmResult"            ]
	,	dealDigger : [ /*"User",*/"analysis","bid","invite","proposal","situs" ] // Backing up User field throw error in LibraryjsUtil.dbParseConstruct()
	}}
function backup_dbParse(){ // MAIN CALL // Writes to a GoogleDoc class by class // To only save a subset, adjust the return object in dbParse_projectClasses() // Instructions: 1. Copy/paste this file to any GAS project. 2. Adjust return object of dbParse_projectClasses() 3. Run this function: backup_dbParse()
	var proj,clas,j,ob=dbParse_projectClasses(),keys=Object.keys(ob),i=keys.length;while(i--){proj=keys[i];j=ob[keys[i]].length;while(j--){clas=ob[keys[i]][j];
	print2doc(JSON.stringify(LibraryjsUtil.dbParse({verb:"get",project:proj,className:clas}).results),proj,clas)}}}
function backup_google(){ // For automatic triggered daily backup of all script files to an array of gmail user accounts // Get files from array of folders // For each file, (if it has been updated) copy it, set new user, delete current user, delete existing file of same name	
    var HOURS_BETWEEN_UPDATES=24,AR=["scripts","webHost"],USER_FILE_ID="xyz",t=new Date().getTime(),ar=SpreadsheetApp.getFileById(USER_FILE_ID).getSheetByName("Google").getRange(1,1,100,5).getCells(),j,i=AR.length;while(i--){
		if(file.getLastUpdated()>(t-(1000*60*60*HOURS_BETWEEN_UPDATES))){j=ar.length;while(j--){
		   // Cycle thru each owner here.
		   ;file.makeCopy().setOwner(ar[j]).setDescription(t).isTrashed(true)}
		}
	}
}
