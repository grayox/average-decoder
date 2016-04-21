/*
Reference: Opmtimization: http://www.playmycode.com/blog/2011/03/simple-yet-effective-javascript-optimisations/
Reference: Chrome Developer Tools: https://developers.google.com/chrome-developer-tools/docs/heap-profiling
Reference: JavaScript optimization: http://jsperf.com
Reference: For vs While: http://jsperf.com/fors-vs-while/24
Array.prototype.delimit = function(d){if(!d){d="|"}var out=this;var i=out.length;while(i--){out.splice(i,0,d)}out.shift();return out} // Inserts delimiter between array elements and returns a string
Array.prototype.furl = function(d){if(!d){d="|"}return this.delimit(d).toString()} // Delimits array and converts to string // Ex. delimiter = d = "|";
Array.prototype.furlN2 = function(d){if(!d){d=["|","||"]}var out=this;var i=out.length;while(i--){if(isArray(out[i])){out[i]=out[i].furl(d[0])}}return out.furl(d[1])} // Furls 2D array [][] into delimited string // Checks each element in the array; if is array (i.e, [][]), furls that element (delimits & converts to string) // Ex. d1="|"; d2="||";
String.prototype.unfurl = function(d){if(!d){d="|"}return this.split(","+d+",")} // Unfurls properly furled, delimited string into 1D array
String.prototype.unfurlN2 = function(d){if(!d){d=["|","||"]}var out=this.unfurl(d[1]);var i=out.length;while(i--){out[i]=out[i].unfurl(d[0])}return out} // Unfurls properly furled, delimited string into 2D array
Array.prototype.furlN3 = function(d){if(!d){d=["|","||","|||"]}var out=this;var i=out.length;while(i--){if(isArray(out[i])){out[i]=out[i].furlN2([d[0],d[1]])}}return out.furl(d[2])} // Furls 3D array [][][] into delimited string
String.prototype.unfurlN3 = function(d){if(!d){d=["|","||","|||"]}var out=this.unfurl(d[2]);var i=out.length;while(i--){out[i]=out[i].unfurlN2([d[0],d[1]])}return out} // Unfurls properly furled, delimited string into 3D array
Array.prototype.arrayToCSV = function(){return "\""+this.join("\",\"")+"\""} // Converts one-dimensional array to CSV string
String.prototype.CSVtoArray = function(sep){  // Converts CSV to one-dimensional array // Reference: http://www.greywyvern.com/?post=258  Google Search: parse string to array javascript
function doGet() { // Reference: https://sites.google.com/site/appsscripttutorial/miscellaneous/creating-form-elements-dynamically-using-google-apps-script-gas
  var app           = UiApp.createApplication  (            );
  var panel         =   app.createVerticalPanel(            );
  var groupNameLB   =   app.createLabel        ("Group Name");
  var groupNameTB   =   app.createTextBox      (            )
                           .setId              ("groupName" )
                           .setName            ("groupName" );
  //var mebersLabel =   app.createLabel("Members info");
  var table         =   app.createFlexTable()
                           .setId("table")
                           .setTag("0"); //Here tag will count the number of members
  var i,headerArray = ["Bid","ARVauto","Price","Address","City","State"];i=headerArray.length;while(i--){table.setWidget(0, i, app.createLabel(headerArray[i]));} //Write the header for the table
  addMemebrRow(app); // Add first row of form elelments to input Member information
  var button  = app.createButton       ("Submit"               ); //Add submit button
  var handler = app.createServerHandler("_processSubmittedData");
      handler      .addCallbackElement (panel                  );
      button       .addMouseUpHandler  (handler                );
      panel        .add                (groupNameLB            )
                   .add                (groupNameTB            )
                   .add                (mebersLabel            )
                   .add                (table                  )
                   .add                (button                 );
      app          .add                (panel                  );
  return app;
}
// ---------------------------------------------------------------- MOJO_PRODUCTION ----------------------------------------------------------------
function mojoProduction_handleSubmit(e){var app=UiApp.getActiveApplication();
    app.getElementById("radioValue").setText("Server reached");
    app.getElementById("tabData").setWidget(0,0,mojo_days(e/*.parameter.radioValue* /));app.close();/*Logger.log(e.parameter.radioValue);* /return;} // Note: Using "grid" here does not work.
function mojo_production(){ // -------------------------------------------- MOJO_PRODUCTION ----------------------------------------------------------------
    var app      = UiApp.getActiveApplication();/*UiApp.createApplication();* /
    var form     = app.createFormPanel       ();//var scr=app.createScrollPanel().setSize("100%","5000");
    var vpan     = app.createVerticalPanel   ().setId("vpan");
    var grid     = app.createGrid(2,1         );
    var tab      = app.createFlexTable       ().setBorderWidth(0)                 ;grid.setWidget(0,0,tab);vpan.add(grid);form.add(vpan);app.add(form);
    var tabData  = app.createFlexTable       ().setBorderWidth(1).setId("tabData");grid.setWidget(1,0,tabData);
    var handler  = app.createServerValueChangeHandler("mojoProduction_handleSubmit").addCallbackElement(vpan);
    var b=[],handleRadio=[],radioValue=app.createTextBox().setId("radioValue").setName("radioValue")/*.setVisible(false)* /.addValueChangeHandler(handler);vpan.add(radioValue); // Radio buttons // Reference: http://stackoverflow.com/questions/10903963/strange-behaviour-when-using-radiobutton // https://sites.google.com/site/appsscripttutorial/user-interface/radio-buttons
    var ob={"Day":1,"Week":7,"Month":30,"Quarter":90,"Year":365},keys=Object.keys(ob),i=keys.length;while(i--){
            handleRadio[i]=app.createClientHandler().forTargets([radioValue]).setText(ob[keys[i]]).setTag(ob[keys[i]]);
            b[i]=app.createRadioButton("grp",keys[i]).setValue(false).setId(keys[i]).setName("grp").addValueChangeHandler(handleRadio[i])/*.addValueChangeHandler(handler)* /;tab.setWidget(1,i,b[i]);}
        b[0].setValue(true,true);Logger.log(radioValue.getTag());mojoProduction_handleSubmit(radioValue.getTag()); // google.script.run.withSuccessHandler(onSuccess).mojoProduction_handleSubmit(); // Reference (midway down): https://developers.google.com/apps-script/html_service         
    /*app.close();* /return form/*app* /;}
function mojo_reports() { // Reference: https://sites.google.com/site/appsscripttutorial/user-interface/tab-panel
    var app=UiApp.createApplication(),ob={"List":mojo_callback(),"Day":mojo_days(1),"Week":mojo_days(7),"Month":mojo_days(30),"Quarter":mojo_days(90),"Year":mojo_days(365)},keys=Object.keys(ob).reverse(),tabPanel=app.createTabPanel(),i=keys.length;
    while(i--){tabPanel.add(app.createScrollPanel().setWidth("1000").setHeight("500").add(ob[keys[i]]),keys[i]).setAnimationEnabled(true)}return app.add(tabPanel.selectTab(0))}
 /* var content1 = "Callback list goes here"; // Let us write some content which will be used later inside tabs
    var content2 = "Today goes here"        ;
    var content3 = "Yesterday goes here"    ;
    var content4 = "Week goes here"         ;
    var content5 = "Month goes here"        ;
    var content6 = "Quarter goes here"      ;
    var content7 = "Year goes here"         ; * /
 // pan[i] = app.createScrollPanel().setWidth("1000").setHeight("500").add(/*app.createLabel(content1)* /form1); //Create Vertical panel which will reside inside tabs // Add the contents to vertical panel
 /* var verticalPanel2 = app.createVerticalPanel().setWidth('1000').setHeight('200').add(app.createLabel(content2));
    var verticalPanel3 = app.createVerticalPanel().setWidth('1000').setHeight('200').add(app.createLabel(content3));
    var verticalPanel4 = app.createVerticalPanel().setWidth('1000').setHeight('200').add(app.createLabel(content4));
    var verticalPanel5 = app.createVerticalPanel().setWidth('1000').setHeight('200').add(app.createLabel(content5));
    var verticalPanel6 = app.createVerticalPanel().setWidth('1000').setHeight('200').add(app.createLabel(content6));
    var verticalPanel7 = app.createVerticalPanel().setWidth('1000').setHeight('200').add(app.createLabel(content7)); * /
 // var tabPanel = app.createTabPanel() // Create Tabpanel
             // tabPanel.add(verticalPanel1,"Callbacks").setAnimationEnabled(true)/*.setStyleAttributes({background:"red",color:"white"})* / //Add all the vertical panels to the tabpanel
                   /* .add(verticalPanel2,"Today"    ).setAnimationEnabled(true)
                      .add(verticalPanel3,"Yesterday").setAnimationEnabled(true)
                      .add(verticalPanel4,"Week"     ).setAnimationEnabled(true)
                      .add(verticalPanel5,"Month"    ).setAnimationEnabled(true)
                      .add(verticalPanel6,"Quarter"  ).setAnimationEnabled(true)
                      .add(verticalPanel7,"Year"     ).setAnimationEnabled(true)* /
                   // .selectTab(1); // Select your default tab , Index 0 mean first tab, index 2 = second tab and so on 
     // app.add(tabPanel.selectTab(1));   // Add the tabPanel to the application
     // return app;}
function handleSubmitRefer(e){                                     // Post values to Spreadsheet // Write data from text fields into spreadsheet. Reference: https://developers.google.com/apps-script/uiapp
    var doc = SpreadsheetApp.openById("0AlLVOoV_2dFtdG80czFGUzBMS3Z1N3RlNll5TEx3eGc"); // SPREADSHEET_ID_GOES_HERE // Keep spreadsheet reference in handler, not in global per best practices
    var NAME=["fullName","zip","mainPh","ph2","cert"];
    var app=UiApp.getActiveApplication();
    var lastRow = doc.getLastRow();                                // Determine last populated row in spreadsheet
    var cell = doc.getRange('a1').offset(lastRow, 0);              // Locate next free cell in column A
    var i=0;cell.offset(0,i++).setValue(new Date());cell.offset(0,i++).setValue(Session.getUser().getEmail()); // Timestamp // User email ID
    var j=NAME.length;while(j--){                                  // Loop over all input elements (text boxes, check boxes, etc.)
        cell.offset(0,j+i).setValue(e.parameter[NAME[j]]);         // Column offset == j+i where i is the number of new fields/columns inserted // Note obj.foo == obj["foo"]; Note: We can access e.parameter.foo because above, we (1) used .setName('foo') and (2) added the grid containing those widgets as a callback element to the server handler
        app.getElementById(NAME[j]).setValue("");}                 // Clear the values from the text boxes so that new values can be entered
    app.close();return app;}?                                      // Clean up // Fetch UiInstance object // Close // Return — note: this line is REQUIRED for widget to close
// New section...
// grid.setWidget(y++,x,app.createLabel   ("Services needed"                   )                                              );
 /* grid.setWidget(y++,x,app.createCheckBox("Accounting: bookkeep"              ).setName("s1"  ).setId("s1"  ).setValue(false));if(r){if( r.s1  ){app.getElementById("s1"  ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Accounting: CPA/tax prep"          ).setName("s2"  ).setId("s2"  ).setValue(false));if(r){if( r.s2  ){app.getElementById("s2"  ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Attorney: bankruptcy"              ).setName("s3"  ).setId("s3"  ).setValue(false));if(r){if( r.s3  ){app.getElementById("s3"  ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Attorney: divorce/family"          ).setName("s4"  ).setId("s4"  ).setValue(false));if(r){if( r.s4  ){app.getElementById("s4"  ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Attorney: real estate"             ).setName("s5"  ).setId("s5"  ).setValue(false));if(r){if( r.s5  ){app.getElementById("s5"  ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Attorney: tax law"                 ).setName("s6"  ).setId("s6"  ).setValue(false));if(r){if( r.s6  ){app.getElementById("s6"  ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Attorney: wills/estates"           ).setName("s7"  ).setId("s7"  ).setValue(false));if(r){if( r.s7  ){app.getElementById("s7"  ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Auto loan: bad credit"             ).setName("s8"  ).setId("s8"  ).setValue(false));if(r){if( r.s8  ){app.getElementById("s8"  ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Business: appraiser"               ).setName("s9"  ).setId("s9"  ).setValue(false));if(r){if( r.s9  ){app.getElementById("s9"  ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Business: banker"                  ).setName("s10" ).setId("s10" ).setValue(false));if(r){if( r.s10 ){app.getElementById("s10" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Business: broker"                  ).setName("s11" ).setId("s11" ).setValue(false));if(r){if( r.s11 ){app.getElementById("s11" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Business: loans"                   ).setName("s12" ).setId("s12" ).setValue(false));if(r){if( r.s12 ){app.getElementById("s12" ).setValue(true )}}
    /* ---------------------------------------------------- * / y=0;x++; // Next column /* ---------------------------------------------------- * /
    grid.setWidget(y++,x,app.createCheckBox("Cash flow notes"                   ).setName("s13" ).setId("s13" ).setValue(false));if(r){if( r.s13 ){app.getElementById("s13" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Credit counseling"                 ).setName("s14" ).setId("s14" ).setValue(false));if(r){if( r.s14 ){app.getElementById("s14" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Debt negotiation"                  ).setName("s15" ).setId("s15" ).setValue(false));if(r){if( r.s15 ){app.getElementById("s15" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Financial planner/adviser"         ).setName("s16" ).setId("s16" ).setValue(false));if(r){if( r.s16 ){app.getElementById("s16" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Funeral planner/director"          ).setName("s17" ).setId("s17" ).setValue(false));if(r){if( r.s17 ){app.getElementById("s17" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Home: contractor"                  ).setName("s18" ).setId("s18" ).setValue(false));if(r){if( r.s18 ){app.getElementById("s18" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Home: security systems"            ).setName("s19" ).setId("s19" ).setValue(false));if(r){if( r.s19 ){app.getElementById("s19" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Home: window install/repair"       ).setName("s20" ).setId("s20" ).setValue(false));if(r){if( r.s20 ){app.getElementById("s20" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Insurance: commercial"             ).setName("s21" ).setId("s21" ).setValue(false));if(r){if( r.s21 ){app.getElementById("s21" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Insurance: life/acc/health"        ).setName("s22" ).setId("s22" ).setValue(false));if(r){if( r.s22 ){app.getElementById("s22" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Insurance: prop/casualty"          ).setName("s23" ).setId("s23" ).setValue(false));if(r){if( r.s23 ){app.getElementById("s23" ).setValue(true )}}
    /* ---------------------------------------------------- * / y=0;x++; // Next column /* ---------------------------------------------------- * /
    grid.setWidget(y++,x,app.createCheckBox("Mortgage: commercial"              ).setName("s24" ).setId("s24" ).setValue(false));if(r){if( r.s24 ){app.getElementById("s24" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Mortgage: residential, credit bad" ).setName("s25" ).setId("s25" ).setValue(false));if(r){if( r.s25 ){app.getElementById("s25" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Mortgage: residential, credit good").setName("s26" ).setId("s26" ).setValue(false));if(r){if( r.s26 ){app.getElementById("s26" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Mortgage: reverse"                 ).setName("s27" ).setId("s27" ).setValue(false));if(r){if( r.s27 ){app.getElementById("s27" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Private investigator"              ).setName("s28" ).setId("s28" ).setValue(false));if(r){if( r.s28 ){app.getElementById("s28" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Real estate agent: commercial"     ).setName("s29" ).setId("s29" ).setValue(false));if(r){if( r.s29 ){app.getElementById("s29" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Real estate agent: residential"    ).setName("s30" ).setId("s30" ).setValue(false));if(r){if( r.s30 ){app.getElementById("s30" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Real estate appraiser: commercial" ).setName("s31" ).setId("s31" ).setValue(false));if(r){if( r.s31 ){app.getElementById("s31" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Real estate appraiser: residential").setName("s32" ).setId("s32" ).setValue(false));if(r){if( r.s32 ){app.getElementById("s32" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Real estate investor: residential" ).setName("s33" ).setId("s33" ).setValue(false));if(r){if( r.s33 ){app.getElementById("s33" ).setValue(true )}}
    grid.setWidget(y++,x,app.createCheckBox("Real estate: title/escrow"         ).setName("s34" ).setId("s34" ).setValue(false));if(r){if( r.s34 ){app.getElementById("s34" ).setValue(true )}} * /
 // grid.setWidget(y++,x,app.createLabel   ("Services needed"                   )                            );
 /* grid.setWidget(y++,x,app.createCheckBox("Accounting: bookkeep"              ).setName("s1" ).setId("s1" ));
    grid.setWidget(y++,x,app.createCheckBox("Accounting: CPA/tax prep"          ).setName("s2" ).setId("s2" ));
    grid.setWidget(y++,x,app.createCheckBox("Attorney: bankruptcy"              ).setName("s3" ).setId("s3" ));
    grid.setWidget(y++,x,app.createCheckBox("Attorney: divorce/family"          ).setName("s4" ).setId("s4" ));
    grid.setWidget(y++,x,app.createCheckBox("Attorney: real estate"             ).setName("s5" ).setId("s5" ));
    grid.setWidget(y++,x,app.createCheckBox("Attorney: tax law"                 ).setName("s6" ).setId("s6" ));
    grid.setWidget(y++,x,app.createCheckBox("Attorney: wills/estates"           ).setName("s7" ).setId("s7" ));
    grid.setWidget(y++,x,app.createCheckBox("Auto loan: bad credit"             ).setName("s8" ).setId("s8" ));
    grid.setWidget(y++,x,app.createCheckBox("Business: appraiser"               ).setName("s9" ).setId("s9" ));
    grid.setWidget(y++,x,app.createCheckBox("Business: banker"                  ).setName("s10").setId("s10"));
    grid.setWidget(y++,x,app.createCheckBox("Business: broker"                  ).setName("s11").setId("s11"));
    grid.setWidget(y++,x,app.createCheckBox("Business: loans"                   ).setName("s12").setId("s12"));
    /* ---------------------------------------------------- * / y=0;x++; // Next column /* ---------------------------------------------------- * /
    grid.setWidget(y++,x,app.createCheckBox("Cash flow notes"                   ).setName("s13").setId("s13"));
    grid.setWidget(y++,x,app.createCheckBox("Credit counseling"                 ).setName("s14").setId("s14"));
    grid.setWidget(y++,x,app.createCheckBox("Debt negotiation"                  ).setName("s15").setId("s15"));
    grid.setWidget(y++,x,app.createCheckBox("Financial planner/adviser"         ).setName("s16").setId("s16"));
    grid.setWidget(y++,x,app.createCheckBox("Funeral planner/director"          ).setName("s17").setId("s17"));
    grid.setWidget(y++,x,app.createCheckBox("Home: contractor"                  ).setName("s18").setId("s18"));
    grid.setWidget(y++,x,app.createCheckBox("Home: security systems"            ).setName("s19").setId("s19"));
    grid.setWidget(y++,x,app.createCheckBox("Home: window install/repair"       ).setName("s20").setId("s20"));
    grid.setWidget(y++,x,app.createCheckBox("Insurance: commercial"             ).setName("s21").setId("s21"));
    grid.setWidget(y++,x,app.createCheckBox("Insurance: life/acc/health"        ).setName("s22").setId("s22"));
    grid.setWidget(y++,x,app.createCheckBox("Insurance: prop/casualty"          ).setName("s23").setId("s23"));
    /* ---------------------------------------------------- * / y=0;x++; // Next column /* ---------------------------------------------------- * /
    grid.setWidget(y++,x,app.createCheckBox("Mortgage: commercial"              ).setName("s24").setId("s24"));
    grid.setWidget(y++,x,app.createCheckBox("Mortgage: residential, credit bad" ).setName("s25").setId("s25"));
    grid.setWidget(y++,x,app.createCheckBox("Mortgage: residential, credit good").setName("s26").setId("s26"));
    grid.setWidget(y++,x,app.createCheckBox("Mortgage: reverse"                 ).setName("s27").setId("s27"));
    grid.setWidget(y++,x,app.createCheckBox("Private investigator"              ).setName("s28").setId("s28"));
    grid.setWidget(y++,x,app.createCheckBox("Real estate agent: commercial"     ).setName("s29").setId("s29"));
    grid.setWidget(y++,x,app.createCheckBox("Real estate agent: residential"    ).setName("s30").setId("s30"));
    grid.setWidget(y++,x,app.createCheckBox("Real estate appraiser: commercial" ).setName("s31").setId("s31"));
    grid.setWidget(y++,x,app.createCheckBox("Real estate appraiser: residential").setName("s32").setId("s32"));
    grid.setWidget(y++,x,app.createCheckBox("Real estate investor: residential" ).setName("s33").setId("s33"));
    grid.setWidget(y++,x,app.createCheckBox("Real estate: title/escrow"         ).setName("s34").setId("s34")); * /
*//*
function _handleSubmit(e){ var app=UiApp.getActiveApplication(); // Record values in spreadsheet upon clicking Submit button
 /* var SSID    = "0AlLVOoV_2dFtdGhPVWV0UXFYWUxXYjVFNGxhZWxVVWc";
    var doc     = SpreadsheetApp.openById(SSID);
    var lastRow = doc.getLastRow();                           // Determine spreadsheet’s last row with values
    var x,cell  = doc.getRange("a1").offset(lastRow, 0);x=0;  // Determine next free cell in column A
    // Write to spreadsheet // Can access e.parameter.value below because on the widgets, we (i) used setName("value") & (ii) added the grid containing those widgets as a callback element to the server handler.
    cell.offset(0,x++).setValue(e.parameter.Position       ); // Set value of cell equal to value of named parameter
    cell.offset(0,x++).setValue(e.parameter.First_name     );
    cell.offset(0,x++).setValue(e.parameter.Last_name      );
    cell.offset(0,x++).setValue(e.parameter.Email          );
    cell.offset(0,x++).setValue(e.parameter.Notes          );
    cell.offset(0,x++).setValue(e.parameter.Callback_days  );
    cell.offset(0,x++).setValue(e.parameter.Disposition    );
    cell.offset(0,x++).setValue(e.parameter.z00            ); // Date/time
    cell.offset(0,x++).setValue(e.parameter.z01            ); // User/Id
    cell.offset(0,x++).setValue(e.parameter.z10            ); // Note: .getTag() and/or hidden class do not work // Use: e.parameter.<id>_tag // Reference: http://stackoverflow.com/questions/11829479/using-tags-on-widgets
*//*
function addMemebrRow(app){
  var table = app.getElementById('table');
  var tag = parseInt(table.getTag());
  var numRows = tag+1;
  if(numRows >1){
    table.removeCell(numRows-1, 5);
    table.removeCell(numRows-1, 4);
  }
  table.setWidget(numRows, 0, app.createTextBox ().setId('fName'+numRows).setName('fName'+numRows));
  table.setWidget(numRows, 1, app.createTextBox ().setId('lName'+numRows).setName('lName'+numRows));
  table.setWidget(numRows, 2, app.createDateBox ().setId('dob'+numRows));
  table.setWidget(numRows, 3, app.createTextArea().setId('note'+numRows).setName('note'+numRows));  
  table.setTag(numRows.toString());
  addButtons(app);
}

function addButtons(app){
  var table = app.getElementById('table');
  var numRows = parseInt(table.getTag());
  
  //Create handler to add/remove row
  var addRemoveRowHandler = app.createServerHandler('_addRemoveRow');
  addRemoveRowHandler.addCallbackElement(table);
  
  //Add row button and handler
  var addRowBtn = app.createButton('+').setId('addOne').setTitle('Add row');
  table.setWidget(numRows, 4, addRowBtn);
  addRowBtn.addMouseUpHandler(addRemoveRowHandler);
  
  //remove row button and handler
  var removeRowBtn = app.createButton('-').setId('removeOne').setTitle('Remove row');
  table.setWidget(numRows, 5, removeRowBtn);
  removeRowBtn.addMouseUpHandler(addRemoveRowHandler);
}

function _addRemoveRow(e){
  var app = UiApp.getActiveApplication();
  var table = app.getElementById('table');
  var tag = parseInt(e.parameter.table_tag);
  var source = e.parameter.source;
  if(source == 'addOne'){
    table.setTag(tag.toString());
    addMemebrRow(app);
  }
  else if(source == 'removeOne'){
    if(tag > 1){
      //Dcrement the tag by one
      var numRows = tag-1;
      table.removeRow(tag);
      //Set the new tag of the table
      table.setTag(numRows.toString());
      //Add buttons in previous row
      addButtons(app); 
    }
  }
  return app;
}


function _processSubmittedData(e){
  var app = UiApp.getActiveApplication();
  
  /*Let us make a json with name result
  //Output will be like
result : {
  grupName : 'myGroup',
  members  : [{dateOfBirth='Wed Feb 29 10:30:00 PST 2012', lastName= 'lastName of Member1', firstName='firstName of Member1', note='Note for member1'},
                {dateOfBirth='Wed Feb 27 10:30:00 PST 2012', lastName= 'lastName of Member2', firstName='firstName of Member2', note='Note for member2'},
                {dateOfBirth='Wed Feb 26 10:30:00 PST 2012', lastName= 'lastName of Member3', firstName='firstName of Member3', note='Note for member3'},]

}

//* /  
  var result = {};
  result.groupName = e.parameter.groupName;
  var numMembers = parseInt(e.parameter.table_tag);
  result.members = []; 
  //Member info array
  for(var i=1; i<=numMembers; i++){
    var member = {};
    member.firstName   = e.parameter['fName'+i];
    member.lastName    = e.parameter['lName'+i];
    member.dateOfBirth = e.parameter['dob'  +i];
    member.note        = e.parameter['note' +i];
    result.members.push(member);
  }
  //Here result is the json of submitted data
  var html = app.createHTML(Utilities.jsonStringify(result), true);
  app.add(html);
  return app;
}

function _handleSubmit(e){ // Record values in spreadsheet upon clicking Submit button
    Browser.msgBox(e.parameter["sub11"]);}
 // var app=UiApp.getActiveApplication(),user=Session.getUser().getEmail(),d=new Date().getTime(),db=ScriptDb.getMyDb(),r=db.query({id:e.getTag()}).next();
    /*
    db.save(r["bid"][d]={
                          "amt"    : e.parameter["bid"+j]
                        , "bidder" : user
                        , "date"   : d
                        });app.close();return app;} // Write to database // Clean up, close & return — note: return is REQUIRED for widget to actually close
    * /
/*  var ob = {
                 table         : ""
             ,   bidDate       : {year:d.getYear() , month:d.getMonth()+1 , day:d.getDay()+1}
             ,   bidMaker      : Session.getUser().getEmail()
             ,   addedDate     : e.parameter.z00
             ,   addedUser     : e.parameter.z01
             ,   bid           : e.parameter["bid"+j]
             ,   Position      : e.parameter.Position
             ,   First_name    : e.parameter.First_name
             ,   Last_name     : e.parameter.Last_name
             ,   Email         : e.parameter.Email
             ,   Notes         : e.parameter.Notes
             ,   Callback_days : e.parameter.Callback_days
             ,   Disposition   : e.parameter.Disposition
             };  db.save(ob);app.close();return app;} 
	{// Archived Original
		/* Code
String.prototype.splitCSV = function(sep) {  // Reference: http://www.greywyvern.com/?post=258  Google Search: parse string to array javascript
  for (var foo = this.split(sep = sep || ","), x = foo.length - 1, tl; x >= 0; x--) {
    if (foo[x].replace(/"\s+$/, '"').charAt(foo[x].length - 1) == '"') {
      if ((tl = foo[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
        foo[x] = foo[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
      } else if (x) {
        foo.splice(x - 1, 2, [foo[x - 1], foo[x]].join(sep));
      } else foo = foo.shift().split(sep).concat(foo);
    } else foo[x].replace(/""/g, '"');
  } return foo;
};
* /
function dexScrape(){ // www.dexknows.com // Notes: 30 results per page - 4 rotating ads = 26 useable results
    var LOAD   = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    // var doc    = SpreadsheetApp.openById("0AlLVOoV_2dFtdEZqMFdZN2VNMk55VXRGWHhmeThEU2c");var lastRow=doc.getLastRow();var cell=doc.getRange('a1').offset(lastRow, 0); // Determine last populated row in spreadsheet // Locate next free cell in column A
    var action = "http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-greenville-sc/?distance=0&sort=&view=list&where=Greenville%2C+SC&st=30&pageset=1";
    /* Using scrape dataset & writing to spreadsheet; substitute with scrape via JSON + write to db oject store
    var LI="id:parseInt";var QUE=["name:","street:","city:","state:","phone:","profileurl:","websiteurl:","dkid:","categoryprettyname:"];var REP="\"";var MARK=new Array();var ob,j,i=QUE.length;while(i--){MARK[i]=REP}
    var data   = UrlFetchApp.fetch(action).getContentText().split(LI);i=data.length;while(i--){data[i]=data[i].scrapeDataset(false,QUE,MARK,MARK,false,false);data[i].shift();} data.shift(); // Fetch+scrape // var START="<!-- results-->";var LI="<div class=\"details\">";
    doc.getActiveSheet().getRange(lastRow+1,1,data.length,data[0].length).setValues(data);Logger.log(data);
    * /
    var ob,db=ScriptDb.getMyDb(),data=UrlFetchApp.fetch(action).getContentText().split("addPoint");
    Logger.log(data[15].scrape("","(",");")[1]
                       .replace("{","{\"")
                       .replaceAll("parseFloat(","")
                       .replaceAll("parseInt(","")
                       .replaceAll("\",","\",\"")
                       .replaceAll(":\"","\":\"")
                       .replaceAll("),","),\"")
                       .replaceAll("\"),","\",")
                       .replaceAll("\",\" ","\",\"")
                       );
    i=data.length;
    while(i---1){
        ob=JSON.parse(data[i].scrape("","(",");")[1]
                             .replace("{","{\"")
                             .replaceAll("parseFloat(","")
                             .replaceAll("parseInt(","")
                             .replaceAll("\",","\",\"")
                             .replaceAll(":\"","\":\"")
                             .replaceAll("),","),\"")
                             .replaceAll("\"),","\",")
                             .replaceAll("\",\" ","\",\"")
                             );
        db.save(ob);
    } // Fetch+scrape // Reference: https://developers.google.com/apps-script/scriptdb
}
function main_ac(){ // Auction.com
	function acIn (){                                                                                   // Takes single cell on input sheet to fully unfurled table on SS sheet labeled “Start.” // Example URIs to scrape // http://www.auction.com/California/Riverside-County/residential-real-estate-home-auctions.html; URL to pickup list records. // http://www.auction.com/California/Riverside-County/pre-foreclosure-real-estate-auctions.html // http://www.auction.com/California/Riverside-County/pre-foreclosure-trustee-real-estate-auctions.html // http://www.auction.com/ajax/global-search-ajax.php
		var DM    = avmDataModel();var UL=DM[2];var DEL=DM[3];var INS=DM[4];var QUE=DM[5];var BEG=DM[6];var END=DM[7]; // Fetch & load/cache DATA MODEL
		var dR    = sheet[0][0].getRange(1,2,range[0][0].getHeight(),1).getValues().join().replaceAll(",","").hexDecode().split(UL); // FETCH DATA (meta-string), decode & split into ARRAY of RECORDS (raw HTML, pre-scraped version)
		var i     = dR.length;while(i--){                                                               // Loop records for scraping
			dR[i] = dR[i].scrapeDataset(false, QUE, BEG, END, DEL, INS);                                // SPLIT each record into ARRAY of FIELDS; dR[i][j] for each field;
			if(dR[i][ 1]){dR[i][0] = dR[i][ 1].parseAddressA()}                                         // PARSE ADDRESS
			if(dR[i][16]){dR[i].push(dR[i][16].split("/"))}else{if(dR[i][17]){dR[i].push(dR[i][17].split("/"))}}} // Parse DATE (2 possible locations)
		sheet[1][0].getRange(1,1,1,1).getCell(1,1).setValue(dR.furlN4());sheet[0][0].deleteRows(2,range[0][0].getHeight());} // WRITE 4D array to cell as string for storage // Clear input sheet via rows delete
	function acOut(){                                                                                   // Appends AVM, calculates, sorts & writes internally to archive
        var DM    = avmDataModel();var fields=DM[0];var types=DM[1];                                    // Fetch & load/cache DATA MODEL
        var dR    = sheet[1][0].getRange(1,1,1,1).getCell(1,1).getValue().replaceAll("\n","").unfurl(); // FETCH data records; unfurl string (into 4D array)
        var dRpak = dR.splice(0,Math.min(PAKSIZE,dR.length));sheet[1][0].getRange(1,1,1,1).getCell(1,1).setValue(dR.furlN4()); // Select/extract/“splice” SUBSET; account for short-length case // Replace SUPERSET // Process SUBSET to follow
        var i     = dRpak.length;while(i--){if(isArray(dRpak[i][0])){dRpak[i].push(dRpak[i][0].avmData([dRpak[i][13],dRpak[i][14]]))}else{dRpak.splice(i,1)}} // Append AVM arrays to each data record (4D -> 5D -> 2D) // Reduce 5D array to 2D as prep to write out // Delete record if first element is not an array (i.e., the address) on the presumption that the element resulted from a failed scrape // Note: To log this line, use the following code -> var i=dRpak.length;while(i--){dRpak[i].push(dRpak[i][0].avmData([dRpak[i][9],dRpak[i][10]])).logArrayElements1N5()}
        OUT.concat(dRpak.avmDataPrep(fields,types)).writeToAPI_Zoho();}                                 // Write out to Zoho // Simplified example for testing: [APP,FORM,["City", "Zip"],[["city2","22222"],["city3","33333"]]].writeToAPI_Zoho()} // var out=dRpak.avmDataPrep(fields,types);writeToAPI_Zoho(APP,FORM,out[0],out[1]);} // Log as follows // Before: fields.logArrayN5();dRpak.logArrayN5(); // After: compareArrays(out[0],out[1]);
    {// Main
		{// JavaScript // load library // Add the following code at the top of each project/file to load the following files.
			var LOAD = ["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];
			eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]); // Load master file containing array of URI strings // Fetch array of URIs representing JS files library to load per the “client”
			var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())}} // Evaluates code at each array element, URI.
		{// Code
			var PAKSIZE    = 3; var avm=new Array();     // Size of package of records to be processed and written out the DB server // Create new array to hold full array of AVM data (avmData()) // var labelArr=[].avmData(); // Create empty array [] to trigger return of array containing only labels (labelArr);
            var OUT        = ["dealdigger","Inventory"]; // [applicationName,formName] array for write out
			var SS_KEY     = ["0AlLVOoV_2dFtdG1STy1nVWNSNjNtUjdxbHg4YUpfS2c","0AlLVOoV_2dFtdGpmOXE4OWpkeUE5RkJuS0FfakZDWXc"]; // [From: Auction.com — load, To: Auction.com — scrape] // Elements taken from URL in address line of browser of open Google Spreadsheet
			var SHEET_NAME = [["Sheet1"],["Input"]];     // Array of sheet arrays[][] // [["Sheet1"],["Track","Post","Input","Start","Prep","Out"]]  // "Post" Not currently used; but do not delete as it will cause an updating error
            var CELL_TRIG  = [[2,2],[1,1]];              // Array: 1st level: sheet, 2nd level: cell (row,col) — test for non-null values as trigger to run script
            var ss=new Array();var sheet=new Array();var range=new Array();var cellTrig=new Array();i=SS_KEY.length;while(i--){ss[i]=SpreadsheetApp.openById(SS_KEY[i]);sheet[i]=new Array();range[i]=new Array();var j=SHEET_NAME[i].length;while(j--){sheet[i][j]=ss[i].getSheetByName(SHEET_NAME[i][j]);range[i][j]=sheet[i][j].getDataRange();try{cellTrig[i]=range[i][j].getCell(CELL_TRIG[i][0],CELL_TRIG[i][1]).getValue()}catch(e){cellTrig[i]=null}}} // Loop to define sheets/ranges globally
            var funcArr    = [function(){acIn()},function(){acOut()}];var ii=funcArr.length;while(ii--){if(cellTrig[ii].toString().length>4){funcArr[ii]();break;}}}}} // Call sub-functions; break after singular execution; // .length > 4 because null array = [""]
function main_ac(){ // Auction.com
	function acIn   (){                                                                                                // Takes single cell on input sheet to fully unfurled table on SS sheet labeled “Start.” // Example URIs to scrape // http://www.auction.com/California/Riverside-County/residential-real-estate-home-auctions.html; URL to pickup list records. // http://www.auction.com/California/Riverside-County/pre-foreclosure-real-estate-auctions.html // http://www.auction.com/California/Riverside-County/pre-foreclosure-trustee-real-estate-auctions.html // http://www.auction.com/ajax/global-search-ajax.php
		var DM    = avmDataModel();var UL=DM[2];var DEL=DM[3];var INS=DM[4];var QUE=DM[5];var BEG=DM[6];var END=DM[7]; // Fetch & load/cache DATA MODEL
		var dR    = sheet[0][0].getRange(1,2,range[0][0].getHeight(),1).getValues().join().replaceAll(",","").hexDecode().split(UL); // FETCH DATA (meta-string), decode & split into ARRAY of RECORDS (raw HTML, pre-scraped version)
		var i     = dR.length;while(i--){                                                                              // Loop records for scraping
			dR[i] = dR[i].scrapeDataset(false, QUE, BEG, END, DEL, INS);                                               // SPLIT each record into ARRAY of FIELDS; dR[i][j] for each field;
			if(dR[i][ 1]){dR[i][0] = dR[i][ 1].parseAddressA()}                                                        // Parse ADDRESS
			if(dR[i][16]){dR[i].push(dR[i][16].split("/"))}else{if(dR[i][17]){dR[i].push(dR[i][17].split("/"))}}}      // Parse DATE (2 possible locations)
		sheet[1][2].getRange(1,1,1,1).getCell(1,1).setValue(dR.furlN4())}                                              // WRITE 4D array to cell as string for storage
	function acOut  (){                                                                                                // Appends AVM, calculates, sorts & writes internally to archive
		var DM    = avmDataModel();var fields=DM[0];var types=DM[1];                                                   // Fetch & load/cache DATA MODEL
        var dR    = sheet[1][2].getRange(1,1,1,1).getCell(1,1).getValue().unfurl();                                    // FETCH data records; unfurl string (into 4D array)
        var dRpak = dR.splice(0,Math.min(PAKSIZE,dR.length));sheet[1][2].getRange(1,1,1,1).getCell(1,1).setValue(dR.furlN4()); // Select/extract/“splice” SUBSET; account for short-length case // Replace SUPERSET // Process SUBSET to follow
        var i     = dRpak.length;while(i--){dRpak[i].push(dRpak[i][0].avmData([dRpak[i][13],dRpak[i][14]]))}           // Append AVM arrays to each data record (4D -> 5D -> 2D) // Reduce 5D array to 2D as prep to write out // Note: To log this line, use the following code -> var i=dRpak.length;while(i--){dRpak[i].push(dRpak[i][0].avmData([dRpak[i][9],dRpak[i][10]])).logArrayElements1N5()}
        var out   = dRpak.avmDataPrep(fields,types);                                                                   // Log as follows // Before: fields.logArrayN5();dRpak.logArrayN5(); // After: compareArrays(out[0],out[1]);
        writeToAPI_Zoho(APP,FORM,out[0],out[1]);}                                                                      // Write out to Zoho // Simplified example for testing: writeToAPI_Zoho(APP,FORM,["City", "Zip"],[["city2","22222"],["city3","33333"]])}
//
    { // Main
		{ // JavaScript // Add the following code at the top of each project/file to load the following files.
		//	Load JavaScript library
			var CLIENT = "googleScripts";
			var LOAD   = "https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js";
			eval(UrlFetchApp.fetch(LOAD).getContentText()); // Loads master file containing array of URI strings
			var files  = load(CLIENT); // Fetches array of URIs representing JS files library to load per the “client”
			var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())}; // Evaluates code at each array element, URI.
		}
		{ // Parameters
			{ // Sheet/range
			var PAKSIZE      = 2;           // Size of the package of records to be processed and written out the DB server (subtract 1 because array element count begins at 0, not 1; i.e. enter "24" here if 25 records are desired in the package)
			var APP          = "dealdigger";// Write object
			var FORM         = "Inventory"; // Write object
			var SS_KEY       = new Array(); // Elements are taken from the URL in the address line of the browser of the open Google Spreadsheet
			SS_KEY[0]        = "0AlLVOoV_2dFtdG1STy1nVWNSNjNtUjdxbHg4YUpfS2c"; // From: Auction.com — load
			SS_KEY[1]        = "0AlLVOoV_2dFtdGpmOXE4OWpkeUE5RkJuS0FfakZDWXc"; //   To: Auction.com — scrape
			var SHEET_NAME   = new Array(); // Array of sheet arrays [0][0]
			i=SS_KEY.length;while(i--){SHEET_NAME[i] = new Array()}
			SHEET_NAME[0][0] = "Sheet1";
			SHEET_NAME[1][0] = "Track";
			SHEET_NAME[1][1] = "Post"; // Not currently used; but do not delete as it will cause an updating error
			SHEET_NAME[1][2] = "Input";
			SHEET_NAME[1][3] = "Start";
			SHEET_NAME[1][4] = "Prep";
		//	SHEET_NAME[1][5] = "Out";
			var ss           = new Array();
			var sheet        = new Array();
			var range        = new Array();
			i=SS_KEY.length;while(i--){ // Loop to define sheets/ranges globally
				ss[i]        = SpreadsheetApp.openById(SS_KEY[i]);
				sheet[i]     = new Array();
				range[i]     = new Array();
				var j=SHEET_NAME[i].length;while(j--){sheet[i][j] = ss[i].getSheetByName(SHEET_NAME[i][j])}
			}   updateRangesData();
			}
			{ // Functions
			var funcArr    = new Array(); // Define array of sub-functions; call to execute global script. Call syntax: funcArr[i](); // Assign the function to a variable to allow looping to call the function inside the braces.
			//	funcArr[1] = function(){acIn ()} // Reference: http://forums.devshed.com/javascript-development-115/assigning-a-function-to-a-variable-without-it-firing-633070.html
				funcArr[1] = function(){acOut()} // --> Best Reference: http://stackoverflow.com/questions/1140089/how-does-an-anonymous-function-in-javascript-work // Reference: http://2007-2010.lovemikeg.com/2008/08/17/a-week-in-javascript-patterns-self-invocation/
		//	var fetchLabels=new Array();var labelArr=fetchLabels.avmData();var avm=new Array(); // Create empty array (fetchLabels) to trigger return of array containing only labels (labelArr); then create new array to hold full array of AVM data (avmData())
			var avm=new Array(); // Create new array to hold full array of AVM data (avmData()) // var labelArr=[].avmData(); // Create empty array [] to trigger return of array containing only labels (labelArr);
			}
			{ // Tracking
			var x          = 0;
			var ignitionOn = new Array();             // Supports restarts: Determines POSITION of existing state of code that has run
			for(i=0;i<=2;i++){                        // Initialize and set to zero, all array elements from [1][0] to [2][3].
				ignitionOn[i] = new Array();          // i: [1] Position of Latest Run Code (“LRC”); [2] Position of code SEARCHING for LRC.
				for(j=0;j<=3;j++){                    // j: [1] Major code block, [2] Minor code block, [3] Row — Note: [2][3] variable is just labeled “row”
					if(j===0){ignitionOn[i][j]=false} // Array of boolean “switches.” Flips on when code restart reaches the point of last run. [0][0] 
					else{
						if(i===2){ignitionOn[i][j] = -1}
						else     {ignitionOn[i][j] =  0}}}}}}
		{ // Code
		var ig=range[1][0].getValues();ignitionOn[1]=ig[1]; // *** Tracking *** Fetches recorded values to detect leftoff location of lastly executed script. Detects latest blocks & rows to run as recorded & restarts script accordingly.
		var leng=funcArr.length;for(ii=1;ii<leng;ii++){                                                       // Calls all functions/subroutines in sequence.
			x=1;ignitionOn[2][x]++;ignitionOn[0][x]=(ignitionOn[0][x]||(ignitionOn[1][x]==ignitionOn[2][x])); // *** Tracking *** Increments block position & tests ignition
			if( ignitionOn[0][x]){range[1][0].getCell(1,x).setValue(ignitionOn[2][x]);                        // *** Tracking *** Update tracking cell with new value
				ignitionOn[2][2] = -1;									                                      // *** Tracking *** Resets nested counting variable
				funcArr[ii]();}  // Calls function. Note: The parentheses “()” invoke the function call. Stating the function name alone, “funcArr[i]” without the parens will have no effect.
			updateRangesData();}}}} // Updates ranges
function main_ac(){ // Auction.com
function acIn   (){ // Takes single cell on input sheet to fully unfurled table on SS sheet labeled “Start.” // Example URIs to scrape // http://www.auction.com/California/Riverside-County/residential-real-estate-home-auctions.html; URL to pickup list records. // http://www.auction.com/California/Riverside-County/pre-foreclosure-real-estate-auctions.html // http://www.auction.com/California/Riverside-County/pre-foreclosure-trustee-real-estate-auctions.html // http://www.auction.com/ajax/global-search-ajax.php
	{ // Code
	var dR=sheet[0][0].getRange(1,2,range[0][0].getHeight(),1).getValues().join().replaceAll(",","").hexDecode().split(UL); // FETCH data (meta-string), decode & split into ARRAY of RECORDS (raw HTML, pre-scraped version)
	var i=dR.length;while(i--){                                                                                             // Loop records for scraping
		dR[i] = dR[i].scrapeDataset(false, QUE, BEG, END, DEL, INS); // *** ARGUMENTS TEMPORARILY TO AVMDATAMODEL ***       // SPLIT each record into ARRAY of FIELDS; dR[i][j] for each field;
		if(dR[i][ 1]){dR[i][0] = dR[i][ 1].parseAddressA()}                                                                 // Parse ADDRESS
		if(dR[i][12]){dR[i].push(dR[i][12].split("/"))}else if(dR[i][13]){dR[i].push(dR[i][13].split("/"))}}                // Parse DATE (from one of two possible locations)
	sheet[1][2].getRange(1,1,1,1).getCell(1,1).setValue(dR.furlN4())}}                                                      // WRITE 4Darray[][][][] to cell as string for storage
function acAvm  (){ // Appends AVM, calculates, sorts & writes internally to archive
	var dR = sheet[1][2].getRange(1,1,1,1).getCell(1,1).getValue().unfurl();                                                // FETCH data records; unfurl string into array
	var i=dR.length;while(i--){dR[i].push(dR[i][0].avmData([dR[i][9],dR[i][10]]));                                          // Append AVM arrays to each data record
// ========= ***** Log array elements — 5 dimensions ***** =========
var j,k,m,n;
if(isArray(dR[i])){j=dR[i].length;while(j--){
	if(isArray(dR[i][j])){k=dR[i][j].length;while(k--){
		if(isArray(dR[i][j][k])){m=dR[i][j][k].length;while(m--){
			if(isArray(dR[i][j][k][m])){n=dR[i][j][k][m].length;while(n--){
				Logger.log("dR["+i+"]["+j+"]["+k+"]["+m+"]["+n+"]: "+dR[i][j][k][m][n]);
			}}else{Logger.log("dR["+i+"]["+j+"]["+k+"]["+m+"]: "+dR[i][j][k][m]);}
		}}else{Logger.log("dR["+i+"]["+j+"]["+k+"]: "+dR[i][j][k]);}
	}}else{Logger.log("dR["+i+"]["+j+"]: "+dR[i][j]);}
}}else{Logger.log("dR["+i+"]: "+dR[i])}
// ========= ***** End log array elements ***** =========
//i=fields.length;while(i--){Logger.log("fields["+i+"]: "+fields[i]);Logger.log("dRpak[0]["+i+"]: "+dRpak[0][i]);}
//      var i=dRpak.length;while(i--){dRpak[i].push(dRpak[i][0].avmData([dRpak[i][13],dRpak[i][14]]));dRpak[i]=dRpak[i].flattenN4()}      // Append AVM arrays to each data record (4D -> 5D -> 2D) // Reduce 5D array to 2D as prep to write out // Note: To log this line, use the following code -> var i=dRpak.length;while(i--){dRpak[i].push(dRpak[i][0].avmData([dRpak[i][9],dRpak[i][10]])).logArrayElements1N5()} 
//var X=121;
//      var i=dRpak.length;while(i--){dRpak[i].push(dRpak[i][0].avmData([dRpak[i][13],dRpak[i][14]]));dRpak[i]=dRpak[i].flattenN4().splice(0,X)}      // Append AVM arrays to each data record (4D -> 5D -> 2D) // Reduce 5D array to 2D as prep to write out // Note: To log this line, use the following code -> var i=dRpak.length;while(i--){dRpak[i].push(dRpak[i][0].avmData([dRpak[i][9],dRpak[i][10]])).logArrayElements1N5()} 
//      var NUMS=[9].getSeries([110,114]);i=NUMS.length;while(i--){if(dRpak[0][NUMS[i]]){if(isNumber(dRpak[0][NUMS[i]].toString().replaceAll(",",""))){dRpak[0][NUMS[i]]=dRpak[0][NUMS[i]].toString().replaceAll(",","")}else{dRpak[0][NUMS[i]]=""}}else{dRpak[0][NUMS[i]]=""}} // Delete commas from numbers or return null
//		var OMIT=[29,52,54,76,77,98,108,109,115,116,122,128,131].getSeries([19,23, 37,43, 57,70, 79,96, 100,102, 118,120]);
//      var OMIT=[29,52,54,76,77,98,108,109,115,116            ].getSeries([19,23, 37,43, 57,70, 79,96, 100,102, 118,120]);
//      i=OMIT.length;while(i--){dRpak[0].splice(OMIT[i],1);fields.splice(OMIT[i],1);} // Delete specific array positions
        //sheet[1][2].getRange(1,1,1,2).getCell(1,2).setValue(dRpak.furlN2());// Furl & write updated dataset to cell (5D/2D array)
//fields = fields.splice(0,(X-OMIT.length));
//Logger.log("out[0]: "+out[0]);Logger.log("out[1]: "+out[1]);
	}
	sheet[1][2].getRange(1,1,1,2).getCell(1,2).setValue(dR.furlN5())
	} // Loop over data records // Create array of AVM estimates: out[][][]:[0][stats],[1][labels],[2][estimate arrays][] // Fetch/append AVMs
function acOut(){writeToAPI_Zoho(APP,FORM,["City", "Zip"],[["city2","22222"],["city3","33333"]])} // Writes results externally to Zoho database
{ // Main
	{ // JavaScript // Add the following code at the top of each project/file to load the following files.
	//	Load JavaScript library
		var CLIENT = "googleScripts";
		var LOAD   = "https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js";
		eval(UrlFetchApp.fetch( LOAD ).getContentText()); // Loads master file containing array of URI strings
		var files  = load(CLIENT); // Fetches array of URIs representing JS files library to load per the “client”
		var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())} // Evaluates code at each array element, URI.
	}
	{ // Parameters
		{ // Sheet/range
		var APP          = "dealdigger";// Write object
		var FORM         = "Inventory"; // Write object
		var SS_KEY       = new Array(); // Elements are taken from the URL in the address line of the browser of the open Google Spreadsheet
		SS_KEY[0]        = "0AlLVOoV_2dFtdG1STy1nVWNSNjNtUjdxbHg4YUpfS2c"; // From: Auction.com — load
		SS_KEY[1]        = "0AlLVOoV_2dFtdGpmOXE4OWpkeUE5RkJuS0FfakZDWXc"; //   To: Auction.com — scrape
		var SHEET_NAME   = new Array(); // Array of sheet arrays [0][0]
		i=SS_KEY.length;while(i--){SHEET_NAME[i] = new Array()}
		SHEET_NAME[0][0] = "Sheet1";
		SHEET_NAME[1][0] = "Track";
		SHEET_NAME[1][1] = "Post"; // Not currently used; but do not delete as it will cause an updating error
		SHEET_NAME[1][2] = "Input";
		SHEET_NAME[1][3] = "Start";
		SHEET_NAME[1][4] = "Prep";
	//	SHEET_NAME[1][5] = "Out";
		var ss           = new Array();
		var sheet        = new Array();
		var range        = new Array();
		i=SS_KEY.length;while(i--){ // Loop to define sheets/ranges globally
			ss[i]        = SpreadsheetApp.openById(SS_KEY[i]);
			sheet[i]     = new Array();
			range[i]     = new Array();
			var j=SHEET_NAME[i].length;while(j--){sheet[i][j] = ss[i].getSheetByName(SHEET_NAME[i][j])}
		}   updateRangesData();
		}
		{ // Functions
		var funcArr    = new Array(); // Define array of sub-functions; call to execute global script. Call syntax: funcArr[i](); // Assign the function to a variable to allow looping to call the function inside the braces.
		//	funcArr[1] = function(){acIn ()} // Reference: http://forums.devshed.com/javascript-development-115/assigning-a-function-to-a-variable-without-it-firing-633070.html
		//	funcArr[2] = function(){acAvm()} // --> Best Reference: http://stackoverflow.com/questions/1140089/how-does-an-anonymous-function-in-javascript-work // Reference: http://2007-2010.lovemikeg.com/2008/08/17/a-week-in-javascript-patterns-self-invocation/
			funcArr[1] = function(){acOut()}
		var fetchLabels=new Array();var labelArr=fetchLabels.avmData();var avm=new Array(); // Create empty array (fetchLabels) to trigger return of array containing only labels (labelArr); then create new array to hold full array of AVM data (avmData())
		}
		{ // Tracking
		var x          = 0;
		var ignitionOn = new Array();             // Supports restarts: Determines POSITION of existing state of code that has run
		for(i=0;i<=2;i++){                        // Initialize and set to zero, all array elements from [1][0] to [2][3].
			ignitionOn[i] = new Array();          // i: [1] Position of Latest Run Code (“LRC”); [2] Position of code SEARCHING for LRC.
			for(j=0;j<=3;j++){                    // j: [1] Major code block, [2] Minor code block, [3] Row — Note: [2][3] variable is just labeled “row”
				if(j===0){ignitionOn[i][j]=false} // Array of boolean “switches.” Flips on when code restart reaches the point of last run. [0][0] 
				else{
					if(i===2){ignitionOn[i][j] = -1}
					else     {ignitionOn[i][j] =  0}}}}}}
	{ // Code
	var ig=range[1][0].getValues();ignitionOn[1]=ig[1]; // *** Tracking *** Fetches recorded values to detect leftoff location of lastly executed script. Detects latest blocks & rows to run as recorded & restarts script accordingly.
	var leng=funcArr.length;for(ii=1;ii<leng;ii++){                                                       // Calls all functions/subroutines in sequence.
		x=1;ignitionOn[2][x]++;ignitionOn[0][x]=(ignitionOn[0][x]||(ignitionOn[1][x]==ignitionOn[2][x])); // *** Tracking *** Increments block position & tests ignition
		if( ignitionOn[0][x]){range[1][0].getCell(1,x).setValue(ignitionOn[2][x]);                        // *** Tracking *** Update tracking cell with new value
			ignitionOn[2][2] = -1;									                                      // *** Tracking *** Resets nested counting variable
			funcArr[ii]();}  // Calls function. Note: The parentheses “()” invoke the function call. Stating the function name alone, “funcArr[i]” without the parens will have no effect.
		updateRangesData();} // Updates ranges
	}
}}
function main_fr(){ // Foreclosure Radar
function calc   (){
	{ // Parameters
		{ // Column headers
		var colsAdded    = 0;
		var LABEL        = new Array();
			LABEL[1]     = "Price";                                           colsAdded++; // New column	
			LABEL[2]     = "Spread";                                          colsAdded++; // New column
			LABEL[3]     = "Pct";                                             colsAdded++; // New column
			LABEL[4]     = "EstimatedValue";                                               // Col AA
			LABEL[5]     = "EstimatedTotalLoanBalance";                                    // Col AB
			LABEL[6]     = "EstimatedBid";                                                 // Col AK
			LABEL[7]     = "OpeningBid";                                                   // Col AL
			LABEL[8]     = "EstimatedLoanPosition";                                        // Col AN
		}
		{ // Initializations
		var val          = new Array();
		var labColNum    = new Array();
		var PREFIX       = "Copy of ";
        var ROW_START    = 2;
		var PCT_MAX      = 75;
		var startDelete  = false;
		var rowsToInsert = 0;
		var colsToInsert = 0;
		var row          = ROW_START;
		}
		{ // Clip columns
		var INDEX        = new Array();                                                    // For clipping columns. The starting point for each clipped segment.
		var SPAN         = new Array();                                                    // For clipping columns. The number of columns to clip for each clipped segment.
			INDEX[1]     = 41;
			SPAN[1]      = 13;
			INDEX[2]     = 39;
			SPAN[2]      = 1;
			INDEX[3]     = 36;
			SPAN[3]      = 1;
			INDEX[4]     = 29;
			SPAN[4]      = 4;
			INDEX[5]     = 9;
			SPAN[5]      = 11;
			INDEX[6]     = 2;
			SPAN[6]      = 2;
		}
	}
	{ // 1. Copy & sheet/range
		var countRows = range[0][0].getHeight();                                           // Count rows
		var countCols = range[0][0].getWidth();                                            // Count columns
		updateRangesCount( countRows, (countCols+colsAdded) );                             // Update ranges in second ss with counted rows and columns
		sheet[0][0].copyTo(ss[1]);                                                         // Copies input ss to destination ss
		var newSheetName            = PREFIX + sheet[0][0].getName();                      // Construct name of new sheet
		sheet[1][sheet[1].length]   = ss[1].getSheetByName(newSheetName);                  // Define new sheet
		range[1][sheet[1].length-1] = sheet[1][sheet[1].length-1].getDataRange();          // Define new range
		for(var i=1;i<=3;i++){
			rowsToInsert = countRows - sheet[1][i].getMaxRows();                           // Calculates row deficit
			if(rowsToInsert > 0){sheet[1][i].insertRowsAfter(1,rowsToInsert)}              // Inserts rows if necessary
			if(i<3){range[1][SHEET_NAME[1].length].copyTo(range[1][i])}}                   // Copy sheet range to new sheet, “In” and “Calc” pages
		ss[1].setActiveSheet(sheet[1][sheet[1].length-1]);ss[1].deleteActiveSheet();       // Delete imported sheet after preparing sheet for deletion
		range[1][2] = sheet[1][2].getDataRange();                                          // Define range
		range[1][2] = sheet[1][2].getRange(1,1,countRows,(countCols+colsAdded));           // Add new columns to range
		for(i=1;i<=colsAdded;i++){range[1][2].getCell(1,(countCols+i)).setValue(LABEL[i])} // Label new columns
		for(i=1;i<LABEL.length;i++){labColNum[i] = getColNum(sheet[1][2],1,LABEL[i])}      // Fetch column numbers
	}
	{ // 2. Calculate & sort
		for(var row=ROW_START;row<=countRows;row++){                                       // Loop over rows.
			for(i=1+colsAdded;i<LABEL.length;i++){val[i] = range[1][2].getCell(row,labColNum[i]).getValue()} // Fetch variables
			if(!(val[colsAdded+5] > 1)){                                                   // Excludes junior lien positions. Future refinements might want to include jr. lien pos for processing
				if(val[colsAdded+4] > 0){val[1] = Math.round(val[colsAdded+4])}            // Price = Opening bid
				else{                    val[1] = Math.round(val[colsAdded+3])}}           // Price = Estimated bid
			else{val[1] = Math.round(val[colsAdded+2])}                                    // At this time, EstimatedTotalLoanBalance is a figure of marginal utility
			val[2]      = Math.round(val[colsAdded+1] - val[1]);                           // Spread
			val[3]      = Math.round(100*val[1]/val[colsAdded+1]);                         // Spread pct
			for(i=1;i<=colsAdded;i++){range[1][2].getCell(row,countCols+i).setValue(val[i])}     // Writes output
		}	sheet[1][2].getRange(2,1,countRows,(countCols+colsAdded)).sort(countCols+colsAdded); // Sorts rows
	}
	{ // 3. Copy & trim
		colsToInsert = countCols + colsAdded - sheet[1][3].getMaxColumns();                // Calculates column deficit
		if(colsToInsert > 0){sheet[1][3].insertColumns(1,colsToInsert)}                    // Inserts columns if necessary
		updateRangesCount(countRows,(countCols+colsAdded));                                // Update ranges in second ss with counted rows and columns
		range[1][2].copyTo(range[1][3]);                                                   // Copy data from Calc to Prep
		var colPct = getColNum(sheet[1][3], 1, LABEL[3]);                                  // Fetch column number of key variable
		row = ROW_START; countRows = range[1][3].getHeight();                              // Re-initialize row start // Re-calculate row count
		while(!startDelete){startDelete=(range[1][3].getCell(row,colPct).getValue()>PCT_MAX);row++;} // Test/determine trigger row
		row--;sheet[1][3].deleteRows(row,(countRows-row));                                 // Trim rows — deletes rows exceeding cutoff
	//	for(i=1;i<INDEX.length;i++){sheet[1][3].deleteColumns(INDEX[i],SPAN[i])}           // Trim columns
	}
}
function formatA(){
	{ // 1. Set parameters.
		var SS_NAME     = new Array();
		SS_NAME[0]      = "In";
		SS_NAME[1]      = "Calc";
		SS_NAME[2]      = "Prep";
		var COLHEADER   = new Array();
		COLHEADER[1]    = "LinkZillow";
		COLHEADER[2]    = "LinkYahoo";
		COLHEADER[3]    = "Type";
		COLHEADER[4]    = "Bed";
		COLHEADER[5]    = "Bath";
		COLHEADER[6]    = "Sqft";
		COLHEADER[7]    = "Lot";
		COLHEADER[8]    = "Year";
		COLHEADER[9]    = "LinkZillowDetails";
		COLHEADER[10]   = "EstZillow";
		COLHEADER[11]   = "LinkEppraisal";
		COLHEADER[12]   = "EstEppraisal";
		COLHEADER[13]   = "LastSoldDate";
		COLHEADER[14]   = "LastSoldPrice";
		COLHEADER[15]   = "TaxAssessedValue";
		var i           = 0;
		var CUTOFF      = 100;
		var ROW_START   = 2;
		var COLS_ADDED  = 15;
		var COL_A       = 1;
		var COL_A_MATCH = "Auction";
		var type_A      = "";
		var deleteRow   = new Boolean();
	}
	{ // 2. Copy range.
		var ss = SpreadsheetApp.getActiveSpreadsheet(); // Initializes spreadsheet.
		ss.setActiveSheet( ss.getSheetByName( SS_NAME[1] ) ); // Sets active sheet.
		ss.duplicateActiveSheet(); // Copies active sheet (input) to process for output.
	}
	{ // 3. Define sheets and ranges.
		var sheet = ss.getSheets()[2];
		sheet.setName( SS_NAME[2] );
		var range = sheet.getDataRange();
		var countRows = range.getHeight();
		var countCols = range.getWidth();
		
		range = sheet.getRange( 1, 1, countRows, (countCols + COLS_ADDED) );
		for(i=1;i<COLHEADER.length;i++){range.getCell(1,(countCols+i)).setValue(COLHEADER[i])} // Names column header
	}
	{ // 4. Trim rows & columns
		var row = ROW_START;
		var spreadPct = range.getCell( row, countCols ).getValue();          // Fetch initial decision variable.
	/*	while(spreadPct <= CUTOFF){                                          // Loop over rows.
			deleteRow = false;                                               // Resets decision variable.
			type_A = range.getCell( row, COL_A ).getValue();                 // Fetch decision value.
			deleteRow = deleteRow || (type_A != COL_A_MATCH);                // Apply boolean logic for decisioning.
			if(deleteRow){sheet.deleteRow(row);row--;}                       // Deletes row. // Keep an accurate value on the row count to stay in range for below calculating rows to delete. 
			row++;
			spreadPct = range.getCell( row, countCols ).getValue();}* /
		countRows = sheet.getDataRange().getHeight();
		sheet.deleteRows(row,(countRows-row+1));                             // Deletes rows exceeding cutoff.
		for(i=1;i<INDEX.length;i++){sheet.deleteColumns(INDEX[i],SPAN[i])}}} // Trim columns.
function append (){
//
// PURPOSE: The purpose of this function is to append the URL links to the output sheet for each situs (subject property).
// URL links include Zillow, Yahoo and Eppraisal.
//
    // 1. Example and test variables.
    // var sa = "2056 154th ave se"; // sa = street address
    // var csz = "bellevue, wa"; // csz = (city + state) OR zip
    //
    // 2. Define parameters.
    // a. Stage I — Zillow URL
    var PREFIX         = "http://www.zillow.com/homes/";
    var SUFFIX         = "_rb/";
    var THIS_C         = " ";
    var WITH_C         = "-";
    // b. Stage II — Yahoo URL
    var STEM = "http://realestate.yahoo.com/Homevalues/result.html";
    var WITH_A         = "+";
    var THIS_A_01      = ", ";
    var THIS_A_02      = ",";
    var THIS_A_03      = " ";
    var THIS_A_04      = "++";
    // c. Stage III — Yahoo scrape
    var THIS_B_01      = "$";
    var THIS_B_02      = ",";
    var WITH_B         = "";
    var MARKER_START_A = ">";
    var MARKER_END_A   = "<";
    var MARKER_START_B = "href=\"";
    var MARKER_END_B   = "\"";
    var MARKER_START_C = "<dd>";
    var MARKER_END_C   = "<";
    var MARKER_01      = "Residence: ";
    var MARKER_02      = "Beds: ";
    var MARKER_03      = "Bath: ";
    var MARKER_04      = "Square Feet: ";
    var MARKER_05      = "Lot Size: ";
    var MARKER_06      = "Year Built: ";
    var MARKER_07      = "\"estimates\"";
    var MARKER_11      = "Last Sold Date:";
    var MARKER_12      = "Last Sold Price:";
    var MARKER_13      = "Tax assessed value:";
// d. Sheets and ranges
    var SHEET_NAME     = "Prep";
    var ROW_START      = 2;
    var COL_START      = 24;
    var COL_STREET     = 3;
    var COL_CITY       = 4;
    var COL_STATE      = 5;
    var COL_ZIP        = 6;
// e. Initializations
    var row            = ROW_START;
    var col            = COL_START;
    var token          = "";
    var action         = "";
    var responseText   = "";
    var sa             = "";
    var city           = "";
    var state          = "";
    var zip            = "";
//
// 3. Define spreadsheet variables
    var ss = SpreadsheetApp.getActiveSpreadsheet(); // Initializes spreadsheet.
    var sheet = ss.getSheetByName( SHEET_NAME );
    var range = sheet.getDataRange();
    var countRows = range.getHeight();
    var countCols = range.getWidth(); Logger.log( "countCols: " + countCols );
//
// 4. Create loop.
    while( row <= countRows ){
        // Pickup loop variables and arguments.
        sa = range.getCell( row, COL_STREET ).getValue();
        city = range.getCell( row, COL_CITY ).getValue();
        state = range.getCell( row, COL_STATE ).getValue();
        zip = range.getCell( row, COL_ZIP ).getValue();
        if( zip > 9999 ){csz = zip} // Uses city and state fields if zip field is empty or contains a leading zero.
        else{csz = city + ", " + state}
//
// *******************************************************************************************************************
// *******************************************************************************************************************
// **                                                                                                               **
// **                                             STAGE I — Zillow URL                                              **
// **                                                                                                               **
// *******************************************************************************************************************
// *******************************************************************************************************************
// 
    // PURPOSE: Generate the URL for the indicated resource given the physical address.
    //
    // 1. Generate URL.
    action  = "";
    action += PREFIX;
    action += sa;
    action += ", ";
    action += csz;
    action += SUFFIX;
    // Encode spaces.
    while( action.indexOf( THIS_C ) >= 0 ){
      action = action.replace( THIS_C, WITH_C );
    }
    //
    // 2. Return.
    // return action;
    Logger.log( "urlZillow: " + action );
      //
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( action ); // Write to output cell.
      col++; // Increments column
      }
      //
//
// *******************************************************************************************************************
// *******************************************************************************************************************
// **                                                                                                               **
// **                                             STAGE II — Yahoo URL                                              **
// **                                                                                                               **
// *******************************************************************************************************************
// *******************************************************************************************************************
    //
    // 1. Construct URL.
    action  = "";
    action += STEM;
    action += "?sa=";
    action += sa;
    action += "&csz=";
    action += csz;
    action += "&search=Search";
    //
    // 2. Make substitutions.
    while( action.indexOf( THIS_A_01 ) >= 0 ){ // For every occurence
      action = action.replace( THIS_A_01, WITH_A ); // substitute string.
    } // Logger.log( "action: " + action );
    while( action.indexOf( THIS_A_02 ) >= 0 ){ // For every occurence
      action = action.replace( THIS_A_02, WITH_A ); // substitute string.
    } // Logger.log( "action: " + action );
    while( action.indexOf( THIS_A_03 ) >= 0 ){ // For every occurence
      action = action.replace( THIS_A_03, WITH_A ); // substitute string.
    } // Logger.log( "action: " + action );
    while( action.indexOf( THIS_A_04 ) >= 0 ){ // For every occurence
      action = action.replace( THIS_A_04, WITH_A ); // substitute string.
    } // Logger.log( "action: " + action );
    //
    Logger.log("urlYahoo: " + action); // Report product.
      //
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( action ); // Write to output cell.
      col++; // Increments column
      }
      //
    //
// *******************************************************************************************************************
// *******************************************************************************************************************
// **                                                                                                               **
// **                                           STAGE III — Scrape Yahoo                                            **
// **                                                                                                               **
// *******************************************************************************************************************
// *******************************************************************************************************************
//
    // 4. Fetch URL (HTTP GET).
    var response = UrlFetchApp.fetch( action ); // Fetch the URL of the subject. // var responseCode = response.getResponseCode(); // Gets the response code to determine if the given id produces a valid record. // Logger.log( "responseCode: " + responseCode ); // Logs the currently active variable.
    responseText = response.getContentText(); // Get response text; convert to string variable. // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
    //
    // 5. Scrape.
    if( responseText.indexOf( MARKER_01 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_01 ) ); // Grabs string after the prefix (marker). // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker). // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }
      Logger.log( "type: " + token ); // Logs the currently active variable.
      {
      // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_02 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_02 ) ); // Grabs string after the prefix (marker). // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker). // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }
      Logger.log( "beds: " + token ); // Logs the currently active variable.
      //
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_03 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_03 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }
      Logger.log( "bath: " + token ); // Logs the currently active variable.
      //
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_04 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_04 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }
      Logger.log( "sft: " + token ); // Logs the currently active variable.
      //
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_05 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_05 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }
      Logger.log( "lot: " + token ); // Logs the currently active variable.
      //
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_06 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_06 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }
      Logger.log( "yr: " + token ); // Logs the currently active variable.
      //
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_07 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_07 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_B ) + MARKER_START_B.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_B ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }
      Logger.log( "urlZillow: " + token ); // Logs the currently active variable.
      //
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_START_A ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      // responseText = responseText.slice( responseText.indexOf( MARKER_08 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }
      Logger.log( "estZillow: " + token ); // Logs the currently active variable.
      //
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_START_B ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      // responseText = responseText.slice( responseText.indexOf( MARKER_09 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_B ) + MARKER_START_B.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement yields no product.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_B ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }
      Logger.log( "urlEppraisal: " + token ); // Logs the currently active variable.
      //
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_START_A ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      // responseText = responseText.slice( responseText.indexOf( MARKER_10 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement yields no product.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }
      Logger.log( "estEppraisal: " + token ); // Logs the currently active variable.
      //
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_11 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_11 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement yields no product.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }
      Logger.log( "soldDate: " + token ); // Logs the currently active variable.
      //
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_12 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_12 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement yields no product.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }
      Logger.log( "soldPrice: " + token ); // Logs the currently active variable.
      //
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_13 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_13 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement yields no product.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }
      Logger.log( "taxVal: " + token ); // Logs the currently active variable.
      //
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
      //
// --- *** ----
// Carriage return = Increment row + Reset column
    row++;
    col = COL_START;
  } // Return to top of while loop.
}
function formatB(){
  //
  // 1. Set parameters.
  var SS_NAME         = new Array();
  SS_NAME[0]          = "In";
  SS_NAME[1]          = "Calc";
  SS_NAME[2]          = "Prep";
  SS_NAME[3]          = "Out";
  var COLHEADER       = new Array();
  COLHEADER[0]        = "";
  COLHEADER[1]        = "Number_and_street";
  COLHEADER[2]        = "City";
  COLHEADER[3]        = "State";
  COLHEADER[4]        = "Zip";
  COLHEADER[5]        = "County";
  COLHEADER[6]        = "Sale_year";
  COLHEADER[7]        = "Sale_month";
  COLHEADER[8]        = "Sale_day";
  COLHEADER[9]        = "Sale_hour";
  COLHEADER[10]       = "Sale_location";
  COLHEADER[11]       = "Opening_bid";
  COLHEADER[12]       = "Estimated_opening_bid";
  COLHEADER[13]       = "Estimated_lien_position";
  COLHEADER[14]       = "Estimated_total_encumbrance";
  COLHEADER[15]       = "Yahoo_link";
  COLHEADER[16]       = "Zillow_link";
  COLHEADER[17]       = "Eppraisal_link";
  COLHEADER[18]       = "Zillow_details_link";
  COLHEADER[19]       = "Prop_type";
  COLHEADER[20]       = "Beds";
  COLHEADER[21]       = "Baths";
  COLHEADER[22]       = "Sq_feet";
  COLHEADER[23]       = "Lot_size";
  COLHEADER[24]       = "Year_built";
  COLHEADER[25]       = "Last_sold_date";
  COLHEADER[26]       = "Last_sold_price";
  COLHEADER[27]       = "Tax_assessed_value";
  COLHEADER[28]       = "Alternate"; // e.g., “ForeclosureRadar”
  COLHEADER[29]       = "Zillow";
  COLHEADER[30]       = "Eppraisal";
  COLHEADER[31]       = "Auto_estimate";
  COLHEADER[32]       = "First_margin";
  COLHEADER[33]       = "First_key_ratio";
  var p               = new Array(); // Array of value estimates for median statistic.
  var i               = 0;
  var j               = 0;
  var ROW_START       = 2;
  var COL_START       = 0;
  var row             = 0;
  var col             = COL_START;
  var resultNum       = 0;
  var resultNum1      = 0;
  var resultNum2      = 0;
  var resultStr       = "";
  var resultStr1      = "";
  var resultStr2      = "";
  var COL_LIEN_POS_AN = 22;
  var COL_OPEN_BID_AL = 20;
  var COL_EST_BID_AK  = 19;
  var COL_TOT_BAL_AB  = 15;
  var lienPos_AN      = 0;
  var openBid_AL      = 0;
  var estBid_AK       = 0;
  var totBal_AB       = 0;
  var price           = 0;
  var autoEstimate    = 0;
  var firstMargin     = 0;
  var firstKeyRatio   = 0;
  var encumbrance     = 0;
  var WITH            = "";
  var THIS            = ":";
  //
  // 2. Insert sheet.
  var ss = SpreadsheetApp.getActiveSpreadsheet(); // Initializes spreadsheet.
  ss.insertSheet( SS_NAME[03], 3 );
  //
  // 3. Define sheets and ranges.
  var fromSheet = ss.getSheetByName( SS_NAME[02] );
  var fromRange = fromSheet.getDataRange();
  var fromCountRows = fromRange.getHeight();
  var fromCountCols = fromRange.getWidth();
  var toSheet = ss.getSheetByName( SS_NAME[03] );
  var toRange = toSheet.getRange( 1, 1, fromCountRows, HEADER.length );
  //
  // 4. Loop to set column headers.
  for( i=1; i<COLHEADER.length; i++ ){toRange.getCell( 1, i ).setValue( COLHEADER[i] );} // Sets column header
  //
  // 5. Translate records — row by row.
  for( row=ROW_START; row<=fromCountRows; row++ ){
    // COLHEADER[01] = "Number_and_street";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 3 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[02] = "City";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 4 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[03] = "State";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 5 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[04] = "Zip";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 6 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[05] = "County";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 2 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[06] = "Sale_year";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 16 ).getValue().getFullYear();
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[07] = "Sale_month"; ** SPECIAL FORMULA ** DO NOT COPY for general use **
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables ** SPECIAL FORMULA ** DO NOT COPY for general use **
      resultNum = fromRange.getCell( row, 16 ).getValue().getMonth()+1; // Add “1” (+1) because MONTH values appear to begin at zero?
      toRange.getCell( row, col ).setValue( resultNum ); // ** SPECIAL FORMULA ** DO NOT COPY for general use **
    // COLHEADER[08] = "Sale_day"; ** SPECIAL FORMULA ** DO NOT COPY for general use **
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables ** SPECIAL FORMULA ** DO NOT COPY for general use **
      resultNum = fromRange.getCell( row, 16 ).getValue().getDate()+1; // Add “1” (+1) because DATE values appear to begin at zero?
      toRange.getCell( row, col ).setValue( resultNum );  // ** SPECIAL FORMULA ** DO NOT COPY for general use **
    // COLHEADER[09] = "Sale_hour"; ** SPECIAL FORMULA ** DO NOT COPY for general use **
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables  ** SPECIAL FORMULA ** DO NOT COPY for general use **
      resultNum = 100 * (fromRange.getCell( row, 17 ).getValue().getHours()+1); // Add “1” (+1) because HOUR values appear to begin at zero?
      resultNum = resultNum + fromRange.getCell( row, 17 ).getValue().getMinutes(); //  ** SPECIAL FORMULA ** DO NOT COPY for general use **
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[10] = "Sale_location";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 18 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[11] = "Opening_bid";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 20 ).getValue();
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[12] = "Estimated_opening_bid";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 19 ).getValue();
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[13] = "Estimated_lien_position";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 21 ).getValue();
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[14] = "Estimated_total_encumbrance";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      encumbrance = fromRange.getCell( row, 15 ).getValue(); // Variable must persist to use in later formula. ** SPECIAL FORMULA ** DO NOT COPY for general use **
      resultNum = encumbrance;
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[15] = "Yahoo_link"; **DEPRACATED** Transmission of this field is deprecated. Construct link string in Zoho. Reason: 1. Ampersand causes failure. 
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 25 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[16] = "Zillow_link";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 24 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[17] = "Eppraisal_link"; **DEPRACATED** Transmission of this field is deprecated. Construct link string in Zoho. Reasons: 1. Ampersand causes failure. 2. Url is incorrect.
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 34 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[18] = "Zillow_details_link";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 32 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[19] = "Prop_type";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr1 = fromRange.getCell( row, 26 ).getValue();
      resultStr2 = fromRange.getCell( row, 07 ).getValue();
      if( resultStr1.length > 0 ){ resultStr = resultStr1; } else{ resultStr = resultStr2; } resultStr1 = ""; resultStr2 = "";
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[20] = "Beds";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum1 = fromRange.getCell( row, 27 ).getValue();
      resultNum2 = fromRange.getCell( row, 11 ).getValue();
      if( resultNum1 > 0 ){ resultNum = resultNum1; } else{ resultNum = resultNum2; } resultNum1 = 0; resultNum2 = 0;
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[21] = "Baths";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum1 = fromRange.getCell( row, 28 ).getValue();
      resultNum2 = fromRange.getCell( row, 12 ).getValue();
      if( resultNum1 > 0 ){ resultNum = resultNum1; } else{ resultNum = resultNum2; } resultNum1 = 0; resultNum2 = 0;
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[22] = "Sq_feet";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum1 = fromRange.getCell( row, 29 ).getValue();
      resultNum2 = fromRange.getCell( row, 09 ).getValue();
      if( resultNum1 > 0 ){ resultNum = resultNum1; } else{ resultNum = resultNum2; } resultNum1 = 0; resultNum2 = 0;
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[23] = "Lot_size";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum1 = fromRange.getCell( row, 30 ).getValue();
      resultNum2 = fromRange.getCell( row, 13 ).getValue();
      if( resultNum1 > 0 ){ resultNum = resultNum1; } else{ resultNum = resultNum2; } resultNum1 = 0; resultNum2 = 0;
      toRange.getCell( row, col ).setValue( resultNum );;
    // COLHEADER[24] = "Year_built";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum1 = fromRange.getCell( row, 31 ).getValue();
      resultNum2 = fromRange.getCell( row, 10 ).getValue();
      if( resultNum1 > 0 ){ resultNum = resultNum1; } else{ resultNum = resultNum2; } resultNum1 = 0; resultNum2 = 0;
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[25] = "Last_sold_date";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 36 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[26] = "Last_sold_price";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 37 ).getValue();
      toRange.getCell( row, col ).setValue( resultNum );
    //COLHEADER[27] = "Tax_assessed_value";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 38 ).getValue();
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[28] = "Alternate";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 14 ).getValue();
      if( resultNum > 0 ){ p[j]=resultNum;j++; } // Adds to estimate array to calculate median
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[29] = "Zillow";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 33 ).getValue();
      if( resultNum > 0 ){ p[j]=resultNum;j++; } // Adds to estimate array to calculate median
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[30] = "Eppraisal";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 35 ).getValue();
      if( resultNum > 0 ){ p[j]=resultNum;j++; } // Adds to estimate array to calculate median
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[31] = "Auto_estimate";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      autoEstimate = median( p ); // Variable must persist to use in later formula.
      resultNum = autoEstimate;
      toRange.getCell( row, col ).setValue( resultNum );
//
// Calculate variables.
    lienPos_AN = fromRange.getCell( row, COL_LIEN_POS_AN ).getValue();
    openBid_AL = fromRange.getCell( row, COL_OPEN_BID_AL ).getValue();
    estBid_AK  = fromRange.getCell( row, COL_EST_BID_AK  ).getValue();
    totBal_AB  = fromRange.getCell( row, COL_TOT_BAL_AB  ).getValue();
    if(lienPos_AN == 1){if(openBid_AL > 0){price = openBid_AL} else{price = estBid_AK}} // Includes unknown estimated lien positions as well as 2nd & 3rd lien positions. 
    else{price = totBal_AB} // This estimate needs refining. Should discriminate between 2nd, 3rd & unknown lien positions. And incorporate estimated bids.
    firstMargin = Math.round( autoEstimate - price );
    firstKeyRatio = Math.round( 100*price/autoEstimate );
//
    //  COLHEADER[32] = "First_margin";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = firstMargin;
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[33] = "First_key_ratio";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = firstKeyRatio;
      toRange.getCell( row, col ).setValue( resultNum );
    //
// Reset variables.
    col = COL_START; // Resets column — half carriage return
    resultNum     = 0;
    resultStr     = "";
    lienPos_AN    = 0;
    openBid_AL    = 0;
    estBid_AK     = 0;
    totBal_AB     = 0;
    price         = 0;
    autoEstimate  = 0;
    firstMargin   = 0;
    firstKeyRatio = 0;
    j             = 0;
    p.splice( 0, p.length ); // Deletes all the elements of the array — thereby resetting it.
  }
  //
}
function write  (){
/*
function writeToZoho() {
//
// A modified version of this script is labeled “writeToZoho” in the spreadsheet labeled “Scrape REICs and Lenders” in the project labeled “Lenders.”
// The original version of the script is labeled “writeToZoho” in the spreadsheet labeled “DealDigger™ — Bid Manifest.” 
/*
*** --- EXAMPLES --- ***
//
******************** EXAMPLE 1 ********************
<!-- TEST READ -->
<!-- http://www.w3schools.com/TAGS/tryit.asp?filename=tryhtml_form_method_post -->
<!-- http://www.w3schools.com/TAGS/att_form_method.asp -->
<html><body>
<form method="post" target="_blank" action="http://creator.zoho.com/api/xml/read/apikey=a950d63185b2a5a3d1eb703cc65474d5&ticket=c7fd8ef1662c118df4f8d4cb29e81a38">
  XMLString:<br>
  <textarea name="XMLString" rows="6" cols="50">
    <ZohoCreator>
      <application name="price-list">
        <form name="Products_Type"></form>
      </application>
    </ZohoCreator>
  </textarea><br><br>
  Owner: <input type="text" name="zc_ownername" value="sampleapps" style="font-size:15"><br>
  <input type="submit" value="Submit XML String" style="font-size:45">
</form>
</body></html>
******************** EXAMPLE 2 ********************
<!-- TEST WRITE1 -->
<!-- http://www.w3schools.com/TAGS/tryit.asp?filename=tryhtml_form_method_post -->
<!-- http://www.w3schools.com/TAGS/att_form_method.asp -->
<html><body>
<form action="http://creator.zoho.com/api/json/dealdigger/Inventory/add/" method="post" target="_blank">
  apiKey: <input type="text" name="apikey" value="a950d63185b2a5a3d1eb703cc65474d5"/><br />
  ticket: <input type="text" name="ticket" value="c7fd8ef1662c118df4f8d4cb29e81a38"/><br />
  Project_name: <input type="text" name="Project_name" value="TEST"/><br />
  <input type="submit" value="Submit" />
</form>
</body></html>
******************** EXAMPLE 3 ********************
<!-- TEST WRITE2 -->
<!-- http://www.w3schools.com/TAGS/tryit.asp?filename=tryhtml_form_method_post -->
<!-- http://www.w3schools.com/TAGS/att_form_method.asp -->
<!-- https://api.creator.zoho.com/XML-RPC-API-Add-Records.html -->
<html><body>
<form method="POST" action="http://creator.zoho.com/api/xml/write" target="_blank">
 <input type="hidden" name="apikey" id="apikey" value="a950d63185b2a5a3d1eb703cc65474d5">
 <input type="hidden" name="ticket" id="ticket" value="c7fd8ef1662c118df4f8d4cb29e81a38">
XMLString:<br>
<textarea rows="15" cols="50" name="XMLString">
  <ZohoCreator>
    <applicationlist>
      <application name="dealdigger">
        <formlist>
          <form name="Inventory">
            <add>
              <field name="Project_name">
                <value>TEST</value>
              </field>
            </add>
          </form>
        </formlist>
      </application>
    </applicationlist>
  </ZohoCreator>
</textarea>
<br>
<input type="submit" value="Add Record" style="font-size:25">
</form>
</body></html>
******************** EXAMPLE 4 ******************** (add via REST)
POST http://creator.zoho.com/api/xml/dealdigger/Bid_Form/add/
Content-Type: application/x-www-form-urlencoded
Content: apikey=a950d63185b2a5a3d1eb703cc65474d5&ticket=6ef3826039ffd8f3cefae232a1a3f061&My_offer=1&Bid_accepted=true
******************** EXAMPLE 5 ******************** (update via REST)
POST http://creator.zoho.com/api/xml/dealdigger/Bid_Form/update/
Content-Type: application/x-www-form-urlencoded
Content: apikey=a950d63185b2a5a3d1eb703cc65474d5&ticket=6ef3826039ffd8f3cefae232a1a3f061&criteria=My_offer=1&Bid_accepted=false&reloperator=AND
******************** EXAMPLE 6 ******************** (update via RPC — reference: http://writer.zoho.com/public/help/edit-record-xml/fullpage)
POST http://creator.zoho.com/api/xml/write/apikey=a950d63185b2a5a3d1eb703cc65474d5&ticket=6ef3826039ffd8f3cefae232a1a3f061
Content-Type: application/x-www-form-urlencoded
Content example:
XMLString=<zohocreator><applicationlist><application name="dealdigger"><formlist><form name="Bid_Form"><update><criteria><reloperator>AND</reloperator>
<field name="ProjectID" compOperator="EQUALS" value="Weid"></field><field name="BidderID" compOperator="EQUALS" value="foobar2@zippymail.info"></field>
<field name="SitusID" compOperator="EQUALS" value="262407000006863789"></field><field name="My_offer" compOperator="EQUALS" value="8000"></field></criteria><newvalues>
<field name="Bid_accepted" value="true"></field></newvalues></update><update><criteria><reloperator>AND</reloperator><field name="ProjectID" compOperator="EQUALS" value="Weid">
</field><field name="BidderID" compOperator="EQUALS" value="foobar15@zippymail.info"></field><field name="SitusID" compOperator="EQUALS" value="262407000006863795"></field>
<field name="My_offer" compOperator="EQUALS" value="165000"></field></criteria><newvalues><field name="Bid_accepted" value="true"></field></newvalues></update><update><criteria>
<reloperator>AND</reloperator><field name="ProjectID" compOperator="EQUALS" value="Weid"></field><field name="BidderID" compOperator="EQUALS" value="foobar2@zippymail.info"></field>
<field name="SitusID" compOperator="EQUALS" value="262407000006863783"></field><field name="My_offer" compOperator="EQUALS" value="125000"></field></criteria><newvalues>
<field name="Bid_accepted" value="true"></field></newvalues></update></form><form name="Projects"><update><criteria><reloperator>AND</reloperator>
<field name="Name" compOperator="EQUALS" value="Weid"></field></criteria><newvalues><field name="Current_offer_set" value="offerSetStringVariable"></field>
<field name="Sigma_sub_omega" value="1536500"></field><field name="Sigma_sub_beta" value="627000"></field></newvalues></update></form></formlist></application></applicationlist></zohocreator>
Note: Below is XMLString restated in heirarchical structure
<zohocreator>
  <applicationlist>
    <application name="dealdigger">
      <formlist>
        <form name="Bid_Form">
          <update>
            <criteria>
              <reloperator>AND</reloperator>
              <field name="ProjectID" compOperator="EQUALS" value="Weid"></field>
              <field name="BidderID" compOperator="EQUALS" value="foobar2@zippymail.info"></field>
              <field name="SitusID" compOperator="EQUALS" value="262407000006863789"></field>
              <field name="My_offer" compOperator="EQUALS" value="8000"></field>
            </criteria>
            <newvalues>
              <field name="Bid_accepted" value="true"></field>
            </newvalues>
          </update>
          <update>
            <criteria>
              <reloperator>AND</reloperator>
              <field name="ProjectID" compOperator="EQUALS" value="Weid"></field>
              <field name="BidderID" compOperator="EQUALS" value="foobar15@zippymail.info"></field>
              <field name="SitusID" compOperator="EQUALS" value="262407000006863795"></field>
              <field name="My_offer" compOperator="EQUALS" value="165000"></field>
            </criteria>
            <newvalues>
              <field name="Bid_accepted" value="true"></field>
            </newvalues>
          </update>
          <update>
            <criteria>
              <reloperator>AND</reloperator>
              <field name="ProjectID" compOperator="EQUALS" value="Weid"></field>
              <field name="BidderID" compOperator="EQUALS" value="foobar2@zippymail.info"></field>
              <field name="SitusID" compOperator="EQUALS" value="262407000006863783"></field>
              <field name="My_offer" compOperator="EQUALS" value="125000"></field>
            </criteria>
            <newvalues>
              <field name="Bid_accepted" value="true"></field>
            </newvalues>
          </update>
        </form>
        <form name="Projects">
          <update>
            <criteria>
              <reloperator>AND</reloperator>
              <field name="Name" compOperator="EQUALS" value="Weid"></field>
            </criteria>
            <newvalues>
              <field name="Current_offer_set" value="offerSetStringVariable"></field>
              <field name="Sigma_sub_omega" value="1536500"></field>
              <field name="Sigma_sub_beta" value="627000"></field>
            </newvalues>
          </update>
        </form>
      </formlist>
    </application>
  </applicationlist>
</zohocreator>
******************** EXAMPLE 7 ******************** (add via RPC — reference: https://writer.zoho.com/public/help/add-record-xml/fullpage)
POST http://creator.zoho.com/api/xml/write/apikey=a950d63185b2a5a3d1eb703cc65474d5&ticket=24ac84ca86e1d3fa3c79b2f0f3ef54ba
Content-Type: application/x-www-form-urlencoded
Content example:
XMLString=<ZohoCreator><applicationlist><application name="dealdigger"><formlist><form name="Inventory"><add><field name="Full_address">
<value>123 Elm St</value></field><field name="Yahoo_link"><value>http://www.yahoo.com</value></field></add><add><field name="Full_address">
<value>555 Main St</value></field><field name="Yahoo_link"><value>http://www.yahoo.com</value></field>></add></form></formlist></application>
</applicationlist></ZohoCreator>
Note: Below is XMLString restated in heirarchical structure
<ZohoCreator>
  <applicationlist>
    <application name="dealdigger">
      <formlist>
        <form name="Inventory">
          <add>
            <field name="Full_address"><value>123 Elm St</value></field>
            <field name="Yahoo_link"><value>http://www.yahoo.com</value></field>
          </add>
          <add>
            <field name="Full_address"><value>555 Main St</value></field>
            <field name="Yahoo_link"><value>http://www.yahoo.com</value></field>
          </add>
        </form>
      </formlist>
    </application>
  </applicationlist>
</ZohoCreator>
//
// *********************************************************************************************************
// **                                                                                                     **
// **                                        *** --- LIVE CODE --- ***                                    **
// **                                                                                                     **
// *********************************************************************************************************
* /
// 1. Parameters
// a. URL
var TICKET      = "8b7b09a0575ada8c8295c722e8df583c"; // Refresh ticket every seven days
var APIKEY      = "a950d63185b2a5a3d1eb703cc65474d5";
var OPERATION   = "write"; // other options: "add", "update" — Note: Even when “adding” new records, we tend to use the “write” operation because the add operation can be problematic.
var LANGUAGE    = "xml"; // other options: "csv", "json"
var STEM        = "http://creator.zoho.com/api/";
// b. Posting
var SHEET       = "Out";
var APPLICATION = "dealdigger";
var FORM        = "Inventory"; // Previously: "Bid_Form"
var METHOD      = "POST";
var TYPE        = "application/x-www-form-urlencoded";
// c. Parameters
var OBJTYPE     = "string";
var START_ROW   = 2;
var START_COL   = 1;
var f = 0;
var g = 0;
var h = 0;
var i = 0;
var j = 0;
var k = 0;
// d. Arrays
var action = "";
var ACTION_STRING = new Array();
ACTION_STRING[00] = "";
ACTION_STRING[01] = STEM;
ACTION_STRING[02] = LANGUAGE;
ACTION_STRING[03] = "/";
ACTION_STRING[04] = OPERATION;
ACTION_STRING[05] = "/apikey=";
ACTION_STRING[06] = APIKEY;
ACTION_STRING[07] = "&ticket=";
ACTION_STRING[08] = TICKET;
var myPayload = "";
var PAYLOAD_STRING = new Array();
PAYLOAD_STRING[00] = "";
PAYLOAD_STRING[01] = "XMLString=<ZohoCreator><applicationlist><application name='";
PAYLOAD_STRING[02] = APPLICATION;
PAYLOAD_STRING[03] = "'><formlist><form name='"
PAYLOAD_STRING[04] = FORM;
PAYLOAD_STRING[05] = "'>";
PAYLOAD_STRING[06] = "<add>";
PAYLOAD_STRING[07] = "<field name='";
PAYLOAD_STRING[08] = "'><value><![CDATA["; // PAYLOAD_STRING[08] = "'><value>";
PAYLOAD_STRING[09] = "]]></value></field>"; // PAYLOAD_STRING[09] = "</value></field>";
PAYLOAD_STRING[10] = "</add>";
PAYLOAD_STRING[11] = "</form></formlist></application></applicationlist></ZohoCreator>";
var PAYLOAD_PREFIX = 1;
var PAYLOAD_ADDRECORD = 6;
var PAYLOAD_ADDFIELD = 7;
var PAYLOAD_TERMINATE = 11;
var COL_OMIT = new Array(); // These are the columns to omit from any API/XML transmission.
COL_OMIT[00] = 15;
COL_OMIT[01] = 17;
var THIS = new Array();
var WITH = new Array();
THIS[00] = "&";
WITH[00] = "and"; // Tried: &amp; &amp;amp; %26 &#038 &#038;
THIS[01] = "%";
WITH[01] = "";
var field = new Array();
field[0] = ""; // Initialize first array element with empty string.
var value = new Array();
value[0] = ""; // Initialize first array element with empty string.
// e. Other
var d = new Date();
var dateTime = d.getTime(); // represents milliseconds since 1970/01/01
var omit = new Boolean();
//
// 2. Access output cells
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName( SHEET );
var range = sheet.getDataRange();
var countCols = range.getWidth();
var countRows = range.getHeight();
/*
// 3. Archive: copy and clear — Copy and archive worksheet and clear 'In' sheet in preparation for next run.
var newSs = SpreadsheetApp.create( dateTime ); // Creates a new spreadsheet & names it with the value of the offer set ID (timestamp).
var newUrl = newSs.getUrl(); // Gets the URL of the newly created spreadsheet. // Logger.log( dateTime + " | " + newUrl );
var sheetCount = ss.getNumSheets(); // Computes the number of sheets to be copied.
for(i=sheetCount-1;i>=0;i--){ // Copies all sheets to the new spreadsheet.
  ss.getSheets()[i].copyTo( newSs ); // Gets all the sheets in a spreadsheet and copies this sheet into another spreadsheet.
}
ss.getSheetByName( 'In' ).clear(); // Clears the sheet of all content and formatting — in preparation for next run.
* /
//
// 3. Construct action URL. // Example: http://creator.zoho.com/api/xml/write/apikey=a950d63185b2a5a3d1eb703cc65474d5&ticket=24ac84ca86e1d3fa3c79b2f0f3ef54ba
for( g=1;g<ACTION_STRING.length;g++ ){ action = action + ACTION_STRING[g]; } // Iterate over the array of substrings. // Logger.log( "action: " + action );
//
// 4. Contruct field/header array.
for( k=START_COL;k<=countCols;k++ ){ field[k] = range.getCell( 1, k ).getValue(); } k = 0; // Logger.log( "field: " + field );
//
// 5. Construct XML payload.
for( j=START_ROW;j<=countRows;j++ ){ // Iterate down rows. Insert record string construction here. // for( j=START_ROW;j<3;j++ ){ // Iterate down rows. Insert record string construction here.
  myPayload = ""; // Resets string.
  for( h=PAYLOAD_PREFIX;h<PAYLOAD_ADDRECORD;h++ ){ myPayload = myPayload + PAYLOAD_STRING[h]; } // Iterate over the array of myPayload substrings. // Logger.log( "h: " + h );
  h = PAYLOAD_ADDRECORD; myPayload = myPayload + PAYLOAD_STRING[h]; h++; // Start new record.
  for( k=START_COL;k<=countCols;k++ ){ // Iterate across columns. Fetch header at row 1 and value at row j. // for( k=START_COL;k<=27;k++ ){ // Iterate across columns. Fetch header at row 1 and value at row j.
    omit = false; // Reset exclusion switch.
    for( i=0;i<COL_OMIT.length;i++ ){ if( k == COL_OMIT[i] ){omit = true;} } // Test to evaluate if the column is omitted from the XML dataset (due to transmission problems vis-a-vis “&” and “%” characters.)
    if( !omit ){ // Execute if the column number is not “blacklisted” via inclusion in the omit array.
      value[k] = range.getCell( j, k ).getValue();  // Fetch field value.
      if( typeof value[k] == OBJTYPE ){ for(f=0;f<THIS.length;f++){value[k].replace( THIS[f], WITH[f] );} } // Sub for problematic characters (&, %) in strings.
      h = PAYLOAD_ADDFIELD; // Reset string to start next column.
      myPayload = myPayload + PAYLOAD_STRING[h] + field[k]; h++; // e.g. "Full_address"; h=7
      myPayload = myPayload + PAYLOAD_STRING[h] + value[k]; h++; // e.g. "123 Elm St"; h=8
      myPayload = myPayload + PAYLOAD_STRING[h]; h++; // h=9
    }
  }
  myPayload = myPayload + PAYLOAD_STRING[h]; h++; // h=10
  value.splice( 1, (value.length-1) ); // Reset array of values. Deletes all the elements of the array — thereby resetting it.
  h = PAYLOAD_TERMINATE; myPayload = myPayload + PAYLOAD_STRING[h]; // Terminates payload string.
//
// 6. Execute request.
  advancedArgs = { method:METHOD, payload:myPayload, contentType:TYPE };
  response = UrlFetchApp.fetch( action, advancedArgs );
  Logger.log( "myPayload: " + myPayload );
  Logger.log( "response: " + response.getContentText() );
} // End record. Repeat.
//
}
{ // Main
	{ // JavaScript // Add the following code at the top of each project/file to load the following files.
	//	Load JavaScript library
		var CLIENT = "googleScripts";
		var LOAD   = "https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js";
		eval(UrlFetchApp.fetch( LOAD ).getContentText()); // Loads master file containing array of URI strings
		var files  = load(CLIENT); // Fetches array of URIs representing JS files library to load per the “client”
		var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())} // Evaluates code at each array element, URI.
	}
	{ // Parameters
		{ // Sheet/range
		var SS_KEY        = new Array(); // Elements are taken from the URL in the address line of the browser of the open Google Spreadsheet
		SS_KEY[0]         = "0AlLVOoV_2dFtdElDbWhKMGdpZ1FVRzRBd2VCa0F5ZlE"; // From: ForeclosureRadar — load
		SS_KEY[1]         = "0AlLVOoV_2dFtdG45MVpxcXJJWkVDbjJkQWFKQ2xOYUE"; //   To: ForeclosureRadar — scrape
		var SHEET_NAME    = new Array(); // Array of sheet arrays [0][0]
		for(i=0;i<SS_KEY.length;i++){SHEET_NAME[i] = new Array()}
		SHEET_NAME[0][0]  = "Sheet1";
		SHEET_NAME[1][0]  = "Track";
		SHEET_NAME[1][1]  = "In";
		SHEET_NAME[1][2]  = "Calc";
		SHEET_NAME[1][3]  = "Prep";
		SHEET_NAME[1][4]  = "Out";
		var ss            = new Array();
		var sheet         = new Array();
		var range         = new Array();
		for(var i=0;i<SS_KEY.length;i++){ // Loop to define sheets/ranges globally
			ss[i]    = SpreadsheetApp.openById(SS_KEY[i]);
			sheet[i] = new Array();
			range[i] = new Array();
			for(var j=0;j<SHEET_NAME[i].length;j++){sheet[i][j] = ss[i].getSheetByName(SHEET_NAME[i][j])}
		}   updateRangesData();
		}
		{ // Functions
			{ // In-line
		var funcArr       = new Array();          // Define an array of sub-functions to call in order to execute the global script. Call syntax: funcArr[i]();
			funcArr[1]    = function(){calc   ()} // Assign the function to a variable to allow looping to call the function inside the braces.
		//	funcArr[2]    = function(){formatA()} // Reference: http://forums.devshed.com/javascript-development-115/assigning-a-function-to-a-variable-without-it-firing-633070.html
		//	funcArr[3]    = function(){append ()} // Reference: http://stackoverflow.com/questions/1140089/how-does-an-anonymous-function-in-javascript-work <-- best reference
		//	funcArr[4]    = function(){formatB()} // Reference: http://2007-2010.lovemikeg.com/2008/08/17/a-week-in-javascript-patterns-self-invocation/
		//	funcArr[5]    = function(){write  ()}
			}
		/*	{ // AVM
		var labelArr      = new Array();               // Array of column labels for AVM models/functions; Note: Match label names with parameters in func prepA();
		var avmArr        = new Array();               // Define an array of AVM (automatic valuation models) to call to generate an estimate of the ARV (After Repair Value) of the subject.                        
			avmArr[1]     = function(x){return x.avmZillowAPI ()}; labelArr[1]="Zillow";     // ZILLOW
			avmArr[2]     = function(x){return x.avmEppraisal ()}; labelArr[2]="Eppraisal";  // EPPRAISAL
			avmArr[3]     = function(x){return x.avmRealtor   ()}; labelArr[3]="Realtor";    // REALTOR
			avmArr[4]     = function(x){return x.avmRealEstate()}; labelArr[4]="RealEstate"; // REAL ESTATE
			avmArr[5]     = function(x){return x.avmHomeGain  ()}; labelArr[5]="HomeGain";   // HOME GAIN
		var avm           = new Array();for(i=0;i<avmArr.length;i++){avm[i]=new Array()}     // Array of arrays; Local storage of AVM scrape arrays — prevents recurring server requests
			}* /
		}
		{ // Tracking
		var x             = 0;
		var ignitionOn    = new Array();               // Supports restarts: Determines POSITION of existing state of code that has run
		for(i=0;i<=2;i++){                             // Initialize and set to zero, all array elements from [1][0] to [2][3].
			ignitionOn[i] = new Array();               // i: [1] Position of Latest Run Code (“LRC”); [2] Position of code SEARCHING for LRC.
			for(j=0;j<=3;j++){                         // j: [1] Major code block, [2] Minor code block, [3] Row — Note: [2][3] variable is just labeled “row”
				if(j===0){ignitionOn[i][j] = false}    // Array of boolean “switches.” Flips on when code restart reaches the point of last run. [0][0] 
				else{
					if(i===2){ignitionOn[i][j] = -1}
					else     {ignitionOn[i][j] =  0}}}}}
	}
	{ // 1. Fetch tracking variables
		for(i=1;i<ignitionOn[1].length;i++){if(isNumber(range[1][0].getCell(1,i).getValue())){ignitionOn[1][i]=range[1][0].getCell(1,i).getValue()}}} // *** Tracking *** Fetches recorded values to detect leftoff location of lastly executed script. Detects latest blocks & rows to run as recorded & restarts script accordingly.
	{ // 2. Call functions
		for(ii=1;ii<funcArr.length;ii++){                                                                     // Calls all functions/subroutines in sequence.
			x=1;ignitionOn[2][x]++;ignitionOn[0][x]=(ignitionOn[0][x]||(ignitionOn[1][x]==ignitionOn[2][x])); // *** Tracking *** Increments block position & tests ignition
			if( ignitionOn[0][x]){range[1][0].getCell(1,x).setValue(ignitionOn[2][x]);                        // *** Tracking *** Update tracking cell with new value
				ignitionOn[2][2] = -1;									                                      // *** Tracking *** Resets nested counting variable
				funcArr[ii]();} // Calls function. Note: The parentheses “()” invoke the function call. Stating the function name alone, “funcArr[i]” without the parens will have no effect.
			updateRangesData();}} // Updates ranges
}
}
	/*   Archive avmData
	Replaced the following code block in main / functions:
			{ // AVM
		var labelArr      = new Array();               // Array of column labels for AVM models/functions; Note: Match label names with parameters in func prepA();
		var avmArr        = new Array();               // Define an array of AVM (automatic valuation models) to call to generate an estimate of the ARV (After Repair Value) of the subject.                        
			avmArr[1]     = function(x){return x.avmZillowAPI ()}; labelArr[1]="Zillow";     // ZILLOW
			avmArr[2]     = function(x){return x.avmEppraisal ()}; labelArr[2]="Eppraisal";  // EPPRAISAL
			avmArr[3]     = function(x){return x.avmRealtor   ()}; labelArr[3]="Realtor";    // REALTOR
			avmArr[4]     = function(x){return x.avmRealEstate()}; labelArr[4]="RealEstate"; // REAL ESTATE
			avmArr[5]     = function(x){return x.avmHomeGain  ()}; labelArr[5]="HomeGain";   // HOME GAIN
		var avm           = new Array();for(i=0;i<avmArr.length;i++){avm[i]=new Array()}     // Array of arrays; Local storage of AVM scrape arrays — prevents recurring server requests
			}
	Replaced the following code block inline:
			t=0;for(i=1;i<avmArr.length;i++){                                                                 // Reset try count; Append AVM estimates
					do{                                                                                       // Begin loop to attempt fetching
						if(avmArr[i](valAddress)){avm[i] = avmArr[i](valAddress)}                             // Set AVM estimate w/ try/catch
						else{avm[i].splice(0,avm[i].length)}                                                  // Else, clear array & reset values
						t++;                                                                                  // Increment try counter
					}while((!isNumber(avm[i][avm[i][0]]) && (t<=TRY_MAX))) t=0;}                              // Retry conditions: not successful & max attempts not exceeded
			valCalc = avm.avmDataStats(valBid);                                                               // Process AVM data — max bid, ARV = median AVM, StdDevPop, StdDevPct, margin & ratio
			for(i=1;i<labelArr.length;i++){range[1][4].getCell(row,getColNum(sheet[1][4],1,labelArr[i])).setValue(avm[i][avm[i][0]])} // WRITE OUT AVM value to cell
			for(i=1;i<valCalc.length;i++){range[1][4].getCell(row,colCalc[i]).setValue(valCalc[i])}           // CALCULATION array — write out value to cell
	* /
Array.prototype.flatten = function(){var out=new Array();out=out.concat(this);out.shift();return out} // Removes array dimension (e.g., [][][] becomes [][])
writeRangeToZoho((range.length-1),(range[range.length-1].length-1),APP,FORM); // Write output of scripts to database via XML & REST API // Ex. output: range[1][4]
function writeRangeToZoho(r1,r2,app,form){var values=range[r1][r2].getValues();writeToAPI_Zoho(app,form,values.shift(),values);} // Write output of scripts to database via XML & REST API // Fetch table values as a 2D-array[][], then use .shift() function on the array to isolate & remove column headers to send to write function
		/* Test
var mystring = 'this,is,"some, sample","csv, text, for",you,to,"look",at';
var parsed = mystring.splitCSV();
alert(parsed.join("\n"));
* /
	}
	{// Live Code
	for (var foo = this.split(sep = sep || ","), x = foo.length - 1, tl; x >= 0; x--) {
		if (foo[x].replace(/"\s+$/, '"').charAt(foo[x].length - 1) == '"') {
			if ((tl = foo[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
				foo[x] = foo[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
			}else if (x){
				foo.splice(x - 1, 2, [foo[x - 1], foo[x]].join(sep));
			}else foo = foo.shift().split(sep).concat(foo);
		}else foo[x].replace(/""/g, '"');
	}return foo}}
Array.prototype.furl = function(){ // Converts multi-dimensional array to CSV string
	var x = this;
	var i = x.length;while(i--){
		if(isArray(x[i])){} // Nest
		else{return x.arrayToCSV()}}}
String.prototype.unfurl = function(){ // Converts CSV string to multi-dimensional array
}
		{ // Headers
		var COLHEADER        = new Array();
		COLHEADER[1]         = "Address";
		COLHEADER[2]         = "Image src";
		COLHEADER[3]         = "NOS Amt";
		COLHEADER[4]         = "PP to";
		COLHEADER[5]         = "Type";
		COLHEADER[6]         = "TS#";
		COLHEADER[7]         = "PropID#";
		COLHEADER[8]         = "Item#";
		COLHEADER[9]         = "Open Bid";
		COLHEADER[10]        = "Start Bid";
		COLHEADER[11]        = "PreVal";
		COLHEADER[12]        = "Auction";
		COLHEADER[13]        = "Start";
		COLHEADER[14]        = "AucType";
		COLHEADER[15]        = "tsHidID";
		COLHEADER[16]        = "sa";
		COLHEADER[17]        = "csz";
		COLHEADER[18]        = "Number";
		COLHEADER[19]        = "State";
		COLHEADER[20]        = "Zip";
		COLHEADER[21]        = "Full address";
		COLHEADER[22]        = "Partial address";
		}
		{ // Markers
		var UL               = "list-property";
		var LI_QUE           = new Array();
		var LI_BEG           = new Array();
		var LI_END           = new Array();
		LI_QUE[1]            = "";
		LI_BEG[1]            = "http://www.auction.com/California/residential-auction-asset/";
		LI_END[1]            = "'";
		LI_QUE[2]            = "";
		LI_BEG[2]            = "src=\"";
		LI_END[2]            = "\"";
		LI_QUE[3]            = "Notice of Sale";
		LI_BEG[3]            = "$";
		LI_END[3]            = "<";
		LI_QUE[4]            = "Postponed To";
		LI_BEG[4]            = ":";
		LI_END[4]            = "&";
		LI_QUE[5]            = "Asset type";
		LI_BEG[5]            = ":";
		LI_END[5]            = "<";
		LI_QUE[6]            = "Trustee Number";
		LI_BEG[6]            = "&nbsp;";
		LI_END[6]            = "<";
		LI_QUE[7]            = "Property ID";
		LI_BEG[7]            = ">";
		LI_END[7]            = "<";
		LI_QUE[8]            = "Item";
		LI_BEG[8]            = ">";
		LI_END[8]            = "<";
		LI_QUE[9]            = "Opening Bid";
		LI_BEG[9]            = "$";
		LI_END[9]            = "<";
		LI_QUE[10]           = "Starting Bid";
		LI_BEG[10]           = "$";
		LI_END[10]           = "<";
		LI_QUE[11]           = "Previously Valued at";
		LI_BEG[11]           = "$";
		LI_END[11]           = "<";
		LI_QUE[12]           = "Auction Date";
		LI_BEG[12]           = " ";
		LI_END[12]           = "<";
		LI_QUE[13]           = "Start Date";
		LI_BEG[13]           = " ";
		LI_END[13]           = "<";
		LI_QUE[14]           = "Auction Type";
		LI_BEG[14]           = ":";
		LI_END[14]           = "<";
		LI_QUE[15]           = "id=";
		LI_BEG[15]           = "trusteeSaleHidden_"
		LI_END[15]           = "\"";
		}
		{ // Substitutions
		var THIS             = new Array();
		var WITH             = new Array();
		THIS[1]              = "$";
		WITH[1]              = "";
		THIS[2]              = ",";
		WITH[2]              = "";
		THIS[3]              = "&nbsp;";
		WITH[3]              = "";
		THIS[4]              = "  ";
		WITH[4]              = "";
		}
		{ // Row/Col/Start
		var INPUT_ROW_START  = 2; // The row on which to begin fetching the input cycling variable.
		var OUTPUT_START_ROW = 1; // The row number of the output sheet on which to begin printing the output.
		var OUTPUT_START_COL = 1; // Where to begin the initialization of columns.
		var INPUT_COL        = 3; // The row on which to begin fetching the input cycling variable.
		var START_ROW        = 2;
		var ADDRESS_COL      = 1;
		var countRows        = 0;
		var rowOut           = OUTPUT_START_ROW; // Initialize the ROW of the output cell.
		var colOut           = OUTPUT_START_COL; // Initialize the COLUMN of the output cell.
		var rowIn            = INPUT_ROW_START; // Initialize the ROW of the input cell.
		var colIn            = INPUT_COL; // Initialize the COL of the input cell.
		var outputCell       = range[1][3].getCell( rowOut, colOut ); // Initialize/activate/update output cell. // out.clear(); // Clear output cell.
		}
function acPrep   (){ // Takes fully unfurled table on “Start” sheet to partially populated but parsed and partially amended records on sheet labeled “Prep.”
	{ // Purpose
		// The purpose of this function is to take the first pass of scraped data (called “ScrapeA at the moment”)
		// and begin processing it for receiving appendings and being written to output. Specifically, this function copies
		// certain fields from every record and places them under column headers that correspond to the field names in the 
		// database table that will receive the XML output file (via REST API). Subsequent functions in this script project
		// local to this spreadsheet (template) will (i) process certain fields (such as date/time stamps) (i) perform calculations
		// such as ratios, (iii) construct URL link strings, (iv) fetch and append property data and automatic valuation estimates
		// from third parties such as Zillow, Eppraisal, Homes.com, Trulia.com and Realtor.com, (v) filter and sort those records
		// and, finally, (vi) prepare and execute and XML write file to the receiving database via API.
	}
	{ // Parameters
		var COLHEADER = new Array(); // Zoho DATABASE field name, also must match column header in the 2nd worksheet (the “to” sheet in prepB)
		var COLMAPSTR = new Array(); // COLUMN header in the 1st worksheet (the “from” sheet in prepA); Null value ("") means new field is added in processing
		COLHEADER[0]  = "";
		COLMAPSTR[0]  = "";
		COLHEADER[1]  = "Number_and_street";
		COLMAPSTR[1]  = "sa";
		COLHEADER[2]  = "csz";
		COLMAPSTR[2]  = "csz";
		COLHEADER[3]  = "State";
		COLMAPSTR[3]  = "State";
		COLHEADER[4]  = "Zip";
		COLMAPSTR[4]  = "Zip";
		COLHEADER[5]  = "Full_address";
		COLMAPSTR[5]  = "Full address";
		COLHEADER[6]  = "Partial_address";
		COLMAPSTR[6]  = "Partial address";
		COLHEADER[7]  = "Sale_year";
		COLMAPSTR[7]  = "";
		COLHEADER[8]  = "Sale_month";
		COLMAPSTR[8]  = "";
		COLHEADER[9]  = "Sale_day";
		COLMAPSTR[9]  = "";
		COLHEADER[10] = "Sale_hour";
		COLMAPSTR[10] = "";
		COLHEADER[11] = "Sale_location";
		COLMAPSTR[11] = "";
		COLHEADER[12] = "Opening_bid";
		COLMAPSTR[12] = "Open Bid";
		COLHEADER[13] = "Estimated_opening_bid"; // Selected for expedience.
		COLMAPSTR[13] = "Start Bid";
		COLHEADER[14] = "Estimated_total_encumbrance";
		COLMAPSTR[14] = "";
		COLHEADER[15] = "Yahoo_link";
		COLMAPSTR[15] = "";
		COLHEADER[16] = "Zillow_link";
		COLMAPSTR[16] = "";
		COLHEADER[17] = "Eppraisal_link";
		COLMAPSTR[17] = "";
		COLHEADER[18] = "Zillow_details_link";
		COLMAPSTR[18] = "ZillowLink";
		COLHEADER[19] = "Prop_type";
		COLMAPSTR[19] = "Type";
		COLHEADER[20] = "Beds";
		COLMAPSTR[20] = "BR";
		COLHEADER[21] = "Baths";
		COLMAPSTR[21] = "BA";
		COLHEADER[22] = "Sq_feet";
		COLMAPSTR[22] = "SF";
		COLHEADER[23] = "Lot_size";
		COLMAPSTR[23] = "Lot";
		COLHEADER[24] = "Year_built";
		COLMAPSTR[24] = "Built";
		COLHEADER[25] = "Last_sold_date";
		COLMAPSTR[25] = "Sold";
		COLHEADER[26] = "Last_sold_price";
		COLMAPSTR[26] = "For";
		COLHEADER[27] = "Tax_assessed_value";
		COLMAPSTR[27] = "Tax";
		COLHEADER[28] = "Alternate";  // e.g., “ForeclosureRadar”, Homes.com, Realtor.com, Trulia.com, Eppraisal and Zillow
		COLMAPSTR[28] = "";
		COLHEADER[29] = "Zillow";     // Match AVM column labels with nameArr parameters in function main();
		COLMAPSTR[29] = "";
		COLHEADER[30] = "Eppraisal";  // Match AVM column labels with nameArr parameters in function main();
		COLMAPSTR[30] = "";
		COLHEADER[31] = "Realtor";    // Match AVM column labels with nameArr parameters in function main();
		COLMAPSTR[31] = "";
		COLHEADER[32] = "RealEstate"; // Match AVM column labels with nameArr parameters in function main();
		COLMAPSTR[32] = "";
		COLHEADER[33] = "HomeGain";   // Match AVM column labels with nameArr parameters in function main();
		COLMAPSTR[33] = "";
		COLHEADER[34] = "Auto_estimate";
		COLMAPSTR[34] = "";
		COLHEADER[35] = "StdDevPop";
		COLMAPSTR[35] = "";
		COLHEADER[36] = "StdDevPct";
		COLMAPSTR[36] = "";
		COLHEADER[37] = "PopCount";   // Size count of the population of AVM estimates
		COLMAPSTR[37] = "";
		COLHEADER[38] = "First_margin";
		COLMAPSTR[38] = "";
		COLHEADER[39] = "First_key_ratio";
		COLMAPSTR[39] = "";
		var colMapNum = new Array();
		var START_ROW = 1;
		var START_COL = 1;
		var row       = 1;
		var col       = 1;
		var resultNum = 0;
		var resultStr = "";
	}
	{ // 1. Sheet/range
		var fromCountRows   = sheet[1][3].getLastRow();
		var fromCountCols   = sheet[1][3].getLastColumn();
		range[1][3]         = sheet[1][3].getRange(1, 1, fromCountRows, fromCountCols);
		range[1][4]         = sheet[1][4].getRange(1, 1, fromCountRows, COLHEADER.length);
		sheet[1][4].clearContents();
	}
	{ // 2. Set headers & populate table
	x=2;ignitionOn[2][x]++;ignitionOn[0][x]=(ignitionOn[0][x]||(ignitionOn[1][x]==ignitionOn[2][x]));  // *** Tracking *** Increments block position & tests ignition
	if( ignitionOn[0][x]){range[1][0].getCell(1,x).setValue(ignitionOn[2][x]);                         // *** Tracking *** Update tracking cell with new value
		if(ignitionOn[0][0]){rowStart=START_ROW}else{rowStart=ignitionOn[1][3];ignitionOn[0][0]=true;} // *** Tracking *** Starts row loop at the beginning if ignition is already “on.”
		for(row=START_ROW;row<=fromCountRows;row++){                                                   // Loop to translate records — row by row
			range[1][0].getCell(1,3).setValue(row);                                                    // *** Tracking *** Writes row/iteration number to sheet
			for( col=START_COL; col<COLMAPSTR.length; col++ ){                                         // Within each row, loop over columns to populate cells
				resultNum = 0; resultStr = "";                                                         // Resets output variables after column increments
				if( row==START_ROW ){                                                                  // At the first row...
					range[1][4].getCell( row, col ).setValue( COLHEADER[col] );                        // Set COLUMN HEADERS
					colMapNum[col] = getColNum( sheet[1][3], 1, COLMAPSTR[col] );                      // Fetch column number of matched string; search once only; place results in array for reference
				}else{                                                                                 // After the first row, populate the table with data
					if( colMapNum[col] > 0 ){                                                          // Map “from-to:” Conditions the write out tasks on the existence of a match of the column headers to the column mappers.
						resultStr = range[1][3].getCell( row, colMapNum[col] ).getValue();
						range[1][4].getCell( row, col ).setValue( resultStr );}}}}}}
}
function acOut    (){ // Fully unfurls “Prep” sheet; appends AVM, calculates & sorts
	{ // Purpose
	//    i. process certain fields (such as date/time stamps)
	//   ii. perform calculations such as ratios,
	//  iii. construct URL link strings,
	//   iv. fetch and append property data and automatic valuation estimates (AVM)
	//       from third parties such as Zillow, Eppraisal, Homes.com, Trulia.com and Realtor.com,
	//    v. filter and sort those records by date and profit potential
	//   vi. prepare and execute and XML write file to the receiving database via API.
	}
	{ // Parameters
		var rowDelete     = 0;
		var RATIO_MAX     = 70; // Maximum ratio that qualifies a “deal”
		var TRY_MAX       = 3;  // Maximum number of additional tries after failure to attempt to run a scraping session for a given AVM.
		var rowStart      = 0;
		var START_ROW     = 2;
		var START_COL     = 1;
		var ROW_BUFFER    = 1;  // Number of rows to add to range to prevent from referencing cells out of range when performing loops after sort, delete, etc.
		var colDateFrom   = new Array();
		var LABDATE_FROM  = new Array(); // Array to hold colummn numbers for certain key date fields
		LABDATE_FROM[1]   = "Auction";   // from...
		LABDATE_FROM[2]   = "Start";
		LABDATE_FROM[3]   = "PP to";
		var colDateTo     = new Array();
		var LABDATE_TO    = new Array(); // Array to hold colummn numbers for certain key date fields
		LABDATE_TO[1]     = "Sale_year"; // to...
		LABDATE_TO[2]     = "Sale_month";
		LABDATE_TO[3]     = "Sale_day";
		// LABDATE_TO[4]  = "Sale_hour";
		var valAddress    = new Array();
		var colAddress    = new Array();
		var LABADDRESS    = new Array();
		LABADDRESS[1]     = "Number_and_street"; // sa
		LABADDRESS[2]     = "csz";               // csz
		LABADDRESS[3]     = "State";             // state
		LABADDRESS[4]     = "Zip";               // zip
		LABADDRESS[5]     = "Full_address";      // full
		LABADDRESS[6]     = "Partial_address";   // partial
		var valBid        = new Array();
		var colBid        = new Array();
		var LABBID        = new Array();
		LABBID[1]         = "Opening_bid";
		LABBID[2]         = "Estimated_opening_bid";
		var valCalc       = new Array();
		var colCalc       = new Array();
		var LABCALC       = new Array();
		LABCALC[1]        = "PopCount";        // Count of AVM estimates that were used (reduced to a numeric) to compute descriptive statistics
		LABCALC[2]        = "Opening_bid";     // bid
		LABCALC[3]        = "Auto_estimate";   // arv
		LABCALC[4]        = "First_margin";    // margin
		LABCALC[5]        = "First_key_ratio"; // ratio
		LABCALC[6]        = "StdDevPop";       // StdDevPop
		LABCALC[7]        = "StdDevPct";       // StdDevPct
		var valDetails    = new Array();
		var colDetails    = new Array();
		var LABDETAILS    = new Array();
		var MAPDETAILS    = new Array(); // The element number in the Zillow AVM array corresponding to the given label of the LABDETAILS array
		LABDETAILS[1]     = "Beds";
		MAPDETAILS[1]     = 21;
		LABDETAILS[2]     = "Baths";
		MAPDETAILS[2]     = 20;
		LABDETAILS[3]     = "Sq_feet";
		MAPDETAILS[3]     = 19;
		LABDETAILS[4]     = "Lot_size";
		MAPDETAILS[4]     = 18;
		LABDETAILS[5]     = "Year_built";
		MAPDETAILS[5]     = 17;
		LABDETAILS[6]     = "Last_sold_date";
		MAPDETAILS[6]     = 22;
		LABDETAILS[7]     = "Last_sold_price";
		MAPDETAILS[7]     = 23;
		LABDETAILS[8]     = "Tax_assessed_value";
		MAPDETAILS[8]     = 16;
		var dateThisRow   = new Array();
		var aucDates      = new Array(); // The 2 or 3 fields (values, not columns) representing the auction date. Including auction date, start date, and postponed to
		var valAucDate    = new Array();
		var i             = 0;
		var j             = 0;
		var k             = 0;
		var m             = 0;
		var n             = 0;
		var t             = 0;
		var row           = 1;
		var col           = 1;
		var dateRowOneStr = "";
	}
	{ // 1. Sheet/Range
		var fromCountRows   = range[1][3].getHeight();
		var fromCountCols   = range[1][3].getWidth();
		var toCountRows     = range[1][4].getHeight();
		var toCountCols     = range[1][4].getWidth();
		var sortRange       = sheet[1][4].getRange(2, 1, toCountRows, toCountCols);
	}
	{ // 2. Fetch column numbers.
		for(i=1;i<LABDETAILS.length;  i++){colDetails[i] =getColNum(sheet[1][4], 1, LABDETAILS[i]  )} 
		for(i=1;i<LABADDRESS.length;  i++){colAddress[i] =getColNum(sheet[1][4], 1, LABADDRESS[i]  )} 
		for(i=1;i<LABBID.length;      i++){colBid[i]     =getColNum(sheet[1][4], 1, LABBID[i]      )}
		for(i=1;i<LABCALC.length;     i++){colCalc[i]    =getColNum(sheet[1][4], 1, LABCALC[i]     )}
		for(i=1;i<LABDATE_FROM.length;i++){colDateFrom[i]=getColNum(sheet[1][3], 1, LABDATE_FROM[i])} // from...
		for(i=1;i<LABDATE_TO.length;  i++){colDateTo[i]  =getColNum(sheet[1][4], 1, LABDATE_TO[i]  )} // to...
	}
	{ // 3. Dates: define/parse & format
	x=2;ignitionOn[2][x]++;ignitionOn[0][x]=(ignitionOn[0][x]||(ignitionOn[1][x]==ignitionOn[2][x]));  // *** Tracking *** Increments block position & tests ignition
	if( ignitionOn[0][x]){range[1][0].getCell(1,x).setValue(ignitionOn[2][x]);                         // *** Tracking *** Update tracking cell with new value
		if(ignitionOn[0][0]){rowStart=START_ROW}else{rowStart=ignitionOn[1][3];ignitionOn[0][0]=true;} // *** Tracking *** Starts row loop at the beginning if ignition is already “on.”
		for(row=rowStart;row<=toCountRows;row++){                                                      // Loop rows
			range[1][0].getCell(1,3).setValue(row);                                                    // *** Tracking *** Writes row/iteration number to sheet
			valAucDate.splice(0,valAucDate.length);                                                    // Resets variables for next row
			for(i=1;i<colDateFrom.length;i++ ){                                                        // Get label values FROM
				if(!valAucDate[0]){                                                                    // Condition upon NON existence of selected value.
					aucDates[i] = range[1][3].getCell(row,colDateFrom[i]).getValue();                  // Fetch date stamp values
					if(aucDates[i]){                                                                   // Chooses the populated cell/value
						valAucDate[0] = aucDates[i];
						valAucDate[1] = valAucDate[0].getFullYear();                                   // Year
						valAucDate[2] = valAucDate[0].getMonth()+1;                                    // Month — add “1” (+1) as values start at zero
						valAucDate[3] = valAucDate[0].getDate();                                       // Date
						for(j=1;j<valAucDate.length;j++){range[1][4].getCell(row,colDateTo[j]).setValue(valAucDate[j])}}}}}}} // Write out
	{ // 4. Dates: sort & trim/delete
	x=2;ignitionOn[2][x]++;ignitionOn[0][x]=(ignitionOn[0][x]||(ignitionOn[1][x]==ignitionOn[2][x]));  // *** Tracking *** Increments block position & tests ignition
	if( ignitionOn[0][x]){range[1][0].getCell(1,x).setValue(ignitionOn[2][x]);                         // *** Tracking *** Update tracking cell with new value
		if(ignitionOn[0][0]){rowStart=START_ROW}else{rowStart=ignitionOn[1][3];ignitionOn[0][0]=true;} // *** Tracking *** Starts row loop at the beginning if ignition is already “on.”
		{ // Notes
		// Decision: For the time being, we will NOT track the row number in this code block. We will treat the block as if there is no iteration loop.
		// Note: The above design decision has been REVERSED. The following reasons have been interpreted to no longer apply.
		// Reasons: (1) the sorting operation & (2) the row comparison to determine the “out-of-range” rows to delete require all the rows to be considered as a group
		// & not just performing operations on each row individually & independently.
		}
		sortRange.sort( colDateTo.slice(1) );                                                          // Sort rows; .slice(1) removes “0” index.
		range[1][4] = sheet[1][4].getRange(1, 1, toCountRows+START_ROW+ROW_BUFFER, toCountCols);
		do{                                                                                            // Loops thru rows and fetch date arrays for each row
			for(i=1;i<colDateTo.length;i++){dateThisRow[i]=range[1][4].getCell(row,colDateTo[i]).getValue()} // Fetches date array (DD,MM,YY) for the current row
			if(row==rowStart){dateRowOneStr = dateThisRow.toString()}                                  // Fetch first row date; compare those which follow.
			range[1][0].getCell(1,3).setValue(row);                                                    // *** Tracking *** Writes row/iteration number to sheet
			rowDelete=row;row++;                                                                       // Update and increment
		} while( dateRowOneStr == dateThisRow.toString() )                                             // While date array equals that of first row
		sheet[1][4].deleteRows(rowDelete,START_ROW+toCountRows-rowDelete);}}                           // Deletes remainder of rows to trim them
	{ // 5. Process records; AVMs
	x=2;ignitionOn[2][x]++;ignitionOn[0][x]=(ignitionOn[0][x]||(ignitionOn[1][x]==ignitionOn[2][x]));         // *** Tracking *** Increments block position & tests ignition
	if( ignitionOn[0][x]){range[1][0].getCell(1,x).setValue(ignitionOn[2][x]);                                // *** Tracking *** Update tracking cell with new value
		if(ignitionOn[0][0]){row=START_ROW}else{row=ignitionOn[1][3];ignitionOn[0][0]=true;}                  // *** Tracking *** Starts row loop at the beginning if ignition is already “on.”
		range[1][4] = sheet[1][4].getRange(1, 1, toCountRows+START_ROW+ROW_BUFFER, toCountCols);
		do{ range[1][0].getCell(1,3).setValue(row);                                                           // *** Tracking *** Writes row/iteration number to sheet
			for(i=1;i<colBid.length;    i++){valBid[i]    =range[1][4].getCell(row,colBid[i]    ).getValue()} // Fetch value array: BIDS    — opening & starting/“estimated”
			for(i=1;i<colAddress.length;i++){valAddress[i]=range[1][4].getCell(row,colAddress[i]).getValue()} // Fetch value array: ADDRESS — sa, csz
			avm = valAddress.avmData(valBid);                                                                 // Create array of AVM estimates: out[][][]:[0][stats],[1][labels],[2][estimate arrays][]
			for(i=1;i<labelArr.length;i++){range[1][4].getCell(row,getColNum(sheet[1][4],1,labelArr[i])).setValue(avm[2][i][avm[2][i][0]])} // WRITE OUT AVM value to cell
			for(i=1;i<avm[0].length;i++){range[1][4].getCell(row,colCalc[i]).setValue(avm[0][i])}             // CALC/STAT array — write out value to cell
			for(i=1;i<MAPDETAILS.length;i++){range[1][4].getCell(row,colDetails[i]).setValue(avm[2][1][MAPDETAILS[i]])} // Property details
			row++;                                                                                            // End of row; increment row
		}while(valAddress[1])}} //sortRange.sort(colCalc[4]); for(row=START_ROW;row<=toCountRows;row++){if(range[1][4].getCell(row,colCalc[4]).getValue()>RATIO_MAX){sheet[1][4].deleteRow(row);}} // Sort & delete
}
function delayInSeconds( sec ){var t = setTimeout("delay()", sec*1000);} // *DEPRECATED* call: delayInSeconds(3); Where 3 = sec = number of seconds to delay. Note: Do not use t as that is a reserved variable.
function signup_AucDotCom(){ // *DEPRECATED* Signup script for Auction.com registration
var STEM   = "https://www.auction.com/register.php";
var ID     = new Array();
ID[0]      = "";
ID[1]      = "email";
ID[2]      = "password1";
ID[3]      = "confirmPassword";
ID[4]      = "firstName";
ID[5]      = "lastName";
ID[6]      = "countryid"; //= United States
ID[7]      = "address";
ID[8]      = "city";
ID[9]      = "r_123"; //(state)
ID[10]     = "c_1004"; //(zip)
ID[11]     = "zip";
ID[12]     = "phoneNumber1";
ID[13]     = "Phone1";
ID[14]     = "Phone2";
ID[15]     = "Phone3";
ID[16]     = "PhoneNum"; //(mobile)
ID[17]     = "mobile1";
ID[18]     = "mobile2";
ID[19]     = "mobile3";
ID[20]     = "mobileNum";
var VALUE  = new Array();
VALUE[0]   = "";
VALUE[1]   = "JasmineHKays@mailmetrash.com"; // email
VALUE[2]   = "uuraisech5suF"; // password1
VALUE[3]   = "uuraisech5suF"; // confirmPassword
VALUE[4]   = "Jasmine"; // firstName
VALUE[5]   = "Kays"; // lastName
VALUE[6]   = " United States "; // countryid
VALUE[7]   = "1693 Crowfield Road"; // address
VALUE[8]   = "Phoenix"; // city
VALUE[9]   = "Arizona"; // state (r_123)
VALUE[10]  = "85016"; // zip (c_1004)
VALUE[11]  = "85016"; // zip
VALUE[12]  = ""; // phoneNumber1
VALUE[13]  = "602"; // Phone1
VALUE[14]  = "779"; // Phone2
VALUE[15]  = "6067"; // Phone3
VALUE[16]  = ""; // PhoneNum (mobile)
VALUE[17]  = ""; // mobile1
VALUE[18]  = ""; // mobile2
VALUE[19]  = ""; // mobile3
VALUE[20]  = ""; // mobileNum
var params = "?";
//
  for(i=1;i<ID.length;i++){params+=(ID[i]+"="+VALUE[i]+"&");}
action = STEM + params;
}
function parseZillow(){ // *DEPRECATED* Parses address of specified format — "1261604-1760-9491-Capiland-Road-DESERT-HOT-SPRINGS-CA-92240"
//
// DEPRECATED: This function has been deprecated in favor of using the “all caps” feature of the input string from auction.com.
// This feature provides that the city/state/zip substring is in all capital letters making it distinguishible from the street address.
// Therefore, we can use the standard operating procedure of scraping the Yahoo real estate site as the first scrape for data.
// Formerly, this function was sequenced 2nd in the run order — following the scrape of the first page of data on auction.com — “scrapeA.”
//
// PURPOSE: The purpose of this function is to parse the scraped address and collect the zillow variables (Zestimate, br, ba, sf, etc.)
//
var ADDRESS_STRING = "1261604-1760-9491-Capiland-Road-DESERT-HOT-SPRINGS-CA-92240";
var DELIMITER      = "-";
var OCCURENCES     = 2;
var PREFIX         = "http://www.zillow.com/homes/";
var SUFFIX         = "_rb/";
var startIndex     = -1;
var addressStr     = ADDRESS_STRING;
var zillowUrl      = "";
//
// 1. Parse address string to get substring to use for Zillow URL.
for( i=1; i<=OCCURENCES; i++ ){
  startIndex = addressStr.indexOf( DELIMITER ) + 1;
  addressStr = addressStr.slice( startIndex );
}
//
// 2. Construct Zillow URL.
zillowUrl = PREFIX + addressStr + SUFFIX;
//
// 3. Scrape Zillow.
}
function xwritex(){ // *DEPRECATED* Writes output of scripts to database via XML & REST API
	{ // Parameters
		{ // Payload
		var myPayload         = "";
		var PAYLOAD_PREFIX    = 1;
		var PAYLOAD_ADDRECORD = 6;
		var PAYLOAD_ADDFIELD  = 7;
		var PAYLOAD_TERMINATE = 11;
		var COL_OMIT          = new Array(); // These are the columns to omit from any API/XML transmission.
		COL_OMIT[0]           = 15;
		COL_OMIT[1]           = 17;
		var THIS              = new Array();
		var WITH              = new Array();
		THIS[0]               = "&";
		WITH[0]               = "and"; // Tried: &amp; &amp;amp; %26 &#038 &#038;
		THIS[1]               = "%";
		WITH[1]               = "";
		var field             = new Array();
		var value             = new Array();
		}
		{ // Other
		var omit              = new Boolean();
		var OBJTYPE           = "string";
		var rowStart          = 0;
		var START_ROW         = 2;
		var START_COL         = 1;
		var f                = 0;
		var gg                = 0;
		var h                = 0;
		var i                = 0;
		var j                = 0;
		var k                = 0;
		var countCols         = range[1][4].getWidth();
		var countRows         = range[1][4].getHeight();
		}
		{ // Deprecated
		// var SHEET          = "Prep";
		// var ss             = SpreadsheetApp.getActiveSpreadsheet();
		// var sheet[1][4]    = ss.getSheetByName( SHEET );
		// var range[1][4]    = sheet[1][4].getDataRange();
		}
	}
	/*	1. (Adaptation in process) Archive: copy & clear — Copy and archive worksheet and clear 'In' sheet in preparation for next run.
		var newSs = SpreadsheetApp.create( dateTime ); // Creates a new spreadsheet & names it with the value of the offer set ID (timestamp).
		var newUrl = newSs.getUrl(); // Gets the URL of the newly created spreadsheet.
		var sheetCount = ss.getNumSheets(); // Computes the number of sheets to be copied.
		for(i=sheetCount-1;i>=0;i--){ss.getSheets()[i].copyTo( newSs )} // Copies all sheets to the new spreadsheet.
		ss.getSheetByName( 'In' ).clear(); // Clears the sheet of all content and formatting — in preparation for next run.
	* /
	{ // 2. Construct URI & headers — loop over arrays to construct variables
		for(k=START_COL;k<=countCols;k++){field[k]=range[1][4].getCell(1,k).getValue()} k=0; // Field/header array.
	}
	{ // 3. Construct XML payload & execute request — iterate over rows
	x=2;ignitionOn[2][x]++;ignitionOn[0][x]=(ignitionOn[0][x]||(ignitionOn[1][x]==ignitionOn[2][x]));  // *** Tracking *** Increments block position & tests ignition
	if( ignitionOn[0][x]){range[1][0].getCell(1,x).setValue(ignitionOn[2][x]);                         // *** Tracking *** Update tracking cell with new value
		if(ignitionOn[0][0]){rowStart=START_ROW}else{rowStart=ignitionOn[1][3];ignitionOn[0][0]=true;} // *** Tracking *** Starts row loop at the beginning if ignition is already “on.”
		for(j=rowStart;j<=countRows;j++){                                                              // Iterate down rows. Insert record string construction here.
			range[1][0].getCell(1,3).setValue(j);                                                      // *** Tracking *** Writes row/iteration number to sheet
			for(k=START_COL;k<=countCols;k++){                                                         // Iterate across columns. Fetch header at row 1 and value at row j.
				omit = false;                                                                          // Reset exclusion switch.
				for(i=0;i<COL_OMIT.length;i++){if(k == COL_OMIT[i]){omit = true}}                      // Test to evaluate if the column is omitted from the XML dataset (due to transmission problems vis-a-vis “&” and “%” characters.)
				if(!omit){                                                                             // Execute if the column number is not “blacklisted” via inclusion in the omit array.
					value[k]   = range[1][4].getCell(j,k).getValue();                                  // Fetch field value.
					if(typeof value[k] == OBJTYPE){for(f=0;f<THIS.length;f++){value[k]=value[k].replaceAll(THIS[f],WITH[f])}} // Sub for problematic characters (&, %) in strings.

			value.splice( 0, value.length );                                                           // Reset array of values. Deletes all the elements of the array — thereby resetting it.

			advancedArgs = {method:METHOD,payload:myPayload,contentType:TYPE};                         // Execute request.
			response     = UrlFetchApp.fetch(action,advancedArgs)}}}                                   // End record. Repeat.
}}}
function acomImport(){ // *DEPRECATED* Table on input SS to single cell on input SS. Transfer scrapted HTML data from publicly accessable SS to private SS containing scripts to process
	/* Archive
	{ // Parameters
		{ // Deprecated
		// var SHEET_NAME_FR = "Sheet1";
		// var SHEET_NAME_TO = "Input";
		// var ssFr          = SpreadsheetApp.openById( SS_KEY[0] );
		// var ssTo          = SpreadsheetApp.openById( SS_KEY[1] );
		// var sheetFr       = ssFr.getSheetByName( SHEET_NAME_FR ); // Initializes sheet variable.
		// var sheetTo       = ssTo.getSheetByName( SHEET_NAME_TO ); // Initializes sheet variable.
		// var rangeFr       = sheetFr.getDataRange();
		}
		var dataString       = "";
		var dataArray        = range[0][0].getValues(); // Remember, this is a two-dimentional array. dataArray[0][0]
		range[1][2]          = sheet[1][2].getRange(1,1,1,1); // Initializes range variable; sets to max.
	}
	{ // Loop rows/cols: fetch, decode, deposit.
		for(var i=0;i<dataArray.length;i++){ // Loop thru ROWS of input data array.
			for(var j=0;j<dataArray[i].length;j++){ // Loop thru COLUMNS of input data array.
				if(i>0 && j>0){dataString+=dataArray[i][j]}}} // Append each cell to end of input string.
		dataString = dataString.hexDecode(); // Decode hexidecimal to yield originally scraped HTML.
		range[1][2].getCell(1,1).setValue(dataString); // Post consolidated table, appended & decoded HTML string into a single cell in the table. This is the initial string to process containing all scraped data.
	}* /
}
function appendCopy(){
//
// *** NOTE THIS FILE IS A COPY FOR APPLICATION OF A SINGLE INSTANCE PRIOR TO MODIFYING THE CODE FOR USE ON AN ENTIRE DATASET. ***
// We considered it prudent to make a copy of the final working version prior to making modifications for use on the dataset.
//
// PURPOSE: The purpose of this function is to append the URL links to the output sheet for each situs (subject property).
// URL links include Zillow, Yahoo and Eppraisal.
//
// *******************************************************************************************************************
// *******************************************************************************************************************
// **                                                                                                               **
// **                                             STAGE I — Zillow URL                                              **
// **                                                                                                               **
// *******************************************************************************************************************
// *******************************************************************************************************************
// 
    // PURPOSE: Generate the URL for the indicated resource given the physical address.
    //
    // 0. Example and test variables.
    var sa = "2056 154th ave se"; // sa = street address
    var csz = "bellevue, wa"; // csz = (city + state) OR zip
    //
    // 1. Initialize arguments.
    var PREFIX = "http://www.zillow.com/homes/";
    var SUFFIX = "_rb/";
    var THIS = " ";
    var WITH = "-";
    //
    // 2. Generate URL.
    var action = "";
    action = action + PREFIX;
    action = action + sa;
    action = action + ", ";
    action = action + csz;
    action = action + SUFFIX;
    // Encode spaces.
    while( action.indexOf( THIS ) >= 0 ){
      action = action.replace( THIS, WITH );
    }
    //
    // 3. Return.
    // return action;
    Logger.log( "urlZillow: " + action );
//
// *******************************************************************************************************************
// *******************************************************************************************************************
// **                                                                                                               **
// **                                             STAGE II — Yahoo URL                                              **
// **                                                                                                               **
// *******************************************************************************************************************
// *******************************************************************************************************************
//
    // 0. Example and test variables.
    // var sa = "2056 154th ave se"; // sa = street address
    // var csz = "bellevue, wa"; // csz = (city + state) OR zip
    //
    // 1. Define parameters.
    var STEM = "http://realestate.yahoo.com/Homevalues/result.html";
    var WITH = "+";
    var THIS_01 = ", ";
    var THIS_02 = ",";
    var THIS_03 = " ";
    var THIS_04 = "++";
    //
    // 2. Construct URL.
    var action = "";
    action = action + STEM;
    action = action + "?sa=";
    action = action + sa;
    action = action + "&csz=";
    action = action + csz;
    action = action + "&search=Search";
    //
    // 3. Make substitutions.
    while( action.indexOf( THIS_01 ) >= 0 ){ // For every occurence
      action = action.replace( THIS_01, WITH ); // substitute string.
    } // Logger.log( "action: " + action );
    while( action.indexOf( THIS_02 ) >= 0 ){ // For every occurence
      action = action.replace( THIS_02, WITH ); // substitute string.
    } // Logger.log( "action: " + action );
    while( action.indexOf( THIS_03 ) >= 0 ){ // For every occurence
      action = action.replace( THIS_03, WITH ); // substitute string.
    } // Logger.log( "action: " + action );
    while( action.indexOf( THIS_04 ) >= 0 ){ // For every occurence
      action = action.replace( THIS_04, WITH ); // substitute string.
    } // Logger.log( "action: " + action );
    //
    Logger.log("urlYahoo: " + action); // Report product.
    //
// *******************************************************************************************************************
// *******************************************************************************************************************
// **                                                                                                               **
// **                                           STAGE III — Scrape Yahoo                                            **
// **                                                                                                               **
// *******************************************************************************************************************
// *******************************************************************************************************************
//
    // 4. Fetch URL (HTTP GET).
    var response = UrlFetchApp.fetch( action ); // Fetch the URL of the subject. // var responseCode = response.getResponseCode(); // Gets the response code to determine if the given id produces a valid record. // Logger.log( "responseCode: " + responseCode ); // Logs the currently active variable.
    var responseText = response.getContentText(); // Get response text; convert to string variable. // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
    //
    // 5. Scrape.
    // a. Define parameters.
    var THIS_01 = "$";
    var THIS_02 = ",";
    var WITH = "";
    var MARKER_START_A = ">";
    var MARKER_END_A = "<";
    var MARKER_START_B = "href=\"";
    var MARKER_END_B = "\"";
    var MARKER_START_C = "<dd>";
    var MARKER_END_C = "<";
    var MARKER_01 = "Residence: ";
    var MARKER_02 = "Beds: ";
    var MARKER_03 = "Bath: ";
    var MARKER_04 = "Square Feet: ";
    var MARKER_05 = "Lot Size: ";
    var MARKER_06 = "Year Built: ";
    var MARKER_07 = "\"estimates\"";
    var MARKER_11 = "Last Sold Date:";
    var MARKER_12 = "Last Sold Price:";
    var MARKER_13 = "Tax assessed value:";
    var token = "";
    // b. Scrape
 // if( responseText.indexOf( MARKER_01 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_01 ) ); // Grabs string after the prefix (marker). // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker). // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_02, WITH ); // substitute string.
      }
      Logger.log( "type: " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
    * /
 // if( responseText.indexOf( MARKER_02 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_02 ) ); // Grabs string after the prefix (marker). // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker). // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_02, WITH ); // substitute string.
      }
      Logger.log( "beds: " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
    * /
 // if( responseText.indexOf( MARKER_03 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_03 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_02, WITH ); // substitute string.
      }
      Logger.log( "bath: " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
    * /
 // if( responseText.indexOf( MARKER_04 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_04 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_02, WITH ); // substitute string.
      }
      Logger.log( "sft: " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
    * /
 // if( responseText.indexOf( MARKER_05 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_05 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_02, WITH ); // substitute string.
      }
      Logger.log( "lot: " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
    * /
 // if( responseText.indexOf( MARKER_06 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_06 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_02, WITH ); // substitute string.
      }
      Logger.log( "yr: " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
    * /
 // if( responseText.indexOf( MARKER_07 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_07 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_B ) + MARKER_START_B.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_B ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_02, WITH ); // substitute string.
      }
      Logger.log( "urlZillow: " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
    * /
 // if( responseText.indexOf( MARKER_START_A ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_02, WITH ); // substitute string.
      }
      Logger.log( "estZillow: " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
    * /
 // if( responseText.indexOf( MARKER_09 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      // responseText = responseText.slice( responseText.indexOf( MARKER_09 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_B ) + MARKER_START_B.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement yields no product.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_B ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_02, WITH ); // substitute string.
      }
      Logger.log( "urlEppraisal: " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
    * /
 // if( responseText.indexOf( MARKER_10 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      // responseText = responseText.slice( responseText.indexOf( MARKER_10 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement yields no product.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_02, WITH ); // substitute string.
      }
      Logger.log( "estEppraisal: " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
    * /
 // if( responseText.indexOf( MARKER_11 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_11 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement yields no product.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_02, WITH ); // substitute string.
      }
      Logger.log( "soldDate: " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
    * /
 // if( responseText.indexOf( MARKER_12 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_12 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement yields no product.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_02, WITH ); // substitute string.
      }
      Logger.log( "soldPrice: " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
    * /
 // if( responseText.indexOf( MARKER_13 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_13 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement yields no product.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_02, WITH ); // substitute string.
      }
      Logger.log( "taxVal: " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }
    }
    col++; // Increments column
    * /
//
}
function fakeName(){
//
// PURPOSE: The purpose of this function is to generate a realistic random identity.
    //
    // 1. Define parameters.
    var ACTION = "http://www.fakenamegenerator.com/";
    var WITH = "";
    var THIS_01 = " ";
    var THIS_02 = "-";
    var THIS_03 = ":";
    var THIS_04 = ".";
    var MARKER_START_A = ">";
    var MARKER_END_A = "<";
    var MARKER_START_B = "\"value\">";
    var MARKER_END_B = "<";
    var MARKER_START_C = "<li>";
    var MARKER_END_C = "<";
    var MARKER_START_D = "href=\"";
    var MARKER_END_D = "\"";
    var MARKER_START_E = "\">";
    var MARKER_END_E = "<";
    var MARKER_01 = "given-name";
    var MARKER_02 = "additional-name";
    var MARKER_03 = "family-name";
    var MARKER_04 = "street-address";
    var MARKER_05 = "locality";
    var MARKER_06 = "region";
    var MARKER_07 = "postal-code";
    var MARKER_08 = "Phone:";
    var MARKER_09 = "Website:";
    var MARKER_10 = "Email Address:";
    var MARKER_11 = "<a ";
    var MARKER_12 = "Password:";
    var MARKER_13 = "Mother's Maiden name:";
    var MARKER_14 = "Birthday:";
    var MARKER_15 = "\""; // Card type. Different because credit card name is in the field name position; but is not a field name. It is a field value.
    var MARKER_16 = "<li"; // Card number.
    var MARKER_17 = "Expires:"; // Skip lable for cc no# due to above circumstance.
    var MARKER_18 = "SSN:";
    var MARKER_19 = "Occupation:";
    var MARKER_20 = "UPS Tracking Number:";
    var MARKER_21 = "Blood type:";
    var MARKER_22 = "Weight:";
    var MARKER_23 = "Height:";
    var KEY_01 = "First";
    var KEY_02 = "Middle";
    var KEY_03 = "Last";
    var KEY_04 = "Street";
    var KEY_05 = "City";
    var KEY_06 = "State";
    var KEY_07 = "Zip";
    var KEY_08 = "Phone";
    var KEY_09 = "Website";
    var KEY_10 = "Email";
    var KEY_11 = "EmailLink";
    var KEY_12 = "Password";
    var KEY_13 = "MotherMaidenName";
    var KEY_14 = "Birthday";
    var KEY_15 = "CardType";
    var KEY_16 = "CardNumber";
    var KEY_17 = "CardExpiry";
    var KEY_18 = "SSN";
    var KEY_19 = "Job";
    var KEY_20 = "TrackingNo";
    var KEY_21 = "BloodType";
    var KEY_22 = "Weight";
    var KEY_23 = "Height";
    var COL_START = 1;
    var col = COL_START;
    //
    // 2. Fetch URL (HTTP GET).
    var response = UrlFetchApp.fetch( ACTION ); // Fetch the URL of the subject. // var responseCode = response.getResponseCode(); // Gets the response code to determine if the given id produces a valid record. // Logger.log( "responseCode: " + responseCode ); // Logs the currently active variable.
    var responseText = response.getContentText(); // Get response text; convert to string variable. // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
    //
    // 3. Scrape.
    if( responseText.indexOf( MARKER_01 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_01 ) ); // Grabs string after the prefix (marker). // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker). // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_04 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_04, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_01 + ": " + token ); // Logs the currently active variable.
      /*
      {
      // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_02 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_02 ) ); // Grabs string after the prefix (marker). // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker). // Logger.log( "responseText: " + responseText ); // Logs the currently active variable.
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_04 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_04, WITH ); // substitute string.
      }/*
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_02 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_03 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_03 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_03 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_04 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_04 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_04 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_05 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_05 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_05 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_06 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_06 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_06 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_07 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_07 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_07 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_08 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_08 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_B ) + MARKER_START_B.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_B ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_02, WITH ); // substitute string.
      }/*
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_08 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_09 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_09 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_09 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_10 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_10 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_B ) + MARKER_START_B.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_B ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_10 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_11 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_11 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_D ) + MARKER_START_D.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_D ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_11 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_12 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_12 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_12 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_13 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_13 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_13 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_14 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_14 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_E ) + MARKER_START_E.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_E ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_B_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_01, WITH_B ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_14 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_15 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_15 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_03 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_03, WITH ); // substitute string.
      }/*
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_15 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_16 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_16 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_A ) + MARKER_START_A.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_A ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }/*
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_16 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_17 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_17 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_17 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_18 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_18 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_02, WITH ); // substitute string.
      }/*
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_18 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_19 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_19 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_E ) + MARKER_START_E.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_E ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_19 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_20 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_20 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
      while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }/*
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_20 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_21 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_21 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_21 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_22 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_22 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_22 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
      //
    if( responseText.indexOf( MARKER_23 ) >=0 ){ // Conditions scrape to execute only upon the existence of the field marker.
      responseText = responseText.slice( responseText.indexOf( MARKER_23 ) ); // Grabs string after the prefix (marker).
      responseText = responseText.slice( ( responseText.indexOf( MARKER_START_C ) + MARKER_START_C.length ) ); // Grabs string after the prefix (marker).
      token = ""; // Resets the token variable. In case scrape in next statement produces no result.
      token = responseText.slice( 0, responseText.indexOf( MARKER_END_C ) ); // Isolates the target string variable.
      /*while( token.indexOf( THIS_01 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_01, WITH ); // substitute string.
      }
      while( token.indexOf( THIS_B_02 ) >= 0 ){ // For every occurence
        token = token.replace( THIS_B_02, WITH_B ); // substitute string.
      }* /
      Logger.log( KEY_23 + ": " + token ); // Logs the currently active variable.
      /*
      { // “Write out” code block.
      out = range.getCell( row, col ); // Update output cell.
      out.setValue( token ); // Write to output cell.
      }* /
    }
    col++; // Increments column
//
}
function acPrep(){/*
  // var p               = new Array(); // Array of value estimates for median statistic.
  // var i               = 0;
  // var j               = 0;
  // var resultNum1      = 0;
  // var resultNum2      = 0;
  // var resultStr1      = "";
  // var resultStr2      = "";
  // var COL_LIEN_POS_AN = 22;
  // var COL_OPEN_BID_AL = 20;
  // var COL_EST_BID_AK  = 19;
  // var COL_TOT_BAL_AB  = 15;
  // var lienPos_AN      = 0;
  // var openBid_AL      = 0;
  // var estBid_AK       = 0;
  // var totBal_AB       = 0;
  // var price           = 0;
  // var autoEstimate    = 0;
  // var firstMargin     = 0;
  // var firstKeyRatio   = 0;
  // var encumbrance     = 0;
  // var WITH            = "";
  // var THIS            = ":";
    // COLHEADER[1] = "Number_and_street";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 3 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[2] = "City";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 4 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[3] = "State";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 5 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[4] = "Zip";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 6 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[5] = "County";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 2 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[6] = "Sale_year";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 16 ).getValue().getFullYear();
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[7] = "Sale_month"; ** SPECIAL FORMULA ** DO NOT COPY for general use **
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables ** SPECIAL FORMULA ** DO NOT COPY for general use **
      resultNum = fromRange.getCell( row, 16 ).getValue().getMonth()+1; // Add “1” (+1) because MONTH values appear to begin at zero?
      toRange.getCell( row, col ).setValue( resultNum ); // ** SPECIAL FORMULA ** DO NOT COPY for general use **
    // COLHEADER[8] = "Sale_day"; ** SPECIAL FORMULA ** DO NOT COPY for general use **
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables ** SPECIAL FORMULA ** DO NOT COPY for general use **
      resultNum = fromRange.getCell( row, 16 ).getValue().getDate()+1; // Add “1” (+1) because DATE values appear to begin at zero?
      toRange.getCell( row, col ).setValue( resultNum );  // ** SPECIAL FORMULA ** DO NOT COPY for general use **
    // COLHEADER[9] = "Sale_hour"; ** SPECIAL FORMULA ** DO NOT COPY for general use **
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables  ** SPECIAL FORMULA ** DO NOT COPY for general use **
      resultNum = 100 * (fromRange.getCell( row, 17 ).getValue().getHours()+1); // Add “1” (+1) because HOUR values appear to begin at zero?
      resultNum = resultNum + fromRange.getCell( row, 17 ).getValue().getMinutes(); //  ** SPECIAL FORMULA ** DO NOT COPY for general use **
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[10] = "Sale_location";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 18 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[11] = "Opening_bid";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 20 ).getValue();
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[12] = "Estimated_opening_bid";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 19 ).getValue();
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[13] = "Estimated_lien_position";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 21 ).getValue();
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[14] = "Estimated_total_encumbrance";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      encumbrance = fromRange.getCell( row, 15 ).getValue(); // Variable must persist to use in later formula. ** SPECIAL FORMULA ** DO NOT COPY for general use **
      resultNum = encumbrance;
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[15] = "Yahoo_link"; **DEPRACATED** Transmission of this field is deprecated. Construct link string in Zoho. Reason: 1. Ampersand causes failure. 
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 25 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[16] = "Zillow_link";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 24 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[17] = "Eppraisal_link"; **DEPRACATED** Transmission of this field is deprecated. Construct link string in Zoho. Reasons: 1. Ampersand causes failure. 2. Url is incorrect.
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 34 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[18] = "Zillow_details_link";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 32 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[19] = "Prop_type";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr1 = fromRange.getCell( row, 26 ).getValue();
      resultStr2 = fromRange.getCell( row, 07 ).getValue();
      if( resultStr1.length > 0 ){ resultStr = resultStr1; } else{ resultStr = resultStr2; } resultStr1 = ""; resultStr2 = "";
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[20] = "Beds";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum1 = fromRange.getCell( row, 27 ).getValue();
      resultNum2 = fromRange.getCell( row, 11 ).getValue();
      if( resultNum1 > 0 ){ resultNum = resultNum1; } else{ resultNum = resultNum2; } resultNum1 = 0; resultNum2 = 0;
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[21] = "Baths";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum1 = fromRange.getCell( row, 28 ).getValue();
      resultNum2 = fromRange.getCell( row, 12 ).getValue();
      if( resultNum1 > 0 ){ resultNum = resultNum1; } else{ resultNum = resultNum2; } resultNum1 = 0; resultNum2 = 0;
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[22] = "Sq_feet";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum1 = fromRange.getCell( row, 29 ).getValue();
      resultNum2 = fromRange.getCell( row, 09 ).getValue();
      if( resultNum1 > 0 ){ resultNum = resultNum1; } else{ resultNum = resultNum2; } resultNum1 = 0; resultNum2 = 0;
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[23] = "Lot_size";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum1 = fromRange.getCell( row, 30 ).getValue();
      resultNum2 = fromRange.getCell( row, 13 ).getValue();
      if( resultNum1 > 0 ){ resultNum = resultNum1; } else{ resultNum = resultNum2; } resultNum1 = 0; resultNum2 = 0;
      toRange.getCell( row, col ).setValue( resultNum );;
    // COLHEADER[24] = "Year_built";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum1 = fromRange.getCell( row, 31 ).getValue();
      resultNum2 = fromRange.getCell( row, 10 ).getValue();
      if( resultNum1 > 0 ){ resultNum = resultNum1; } else{ resultNum = resultNum2; } resultNum1 = 0; resultNum2 = 0;
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[25] = "Last_sold_date";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultStr = fromRange.getCell( row, 36 ).getValue();
      toRange.getCell( row, col ).setValue( resultStr );
    // COLHEADER[26] = "Last_sold_price";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 37 ).getValue();
      toRange.getCell( row, col ).setValue( resultNum );
    //COLHEADER[27] = "Tax_assessed_value";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 38 ).getValue();
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[28] = "Alternate";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 14 ).getValue();
      if( resultNum > 0 ){ p[j]=resultNum;j++; } // Adds to estimate array to calculate median
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[29] = "Zillow";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 33 ).getValue();
      if( resultNum > 0 ){ p[j]=resultNum;j++; } // Adds to estimate array to calculate median
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[30] = "Eppraisal";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = fromRange.getCell( row, 35 ).getValue();
      if( resultNum > 0 ){ p[j]=resultNum;j++; } // Adds to estimate array to calculate median
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[31] = "Auto_estimate";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      autoEstimate = p.median(); // Variable must persist to use in later formula.
      resultNum = autoEstimate;
      toRange.getCell( row, col ).setValue( resultNum );
//
// Calculate variables.
    lienPos_AN = fromRange.getCell( row, COL_LIEN_POS_AN ).getValue();
    openBid_AL = fromRange.getCell( row, COL_OPEN_BID_AL ).getValue();
    estBid_AK = fromRange.getCell( row, COL_EST_BID_AK ).getValue();
    totBal_AB = fromRange.getCell( row, COL_TOT_BAL_AB ).getValue();
    if( lienPos_AN == 1 ){ if( openBid_AL > 0 ){ price = openBid_AL; } else{ price = estBid_AK; } }  // Includes unknown estimated lien positions as well as 2nd & 3rd lien positions. 
    else{ price = totBal_AB; } // This estimate needs refining. Should discriminate between 2nd, 3rd & unknown lien positions. And incorporate estimated bids.
    firstMargin = Math.round( autoEstimate - price );
    firstKeyRatio = Math.round( 100*price/autoEstimate );
//
    //  COLHEADER[32] = "First_margin";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = firstMargin;
      toRange.getCell( row, col ).setValue( resultNum );
    // COLHEADER[33] = "First_key_ratio";
    col++; resultNum = 0; resultStr = ""; // Increments column and resets output variables
      resultNum = firstKeyRatio;
      toRange.getCell( row, col ).setValue( resultNum );
    //
// Reset variables.
    col = START_COL; // Resets column — half carriage return
    resultNum = 0;
    resultStr = "";
    lienPos_AN = 0;
    openBid_AL = 0;
    estBid_AK = 0;
    totBal_AB = 0;
    price = 0;
    autoEstimate = 0;
    firstMargin = 0;
    firstKeyRatio = 0;
    j = 0;
    p.splice( 0, p.length ); // Deletes all the elements of the array — thereby resetting it.
  }
function test2(){
	String.prototype.getAjax = function(){   // Reference: https://developers.google.com/apps-script/class_cache
		var cache    = CacheService.getPublicCache();
		var cached   = cache.get("tempCache");
		if( cached  != null){return cached}
		var contents = UrlFetchApp.fetch(this).getContentText(); // takes 20 seconds to get
		cache.put("tempCache", contents, 1500);                  // cache for 25 minutes
		return contents;}
var ACTION   = "http://www.auction.com/California/Riverside-County/pre-foreclosure-trustee-real-estate-auctions.html";
Logger.log(ACTION.getAjax());
}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="content-type" content="text/html; charset=utf-8"/><title>Pivot Table Reports</title>
    <!-- References: https://developers.google.com/chart/interactive/docs/gallery/controls#dashboardobject , https://developers.google.com/chart/interactive/docs/reference#dataparam -->
	<script type="text/javascript" src="http://www.google.com/jsapi"></script>
    <script type="text/javascript">google.load('visualization','1',{packages:['table']});</script>
    <script type="text/javascript">
		var data,queryInput,isFirstTime=true,options={'showRowNumber':true},query=new google.visualization.Query('http://spreadsheets.google.com/tq?key=rYQm6lTXPH8dHA6XGhJVFsA&pub=1'); // To see the data that this visualization uses, browse to // http://spreadsheets.google.com/pub?key=rYQm6lTXPH8dHA6XGhJVFsA
		function sendAndDraw(){query.send(handleQueryResponse)} // Send query with callback function
		function handleQueryResponse(response){if(response.isError()){alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());return;}
			data=response.getDataTable();var table=new google.visualization.Table(document.getElementById('querytable'));table.draw(data,{'showRowNumber':true});if(isFirstTime){init()}}
		function setQuery(queryString){query.setQuery(queryString);sendAndDraw();queryInput.value=queryString;} // Query language examples configured with UI
		function init(){isFirstTime=false;(new google.visualization.Table(document.getElementById('table'))).draw(data,options);queryInput=document.getElementById('display-query');}
		function setQueryFromUser(){setQuery(queryInput.value)}
		google.setOnLoadCallback(sendAndDraw);
    </script></head>
<body style="font-family:Arial;border:0 none;"><div style="margin-bottom:10px;padding:5px;border:1px solid gray;background-color:buttonface;">
Configure Query<form action=""><table style="font-size:12px;"><tr>
    <td>Select</td>           <td><select onchange='setQuery(this.value)' id='query-1'>
		<option value=''                                 >None</option>
		<option value='select A,B'                       >select A,B</option>
		<option value='select A,B,D'                     >select A,B,D</option>
		<option value='select D,E,A'                     >select D,E,A</option>
		<option value='select E,G,B,C'                   >select E,G,B,C</option>
		<option value='select F,A,B,D'                   >select F,A,B,D</option></select></td>
    <td>Group by:</td>        <td><select onchange='setQuery(this.value)' id='query-2'>
		<option value=''                                 >None</option>
		<option value='select B,sum(F) group by B'       >select B,sum(F) group by B</option>
		<option value='select B,avg(G),sum(E) group by B'>selectB,avg(G),sum(E) group by A</option></select></td>
    <td>Scalar functions:</td><td><select onchange='setQuery(this.value)' id='query-3'>
		<option value=''                                 >None</option>
		<option value='select F-E'                       >select F-E</option>
		<option value='select F*G'                       >select F*G</option>
		<option value='select(F-E)*G'                    >select (F-E)*G</option></select></td>
    <td>Filter:</td>          <td><select onchange='setQuery(this.value)' id='query-3'>
		<option value=''                                 >None</option>
		<option value='where G &lt; 80'                  >where G &lt; 80</option>
		<option value='where G &lt; 90'                  >where G &lt; 90</option>
		<option value="where D &lt;&gt; 'Asia'"          >where D &lt;&gt; 'Asia'</option></select></td></tr><tr>
    <td>Pivot:</td>           <td><select onchange='setQuery(this.value)' id='query-3'>
		<option value=''                                 >None</option>
		<option value='select avg(F) pivot B'            >select avg(F) pivot B</option>
		<option value='select sum(G),max(F) pivot D'     >select sum(G),max(F) pivot D</option></select></td>
    <td>Offset/limit:</td>    <td><select onchange='setQuery(this.value)' id='query-3'>
		<option value=''                                 >None</option>
		<option value='offset 3'                         >offset 3</option>
		<option value='limit 5'                          >limit 5</option>
		<option value='limit 4 offset 2'                 >limit 4 offset 2</option></select></td>
    <td>Label/Format:</td>    <td><select onchange='setQuery(this.value)' id='query-3'>
		<option value=''                                 >None</option>
		<option value="select A label A 'Manager Name'"  >select A label A 'Manager Name'</option>
		<option value="select G format G '00%'"          >select G format G '00%'</option></select></td></tr></table></form></div>
<table style='width:100%;'><tr style='font-size:20px;'><td>Original Table</td><td>Query Table</td></tr><tr>
    <td style="width:50%;padding:10px;vertical-align:top;"><div id="table"></div></td><td style="width:50%;padding:10px;vertical-align:top;">
    <div id="querytable"></div><div style='font-size:15px;font-weight:bold;padding:5px;'><input type="text" style="width:100%" id='display-query'/><br></br>
    <input type="button" value='Submit' onclick="setQueryFromUser()" /></div></td></tr></table></body></html>
/* // https://developers.google.com/apps-script/class_dashboardpanel
    var data = Charts.newDataTable()
      .addColumn(Charts.ColumnType.STRING, "Name")
      .addColumn(Charts.ColumnType.NUMBER, "Age")
      .addRow(["Michael", 18])
      .addRow(["Elisa", 12])
      .addRow(["John", 20])
      .addRow(["Jessica", 25])
      .addRow(["Aaron", 14])
      .addRow(["Margareth", 19])
      .addRow(["Miranda", 22])
      .addRow(["May", 20])
      .build();

    var chart = Charts.newBarChart()
      .setTitle("Ages")
      .build();

    var control = Charts.newStringFilter()
      .setFilterColumnLabel("Name")
      .build();

    var dashboard = Charts.newDashboardPanel()
      .setDataTable(data)
      .bind(control, chart)
      .build();

    var uiApp = UiApp.createApplication().setTitle("My Dashboard");

    var panel = uiApp.createHorizontalPanel()
      .setVerticalAlignment(UiApp.VerticalAlignment.MIDDLE)
      .setSpacing(50);

    panel.add(control)
         .add(chart);
         
    var dataViewDefinition = Charts.newDataViewDefinition()
       .setColumns([0, 5])
       .build();
    
    dashboard.add(panel);
    uiApp.add(dashboard);
    return uiApp;}* /
function realtorScrape(page,state,city){ // Scrape Realtor.com for foreclosure MLS listings // http://www.realtor.com/search/searchresults.aspx?sby=1&pgsz=10&loc=san-diego%2c+ca&pr=false&status=foreclosures&pg=1
    // var act="http://www.realtor.com/search/searchresults.aspx?sby=1&pgsz=10&loc="+city+"%2c+"+state+"&pr=false&status=foreclosures&pg="+page; // var act="http://www.realtor.com/search/searchresults.aspx?sby=1&pgsz=10&loc=phoenix%2c+az&pr=false&status=foreclosures&pg=1";
	// var act="http://ww1.realtor.com/foreclosures/"+city+"_"+state+"/sby-1/pg-"+page+"?pgsz=200"; // http://ww1.realtor.com/foreclosures/San-Diego_CA/sby-1/pg-2?pgsz=200
    var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---1){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    var act="http://www.realtor.com/foreclosures/San-Diego_CA/sby-1?pgsz=200";//Logger.log(UrlFetchApp.fetch(act).getContentText());} //"ww1.realtor.com/foreclosures/San-Diego_CA/sby-1?pgsz=200"
    var r,i,len,db=ScriptDb.getMyDb();data=JSON.parse(UrlFetchApp.fetch(act).getContentText()
    // Revised: // .scrape(".byKey('SRP',"         ,"{list:"          , ",txtlinks:"   )
                   .scrape("\"totalListingCount\":","\"listings\": "  ,"}).extend(new")[1]
    .replaceRealtorDotCom())/*,key=Object.keys(data)* /;
    Logger.log(data.length); // Reference: http://stackoverflow.com/questions/126100/how-to-efficiently-count-the-number-of-keys-properties-of-an-object-in-javascrip
    //len=key.length;i=len;while(i--){r=data[key[i]];r.market={};r.market.state=state;r.market.city=city;r.avm=false;db.save(r);}return len;} // Database operations // Reference: https://developers.google.com/apps-script/scriptdb // Batch save dataset // Logger.log("data["+key[i]+"]: "+JSON.stringify(data[key[i]]));
}
function main_realtor(){/*Scrapes markets() from Realtor.com* /var k,j,i,m=realtorMarkets(),states=Object.keys(m);i=states.length;while(i--){var state=states[i];j=m[state].length;while(j--){var city=m[state][j];realtorScrape(state,city)}}}
===============
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
	<link rel="stylesheet" type="text/css" href="ddimgtooltip.css" /></link>
	<script type="text/javascript">
// @http://www.dynamicdrive.com/dynamicindex4/imagetooltip.htm
// Image w/ description tooltip v2.0
// Created: April 23rd, 2010. This notice must stay intact for usage 
// Author: Dynamic Drive at http://www.dynamicdrive.com/
// Visit http://www.dynamicdrive.com/ for full source code
var ddimgtooltip={
	tiparray:function(){
		var tooltips=[]
		//define each tooltip below: tooltip[inc]=['path_to_image', 'optional desc', optional_CSS_object]
		//For desc parameter, backslash any special characters inside your text such as apotrophes ('). Example: "I\'m the king of the world"
		//For CSS object, follow the syntax: {property1:"cssvalue1", property2:"cssvalue2", etc}
		tooltips.push(["https://lh6.googleusercontent.com/-rIdtXiBwe0U/UJ7JR_SYrNI/AAAAAAAADzk/BNM7XoAFOfw/s400/U.S.%2520Sales%2520Regions.png","U.S. Sales Regions",])
		return tooltips //do not remove/change this line
	}(),
	tooltipoffsets: [20, -30], //additional x and y offset from mouse cursor for tooltips
	//***** NO NEED TO EDIT BEYOND HERE
	tipprefix: 'imgtip', //tooltip ID prefixes
	createtip:function($, tipid, tipinfo){
		if ($('#'+tipid).length==0){ //if this tooltip doesn't exist yet
			return $('<div id="' + tipid + '" class="ddimgtooltip" />').html(
				'<div style="text-align:center"><img src="' + tipinfo[0] + '" /></div>'
				+ ((tipinfo[1])? '<div style="text-align:left; margin-top:5px">'+tipinfo[1]+'</div>' : '')
				)
			.css(tipinfo[2] || {})
			.appendTo(document.body)
		}
		return null
	},
	positiontooltip:function($, $tooltip, e){
		var x=e.pageX+this.tooltipoffsets[0], y=e.pageY+this.tooltipoffsets[1]
		var tipw=$tooltip.outerWidth(), tiph=$tooltip.outerHeight(), 
		x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(ddimgtooltip.tooltipoffsets[0]*2) : x
		y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
		$tooltip.css({left:x, top:y})
	},
	showbox:function($, $tooltip, e){
		$tooltip.show()
		this.positiontooltip($, $tooltip, e)
	},
	hidebox:function($, $tooltip){
		$tooltip.hide()
	},
	init:function(targetselector){
		jQuery(document).ready(function($){
			var tiparray=ddimgtooltip.tiparray
			var $targets=$(targetselector)
			if ($targets.length==0)
				return
			var tipids=[]
			$targets.each(function(){
				var $target=$(this)
				$target.attr('rel').match(/\[(\d+)\]/) //match d of attribute rel="imgtip[d]"
				var tipsuffix=parseInt(RegExp.$1) //get d as integer
				var tipid=this._tipid=ddimgtooltip.tipprefix+tipsuffix //construct this tip's ID value and remember it
				var $tooltip=ddimgtooltip.createtip($, tipid, tiparray[tipsuffix])
				$target.mouseenter(function(e){
					var $tooltip=$("#"+this._tipid)
					ddimgtooltip.showbox($, $tooltip, e)
				})
				$target.mouseleave(function(e){
					var $tooltip=$("#"+this._tipid)
					ddimgtooltip.hidebox($, $tooltip)
				})
				$target.mousemove(function(e){
					var $tooltip=$("#"+this._tipid)
					ddimgtooltip.positiontooltip($, $tooltip, e)
				})
				if ($tooltip){ //add mouseenter to this tooltip (only if event hasn't already been added)
					$tooltip.mouseenter(function(){
						ddimgtooltip.hidebox($, $(this))
					})
				}
			})
		}) //end dom ready
	}
}
ddimgtooltip.init("*[rel^=imgtip]") //ddimgtooltip.init("targetElementSelector")
    </script>
===============
<p><a href="https://lh6.googleusercontent.com/-rIdtXiBwe0U/UJ7JR_SYrNI/AAAAAAAADzk/BNM7XoAFOfw/s1600/U.S.%2520Sales%2520Regions.png" rel="imgtip[0]">Regions</a></p>
      <a target="_blank" href="https://lh6.googleusercontent.com/-rIdtXiBwe0U/UJ7JR_SYrNI/AAAAAAAADzk/BNM7XoAFOfw/s1600/U.S.%2520Sales%2520Regions.png"><img height="15" style="border:none" src="https://lh6.googleusercontent.com/-rIdtXiBwe0U/UJ7JR_SYrNI/AAAAAAAADzk/BNM7XoAFOfw/s400/U.S.%2520Sales%2520Regions.png" onmouseover="this.height='300'" onmouseout="this.height='15'"></a>
===============
/*<!--@ref https://sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jsFiddle.js | http://jsfiddle.net/q47a7/show/ | http://code.google.com/apis/ajax/playground/ | https://developers.google.com/adwords/api/docs/appendix/cities-DMAregions -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>Charts</title>
    <script type="text/javascript" src="http://www.google.com/jsapi"></script>
    <script type="text/javascript">* /
      google.load("visualization","1",{packages:["controls","table","corechart","charteditor","geomap","intensitymap"]}); // "treemap"
      var ACT="https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?k=lkis28ae4vouxe11uxp8&callback=drawVisualization",ctrl=[],chart=[],c,i,script=document.createElement("script");script.src=ACT;script.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(script);
	//var wrapper;function editChart(){var editor=new google.visualization.ChartEditor();google.visualization.events.addListener(editor,"ok",function(){wrapper=editor.getChartWrapper();wrapper.draw(document.getElementById("co"));});editor.openDialog(wrapper);}
	  function drawVisualization(){// Tree Map: var $dar=new google.visualization.data.group(dat,[arguments[0][0].indexOf("City")],[{column:arguments[0][0].indexOf("City"),aggregation:google.visualization.data.count,type:"number"}]);var $tre=new google.visualization.ChartWrapper({chartType:"TreeMap",containerId:"tr",dataTable:$dar,view:{columns:[7,8]},options:{maxDepth:1,minColor:"red",midColor:"#ddd",maxColor:"#0d0",headerHeight:15,fontColor:"black",showScale:true}});$tre.draw(); // IntensityMap: var mapdat2=google.visualization.arrayToDataTable(arguments[0]);var map2=new google.visualization.IntensityMap(document.getElementById("chart6"));map2.draw(mapdat2,null);var tabmap2=new google.visualization.ChartWrapper({"chartType":"Table","containerId":"chart7",dataTable:mapdat2});tabmap2.draw();
        var  dat=new google.visualization.arrayToDataTable(arguments[0]);//([["Name","Gender","Age","Donuts eaten"],["Michael","Male",12,5],["Elisa","Female",20,7],["Robert","Male",7,3],["John","Male",54,2],["Jessica","Female",22,6],["Aaron","Male",3,1],["Margareth","Female",42,8],["Miranda","Female",33,6]]);
	//	var  dav=new google.visualization.DataView(dat),rn=dav.getFilteredRows([{column:arguments[0][0].indexOf("Own"),value:"none"}]);dav.hideRows(rn).hideColumns([arguments[0][0].indexOf("Own")]);
		var $dat=new google.visualization.data.group(dat,[arguments[0][0].indexOf("Own")],[{column:arguments[0][0].indexOf("Own"),aggregation:google.visualization.data.count,type:"number"}]);//(dat,[1],[{column:3,aggregation:google.visualization.data.sum,type:"number"}]);
		var $dam=new google.visualization.data.group(dat,[arguments[0][0].indexOf("Geo")],[{column:arguments[0][0].indexOf("Geo"),aggregation:google.visualization.data.count,type:"number"}]);
		var $dac=new google.visualization.data.group(dat,[arguments[0][0].indexOf("Pre")],[{column:arguments[0][0].indexOf("Pre"),aggregation:google.visualization.data.count,type:"number"}]);
		var   $f=new google.visualization.TableBarFormat({width:120});$f.format($dat,1);
		var    c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c1",options:{filterColumnLabel:"Own"        ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"Owner"      }}});ctrl.push(c);
        var    c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c2",options:{filterColumnLabel:"St"         ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"State"      }}});ctrl.push(c);
		var    c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c3",options:{filterColumnLabel:"City"       ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"City"       }}});ctrl.push(c);
		var    c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c4",options:{filterColumnLabel:"Disposition",ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"Disposition"}}});ctrl.push(c);
		var    c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c5",options:{filterColumnLabel:"Company"    ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"Company"    }}});ctrl.push(c);
		var    c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c6",options:{filterColumnLabel:"Phone"      ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"Phone"      }}});ctrl.push(c);		
		var    c=new google.visualization.ControlWrapper({controlType:"NumberRangeFilter",containerId:"s1",options:{filterColumnLabel:"ID"         ,ui:{labelStacking:"vertical"                                                                   }}});ctrl.push(c);
		var    c=new google.visualization.ControlWrapper({controlType:"NumberRangeFilter",containerId:"s2",options:{filterColumnLabel:"Pre"        ,ui:{labelStacking:"vertical"                                                                   }}});ctrl.push(c);
		var    c=new google.visualization.ControlWrapper({controlType:"NumberRangeFilter",containerId:"s3",options:{filterColumnLabel:"E"          ,ui:{labelStacking:"vertical"                                                                   }}});ctrl.push(c);
		var    c=new google.visualization.ControlWrapper({controlType:"NumberRangeFilter",containerId:"s4",options:{filterColumnLabel:"Nex"        ,ui:{labelStacking:"vertical"                                                                   }}});ctrl.push(c);		
		var	   c=new google.visualization.ControlWrapper({controlType:"ChartRangeFilter" ,containerId:"s5",options:{filterColumnIndex:arguments[0][0].indexOf("Pre"),ui:{chartType:"ScatterChart",chartOptions:{chartArea:{width:"100%",height:20},pointSize:1,hAxis:{viewWindowMode:"maximized",baselineColor:"none"}},chartView:{columns:[arguments[0][0].indexOf("Pre"),arguments[0][0].indexOf("Nex")]}}},state:{range:{start:-1}}});ctrl.push(c);
	//	wrapper =new google.visualization.  ChartWrapper({  chartType:"ColumnChart"      ,containerId:"co",dataTable:$dac,options:{title:"Daily Volume",theme:"maximized",animation:{duration:3000,easing:"inAndOut"}}});wrapper.draw();
		var   sc=new google.visualization.  ChartWrapper({  chartType:"ScatterChart"     ,containerId:"sc",dataTable: dat,view:{columns:[arguments[0][0].indexOf("Pre"),arguments[0][0].indexOf("Nex")]},options:{theme:"maximized",hAxis:{viewWindowMode:"maximized"},animation:{duration:3000,easing:"inAndOut"}}});chart.push(sc);
		var  tab=new google.visualization.  ChartWrapper({  chartType:"Table"            ,containerId:"tu",view:{columns:[0,1,2,3,4,5,6,7,8,9,10,12]/*,rows:[1,5,10,15,25,35]* /},options:{allowHtml:true,page:"enable",pageSize:30,showRowNumber:true}}); .push(tab);//var  tab=new google.visualization.Table(document.getElementById("tu"));tab.draw(dat,{showRowNumber:true,page:"enable",pageSize:20,pagingSymbols:{prev:"<<",next:">>"},pagingButtonsConfiguration:"both"}); // Call, draw and bind manually because chart wrapper does not throw "select" event yet//google.visualization.events.addListener(tab,"select",handleSel);//function handleSel(event){alert("A");alert(JSON.stringify(con.getSelection()));}//handler(){...tab.setDataTable( dat);//tab.draw(dat,{showRowNumber:true,page:"enable",pageSize:20,pagingSymbols:{prev:"<<",next:">>"},pagingButtonsConfiguration:"both"});...}
		var $tab=new google.visualization.  ChartWrapper({  chartType:"Table"            ,containerId:"tg",dataTable:$dat,options:{allowHtml:false,sortColumn:1,sortAscending:false,allowHtml:true,page:"enable",pageSize:10,showRowNumber:false}});$tab.draw();//,pagingSymbols:{prev:"<<",next:">>"},pagingButtonsConfiguration:"both"
        var $pi1=new google.visualization.  ChartWrapper({  chartType:"PieChart"         ,containerId:"pi",dataTable:$dat,options:{title:"Made By",width:300,height:300,legend:"none",pieSliceText:"label"}});$pi1.draw(); //options{...,chartArea:{left:15,top:15,right:0,bottom:0}...},view:{columns:[1,2]}... //var $pi2=new google.visualization.ChartWrapper({chartType:"PieChart",containerId:"chart42",dataTable:$dat ,options:{title:"Next"  ,width:300 ,height:300,legend:"none",chartArea:{left:15,top:15,right:0,bottom:0},pieSliceText:"label"}});$pi2.draw(); //options{...},view:{columns:[1,3]}... // var $pie=new google.visualization.ChartWrapper({chartType:"PieChart",containerId:"chart4" ,dataTable:$dat ,options:{title:"Donuts",width:300 ,height:300,legend:"none",chartArea:{left:15,top:15,right:0,bottom:0},pieSliceText:"label"}});$pie.draw();//var  pie=new google.visualization.ChartWrapper({chartType:"PieChart",containerId:"chart1" ,  options:{width:300,height:300,legend:"none",title:"Donuts eaten per person",chartArea:{left:15,top:15,right:0,bottom:0},pieSliceText:"label"},view:{columns:[0,3]}});//group the data for the pie chart and draw it
		var $geo=new google.visualization.  ChartWrapper({  chartType:"GeoMap"           ,containerId:"ge",dataTable:$dam,options:{title:"Call Locations",region:"US",dataMode:"regions"}});$geo.draw(); //var $dam=new google.visualization.DataView($dat);$dam.setColumns([arguments[0][0].indexOf("Geo"),arguments[0][0].indexOf("<Str name of grouped col in $dat>")]); var $geo=new google.visualization.GeoMap(document.getElementById("chart5"));$geo.draw($dam,{region:"US",dataMode:"regions"}); // GeoMap: var mapdata=google.visualization.arrayToDataTable([["State","Vol"],["US-CA",200],["US-TX",300],["US-FL",400],["US-MA",500],["US-VA",600],["US-WA",700]]);
		var $col=new google.visualization.  ChartWrapper({  chartType:"ColumnChart"      ,containerId:"co",dataTable:$dac,options:{title:"Daily Volume",theme:"maximized",animation:{duration:3000,easing:"inAndOut"}}});$col.draw(); //options{...,height:300,width:600,vAxis:{title:"Volume"},hAxis:{title:"Pre"}}
		var dash=new google.visualization.Dashboard(document.getElementById("dashboard")).bind(ctrl,chart);dash.draw(dat);i=ctrl.length;while(i--){google.visualization.events.addListener(ctrl[i],"statechange",handleCtrl);} // Bind charts, controls and listenters
																																				   google.visualization.events.addListener(dash   ,"ready"      ,handleDash);
        function handleCtrl(){$dat=google.visualization.data.group(tab.getDataTable(),[ 2],[{column: 2,aggregation:google.visualization.data.count,type:"number"}]);$f.format($dat,1);//.sum
							  $dam=google.visualization.data.group(tab.getDataTable(),[11],[{column:11,aggregation:google.visualization.data.count,type:"number"}]);
							  $dac=google.visualization.data.group(tab.getDataTable(),[ 3],[{column: 3,aggregation:google.visualization.data.count,type:"number"}]);
							  $tab.setDataTable($dat);$tab.draw();$pi1.setDataTable($dat);$pi1.draw();$geo.setDataTable($dam);$geo.draw();$col.setDataTable($dac);$col.draw();}
		function handleDash(){document.getElementById("r11").onclick=function(){alert("Pre = working now. Enjoy."              );}
							  document.getElementById("r12").onclick=function(){alert("E = not yet, coming soon. Stay tuned."  );}
							  document.getElementById("r13").onclick=function(){alert("Nex = not yet, coming soon. Stay tuned.");}
							  document.getElementById("r21").onclick=function(){sc.setView({columns:[3,5]});dash.draw(dat)      ;}
							  document.getElementById("r22").onclick=function(){sc.setView({columns:[3,4]});dash.draw(dat)      ;}
							  document.getElementById("r23").onclick=function(){sc.setView({columns:[4,5]});dash.draw(dat)      ;}}
      }//google.setOnLoadCallback(drawVisualization); Eliminate per JSONP callback @http://code.google.com/apis/ajax/playground/#jsonp
  </script><script type="text/javascript">//Keep separate <script> tags. Necessary to make work: query=new google.visualization.Query();// Might be caused by variable name: query. Try substitution, when convenient
	/*	var isFirstTime=true,data,queryInput,//query=new google.visualization.Query("http://spreadsheets.google.com/tq?key=rYQm6lTXPH8dHA6XGhJVFsA&pub=1");
											   query=new google.visualization.Query("https://sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/temp.js"
											 //query=new google.visualization.Query("https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?k=jj860hvegjp1xxy7pvv1");
		alert(JSON.stringify(query));
		function sendAndDraw(){alert("A");query.send(handleQueryResponse);alert("B");}    
		function handleQueryResponse(response){if(response.isError()){alert("C: "+JSON.stringify(response));alert("Query error: "+response.getMessage()+" "+response.getDetailedMessage());alert("D");return;}
		  alert("E");data=response.getDataTable();alert("F");
		  var table=new google.visualization.Table(document.getElementById("querytable"));alert("G1");/*dash.* /table.draw(data,null);alert("G");/*if(isFirstTime){init()}* /}		
		google.setOnLoadCallback(sendAndDraw);
	//	function init(){isFirstTime=false;new google.visualization.Table(document.getElementById("table"))).draw(data,{showRowNumber:true};queryInput=document.getElementById("display-query");}
		function setQueryFromUser(){alert("H");setQuery(queryInput.value);alert("I");}
		function setQuery(queryString){alert("queryString: "+queryString);alert(JSON.stringify(query));query.setQuery(/*queryString* /"where G < 90");alert("1B");sendAndDraw();alert("1C");queryInput.value=queryString;alert("1D");} // Query language examples configured with the UI
/*</script>
  <style type="text/css">var{display:none;}a:hover{color:#666666;background:#FFFFCC;text-decoration:none;}a:hover var{display:block;position:absolute;right:10px;top:50px;border:1px solid #000;text-align:center;z-index:2;}p{position:relative;z-index:1}</style><!--@http://www.sitepoint.com/forums/showthread.php?337478-Rollover-with-popup-how-is-it-done @http://www.pmob.co.uk/temp/disjointedcssrollover3.htm Note: Replaced <span> with <var> to prevent interference-->
  </head>
  <body style="font-family:arial;font-size:small;border:0 none;">
	<div id="dashboard">
	  <table border="1" width="100%" style="text-align:center;vertical-align:middle"><tbody><!--<colgroup><col width="100"><col><col><col></colgroup>-->
		<tr>
		  <td><form>
		    <input type="radio" name="radset1" id="r11" checked> Pre </input>
		    <input type="radio" name="radset1" id="r12"        > E   </input>
			<input type="radio" name="radset1" id="r13"        > Nex </input></form></td>
		  <td rowspan="2"><div id="pi" style="float:left;"></div></td>
		  <td rowspan="2"><div><form><input type="checkbox" id="cb" title="show" value="where Own &lt;&gt; 'none'" onclick="var ic;if(this.checked){ic=''}else{ic=this.value}setQuery(ic);"> none</form></div><br>
		                  <div id="tg" style="float:left;"></div></td>
		  <td rowspan="3" style="vertical-align:top">
			<div id="ge" style="height:250px;"></div>
			<div align="right"><p><a target="_blank" href="https://lh6.googleusercontent.com/-rIdtXiBwe0U/UJ7JR_SYrNI/AAAAAAAADzk/BNM7XoAFOfw/s1600/U.S.%2520Sales%2520Regions.png"><img src="https://lh6.googleusercontent.com/-rIdtXiBwe0U/UJ7JR_SYrNI/AAAAAAAADzk/BNM7XoAFOfw/s144/U.S.%2520Sales%2520Regions.png" height="35"> 
			  <var><img src="https://lh6.googleusercontent.com/-rIdtXiBwe0U/UJ7JR_SYrNI/AAAAAAAADzk/BNM7XoAFOfw/s800/U.S.%2520Sales%2520Regions.png" height="400"></var></a></p></div></td></tr>
		<tr><td><div id="co" style="width:400px;            "></div>
				<div id="s5" style="width:400px;height:20px;"></div></td></tr>
		<tr>
		  <td><form>
		    <input type="radio" name="radset2" id="r21" checked> Pre/Nex </input>
		    <input type="radio" name="radset2" id="r22"        > Pre/E   </input>
			<input type="radio" name="radset2" id="r23"        > E/Nex   </input></form></td>
		  <td rowspan="2"><div id="s1"></div><br><div id="s2"></div><br><div id="s3"></div><br><div id="s4"></div></td>
		  <td rowspan="2"><div id="c1"></div><div id="c2"></div><div id="c3"></div><div id="c4"></div><div id="c5"></div><div id="c6"></div></td></tr>
		<tr><td><div id="sc" style="width:400px;"></div></td></tr>
		<tr><td></td><td><input type="button" onclick="editChart()" value="Edit"></td><td></td><td></td></tr></tbody></table>
	<div style="padding:5px;border:1px solid grey;background-color:buttonface;"><form action="">
	  <table style="padding:5px;margin-top:10px;margin-bottom:10px;margin-left:25px;"><tbody><tr>
	    <td style="text-align:right">     Select (cols)    </td><td><select onchange="setQuery(this.value)">
      	    <option value=""                                 >None                                 </option>
            <option value="select A,B"                       >select A,B                           </option>
   	        <option value="select A,B,D"                     >select A,B,D                         </option>
    	    <option value="select D,E,A"                     >select D,E,A                         </option>
	        <option value="select E,G,B,C"                   >select E,G,B,C                       </option>
      	    <option value="select F,A,B,D"                   >select F,A,B,D                       </option></select></td>
		<td style="text-align:right">     Where (rows)     </td><td><select onchange="setQuery(this.value)">
			<option value=""                                 >None                                 </option>
			<option value="where G &lt; 80"                  >where G &lt; 80                      </option>
			<option value="where G &lt; 90"                  >where G &lt; 90                      </option>
			<option value="where D &lt;&gt; 'Asia'"          >where D &lt;&gt; "Asia"              </option></select></td>
		<td style="text-align:right">   Group by (cols)    </td><td><select onchange="setQuery(this.value)">
			<option value=""                                 >None                                 </option>
			<option value="select B,sum(F) group by B"       >select B,sum(F) group by B           </option>
			<option value="select B,avg(G),sum(E) group by B">select B,avg(G),sum(E) group by A    </option></select></td>
		<td style="text-align:right">        Pivot         </td><td><select onchange="setQuery(this.value)">
			<option value=""                                 >None                                 </option>
			<option value="select avg(F) pivot B"            >select avg(F) pivot B                </option>
			<option value="select sum(G),max(F) pivot D"     >select sum(G),max(F) pivot D         </option></select></td>
		<td style="text-align:right">        Edit          </td><td><input type="text" style="width:100%"></input></td></tr><tr>
		<td style="text-align:right">     Scalar funcs     </td><td><select onchange="setQuery(this.value)">
			<option value=""                                 >None                                 </option>
			<option value="select F-E"                       >select F-E                           </option>
			<option value="select F*G"                       >select F*G                           </option>
			<option value="select (F-E)*G"                   >select (F-E)*G                       </option></select></td>
		<td style="text-align:right">Order (rows) by (cols)</td><td><select onchange="setQuery(this.value)">
			<option value=""                                 >None                                 </option>
			<option value="order by"                         >order by                             </option>
			<option value="order by"                         >order by                             </option></select></td>
		<td style="text-align:right">    Limit/offset      </td><td><select onchange="setQuery(this.value)">
			<option value=""                                 >None                                 </option>
			<option value="offset 3"                         >offset 3                             </option>
			<option value="limit 5"                          >limit 5                              </option>
			<option value="limit 4 offset 2"                 >limit 4 offset 2                     </option></select></td>
		<td style="text-align:right">    Label/format      </td><td><select onchange="setQuery(this.value)">
			<option value=""                                 >None                                 </option>
			<option value="select A label A 'Manager Name'"  >select A label A "Manager Name"      </option>
			<option value="select G format G '00%'"          >select G format G "00%"              </option></select></td>
		<td></td><td><input type="button" value="Submit" onclick="setQueryFromUser()"></input></td></tr></tbody></table></form></div>
	  <table border="0" width="100%" style="vertical-align:top"><tbody><tr><td><div id="tu"></div></td></tr></tbody></table></div>
	  <div id="querytable"></div>
	  </body></html>* /
 // ---------------------------------------------------------------- EXPERIMENTAL ----------------------------------------------------------------
function experimental(){ // Reference // https://code.google.com/apis/ajax/playground/?type=visualization#more_query_options // https://code.google.com/apis/ajax/playground/?type=visualization#group // https://developers.google.com/apps-script/articles/charts_dashboard // https://developers.google.com/chart/interactive/docs/reference#DataView
    var data = Charts.newDataTable()
                     .addColumn(Charts.ColumnType.STRING, "Name"        )
                     .addColumn(Charts.ColumnType.STRING, "Gender"      )
                     .addColumn(Charts.ColumnType.NUMBER, "Age"         )
                     .addColumn(Charts.ColumnType.NUMBER, "Donuts eaten")
                     .addRow   (["Michael"  , "Male"  , 12, 5])
                     .addRow   (["Elisa"    , "Female", 20, 7])
                     .addRow   (["Robert"   , "Male"  ,  7, 3])
                     .addRow   (["John"     , "Male"  , 54, 2])
                     .addRow   (["Jessica"  , "Female", 22, 6])
                     .addRow   (["Aaron"    , "Male"  ,  3, 1])
                     .addRow   (["Margareth", "Female", 42, 8])
                     .addRow   (["Miranda"  , "Female", 33, 6])
                     .build();
    var filterAge    = Charts.newNumberRangeFilter().setFilterColumnLabel ("Age"                                           ).build();
    var filterGender = Charts.newCategoryFilter   ().setFilterColumnLabel ("Gender"                                        ).build();
    var chartPie     = Charts.newPieChart         ().setDataViewDefinition(Charts.newDataViewDefinition().setColumns([0,3])).build();
    var chartBar     = Charts.newBarChart         ().setDataViewDefinition(Charts.newDataViewDefinition().setColumns([0,2])).build();
    var chartTable   = Charts.newTableChart       ()                                                                        .build();
    var dashboard    = Charts.newDashboardPanel   ().setDataTable(data).bind([filterAge,filterGender],[chartPie,chartBar,chartTable]).build();
    var uiApp        = UiApp.createApplication    ();dashboard.add(uiApp.createVerticalPanel().add(uiApp.createHorizontalPanel().add(filterAge).add(filterGender).setSpacing(70)).add(uiApp.createHorizontalPanel().add(chartPie).add(chartBar).add(chartTable).setSpacing(10)));uiApp.add(dashboard);return uiApp;}
<!--Gadget: Hello World-->
<?xml version="1.0" encoding="UTF-8" ?>
<Module>
  <ModulePrefs title="Hello World!" />
  <Content type="html">
    <![CDATA[
      Hello, world!
    ]]>
  </Content>
</Module>
<!--Gadget: Include Iframe-->
<?xml version="1.0" encoding="UTF-8" ?>
<Module>
<ModulePrefs title="Include gadget (iframe)" title_url="http://sites.google.com/" description="Include another web page in your Google Site" thumbnail="http://www.gstatic.com/sites-gadgets/common/images/sites-icon-gadget-thumb.png" screenshot="http://www.gstatic.com/sites-gadgets/common/images/sites-icon-gadget-ss.png" height="800" width="600" author="Google"></ModulePrefs>
<UserPref name="iframeURL" display_name="URL to content" required="true"/>
<UserPref name="scroll" display_name="Display scrollbar" default_value="auto" datatype="enum">
<EnumValue value="auto" display_value="Automatic"/>
<EnumValue value="no" display_value="No"/>
<EnumValue value="yes" display_value="Yes"/>
</UserPref>
<Content type="html" view="default,canvas">
<![CDATA[
<div id='dest' /> <script type="text/javascript"> function doRender(){ // setup variables var prefs = new _IG_Prefs(); var iframeURL = prefs.getString('iframeURL'); var scroll = prefs.getString('scroll'); var height = '100%'; var width = '100%'; if(gadgets.window){ var viewport = gadgets.window.getViewportDimensions(); if(viewport.width){ var width = viewport.width + 'px'; } if(viewport.height){ var height = viewport.height + 'px'; } } var iframe = document.createElement('iframe'); iframe.setAttribute('width', width); iframe.setAttribute('height', height + 'px'); iframe.setAttribute('frameborder','no'); if(scroll){ iframe.setAttribute('scrolling',scroll); } iframe.setAttribute('src', iframeURL); var dest = document.getElementById('dest'); dest.appendChild(iframe); } gadgets.util.registerOnLoadHandler(doRender); </script>
]]>
</Content>
</Module>
// ---------------------------------------------------------------- EXPERIMENTAL ----------------------------------------------------------------
function experimental(){
    var out=HtmlService.createHtmlOutput("Hello World");
        out.append("<br><iframe src='http://alibaba.com'></iframe>"); // iframes apparently not allowed by code sanitizer
        out.append("<br><img src='https://lh6.googleusercontent.com/-3Vdd0gEGVYg/ULXk2lyCUfI/AAAAAAAAER8/PXxxkdz7sT0/business_user.png'>");
        out.append("<br><img src=\"https://www.google.com/chart?chc=sites&amp;cht=d&amp;chdp=sites&amp;chl=%5B%5BGoogle+Gadget'%3D20'f%5Cv'a%5C%3D0'10'%3D499'0'dim'%5Cbox1'b%5CF6F6F6'fC%5CF6F6F6'eC%5C0'sk'%5C%5B%22Include+gadget+(iframe)%22'%5D'a%5CV%5C%3D12'f%5C%5DV%5Cta%5C%3D10'%3D0'%3D500'%3D1497'dim'%5C%3D10'%3D10'%3D500'%3D1497'vdim'%5Cbox1'b%5Cva%5CF6F6F6'fC%5CC8C8C8'eC%5C'a%5C%5Do%5CLauto'f%5C&amp;sig=ZNxJZiW-tYbmOlBd9xox6GQVaBo\" data-igsrc=\"http://31.gmodules.com/ig/ifr?mid=31&amp;synd=trogedit&amp;url=http%3A%2F%2Fwww.gstatic.com%2Fsites-gadgets%2Fiframe%2Fiframe.xml&amp;up_iframeURL=http%3A%2F%2Falibaba.com&amp;up_scroll=auto&amp;h=1500&amp;w=100%25\" data-type=\"ggs-gadget\" data-props=\"align:left;borderTitle:Include gadget (iframe);height:1500;igsrc:http#58//31.gmodules.com/ig/ifr?mid=31&amp;synd=trogedit&amp;url=http%3A%2F%2Fwww.gstatic.com%2Fsites-gadgets%2Fiframe%2Fiframe.xml&amp;up_iframeURL=http%3A%2F%2Falibaba.com&amp;up_scroll=auto&amp;h=1500&amp;w=100%25;mid:31;scrolling:auto;showBorder:false;showBorderTitle:null;spec:http#58//www.gstatic.com/sites-gadgets/iframe/iframe.xml;up_iframeURL:http#58//alibaba.com;up_scroll:auto;view:default;width:100%;\" width=\"500\" height=\"1500\" style=\"display:block;text-align:left;margin-right:auto;\" class=\"igm\">");
    return out;}
// ---------------------------------------------------------------- WHOLESALER ----------------------------------------------------------------
function wholesaler_data(){ // ------------------------------------------------ WHOLESALER ----------------------------------------------------------------
    var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---2){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    var r,db=ScriptDb.getMyDb(),result=db.query({avm:true,table:"situs",tag:{inventory:true}}).sortBy(/*"avm.stat.ratio"* /"price",db.ASCENDING,db.NUMERIC);
    var app      = UiApp.createApplication();
    var form     = app.createFormPanel    ();
    var scr      = app.createScrollPanel  ().setSize("100%","2000");
    var vpan     = app.createVerticalPanel();
    var tab      = app.createFlexTable    ().setBorderWidth(1);vpan.add(tab);scr.add(vpan);form.add(scr);app.add(form);
    var handler  = app.createServerHandler("handleSubmit").addCallbackElement(vpan);
    var k,j,i,x,com,arv,rep,cof,len,handleRadio=[],radioValue=[],button=[],offer1=[],offer2=[],go=[],LINK=[],PROP=[],HEAD=[
                 "Y","Z","D","E","R","S","H",                 // Links
                 "address","b|b|s","tax|sold|in","psf","grm", // Property fields
                 "rent","ia","price","avm","stat","set","%",  // Property fields
                 "no","go","arv","offer","analysis","repair", // Added    fields
                 "offer","counter","contract","assign","send" // Added    fields
                 ];
    var STYLPATT = ["white","white","white","white","#E8E6EB","white","white","white"];var patlen=STYLPATT.length;  // Color pattern // www.w3schools.com/tags/ref_colorpicker.asp // #150035
    function writeHead(row,arr){ii=arr.length;while(ii--){tab.setText          (row,ii,arr[ii]                    ) // Write header row
                                                             .setStyleAttribute(row,ii,"backgroundColor","#150035")
                                                             .setStyleAttribute(row,ii,"color"          ,"white"  )
                                                             .setStyleAttribute(row,ii,"fontWeight"     ,"bold"   );}}
    j=0;while(result.hasNext()){ // Start row counter // Load records
        if(j%patlen==0){writeHead(j,HEAD)} // Write header row if proper spacing
        else{
            var ia,grm,psf,r=result.next(),avmStatSet=[],rent=r.avm.dataset.zillow.rentzestimate;
            if(rent){grm=Math.round(r.price/(12*rent));ia=Math.round(r.offer.beforeRepairs.auto/100)/10;}else{grm="—";ia="—";} // Compute gross rent margin “grm” // Compute price per income approach “ia”
            if(r.avm.stat.autoEst&&r.avm.combo.sqft){psf=Math.round(r.avm.stat.autoEst/r.avm.combo.sqft)}else{psf="—";} // Compute price per square foot “psf”
            i=r.avm.stat.set.length;while(i--){if(isNumber(r.avm.stat.set[i])){avmStatSet[i]=Math.round(r.avm.stat.set[i]/1000)}}
            try{arv=r.arv                         .value}catch(e){};if(arv==null){arv="—"}; // Strict input // ARV
            try{rep=r.repairs                     .value}catch(e){};if(rep==null){rep="—"}; // Strict input // Repairs
            try{cof=r.counter                     .value}catch(e){};if(cof==null){cof="—"}; // Strict input // Counter
            try{com=r.LST_Attributes[21].attribute_value}catch(e){};if(com==null){com="—"}; // Strict input // Comments
            LINK=[r.ylink,r.avm.dataset.zillow.link,r.avm.dataset.zillow.homedetails,r.avm.dataset.eppraisal.link,r.source.detailpageURL/*r.avm.dataset.realtor.link* /,
                  r.avm.dataset.realEstate.link,r.avm.dataset.homeGain.link,r.maplink];len=LINK.length;
            PROP=[ 
                   "Y","Z","D","E","R","S","H",r.address.full,(r.avm.combo.beds+"|"+r.avm.combo.baths+"|"+Math.round(r.avm.combo.sqft/100)),
                  (Math.round(r.avm.combo.taxVal/1000)+"|"+Math.round(r.avm.combo.lastSoldPrice/1000)+"|"+r.avm.combo.lastSoldYear),psf,grm,r.avm.dataset.zillow.rentzestimate,ia,
                  ((Math.round(r.price/100))/10),Math.round(r.avm.stat.autoEst/1000),(r.avm.stat.sdPct+"|"+r.avm.stat.popCount),avmStatSet,r.avm.stat.ratio
                 ];k=PROP.length;i=k;while(i--){x=PROP[i];if(i<len){ // Reset column counter // Loop to fetch saved data
                tab.setWidget        (j,i  ,app.createAnchor(x,LINK[i]).setTitle("row "+j+" "+com))  // Insert anchor/s for first field
                   .setStyleAttribute(j,i,  "backgroundColor",STYLPATT[j%patlen]);}else{
                tab.setWidget        (j,i  ,app.createLabel(x) .setTitle("row "+j))  // Insert labels for other fields
                   .setStyleAttribute(j,i,  "backgroundColor",STYLPATT[j%patlen]);}} // Set background color // End loop
                // ----------------- Radio buttons -----------------               
                radioValue[j] =             app.createTextBox().setId("radioValue"+j).setName("radioValue"+j).setVisible(false);vpan.add(radioValue[j]); // Reference: http://stackoverflow.com/questions/10903963/strange-behaviour-when-using-radiobutton
                                            handleRadio[j] = app.createClientHandler().forTargets(radioValue[j]).setText/*.setValue==error* /("no"+j);  // No
                tab.setWidget        (j,k  ,app.createRadioButton(("grp"+j),"").addValueChangeHandler(handleRadio[j])) // No
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // No
                   try{                                                              // Show value, if any
                            if(r.go       ){tab.setWidget(j,k-1,app.createLabel("?").setTitle("row "+j)/*.setStyleAttribute("color","green")* /)} // No
                       else if(r.go==false){tab.setWidget(j,k-1,app.createLabel("?").setTitle("row "+j)/*.setStyleAttribute("color","red"  )* /)} // No
                   }catch(err){Logger.log(err.message)}
                                            handleRadio[j] = app.createClientHandler().forTargets(radioValue[j]).setText("go"+j);  // Go
                tab.setWidget        (j,k  ,app.createRadioButton(("grp"+j),"").addValueChangeHandler(handleRadio[j])) // Go
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Go
                   try{                                                              // Show value, if any
                            if(r.go       ){tab.setWidget(j,k-1,app.createLabel("?").setTitle("row "+j)/*.setStyleAttribute("color","green")* /)} // Go
                       else if(r.go==false){tab.setWidget(j,k-1,app.createLabel("?").setTitle("row "+j)/*.setStyleAttribute("color","red"  )* /)} // Go
                   }catch(err){Logger.log(err.message)}
                // ----------------- Labels & boxes -----------------
                tab.setWidget        (j,k  ,app.createLabel(arv)      .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // ARV
                offer1[j] =                 app.createTextBox()       .setWidth("60px").setId(r.getId()+","+j+",off1").setName(r.getId()+","+j+",off1").setTitle("Enter your offer")
                tab.setWidget        (j,k  ,offer1[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Offer1 — before repairs
                   try{if(r.offer.beforeRepairs.manual.value){                       // Show value, if any
                       tab.setWidget (j,k-1,app.createLabel(r.offer.beforeRepairs.manual.value).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                tab.setWidget        (j,k  ,app.createLabel("—")      .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Analysis
                   try{if(r.analysis.value){                                         // Show link, if any
                       tab.setWidget (j,k-1,app.createAnchor("Click",r.analysis.link).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                tab.setWidget        (j,k  ,app.createLabel(rep)      .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Repairs
                offer2[j] =                 app.createTextBox()       .setWidth("60px").setId(r.getId()+","+j+",off2").setName(r.getId()+","+j+",off2").setTitle("Enter your offer")
                tab.setWidget        (j,k  ,offer2[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Offer2 —  after repairs
                   try{if(r.offer. afterRepairs.manual.value){                       // Show value, if any
                       tab.setWidget (j,k-1,app.createLabel(r.offer. afterRepairs.manual.value).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                tab.setWidget        (j,k  ,app.createLabel(cof)      .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Counter
                   try{if(r.counter.value){                                          // Show value, if any
                       tab.setWidget (j,k-1,app.createLabel(r.counter                   .value).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                tab.setWidget        (j,k  ,app.createLabel("—")      .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Contract
                   try{if(r.contract.value){                                         // Show link, if any
                       tab.setWidget (j,k-1,app.createAnchor("Click",r.contract.link).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                tab.setWidget        (j,k  ,app.createLabel("—")      .setTitle("row "+j))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Assignment
                   try{if(r.assignment.value){                                       // Show link, if any
                       tab.setWidget (j,k-1,app.createAnchor("Click",r.assignment.link).setTitle("row "+j))}}catch(err){Logger.log(err.message)}
                button[j] =                 app.createButton("Submit",app.createClientHandler().forEventSource().setText("Wait..."))
                                               .setId(r.getId()+","+j+",sub").addClickHandler(handler);
                tab.setWidget        (j,k  ,button[j])
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]);   // Submit button
        }j++;}return app;}
// ---------------------------------------------------------------- ******* ----------------------------------------------------------------
// ---------------------------------------------------------------- HANDLER ----------------------------------------------------------------
// ---------------------------------------------------------------- ******* ----------------------------------------------------------------
function sendAlert(){} // Sends email and/or SMS text message to notify agent of incoming “hot” prospect
function handleSubmit(e){ // e is event information // We will extract .parameter properties from e // Reference: https://developers.google.com/apps-script/class_serverhandler#addCallbackElement // Reference: https://sites.google.com/site/appsscripttutorial/miscellaneous/creating-form-elements-dynamically-using-google-apps-script-gas
    var app=UiApp.getActiveApplication(),user=Session.getUser().getEmail(),d=new Date().getTime(),p=e.parameter,tag=p.source.split(","),db=ScriptDb.getMyDb(),r=db.load(tag[0]); // .setId(r.getId()+","+j+",sub") // tag[0] db record ID (e.g., "S20431525059"); tag[1] row (e.g., 7); tag[2] field type (e.g., "offer", "repair");
    var DOCLIST = ["atlaslive@gmail.com","vicmorrison@msn.com","myhom@lemtg.com","keg1@lemtg.com","biz@lemtg.com"],
        ALERT   = "atlaslive@gmail.com,8049145977@pcs.ntelos.com,vicmorrison@msn.com,6192533000@mms.att.net,myhom@lemtg.com,keg1@lemtg.com,biz@lemtg.com";
    // ------------- Operator --------------
    if(e.parameter[("radioValue"+tag[1])]==("no"+tag[1])){r.go=false}else{if(e.parameter[("radioValue"+tag[1])]==("go"+tag[1])){r.go=true;GmailApp.sendEmail(ALERT,"Incoming *Test Only*",r.address.full);}} // Go (boolean) // Reference: http://stackoverflow.com/questions/10903963/strange-behaviour-when-using-radiobutton // Reference: https://developers.google.com/apps-script/class_gmailapp#sendEmail
    try{if(p[(tag[0]+","+tag[1]+",off")]){     // Offer
        r.offer.beforeRepairs.manual.value     = p[(tag[0]+","+tag[1]+",off")];
        r.offer.beforeRepairs.manual.source    = user;
        r.offer.beforeRepairs.manual.timestamp = d;
        }}catch(err){Logger.log(err.message)}
    try{if(p[(tag[0]+","+tag[1]+",off1")]){    // Offer 1 — Before repairs
        r.offer.beforeRepairs.manual.value     = p[(tag[0]+","+tag[1]+",off1")];
        r.offer.beforeRepairs.manual.source    = user;
        r.offer.beforeRepairs.manual.timestamp = d;GmailApp.sendEmail(ALERT,"*Test Only*, Offer1"         ,r.address.full);
        }}catch(err){Logger.log(err.message)}
    try{if(p[(tag[0]+","+tag[1]+",off2")]){    // Offer 2 — After  repairs
        r.offer. afterRepairs.manual.value     = p[(tag[0]+","+tag[1]+",off2")];
        r.offer. afterRepairs.manual.source    = user;
        r.offer. afterRepairs.manual.timestamp = d;GmailApp.sendEmail(ALERT,"*Test Only*, Offer2"         ,r.address.full);
        }}catch(err){Logger.log(err.message)}
    // --------------- Agent ---------------
    try{if(p[(tag[0]+","+tag[1]+",arv")]){     // ARV
        //app.getElementById(tag[0]+","+tag[1]+",sub").setText(p[(tag[0]+","+tag[1]+",arv")])
        r.arv.value                            = p[(tag[0]+","+tag[1]+",arv")];
        //app.getElementById(tag[0]+","+tag[1]+",sub").setText(1+r.arv.value);
        r.arv.source                           = user;
        r.arv.timestamp                        = d;GmailApp.sendEmail(ALERT,"*Test Only*, ARV"            ,r.address.full);
        }}catch(err){Logger.log(err.message)}
    try{if(p[(tag[0]+","+tag[1]+",rep")]){     // Repairs
        r.repairs.value                        = p[(tag[0]+","+tag[1]+",rep")];
        r.repairs.source                       = user;
        r.repairs.timestamp                    = d;GmailApp.sendEmail(ALERT,"*Test Only*, Repairs"        ,r.address.full);
        }}catch(err){Logger.log(err.message)}
    try{if(p[(tag[0]+","+tag[1]+",cof")]){     // Counter
        r.counter.value                        = p[(tag[0]+","+tag[1]+",cof")];
        r.counter.source                       = user;
        r.counter.timestamp                    = d;GmailApp.sendEmail(ALERT,"*Test Only*, Counter offer"  ,r.address.full);
        }}catch(err){Logger.log(err.message)}
    try{if(p[(tag[0]+","+tag[1]+",anl")]){     // Analysis
        r.analysis.link                        = DocsList.createFile(p[(tag[0]+","+tag[1]+",anl")]).addViewers(DOCLIST).getUrl();
        r.analysis.source                      = user;
        r.analysis.timestamp                   = d;GmailApp.sendEmail(ALERT,"*Test Only*, Analysis"       ,r.address.full);
        }}catch(err){Logger.log(err.message)}
    try{if(p[(tag[0]+","+tag[1]+",con")]){     // Contract/Buy
        r.contract.link                        = DocsList.createFile(p[(tag[0]+","+tag[1]+",con")]).addViewers(DOCLIST).getUrl();
        r.contract.source                      = user;
        r.contract.timestamp                   = d;GmailApp.sendEmail(ALERT,"*Test Only*, Contract/Buy"   ,r.address.full);
        }}catch(err){Logger.log(err.message)}
    try{if(p[(tag[0]+","+tag[1]+",asg")]){     // Assignment/Sell
        r.assignment.link                      = DocsList.createFile(p[(tag[0]+","+tag[1]+",asg")]).addViewers(DOCLIST).getUrl();
        r.assignment.source                    = user;
        r.assignment.timestamp                 = d;GmailApp.sendEmail(ALERT,"*Test Only*, Assignment/Sell",r.address.full);
        }}catch(err){Logger.log(err.message)}
    // -------------------------------------
    db.save(r);app.close();return app;}
// BELOW IS DEALDIGGER
// --------------------------------------------------------------- DEMO ---------------------------------------------------------------
function demo(){ // ---------------------------------------------- DEMO ---------------------------------------------------------------
    getFiles("gasDealDigger");//Deprecate: var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---2){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    var r,db=ScriptDb.getMyDb(),result=db.query({avm:true,tag:{demo:true}}).sortBy("avm.stat.ratio",db.ASCENDING,db.NUMERIC);
    var REP      = 8;
    var app      = UiApp.createApplication();
    var scr      = app.createScrollPanel().setSize("100%","2000");
    var vpan     = app.createVerticalPanel();
    var tab      = app.createFlexTable().setBorderWidth(1);vpan.add(tab);scr.add(vpan);app.add(scr);
    var k,j,i,x,PROP=[],HEAD=["","My offer","%","GRM","ARV?","Rent?","Price","Tax | Sold for | in","Address","B|Ba","SF | Lot | Built"];
    var STYLPATT = ["white","white","white","white","#E8E6EB","white","white","white"];var patlen=STYLPATT.length;  // Color pattern // www.w3schools.com/tags/ref_colorpicker.asp // #150035
    function writeHead(row,arr){ii=arr.length;while(ii--){tab.setText          (row,ii,arr[ii]                    ) // Write header row
                                                             .setStyleAttribute(row,ii,"backgroundColor","#150035")
                                                             .setStyleAttribute(row,ii,"color"          ,"white"  )
                                                             .setStyleAttribute(row,ii,"fontWeight"     ,"bold"   );}}
    j=0;while(result.hasNext()){ // Start row counter // Load records
        r=result.next();
        if(j%REP==0){writeHead(j,HEAD)} // Write header row if proper spacing
        else{k=0; // Reset column counter
                tab.setWidget        (j,k,app.createButton("Submit").setTag(r.getId().toString())
                                             .setId("sub"+j).setTitle("Submit your offer").addClickHandler(app.createServerHandler("_handleSubmit")))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]); // Submit button
                tab.setWidget        (j,k,app.createTextBox().setWidth("60px").setId("bid"+j).setName("bid"+j).setTag(r.getId()).setTitle("Enter your offer"))
                   .setStyleAttribute(j,k++,"backgroundColor",STYLPATT[j%patlen]); // Offer/bid
            PROP=["","",r.avm.stat.ratio,Math.round(r.price/(12*r.avm.dataset.zillow.rentzestimate)),r.avm.stat.autoEst,
                     r.avm.dataset.zillow.rentzestimate,r.price,(r.avm.combo.taxVal+" | "+r.avm.combo.lastSoldPrice+" | "+r.avm.combo.lastSoldYear),
                     r.address.part,(r.avm.combo.beds+" | "+r.avm.combo.baths),(r.avm.combo.sqft+" | "+r.avm.combo.lot+" | "+r.avm.combo.yrBuilt)];
            i=PROP.length;while((i--)-k){ // Loop to fetch saved data
                if(isNumber(PROP[i])){x=Math.round(PROP[i])}else{x=PROP[i]}       // Round numbers only
                tab.setWidget        (j,i,app.createLabel(x).setTitle("row "+j))  // Insert individual row numbers via widget label
                   .setStyleAttribute(j,i,"backgroundColor",STYLPATT[j%patlen]);} // Set background color
        }j++;}
    return app;}
// -------------------------------------------------------------------- INVENTORY ---------------------------------------------------------------
function inventory(){ // ---------------------------------------------- INVENTORY ---------------------------------------------------------------
    getFiles("gasDealDigger");//Deprecate: var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---2){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    var r,db=ScriptDb.getMyDb(),result=db.query({}).sortBy("PropertyPrice",db.ASCENDING,db.NUMERIC);
    var REP      = 8;
    var app      = UiApp.createApplication();
    var scr      = app.createScrollPanel().setSize("100%","2000");
    var vpan     = app.createVerticalPanel();
    var tab      = app.createFlexTable().setBorderWidth(1);vpan.add(tab);scr.add(vpan);app.add(scr);
    var i,x,HEAD = ["Price"        ,"Address","City","St"   ,"BR" ,"Ba"  ,"Sqft"       ,"Lot"    ,"Built"    ];
    var k,j,PROP = ["PropertyPrice","address","City","State","bed","bath","ListingSqft","LotSqft","YearBuilt"];
    var STYLPATT = ["white","white","white","white","#E8E6EB","white","white","white"];var patlen=STYLPATT.length;  // Color pattern // www.w3schools.com/tags/ref_colorpicker.asp // #150035
    function writeHead(row,arr){ii=arr.length;while(ii--){tab.setText          (row,ii,arr[ii]                    ) // Write header row
                                                             .setStyleAttribute(row,ii,"backgroundColor","#150035")
                                                             .setStyleAttribute(row,ii,"color"          ,"white"  )
                                                             .setStyleAttribute(row,ii,"fontWeight"     ,"bold"   );}}
    j=0;while(result.hasNext()){ // Start row counter // Load records
        if(j%REP==0){writeHead(j,HEAD)} // Write header row if proper spacing
        else{r=result.next();i=PROP.length;while(i--){  // Loop to fetch saved data
                if(isNumber(r[PROP[i]])){x=Math.round(r[PROP[i]])}else{x=r[PROP[i]]} // Round numbers only
                tab.setWidget        (j,i,app.createLabel(x).setTitle("row "+j))     // Insert individual row numbers via widget label
                   .setStyleAttribute(j,i,"backgroundColor",STYLPATT[j%patlen]);}    // Set background color
        }j++;}
    return app;}
function emailFromAuction(){var threads=GmailApp.search("from:'Chuck Willman'"),latest=threads[0].getMessages()[0],a=latest.getAttachments();var out=LibraryjsUtil.base64Encode(a[0]);Logger.log(out);/*SpreadsheetApp.open(uploadXls(a[0]));* /} // Logger.log(a[0].getSize());Logger.log(latest.getId());Logger.log(a[0].isGoogleType());Logger.log(a[0].getName());Logger.log(a.length);Logger.log(a[0].getContentType());return a[0].copyBlob();
function uploadXls(file){ // References: https://gist.github.com/juanpabloaj/4666836 // Follows forks from... https://gist.github.com/rcknr/4414152 // https://gist.github.com/4414152 // This is a sample code to upload a PDF file to Google Drive with OCR in Apps Script. uploadPdfOcr function returns a File object. To run the code provide a developer key for an API Console project with Drive API service enabled  authorize();
  var key = ScriptProperties.getProperty("APIkey"); // <-- developer key
  var metadata = { title: file.getName() }
  var params = {method:"post",
                oAuthServiceName: "drive",
                oAuthUseToken: "always",
                contentType: "application/vnd.ms-excel", // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                contentLength: file.getBytes().length,
                payload: file.getBytes()
               };
  var uploadRequest = DriveApp.createFile(file/*.getAs("application/vnd.google-apps.spreadsheet")* /);//UrlFetchApp.fetch("https://www.googleapis.com/upload/drive/v2/files/?uploadType=media&convert=true&key="+key, params); // convert=true convert xls to google spreadsheet
  var uploadResponse = Utilities.jsonParse(uploadRequest.getContentText());
  var params = {method:"put",
                oAuthServiceName: "drive",
                oAuthUseToken: "always",
                contentType: "application/json",
                payload: Utilities.jsonStringify(metadata)
               };
  var metaRequest = UrlFetchApp.fetch("https://www.googleapis.com/drive/v2/files/"+uploadResponse.id+"?key="+key, params)
  return DocsList.getFileById(uploadResponse.id);
}
function authorize(){
  var oauthConfig = UrlFetchApp.addOAuthService("drive");
  var scope = "https://www.googleapis.com/auth/drive";
  oauthConfig.setConsumerKey("anonymous");
  oauthConfig.setConsumerSecret("anonymous");
  oauthConfig.setRequestTokenUrl("https://www.google.com/accounts/OAuthGetRequestToken?scope="+scope);
  oauthConfig.setAuthorizationUrl("https://accounts.google.com/OAuthAuthorizeToken");    
  oauthConfig.setAccessTokenUrl("https://www.google.com/accounts/OAuthGetAccessToken");  
}
/*function processInbox() {
  // get all threads in inbox
  var threads = GmailApp.getInboxThreads();
  for (var i = 0; i < threads.length; i++) {
    // get all messages in a given thread
    var messages = threads[i].getMessages();
    // iterate over each message
    for (var j = 0; j < messages.length; j++) {
      // log message subject
      var subject = messages[j].getSubject()
      //Logger.log(subject);
      if ( subject == "with xls attach" ){
        Logger.log(messages[j].getSubject());
        var attach = messages[j].getAttachments()[0];
        var name = attach.getName();
        var type = attach.getContentType();
        //var data = attach.getDataAsString();
        Logger.log( name + " " + type + " " );
        var file = uploadXls(attach);
        SpreadsheetApp.open(file);}}}}* /
/* Deprecated 6/8/2013 from jsAvm.js — Array .prototype.avmDataPrep    = function(labels,type,ct){ // array this=dataRecord; array labels; array type; int ct field count // Number: delete columns; String: delete if key characters are present; Delete: unused fields
	/* Archive — one-dimensional only
Array.prototype.avmDataPrep   = function(labels,type,ct){ // array this=dataRecord; array labels; array type; int ct field count // Number: delete columns; String: delete if key characters are present; Delete: unused fields
	var i,temp=this.flattenN5();labels=labels.flattenN5();if(ct){temp=temp.slice(0,ct);labels=labels.slice(0,ct);}i=labels.length;while(i--){ // Trim fields; loop over all array elements
		if((type[i]>0 && temp[i]) && !((labels[i]=="undefined") || ((/[<=>&;#!\"\n\f\r\t\v]/).test(temp[i].toString())) || (temp[i].toString()=="false") || (temp[i].toString()=="undefined"))){
			switch(type[i]){
						case 0  :  	                                                   // Delete — intentionally delete field in this case; but this case is already handled by the boolean conditional ">0" requirement that initiates this code block
				break;	case 1  :                                                      // Number
							if(LibraryjsUtil.isNumber(temp[i].toString().replaceAll(",",""))){        // If it’s a number (with or without a comma)...
													  temp[i] = temp[i].toString().replaceAll(",","") // ...then make it a number (without a comma)...
							}else{temp.splice(i,1);labels.splice(i,1);}                // ...or else delete it
				break;	case 2  : // if(/[<=>&;#!\/\"\n\f\r\t\v]/.test(temp[i].toString())){temp[i]=""} //NOTE: Hazard — RegExp contains "/" present in URLs // String  — delete if HTML detected (Use RegExp; Reference: http://www.w3schools.com/jsref/jsref_obj_regexp.asp); But this case is also handled in the boolean conditional that initiates this code block... used there for the purpose of also catching intended numerics that erroneously contain HTML segments due to failed scraping calls
				break;	case 9  :                                                      // Neutral — no action
				break;	default : Logger.log("Error: avmDataScrub: i: "+i)}            // Throw error
		}else{temp.splice(i,1);labels.splice(i,1);}}  	                               // Delete
	return [labels, temp]}
	* /
//	var labFlat = labels.flattenN4();
//	var labLen  = labFlat.length;
	var recLen  = this.length;
	var lab     = new Array();
	var temp    = new Array();
	var labLen,j,i=recLen;while(i--){                                                            // Loop over records
		lab[i]  = labels.flattenN4();
		labLen  = lab[i].length;
		temp[i] = this[i].flattenN4();
			if(ct){temp[i]=temp[i].slice(0,ct);lab[i]=lab[i].slice(0,ct);}
			j=labLen;while(j--){                                                                 // Loop over fields (all array elements) then trim fields;
				if((type[j]>0 && temp[i][j]) && !((lab[i][j]=="undefined") || ((/[<=>&;#!\"\n\f\r\t\v]/).test(temp[i][j].toString())) || (temp[i][j].toString()=="false") || (temp[i][j].toString()=="undefined") || (temp[i][j]=="Not Available"))){
					switch(type[j]){
								case 0  :  	                                                     // Delete — intentionally delete field in this case; but this case is already handled by the boolean conditional ">0" requirement that initiates this code block
						break;	case 1  :                                                        // Number
									if(LibraryjsUtil.isNumber(     temp[i][j].toString().replaceAll(",",""))){ // If it’s a number (with or without a comma)...
										temp[i][j] = temp[i][j].toString().replaceAll(",","")    // ...then make it a number (without a comma)...
									}else{temp[i].splice(j,1);lab[i].splice(j,1);}               // ...or else delete it
						break;	case 2  : // if(/[<=>&;#!\/\"\n\f\r\t\v]/.test(temp[i].toString())){temp[i]=""} //NOTE: Hazard — RegExp contains "/" present in URLs // String  — delete if HTML detected (Use RegExp; Reference: http://www.w3schools.com/jsref/jsref_obj_regexp.asp); But this case is also handled in the boolean conditional that initiates this code block... used there for the purpose of also catching intended numerics that erroneously contain HTML segments due to failed scraping calls
						break;	case 9  :                                                        // Neutral — no action
						break;	default : Logger.log("Error: avmDataScrub: i:"+i+", j:"+j)}      // Throw error
				}else{temp[i].splice(j,1);lab[i].splice(j,1);}}}                                 // Delete
	return [lab, temp]}
* /
function avmPrepOut     (addy          ){ // Convert JSON address object to structured/ordered array used to call AVM methods // object, this: JSON address
    /* @return {array} — Output: address array:
		var sa    = this[0]; // "sa" .............. Example: 32445 Stonewood Way (f/k/a "Number_and_street")
		var csz   = this[1]; // "csz" ............. Example: LAKE ELSINORE CA 92530
		var num   = this[2]; // "Number" .......... Example: 32445
		var state = this[3]; // "State" ........... Example: CA
		var zip   = this[4]; // "Zip" ............. Example: 92530
		var full  = this[5]; // "Full_address" .... Example: 32445 Stonewood Way, LAKE ELSINORE CA 92530
		var part  = this[6]; // "Partial_address" . Example: Stonewood Way, LAKE ELSINORE CA 92530 * /
    /* @param {object} — Input: JSON address object: // Derived from output of avmPrepIn()
        {
          "street"    : "4615 S San Pedro St"
        , "city"      : "Los Angeles"
        , "state"     : "CA"
        , "zip"       : ""
        , "unparsed"  : ""
        , "csz"       : ""
        , "number"    : ""
        , "full"      : ""
        , "part"      : ""
        , "county"    : ""
        } * /
    var arr=["street","csz","number","state","zip","full","part","county"],out=[];i=arr.length;while(i--){out.unshift(addy[arr[i]]);}return out;}
function xaucDat2ob(url){var arr=getAuctionData2(url),out=[],r=[],j,i=arr.length;while(i---1){r[i]={};j=arr[0].length;while(j--){r[i][arr[0][j]]=arr[i][j]; // @param {string} ss url; @return {array of objects} — obj properties = key array // Convert 2D array to array of objects — using first array (arr[0]) as array of objects' keys
    r[i].obav=Math.round(100*(r[i].OpenBid+r[i].TaxOwed)/r[i].Zestimate);} // Recalculate OB/AV because some OB have been revised and to include delinquent taxes
    if(r[i].Date||(r[i].obav>100&&(r[i].OpenBid+r[i].TaxOwed)>r[i].HiTaxComp)){continue}else{r[i].raw=true;r[i].source="ChuckWillman";r[i].sourcedata=r[i];out.push(r[i])}}Logger.log(out.length);Logger.log(out);return out}
http://jsfiddle.net/m3nnE/3/show/ — RVP Page


	
<!DOCTYPE html>
<html>
	<head>
		<style>img{ height: 100px; float: left; }</style>
		<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	</head>
	<body>
		<div id="images"></div>
		<script>
(function() { // Reference: http://api.jquery.com/jQuery.getJSON/
  var googleAPI = "https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?jsoncallback=?",
      googleOb = {k: "g8h2j7kdhkztj0awyeii"};
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
    flickerOb = {
    tags: "mount rainier",
    tagmode: "any",
    format: "json"
  };
    //$.getJSON( flickerAPI, flickerOb )
	$.getJSON( googleAPI , googleOb  )
    .done(function( data ) {
    //$('#images').html("<b>Hello</b> World");
	//$('#images').html(JSON.stringify(data));
	  $('#images').html(data.result);
    /*
    $.each( data.items, function( i, item ) {
    $( "<img/>" ).attr( "src", item.media.m ).appendTo( "#images" );
    });
    * /
	//$( "<img/>" ).attr( "src", data.items[0].item.media.m ).appendTo( "#images" );
  });
})();
		</script>
	</body>
</html>

{
   "title":"Uploadsfromeveryone",
   "link":"http://www.flickr.com/photos/",
   "description":"",
   "modified":"2013-07-01T22:52:27Z",
   "generator":"http://www.flickr.com/",
   "items":[
      {
         "title":"2011-06-0600-24-13",
         "link":"http://www.flickr.com/photos/nghioca/9185912247/",
         "media":{
            "m":"http://farm4.staticflickr.com/3821/9185912247_d0e11f6b72_m.jpg"
         },
         "date_taken":"2011-06-06T00:24:13-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/nghioca/\">nicolae.ghioca<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/nghioca/9185912247/\"title=\"2011-06-0600-24-13\"><imgsrc=\"http://farm4.staticflickr.com/3821/9185912247_d0e11f6b72_m.jpg\"width=\"240\"height=\"159\"alt=\"2011-06-0600-24-13\"/><\/a><\/p>",
         "published":"2013-07-01T22:52:27Z",
         "author":"nobody@flickr.com(nicolae.ghioca)",
         "author_id":"97795992@N02",
         "tags":""
      },
      {
         "title":"OverCappadocia",
         "link":"http://www.flickr.com/photos/dlnwelch/9185912369/",
         "media":{
            "m":"http://farm8.staticflickr.com/7307/9185912369_64fcf9fcea_m.jpg"
         },
         "date_taken":"2013-06-24T18:38:27-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/dlnwelch/\">dlnwelch<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/dlnwelch/9185912369/\"title=\"OverCappadocia\"><imgsrc=\"http://farm8.staticflickr.com/7307/9185912369_64fcf9fcea_m.jpg\"width=\"240\"height=\"159\"alt=\"OverCappadocia\"/><\/a><\/p>",
         "published":"2013-07-01T22:52:28Z",
         "author":"nobody@flickr.com(dlnwelch)",
         "author_id":"23659159@N00",
         "tags":"turkey"
      },
      {
         "title":"IMG_8073.jpg",
         "link":"http://www.flickr.com/photos/hollylynne/9185912455/",
         "media":{
            "m":"http://farm8.staticflickr.com/7440/9185912455_7c9187b71d_m.jpg"
         },
         "date_taken":"2013-06-29T14:30:24-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/hollylynne/\">hollylynne<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/hollylynne/9185912455/\"title=\"IMG_8073.jpg\"><imgsrc=\"http://farm8.staticflickr.com/7440/9185912455_7c9187b71d_m.jpg\"width=\"240\"height=\"160\"alt=\"IMG_8073.jpg\"/><\/a><\/p>",
         "published":"2013-07-01T22:52:29Z",
         "author":"nobody@flickr.com(hollylynne)",
         "author_id":"63633462@N00",
         "tags":""
      },
      {
         "title":"IMG_3496",
         "link":"http://www.flickr.com/photos/20921915@N07/9185912463/",
         "media":{
            "m":"http://farm4.staticflickr.com/3745/9185912463_c01d2ee78f_m.jpg"
         },
         "date_taken":"2013-06-30T12:16:07-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/20921915@N07/\">EduardoBiavati<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/20921915@N07/9185912463/\"title=\"IMG_3496\"><imgsrc=\"http://farm4.staticflickr.com/3745/9185912463_c01d2ee78f_m.jpg\"width=\"160\"height=\"240\"alt=\"IMG_3496\"/><\/a><\/p>",
         "published":"2013-07-01T22:52:29Z",
         "author":"nobody@flickr.com(EduardoBiavati)",
         "author_id":"20921915@N07",
         "tags":""
      },
      {
         "title":"",
         "link":"http://www.flickr.com/photos/96294013@N08/9185912509/",
         "media":{
            "m":"http://farm4.staticflickr.com/3671/9185912509_c9c71e45d9_m.jpg"
         },
         "date_taken":"2013-05-20T04:44:57-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/96294013@N08/\">labolavirus<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/96294013@N08/9185912509/\"title=\"\"><imgsrc=\"http://farm4.staticflickr.com/3671/9185912509_c9c71e45d9_m.jpg\"width=\"240\"height=\"159\"alt=\"\"/><\/a><\/p>",
         "published":"2013-07-01T22:52:29Z",
         "author":"nobody@flickr.com(labolavirus)",
         "author_id":"96294013@N08",
         "tags":""
      },
      {
         "title":"AbstractJuly#abstract#fourthofjuly#lamp#ikea#celebrate#fireworks#interiordesign#starburst#lighting#shotoftheday#abstraction#mabp#abstractphotography#photobeaulieu",
         "link":"http://www.flickr.com/photos/photobeaulieu/9185912553/",
         "media":{
            "m":"http://farm3.staticflickr.com/2854/9185912553_ce03eba623_m.jpg"
         },
         "date_taken":"2013-07-01T18:52:30-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/photobeaulieu/\">photobeaulieu<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/photobeaulieu/9185912553/\"title=\"AbstractJuly#abstract#fourthofjuly#lamp#ikea#celebrate#fireworks#interiordesign#starburst#lighting#shotoftheday#abstraction#mabp#abstractphotography#photobeaulieu\"><imgsrc=\"http://farm3.staticflickr.com/2854/9185912553_ce03eba623_m.jpg\"width=\"240\"height=\"240\"alt=\"AbstractJuly#abstract#fourthofjuly#lamp#ikea#celebrate#fireworks#interiordesign#starburst#lighting#shotoftheday#abstraction#mabp#abstractphotography#photobeaulieu\"/><\/a><\/p>",
         "published":"2013-07-01T22:52:30Z",
         "author":"nobody@flickr.com(photobeaulieu)",
         "author_id":"91233947@N02",
         "tags":"squaresquareformathefeiphoneographyinstagramappuploaded:by=instagramfoursquare:venue=4abfafddf964a520a89120e3"
      },
      {
         "title":"Countinface$",
         "link":"http://www.flickr.com/photos/98188225@N08/9185912581/",
         "media":{
            "m":"http://farm4.staticflickr.com/3673/9185912581_68e8cdea63_m.jpg"
         },
         "date_taken":"2013-07-01T15:52:30-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/98188225@N08/\">antloks22<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/98188225@N08/9185912581/\"title=\"Countinface$\"><imgsrc=\"http://farm4.staticflickr.com/3673/9185912581_68e8cdea63_m.jpg\"width=\"240\"height=\"240\"alt=\"Countinface$\"/><\/a><\/p>",
         "published":"2013-07-01T22:52:30Z",
         "author":"nobody@flickr.com(antloks22)",
         "author_id":"98188225@N08",
         "tags":"squaresquareformatiphoneographyinstagramappuploaded:by=instagram"
      },
      {
         "title":"SpikedEggnogBundt",
         "link":"http://www.flickr.com/photos/97191655@N02/9185912599/",
         "media":{
            "m":"http://farm8.staticflickr.com/7344/9185912599_bb185fd673_m.jpg"
         },
         "date_taken":"2012-11-26T16:00:04-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/97191655@N02/\">marysmithjane<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/97191655@N02/9185912599/\"title=\"SpikedEggnogBundt\"><imgsrc=\"http://farm8.staticflickr.com/7344/9185912599_bb185fd673_m.jpg\"width=\"192\"height=\"127\"alt=\"SpikedEggnogBundt\"/><\/a><\/p><p>viaMaryJane<ahref=\"http://bit.ly/12ajOyg\"rel=\"nofollow\">bit.ly/12ajOyg<\/a><\/p>",
         "published":"2013-07-01T22:52:30Z",
         "author":"nobody@flickr.com(marysmithjane)",
         "author_id":"97191655@N02",
         "tags":"pinterest"
      },
      {
         "title":"AAG_1795",
         "link":"http://www.flickr.com/photos/rawartists/9188709452/",
         "media":{
            "m":"http://farm4.staticflickr.com/3830/9188709452_a169477b60_m.jpg"
         },
         "date_taken":"2013-06-27T21:30:41-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/rawartists/\">rawartistsmedia<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/rawartists/9188709452/\"title=\"AAG_1795\"><imgsrc=\"http://farm4.staticflickr.com/3830/9188709452_a169477b60_m.jpg\"width=\"160\"height=\"240\"alt=\"AAG_1795\"/><\/a><\/p>",
         "published":"2013-07-01T22:52:23Z",
         "author":"nobody@flickr.com(rawartistsmedia)",
         "author_id":"51030901@N06",
         "tags":"amitgabai"
      },
      {
         "title":"IMG_2991",
         "link":"http://www.flickr.com/photos/ddrmanxbxfr/9188709474/",
         "media":{
            "m":"http://farm3.staticflickr.com/2889/9188709474_d6b8ee32f2_m.jpg"
         },
         "date_taken":"2013-06-29T14:56:46-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/ddrmanxbxfr/\">ddrmanxbxfr<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/ddrmanxbxfr/9188709474/\"title=\"IMG_2991\"><imgsrc=\"http://farm3.staticflickr.com/2889/9188709474_d6b8ee32f2_m.jpg\"width=\"240\"height=\"160\"alt=\"IMG_2991\"/><\/a><\/p>",
         "published":"2013-07-01T22:52:24Z",
         "author":"nobody@flickr.com(ddrmanxbxfr)",
         "author_id":"56317924@N06",
         "tags":""
      },
      {
         "title":"Volbeat@Hellfest,Clisson|23.06.2013",
         "link":"http://www.flickr.com/photos/nicolasg/9188709554/",
         "media":{
            "m":"http://farm8.staticflickr.com/7438/9188709554_82c9873f85_m.jpg"
         },
         "date_taken":"2013-06-23T23:19:15-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/nicolasg/\">NicolasGaire<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/nicolasg/9188709554/\"title=\"Volbeat@Hellfest,Clisson|23.06.2013\"><imgsrc=\"http://farm8.staticflickr.com/7438/9188709554_82c9873f85_m.jpg\"width=\"240\"height=\"160\"alt=\"Volbeat@Hellfest,Clisson|23.06.2013\"/><\/a><\/p><p>Volbeat<br/>Hellfest-Clisson-23.06.2013<br/>NicolasGaire<br/><br/><br/><ahref=\"http://www.nicolasgaire.com\"rel=\"nofollow\">NicolasGaire-©2013.<\/a><br/><br/><br/>Aucunephotographienepeutêtrereproduite,téléchargée,copiée,stockée,dérivéeouutiliséeenpartieouenintégralité,sanspermissionécritedupropriétaire.Tousdroitsréservés.<br/><br/>Nophotographmaybereproduced,downloaded,copied,stored,manipulated,orusedwholeorinpartofaderivativework,withoutmywrittenpermission.Allrightsreserved.<br/><br/><ahref=\"http://www.nicolasgaire.com\"rel=\"nofollow\">www.nicolasgaire.com<\/a><\/p>",
         "published":"2013-07-01T22:52:24Z",
         "author":"nobody@flickr.com(NicolasGaire)",
         "author_id":"24782701@N05",
         "tags":"francefestivalmetalextremefesthellfestmusiquesvolbeatclisson2013jonlarsenmichaelpoulsenrobcaggianoanderskjølholm"
      },
      {
         "title":"Onstwedderomloop2013",
         "link":"http://www.flickr.com/photos/martin_borgman/9188709656/",
         "media":{
            "m":"http://farm6.staticflickr.com/5464/9188709656_82bcb2db76_m.jpg"
         },
         "date_taken":"2013-07-01T19:33:47-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/martin_borgman/\">Martin_Borgman<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/martin_borgman/9188709656/\"title=\"Onstwedderomloop2013\"><imgsrc=\"http://farm6.staticflickr.com/5464/9188709656_82bcb2db76_m.jpg\"width=\"240\"height=\"161\"alt=\"Onstwedderomloop2013\"/><\/a><\/p><p>Onstwedderomloop2013<br/><br/>GarmtopdeLoop,BlogenFoto\'s:<br/><ahref=\"http://www.garmtopdeloop.nl/blog-en-fotos/_article/onstwedderomloop-2013.html\"rel=\"nofollow\">Onstwedderomloop2013<\/a><\/p>",
         "published":"2013-07-01T22:52:25Z",
         "author":"nobody@flickr.com(Martin_Borgman)",
         "author_id":"40190560@N05",
         "tags":"netherlandssportnederlandrunninggroningenhardlopenatletiekonstwedde"
      },
      {
         "title":"DSC_1069.jpg",
         "link":"http://www.flickr.com/photos/8wiredbrewnation/9188709674/",
         "media":{
            "m":"http://farm3.staticflickr.com/2844/9188709674_a33aa9f86e_m.jpg"
         },
         "date_taken":"2013-06-03T16:47:20-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/8wiredbrewnation/\">Sham&amp;Rich\'sBigBeerBook<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/8wiredbrewnation/9188709674/\"title=\"DSC_1069.jpg\"><imgsrc=\"http://farm3.staticflickr.com/2844/9188709674_a33aa9f86e_m.jpg\"width=\"159\"height=\"240\"alt=\"DSC_1069.jpg\"/><\/a><\/p>",
         "published":"2013-07-01T22:52:25Z",
         "author":"nobody@flickr.com(Sham&Rich\'sBigBeerBook)",
         "author_id":"67572648@N02",
         "tags":""
      },
      {
         "title":"IMG_0361_R",
         "link":"http://www.flickr.com/photos/jmcustomphotography/9188709714/",
         "media":{
            "m":"http://farm4.staticflickr.com/3813/9188709714_7e215e8a29_m.jpg"
         },
         "date_taken":"2013-05-26T09:18:46-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/jmcustomphotography/\">JMPhotography(Indianapolis)<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/jmcustomphotography/9188709714/\"title=\"IMG_0361_R\"><imgsrc=\"http://farm4.staticflickr.com/3813/9188709714_7e215e8a29_m.jpg\"width=\"240\"height=\"160\"alt=\"IMG_0361_R\"/><\/a><\/p>",
         "published":"2013-07-01T22:52:26Z",
         "author":"nobody@flickr.com(JMPhotography(Indianapolis))",
         "author_id":"39473323@N05",
         "tags":""
      },
      {
         "title":"P1080634",
         "link":"http://www.flickr.com/photos/98339969@N08/9188709814/",
         "media":{
            "m":"http://farm8.staticflickr.com/7452/9188709814_8b91a224ca_m.jpg"
         },
         "date_taken":"2010-04-28T17:36:19-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/98339969@N08/\">peto<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/98339969@N08/9188709814/\"title=\"P1080634\"><imgsrc=\"http://farm8.staticflickr.com/7452/9188709814_8b91a224ca_m.jpg\"width=\"160\"height=\"240\"alt=\"P1080634\"/><\/a><\/p>",
         "published":"2013-07-01T22:52:27Z",
         "author":"nobody@flickr.com(peto)",
         "author_id":"98339969@N08",
         "tags":""
      },
      {
         "title":"DSC_0153",
         "link":"http://www.flickr.com/photos/22242621@N07/9188709918/",
         "media":{
            "m":"http://farm8.staticflickr.com/7379/9188709918_822866b6b4_m.jpg"
         },
         "date_taken":"2013-03-03T14:33:06-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/22242621@N07/\">ing.davidino<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/22242621@N07/9188709918/\"title=\"DSC_0153\"><imgsrc=\"http://farm8.staticflickr.com/7379/9188709918_822866b6b4_m.jpg\"width=\"240\"height=\"160\"alt=\"DSC_0153\"/><\/a><\/p>",
         "published":"2013-07-01T22:52:28Z",
         "author":"nobody@flickr.com(ing.davidino)",
         "author_id":"22242621@N07",
         "tags":""
      },
      {
         "title":"29/06/2013-PorDentrodoVozãohomenageouosalvinegrosapaixonados",
         "link":"http://www.flickr.com/photos/cearasc/9188709968/",
         "media":{
            "m":"http://farm6.staticflickr.com/5485/9188709968_988e7310d4_m.jpg"
         },
         "date_taken":"2013-06-29T09:35:30-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/cearasc/\">CearaSC<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/cearasc/9188709968/\"title=\"29/06/2013-PorDentrodoVozãohomenageouosalvinegrosapaixonados\"><imgsrc=\"http://farm6.staticflickr.com/5485/9188709968_988e7310d4_m.jpg\"width=\"240\"height=\"160\"alt=\"29/06/2013-PorDentrodoVozãohomenageouosalvinegrosapaixonados\"/><\/a><\/p><p>Casalquetorceunidopermaneceunido.EseforpeloCearáSportingClubémelhorainda.OPorDentrodoVozão–EspecialApaixonados–realmentemexeucomoscoraçõesde15casaisAlvinegros,noúltimosábado,29/06.Emumamanhãrepletadesurpresas,osTorcedoresOficiais,homenageadospelomêsdosNamorados,tiveramaoportunidadedeconhecertodasasdependênciasdasedeCarlosAlencarPinto(CAP)comoacademia,oDepartamentoMédico(DM),oHoteleseuauditório,oCentrodeRepouso,aSaladeImprensaemuitomais.<br/>&gt;&gt;&gt;<ahref=\"http://vozao.net/14Jmh5w\"rel=\"nofollow\">vozao.net/14Jmh5w<\/a><\/p>",
         "published":"2013-07-01T22:52:28Z",
         "author":"nobody@flickr.com(CearaSC)",
         "author_id":"48716414@N05",
         "tags":"cearávovôvozãocearásportingclub"
      },
      {
         "title":"DSCF0072(2)",
         "link":"http://www.flickr.com/photos/imreplica/9188710028/",
         "media":{
            "m":"http://farm8.staticflickr.com/7409/9188710028_1ca876fbb0_m.jpg"
         },
         "date_taken":"2012-12-01T18:44:48-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/imreplica/\">Drockdrigo<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/imreplica/9188710028/\"title=\"DSCF0072(2)\"><imgsrc=\"http://farm8.staticflickr.com/7409/9188710028_1ca876fbb0_m.jpg\"width=\"240\"height=\"180\"alt=\"DSCF0072(2)\"/><\/a><\/p>",
         "published":"2013-07-01T22:52:29Z",
         "author":"nobody@flickr.com(Drockdrigo)",
         "author_id":"69271426@N05",
         "tags":""
      },
      {
         "title":"echoes1920",
         "link":"http://www.flickr.com/photos/39927170@N05/9188710138/",
         "media":{
            "m":"http://farm3.staticflickr.com/2858/9188710138_ac088119ea_m.jpg"
         },
         "date_taken":"2013-07-01T17:52:30-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/39927170@N05/\">dudesy916<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/39927170@N05/9188710138/\"title=\"echoes1920\"><imgsrc=\"http://farm3.staticflickr.com/2858/9188710138_ac088119ea_m.jpg\"width=\"240\"height=\"150\"alt=\"echoes1920\"/><\/a><\/p>",
         "published":"2013-07-01T22:52:30Z",
         "author":"nobody@flickr.com(dudesy916)",
         "author_id":"39927170@N05",
         "tags":""
      },
      {
         "title":"000DC5D5A5C5(RailpageCam1)motionalarmat20130702095204",
         "link":"http://www.flickr.com/photos/kkvcam1/9188710178/",
         "media":{
            "m":"http://farm8.staticflickr.com/7362/9188710178_d20549a257_m.jpg"
         },
         "date_taken":"2013-07-02T08:52:31-08:00",
         "description":"<p><ahref=\"http://www.flickr.com/people/kkvcam1/\">Railpage-BunburyStreet-Camera1<\/a>postedaphoto:<\/p><p><ahref=\"http://www.flickr.com/photos/kkvcam1/9188710178/\"title=\"000DC5D5A5C5(RailpageCam1)motionalarmat20130702095204\"><imgsrc=\"http://farm8.staticflickr.com/7362/9188710178_d20549a257_m.jpg\"width=\"240\"height=\"180\"alt=\"000DC5D5A5C5(RailpageCam1)motionalarmat20130702095204\"/><\/a><\/p>",
         "published":"2013-07-01T22:52:31Z",
         "author":"nobody@flickr.com(Railpage-BunburyStreet-Camera1)",
         "author_id":"65802682@N04",
         "tags":"railroadwebcamrailwayfreightrailpagebunburystreet"
      }
   ]
}

	<script type="text/javascript" charset="utf8">
        $(document).ready(function () {
            var theme = "bootstrap"/*getDemoTheme()* /,
            urlMap = { "Sales_Training_Manual" : "https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?k=g8h2j7kdhkztj0awyeii" // "g8h2j7kdhkztj0awyeii" //"https://docs.google.com/document/d/1ICsRuk5aOyvAi7kehyKkn6IHVosQRMhdY0F-2d6tP8o/preview"
					 , "Training_Mojo"         : "https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?k=g8h2j7kdhkztj0awyeii" // "http://www.youtube.com/embed/i3aExu11e1o?" //lolcats: v=2CNd6OGdMO8 // <iframe width="560" height="315" src="" frameborder="0" allowfullscreen></iframe>
					 , "Register"              : "https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?k=g8h2j7kdhkztj0awyeii"
					 , "Comp_Plan"             : "https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?k=g8h2j7kdhkztj0awyeii" // "https://docs.google.com/document/d/1ROjvOBVDwX7q1gKITyaYYtEYICY5JQAEBmpxcAyIv1E/preview"
					 , "Paycheck"     		   : "https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?k=g8h2j7kdhkztj0awyeii"
			};
            // Create jqxTree
            $("#splitter").jqxSplitter({ theme: theme, width: '100%', height: 1400, panels: [{ size: 215}] });
            $('#jqxTree').jqxTree({ theme: theme, height: '100%', width: '100%' });
            $('#jqxTree').on('select', function (event) {
             // $("#ContentPanel").html("<iframe src='"        + urlMap[event.args.element.id]+ "'  style='height:100%;width:100%;'></iframe>");
             // $("#ContentPanel").html("<div style='margin: 10px;'>" + urlMap[event.args.element.id] + "                                   </div>   ");
             // $("#ContentPanel").html("<div style='margin: 10px;'>" + $.get(urlMap[event.args.element.id],"text").responseText + "</div>");
			 // $("#ContentPanel").load(urlMap[event.args.element.id]); // XSS - same origin policy problem
			 // $.getJSON('https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?jsoncallback=?',function(data){$('#ContentPanel').html(data.result);}); // Reference: http://stackoverflow.com/questions/3889001/jquery-cross-domain-load-self-constructing-widget
			 // $.getJSON('https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?k="g8h2j7kdhkztj0awyeii"&jsoncallback=?',{"k":"g8h2j7kdhkztj0awyeii"}).done(function(data){$('#ContentPanel').html(data.result);}); // Reference: http://api.jquery.com/jQuery.getJSON/
			 // $.getJSON('https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?jsoncallback=?',{k:"g8h2j7kdhkztj0awyeii"}).done(function(data){$('#ContentPanel').html(data.result);}); // Reference: http://api.jquery.com/jQuery.getJSON/
			 // $.getJSON('https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?jsoncallback=?',{k:"g8h2j7kdhkztj0awyeii"}).done(function(    ){$('#ContentPanel').html("<div style='margin: 10px;'>" + event.args.element.id + "</div>");}); // Reference: http://api.jquery.com/jQuery.getJSON/
			 // $.getJSON('https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?jsoncallback=?',{k:"g8h2j7kdhkztj0awyeii"}).done(function(data){$('#ContentPanel').html(JSON.stringify(data));}) // Reference: http://api.jquery.com/jQuery.getJSON/ // jQuery automatically appends jsoncallback value (e.g. "jquery000123") to url as a parameter so server must parse it and return it as function name (e.g., "jquery000123({object data goes here})")
			    $.getJSON('https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?jsoncallback=?',{k:"g8h2j7kdhkztj0awyeii"}).done(function(data){$('#ContentPanel').html(data.result);}) // Reference: http://api.jquery.com/jQuery.getJSON/ // jQuery automatically appends jsoncallback value (e.g. "jquery000123") to url as a parameter so server must parse it and return it as function name (e.g., "jquery000123({object data goes here})")
			 // $("#ContentPanel").html("<div style='margin: 10px;'>" + event.args.element.id + "                                   </div>   ");
			 //	$("#ContentPanel").html("<iframe src='https://docs.google.com/document/d/1ICsRuk5aOyvAi7kehyKkn6IHVosQRMhdY0F-2d6tP8o/preview' width='100%' height='900' scrolling=no seamless=true title='Sales Training Manual'></iframe>");
             // $("#ContentPanel").html("<iframe src='" + event.args.element.id + "'  style='height:100%;width:100%;'></iframe>");
			});
        });
    </script>
// Send auction data
        // try{out.records[i].avmStatSet=[];if(r.avm.dataset.zillow.rentzestimate===Number(r.avm.dataset.zillow.rentzestimate)){out.records[i].rent=Math.round(r.avm.dataset.zillow.rentzestimate)}else{out.records[i].rent="—"}}catch(e){Logger.log(e.message)}; // "rent"
           try{if(out.records[i].rent){out.records[i].grm=Math.round(r.price/(12*out.records[i].rent));out.records[i].ia=Math.round(r.offer.beforeRepairs.auto/1000);}else{out.records[i].grm="—";out.records[i].ia="—";}       }catch(e){Logger.log(e.message)}; // Compute gross rent margin “grm” // Compute price per income approach “ia”
           try{if(r.avm.stat.autoEst&&r.avm.combi.sqft){out.records[i].psf=Math.round(r.avm.stat.autoEst/r.avm.combi.sqft)}else{out.records[i].psf="—";}                                                                        }catch(e){Logger.log(e.message)}; // Compute price per square foot “psf”
           try{k=r.avm.stat.set.length;while(k--){if(r.avm.stat.set[k]===Number(r.avm.stat.set[k])){out.records[i].avmStatSet[k]=Math.round(r.avm.stat.set[k]/1000)}}                                                           }catch(e){Logger.log(e.message)}; // "avmStatSet"
           try{out.records[i].arv=r.arv                         .value}catch(e){out.records[i].arv="—"}; // "arv" Strict input // ARV
           try{out.records[i].rep=r.repairs                     .value}catch(e){out.records[i].rep="—"}; // "rep" Strict input // Repairs
           try{out.records[i].cof=r.counter                     .value}catch(e){out.records[i].cof="—"}; // "cof" Strict input // Counter
           try{out.records[i].com=r.LST_Attributes[21].attribute_value}catch(e){out.records[i].com="—"}; // "com" Strict input // Comments 
           try{out.records[i].city=r.address.city;out.records[i].state=r.address.state;out.records[i].zip=r.address.zip;out.records[i].sa=r.address.sa;out.records[i].useCode=r.avm.dataset.zillow.searchresults.response.results.result.useCode.Text;}catch(e){Logger.log(e.message)};
           try{if(r.link.yahoo                    ){out.records[i].link_yahoo            =r.link.yahoo                       ;}else{out.records[i].link_yahoo=""}         }catch(e){Logger.log(e.message)};
           try{if(r.avm.dataset.zillow.link       ){out.records[i].link_zillow           =r.avm.dataset.zillow.link          ;}else{out.records[i].link_zillow=""}        }catch(e){Logger.log(e.message)};
           try{if(r.avm.dataset.zillow.homedetails){out.records[i].link_zillowdetails    =r.avm.dataset.zillow.homedetails   ;}else{out.records[i].link_zillowdetails=""} }catch(e){Logger.log(e.message)};
           try{if(r.avm.dataset.eppraisal.link    ){out.records[i].link_eppraisal        =r.avm.dataset.eppraisal.link       ;}else{out.records[i].link_eppraisal=""}     }catch(e){Logger.log(e.message)};
           try{if(r.avm.dataset.realtor.link      ){out.records[i].link_realtor          =r.avm.dataset.realtor.link         ;}else{out.records[i].link_realtor=""}       }catch(e){Logger.log(e.message)};
           try{if(r.avm.dataset.realEstate.link   ){out.records[i].link_realEstate       =r.avm.dataset.realEstate.link      ;}else{out.records[i].link_realEstate=""}    }catch(e){Logger.log(e.message)};
           try{if(r.avm.dataset.homeGain.link     ){out.records[i].link_homeGain         =r.avm.dataset.homeGain.link        ;}else{out.records[i].link_homeGain=""}      }catch(e){Logger.log(e.message)};
           try{if(r.avm.dataset.trulia.link       ){out.records[i].link_trulia           =r.avm.dataset.trulia.link          ;}else{out.records[i].link_trulia=""}        }catch(e){Logger.log(e.message)};
           try{                                     out.records[i].link_propertyShark    ="http://www.propertyshark.com/"    ;}catch(e){Logger.log(e.message)};
           try{                                     out.records[i].link_neighborhoodScout="http://www.neighborhoodscout.com/";}catch(e){Logger.log(e.message)};
           try{                                     out.records[i].link_zipSkinny        ="http://zipskinny.com/index.php?zip="+r.address.zip; }catch(e){Logger.log(e.message)};
           try{if(r.link.gmap                     ){out.records[i].link_googleMap        =r.link.gmap                        ;}else{}                                         }catch(e){Logger.log(e.message)};
           try{out.records[i].beds=r.avm.combi.beds;out.records[i].baths=r.avm.combi.baths;out.records[i].sf=Math.round(r.avm.combi.sqft/100);out.records[i].yearBuilt=r.avm.combi.built;out.records[i].taxVal=Math.round(r.avm.combi.taxVal/1000);out.records[i].lastSoldPrice=Math.round(r.avm.combi.lastSoldPrice/1000);out.records[i].lastSoldYear=r.avm.combi.lastSoldYear;out.records[i].taxAmt=Math.round(r.avm.combi.taxAmt/100);out.records[i].price=Math.round(r.price/1000);}catch(e){Logger.log(e.message)};
           try{out.records[i].autoEst=r.avm.stat.autoEst;out.records[i].autoEstRound=Math.round(r.avm.stat.autoEst/1000);out.records[i].sdPct=r.avm.stat.sdPct;out.records[i].popCount=r.avm.stat.popCount;out.records[i].link_chase="https://www.chase.com/mortgage/mortgage-resources/home-value-estimator";out.records[i].link_boa="http://realestatecenter.bankofamerica.com/tools/marketvalue.aspx";out.records[i].link_homesCom="http://www.homes.com/Home-Prices/";out.records[i].rentRound=Math.round(r.avm.dataset.zillow.rentzestimate/100);}catch(e){Logger.log(e.message)};
           try{out.records[i].ratio=r.avm.stat.ratio;}catch(e){Logger.log(e.message)}; // db_id MyBid rent grm ia psf avmStatSet[] arv ratio rep cof com city state zip sa useCode link_yahoo link_zillow link_zillowdetails link_eppraisal link_realtor link_realEstate link_homeGain link_trulia link_propertyShark link_neighborhoodScout link_zipSkinny link_googleMap beds baths sf yearBuilt taxVal lastSoldPrice lastSoldYear taxAmt price autoEst autoEstRound sdPct popCount link_chase link_boa link_homesCom rentRound
        // 
        // try{k=r.avm.stat.set.length;while(k--){if(r.avm.stat.set[k]===Number(r.avm.stat.set[k])){out.records[i].avmStatSet[k]=Math.round(r.avm.stat.set[k]/1000)}}}catch(e){Logger.log(e.message)}; // "avmStatSet"
function pdf2gDoc(pdfFile){return text2gDoc(pdf2text(pdfFile))}// Note: To return the text only, as a string, use pdf2text(pdfFileBlob,{keepTextfile:false})
function text2gDoc(id){var fileTxt=DriveApp.getFileById(id),fileGdoc=DocumentApp.create(fileTxt.getName().replace(".txt",""));
    fileGdoc.getBody().setText(fileTxt.setTrashed(true).getBlob().getDataAsString());return fileGdoc.getId()
/** 
 * Given its Google Drive file ID, convert text file (blob) to a Google Doc file, also stored on Google Drive.
 * By default, the text file will be placed in the root folder, with the same name as source txt (but without '.txt').
 * Prefer to store file as a Gdoc instead of .txt because Gdoc does not consume any memory quote and can be manipulated via API.
 * Original source code: pdf2text() (externally written) chose .txt as storage format.
 *
 * @param  {string}  id  Gdrive ID of plain text .txt file
 * @return {string}      Gdrive ID of GoogleDoc  Gdoc file
 * /
}	
function avmRealtor     (addy    ,tMax  ){ // Array.prototype.avmRealtor    =function(tMax    ){
	/* References
		// Google search: free home valuation tool
		// Result:        Realtor.com
		// http://www.realtor.com/realestateandhomes-search/Riverside_CA/92505/10389-Brookway-Pl               Typical address URL for single word city
		// http://www.realtor.com/realestateandhomes-search/QUAIL-VALLEY_CA/92587/28916-Avenida-Gaviota        Uses dashes for multi-word cities; but delete city.
		// http://www.realtor.com/realestateandhomes-search/_CA/92587/28916-Avenida-Gaviota                    <—...use this
		// http://www.realtor.com/realestateandhomes-detail/10389-Brookway-Pl_Riverside_CA_92505_M11863-88109  <—...forwards here, scrape codes & reformat GET
	* /
	/* Archive
		6/13/2013
			// Note: The [0] element “points” to the element in the returned array containing the AVM “single figure” estimate of value.
			var out   = [6];     // This is the special element that contains the element number of the AVM estimate; a key self-contained reference within the function.
				tMax  = tMax||1; // Max unsuccessful attempts
			var sa    = this[0]; // "sa" .............. Example: 32445 Stonewood Way (f/k/a "Number_and_street")
			var csz   = this[1]; // "csz" ............. Example: LAKE ELSINORE CA 92530
			var num   = this[2]; // "Number" .......... Example: 32445
			var state = this[3]; // "State" ........... Example: CA
			var zip   = this[4]; // "Zip" ............. Example: 92530
			var full  = this[5]; // "Full_address" .... Example: 32445 Stonewood Way, LAKE ELSINORE CA 92530
			var part  = this[6]; // "Partial_address" . Example: Stonewood Way, LAKE ELSINORE CA 92530
		Archived 1 — Summary section only
			out[0]         = 6; // This is the special element that contains the element number of the AVM estimate; a key self-contained reference within the function.
			FIELD_NAME[1]  = "Estimated Value";
			MARKER_QUE[1]  = "Estimated Value";
			MARKER_BEG[1]  = "$";
			MARKER_END[1]  = "<";
			FIELD_NAME[2]  = "Status";
			MARKER_QUE[2]  = "Status:";
			MARKER_BEG[2]  = ">";
			MARKER_END[2]  = "<";
			FIELD_NAME[3]  = "Bed";
			MARKER_QUE[3]  = "Beds:";
			MARKER_BEG[3]  = ">";
			MARKER_END[3]  = "Bed";
			FIELD_NAME[4]  = "Bath";
			MARKER_QUE[4]  = "Baths:";
			MARKER_BEG[4]  = ">";
			MARKER_END[4]  = "Bath";
			FIELD_NAME[5]  = "Sqft";
			MARKER_QUE[5]  = "House Size:";
			MARKER_BEG[5]  = ">";
			MARKER_END[5]  = "Sq";
			FIELD_NAME[6]  = "Lot Acres";
			MARKER_QUE[6]  = "Lot Size:";
			MARKER_BEG[6]  = ">";
			MARKER_END[6]  = "Acres";
		Archived 2 — 6/8/2013
			// Note:  QUE[0], BEG[0], END[0] — intentionally left null; Replaced array labels: MARKER_QUE, MARKER_BEG and MARKER_END with QUE, BEG and END, respectively.
			FIELD_NAME[1]  = "Status";
			MARKER_QUE[1]  = "Status:";  // Note: QUE[0], BEG[0], END[0] — intentionally left null
			MARKER_BEG[1]  = ">";
			MARKER_END[1]  = "<";
			FIELD_NAME[2]  = "Beds";
			MARKER_QUE[2]  = ">Beds<";
			MARKER_BEG[2]  = "<td>";
			MARKER_END[2]  = "bed";
			FIELD_NAME[3]  = "Baths";
			MARKER_QUE[3]  = "Baths";
			MARKER_BEG[3]  = "<td>";
			MARKER_END[3]  = "bath";
			FIELD_NAME[4]  = "Sqft";
			MARKER_QUE[4]  = "Size";
			MARKER_BEG[4]  = "<td>";
			MARKER_END[4]  = "sq";
			FIELD_NAME[5]  = "Lot";
			MARKER_QUE[5]  = "Size";
			MARKER_BEG[5]  = "<td>";
			MARKER_END[5]  = "A";
			FIELD_NAME[6]  = "Value";
			MARKER_QUE[6]  = "Value";
			MARKER_BEG[6]  = "$";
			MARKER_END[6]  = "<";
			FIELD_NAME[7]  = "Value/sqft";
			MARKER_QUE[7]  = "sqft";
			MARKER_BEG[7]  = "$";
			MARKER_END[7]  = "<";
			FIELD_NAME[8]  = "Type";
			MARKER_QUE[8]  = "Type";
			MARKER_BEG[8]  = "d>";
			MARKER_END[8]  = "<";
			FIELD_NAME[9]  = "Year Built";
			MARKER_QUE[9]  = "Built";
			MARKER_BEG[9]  = "d>";
			MARKER_END[9]  = "<";
			FIELD_NAME[10] = "Neighborhood";
			MARKER_QUE[10] = "span";
			MARKER_BEG[10] = ">";
			MARKER_END[10] = "<";
			FIELD_NAME[11] = "Style";
			MARKER_QUE[11] = "span";
			MARKER_BEG[11] = ">";
			MARKER_END[11] = "<";
			FIELD_NAME[12] = "Stories";
			MARKER_QUE[12] = "span";
			MARKER_BEG[12] = ">";
			MARKER_END[12] = "<";
	* /
	/* Test variables
			addy       = {}                                           ; // 3224 E Desert Cove Avenue, Phoenix AZ 85028
			addy.sa    = "3224 E Desert Cove Avenue"                  ; // "sa" .............. Example: 32445 Stonewood Way (f/k/a "Number_and_street")
			addy.csz   =                            "Phoenix AZ 85028"; // "csz" ............. Example: LAKE ELSINORE CA 92530
			addy.num   = "3224"                                       ; // "Number" .......... Example: 32445
			addy.state =                                    "AZ"      ; // "State" ........... Example: CA
			addy.zip   =                                       "85028"; // "Zip" ............. Example: 92530
			addy.full  = "3224 E Desert Cove Avenue, Phoenix AZ 85028"; // "Full_address" .... Example: 32445 Stonewood Way, LAKE ELSINORE CA 92530
			addy.part  =      "E Desert Cove Avenue, Phoenix AZ 85028"; // "Partial_address" . Example: Stonewood Way, LAKE ELSINORE CA 92530
	* /
            var addy = {
                 zip    : "90042"                                     // "98584"                                 // "85027"
               , full   : "5115 Longfellow St, Los Angeles, CA 90042" // "1522 Fairmount Ave, Shelton, WA 98584" // "613 W Mcrae Dr, Phoenix, AZ 85027"
               , sa	    : "5115 Longfellow St"                        // "1522 Fairmount Ave"                    // "613 W Mcrae Dr"
               , csz    : "Los Angeles, CA 90042"                     // "Shelton, WA 98584"                     // "Phoenix, AZ 85027"
               , state  : "CA"                                        // "WA"                                    // "AZ"
               , number : "5115"                                      // "1522"                                  // "613"
               , part   : "Longfellow St, Los Angeles, CA 90042"      // "Fairmount Ave, Shelton, WA 98584"      // "W Mcrae Dr, Phoenix, AZ 85027"
               , city   : "Los Angeles"                               // "Shelton"                               // "Phoenix"
               }//,ask=127974.04;* /
	{ // 1. Parameters
		    tMax       = tMax || 1; // Max unsuccessful attempts
		var STEM       = // "http://www.realtor.com/realestateandhomes-search/" // "For Sale"      http://www.realtor.com/realestateandhomes-search/Costa-Mesa_CA/92627/1139-Aviemore-Terrace
		                                                                        // "Recently Sold" 
							"http://www.realtor.com/propertyrecord-search/"     // "Not For Sale"  http://www.realtor.com/propertyrecord-search/Shelton_WA/98584/1522-Fairmount-Ave
                                                                                //                 http://www.realtor.com/propertyrecord-search/Costa-Mesa_CA/92627/1147-Aviemore-Terrace
		/*, GET_SUFFIX = "http://www.realtor.com/realestateandhomes-detail/"
		  , GET_PREFIX = "\""
		  , INCL_SUFFX = false                                                  // Replaced by {options:{followredirects:true}}
	   * /, THIS       = [,"--","=-"," ",",",", "]
		  , WITH       = [,"-" ,"=" ,"-","-","-" ]
		/*, THISA      = [,"," ,"$" ," " ,"<"    ]
		  , WITHA      = [,""  ,""  ,""  ,""     ]
	   * /,	KEY 	   = [,"foo"      ,"sa"   ,"city" ,"state","zip"  ,"status"  ,"beds"  ,"baths"  ,"sqft"        ,"lot"       ,"built"       ,["smartZip_est" ,"smartZip_low","smartZip_high"],["dataQuick_est","dataQuick_low","dataQuick_high"],["eppraisal_est","eppraisal_low","eppraisal_high"]]
		  ,	QUE        = [,"highlight","<span","<span","<span","<span",">Status<",">Beds<",">Baths<",">House Size<",">Lot Size<",">Year Built<",["SmartZip"     ,"<li "        ,"<li "         ],["DataQuick"    ,"<li "         ,"<li "          ],["Eppraisal"    ,"<li "         ,"<li "          ]]
		  ,	BEG        = [,">"        ,">"    ,">"    ,">"    ,">"    ,"<span>"  ,"<span>","<span>" ,"<span>"      ,"<span>"    ,"<span>"      ,["$"            ,"$"           ,"$"            ],["$"            ,"$"            ,"$"             ],["$"            ,"$"            ,"$"             ]]
		  , END        = [,"<"        ,"<"    ,"<"    ,"<"    ,"<"    ," "       ," "     ," "      ,"<"           ,"<"         ,["<"          ,"<"             ,"<"          ],["<"            ,"<"             ,"<"           ],["<"             , "<"            ,"<"                             ]]
		  , DEL        = [,null       ,null   ,null   ,null   ,null   ,null      ,null    ,null     ,[","]         ,[","]       ,null          ,[["$",","]    ,["$",","]       ,["$",","]    ],[["$",","]      ,["$",","]     ,["$",","]      ],[["$",","]      ,["$",","]      ,["$",","]       ]]
		  , INS        = [,null       ,null   ,null   ,null   ,null   ,null      ,null    ,null     ,["" ]         ,["" ]       ,null          ,[["" ,"" ]    ,["" ,"" ]       ,["" ,"" ]    ],[["" ,"" ]      ,["" ,"" ]     ,["" ,"" ]      ],[["" ,"" ]      ,["" ,"" ]      ,["" ,"" ]       ]]
		  ;			  // 0,1          2        3         4              5            6              70               1              2                80               1               2                 90               1               2              
	}
	{ // 2. URL, forward, scrape, parse & return
		var out={},act=(STEM+addy.city.replace(/ /g,"-")+"_"+addy.state+"/"+addy.zip+"/"+addy.sa.replace(/ /g,"-")).trim(),i=THIS.length;while(i---1){act=act.replaceAll(THIS[i],WITH[i])} // var act="http://www.realtor.com/realestateandhomes-search/_CA/92587/28916-Avenida-Gaviota";                                
		var t=0;do{try{out=LibraryjsUtil._scrapeDataset(UrlFetchApp.fetch(act,{options:{followredirects:true}}/*.urlForwardTo(GET_SUFFIX,GET_PREFIX,INCL_SUFFX)* /).getContentText(),/*out[0]* /KEY,QUE,BEG,END,DEL,INS)}catch(e){Logger.log(/*e.message+* /": Error: avmRealtor: "+addy.sa+", "+addy.csz)}t++}while(/*!LibraryjsUtil.isNumber(out[out[0]])&&* /t<tMax) // Forward to unique URL w/ID, scrape & return // Logger.log("Returned Realtor: t="+t+", est="+out[out[0]]);
		/*for(x in out){i=THISA.length;while(i---1){if(out[x]){out[x]=out[x].replaceAll(THISA[i],WITHA[i])}}}* /out.link=act;/*Logger.log("Realtor.com: %s",JSON.stringify(out));* /return out}}
*/