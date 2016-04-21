function formResponses2objectify(formId,returnAll){ // Reference: https://developers.google.com/apps-script/reference/forms/form-response
  var out=[],ar,arr=FormApp.openById(formId).getResponses(),j;if(!returnAll){arr=[arr.pop()]};var i=arr.length;while(i--){
    out[i]={};ar=arr[i].getItemResponses();j=ar.length;while(j--){out[i][ar[j].getItem().getTitle()]=ar[j].getResponse()}
  }return out//Logger.log(JSON.stringify(out))
}//function test(){formResponses2objectify("1SEOL_DZUBqhpAfffO_BgokQ23VXuskg7B__bbvccYpY"/*http://goo.gl/forms/TR0jp0gTCi*/)}
function formResponses_process(formId){var /*t=new Date().getTime(),*/f,r=formResponses2objectify(formId).pop();//r={"Email List":"bar","Project Type":"Capital Project","Project Name":"Test2"}
  //           Project Type           Folder ID | ref[r["Project Type"]]
  var ref = { "writeTo"            : "0B1LVOoV_2dFtfjFLMXd6Q2ZMT1J5SkFsTl92V1RtRXJLZy1TTlpxMHJaN3BIN1FFbUVuTEk"
            , "Asset Management"   : "0B1LVOoV_2dFtfkNfSDN0Mml5RDdfTjVKZ1A0TnFUNTVKQnAxRV9KMzMycVhRNEpTbFVFblk"
            , "Capital Project"    : "0B1LVOoV_2dFtfnlDd1JEMUpOZUVmbGV5NU9STGM0U21OTkRkMEZDUUVUUWsxVG1YYW1uRkE"
            , "Consulting Project" : "0B1LVOoV_2dFtflRpZlhWU0FyNVlVcmFFSXVqb2lHODRfODJGZWtOeG1hMWFBRkVCdGRYbkE"
  }//;Logger.log(ref[r["Project Type"]]);//Logger.log(JSON.stringify(r))
  ,files=DriveApp.getFolderById(ref[r["Project Type"]]).getFiles();while(files.hasNext()){f=files.next();//Logger.log("A");}
    f.makeCopy((/*t*/r["Project Name"] + " | " + r["Project Type"] + " | " + f.getName().split("|").pop().trim()),DriveApp.getFolderById(ref.writeTo))} // Copies template files to target directory
}//function test(){formResponses_process("1SEOL_DZUBqhpAfffO_BgokQ23VXuskg7B__bbvccYpY"/*http://goo.gl/forms/TR0jp0gTCi*/)}