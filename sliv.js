


// global variables
var map, marker, unitslist = [],marshruts = [], unitMarkers = [], markerByUnit = {},tile_layer, layers = {};
var areUnitsLoaded = false;
var marshrutID=99;
var pointsliv=0;

// for refreshing
var currentPos = null, currentUnit = null;

var isUIActive = true;

  var cur_day111 = new Date();
	
var month = cur_day111.getMonth()+1;   
var from111 = cur_day111.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + cur_day111.getDate()+ ' 00:00';


$('#fromtime').val(from111);






// Unit markers constructor
function getUnitMarker(unit) {
  // check for already created marker
  var marker = markerByUnit[unit.getId()];
  if (marker) return marker;
    
  var unitPos = unit.getPosition();
  
  if (!unitPos) return null;
    
  marker = L.marker([unitPos.y, unitPos.x], {
    clickable: true,
    draggable: true,
    icon: L.icon({
      iconUrl: unit.getIconUrl(28),
      iconAnchor: [14, 14] // set icon center
    })
  });
   marker.bindPopup(unit.getName());


  // save marker for access from filtering by distance
  unitMarkers.push(marker);
  markerByUnit[unit.getId()] = marker;
  return marker;
}



// Print message to log
function msg(text) { $('#log').prepend(text + '<br/>'); }




function init() { // Execute after login succeed
  // get instance of current Session
  var session = wialon.core.Session.getInstance();
  // specify what kind of data should be returned
  var flags = wialon.item.Item.dataFlag.base | wialon.item.Unit.dataFlag.lastPosition;
  var res_flags = wialon.item.Item.dataFlag.base | wialon.item.Resource.dataFlag.reports | wialon.item.Resource.dataFlag.zones;  
 
	var remote= wialon.core.Remote.getInstance();
  remote.remoteCall('render/set_locale',{"tzOffset":7200,"language":'ru',"formatDate":'%Y-%m-%E %H:%M:%S'});
  session.loadLibrary("resourceZones"); // load Geofences Library 
  session.loadLibrary("resourceReports"); // load Reports Library

  // load Icon Library
  session.loadLibrary('itemIcon');
  
        
  session.updateDataFlags( // load items to current session
		[{type: 'type', data: 'avl_resource', flags:res_flags , mode: 0}, // 'avl_resource's specification
		 {type: 'type', data: 'avl_unit', flags: flags, mode: 0}], // 'avl_unit's specification
	function (error) { // updateDataFlags callback     
        
      if (error) {
        // show error, if update data flags was failed
        msg(wialon.core.Errors.getErrorText(error));
      } else {
        areUnitsLoaded = true;
        msg('Техніка завнтажена - успішно');
        
        // add received data to the UI, setup UI events
        initUIData();
      }
    }
  );
}




// will be called after updateDataFlags success

function initUIData() {
  var session = wialon.core.Session.getInstance();

  var resource = wialon.core.Session.getInstance().getItem(20030);
  
  resource.getZonesData(null, function(code, geofences) {
    var cord=[];
      for (let i = 0; i < geofences.length; i++) {
        cord=[];
         var zone = geofences[i];
         var color = "#" + wialon.util.String.sprintf("%08x", zone.c).substr(2);
           for (let ii = 0; ii < zone.p.length; ii++) {
            cord.push([zone.p[ii].y , zone.p[ii].x])
           }
           var geozona =  L.polygon([cord], {color: '#FF00FF', stroke: true,weight: 1, opacity: 0.4, fillOpacity: 0.5, fillColor: color});
           geozona.bindPopup(zone.n);
           geozona.addTo(map);


      }
  
    
  });

  var units = session.getItems('avl_unit');
  units.forEach(function(unit) {          
    var unitMarker = getUnitMarker(unit);
    if (unitMarker) unitMarker.addTo(map);
    
         unitslist.push(unit);
    // listen for new messages
  });
  






   $('#gooo').click(Cikle);
   $('#goooo').click(fn_copy);
   $("#marshrut").on("click", ".shov_graf", show_gr);
   $("#marshrut1").on("click", ".poruch", point_on_map);
   $('#cler').click(fn_clear);
   $('#load').click(fn_load);
   $('#v1').click(result);
    $('#v2').click(result);
     $('#v3').click(result);
      $('#v5').click(result);
       $('#v6').click(result);
        $('#v7').click(result);
         $('#v8').click(result);
}




function initMap() {
  
  // create a map in the "map" div, set the view to a given place and zoom
  map = L.map('map', {
    // disable zooming, because we will use double-click to set up marker
    doubleClickZoom: false
  }).setView([51.62995, 33.64288], 9);

  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    // copyrights
    //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="http://gurtam.com">Gurtam</a>'
  }).addTo(map);





 
    
   
  
     pointsliv = L.marker([0, 0], {
      zIndexOffset: -1 // show topmost
    });
   
    pointsliv.addTo(map);
 
}


eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('o 5=\'a\';$(b).c(4(){2.1.7.6().d("e://f.9.h.i");2.1.7.6().g(5,"",4(0){k(0){3(2.1.l.m(0));n}3(\'ÐÐµÐ´Ð½Ð°Ð½Ð½Ñ Ð· ÐÐ»ÑÑÑÐ² - ÑÑÐ¿ÑÑÐ½Ð¾\');j();8()})});',25,25,'code|core|wialon|msg|function|TOKEN|getInstance|Session|init|ingps|0999946a10477f4854a9e6f27fcbe842B1E026E8149FEFC9299616AD8504CB361573CD5E|document|ready|initSession|https|local3|loginToken|com|ua|initMap|if|Errors|getErrorText|return|var'.split('|'),0,{}))

var icl =0;
var idun=0;
var time1 = 0;
function Cikle(){
  if(icl==0){msg('ЗАЧЕКАЙТЕ -завантаження зливів до таблиці');}
 $('#gooo').prop("disabled", true);
   
   if(icl< unitslist.length){
    msg(unitslist.length-icl);
     idun = unitslist[icl];
     
     executeReport(idun);
    }else{
    icl=-1;
    $('#gooo').prop("disabled", false);
    msg('ЗАВЕРШЕНО -завантаження зливів до таблиці');
    }
icl+=1;

       
	         
           

}
function executeReport(id){ // execute selected report
    // get data from corresponding fields
	var id_res=26227, id_templ=6, id_unit=id.getId(), time=60*60*4, idddd=id;
	var sess = wialon.core.Session.getInstance(); // get instance of current Session
	var res = sess.getItem(id_res); // get resource by id
	var to = sess.getServerTime(); // get current server time (end time of report time interval)

	var from = Date.parse($('#fromtime').val())/1000;
	// specify time interval object
	var interval = { "from": from, "to": to, "flags": wialon.item.MReport.intervalFlag.absolute };  
	var template = res.getReport(id_templ); // get report template by id


 
 
	res.execReport(template, id_unit, 0, interval, // execute selected report
		function(code, data) { // execReport template
			
            
       
		 	if(code){ msg(wialon.core.Errors.getErrorText(code)); return; } // exit if error code
			if(!data.getTables().length){ // exit if no tables obtained
				  Cikle(); return; }
			else showReportResult(data,idddd); // show report result
      
	});


}
var data_grup = [];
function showReportResult(result,idd){ // show result after report execute
	
    
    var tables = result.getTables(); // get report tables
	if (!tables) return; // exit if no tables
	for(var i=0; i < tables.length; i++){ // cycle on tables
		// html contains information about one table
		var html = 0; 
    var iii = 0;

	
		result.getTableRows(i, 0, tables[i].rows, // get Table rows
			qx.lang.Function.bind( function(html, code, rows) { // getTableRows callback
				if (code) {msg(wialon.core.Errors.getErrorText(code)); return;} // exit if error code
				for(var j in rows) { // cycle on table rows
					if (typeof rows[j].c == "undefined") continue; // skip empty rows
					
          
            time1=getTableValue(rows[j].c[0]);
           for (var i = 0; i < data_grup.length; i++) {
	                if(idd.getName()==data_grup[i][1] && time1==data_grup[i][2]){
                  time1=99;
                  break;
                  } 
              }
              if(idd.getName()=='ДРП ККЗ'|| idd.getName()=='ДРП Райгородок'|| idd.getName()=='Бензин ККЗ Ультразвук'){
                  time1=99;
                  }  
          if(time1!=99){
          data_grup.push([idd.getId(),idd.getName(),getTableValue(rows[j].c[0]),getTableValue(rows[j].c[1]),getTableValue(rows[j].c[2]),getTableValue(rows[j].c[3]),getTableValue(rows[j].c[4]),'']);
            html = 0; 
            html += "<tr bgcolor='#CEFFCE'>"; // open table row
            html += "<td class='shov_graf' id="+data_grup[data_grup.length-1][0]+">" + data_grup[data_grup.length-1][1] + "</td>";
            html += "<td>" + data_grup[data_grup.length-1][2] + "</td>";
            html += "<td>" + data_grup[data_grup.length-1][3] + "</td>";
            html += "<td>" + data_grup[data_grup.length-1][4] + "</td>";
            html += "<td>" + data_grup[data_grup.length-1][5] + "</td>";
            html += "<td> </td>"; 
					  html += "</tr>";// close table row
            
          $("#marshrut").append(html);
          
         
           
          }
          
       
        }
		

        Cikle();
			}, this, html)
		);
	}
  
}
function getTableValue(data) { // calculate ceil value
	if (typeof data == "object")
		if (typeof data.t == "string") return data.t; else return "";
	else return data;
}

var slivtime0=0;
var slivtime1=0;
var slivtime2=0;
var slivtime3=0;
var roooow=0;
//$('#roww').hide();
//$('#grafik').hide();
function show_gr(evt) {
  

	var row = evt.target.parentNode; // get row with data by target parentNode
  roooow = evt;
  
  
  var i = row.rowIndex;
  var tim1 = Date.parse(data_grup[i][2])/1000-60*60*8;
  var tim2 = Date.parse(data_grup[i][6])/1000+60*60*3;
     slivtime0 =  Date.parse(data_grup[i][2]);
     slivtime1 =  Date.parse(data_grup[i][6]);
     slivtime2 = slivtime0-60*5*1000;
     slivtime3 = slivtime1+60*15*1000;
  var id=data_grup[i][0];
     
       $('#marshrut1').empty();
   var html=0;
            html += "<tr>"; // open table row
            html += "<td>" + data_grup[i][1] + "</td>";
            html += "<td>" + data_grup[i][2] + "</td>";
            html += "<td>" + data_grup[i][3] + "</td>";
            html += "<td>" + data_grup[i][4] + "</td>";
            html += "<td>" + data_grup[i][5] + "</td>";
            html += "<td>" + data_grup[i][7] + "</td>";
            html += "<td class='poruch' bgcolor='#ffba00'>хто був поруч на мапі</td>";
					  html += "</tr>";// close table row
          
          $("#marshrut1").append(html);
 
 
if($('#gooo').prop("disabled")==false){
//$('#roww').show();
//$('#grafik').show();
row.style.backgroundColor = "transparent";
executeReport2(id,tim1,tim2);

}
 
  
}

function executeReport2(id,t1,t2){ // execute selected report
    // get data from corresponding fields
	var id_res=26227, id_templ=7, id_unit=id;
	var sess = wialon.core.Session.getInstance(); // get instance of current Session
	var res = sess.getItem(id_res); // get resource by id
		var to = t2; // get current server time (end time of report time interval)
  var cur_day = new Date();
	//var from = Math.round(new Date(cur_day.getFullYear(), cur_day.getMonth(), cur_day.getDate()) / 1000);
var from = t1;

  
  // calculate start time of report
	// specify time interval object
	var interval = { "from": from, "to": to, "flags": wialon.item.MReport.intervalFlag.absolute };  
	var template = res.getReport(id_templ); // get report template by id


 
 
	res.execReport(template, id_unit, 0, interval, // execute selected report
		function(code, data) { // execReport template
			
         
       
		 	if(code){ msg(wialon.core.Errors.getErrorText(code)); return; } // exit if error code
			if(!data.getTables().length){ // exit if no tables obtained
				   return; }
			else showReportResult2(data); // show report result
      
	});


}
var data_unit = [];
function showReportResult2(result){ // show result after report execute
  
	var tables = result.getTables(); // get report tables
	if (!tables) return; // exit if no tables
	for(var i=0; i < tables.length; i++){ // cycle on tables
		// html contains information about one table
		var html = [];
    var it = 0;
      var litry=0;
      var headers = tables[i].header; // get table headers
       for (var j=4; j<headers.length; j++) {if (headers[j].indexOf('Топливо')>=0 || headers[j].indexOf('Паливо')>=0){it=j;}}
   
		var iii = 0;
		 data_unit.length = 0;
		
		result.getTableRows(i, 0, tables[i].rows, // get Table rows
			qx.lang.Function.bind( function(html, code, rows) { // getTableRows callback
				if (code) {msg(wialon.core.Errors.getErrorText(code)); return;} // exit if error code
				for(var j in rows) { // cycle on table rows
					if (typeof rows[j].c == "undefined") continue; // skip empty rows
				  litry=0;
            if (it>0) litry=getTableValue(rows[j].c[it]); 

          data_unit[iii]=[getTableValue(rows[j].c[0]),getTableValue(rows[j].c[1]),litry,getTableValue(rows[j].c[2])];
         
          iii+=1;
				 

				}
				
			drawChart();
			}, this, html)
		);
	
  }
 
}



 // Load the Visualization API and the corechart package.
       google.charts.load('current', {packages:['corechart', 'table', 'gauge', 'controls']});

      // Set a callback to run when the Google Visualization API is loaded.
      //google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      var t1 = 0;
      var v1 = 0;
      
function drawChart() {


    var dashboard = new google.visualization.Dashboard(
        document.getElementById('grafik'));

    var control = new google.visualization.ControlWrapper({
      'controlType': 'ChartRangeFilter',
      'containerId': 'chart2',
      'options': {
        // Filter by the date axis.
        'filterColumnIndex': 0,
        'ui': {
          'chartType': 'LineChart',
          'chartOptions': {
            'chartArea': {'height': '100%','width': '95%'},
            'hAxis': {
            'baselineColor': 'none',
             gridlines: {
            count: -1,
            units: {
              hours: {format: ['HH:mm', 'ha']},
            }
          },
         

            
            }
          },
          // Display a single series that shows the closing value of the stock.
          // Thus, this view has two columns: the date (axis) and the stock value (line series).
          'chartView': {
            'columns': [0, 3]
          },
          // 1 day in milliseconds = 24 * 60 * 60 * 1000 = 86,400,000
          'minRangeSize': 100000
        }
      },
      // Initial range: 2012-02-09 to 2012-03-20.
      'state': {'range': {'start': new Date(slivtime2), 'end': new Date(slivtime3)}}
    });

    var chart = new google.visualization.ChartWrapper({
      'chartType': 'AreaChart',
      'containerId': 'chart1',
      'options': {
      colors: ['red', 'red', 'green'],
      'tooltip':{'textStyle':{'fontName': "Arial", 'fontSize': 13 }},

        // Use the same chart area width as the control for axis alignment.
        'chartArea': {'height': '100%', 'width': '95%'},
        'hAxis': {'slantedText': false, format: 'none'},
       
         


        pointSize: 1,
        dataOpacity: 0.5,
         series: {
                0: { areaOpacity: 0.1, },
                1: { areaOpacity: 0.1, },
                2: { areaOpacity: 0.1, }
            },

      lineWidth: 2,

        'legend': {'position': 'none'}
      },
      // Convert the first column from 'date' to 'string'.

    });

    

    
    
    var a=[];
    var data = new google.visualization.DataTable();
        data.addColumn('datetime', 'date');
         data.addColumn('number', 'speed');
        data.addColumn('number', 'coordinate');
        data.addColumn('number', 'stop');
        data.addColumn({'type': 'string', 'role': 'style'}); 
        data.addColumn({'type': 'string', 'role': 'tooltip'});
       
   for (var i = 2; i < data_unit.length-1; i++) {
    a[1]=null;
  if (data_unit[i][3]=='0 км/ч'){ a[1]=parseFloat(data_unit[i][2]);}
    a[2]=null;
    a[3]=parseFloat(data_unit[i][2]);  
    a[5]='стоїть\n'+data_unit[i][0]+'\n'+data_unit[i][1]+'\n'+data_unit[i][2];
    if (data_unit[i-1][0]!=data_unit[i][0]){ 
     
    a[5]='рухається\n'+data_unit[i][0]+'\n'+data_unit[i][1]+'\n'+data_unit[i][2];
    }
    

    var date = new Date(data_unit[i][1]);
    a[0]=date;
    a[4]=null;
    
    if (Date.parse(data_unit[i][1])>=slivtime0 && Date.parse(data_unit[i][1])<=slivtime1){ 
    a[4]='point { size: 3; shape-type: circle; fill-color: #FF0000; opacity: 1}';
    }
  
    if (Date.parse(data_unit[i][1])==slivtime0 ){ 
    
     
     
  
     
     var y = parseFloat(data_unit[i][0].split(',')[0]);
     var x = parseFloat(data_unit[i][0].split(',')[1]);

     pointsliv.setLatLng([y, x]);
      map.setView([y, x], 14);
     
    }
  
  
  
  
    data.addRows([a]);
    }
    
   
    
    
    
    
    dashboard.bind(control, chart);
    dashboard.draw(data);
    
    google.visualization.events.addListener(chart, 'select', selectHandler);

// The selection handler.
// Loop through all items in the selection and concatenate
// a single message from all of them.
function selectHandler() {
  var selection = dashboard.getSelection();
  
  
  if (selection.length >0) {
   var item = selection[0];
   if(t1==0){
    t1=data.getFormattedValue(item.row, 0);
    v1=data.getFormattedValue(item.row, 3);
    
   }else{
   
   var time=new Date(Math.abs(new Date(t1)-new Date(data.getFormattedValue(item.row, 0)))).toISOString().substr(11, 8);
   var val=Math.abs((parseFloat(v1.replace(",", ""))-parseFloat(data.getFormattedValue(item.row, 3).replace(",", ""))).toFixed(1));
   var sred =(val*60*60/ Math.abs(new Date(t1)-new Date(data.getFormattedValue(item.row, 0)))*1000).toFixed(1);
   
   alert("РІЗНИЦЯ МІЖ ДВОМА ТОЧКАМИ НА ГРАФІКУ"+"\n"+"Час:                                "+time+"\n"+"Літрів:                            "+val+"л"+"\n"+"Середня витрата:        "+sred+"л/год");
    t1=0;
    v1=0;
   }
   
  }
 
  
 
}



  }

function result() {
  
  
	var row = roooow.target.parentNode; // get row with data by target parentNode
  var i = row.rowIndex;
  if ($(this).attr("id")=='v1'){
  row.cells[5].innerText = 'перелив';
  document.getElementById('marshrut1').rows[0].cells[5].innerText= 'перелив';
  data_grup[i][7]='перелив';
  }
  if ($(this).attr("id")=='v2'){
  row.cells[5].innerText = 'злив у русі';
  document.getElementById('marshrut1').rows[0].cells[5].innerText= 'злив у русі';
  data_grup[i][7]='злив у русі';
  }
   if ($(this).attr("id")=='v3'){
  row.cells[5].innerText = 'витрата на холостому ході';
  document.getElementById('marshrut1').rows[0].cells[5].innerText= 'витрата на холостому ході';
  data_grup[i][7]='витрата на холостому ході';
  }
    if ($(this).attr("id")=='v5'){
  row.cells[5].innerText = $('#v4').val();
  document.getElementById('marshrut1').rows[0].cells[5].innerText= $('#v4').val();
  data_grup[i][7]=$('#v4').val();
  }
     if ($(this).attr("id")=='v6'){
  row.cells[5].innerText = 'фактичний рівень пального не змінився';
  document.getElementById('marshrut1').rows[0].cells[5].innerText= 'фактичний рівень пального не змінився';
  data_grup[i][7]='фактичний рівень пального не змінився';
  }
     if ($(this).attr("id")=='v7'){
  row.cells[5].innerText = 'рівень пального повернувся до норми';
  document.getElementById('marshrut1').rows[0].cells[5].innerText= 'рівень пального повернувся до норми';
  data_grup[i][7]='рівень пального повернувся до норми';
  }
     if ($(this).attr("id")=='v8'){
  row.cells[5].innerText = 'некоректна робота ДРП';
  document.getElementById('marshrut1').rows[0].cells[5].innerText= 'некоректна робота ДРП';
  data_grup[i][7]='некоректна робота ДРП';
  }

 


 localStorage.setItem('items', JSON.stringify(data_grup)); 
}

function fn_clear() {
localStorage.clear();


}
function fn_load() {
var svdata = JSON.parse(localStorage.getItem('items'));
if (svdata){
$('#marshrut').empty();
data_grup=svdata;
for (var i = 0; i < svdata.length; i++) {
 
   var html=0;
            html += "<tr>"; // open table row
            html += "<td class='shov_graf' id="+svdata[i][0]+">" + svdata[i][1] + "</td>";
            html += "<td>" + svdata[i][2] + "</td>";
            html += "<td>" + svdata[i][3] + "</td>";
            html += "<td>" + svdata[i][4] + "</td>";
            html += "<td>" + svdata[i][5] + "</td>";
            html += "<td>" + svdata[i][7] + "</td>"; 
					  html += "</tr>";// close table row
          
          $("#marshrut").append(html);
    }
   }
}
function fn_copy() {

var cpdata='';
    for (var i = 0; i < data_grup.length; i++) {
        cpdata += data_grup[i][1] + '\t' +data_grup[i][2] + '\t' +data_grup[i][3] + ' \t' + data_grup[i][4] + '\t' + data_grup[i][5] + '\t' + data_grup[i][7] + '\n'
       
    }

navigator.clipboard.writeText(cpdata);
 

msg("таблицю скопійовано в буфер обміну");


}

var ipo=0;
function point_on_map(){
  if(ipo==0){msg('ЗАЧЕКАЙТЕ -розрахунок взаєморозтошування техніки на момент зливу');}
   if(ipo< unitslist.length){
  
     idun = unitslist[ipo];
     
     loadMessages(idun);
    }else{
    ipo=0;
    msg('ЗАВЕРШЕНО -розрахунок взаєморозтошування техніки на момент зливу');
    }
ipo+=1;
}

function loadMessages(id){ // load messages function
	
  var sess = wialon.core.Session.getInstance(); // get instance of current Session
	var from = slivtime1/1000; // get begin time ( end time - 24 hours in seconds )
  var to = from+600; // get ServerTime, it will be end time
	var unit = id.getId(); // get selected unit id
  
       var marker = markerByUnit[unit];
          if (marker) {
           marker.setLatLng([0, 0]);
           
        } 
  
  
  
  
	if(!unit){ msg("Select unit first"); return; } // exit if no unit selected
	var ml = sess.getMessagesLoader(); // get messages loader object for current session
	ml.loadInterval(unit, from, to, 0, 0, 10, // load messages for given time interval
	    function(code, data){ // loadInterval callback
		    if(code){ msg(wialon.core.Errors.getErrorText(code)); return; } // exit if error code
    		else { showMessages(0, 1,unit); } // print success message 
	    }
    );
}

function showMessages(from, to,id){ // print given indicies (from, to) of messages 
	
	// get messages loader object for current session
	var ml = wialon.core.Session.getInstance().getMessagesLoader(); 
	ml.getMessages(from, to, //get messages data for given indicies
	    function(code, data){ // getMessages callback
		    if(code){ msg(wialon.core.Errors.getErrorText(code)); return; } // exit if error code
		    else if(data.length == 0){ // exit if no messages loaded
		        return;}
	      
	       //msg(data[0]["pos"]["y"]); // Print message to log
           var marker = markerByUnit[id];
           var y = parseFloat(data[0]["pos"]["y"]);
           var x = parseFloat(data[0]["pos"]["x"]);
          if (marker) {
           marker.setLatLng([y, x]);
           
        } 
         
	    }
    );
   point_on_map();
}
