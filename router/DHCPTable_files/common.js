
//
// *********************************************************
// *   Copyright 2003, CyberTAN  Inc.  All Rights Reserved *
// *********************************************************
//
// This is UNPUBLISHED PROPRIETARY SOURCE CODE of CyberTAN Inc.
// the contents of this file may not be disclosed to third parties,
// copied or duplicated in any form without the prior written
// permission of CyberTAN Inc.
//
// This software should be used as a reference only, and it not
// intended for production use!
//
//
// THIS SOFTWARE IS OFFERED "AS IS", AND CYBERTAN GRANTS NO WARRANTIES OF ANY
// KIND, EXPRESS OR IMPLIED, BY STATUTE, COMMUNICATION OR OTHERWISE.  CYBERTAN
// SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A SPECIFIC PURPOSE OR NONINFRINGEMENT CONCERNING THIS SOFTWARE

ie4 = ((navigator.appName == "Microsoft Internet Explorer") && (parseInt(navigator.appVersion) >= 4 ))
ns4 = ((navigator.appName == "Netscape") && (parseInt(navigator.appVersion) < 6 ))
ns6 = ((navigator.appName == "Netscape") && (parseInt(navigator.appVersion) >= 6 ))

//var ie = (navigator.appName == "Microsoft Internet Explorer");
//var ns = (navigator.appName == "Netscape");

//if(ns){                                                                         
//        document.captureEvents(Event.MOUSEDOWN);                                
//} 
//document.onmousedown = check_click;
//function check_click(){
//	if((ie && (event.button == 2 || event.button == 3)) || (ns && (e.which == 2 || e.which == 3))){
//		alert("");
//		return false;
//	}
//	else
//		return true;
//}

// 0.0.0.0
var ZERO_NO = 1;	// 0x0000 0001
var ZERO_OK = 2;	// 0x0000 0010
// x.x.x.0
var MASK_NO = 4;	// 0x0000 0100
var MASK_OK = 8;	// 0x0000 1000
// 255.255.255.255
var BCST_NO = 16;	// 0x0001 0000
var BCST_OK = 32;	// 0x0010 0000

var SPACE_NO = 1;
var SPACE_OK = 2;

var IP_FULL = 1;
var IP_LAST = 2;

//============FOR INDEX - DHCP of IP RANGE ==================
var RANGE_SET;
var DHCP_START_IP = new Array();
var DHCP_END_IP = new Array();
var RANGE_COUNT;
var MAX_RANGE_COUNT;
//============END OF FOR INDEX             ==================
function erralert(msg)
{
	var EN_DEBUG = "";
	if ( EN_DEBUG == "" ) EN_DEBUG = "0" ; 
	if ( EN_DEBUG == "1" ) alert(msg);
}

function choose_enable(en_object)
{
	if(!en_object)	return;
	en_object.disabled = false;			// netscape 4.x can not work, but 6.x can work

	//if(!ns4)
	//	en_object.style.backgroundColor = "";	// netscape 4.x have error
}
function choose_disable(dis_object)
{
	if(!dis_object)	return;
	dis_object.disabled = true;

	//if(!ns4)
	//	dis_object.style.backgroundColor = "#e0e0e0";
}
function check_action(I,N)
{
	return ; 
	if(ns4){	//ie.  will not need and will have question in "select"
		if(N == 0){
			if(EN_DIS == 1) I.focus();
			else I.blur();
		}
		else if(N == 1){
			if(EN_DIS1 == 1) I.focus();
			else I.blur();
		}
		else if(N == 2){
			if(EN_DIS2 == 1) I.focus();
			else I.blur();
		}
		else if(N == 3){
			if(EN_DIS3 == 1) I.focus();
			else I.blur();
		}
			
	}
}
function check_action1(I,T,N)
{
	if(ns4){	//ie.  will not need and will have question in "select"
		if(N == 0){
			if(EN_DIS == 1) I.focus();
			else I.value = I.defaultChecked;
		}
		if(N == 1){
			if(EN_DIS1 == 1) I.focus();
			else I.value = I.defaultChecked;
		}
	}
}
function valid_range(I,start,end,M)
{
	//if(I.value == ""){
	//	if(M == "IP" || M == "Port")
	//		I.value = "0";
	//}
	M1 = unescape(M);
	if ( isdigit(I,M1) == false ) return false ; 

	d = parseInt(I.value, 10);	
	if ( !(d<=end && d>=start) )		
	{		
//		alert(M1 +' value is out of range ['+ start + ' - ' + end +']');
//		alert(M1 + errmsg.err14 + '['+ start + ' - ' + end +']');
		alert("The value is out of range " + '['+ start + ' - ' + end +'].');
		I.value = I.defaultValue;		
		return false;
	}
	else
		I.value = d;	// strip 0
	return true ; 
}

function IsCrossRange(n1,n2,n3,n4,p1,p2)
{
    // 1:TCP , 2:UDP , 0:BOTH
    var a,b,c,d ;
    a = parseInt(n1,10);
    b = parseInt(n2,10);
    c = parseInt(n3,10);
    d = parseInt(n4,10);
    if ( a==0 && b==0 && c==0 && d==0 ) return false ; 
    if ( p1!=p2 && p1!=0 && p2!=0 ) return false ;
    if ( a<=c && b>=c && ((p1==0 || p2==0) || (p1==p2))) return true ;
    if ( a<=d && b>=d && ((p1==0 || p2==0) || (p1==p2))) return true ;
    if ( a>=c && b<=d && ((p1==0 || p2==0) || (p1==p2))) return true ; 
    return false ;
}

function valid_mac(I,T)
{
	var m1,m2=0;

	if(I.value.length == 1)
		I.value = "0" + I.value;

	m1 =parseInt(I.value.charAt(0), 16);
	m2 =parseInt(I.value.charAt(1), 16);
	if( isNaN(m1) || isNaN(m2) )
	{
//		alert('The WAN MAC Address is out of range [00 - ff]');	
		alert("The WAN MAC Address is out of range [00 - ff].");	
		I.value = I.defaultValue;
	}
	I.value = I.value.toUpperCase();
	if(T == 0)                                                              
        {         
		if((m2 & 1) == 1){                               
//			alert('The second character of MAC must be even number : [0, 2, 4, 6, 8, A, C, E]');
			alert("Invalid MAC address!");
			I.value = I.defaultValue;                       
		}                                                       
        }                       
}
function valid_macs_12(I){	
	var m,m3;	
	if(I.value == "")
		return true;
//	if(I.value.length<2)		
//		I.value=0;	
	else if(I.value.length==12){
		for(i=0;i<12;i++){			
			m=parseInt(I.value.charAt(i), 16);			
			if( isNaN(m) )				
				break;		
		}		
		if( i!=12 ){
//			alert('The MAC Address is not correct!!');
			alert("The MAC Address is incorrect.");
			I.value = I.defaultValue;		
		}	
	}	
	else{		
//		alert('The MAC Address length is not correct!!');
		alert("The MAC Address length is incorrect.");
		I.value = I.defaultValue;	
	}
	I.value = I.value.toUpperCase();
	if(I.value == "FFFFFFFFFFFF"){
//		alert('The MAC Address cannot be the broadcast address!!');
		alert("The MAC Address cannot be the broadcast address.");
		I.value = I.defaultValue;	
	}

	if(check_multicast_mac(I.value)){
		I.value = I.defaultValue;	
	}
	m3 = I.value.charAt(1);
	if((m3 & 1) == 1){                               
//		alert('The second character of MAC must be even number : [0, 2, 4, 6, 8, A, C, E]');
		alert("Invalid MAC address!");
		I.value = I.defaultValue;                       
	}                                                       
}
function valid_macs_17(I)
{
	oldmac = I.value;
	var mac = ignoreSpaces(oldmac);
	if (mac == "") 
	{
		return true;
		//alert("Enter MAC Address in (xx:xx:xx:xx:xx:xx) format");
		//return false;
	}
	var m = mac.split(":");
	if (m.length != 6) 
	{
//		alert("Invalid MAC address format");
		alert("The MAC address format is incorrect.");
		I.value = I.defaultValue;		
		return false;
	}
	var idx = oldmac.indexOf(':');
	if (idx != -1) {
		var pairs = oldmac.substring(0, oldmac.length).split(':');
		for (var i=0; i<pairs.length; i++) 
                {
			nameVal = pairs[i];
			len = nameVal.length;
			if (len < 1 || len > 2) {
//				alert ("The WAN MAC Address is not correct!!");
				alert("The WAN MAC Address is incorrect.");
				I.value = I.defaultValue;		
				return false;
			}
			for(iln = 0; iln < len; iln++) {
				ch = nameVal.charAt(iln).toLowerCase();
				if (ch >= '0' && ch <= '9' || ch >= 'a' && ch <= 'f') {
				}
				else 
                                {  
//					alert ("Invalid hex value " + nameVal + " found in MAC address " + oldmac);
//					alert (errmsg.err23 + nameVal + errmsg.err24 + oldmac);
					alert("The hex value is incorrect.");
					I.value = I.defaultValue;		
					return false;
				}
			}	
		}
	}
	I.value = I.value.toUpperCase();
	if(I.value.charAt(0) == "F" && I.value.charAt(1) =="F"){
                //alert('This MAC Address is invalid.');
		alert("This MAC Address is incorrect.");
		I.value = I.defaultValue;	
	}

	if(check_multicast_mac(I.value)){
		I.value = I.defaultValue;	
	}

	m3 = I.value.charAt(1);        
        var tmp = parseInt(m3,16);
	if( (tmp&1) == 1){                                
//		alert('The second character of MAC must be even number : [0, 2, 4, 6, 8, A, C, E]');
		alert("Invalid MAC address!");
		I.value = I.defaultValue;                       
	}                                                       
	return true;
}
function ignoreSpaces(string) {
  var temp = "";

  string = '' + string;
  splitstring = string.split(" ");
  for(i = 0; i < splitstring.length; i++)
    temp += splitstring[i];
  return temp;
}

function DISABLE_ALL(flg,F)
{
	var len,i,bt;
        len = F.elements.length;
        if ( flg == true )
        {
                //document.getElementById("bt").removeAttribute("href");
        }
        for(i=0; i<len; i++)
        {
                F.elements[i].disabled = flg ;
        }
}

function DISABLE_PART(F,start,end,flag)
{
	var i,starti,endi; 
	var len = F.elements.length;
	for(i=0; i<len; i++)
	{
		if(F.elements[i].name==start) starti=i;
		if(F.elements[i].name==end) endi=i;
	}
	if(starti == '' || endi == '')return true;
	for(i=starti; i<=endi; i++)
	{
		if(flag==0)
			choose_enable(F.elements[i]);
		else
			choose_disable(F.elements[i]);
	}
}

function check_space(I,M1){
	M = unescape(M1);
	for(i=0 ; i<I.value.length; i++){
		ch = I.value.charAt(i);
		if(ch == ' '){
//			alert(M +' is not allow space!');
//			alert(M + errmsg2.err10);
			alert("Spaces are not allowed.");
			I.value = I.defaultValue;	
			return false;
		}
	}
	return true;
}
function valid_key(I,l){	
	var m;	
	if(I.value.length==l*2)	{		
		for(i=0;i<l*2;i++){			 
			m=parseInt(I.value.charAt(i), 16);
			if( isNaN(m) )				
				break;		
		}		
		if( i!=l*2 ){		
//			alert('The key value is not correct!!');			
			alert("The key value is incorrect.");			
			I.value = I.defaultValue;		
		}	
	}	
	else{		
//		alert('The key length is not correct!!');		
		alert("The key length is incorrect.");		
		I.value = I.defaultValue;	
	}
}

function special_char_trans(I)
{
	var bbb = I ; 
	var ccc = bbb.replace(/\s/g,"%20");
	return ccc ; 
}


function valid_name(I,M,flag)
{
	isascii(I,M);

	var bbb = I.value.replace(/^\s*/,"");
        var ccc = bbb.replace(/\s*$/,"");

        I.value = ccc;

	if(flag & SPACE_NO){
		check_space(I,M);
	}

}

function valid_name1(I,flag)
{
	var bbb = I.value.replace(/^\s*/,"");
        var ccc = bbb.replace(/\s*$/,"");
	var ch , i ; 
        I.value = ccc;

	if(flag & SPACE_NO){
		check_space(I,M);
	}
	var re = new RegExp("[^a-zA-Z0-9-_\\s]+","gi")
	if (( re.test(I.value)))
	{
		alert("The value is out of range "+" [A - Z , a - z , 0 - 9 , - , _ or space]");
		I.value = I.defaultValue;
		return false;
	}

        I.value = ccc;

}

function valid_mask(F,N,flag){
	var match0 = -1;
	var match1 = -1;
	var m = new Array(4);

	for(i=0;i<4;i++)
		m[i] = eval(N+"_"+i).value;

	if(m[0] == "0" && m[1] == "0" && m[2] == "0" && m[3] == "0"){
		if(flag & ZERO_NO){
//			alert("Illegal subnet mask!");
			alert("The subnet mask is incorrect.");
			return false;
		}
		else if(flag & ZERO_OK){
			return true;
		}
	}

	if(m[0] == "255" && m[1] == "255" && m[2] == "255" && m[3] == "255"){
		if(flag & BCST_NO){
//			alert("Illegal subnet mask!");
			alert("The subnet mask is incorrect.");
			return false;
		}
		else if(flag & BCST_OK){
			return true;
		}
	}

	for(i=3;i>=0;i--){
		for(j=1;j<=8;j++){
			if((m[i] % 2) == 0)   match0 = (3-i)*8 + j;
			else if(((m[i] % 2) == 1) && match1 == -1)   match1 = (3-i)*8 + j;
			m[i] = Math.floor(m[i] / 2);
		}
	}
	if(match0 > match1){
//		alert("Illegal subnet mask!");
		alert("The subnet mask is incorrect.");
		return false;
	}
	return true;
}
function isdigit(I,M)
{
	for(i=0 ; i<I.value.length; i++){
		ch = I.value.charAt(i);
		if(ch < '0' || ch > '9'){
//			alert(M +' have illegal characters, must be [ 0 - 9 ]');
//			alert(M + errmsg.err28);
			alert("Illegal characters [must be 0 - 9 ].");
			I.value = I.defaultValue;	
			return false;
		}
	}
	return true;
}

function isascii(I,M)
{
	for(i=0 ; i<I.value.length; i++){
		ch = I.value.charAt(i);
		if(ch < ' ' || ch > '~'){
//			alert(M +' have illegal ascii code!');
//			alert(M + errmsg.err29);
			alert("Illegal ASCII code.");
			I.value = I.defaultValue;	
			return false;
		}
	}
	return true;
}
function isdien(I,M)
{
	for(i=0; i<I.value.length; i++)
	{
                ch = I.value.charAt(i).toLowerCase();
		if(ch >= '0' && ch <= '9' || ch >= 'a' && ch <= 'z'){}
                else{
                        alert("Illegal value");
                        I.value = I.defaultValue;
                        return false;
                }

	}
	return true ; 
}

function isxdigit(I,M)
{
	for(i=0 ; i<I.value.length; i++){
		ch = I.value.charAt(i).toLowerCase();
		if(ch >= '0' && ch <= '9' || ch >= 'a' && ch <= 'f'){}
		else{
//			alert(M +' have illegal hexadecimal digits!');
//			alert(M + errmsg.err30);
			alert("Illegal hexadecimal digits.");
			I.value = I.defaultValue;	
			return false;
		}
	}
	return true;
}
function closeWin(var_win){
	if ( ((var_win != null) && (var_win.close)) || ((var_win != null) && (var_win.closed==false)) )
		var_win.close();
}
function valid_ip_msg(F,N,msg,flag)
{
	var m = new Array(4);
//        M = unescape(M1);

        for(i=0;i<4;i++)
                m[i] = eval(N+"_"+i).value
        if(m[0] == 127 || m[0] == 224){
                alert(msg);
		eval(N+"_0").focus();
                return false;
        }
	/******lh sync e2000 20100721************/
	if(m[0] == "0" && (m[1] != "0" || m[2] != "0" || m[3] != "0"))
    	{
        	alert("Illegal value");
        	return false;
    	}

	/******lh sync end e2000 20100721************/
	
        if(m[0] == "0" && m[1] == "0" && m[2] == "0" && m[3] == "0"){
                if(flag & ZERO_NO){
			alert(msg);
			eval(N+"_0").focus();
                        return false;
                }
        }

        if((m[0] != "0" || m[1] != "0" || m[2] != "0") && m[3] == "0"){
                if(flag & MASK_NO){
                        alert(msg);
			eval(N+"_0").focus();
                        return false;
                }
        }
        return true;

}

function valid_ip(F,N,M1,flag){
	var m = new Array(4);
	M = unescape(M1);

	for(i=0;i<4;i++)
		m[i] = eval(N+"_"+i).value
	
	if(m[0] == 127 || m[0] == 224){
//		alert(M+" value is illegal!");
//		alert(M+ errmsg.err31);
		alert("Illegal value");
		return false;
	}
	/******lh sync e2000 20100721************/
	if(m[0] == "0" && (m[1] != "0" || m[2] != "0" || m[3] != "0"))
    	{
        	alert("Illegal value");
        	return false;
    	}
	/******lh end sync e2000 20100721************/

	if(m[0] == "0" && m[1] == "0" && m[2] == "0" && m[3] == "0"){
		if(flag & ZERO_NO){
//			alert(M+' value is illegal!');
//			alert(M+ errmsg.err31);
			alert("Illegal value");
			return false;
		}
	}

	if((m[0] != "0" || m[1] != "0" || m[2] != "0") && m[3] == "0"){
		if(flag & MASK_NO){
//			alert(M+' value is illegal!');
//			alert(M+ errmsg.err31);
			alert("Illegal value");
			return false;
		}
	}
	return true;
}
function valid_ip_gw(F,I,N,G)
{
	var IP = new Array(4);
	var NM = new Array(4);
	var GW = new Array(4);
	
	for(i=0;i<4;i++)
		IP[i] = eval(I+"_"+i).value
	for(i=0;i<4;i++)
		NM[i] = eval(N+"_"+i).value
	for(i=0;i<4;i++)
		GW[i] = eval(G+"_"+i).value

	for(i=0;i<4;i++){
		if((IP[i] & NM[i]) != (GW[i] & NM[i])){
//			alert("IP address and gateway is not at same subnet mask!");
			alert("The IP address and gateway are not in the same subnet mask.");
			return false;
		}
	}
	if((IP[0] == GW[0]) && (IP[1] == GW[1]) && (IP[2] == GW[2]) && (IP[3] == GW[3])){
//		alert("IP address and gateway can't be same!");
		alert("The IP address and gateway can't be the same.");
		return false;
	}
	
	return true;
}

function valid_subnet(F,I,N,G)
{
	var IP = new Array(4);
	var NM = new Array(4);
	var GW = new Array(4);
	
	for(i=0;i<4;i++)
		IP[i] = eval(I+"_"+i).value
	for(i=0;i<4;i++)
		NM[i] = eval(N+"_"+i).value
	for(i=0;i<4;i++)
		GW[i] = eval(G+"_"+i).value

	for(i=0;i<4;i++){
		if((IP[i] & NM[i]) != (GW[i] & NM[i])){
			return false;
		}
	}
	return true;
}

function delay(gap) //gap is in millisecs
{
	var then,now; then=new Date().getTime();

	now=then;
	while((now-then)<gap)
	{
		now=new Date().getTime();
	}
}
function Capture(obj)
{
	document.write(obj);	
}	

function __T(obj)
{
	return obj;
}

function productname()
{
	var title = '12';
	
	if( title == "1")
		document.write("Wireless-G Broadband Router");	
	else if( title == "2")
		document.write("Wireless-G Broadband Router with SpeedBooster");
	else if( title == "3")
	//	document.write("Wireless-G Media Storage Link Router with SpeedBooster");
		document.write("Wireless-N Broadband Router");
	else if( title == "4")
		document.write("Wireless-N Broadband Router with SpeedBooster");
	else if( title == "5")
	//	document.write("Dual-Band Wireless-N Gigabit Router with Storage Link");
		document.write("Wireless-N Home Router");
	else if( title == "6")
	//	document.write("Linksys E3000");
		document.write("Wireless-N Gigabit Router");
	else if( title == "7")
		document.write("Dual-Band Wireless-N Gigabit Router");
	else if( title == "8")
		document.write("Cisco M20");
	else if( title == "9")
		document.write("Cisco M10");
	else if( title == "10")
		document.write("Linksys E1000");
	else if( title == "11")
		document.write("Cisco M10");
	else if( title == "12")
		document.write("Linksys E1000");
}	
function is_lanip(type,ip)
{
	var lan_ip = '192.168.1.1';

	if(type == IP_FULL) {
		if(lan_ip == ip)
			return true;
		else
			return false;
	}
	else if(type == IP_LAST) {
		var num = new Array();

		num = lan_ip.split('.');

		if(num[3] == ip)
			return true;
		else
			return false;
	}
}
function valid_email(I)
{
	var match = 0;

	for(i=0 ; i<I.value.length; i++){
		ch = I.value.charAt(i);
		if(ch == '@'){
			match = 1;
			break;
		}
	}
	if(match == 0 || (match == 1 && i == 0) || (match == 1 && i == I.value.length-1)) {
		//alert("Illegal E-mail Format!");
		alert("Illegal E-mail Format!");
		I.value = I.defaultValue;	
		return false;
	}
	else
		return true;
}

function valid_domainname(I)
{
	var match = 0;
	var i;
	
	isascii(I,"");

	for(i=0 ; i<I.value.length; i++){
		ch = I.value.charAt(i);
		if(ch == '@' || ch == ' '){
			match = 1;
			break;
		}
	}
	if(match == 1) {
		alert("Illegal value");
		I.value = I.defaultValue;	
		return false;
	}
	else
		return true;
}

function IsEmpty(aText)
{
    if ( (aText.value.length==0) || (aText.value==null))
    {
        return true ; 
    }
    else
    {
        return false ; 
    }
}

function check_addr(data) // ita add it 
{
	var data_A = new Array();
	var len = data.split(" ").length;
	var b,data;
	data_A = data.split(" ");
	for( var a=0 ; a < len ; a++){
		for( b=a+1 ; b < len ; b++ ){
			if((data_A[a]!='0,0,both,0')&&(data_A[b]!='0,0,both,0')&&(data_A[a]==data_A[b])){
				//alert("data_A["+a+"]="+data_A[a]+"  data_A["+b+"]="+data_A[b]);
				alert("The Input value already exists.");
				return false;
			}	
		}
	}
}

function check_LAN_IP(I, start, end, M, flag)
{
	var lan_ipaddr = '1';
	valid_range(I, start, end, M);
	M1 = unescape(M);
        isdigit(I,M1);
	d = parseInt(I.value, 10);
	if (flag == 1){
		if(lan_ipaddr == d){
			alert("You cannot use the Router IP, network or broadcast address.");
			I.value = I.defaultValue;
			return false;
		}
	}
}//ita add end

//var data = new Array();
//msplit(":0:br0",data,"");
function msplit(keyword,arr,str)
{
	var i=0 , pos=0 ; 
	while(1)
	{
		pos = str.indexOf(keyword);
		if ( pos!=-1 )
		{
			arr[i]=str.substring(0,pos);
			str = str.substring(parseInt(pos+keyword.length),str.length);
			i++;
		}
		else
			break;
	}
}

function trans16to2(data)
{
        var str = new Array("A","B","C","D","E","F");
        var num = new Array(10,11,12,13,14,15);
        var sd = new Array(0,0,0,0);
        var i,x,y;
        if(data < '0' || data > '9')
        {
                data = data.toUpperCase();
                for(i=0; i<str.length; i++)
                {
                        if ( data.indexOf(str[i])!=-1 )
                        {
                                data = num[i];
                                break;
                        }
                }
        }
        for(i=3; i>=0; i--)
        {
                sd[i] = parseInt(data%2);
                data = parseInt(data/2);
        }
        return sd;
}

function trans2to10(data)
{
        var num=0,i,j;
        for(i=0; i<8; i++)
        {
                j = 7-i;
                num = num + parseInt(data.charAt(j))*(1<<i);
        }
        return num ;
}

// 00000001|00000000|01011110|0
// 01:00:5e:00~01:00:5e:7f
//    1    |    0   |   94   | 0~127
function check_multicast_mac(data)
{
        var mac_arr = new Array("0000","0001","0000","0000","0101","1110");
        var nmac = new Array();
        var imac = new Array();
        var i,j,k=0,range="";
	if ( data.length == 17 )
	{
		nmac = data.split(":");
	        for(i=0; i<6; i++)
        	{
	                for(j=0; j<2; j++)
        	        {
                        	imac[k] = trans16to2(nmac[i].charAt(j));
                	        k++;
	                }
        	}
	}
	else if ( data.length == 12 ) 
	{
		for(i=0; i<12; i++)
		{
        	        imac[k] = trans16to2(data.charAt(i));
			k++;
		}
	}
	else 
		return false;
        for(i=0; i<6; i++)
        {
                for(j=0; j<4; j++)
		{
                        if ( mac_arr[i].charAt(j) != imac[i][j] ) return false ;
		}
        }
        for(i=6; i<8; i++)
        {
                for(j=0; j<4; j++)
		{
                        range = range + imac[i][j] ;
		}
        }
        range = trans2to10(range);
        if ( range <= 127 )
        {
                alert("You can't use the multicast MAC address.");
                return true ;
        }
        return false ;
}

function string_break(len,src)
{
	var i ,dst="" ; 
	while(src.length)
	{
                if(src.length <= len)
                {
                        dst = dst + src;
                        return dst;
                }
                var breakpoint = src.lastIndexOf(" ", len);
                var breakpoint2 = src.lastIndexOf(":", len);
                if(breakpoint == breakpoint2) // One case only: breakpoint = breakpoint2 = -1
                {  // Break forcely since there is no proper breakpoint
                        breakpoint = len;
                }
                else if((breakpoint == -1 && breakpoint2 != -1)
                        ||(breakpoint2 != -1 && breakpoint2 > breakpoint))
                {  // ":" is the more proper breakpoint
                        breakpoint = breakpoint2;
                        breakpoint = breakpoint + 1; // the charater ":" should be located on the pervious line
                }
                else
                {  // " " is the breakpoint
                        breakpoint = breakpoint + 1; // the charater " " should be located on the pervious line
                }
                dst = dst + src.substring(0,breakpoint)+"<BR>";
		src = src.substring(breakpoint,src.length);
	}

	return dst ; 
}

//check ping ip or URL Fixed 04/16/2007
function check_char(obj) 
{ 
   	for(i = 0; i < obj.length; i++)
	{
	    ch = obj.charAt(i);
	    
	    if(ch.search(/^[A-Za-z0-9-]/i) == -1)
		    return true;
	}
   return false;
} 

function check_ip_domain(value)
{
	var count = 0;
	var flag = 2;

   	for(i = 0; i < value.length; i++)
	{
	    	ch = value.charAt(i);
	    	if(ch == '.')
	        	count++;
	    	if(count > 3)
	        	flag = false;
	    	else if(ch.search(/^[0-9.]/i) == -1)
   			flag = true; 
	}

	if(flag == true)
		return check_domain(value);
	else if(flag == false)
	    	return false;
		
    if(check_ip(value))
     	return true;
    else
    	return false;
    
}

function check_domain( domain_main)
{
    var sub_name;
    var temp_firstchar;
    var temp_endchar;    

    if ( (domain_main.length==0) || (domain_main==null) || (domain_main.length > 256))
    	return false;
    else
    {
        temp_firstchar = domain_main.charAt(0);
        temp_endchar = domain_main.charAt(domain_main.length-1);
        
        if((temp_firstchar.search(/^[A-Za-z0-9]/i) == -1) ||
            (temp_endchar.search(/^[A-Za-z0-9]/i) == -1))
           return false;
    }
    
    sub_name = domain_main.split(/\./);  
    
    if(sub_name.length < 2)	// Support google.com
  	return false;
    		
    for(var i = 0; i < sub_name.length; i++)
    {
	if((sub_name[i].length > 0) && (sub_name[i].length < 2) || (sub_name[i].length > 63))
    		return false;
      	else if(check_char(sub_name[i]))
      		return false;
     }
  
    return true;

}

function check_ip(ip_addr)
{
    var sub_ip;
    var host_id;

    if (ip_addr.search(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/) == -1)
        return false;

    sub_ip = ip_addr.split(/\./);   
    if ((sub_ip[0]>0xff || sub_ip[1]>0xff || sub_ip[2]>0xff || sub_ip[3]>0xff)||
	(sub_ip[0]==0 && sub_ip[1]==0 && sub_ip[2] ==0 && sub_ip[3]==0)||
	(sub_ip[0]==0xff && sub_ip[1]==0xff && sub_ip[2] ==0xff && sub_ip[3]==0xff))
	return false;  

    if(sub_ip[0] == 0 || sub_ip[3] == 0)
	return false;
        
    if(sub_ip[0] < 128) /* A class */
    {
        host_id = sub_ip[1] * 0x10000 + sub_ip[2] * 0x100 + sub_ip[3] * 0x1;

        if(host_id == 0 || host_id == 0xffffff)
            return false;
    }
    else if(sub_ip[0] < 192) /* B class */
    {
        host_id = sub_ip[2] * 0x100 + sub_ip[3] * 0x1; 
 
        if(host_id == 0 || host_id == 0xffff)
            return false;           
    }
    else if(sub_ip[0] < 224) /* C class */
    {
        host_id = sub_ip[3] * 0x1;
 
        if(host_id == 0 || host_id == 0xff)
            return false;             
    }
    else  /* Limit broadcast, Multicast net */
    {
        return false;                                         
    }    
    return true;
}

function swap_num(num1,num2)
{
    var num_array = new Array(); 
    num_array[0] = num2;
    num_array[1] = num1;
    return num_array;
}



function check_port(i_startport,i_endport,o_startport,o_endport)
{
  var num_array = new Array(); 
  if(i_startport > i_endport)
  {
    num_array = swap_num(i_startport,i_endport);
    i_startport = num_array[0];
    i_endport = num_array[1];
  }
  
  if(o_startport > o_endport)
  {
    num_array = swap_num(o_startport,o_endport);
    o_startport = num_array[0];
    o_endport = num_array[1];
  }
  
  if((i_startport <= o_startport) && (i_endport >= o_endport))
    return false;  
  else if((i_startport >= o_startport) && (i_startport <= o_endport) && (i_endport >= o_endport))
    return false;  
  else if((i_endport >= o_startport) && (i_endport <= o_endport))
    return false;  
  else if((i_startport >= o_startport) && (i_endport <= o_endport))
    return false;  
  else if((i_startport == o_endport) || (i_endport == o_startport) || (i_endport == o_endport))
    return false;  

  return true;
}

function draw_table(is_mfun,ntitle)
{
	var HLINK = "<a class=AU target=_blank href="+HELPPATH+Menu[SelectItemIdx][SelectSubItem][DHELP]+">"+"Help"+"...</a>";
	if ( is_mfun == MAINFUN ) 
		document.write("<TD class=TITLE1 colspan=2>"+ntitle+"</TD><TD colspan=2 class=FUNNAME1></TD>");
	else if ( is_mfun == MAINFUN1 ) 
		document.write("<TD class=TITLE1 colspan=2>"+ntitle+"</TD><TD colspan=2></TD>");
	else if ( is_mfun == SUBFUN ) 
		document.write("<TD class=TITLE2>"+ntitle+"</TD><TD class=TITLE_IMG></TD>");
	else if ( is_mfun == ISHR ) 
		document.write("<TD class=TITLE2></TD><TD class=TITLE_IMG></TD><TD class=FUNNAME1 colspan=2><HR></TD>");
	else if ( is_mfun == ISHR1 ) 
		document.write("<TD class=TITLE2></TD><TD class=TITLE_IMG></TD><TD colspan=2 class=FUNNAME3><HR></TD>");
	else if ( is_mfun == ISHRS ) 
		document.write("<TD class=TITLE2></TD><TD class=TITLE_IMG></TD><TD class=FUNNAME1 colspan=2><HR class=HR_S></TD>");
	else if ( is_mfun == ISBLANK ) 
		document.write("<TD class=TITLE2></TD><TD class=TITLE_IMG></TD><TD class=FUNNAME1 colspan=2>&nbsp;</TD>");
	else if ( is_mfun == ISBLANK1 ) 
		document.write("<TD class=TITLE2></TD><TD class=TITLE_IMG></TD><TD colspan=2>&nbsp;</TD>");
	else if ( is_mfun == ISTAIL ) 
		document.write("<TD class=TITLE2></TD><TD class=TITLE_IMG></TD><TD class=FUNNAME1 colspan=2></TD><TD class=HELP4></TD><TD class=HELP3 rowspan=2></TD>");
	else if ( is_mfun == ISHELP_TAIL ) 
		document.write("<TD class=HELP2></TD><TD class=HELP3 rowspan=2></TD>");
	else if ( is_mfun == ISHELP_LINK ) 
		document.write(HLINK);
	else if ( is_mfun == ISHELP ) 
		document.write("<TD class=HELP></TD><TD class=HELP1><p class=HELP_P>"+HLINK+"</p></TD>");
	else if ( is_mfun == NOHELP ) 
		document.write("<TD class=HELP></TD><TD class=HELP1><p class=HELP_P></p></TD>");
		
}

function draw_bottom(link,name)
{
	if ( name == "Cancel Changes") 
		document.write("<A id=divBT0 class=BOTTON href=javascript:document.location.reload(true)>"+"Cancel Changes"+"</A>");
	else if ( name == "Save Settings" ) 
		document.write("<A id=divBT1 class=BOTTON href=javascript:to_submit(document.forms[0])>"+"Save Settings"+"</A>");
	else
		document.write("<A class=BOTTON href="+link+">"+name+"</A>");
}

function chk_multi_port(F,count,starti,xfrom,xto,xport,xip)
{
	var i,j;
	var flg = true ; 
	for(i=0; i<count; i++)
	{
		for(j=i+1; j<count; j++)
		{
			if ( eval(xfrom+parseInt(starti+i)+".value") == 0  || eval(xto+parseInt(starti+i)+".value") == 0 ) 
			continue;
			      //It should be allowed in case where "the internal ports
			      //port and IP address are different the internal ports
			      //are the same" in single Port Forwarding setting.	
		  	if ( (( eval(xport+parseInt(starti+i)+".value") ==  eval(xport+parseInt(starti+j)+".value")) ||
                             ( eval(xport+parseInt(starti+i)+".value") == "both") ||
			     ( eval(xport+parseInt(starti+j)+".value") == "both")) && 
			     ( eval(xip+parseInt(starti+i)+".value") == eval(xip+parseInt(starti+j)+".value")) )
			{
				if((eval(xfrom+parseInt(starti+i)+".value") == eval(xfrom+parseInt(starti+j)+".value"))
				|| (eval(xto+parseInt(starti+i)+".value") == eval(xto+parseInt(starti+j)+".value")))
				{
					flg = false ; 
					break;
				}
			}
		}
		if ( flg == false ) break ; 
	}
	if ( flg == false ) alert( "The Port range already exists." ) ; 
	return flg ;
}

function transfun(str1)
{
	var i , j , flg ; 
	var arr="";	
	var spec = new Array (
		new Array ("<","&lt;"),
		new Array (">","&gt;"),
		new Array ("\"","&quot;"),
		new Array ("$","&#036;")
	) ; 
	for ( i=0; i<str1.length; i++)
	{
		flg = -1 ; 
		for ( j=0; j<spec.length; j++ )
		{
			if ( str1.charAt(i) == spec[j][0] ) 			
			{
				flg = j ; 
				break ; 
			}
		}
		if ( flg != -1 ) 
			arr += spec[flg][1] ; 
		else
			arr += str1.charAt(i);
			
	}
	return arr;
}

function count_td_size(s1,cnt,flg)
{
	r2 = parseInt((SFUN-s1)/cnt);
	r1 = s1+(parseInt((SFUN-s1)%cnt));
	if ( flg == 0 ) return r1 ; 
	else return r2; 
	
}
function DISABLE_ALL(flg,F)
{
	var len,i,bt;
	len = F.elements.length;
	if ( flg == true ) 
	{
		document.getElementById("divBT0").removeAttribute("href");
		document.getElementById("divBT1").removeAttribute("href");
	}
	for(i=0; i<len; i++)
	{
		F.elements[i].disabled = flg ; 
	}
}

function DHCP_IP_RANGE(F,submask,lanip3)
{
	var mask = new Array();
	var lainip3,iplen,iprange,i,st,et;
		
	mask = submask.split(".");
	iprange = 256 - parseInt(mask[3]);
	iplen = 256/iprange;
	MAX_RANGE_COUNT = iprange-3 ; 
        
	if ( iprange > 50 ) 
		RANGE_COUNT = 50;
	else
		RANGE_COUNT = iprange - 3 ; 
	
	for(i=0; i<iplen; i++)
	{
		if( iplen == 1 && lanip3 == 1 ) 
		{
			DHCP_START_IP[0] = "100" ;
			DHCP_END_IP[0] = parseInt(DHCP_START_IP[0])+parseInt(RANGE_COUNT)-1;
			RANGE_SET = 1 ; 
			return true ; 
		}
		else
	        {
			// IP set
			st = i*iprange ; 
			et = ((i+1)*iprange)-1;

			if ( lanip3 == st ) // dhcp start ip = router lan ip 
			{
				RANGE_SET = -1 ; 
				return "The Router IP address equals to the subnet address. Please correct it." ; 			
			}
			if ( lanip3 == et ) // dhcp end ip = router lan ip
			{
				RANGE_SET = 0 ; 
				return "The Router IP address equals to the subnet broadcast. Please correct it." ;  
			}
			if (( parseInt(st) < parseInt(lanip3) ) && ( parseInt(lanip3) < parseInt(et) ))
			{
				st = st + 1 ; //It cannot be the network IP
				if ( st == lanip3 ) 
				{
					DHCP_START_IP[0] = st+1;
					DHCP_END_IP[0] = parseInt(DHCP_START_IP[0])+parseInt(RANGE_COUNT)-1;
					RANGE_SET = 1 ;
					return true ; 
				}
				else
				{
					if ( lanip3 - st >= RANGE_COUNT ) 
					{
						DHCP_START_IP[0] = st ; 
						DHCP_END_IP[0] = parseInt(DHCP_START_IP[0]) + parseInt(RANGE_COUNT) -1 ; 
						RANGE_SET = 1; 
					}
					else
					{
						DHCP_START_IP[0] = st ; 
						DHCP_END_IP[0] = parseInt(lanip3)-1;
						DHCP_START_IP[1] = parseInt(lanip3)+1;
						DHCP_END_IP[1] = parseInt(DHCP_START_IP[1])+parseInt(RANGE_COUNT)-(parseInt(DHCP_END_IP[0])-parseInt(DHCP_START_IP[0]))-2;
						RANGE_SET = 2 ; 
						return true; 
					}
				}
			}
		}	
	}		
	return false ; 
}

function on_the_range(start, I, end)	// Gavin.Ke 2008/10/31
{
	var s = parseInt(start, 10);
	var i = parseInt(I, 10);
	var e = parseInt(end, 10);
	
	if ( s <= i && i <= e )
		return true;
	
	return false;
}

function chan(s)
{
        return window.location.href = s + '.html';
}