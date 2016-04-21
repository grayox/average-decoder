/*<!--@ref https://sites.google.com/site/iae2mptmwylnrbz8iesqwkq8nvousn/home/jsFiddle1.js | http://jsfiddle.net/7f45f/1/show/ | http://code.google.com/apis/ajax/playground/ | https://developers.google.com/adwords/api/docs/appendix/cities-DMAregions -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>Charts</title>
    <script type="text/javascript" src="http://www.google.com/jsapi"></script>
    <script type="text/javascript">*/
      google.load("visualization","1",{packages:["table"]}); // "controls","corechart","charteditor","geomap","intensitymap","treemap"
      var wrapper,ACT="https://script.google.com/macros/s/AKfycbx83OcznDFybxxaGdwzoH2FY_Cylv_4dIz7Je-ovdKN5bu0TMM/exec?k=43c85lg8keybsne29uln&callback=drawVisualization",script=document.createElement("script");script.src=ACT;script.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(script);
	  function drawVisualization(){
        var  dat=new google.visualization.DataTable(arguments[0]),hdrs=[],i=arguments[0].cols.length;while(i--){hdrs.unshift(arguments[0].cols[i].id)};
		var  dav=new google.visualization.DataView(dat),ro,rn=dat.getFilteredRows([{column:hdrs.indexOf("Own"),value:"none"}]);dav.hideRows(rn);ro=dav.getViewRows();
		var $dat=new google.visualization.data.group(dav,[hdrs.indexOf("Own")],[{column:hdrs.indexOf("Own"),aggregation:google.visualization.data.count,type:"number"}]);
		var  tab=new google.visualization.  ChartWrapper({  chartType:"Table"            ,containerId:"tu",options:{allowHtml:true,page:"enable",pageSize:30,showRowNumber:true}});
		var $tab=new google.visualization.  ChartWrapper({  chartType:"Table"            ,containerId:"tg",dataTable:$dat,options:{allowHtml:false,sortColumn:1,sortAscending:false,allowHtml:true,page:"enable",pageSize:10,showRowNumber:false}});$tab.draw();
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
