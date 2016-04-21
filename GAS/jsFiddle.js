/*<!--@ref https://sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jsFiddle.js | http://jsfiddle.net/q47a7/58/show/ | http://code.google.com/apis/ajax/playground/ | https://developers.google.com/adwords/api/docs/appendix/cities-DMAregions -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>Charts</title>
    <script type="text/javascript" src="http://www.google.com/jsapi"></script><!--Fails to load all elements:<script type="text/javascript" src='https://www.google.com/jsapi?autoload={"modules":[{"name":"visualization","version":"1"}]}'></script>-->
    <script type="text/javascript">*/
      google.load("visualization","1",{packages:["controls","table","corechart","charteditor","geomap","intensitymap"]}); // "treemap"
      var wrapper,ACT="https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?k=jj860hvegjp1xxy7pvv1&callback=drawVisualization",ctrl=[],chart=[],c,i,cbo,cbn,script=document.createElement("script");script.src=ACT;script.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(script);
	//function editChart(){var editor=new google.visualization.ChartEditor();google.visualization.events.addListener(editor,"ok",function(){wrapper=editor.getChartWrapper();wrapper.draw(document.getElementById("co"));});editor.openDialog(wrapper);}
	  function drawVisualization(){// Tree Map: var $dar=new google.visualization.data.group(dat,[arguments[0][0].indexOf("City")],[{column:arguments[0][0].indexOf("City"),aggregation:google.visualization.data.count,type:"number"}]);var $tre=new google.visualization.ChartWrapper({chartType:"TreeMap",containerId:"tr",dataTable:$dar,view:{columns:[7,8]},options:{maxDepth:1,minColor:"red",midColor:"#ddd",maxColor:"#0d0",headerHeight:15,fontColor:"black",showScale:true}});$tre.draw(); // IntensityMap: var mapdat2=google.visualization.arrayToDataTable(arguments[0]);var map2=new google.visualization.IntensityMap(document.getElementById("chart6"));map2.draw(mapdat2,null);var tabmap2=new google.visualization.ChartWrapper({"chartType":"Table","containerId":"chart7",dataTable:mapdat2});tabmap2.draw();
        var  dat=new google.visualization.DataTable(arguments[0]),hdrs=[],i=arguments[0].cols.length;while(i--){hdrs.unshift(arguments[0].cols[i].id)};//dat=new google.visualization.arrayToDataTable(arguments[0]);//replace: arguments[0][0] with: hdrs//([["Name","Gender","Age","Donuts eaten"],["Michael","Male",12,5],["Elisa","Female",20,7],["Robert","Male",7,3],["John","Male",54,2],["Jessica","Female",22,6],["Aaron","Male",3,1],["Margareth","Female",42,8],["Miranda","Female",33,6]]);
		var  dav=new google.visualization.DataView(dat),ro,rn=dat.getFilteredRows([{column:hdrs.indexOf("Own"),value:"none"}]);dav.hideRows(rn);ro=dav.getViewRows();
		var $dat=new google.visualization.data.group(dav,[hdrs.indexOf("Own")],[{column:hdrs.indexOf("Own"),aggregation:google.visualization.data.count,type:"number"}]);//(dat,[1],[{column:3,aggregation:google.visualization.data.sum,type:"number"}]);
		var $dam=new google.visualization.data.group(dav,[hdrs.indexOf("Geo")],[{column:hdrs.indexOf("Geo"),aggregation:google.visualization.data.count,type:"number"}]);//Tried: dav.toDataTable()...
		var $dac=new google.visualization.data.group(dav,[hdrs.indexOf("Pre")],[{column:hdrs.indexOf("Pre"),aggregation:google.visualization.data.count,type:"number"}]);
		var   $f=new google.visualization.TableBarFormat({width:120});$f.format($dat,1);
		       c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c1",options:{filterColumnLabel:"Own"        ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"Owner"      }}});ctrl.push(c);
               c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c2",options:{filterColumnLabel:"St"         ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"State"      }}});ctrl.push(c);
		       c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c3",options:{filterColumnLabel:"City"       ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"City"       }}});ctrl.push(c);
		       c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c4",options:{filterColumnLabel:"T"          ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"Temperature"}}});ctrl.push(c);
		       c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c5",options:{filterColumnLabel:"Disposition",ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"Disposition"}}});ctrl.push(c);
		       c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c6",options:{filterColumnLabel:"Company"    ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"Company"    }}});ctrl.push(c);
		       c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c7",options:{filterColumnLabel:"Phone"      ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"Phone"      }}});ctrl.push(c);		
		       c=new google.visualization.ControlWrapper({controlType:"NumberRangeFilter",containerId:"s1",options:{filterColumnLabel:"ID"         ,ui:{labelStacking:"vertical"                                                                   }}});ctrl.push(c);
		       c=new google.visualization.ControlWrapper({controlType:"NumberRangeFilter",containerId:"s2",options:{filterColumnLabel:"Pre"        ,ui:{labelStacking:"vertical"                                                                   }}});ctrl.push(c);
		       c=new google.visualization.ControlWrapper({controlType:"NumberRangeFilter",containerId:"s3",options:{filterColumnLabel:"E"          ,ui:{labelStacking:"vertical"                                                                   }}});ctrl.push(c);
		       c=new google.visualization.ControlWrapper({controlType:"NumberRangeFilter",containerId:"s4",options:{filterColumnLabel:"Nex"        ,ui:{labelStacking:"vertical"                                                                   }}});ctrl.push(c);		
		   	   c=new google.visualization.ControlWrapper({controlType:"ChartRangeFilter" ,containerId:"s5",options:{filterColumnIndex:hdrs.indexOf("Pre"),ui:{chartType:"ScatterChart",chartOptions:{chartArea:{width:"100%",height:20},pointSize:1,hAxis:{viewWindowMode:"maximized",baselineColor:"none"}},chartView:{columns:[hdrs.indexOf("Pre"),hdrs.indexOf("Nex")]}}},state:{range:{start:-1}}});ctrl.push(c);
	//	wrapper =new google.visualization.  ChartWrapper({  chartType:"ColumnChart"      ,containerId:"co",dataTable:$dac,options:{title:"Daily Volume",theme:"maximized",animation:{duration:3000,easing:"inAndOut"}}});wrapper.draw();
		var   sc=new google.visualization.  ChartWrapper({  chartType:"ScatterChart"     ,containerId:"sc",dataTable: dav,view:{columns:[hdrs.indexOf("Pre"),hdrs.indexOf("Nex")]},options:{theme:"maximized",hAxis:{viewWindowMode:"maximized"},animation:{duration:3000,easing:"inAndOut"}}});chart.push(sc);
		var  tab=new google.visualization.  ChartWrapper({  chartType:"Table"            ,containerId:"tu",options:{allowHtml:true,page:"enable",pageSize:30,showRowNumber:true}});chart.push(tab);//var  tab=new google.visualization.Table(document.getElementById("tu"));tab.draw(dat,{view:{columns:[0,1,2,3,4,5,6,7,8,9,10],rows:[1,5,10,15,25,35]},showRowNumber:true,page:"enable",pageSize:20,pagingSymbols:{prev:"<<",next:">>"},pagingButtonsConfiguration:"both"}); // Call, draw and bind manually because chart wrapper does not throw "select" event yet//google.visualization.events.addListener(tab,"select",handleSel);//function handleSel(event){alert("A");alert(JSON.stringify(con.getSelection()));}//handler(){...tab.setDataTable( dat);//tab.draw(dat,{showRowNumber:true,page:"enable",pageSize:20,pagingSymbols:{prev:"<<",next:">>"},pagingButtonsConfiguration:"both"});...}
		var $tab=new google.visualization.  ChartWrapper({  chartType:"Table"            ,containerId:"tg",dataTable:$dat,options:{sortColumn:1,sortAscending:false,allowHtml:true,page:"enable",pageSize:10,showRowNumber:false}});$tab.draw();
        var $pi1=new google.visualization.  ChartWrapper({  chartType:"PieChart"         ,containerId:"pi",dataTable:$dat,options:{title:"Made By",width:300,height:300,legend:"none",pieSliceText:"label"}});$pi1.draw(); //options{...,chartArea:{left:15,top:15,right:0,bottom:0}...},view:{columns:[1,2]}... //var $pi2=new google.visualization.ChartWrapper({chartType:"PieChart",containerId:"chart42",dataTable:$dat ,options:{title:"Next"  ,width:300 ,height:300,legend:"none",chartArea:{left:15,top:15,right:0,bottom:0},pieSliceText:"label"}});$pi2.draw(); //options{...},view:{columns:[1,3]}... // var $pie=new google.visualization.ChartWrapper({chartType:"PieChart",containerId:"chart4" ,dataTable:$dat ,options:{title:"Donuts",width:300 ,height:300,legend:"none",chartArea:{left:15,top:15,right:0,bottom:0},pieSliceText:"label"}});$pie.draw();//var  pie=new google.visualization.ChartWrapper({chartType:"PieChart",containerId:"chart1" ,  options:{width:300,height:300,legend:"none",title:"Donuts eaten per person",chartArea:{left:15,top:15,right:0,bottom:0},pieSliceText:"label"},view:{columns:[0,3]}});//group the data for the pie chart and draw it
		var $geo=new google.visualization.  ChartWrapper({  chartType:"GeoMap"           ,containerId:"ge",dataTable:$dam,options:{title:"Call Locations",region:"US",dataMode:"regions"}});$geo.draw(); //var $dam=new google.visualization.DataView($dat);$dam.setColumns([hdrs.indexOf("Geo"),hdrs.indexOf("<Str name of grouped col in $dat>")]); var $geo=new google.visualization.GeoMap(document.getElementById("chart5"));$geo.draw($dam,{region:"US",dataMode:"regions"}); // GeoMap: var mapdata=google.visualization.arrayToDataTable([["State","Vol"],["US-CA",200],["US-TX",300],["US-FL",400],["US-MA",500],["US-VA",600],["US-WA",700]]);
		var $col=new google.visualization.  ChartWrapper({  chartType:"ColumnChart"      ,containerId:"co",dataTable:$dac,options:{title:"Daily Volume",theme:"maximized",animation:{duration:3000,easing:"inAndOut"}}});$col.draw(); //options{...,height:300,width:600,vAxis:{title:"Volume"},hAxis:{title:"Pre"}}
		var dash=new google.visualization.Dashboard(document.getElementById("dashboard")).bind(ctrl,chart);dash.draw(dav);i=ctrl.length;while(i--){google.visualization.events.addListener(ctrl[i],"statechange",handleCtrl);} // Bind charts, controls and listenters
																																				   google.visualization.events.addListener(dash   ,"ready"      ,handleDash);
        function handleCtrl(){$dat=google.visualization.data.group(dav,[hdrs.indexOf("Own")],[{column:hdrs.indexOf("Own"),aggregation:google.visualization.data.count,type:"number"}]);$f.format($dat,1);//.sum
							  $dam=google.visualization.data.group(dav,[hdrs.indexOf("Geo")],[{column:hdrs.indexOf("Geo"),aggregation:google.visualization.data.count,type:"number"}]);
							  $dac=google.visualization.data.group(dav,[hdrs.indexOf("Pre")],[{column:hdrs.indexOf("Pre"),aggregation:google.visualization.data.count,type:"number"}]);
							  $tab.setDataTable($dat);$tab.draw();$pi1.setDataTable($dat);$pi1.draw();$geo.setDataTable($dam);$geo.draw();$col.setDataTable($dac);$col.draw();}
		function handleDash(){document.getElementById("r11")    .onclick=function(){alert("Pre = working now. Enjoy."                             )                                             ;}
							  document.getElementById("r12")    .onclick=function(){alert("E = not yet, coming soon. Stay tuned."                 )                                             ;}
							  document.getElementById("r13")    .onclick=function(){alert("Nex = not yet, coming soon. Stay tuned."               )                                             ;}
							  document.getElementById("r21")    .onclick=function(){sc.setView({columns:[hdrs.indexOf("Pre"),hdrs.indexOf("Nex")]})                 ;dash.draw(dav)             ;}
							  document.getElementById("r22")    .onclick=function(){sc.setView({columns:[hdrs.indexOf("Pre"),hdrs.indexOf("E"  )]})                 ;dash.draw(dav)             ;}
							  document.getElementById("r23")    .onclick=function(){sc.setView({columns:[hdrs.indexOf("E"  ),hdrs.indexOf("Nex")]})                 ;dash.draw(dav)             ;}
						  cbo=document.getElementById("cbo");cbo.onclick=function(){if(cbo.checked){dav.setRows(ro.concat(dav.getViewRows()))}else{dav.hideRows(ro)};dash.draw(dav);handleCtrl();}
						  cbn=document.getElementById("cbn");cbn.onclick=function(){if(cbn.checked){dav.setRows(rn.concat(dav.getViewRows()))}else{dav.hideRows(rn)};dash.draw(dav);handleCtrl();}}
      }//google.setOnLoadCallback(drawVisualization); Eliminate per JSONP callback @http://code.google.com/apis/ajax/playground/#jsonp
  /*</script>
  <style type="text/css">var{display:none;}a:hover{color:#666666;background:#FFFFCC;text-decoration:none;}a:hover var{display:block;position:absolute;right:10px;top:50px;border:1px solid #000;text-align:center;z-index:2;}p{position:relative;z-index:1}</style><!--@http://www.sitepoint.com/forums/showthread.php?337478-Rollover-with-popup-how-is-it-done @http://www.pmob.co.uk/temp/disjointedcssrollover3.htm Note: Replaced <span> with <var> to prevent interference-->
  </head>
  <body style="font-family:arial;font-size:small;border:0 none;">
	<div id="dashboard">
	  <table border="1" width="100%" style="text-align:center;vertical-align:middle"><tbody><!--<colgroup><col width="100"><col><col><col></colgroup>-->
		<tr>
		  <td>
		    <input type="radio" name="radset1" id="r11" checked> Pre </input>
		    <input type="radio" name="radset1" id="r12"        > E   </input>
			<input type="radio" name="radset1" id="r13"        > Nex </input></td>
		  <td rowspan="2"><div id="pi" style="float:left;"></div></td>
		  <td rowspan="2"><div><form><input type="checkbox" title="show" value="own"  id="cbo" xonclick="var ic;if(this.checked){ic=this.value}else{ic=''}alert(ic);" checked> own  </input> <!-- <input ... checked> Instead of: <script>...document.getElementById("cbo").checked=true;...</script> -->
		                             <input type="checkbox" title="show" value="none" id="cbn" xonclick="var ic;if(this.checked){ic=this.value}else{ic=''}alert(ic);"        > none </input></form></div><br>
		                  <div id="tg" style="float:left;"></div></td>
		  <td rowspan="3" style="vertical-align:top">
			<div id="ge" style="height:250px;"></div>
			<div align="right"><p><a target="_blank" href="https://lh6.googleusercontent.com/-rIdtXiBwe0U/UJ7JR_SYrNI/AAAAAAAADzk/BNM7XoAFOfw/s1600/U.S.%2520Sales%2520Regions.png"><img src="https://lh6.googleusercontent.com/-rIdtXiBwe0U/UJ7JR_SYrNI/AAAAAAAADzk/BNM7XoAFOfw/s144/U.S.%2520Sales%2520Regions.png" height="35"> 
			  <var><img src="https://lh6.googleusercontent.com/-rIdtXiBwe0U/UJ7JR_SYrNI/AAAAAAAADzk/BNM7XoAFOfw/s800/U.S.%2520Sales%2520Regions.png" height="400"></var></a></p></div></td></tr>
		<tr><td><div id="co" style="width:400px;            "></div>
				<div id="s5" style="width:400px;height:20px;"></div></td></tr>
		<tr>
		  <td>
		    <input type="radio" name="radset2" id="r21" checked> Pre/Nex </input>
		    <input type="radio" name="radset2" id="r22"        > Pre/E   </input>
			<input type="radio" name="radset2" id="r23"        > E/Nex   </input></td>
		  <td rowspan="2"><div id="s1"></div><br><div id="s2"></div><br><div id="s3"></div><br><div id="s4"></div></td>
		  <td rowspan="2"><div id="c1"></div><div id="c2"></div><div id="c3"></div><div id="c4"></div><div id="c5"></div><div id="c6"></div><div id="c7"></div></td></tr>
		<tr><td><div id="sc" style="width:400px;"></div></td></tr>
		<tr><td></td><td><input type="button" onclick="editChart()" value="Edit"></td><td></td><td></td></tr></tbody></table>
	  <table border="0" width="100%" style="vertical-align:top"><tbody><tr><td><div id="tu"></div></td></tr></tbody></table></div></body></html>*/
/*v.53<!--@ref https://sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jsFiddle.js | http://jsfiddle.net/q47a7/58/show/ | http://code.google.com/apis/ajax/playground/ | https://developers.google.com/adwords/api/docs/appendix/cities-DMAregions // Working Configuration: http://jsfiddle.net/q47a7/67/show + v.52@https://sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jsFiddle.js -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>Charts</title>
    <script type="text/javascript" src="http://www.google.com/jsapi"></script><!--Fails to load all elements:<script type="text/javascript" src='https://www.google.com/jsapi?autoload={"modules":[{"name":"visualization","version":"1"}]}'></script>-->
    <script type="text/javascript">* /
      google.load("visualization","1",{packages:["controls","table","corechart","charteditor","geomap","intensitymap"]}); // "treemap"
      var wrapper,ACT="https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?k=jj860hvegjp1xxy7pvv1&callback=drawVisualization",ctrl=[],chart=[],c,i,cbo,cbn,script=document.createElement("script");script.src=ACT;script.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(script);
	//function editChart(){var editor=new google.visualization.ChartEditor();google.visualization.events.addListener(editor,"ok",function(){wrapper=editor.getChartWrapper();wrapper.draw(document.getElementById("co"));});editor.openDialog(wrapper);}
	  function drawVisualization(){// Tree Map: var $dar=new google.visualization.data.group(dat,[arguments[0][0].indexOf("City")],[{column:arguments[0][0].indexOf("City"),aggregation:google.visualization.data.count,type:"number"}]);var $tre=new google.visualization.ChartWrapper({chartType:"TreeMap",containerId:"tr",dataTable:$dar,view:{columns:[7,8]},options:{maxDepth:1,minColor:"red",midColor:"#ddd",maxColor:"#0d0",headerHeight:15,fontColor:"black",showScale:true}});$tre.draw(); // IntensityMap: var mapdat2=google.visualization.arrayToDataTable(arguments[0]);var map2=new google.visualization.IntensityMap(document.getElementById("chart6"));map2.draw(mapdat2,null);var tabmap2=new google.visualization.ChartWrapper({"chartType":"Table","containerId":"chart7",dataTable:mapdat2});tabmap2.draw();
        var  dat=new google.visualization.DataTable(arguments[0]),hdrs=[],i=arguments[0].cols.length;while(i--){hdrs.unshift(arguments[0].cols[i].id)};//dat=new google.visualization.arrayToDataTable(arguments[0]);//replace: arguments[0][0] with: hdrs//([["Name","Gender","Age","Donuts eaten"],["Michael","Male",12,5],["Elisa","Female",20,7],["Robert","Male",7,3],["John","Male",54,2],["Jessica","Female",22,6],["Aaron","Male",3,1],["Margareth","Female",42,8],["Miranda","Female",33,6]]);
		var  dav=new google.visualization.DataView(dat),ro,rn=dat.getFilteredRows([{column:hdrs.indexOf("Own"),value:"none"}]);dav.hideRows(rn);ro=dav.getViewRows();
		var $dat=new google.visualization.data.group(dav/*.toDataTable()* /,[hdrs.indexOf("Own")],[{column:hdrs.indexOf("Own"),aggregation:google.visualization.data.count,type:"number"}]);//(dat,[1],[{column:3,aggregation:google.visualization.data.sum,type:"number"}]);
		var $dam=new google.visualization.data.group(dav/*.toDataTable()* /,[hdrs.indexOf("Geo")],[{column:hdrs.indexOf("Geo"),aggregation:google.visualization.data.count,type:"number"}]);
		var $dac=new google.visualization.data.group(dav/*.toDataTable()* /,[hdrs.indexOf("Pre")],[{column:hdrs.indexOf("Pre"),aggregation:google.visualization.data.count,type:"number"}]);
		var   $f=new google.visualization.TableBarFormat({width:120});$f.format($dat,1);
		       c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c1",options:{filterColumnLabel:"Own"        ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"Owner"      }}});ctrl.push(c);
               c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c2",options:{filterColumnLabel:"St"         ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"State"      }}});ctrl.push(c);
		       c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c3",options:{filterColumnLabel:"City"       ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"City"       }}});ctrl.push(c);
		       c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c4",options:{filterColumnLabel:"Temp"       ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"Temperature"}}});ctrl.push(c);
		       c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c5",options:{filterColumnLabel:"Disposition",ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"Disposition"}}});ctrl.push(c);
		       c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c6",options:{filterColumnLabel:"Company"    ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"Company"    }}});ctrl.push(c);
		       c=new google.visualization.ControlWrapper({controlType:"CategoryFilter"   ,containerId:"c7",options:{filterColumnLabel:"Phone"      ,ui:{labelStacking:"vertical",label:"",allowTyping:true,allowMultiple:true,caption:"Phone"      }}});ctrl.push(c);		
		       c=new google.visualization.ControlWrapper({controlType:"NumberRangeFilter",containerId:"s1",options:{filterColumnLabel:"ID"         ,ui:{labelStacking:"vertical"                                                                   }}});ctrl.push(c);
		       c=new google.visualization.ControlWrapper({controlType:"NumberRangeFilter",containerId:"s2",options:{filterColumnLabel:"Pre"        ,ui:{labelStacking:"vertical"                                                                   }}});ctrl.push(c);
		       c=new google.visualization.ControlWrapper({controlType:"NumberRangeFilter",containerId:"s3",options:{filterColumnLabel:"E"          ,ui:{labelStacking:"vertical"                                                                   }}});ctrl.push(c);
		       c=new google.visualization.ControlWrapper({controlType:"NumberRangeFilter",containerId:"s4",options:{filterColumnLabel:"Nex"        ,ui:{labelStacking:"vertical"                                                                   }}});ctrl.push(c);		
		   	   c=new google.visualization.ControlWrapper({controlType:"ChartRangeFilter" ,containerId:"s5",options:{filterColumnIndex:hdrs.indexOf("Pre"),ui:{chartType:"ScatterChart",chartOptions:{chartArea:{width:"100%",height:20},pointSize:1,hAxis:{viewWindowMode:"maximized",baselineColor:"none"}},chartView:{columns:[hdrs.indexOf("Pre"),hdrs.indexOf("Nex")]}}},state:{range:{start:-1}}});ctrl.push(c);
	//	wrapper =new google.visualization.  ChartWrapper({  chartType:"ColumnChart"      ,containerId:"co",dataTable:$dac,options:{title:"Daily Volume",theme:"maximized",animation:{duration:3000,easing:"inAndOut"}}});wrapper.draw();
		var   sc=new google.visualization.  ChartWrapper({  chartType:"ScatterChart"     ,containerId:"sc",dataTable: dav,view:{columns:[hdrs.indexOf("Pre"),hdrs.indexOf("Nex")]},options:{theme:"maximized",hAxis:{viewWindowMode:"maximized"},animation:{duration:3000,easing:"inAndOut"}}});chart.push(sc);
		var  tab=new google.visualization.  ChartWrapper({  chartType:"Table"            ,containerId:"tu",options:{allowHtml:true,page:"enable",pageSize:30,showRowNumber:true}});chart.push(tab);//var  tab=new google.visualization.Table(document.getElementById("tu"));tab.draw(dat,{view:{columns:[0,1,2,3,4,5,6,7,8,9,10],rows:[1,5,10,15,25,35]},showRowNumber:true,page:"enable",pageSize:20,pagingSymbols:{prev:"<<",next:">>"},pagingButtonsConfiguration:"both"}); // Call, draw and bind manually because chart wrapper does not throw "select" event yet//google.visualization.events.addListener(tab,"select",handleSel);//function handleSel(event){alert("A");alert(JSON.stringify(con.getSelection()));}//handler(){...tab.setDataTable( dat);//tab.draw(dat,{showRowNumber:true,page:"enable",pageSize:20,pagingSymbols:{prev:"<<",next:">>"},pagingButtonsConfiguration:"both"});...}
		var $tab=new google.visualization.  ChartWrapper({  chartType:"Table"            ,containerId:"tg",dataTable:$dat,options:{sortColumn:1,sortAscending:false,allowHtml:true,page:"enable",pageSize:10,showRowNumber:false}});$tab.draw();
        var $pi1=new google.visualization.  ChartWrapper({  chartType:"PieChart"         ,containerId:"pi",dataTable:$dat,options:{title:"Made By",width:300,height:300,legend:"none",pieSliceText:"label"}});$pi1.draw(); //options{...,chartArea:{left:15,top:15,right:0,bottom:0}...},view:{columns:[1,2]}... //var $pi2=new google.visualization.ChartWrapper({chartType:"PieChart",containerId:"chart42",dataTable:$dat ,options:{title:"Next"  ,width:300 ,height:300,legend:"none",chartArea:{left:15,top:15,right:0,bottom:0},pieSliceText:"label"}});$pi2.draw(); //options{...},view:{columns:[1,3]}... // var $pie=new google.visualization.ChartWrapper({chartType:"PieChart",containerId:"chart4" ,dataTable:$dat ,options:{title:"Donuts",width:300 ,height:300,legend:"none",chartArea:{left:15,top:15,right:0,bottom:0},pieSliceText:"label"}});$pie.draw();//var  pie=new google.visualization.ChartWrapper({chartType:"PieChart",containerId:"chart1" ,  options:{width:300,height:300,legend:"none",title:"Donuts eaten per person",chartArea:{left:15,top:15,right:0,bottom:0},pieSliceText:"label"},view:{columns:[0,3]}});//group the data for the pie chart and draw it
		var $geo=new google.visualization.  ChartWrapper({  chartType:"GeoMap"           ,containerId:"ge",dataTable:$dam,options:{title:"Call Locations",region:"US",dataMode:"regions"}});$geo.draw(); //var $dam=new google.visualization.DataView($dat);$dam.setColumns([hdrs.indexOf("Geo"),hdrs.indexOf("<Str name of grouped col in $dat>")]); var $geo=new google.visualization.GeoMap(document.getElementById("chart5"));$geo.draw($dam,{region:"US",dataMode:"regions"}); // GeoMap: var mapdata=google.visualization.arrayToDataTable([["State","Vol"],["US-CA",200],["US-TX",300],["US-FL",400],["US-MA",500],["US-VA",600],["US-WA",700]]);
		var $col=new google.visualization.  ChartWrapper({  chartType:"ColumnChart"      ,containerId:"co",dataTable:$dac,options:{title:"Daily Volume",theme:"maximized",animation:{duration:3000,easing:"inAndOut"}}});$col.draw(); //options{...,height:300,width:600,vAxis:{title:"Volume"},hAxis:{title:"Pre"}}
		var dash=new google.visualization.Dashboard(document.getElementById("dashboard")).bind(ctrl,chart);dash.draw(dav);i=ctrl.length;while(i--){google.visualization.events.addListener(ctrl[i],"statechange",handleCtrl);} // Bind charts, controls and listenters
																																				   google.visualization.events.addListener(dash   ,"ready"      ,handleDash);
        function handleCtrl(){$dat=google.visualization.data.group(dav,[hdrs.indexOf("Own")],[{column:hdrs.indexOf("Own"),aggregation:google.visualization.data.count,type:"number"}]);$f.format($dat,1);//.sum
							  $dam=google.visualization.data.group(dav,[hdrs.indexOf("Geo")],[{column:hdrs.indexOf("Geo"),aggregation:google.visualization.data.count,type:"number"}]);
							  $dac=google.visualization.data.group(dav,[hdrs.indexOf("Pre")],[{column:hdrs.indexOf("Pre"),aggregation:google.visualization.data.count,type:"number"}]);
							  $tab.setDataTable($dat);$tab.draw();$pi1.setDataTable($dat);$pi1.draw();$geo.setDataTable($dam);$geo.draw();$col.setDataTable($dac);$col.draw();}
		function handleDash(){document.getElementById("r11")    .onclick=function(){alert("Pre = working now. Enjoy."                             )                                             ;}
							  document.getElementById("r12")    .onclick=function(){alert("E = not yet, coming soon. Stay tuned."                 )                                             ;}
							  document.getElementById("r13")    .onclick=function(){alert("Nex = not yet, coming soon. Stay tuned."               )                                             ;}
							  document.getElementById("r21")    .onclick=function(){sc.setView({columns:[hdrs.indexOf("Pre"),hdrs.indexOf("Nex")]})                 ;dash.draw(dav)             ;}
							  document.getElementById("r22")    .onclick=function(){sc.setView({columns:[hdrs.indexOf("Pre"),hdrs.indexOf("E"  )]})                 ;dash.draw(dav)             ;}
							  document.getElementById("r23")    .onclick=function(){sc.setView({columns:[hdrs.indexOf("E"  ),hdrs.indexOf("Nex")]})                 ;dash.draw(dav)             ;}
						  cbo=document.getElementById("cbo");cbo.onclick=function(){if(cbo.checked){dav.setRows(ro.concat(dav.getViewRows()))}else{dav.hideRows(ro)};dash.draw(dav);handleCtrl();}
						  cbn=document.getElementById("cbn");cbn.onclick=function(){if(cbn.checked){dav.setRows(rn.concat(dav.getViewRows()))}else{dav.hideRows(rn)};dash.draw(dav);handleCtrl();}}
      }//google.setOnLoadCallback(drawVisualization); Eliminate per JSONP callback @http://code.google.com/apis/ajax/playground/#jsonp
  /*</script>
  <style type="text/css">var{display:none;}a:hover{color:#666666;background:#FFFFCC;text-decoration:none;}a:hover var{display:block;position:absolute;right:10px;top:50px;border:1px solid #000;text-align:center;z-index:2;}p{position:relative;z-index:1}</style><!--@http://www.sitepoint.com/forums/showthread.php?337478-Rollover-with-popup-how-is-it-done @http://www.pmob.co.uk/temp/disjointedcssrollover3.htm Note: Replaced <span> with <var> to prevent interference-->
  </head>
  <body style="font-family:arial;font-size:small;border:0 none;">
	<div id="dashboard">
	  <table border="1" width="100%" style="text-align:center;vertical-align:middle"><tbody><!--<colgroup><col width="100"><col><col><col></colgroup>-->
		<tr>
		  <td>
		    <input type="radio" name="radset1" id="r11" checked> Pre </input>
		    <input type="radio" name="radset1" id="r12"        > E   </input>
			<input type="radio" name="radset1" id="r13"        > Nex </input></td>
		  <td rowspan="2"><div id="pi" style="float:left;"></div></td>
		  <td rowspan="2"><div><form><input type="checkbox" title="show" value="own"  id="cbo" xonclick="var ic;if(this.checked){ic=this.value}else{ic=''}alert(ic);" checked> own  </input> <!-- <input ... checked> Instead of: <script>...document.getElementById("cbo").checked=true;...</script> -->
		                             <input type="checkbox" title="show" value="none" id="cbn" xonclick="var ic;if(this.checked){ic=this.value}else{ic=''}alert(ic);"        > none </input></form></div><br>
		                  <div id="tg" style="float:left;"></div></td>
		  <td rowspan="3" style="vertical-align:top">
			<div id="ge" style="height:250px;"></div>
			<div align="right"><p><a target="_blank" href="https://lh6.googleusercontent.com/-rIdtXiBwe0U/UJ7JR_SYrNI/AAAAAAAADzk/BNM7XoAFOfw/s1600/U.S.%2520Sales%2520Regions.png"><img src="https://lh6.googleusercontent.com/-rIdtXiBwe0U/UJ7JR_SYrNI/AAAAAAAADzk/BNM7XoAFOfw/s144/U.S.%2520Sales%2520Regions.png" height="35"> 
			  <var><img src="https://lh6.googleusercontent.com/-rIdtXiBwe0U/UJ7JR_SYrNI/AAAAAAAADzk/BNM7XoAFOfw/s800/U.S.%2520Sales%2520Regions.png" height="400"></var></a></p></div></td></tr>
		<tr><td><div id="co" style="width:400px;            "></div>
				<div id="s5" style="width:400px;height:20px;"></div></td></tr>
		<tr>
		  <td>
		    <input type="radio" name="radset2" id="r21" checked> Pre/Nex </input>
		    <input type="radio" name="radset2" id="r22"        > Pre/E   </input>
			<input type="radio" name="radset2" id="r23"        > E/Nex   </input></td>
		  <td rowspan="2"><div id="s1"></div><br><div id="s2"></div><br><div id="s3"></div><br><div id="s4"></div></td>
		  <td rowspan="2"><div id="c1"></div><div id="c2"></div><div id="c3"></div><div id="c4"></div><div id="c5"></div><div id="c6"></div><div id="c7"></div></td></tr>
		<tr><td><div id="sc" style="width:400px;"></div></td></tr>
		<tr><td></td><td><input type="button" onclick="editChart()" value="Edit"></td><td></td><td></td></tr></tbody></table>
	  <table border="0" width="100%" style="vertical-align:top"><tbody><tr><td><div id="tu"></div></td></tr></tbody></table></div></body></html>*/
/*v.52<!--@ref https://sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jsFiddle.js | http://jsfiddle.net/q47a7/show/ | http://code.google.com/apis/ajax/playground/ | https://developers.google.com/adwords/api/docs/appendix/cities-DMAregions -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>Charts</title>
    <script type="text/javascript" src="http://www.google.com/jsapi"></script><!--Fails to load all elements:<script type="text/javascript" src='https://www.google.com/jsapi?autoload={"modules":[{"name":"visualization","version":"1"}]}'></script>-->
    <script type="text/javascript">* /
      google.load("visualization","1",{packages:["controls","table","corechart","charteditor","geomap","intensitymap"]}); // "treemap"
      var wrapper,ACT="https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?k=mhswbutyxwhojq4ikj9m&callback=drawVisualization",ctrl=[],chart=[],c,i,cbo,cbn,script=document.createElement("script");script.src=ACT;script.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(script);
	//function editChart(){var editor=new google.visualization.ChartEditor();google.visualization.events.addListener(editor,"ok",function(){wrapper=editor.getChartWrapper();wrapper.draw(document.getElementById("co"));});editor.openDialog(wrapper);}
	  function drawVisualization(){// Tree Map: var $dar=new google.visualization.data.group(dat,[arguments[0][0].indexOf("City")],[{column:arguments[0][0].indexOf("City"),aggregation:google.visualization.data.count,type:"number"}]);var $tre=new google.visualization.ChartWrapper({chartType:"TreeMap",containerId:"tr",dataTable:$dar,view:{columns:[7,8]},options:{maxDepth:1,minColor:"red",midColor:"#ddd",maxColor:"#0d0",headerHeight:15,fontColor:"black",showScale:true}});$tre.draw(); // IntensityMap: var mapdat2=google.visualization.arrayToDataTable(arguments[0]);var map2=new google.visualization.IntensityMap(document.getElementById("chart6"));map2.draw(mapdat2,null);var tabmap2=new google.visualization.ChartWrapper({"chartType":"Table","containerId":"chart7",dataTable:mapdat2});tabmap2.draw();
        var  dat=new google.visualization.arrayToDataTable(arguments[0]);//([["Name","Gender","Age","Donuts eaten"],["Michael","Male",12,5],["Elisa","Female",20,7],["Robert","Male",7,3],["John","Male",54,2],["Jessica","Female",22,6],["Aaron","Male",3,1],["Margareth","Female",42,8],["Miranda","Female",33,6]]);
		var  dav=new google.visualization.DataView(dat),ro,rn=dat.getFilteredRows([{column:arguments[0][0].indexOf("Own"),value:"none"}]);dav.hideRows(rn);ro=dav.getViewRows();
		var $dat=new google.visualization.data.group(dav.toDataTable(),[arguments[0][0].indexOf("Own")],[{column:arguments[0][0].indexOf("Own"),aggregation:google.visualization.data.count,type:"number"}]);//(dat,[1],[{column:3,aggregation:google.visualization.data.sum,type:"number"}]);
		var $dam=new google.visualization.data.group(dav.toDataTable(),[arguments[0][0].indexOf("Geo")],[{column:arguments[0][0].indexOf("Geo"),aggregation:google.visualization.data.count,type:"number"}]);
		var $dac=new google.visualization.data.group(dav.toDataTable(),[arguments[0][0].indexOf("Pre")],[{column:arguments[0][0].indexOf("Pre"),aggregation:google.visualization.data.count,type:"number"}]);
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
		var   sc=new google.visualization.  ChartWrapper({  chartType:"ScatterChart"     ,containerId:"sc",dataTable: dav.toDataTable(),view:{columns:[arguments[0][0].indexOf("Pre"),arguments[0][0].indexOf("Nex")]},options:{theme:"maximized",hAxis:{viewWindowMode:"maximized"},animation:{duration:3000,easing:"inAndOut"}}});chart.push(sc);
		var  tab=new google.visualization.  ChartWrapper({  chartType:"Table"            ,containerId:"tu",options:{allowHtml:true,page:"enable",pageSize:30,showRowNumber:true}});chart.push(tab);//var  tab=new google.visualization.Table(document.getElementById("tu"));tab.draw(dat,{view:{columns:[0,1,2,3,4,5,6,7,8,9,10],rows:[1,5,10,15,25,35]},showRowNumber:true,page:"enable",pageSize:20,pagingSymbols:{prev:"<<",next:">>"},pagingButtonsConfiguration:"both"}); // Call, draw and bind manually because chart wrapper does not throw "select" event yet//google.visualization.events.addListener(tab,"select",handleSel);//function handleSel(event){alert("A");alert(JSON.stringify(con.getSelection()));}//handler(){...tab.setDataTable( dat);//tab.draw(dat,{showRowNumber:true,page:"enable",pageSize:20,pagingSymbols:{prev:"<<",next:">>"},pagingButtonsConfiguration:"both"});...}
		var $tab=new google.visualization.  ChartWrapper({  chartType:"Table"            ,containerId:"tg",dataTable:$dat,options:{sortColumn:1,sortAscending:false,allowHtml:true,page:"enable",pageSize:10,showRowNumber:false}});$tab.draw();
        var $pi1=new google.visualization.  ChartWrapper({  chartType:"PieChart"         ,containerId:"pi",dataTable:$dat,options:{title:"Made By",width:300,height:300,legend:"none",pieSliceText:"label"}});$pi1.draw(); //options{...,chartArea:{left:15,top:15,right:0,bottom:0}...},view:{columns:[1,2]}... //var $pi2=new google.visualization.ChartWrapper({chartType:"PieChart",containerId:"chart42",dataTable:$dat ,options:{title:"Next"  ,width:300 ,height:300,legend:"none",chartArea:{left:15,top:15,right:0,bottom:0},pieSliceText:"label"}});$pi2.draw(); //options{...},view:{columns:[1,3]}... // var $pie=new google.visualization.ChartWrapper({chartType:"PieChart",containerId:"chart4" ,dataTable:$dat ,options:{title:"Donuts",width:300 ,height:300,legend:"none",chartArea:{left:15,top:15,right:0,bottom:0},pieSliceText:"label"}});$pie.draw();//var  pie=new google.visualization.ChartWrapper({chartType:"PieChart",containerId:"chart1" ,  options:{width:300,height:300,legend:"none",title:"Donuts eaten per person",chartArea:{left:15,top:15,right:0,bottom:0},pieSliceText:"label"},view:{columns:[0,3]}});//group the data for the pie chart and draw it
		var $geo=new google.visualization.  ChartWrapper({  chartType:"GeoMap"           ,containerId:"ge",dataTable:$dam,options:{title:"Call Locations",region:"US",dataMode:"regions"}});$geo.draw(); //var $dam=new google.visualization.DataView($dat);$dam.setColumns([arguments[0][0].indexOf("Geo"),arguments[0][0].indexOf("<Str name of grouped col in $dat>")]); var $geo=new google.visualization.GeoMap(document.getElementById("chart5"));$geo.draw($dam,{region:"US",dataMode:"regions"}); // GeoMap: var mapdata=google.visualization.arrayToDataTable([["State","Vol"],["US-CA",200],["US-TX",300],["US-FL",400],["US-MA",500],["US-VA",600],["US-WA",700]]);
		var $col=new google.visualization.  ChartWrapper({  chartType:"ColumnChart"      ,containerId:"co",dataTable:$dac,options:{title:"Daily Volume",theme:"maximized",animation:{duration:3000,easing:"inAndOut"}}});$col.draw(); //options{...,height:300,width:600,vAxis:{title:"Volume"},hAxis:{title:"Pre"}}
		var dash=new google.visualization.Dashboard(document.getElementById("dashboard")).bind(ctrl,chart);dav.hideColumns([arguments[0][0].indexOf("Geo")]);dash.draw(dav.toDataTable());i=ctrl.length;while(i--){google.visualization.events.addListener(ctrl[i],"statechange",handleCtrl);} // Bind charts, controls and listenters
																																																				   google.visualization.events.addListener(dash   ,"ready"      ,handleDash);
        function handleCtrl(){$dat=google.visualization.data.group(dav.toDataTable(),[ 2],[{column: 2,aggregation:google.visualization.data.count,type:"number"}]);$f.format($dat,1);//.sum
							  $dam=google.visualization.data.group(dav.toDataTable(),[11],[{column:11,aggregation:google.visualization.data.count,type:"number"}]);
							  $dac=google.visualization.data.group(dav.toDataTable(),[ 3],[{column: 3,aggregation:google.visualization.data.count,type:"number"}]);
							  $tab.setDataTable($dat);$tab.draw();$pi1.setDataTable($dat);$pi1.draw();$geo.setDataTable($dam);$geo.draw();$col.setDataTable($dac);$col.draw();}
		function handleDash(){document.getElementById("r11")    .onclick=function(){alert("Pre = working now. Enjoy."              )                                                                                 ;}
							  document.getElementById("r12")    .onclick=function(){alert("E = not yet, coming soon. Stay tuned."  )                                                                                 ;}
							  document.getElementById("r13")    .onclick=function(){alert("Nex = not yet, coming soon. Stay tuned.")                                                                                 ;}
							  document.getElementById("r21")    .onclick=function(){sc.setView({columns:[3,5]})                                                                          ;dash.draw(dav)             ;}
							  document.getElementById("r22")    .onclick=function(){sc.setView({columns:[3,4]})                                                                          ;dash.draw(dav)             ;}
							  document.getElementById("r23")    .onclick=function(){sc.setView({columns:[4,5]})                                                                          ;dash.draw(dav)             ;}
						  cbo=document.getElementById("cbo");cbo.onclick=function(){if(cbo.checked){dav.setRows(ro.concat(dav.getViewRows()))}else{dav.hideRows(ro)};dash.draw(dav);handleCtrl();}
						  cbn=document.getElementById("cbn");cbn.onclick=function(){if(cbn.checked){dav.setRows(rn.concat(dav.getViewRows()))}else{dav.hideRows(rn)};dash.draw(dav);handleCtrl();}}
      }//google.setOnLoadCallback(drawVisualization); Eliminate per JSONP callback @http://code.google.com/apis/ajax/playground/#jsonp
  /*</script>
  <style type="text/css">var{display:none;}a:hover{color:#666666;background:#FFFFCC;text-decoration:none;}a:hover var{display:block;position:absolute;right:10px;top:50px;border:1px solid #000;text-align:center;z-index:2;}p{position:relative;z-index:1}</style><!--@http://www.sitepoint.com/forums/showthread.php?337478-Rollover-with-popup-how-is-it-done @http://www.pmob.co.uk/temp/disjointedcssrollover3.htm Note: Replaced <span> with <var> to prevent interference-->
  </head>
  <body style="font-family:arial;font-size:small;border:0 none;">
	<div id="dashboard">
	  <table border="1" width="100%" style="text-align:center;vertical-align:middle"><tbody><!--<colgroup><col width="100"><col><col><col></colgroup>-->
		<tr>
		  <td>
		    <input type="radio" name="radset1" id="r11" checked> Pre </input>
		    <input type="radio" name="radset1" id="r12"        > E   </input>
			<input type="radio" name="radset1" id="r13"        > Nex </input></td>
		  <td rowspan="2"><div id="pi" style="float:left;"></div></td>
		  <td rowspan="2"><div><form><input type="checkbox" title="show" value="own"  id="cbo" xonclick="var ic;if(this.checked){ic=this.value}else{ic=''}alert(ic);" checked> own  </input> <!-- <input ... checked> Instead of: <script>...document.getElementById("cbo").checked=true;...</script> -->
		                             <input type="checkbox" title="show" value="none" id="cbn" xonclick="var ic;if(this.checked){ic=this.value}else{ic=''}alert(ic);"        > none </input></form></div><br>
		                  <div id="tg" style="float:left;"></div></td>
		  <td rowspan="3" style="vertical-align:top">
			<div id="ge" style="height:250px;"></div>
			<div align="right"><p><a target="_blank" href="https://lh6.googleusercontent.com/-rIdtXiBwe0U/UJ7JR_SYrNI/AAAAAAAADzk/BNM7XoAFOfw/s1600/U.S.%2520Sales%2520Regions.png"><img src="https://lh6.googleusercontent.com/-rIdtXiBwe0U/UJ7JR_SYrNI/AAAAAAAADzk/BNM7XoAFOfw/s144/U.S.%2520Sales%2520Regions.png" height="35"> 
			  <var><img src="https://lh6.googleusercontent.com/-rIdtXiBwe0U/UJ7JR_SYrNI/AAAAAAAADzk/BNM7XoAFOfw/s800/U.S.%2520Sales%2520Regions.png" height="400"></var></a></p></div></td></tr>
		<tr><td><div id="co" style="width:400px;            "></div>
				<div id="s5" style="width:400px;height:20px;"></div></td></tr>
		<tr>
		  <td>
		    <input type="radio" name="radset2" id="r21" checked> Pre/Nex </input>
		    <input type="radio" name="radset2" id="r22"        > Pre/E   </input>
			<input type="radio" name="radset2" id="r23"        > E/Nex   </input></td>
		  <td rowspan="2"><div id="s1"></div><br><div id="s2"></div><br><div id="s3"></div><br><div id="s4"></div></td>
		  <td rowspan="2"><div id="c1"></div><div id="c2"></div><div id="c3"></div><div id="c4"></div><div id="c5"></div><div id="c6"></div></td></tr>
		<tr><td><div id="sc" style="width:400px;"></div></td></tr>
		<tr><td></td><td><input type="button" onclick="editChart()" value="Edit"></td><td></td><td></td></tr></tbody></table>
	  <table border="0" width="100%" style="vertical-align:top"><tbody><tr><td><div id="tu"></div></td></tr></tbody></table></div></body></html>*/