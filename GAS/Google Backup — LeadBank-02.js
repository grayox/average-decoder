function auth   (){}
function size   (){Logger.log(ScriptDb.getMyDb().query({}).getSize());}
function del    (){var db=ScriptDb.getMyDb();var results=db.query({});while(results.hasNext()){var r=results.next();db.remove(r);}}
function showOne(){Logger.log(JSON.stringify(ScriptDb.getMyDb().query({table:"deposit"}).next()))} // Show one record
function showAll(){var db=ScriptDb.getMyDb();var r,results=db.query({table:"account"});while(results.hasNext()){r=results.next();Logger.log(/*Utilities.jsonStringify*/JSON.stringify(r));}} // Show all records in database // Reference: https://developers.google.com/apps-script/scriptdb#saving_data
function mod    (){var db=ScriptDb.getMyDb(),r,results=db.query({table:"account",email:db.not(Session.getUser().getEmail())});while(results.hasNext()){r=results.next();
    // r.JsonData = JSON.parse(JSON.stringify(eval(r.JsonData)));Logger.log(JSON.stringify(r));
    r.count={"balance":332,"deposits":360,"withdrawals":28};
    db.save(r);}}
function leadbankArrays(){
	return	[
	//			 [1]                    [2]                   [3]                    [4]                        [5]                     [6]                 [7]                       [8]                     [9]                   [10]               [11]               [12]              [13]              [14]                [15]               [16]                        [17]                       [18]               [19]                     [20]                          [21]                    [22]                         [23]                       [24]                   [25]                                [26]                                 [27]                [28]                   [29]                            [30]                             [31]                                [32]                                 [33]                                [34]
	/*[1]*/	,	[,"Accounting: bookkeep","Accounting: CPA/tax","Attorney: bankruptcy","Attorney: divorce/family","Attorney: real estate","Attorney: tax law","Attorney: wills/estates","Auto loan: bad credit","Business: appraiser","Business: banker","Business: broker","Business: loans","Cash flow notes","Credit counseling","Debt negotiation","Financial planner/adviser","Funeral planner/director","Home: contractor","Home: security systems","Home: window install/repair","Insurance: commercial","Insurance: life/acc/health","Insurance: prop/casualty","Mortgage: commercial","Mortgage: residential, credit bad","Mortgage: residential, credit good","Mortgage: reverse","Private investigator","Real estate agent: commercial","Real estate agent: residential","Real estate appraiser: commercial","Real estate appraiser: residential","Real estate investor: residential","Real estate: title/escrow"]
	//			 [1]                      [2]                        [3]                     [4]                        [5]
	/*[2]*/	,	[,"First name","Last name","Email","5-digit zip code","10-digit phone number","Alternate 10-digit phone","Optional notes"]
	/*[3]*/	,	[,"nameFirst" ,"nameLast" ,"email","zip"             ,"phone"                ,"phoneAlt"                ,"notes"         ]
	//			[0]           [1]    [2]
	/*[4]*/	,	["Temperature","temp","grp1"] // Reference: http://stackoverflow.com/questions/10903963/strange-behaviour-when-using-radiobutton
	//			 [1]        [2]   [3]
	/*[5]*/	,	[,"Very hot","Hot","Warm"]
	/*[6]*/	,	[,"vhot"    ,"hot","warm"]
	//			[0]      [1]      [2]
	/*[7]*/	,	["Income","income","grp2"]    // Reference: http://stackoverflow.com/questions/10903963/strange-behaviour-when-using-radiobutton
	/*[8]*/	,	[">$200k","$100-200k","$50-100k","$25-50k","<$25k"]
	/*[9]*/	,	["p80"   ,"p60"      ,"p40"     ,"p20"    ,"p0"   ]
			]}
function doGet  (){ // References : https://developers.google.com/apps-script/uiapp, https://developers.google.com/apps-script/uiapp#ServerHandlers
    var pageName = SitesApp.getActivePage().getName();switch(pageName){
            case   "account"    : return account   ();break;
            case   "deposit"    : return deposit   ();break;
            case   "withdraw"   : return withdraw  ();break;
            case   "archive"    : return archive   ();break;
            case   "management" : return management();break;
         default                :                     break;}}
// ---------------------------------------------------------------- ACCOUNT ----------------------------------------------------------------
function handleSubmitAccount(e){
    var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---2){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    var app=UiApp.getActiveApplication(),user=Session.getUser().getEmail(),db=ScriptDb.getMyDb(),r=db.query({table:"account",email:user}).next(),ob=e.parameter,csz=ob.zip.geoGoogleCsz();ob.state=csz.state;ob.city=csz.city;ob.county=csz.county;ob.addedUser=user;ob.updatedTime=new Date().getTime();ob.zips=ob.zip.getZipsInRadius(ob.radius);ob.table="account"; // Prepare save-object
    if(r){var delId=r.getId(),rcloned=JSON.parse(JSON.stringify(r));r=ob;r.count=rcloned.count;r.addedTime=rcloned.addedTime;db.save(r);db.remove(db.load(delId));} // Update existing record, if it exists // Schema... // Header: var acctSum=app.createLabel(bal+" balance, available "+avail).setId("acctSum").setTag(bal+","+avail);vpan.add(acctSum); // Body: var bal,added,owned,added=db.query({table:"deposit",addedUser:user}).getSize();owned=db.query({table:"deposit",owner:user}).getSize();bal=added-owned; // Handler: var t=p.acctSum_tag.split(",");app.getElementById("acctSum").setTag((--t[0])+","+(--t[1])).setText(t[0]+" balance, available "+t[1]);break; // Reset balance summary
    else{ob.addedTime=new Date().getTime();ob.count={"balance":0,"deposits":0,"withdrawals":0};db.save(ob);} // Else save new object // Apply stamps: user, time; // Save // Debug: app.getElementById("msg").setStyleAttribute("color","blue").setText(i+all[i]);
    app.getElementById("b0").setText("Submit");app.getElementById("pic").setVisible(false);app.getElementById("word").setVisible(false); // Reset buttons and graphics
    app.close();return app;} // Clean up, close & return — note: return is REQUIRED for widget to actually close
function account(){ // -------------------------------------------- ACCOUNT ----------------------------------------------------------------
    var app  = UiApp.createApplication(),user=Session.getUser().getEmail(),db=ScriptDb.getMyDb(),r=db.query({table:"account",email:user}).next(),grid=app.createGrid(18,6),y=0,x=0,nF="",nL="",nCo="",zip="",rad="",numBal=0,numAv=0;
               if(r){nF=r.nameFirst;nL=r.nameLast;nCo=r.nameCompany;zip=r.zip;rad=r.radius;numBal=r.count.balance;/*numAv=db.query()*/} // Set values of string variables to match existing record
    var vpan = app.createVerticalPanel().add(grid);app.add(vpan);
    var msg  = app.createLabel("Ready"    ).setId("msg" ).setVisible(false).setStyleAttribute("color","blue"      );
    var word = app.createLabel("Saving...").setId("word").setVisible(false).setStyleAttribute("color","darkorange");var SRC="https://lh4.googleusercontent.com/-4pOBrG5zrK8/UH-ftQW_-hI/AAAAAAAADfo/O4UL7jwI34I/s800/ajax-loader.gif";
    var pic  = app.createImage(SRC).setId("pic" ).setVisible(false);
    var bal  = app.createLabel(numBal+" Balance"  ).setId("bal");
 // var av   = app.createLabel(numAv +" Available").setId("av" );
    var h0   = app.createServerHandler("handleSubmitAccount").addCallbackElement(vpan);
    var b0   = app.createButton("Save",app.createClientHandler().forEventSource().setText("✔OK").forTargets([pic,word]).setVisible(true)).addClickHandler(h0).setId("b0");
    /* -------------------------------------------------------- */ // First column /* -------------------------------------------------------- */
    grid.setWidget(y++,x,b0                                                                                                   ); // Submit    button
    grid.setWidget(y++,x,pic                                                                                                  ); // Load      graphic
    grid.setWidget(y++,x,word                                                                                                 ); // Saving    notice
    grid.setWidget(y++,x,msg                                                                                                  ); // Debug     message  
    /* ---------------------------------------------------- */ y=0;x++; // Next column /* ---------------------------------------------------- */
    grid.setWidget(y++,x,app.createTextBox (                      ).setName("email"      ).setId("email"      ).setValue(user).setEnabled(false));
    grid.setWidget(y++,x,app.createCheckBox("Receive email notice").setName("byEmail"    ).setId("byEmail"    ).setValue(true));if(r){if(!r.byEmail){app.getElementById("byEmail").setValue(false)}}
    grid.setWidget(y++,x,app.createLabel   ("First name"          )                                                           );
    grid.setWidget(y++,x,app.createTextBox (                      ).setName("nameFirst"  ).setId("nameFirst"  ).setValue(nF  ));
    grid.setWidget(y++,x,app.createLabel   ("Last name"           )                                                           );
    grid.setWidget(y++,x,app.createTextBox (                      ).setName("nameLast"   ).setId("nameLast"   ).setValue(nL  ));
    grid.setWidget(y++,x,app.createLabel   ("Company name"        )                                                           );
    grid.setWidget(y++,x,app.createTextBox (                      ).setName("nameCompany").setId("nameCompany").setValue(nCo ));
    grid.setWidget(y++,x,app.createLabel   ("Zip"                 )                                                           );
    grid.setWidget(y++,x,app.createTextBox (                      ).setName("zip"        ).setId("zip"        ).setValue(zip ).setMaxLength(5));
    grid.setWidget(y++,x,app.createLabel   ("Radius in miles"     )                                                           );
    grid.setWidget(y++,x,app.createTextBox (                      ).setName("radius"     ).setId("radius"     ).setValue(rad ).setTitle("99 miles maximum")); // <iframe src="http://maps.huge.info/zipcolors.htm">.</iframe>
    grid.setWidget(y++,x,msg                                                                                                  ); // Message
    /* ---------------------------------------------------- */ y=0;x++; // Next column /* ---------------------------------------------------- */
    grid.setWidget(y++,x,bal                                                                                                  ); // Balance   notice
 // grid.setWidget(y++,x,av                                                                                                   ); // Available leads  
    grid.setWidget(y++,x,app.createLabel   ("Temperature"         )                                                           );
    grid.setWidget(y++,x,app.createCheckBox("Very hot"            ).setName("vhot"       ).setId("vhot"       ).setValue(true));if(r){if(r.vhot=="false"){app.getElementById("vhot").setValue(false)}}
    grid.setWidget(y++,x,app.createCheckBox("Hot"                 ).setName("hot"        ).setId("hot"        ).setValue(true));if(r){if(r.hot =="false"){app.getElementById("hot" ).setValue(false)}}
    grid.setWidget(y++,x,app.createCheckBox("Warm"                ).setName("warm"       ).setId("warm"       ).setValue(true));if(r){if(r.warm=="false"){app.getElementById("warm").setValue(false)}}
    grid.setWidget(y++,x,app.createLabel   ("Income"              )                                                           );
    grid.setWidget(y++,x,app.createCheckBox(">$200k"              ).setName("p80"        ).setId("p80"        ).setValue(true));if(r){if(r.p80 =="false"){app.getElementById("p80" ).setValue(false)}}
    grid.setWidget(y++,x,app.createCheckBox("$100-200k"           ).setName("p60"        ).setId("p60"        ).setValue(true));if(r){if(r.p60 =="false"){app.getElementById("p60" ).setValue(false)}}
    grid.setWidget(y++,x,app.createCheckBox("$50-100k"            ).setName("p40"        ).setId("p40"        ).setValue(true));if(r){if(r.p40 =="false"){app.getElementById("p40" ).setValue(false)}}
    grid.setWidget(y++,x,app.createCheckBox("$25-50k"             ).setName("p20"        ).setId("p20"        ).setValue(true));if(r){if(r.p20 =="false"){app.getElementById("p20" ).setValue(false)}}
    grid.setWidget(y++,x,app.createCheckBox("<$25k"               ).setName("p0"         ).setId("p0"         ).setValue(true));if(r){if(r.p0  =="false"){app.getElementById("p0"  ).setValue(false)}}
    /* ---------------------------------------------------- */ y=0;x++; // Next column /* ---------------------------------------------------- */
    var arr=leadbankArrays(),len=arr[1].length;for(i=1;i<len;i++){grid.setWidget(y++,x,app.createCheckBox(arr[1][i]).setName("s"+i).setId("s"+i));if(r){if(r[("s"+i)]=="true"){app.getElementById("s"+i).setValue(true)}};if(i==12||i==23){y=0;x++;}/*Next column*/}
    return app;} // Display
// ---------------------------------------------------------------- DEPOSIT ----------------------------------------------------------------
function handleSubmitDeposit(e){
    var LOAD=["https://sites.google.com/site/itr5k9zw23yzmxuaf5nb399c0ywb98/home/jsLoad.js","googleScripts"];eval(UrlFetchApp.fetch(LOAD[0]).getContentText());var files=load(LOAD[1]);var i=files.length;while(i---2){eval(UrlFetchApp.fetch(files[i]).getContentText())}
    var app=UiApp.getActiveApplication(),db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),u=db.query({table:"account",email:user}).next(),ob=e.parameter,csz=ob.zip.geoGoogleCsz(),t=[],rad=[],ra=[],cat=[],tst,i=35; // i must equal number of check box fields PLUS ONE  // Copy all event parameter properties to save-object
    ob.table="deposit";ob.has_owner=false;ob.addedUser=user;ob.addedTime=new Date().getTime();ob.state=csz.state;ob.city=csz.city;ob.county=csz.county; // Add new parameters // Apply stamps: user, time; // Save // Debug: app.getElementById("msg").setText("A").setVisible(true);
    while(i---1){tst=("s"+i);if(ob[tst]=="true"){cat.push(tst)}} // tst="s1","s2",...,"s34" // cat=["s4","s7"] if s4 and s7 were checked // Get each sx=true; push each to array; 
    i=cat.length;u.count.balance+=i;u.count.deposits+=i;db.save(u);while(i--){ob.category={"code":cat[i]/*,"name":"real estate agent"*/};db.save(ob);} // for each element in the array, save a new object; {"category":{"code":"sx","name":"real estate agent"}}
    t=["notes","phoneAlt","phone","zip","email","nameLast","nameFirst"];i=t  .length;while(i--){app.getElementById(  t[i]).setValue(""   );} // Reset text
                                                                        i=cat.length;while(i--){app.getElementById(cat[i]).setValue(false);} // Reset check boxes
    ra=["vhot","hot","warm","p80","p60","p40","p20","p0"];              i=ra .length;while(i--){app.getElementById( ra[i]).setValue(false);} // Reset radio buttons
    rad=["income","temp"];                                              i=rad.length;while(i--){app.getElementById(rad[i]).setValue(""   );} // Reset radio buttons summary
    app.getElementById("b0" ).setText("Submit");app.getElementById("pic").setVisible(false);app.getElementById("word").setVisible(false);    // Reset buttons and graphics
    app.getElementById("bal").setText(u.count.balance+" Balance");
    app.close();return app;} // Clean up, close & return — note: return is REQUIRED for widget to actually close
function deposit(){ // -------------------------------------------- DEPOSIT ----------------------------------------------------------------
    var app  = UiApp.createApplication(),user=Session.getUser().getEmail(),db=ScriptDb.getMyDb(),u=db.query({table:"account",email:user}).next(),grid=app.createGrid(70,10),y=0,x=0,numBal=0,numAv=0,radioValue1,radioHandle1,radioValue2,radioHandle2;if(u){numBal=u.count.balance;}
    var vpan = app.createVerticalPanel().add(grid);app.add(vpan);
    var msg  = app.createLabel("Ready"    ).setId("msg" ).setVisible(false).setStyleAttribute("color","blue"      );
    var word = app.createLabel("Saving...").setId("word").setVisible(false).setStyleAttribute("color","darkorange");var SRC="https://lh4.googleusercontent.com/-4pOBrG5zrK8/UH-ftQW_-hI/AAAAAAAADfo/O4UL7jwI34I/s800/ajax-loader.gif";
    var pic  = app.createImage(SRC).setId("pic" ).setVisible(false);
    var bal  = app.createLabel(numBal+" Balance"  ).setId("bal");
 // var av   = app.createLabel(numAv +" Available").setId("av" );
    var h0   = app.createServerHandler("handleSubmitDeposit").addCallbackElement(vpan);
    var b0   = app.createButton("Submit",app.createClientHandler().forEventSource().setText("✔OK").forTargets([pic,word]).setVisible(true)).addClickHandler(h0).setId("b0");
    /* -------------------------------------------------------- */ // First column /* -------------------------------------------------------- */
    grid.setWidget(y++,x,b0                                                                                    ); // Submit button
    grid.setWidget(y++,x,pic                                                                                   ); // Load   graphic
    grid.setWidget(y++,x,word                                                                                  ); // Saving notice
    grid.setWidget(y++,x,msg                                                                                   ); // Debug  message
    /* ---------------------------------------------------- */ y=0;x++; // Next column /* ---------------------------------------------------- */
    grid.setWidget(y++,x,app.createLabel   ("First name"              )                                        );
    grid.setWidget(y++,x,app.createTextBox (                          ).setName("nameFirst").setId("nameFirst"));
    grid.setWidget(y++,x,app.createLabel   ("Last name"               )                                        );
    grid.setWidget(y++,x,app.createTextBox (                          ).setName("nameLast" ).setId("nameLast" ));
    grid.setWidget(y++,x,app.createLabel   ("Email"                   )                                        );
    grid.setWidget(y++,x,app.createTextBox (                          ).setName("email"    ).setId("email"    ));
    grid.setWidget(y++,x,app.createLabel   ("Zip"                     )                                        );
    grid.setWidget(y++,x,app.createTextBox (                          ).setName("zip"      ).setId("zip"      ).setMaxLength( 5).setTitle("5-digit zip code"));
    grid.setWidget(y++,x,app.createLabel   ("Phone"                   )                                        );
    grid.setWidget(y++,x,app.createTextBox (                          ).setName("phone"    ).setId("phone"    ).setMaxLength(10).setTitle("10-digits e.g., 2125551212"));
    grid.setWidget(y++,x,app.createLabel   ("Alt phone"               )                                        );
    grid.setWidget(y++,x,app.createTextBox (                          ).setName("phoneAlt" ).setId("phoneAlt" ).setMaxLength(10).setTitle("10-digits e.g., 2125551212"));
    grid.setWidget(y++,x,app.createLabel   ("Optional notes"          )                                        );
    grid.setWidget(y++,x,app.createTextArea(                          ).setName("notes"    ).setId("notes"    ));
    /* ---------------------------------------------------- */ y=0;x++; // Next column /* ---------------------------------------------------- */
    grid.setWidget(y++,x,bal                                       ); // Balance   notice
 // grid.setWidget(y++,x,av                                        ); // Available leads 
    // ----------------- Radio buttons -----------------
    // Group 1
    grid.setWidget(y++,x,app.createLabel        ("Temperature"    ));radioValue1=app.createTextBox().setId("temp"  /*"radioValue1"*/).setName("temp"  /*"radioValue1"*/).setVisible(false);vpan.add(radioValue1); // Reference: http://stackoverflow.com/questions/10903963/strange-behaviour-when-using-radiobutton
            radioHandle1=app.createClientHandler(                  ).forTargets(radioValue1).setText("vhot");
    grid.setWidget(y++,x,app.createRadioButton  ("grp1","Very hot" ).setId("vhot").addValueChangeHandler(radioHandle1));
            radioHandle1=app.createClientHandler(                  ).forTargets(radioValue1).setText("hot" );
    grid.setWidget(y++,x,app.createRadioButton  ("grp1","Hot"      ).setId("hot" ).addValueChangeHandler(radioHandle1));
            radioHandle1=app.createClientHandler(                  ).forTargets(radioValue1).setText("warm");
    grid.setWidget(y++,x,app.createRadioButton  ("grp1","Warm"     ).setId("warm").addValueChangeHandler(radioHandle1));
    // Group 2
    grid.setWidget(y++,x,app.createLabel        ("Income"         ));radioValue2=app.createTextBox().setId("income"/*"radioValue2"*/).setName("income"/*"radioValue2"*/).setVisible(false);vpan.add(radioValue2); // Reference: http://stackoverflow.com/questions/10903963/strange-behaviour-when-using-radiobutton
            radioHandle2=app.createClientHandler(                  ).forTargets(radioValue2).setText("p80" );
    grid.setWidget(y++,x,app.createRadioButton  ("grp2",">$200k"   ).setId("p80").addValueChangeHandler(radioHandle2));
            radioHandle2=app.createClientHandler(                  ).forTargets(radioValue2).setText("p60" );
    grid.setWidget(y++,x,app.createRadioButton  ("grp2","$100-200k").setId("p60").addValueChangeHandler(radioHandle2));
            radioHandle2=app.createClientHandler(                  ).forTargets(radioValue2).setText("p40" );
    grid.setWidget(y++,x,app.createRadioButton  ("grp2","$50-100k" ).setId("p40").addValueChangeHandler(radioHandle2));
            radioHandle2=app.createClientHandler(                  ).forTargets(radioValue2).setText("p20" );
    grid.setWidget(y++,x,app.createRadioButton  ("grp2","$25-50k"  ).setId("p20").addValueChangeHandler(radioHandle2));
            radioHandle2=app.createClientHandler(                  ).forTargets(radioValue2).setText("p0"  );
    grid.setWidget(y++,x,app.createRadioButton  ("grp2","<$25k"    ).setId("p0" ).addValueChangeHandler(radioHandle2));
    /* ---------------------------------------------------- */ y=0;x++; // Next column /* ---------------------------------------------------- */
    var arr=leadbankArrays(),len=arr[1].length;for(i=1;i<len;i++){grid.setWidget(y++,x,app.createCheckBox(arr[1][i]).setName("s"+i).setId("s"+i));if(i==12||i==23){y=0;x++;}/*Next column*/}
    return app;} // Display
// ---------------------------------------------------------------- WITHDRAW ----------------------------------------------------------------
function handleSubmitWithdraw(e){ // e is event information // We will extract .parameter properties from e // Reference: https://developers.google.com/apps-script/class_serverhandler#addCallbackElement // Reference: https://sites.google.com/site/appsscripttutorial/miscellaneous/creating-form-elements-dynamically-using-google-apps-script-gas
    var app=UiApp.getActiveApplication(),user=Session.getUser().getEmail(),d=new Date().getTime(),p=e.parameter,tag=p.source.split(","),db=ScriptDb.getMyDb(),r=db.load(tag[0]),u=db.query({table:"account",email:user}).next(); // setId(r.getId()+","+j) // tag[0] db record ID (e.g., "S20431525059"); tag[1] row (e.g., 7); tag[2] field type (e.g., "offer", "repair");
    switch(tag[2]){
        case "button":
            r.has_owner=true;r.owner=user;db.save(r);--u.count.balance;++u.count.withdrawals;db.save(u); // Assign lead ownership // Update account balances
            app.getElementById("acctSum").setTag(--p.acctSum_tag).setText(u.count.balance+" balance, available "+p.acctSum_tag);break; // Reset balance summary
        case "flag":r.flag=p[("flagMenu"+tag[1])];break;} // Attach flag
    app.close();return app;}
function withdraw(){ // ------------------------------------------- WITHDRAW ----------------------------------------------------------------
    var db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),u=db.query({table:"account",email:user}).next(),d=new Date().getTime(),
        avail,ref,k,j,i,x,button=[],labelName=[],labelPhone=[],labelAlt=[],labelEmail=[],preview=[],flagMenu=[],flagButton=[],
        r,result,ziplist=[],uCat=[],uTem=[],uInc=[],CAT=[],TEM=["vhot","hot","warm"],INC=["p80","p60","p40","p20","p0"];
        i=35           ;while(i---1){               CAT[i] =  ("s"+ i )    }
        i=CAT   .length;while(i--  ){if(u[CAT[i]]){uCat[i] =  u[CAT[i]]   }}
        i=TEM   .length;while(i--  ){if(u[TEM[i]]){uTem.push(   TEM[i])   }};uTem.push(""); // Case: No selection
        i=INC   .length;while(i--  ){if(u[INC[i]]){uInc.push(   INC[i])   }};uInc.push(""); // Case: No selection
        i=u.zips.length;while(i--  ){           ziplist.push(u.zips[i].zip)}
        result=db.query({table:"deposit",has_owner:false,/*zip:db.anyOf(ziplist),*/temp:db.anyOf(uTem),income:db.anyOf(uInc)/*,
                         category:{code:db.anyOf(uCat)}*/}).sortBy("addedDate",db.DESCENDING,db.NUMERIC);avail=result.getSize();
    var app      = UiApp.createApplication();
    var form     = app.createFormPanel    ();
    var scr      = app.createScrollPanel  ().setSize("100%","5000");
    var vpan     = app.createVerticalPanel();var acctSum=app.createLabel(u.count.balance+" balance, available "+avail).setTag(avail).setId("acctSum");vpan.add(acctSum);
    var tab      = app.createFlexTable    ().setBorderWidth(1);vpan.add(tab);scr.add(vpan);form.add(scr);app.add(form);
    var handler  = app.createServerHandler("handleSubmitWithdraw").addCallbackElement(vpan);
    var HEAD     = ["Timestamp","Location","Needs","Temp","Income","From","At","Qual","Own it!","Name","Phone","Alt phone","Email","Problem?","Reason"];
    var STYLPATT = ["white","white","white","white","#FFD199","white","white","white"];var patlen=STYLPATT.length;         // Color pattern // www.w3schools.com/tags/ref_colorpicker.asp // #FF8C00 (darkorange), #FFE8CC (lighter shade)
    function writeHead(row,arr){var ii=arr.length;while(ii--){tab.setText          (row,ii,arr[ii]                       ) // Write header row
                                                                 .setStyleAttribute(row,ii,"backgroundColor","darkorange")
                                                                 .setStyleAttribute(row,ii,"color"          ,"white"     )
                                                                 .setStyleAttribute(row,ii,"fontWeight"     ,"bold"      );}}
    j=0;while(result.hasNext()){                                                  // Start row counter // Load records
        r=result.next();ref=db.query({table:"account",email:r.addedUser}).next(); // Fetch referrer
        if(j%patlen==0){writeHead(j,HEAD)}                                        // Write header row if proper spacing
        else{
            labelName [j] = app.createLabel  (r.nameFirst+" "+r.nameLast       ).setVisible(false);
            labelPhone[j] = app.createLabel  (r.phone                          ).setVisible(false);
            labelAlt  [j] = app.createLabel  (r.phoneAlt                       ).setVisible(false);
            labelEmail[j] = app.createLabel  (r.email                          ).setVisible(false);
            flagMenu  [j] = app.createListBox(                                 ).setVisible(false).setName("flagMenu"+j).setId("flagMenu"+j)
                                                                                .addItem("-Select one-" )
                                                                                .addItem("No interest"  )
                                                                                .addItem("No permission")
                                                                                .addItem("Bad number"   )
                                                                                .addItem("Temp/income"  )
                                                                                .addItem("Other"        );
            flagButton[j] = app.createButton ("Flag►" ,app.createClientHandler().forEventSource().setText("✔OK")                                                                                                              ).addClickHandler(handler).setId(r.getId()+","+j+",flag"  ).setVisible(false);
            button    [j] = app.createButton ("View »",app.createClientHandler().forEventSource().setText("✔OK").forTargets([labelName[j],labelPhone[j],labelAlt[j],labelEmail[j],flagMenu[j],flagButton[j]]).setVisible(true)).addClickHandler(handler).setId(r.getId()+","+j+",button")                  ;
            preview=[(Math.floor((d-r.addedTime)/(1000*60*60*24))+" days ago" ),r.zip,"tbd",r.temp,r.income,(ref.nameFirst+" "+ref.nameLast),ref.company,"tbd"]
            k=preview.length;i=k;while(i--){x=preview[i];
                tab.setWidget(j,i,app.createLabel(x)).setStyleAttribute(j,i  ,"backgroundColor",STYLPATT[j%patlen]);}i=k;
                tab.setWidget(j,i,button         [j]).setStyleAttribute(j,i++,"backgroundColor",STYLPATT[j%patlen]);
                tab.setWidget(j,i,labelName      [j]).setStyleAttribute(j,i++,"backgroundColor",STYLPATT[j%patlen]);
                tab.setWidget(j,i,labelPhone     [j]).setStyleAttribute(j,i++,"backgroundColor",STYLPATT[j%patlen]);
                tab.setWidget(j,i,labelAlt       [j]).setStyleAttribute(j,i++,"backgroundColor",STYLPATT[j%patlen]);
                tab.setWidget(j,i,labelEmail     [j]).setStyleAttribute(j,i++,"backgroundColor",STYLPATT[j%patlen]);
                tab.setWidget(j,i,flagButton     [j]).setStyleAttribute(j,i++,"backgroundColor",STYLPATT[j%patlen]);
                tab.setWidget(j,i,flagMenu       [j]).setStyleAttribute(j,i++,"backgroundColor",STYLPATT[j%patlen]);
        }j++;}return app;}
// ---------------------------------------------------------------- ARCHIVE -----------------------------------------------------------------
function handleSubmitArchive(e){
}
function archive(){ // -------------------------------------------- ARCHIVE -----------------------------------------------------------------
    var db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),u=db.query({table:"account",email:user}).next(),d=new Date().getTime(),
        avail,ref,k,j,i,x,r,button=[],labelName=[],labelPhone=[],labelAlt=[],labelEmail=[],view=[],flagMenu=[],flagButton=[],
        result=db.query({table:"deposit",has_owner:true,owner:user}).sortBy("addedDate",db.DESCENDING,db.NUMERIC);avail=result.getSize();
    var app      = UiApp.createApplication();
    var form     = app.createFormPanel    ();
    var scr      = app.createScrollPanel  ().setSize("100%","5000");
    var vpan     = app.createVerticalPanel();var acctSum=app.createLabel(u.count.balance+" balance, available "+avail).setTag(avail).setId("acctSum");vpan.add(acctSum);
    var tab      = app.createFlexTable    ().setBorderWidth(1);vpan.add(tab);scr.add(vpan);form.add(scr);app.add(form);
    var handler  = app.createServerHandler("handleSubmitArchive").addCallbackElement(vpan);
    var HEAD     = ["Timestamp","Location","Needs","Temp","Income","From","At","Qual","Name","Phone","Alt phone","Email"/*,"Problem?","Reason"*/];
    var STYLPATT = ["white","white","white","white","#FFD199","white","white","white"];var patlen=STYLPATT.length;         // Color pattern // www.w3schools.com/tags/ref_colorpicker.asp // #FF8C00 (darkorange), #FFE8CC (lighter shade)
    function writeHead(row,arr){var ii=arr.length;while(ii--){tab.setText          (row,ii,arr[ii]                       ) // Write header row
                                                                 .setStyleAttribute(row,ii,"backgroundColor","darkorange")
                                                                 .setStyleAttribute(row,ii,"color"          ,"white"     )
                                                                 .setStyleAttribute(row,ii,"fontWeight"     ,"bold"      );}}
    j=0;while(result.hasNext()){                                                  // Start row counter // Load records
        r=result.next();ref=db.query({table:"account",email:r.addedUser}).next(); // Fetch referrer
        if(j%patlen==0){writeHead(j,HEAD)}                                        // Write header row if proper spacing
        else{
            view=[(Math.floor((d-r.addedTime)/(1000*60*60*24))+" days ago" ),r.zip,"tbd",r.temp,r.income,(ref.nameFirst+" "+ref.nameLast),ref.company,"tbd",(r.nameFirst+" "+r.nameLast),r.phone,r.phoneAlt,r.email]
            k=view.length;i=k;while(i--){x=view[i];tab.setWidget(j,i,app.createLabel(x)).setStyleAttribute(j,i,"backgroundColor",STYLPATT[j%patlen]);}i=k;
        }j++;}return app;}
// ---------------------------------------------------------------- MANAGEMENT ----------------------------------------------------------------
function handleSubmitManagement(e){
}
function management(){ // ----------------------------------------- MANAGEMENT ----------------------------------------------------------------
    var db=ScriptDb.getMyDb(),user=Session.getUser().getEmail(),u=db.query({table:"account",email:user}).next(),d=new Date().getTime(),avail,j,i,x,r,view=[],
        result=db.query({table:"deposit",has_owner:false}).sortBy("addedDate",db.DESCENDING,db.NUMERIC);//avail=result.getSize();
    var app      = UiApp.createApplication();
    var form     = app.createFormPanel    ();
    var scr      = app.createScrollPanel  ().setSize("100%","5000");
    var vpan     = app.createVerticalPanel();var acctSum=app.createLabel(u.count.balance+" balance, available "+avail).setTag(avail).setId("acctSum");vpan.add(acctSum);
    var tab      = app.createFlexTable    ().setBorderWidth(1);vpan.add(tab);scr.add(vpan);form.add(scr);app.add(form);
    var handler  = app.createServerHandler("handleSubmitArchive").addCallbackElement(vpan);
    var HEAD     = ["Timestamp","Location","Needs","Temp","Income","From","At","Qual","Name","Phone","Alt phone","Email"/*,"Problem?","Reason"*/];
    var STYLPATT = ["white","white","white","white","#FFD199","white","white","white"];var patlen=STYLPATT.length;         // Color pattern // www.w3schools.com/tags/ref_colorpicker.asp // #FF8C00 (darkorange), #FFE8CC (lighter shade)
    function writeHead(row,arr){var ii=arr.length;while(ii--){tab.setText          (row,ii,arr[ii]                       ) // Write header row
                                                                 .setStyleAttribute(row,ii,"backgroundColor","darkorange")
                                                                 .setStyleAttribute(row,ii,"color"          ,"white"     )
                                                                 .setStyleAttribute(row,ii,"fontWeight"     ,"bold"      );}}
    j=0;while(result.hasNext()){if(j%patlen==0){writeHead(j,HEAD)}else{r=result.next(); // Start row counter // Load records// Write header row if proper spacing
            view=[(Math.floor((d-r.addedTime)/(1000*60*60*24))+" days ago"),r.zip,"tbd",r.temp,r.income,(ref.nameFirst+" "+ref.nameLast),ref.company,"tbd",(r.nameFirst+" "+r.nameLast),r.phone,r.phoneAlt,r.email]
            i=view.length;while(i--){x=view[i];tab.setWidget(j,i,app.createLabel(x)).setStyleAttribute(j,i,"backgroundColor",STYLPATT[j%patlen]);}}j++;}return app;}
