// JSON visualization: http://chris.photobooks.com/json/default.htm
// Regex regular expressions reference and tester: http://regex101.com/  Examples: http://www.regular-expressions.info/examples.html
function hexEncode(data){ // Hexadecimal | Encodes data to Hex(base16) format; Reference: http://farhadi.ir/
	var b16_digits = '0123456789abcdef';
	var b16_map = new Array();
	for(var i=0;i<256;i++){b16_map[i]=b16_digits.charAt(i >> 4)+b16_digits.charAt(i & 15);}
	var result = new Array();
	for(var i=0;i<data.length;i++){result[i] = b16_map[data.charCodeAt(i)];}
	return result.join('');
}
function hexDecode(data){ // Hexadecimal | Decodes Hex(base16) formated data; Reference: http://farhadi.ir/
	var b16_digits = '0123456789abcdef';
	var b16_map = new Array();
	for(var i=0;i<256;i++){b16_map[b16_digits.charAt(i >> 4) + b16_digits.charAt(i & 15)] = String.fromCharCode(i);}
	if(!data.match(/^[a-f0-9]*$/i)) return false; // return false if input data is not a valid Hex string
	if(data.length % 2) data='0'+data;
	var result = new Array();
	var j=0;
	for(var i=0;i<data.length;i+=2){result[j++]=b16_map[data.substr(i,2)];}
	return result.join('');
}
function base64Encode(data){ // Base64 | Encodes data to Base64 format; Reference: http://farhadi.ir/
	if (typeof(btoa) == 'function') return btoa(data);//use internal base64 functions if available (gecko only)
	var b64_map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var byte1, byte2, byte3;
	var ch1, ch2, ch3, ch4;
	var result = new Array(); //array is used instead of string because in most of browsers working with large arrays is faster than working with large strings
	var j=0;
	for (var i=0; i<data.length; i+=3) {
		byte1 = data.charCodeAt(i);
		byte2 = data.charCodeAt(i+1);
		byte3 = data.charCodeAt(i+2);
		ch1 = byte1 >> 2;
		ch2 = ((byte1 &  3) << 4) | (byte2 >> 4);
		ch3 = ((byte2 & 15) << 2) | (byte3 >> 6);
		ch4 = byte3 & 63;
		if(isNaN(byte2)){ch3 = ch4 = 64;} else if(isNaN(byte3)){ch4 = 64;}
		result[j++] = b64_map.charAt(ch1)+b64_map.charAt(ch2)+b64_map.charAt(ch3)+b64_map.charAt(ch4);
	}
	return result.join('');
}
function base64Decode(data){ // Base64 | Decodes Base64 formated data; Reference: http://farhadi.ir/
	data = data.replace(/[^a-z0-9\+\/=]/ig, '');// strip none base64 characters
	if (typeof(atob) == 'function') return atob(data);//use internal base64 functions if available (gecko only)
	var b64_map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var byte1, byte2, byte3;
	var ch1, ch2, ch3, ch4;
	var result = new Array(); //array is used instead of string because in most of browsers working with large arrays is faster than working with large strings
	var j=0;
	while((data.length%4) != 0){data += '=';}
	for (var i=0; i<data.length; i+=4) {
		ch1 = b64_map.indexOf(data.charAt(i));
		ch2 = b64_map.indexOf(data.charAt(i+1));
		ch3 = b64_map.indexOf(data.charAt(i+2));
		ch4 = b64_map.indexOf(data.charAt(i+3));
		byte1 = (ch1 << 2) | (ch2 >> 4);
		byte2 = ((ch2 & 15) << 4) | (ch3 >> 2);
		byte3 = ((ch3 & 3) << 6) | ch4;
		result[j++] = String.fromCharCode(byte1);
		if (ch3 != 64) result[j++] = String.fromCharCode(byte2);
		if (ch4 != 64) result[j++] = String.fromCharCode(byte3);
	}
	return result.join('');
}
function rc4Encrypt(key, pt){ // RC4 | Encrypt/Decrypt given plain text using the key with RC4 algorithm; Reference: http://farhadi.ir/
// All parameters and return value are in binary format.
// @param string key - secret key for encryption; @param string pt - plain text to be encrypted; @return string
	s = new Array();
	for(var i=0;i<256;i++){s[i] = i;}
	var j = 0;
	var x;
	for(i=0; i<256; i++){
		j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
	}
	i = 0;
	j = 0;
	var ct = '';
	for(var y=0; y<pt.length; y++){
		i = (i + 1) % 256;
		j = (j + s[i]) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
		ct += String.fromCharCode(pt.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
	}
	return ct;
}
function rc4Decrypt(key, ct){return rc4Encrypt(key, ct)} // RC4 | Encrypt/Decrypt given plain text using the key with RC4 algorithm; Reference: http://farhadi.ir/
String.prototype.hexEncode = function(){ // Hexadecimal | Encodes string object to Hex(base16) format; Reference: http://farhadi.ir/ // Original code has been commented out & replaced for efficiency
	var data = this;
	var b16_digits = '0123456789abcdef';
	var b16_map = new Array();
	var i=257;while(i--){b16_map[i]=b16_digits.charAt(i >> 4)+b16_digits.charAt(i & 15);} // for(var i=0;i<256;i++){b16_map[i]=b16_digits.charAt(i >> 4)+b16_digits.charAt(i & 15);}
	var result = new Array();
	i=data.length;while(i--){result[i] = b16_map[data.charCodeAt(i)];} // for(var i=0;i<data.length;i++){result[i] = b16_map[data.charCodeAt(i)];}
	return result.join('');}
String.prototype.hexDecode = function(){ // Hexadecimal | Decodes Hex (base16) formated string object; Reference: http://farhadi.ir/ // Original code has been commented out & replaced for efficiency
	var data = this;
	var b16_digits = '0123456789abcdef';
	var b16_map = new Array();
	var i=257;while(i--){b16_map[b16_digits.charAt(i >> 4) + b16_digits.charAt(i & 15)] = String.fromCharCode(i);} // for(var i=0;i<256;i++){b16_map[b16_digits.charAt(i >> 4) + b16_digits.charAt(i & 15)] = String.fromCharCode(i);}
	if(!data.match(/^[a-f0-9]*$/i)) return false; // return false if input data is not a valid Hex string
	if(data.length % 2) var data='0'+data;
	var result = new Array();
	var j=0;
	var len=data.length;for(var i=0;i<len;i+=2){result[j++]=b16_map[data.substr(i,2)];} // for(var i=0;i<data.length;i+=2){result[j++]=b16_map[data.substr(i,2)];}
	return result.join('');}
String.prototype.base64Encode = function(){ // Base64 | Encodes data to Base64 format; Reference: http://farhadi.ir/
	var data = this;
	if (typeof(btoa) == 'function') return btoa(data);//use internal base64 functions if available (gecko only)
	var b64_map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var byte1, byte2, byte3;
	var ch1, ch2, ch3, ch4;
	var result = new Array(); //array is used instead of string because in most of browsers working with large arrays is faster than working with large strings
	var j=0;
	for (var i=0; i<data.length; i+=3) {
		byte1 = data.charCodeAt(i);
		byte2 = data.charCodeAt(i+1);
		byte3 = data.charCodeAt(i+2);
		ch1 = byte1 >> 2;
		ch2 = ((byte1 &  3) << 4) | (byte2 >> 4);
		ch3 = ((byte2 & 15) << 2) | (byte3 >> 6);
		ch4 = byte3 & 63;
		if(isNaN(byte2)){ch3 = ch4 = 64;} else if(isNaN(byte3)){ch4 = 64;}
		result[j++] = b64_map.charAt(ch1)+b64_map.charAt(ch2)+b64_map.charAt(ch3)+b64_map.charAt(ch4);
	}
	return result.join('');
}	//String.prototype.base64Encode=base64Encode;
String.prototype.base64Decode = function(){ // Base64 | Decodes Base64 formated data; Reference: http://farhadi.ir/
	var data = this;
	data = data.replace(/[^a-z0-9\+\/=]/ig, '');// strip none base64 characters
	if (typeof(atob) == 'function') return atob(data);//use internal base64 functions if available (gecko only)
	var b64_map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var byte1, byte2, byte3;
	var ch1, ch2, ch3, ch4;
	var result = new Array(); //array is used instead of string because in most of browsers working with large arrays is faster than working with large strings
	var j=0;
	while((data.length%4) != 0){data += '=';}
	for (var i=0; i<data.length; i+=4) {
		ch1 = b64_map.indexOf(data.charAt(i));
		ch2 = b64_map.indexOf(data.charAt(i+1));
		ch3 = b64_map.indexOf(data.charAt(i+2));
		ch4 = b64_map.indexOf(data.charAt(i+3));
		byte1 = (ch1 << 2) | (ch2 >> 4);
		byte2 = ((ch2 & 15) << 4) | (ch3 >> 2);
		byte3 = ((ch3 &  3) << 6) | ch4;
		result[j++] = String.fromCharCode(byte1);
		if (ch3 != 64) result[j++] = String.fromCharCode(byte2);
		if (ch4 != 64) result[j++] = String.fromCharCode(byte3);
	}
	return result.join('');
}	//String.prototype.base64Decode=base64Decode;
String.prototype.rc4Encrypt = function(key){ // RC4 | Encrypt/Decrypt given plain text using the key with RC4 algorithm; Reference: http://farhadi.ir/
// All parameters and return value are in binary format.
// @param string key - secret key for encryption; @param string data - plain text data to be encrypted; @return string
	var data = this;
	s        = new Array();
	for(var i=0;i<256;i++){s[i] = i;}
	var j    = 0;
	var x;
	for(i=0; i<256; i++){
		j    = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
		x    = s[i];
		s[i] = s[j];
		s[j] = x;
	}
	i        = 0;
	j        = 0;
	var ct   = '';
	for(var y=0; y<data.length; y++){
		i    = (i + 1) % 256;
		j    = (j + s[i]) % 256;
		x    = s[i];
		s[i] = s[j];
		s[j] = x;
		ct  += String.fromCharCode(data.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
	}
	return ct;
}	//String.prototype.rc4Encrypt=rc4Encrypt;
String.prototype.rc4Decrypt = function(key){return this.rc4Encrypt(key)}//String.prototype.rc4Decrypt=rc4Decrypt; // RC4 | Encrypt/Decrypt given plain text using the key with RC4 algorithm; Reference: http://farhadi.ir/
String.prototype.trim = function(){return this.replace(/^\s+|\s+$/g,"")}//String.prototype.trim=trim; // Trims white space before & after string; Reference: http://www.somacon.com/p355.php | Google search: javascript trim function
function capitalize(str){var ar=str.split("");ar.unshift(ar.shift().toUpperCase());return ar.join("")} // function test(){Logger.log(capitalize("dealDigger"))}
function toCaseTitle     (str){return (typeof str!="string")?str:str.replace(/\w*/g,function(txt){return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase()})} // Reference: http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toCaseSentence  (str){return (typeof str!="string")?str:                                        str.charAt(0).toUpperCase()+str.substr(1).toLowerCase()  } // Reference: http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function str2caseTitle   (str){return toCaseTitle   (str)}
function str2caseSentence(str){return toCaseSentence(str)}
function str2number(s){return(s*1==s)?s:0} // "-" becomes 0 // "5" becomes 5. // function test(){Logger.log(str2number("5"))}
function str2num(x){return Number(x.replace(/[^0-9.]/gi,""))}//Be careful if you need to keep negative signs and/or decimals. Consider using str2num2() //var x="$250,002.01";Logger.log(Number(x.replace(/[^0-9.]/gi,"")))} // Converts strings to numbers. Strips out all non-digits and non-decimal charcters. Useful for formatting prices entered from a text input in a form. // Reference: http://stackoverflow.com/questions/4572194/regex-to-replace-everything-except-numbers-and-a-decimal-point // function test1(){var a="$22,259,030",b="-73.9%";Logger.log(LibraryjsUtil.str2num(a)*LibraryjsUtil.str2num(b)/100)}
function str2num2(str){return str.replace(/(\$|,|%)/gi,"")}//Keeps (negative) sign in tact//function test(){var a="$22,259,030",b="-73.9%";Logger.log(a*b.replace(/(%|,)/gi,""))}
function str2codename(str,n){n=n||10;str=str.toLowerCase();
// Purpose: To match strings of movie titles; i.e., similar but different
// @param{string} str incoming string to process // @param{integer} n length of codename // @return{string} removes all letters except letters, converts to lowercase //
// @return conditional is necessary because the movie title "'71" returns a zero length string, so we need to handle that special case exception
    var patt  = /(\bthe IMAX experience\b|\bI-MAX\b|\bIMAX\b|\ba\b|\ban\b|\bthe\b|\b3-D\b|\b3D\b|(\(\s*|\S*\))|(\[\s*|\S*\])|(\{\s*|\S*\})| )/gmi
      , patt1 = /[^a-z]/gmi
      , patt2 = /\D/gmi
      , re    = new RegExp(patt )
      , re1   = new RegExp(patt1)
      , re2   = new RegExp(patt2)
      , str   = str.replace(re ,"")
      , s1    = str.replace(re1,"")
      , s2    = str.replace(re2,"")
      , out1  = s1 .slice(0,n)
      , out2  = s2 .slice(0,n)
      ; return out1.length?out1:"a"+out2} //function test(){var ar=["'71","ABCD(-EFG)","ABCD (-EFG)","Chappie: The IMAX Experience (2015)","The Hobbit: The Desolation of Smaug (IMAX)","3-D The Hobbit: The Desolation of Smaug (IMAX)"],i=ar.length;while(i--){Logger.log(str2codename(ar[i]))}}//function test(){Logger.log("ABCD(-EFG)".toLowerCase().slice(0,10))}
function date2weekOfYear(d){d=d||new Date();var y=d.getFullYear(),d0=new Date(y,0),d1=d-d0;return parseInt(d1/(1000*60*60*24*7))}//@param{date} d date object or string //@return{integer} Number of whole weeks since the input date d and January 1st of same year //function test(){Logger.log(date2weekOfYear())}
function isUpperCase(str){return str==str.toUpperCase()} // Returns true if string is all caps; function isUpperCase(string){return /^[A-Z]+$/.test(string)} // Reference: http://www.highdots.com/forums/jquery/detect-capital-letters-284279.html | Google search: javascript function test for all caps
function isInt(n){return n%1===0} //@return{boolean} - true if n is an integer; false if not // function test(){var ar=["12,385","123","123.65"],i=ar.length;while(i--){Logger.log(LibraryjsUtil.isInt(ar[i]))}} // function test(){Logger.log(LibraryjsUtil.isInt("123,85 xyz".split(" ")[0]))}
function isNumber(num){return num==(num*1)} // Returns true if and only if argument expression is a number. // function test(){Logger.log( isNumber("123.64 xyz".split(" ")[0]))} // return num===Number(num) fails test fn // Experimental regex solution/test (needs to add decimal case): function testx(){Logger.log( (/\D/).test(" xyz".split(" ")[0]))}
function isArray(ar){return Object.prototype.toString.call(ar) === "[object Array]"} // Returns true if argument expression is an array. Reference: http://stackoverflow.com/questions/1759375/testing-if-the-element-is-an-array-in-javascript
function isObject(ob){return Object.prototype.toString.call(ob) === "[object Object]"} // CAUTION (DEFECT): RETURNS TRUE IF NULL || UNDEFINED (try: ob.r==undefined) // Returns true if argument expression is a "JSON" object. Reference: http://stackoverflow.com/questions/1759375/testing-if-the-element-is-an-array-in-javascript
function isEmail(str){return (str.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.([A-Za-z0-9]{2,4})$/)!=-1)} // Ref: http://www.auction.com/js/common-function.js // Returns true if string is a validly formatted email address // Additional resources: http://www.regular-expressions.info/  www.regular-expressions.info/email.html
function getKeys(ob){return Object.keys(ob)} // @return {array} | all keys in a JSON object // @param {object} | input object from which to extract an array of its keys
function params2str(ob){var str="",keys=Object.keys(ob),i=keys.length;while(i--){str+=("&"+keys[i]+"="+ob[keys[i]])}return str} // @return{string}:parameter string to append to url // @param{obj}:json object of parameters to be converted to string
function ob2httpGetParams(ob){return params2str(ob)} //2params ob2params
function compareArrays(arr1,arr2){var i=Math.max(arr1.length,arr2.length);while(i--){Logger.log("arr1["+i+"]: "+arr1[i]);Logger.log("arr2["+i+"]: "+arr2[i]);}} // Take two 1D arrays as input and return a log of each element in both arrays plus the element number.
function getStringsRandom(ob){ob=ob||{};ob.num=ob.num||1;ob.len=ob.len||20;ob.digits=ob.digits||"on";ob.loweralpha=ob.loweralpha||"on";/*ob.upperalpha=ob.upperalpha||"on";*/ob.unique=ob.unique||"on";ob.format=ob.format||"html";ob.rnd=ob.rnd||"new";
    var act="https://www.random.org/strings/?"+/*LibraryjsUtil.*/ob2httpGetParams(ob) //num=5&len=20&digits=on&loweralpha=on&unique=on&format=html&rnd=new"
      , r=UrlFetchApp.fetch(act).getContentText().match(/>\n(\w+\n)+</gmi)[0].replace(/(<|>)/gmi,"").split(/\n/gmi);r.shift();r.pop();return r}//function test(){Logger.log(getStringRandom({num:5}))}
function craigslistIndexPrepM(beg,end){ // Calculates PREP-M Index for every city in U.S. PREP-M = The CHANGE IN (Craigslist job postings ("jjj") / real estate ads ("rea")) : i.e, THE PREP-M INDEX IS A DELTA / DIFFERENTIAL CALCULATION
	if(!beg){beg=0} // beg & end arguments are to control the number of URLs evaluated as some services will limit script execution time. Therefore we must hard code iteration boundries in the function call.
    var k,j,i,city=clone(craigslistCities("USA"));var out=new Array();k=0;var d=new Date();if(!end){end=city.length}i=end;while(i---beg){j=city[i].length;while(j---1){out[k]=new Array();
        out[k][0] = d.getUTCFullYear();                      // year      = 2012;
        out[k][1] = d.getUTCMonth()+1;                       // month     = 8;
        out[k][2] = d.getUTCDate();                          // date      = 26;
        out[k][3] = d.getUTCHours();                         // hour      = 14;
        out[k][4] = city[i][0];                              // nameState = "Alabama";
        out[k][5] = city[i][j][1];                           // nameCity  = "auburn";
        out[k][6] = city[i][j][0];                           // actionURL = "http://auburn.craigslist.org";
        out[k][7] = city[i][j][0].craigslistCountAds("rea"); // Ad count, section "rea" | Supply: count of homes for sale
        out[k][8] = city[i][j][0].craigslistCountAds("jjj"); // Ad count, section "jjj" | Demand: count of jobs  for hire
        k++;}} return out}                                   // Logger.log("out["+k+"]: "+out[k]);
function craigslistCities(geo){ // Returns 3D array [][][] of craigslist cities: [][]state-name, [][][]URL-city, [][]city-name
	// Note: Set geo="USA" (e.g, call: craigslistCities("USA") to fetch only U.S. cities.)
	/* Data Model
		[   [0]      [1][0]                            [1][1]
		[0] [Alabama,[http://auburn.craigslist.org    ,auburn],
					 [2][0]                            [2][1]
					 [http://bham.craigslist.org      ,birmingham],
			[0]      [1][0]                            [1][1]
		[1] [Alaska, [http://anchorage.craigslist.org ,anchorage / mat-su],
					 [2][0]                            [2][1]
					 [http://fairbanks.craigslist.org ,fairbanks],*/
    var ACT="http://www.craigslist.org/about/sites";var STATE_DELIMITER="<div class=\"state_delimiter\">";
    var j,i,states = UrlFetchApp.fetch(ACT).getContentText().split(STATE_DELIMITER);states.shift();i=states.length;while(i--){states[i]=states[i].split("href=\"");states[i][0]=states[i][0].getPrefix("<");j=states[i].length;while(j---1){states[i][j]=states[i][j].split("\">");states[i][j][1]=states[i][j][1].getPrefix("<").trim();/*Logger.log("states["+i+"]["+j+"]: "+states[i][j]);*/}}
    states.pop();if(geo=="USA"){states=states.slice(0,51)}return states}
String.prototype.craigslistCountAds = function(sec){ // Count CL ads in a given city in a given section // this: var loc="http://losangeles.craigslist.org";var sec="rea"; // http://losangeles.craigslist.org/rea/index100.html // Sample call: Logger.log("http://losangeles.craigslist.org".craigslistCountAds("rea"));
    var iLo,iHi,i=1;iLo=0;while(!iHi || ((iHi-iLo)>1)){
        if(/>next 100 postings</.test(UrlFetchApp.fetch(this+"/"+sec+"/index"+(i*100)+".html").getContentText())){iLo=i}else{iHi=i} // Alt: var patt1=new RegExp("id=\"nextpage\""); Ref: http://www.w3schools.com/js/js_obj_regexp.asp
		// Utilities.sleep(1000); // Prevents error thrown by invoking UrlFetch too frequently in a given time frame // Might need to try settimeout method instead
        if(!iHi){i*=10}else{i=Math.round((iLo+iHi)/2)}} // Iterate i until we identify the last page. // Logger.log(i); // Tells us the number of pages of Craigslist ads for the given location and section
    return ((i*100)+UrlFetchApp.fetch(this+"/"+sec+"/index"+(i*100)+".html").getContentText().split("<p ").length-1)} // Return: page count * records per page + last page record count // Alt: .split("class=\"row\"")
Date.prototype.yymmdd = function(){return [this.getFullYear(),this.getMonth()+1,this.getDate()]}  // Return array as parsed date [YY,MM,DD] // MM | add "1" (+1) as month values start at zero
String.prototype.stripDigits = function(){return this.replace(/\D/g,"")} // Strip numerical digits out of, say, a phone number string. Example: "(555) 444-3333".stripDigits() == 555444333;
function        _replaceAll(str,del,ins){return str.replaceAll(del,ins)}
String.prototype.replaceAll = function(subDelete,subInsert){return this.split(subDelete).join(subInsert)} // Replace all occurences of "subThis" with "subWith" in the string "str" // Reference: http://www.dynamic-tools.net/toolbox/replaceAll/ // Google search terms: javascript string replace all function // Note: We studied using regexp, which tested faster at http://jsperf.com/split-join-vs-regex-replace/6. Only problem: complication from trying to insert variable into regexp.
String.prototype.replaceAllArray = function(matrix){ // Replace all (many) characters in a string with (one) character. Iterate over an an array.
	/* Parameter | Example
		var matrix = [                                       // Note: matrix.length == 2; matrix[0].length == matrix[1].length; matrix[0][i] >= 1; matrix[1][i].length == 0;
			[["%26","&","amp;","#38;"],["%25","%","&#37;"]], // Replace ..the characters in this array // Example: "&" and "%" (common in URLs) create problems when passed to Zoho API via XML. So replace.
			[          "and"          ,     "percent"     ]  // With .....the characters in this array
		];
	*/
    var j,i,out=this;i=matrix[0].length;while(i--){j=matrix[0][i].length;while(j--){out=out.replaceAll(matrix[0][i][j],matrix[1][i])}}return out;}
String.prototype.getSuffix = function(marker){return this.slice((this.indexOf(marker) + marker.length))} // OR use .split(x).slice(1).join(x) //String.prototype.getSuffix=getSuffix; // Returns SUFFIX substring | AFTER the PREFIX (marker).
String.prototype.getPrefix = function(marker){return this.slice(0,this.indexOf(marker))} // OR use .split()[0] //String.prototype.getPrefix=getPrefix; // Returns PREFIX substring | BEFORE the SUFFIX (marker).
function clone(obj){return JSON.parse(JSON.stringify(obj)); // Clones object // Makes new object (not merely "reference to" old object per e.g., var dup=arr; // Modifies and replaces two below versions // Simpler
	/* Deprecated
/* function clone(obj){ // Modified from prototype notation below
		var newObj = (obj instanceof Array) ? [] : {};
		for (i in obj) {
			if (i == 'clone') continue;
			if (obj[i] && typeof obj[i] == "object") {
				newObj[i] = clone(obj[i]);
			} else newObj[i] = obj[i]
		} return newObj;
}* /
/* Object.prototype.clone = function(){ // Consider: return JSON.parse(JSON.stringify(this)) // Copies multi-dimentional arrays and other objects without making only a "reference" to those objects // Reference: http://my.opera.com/GreyWyvern/blog/show.dml/1725165
	/* Notes 1 | General comments
There are a few things that trip people up with regards to Javascript.
One is the fact that assigning a boolean or string to a variable makes a copy of that value,
while assigning an array or an object to a variable makes a reference to the value.

Surprisingly, arrays are easy to copy because a couple of native Array object methods actually return a copy of the array.
The easiest to use is the slice() method:

var foo = [1, 2, 3];
var bar = foo;
bar[1] = 5;
alert(foo[1]);
// alerts 5

var foo = [1, 2, 3];
var bar = foo.slice(0);
bar[1] = 5;
alert(foo[1]);
// alerts 2

The slice(0) method means, return a slice of the array from element 0 to the end. In other words, the entire array. Voila, a copy of the array.
The only caveat to remember here is that this method works if the array contains only simple data types, like numbers, strings and booleans.
If the array contains objects or other arrays (a multi-dimensional array), then those contained "objects" will be copied by reference,
retaining a connection with the source array. In such a case you will need to copy the array as a full-fledged object.
	* /
    /* Notes 2 | Function call examples
		Call Example 1
			var foo = {a: 1, b: 2, c: 3};
			var bar = foo;
			bar.b = 5;
			alert(foo.b);
			// alerts 5
		Call Example 2
			var foo = {a: 1, b: 2, c: 3};
			var bar = foo.clone();
			bar.b = 5;
			alert(foo.b);
			// alerts 2
    * /
    {//Code
		var newObj = (this instanceof Array) ? [] : {};
		for (i in this) {
			if (i == 'clone') continue;
			if (this[i] && typeof this[i] == "object") {
				newObj[i] = this[i].clone();
			} else newObj[i] = this[i]
		} return newObj;
	}
}* / */}
function getIncomePercentile(income){return UrlFetchApp.fetch("http://www.whatsmypercent.com/incomeRank.php?status=All%20Filers&income="+income).getContentText().split("<td>")[2].split("%"/*"</td>"*/)[0]}//function test(){Logger.log(/*LibraryjsUtil.*/getIncomePercentile(55000))}
function percentile(n,arr){ // Sample call: var dataGauge=[["Label","Value"],["Section",LibraryjsUtil.percentile(n[0].indexSubject,function(){var out=[],i=10;while(i--){var str="nb"+i+"price";if(n[0][str]==1*n[0][str]){out.push(n[0][str])}}return out}())]]
 // @param {         number } n   | Any number to find the percentile
 // @param {array of numbers} arr | Gets sorted in increasing order
 // @return{integer         } k   | The percentile of n in arr. Top number is 100th percentile
    arr.sort(function(a,b){return a-b});var i=arr.length;while(i--){if(n>=arr[i]){return Math.round(100*(i+1)/arr.length)}}}//function test(){var ar=[[4,[1,2,3,4,5,6,7,8,9]],[5,[9,8,7,6,5,4,3,2,1]],[6,[8,9,2,0,8,8,5,7,4,1]]],i=ar.length;while(i--){Logger.log("i:%s, a:%s, arr:%s, k:%s",i,ar[i][0],ar[i][1],/*LibraryjsUtil.*/percentile(ar[i][0],ar[i][1]))}}
function normalizeRatio(a,b){ // Sample call: LibraryjsUtil.normalizeRatio(n[0].fcVal0,n[0].fcVal2)
 // @param {int} a | Estimated home value
 // @param {int} b | Neighborhood price index (median estimated value)
 // @return{int} c | Integer between 0 and 100 representing a normalized ratio between the two
 // Lower is bad. Higher is good. Consistent with the other gauge charts to make them more intuitive to read as a group.
 // Range: 0 min, 100 max. Same reason as above.
 // 100% can bound the result. 100% can represent the value of the larger of the two.
 // Therefore, -100% would represent the opposite end of the scale before normalization.
 // This application is to quantify the advice not to own the highest priced house in the neighborhood.
 // Other applications include the ratio of foreclosures in the neighborhood to the city and nation.
 // Another (off topic) application is to create percentiles in comparing the home index to surrounding neighborhoods.
 // Note: For statistical rigor: If estimates are used, make sure they are from the same source.
 // Example: If Zillow is used for the neighborhood index, b, use the Zillow estimate for a and not the median of a pool of AVMs.
 // Target results:
 // a = 0 , c =  100 before normalization , c = 100 after normalization
 // b = 0 , c = -100 before normalization , c =   0 after normalization
 // a = b , c =    0 before normalization , c =  50 after normalization
    var c=100*(b-a)/Math.max(a,b);c=c+(100-c)/2;return Math.round(c)} //function test(){var ar=[[0,99999],[99999,0],[88000,88000],[100000,50000],[50000,100000]],i=ar.length;while(i--){Logger.log("i:%s, a:%s, b:%s, c:%s",i,ar[i][0],ar[i][1],normalizeRatio(ar[i][0],ar[i][1]))}}
function       _descriptiveStatistics(arr){return arr.descriptiveStatistics()} // var r=LibraryjsUtil._descriptiveStatistics(arr) // Because GAS doesn't seem to access prototype version i.e., str.LibraryjsUtil.descriptiveStatistics()
Array.prototype.descriptiveStatistics = function(){
	/* Parameters
		@return {object} | Stats; example: {"Count":"foo","SumX":"foo","SumX2":"foo","Minimum":"foo","Maximum":"foo","Range":"foo","StdDevPop":"foo","StdDevEst":"foo","ArithMean":"foo","HarmonicMean":"foo","GeometricMean":"foo","Median":"foo","Modes":"foo","ModeFrequency":"foo","IsOk":"foo"}
		@param	{array } | this ; example: [15,17,35,42,19]
	*/
	/* Sample Call
	var out={},avmSet=[],x=Object.keys(avm),i=x.length;out.ob={};while(i--){try{if(avm[x[i]].estimate){avmSet.push(avm[x[i]].estimate);out.ob[x[i]]=avm[x[i]].estimate}}catch(e){Logger.log("Error 90ozg: "+e.message)}} // array of AVM estimates to pass to descriptiveStatistics()
		out.set      = LibraryjsUtil.clone(avmSet).sort(function(a,b){return b-a}); // Return original bid set (before processing; i.e., removal of outliers)
	var	avmStats     = LibraryjsUtil._descriptiveStatistics(avmSet); // Process statistical results + format for output/return // Calculate descriptive statistics of the set of AVM estimates
		out.isOk     = avmStats.IsOk;                          // ISOK   | Boolean; evaluates to TRUE if all inputs reduce to numeric and are included in stat calculations
		out.popCount = avmStats.Count;                         // COUNT  | Returns the count of the population of inputs that reduced to a numeric to be included in the stat calculations
		out.autoEst  = Math.round(avmStats.Median);            // ARV    | MEDIAN of all estimates  //valCalc[2] = avm[1][colZillow];
		out.margin   = out.autoEst - ask;                      // MARGIN | calculate margin
		out.ratio    = Math.ceil(100*(ask/out.autoEst));       // RATIO  | calculate ratio // Convert to percent; round up
		out.sdPop    = avmStats.StdDevPop;                     // StdDevPop | Population stardard deviation
		out.sdPct    = Math.ceil(100*(out.sdPop/out.autoEst)); // StdDevPct | Pop std dev as pct% of estimated ARV // Convert to percent; round up to register small values as "1" instead of "0"
		out.sdPop    = Math.ceil(out.sdPop);                   // Round StdDevPop last to minimize rounding error in StdDevPct; round up to register small values as "1" instead of "0"
    return 	out} */
	{// Live Code
var Input              = this;
var Raw                = new Array(); // an array for holding only the legitimate numeric values from Input
var Stats              = new Array(); // the array for holding the statistics
var AllowGHMean        = true;        // any input <= 0 makes calculation of the Geometric and Harmonic means invalid
Stats["Count"]         = 0;           // N, the number of values in the input list
Stats["SumX"]          = 0;           // Sum of all the X input values
Stats["SumX2"]         = 0;           // Each X is squared, then all the squares are summed
Stats["Minimum"]       = Number.NaN;  // Lowest value encountered
Stats["Maximum"]       = Number.NaN;  // Highest value encountered
Stats["Range"]         = Number.NaN;  // Highest - Lowest
Stats["StdDevPop"]     = Number.NaN;  // Population Standard Deviation (N weighting)
Stats["StdDevEst"]     = Number.NaN;  // Estimated Standard Deviation from sampled data (N-1 weighting)
Stats["ArithMean"]     = Number.NaN;  // Arithmetic mean (average)
Stats["HarmonicMean"]  = Number.NaN;  // Harmonic mean
Stats["GeometricMean"] = Number.NaN;  // Geometric mean
Stats["Median"]        = Number.NaN;  // Median, C50, midpoint. Half the values fall above/below this value.
Stats["Modes"]         = new Array(); // Modes, most frequent input value(s). It is an array because there can be > 1 mode.
Stats["ModeFrequency"] = 0;           // Number of occurrences of the modal value.
Stats["IsOk"]          = true;        // True only if all input values were successfully parsed as numbers.
// Could do this in two passes for better "numerical stability",
// although lack of significant digits is hardly a likely problem.
// Pass 1: transfer the data from Input to Raw, then sort Raw from smallest absolute value to largest.
// Pass 2: do the math calculations
var x, i, tally;
for(i = 0 ; i < Input.length ; i++)
{
	x = parseFloat(Input[i]);
	if(isNaN(x))
	{
		// Since failed values are ignored, the stats might be ok even if this flag is set, but this is a warning.
		Stats["IsOk"] = false;
	}
	else
	{
		Raw.push(x);
		if(x <= 0)
			AllowGHMean = false;
		// Delay initializing Min and Max until now so they remain NaN if there are no valid numbers in Input array.
		if(Stats["Count"] == 0)
		{
			Stats["Minimum"] = Number.MAX_VALUE;
			Stats["Maximum"] = -(Number.MAX_VALUE);
		}
		Stats["Count"]++;
		Stats["SumX"] += x;
		Stats["SumX2"] += x * x;
		Stats["Minimum"] = Math.min(Stats["Minimum"],x);
		Stats["Maximum"] = Math.max(Stats["Maximum"],x);
	}
}
if(Stats["Count"] > 0)
{
	Raw.sort(function(l,r){return l - r;});	// sort numerically for mode and median calculations

	Stats["Range"] = Stats["Maximum"] - Stats["Minimum"];
	Stats["ArithMean"] = Stats["SumX"] / Stats["Count"];
	// Pop calculation is always valid. If N==1, Pop and Est are both 0. If N>1, value of Est gets overwritten later.
	Stats["StdDevEst"] = Stats["StdDevPop"] = Math.sqrt((Stats["Count"] * Stats["SumX2"]) - (Stats["SumX"] * Stats["SumX"])) / Stats["Count"];
	Stats["Median"] = Raw[0];	// default value, for Count == 1; will be overridden if Count > 1

	if(AllowGHMean == true)
	{
		// Harmonic mean calculation
		x = 0;
		for(i = 0 ; i < Stats["Count"] ; i++)
			x += (1 / Raw[i]);
		Stats["HarmonicMean"] = Stats["Count"] / x;

		// Geometric mean calculation
		x = 1;
		for(i = 0 ; i < Stats["Count"] ; i++)
			x *= Math.pow(Raw[i], 1 / Stats["Count"]);	// this calc avoids math overflow
		Stats["GeometricMean"] = x;
	}

	// Mode calculation. Allows for multimodal data sets.
	x = Raw[0];								// each number encountered, initialized to first element
	tally = 1;								// tallies frequency of each; first element occurs at least once.
	for(i = 1 ; i < Stats["Count"] ; i++)
	{
		if(Raw[i] == x)							// if it's another occurrence,
			tally++;							// just increment the counter
		else                        			// else if we hit a new #,
		{										// first decide if the old number is a mode candidate.
			if(tally == Stats["ModeFrequency"])	// if tally is a tie, add number to the modes list
				Stats["Modes"].push(x);
			if(tally > Stats["ModeFrequency"])	// if there is a new higher frequency,
			{
				Stats["Modes"].length = 0;		// delete all previous mode candidates
				Stats["Modes"].push(x);   		// add this one to the list
				Stats["ModeFrequency"] = tally;	// and update the highest count counter
			}
			x = Raw[i];   						// now start tallying the new number
			tally = 1;							// it has already occurred once
		}
	}
	if(tally == Stats["ModeFrequency"])		// final check: maybe the last # was also a potential mode
		Stats["Modes"].push(x);
	if(tally > Stats["ModeFrequency"])
	{
		Stats["Modes"].length = 0;
		Stats["Modes"].push(x);
		Stats["ModeFrequency"] = tally;
	}
}
if(Stats["Count"] > 1)
{
	// Mode, continued: if there was only 1 input value, it's ok to let it be the mode,
	// but if there were multiple input values, minimum frequency for the mode is 2.
	if(Stats["ModeFrequency"] < 2)
	{
		Stats["Modes"].length = 0;		// No legitimate mode found.
		Stats["ModeFrequency"] = 0;		// No occurrences.
	}

	// Estimated Standard Deviation is only valid when Count > 1, to avoid divide by zero.
	Stats["StdDevEst"] =
		Math.sqrt(((Stats["Count"] * Stats["SumX2"]) - (Stats["SumX"] * Stats["SumX"])) / (Stats["Count"] * (Stats["Count"] - 1)));

	// Median calculation (midpoint of data points)
	i = Math.floor(Stats["Count"] / 2);		// in JavaScript, must explicitly truncate to integer
	if((Stats["Count"] % 2) == 1)			// if Count is odd, the center point is known
		Stats["Median"] = Raw[i];
	else									// if Count is even, interpolate to get a "center" point
		Stats["Median"] = (Raw[i - 1] + Raw[i]) / 2;
}
return Stats; }
	/*	Version: (Descriptive Stats) Current     | original code + notes
Notes

Inputs OK:	If any of the text could not be interpreted as numeric, this would show as False.
			However, because characters that are illegal in a number are removed before the list is processed, this will always be True,
			and a better validity check is to make sure the Count below matches the number of items you know are in the list.
			You can also check for illegal characters by clicking Reverse twice and checking to see if any of the numbers got changed.
Count: ....	The number of data items.
Minimum: ..	The lowest number.
Maximum: ..	The highest number.
Range .....	= Maximum - Minimum.
Sum: ......	All the numbers added together, N1 + N2 + N3...
Arithmetic Mean, the  Average: Sum / Count
Harmonic Mean = Count / (1/N1 + 1/N2 + 1/N3...)
Geometric Mean = (N1 * N2 * N3...)Exp(1/Count)
Population Standard Deviation (N weighting):
			The actual standard deviation of the numbers in your list, when they constitute the entire population (data set) under consideration.
			If your numbers are a sample (subset) of a larger set of numbers, use the Estimated Standard Deviation below.
			If the data set is "normally distributed" (its graph makes a "bell shaped curve"),
			about 68% of the values lie between -1SD and +1SD, about 95% are between +/-2SD, and about 99.7% are between +/-3SD.
Population Variance: the (N weighted) standard deviation, squared.
Estimated Standard Deviation (N-1 weighting):
			When your set of numbers is a representative sample (subset) of a larger set of numbers,
			which you want to use as the basis of an estimate of the standard deviation of the whole population,
			it is common to use this Estimated Standard Deviation.
			Its use of (N-1) instead of (N) in the denominator of a calculation gives a slightly larger result.
			The reasoning is that there is more variance (from which the standard deviation is calculated) in a large set of numbers than in any smaller subset of it.
			Thus, the Population StdDev (N weighting, above) of a subset would be an underestimation of the true standard deviation of the larger population,
			so this (N-1) weighting is used instead.
Estimated Variance: the (N-1 weighted) standard deviation, squared.
Median (midpoint, middle point, C50):
			half the numbers in the list are above the median, and half below.
			If the number of data points is even, the median is an interpolated value halfway between the two middle data points.
Mode: .....	The most frequently occurring number(s) in the list. If there was only one input number, it is the mode.
			Otherwise, a data point can only be a mode if its frequency is > 1. If no value is shown, there is no legitimate modal value.
			If there are multiple values with the same frequency > 1, they are separated by commas.
Mode Frequency: The number of occurrences of the modal value(s).
Sum of (X2): Each number in the list is squared (X*X), and then all the squares are added together. Some statistics calculations use this.
(Sum of X)2: All the numbers are added together (the Sum), and then the total is squared. Some statistics calculations use this.

End notes

	Reference: http://25yearsofprogramming.com/javascript/descriptivestatistics.js, http://25yearsofprogramming.com/javascript/descriptivestatistics.htm
	descriptivestatistics.js		12-31-2008		JavaScript
	Copyright (C)2008 Steven Whitney.
	Initially published by http://25yearsofprogramming.com.

	This program is free software; you can redistribute it and/or
	modify it under the terms of the GNU General Public License (GPL)
	Version 3 as published by the Free Software Foundation.
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.
	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

Given an input set of values, it calculates and returns statistics describing the set.

It returns an associative array whose members can be accessed as either array elements or properties.
Examples: Stats["Count"] or Stats.Count
In the unlikely situation of iterating its members, only
for(i in array) seems to work properly.
for(i = 0 ; i < array.length ; i++)
apparently does not iterate associative elements, nor even recognize their existence.
//----------------------------------------------------------------------------------------------
// Input must be an array with the data items in its successive elements.
// The return value is an associative array with the stats in its elements.
function DescriptiveStatistics(Input){
var Raw                = new Array(); // an array for holding only the legitimate numeric values from Input
var Stats              = new Array(); // the array for holding the statistics
var AllowGHMean        = true;		  // any input <= 0 makes calculation of the Geometric and Harmonic means invalid
Stats["Count"]         = 0;			  // N, the number of values in the input list
Stats["SumX"]          = 0;			  // Sum of all the X input values
Stats["SumX2"]         = 0;			  // Each X is squared, then all the squares are summed
Stats["Minimum"]       = Number.NaN;  // Lowest value encountered
Stats["Maximum"]       = Number.NaN;  // Highest value encountered
Stats["Range"]         = Number.NaN;  // Highest - Lowest
Stats["StdDevPop"]     = Number.NaN;  // Population Standard Deviation (N weighting)
Stats["StdDevEst"]     = Number.NaN;  // Estimated Standard Deviation from sampled data (N-1 weighting)
Stats["ArithMean"]     = Number.NaN;  // Arithmetic mean (average)
Stats["HarmonicMean"]  = Number.NaN;  // Harmonic mean
Stats["GeometricMean"] = Number.NaN;  // Geometric mean
Stats["Median"]        = Number.NaN;  // Median, C50, midpoint. Half the values fall above/below this value.
Stats["Modes"]         = new Array(); // Modes, most frequent input value(s). It is an array because there can be > 1 mode.
Stats["ModeFrequency"] = 0;			  // Number of occurrences of the modal value.
Stats["IsOk"]          = true;		  // True only if all input values were successfully parsed as numbers.

// Could do this in two passes for better "numerical stability",
// although lack of significant digits is hardly a likely problem.
// Pass 1: transfer the data from Input to Raw, then sort Raw from smallest absolute value to largest.
// Pass 2: do the math calculations
var x, i, tally;
for(i = 0 ; i < Input.length ; i++)
{
	x = parseFloat(Input[i]);
	if(isNaN(x))
	{
		// Since failed values are ignored, the stats might be ok even if this flag is set, but this is a warning.
		Stats["IsOk"] = false;
	}
	else
	{
		Raw.push(x);
		if(x <= 0)
			AllowGHMean = false;
		// Delay initializing Min and Max until now so they remain NaN if there are no valid numbers in Input array.
		if(Stats["Count"] == 0)
		{
			Stats["Minimum"] = Number.MAX_VALUE;
			Stats["Maximum"] = -(Number.MAX_VALUE);
		}
		Stats["Count"]++;
		Stats["SumX"] += x;
		Stats["SumX2"] += x * x;
		Stats["Minimum"] = Math.min(Stats["Minimum"],x);
		Stats["Maximum"] = Math.max(Stats["Maximum"],x);
	}
}
if(Stats["Count"] > 0)
{
	Raw.sort(function(l,r){return l - r;});	// sort numerically for mode and median calculations

	Stats["Range"] = Stats["Maximum"] - Stats["Minimum"];
	Stats["ArithMean"] = Stats["SumX"] / Stats["Count"];
	// Pop calculation is always valid. If N==1, Pop and Est are both 0. If N>1, value of Est gets overwritten later.
	Stats["StdDevEst"] = Stats["StdDevPop"] = Math.sqrt((Stats["Count"] * Stats["SumX2"]) - (Stats["SumX"] * Stats["SumX"])) / Stats["Count"];
	Stats["Median"] = Raw[0];	// default value, for Count == 1; will be overridden if Count > 1

	if(AllowGHMean == true)
	{
		// Harmonic mean calculation
		x = 0;
		for(i = 0 ; i < Stats["Count"] ; i++)
			x += (1 / Raw[i]);
		Stats["HarmonicMean"] = Stats["Count"] / x;

		// Geometric mean calculation
		x = 1;
		for(i = 0 ; i < Stats["Count"] ; i++)
			x *= Math.pow(Raw[i], 1 / Stats["Count"]);	// this calc avoids math overflow
		Stats["GeometricMean"] = x;
	}

	// Mode calculation. Allows for multimodal data sets.
	x = Raw[0];								// each number encountered, initialized to first element
	tally = 1;								// tallies frequency of each; first element occurs at least once.
	for(i = 1 ; i < Stats["Count"] ; i++)
	{
		if(Raw[i] == x)							// if it's another occurrence,
			tally++;							// just increment the counter
		else                        			// else if we hit a new #,
		{										// first decide if the old number is a mode candidate.
			if(tally == Stats["ModeFrequency"])	// if tally is a tie, add number to the modes list
				Stats["Modes"].push(x);
			if(tally > Stats["ModeFrequency"])	// if there is a new higher frequency,
			{
				Stats["Modes"].length = 0;		// delete all previous mode candidates
				Stats["Modes"].push(x);   		// add this one to the list
				Stats["ModeFrequency"] = tally;	// and update the highest count counter
			}
			x = Raw[i];   						// now start tallying the new number
			tally = 1;							// it has already occurred once
		}
	}
	if(tally == Stats["ModeFrequency"])		// final check: maybe the last # was also a potential mode
		Stats["Modes"].push(x);
	if(tally > Stats["ModeFrequency"])
	{
		Stats["Modes"].length = 0;
		Stats["Modes"].push(x);
		Stats["ModeFrequency"] = tally;
	}
}
if(Stats["Count"] > 1)
{
	// Mode, continued: if there was only 1 input value, it's ok to let it be the mode,
	// but if there were multiple input values, minimum frequency for the mode is 2.
	if(Stats["ModeFrequency"] < 2)
	{
		Stats["Modes"].length = 0;		// No legitimate mode found.
		Stats["ModeFrequency"] = 0;		// No occurrences.
	}

	// Estimated Standard Deviation is only valid when Count > 1, to avoid divide by zero.
	Stats["StdDevEst"] =
		Math.sqrt(((Stats["Count"] * Stats["SumX2"]) - (Stats["SumX"] * Stats["SumX"])) / (Stats["Count"] * (Stats["Count"] - 1)));

	// Median calculation (midpoint of data points)
	i = Math.floor(Stats["Count"] / 2);		// in JavaScript, must explicitly truncate to integer
	if((Stats["Count"] % 2) == 1)			// if Count is odd, the center point is known
		Stats["Median"] = Raw[i];
	else									// if Count is even, interpolate to get a "center" point
		Stats["Median"] = (Raw[i - 1] + Raw[i]) / 2;
}
return Stats;
}
*/
	/*	Version: (Median)            Revision #3 | malfunctioning
Array.prototype.median = function(){ // Return median value of number array
	for(var j=0;j<this.length;j++){
		this[j]=Number(this[j]);                 // Convert all numbers as text to actual numbers
		if(!Number(this[j])){this.splice(j,1);}} // Remove all non-numbers from the array
	this.sort(function(a,b){return a-b})         // Sortfunction reference: http://www.w3schools.com/jsref/jsref_sort.asp, http://www.javascriptkit.com/javatutors/arraysort.shtml
	var size = this.length;                      // Determine the number of array elements.
	var evenOrOdd = size%2;                      // % is modulus | remainder after division.
	if( evenOrOdd==1 ){                          // Case A: The list size is odd.
		var i = (((size+1)/2)-1);                // Subtract one from the fraction because the list index count begins with zero instead of one.
		var m = Number(this[i]);}
	else if( evenOrOdd==0 ){                     // Case B: The list size is even.
		var iLo = ((size/2)-1);                  // Subtract one from the fraction because the list index count begins with zero instead of one.
		var iHi = (iLo+1);
		var mLo = Number(this[iLo]);
		var mHi = Number(this[iHi]);
		var   m = Math.round(Number(((mLo+mHi)/2)));}
	this.splice(0,this.length);                  // Resets the input array
	return m;}
*/
	/*	Version: (Median)            Revision #2
function median(n){ // Given array, n, return the median value.
	for(var j=0;j<n.length;j++){
		n[j]=Number(n[j]);                       // Convert all numbers as text to actual numbers
		if(!Number(n[j])){n.splice(j,1);}        // Remove all non-numbers from the array
	}
	n.sort(function(a,b){return a-b})            // Sortfunction reference: http://www.w3schools.com/jsref/jsref_sort.asp, http://www.javascriptkit.com/javatutors/arraysort.shtml
	var size = n.length;                         // Determine the number of array elements.
	var evenOrOdd = size%2;                      // % is modulus | remainder after division.
	if( evenOrOdd==1 ){                          // Case A: The list size is odd.
		var i = (((size+1)/2)-1);                // Subtract one from the fraction because the list index count begins with zero instead of one.
		var m = Number(n[i]);
	}
	else if( evenOrOdd==0 ){                     // Case B: The list size is even.
		var iLo = ((size/2)-1);                  // Subtract one from the fraction because the list index count begins with zero instead of one.
		var iHi = (iLo+1);
		var mLo = Number(n[iLo]);
		var mHi = Number(n[iHi]);
		var   m = Math.round(Number(((mLo+mHi)/2)));
	}
	n.splice(0,n.length);                        // Resets the input array
	return m;
*/
	/*	Version: (Median)            Revision #1
function median( n ){                            // Given array, n, return the median value.
	n.sort(function(a,b){return a-b})            // Sortfunction reference: http://www.w3schools.com/jsref/jsref_sort.asp, http://www.javascriptkit.com/javatutors/arraysort.shtml
	var size = n.length;                         // Determine the number of array elements.
	var evenOrOdd = size%2;                      // % is modulus | remainder after division.
	if( evenOrOdd==1 ){                          // Case A: The list size is odd.
		var i = (((size+1)/2)-1);                // Subtract one from the fraction because the list index count begins with zero instead of one.
			m = n[i];
	}
    else if( evenOrOdd==0 ){                     // Case B: The list size is even.
		var iLo = ((size/2)-1);                  // Subtract one from the fraction because the list index count begins with zero instead of one.
		var iHi = (iLo+1);
		var mLo = n[iLo];
		var mHi = n[iHi];
		var   m = ((mLo+mHi)/2);
	}
	return m;
}	*/
	/*	Version: (Median)            Original
  // *********************************************************
  // **            --- DEFINE METHOD: Median ---            **
  // *********************************************************
  // Decription: Given array, n, return the median value.
  function median( n ){
    n.sort(function(a,b){return a-b}) // Sortfunction reference: http://www.w3schools.com/jsref/jsref_sort.asp, http://www.javascriptkit.com/javatutors/arraysort.shtml
    var size = n.length; // Determine the number of array elements.
    var evenOrOdd = size%2; // % is modulus | remainder after division.
    if( evenOrOdd==1 ){ // Case A: The list size is odd.
      var i = (((size+1)/2)-1); // Subtract one from the fraction because the list index count begins with zero instead of one.
      m = n[i];
    }
    else if( evenOrOdd==0 ){ // Case B: The list size is even.
        var iLo = ((size/2)-1); // Subtract one from the fraction because the list index count begins with zero instead of one.
        var iHi = (iLo+1);
        var mLo = n[iLo];
        var mHi = n[iHi];
        var m = ((mLo+mHi)/2);
    }
    return m;
  }
  //                    End method median
  // *********************************************************
	*/
}
String.prototype.splitName = function(){var arr=this.split(" ");return {"first":arr.splice(0,1).toString(),"last":arr.join(" ")}} // Splits full name ("John Doe") into first + last; this string; out obj {"first":"x","last":"y"}
function geoMapQuest(str){//str=str||"17013 114th Ave SE, Renton, WA 98055";//"5115 Longfellow Street, Los Angeles, CA, 90042";//Reference: http://www.programmableweb.com/news/7-free-geocoding-apis-google-bing-yahoo-and-mapquest/2012/06/21 // Google search: geocoding api
	/*  Test Code
        function test(){var out,addy=["1106 N SHEFFIELD AV, INDIANAPOLIS, IN"]//"16184 Manor, Detroit, MI 48221"]//"1919 Bigelow Avenue N, Seattle, WA"]//"5008 coron ave s, seattle, wa","2865 S Meridian St, INDIANAPOLIS, IN","661 glendale ave., danville va","16741 Ashton Ave., Detroit, MI  48228","1124 8th Ave, New Brighton, PA 15066","732 franklin st, westbury, ny 11590"]
            ,i=addy.length;while(i--){out=JSON.stringify(geoMapQuest(addy[i]));Logger.log(out)}}//;print(out)}}// */
    /*  Data Model | Mapquest @return{object}
        GET http://open.mapquestapi.com/nominatim/v1/search.php?format=json&json_callback=callback&addressdetails=1&q=12204%2012th%20Ave%20NW,%20Seattle,%20WA%2098177
        [ <-- Note: Response is an array by default. Calling function should handle case when array.length > 1. // Update: 1/16/2015 call returned single object, not in array (See below @return)
		    {   "place_id": "451828712",
                "licence": "Data | OpenStreetMap contributors, ODbL 1.0. http://www.openstreetmap.org/copyright",
                "boundingbox": [39.747880720136, 39.747980720136, -104.92691788838, -104.92681788838],
                "lat": "39.747930720136",
                "lon": "-104.926867888384",
                "display_name": "2050, Forest Street, Denver, Denver County, Colorado, 80207, United States of America",
                "class": "place",
                "type": "house",
                "importance": 1.101,
                "address": {
                    "house_number": "2050",
                    "road": "Forest Street",
                    "city": "Denver",
                    "county": "Denver County",
                    "state": "Colorado",
                    "postcode": "80207",
                    "country": "United States of America",
                    "country_code": "us"
			    }}]*/
	//  @return{object} Example: {"place_id":"2001443213","licence":"Data | OpenStreetMap contributors, ODbL 1.0. http://www.openstreetmap.org/copyright","boundingbox":["40.733327605263","40.733427605263","-80.307935052632","-80.307835052632"],"lat":"40.7333776052632","lon":"-80.3078850526316","display_name":"1124, 8th Avenue, New Brighton, Beaver County, penna, 15066, United States of America","class":"place","type":"house","importance":0.621,"address":{"house_number":"1124","road":"8th Avenue","city":"New Brighton","county":"Beaver County","state":"penna","postcode":"15066","country":"United States of America","country_code":"us"},"geoSource":"geoMapQuest"}
	var AUTH={"ApplicationKey":"Fmjtd%7Cluur2g0tnh%2Crg%3Do5-9atxhr","url":"http://developer.mapquest.com/web/info/account/app-keys","email":"PerryLPreciado@suremail.info","pw":"teleworm","Name":"IronOak","ClientID":"137398","RegistryPassword":"tM9mW8qJ"}
      , STEM="http://open.mapquestapi.com/nominatim/v1/search.php?format=json&json_callback=callback&addressdetails=1&q=" // Referenece: http://open.mapquestapi.com/nominatim/
   // , STEM="http://open.mapquestapi.com/geocoding/v1/address?callback=renderGeocode&outFormat=json&key=" // Reference: http://open.mapquestapi.com/geocoding/
      , act=STEM/*+AUTH.ApplicationKey+"&location="*/+encodeURIComponent(str)
   // , act="http://open.mapquestapi.com/geocoding/v1/address?callback=renderGeocode&outFormat=json&key=Fmjtd%7Cluur2g0tnh%2Crg%3Do5-9atxhr&location=Lancaster,PA"
   // , act="http://open.mapquestapi.com/nominatim/v1/search.php?format=json&json_callback=callback&addressdetails=1&q=12204%2012th%20Ave%20NW,%20Seattle,%20WA%2098177"
	  , out=UrlFetchApp.fetch(act).getContentText().slice(10,-2)//;Logger.log(out)
      ; if(out){out=JSON.parse(out);out.geoSource="geoMapQuest";
	    try{var num=str.split(" ")[0];if(/*LibraryjsUtil.*/isInt(num)&&!out.address.house_number){out.address.house_number=num}}catch(e){"Error CJDSx: "+Logger.log(e.message)} // Solves exception case triggered when str="1106 N SHEFFIELD AV, INDIANAPOLIS, IN" i.e, no house address is returned by API (but is returned by main site)
    return out}else{return false}}
function latlon2zip(lat,lon){ // Uses Google Maps API // Reference: https://developers.google.com/apps-script/reference/maps/geocoder#reverseGeocode(Number,Number)
  var r=Maps.newGeocoder().reverseGeocode(lat,lon);//Logger.log(JSON.stringify(r));
  // Is position of returned ordered array items standardized? Is associative array necessary? See following error: https://script.google.com/macros/s/AKfycbwlkeAjSW0xcvSwZNtftJqzsbDRAnufIghP_kohEE0/exec?k=p61z618ammp5leec6tnl&lat=35.123456&lon=-96.123456
  //TypeError: Cannot read property "long_name" from undefined. (line 828, file "Code", project "Library | jsUtil")
  return r.results[0].address_components[8].long_name;}//function test(){Logger.log(latlon2zip(40.758577,-73.984464))}
function latlon2addy(lat,lon){ // Uses Melissadata lookup
    var KEY=[ , "address"  , "route"          , "county"  , "tract"                ]
      , QUE=[ , "Address<" , "Carrier Route<" , "County<" , "Census County-Tract<" ]
      , BEG=[ , "<b>"      , "<b>"            , "<b>"     , "<b>"                  ]
      , END=[ , "&"        , "</"             , "</"      , "</"                   ]
      , x,i,out={latitude:lat,longitude:lon},keys=["street","cityState","zip9"],act="http://www.melissadata.com/lookups/latlngzip4.asp?lat="+lat+"&lng="+lon // http://www.melissadata.com/lookups/latlngzip4.asp?lat=47.463090&lng=-122.330279
      , str=UrlFetchApp.fetch(act).getContentText(),ob=/*LibraryjsUtil.*/_scrapeDataset(str,KEY,QUE,BEG,END)
      ; for(x in ob){out[x]=/*LibraryjsUtil.*/toCaseTitle(ob[x])};out.address=out.address.split("<Br>");i=keys.length;while(i--){
        try{out[keys[i]]=out.address[i]}catch(e){}}
        try{var ar1=out.cityState.split(",");out.city=ar1[0];out.state=ar1[1];}catch(e){}
        try{var ar2=out.zip9.split("-");out.zip5=ar2[0];out.zip4=ar2[1];}catch(e){}
        return out}//function test(){Logger.log(JSON.stringify(latlon2addy("35.123456","-96.123456")))}
function geoMapQuestCsz(str){str=str.replace(/(\+|\-)/gi," "); // MAIN CALL *Call this function* // Note: State is not standard abbreviation (e.g., returns penna, not PA) // In: string, (e.g.,zip); Out: zip, city, state, country, county (if any) // Object model {"zip":"98029","city":"Issaquah","county":"King","state":"WA","country":"US"}
  //@param{str} str - address of subject //@return{object} Example: {"address":{"sa":"1124 8th Avenue","csz":"New Brighton, penna 15066","full":"1124 8th Avenue, New Brighton, penna 15066","part":"8th Avenue, New Brighton, penna 15066"},"latitude":"40.7333776052632","longitude":"-80.3078850526316","geoSource":"geoMapQuestCsz"}
    var map={"house_number":"number","road":"street","class":"class","type":"class","city":"city","county":"county","state":"state","country":"country","country_code":"countryCode","postcode":"zip","lat":"latitude","lon":"longitude","neighbourhood":"neighborhood"};
    var ob=geoMapQuest(str),out={raw:ob.raw,address:{}},keys=Object.keys(ob.address),i=keys.length;while(i--){try{out["address"][map[keys[i]]]=ob["address"][keys[i]]}catch(e){Logger.log("Error sQiuP: "+e.message)}}
 // try{out["address"]["number"   ] =  ob .address.house_number                                               ;}catch(e){Logger.log("Error KZbtg: "+e.message)}
 // try{out["address"]["street"   ] =  ob .address.road                                                       ;}catch(e){Logger.log("Error KZbtg: "+e.message)}
	try{out["address"]["sa"       ] =  out.address.number + " " + out.address.street                          ;}catch(e){Logger.log("Error KZbtg: "+e.message)}
 // try{out["address"]["city"     ] =  ob .address.city                                                       ;}catch(e){Logger.log("Error uzLo3: "+e.message)}
 // try{out["address"]["state"    ] =  ob .address.state                                                      ;}catch(e){Logger.log("Error uzLo3: "+e.message)}
 // try{out["address"]["zip"      ] =  ob .address.postcode                                                   ;}catch(e){Logger.log("Error uzLo3: "+e.message)}
	try{out["address"]["csz"      ] =  out.address.city + ", " + out.address.state + " " + out.address.zip    ;}catch(e){Logger.log("Error uzLo3: "+e.message)}
	try{out["address"]["full"     ] =  out.address.sa + ", " + out.address.csz                                ;}catch(e){Logger.log("Error DEzMx: "+e.message)} //e.g."12204 12th Avenue Northwest, Seattle, WA 98177, USA",
	try{out["address"]["part"     ] =  out.address.full.getSuffix(" ").trim()                                 ;}catch(e){Logger.log("Error XDHpU: "+e.message)}
    try{out["address"]["latitude" ] =  ob.lat                                                                 ;}catch(e){Logger.log("Error XN4DA: "+e.message)}
    try{out["address"]["longitude"] =  ob.lon                                                                 ;}catch(e){Logger.log("Error RG6E0: "+e.message)}
	if(out.address){/*out=JSON.parse(out);*/out.geoSource="geoMapQuestCsz";return out}else{return false}}  // function test(){Logger.log(JSON.stringify(LibraryjsUtil.geoMapQuestCsz("1124 8th Ave New Brighton, PA 15066")))}
function geoGoogle(str){/*MAIN CALL*/if(!str){Logger.log("Error vrWJ8: geoGoogle() address is false");return false}try{var out=geoGoogleGetAddyComponents(geoGoogleFetch(str));if(typeof out=="object"){out.geoSource="geoGoogle";return out}}catch(e){Logger.log("Error wPxmy: "+e.message);return false}} // MAIN CALL // function test(){Logger.log(JSON.stringify(/*LibraryjsUtil.*/geoGoogle("1124 8th Ave New Brighton, PA 15066")))} // Calls Google Geocoder (Analagous to MapQuest using main function call geoMapQuestCsz() - Note asymmetrical naming ...Csz() ) // @param{string} str: unparsed address (e.g., zip only) // @return{object} keys: "number","street","city","state","zip","county","country","geoSource" // @return{object} Example: {"country":"US","zip":"15066","county":"Beaver County","state":"PA","city":"New Brighton","street":"8th Ave","number":"1124","latitude":40.733223,"longitude":-80.307868,"formatted_address":"1124 8th Avenue, New Brighton, PA 15066, USA","geoSource":"geoGoogle"} // Reference: https://developers.google.com/maps/documentation/geocoding/#JSON // function test(){var scraped="17013 114 ave se, Renton, Wa";Logger.log(JSON.stringify(geoGoogle(scraped)))}
function geoGoogleFetch(str){var out=UrlFetchApp.fetch("http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address="+encodeURIComponent(str)).getContentText();return out?JSON.parse(out):false;
    // function test(){Logger.log(JSON.stringify(geoGoogleFetch("1124 8th Ave New Brighton, PA 15066")))}
    // Geocoder provided by Google // @param{string} str: unparsed address (e.g., zip only) // @return{object}: parsed address + geodata // XML also available // Reference: https://developers.google.com/maps/documentation/geocoding/#JSON
/*  Object model (of input, see output model below) // Note: In some cases, (e.g., Cambridge, MA 02139) there is no county element. It is skipped in the array output. So we need to account for this in the scripting.
{
   "results" : [ // Note this is a potential array of length > 1.
      {
         "address_components" : [
            {
               "long_name" : "12204",
               "short_name" : "12204",
               "types" : [ "street_number" ]
            },
            {
               "long_name" : "12th Avenue Northwest",
               "short_name" : "12th Ave NW",
               "types" : [ "route" ]
            },
            {
               "long_name" : "Northwest Seattle",
               "short_name" : "Northwest Seattle",
               "types" : [ "neighborhood", "political" ]
            },
            {
               "long_name" : "Seattle",
               "short_name" : "Seattle",
               "types" : [ "locality", "political" ]
            },
            {
               "long_name" : "King County",
               "short_name" : "King County",
               "types" : [ "administrative_area_level_2", "political" ]
            },
            {
               "long_name" : "Washington",
               "short_name" : "WA",
               "types" : [ "administrative_area_level_1", "political" ]
            },
            {
               "long_name" : "United States",
               "short_name" : "US",
               "types" : [ "country", "political" ]
            },
            {
               "long_name" : "98177",
               "short_name" : "98177",
               "types" : [ "postal_code" ]
            }
         ],
         "formatted_address" : "12204 12th Avenue Northwest, Seattle, WA 98177, USA",
         "geometry" : {
            "location" : {
               "lat" : 47.71803999999999,
               "lng" : -122.371292
            },
            "location_type" : "ROOFTOP",
            "viewport" : {
               "northeast" : {
                  "lat" : 47.71938898029149,
                  "lng" : -122.3699430197085
               },
               "southwest" : {
                  "lat" : 47.71669101970849,
                  "lng" : -122.3726409802915
               }
            }
         },
         "types" : [ "street_address" ]
      }
   ],
   "status" : "OK"
}*/
/*  Object model (of output)
	{	"country"						:	{
												"long_name"	:	"United States"
											,	"short_name":	"US"
											,	"types"		:	[
																	"country"
																,	"political"
																]
											}
	,	"administrative_area_level_1"	:	{
												"long_name"	:	"Washington"
											,	"short_name":	"WA"
											,	"types"		:	[
																	"administrative_area_level_1"
																,	"political"
																]
											}
	,	"administrative_area_level_2"	:	{
												"long_name"	:	"King"
											,	"short_name":	"King"
											,	"types"		:	[
																	"administrative_area_level_2"
																,	"political"
																]
											}
	,	"locality"						:	{
												"long_name"	:	"Issaquah"
											,	"short_name":	"Issaquah"
											,	"types"		:	[
																	"locality"
																,	"political"
																]
											}
	,	"postal_code"					:	{
												"long_name"	:	"98029"
											,	"short_name":	"98029"
											,	"types"		:	[
																	"postal_code"
																]
											}
	}*/
}
function geoGoogleGetAddyComponents(gg){//@return{object} Example: {"country":"US","zip":"15066","county":"Beaver County","state":"PA","city":"New Brighton","street":"8th Ave","number":"1124","latitude":40.733223,"longitude":-80.307868,"formatted_address":"1124 8th Avenue, New Brighton, PA 15066, USA","geoSource":"geoGoogle"}
  //var out=[],ar={"street_number","route","locality,political","administrative_area_level_1,political","postal_code"},i=ar.length;while(i--){out.push(/*LibraryjsUtil.* /queryArray(r,{types:ar[i]},"short_name","FIRST"))} //out.push(/*LibraryjsUtil.* /queryArray(r,{types:{0:ar[2]}},"short_name","FIRST"))//Does not work, use example shown
  //function test(){var scraped={"results":[{"address_components":[{"long_name":"17013","short_name":"17013","types":["street_number"]},{"long_name":"114th Avenue Southeast","short_name":"114th Ave SE","types":["route"]},{"long_name":"Renton","short_name":"Renton","types":["locality","political"]},{"long_name":"King County","short_name":"King County","types":["administrative_area_level_2","political"]},{"long_name":"Washington","short_name":"WA","types":["administrative_area_level_1","political"]},{"long_name":"United States","short_name":"US","types":["country","political"]},{"long_name":"98055","short_name":"98055","types":["postal_code"]}],"formatted_address":"17013 114th Avenue Southeast, Renton, WA 98055, USA","geometry":{"location":{"lat":47.44992,"lng":-122.189079},"location_type":"ROOFTOP","viewport":{"northeast":{"lat":47.4512689802915,"lng":-122.1877300197085},"southwest":{"lat":47.4485710197085,"lng":-122.1904279802915}}},"types":["street_address"]}],"status":"OK","geoSource":"geoGoogle"};Logger.log(geoGoogleGetAddyComponents(scraped))}
    var out={},ob={number:["long_name","street_number"],street:["short_name","route"],city:["long_name","locality,political"],state:["short_name","administrative_area_level_1,political"],county:["long_name","administrative_area_level_2,political"],zip:["long_name","postal_code"],country:["long_name","country,political"]},r=/*LibraryjsUtil.* /geoGoogle(encodeURIComponent("10222 1st Ave NW #C, Seattle, WA 98177"))*/gg.results[0]
      , keys=Object.keys(ob),i=keys.length;while(i--){out[keys[i]]=/*LibraryjsUtil.*/queryArray(r.address_components,{types:ob[keys[i]][1]},ob[keys[i]][0]/*"short_name"*/,"FIRST")}
	    out.latitude          = r.geometry.location.lat
	  ; out.longitude         = r.geometry.location.lng
	  ; out.formatted_address = r.formatted_address
        return out}//Logger.log(JSON.stringify(out))}//Logger.log(JSON.stringify(r));
function geoGoogleCsz(str){ // @param{str} str - address of subject; @return{obj} // *Call this function* In: string, (e.g.,zip); Out: zip, city, state, country, county (if any) // Object model {"zip":"98029","city":"Issaquah","county":"King","state":"WA","country":"US"}
    //var map={"street_number":"number","route":"street","neighborhood":"neighborhood","sublocality":"sublocality","locality":"city","administrative_area_level_2":"county","administrative_area_level_1":"state","country":"country","postal_code":"zip"};
    var ob=geoGoogle(str),out={address:{}}; // Example: ob={"country":"US","zip":"15066","county":"Beaver County","state":"PA","city":"New Brighton","street":"8th Ave","number":"1124","latitude":40.733223,"longitude":-80.307868,"formatted_address":"1124 8th Avenue, New Brighton, PA 15066, USA","geoSource":"geoGoogle"}
	//This line mostly duplicated by geoGoogleGetAddyComponents() //out={raw:ob.raw,address:{}},keys=Object.keys(ob.address),i=keys.length;while(i--){out["address"][map[keys[i]]]=ob["address"][keys[i]].short_name}
	try{out["address"]["sa"        ] = ob.number + " " + ob.street              /* (out.address.number&&out.address.street)?(out.address.number+" "+out.address.street):"" */ ;}catch(e){Logger.log("Error BrY15: "+e.message)}
	try{out["address"]["full"      ] = ob.formatted_address                     /*  out.raw.results[0].formatted_address  /* out.address.sa + ", " + out.address.csz  * /  */ ;}catch(e){Logger.log("Error Gsg3y: "+e.message)} //e.g."12204 12th Avenue Northwest, Seattle, WA 98177, USA",
	try{out["address"]["csz"       ] = ob.city + ", " + ob.state + " " + ob.zip /*  out.address.city + ", " + out.address.state + " " + out.address.zip                    */ ;}catch(e){Logger.log("Error sv3mi: "+e.message)}
	try{out["address"]["part"      ] = out.address.full.getSuffix(" ").trim()                                                                                                 ;}catch(e){Logger.log("Error AJSoK: "+e.message)}
	try{out["address"]["latitude"  ] = ob.latitude                                                                                                                            ;}catch(e){Logger.log("Error YvQW6: "+e.message)}
	try{out["address"]["longitude" ] = ob.longitude                                                                                                                           ;}catch(e){Logger.log("Error n9Iud: "+e.message)}
	return out}
// Deprecated 7/16/2013. Use geoGoogleCsz() instead... String.prototype.zip2cityState = function(){var out=JSON.parse(this.geoGoogle());return [out.results[0].address_components[3].short_name,out.results[0].address_components[1].short_name,out.results[0].address_components[2].short_name]} // in:str zip(e.g.,"02139"), out:arr[state,city,county](e.g.["MA","Cambridge","Clark"])
/* Obsolete: geoYahoo + associated functions
function        _geoYahoo(str){return str.geoYahoo()}
String.prototype.geoYahoo = function(){ // Work in process // Geocoder provided by Yahoo // Input: this string | unparsed address // Output: array | parsed address // Reference: https://developer.yahoo.com/geo/geoplanet/
	/* Reference (OBSOLETE 6/27/2014)
          Login: mchlbenavente@yahoo.com
            URL: https://developer.apps.yahoo.com/projects/Wod8Oj78/secret#
 Application ID: Wod8Oj78
   Consumer Key: dj0yJmk9M2lIMEdBSlZwNGxSJmQ9WVdrOVYyOWtPRTlxTnpnbWNHbzlNVGN6T1RZMk1qVTJNZy0tJnM9Y29uc3VtZXJzZWNyZXQmeD0xOQ--
Consumer Secret: b70c3174ae5c7812e55b6ce8b013e5e8294908ef
Application URL: https://sites.google.com/site/inveetrus/
     App Domain: sites.google.com
      Reference: http://developer.yahoo.com/geo/placefinder/guide/
     Formatting: http://developer.yahoo.com/geo/placefinder/guide/requests.html#base-uri
Other Geocoders: https://webgis.usc.edu/Services/Geocode/About/GeocoderList.aspx
 Sample request: http://where.yahooapis.com/geocode?q=1600+Pennsylvania+Avenue,+Washington,+DC&appid=[yourappidhere]* /
	/* Example 1
       Sample request: http://where.yahooapis.com/geocode?q=1600+Pennsylvania+Avenue,+Washington,+DC&appid=Wod8Oj78
       Sample response: <?xml version="1.0" encoding="UTF-8"?><ResultSet version="1.0"><Error>0</Error><ErrorMessage>No error</ErrorMessage><Locale>us_US</Locale>
<Quality>87</Quality><Found>1</Found><Result><quality>85</quality><latitude>38.898717</latitude><longitude>-77.035974</longitude><offsetlat>38.898590</offsetlat>
<offsetlon>-77.035971</offsetlon><radius>500</radius><name></name><line1>1600 Pennsylvania Ave NW</line1><line2>Washington, DC  20006</line2><line3></line3>
<line4>United States</line4><house>1600</house><street>Pennsylvania Ave NW</street><xstreet></xstreet><unittype></unittype><unit></unit><postal>20006</postal>
<neighborhood></neighborhood><city>Washington</city><county>District of Columbia</county><state>District of Columbia</state><country>United States</country>
<countrycode>US</countrycode><statecode>DC</statecode><countycode>DC</countycode><uzip>20006</uzip><hash>B42121631CCA2B89</hash><woeid>12765843</woeid><woetype>11</woetype>
</Result></ResultSet><!-- gws18.maps.sp1.yahoo.com uncompressed/chunked Mon Jul  2 12:13:07 PDT 2012 --><!-- wws01.geotech.sp2.yahoo.com uncompressed/chunked Mon Jul  2 12:13:07 PDT 2012 -->* /
	/* Example 2 (OBSOLETE 6/27/2014)
       Sample request: http://where.yahooapis.com/geocode?q=29070-TANGERINE-WAY-LAKE-ELSINORE-CA-92530&appid=Wod8Oj78
       Sample response: <?xml version="1.0" encoding="UTF-8"?><ResultSet version="1.0"><Error>0</Error><ErrorMessage>No error</ErrorMessage><Locale>us_US</Locale>
<Quality>87</Quality><Found>1</Found><Result><quality>87</quality><latitude>33.696274</latitude><longitude>-117.393867</longitude><offsetlat>33.696274</offsetlat>
<offsetlon>-117.393707</offsetlon><radius>15900</radius><name></name><line1>29070 Tangerine Way</line1><line2>Lake Elsinore, CA  92530</line2><line3></line3>
<line4>United States</line4><house>29070</house><street>Tangerine Way</street><xstreet></xstreet><unittype></unittype><unit></unit><postal>92530</postal>
<neighborhood></neighborhood><city>Lake Elsinore</city><county>Riverside County</county><state>California</state><country>United States</country><countrycode>US</countrycode>
<statecode>CA</statecode><countycode></countycode><uzip>92530</uzip><hash>8447716E9E0B43E6</hash><woeid>12796507</woeid><woetype>11</woetype></Result></ResultSet>
<!-- gws24.maps.sp1.yahoo.com uncompressed/chunked Mon Jul  2 12:22:25 PDT 2012 --><!-- wws02.geotech.sp2.yahoo.com uncompressed/chunked Mon Jul  2 12:22:25 PDT 2012 -->* /
    /* Example 3 // Now appears to only zoom to city level
       Sample request: http://where.yahooapis.com/v1/places.q('29070%20TANGERINE%20WAY,%20LAKE%20ELSINORE,%20CA%2092530')?appid=KtlDulDV34GMHYu3BKBj58orqjM49ENgp7c9BWGzcrkq01hF6xLrPi8PHcg5sc_rDnRZew--
	* /
	{//Code
		var ID       = "KtlDulDV34GMHYu3BKBj58orqjM49ENgp7c9BWGzcrkq01hF6xLrPi8PHcg5sc_rDnRZew--" //"Wod8Oj78";
		var ROOT     = "http://where.yahooapis.com/geocode?appid=";
		//			    01       2              3        4         5       6         7          8           9           10          11       12     13                   14                       15      16             17      18             19        20         21     22       23             24            25                26         27            28            29           30           31    32               33       34
		var TAG      = [,"Error","ErrorMessage","Locale","Quality","Found","quality","latitude","longitude","offsetlat","offsetlon","radius","name","line1"             ,"line2"                 ,"line3","line4"       ,"house","street"      ,"xstreet","unittype","unit","postal","neighborhood","city"       ,"county"         ,"state"   ,"country"    ,"countrycode","statecode","countycode","uzip","hash"          ,"woeid" ,"woetype" ];
		// Examples      0       No error       us_US    87        1       87        33.696274  -117.393867 33.696274   -117.393707 15900           29070 Tangerine Way  Lake Elsinore, CA  92530         United States  29070   Tangerine Way                              92530                   Lake Elsinore Riverside County  California United States US                                     92530  8447716E9E0B43E6 12796507 11
		var BEG=new Array();var END=new Array();var i=TAG.length;while(i--){BEG[i]=">";END[i]="<";} // Creates beginning and ending string markers for each token (XML tag) to scrape
		return UrlFetchApp.fetch(ROOT + ID + "&q=" + this).getContentText().scrapeDataset(false,TAG,BEG,END,false,false);}}* /
String.prototype.parseAddressA = function(){ // Parse address string formatted as: 1254430-1828-600-Central-Avenue-315-RIVERSIDE-CA-92506-E129
	/* Archive
	{ // Parameters
	var START_INDEX    = 2;
	var BACKOFF_ZIP    = 2;
	var BACKOFF_STATE  = 3;
	var SPACER         = " "; // Blank space for normal text string; Could be "+" for, say, Yahoo URL.
	var DELIMITER      = "-";
	var sa             = "";
	var csz            = "";
	var number         = 0;
	var city           = "";
	var state          = "";
	var zip            = 0;
	var unit           = "";
	var cszSubstr      = false;
	var fullAddress    = "";
	var partialAddress = "";
	}
	if(this.split(DELIMITER)){ // Example: 1324167-2369-1265-EMERALD-STREET-HEMET-CA-92543-E205
		var addressArray       = this.split(DELIMITER); // Parse address string to array.
		var addressArrayLength = addressArray.length;
		for(var i=START_INDEX;i<addressArrayLength-1;i++){ // Loop thru elements in address array to construct address components
			if(!isNumber(addressArray[i]) && isUpperCase(addressArray[i]) && (addressArray[i].length > 2) && isUpperCase(addressArray[i+1])){cszSubstr=true} // Flips the logic "gate" to true // Deprecated argument: && isUpperCase(addressArray[p+2])
			if(!cszSubstr){sa += SPACER + addressArray[i]} // Assembles street address ("sa")
			else if(cszSubstr){csz += SPACER + addressArray[i]} // Assembles city, state and zip ("csz")
		}
		sa             = sa.trim();
		csz            = csz.trim();
		number         = addressArray[START_INDEX].trim();                        // Set field value
		state          = addressArray[addressArrayLength - BACKOFF_STATE].trim(); // Set field value
		zip            = addressArray[addressArrayLength - BACKOFF_ZIP].trim();   // Set field value
		fullAddress    = (sa + ", " + csz).trim();
		partialAddress = fullAddress.replace((number + " "),"").trim();
	}
	else{return false}
	return [sa, csz, number, state, zip, fullAddress, partialAddress];* /
	{//Code
	var geo = this.split("-").slice(2,-1).join("+").geoYahoo(); // Convert "1254430-1828-600-Central-Avenue-315-RIVERSIDE-CA-92506-E129" to "600+Central+Avenue+315+RIVERSIDE+CA+92506" then send to Yahoo geocoder for parsing
	return [geo[13],geo[14],geo[17],geo[29],geo[31],geo[13]+", "+geo[14],geo[18]+", "+geo[14],geo[25].replace(" County","")];}} // Return ["sa","csz","Number","State","Zip","Full_address","Partial_address","County"]*/String.prototype.urlForwardTo = function(markPrefix, markSuffix, inclSuffix){
	/* Notes
	This function replaced the following block of code.
	{ // 3. Fetch page data (via HTTP GET, 2-steps).
		var response     = UrlFetchApp.fetch( action );            // Fetch initial URL of subject. Initial URL lacks unique property ID. // var responseCode = response.getResponseCode(); // Gets the response code to determine if the given id produces a valid record.
		var responseText = response.getContentText();              // Response contains unique property ID
			action       = responseText.getSuffix(GET_SUFFIX).getPrefix(GET_PREFIX); // Scrape response to extract new URL containing unique property ID
			action       = GET_SUFFIX + action + GET_PREFIX ;      // Reconstruct new URL from scraped elements
			response     = UrlFetchApp.fetch( action );            // Call URL containing unique ID and property data
			responseText = response.getContentText();              // Obtain server response
	}*/
	/* Parameters
		@return{string }            | response of second URL; forwarded to, scraped from input URL, the function owner;
		@param {string } markPrefix | marks prefix of new URL;
		@param {string } markSuffix | marks suffix of new URL; might be included in new URL (see boolean inclSuffix)
		@param {boolean} inclSuffix | true if suffix is included in new URL
			Examples
				True  http://www.eppraisal.com/Home-Values-3003-e-ventura-rd-palm-springs-ca-92262-189522385.mvc);  ".mcv" string both marks   suffix and IS included in new URL
				False http://www.realtor.com/realestateandhomes-detail/28916-Avenida-Gaviota_Canyon-Lake_CA_92587_M23553-49342; string marking suffix is NOT included in new URL
	* /
	var urlForwardTo_Action = markPrefix + UrlFetchApp.fetch(this).getContentText().getSuffix(markPrefix).getPrefix(markSuffix); // Fetch initial URL of subject. Initial URL lacks unique property ID. Response contains unique property ID // Scrape response to extract new URL containing unique property ID // Reconstruct new URL from scraped elements
	if(inclSuffix){urlForwardTo_Action += markSuffix} // Attach suffix marker, if warranted by conditional boolean input (i.e., if inclSuffix variable is true)
	return UrlFetchApp.fetch(urlForwardTo_Action).getContentText(); // Call URL containing unique ID and property data // Return server response
}*/}
function getHtmlData(act,re){var str=UrlFetchApp.fetch(act).getContentText();return getRegExpMatches(re,str)}
function getRegExpMatches(re,str){// Reference: https://regex101.com/#javascript
  /* Demo
  function _dex_getCategories(){return LibraryjsUtil.getHtmlData("http://www.dexknows.com/browse-directory",/\"http:\/\/www\.dexknows\.com\/local\/(\w+)\/"/gm)}//function test(){/*print2doc* /Logger.log(_dex_getCategories())}
  function getHtmlData(act,re){var str=UrlFetchApp.fetch(act).getContentText();return getRegExpMatches(re,str)}
  */
  // To extract "capturing groups" i.e. using round parentheses () in reg exp
  var m,out=[];
  while ((m = re.exec(str)) !== null) {
    out.push(m[1]);
    if (m.index === re.lastIndex) {
      re.lastIndex++;
    }
  }
  return out
}
function        _scrape       (str,que,beg,end,del,ins,ordered){return str.scrape(que,beg,end,del,ins,ordered)} // Also see: Google Sheets Formula: IMPORTHTML(url{str},query{"list" or "table"},index{int}) https://support.google.com/drive/answer/3093339 // Underscore ("_"), because GAS doesn't seem to access prototype version i.e., str.LibraryjsUtil.scrapeDataset()
String.prototype.scrape = function(que,beg,end,del,ins,ordered){ // Also see: Google Sheets Formula: IMPORTHTML(url{str},query{"list" or "table"},index{int}) https://support.google.com/drive/answer/3093339 // Scrape string, given string markers "que," "beg" and "end" // out is an array: [0]: null, [1]:scraped token, [2]:carry-forward string
	/* Parameters
		@return {array  }         | [1] {string} | scraped output; [2] {string} | balance of input string following scraped substring // Consider using .scrapeDataset()
		@param  {string } this    | the original to be scraped; object method owner
		@param  {string } que     | preceding beginning marker ("beg")
		@param  {string } beg     | immediately preceding extraction variable
		@param  {string } end     |      "      following      "        "
		@param  {array  } del     | array of characters to REPACE/DELETE; (NOTE: Use "null" if necessary;) (e.g., del=["\""]; replaces/deletes quotes because odd quote count masks bracket ("]") terminating array elements
		@param  {array  } ins     | array of characters to INSERT; (NOTE: Use "null" if necessary;) (e.g., ins=[""]; null characters, essentially deletes the corresponding field in the corresponding del array)
		@param  {boolean} ordered | "true" (default) if que array is in a known/fixed order | "false" if order/sequence is variable
	*/
	{//Code
        if(ordered==null){ordered=true} // Set default
		var out=[];if((this.indexOf(que)>-1)&&(this.indexOf(beg)>-1)&&(this.indexOf(end)>-1)){
			out[1] =           this.getSuffix(que).getSuffix(beg).getPrefix(end).trim();  // TOKEN   | Scraped output / token variable // Scrape via queue plus two token markers
			out[2] = (ordered)?this.getSuffix(que).getSuffix(beg).getSuffix(end):this;    // NEXT    | Truncate/trim source for next scrape iteration
			if(del){var i=del.length;while(i--){out[1]=out[1].replaceAll(del[i],ins[i])}} // REPLACE | Replace characters if necessary
		}try{if(typeof(JSON.parse(out[1]))=="object"){out[1]=JSON.parse(out[1])}}catch(e){/*Logger.log("Error: scrape: "+e.message)*/}return out}} // RETURN  | out is an array: [1]:scraped result string (or object), [2]:carry-forward string
function        _scrapeDataset           (        str,key,que,beg,end,del,ins,ordered){return str.scrapeDataset(key,que,beg,end,del,ins,ordered)} // Also see: Google Sheets Formula: IMPORTHTML(url{str},query{"list" or "table"},index{int}) https://support.google.com/drive/answer/3093339 // Underscore "_" because GAS doesn't seem to access prototype version i.e., str.LibraryjsUtil.scrapeDataset()
String.prototype.scrapeDataset = function(/*zeroElem*/key,que,beg,end,del,ins,ordered){ // Also see: Google Sheets Formula: IMPORTHTML(url{str},query{"list" or "table"},index{int}) https://support.google.com/drive/answer/3093339
	/* Archive
		Notes:
		1.	Leave zero element null for QUE, BEG and END arrays | see below descriptions
		2.	First element of returned array (out[0]) is reserved for "round trip" variable (for AVMs only, the estimate location). Apply .shift() or .slice(1) method to result to remove.
	Code: Archived prior to 6/10/2013
		var input      = this;                                                                  // String | action URL (response) & method owner
		if((input.indexOf(que[i])>-1)&&(input.indexOf(beg[i])>-1)&&(input.indexOf(end[i])>-1)){ // Condition on existence of marker/s and element/s (token/s).
				out[i] = input.getSuffix(que[i]).getSuffix(beg[i]).getPrefix(end[i]).trim();    // Scrape via queue plus two token markers
				input  = input.getSuffix(que[i]).getSuffix(beg[i]).getSuffix(end[i]);           // Truncate/trim source for next scrape iteration
				if(i==out[0]){
					if(!isNumber(out[i])){out[i]=out[i].replaceAll(",","")}                     // In AVM estimate, removes commas from strings (non-numbers) only
					if(!isNumber(out[i])){out[i]=""}}                                           // If not number, assume error, then delete (random scraped html will be deleted, for example)
				if(Number(out[i])){out[i]=Number(out[i])}}                                      // Converts all elements to numbers where appropriate
		This function replaced the following block of code.
		{ // 4. Scrape
			for(i=1;i<MARKER_BEG.length;i++){ // Loop over FIELDS.
				if((responseText.indexOf(MARKER_QUE[i])>-1)&&(responseText.indexOf(MARKER_BEG[i])>-1)&&(responseText.indexOf(MARKER_END[i])>-1)){ // Condition on existence of marker/s and element/s (token/s).
					dataset[i]  = responseText.getSuffix(MARKER_QUE[i]).getSuffix(MARKER_BEG[i]).getPrefix(MARKER_END[i]); // Scrape via queue plus two token markers
					responseText = responseText.getSuffix(dataset[i]);                                                     // Truncate/trim source for next scrape iteration
					if(i=dataset[0]){if(!isNumber(dataset[i])){dataset[i]=dataset[i].replaceAll(THIS[0],WITH[0])}}         // Removes commas from strings (non-numbers) only
					if(Number(dataset[i])){dataset[i]=Number(dataset[i])}}}}                                               // Converts all elements to numbers where appropriate
	*/
	/* Parameters
	//	@return {array  }          | QUASI-DEPRECATED 6/10/2013; Returns dataset, array of scraped values; Zero element [0] reserved for round trip; Not for repeating pattern. For repeating patterns, use .split() on server response for list elements (e.g., "<li ") then loop over array elements
	//	@return {object }          | Returns dataset, object of scraped values with keys contained in the key array parameter // Note: "Quasi-deprecated" means will return array as deprecated if key array is omitted
		@param  {string } this     | text to be scraped, URL response;
	//	@param  {integer} zeroElem | DEPRECATED 6/10/2013; replaced by "key" | array position of AVM estimate; If this is not an AVM, set zeroElem=0 in the input argument at function call;
		@param  {array  } key      | field names / keys / object properties for return object; start with que[1] (i.e. que[0]=null)
		@param  {array  } que      | setup marker; start with que[1] (i.e. que[0]=null)
		@param  {array  } beg      | marker starting scrape;  start with beg[1] (i.e. beg[0]=null)
		@param  {array  } end      | marker ends scrape;  start with end[1] (i.e. end[0]=null)
		@param  {array  } del      | array of characters to REPACE/DELETE for each scraped item; (e.g., del=["\""]; replaces/deletes quotes because odd quote count masks bracket ("]") terminating array elements
		@param  {array  } ins      | array of characters to INSERT for each scraped item; (e.g., ins=[""]; null characters, essentially deletes the corresponding field in the corresponding del array)
		@param  {boolean} ordered  | 'true' (default) if que array is in a known/fixed order | 'false' if order/sequence is variable
	*/
	// Examples: Construct all arrays and leave first element null
	/* Example 1 | Multiple records per page (possible improvement over below Example 1a)
	function main_dex(client,act){ // Scrapes page, adds labels, saves records, returns one record // www.dexknows.com // Notes: 30 results per page - 4 rotating ads = 26 useable results // Reference: https://developers.google.com/apps-script/scriptdb // Increment "st" by 30 // URL shortened from act="http://www.dexknows.com/local/automotive/vehicle_sales/auto_dealers/geo/c-greenville-sc/?distance=0&sort=&view=list&where=Greenville%2C+SC&st=30&pageset=1";
	var ob,nearby=[],user=Session.getUser().getEmail(),resp=UrlFetchApp.fetch(act).getContentText(),arr=resp.split("<ul class=\"linkList\"")[1].split("</ul>")[0].split("<li>").slice(1),data=resp.split("addPoint").slice(1)
    , KEY = [ "" , "link"  , "label" ]
    , QUE = [ "" , "href=" , ""      ]
    , BEG = [ "" , "\""    , ">"     ]
    , END = [ "" , "\""    , "<"     ]
    ,temp,i=arr.length;while(i--){temp=LibraryjsUtil._scrapeDataset(arr[i],KEY,QUE,BEG,END);temp[KEY[1]]="http://www.dexknows.com/"+temp[KEY[1]];nearby.push(temp);}Logger.log(nearby);
	*/
	/* Example 1a | Multiple records per page (possibly improved by above Example 1)
		function getData_listing2(){var out=[],act="http://example.com",arr=UrlFetchApp.fetch(act).getContentText().split("addPoint").slice(1)
			,   KEY = [,"linkScrape","street" ]
			,   QUE = [,"?"         ,"<strong"]
			,   BEG = [,"redirect=" ,">"      ]
			,   END = [,"\""        ,"<"      ]
		//	,   DEL = []
		//	,   INS = []
			,temp,i = arr.length;while(i--){
			 temp=LibraryjsUtil._scrapeDataset(arr[i],KEY,QUE,BEG,END);temp.link="http://www.ziprealty.com/"+temp.linkScrape;out.push(temp);}Logger.log(out);return out;} */
	/* Example 2 | One record per page
	function getData(){var out=[],act="http://moolahlist.com/lenders/view/500",data=UrlFetchApp.fetch(act).getContentText()//.split(delimeter)
			,   key = [,"name" ,"focus","area"        ,"collateral","amount"     ,"ltv"              ,"rate"          ,"points"           ,"fico"              ,"refi"           ,"cashout"      ,"zeroDown"       ,"term"         ,"phone"        ]
			,   que = [,"<h1"  ,"Focus","Lending Area","Collateral","Loan Amount","Max Loan to Value","Interest Rates","Orgination Points","Minimum Fico Score","Refinance Loans","Cashout Loans","Zero Down Loans","Max Loan Term","Contact Phone"]
			,   beg = [,">"    ,"<td>" ,"<td>"        ,"<td>"      ,"<td>"       ,"<td>"             ,"<td>"          ,"<td>"             ,"<td>"              ,"<td>"           ,"<td>"         ,"<td>"           ,"<td>"         ,"<td>"         ]
			,   end = [,"</h1>","</td>","</td>"       ,"</td>"     ,"</td>"      ,"</td>"            ,"</td>"         ,"</td>"            ,"</td>"             ,"</td>"          ,"</td>"        ,"</td>"          ,"</td>"        ,"</td>"        ]//,del = "<",ins=""
			,   out = LibraryjsUtil._scrapeDataset(data,key,que,beg,end,false,false);Logger.log(out);return out;} */
	/* Example 3 | One record per page with data subsets (i.e., one or more scrape tokens might appear as groups / data subsets)
		var	KEY 	   = [,"status"  ,"beds"  ,"baths"  ,"sqft"        ,"lot"       ,"built"       ,["smartZip_est" ,"smartZip_low","smartZip_high"],["dataQuick_est","dataQuick_low","dataQuick_high"],["eppraisal_est","eppraisal_low","eppraisal_high"]]
		  ,	QUE        = [,">Status<",">Beds<",">Baths<",">House Size<",">Lot Size<",">Year Built<",["SmartZip"     ,"<li "        ,"<li "         ],["DataQuick"    ,"<li "         ,"<li "          ],["Eppraisal"    ,"<li "         ,"<li "          ]]
		  ,	BEG        = [,"<span>"  ,"<span>","<span>" ,"<span>"      ,"<span>"    ,"<span>"      ,["$"            ,"$"           ,"$"            ],["$"            ,"$"            ,"$"             ],["$"            ,"$"            ,"$"             ]]
		  , END        = [,"<"       ," "     ," "      ," "           ," "         ,"<"           ,["<"            ,"<"           ,"<"            ],["<"            ,"<"            ,"<"             ],["<"            ,"<"            ,"<"             ]]
		  , DEL        = [,null      ,null    ,null     ,[","]         ,[","]       ,null          ,[["$",","]      ,["$",","]     ,["$",","]      ],[["$",","]      ,["$",","]      ,["$",","]       ],[["$",","]      ,["$",","]      ,["$",","]       ]]
		  , INS        = [,null      ,null    ,null     ,["" ]         ,["" ]       ,null          ,[["" ,"" ]      ,["" ,"" ]     ,["" ,"" ]      ],[["" ,"" ]      ,["" ,"" ]      ,["" ,"" ]       ],[["" ,"" ]      ,["" ,"" ]      ,["" ,"" ]       ]]
		  ;			  // 0,1          2        3         4              5            6              70               1              2                80               1               2                 90               1               2
	*/
	{//Code
	if(ordered==null){ordered=true} // Set default
	if(isArray(key)){var temp,token=[],out={},str=this,len=beg.length;for(var i=1;i<len;i++){
	    if(isArray(key[i])){token[i]=[];var j,lenj=que[i].length;for(j=0;j<lenj;j++){if(str.indexOf(que[i][j])>-1/*Token exists*/){ // Input is ARRAY // Used when there is a subset of data that might or might not be present; e.g. realtor.com presents property value estimates and ranges from 3 sources (Eppraisal, SmartZip & QuickData) but one or more might not be present. // e.g., KEY=[,"status","beds","baths","sqft","lot","built",["smartZip_est","smartZip_low","smartZip_high"],["dataQuick_est","dataQuick_low","dataQuick_high"],["eppraisal_est","eppraisal_low","eppraisal_high"]]
			/*start scrape*/if(isArray(del)&&isArray(del[i])&&isArray(del[i][j])){temp=str.scrape(que[i][j],beg[i][j],end[i][j],del[i][j],ins[i][j],ordered)} // Allow articulation of each token with unique replacement set
			                else                                                 {temp=str.scrape(que[i][j],beg[i][j],end[i][j],del      ,ins      ,ordered)} // Loop thru each token // Scrape; set temp variable // Replace+insert as necessary
			 token[i][j]=(temp[1])?temp:[,false,str];                        // Scrape current token // Else, set token values, reset scrape string carryforward // Note: "" evaluates to boolean false // Reference: http://www.w3schools.com/js/js_obj_boolean.asp
			 out[key[i][j]]=token[i][j][1];str=token[i][j][2];/*end scrape*/ // Set output // Set string carryforward // if(Number(out[key[i]])){out[key[i]]=Number(out[key[i]])}} // Converts all elements to numbers where appropriate
			}else{break}}}
        else{/*start scrape*/if(isArray(del)&&isArray(del[i])){temp=str.scrape(que[i],beg[i],end[i],del[i],ins[i],ordered)} // Input is STRING // Allow articulation of each token with unique replacement set
			                 else                             {temp=str.scrape(que[i],beg[i],end[i],del   ,ins   ,ordered)} // Loop thru each token // Scrape; set temp variable // Replace+insert as necessary
			 token[i]=(temp[1])?temp:[,false,str];                    // Scrape current token // Else, set token values, reset scrape string carryforward // Note: "" evaluates to boolean false // Reference: http://www.w3schools.com/js/js_obj_boolean.asp
			 out[key[i]]=token[i][1];str=token[i][2];/*end scrape*/}} // Set output // Set string carryforward // if(Number(out[key[i]])){out[key[i]]=Number(out[key[i]])}} // Converts all elements to numbers where appropriate
	}else if(isNumber(key)){ // If key is a number, then it is the zero element, therefore, return an array
		if(que[0]){que.unshift("")};if(beg[0]){beg.unshift("")};if(end[0]){end.unshift("")} // Correct if user call does not omit initial element (i.e. que[0]!=null)
		var str=this,temp,token=[],out=[key], // Initialize array to hold scrape result variables // Initialize output array // Round trip variable; condition settings on successful scrape
			len=beg.length;for(var i=1;i<len;i++){temp=str.scrape(que[i],beg[i],end[i],del,ins,ordered); // Loop thru each token // Scrape; set temp variable // Replace+insert as necessary
			token[i]=(temp[1])?temp:[,false,str];                    // Scrape current token // Else, set token values, reset scrape string carryforward
			out[i]=token[i][1];str=token[i][2];                      // Set output // Set string carryforward
			if(Number(out[i])){out[i] = Number(out[i])}}             // Converts all elements to numbers where appropriate
		if(out[out[0]]){out[out[0]]=out[out[0]].replaceAll(",","")}} // In AVM estimate, removes commas from strings (non-numbers) only
	return out}} // if(out.estimate){out.estimate=out.estimate.replaceAll(",","")} // In AVM estimate, removes commas from strings (non-numbers) only
String.prototype.http = function(method, payload, headerLabels, headerValues){ // Execute HTTP Request // Reference: http://www.w3schools.com/dom/dom_http.asp
	/* Deprecated                                                                                     // Execute HTTP Request // Reference: http://www.w3schools.com/dom/dom_http.asp
		xmlhttp = new XMLHttpRequest();                                                               // Define new HTTP XML Object
		xmlhttp.open(METHOD, action, true);                                                           // Open request
		for(i=1;i<HEADER_LABEL.length;i++){xmlhttp.setRequestHeader(HEADER_LABEL[i],HEADER_VALUE[i])} // Set headers
		xmlhttp.send(payload);                                                                        // Send payload
		return xmlhttp.responseText;                                                                  // Return response to function call
	*/
	{// Parameters
		// this/action.. URL location of the file on the server
		// method....... Type of request: GET, POST, HEAD, PUT, DELETE, OPTIONS (See: http://en.wikipedia.org/wiki/XMLHttpRequest)
		// headers...... Array of label/value pairs to be added to the header to be sent
		// payload...... Only used for POST requests
	}
	var action=this; xmlhttp=new XMLHttpRequest(); xmlhttp.open(method, action, true);              // Define new HTTP XML object // Open request | async: true (asynchronous) or false (synchronous)
	var i=headerLabels.length;while(i--){xmlhttp.setRequestHeader(headerLabels[i],headerValues[i])} // Set headers
	xmlhttp.send(payload); return xmlhttp;                                                          // Send payload // Return request object to function call
}
/* Hidden 6/10/2013 Array.prototype.deleteOutlier = function(target){ // Takes an array of values and returns that same array minus the "primary outlier" | the value farthest from the input "target" value
	var x        = new Array();                   // Initialize array to process
	var d        = 0;                             // Differential of subject; absolute value of the difference between subject value and "target"
	var maxD     = [0,0];                         // maxD[0]=POSITION; maxD[1]=VALUE ... of the absolute differential between the target and subject
	var i=this.length;while(i--){                 // Cycle thru the input array
		if(this[i]){                              // If a value is contained in the subject element
			x.push(this[i]);                      // Add subject value to output array
			d = Math.abs(this[i] - target);       // Calculate absolute differential between subject value and target
			if(d>maxD[1]){maxD[0]=i;maxD[1]=d;}}} // Set new value and position of max absolute differential
	x.splice(maxD[0],1);
	return x;}
*/
/* Deprecated 6/10/2013 String.prototype.unfurl, Array.prototype.furl, Array.prototype.furlN2, Array.prototype.furlN3, Array.prototype.furlN4, Array.prototype.furlN5, flatten, Array.prototype.flattenN3, Array.prototype.flattenN4, Array.prototype.flattenN5, Array.prototype.logArrayElements1N5, Array.prototype.logArrayN5
String.prototype.unfurl = function(){return eval(""+this+"")} // Converts "furled" array string back to array (of unlimited dimensions)
Array.prototype.furl    = function(){return "[\""+this.join("\",\"")+"\"]"} // Converts array to string that can be unfurled into original array using eval() (i.e., using "literal" array definition notation: ["a","b","c"])
Array.prototype.furlN2  = function(){var temp=this;var i=temp.length;while(i--){if(isArray(temp[i])){temp[i]=temp[i].furl()}}return temp.furl().replaceAll("\"[","[").replaceAll("]\"","]")} // Furls 2D array [][] // This function appears to change the original array // Scan top-level array, furl each level-two array into string; then furl top-level array
Array.prototype.furlN3  = function(){var temp=this;
	var j,i=temp.length;while(i--){if(isArray(temp[i])){                // Check top level for level-2 arrays
		j=temp[i].length;while(j--){if(isArray(temp[i][j])){            // Check level-2 arrays for level-3 arrays; furl them when found
			temp[i][j]=temp[i][j].furl();}}}}                           // Furls 3D array [][][]
	return temp.furlN2().replaceAll("\"[","[").replaceAll("]\"","]")}   // Returns string
Array.prototype.furlN4  = function(){var temp=this;
	var k,j,i=temp.length;while(i--){if(isArray(temp[i])){              // Check top level for level-2 arrays
		j=temp[i].length;while(j--){if(isArray(temp[i][j])){            // Check level-2 arrays for level-3 arrays; furl them when found
			k=temp[i][j].length;while(k--){if(isArray(temp[i][j][k])){  // Check level-3 arrays for level-4 arrays; furl them when found
				temp[i][j][k]=temp[i][j][k].furl();}}}}}}               // Furls 4D array [][][][]
	return temp.furlN3().replaceAll("\"[","[").replaceAll("]\"","]")}   // Returns string
Array.prototype.furlN5  = function(){var temp=this;
	/* Test code | useful for adding new dimensions
var x=["a","b",["ca","cb",["cca","ccb",["ccca","cccb",["cccca","ccccb","ccccc","ccccd","cccce",],"cccd","ccce"],"ccd"],"cd"],"d"];
/*Logger.log("A: "+x);
Logger.log("B: "+x[2]);
Logger.log("C: "+x[2][2]);
Logger.log("D: "+x.furl());
Logger.log("E: "+x.furl().unfurl());
Logger.log("F: "+x.furl().unfurl()[2]);
Logger.log("G: "+x.furl().unfurl()[2][2]); // Good to here
Logger.log("H: "+x.furlN2()); // Broke before here
Logger.log("I: "+x.furlN2().unfurl());
Logger.log("J: "+x.furlN2().unfurl()[2]);
Logger.log("K: "+x.furlN2().unfurl()[2][2]); //Good to here // Block out each section of increasing dimensions from logging because they interfere with the result.
Logger.log("L: "+x.furlN3());
Logger.log("M: "+x.furlN3().unfurl());
Logger.log("N: "+x.furlN3().unfurl()[2]);
Logger.log("O: "+x.furlN3().unfurl()[2][2]);
Logger.log("P: "+x.furlN3().unfurl()[2][2][3]);* /
Logger.log("Q: "+x.furlN4());
Logger.log("R: "+x.furlN4().unfurl());
Logger.log("S: "+x.furlN4().unfurl()[2]);
Logger.log("T: "+x.furlN4().unfurl()[2][2]);
Logger.log("U: "+x.furlN4().unfurl()[2][2][2]);
Logger.log("V: "+x.furlN4().unfurl()[2][2][2][2]);* /
Logger.log("W: "+x.furlN5());
Logger.log("X: "+x.furlN5().unfurl());
Logger.log("Y: "+x.furlN5().unfurl()[2]);
Logger.log("Z: "+x.furlN5().unfurl()[2][2]);
Logger.log("AA: "+x.furlN5().unfurl()[2][2][2]);
Logger.log("AB: "+x.furlN5().unfurl()[2][2][2][2]);
Logger.log("AC: "+x.furlN5().unfurl()[2][2][2][2][2]);* /
	var m,k,j,i=temp.length;while(i--){if(isArray(temp[i])){                     // Check top level for level-2 arrays
		j=temp[i].length;while(j--){if(isArray(temp[i][j])){                     // Check level-2 arrays for level-3 arrays; furl them when found
			k=temp[i][j].length;while(k--){if(isArray(temp[i][j][k])){           // Check level-3 arrays for level-4 arrays; furl them when found
                m=temp[i][j][k].length;while(m--){if(isArray(temp[i][j][k][m])){ // Check level-4 arrays for level-5 arrays; furl them when found
                    temp[i][j][k][m]=temp[i][j][k][m].furl();}}}}}}}}            // Furls 5D array [][][][][]
	return temp.furlN4().replaceAll("\"[","[").replaceAll("]\"","]")}            // Returns string
*/
function       _flatten(arr){return arr.flatten()}
Array.prototype.flatten   = function(){ // Reduces 2D array to 1D array // Used to reduce multi-dimensional array to single dimension for writing to API for example
	var out=[],j,i=this.length;while(i--){if(isArray(this[i])){j=this[i].length;while(j--){out.unshift(this[i][j])}}else{out.unshift(this[i])}}return out}
/*
Array.prototype.flattenN3 = function(){ // Reduces 3D array to 1D array // Note: There is intentionally no function/method labeled "flattenN2()"
	var out=[],i=this.length;while(i--){if(isArray(this[i])){out = this[i].flatten().concat(out)}else{out.unshift(this[i])}}return out}
Array.prototype.flattenN4 = function(){ // Reduces 4D array to 1D array
	var out=[],i=this.length;while(i--){if(isArray(this[i])){out = this[i].flattenN3().concat(out)}else{out.unshift(this[i])}}return out}
Array.prototype.flattenN5 = function(){ // Reduces 5D array to 1D array
	/*	Test code
		var arr = ["a", "b", ["ca", "cb", ["cca", "ccb", ["ccca","cccb",["cccca","ccccb","ccccc","ccccd","cccce"],"cccd","ccce"], "ccd", "cce"], "cd", "ce"], "d", "e"];
		var flatArr = arr.flattenN5();
		Logger.log("flatArr: "       +flatArr);
		Logger.log("flatArr.length: "+flatArr.length);
		Logger.log("flatArr[10]: "   +flatArr[10])
	* /
	var out=[],i=this.length;while(i--){if(isArray(this[i])){out = this[i].flattenN4().concat(out)}else{out.unshift(this[i])}}return out}
Array.prototype.logArrayElements1N5 = function(){ // Input: 1st dimension elements of 5D array; Output: Loops thru and logs all elements of 5D array // Note: Use this INSIDE a pre-existing loop of the first dimension elements of an array. E.g. this = arr[i];
	var j,k,m,n;
	if(isArray(this)){j=this.length;while(j--){
		if(isArray(this[j])){k=this[j].length;while(k--){
			if(isArray(this[j][k])){m=this[j][k].length;while(m--){
				if(isArray(this[j][k][m])){n=this[j][k][m].length;while(n--){
					Logger.log("dR["+i+"]["+j+"]["+k+"]["+m+"]["+n+"]: "+this[j][k][m][n]);
				}}else{Logger.log("dR["+i+"]["+j+"]["+k+"]["+m+"]: "+this[j][k][m]);}
			}}else{Logger.log("dR["+i+"]["+j+"]["+k+"]: "+this[j][k]);}
		}}else{Logger.log("dR["+i+"]["+j+"]: "+this[j]);}
	}}else{Logger.log("dR["+i+"]: "+this)}}
Array.prototype.logArrayN5 = function(){ // Log array elements | 5 dimensions
	var j,k,m,n,i=this.length;while(i--){
	if(isArray(this[i])){j=this[i].length;while(j--){
		if(isArray(this[i][j])){k=this[i][j].length;while(k--){
			if(isArray(this[i][j][k])){m=this[i][j][k].length;while(m--){
				if(isArray(this[i][j][k][m])){n=this[i][j][k][m].length;while(n--){
					Logger.log("["+i+"]["+j+"]["+k+"]["+m+"]["+n+"]: "+this[i][j][k][m][n]);
				}}else{Logger.log("["+i+"]["+j+"]["+k+"]["+m+"]: "+this[i][j][k][m]);}
			}}else{Logger.log("["+i+"]["+j+"]["+k+"]: "+this[i][j][k]);}
		}}else{Logger.log("["+i+"]["+j+"]: "+this[i][j]);}
	}}else{Logger.log("["+i+"]: "+this[i])}}}
*/
Array.prototype.getSeries = function(arr){ // Creates sorted integer series from an array of one or more pairs of integers & individually adds the integer elements of that new series/array to the subject/"owner" array
	var j,i,out=this;j=arr.length;while(j--){if(j%2==1){i=arr[j]+1;while(i---arr[j-1]){out.push(i)}}}return out.sort(function(a,b){return a-b})} // Example: [1,5,10].getSeries([6,8,20,24]) = [1,5,6,7,8,10,20,21,22,23,24]
String.prototype.appendRoot = function(root){ // Appends URL stem if missing. Ex: If scrape returns "Appomattox.asp" this function returns "http://www.glasserlaw.com/Appomattox.asp"
    // Parameters: this = string | the input string to test (ex. "Appomattox.asp"); stem = string | the stem of the URL (ex. "http://www.glasserlaw.com/");
    var str=this; if(str.search("http") != 0){ str = root + str } return str;}
function incomeApproach(price,rent,tax,fee,neg){ 				// Returns initial offer (before repairs)
 // var price=385000,rent=2480,tax=5135,fee=5000,neg=5000;      // List price, monthly rent, annual taxes paid, wholesale fee, negotiating margin
    var YIELD=0.07,VAC=0.07,MGT=0.06,MR=0.02,INS=0.005,CC=0.01; // Vacancy, management fee, maintenance+repair, insurance, closing costs
    var out =rent*12;                                           // Annual gross rents
        out*=1-VAC-MGT-MR;                                      // Subotal
        out-=tax+price*INS;                                     // Triple net rent // After taxes and insurance
        out/=YIELD;                                             // Maximum investment
        out-=out*CC;                                            // Net investment // After closing costs
        out-=fee+neg;                                           // Initial offer // Later, must subtract repairs estimate
        return Math.round(out)}
function stateConvert(str,to){if(!str){return ""}var str=str.trim().replace("-"," ").trim(),out=false,arr=listOfUSstateAbbrevs(), // var str=str||"Idaho",to=to||"abbr"; // Sample call: var out.state=stateConvert(/*"Washington"*/out.state,"abbr")||out.state; // @return{string} Either state name or abbreviation | @param{string} str | object to convert | @param{string} to | tells which type of output, "name" or "abbr" // Source: http://redactweb.com/javascript-to-convert-between-states-and-abbriations/
    i=arr.length;while(!out&&i--){switch(to){case "name" : out=(arr[i].abbr.toLowerCase()==str.toLowerCase())?arr[i].name              :false;break; // Replaces: // var returnthis=false;$.each(arr,function(index,value){if(to=="name"){if(value.abbr.toLowerCase()==name.toLowerCase()){returnthis = value.name;return false;}}else if(to=="abbr"){if(value.name.toLowerCase()==name.toLowerCase()){returnthis=value.abbr.toUpperCase();return false;}}});return returnthis;}
                                             case "abbr" : out=(arr[i].name.toLowerCase()==str.toLowerCase())?arr[i].abbr.toUpperCase():false;break;
                                             default     : out=str                                                                           ;break;}}/*Logger.log(out);*/return out||str}
function listOfUSstateAbbrevs(){ return [
    {"name":"Alabama"        , "abbr":"AL"} , {"name":"Alaska"       , "abbr":"AK"} , {"name":"Arizona"      , "abbr":"AZ"} , {"name":"Arkansas"       , "abbr":"AR"} ,
	{"name":"California"     , "abbr":"CA"} , {"name":"Colorado"     , "abbr":"CO"} , {"name":"Delaware"     , "abbr":"DE"} , {"name":"Connecticut"    , "abbr":"CT"} ,
	{"name":"Florida"        , "abbr":"FL"} , {"name":"Georgia"      , "abbr":"GA"} , {"name":"Hawaii"       , "abbr":"HI"} , {"name":"Idaho"          , "abbr":"ID"} ,
	{"name":"Illinois"       , "abbr":"IL"} , {"name":"Indiana"      , "abbr":"IN"} , {"name":"Iowa"         , "abbr":"IA"} , {"name":"Kansas"         , "abbr":"KS"} ,
	{"name":"Kentucky"       , "abbr":"KY"} , {"name":"Louisiana"    , "abbr":"LA"} , {"name":"Maine"        , "abbr":"ME"} , {"name":"Maryland"       , "abbr":"MD"} ,
	{"name":"Massachusetts"  , "abbr":"MA"} , {"name":"Michigan"     , "abbr":"MI"} , {"name":"Minnesota"    , "abbr":"MN"} , {"name":"Mississippi"    , "abbr":"MS"} ,
	{"name":"Missouri"       , "abbr":"MO"} , {"name":"Montana"      , "abbr":"MT"} , {"name":"Nebraska"     , "abbr":"NE"} , {"name":"Nevada"         , "abbr":"NV"} ,
	{"name":"New Hampshire"  , "abbr":"NH"} , {"name":"New Jersey"   , "abbr":"NJ"} , {"name":"New Mexico"   , "abbr":"NM"} , {"name":"New York"       , "abbr":"NY"} ,
	{"name":"North Carolina" , "abbr":"NC"} , {"name":"North Dakota" , "abbr":"ND"} , {"name":"Ohio"         , "abbr":"OH"} , {"name":"Oklahoma"       , "abbr":"OK"} ,
	{"name":"Oregon"         , "abbr":"OR"} , {"name":"Pennsylvania" , "abbr":"PA"} , {"name":"Rhode Island" , "abbr":"RI"} , {"name":"South Carolina" , "abbr":"SC"} ,
	{"name":"South Dakota"   , "abbr":"SD"} , {"name":"Tennessee"    , "abbr":"TN"} , {"name":"Texas"        , "abbr":"TX"} , {"name":"Utah"           , "abbr":"UT"} ,
	{"name":"Vermont"        , "abbr":"VT"} , {"name":"Virginia"     , "abbr":"VA"} , {"name":"Washington"   , "abbr":"WA"} , {"name":"West Virginia"  , "abbr":"WV"} ,
	{"name":"Wisconsin"      , "abbr":"WI"} , {"name":"Wyoming"      , "abbr":"WY"} ] }
function listOfUScities(){return [ // Javascript array of 385 U.S. cities sorted alphabetically // List of 3,000+ U.S. counties: http://en.wikipedia.org/wiki/Index_of_U.S._counties
			    "Aberdeen"
			,   "Abilene"
			,   "Akron"
			,   "Albany"
			,   "Albuquerque"
			,   "Alexandria"
			,   "Allentown"
			,   "Amarillo"
			,   "Anaheim"
			,   "Anchorage"
			,   "Ann Arbor"
			,   "Antioch"
			,   "Apple Valley"
			,   "Appleton"
			,   "Arlington"
			,   "Arvada"
			,   "Asheville"
			,   "Athens"
			,   "Atlanta"
			,   "Atlantic City"
			,   "Augusta"
			,   "Aurora"
			,   "Austin"
			,   "Bakersfield"
			,   "Baltimore"
			,   "Barnstable"
			,   "Baton Rouge"
			,   "Beaumont"
			,   "Bel Air"
			,   "Bellevue"
			,   "Berkeley"
			,   "Bethlehem"
			,   "Billings"
			,   "Birmingham"
			,   "Bloomington"
			,   "Boise"
			,   "Boise City"
			,   "Bonita Springs"
			,   "Boston"
			,   "Boulder"
			,   "Bradenton"
			,   "Bremerton"
			,   "Bridgeport"
			,   "Brighton"
			,   "Brownsville"
			,   "Bryan"
			,   "Buffalo"
			,   "Burbank"
			,   "Burlington"
			,   "Cambridge"
			,   "Canton"
			,   "Cape Coral"
			,   "Carrollton"
			,   "Cary"
			,   "Cathedral City"
			,   "Cedar Rapids"
			,   "Champaign"
			,   "Chandler"
			,   "Charleston"
			,   "Charlotte"
			,   "Chattanooga"
			,   "Chesapeake"
			,   "Chicago"
			,   "Chula Vista"
			,   "Cincinnati"
			,   "Clarke County"
			,   "Clarksville"
			,   "Clearwater"
			,   "Cleveland"
			,   "College Station"
			,   "Colorado Springs"
			,   "Columbia"
			,   "Columbus"
			,   "Concord"
			,   "Coral Springs"
			,   "Corona"
			,   "Corpus Christi"
			,   "Costa Mesa"
			,   "Dallas"
			,   "Daly City"
			,   "Danbury"
			,   "Davenport"
			,   "Davidson County"
			,   "Dayton"
			,   "Daytona Beach"
			,   "Deltona"
			,   "Denton"
			,   "Denver"
			,   "Des Moines"
			,   "Detroit"
			,   "Downey"
			,   "Duluth"
			,   "Durham"
			,   "El Monte"
			,   "El Paso"
			,   "Elizabeth"
			,   "Elk Grove"
			,   "Elkhart"
			,   "Erie"
			,   "Escondido"
			,   "Eugene"
			,   "Evansville"
			,   "Fairfield"
			,   "Fargo"
			,   "Fayetteville"
			,   "Fitchburg"
			,   "Flint"
			,   "Fontana"
			,   "Fort Collins"
			,   "Fort Lauderdale"
			,   "Fort Smith"
			,   "Fort Walton Beach"
			,   "Fort Wayne"
			,   "Fort Worth"
			,   "Frederick"
			,   "Fremont"
			,   "Fresno"
			,   "Fullerton"
			,   "Gainesville"
			,   "Garden Grove"
			,   "Garland"
			,   "Gastonia"
			,   "Gilbert"
			,   "Glendale"
			,   "Grand Prairie"
			,   "Grand Rapids"
			,   "Grayslake"
			,   "Green Bay"
			,   "GreenBay"
			,   "Greensboro"
			,   "Greenville"
			,   "Gulfport-Biloxi"
			,   "Hagerstown"
			,   "Hampton"
			,   "Harlingen"
			,   "Harrisburg"
			,   "Hartford"
			,   "Havre de Grace"
			,   "Hayward"
			,   "Hemet"
			,   "Henderson"
			,   "Hesperia"
			,   "Hialeah"
			,   "Hickory"
			,   "High Point"
			,   "Hollywood"
			,   "Honolulu"
			,   "Houma"
			,   "Houston"
			,   "Howell"
			,   "Huntington"
			,   "Huntington Beach"
			,   "Huntsville"
			,   "Independence"
			,   "Indianapolis"
			,   "Inglewood"
			,   "Irvine"
			,   "Irving"
			,   "Jackson"
			,   "Jacksonville"
			,   "Jefferson"
			,   "Jersey City"
			,   "Johnson City"
			,   "Joliet"
			,   "Kailua"
			,   "Kalamazoo"
			,   "Kaneohe"
			,   "Kansas City"
			,   "Kennewick"
			,   "Kenosha"
			,   "Killeen"
			,   "Kissimmee"
			,   "Knoxville"
			,   "Lacey"
			,   "Lafayette"
			,   "Lake Charles"
			,   "Lakeland"
			,   "Lakewood"
			,   "Lancaster"
			,   "Lansing"
			,   "Laredo"
			,   "Las Cruces"
			,   "Las Vegas"
			,   "Layton"
			,   "Leominster"
			,   "Lewisville"
			,   "Lexington"
			,   "Lincoln"
			,   "Little Rock"
			,   "Long Beach"
			,   "Lorain"
			,   "Los Angeles"
			,   "Louisville"
			,   "Lowell"
			,   "Lubbock"
			,   "Macon"
			,   "Madison"
			,   "Manchester"
			,   "Marina"
			,   "Marysville"
			,   "McAllen"
			,   "McHenry"
			,   "Medford"
			,   "Melbourne"
			,   "Memphis"
			,   "Merced"
			,   "Mesa"
			,   "Mesquite"
			,   "Miami"
			,   "Milwaukee"
			,   "Minneapolis"
			,   "Miramar"
			,   "Mission Viejo"
			,   "Mobile"
			,   "Modesto"
			,   "Monroe"
			,   "Monterey"
			,   "Montgomery"
			,   "Moreno Valley"
			,   "Murfreesboro"
			,   "Murrieta"
			,   "Muskegon"
			,   "Myrtle Beach"
			,   "Naperville"
			,   "Naples"
			,   "Nashua"
			,   "Nashville"
			,   "New Bedford"
			,   "New Haven"
			,   "New London"
			,   "New Orleans"
			,   "New York"
			,   "New York City"
			,   "Newark"
			,   "Newburgh"
			,   "Newport News"
			,   "Norfolk"
			,   "Normal"
			,   "Norman"
			,   "North Charleston"
			,   "North Las Vegas"
			,   "North Port"
			,   "Norwalk"
			,   "Norwich"
			,   "Oakland"
			,   "Ocala"
			,   "Oceanside"
			,   "Odessa"
			,   "Ogden"
			,   "Oklahoma City"
			,   "Olathe"
			,   "Olympia"
			,   "Omaha"
			,   "Ontario"
			,   "Orange"
			,   "Orem"
			,   "Orlando"
			,   "Overland Park"
			,   "Oxnard"
			,   "Palm Bay"
			,   "Palm Springs"
			,   "Palmdale"
			,   "Panama City"
			,   "Pasadena"
			,   "Paterson"
			,   "Pembroke Pines"
			,   "Pensacola"
			,   "Peoria"
			,   "Philadelphia"
			,   "Phoenix"
			,   "Pittsburgh"
			,   "Plano"
			,   "Pomona"
			,   "Pompano Beach"
			,   "Port Arthur"
			,   "Port Orange"
			,   "Port Saint Lucie"
			,   "Port St. Lucie"
			,   "Portland"
			,   "Portsmouth"
			,   "Poughkeepsie"
			,   "Providence"
			,   "Provo"
			,   "Pueblo"
			,   "Punta Gorda"
			,   "Racine"
			,   "Raleigh"
			,   "Rancho Cucamonga"
			,   "Reading"
			,   "Redding"
			,   "Reno"
			,   "Richland"
			,   "Richmond"
			,   "Richmond County"
			,   "Riverside"
			,   "Roanoke"
			,   "Rochester"
			,   "Rockford"
			,   "Roseville"
			,   "Round Lake Beach"
			,   "Sacramento"
			,   "Saginaw"
			,   "Saint Louis"
			,   "Saint Paul"
			,   "Saint Petersburg"
			,   "Salem"
			,   "Salinas"
			,   "Salt Lake City"
			,   "San Antonio"
			,   "San Bernardino"
			,   "San Buenaventura"
			,   "San Diego"
			,   "San Francisco"
			,   "San Jose"
			,   "Santa Ana"
			,   "Santa Barbara"
			,   "Santa Clara"
			,   "Santa Clarita"
			,   "Santa Cruz"
			,   "Santa Maria"
			,   "Santa Rosa"
			,   "Sarasota"
			,   "Savannah"
			,   "Scottsdale"
			,   "Scranton"
			,   "Seaside"
			,   "Seattle"
			,   "Sebastian"
			,   "Shreveport"
			,   "Simi Valley"
			,   "Sioux City"
			,   "Sioux Falls"
			,   "South Bend"
			,   "South Lyon"
			,   "Spartanburg"
			,   "Spokane"
			,   "Springdale"
			,   "Springfield"
			,   "St. Louis"
			,   "St. Paul"
			,   "St. Petersburg"
			,   "Stamford"
			,   "Sterling Heights"
			,   "Stockton"
			,   "Sunnyvale"
			,   "Syracuse"
			,   "Tacoma"
			,   "Tallahassee"
			,   "Tampa"
			,   "Temecula"
			,   "Tempe"
			,   "Thornton"
			,   "Thousand Oaks"
			,   "Toledo"
			,   "Topeka"
			,   "Torrance"
			,   "Trenton"
			,   "Tucson"
			,   "Tulsa"
			,   "Tuscaloosa"
			,   "Tyler"
			,   "Utica"
			,   "Vallejo"
			,   "Vancouver"
			,   "Vero Beach"
			,   "Victorville"
			,   "Virginia Beach"
			,   "Visalia"
			,   "Waco"
			,   "Warren"
			,   "Washington"
			,   "Waterbury"
			,   "Waterloo"
			,   "West Covina"
			,   "West Valley City"
			,   "Westminster"
			,   "Wichita"
			,   "Wilmington"
			,   "Winston"
			,   "Winter Haven"
			,   "Worcester"
			,   "Yakima"
			,   "Yonkers"
			,   "York"
			,   "Youngstown"
	        ]}
/*Array.prototype.sort2dArray = function(i){ // this: 2D-array[][], int i: sorting index // References: http://jsfiddle.net/tdBWh/ http://stackoverflow.com/questions/6490343/sorting-2-dimensional-javascript-array http://stackoverflow.com/questions/2793847/sort-outer-array-based-on-values-in-inner-array-javascript?lq=1
	/*  var i=3,ary= // Random number generator: http://www.random.org/ // Google search: sort two dimensional array javascript
		[
		[2,'All are fine',92,84]
	,	[4,'All is Well' ,14,66]
	, 	[1,'Welcome Code',24,41]
	, 	[9,'Javascript'  ,14,83]
		];* /
	return this.sort(function(a,b){return(a[i]<b[i]?-1:(a[i]>b[i]?1:0));})}*/
function htmlCleanup(str){arr=[/&lt;/g,/&gt;/g,/&quot;/g,/&#39;/g],
                          rep=["<"    ,">"    ,"\""     ,"'"     ],i=arr.length;while(i--){str=str.replace(arr[i],rep[i])}return str}
function removeComments_html(str){return str.replace(/<!--[\s\S]*?-->/g,"")} // Reference: http://stackoverflow.com/questions/5653207/remove-html-comments-with-regex-in-javascript // Search terms: remove comments html javascript // function test(){var html='hello <!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:RelyOnVML/> <o:AllowPNG/> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if gte mso 9]><xml> <w:WordDocument> <w:View>Normal</w:View> <w:Zoom>0</w:Zoom> <w:TrackMoves/> <w:TrackFormatting/> <w:HyphenationZone>21</w:HyphenationZone> <w:PunctuationKerning/> <w:ValidateAgainstSchemas/> <w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid> <w:IgnoreMixedContent>false</w:IgnoreMixedContent> <w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText> <w:DoNotPromoteQF/> <w:LidThemeOther>NO-BOK</w:LidThemeOther> <w:LidThemeAsian>X-NONE</w:LidThemeAsian> <w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript> <w:Compatibility> <w:BreakWrappedTables/> <w:SnapToGridInCell/> <w:WrapTextWithPunct/> <w:UseAsianBreakRules/> <w:DontGrowAutofit/> <w:SplitPgBreakAndParaMark/> <w:EnableOpenTypeKerning/> <w:DontFlipMirrorIndents/> <w:OverrideTableStyleHps/> </w:Compatibility> <m:mathPr> <m:mathFont m:val="Cambria Math"/> <m:brkBin m:val="before"/> <m:brkBinSub m:val="&#45;-"/> <m:smallFrac m:val="off"/> <m:dispDef/> <m:lMargin m:val="0"/> <m:rMargin m:val="0"/> <m:defJc m:val="centerGroup"/> <m:wrapIndent m:val="1440"/> <m:intLim m:val="subSup"/> <m:naryLim m:val="undOvr"/> </m:mathPr></w:WordDocument> </xml><![endif]-->world! now try<!-- not working --> again';Logger.log(removeComments_html(html));}
function removeComments_js(str){ // Remove comments from JS // Short version (light): return code.replace(/\/\*.+?\*\/|\/\/.*(?=[\n\r])/g, ''); // Reference: http://james.padolsey.com/javascript/removing-comments-in-javascript/ // Search terms: javascript code remove comments from string
    str = ('__' + str + '__').split('');
    var mode = {
        singleQuote: false,
        doubleQuote: false,
        regex: false,
        blockComment: false,
        lineComment: false,
        condComp: false
    };
    for (var i = 0, l = str.length; i < l; i++) {

        if (mode.regex) {
            if (str[i] === '/' && str[i-1] !== '\\') {
                mode.regex = false;
            }
            continue;
        }

        if (mode.singleQuote) {
            if (str[i] === "'" && str[i-1] !== '\\') {
                mode.singleQuote = false;
            }
            continue;
        }

        if (mode.doubleQuote) {
            if (str[i] === '"' && str[i-1] !== '\\') {
                mode.doubleQuote = false;
            }
            continue;
        }

        if (mode.blockComment) {
            if (str[i] === '*' && str[i+1] === '/') {
                str[i+1] = '';
                mode.blockComment = false;
            }
            str[i] = '';
            continue;
        }

        if (mode.lineComment) {
            if (str[i+1] === '\n' || str[i+1] === '\r') {
                mode.lineComment = false;
            }
            str[i] = '';
            continue;
        }

        if (mode.condComp) {
            if (str[i-2] === '@' && str[i-1] === '*' && str[i] === '/') {
                mode.condComp = false;
            }
            continue;
        }

        mode.doubleQuote = str[i] === '"';
        mode.singleQuote = str[i] === "'";

        if (str[i] === '/') {

            if (str[i+1] === '*' && str[i+2] === '@') {
                mode.condComp = true;
                continue;
            }
            if (str[i+1] === '*') {
                str[i] = '';
                mode.blockComment = true;
                continue;
            }
            if (str[i+1] === '/') {
                str[i] = '';
                mode.lineComment = true;
                continue;
            }
            mode.regex = true;

        }

    }
    return str.join('').slice(2, -2);
}
function getElementById(element,idToFind){ // Source: https://sites.google.com/site/scriptsexamples/learn-by-example/parsing-html#TOC-getElementsByTagName // Called by: var doc=XmlService.parse(html),htm=doc.getRootElement(),menu=getElementsByClassName(htm,"vertical-navbox nowraplinks")[0],out="",linksInMenu=getElementsByTagName(menu,"a");for(i in linksInMenu){out+=XmlService.getRawFormat().format(linksInMenu[i])+"<br>"}Logger.log(output);return HtmlService.createHtmlOutput(output);
  var descendants = element.getDescendants();
  for(i in descendants) {
    var elt = descendants[i].asElement();
    if( elt !=null) {
      var id = elt.getAttribute('id');
      if( id !=null && id.getValue()== idToFind) return elt;
    }
  }
}
function getElementsByClassName(element,classToFind){ // Source: https://sites.google.com/site/scriptsexamples/learn-by-example/parsing-html#TOC-getElementsByTagName // Called by: var doc=XmlService.parse(html),htm=doc.getRootElement(),menu=getElementsByClassName(htm,"vertical-navbox nowraplinks")[0],out="",linksInMenu=getElementsByTagName(menu,"a");for(i in linksInMenu){out+=XmlService.getRawFormat().format(linksInMenu[i])+"<br>"}Logger.log(output);return HtmlService.createHtmlOutput(output);
  var data = [];
  var descendants = element.getDescendants();
  descendants.push(element);
  for(i in descendants) {
    var elt = descendants[i].asElement();
    if(elt != null) {
      var classes = elt.getAttribute('class');
      if(classes != null) {
        classes = classes.getValue();
        if(classes == classToFind) data.push(elt);
        else {
          classes = classes.split(' ');
          for(j in classes) {
            if(classes[j] == classToFind) {
              data.push(elt);
              break;
            }
          }
        }
      }
    }
  }
  return data;
}
function getElementsByTagName(element,tagName){ // Source: https://sites.google.com/site/scriptsexamples/learn-by-example/parsing-html#TOC-getElementsByTagName // Called by: var doc=XmlService.parse(html),htm=doc.getRootElement(),menu=getElementsByClassName(htm,"vertical-navbox nowraplinks")[0],out="",linksInMenu=getElementsByTagName(menu,"a");for(i in linksInMenu){out+=XmlService.getRawFormat().format(linksInMenu[i])+"<br>"}Logger.log(output);return HtmlService.createHtmlOutput(output);
  var data = [];
  var descendants = element.getDescendants();
  for(i in descendants) {
    var elt = descendants[i].asElement();
    if( elt !=null && elt.getName()== tagName) data.push(elt);
  }
  return data;
}
function str2timestamp(s){var d=(s==null)?new Date():new Date(s);return d.getTime()}//@return{date} //@param{string} s | ex:"2014-11-20T08:24:19.356Z" //function test(){Logger.log(str2timestamp("2014-11-20T08:24:19.356Z"))}
function dateStrings2daysDiff(s1,s2,abs){abs=(abs==null)?true:abs; // This version of the function replaces the following: function timestamp2days(t){/*t=t||1393136933816;*/var dt=Math.round((new Date().getTime()-t)/(1000*60*60*24));/*Logger.log(dt);*/return dt}//Logger.log(LibraryjsUtil.timeAgo(true,true,1393136933816))
 /* function test(){var s=new Date().toString(),ar=["2014-11-14T09:14:11.521Z","2014-12-14T09:14:11.521Z","2015-11-14T09:14:11.521Z","2013-11-14T09:14:11.521Z"],i=ar.length;while(i--){
        Logger.log(dateStrings2daysDiff(ar[i]));
        Logger.log(dateStrings2daysDiff(ar[i],"2013-11-14T09:14:11.521Z"));
        Logger.log(dateStrings2daysDiff(ar[i],"2015-11-14T09:14:11.521Z",false));
        Logger.log(dateStrings2daysDiff(ar[i],s,false));
    }}*/
 // NOTE: Negative return values represent dates in the future
 // @return{integer} | The difference in days between s1 and s2
 // @param {string } | s1  a date to compare // Example value: var s1="2014-11-20T08:24:19.356Z"
 // @param {string } | s2  (optional) default value: today | a second date to compare to s1; nominally, a larger date value (in the future) relative to s1
 // @param {boolean} | abs (optional) default value: true  | true returns the absolute value of the difference;
 // Example1: dateStrings2daysDiff(d)        returns how many days "ago" (i.e., in the past) are represented by date string d. It also returns the same value if d is in the future because abs defaults to true.
 // Example2: dateStrings2daysDiff(d,,false) returns how many days "ago" (i.e., in the past) are represented by date string d. It returns a negative value if d is in the future since s2 defaults to today.
    var out=Math.round((str2timestamp(s2)-str2timestamp(s1))/(1000*60*60*24));return abs?Math.abs(out):out}
function timeAgo(abbr,ago,time,local){ // Search term: unix time ago javascript // Reference: https://gist.github.com/badsyntax/2204919
	// @param {boolean} abbr  | true: abbreviations will be used (sec,min,hr,etc); false: full words
	// @param {boolean} ago   | true: "ago" appended (e.g., 12 secs ago)
	// @param {number } time  | time to compare (Unix timestamp) - earlier results in "ago", else "in" as in "in 20 days"
	// @param {number } local | time to compare (Unix timestamp) - later   results in "ago", else same as above
	// @return{string}        | time differential in words (e.g., "12 minutes ago")
	// Sample call: Logger.log(LibraryjsUtil.timeAgo(true,true,1393136933816))
	time = time||Date.now()-1500000;
    local=local||Date.now();if(typeof time!=="number"||typeof local!=="number"){return}
	                                var offset        = Math.abs((local-time)/1000)
	                                ,   span          =  []
	                                ,   MINUTE        =  60
	                                ,   HOUR          =  60   * MINUTE
	                                ,   DAY           =  24   * HOUR
	                                ,   WEEK          =   7   * DAY
	                                ,   MONTH         =  30.5 * DAY
	                                ,   YEAR          = 365   * DAY
	                                ,   DECADE        =  10   * YEAR;
 	     if (offset <= MINUTE)          span          = [ Math.round(Math.abs(offset          )) , "second"    , "sec"       ]; // Replaced: "moments"
	else if (offset < (MINUTE *  60))   span          = [ Math.round(Math.abs(offset / MINUTE )) , "minute"    , "min"       ];
	else if (offset < (HOUR   *  24))   span          = [ Math.round(Math.abs(offset / HOUR   )) , "hour"      , "hr"        ];
	else if (offset < (DAY    *   7))   span          = [ Math.round(Math.abs(offset / DAY    )) , "day"       , "day"       ];
	else if (offset < (WEEK   *   4))   span          = [ Math.round(Math.abs(offset / WEEK   )) , "week"      , "wk"        ];
	else if (offset < (MONTH  *  12))   span          = [ Math.round(Math.abs(offset / MONTH  )) , "month"     , "mo"        ];
	else if (offset < (YEAR   *  10))   span          = [ Math.round(Math.abs(offset / YEAR   )) , "year"      , "yr"        ];
	else if (offset < (DECADE * 100))   span          = [ Math.round(Math.abs(offset / DECADE )) , "decade"    , "decade"    ];
	else                                span          = [ ""                                     , "centuries" , "centuries" ]; // Replaced: "a long time"
	                                    span[1+abbr] += (span[0]===0||span[0]>1)?"s":"";
	                                    span          =  span.join(" ");
    if(ago){return (time<=local)?span+" ago":"in "+span;}else{return span} // Logger.log((time<=local)?span+" ago":"in "+span);
}
function getCurrentBids(arr){var out=[],bidders={},i=arr.length;
	// @param  {array} | Array of bid objects {time,rate,points,bidder}
	// @return {array} | Array of bid objects with the latest (timeMax) bid from each bidder
                            while(i--){
                                if(Object.keys(bidders).indexOf(arr[i].bidder)==-1){ // Add new bidder to the list
                                    bidders[arr[i].bidder]={timestamp:arr[i].timestamp,index:out.length};
                                    out.push(arr[i]);
                               }else if(arr[i].timestamp>bidders[arr[i].bidder].timestamp){ // Get latest bid from existing bidder
                                    bidders[arr[i].bidder].timestamp=arr[i].timestamp;
                                    out.splice(bidders[arr[i].bidder].index,1,arr[i])
                                }
                            }return out}
Number.prototype.toBase = function(base){ // Reference: http://stackoverflow.com/questions/2557501/convert-a-number-to-the-shortest-possible-character-string-while-retaining-uniqu
    var symbols=/*shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")*/"xbUpceMq7wiWHgzNduQE0nBI51PjY9a3VZLDloRSJyKFAv8tmO4Xk2TfhsrG6C"/*Randomization prevents decoding ID*/.split(""),decimal=this,conversion="";if(base>symbols.length||base<=1){return false}
    while(decimal>=1){conversion=symbols[(decimal-(base*Math.floor(decimal/base)))]+conversion;decimal=Math.floor(decimal/base);}return (base<11)?parseInt(conversion):conversion;}
function toBase62(n){return n.toBase(62)}//function testToBase(){//Logger.log((8554916556).toBase(62));//returns:"9kXyB6"//Logger.log(toBase62(S8554916556));//returns:"9kXyB6"}
function shuffle(str){/*@return{str} randomly shuffled string|call:shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")*/var arr=str.split(""),j,temp,i=arr.length;while(i--){j=Math.floor(Math.random()*(i+1));temp=arr[i];arr[i]=arr[j];arr[j]=temp;}return arr.join("");}//Logger.log(shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"));
function convrepl(str,ob,x){return ob[str]||x} // @return{str} substitution value | @param{str} str - to be converted | @param{ob} ob - substitution map | @param{str} x - returned if str not found in map // function test(){Logger.log(convrepl("e",{a:"b",c:"d"},"X"))}
function str2contentLength(str){var m=encodeURIComponent(str).match(/%[89ABab]/g);return str.length+(m?m.length:0) // Used to get value for Content-Length header in http call // @return{int} Length in bytes of UTF-8 encoded string. // @param{string} str string to be counted.
 /* Sample call
	function test(){var str='<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><TestUserAccess xmlns="http://cdr.ffiec.gov/public/services" /></soap:Body></soap:Envelope>'
        ;return Logger.log(LibraryjsUtil.str2contentLength(str))} */
 /* Alternative (slower) and test functions
    function byteLength1(str){var s=str.length;for(var i=str.length-1;i>=0;i--){var code=str.charCodeAt(i);if(code>0x7f&&code<=0x7ff)s++;else if(code>0x7ff&&code<=0xffff)s+=2;}return s} // References: http://jsperf.com/utf-8-byte-length (Results do not match my/internal tests because they are measuring ops/sec NOT total run time!) // http://stackoverflow.com/questions/5515869/string-length-in-bytes-in-javascript // 99% faster than lengthInUtf8Bytes()
    function byteLength2(str){var s=str.length,i=s;while(i--){var code=str.charCodeAt(i);if(code>0x7f&&code<=0x7ff)s++;else if(code>0x7ff&&code<=0xffff)s+=2;}return s}
    function test(){var r=0,i=1000,
      // x="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. UTF-8 encodes each of the 1,112,064 valid code points in the Unicode code space (1,114,112 code points minus 2,048 surrogate code points) using one to four 8-bit bytes (a group of 8 bits is known as an "octet" in the Unicode Standard). Code points wi"
         x='<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><RetrieveFacsimile xmlns="http://cdr.ffiec.gov/public/services"><dataSeries>Call</dataSeries><reportingPeriodEndDate>string</reportingPeriodEndDate><fiIDType>ID_RSSD or FDICCertNumber or OCCChartNumber or OTSDockNumber</fiIDType><fiID>int</fiID><facsimileFormat>PDF or XBRL or SDF</facsimileFormat></RetrieveFacsimile></soap:Body></soap:Envelope>'
        ;while(i--){r+=str2contentLength(x)}return Logger.log(r)}//str2contentLength(x):0.078s(Eng),2.743s(Chi),0.057s(XML)//byteLength1(x):14.481s(Eng),20.758s(Chi),12.121s(XML)//byteLength2(x):12.758s(Eng),15.365s(Chi),17.702s(XML)*/}
function cookieStringify(ob){} // Must write stringify function to complement parse function below
function cookieParse(str,dMaj,dMin){var out={}; // @return {object} | parsed cookie object; (also works for URL / HTTP GET param strings) ex: {} // Note: Remember a cookie is just a string (i.e. typeof(cookie)=="string") therefore, cookie must be stringified before returning to server // Use cookieStringify(cookieOb)
                        // @param  {string} | str  - original cookie passed in as string; ex. "JSESSIONID=3964A59D6449EED209402473B2DA74EB.vwapp3b; Domain=.ziprealty.com; Path=/"
    dMaj = dMaj || ";"; // @param  {string} | dMaj - Major delimiter; i.e., delimiter separating individual cookie items from each other;     ex. ";" or "&" (for URL params)
    dMin = dMin || "="; // @param  {string} | dMin - Minor delimiter; i.e., delimiter separating each cookie key/name from its value/content; ex. "="
	var temp,arr=str.split(dMaj),i=arr.length;while(i--){temp=arr[i].split(dMin);out[temp[0].trim()]=temp[1].trim();}return out;}
function addy_email2sms(num,car){var ob=carrierDomains();return num+"@"+ob[car]}
function carrierDomains(){ var out={} // @return{ob} | key: carrier name, value: carrier suffix (e.g. for SMS, email to: 10digitphonenumber@suffix) // References: http://www.emailtextmessages.com/  http://20somethingfinance.com/how-to-send-text-messages-sms-via-email-for-free/ Google Search: sms via email carrier list
   // Complete data object: section I - U.S.+Canada; section II - foreign; section III - old U.S., many obsolete // {"3 River Wireless":"10digitphonenumber@sms.3rivers.net","ACS Wireless":"10digitphonenumber@paging.acswireless.com","Alltel":"10digitphonenumber@message.alltel.com","ATT":"10digitphonenumber@txt.att.net ","Bell Canada":["10digitphonenumber@txt.bellmobility.ca","10digitphonenumber@bellmobility.ca"],"Bell Mobility (Canada)":"10digitphonenumber@txt.bell.ca","Bell Mobility":"10digitphonenumber@txt.bellmobility.ca","Blue Sky Frog":"10digitphonenumber@blueskyfrog.com","Bluegrass Cellular":"10digitphonenumber@sms.bluecell.com","Boost Mobile":"10digitphonenumber@myboostmobile.com","BPL Mobile":"10digitphonenumber@bplmobile.com","Carolina West Wireless":"10digit10digitnumber@cwwsms.com","Cellular One":["10digitphonenumber@mobile.celloneusa.com","10digitphonenumber@cellularone.txtmsg.com","10digitphonenumber@cellularone.textmsg.com","10digitphonenumber@cell1.textmsg.com","10digitphonenumber@sbcemail.com"],"Cellular South":"10digitphonenumber@csouth1.com","Centennial Wireless":"10digitphonenumber@cwemail.com","CenturyTel":"10digitphonenumber@messaging.centurytel.net","Cingular":["10digitphonenumber@txt.att.net ","10digitphonenumber@cingularme.com"],"Clearnet":"10digitphonenumber@msg.clearnet.com","Comcast":"10digitphonenumber@comcastpcs.textmsg.com","Corr Wireless Communications":["10digitphonenumber@corrwireless.net","10digitphonenumber@corrwireless.net"],"Dobson":"10digitphonenumber@mobile.dobson.net","Edge Wireless":"10digitphonenumber@sms.edgewireless.com","Fido":"10digitphonenumber@fido.ca","Golden Telecom":["10digitphonenumber@sms.goldentele.com","phonenumber@sms.goldentele.com"],"Helio":"10digitphonenumber@messaging.sprintpcs.com","Houston Cellular":"10digitphonenumber@text.houstoncellular.net","Idea Cellular":"10digitphonenumber@ideacellular.net","Illinois Valley Cellular":"10digitphonenumber@ivctext.com","Inland Cellular Telephone":"10digitphonenumber@inlandlink.com","MCI":["10digitphonenumber@pagemci.com","10digitphonenumber@pagemci.com"],"Metrocall":["10digitpagernumber@page.metrocall.com","10digitphonenumber@page.metrocall.com"],"Metrocall 2-way":"10digitpagernumber@my2way.com","Metro PCS":"10digitphonenumber@mymetropcs.com","Microcell":"10digitphonenumber@fido.ca","Midwest Wireless":"10digitphonenumber@clearlydigital.com","Mobilcomm":"10digitphonenumber@mobilecomm.net","MTS":"10digitphonenumber@text.mtsmobility.com","Nextel":["10digitphonenumber@messaging.nextel.com","10digitphonenumber@page.nextel.com"],"OnlineBeep":["10digitphonenumber@onlinebeep.net","10digitphonenumber@onlinebeep.net"],"PCS One":["10digitphonenumber@pcsone.net","10digitphonenumber@pcsone.net"],"President's Choice":"10digitphonenumber@txt.bell.ca","Public Service Cellular":"10digitphonenumber@sms.pscel.com","Qwest":"10digitphonenumber@qwestmp.com","Rogers AT&T Wireless":"10digitphonenumber@pcs.rogers.com","Rogers Canada":"10digitphonenumber@pcs.rogers.com","Satellink":"10digitpagernumber.pageme@satellink.net","Southwestern Bell":"10digitphonenumber@email.swbw.com","Sprint":["10digitphonenumber@messaging.sprintpcs.com","10digitphonenumber@messaging.sprintpcs.com"],"Sumcom":["10digitphonenumber@tms.suncom.com","10digitphonenumber@tms.suncom.com"],"Surewest Communicaitons":["10digitphonenumber@mobile.surewest.com","10digitphonenumber@mobile.surewest.com"],"T-Mobile":["10digitphonenumber@tmomail.net","10digitphonenumber@tmomail.net"],"Telus":["10digitphonenumber@msg.telus.com","10digitphonenumber@msg.telus.com"],"Tracfone":"10digitphonenumber@txt.att.net","Triton":["10digitphonenumber@tms.suncom.com","10digitphonenumber@tms.suncom.com"],"Unicel":["10digitphonenumber@utext.com","10digitphonenumber@utext.com"],"US Cellular":["10digitphonenumber@email.uscc.net ","10digitphonenumber@email.uscc.net "],"Solo Mobile":"10digitphonenumber@txt.bell.ca","US West":"10digitphonenumber@uswestdatamail.com","Verizon":"10digitphonenumber@vtext.com","Virgin Mobile":"10digitphonenumber@vmobl.com","Virgin Mobile Canada":"10digitphonenumber@vmobile.ca","West Central Wireless":["10digitphonenumber@sms.wcc.net","10digitphonenumber@sms.wcc.net"],"Western Wireless":"10digitphonenumber@cellularonewest.com","Chennai RPG Cellular":"phonenumber@rpgmail.net","Chennai Skycell / Airtel":"phonenumber@airtelchennai.com","Comviq":"number@sms.comviq.se","Delhi Aritel":"phonenumber@airtelmail.com","Delhi Hutch":"phonenumber@delhi.hutch.co.in","DT T-Mobile":"phonenumber@t-mobile-sms.de","Dutchtone / Orange-NL":"phonenumber@sms.orange.nl","EMT":"phonenumber@sms.emt.ee","Escotel":"phonenumber@escotelmobile.com","German T-Mobile":"number@t-mobile-sms.de","Goa BPLMobil":"phonenumber@bplmobile.com","Gujarat Celforce":"phonenumber@celforce.com","JSM Tele-Page":"pinnumber@jsmtel.com","Kerala Escotel":"phonenumber@escotelmobile.com","Kolkata Airtel":"phonenumber@airtelkol.com","Kyivstar":"number@smsmail.lmt.lv","Lauttamus Communication":"pagernumber@e-page.net","LMT":"phonenumber@smsmail.lmt.lv","Maharashtra BPL Mobile":"phonenumber@bplmobile.com","Maharashtra Idea Cellular":"phonenumber@ideacellular.net","Manitoba Telecom Systems":"phonenumber@text.mtsmobility.com","Meteor":"phonenumber@mymeteor.ie","MiWorld":"phonenumber@m1.com.sg","Mobileone":"phonenumber@m1.com.sg","Mobilfone":"phonenumber@page.mobilfone.com","Mobility Bermuda":"phonenumber@ml.bm","Mobistar Belgium":"phonenumber@mobistar.be","Mobitel Tanzania":"phonenumber@sms.co.tz","Mobtel Srbija":"phonenumber@mobtel.co.yu","Movistar":"number@correo.movistar.net","Mumbai BPL Mobile":"phonenumber@bplmobile.com","Netcom":"phonenumber@sms.netcom.no","Ntelos":"number@pcs.ntelos.com","O2":["name@o2.co.uk","number@o2imail.co.uk"],"O2 (M-mail)":"number@mmail.co.uk","One Connect Austria":"phonenumber@onemail.at","Optus Mobile":"phonenumber@optusmobile.com.au","Orange":"phonenumber@orange.net","Orange Mumbai":"phonenumber@orangemail.co.in","Orange  NL / Dutchtone":"phonenumber@sms.orange.nl","Oskar":"phonenumber@mujoskar.cz","P&T Luxembourg":"phonenumber@sms.luxgsm.lu","Personal Communication":"sms@pcom.ru (put the number in the subject line)","Pondicherry BPL Mobile":"phonenumber@bplmobile.com","Primtel":"phonenumber@sms.primtel.ru","Safaricom":"phonenumber@safaricomsms.com","Satelindo GSM":"phonenumber@satelindogsm.com","SCS-900":"phonenumber@scs-900.ru","SFR France":"phonenumber@sfr.fr","Simple Freedom":"phonenumber@text.simplefreedom.net","Smart Telecom":"phonenumber@mysmart.mymobile.ph","Southern LINC":"10digitphonenumber@page.southernlinc.com","Sunrise Mobile":["phonenumber@mysunrise.ch","10digitphonenumber@swmsg.com"],"Surewest Communications":"phonenumber@freesurf.ch","Swisscom":"phonenumber@bluewin.ch","T-Mobile Austria":"phonenumber@sms.t-mobile.at","T-Mobile Germany":"phonenumber@t-d1-sms.de","T-Mobile UK":"phonenumber@t-mobile.uk.net","Tamil Nadu BPL Mobile":"phonenumber@bplmobile.com","Tele2 Latvia":"phonenumber@sms.tele2.lv","Telefonica Movistar":"phonenumber@movistar.net","Telenor":"phonenumber@mobilpost.no","Teletouch":"10digitpagernumber@pageme.teletouch.com","Telia Denmark":"phonenumber@gsm1800.telia.dk","TIM":"10digitphonenumber@timnet.com","TSR Wireless":"pagernumber@alphame.com","UMC":"phonenumber@sms.umc.com.ua","Uraltel":"phonenumber@sms.uraltel.ru","Uttar Pradesh Escotel":"phonenumber@escotelmobile.com","Vessotel":"phonenumber@pager.irkutsk.ru","Vodafone Italy":"number@sms.vodafone.it","Vodafone Japan":["phonenumber@c.vodafone.ne.jp","phonenumber@h.vodafone.ne.jp","phonenumber@t.vodafone.ne.jp"],"Vodafone UK":"phonenumber@vodafone.net","Wyndtell":"number@wyndtell.com","Advantage Communications":"10digitpagernumber@advantagepaging.com","Airtouch Pagers":"10digitpagernumber@myairmail.com","AlphaNow":"pin@alphanow.net","Ameritech Paging":"10digitpagernumber@paging.acswireless.com","American Messaging":"10digitpagernumber@page.americanmessaging.net","Ameritech Clearpath":"10digitpagernumber@clearpath.acswireless.com","Arch Pagers (PageNet)":"10digitpagernumber@archwireless.net","AT&T":"10digitphonenumber@mobile.att.net","AT&T Free2Go":"10digitphonenumber@mmode.com","AT&T PCS":"10digitphonenumber@mobile.att.net","AT&T Pocketnet PCS":"10digitphonenumber@dpcs.mobile.att.net","Beepwear":"10digitphonenumber@beepwear.net","Bell Atlantic":"10digitphonenumber@message.bam.com","Bell South":"10digitphonenumber@wireless.bellsouth.com","Bell South (Blackberry)":"10digitphonenumber@bellsouthtips.com","Bell South Mobility":"10digitphonenumber@blsdcs.net","Cellular One (East Coast)":"10digitphonenumber@phone.cellone.net","Cellular One (South West)":"10digitphonenumber@swmsg.com","Cellular One (West)":"10digitphonenumber@mycellone.com","Central Vermont Communications":"10digitpagernumber@cvcpaging.com","Communication Specialists":"7digitpin@pageme.comspeco.net","Cook Paging":"10digitpagernumber@cookmail.com","Digi-Page / Page Kansas":"10digitpagernumber@page.hit.net","Galaxy Corporation":"10digitpagernumber.epage@sendabeep.net","GCS Paging":"10digitpagernumber@webpager.us","GrayLink / Porta-Phone":"10digitpagernumber@epage.porta-phone.com","GTE":["10digitphonenumber@airmessage.net","10digitphonenumber@gte.pagegate.net","10digitphonenumber@messagealert.com"],"Infopage Systems":"pinnumber@page.infopagesystems.com","Indiana Paging Co":"10digitphonenumber@inlandlink.com","Mobilecom PA":"10digitphonenumber@page.mobilcom.net","Morris Wireless":"10digitpagernumber@beepone.net","Motient":"10digitphonenumber@isp.com","Omnipoint":"10digitphonenumber@omnipointpcs.com","Pacific Bell":"10digitphonenumber@pacbellpcs.net","PageMart":"7digitpinnumber@pagemart.net","PageMart Canada":"10digitpagernumber@pmcl.net","PageNet Canada":"10digitphonenumber@pagegate.pagenet.ca","PageOne Northwest":"10digitphonenumber@page1nw.com","Powertel":"10digitphonenumber@voicestream.net","Price Communications":"10digitphonenumber@mobilecell1se.com","Primeco":"10digitphonenumber@email.uscc.net","ProPage":"7digitpagernumber@page.propage.net","Qualcomm":"name@pager.qualcomm.com","RAM Page":"number@ram-page.com","SBC Ameritech Paging":"10digitpagernumber@paging.acswireless.com","Skytel Pagers":"10digitphonenumber@email.skytel.com","ST Paging":"pin@page.stpaging.com","Verizon Pagers":"10digitpagernumber@myairmail.com","Verizon PCS":"10digitphonenumber@myvzw.com","VoiceStream":"10digitphonenumber@voicestream.net","WebLink Wireless":["10digitphonenumber@@airmessage.net","10digitphonenumber@pagemart.net"]}
	  , CAR = [ "Verizon"   , "ATT"         , "Sprint"                  , "TMobile"     ]
	  , DOM = [ "vtext.com" , "txt.att.net" , "messaging.sprintpcs.com" , "tmomail.net" ]
      , i=CAR.length;while(i--){out[CAR[i]]=DOM[i]}return out}
function xmlToJson(xml){ // Changes XML to JSON // Reference: http://davidwalsh.name/convert-xml-json // Google Search: xml to json javascript
	var obj = {}; // Create the return object
	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}
	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj}
function xml2json(xml,tab){ // Reference: http://goessner.net/download/prj/jsonxml/xml2json.js | http://goessner.net/download/prj/jsonxml/ // json2xml // Linked from: http://stackoverflow.com/questions/1773550/xml-json-conversion-in-javascript // Google Search: xml to json javascript
/*	This work is licensed under Creative Commons GNU LGPL License.
	License : http://creativecommons.org/licenses/LGPL/2.1/
    Version : 0.9
	Author  : Stefan Goessner/2006
	Web     : http://goessner.net/
*/
   var X = {
      toObj: function(xml) {
         var o = {};
         if (xml.nodeType==1) {   // element node ..
            if (xml.attributes.length)   // element with attributes  ..
               for (var i=0; i<xml.attributes.length; i++)
                  o["@"+xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
            if (xml.firstChild) { // element has child nodes ..
               var textChild=0, cdataChild=0, hasElementChild=false;
               for (var n=xml.firstChild; n; n=n.nextSibling) {
                  if (n.nodeType==1) hasElementChild = true;
                  else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                  else if (n.nodeType==4) cdataChild++; // cdata section node
               }
               if (hasElementChild) {
                  if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                     X.removeWhite(xml);
                     for (var n=xml.firstChild; n; n=n.nextSibling) {
                        if (n.nodeType == 3)  // text node
                           o["#text"] = X.escape(n.nodeValue);
                        else if (n.nodeType == 4)  // cdata node
                           o["#cdata"] = X.escape(n.nodeValue);
                        else if (o[n.nodeName]) {  // multiple occurence of element ..
                           if (o[n.nodeName] instanceof Array)
                              o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                           else
                              o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                        }
                        else  // first occurence of element..
                           o[n.nodeName] = X.toObj(n);
                     }
                  }
                  else { // mixed content
                     if (!xml.attributes.length)
                        o = X.escape(X.innerXml(xml));
                     else
                        o["#text"] = X.escape(X.innerXml(xml));
                  }
               }
               else if (textChild) { // pure text
                  if (!xml.attributes.length)
                     o = X.escape(X.innerXml(xml));
                  else
                     o["#text"] = X.escape(X.innerXml(xml));
               }
               else if (cdataChild) { // cdata
                  if (cdataChild > 1)
                     o = X.escape(X.innerXml(xml));
                  else
                     for (var n=xml.firstChild; n; n=n.nextSibling)
                        o["#cdata"] = X.escape(n.nodeValue);
               }
            }
            if (!xml.attributes.length && !xml.firstChild) o = null;
         }
         else if (xml.nodeType==9) { // document.node
            o = X.toObj(xml.documentElement);
         }
         else
            alert("unhandled node type: " + xml.nodeType);
         return o;
      },
      toJson: function(o, name, ind) {
         var json = name ? ("\""+name+"\"") : "";
         if (o instanceof Array) {
            for (var i=0,n=o.length; i<n; i++)
               o[i] = X.toJson(o[i], "", ind+"\t");
            json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
         }
         else if (o == null)
            json += (name&&":") + "null";
         else if (typeof(o) == "object") {
            var arr = [];
            for (var m in o)
               arr[arr.length] = X.toJson(o[m], m, ind+"\t");
            json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
         }
         else if (typeof(o) == "string")
            json += (name&&":") + "\"" + o.toString() + "\"";
         else
            json += (name&&":") + o.toString();
         return json;
      },
      innerXml: function(node) {
         var s = ""
         if ("innerHTML" in node)
            s = node.innerHTML;
         else {
            var asXml = function(n) {
               var s = "";
               if (n.nodeType == 1) {
                  s += "<" + n.nodeName;
                  for (var i=0; i<n.attributes.length;i++)
                     s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                  if (n.firstChild) {
                     s += ">";
                     for (var c=n.firstChild; c; c=c.nextSibling)
                        s += asXml(c);
                     s += "</"+n.nodeName+">";
                  }
                  else
                     s += "/>";
               }
               else if (n.nodeType == 3)
                  s += n.nodeValue;
               else if (n.nodeType == 4)
                  s += "<![CDATA[" + n.nodeValue + "]]>";
               return s;
            };
            for (var c=node.firstChild; c; c=c.nextSibling)
               s += asXml(c);
         }
         return s;
      },
      escape: function(txt) {
         return txt.replace(/[\\]/g, "\\\\")
                   .replace(/[\"]/g, '\\"')
                   .replace(/[\n]/g, '\\n')
                   .replace(/[\r]/g, '\\r');
      },
      removeWhite: function(e) {
         e.normalize();
         for (var n = e.firstChild; n; ) {
            if (n.nodeType == 3) {  // text node
               if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                  var nxt = n.nextSibling;
                  e.removeChild(n);
                  n = nxt;
               }
               else
                  n = n.nextSibling;
            }
            else if (n.nodeType == 1) {  // element node
               X.removeWhite(n);
               n = n.nextSibling;
            }
            else                      // any other node
               n = n.nextSibling;
         }
         return e;
      }
   };
   if (xml.nodeType == 9) // document node
      xml = xml.documentElement;
   var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
   return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
}
function rss2json(url,num){ // Example call: LibraryjsUtil.rss2json("http://www.ziprealty.com/rss/zipnotify/12tp788-atcsow-109k",75) // @return{array of obj} @param{string} url - rss query @param{integer>0} num - number of search results to return including historical, if available // Ex: https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://www.ziprealty.com/rss/zipnotify/12tp788-atcsow-109k&num=1000 // https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=RSS_URL_TO_CONVERT&num=NUMBER_OF_RESULTS // Per naren: http://stackoverflow.com/questions/670511/convert-rss-to-json
    var act="https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q="+url+function(){return (num)?"&num="+num:""}();return JSON.parse(UrlFetchApp.fetch(act).getContentText())}
function pdf2text ( pdfFile, options ) {
// Renamed from pdfToText()
// Reference : http://stackoverflow.com/questions/26613809/get-pdf-attachments-from-gmail-as-text/26623198#26623198
// Code Source: https://gist.github.com/mogsdad/e6795e438615d252584f | https://gist.githubusercontent.com/mogsdad/e6795e438615d252584f/raw/15640804df19d8bb6b39066f4bc534a1dd46117f/pdfToText.js
// Note: Before running enable Drive API in two locations: 1. Resources > Advanced Google Services 2. Developers console: https://console.developers.google.com/project/380954338673/apiui/api
/* Test Functions
function test(){Logger.log(getEmailReport("FNA"))}
function getEmailReport(source){source=source||"FNA";var out=[],n=GmailApp.search('from:"firstnationalassets.com"'),i=n.length;while(i--){
    var m=n[i].getMessages()[0],a=m.getAttachments()[0].getAs('application/pdf');out.push(/*LibraryjsUtil.* /pdf2text(a,{keepPdf:true,keepGdoc:true}))}return out}
function extractPdfDetailsFromGDrive(){ // Reference: https://regex101.com/#javascript
    var doc,patt=/-\d\d\d\d /gi
      , ob={"COM":"0B1LVOoV_2dFtZ2duOE9UUHRPTFE"
           ,"VAC":"0B1LVOoV_2dFtZ0s0SXotQnV6MU0"
           ,"SFR":"0B1LVOoV_2dFta0dIY1MxdVlON1U"
           ,"MUL":"0B1LVOoV_2dFtWGhuMy0ydnVWOUU"
           },keys=Object.keys(ob),i=keys.length;while(i--){text2gDoc(ob[keys[i]])}}
function test2() { // References: https://cloudconvert.com/pdf-to-txt | https://developers.google.com/drive/v2/reference/files/insert | http://stackoverflow.com/questions/27303488/using-gas-to-overcome-the-max-file-size-limit-for-google-drive-api-drive-files-i?noredirect=1#comment43072288_27303488
   var file = DriveApp.getFileById("0B1LVOoV_2dFtX2RwaE80OGhHNTA"); // Google hosted PDF
   var resource = {title:"test"};
   var insertOpts = {convert:true};//{ocr:true,ocrLanguage:"en"} Used in original script // Also possible: {useContentAsIndexableText:true}
   var gdocFile = Drive.Files.insert(resource, file, insertOpts);
}
*/
/**Documentation
 * Convert pdf file (blob) to a text file on Drive, using built-in OCR.
 * By default, the text file will be placed in the root folder, with the same
 * name as source pdf (but extension 'txt'). Options:
 *   keepPdf (boolean, default false)     Keep a copy of the original PDF file.
 *   keepGdoc (boolean, default false)    Keep a copy of the OCR Google Doc file.
 *   keepTextfile (boolean, default true) Keep a copy of the text file.
 *   path (string, default blank)         Folder path to store file(s) in.
 *   ocrLanguage (ISO 639-1 code)         Default 'en'.
 *   textResult (boolean, default false)  If true and keepTextfile true, return
 *                                        string of text content. If keepTextfile
 *                                        is false, text content is returned without
 *                                        regard to this option. Otherwise, return
 *                                        id of textfile.
 *
 * @param {blob}   pdfFile    Blob containing pdf file
 * @param {object} options    (Optional) Object specifying handling details
 *
 * @returns {string}          id of text file (default) or text content
 */
  // Ensure Advanced Drive Service is enabled
  try {
    Drive.Files.list();
  }
  catch (e) {
    throw new Error( "To use pdfToText(), first enable 'Drive API' in Resources > Advanced Google Services." );
  }

  // Set default options
  options = options || {};
  options.keepTextfile = options.hasOwnProperty("keepTextfile") ? options.keepTextfile : true;

  // Prepare resource object for file creation
  var parents = [];
  if (options.path) {
    var path = DocsList.getFolder(options.path).getId();
    parents.push( {id:path} );
  }
  var pdfName = pdfFile.getName();
  var resource = {
    title: pdfName,
    mimeType: pdfFile.getContentType(),
    parents: parents
  };

  // Save PDF to Drive, if requested
  if (options.keepPdf) {
    var file = Drive.Files.insert(resource, pdfFile);
  }

  // Save PDF as GDOC
  resource.title = pdfName.replace(/pdf$/, 'gdoc');
  var insertOpts = {
    ocr: true,
    ocrLanguage: options.ocrLanguage || 'en'
  }
  var gdocFile = Drive.Files.insert(resource, pdfFile, insertOpts);

  // Get text from GDOC
  var gdocDoc = DocumentApp.openById(gdocFile.id);
  var text = gdocDoc.getBody().getText();

  // We're done using the Gdoc. Unless requested to keepGdoc, delete it.
  if (!options.keepGdoc) {
    Drive.Files.remove(gdocFile.id);
  }

  // Save text file, if requested
  if (options.keepTextfile) {
    resource.title = pdfName.replace(/pdf$/, 'txt');
    resource.mimeType = MimeType.PLAIN_TEXT;

    var textBlob = Utilities.newBlob(text, MimeType.PLAIN_TEXT, resource.title);
    var textFile = Drive.Files.insert(resource, textBlob);
  }

  // Return result of conversion
  if (!options.keepTextfile || options.textResult) {
    return text;
  }
  else {
    return textFile.id
  }
}
function aa2ao(arr){ // @return {array of objects} // @param {array of arrays} // 2darr2obj 2darr2json // Convert array of arrays to array of objects; useful to, say, convert a Goggle Spreadsheet range.getValues() output into a scriptDb batch upload // Might or might not have duplicated setRowsData() | need to study // Reference: https://developers.google.com/apps-script/guides/sheets#reading-code
    // @result {object  } out=[{"key1":"val11","key2":"val12","key3":"val13"},{"key1":"val21","key2":"val22","key3":"val23"},{"key1":"val31","key2":"val32","key3":"val33"}]
    // @param  {array,2D} arr=[["key1","key2","key3"],["val11","val12","val13"],["val21","val22","val23"],["val31","val32","val33"]]
    // arr=arr||[["key1","key2","key3"],["val11","val12","val13"],["val21","val22","val23"],["val31","val32","val33"]];
    var out=[],j,i=arr.length;while(i---1){out[i]={};j=arr[i].length;while(j--){out[i][arr[0][j]]=arr[i][j]}}out.shift();/*Logger.log(JSON.stringify(out));*/return out;}
function ao2aa(arr){ // @return {arr of arr} // @param {arr of obj} // Converts array of objects to array of arrays with object keys as first array i.e., out[0]; useful for, say, writing to a Google Spreadsheet; Inverse function of aa2ao; // to eliminate header row, call with ao2aa(arr).unshift() // Might or might not have duplicated setRowsData() | need to study // Reference: https://developers.google.com/apps-script/guides/sheets#reading-code
 // var arr=[{"prop1":"val01","prop2":"val02","prop3":"val03"},{"prop1":"val11","prop2":"val12","prop3":"val13"},{"prop1":"val21","prop2":"val22","prop3":"val23"}]
    var keys=Object.keys(arr[0]),out=[],len=keys.length,i=arr.length;while(i--){var j=len;out[i]=[];while(j--){out[i][j]=arr[i][keys[j]]}}out.unshift(keys);/*Logger.log(out);*/return out;}
function ss2ao(id,sheetName){sheetName=sheetName||"Sheet1";var ss=SpreadsheetApp.openById(id),sheetOut=ss.getSheetByName(sheetName),rangeOut=sheetOut.getDataRange(),data=rangeOut.getValues(),arr=/*LibraryjsUtil.*/aa2ao(data);/*Logger.log(JSON.stringify(arr));*/return arr}//id=id||"1i5E3NoITWHZs-cU02hmVrX25z5LczSWupx2-_HHRlM4";sheetName=sheetName||"Buyers";//@return{array of objects} //@param{string} id - SS key id //@param{string} sheetName | name from which to fetch // Example call: LibraryjsUtil.ss2ao("1i5E3NoITWHZs-cU02hmVrX25z5LczSWupx2-_HHRlM4","Agents")
function csv2aa(str){var ar=str.split(/\n/gi),i=ar.length;while(i--){ar[i]=ar[i].split(",")}return ar} // function test(){print(JSON.stringify(csv2array(getBenchmarksSS2array())))}
function write2doc(str,id){ // To retrieve, call retrieveDataFromDoc(id) // Write to doc write2doc() because writing to spreadsheet write2ss() threw errors for large data sets
    // Copy this library script and paste directly into local script // Fixes error: Service unavailable: Docs // Likely a permissions issue
    if(typeof str=="object"){str=JSON.stringify(str)} // Converts objects to JSON strings when necessary
    var doc=id?DocumentApp.openById(id):DocumentApp.create("New"),t=doc.getBody().editAsText(),len=t.getText().length; // Edit existing doc if ID, else create new
    if(len){t.deleteText(0,len-1)}t.insertText(0,str);return}//function test(){var ar=[[1,2,3,4,5,6,7,8],[1,2,3,4,5,6,7,8],[1,2,3,4,5,6,7,8]],ID="1ikEnj1uuT2-vgjbWszalr8NFPOnYOGeI5nYuxXk1SYs";write2doc(ar,ID)}
function dbParse2ss(ob,id,sheetName){/*LibraryjsUtil.*/write2ss(true,/*LibraryjsUtil.*/dbParse(ob).results,sheetName,id,true)}//function test(){LibraryjsUtil.dbParse2ss({verb:"get",project:"dealDigger",className:"situs"},"1zFY_nHZCZCR7rSvki3BE1qQe5PSaplSLpnFHhyXvpy8","Sheet")} // Sheet must not already exist
function write2ss(convert_ao2aa,data,sheetName,id,overwrite){ // Write to doc write2doc() because writing to spreadsheet write2ss() threw errors for large data sets
    //@return{void} | @param{boolean} overwrite - true to overwrite existing data | @param{boolean} convert_ao2aa - true if data is array of objects, false if array of arrays | @param{array of objects or array of arrays} - the data to write | @param{string} sheetName - sheet name to write to | @param{string} act - SS url (DEPRECATED) or, alternatively, just the key (RECOMMENDED) // Example call: LibraryjsUtil.write2ss(true,out,sheetName,id) || LibraryjsUtil.write2ss(false,[report],"Sheet1","1oppaTtG1y6JbmAPOseINpL6AJ4ssVKr17r_jIe7TPGg") // DEPRECATED // if(act.slice(0,8)!="https://"){act="https://docs.google.com/spreadsheet/ccc?key="+act+"#gid=0"} // Example: https://docs.google.com/spreadsheet/ccc?key=0AlLVOoV_2dFtdGhYUWRRNFB0Z1JMeENETk1McnFJWHc#gid=0 (Use of the URL is DEPRECATED. Use SS key/ID instead)
	//if(!id){try{id=SpreadsheetApp.create("Apex | Inventory | Timestamp:"+new Date().getTime()).getId();sheetName="Sheet1"}catch(e){Logger.log("Error sqS6s: "+e.message);return false}}
	if(convert_ao2aa){try{data=/*LibraryjsUtil.*/ao2aa(data.flatten()/*LibraryjsUtil._flatten(data)*/)}
	             catch(e){data=                  ao2aa(data                                          );Logger.log("Error j8lc0: "+e.message)}}
    var ss=SpreadsheetApp.openById(id)/*openByUrl(act)*/,rangeOut,sheetOut;
    if(overwrite){try{ss.deleteSheet(ss.getSheetByName(sheetName))}catch(e){Logger.log("Error SegiH: "+e.message)}ss.insertSheet(sheetName)}
    try{sheetOut=ss.getSheetByName(sheetName)}catch(e){sheetOut=ss.insertSheet(sheetName);Logger.log("Error 2AGKt: "+e.message)}
    var mc=sheetOut.getMaxColumns(),N=2,M=3,len=M+data[0].length;//Logger.log(data.length+"x"+data[0].length);
    try{sheetOut.deleteColumns(Math.min(len,mc),Math.max(0,(mc-len-N)))}catch(e){Logger.log("Error QxULU: "+e.message)}
    try{sheetOut.insertRowsAfter(sheetOut.getMaxRows()-1,data.length);rangeOut=sheetOut.getRange(sheetOut.getLastRow()+1,1,data.length,data[0].length);rangeOut.setValues(data)}
    catch(e){sheetOut.appendRow(data);Logger.log("Error B7UGX: "+e.message)}return}//function test(){write2ss(false,[[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7]],"SP","1rYNT-54dMqpLtIzbKOdZxBBZzIM69YVWn6wRYUvyfSk",true)}
/* Deprecated. 11/24/2014 function getBenchmarksSS2csv(){var ID="1rYNT-54dMqpLtIzbKOdZxBBZzIM69YVWn6wRYUvyfSk" // AUTOMATE via trigger
    ,ob={AGG:"http://real-chart.finance.yahoo.com/table.csv?d=10&e=23&f=2014&g=d&a=8&b=29&c=2003&ignore=.csv&s=AGG"
        ,SP :"http://real-chart.finance.yahoo.com/table.csv?d=10&e=23&f=2014&g=d&a=0&b=4&c=1988&ignore=.csv&s=%5ESP500TR"
        },keys=Object.keys(ob),i=keys.length;while(i--){LibraryjsUtil.write2ss(false,LibraryjsUtil.csv2aa(UrlFetchApp.fetch(ob[keys[i]]).getContentText()),keys[i],ID)}return}*/
function retrieveDataFromDoc(id){return DocumentApp.openById(id).getBody().editAsText().getText()} //function test(){var r=benchmarkDetails(),keys=Object.keys(r),i=keys.length;while(i--){Logger.log(retrieveDataFromDoc(r[keys[i]]["docid"]))}} //function test(){Logger.log(retrieveDataFromDoc("1RmRgXNXv8vbAHTt1bowIFnPybMSIRXHteWyo579exJg"))}
function benchmarkDetails(){ // Sample URLs "http://real-chart.finance.yahoo.com/table.csv?d=10&e=23&f=2014&g=d&a=0&b=4&c=1988&ignore=.csv&s=%5ESP500TR"
                             //             "http://real-chart.finance.yahoo.com/table.csv?d=10&e=23&f=2014&g=d&a=8&b=29&c=2003&ignore=.csv&s=AGG"
    var date=new Date(),d=date.getMonth(),e=date.getDate(),f=date.getFullYear();return{
     sp :{docid:"1ikEnj1uuT2-vgjbWszalr8NFPOnYOGeI5nYuxXk1SYs",url:"http://real-chart.finance.yahoo.com/table.csv?d="+d+"&e="+e+"&f="+f+"&g=d&a=0&b=4&c=1988&ignore=.csv&s=%5ESP500TR"}
    ,nas:{docid:"1CNPwikYnO8TqLFlCzSRfNGGF0k31bkEdr09WSbuZNhQ",url:"http://real-chart.finance.yahoo.com/table.csv?d="+d+"&e="+e+"&f="+f+"&g=d&a=1&b=5&c=1971&ignore=.csv&s=%5EIXIC"}
    ,rut:{docid:"1RmRgXNXv8vbAHTt1bowIFnPybMSIRXHteWyo579exJg",url:"http://real-chart.finance.yahoo.com/table.csv?d="+d+"&e="+e+"&f="+f+"&g=d&a=8&b=10&c=1987&ignore=.csv&s=%5ERUT"}
    ,agg:{docid:"1me7-7RfzT2aqUwKEdY5cNjh86Gh2KUNFUy9vDMY85P8",url:"http://real-chart.finance.yahoo.com/table.csv?d="+d+"&e="+e+"&f="+f+"&g=d&a=8&b=29&c=2003&ignore=.csv&s=AGG"}
	}} // function test(){Logger.log(JSON.stringify(benchmarkDetails()))}
function getBenchmarksSS2csv(){ // MAIN FUNCTION CALL // AUTOMATE via trigger // To retrieve, call retrieveDataFromDoc(id) // This function somewhat misnamed because we are saving in JSON not CSV
    var ob=benchmarkDetails(),keys=Object.keys(ob),i=keys.length;while(i--){Utilities.sleep(5000);/*LibraryjsUtil.*/write2doc(/*LibraryjsUtil.*/csv2aa(UrlFetchApp.fetch(ob[keys[i]]["url"]).getContentText()),ob[keys[i]]["docid"])}return}
// --- GROUP (extract data from html table) --- start  // Use for PDFs: > Open in Acrobat > File > Save as > More options... > XML 1.0 > Save
function xmlDoc2json(id,type){type=type||"array"//@param{string} type "array"(default)||"object"
    var out,s=DocumentApp.openById(id).getBody().getText();
    if(type=="object"){out=/*LibraryjsUtil.*/htmlTable2object(s)}
    else              {out=/*LibraryjsUtil.*/htmlTable2array (s)}/*Logger.log(out);*/return out}
function extractHyperlinks(str){return str.match(/(<a\s+(?:[^>]*?\s+)?href='([^']*)')|(<a\s+(?:[^>]*?\s+)?href="([^"]*)")/gmi)} // Reference: http://stackoverflow.com/questions/15926142/regular-expression-for-finding-href-value-of-a-a-link
function extractStringInsideTag(str){str=str.slice(str.indexOf(">")+1);str=str.slice(0,str.lastIndexOf("<"));return str.trim()}//@param{str} str="<tag>...foo...</tag>"
function extractHtmlTag(str,tag,trim){if(trim==null){trim=true}//@param{boolean} trim tags from ends //@return{array} //str="<table><thead><th>A</td><th>B</td></thead><tbody><tr><td>11</td><td>12</td></tr><tr><td>21</td><td>22</td></tr></tbody></table>";tag="tr";
    var s="<"+tag+"\\b[^>]*>((.|\\n|\\r|\\t)*?)<\\/"+tag+">",patt=new RegExp(s,"gmi"),ar=str.match(patt)||[];//Logger.log("s: "+s);//Logger.log("ar.length: "+ar.length);// Example regex: <td\b[^>]*>((.|\n)*?)<\/td>
    if(trim                ){var i=ar.length;while(i--){    ar[i]=extractStringInsideTag(ar[i]).replace(/(<[\s\S]*?>|<\/[\s\S]*?>)/gmi,"").trim()}}
    // Problem, post regex extraction, href links are gone. // Example solution (applied to calling function): ob.links=extractHyperlinks(str) // Solution: Calling function replaces attempt to attach links to extracted cells e.g., in extractHtmlTag(){...if(tag=="td"||tag=="th"){var i=ar.length;while(i--){var arr  =extractHyperlinks(ar[i]);if(arr&&arr.length){ar[i].push(arr)}}} // Extract hyperlinks from td (or th) cells only ...}
    return ar}//Logger.log(s);Logger.log(ar); // new RegExp("<TAG\b[^>]*>((.|\n)*?)<\/TAG>","gi") // new RegExp("<tr\b[^>]*>((.|\n)*?)</tr>","gi") // Reference: http://www.regular-expressions.info/examples.html
function htmlTable2object(str){// CO-MAIN (and SUB-MAIN) FUNCTION CALL (ie., can be called independently; includes extractHtmlTag() and extractStringInsideTag()) // Extracts data from html table and places in array of arrays //str="<table><thead><th>A</th><th>B</th></thead><tbody><tr><td>11</td><td>12</td></tr><tr><td>21</td><td>22</td></tr></tbody></table>"
    str=str.match(/<table[\s\S]*?>[\s\S]*?<\/table[\s\S]*?>/gmi)[0];//<--First (only?) <table> match//.replace(/(<table[\s\S]*?>|<\/table[\s\S]*?>)/gi,"");// Use for PDFs: > Open in Acrobat > File > Save as > More options... > XML 1.0 > Save
    var ob,th=extractHtmlTag(str,"th"),tr=extractHtmlTag(str,"tr",false),i=tr.length;//Logger.log("i: "+i);//print2doc(str,"DNMF","Mojo");//Logger.log(str);//Logger.log(tr);
    while(i--){try{tr[i]=extractHtmlTag(tr[i],"td")}catch(e){Logger.log("Error bLYPg: "+e.message)}}//Logger.log(tr);
        // try{if(typeof tr[0          ]=="string"||tr[0          ].length!=th.length){tr.shift()}}catch(e){Logger.log("Error GFsJW: "+e.message)}
        // try{if(typeof tr[tr.length-1]=="string"||tr[tr.length-1].length!=th.length){tr.pop  ()}}catch(e){Logger.log("Error 3PK0n: "+e.message)}
        //Logger.log("line 24 tr.length: "+tr.length);
        if(!th.length){th=tr.shift()}i=th.length;while(i--){try{th[i]=th[i].replace(/\W/gmi,""   ) }catch(e){Logger.log("Error XfwMk: "+e.message)}}
        ob={th:th,tr:tr};/*Logger.log("line 26 ob: "+JSON.stringify(ob));*/return ob}
function htmlTable2array(str){// CO-MAIN FUNCTION CALL (includes htmlTable2object(), extractHtmlTag() and extractStringInsideTag()) // Extracts data from html table and places in array of arrays //str="<table><thead><th>A</th><th>B</th></thead><tbody><tr><td>11</td><td>12</td></tr><tr><td>21</td><td>22</td></tr></tbody></table>"
    str=str.match(/<table[\s\S]*?>[\s\S]*?<\/table[\s\S]*?>/gmi)[0];//<--First (only?) <table> match//.replace(/(<table[\s\S]*?>|<\/table[\s\S]*?>)/gi,"");
    var r=htmlTable2object(str);
    // SPECIAL PURPOSE CODE | START
    r.th.splice(-1); // Special-purpose code to make header match row
    // SPECIAL PURPOSE CODE | END
    var out=[],len=r.th.length,i=r.tr.length;while(i--){
        if(typeof r.tr[i]!="object"){Logger.log("Error Zab2t: Row %s is not an array. It is: %s",i,typeof r.tr[i]);continue}
        if(r.tr[i].length!=len){Logger.log("Error Zab2u: Row length does not match header length. Row: %s, Header length: %s, Row length: %s",i,len,r.tr[i].length);continue}
        else{out.unshift(r.tr[i])}}out.unshift(r.th);return out}
// --- GROUP (extract data from html table) --- end
/* --- GROUP Auxilliary / temporary utility functions --- start
// Auxilliary / temporary utility functions
function constructOffer_test(){
    var doc=DocumentApp.openById(DriveApp.getFileById("1rYShHK0q_ar1mnBeDMgMMjKo9wYz_xd8GCjEhwbbgpM").makeCopy("Title Goes Here",DriveApp.getFolderById("0B1LVOoV_2dFtd0FvcnJfUlpVS28")).getId())
 // var doc=DocsList.createFile("New Title Goes Here",DocsList.getFileById("1rYShHK0q_ar1mnBeDMgMMjKo9wYz_xd8GCjEhwbbgpM").getBlob())
   ;Logger.log(doc);}
function cleanupFiles(){ // Searches user's Drive for files accidentally created and changes ownership of those files for deletion. Protects Gdoc version of contracts.
    var db=ScriptDb.getMyDb(),t=new Date().getTime(),u=Session.getUser().getEmail(),n,f,out=[],files=DriveApp.getFiles();while(files.hasNext()){
        f=files.next();n=f.getName();out.push({name:n,id:f.getId()/*,dateCreated:f.getDateCreated(),lastUpdated:f.lastUpdated()* /});
        if(n=="Copy of Template | Purchase Agreement | California"){f.setOwner("atlaslive@gmail.com")/*.setTrashed(true)* /}
   }db.save({table:"filesList",user:u,timestamp:t,filesList:out})}
function mlsMatching_test(){ // Counts mls listings matching situs data; gives counts + ratios
    var k=0,j=0,i,db=ScriptDb.getMyDb(),results=db.query({table:"situs"/*,mlsListing:db.anyValue()* /}),sampleSize=results.getSize();
    while(results.hasNext()){r=results.next();i=db.query({table:"mlsListing",mlsNum_1:r.detail.mlsNumber_1}).getSize();if(i){j++;k+=i}}
    Logger.log("\n %s sample size \n %s unique matches \n %s unique ratio \n %s total matches \n %s avg multiples",sampleSize,j,Math.round(100*j/sampleSize),k,(Math.round(10*k/j)/10));}
function mlsDuplicates_cleanup(){ // Removes duplicate MLS entries
    var db=ScriptDb.getMyDb(),i,results2,results=db.query({table:"mlsListing"});Logger.log(results.getSize());while(results.hasNext()){r=results.next();
        results2=db.query({table:"mlsListing",mlsNum_1:r.mlsNum_1});i=results2.getSize();while(i---1){db.remove(results2.next())}}Logger.log(results.getSize());}
// --- GROUP Auxilliary / temporary utility functions --- end */
/* --- GROUP Data Migration Tools --- start
// Data migration tool set
function write2ss_mlsListings(){var BATCH_SIZE=/*1/*5/* /100,SHEET="Data",ID="1JkHyNYsNF6FKYOPT5RuZfmZxulMlm2-KAzLaBHlya1g"//"1cOB6-pPaufuN9j51rab2LfdRRbzKCCE_DzrDZ_7L0ic"//"1GrK6N19skT8ffPSBEEi5H9icSyS1uAsip-W3fBl67eA"/*"1Ms2tnOU8wjWDegQP4HmUQUdiMDYKNVBQK3B14CQhJzc"* /
   ,db=ScriptDb.getMyDb(),results=db.query({table:"mlsListing"}),r,j,i=BATCH_SIZE,ari=[],arj=[],arid=[],
    KEYS=["link_detail","mlsNum_1","mlsNum_2","table","link_agent","agent_name","agent_email","agent_phone","agent_broker","timestamp","source"];while(results.hasNext()){
    if(i--){r=results.next();arj=[];j=KEYS.length;while(j--){try{arj.push(r[KEYS[j]])}catch(e){Logger.log(e.message)}}ari.push(arj),arid.push(r.getId())}
    else{LibraryjsUtil.write2ss(false,ari,SHEET,ID);db.removeByIdBatch(arid,false);i=BATCH_SIZE;ari=[];arid=[]}}}
function parse_hello(){ // Parse.com // https://www.parse.com/apps/alpha--40/edit#app_keys
    var APP_ID  = "ogiIfGbYrBMDH5ny026E1pcv7lgX7aKCQLc159Za" // <- Alpha (sandbox), Bravo (production) -> pvQjwa1xnC6q0wSdZRbJibVgGwPAEqDHZOiOy2to
      , API_KEY = "R2iwuHBCnocMzWmpDIY5RKznWBRjmnlfIqy94T45" // <- Alpha (sandbox), Bravo (production) -> PNrTPM5gilp6xToCJrmF8bKcr1c6zgGybH29FY1q
//    , STEM    = "https://api.parse.com/"
//    , VERSION = 1
//    , path1   = "functions"
//    , path2   = "hello"
      , ob      = {}
//    , act     = STEM+VERSION+"/"+path1+"/"+path2
      , act     = "https://api.parse.com/1/functions/hello"
      , params  = {method:"post",headers:{"X-Parse-Application-Id":APP_ID,"X-Parse-REST-API-Key":API_KEY,"Content-Type":"application/json"},payload:JSON.stringify(ob),contentType:"application/json",muteHttpExceptions:true,validateHttpsCertificates:false}
      , out     = UrlFetchApp.fetch(act,params).getContentText()
      ; Logger.log(out)}
function parse_createObject(){ // Parse.com // https://www.parse.com/apps/alpha--40/edit#app_keys
    var APP_ID  = "ogiIfGbYrBMDH5ny026E1pcv7lgX7aKCQLc159Za" // <- Alpha (sandbox), Bravo (production) -> pvQjwa1xnC6q0wSdZRbJibVgGwPAEqDHZOiOy2to
      , API_KEY = "R2iwuHBCnocMzWmpDIY5RKznWBRjmnlfIqy94T45" // <- Alpha (sandbox), Bravo (production) -> PNrTPM5gilp6xToCJrmF8bKcr1c6zgGybH29FY1q
//    , STEM    = "https://api.parse.com/"
//    , VERSION = 1
//    , path1   = "classes"
//    , path2   = "GameScore"
      , ob      = {score:1337,player:{firstName:"Sean",lastName:"Plott"},cheatMode:false}
//    , act     = STEM+VERSION+"/"+path1+"/"+path2
      , act     = "https://api.parse.com/1/classes/GameScore"
      , params  = {method:"post",headers:{"X-Parse-Application-Id":APP_ID,"X-Parse-REST-API-Key":API_KEY},payload:JSON.stringify(ob),contentType:"application/json",muteHttpExceptions:true,validateHttpsCertificates:false}
      , out     = UrlFetchApp.fetch(act,params).getContentText()
      ; Logger.log(out)} // {"createdAt":"2014-05-17T03:33:16.454Z","objectId":"RGrJtxbGNd"}
function fusionTables_listTables() { // Reference: https://developers.google.com/apps-script/advanced/fusion-tables#list_tables // Enable at https://console.developers.google.com/project/243270819245/apiui/api and Resources > Advanced Google services // Reference: https://developers.google.com/apps-script/guides/services/advanced#enabling_advanced_services
  var i,tab=FusionTables.Table.list();if(tab.items){i=tab.items.length;while(i--){Logger.log("Table with name '%s' and ID '%s' was found.",tab.items[i].name,tab.items[i].tableId);}}else{Logger.log("No tables found.")}}
function fusionTables_runQuery(tableId) {
  var sql = 'SELECT * FROM ' + tableId + ' LIMIT 100';
  var result = FusionTables.Query.sqlGet(sql, {
    hdrs: false
  });
  if (result.rows) {
    var spreadsheet = SpreadsheetApp.create('Fusion Table Query Results');
    var sheet = spreadsheet.getActiveSheet();
    // Append the headers.
    sheet.appendRow(result.columns);
    // Append the results.
    sheet.getRange(2, 1, result.rows.length, result.columns.length)
        .setValues(result.rows);
    Logger.log('Query results spreadsheet created: %s',
        spreadsheet.getUrl());
  } else {
    Logger.log('No rows returned.');
  }
}
function bigQuery_runQuery() { // Reference: https://developers.google.com/apps-script/advanced/bigquery#sample_code // Enable at https://console.developers.google.com/project/243270819245/apiui/api and Resources > Advanced Google services // Reference: https://developers.google.com/apps-script/guides/services/advanced#enabling_advanced_services
  var projectId = "243270819245"; // Replace this value with the project ID listed in the Google Developers Console project. // https://console.developers.google.com/project/243270819245
  var request = {query: "SELECT TOP(word, 300) AS word, COUNT(*) AS word_count FROM publicdata:samples.shakespeare WHERE LENGTH(word) > 10"}; //
  var queryResults = BigQuery.Jobs.query(request, projectId);
  var jobId = queryResults.jobReference.jobId;
  // Check on status of the Query Job.
  var sleepTimeMs = 500;
  while (!queryResults.jobComplete) {
    Utilities.sleep(sleepTimeMs);
    sleepTimeMs *= 2;
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId);
  }
  // Get all the rows of results.
  var rows = queryResults.rows;
  while (queryResults.pageToken) {
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId, {
      pageToken: queryResults.pageToken
    });
    rows = rows.concat(queryResults.rows);
  }
  if (rows) {
    var spreadsheet = SpreadsheetApp.create("BigQuery Results");
    var sheet = spreadsheet.getActiveSheet();
    // Append the headers.
    var headers = queryResults.schema.fields.map(function(field) {
      return field.name;
    });
    sheet.appendRow(headers);
    // Append the results.
    var data = new Array(rows.length);
    for (var i = 0; i < rows.length; i++) {
      var cols = rows[i].f;
      data[i] = new Array(cols.length);
      for (var j = 0; j < cols.length; j++) {
        data[i][j] = cols[j].v;
      }
    }
    sheet.getRange(2, 1, rows.length, headers.length).setValues(data);
    Logger.log("Results spreadsheet created: %s",spreadsheet.getUrl());
  } else {
    Logger.log('No rows returned.');
  }
}
// --- GROUP Data Migration Tools --- end */
/* --- GROUP (in progress or deprecation) --- start
Deprecated. 11/24/2014 function getBenchmarks(){var act=encodeURI("finance.yahoo.com/q/hp?s=^SP500TR")//"http://finance.yahoo.com/q/hp?s=%5ESP500TR&a=00&b=4&c=1988&d=10&e=23&f=2014&g=m"
   ,htmlTable=extractHtmlTag(UrlFetchApp.fetch(act).getContentText().split("yfnc_datamodoutline1")[1],"table")[0];return htmlTable2array(htmlTable)} // function test(){print(JSON.stringify(getBenchmarks()))}
Deprecated. 11/24/2014 function table2array(labels,id){ // Converts HTML table into a JSON array of objects // Steps: 1. Go to site, get PDF. 2. Save PDF, open in Acrobat, choode "save as XML." (Note: Later, when saving, add .html extension to filename.) 3. (optional) Minify XML at http://www.willpeavy.com/minifier/ or Google Search: HTML minify. 4. Save XML file as .html to desktop. 5. Upload new version to "act" UR via Google Drive. (File named "htmlTable2convert.html")
    // @return{array of objects} Keys are column headers, attributes are cell values // @param{object} labels; Example: {state:"az",county:"coconino",source:"http://www.coconino.az.gov/DocumentCenter/View/1687"} where source = Source URL of original file // @param{str} id URL of destination file or doc ID of that file if hosted on Google Drive
    id=id||"0B1LVOoV_2dFtUndtZmJCaTZJcjQ";var act=LibraryjsUtil.urlOrid2urlGdriveHost(id),str=UrlFetchApp.fetch(act).getContentText().split(/<table>/ig).slice(1).join("<table>")
    ,ar=str.replace(/(<p>|<\/p>|<\/td>|<\/th>|<\/tr>|<table>|<\/table>)/img,"").split(/<tr>/img).slice(1/*(IN,Marion),7(AZ,Coconino)* /),keys=ar.shift().replace(/(\n|\t|\r|\.|\s|&amp;)/img,"").split("<TH>")/*(/(<th>|<td>)/img)* /.slice(1),out=[],j,//i=keys.length;while(i--){keys[i]=keys[i].split(" ")[0]}
    i=ar.length;/*Logger.log(i/*keys/* /str* /);* /while(i--){ar[i]=ar[i].split(/<td>/img).slice(1);/*Logger.log(ar[i]);* /out[i]=/*labels|| <-- causes all out elements to equal last element in loop* /{};if(labels){for(var x in labels){out[i][x]=labels[x]}}j=keys.length;while(j--){out[i][keys[j]]=ar[i][j];/*Logger.log(i);Logger.log(j);Logger.log(out[i]);* /}/*Logger.log(out[i])* /}
    return out} //function test(){LibraryjsUtil.write2ss(true,/*print/*Logger.log* /(JSON.stringify* /(table2array({state:"IN",county:"Marion",saleYear:2014,saleMonth:10,saleDay:17,sourceWeb:"http://www.indy.gov/egov/county/treasurer/sale/Pages/taxsale.aspx",sourceDoc:"https://taxsale.g-uts.com/TempFiles/27464327_AdvertisingList.pdf"},"0B1LVOoV_2dFtUndtZmJCaTZJcjQ")))}//,"https://googledrive.com/host/0B1LVOoV_2dFtUndtZmJCaTZJcjQ")))} //function test(){print/*Logger.log* /(JSON.stringify(table2array({state:"AZ",county:"Coconino",sourceDoc:"http://www.coconino.az.gov/DocumentCenter/View/1687"},"https://googledrive.com/host/0B1LVOoV_2dFtUndtZmJCaTZJcjQ")))}
// --- GROUP (in progress or deprecation) --- end */
function qMatch     (ob,query,kq){var m=true,kq=kq||Object.keys(query),i=kq.length;while(i--){if(query[kq[i]]!=ob[kq[i]]){m=false;break}}return m}//@return{boolean}:"true" if object matches query (e.g. ob={"a":"x","b":"y"};q={"a":"x")//@param{obj}ob:object to test//@param{obj}query:query to test against//@param{array}kq:query keys; passes as parameter for efficiency of not having to find keys for every loop iteration
function qMatchArray(ar,query   ){var out=[],kq=    Object.keys(query),i=ar.length;while(i--){if(qMatch(ar[i],query,kq)){out.push(ar[i])}}return out}//@return{array}:all objects in @param{array} ar matching given @param{obj} query
function queryArray(arr,query,outField,returnType/*,zeroOptOut*/){ // CALL THIS FUNCTION // This is the highest-level function call ie. calls the others qMatchArray() and qMatch()// Given an array (e.g. bids), return the given field value of the one that matches the given query object (e.g. matching an identifying email). And is either the latest or the highest bid. Either using zero or not as an opt-out excluding parameter.
    // function test(){var ar=[{name:"alpha",score:100,team:"blue"},{name:"bravo",score:150,team:"blue"},{name:"charlie",score:200,team:"blue"},{name:"delta",score:250,team:"red"},{name:"echo",score:300,team:"red"}];Logger.log(queryArray(ar,{team:"blue"},"name"));Logger.log(queryArray(ar,{team:"red"},"score"));Logger.log(queryArray(ar,{team:"red"}));Logger.log(queryArray(ar,{team:"blue"}));Logger.log(queryArray(ar,{team:"blue"},"score","low"));Logger.log(queryArray(ar,{team:"red"},"score","high"));Logger.log(queryArray(ar,{team:"red"},"name","LAST"));Logger.log(queryArray(ar,{team:"red"},"name","FIRST"));Logger.log(queryArray(ar,{team:"blue"},"name","LAST"));Logger.log(queryArray(ar,{team:"blue"},"name","FIRST"))}
    // @return{ number or string }            | the array element that matches the given parameters
	// @param { array of objects } arr        | the input array parameter from which to select a return result
	// @param { object           } query      | parameters to match in order to be considered for return value e.g. {email:"foo@example.com"}
	// @param { string           } outField   | "RETURN_ALL" returns all fields as an object; "POSITION" returns element number of the array match; else, names the specific field to return (if array is array of objects); must contain values greater than zero if returnType=="HIGH"||"LOW"
	//                                          *Caution* When using outField:"POSITION"...
	//                                              Example  : DateNight-01.html function getFandango(q){...out=[{},]...y=LibraryjsUtil.queryArray(out,{movieId:ob.movieId},"POSITION","FIRST");if(y){out[y].movieTimes=out[y].movieTimes.concat(ob.movieTimes).sort(function(a,b){var x="milTime";return(a[x]-b[x])})...}
	//                                              Problem  : because if(y) conditional returns false for first element
	//                                              Solution : out=[{},] Starting with an object in output array at element zero allows conditional to work properly. Empty object {} prevents error when searching for specific property (in the query parameter)
	// @param { string           } returnType | range: "ALL"(default),"FIRST","LAST","HIGH","LOW"; "HIGH" if decision parameter is to return the highest (numerical) value (of the outField) matching all other criteria ("LOW"==opposite); "FIRST" (default) returns first in the array of array elements (i.e., possessing the lowest ordinal number; e.g. returns arr[0] not arr[1]) ("LAST"==opposite; i.e. "LAST" returns opposite of "FIRST"); // Note: sometimes arrays are populated such that latest (most recent) value (has the lowest element number, i.e. array is ordered newest (highest timestamp) to oldest (lowest timestamp) e.g. via arr.unshift()); this function does not consider this. i.e., only the ordering of the elements of the incoming array parameter are considered; any adjustments for real-time ordering/sequencing should be made outside the scope of this function
	// @param { boolean          } zeroOptOut | True if zero is treated as deFacto opt-out signal. i.e., zero value eliminates element from return consideration | Note: Work in progress
    // Example_1: bidAmt=LibraryjsUtil.queryArray(r.bids,{bidder:user},"amount","FIRST") // Example_2: m.buyer=queryArray(/*LibraryjsUtil.*/ss2ao(ID,"Buyers"),{Email:m.Buyer},"RETURN_ALL");
	outField=outField||"RETURN_ALL";returnType=returnType||"ALL";returnType=returnType.toUpperCase();//zeroOptOut=zeroOptOut||false;//query=query||{bidder:"ssanchez0322@gmail.com"};outField=outField||"amount";arr=arr||[{"amount":"","bidder":"atlaslive@gmail.com","confirmed":false,"time":"1393224114597"},{"amount":245000,"bidder":"ssanchez0322@gmail.com","confirmed":false,"time":"1393136714298"}];
	switch(returnType){ // Deleted this before switch() statement... if(returnType=="FIRST"){arr.reverse();returnType="LAST";} // Don't use .reverse() because it changes the original array even though it's passed as a parameter! // Use for loop instead. i.e., for(var i=0;i<arr.length;i++)
        case "ALL"   : var out=[] ,i=arr.length     ;while(i--){if(qMatch(arr[i],query)/*&&(!(zeroOptOut&&(!arr[i][outField])))*/){if(outField=="RETURN_ALL"){out.push(arr[i])}else if(outField=="POSITION"){out.push(i)}else{out.push(arr[i][outField])}}}return out  ;break;
        case "FIRST" : for(var i=0;i<arr.length;i++)           {if(qMatch(arr[i],query)/*&&(!(zeroOptOut&&(!arr[i][outField])))*/){if(outField=="RETURN_ALL"){return   arr[i] }else if(outField=="POSITION"){return   i }else{return   arr[i][outField]}}} return false;break;
        case "LAST"  :     var     i=arr.length     ;while(i--){if(qMatch(arr[i],query)/*&&(!(zeroOptOut&&(!arr[i][outField])))*/){if(outField=="RETURN_ALL"){return   arr[i] }else if(outField=="POSITION"){return   i }else{return   arr[i][outField]}}} return false;break;
		case "HIGH"  :     var m=qMatchArray(arr,query),i=m.length,t=m[i-1][outField];while(i--){t=Math.max(t,m[i][outField])}     return t;break; // Use only when outField is sortable
        case "LOW"   :     var m=qMatchArray(arr,query),i=m.length,t=m[i-1][outField];while(i--){t=Math.min(t,m[i][outField])}     return t;break; // Use only when outField is sortable
        default      : break}}
/*function ao_sort(){var ar=[{item:1,timestamp:101},{item:5,timestamp:105},{item:3,timestamp:103},{item:7,timestamp:107},];ar.unshift({item:9,timestamp:109}); // UPDATE: SEE BELOW FUNCTION: ao_sortBy() // DO NOT CALL THIS FUNCTION DIRECTLY, INSTEAD COPY/PASTE BELOW LINE // Sorts array of objects by selected property // Reference: http://stackoverflow.com/questions/1129216/sorting-objects-in-an-array-by-a-field-value-in-javascript // Google search terms: sort array of objects javascript
    ar.sort(function(a,b){var x="timestamp";return(a[x]-b[x])})/*.reverse()* /;Logger.log(ar); // Sample call: r.statusArray.unshift(ob);r.statusArray.sort(function(a,b){var x="timestamp";return(a[x]-b[x])}).reverse();/*ar[0]=newest* /db.save(r);
	} // function test(){var ar=[{a:"A",price:1.25},{a:"B",price:21.5},{a:"C",price:7.75}];ar.sort(function(a,b){var x="price";return(a[x]-b[x])})/*.reverse()* /;Logger.log(JSON.stringify(ar))} returns: [{"a":"A","price":1.25},{"a":"C","price":7.75},{"a":"B","price":21.5}]
*/
function ao_sortBy(field,reverse,primer){//@return{array} Sorted array of objects // References: http://jsfiddle.net/dFNva/1/
    // Example Calls: var homes=[{"h_id":"3","city":"Dallas","state":"TX","zip":"75201","price":"162500"},{"h_id":"4","city":"Bevery Hills","state":"CA","zip":"90210","price":"319250"},{"h_id":"5","city":"New York","state":"NY","zip":"00010","price":"962500"}];
	// Sort by price high to low           // homes.sort(LibraryjsUtil.ao_sortBy("price", true , parseInt));
    // Sort by city, case-insensitive, A-Z // homes.sort(LibraryjsUtil.ao_sortBy("city" , false, function(a){return a.toUpperCase()}));
    var key=function(x){return primer?primer(x[field]):x[field]};return function(a,b){var A=key(a),B=key(b);return((A>B)?-1:((A<B)?1:0))*[-1,1][+!!reverse]}}
function urlOrid2urlGdriveHost(id){return (id.match(/:\/\//gi))?id:"https://googledrive.com/host/"+id} // Returns URL of google drive hosted file given either URL (unchanged) or file ID // Sample call: id=id||"0B1LVOoV_2dFtUndtZmJCaTZJcjQ";var act=LibraryjsUtil.urlOrid2urlGdriveHost(id),str=UrlFetchApp.fetch(act).getContentText() // function test(){Logger.log(idOrUrl2gDriveHostUrl("0B1LVOoV_2dFtUndtZmJCaTZJcjQ"))}//"https://googledrive.com/host/0B1LVOoV_2dFtUndtZmJCaTZJcjQ"))}
function      id2url(id,fileType,actionType){ // Sample call: linkPdfDl=LibraryjsUtil.id2url(id,"DOC","DL")||id2url(id,"SS","VIEW") // @return{string} - URL for opening or downloading // @param{string} fileType="DOC"||"SS"||"OTHER" // @param{string} actionType="VIEW"||"DL" // Example Open URL: ""https://docs.google.com/open?id=ID" // Note: Can also use DriveApp.getFileById(id).getUrl()&&.getDownloadUrl()
 // var OFFER_URL="https://docs.google.com/document/d/1al67TFJH9c-vXg8uF0GDi4_aPgW97l5dqSZdRmsRhyU/edit?usp=sharing",
 // var OFFER_DL ="https://docs.google.com/document/d/1al67TFJH9c-vXg8uF0GDi4_aPgW97l5dqSZdRmsRhyU/export?format=pdf"    ; // PDF export of GoogleDoc // Note that the PDF export URL (https://docs.google.com/document/d/A_GOOGLE_DOCS_ID/export?format=pdf) would change depending on the Google Doc type (/document/ is for the document editor, but /spreadsheet/ would be used for spreadsheets. A URL like "https://drive.google.com/uc?export=download&id=A_GOOGLE_DOCS_ID" would be used for non-native Google Docs files.)
 // var OFFER_SS ="https://docs.google.com/spreadsheet/d/1al67TFJH9c-vXg8uF0GDi4_aPgW97l5dqSZdRmsRhyU/export?format=pdf" ; // PDF export of Google Sheet (spreadsheet)
 // var OFFER_XX ="https://drive.google.com/uc?export=download&id=A_GOOGLE_DOCS_ID"                                      ; // PDF export of non-native Google Drive files
	  // if(actionType=="READ"){return idOrUrl2gDriveHostUrl(id,actionType/*,fileType*/)}
 /*else*/if(actionType=="VIEW"){return "https://docs.google.com/open?id="               +id}else if(actionType=="DL"){switch(fileType){
            case "DOC"      :   return "https://docs.google.com/document/d/"            +id+"/export?format=pdf";break; // GoogleDoc   "https://docs.google.com/document/d/ID/export?format=pdf"
            case "SS"       :   return "https://docs.google.com/spreadsheet/d/"         +id+"/export?format=pdf";break; // GoogleSheet "https://docs.google.com/spreadsheet/d/ID/export?format=pdf"
            case "OTHER"    :   return "https://drive.google.com/uc?export=download&id="+id                     ;break; // Other Type  "https://drive.google.com/uc?export=download&id=ID"
            default         :   break;}}else{return false}} // function test(){Logger.log(LibraryjsUtil.id2url("12TL0IZqO_hU7Ywnfga8UeO7iPJCxvFP5iHUrPVtAz58","DOC","DL"))}function digits2words(n){return digits2words(n).replace(/  /g," ")} // Replaces double spaces with single_spaces // Call /*LibraryjsUtil.*/toCaseTitle(digits2words(n)) and digits2words(n).toUpperCase() as necessary // function test(){var t=[0,1,2,7,10,11,12,13,15,19,20,21,25,29,30,35,50,55,69,70,99,100,101,119,510,900,1000,5001,5019,5555,10000,11000,100000,199001,245671,300009,1000000,1111111,190000009],i=t.length;while(i__){Logger.log(t[i]+": "+digits2words(t[i]))}}
function digits2words       (num){ // http://stackoverflow.com/questions/5529934/javascript_numbers_to_words
    var ones = [ ""    , "one"    , "two"    , "three"    , "four"     , "five"    , "six"     , "seven"     , "eight"    , "nine"     ]
    ,   tens = [ ""    , ""       , "twenty" , "thirty"   , "forty"    , "fifty"   , "sixty"   , "seventy"   , "eighty"   , "ninety"   ]
    ,  teens = [ "ten" , "eleven" , "twelve" , "thirteen" , "fourteen" , "fifteen" , "sixteen" , "seventeen" , "eighteen" , "nineteen" ]
    ;                               if(num==         0){return "zero"}
                                    else               {return convert_millions(num)}
    function convert_millions (num){if(num>=   1000000){return convert_millions(Math.floor(num/1000000))+" million " +convert_thousands(num%1000000)}else{return convert_thousands(num)}}
    function convert_thousands(num){if(num>=      1000){return convert_hundreds(Math.floor(num/   1000))+" thousand "+convert_hundreds (num%   1000)}else{return convert_hundreds (num)}}
    function convert_hundreds (num){if(num>=       100){return ones            [Math.floor(num/    100)]+" hundred " +convert_tens     (num%    100)}else{return convert_tens     (num)}}
    function convert_tens     (num){if(num<         10){return ones                       [num   ]}
                               else if(num>=10&&num<20){return teens                      [num_10]}
                               else                    {return tens            [Math.floor(num/10)]+" "+ones[num%10]}}}
function ddGetMarketData(state,city){/*state=state||"CA";city=city||"Los Angeles";*/var ID="1i5E3NoITWHZs-cU02hmVrX25z5LczSWupx2-_HHRlM4"
    , m       = /*LibraryjsUtil.*/queryArray(/*LibraryjsUtil.*/ss2ao(ID,"Markets"),{State:state,City:city},"RETURN_ALL");
      m.buyer = /*LibraryjsUtil.*/queryArray(/*LibraryjsUtil.*/ss2ao(ID,"Buyers" ),{Email:m.Buyer        },"RETURN_ALL");
      m.agent = /*LibraryjsUtil.*/queryArray(/*LibraryjsUtil.*/ss2ao(ID,"Agents" ),{Email:m.Agent        },"RETURN_ALL"); // Logger.log(JSON.stringify(m))
      return m}
function initialDepositCalc(amt,rate,max){rate=rate||(0.02);max=max||5000;return Math.min(max,1000*Math.ceil(amt/1000*rate))} // @return{int} initial deposit // @param{int} amt | initial offer // @param{float} rate _ typically 1% to 2% of purchase price // @param{int} max _ upper limit, deposit not to exceed // outputMap={"0_50":1,"51_100":2,"101_150":3,"151_200":4,"201+":5} // function initDeposit_test(){var arr=[45,50,75,105,150,175,200,201,350],i=arr.length;arr.reverse();while(i__){Logger.log(arr[i]+": "+initDeposit(arr[i]*1000))}}
function numberWithCommas(x){if(!x){Logger.log("Error : LibraryjsUtil.numberWithCommas() was passed a false value.");return ""} //@return{string} // format dollars and numbers // http://stackoverflow.com/questions/2901102/how_to_print_a_number_with_commas_as_thousands_separators_in_javascript
    var parts=x.toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");return parts.join(".")} // function test(){var arr=[88,99,1000,1005,1000050,10500000,10500000.123456],i=arr.length;while(i__){Logger.log(numberWithCommas(arr[i]))}}
function num2cur(num,dec,symFront,symBack){if(!num){Logger.log("Error : LibraryjsUtil.num2cur() was passed a false value.");return ""} //@return{string} // Formats number as currency //@param{float} num: the number to be formatted //@param{int} dec: number of digits following decimal //@param{string} symFront,symBack: currency symbol/s to use in front/behind the number value (e.g. "$","USD"
    if(dec!==0){dec=dec||2};symFront=symFront||"$",symBack=symBack?" "+symBack:"";
    var mul=Math.pow(10,dec),out=symFront+/*LibraryjsUtil.*/numberWithCommas(parseFloat(Math.round(num*mul)/mul).toFixed(dec))+symBack;
    return out}//function test(){var NUM=[3.5,12.125,0.000001,123456789],DEC=[0,1,2,3,-1,-2],j,i=DEC.length;while(i--){j=NUM.length;while(j--){Logger.log(/*LibraryjsUtil.*/num2cur(NUM[j],DEC[i]))}}}
function todaysDateInWords(){var d=new Date(),months=["January","February","March","April","May","June","July","August","September","October","November","December"];return months[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()}
function constructOffer(s){/*@return{string}:Document ID|@param{obj}s:Property*/s=s||ScriptDb.getMyDb().query({item:"MH50xkR"}).next(),m=/*LibraryjsUtil.*/ddGetMarketData(s.marketState,s.marketCity),PAGE_WIDTH=720,bidAmt=/*250000*//*LibraryjsUtil.*/queryArray(s.bids,{bidder:m.buyer.Email/*/"ssanchez0322@gmail.com"*/},"amount","FIRST"),bidCommas=/*LibraryjsUtil.*/numberWithCommas(bidAmt),fullAddy=(s.sa+", "+s.csz).toUpperCase(),shortAddy=(s.sa+", "+s.detail.city+" "+s.detail.zip).toUpperCase()/*,d=new Date(),t=d.getTime()*/,date=/*LibraryjsUtil.*/todaysDateInWords()/*.toUpperCase()*/,doc=DocumentApp.openById(DriveApp.getFileById("1pDaWLWqnODwU-WQLpuwjH_FJ88dgANz2_wloziQp85k").makeCopy(toCaseTitle(fullAddy+" | "+date+" | $"+bidCommas),DriveApp.getFolderById("0B1LVOoV_2dFtd0FvcnJfUlpVS28")/*createFolder("Offers").setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW)*/)/*.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW)*/.getId()),deposit=/*LibraryjsUtil.*/initialDepositCalc(bidAmt),depositCommas=/*LibraryjsUtil.*/numberWithCommas(deposit),pof=m.buyer.POFamt,pofCommas=/*LibraryjsUtil.*/numberWithCommas(pof),repairs=15000,repairsCommas=/*LibraryjsUtil.*/numberWithCommas(repairs),arv=Math.round((bidAmt*1+repairs*1)/0.7),arvCommas=/*LibraryjsUtil.*/numberWithCommas(arv),county=function(){try{return /*LibraryjsUtil.*/geoGoogle(fullAddy).administrative_area_level_2.long_name.replace(/ County/,"").toUpperCase()}catch(e){Logger.log("Error POef6: "+e.message+": @var county: "+fullAddy);return ""}}(),bidWords=/*LibraryjsUtil.*/toCaseTitle(digits2words(bidAmt))/*.toUpperCase()*/,priceBal=(bidAmt-deposit),priceBalCommas=/*LibraryjsUtil.*/numberWithCommas(priceBal),date_rpa08de=date,i=47-bidWords.length;while(i--){bidWords/*.editAsText().appendText("_".editAsText().setBold(false))*/+="_"}i=19-date.length;while(i--){date_rpa08de+="_"} // Logger.log(JSON.stringify(m)); // @param{object} s | subject property // https://developers.google.com/apps-script/reference/document // Notes: // var body=doc.getBody(); // body.appendParagraph("\n\nA paragraph."); // Logger.log("There are "+doc.getNumChildren()+" elements in the document body."); //xLogger.log(body.findText(/Buyer/)) // var firstChild=doc.getChild(0);if(firstChild.getType()==DocumentApp.ElementType.PARAGRAPH){firstChild.removeFromParent();/*Logger.log("The first element is a paragraph.")* /}else{Logger.log("The first element is not a paragraph.")} // var i=0;do{var elem=doc.getChild(i++); Logger.log(i_1+": "+elem.getType()); // if(elem.getType()==DocumentApp.ElementType.PARAGRAPH){elem.removeFromParent()}/*Don't use this command as it increases the spacing between tables, inexplicably* /}while(elem)
    var arr = [  bidCommas ,  fullAddy                              ,  date               ,  bidCommas , depositCommas ,  pofCommas  ,  arvCommas ,  repairsCommas ,  bidCommas ,  date             /* ,  m.buyer.EntityName.toUpperCase() */ ,  shortAddy                       /* ,  s.detail.pub_apn ,  s.detail.city.toUpperCase() ,  county  */ ,  bidWords                    ,  bidCommas+".00" ,  s.detail.listedBy.toUpperCase() , /* m.agent.FirmName.toUpperCase() ,*/  depositCommas+".00" ,  priceBalCommas+".00" ,  bidCommas+".00" ,  s.sa.toUpperCase() ,  s.csz.toUpperCase()  ,  date                ,  s.sa.toUpperCase() ,  s.csz.toUpperCase()  ,  date                ,  s.sa.toUpperCase() ,  s.csz.toUpperCase()  ,  date                , s.detail.mlsNumber_1/*s.detail.mlsSource_2*/ ,  m.buyer.AddTerms.toUpperCase()                      ,  s.sa.toUpperCase() ,  s.csz.toUpperCase()  ,  date                ,  s.sa.toUpperCase() ,  s.csz.toUpperCase()  ,  date                ,  s.sa.toUpperCase() ,  s.csz.toUpperCase()  ,  date                ,  s.sa.toUpperCase() ,  s.csz.toUpperCase()  ,  date                ,  date                ,  date_rpa08de        ,  fullAddy                               ,  fullAddy                               ,  date                ,  date                ,  date_rpa08de+"__"   ,  date_rpa08de+"__"   ];
 // var arr = [ "150,000"  , "1234 Main St., Los Angeles, CA 92001" , "November 31, 2014" , "150,000"  , "5,000.00"    , "1,000,000" , "200,000"  , "15,000"       , "150,000"  , "September 12, 2014" , "Performance Capital, LLC"           , "5678 Main Street, San Diego 90013" , "236-490-16-00"   , "San Diego"                  , "San Diego" , "Two Hundred Fifty Thousand" , "250,000.00"     , "Coldwell Banker"                , /*"Alticore Realty"               ,*/ "7,500.00"           , "242,500.00"          , "250,000.00"     , "5678 Main Street"  , "San Diego, CA 90013" , "September 12, 2014" , "5678 Main Street"  , "San Diego, CA 90013" , "September 12, 2014" , "5678 Main Street"  , "San Diego, CA 90013" , "September 12, 2014" , "333123456"                                  , "Buyer is licensed broker making personal purchase." , "5678 Main Street"  , "San Diego, CA 90013" , "September 12, 2014" , "5678 Main Street"  , "San Diego, CA 90013" , "September 12, 2014" , "5678 Main Street"  , "San Diego, CA 90013" , "September 12, 2014" , "5678 Main Street"  , "San Diego, CA 90013" , "September 12, 2014" , "September 12, 2014" , "September 12, 2014" , "5678 Main Street, San Diego, CA 90013" , "5678 Main Street, San Diego, CA 90013" , "September 12, 2014" , "September 12, 2014" , "September 12, 2014" , "September 12, 2014" ];
    var img = [ [475,100,m.agent.MastheadUrl] , [665,910,m.buyer.POFurl] , [PAGE_WIDTH,Math.round(PAGE_WIDTH/1550*57/*Image dimensions*/),m.buyer.ca_rpa_01b] , [PAGE_WIDTH,Math.round(PAGE_WIDTH/2280*177/*Image dimensions*/),m.agent.ca_rpa_01g] , [PAGE_WIDTH,Math.round(PAGE_WIDTH/4970*225/*Image dimensions*/),m.agent.ca_footer] , [PAGE_WIDTH,Math.round(PAGE_WIDTH/1251*89),m.agent.ca_rpa_08a] , [PAGE_WIDTH,Math.round(PAGE_WIDTH/1382*135),m.buyer.ca_rpa_08b] , [PAGE_WIDTH,Math.round(PAGE_WIDTH/1252*595),m.agent.ca_rpa_08c] , [Math.round(PAGE_WIDTH/7.5/*8.5 inches page width minus (2 x 0.5 inch margins)*/*5.615/*Table column width in inches*/),Math.round((PAGE_WIDTH/7.5*5.615)/855*20),m.agent.ca_rpa_08d] , [PAGE_WIDTH,Math.round(PAGE_WIDTH/800*466),m.agent.ca_rpa_08f] , [PAGE_WIDTH,Math.round(PAGE_WIDTH/4970*225),m.agent.ca_footer] , [215,10,m.buyer.SignatureUrl] , [PAGE_WIDTH,Math.round(PAGE_WIDTH/2281*705),m.buyer.ca_bia_02b] , [Math.round(PAGE_WIDTH/7.5*5.802),Math.round((PAGE_WIDTH/7.5*5.802)/798*44),m.buyer.ca_ad_01b] , [PAGE_WIDTH,Math.round(PAGE_WIDTH/800*58),m.agent.ca_ad_01c] , [PAGE_WIDTH,Math.round(PAGE_WIDTH/800*46),m.agent.ca_ad_01d] , [PAGE_WIDTH,Math.round(PAGE_WIDTH/4970*225),m.agent.ca_footer] ];Logger.log(img);
    var par,i=0,j=0,searchResult=null,searchElement=doc.getActiveSection(),searchType=DocumentApp.ElementType.PARAGRAPH,h1=DocumentApp.ParagraphHeading.HEADING1,h2=DocumentApp.ParagraphHeading.HEADING2; // Define search parameters
    while(searchResult=searchElement.findElement(searchType,searchResult)){par=searchResult.getElement().asParagraph();/*Logger.log(par);*/if(par.getHeading()==h1){par.setText(arr[i++])}else if(par.getHeading()==h2){par.clear().insertInlineImage(0,UrlFetchApp.fetch(img[j][2]).getBlob()/*.getAs("image/png")*/).setWidth(img[j][0]).setHeight(img[j++][1])}}//.setFontFamily("Arial").setFontSize(9).setBold(true).setItalic(true).setFontColor("Blue"); // DriveApp.createFile(doc.getAs("application/pdf"));
    return doc./*getUrl*/getId()}//function testCall(){var db=ScriptDb.getMyDb(),s=db.query({source:{name:"ZipRealty"}}).next();Logger.log(/*LibraryjsUtil.*/constructOffer(s))}//function toCaseTitle (x    ){return LibraryjsUtil.toCaseTitle (x    )}//function queryArray  (x,y,z){return LibraryjsUtil.queryArray  (x,y,z)}//function ss2ao       (x,y  ){return LibraryjsUtil.ss2ao       (x,y  )}//function geoGoogle(x    ){return LibraryjsUtil.geoGoogle(x    )} // digits2words() is the first function in the copy/paste block to test in GAS
function setItemString    (ob){r.item=/*LibraryjsUtil.*/toBase62(Number(r.getId().slice(1)));db.save(r)} // Purpose: Sets item string as function of ID for object records with no item string
function setItemString_auto(q){var db=getMyDb();results=db.query(q);while(results.hasNext()){r=results.next();setItemString(r)}} // Purpose: Finds all objects matching given query and sets item string
// function cache2user()      // Store this function locally (i.e. in Account.gs file, not in a library); Current version is in htmlTemplate-Account-xx
// function user2cache(u,sec) // Store this function locally (i.e. in Account.gs file, not in a library); Current version is in htmlTemplate-Account-xx
function googleSite2docLinks(siteName){return { terms   : "https://docs.google.com/document/d/1A4ga5ATTLvD1xQxCiXkPH_sofvNwLxNL3yBbwK0herU/preview"
                                              , privacy : "https://docs.google.com/document/d/1mA16v3H1H-0GuMUY_gkwz1P-uyePlwETTE7Q1NglaaE/preview"}}
function googleSite2parseApp(key){var out = // Apps with GAS url only include: resprout, filmSwap
                  //    Google Site URL         dbParseKey App Name
                      { apextaxlien           : "apex"
					  , argentabpo            : "argenta"
					  , onlineartexchange     : "artExchange"
					  , captivapredictive     : "captiva"
					  , datenightmoviefinder  : "dateNight"
					  , ddpmgt                : "dealDigger"
					  , dealdiggeronline1     : "dealDigger"
					  , dealdiggeronline2     : "dealDigger"
					  , dealdiggeronline3     : "dealDigger"
					  , giftbooktranscendence : "giftBook"
					  , leadbankweb           : "leadBank"
					  , moviesnearme          : "dateNight"
			      //  ,                       : "leaseExchange"
					  , marketmakerlive       : "marketMaker"
					  , mojocreditproject     : "mojo"
					  , onlinenoteexchange    : "noteExchange"
					  , onlinefilmswap        : "filmSwap"
					  , publicdatabase1       : "publicDb"
					  , sofastratcalc         : "promenade"
					  , gosalespro            : "salespro"
					  , taxlienexchange       : "taxLienExchange"
					  };return out[key]}
/* Deprecated. 11/17/2014 function xdbParse(verb,project,className,obid,ob) {verb=verb.toLowerCase(); // @return{ob}:{objectId:"CE05GdsyLR",createdAt:"2014-07-16T06:45:19.526Z"} // Execute object store transaction // Reference: https://www.parse.com/docs/rest#general-quick //function parseCreate(className,ob,id,key){className=className||"x",ob=ob||{"j":"5","o":"n"};id=id||"ogiIfGbYrBMDH5ny026E1pcv7lgX7aKCQLc159Za";key=key||"R2iwuHBCnocMzWmpDIY5RKznWBRjmnlfIqy94T45";//,timestamp:new Date().toString()};//var HEAD={"X-Parse-Application-Id":id,"X-Parse-REST-API-Key":key},ACT="https://api.parse.com/1/classes/"+className;//return JSON.parse(UrlFetchApp.fetch(ACT,{payload:JSON.stringify(ob),method:"post",headers:HEAD,contentType:"application/json",muteHttpExceptions:true}).getContentText())}//;Logger.log(response)}/
    // https://api.parse.com/1/classes/referral/?where={"efolks":{"$inQuery":{"where":{"confirmation_code":"2061f7e"}}}}
    // function test(){return /*LibraryjsUtil.* /dbParse("put","mojo","invitation","9exbfdTVwt",{"uid":"0","phone":"(812) 354-3432","status":"","email":"","name":"john dancer","company":"Main Street Motors Inc","timeZone":"","notes":"","dateFollowup":""})}
    // function test(){Logger.log(UrlFetchApp.fetch("https://api.parse.com/1/classes/referral/?where%3D%7B%22efolks%22%3A%7B%22%24inQuery%22%3A%7B%22where%22%3A%7B%22confirmation_code%22%3A%222061f7e%22%7D%7D%7D%7D",{headers:{"X-Parse-Application-Id":"ogiIfGbYrBMDH5ny026E1pcv7lgX7aKCQLc159Za","X-Parse-REST-API-Key":"R2iwuHBCnocMzWmpDIY5RKznWBRjmnlfIqy94T45"},muteHttpExceptions:true,method:"get",contentType:"application/json"}).getContentText())}
	// UrlFetchApp.fetch([https://api.parse.com/1/classes/referral/?where%3D%7B%22efolks%22%3A%7B%22%24inQuery%22%3A%7B%22where%22%3A%7B%22confirmation_code%22%3A%222061f7e%22%7D%7D%7D%7D, {headers={X-Parse-Application-Id=ogiIfGbYrBMDH5ny026E1pcv7lgX7aKCQLc159Za, X-Parse-REST-API-Key=R2iwuHBCnocMzWmpDIY5RKznWBRjmnlfIqy94T45}, muteHttpExceptions=true, method=get, contentType=application/json}])
    // where={"subscriptions":{"$inQuery":{"where":{"specialId":"e9289xc9"},"className":"Subscription"}}} // Reference: http://stackoverflow.com/questions/17066961/on-parse-com-how-can-i-query-for-user-by-child-object-fields
    // Sample query: u=LibraryjsUtil.dbParse("get","alpha","referral",{cZip:"01239","yEmail":user}).results[0]
    // URL                                Verb   Functionality         Tested Call Example // Return // Batches reference: https://www.parse.com/docs/rest#objects-batch
    // ---------------------------------- ------ --------------------- ------ ----------------------------------------------------------------------------------------------------------------
	// /1/classes/<className>	          POST   Creating objects      X      LibraryjsUtil.dbParse("post"  ,"apex","user"    ,ob                 )
    // /1/classes/<className>/<objectId>  GET    Retrieving objects    X      LibraryjsUtil.dbParse("get"   ,"apex","user"    ,{email:ob.email}   ).results[0] or LibraryjsUtil.dbParse("get","apex","user") returns entire class as array
    // /1/classes/<className>/<objectId>  PUT    Updating objects      X      LibraryjsUtil.dbParse("put"   ,"mojo","referral",saved.objectId  ,ob)
	// (Uses internal conditional)        UPDATE Update conditionally         LibraryjsUtil.dbParse("update","apex","user"    ,"email"         ,ob)
	// /1/classes/<className>             GET    Queries
    // /1/classes/<className>/<objectId>  DELETE Deleting objects      X
	//                                    COUNT  (Remember to call .count property of result) Counts objects returned: @params{"count","alpha","market",{"url":"http://example.com"},0/*Limit count of returned objects* /} // Call Example 1: LibraryjsUtil.dbParse("count","alpha","referral",{"yNameLast":"Dean"}).count // Call Example 2: function test(){Logger.log(LibraryjsUtil.dbParse("count","mojo","lead",{"status":{"$exists":false}}).count)}
    // @param{str}      verb range:"post","get","put","delete" Http verb / transaction type
    // @param{str}      obid | used for PUT requests, when need an updating object (ob) and an obid to identify which object to update
    // @param{obj||str} ob||"objectId" | (optional) JSON object or "objectId" if GET (single object), PUT or DELETE
    var AUTH=dbParseKeys(),x,q={},r,results,params="",head={"X-Parse-Application-Id":AUTH[project]["id"],/*"X-Parse-REST-API-Key"* /"X-Parse-Master-Key":AUTH[project]["key"]},act="https://api.parse.com/1/classes/"+className+"/?",opt={method:verb,headers:head,contentType:"application/json",muteHttpExceptions:true}
      ; if(verb=="update"){q[/*myKey* /obid]=/*myOb* /ob[/*myKey* /obid]; // function dbParse(myApp,myClass,myKey,myOb){var results,r,q={};q[myKey]=myOb[myKey]; // function test(){Logger.log(JSON.stringify(dbParse("apex","user","email",{email:"atlaslive@gmail.com",yieldMin:"2.25"})))}
            results=/*LibraryjsUtil.* /dbParse("get" ,/*myApp* /project,/*myClass* /className,q                    ).results;r=results.length?results[0]:false;
            if(r){  /*LibraryjsUtil.* /dbParse("put" ,/*myApp* /project,/*myClass* /className,r.objectId,/*myOb* /ob);return ("Updated: "+JSON.stringify(r)+" to: "+JSON.stringify(myOb))}
            else {  /*LibraryjsUtil.* /dbParse("post",/*myApp* /project,/*myClass* /className,           /*myOb* /ob);return ("Created: "                          +JSON.stringify(myOb))}}
	    if(verb=="count"){var limit=ob||0;verb="get";opt.method=verb;params+="&count=1&limit="+limit}
	    if(typeof obid=="string"){act=act.slice(0,-1)+obid}if(verb!="get"&&typeof obid=="object"){opt.payload=JSON.stringify(obid)}
		if(verb=="get"){act+=params}if(typeof obid=="object"){act+="&where="+encodeURIComponent(JSON.stringify(obid))}//for(x in obid){if(typeof obid[x]=="object"){obid[x]={"$select":obid[x]}}//"$inQuery":{"where":obid[x]}/*{{,"className":className* /}}//["__type"]="Pointer"}}
		if(typeof ob=="object"){opt.payload=JSON.stringify(ob)}//Logger.log(act);Logger.log(opt);Logger.log(params);
    return JSON.parse(UrlFetchApp.fetch(act,opt).getContentText())}//;Logger.log(response)}//function test(){Logger.log(//dbParse("post","alpha","x",{"j":"5","o":"n"})//dbParse("delete","alpha","x","hBLz9KVwPo")//dbParse("put","alpha","x","KMGGh6evzo",{j:"uvw"})//dbParse("get","alpha","x","KMGGh6evzo")//dbParse("get","alpha","x"))}//function test1(){Logger.log(/*LibraryjsUtil.* /dbParse("count","alpha","referral",{"yNameLast":"Dean"}).count)}//function test2(){Logger.log(UrlFetchApp.fetch("https://api.parse.com/1/classes/referral/?&count=1&limit=0",{headers:{"X-Parse-Application-Id":"ogiIfGbYrBMDH5ny026E1pcv7lgX7aKCQLc159Za","X-Parse-Master-Key":"6MUAiEeT6Gft5vpyQkg86CspisoiW8uSdwZEz5BA"}}).getContentText())}//function test3(){Logger.log(UrlFetchApp.fetch("https://api.parse.com/1/classes/referral/?%26count%3D1%26limit%3D0",{headers:{"X-Parse-Application-Id":"ogiIfGbYrBMDH5ny026E1pcv7lgX7aKCQLc159Za","X-Parse-Master-Key":"6MUAiEeT6Gft5vpyQkg86CspisoiW8uSdwZEz5BA"}}).getContentText())}//function test4(){Logger.log(UrlFetchApp.fetch("https://api.parse.com/1/classes/referral/?&count=1&limit=0&where={'yNameLast':'Dean'}",{headers:{"X-Parse-Application-Id":"ogiIfGbYrBMDH5ny026E1pcv7lgX7aKCQLc159Za","X-Parse-Master-Key":"6MUAiEeT6Gft5vpyQkg86CspisoiW8uSdwZEz5BA"}}).getContentText())}//function test5(){Logger.log(UrlFetchApp.fetch("https://api.parse.com/1/classes/referral/?&count=1&limit=0&where=%7B%22yNameLast%22%3A%22Dean%22%7D",{headers:{"X-Parse-Application-Id":"ogiIfGbYrBMDH5ny026E1pcv7lgX7aKCQLc159Za","X-Parse-Master-Key":"6MUAiEeT6Gft5vpyQkg86CspisoiW8uSdwZEz5BA"}}).getContentText())}
*/
/* Deprecated. 12/26/2014 function xdbParse(r){ // Remember to call .result at original function call e.g., var arr=dbParse(r).result // Must replace xdbParse()
	r.verb=r.verb.toLowerCase();if(r.limit!=0){r.limit=r.limit||1000/*100 is default* /}
	// ---------------------------------- ------ --------------------- ------ ----------------------------------------------------------------------------------------------------------------
    // @return{object} {"createdAt":"2014-12-13T09:19:55.779Z","email":"atlaslive@gmail.com","emailVerified":true,"objectId":"oNweYCKVG3","sessionToken":"SCAEaM99PJTc9qbd1BWUSXkp2","updatedAt":"2014-12-13T09:20:34.756Z","username":"cooldude6"}
 // Main parameters
	//                 * Required field
	// @param{string } * verb         : GET || POST || PUT || UPDATE || DELETE || COUNT || RESET // Converts .toLowerCase() // e.g., {verb:"post"} Available options: get(signin)|post(signup)|put|delete|update(invokes internal conditional. for sure replace, use "put")|count|reset(resets password)|
	// @param{string } * project      : Name of project
    // @param{string } * className    : Class
	// @param{object }   ob           : object to PUT or POST // Used when verb:"post"||"put"||"update", new object to persist
	// @param{string }   obid         : objectId field inside Parse database; automatically generated // Used when className:"user" or to return a specific object
    // @param{object }   query        : Query object for GET or COUNT
	// @param{string }   sortBy       : Field to order results by; add "-" to go in descending order (e.g., {sortBy:"-yield"}); can include a comma separated list (e.g., {sortBy:"score,-name"}) // e.g., {sortBy:"-createdAt"} Field to sort results by; can add optional negative sign ("-") to sort in reverse order.
	// @param{integer}   limit        : Limits response count, max is 1000; Parse.com default is 100; internally to this function, we default to 1000 // Parse default: 100; min: 0; max: 1000; Our default: 1000; number of results to limit the response to include; in the case where "&count=1" (i.e, a count is requsted), if "&limit=0", then the response will not include any objects, only the count result, an integer.
	// @param{integer}   skip         : Used for paging // You can use the limit and skip parameters for pagination. limit defaults to 100, but anything from 1 to 1000 is a valid limit. Thus, to retrieve 200 objects after skipping the first 400: {limit:200,skip:400}
	// @param{string }   sessionToken : Used when className="user"
/*  function test(){
 // var r={verb:"get"   ,project:"taxLienExchange",className:"order",obid:"MXxS49wOE2"}                                                           // OK
 // var r={verb:"get"   ,project:"taxLienExchange",className:"order",query:{email:null}}                                                          // OK
 // var r={verb:"get"   ,project:"taxLienExchange",className:"order"}                                                                             // OK
 // var r={verb:"get"   ,project:"taxLienExchange",className:"order",sortBy:"-yield"}                                                             // OK
 // var r={verb:"get"   ,project:"taxLienExchange",className:"order",obid:"w5pXXJSDM1"}                                                           // OK
 // var r={verb:"post"  ,project:"taxLienExchange",className:"order",ob:{yield:1.97}}                                                             // OK
 // var r={verb:"post"  ,project:"taxLienExchange",className:"order",ob:{email:"xyz"}}                                                            // OK
 // var r={verb:"update",project:"taxLienExchange",className:"order",ob:{email:"zzz"},query:{email:null}}                                         // OK | Locally created; i.e., not included in parse.com API | by design this function won't update a query response batch; update only works using an obid for a single record
 // var r={verb:"update",project:"taxLienExchange",className:"order",ob:{email:"www",yield:5.5},obid:"w5pXXJSDM1"}                                // OK
 // var r={verb:"count" ,project:"taxLienExchange",className:"order",query:{email:null},limit:0}                                                  // OK
 // var r=LibraryjsUtil.dbParse({verb:"count",project:LibraryjsUtil.googleSite2parseApp(SitesApp.getActiveSite().getName()),className:"invite",query:{email:ob.email}});if( r.count){return {error:"Email already exists: "+JSON.stringify(r.results[0])}} // OK | @return {results:[array],count:integer}
 // var r=LibraryjsUtil.dbParse({verb:"count",project:pname,className:"invite",query:{email:ob.email}});if(!r.count){return {error:"That email is not on our guest list.\nPlease enter email where we first contacted you"}};
 // var r={verb:"RESET" ,project:"taxLienExchange",className:"User",ob:{email:"atlaslive@gmail.com"}}                                             // OK Resets password @return{void}
 // var r={verb:"post"  ,project:"taxLienExchange",className:"User",ob:{username:"cooldude6",password:"p_n7!-e8",email:"atlaslive@gmail.com"}}    // OK SignUp
 // var r={verb:"get"   ,project:"taxLienExchange",className:"User",ob:{username:"cooldude6",password:"p_n7!-e8"}}                                // OK SignIn
 // var r={verb:"get",project:"taxLienExchange",className:"User",sessionToken:"SCAEaM99PJTc9qbd1BWUSXkp2"}                                        //    Retrieve user via sessionToken
 // var r={verb:"get",project:"taxLienExchange",className:"user",obid:"oNweYCKVG3"}                                                               // OK Retrieve user via objectId
 // Obsolete (former version): <?var S="Please sign in",user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():"disabled",u=LibraryjsUtil.dbParse({verb:"get",project:"taxLienExchange",className:"user",obid:"oNweYCKVG3",sortBy:"-createdAt"}).results[0]||{name:S,phone:S,company:S}?>
 return Logger.log(JSON.stringify(LibraryjsUtil.dbParse(r)))}
 * / // URL                                Verb   Functionality         Notes // Batches reference: https://www.parse.com/docs/rest#objects-batch
	// ---------------------------------- ------ --------------------- ------ ----------------------------------------------------------------------------------------------------------------
	// /1/classes/<className>	          POST   Creating objects      SignUp new user if className.search(/(user|users)/i)
	// /1/classes/<className>/<objectId>  GET    Retrieving objects    SienIn     user if className.search(/(user|users)/i)
	// /1/classes/<className>/<objectId>  PUT    Updating objects
	// (Uses internal conditional)        UPDATE Update or Create
	// /1/classes/<className>             GET    Fetch queries
	// /1/classes/<className>/<objectId>  DELETE Deleting objects
    //                                    ------                       Special (non HTTP) verbs start below
	//                                    COUNT  (Remember to call .count property of result) Counts objects returned: @params{"count","alpha","market",{"url":"http://example.com"},0/*Limit count of returned objects* /} // Call Example 1: LibraryjsUtil.dbParse("count","alpha","referral",{"yNameLast":"Dean"}).count // Call Example 2: function test(){Logger.log(LibraryjsUtil.dbParse("count","mojo","lead",{"status":{"$exists":false}}).count)}
    //                                    RESET  Resets password       Requires ob.email
	//                                    SIGNUP
	//                                    SIGNIN
	//                                    RETRIEVE Retrieve user using sessionToken
	//                                    RETRIEVE Retrieve user using user objectId
 /* var head={},opt,root;
	if(/^(user|users)$/i.test(r.className)){switch(r.verb){ // If a form of "user" is requested //function test(){Logger.log(!("USeRx".search(/^(user|users)$/i)))}
	       case "post"  :                          root="users/?" // SignUp // function test(){Logger.log(LibraryjsUtil.dbParse({verb:"post",project:"taxLienExchange",className:"User",ob:{username:"cooldude6",password:"p_n7!-e8",email:"atlaslive@gmail.com"}}))}
   ;break; case "get"   :     if(r.sessionToken  ){root="users/me/?";head["X-Parse-Session-Token"]=r.sessionToken} // Retrieve user via sessionToken (not working) // function test(){Logger.log(LibraryjsUtil.dbParse({verb:"get",project:"taxLienExchange",className:"User",sessionToken:"SCAEaM99PJTc9qbd1BWUSXkp2"}))}
	                     else if(r.obid          ){root="users/"+r.obid+"/?"} // Retrieve user via objectId // function test(){Logger.log(LibraryjsUtil.dbParse({verb:"get",project:"taxLienExchange",className:"User",obid:"oNweYCKVG3"}))}
	                     else                     {root="login/?username="+encodeURIComponent(r.ob.username)+"&password="+encodeURIComponent(r.ob.password)} // SignIn // function test(){Logger.log(LibraryjsUtil.dbParse({verb:"get" ,project:"taxLienExchange",className:"User",ob:{username:"cooldude6",password:"p_n7!-e8"}}))}
	                                                                         delete r.limit;delete r.ob
   ;break; case "put"   :                          root="users/"+r.obid+"/?";delete r.limit;delete r.ob.obid;delete r.obid;
   ;break; case "reset" :                          root="requestPasswordReset/?";r.verb="post" // Reset // function test(){Logger.log(LibraryjsUtil.dbParse({verb:"RESET",project:"taxLienExchange",className:"User",ob:{email:"atlaslive@gmail.com"}}))}
   ;break; default      : break}
   }else                                          {root="classes/"+r.className+"/?"}
	var AUTH=LibraryjsUtil.dbParseKeys(),x,s,results,act="https://api.parse.com/1/"+root
      ; head["X-Parse-Application-Id"]=AUTH[r.project]["id"];head[/*"X-Parse-REST-API-Key"* /"X-Parse-Master-Key"]=AUTH[r.project]["key"]
	  ; opt={method:r.verb,headers:head,contentType:"application/json",muteHttpExceptions:true}
	  ; if(r.verb=="update"){r.verb="get" ;try{s=dbParse(r)}catch(e){s=false;Logger.log("Error VWnVn: "+e.message)}
                       if(s){r.verb="put" ;      dbParse(r);return ("Updated: "+JSON.stringify(s)+" to: "+JSON.stringify(r.ob))}
                       else {r.verb="post";      dbParse(r);return ("Created: "                          +JSON.stringify(r.ob))}}
        if(r.obid         ){act=act.slice(0,-1)+r.obid+"?";if(r.verb=="get"){return JSON.parse(UrlFetchApp.fetch(act,opt).getContentText())}}
	    if(r.ob           ){opt.payload=JSON.stringify(r.ob)}
        if(r.verb=="count"){act+="&count=1";opt.method="get";       r.limit = r.limit||0 }
        if(r.limit        ){act+="&limit="+                                   r.limit    } // Keep this line after "count" line
	    if(r.skip         ){act+="&skip=" +                                   r.skip     }
        if(r.sortBy       ){act+="&order="+                                   r.sortBy   }
		if(r.query        ){act+="&where="+encodeURIComponent(JSON.stringify( r.query  ))}
	x=JSON.parse(UrlFetchApp.fetch(act,opt).getContentText());if(r.verb!="count"){return x/*.results* /}else{return(r.limit===0)?x.count:x}}*/
/* Deprecated. 12/26/2014 function xdbParseBatch(verb,project,className,arr){ // Reference: https://www.parse.com/docs/rest // Uploads up to 50 records per batch per API call.
    var mode=(typeof verb=="string")?"same":"diff";if(mode=="diff"){var arr=verb} // Enables @param{} to handle either an array of objects (with different verbs and classes -mode:"diff") or use the stated specified parameter set -mode:"same"
 // Mode: "same" // dbParseBatch(verb,project,className,arr)  // Sample Call   //
 				                                              // Test Function // function test(){Logger.log(LibraryjsUtil.dbParseBatch("post","alpha","scores",/*arr))}//* /[{score:"1337",playerName:"Sean Plott"},{score:"1338",playerName:"ZeroCool"}]))}
 // Mode: "diff" // dbParseBatch(arr ,project              )  // Sample Call   // dbParseBatch([{method:"post",path:"User",body:{username:ob.username}},{method:"put" ,path:"invite/"+r.results[0].objectId,body:{signup:true}}],pname)
                                                              // Sample Return // [[{success:{updatedAt:2014-12-26T09:57:05.490Z}},{success:{objectId:PZdE3zA4vk,createdAt=2014-12-26T09:57:05.492Z}}]]
				                                              // Test Function // function test(){Logger.log(dbParseBatch([{method:"post",path:"User",body:{username:"cooldude95"}},{method:"put" ,path:"invite/MghCKdYDMC",body:{signup:true}}],"dealDigger"))}
/* Sample Code | test
function test(){var ob={requests:[{method:"POST",path:"/1/classes/GameScore",body:{score:"1337",playerName:"Sean Plott"}}
                                 ,{method:"POST",path:"/1/classes/GameScore",body:{score:"1338",playerName:"ZeroCool"  }}]}
    ,resp=UrlFetchApp.fetch("https://api.parse.com/1/batch",{headers:{"X-Parse-Application-Id":"ogiIfGbYrBMDH5ny026E1pcv7lgX7aKCQLc159Za"
                                                                     ,"X-Parse-Master-Key"    :"6MUAiEeT6Gft5vpyQkg86CspisoiW8uSdwZEz5BA"}
                                                            ,method:"post",payload:JSON.stringify(ob),contentType:"application/json"})//,muteHttpExceptions:true})
    ;Logger.log(resp.getContentText())}//dbParseBatch())} * /
/* Sample Code | cURL
curl -X POST \
  -H "X-Parse-Application-Id: ogiIfGbYrBMDH5ny026E1pcv7lgX7aKCQLc159Za" \
  -H "X-Parse-REST-API-Key: R2iwuHBCnocMzWmpDIY5RKznWBRjmnlfIqy94T45" \
  -H "Content-Type: application/json" \
  -d '{
        "requests": [
          {
            "method": "POST",
            "path": "/1/classes/GameScore",
            "body": {
              "score": 1337,
              "playerName": "Sean Plott"
            }
          },
          {
            "method": "POST",
            "path": "/1/classes/GameScore",
            "body": {
              "score": 1338,
              "playerName": "ZeroCool"
            }
          }
        ]
      }' \
  https://api.parse.com/1/batch  * /
    var LIMIT=50,ACT="https://api.parse.com/1/batch",x,params="",k=LibraryjsUtil.dbParseKeys(),head={"X-Parse-Application-Id":k[project]["id"],/*"X-Parse-REST-API-Key"* /"X-Parse-Master-Key":k[project]["key"]},opt={method:/*verb* /"post",headers:head,contentType:"application/json",muteHttpExceptions:true}
    out=[],r=LibraryjsUtil.subdivideArray(arr,LIMIT),j=r.length;while(j--){var ar=[],i=/*arr* /r[j].length;while(i--){
	    if(mode=="same"){ar.push({method:verb.toUpperCase(),path:("/1/classes/"+className),body:/*arr* / r[j][i]})}
	    else            {r[j][i]["method"]=r[j][i]["method"].toUpperCase();r[j][i]["path"]="/1/classes/"+r[j][i]["path"];ar.push(r[j][i])}
	}opt.payload=JSON.stringify({requests:ar});out.push(JSON.parse(UrlFetchApp.fetch(ACT,opt).getContentText()))}return out}*/
function _fbConfig(){ //        ID                    Secret
	                 return { "radiant-heat-5197" : "aSTFfsEjDq3GLtBP8rKqKtDqadooRvEkDP6zSaLr" }
} // Reference: https://www.firebase.com/docs/rest/guide/retrieving-data.html // Firebase: https://docs-examples.firebaseio.com/rest/saving-data.json
function _write2fb(ob){ob.auth=_fbConfig()[ob.fbid];return _write2fb_exec(ob)} // Call this function // Params defined below in _exec version
function _write2fb_exec(ob){ // Writes to Firebase // Demo: function _dex_getCategoryDetails2fb(cat,data,fb){fb=fb||"torrid-heat-2303";LibraryjsUtil._write2fb(fb,("dex/categories/"+cat),"put",data)}
  // @param {string} ob.fbid Unique portion of Firebase URL  (e.g. "torrid-heat-2303")
  // @param {string} ob.path Nodes to posted data            (e.g., "manager/name"
  // @param {string} ob.verb Http request type               (e.g., "get", "post", "patch", "put", etc.) // "patch" will NOT create unique __key__ for record; "post" WILL create unique __key__ for record;
  // @param {object} ob.data Object, string or value to post (e.g., {"first":"foo","last":"bar"})
  // @param {string} ob.auth (optional) Firebase app secret  (e.g., "qGNlYyjUqTUgCVItskwuwAKXNxXnd4t6c3VXDSf0") // 40 chars; Firebase > Dashboard > Secrets // Reference: http://stackoverflow.com/q/34876641/1640892
  // @return(object) Firebase object stored at the target location
  // https://radiant-heat-5197.firebaseio.com/test/imacros.json?auth=aSTFfsEjDq3GLtBP8rKqKtDqadooRvEkDP6zSaLr
  var r,act="https://"+ob.fbid+".firebaseio.com/"+ob.path+".json"+(ob.auth?"?auth="+ob.auth:"");
  if(ob.verb==="get"||(!ob.verb&&!ob.data)){r=UrlFetchApp.fetch(act                                                     )}
  else                                     {r=UrlFetchApp.fetch(act,{"method":ob.verb,"payload":JSON.stringify(ob.data)})}
  return r}//function test(){var ob={fbid:"radiant-heat-5197",path:"test",verb:"patch",data:{foo:"bar"}};Logger.log(/** /LibraryjsUtil./**/_write2fb(ob));}
function dbParseKeys(){// Other API Keys                          Application        Reference URLs
                       // AIzaSyCl7w44mqIblzQ8MsZBL45nw297QDrwKU0 Static Maps API V2 https://developers.google.com/maps/documentation/staticmaps/#api_key https://code.google.com/apis/console/?noredirect&pli=1#project:640214129080:access
                        var out =     //  Application ID                                Master Key                                      // Reference: https://www.parse.com/docs/rest#security // For unlimited public updating, use X-Parse-Master-Key, not X-Parse-REST-API-Key
	                  { alpha           :{id:"ogiIfGbYrBMDH5ny026E1pcv7lgX7aKCQLc159Za",key:"6MUAiEeT6Gft5vpyQkg86CspisoiW8uSdwZEz5BA"} // "R2iwuHBCnocMzWmpDIY5RKznWBRjmnlfIqy94T45"}
                      , apex            :{id:"MXSo07v2C8aPDqHAz14iJR6nNUsJqdMyju3jZcBq",key:"S0T7XrWbNZQcomQe3pRUs8ihygDgjyinm0xcPrDV"}
                      , argenta         :{id:"vfs6TQKVrCKPv8OMIasZQxJ0xQZB5mfgZjFuVr4Y",key:"7DCXYe4CWzQxY9VZ1I7ReRirYGJNtyrgMB46NOCm"} // https://script.google.com/macros/s/AKfycbzoGUnMKwwbb-xKkjnla4y1Z4TrGmF-Q_trr-OXLq1NpbhLM59J/exec?k=5te6hnakpc9yjfdfbhy3&m=ynytzd6rjgg6pod2xpou | m sets showgate=true; shows AVM source names
					  , artExchange     :{id:"pvQjwa1xnC6q0wSdZRbJibVgGwPAEqDHZOiOy2to",key:"WfcwR62xMtvmwNucyFKw6uOf9aaLQPh3AWDWu5dp"}
				//	  , atlasXlab       :{id:""                                        ,key:""                                        } // https://script.google.com/macros/s/AKfycbywTjbeJyV5aHX_q_iMtOMChqhWyWWK2fkbsjuIQX0AxGu1Inc/exec?k=yma7h4455hlcpinom5cv
                      , captiva         :{id:"Mw9IVMdPmHvlWZAqGwLXpXS9Cam4uaa7xT7m82pg",key:"JqYwCZMTB2m9DdxIuOGAo34l7ZqdhPRmIOZmJNtT"}
                      , dateNight       :{id:"ETKbm6soNhmzo00hJvzBoCicnqFXXFu8rFYHlKfN",key:"oGF1jsdXqJO11GHcIb8cEyEt7T5kghEZVaVxSO0s"} // https://script.google.com/macros/s/AKfycbwlkeAjSW0xcvSwZNtftJqzsbDRAnufIghPvsA_rqL8BkohEE0/exec?k=gc8i31dz7ex5489472lm | //goo.gl/7izKbm
                      , dealDigger      :{id:"Uxgfakt1rLNGmV1gHk5R6fA6MjAeCkWTOHQ06ZQ2",key:"FbBbzZRVty4ilJfAVvYI5h0Wy32ptO40f9kHCuim"}
                      , filmSwap        :{id:"Op2KvTp50Fh82k1f2zQLb3DPHlOH3PBLOar5Cwlq",key:"bjD9xhSPsuMlptVQlk9L7DiqIoKDQvi07LeUegwZ"} // https://script.google.com/macros/s/AKfycby6VLDr3BVAl2vfNFykwoCScAuKFX0_cOqmHzciRUR62OixQCk/exec?k=5ydig15fw4m0c9pkbvr0&m=3q31rrxyno964h29j9tp | m sets user value
					  , giftBook        :{id:"PPUs0ahv2bHyUHjs05ZxlLvOvCZ4AzTXdoyqLIpW",key:"ZlYDjZB8npwMYIYTl1U5t1Dxwnqee7fdrYhJzOAW"}
                      , leadBank        :{id:"ANyPmXFVN8b0Zxhx6mu2Jjkz49RbPa2T32wdFWj1",key:"soLVxp4IL0rx63krKVaXnW8MO74izpqLpNDFflBk"}
                      , leaseExchange   :{id:"pd4IYLJ7rmDyCu1HPuwQ16i1Ae1dqXq8U3eaXqOh",key:"wlqGCWkRb9FBoFZ0J1fiKMmdtegTWM90fwYHRRgJ"}
                      , marketMaker     :{id:"BYCmIO4YoUoAuYTNU3fMnTOGzgqEMi94WGHuUE0t",key:"4D92K3vU02h53rU60FXCrkZ7Ozlj8mA3i1AkjWGn"}
                      , mojo            :{id:"KauOe2wGWk7MuLzGWWe8Xk6PQzKaWWKo1hII8COW",key:"vQzB7cg8oJzkgfNTVs9S4ZUmpd7rX60nIdoDhhkN"}
                      , noteExchange    :{id:"hX0c8jAOOdCY3hPpzxLYnrfbOPDpE8tlkQmCgyP4",key:"Tgu3GQor9ZX6FOrOPMrp5wBSCZHJHY94Vx4yojvZ"} // home02.html: https://script.google.com/macros/s/AKfycbwT66_MExluhggRGS48QQikDxTzElT7F1WWRImBHoKDqEjFdIs/exec?k=0jpro38spweggiwhpi1i | home01.html: https://script.google.com/macros/s/AKfycbwT66_MExluhggRGS48QQikDxTzElT7F1WWRImBHoKDqEjFdIs/exec?k=az93farft7sr1fmyuode | home.html: https://script.google.com/macros/s/AKfycbwT66_MExluhggRGS48QQikDxTzElT7F1WWRImBHoKDqEjFdIs/exec?k=gzsx7a8yf28gwor8plvr&m=80qkdrihk6qws2b6nzbk
                      , promenade       :{id:"JFx8JYC11BwcmtRF9OJC4yPb31O9DE7EZWDH2ega",key:"ZvZRgWUKNMLM6U30SpTRdwsKIxDzajEnE0nugEKh"}
                      , resprout        :{id:"8pXWajQX9ed2zeBoOtZOFbGJKzzw1ZfZz2vCkSCE",key:"C5oqYS3rZq5WBWyyUmHUL8Cgo59rvFczOVnKqVzY"} // https://script.google.com/macros/s/AKfycbxSuMqms70XslFJkP3NVBoEYMz2IwxzMhUq6uzYZSUIUiim2ZM/exec?k=g4gt2rzwt3kx9evdtrm8
                      , publicDb        :{id:"fIOElFHxHpn07XADvyhN2POy3Rj631Uzh8AQgBjt",key:"S8Z0dUNJxo50x7rPCi9ucqvh0qSfxzN42EHaxA6Q"}
                //    , salespro        :{id:""                                        ,key:""                                        }
                      , taxLienExchange :{id:"hRaKIHUhTAzDi7kcROmqzf16bPIFWi8AHvYuBNKU",key:"goWM5RRqhgvZkSC4c9shg74QFy0QAHt2vXJhZ5e7"}
                      };return out}
function dbParseConstruct(r){r.verb=r.verb.toLowerCase();if(r.limit!=0){r.limit=r.limit||1000/*100 is default*/};if((r.verb=="get"||r.verb=="count")&&(r.ob&&!r.query)){r.query=r.ob;delete r.ob} // Assumed: r.ob was used mistakenly instead of r.query
	// ---------------------------------- ------ --------------------- ------ ----------------------------------------------------------------------------------------------------------------
    // @return{object} {"createdAt":"2014-12-13T09:19:55.779Z","email":"atlaslive@gmail.com","emailVerified":true,"objectId":"oNweYCKVG3","sessionToken":"SCAEaM99PJTc9qbd1BWUSXkp2","updatedAt":"2014-12-13T09:20:34.756Z","username":"cooldude6"}
 // Main parameters
	//                 * Required field
	// @param{string } * verb         : GET || POST || PUT || UPDATE || DELETE || COUNT || RESET // Converts .toLowerCase() // e.g., {verb:"post"} Available options: get(signin)|post(signup)|put|delete|update(invokes internal conditional. for sure replace, use "put")|count|reset(resets password)|
	// @param{string } * project      : Name of project
    // @param{string } * className    : Class
	// @param{object }   ob           : object to PUT or POST // Used when verb:"post"||"put"||"update", new object to persist // Formerly, if mistakenly used in call, would effectively transmorph GET to POST. But corrective conditional in top line of code corrects by changing r.ob to r.query
	// @param{string }   obid         : objectId field inside Parse database; automatically generated // Used when className:"user" or to return a specific object
    // @param{object }   query        : Query object for GET or COUNT
	// @param{string }   sortBy       : Field to order results by; add "-" to go in descending order (e.g., {sortBy:"-yield"}); can include a comma separated list (e.g., {sortBy:"score,-name"}) // e.g., {sortBy:"-createdAt"} Field to sort results by; can add optional negative sign ("-") to sort in reverse order.
	// @param{integer}   limit        : Limits response count, max is 1000; Parse.com default is 100; internally to this function, we default to 1000 // Parse default: 100; min: 0; max: 1000; Our default: 1000; number of results to limit the response to include; in the case where "&count=1" (i.e, a count is requsted), if "&limit=0", then the response will not include any objects, only the count result, an integer.
	// @param{integer}   skip         : Used for paging // You can use the limit and skip parameters for pagination. limit defaults to 100, but anything from 1 to 1000 is a valid limit. Thus, to retrieve 200 objects after skipping the first 400: {limit:200,skip:400}
	// @param{string }   sessionToken : Used when className="user"
/*  function test(){
 // var r={verb:"get"   ,project:"taxLienExchange",className:"order",obid:"MXxS49wOE2"}                                                           // OK
 // var r={verb:"get"   ,project:"taxLienExchange",className:"order",query:{email:null}}                                                          // OK
 // var r={verb:"get"   ,project:"taxLienExchange",className:"order"}                                                                             // OK
 // var r={verb:"get"   ,project:"taxLienExchange",className:"order",sortBy:"-yield"}                                                             // OK
 // var r={verb:"get"   ,project:"taxLienExchange",className:"order",obid:"w5pXXJSDM1"}                                                           // OK
 // var r={verb:"post"  ,project:"taxLienExchange",className:"order",ob:{yield:1.97}}                                                             // OK
 // var r={verb:"post"  ,project:"taxLienExchange",className:"order",ob:{email:"xyz"}}                                                            // OK
 // var r={verb:"update",project:"taxLienExchange",className:"order",ob:{email:"zzz"},query:{email:null}}                                         // OK | by design this function won't update a query response batch; update only works using an obid for a single record
 // var r={verb:"update",project:"taxLienExchange",className:"order",ob:{email:"www",yield:5.5},obid:"w5pXXJSDM1"}                                // OK
 // var r={verb:"count" ,project:"taxLienExchange",className:"order",query:{email:null},limit:0}                                                  // OK
 // var r=LibraryjsUtil.dbParse({verb:"count",project:LibraryjsUtil.googleSite2parseApp(SitesApp.getActiveSite().getName()),className:"invite",query:{email:ob.email}});if( r.count){return {error:"Email already exists: "+JSON.stringify(r.results[0])}} // OK | @return {results:[array],count:integer}
 // var r=LibraryjsUtil.dbParse({verb:"count",project:pname,className:"invite",query:{email:ob.email}});if(!r.count){return {error:"That email is not on our guest list.\nPlease enter email where we first contacted you"}};
 // var r={verb:"RESET" ,project:"taxLienExchange",className:"User",ob:{email:"atlaslive@gmail.com"}}                                             // OK Resets password @return{void}
 // var r={verb:"post"  ,project:"taxLienExchange",className:"User",ob:{username:"cooldude6",password:"p_n7!-e8",email:"atlaslive@gmail.com"}}    // OK SignUp
 // var r={verb:"get"   ,project:"taxLienExchange",className:"User",ob:{username:"cooldude6",password:"p_n7!-e8"}}                                // OK SignIn
 // var r={verb:"get",project:"taxLienExchange",className:"User",sessionToken:"SCAEaM99PJTc9qbd1BWUSXkp2"}                                        //    Retrieve user via sessionToken
 // var r={verb:"get",project:"taxLienExchange",className:"user",obid:"oNweYCKVG3"}                                                               // OK Retrieve user via objectId
 // Obsolete (former version): <?var S="Please sign in",user=(Session.getActiveUser().getEmail())?Session.getActiveUser().getEmail():"disabled",u=LibraryjsUtil.dbParse({verb:"get",project:"taxLienExchange",className:"user",obid:"oNweYCKVG3",sortBy:"-createdAt"}).results[0]||{name:S,phone:S,company:S}?>
 return Logger.log(JSON.stringify(LibraryjsUtil.dbParse(r)))}
 */ // URL                                Verb   Functionality         Notes // Batches reference: https://www.parse.com/docs/rest#objects-batch
	// ---------------------------------- ------ --------------------- ------ ----------------------------------------------------------------------------------------------------------------
	// /1/classes/<className>	          POST   Creating objects      SignUp new user if className.search(/(user|users)/i)
	// /1/classes/<className>/<objectId>  GET    Retrieving objects    SignIn     user if className.search(/(user|users)/i)
	// /1/classes/<className>/<objectId>  PUT    Updating objects
	// /1/classes/<className>             GET    Fetch queries
	// /1/classes/<className>/<objectId>  DELETE Deleting objects
    //                                    ------                       Special (non HTTP) verbs start below
	// (Uses internal conditional)        UPDATE Update or Create      Locally created; i.e., not included in parse.com API | by design this function won't update a query response batch; update only works using an obid for a single record // function test(){Logger.log(JSON.stringify(dbParse({verb:"update",project:"dealDigger",className:"proposal",ob:{Units:555},query:{item:"bT7kInYUR4",pMgr:"atlaslive"}})))}
	//                                    COUNT  (Remember to call .count property of result) Counts objects returned: @params{"count","alpha","market",{"url":"http://example.com"},0/*Limit count of returned objects*/} // Call Example 1: LibraryjsUtil.dbParse("count","alpha","referral",{"yNameLast":"Dean"}).count // Call Example 2: function test(){Logger.log(LibraryjsUtil.dbParse("count","mojo","lead",{"status":{"$exists":false}}).count)} // // function test(){Logger.log(JSON.stringify(dbParse({verb:"count",project:"dealDigger",className:"proposal"/*,ob:{Units:555}MUST NOT BE INCLUDED IN "COUNT" METHOD CALL*/,query:{item:"bT7kInYUR4",pMgr:"atlaslive"}})))}
    //                                    RESET  Resets password       Requires ob.email
	//                                    SIGNUP
	//                                    SIGNIN
	//                                    RETRIEVE Retrieve user using sessionToken
	//                                    RETRIEVE Retrieve user using user objectId
    var AUTH=/*LibraryjsUtil.*/dbParseKeys(),head={},opt,root,x,s,results;
	if(/^(user|users)$/i.test(r.className)){switch(r.verb){ // If a form of "user" is requested //function test(){Logger.log(!("USeRx".search(/^(user|users)$/i)))}
	       case "post"  :                          root="users/?" // SignUp // function test(){Logger.log(LibraryjsUtil.dbParse({verb:"post",project:"taxLienExchange",className:"User",ob:{username:"cooldude6",password:"p_n7!-e8",email:"atlaslive@gmail.com"}}))}
   ;break; case "get"   :     if(r.sessionToken  ){root="users/me/?";head["X-Parse-Session-Token"]=r.sessionToken} // Retrieve user via sessionToken (not working) // function test(){Logger.log(LibraryjsUtil.dbParse({verb:"get",project:"taxLienExchange",className:"User",sessionToken:"SCAEaM99PJTc9qbd1BWUSXkp2"}))}
	                     else if(r.obid          ){root="users/"+r.obid+"/?"} // Retrieve user via objectId // function test(){Logger.log(LibraryjsUtil.dbParse({verb:"get",project:"taxLienExchange",className:"User",obid:"oNweYCKVG3"}))}
	                     else                     {root="login/?username="+encodeURIComponent(r.ob.username)+"&password="+encodeURIComponent(r.ob.password)} // SignIn // function test(){Logger.log(LibraryjsUtil.dbParse({verb:"get" ,project:"taxLienExchange",className:"User",ob:{username:"cooldude6",password:"p_n7!-e8"}}))}
	                                                                         delete r.limit;delete r.ob
   ;break; case "put"   :                          root="users/"+r.obid+"/?";delete r.limit;delete r.ob.obid;delete r.obid;
   ;break; case "reset" : return{path:"https://api.parse.com/1/requestPasswordReset",opt:{method:"post",payload:JSON.stringify(r.ob),contentType:"application/json",muteHttpExceptions:true,headers:{"X-Parse-Application-Id":AUTH[r.project]["id"],"X-Parse-Master-Key":AUTH[r.project]["key"]}}} // Reset // function test(){Logger.log(LibraryjsUtil.dbParse({verb:"RESET",project:"taxLienExchange",className:"User",ob:{email:"atlaslive@gmail.com"}}))} function test1(){var head={"X-Parse-Application-Id":"Uxgfakt1rLNGmV1gHk5R6fA6MjAeCkWTOHQ06ZQ2","X-Parse-Master-Key":"FbBbzZRVty4ilJfAVvYI5h0Wy32ptO40f9kHCuim"},r=UrlFetchApp.fetch("https://api.parse.com/1/requestPasswordReset",{method:"post",headers:head,payload:JSON.stringify({email:"atlaslive@gmail.com"}),contentType:"application/json",muteHttpExceptions:true}).getContentText();Logger.log(r)} // function test2(){var u=dbParse({verb:"reset",project:googleSite2parseApp("dealdiggeronline2"),className:"User",ob:{email:"atlaslive@gmail.com"}});Logger.log(u)};
   ;break; default      : break}
   }else                                          {root="classes/"+r.className+"/?"}
	var act="https://api.parse.com/1/"+root
      ; head["X-Parse-Application-Id"]=AUTH[r.project]["id"];head[/*"X-Parse-REST-API-Key"*/"X-Parse-Master-Key"]=AUTH[r.project]["key"]
	  ; opt={method:r.verb,headers:head,contentType:"application/json",muteHttpExceptions:true}
	  ; if(r.verb=="update"      ){r.verb="count";try{s=dbParse(r)}catch(e){s=false;Logger.log("Error VWnVn: "+e.message)}
            if(s && s.count      ){r.verb="put"  ;r.obid=s.results[0].objectId;dbParse(r);if(s.count>1){Logger.log("Error vztyI: result count: "+s.count)}}//return("Result count: "+s.count+" | Updated: "+JSON.stringify(s)+" to: "+JSON.stringify(r.ob))}
            else if(r.verb!="get"){r.verb="post" ;                             dbParse(r)                                                                }}//return}}("Created: "                                                      +JSON.stringify(r.ob))}}
        if(r.obid         ){act=act.slice(0,-1)+r.obid+"?"}//fails via limit==100:if(!((r.verb=="get"||r.verb=="put")||r.verb=="delete")){act+="?";//return JSON.parse(UrlFetchApp.fetch(act,opt).getContentText())}}
	    if(r.ob           ){opt.payload=JSON.stringify(r.ob)}
        if(r.verb=="count"){act+="&count=1";opt.method="get";delete opt.payload;r.limit = r.limit||0}
        if(r.limit        ){act+="&limit="+                                     r.limit    } // Keep this line after "count" line
	    if(r.skip         ){act+="&skip=" +                                     r.skip     }
        if(r.sortBy       ){act+="&order="+                                     r.sortBy   }
		if(r.query        ){act+="&where="+encodeURIComponent( JSON.stringify ( r.query  ))}//}
    r.path=act;r.opt=opt;/*Logger.log("line75, r: "+JSON.stringify(r));*/return r}
function dbParse(ob){var obj=dbParseConstruct(ob) // Remember to call .result at original function call e.g., var arr=dbParse(r).result // Must replace xdbParse()
   ,r=JSON.parse(UrlFetchApp.fetch(obj.path,obj.opt).getContentText());if(ob.verb!="count"){return r/*.results*/}else{return(r.limit===0)?r.count:r}}
function dbParseBatch(verb,project,className,arr){ // Reference: https://www.parse.com/docs/rest // Uploads up to 50 records per batch per API call. // Note: Posts to User are not supported in batch operations
    var mode=(typeof verb=="string")?"same":"diff";if(mode=="diff"){var arr=verb,project=arr[0]["project"]} // Enables @param{} to handle either an array of objects (with different verbs and classes -mode:"diff") or use the stated specified parameter set -mode:"same"
 // Mode: "same" // dbParseBatch(verb,project,className,arr)
 // Mode: "diff" // dbParseBatch(arr) // Where arr uses same construction architecture as dbParse(); Note: arr[i]["project"] must be present and the same for all array elements
 // Sample Code | test // Note: Posts to User are not supported in batch operations
//function receive_signUp(ob){ob.username=ob.username.toLowerCase();
    //var u=/*LibraryjsUtil.*/dbParseBatch([{verb:"post",project:"dealDigger",className:"bidder",ob:{username:ob.username}},{verb:"put",project:"dealDigger",className:"invite",obid:"Q7q8rnkqOE",ob:{username:"cooldude57"}}]);
    //return u}//function test(){Logger.log(JSON.stringify(receive_signUp({username:"cooldude70",password:"p_n7!-e8",email:"cooldude70@suremail.info"})))}   // returns: {"objectId":"GNsC2EqFaC","sessionToken":"KSMjeVVDnBsx3pBerimoykjcA"}
/* Sample Code | test
function test(){var ob={requests:[{method:"POST",path:"/1/classes/GameScore",body:{score:"1337",playerName:"Sean Plott"}}
                                 ,{method:"POST",path:"/1/classes/GameScore",body:{score:"1338",playerName:"ZeroCool"  }}]}
    ,resp=UrlFetchApp.fetch("https://api.parse.com/1/batch",{headers:{"X-Parse-Application-Id":"ogiIfGbYrBMDH5ny026E1pcv7lgX7aKCQLc159Za"
                                                                     ,"X-Parse-Master-Key"    :"6MUAiEeT6Gft5vpyQkg86CspisoiW8uSdwZEz5BA"}
                                                            ,method:"post",payload:JSON.stringify(ob),contentType:"application/json"})//,muteHttpExceptions:true})
    ;Logger.log(resp.getContentText())}//dbParseBatch())} */
/* Sample Code | cURL
curl -X POST \
  -H "X-Parse-Application-Id: ogiIfGbYrBMDH5ny026E1pcv7lgX7aKCQLc159Za" \
  -H "X-Parse-REST-API-Key: R2iwuHBCnocMzWmpDIY5RKznWBRjmnlfIqy94T45" \
  -H "Content-Type: application/json" \
  -d '{
        "requests": [
          {
            "method": "POST",
            "path": "/1/classes/GameScore",
            "body": {
              "score": 1337,
              "playerName": "Sean Plott"
            }
          },
          {
            "method": "POST",
            "path": "/1/classes/GameScore",
            "body": {
              "score": 1338,
              "playerName": "ZeroCool"
            }
          }
        ]
      }' \
  https://api.parse.com/1/batch  */
    var LIMIT=50,ACT="https://api.parse.com/1/batch",x,t,params="",k=/*LibraryjsUtil.*/dbParseKeys(),head={"X-Parse-Application-Id":k[project]["id"],/*"X-Parse-REST-API-Key"*/"X-Parse-Master-Key":k[project]["key"]},opt={method:/*verb*/"post",headers:head,contentType:"application/json",muteHttpExceptions:true}
    out=[],r=LibraryjsUtil.subdivideArray(arr,LIMIT),j=r.length;while(j--){var ar=[],i=/*arr*/r[j].length;while(i--){
	    if(mode=="same"){ar.push({method:verb.toUpperCase(),path:("/1/classes/"+className),body:/*arr*/ r[j][i]})}
	    else            {t=dbParseConstruct(r[j][i]);
		                 r[j][i]["method"]=t.verb.toUpperCase();r[j][i]["path"]=t.path.replace("https://api.parse.com","");ar.push(r[j][i])}
	}opt.payload=JSON.stringify({requests:ar});out.push(JSON.parse(UrlFetchApp.fetch(ACT,opt).getContentText()))}return out}
function dbParseFields2dbParseObject(ar){//@return{void} Consolidates array of fields in parse.com class into a single object field. Used this on dealDigger.situs class to merge field array into importOb
    var out=[],ob,arr=LibraryjsUtil.dbParse({verb:"get",project:"dealDigger",className:"situs"/*,obid:"K0k2CHEkaw"*/,query:{importOb:{"$exists":false}}}).results,j,i=arr.length;while(i--){
    ob={};j=ar.length;while(j--){ob[ar[j]]=arr[i][ar[j]]}/*out.push*/LibraryjsUtil.dbParse({verb:"put",project:"dealDigger",className:"situs",obid:arr[i]["objectId"],ob:{importOb:ob}})}//;Logger.log(arr.length)//;Logger.log(arr)
    return}//function test(){var ar=["AllOutstandingTaxesToDeed","CaseNumber","Cert","City","EstimatedAmountTaxesDueToDeed","Income","PIN","PropertyAddress","PropertyDescription","TargetPricingforCertDeed","Vol"];dbParseFields2dbParseObject(ar)}
function subdivideArray(ar,len){ // Use to process an array of arbitrary length to, say, return an array of arrays not exceeding a specific max length. // Example use case: batch upload preprocessig (e.g., dbParseBatch())
 // @param {array  } ar  | array to be subdivided (i.e., parsed) into smaller chunks for processing
 // @param {integer} len | maximum length (size) of each array chunk (segment); Default=50
 // @return{array  } Array of arrays; No sub array exceeds length len
 /* Test Function
 function test(){var ar=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O"];
    return Logger.log(subdivideArray(ar,5))}//Returns: [[K, L, M, N, O], [F, G, H, I, J], [A, B, C, D, E], [v, w, x, y, z], [q, r, s, t, u], [l, m, n, o, p], [g, h, i, j, k], [b, c, d, e, f], [a]]
 */ len=len||50;var out=[];while(ar.length){out.push(ar.splice(-Math.min(len,ar.length)))}return out}
function ss2dbParseBatch(id,sheetName,deleteType,bSizeMax){ // Paused development because formatting from spreadsheet caused posting errors. e.g., #NUM! reformats as text string, making numbers throw error. Instead now post directly to DB.
    sheetName=sheetName||"Sheet1";deleteType=deleteType||"NONE";bSizeMax=bSizeMax||50;//@param{string} deleteType ("NONE|"ALL"|"SUCCESS")
    var ar=[],arr=LibraryjsUtil.ss2ao(id,sheetName).slice(0,bSizeMax),out=LibraryjsUtil.dbParseBatch("post","apex","situs",arr);//Logger.log("arr.length: %s",JSON.stringify(arr.length));Logger.log("out.length: %s",JSON.stringify(out.length));
         if(deleteType=="ALL"    ){       SpreadsheetApp.openById(id)         .getSheetByName(sheetName).deleteRows(2,bSizeMax)}
    else if(deleteType=="SUCCESS"){var ss=SpreadsheetApp.openById(id),sheet=ss.getSheetByName(sheetName),newSheet=sheetName+"_err",i=out.length;while(i--){if(out[i].error){ar.push(arr[i])}}//sheet.deleteRow(i+2)}}
                                   if(!ss.getSheetByName(newSheet)){ss.insertSheet() .setName(newSheet)}//LibraryjsUtil.write2ss(true,ar,newSheet,id);sheet.deleteRows(2,bSizeMax)
   }return out} //function test(){Logger.log(/*LibraryjsUtil.*/ss2dbParseBatch("10r-1n8OW5J21aV-l9B3kmttJO7XymQZ2kL06SE3MUoY","Sheet2","SUCCESS",2))}
/* Deprecated. 11/17/2014 function recordUpdate(myApp,myClass,myMatch,myOb){ // Sample call: LibraryjsUtil.recordUpdate("argenta","zip",{email:ob.email},out)) // function test(){Logger.log(LibraryjsUtil.recordUpdate("argenta","agent",{email:/*"foo"/*/"bar"/* /Session.getActiveUser().getEmail()* /},{name:"Delta"}))} // Note: Used "myX" naming convention for consistency because "class" is a reserved word
           var r=LibraryjsUtil.dbParse( "count" , myApp , myClass , myMatch               , 1    )   // If record (e.g.,"agent") exists in database, // ob=ob||{name:"Bravo"};
    ;if(r.count){LibraryjsUtil.dbParse( "put"   , myApp , myClass , r.results[0].objectId , myOb )}  // Update with new object/information
            else{LibraryjsUtil.dbParse( "post"  , myApp , myClass , myOb                         )}} // Otherwise, add new record (e.g.,"agent") */
function areaCodeOrZip2timeZone(str){var arr,out;//str=str||"02139"//||"814"//Returns time zone given an area code or zip //@return{string} Time zone = ["E","C","M","P"] //@param{string} Area code or zip //"http://www.areacodetimezone.com/zipcode.php"  POST "zipcode"="02139" //"http://www.areacodetimezone.com/areacode.php" POST "name"="814"
    if(str.length==5){arr=["zipcode","zipcode",str+" "]}else if(str.length==3){arr=["areacode","name","Zone "]}else{out="Enter 3 or 5 character string as area code or zip!";Logger.log(out);return out}
    var act="http://www.areacodetimezone.com/"+arr[0]/*areacode*/+".php",payload={};payload[arr[1]]=str;var resp=UrlFetchApp.fetch(act,{method:"post",payload:payload}).getContentText();//Logger.log(resp);
    var KEY = [ , "timeZone" ]
      , QUE = [ , "CONTENT"  ]
      , BEG = [ , arr[2]     ]
      , END = [ , " "        ]
      ; out = /*LibraryjsUtil.*/_scrapeDataset(resp,KEY,QUE,BEG,END);return out}//Logger.log(out);
/* Deprecated. function _getZipsInRadius(str,num){return str.getZipsInRadius(num)}
String.prototype.getZipsInRadius = function(rad){ // string this: zip code, int rad: radius in miles // http://www.melissadata.com/Lookups/zipradius.asp?afid=sbug&zipcode=98029&radius=20&submit=Search
    /* Model of returned array
	[
		{
			"distance"		:	"0.0"
		,	"businesses"	:	245
		,	"population"	:	"28,427"
		,	"county"		:	"King"
		,	"state"			:	"WA"
		,	"city"			:	"Issaquah"
		,	"zip"			:	"98029"
		}
	,	{
			"distance"		:	1.8
		,	"businesses"	:	240
		,	"population"	:	"0"
		,	"county"		:	"King"
		,	"state"			:	"WA"
		,	"city"			:	"Sammamish"
		,	"zip"			:	"98030"
		}
	,	{
			"distance"		:	2.9
		,	"businesses"	:	"1,559"
		,	"population"	:	"22,219"
		,	"county"		:	"King"
		,	"state"			:	"WA"
		,	"city"			:	"Issaquah"
		,	"zip"			:	"98031"
		}
	] * /
	var act,zip=this.toString(),rad=parseInt(rad);if(rad>99){rad=99};act="http://www.melissadata.com/Lookups/zipradius.asp?zipcode="+zip+"&radius="+rad+"&submit=Search";//+"&afid=sbug"
    var j,i,ob=[]
	,	QUE = ["<a ","<td align","<td align","<td align","<td align" ,"<td align" ,"<td align"]
    , 	BEG = [">"  ,">"        ,">"        ,">"        ,">"         ,">"         ,">"        ]
    , 	END = ["<"  ,"<"        ,"<"        ,"<"        ,"<"         ,"<"         ,"<"        ]
    , 	LAB = ["zip","city"     ,"state"    ,"county"   ,"population","businesses","distance" ]
    , 	arr = UrlFetchApp.fetch(act).getContentText().split("<tr ").slice(2);i=arr.length;while(i--){
              ob[i]={};arr[i]=arr[i].scrapeDataset(0,QUE,BEG,END).slice(1);j=arr[i].length;while(j--){ob[i][LAB[j]]=arr[i][j]}}return ob}*/
function getZipsInRadius(zip,miles){ // function test(){Logger.log(JSON.stringify(/*LibraryjsUtil.*/getZipsInRadius("24541",35)))} // Reference: https://zipcodedistanceapi.redline13.com/API
    var KEY=[ , "zip" , "city" , "state" , "county" , "population" , "businesses" , "distance" , "type" ]
      , QUE=[ , "<a"  , "<td"  , "<td"   , "<td"    , "<td"        , "<td"        , "<td"      , "<td"  ]
      , BEG=[ , ">"   , ">"    , ">"     , ">"      , ">"          , ">"          , ">"        , ">"    ]
      , END=[ , "<"   , "<"    , "<"     , "<"      , "<"          , "<"          , "<"        , "<"    ]
      , out=[],act="http://www.searchbug.com/tools/zip-radius.aspx?afid=sbug&zipcode="+zip+"&radius="+miles+"&submit=Search" // "http://www.searchbug.com/tools/zip-radius.aspx?afid=sbug&zipcode=24541&radius=35&submit=Search"
      , arr=UrlFetchApp.fetch(act).getContentText().split("Tableresultborder")[1].split("</table>")[0].split("<tr").slice(3)
      , tot=/*LibraryjsUtil.*/_scrapeDataset(arr.pop(),[,"population","businesses"],[,"Totals in Radius","<b"],[,"<b>",">"],[,"<","<"],[" "],[""])
      , i=arr.length;while(i--){out[i]=/*LibraryjsUtil.*/_scrapeDataset(arr[i],KEY,QUE,BEG,END,["&nbsp;"],[""])}return {totals:tot,zips:out}}
function zones2zips(myApp,classZone,classZip,ob){//ob=ob||{email:"foo",zip:"24540",radius1:10,price1:5,radius2:13,price2:10,radius3:15,price3:15} // @param{object} {email:email,zip:homeZip,price1:priceZone1,price2:priceZone2,price3:priceZone3,radius1:radiusZone1,radius2:radiusZone2,radius3:radiusZone3} // @return{array of objects} {zip,price,email}
    var result,r,out=[],radius=[ob.radius1,ob.radius2,ob.radius3],price=[ob.price1,ob.price2,ob.price3],rad,j,i=radius.length;while(i--){if(radius[i]){rad=radius[i];break;}}result=LibraryjsUtil.getZipsInRadius(ob.zip,rad);r=result.zips;//Logger.log(i);Logger.log(r);
        j=r.length;while(j--){out={email:ob.email,zip:r[j].zip};if(r[j].distance<=ob.radius1){out.price=ob.price1}//;Logger.log(j);Logger.log(out);}
                                                           else if(r[j].distance<=ob.radius2){out.price=ob.price2}
                                                           else if(r[j].distance<=ob.radius3){out.price=ob.price3}
                                                           else                              {      continue     }
                                                           recordUpdate(myApp,classZip ,{email:ob.email,zip:r[j].zip},       out       )}
                                                           recordUpdate(myApp,classZone,{email:ob.email             },{zones2zips:true})} // Sample call: LibraryjsUtil.zones2zips("argenta","agent","zip",ob)
function gdrive2imgur(fileId){// Host picture files // fileId=fileId||"0B1LVOoV_2dFtb0RLa253Y0hDbWc"; // imgur.com // https://api.imgur.com/models/image // "No image available" http://i.imgur.com/rARv7rH.jpg // application: Alpha // client_id: 015c04864834523 // client_secret: 3af5d60fb7b74ec7934af98247a5005c96e4f11c // Login: ThomasWCampos // Email: ThomasWCampos@suremail.info
    // @return{string} | imgur id (url=) // @param{string} | Google Drive file ID // Sample response: "data":{"id":"EXXQmHg","title":null,"description":null,"datetime":1407129264,"type":"image\/jpeg","animated":false,"width":600,"height":854,"size":144074,"views":0,"bandwidth":0,"favorite":false,"nsfw":null,"section":null,"deletehash":"pUkzKQVCuh2KGMm","link":"http:\/\/i.imgur.com\/EXXQmHg.jpg"},"success":true,"status":200}
    if(!fileId){return {imgHost:"imgur.com",imgId:"rARv7rH",imgUrl:"http://i.imgur.com/rARv7rH.jpg"}}
	var ob=DriveApp.getFileById(fileId).getBlob()//.getDownloadUrl().split("?")[0];Logger.log(ob);//
      , r=JSON.parse(UrlFetchApp.fetch("https://api.imgur.com/3/image"/*or "https://api.imgur.com/3/upload"*/,{method:"post",headers:{Authorization:"Client-ID 015c04864834523"},payload:{image:ob/*,type:"URL"*/}}).getContentText())//;Logger.log(r)
      ; return {imgHost:"imgur.com",imgId:r.data.id,imgUrl:r.data.link.replace(/\/gi/,"")}}
function apn2addy_source(){ // GET http://mcassessor.maricopa.gov/?s=13566187 // // GET http://www.city-data.com/hve.php?rs=getdatahve&rsargs[]=5008%20corson%20ave%20s&rsargs[]=&rsargs[]=seattle&rsargs[]=WA&rsargs[]=98158&rsrnd=1412394067310
 // WIP | Converts tax assessor parcel number (APN) to street address.
 // var act = "http://assessor.coconino.az.gov/assessor/taxweb/account.jsp?accountNum=R0059610"
    var act = "http://mcassessor.maricopa.gov/?s=13566187" // "http://maps.mcassessor.maricopa.gov/default.aspx?apn=135-66-187" //
   ;print(UrlFetchApp.fetch(act).getContentText())}
function googleWallet(){
    // Reference URLs    : https://checkout.google.com/inapp/merchant/settings.html | https://developers.google.com/wallet/digital/?csw=1
    // Seller Identifier : 04998448445405811707
    // Seller Secret     : OAxcGrim3McWT3ND1pP3tQ
}
function getBankRates(){var STEM="http://www.bankrate.com/rates/interest-rates/libor.aspx" // Fetches bond yields and interest rate indices including LIBOR
    //                                                         Bond Buyer's 20 bond index             FNMA 30 yr Mtg Com del 60 days         1 Month LIBOR Rate                        3 Month LIBOR Rate                        6 Month LIBOR Rate                           Call Money                             1 Year LIBOR Rate
    var KEY = [ , "updated"  , "foo"                           , "bb_wk" , "bb_mo" , "bb_yr" , "foo"  , "fm_wk" , "fm_mo" , "fm_yr" , "foo"  , "L30_wk" , "L30_mo" , "L30_yr" , "foo"  , "L90_wk" , "L90_mo" , "L90_yr" , "foo"  , "L180_wk" , "L180_mo" , "L180_yr" , "foo"  , "cm_wk" , "cm_mo" , "cm_yr" , "foo"  , "L365_wk" , "L365_mo" , "L365_yr" ]
	,   QUE = [ , ">Updated" , "bond-buyer-20-bond-index.aspx" , "<td "  , "<td "  , "<td "  , "<td " , "<td "  , "<td "  , "<td "  , "<td " , "<td "   , "<td "   , "<td "   , "<td " , "<td "   , "<td "   , "<td "   , "<td " , "<td "    , "<td "    , "<td "    , "<td " , "<td "  , "<td "  , "<td "  , "<td " , "<td "    , "<td "    , "<td "    ]
	,   BEG = [ , " "        , "<"                             , ">"     , ">"     , ">"     , "<"    , ">"     , ">"     , ">"     , "<"    , ">"      , ">"      , ">"      , "<"    , ">"      , ">"      , ">"      , "<"    , ">"       , ">"       , ">"       , "<"    , ">"     , ">"     , ">"     , "<"    , ">"       , ">"       , ">"       ]
	,   END = [ , "<"        , ">"                             , "<"     , "<"     , "<"     , ">"    , "<"     , "<"     , "<"     , ">"    , "<"      , "<"      , "<"      , ">"    , "<"      , "<"      , "<"      , ">"    , "<"       , "<"       , "<"       , ">"    , "<"     , "<"     , "<"     , ">"    , "<"       , "<"       , "<"       ]
	,   DEL = [ "$" , "," ]  , act=STEM
    ,   INS = [ ""  , ""  ]  , data=UrlFetchApp.fetch(act/*,{muteHttpExceptions:true}*/).getContentText(),out=/*LibraryjsUtil.*/_scrapeDataset(data,KEY,QUE,BEG,END,DEL,INS);//out.link=act;//Logger.log(data);print(data);return;//Logger.log(JSON.stringify(out));
    return out} //function test(){Logger.log(JSON.stringify(getBankRates()))} //Sample output:  {"updated":"11/12/2014","foo":"a href=\"1-year-libor.aspx\"","bb_wk":"3.98","bb_mo":"4.01","bb_yr":"4.48","fm_wk":"3.61","fm_mo":"3.53","fm_yr":"4.02","L30_wk":"0.15","L30_mo":"0.15","L30_yr":"0.17","L90_wk":"0.23","L90_mo":"0.23","L90_yr":"0.24","L180_wk":"0.33","L180_mo":"0.32","L180_yr":"0.35","cm_wk":"2.00","cm_mo":"2.00","cm_yr":"2.00","L365_wk":"0.56","L365_mo":"0.55","L365_yr":"0.59"}
function getEmailReport(source){source=source||"Parse";
    var m=GmailApp.search('from:"Parse"')[0].getMessages()[0],out={date:m.getDate()},ar=m.getBody().split("www.parse.com").slice(1),t,i=ar.length;while(i--){//Logger.log(i);return ar[0]}
    var KEY = [ , "project"    , "apiCalls"       , "pushes"         ]
	,   QUE = [ , "_blank"     , "font-size:25px" , "font-size:25px" ]
    ,   BEG = [ , ">"          , ">"              , ">"              ]
	,   END = [ , "<"          , "<"              , "<"              ]
    ,   DEL = [ "$" , "" ] // , act=STEM
    ,   INS = [ ""  , "" ] // , data=UrlFetchApp.fetch(act/*,{muteHttpExceptions:true}*/).getContentText(),
    ;t=/*LibraryjsUtil.*/_scrapeDataset(ar[i],KEY,QUE,BEG,END,DEL,INS);out[t.project]={apiCalls:t.apiCalls,pushes:t.pushes}}//out.link=act;//Logger.log(data);print(data);return;//Logger.log(JSON.stringify(out));
    //MailApp.sendEmail(["a.handy@sofadvisory.com","atlaslive@gmail.com"],"Argenta! was called "+out.Argenta.apiCalls+" times","during the 24-hour period ending midnight during the 24-hour period ending "+out.date/*,{name:"Atlas",htmlBody:""}*/);
    return out} // function test(){Logger.log(JSON.stringify(getEmailReport("Parse")))} // Sample output: {"date":"2014-11-18T18:07:30.000Z","Alpha":{"apiCalls":"0","pushes":"0"},"Apex":{"apiCalls":"0","pushes":"0"},"Argenta":{"apiCalls":"0","pushes":"0"},"LeadBank":{"apiCalls":"0","pushes":"0"},"ArtExchange":{"apiCalls":"0","pushes":"0"},"DealDigger":{"apiCalls":"0","pushes":"0"},"Mojo":{"apiCalls":"0","pushes":"0"},"MarketMaker":{"apiCalls":"0","pushes":"0"},"TaxLienExchange":{"apiCalls":"39","pushes":"0"}}
function browserCheck(){var b=UiApp.getUserAgent(),
	// Firefox   : // Mozilla/5.0 (Windows NT 6.3; WOW64; rv:33.0) Gecko/20100101 Firefox/33.0,gzip(gfe),gzip(gfe)
	// Chrome    : // Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36,gzip(gfe),gzip(gfe)
	// IExplorer : // Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; TNJB; rv:11.0) like Gecko,gzip(gfe),gzip(gfe)
	T='<div class="col-xs-6 col-xs-offset-3 alert alert-danger" role="alert">'
	+' Looks like you&rsquo;re not using Chrome yet? <a href="https://www.google.com/intl/en/chrome/browser/" target="_blank" class="alert-link">Please install Chrome</a> before signing in.'
	+' <a href="https://www.google.com/intl/en/chrome/browser/" target="_blank" class="btn btn-default xbtn-primary xbtn-danger xbtn-lg xbtn-sm xbtn-xs xactive" role="button">'
	+'Download Chrome</a></div>';
	return /chrome/i.test(b)?"":T} // function test(){var b=["Mozilla/5.0 (Windows NT 6.3; WOW64; rv:33.0) Gecko/20100101 Firefox/33.0,gzip(gfe),gzip(gfe)","Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36,gzip(gfe),gzip(gfe)"],T="foo",i=b.length;while(i--){Logger.log( /chrome/i.test(b[i])?"":T)}}
function signInMsg(){var act="https://sites.google.com/site/"+SitesApp.getActiveSite().getName()+"/account" // /*"https://www.google.com/a/UniversalLogin?service=jotspot&continue="+*/SitesApp.getActivePage().getUrl().replace(/\/(\w*|\W*)$/,"/account");
    return ""//Session.getActiveUser().getEmail()?"":
	+ browserCheck()
	+'	<div class="row">'
	+'		<div class="col-xs-6 col-xs-offset-3 jumbotron">'
	+'		<h1>Welcome!</h1>'
	+'		<p>We offer a great product. But to use it, we need to know who you are first. This lets us keep track of all your orders and contact details.</p>'
 // +'		<p>You can use your regular email account to register with Google. <small><small>(i.e., You don't need to create a special Gmail account if you don't already have one.)</small></small></p>'
	+'		<p><a href="'+act+'" target="_blank" class="btn xbtn-default xbtn-primary btn-danger btn-lg xactive" role="button">Sign In or Sign Up</a></p>'
	+'      <p><small>Also, you need to use <a href="https://www.google.com/intl/en/chrome/browser/" target="_blank">Chrome</a>. There are well known bugs with Firefox documented'
	+'         <a href="https://support.mozilla.org/en-US/questions/986513" target="_blank">here</a>,'
	+'         <a href="https://support.mozilla.org/en-US/questions/954828" target="_blank">here</a> and'
	+'         <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=654072" target="_blank">here</a>.'
	+'         And if you still use IExplorer, you might want to '
	+'         <a href="http://www.howtogeek.com/howto/32372/htg-explains-why-do-so-many-geeks-hate-internet-explorer/" target="_blank">read this</a>'
	+'         then <a href="https://www.google.com/intl/en/chrome/browser/" target="_blank">get Chrome</a>.</small></p>'
	+'      <p><small><small><small><a href="http://www.w3schools.com/browsers/browsers_stats.asp" target="_blank">Browser popularity chart</small></small></small></p>'
	+'	</div></div>'}
function logoLetters(){return{
     a:"https://lh5.googleusercontent.com/-5e_i4wQcX1g/VHwk0rPeiRI/AAAAAAAANR8/zpxw3pvB7uw/s144/A.png"
	,b:"https://lh3.googleusercontent.com/-UXjWPEQ4mHE/VHwjtQNh59I/AAAAAAAANRs/9_rdmZmuWxM/s144/B.png"
	,c:"https://lh6.googleusercontent.com/-wTGr01wvmM4/VHwjtjL_XQI/AAAAAAAANRs/yytiz7Od0uo/s144/C.png"
	,d:"https://lh5.googleusercontent.com/-ZdEJm0Q8E1E/VHwjuLcI8pI/AAAAAAAANO4/81vlAew0yWU/s144/D.png"
	,e:"https://lh4.googleusercontent.com/-Pkuwzmtif68/VHwj141gfDI/AAAAAAAANQ4/yJ32i46Yx1Y/s144/E.png"
	,f:"https://lh3.googleusercontent.com/-uUvTDxEXGSE/VHwjuvho9-I/AAAAAAAANRs/IoJOYCBGA8k/s144/F.png"
	,g:"https://lh4.googleusercontent.com/-CvcNyZFgzzs/VHwjvEknRpI/AAAAAAAANR4/7uOQ3wVo-f0/s144/G1.png"
	,h:"https://lh3.googleusercontent.com/-7GwBeUpgRDY/VHwjvf71r1I/AAAAAAAANR4/82v0zghRuiw/s144/H.png"
	,i:"https://lh4.googleusercontent.com/-LMIFK9PEYdo/VHwjv7tY2VI/AAAAAAAANPQ/05RxF9pao10/s144/I.png"
	,j:"https://lh5.googleusercontent.com/-fVFW0jm0wUY/VHwjwHOUeSI/AAAAAAAANR4/yHYsRbdOxS8/s144/J.png"
	,k:"https://lh6.googleusercontent.com/-T0dvWLe8_mQ/VHwjw-Dm_UI/AAAAAAAANRc/IVT1LvOrBkg/s144/K.png"
	,l:"https://lh5.googleusercontent.com/-8sHjDmwnU9o/VHwjwzltzDI/AAAAAAAANPo/pCxuzwT_UAQ/s144/L.png"
	,m:"https://lh6.googleusercontent.com/-VE_CExssaDc/VHwjxSsAFeI/AAAAAAAANRY/8grN_NdFiis/s144/M.png"
	,n:"https://lh4.googleusercontent.com/-iWAYVAfArk4/VHwjxqhBZqI/AAAAAAAANRU/FGsuyXtHfW0/s144/N.png"
	,o:"https://lh5.googleusercontent.com/-kQe0BSr9tqw/VHwjyNIM3UI/AAAAAAAANP0/eUg2vqRXh3I/s144/O.png"
	,p:"https://lh4.googleusercontent.com/-waf5wDmMFwk/VHwjyQBiDDI/AAAAAAAANQA/7GYNzmhfkOA/s144/P.png"
	,q:"https://lh5.googleusercontent.com/-EDW37VOvz_M/VHwjyvKG8SI/AAAAAAAANRQ/--HfvNrgDZc/s144/Q.png"
	,r:"https://lh5.googleusercontent.com/-Cbur-TFTtuI/VHwjy57N7II/AAAAAAAANQM/BiwG3H9pHu4/s144/R.png"
	,s:"https://lh4.googleusercontent.com/-IF380GlERoQ/VHwjzfJayyI/AAAAAAAANRM/d4BAWiY8Olk/s144/S.png"
	,t:"https://lh5.googleusercontent.com/-H_xD2O-saWE/VHwjznbq42I/AAAAAAAANQY/3sEZGMpqAX0/s144/T.png"
	,u:"https://lh4.googleusercontent.com/-4CdrUpVE6_4/VHwjz1gk8CI/AAAAAAAANRI/a7b4F3bvqCQ/s144/U.png"
	,v:"https://lh5.googleusercontent.com/-NckXdrVL3K8/VHwj0b3LTxI/AAAAAAAANQk/mnf9dS0_qgY/s144/V.png"
	,w:"https://lh6.googleusercontent.com/-Y3ZY8V_6HZE/VHwj0gW3VLI/AAAAAAAANRE/NFEZLjuYdwY/s144/W.png"
	,x:"https://lh4.googleusercontent.com/-x-pWiV7ilNY/VHwj0_jgxJI/AAAAAAAANRA/EhW8logJB-I/s144/X.png"
	,y:"https://lh4.googleusercontent.com/-LqWzqCV1cHs/VHwj1TDugUI/AAAAAAAANQ0/l6a488HRIg8/s144/Y.png"
	,z:"https://lh6.googleusercontent.com/-FongxTF6GV0/VHwj1koPgXI/AAAAAAAANQ8/fDAQ4wRQ9YU/s144/Z.png"
    }}
function signup2signin(){//var str=//"https://sites.google.com/site/taxlienexchange/account/signUp";//"https://sites.google.com/site/taxlienexchange/account/signIn";//"https://sites.google.com/site/taxlienexchange/account/sign-in"//"https://sites.google.com/site/taxlienexchange/account/sign-up";
    var out,ar=SitesApp.getActivePage().getUrl()/*str*/.split("/"),page=ar.pop(),stem=ar.join("/");
         if(page.match(/up$/)){page=page.replace(/up$/,"in")}
    else if(page.match(/Up$/)){page=page.replace(/Up$/,"In")}
    else if(page.match(/in$/)){page=page.replace(/in$/,"up")}
    else if(page.match(/In$/)){page=page.replace(/In$/,"Up")}
    else   {return "Did not match URL"}
    out=stem+"/"+page;/*Logger.log/*/return (out)}
// --- GROUP (Common utility functions for client-side JS) --- start  // Should be copy/pasted to client-side JS
function emailValidate(str){return /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i.test(str/*email*/)} //@return{boolean} True if str is valid email address //@param{string} str The string to be tested // Should be copy/pasted to client-side JS // function test(){var ar=["random@example","random@example.com","randomexample.com"],i=ar.length,out=[];while(i--){out.push(emailValidate(ar[i]))}Logger.log(out)} // Sample call: if(!LibraryjsUtil.emailValidate(email)){alert("Enter valid email address.");return} // References: http://www.regular-expressions.info/email.html | http://www.regexmagic.com/patterns.html // Note: Since this function is usually called client-side, we might want to copy/paste; a sample call might resemble this: if(!/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i.test(email)){alert("Enter valid email address.");return}
function phoneStrip(str){return str.replace(/\D/gmi,"")} // Strips phone number of all non-digit characters // Should be copy/pasted to client-side JS // function test(){(Logger.log(phoneStrip("(555) 555-1212;!")))}
// --- GROUP (Common utility functions for client-side JS) --- end
function inviteUpdate(project,email,username){
    var s=/*LibraryjsUtil.*/dbParse({verb:"get",project:project,className:"invite",query:{email:email}}).results[0]//;Logger.log(s),var x
      , t=/*LibraryjsUtil.*/dbParse({verb:"put",project:project,className:"invite",obid:s.objectId,ob:{username:username}})
   ;return t}//function test(){Logger.log(inviteUpdate("dealDigger","cooldude89@suremail.info","cooldude89"))}//Sample call: var t=LibraryjsUtil.inviteUpdate(pname,ob.email,ob.username);
function addyArray2url_staticMaps(ar,ob){//@return{string} Url of static map; can be placed in <img> tag //@param{array} ar List of locations //@param{object} ob Parameters specifying map elements
    // Reference        : https://developers.google.com/maps/documentation/staticmaps/#URL_Parameters
    // Sample    return : https://maps.googleapis.com/maps/api/staticmap?size=512x512&maptype=roadmap\&markers=size:mid%7Ccolor:red%7CSan+Francisco,CA%7COakland,CA%7CSan+Jose,CA
    // Alternate return : https://maps.googleapis.com/maps/api/staticmap?size=512x512&maptype=roadmap\&markers=size:mid%7Ccolor:red%7C40.714728,-73.998672%7C40.715728,-73.998672%7C40.714728,-73.988672
    var j=0,i,str="",MAX=2048,out="https://maps.googleapis.com/maps/api/staticmap?",MSG="&max_",msgLen=MSG.length;
    if(!ob){out+="size=512x512&maptype=roadmap&markers=size:mid|color:red|"}else{
    var keys=Object.keys(ob);i=keys.length;while(i--){str+=(keys[i]+"="+ob[keys[i]]+"&");out+=encodeURIComponent(str)}}
    i=ar.length;while(i--){str=encodeURIComponent(ar[i]+"|");if(out.length+str.length+2*msgLen<MAX){out+=str;j++}else{return out+MSG+j}}
    return out+"&"+j}
function params2url_staticMaps(p){ // MAIN CALL //var API_KEY="AIzaSyCl7w44mqIblzQ8MsZBL45nw297QDrwKU0"
    var ar=[],r=/*LibraryjsUtil.*/dbParse({verb:"get",project:"dealDigger",className:"situs",query:{useCode:p}}).results,i=r.length;while(i--){
	    if((r[i]["latitude"]&&r[i]["longitude"])&&(r[i]["latitude"].toString().length&&r[i]["longitude"].toString().length)){
			 ar.push(r[i]["latitude"]+","+r[i]["longitude"])
	   }else{ar.push(r[i]["PropertyAddress"]+", "+r[i]["City"]+", IL")}} //ar=["7011 S Vernon Ave, Chicago, IL","7018 S Rhodes Ave, Chicago, IL"];
    return addyArray2url_staticMaps(ar)}//function test(){return LibraryjsUtil.params2url_staticMaps("COM")}
// --- GROUP (Network utility functions) --- start
/*function getNodes_ChildHierarchy(ar){ // Deprecated 1/15/2013 // Instead, use getNodes_createChildHiearchy() // WARNING: DO NOT USE; WORK IN PROCESS // @return{object (of arrays)} each node contains children:[] // @param{array (of objects)} ar Each element contains exactly one key named "parent" {...,parent:"foo",...}
	var out={},i=ar.length;while(i--){if(!out[ar[i]["referrer"]]){out[ar[i]["referrer"]]={children:[]}}out[ar[i]["referrer"]]["children"].push({email:ar[i]["email"],username:ar[i]["username"]})}
    return out} // function test(){Logger.log(JSON.stringify(getNodes_ChildHierarchy(getNodes_project2array("dealDigger"))))}*/
function getNodes_insertChild2hierarchy(ob,parentId,childId){//@return{object} Example: {"a":{"b":{"d":{},"e":{}},"c":{"h":{},"f":{},"g":{}}}}
    var str=JSON.stringify(ob),patt='("'+parentId+'.*?:{)',re=new RegExp(patt),oldstr=re.exec(str)[0];//Logger.log("oldstr: "+oldstr);//str.match(re)//
    str=str.replace(oldstr,oldstr+'"'+childId+'":{},');return JSON.parse(str)}//function test(){Logger.log(JSON.stringify(getNodes_insertChild2hierarchy({a:{b:{d:{},e:{}},c:{f:{},g:{}}}},"c","h")))}
function getNodes_createChildHiearchy(proj){var i,out={"atlaslive":{}},ar=getNodes_project2array(proj); // MAIN CALL // Includes getNodes_insertChild2hierarchy(), getNodes_project2array()
    while(ar.length){i=ar.length;while(i--){try{out=getNodes_insertChild2hierarchy(out,ar[i]["referrer"],(ar[i]["username"]||ar[i]["email"]));ar.splice(i,1)}catch(e){Logger.log("Error "+ar[i]["username"]+": "+e.message)}}
    }return out}//function test(){Logger.log(JSON.stringify(getNodes_createChildHiearchy("dealDigger")))} // @return{object} Example: {"atlaslive":{"mike.tassone@homevestors.com":{},"tchirico":{},"joe.kaszuba@yahoo.com":{},"sofadvisory":{"croxborough@whbllp.com":{},"kdudley1":{},"rudyardc@cookerobotham.com":{},"johnmikebonhomme@gmail.com":{},"horace.m.barker@morganstanley.com":{},"jromy215@gmail.com":{},"bgibson@harborviewcapital.net":{},"mjohncooper":{},"maryana.smaga@sothebysrealty.com":{},"tjcre":{}},"atlaslive":{},"info@seligerideas.com":{},"ag@primepropertyinvestors.com":{},"apmfirst":{},"eric.strung@homevestors.com":{},"miketas":{},"benharvill":{"atlasfunds@gmail.com":{}}}}
function getNodes_project2array/*_membersOnly*/(proj){return /*LibraryjsUtil.*/dbParse({verb:"get",project:proj,className:"invite"/*,query:{"username":{"$exists":true}}*/}).results}
function getNodes_CountSignups(ar){ // @return{object} keys: usernames of members(nodes), values: counts children w/ usernames (i.e.,signups/members) Also, equivalent to the number of times each username shows up as a parent; Note: children invitations w/out signups are obtained in other related functions
    // @param{array} ar output of getNodes_Network(username,proj) // Example: [{"childrenFetched":true,"childrenCount":0,"email":"t.anthony.jones@gmail.com","parent":"sofadvisory","username":"tjcre"},{"childrenFetched":false,"childrenCount":0,"email":"maryana.smaga@sothebysrealty.com","parent":"sofadvisory"},{"childrenFetched":true,"childrenCount":0,"email":"m@ayacap.com","parent":"sofadvisory","username":"mjohncooper"},{"childrenFetched":false,"childrenCount":0,"email":"bgibson@harborviewcapital.net","parent":"sofadvisory"},{"childrenFetched":false,"childrenCount":0,"email":"jromy215@gmail.com","parent":"sofadvisory"},{"childrenFetched":false,"childrenCount":0,"email":"horace.m.barker@morganstanley.com","parent":"sofadvisory"},{"childrenFetched":false,"childrenCount":0,"email":"johnmikebonhomme@gmail.com","parent":"sofadvisory"},{"childrenFetched":false,"childrenCount":0,"email":"rudyardc@cookerobotham.com","parent":"sofadvisory"},{"childrenFetched":true,"childrenCount":0,"email":"kevinldudley21@gmail.com","parent":"sofadvisory","username":"kdudley1"},{"childrenFetched":false,"childrenCount":0,"email":"croxborough@whbllp.com","parent":"sofadvisory"}]
	var out={},i=ar.length;while(i--){if(ar[i]["username"]){if(out[ar[i]["parent"]]){out[ar[i]["parent"]]++}else{out[ar[i]["parent"]]=1}}}
    return out}//function test(){Logger.log(JSON.stringify(getNodes_Count(LibraryjsUtil.getNodes_Network("atlaslive","dealDigger"))))}
function getNodes_Children(ar,username){var out=[],arr,i=ar.length;while(i--){if(ar[i]["referrer"]==username){out.push({childrenFetched:false,childrenCount:0,email:ar[i]["email"],parent:ar[i]["referrer"],username:ar[i]["username"]});ar.splice(i,1)}}return out} // Works because of .splice() method; otherwise will endless loop // Note: Remember .splice() changes array in CALLING function //function test(){var ar=[0,1,2,3,4,5,6,7,8,9],i=ar.length;while(i--){if(i%3){ar.splice(i,1)}}Logger.log(ar);}
function getNodes_Network(username,proj){var i,go=false,out=[],ar=getNodes_project2array(proj); // MAIN CALL // Future development will need to account for when the total user base increases above 1,000 as all users are returned in the initial var ar query // @return{object} Example: [{"childrenFetched":true,"childrenCount":0,"email":"t.anthony.jones@gmail.com","parent":"sofadvisory","username":"tjcre"},{"childrenFetched":false,"childrenCount":0,"email":"maryana.smaga@sothebysrealty.com","parent":"sofadvisory"},{"childrenFetched":true,"childrenCount":0,"email":"m@ayacap.com","parent":"sofadvisory","username":"mjohncooper"},{"childrenFetched":false,"childrenCount":0,"email":"bgibson@harborviewcapital.net","parent":"sofadvisory"},{"childrenFetched":false,"childrenCount":0,"email":"jromy215@gmail.com","parent":"sofadvisory"},{"childrenFetched":false,"childrenCount":0,"email":"horace.m.barker@morganstanley.com","parent":"sofadvisory"},{"childrenFetched":false,"childrenCount":0,"email":"johnmikebonhomme@gmail.com","parent":"sofadvisory"},{"childrenFetched":false,"childrenCount":0,"email":"rudyardc@cookerobotham.com","parent":"sofadvisory"},{"childrenFetched":true,"childrenCount":0,"email":"kevinldudley21@gmail.com","parent":"sofadvisory","username":"kdudley1"},{"childrenFetched":false,"childrenCount":0,"email":"croxborough@whbllp.com","parent":"sofadvisory"}]
    out=out.concat(getNodes_Children(ar,username));
    do{go=false;i=out.length;
       while(i--){if(out[i]["username"] && !out[i]["childrenFetched"]){go=true;//Logger.log(out[i]["username"]+" A "+out[i]["childrenFetched"]);
                   arr=getNodes_Children(ar,out[i]["username"]);
											out[i]["childrenFetched"]=true;
                                            out[i]["childrenCount"]=arr.length;out=out.concat(arr)}}}while(go)return out} //function test(){Logger.log(JSON.stringify(LibraryjsUtil.getNodes_Network(u.username/*"sofadvisory"*/,siteName/*"dealDigger"*/)))}
// --- GROUP (Network utility functions) --- end
function getBids_BidderBidVolume(proj){ // @return{object} keys: username, values: bidCount, bidVolume // Example: {"miketas":{"bidCount":24,"bidVolume":604500}}
    var out={},ar=/*LibraryjsUtil.*/dbParse({verb:"get",project:proj,className:"bid"}).results,i=ar.length;while(i--){if(out[ar[i]["buyer"]]){out[ar[i]["buyer"]]["bidCount"]++;out[ar[i]["buyer"]]["bidVolume"]+=(1*ar[i]["MyBid"])}else{out[ar[i]["buyer"]]={bidCount:1,bidVolume:(1*ar[i]["MyBid"])}}}
    return out}//function test(){Logger.log(JSON.stringify(getBids_BidderBidVolume("dealDigger")))} // Future development will need deal with the use case with the total number of bids exceeds 1,000 as this is the max length for the dbParse() GET method
function addyMultiMatch(a,b){a=parseInt(a);b=b.split("-");return (a<=parseInt(b[1])&&a>=parseInt(b[0]))?true:false}//@return{boolean} true if a is included in the range defined by b // @param{string} a ex. "1717" // @param{string} b ex. "1716-1718" // function test(){Logger.log(addyMultiMatch("1717","1716-1718"))}
function null2str(r){return JSON.parse(JSON.stringify(r).replace(/null/g,"\"\"")) // @return{object or array} Replaces null values in r with empty strings
    // Future development might include adding .replace(/:null/g,":\"\"")).replace(/[null/g,"[\"\"")).replace(/,null/g,",\"\"")).replace(/null,/g,"\"\",").replace(/null]/g,"\"\"]") // Consider adding this if /null/g captures too much e.g., Mcnully-->Mcy
    // Error: Missing comma in object literal... see jsAvm.js| LibraryjsAvm.avmTrulia() "delete" methods used to mitigate error effect.
	/* function xnull2str(r){var i,keys; // Don't use. Does not work. Object/s revert/s back to null.
       // Description Example     typeof    .length
       // Object      {}          object    undefined
       // Array       []          object    0
       // String      ""          string    0
       // Number      12          number    undefined
       // Null        null        object    Error
       // Undefined   undefined   undefined Error
          if(r==null||r==undefined){Logger.log("r is null or undefined: "+r);r=""} // Filters out nulls before they create an error by checking .length // Note: It appears at this time that it is not necessary to filter undefined values because they appear to not throw an error by GAS server/client callback parameter. However, we do filter undefined values here out of an abundance of caution
          else if(typeof r=="object"&&(r.length+1)){Logger.log("r is an array: "+r);i=r.length;while(i--){null2str(r[i])}} // r is an array[]
          else if(typeof r=="object"&& r.length==undefined){Logger.log("r is an object: "+JSON.stringify(r));keys=Object.keys(r);i=keys.length;while(i--){null2str(r[keys[i]])}} // r is an object{}
          Logger.log("Returning with r: "+JSON.stringify(r));
          return r} */
}//function test(){var ob={a:null,b:["c",,"d"],e:["f",null,"g"]};Logger.log(JSON.stringify(ob));Logger.log(JSON.stringify(null2str(ob)))}
function write2doc(str,ob){ // @param{string} str New doc contents; @param{object} ob Parameters: @param{string} ob.id Doc ID if writing to existing sheet; @param{string} ob.name Name of new doc
	if(typeof str != "string"){str=JSON.stringify(str)}var doc=(ob&&ob.id)?DocumentApp.openById(ob.id):DocumentApp.create((ob&&ob.name)?ob.name:"Untitled | "+new Date().getTime());doc.getBody().setText(str);return}//function test(){var str="Hello, world.";/*LibraryjsUtil.*/write2doc(str,{id:"1WKKhUdq9DXbVQMs14yqKcISLflgi1D0wTD24Dz0Lq00"});/*LibraryjsUtil.*/write2doc(str,{name:"New doc test"});/*LibraryjsUtil.*/write2doc(str)}
function doc2str(id){return DocumentApp.openById(id).getBody().getText()}//See at: https://docs.google.com/document/d/1WKKhUdq9DXbVQMs14yqKcISLflgi1D0wTD24Dz0Lq00/edit //function test(){var r=JSON.parse(LibraryjsUtil.doc2str("1WKKhUdq9DXbVQMs14yqKcISLflgi1D0wTD24Dz0Lq00"));Logger.log(JSON.stringify(r))}
function portfolioObj2arr(ob){var ar=[],keys=Object.keys(ob),i=keys.length;while(i--){ar.push(ob[keys[i]])}return ar} // @param{object} ob Object in portfolio format where each key is a unique string identifier; e.g., ob={uniquekey001:{...},uniquekey002:{...}} // function test(){var ob=JSON.parse(LibraryjsUtil.doc2str("1WKKhUdq9DXbVQMs14yqKcISLflgi1D0wTD24Dz0Lq00"));Logger.log(JSON.stringify(portfolioObj2arr(ob.data)))}
function str2obj(myJSONtext){try{var ob=eval("(" + myJSONtext + ")")}catch(e){Logger.log("Error jQfx9: "+e.message);return false}return typeof ob=="object"?ob:myJSONtext} // function test(){Logger.log(JSON.stringify(str2obj(LibraryjsUtil.doc2str("1WKKhUdq9DXbVQMs14yqKcISLflgi1D0wTD24Dz0Lq00"))))} // References: http://stackoverflow.com/questions/8044965/json-string-parsing-in-javascript | http://www.w3schools.com/json/json_eval.asp // Parses JSON text string of all nested levels; JSON.parse(myJSONText) only parses top level into JS object
