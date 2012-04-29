/*********1*********2*********3*********4*********5
**************************************************/
var MAINFUN 	= 0; 
var SUBFUN 	= 1;
var ISHR 	= 2; 
var ISHRS 	= 3; 
var ISBLANK 	= 4; 
var ISTAIL 	= 5;
var ISHELP_TAIL = 6; 
var ISHELP_LINK = 7;
var ISHELP      = 8;
var MAINFUN1 	= 9; 
var ISHR1 	= 10; 
var ISBLANK1 	= 11; 
var SelectItemIdx = 0;
var SelectSubItem = 0;
var DNAME = 0; 
var DLINK = 1; 
var DHELP = 2; 
var DMAIN = 3;
var WFUN = 645; // fun width
var SFUN = 400;
/*
var HELPPATH = "help/EN_help/";
*/

var HELPPATH = "help/EN_help/";

HELPPATH = HELPPATH.toLowerCase();
	
var Menu = new Array(
		new Array(
			new Array("Basic Setup",  "index.html",  "HSetup.html","Setup"),
			new Array("DDNS",	       "DDNS.html",   "HDDNS.html"),
			new Array("MAC Address Clone","WanMAC.html", "HMAC.html" ),
			new Array("Advanced Routing",  "Routing.html","HRouting.html" )
/*
			,
			new Array("Hot Spot",	       "HotSpot_Admin.html" , "")
*/
		),
		new Array(
			new Array("Basic Wireless Settings",   "Wireless_Basic.html",   "HWireless.html","Wireless"),
			new Array("Wireless Security",   "WL_WPATable.html",      "HWPA.html"),
			new Array("Wireless MAC Filter",  "Wireless_MAC.html",     "HWireless_MAC.html"),
			new Array("Advanced Wireless Settings","Wireless_Advanced.html","HWireless_Advanced.html")
		),
		new Array(
	                new Array("Firewall" ,     "Firewall.html" ,"HFirewall.html" ,"Security"),
			new Array("VPN Passthrough","VPN.html"      ,"HVPN.html")
		),
//		new Array(
//                        new Array("Internet Access Policy","Filters.html","HFilters.html","Access Restrictions")
//		),
				new Array
		(
			new Array("Internet Access Policy","Filters.html","HFilters.html","Access Restrictions")
		),

		new Array(

			new Array("Single Port Forwarding","SingleForward.html","HForward_Single.html", "Applications"+"  & "+"Gaming"),

			new Array("Port Range Forwarding", "Forward.html",	    "HForward.html")
,
			new Array("Port Range Triggering",	"Triggering.html",   "HTrigger.html")

/*
		        new Array("UPnP Forward",       "Forward_UPnP.html", "")
*/
			,
			new Array("DMZ",		"DMZ.html",	    "HDMZ.html")
,
			new Array("QoS",		"QoS.html",	    "HQoS.html")

		),
		new Array(
			new Array("Management", "Management.html",      "HManagement.html", "Administration"),
			new Array("Log",	 "Log.html",	       "HLog.html"),
			new Array("Diagnostics",	 "Diagnostics.html",     "HDiag.html"),
			new Array("Factory Defaults", "Factory_Defaults.html","HDefault.html"),
			new Array("Firmware Upgrade","Upgrade.html"	      ,"HUpgrade.html")
		),
		/*new Array(
			new Array("PPTP Server",	"pptp_server.html",	"",	"Server"),
			new Array("L2TP Server",	"l2tp_server.html",	""),
			new Array("PPPoE Server",	"pppoe_server.html",	"")
		),*/
		new Array(
			new Array("Router",        "Status_Router.html",     "HStatus.html", "Status"),
			new Array("Local Network", "Status_Lan.html",        "HStatus_Lan.html"),
			new Array("Wireless Network",   "Status_Wireless.html",   "HStatus_Wireless.html")
/*
			,
			new Array("System Performance","Status_Performance.html","")
*/
		)
	);
function getpos(surl)
{
   var i,j;
   for(i=0; i<Menu.length; i++)
   {
        for (j=0; j<Menu[i].length; j++)
        {
            if ( surl == Menu[i][j][DLINK] )
            {
                      SelectItemIdx = i ;
                      SelectSubItem = j ;
                      break;
            }
        }	
   }
   if ( SelectItemIdx == -1 &&  surl == "default.html" )
   {
        SelectItemIdx = 0 ;
        SelectSubItem = 0 ;
   }
}
//-----------------CHECK POSITION--------------------
//var NOWPATH = window.location.href.match(/\/([^\?/]*)(\?|$)/)[1];
//getpos(NOWPATH);
//alert("SelectItemIdx="+SelectItemIdx+";SelectSubItem="+SelectSubItem);
//-----------------END OF CHECK POSITION--------------------
