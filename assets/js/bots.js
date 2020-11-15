/////////////////////////CLIENTES/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////CLIENTES/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////CLIENTES/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////CLIENTES/////////////////////////////////////////////////////////////////////////////////////////////////////
var urldir = "";
var max=0;
var res = [];
$(function(){
	res=[];
	var dataclientes ={user:$("#botsuser").attr('value')};
	$.ajax({
		type: 'POST',
		url: +'/clientes.php',
		data: dataclientes,
		success: function(response){
			/*console.log(response);*/
			document.getElementById('clientes').innerHTML="";
			var progx = response.split("$");
			if (progx.length>1) {
				for (var i = 0; i < progx.length-1; i++) {
					res[i] = progx[i].split("?");
					if (res[i][0]>max) {max=res[i][0];}
					document.getElementById('clientes').innerHTML+=
					"<tr>"+
			    	"<td class='option'>"+res[i][1]+":</td>"+
			    	"<td style='text-align: right;'>"+
			    		"<label id='label"+res[i][0]+"' class='switch'>"+
			    			"<input id='check"+res[i][0]+"' type='checkbox' class='optioninput'>"+
			    			"<span class='slider round'></span>"+
			    		"</label>"+
			    		"<span id='estado"+res[i][0]+"' class='estado'></span>"+
			    	"</td>"+
			    	"</tr>";
				}
			}else{
				document.getElementById('programasclientes').innerHTML+=
				"<tr style='cursor:pointer'><td id='nodev' class='mytd'>NO DEVS</td></tr>";
			}
		},
		error: function(error) {console.log(error);}
	});
	programasclientes();
	mqttinput();
});

var programasres=[];
function programasclientes(){
	programasres=[];
	var dataclientes ={user:window.localStorage.getItem("userclient")};
	$.ajax({
		type: 'POST',
		url: urldir+'/programasclientes.php',
		data: dataclientes,
		success: function(response){
			document.getElementById('programasclientes').innerHTML="";
			document.getElementById('devicesprogram').innerHTML="";
			//console.log(response);
			var progx = response.split("$");
			if (progx.length>1) {
				for (var i = 0; i < progx.length-1; i++) {
					programasres[i] = progx[i].split("?");
					if (parseInt(programasres[i][0])>max) {max=parseInt(programasres[i][0]);}
					document.getElementById('programasclientes').innerHTML+=
					"<tr id='programa"+programasres[i][0]+"' style='cursor:pointer;'>"+
						"<td class='deleteop mytd' id='deleteprogram"+programasres[i][0]+"' style='display: none;'>"+
								"<input type='checkbox' id='del"+programasres[i][0]+"' checked data-toggle='toggle'>"+
								"<label for='del"+programasres[i][0]+"'></label>"+
							"</div>"+
						"</td>"+
						"<td class='mytd' id='nombreprograma"+programasres[i][0]+"' style='width: 100%;'>"+programasres[i][1]+"</td>"+
			    		"<td class='mytd' style='text-align: right;width: 25%'>"+
				    		"<label class='switch' style='display:block'><input type='checkbox' id='programaestado"+programasres[i][0]+"' class='optioninput'><span class='slider round'></span></label>"+
			    		"</td>"+
					"</tr>";
				}
				for (var i = 0; i < programasres.length; i++) {///estado programas
					/*console.log(programasres[i][2]+"programas"+programasres[i][0]);*/
					var u= document.getElementById("programaestado"+programasres[i][0]);
					if (programasres[i][2]==1) {u.checked=true;} else if(programasres[i][2]==0) {u.checked=false;}
				}
				
			}else{
				document.getElementById('programasclientes').innerHTML+=
				"<tr style='cursor:pointer'><td id='agregarprograma' class='mytd'>+ Agregar programa</td></tr>";
			}
			for (var j = 0; j < res.length; j++) {
					document.getElementById('devicesprogram').innerHTML+=
			    	"<tr>"+
						"<td class='mytd'>"+res[j][1]+"</td>"+
						"<td class='mytd' style='text-align: right;'>"+
							"<input type='checkbox' id='devicesprogram"+res[j][0]+"'>"+
							"<label for='devicesprogram"+res[j][0]+"'></label>"+
						"</td>"+
					"</tr>";
				}
		},
		error: function(error) {console.log(error);}
	});
}

document.addEventListener('click',function(e){
	for (var i = 0; i <= max; i++) {
		if(e.target && e.target.id== ('nombreprograma'+i)){programeditshow(i);}
		if(e.target && e.target.id== ('check'+i)){check(i);}
		if(e.target && e.target.id== ('programaestado'+i)){modificarestadonprograma(i);}
	}
	for (var i = 1; i <= 7; i++) {if(e.target && e.target.id== ('D'+i)){selectday('D'+i);}}
 });

for (var i = 1; i <=7; i++) {document.getElementById('D'+i).value=false;}

function check(idx){
	//console.log(idx);
	if (document.getElementById('check'+idx).checked === true){/*console.log('PORTONI');*/send(idx+'I');}
	else if(document.getElementById('check'+idx).checked === false){/*console.log('PORTONO');*/send(idx+'O');}
}
/////////////////////////CHANGEPASS/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////CHANGEPASS/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////CHANGEPASS/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////CHANGEPASS/////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('cerrarsesion').addEventListener('click',cerrarsesion);
function cerrarsesion(){
	///clean
	///session user
	$.ajax({
		type: 'GET',
		url: urldir+'/destroysession.php',
		success: function(response){window.location.href='./index.php';},
		error: function(error){console.log(error);}
	});
}
/////////////////////////CHANGEPASS/////////////////////////////////////////////////////////////////////////////////////////////////////	
document.getElementById('passwordbutton').addEventListener('click', 
function passwordbutton(){document.getElementById('passwordsurvey').style.display = 'inline-block';});
document.getElementById('cancel').addEventListener('click', 
function passwordbutton(){document.getElementById('passwordsurvey').style.display = 'none';});
document.getElementById('changepass').addEventListener('click', 
	function changepass(){
		var datachange ={
			oldpassword:document.getElementById('oldpassword').value,
			newpassword1:document.getElementById('newpassword1').value,
			newpassword2:document.getElementById('newpassword2').value
		};
		console.log('changepass');
		$.ajax({
			type: 'POST',
			url: urldir+'/changepassword.php',
			data: datachange,
			success: function(response){document.getElementById('result').innerHTML=response;},
			error: function(error){console.log(error);}
		});
	}
);
/////////////////////////MQTT//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////MQTT//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////MQTT//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////MQTT//////////////////////////////////////////////////////////////////////////////////////////
var host;var port;var usuario;var contrasena;var topic;var mqttwsocketport;
function mqttinput(){	
	var mqttuser ={mqttuser:$("#botsuser").attr('value')};
	$.ajax({
		type: 'POST',
		url: urldir+'/mqttuser.php',
		data: mqttuser,
		success: function(response){
			var res = response.split("?");//var myObj = JSON.parse(response);
			host=res[0];//host=myObj.mqtthost;
			//port=parseInt(res[1]);//port=parseInt(myObj.mqttport);
			port = parseInt(res[2]);//port=parseInt(myObj.mqttwsocketport);
			usuario=res[3];//usuario = myObj.mqttusuario;
			contrasena=res[4];//contrasena = myObj.mqttpass;
			topic=res[5];//topic = myObj.mqtttopic;*/
			mqttconn();
		},
		error: function(error){console.log(error);}
	});
}
var client;var clientId;
function mqttconn(){
	clientId = "ws" + Math.random();
	client = new Paho.MQTT.Client(host, port, clientId);// Create a client instance
	client.onConnectionLost = onConnectionLost;// set callback handlers
	client.onMessageArrived = onMessageArrived;// set callback handlers	
	client.connect({// connect the client
		useSSL: true,
		userName: usuario,
		password: contrasena,
		onSuccess: onConnect,//subscribe
		onFailure: onFailure
	});
}
function send(dato){
	message = new Paho.MQTT.Message(dato);
	message.destinationName = topic;
	message.qos= 0;
	client.send(message);
}
function onConnect(){client.subscribe(topic);}
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("onConnectionLost:", responseObject.errorMessage);
		setTimeout(function(){client.connect()},5000);
	}
}
function onFailure(invocationContext, errorCode, errorMessage) {
  var errDiv = document.getElementById("error");
  errDiv.textContent = "Imposible conectar WebSocket, verificar puerto Firewall 39627";
  errDiv.style.display = "block";
}
function onMessageArrived(message) {// called when a message arrives
	//console.log("message.destinationName: "+message.destinationName+"; message.payloadString: "+message.payloadString);
	if (message.destinationName == topic) { //acá coloco el topi
		var a = message.payloadString;
		var estado = a.substring(a.length - 1, a.length);
		var id = a.substring(0, a.length-1);
		//console.log("id: "+id+"; estado: "+estado);
		document.getElementById("estado"+id).textContent=estado;
		if(estado=="I"){document.getElementById('check'+id).checked = true;}
		if(estado=="O"){document.getElementById('check'+id).checked = false;}
	}
}










/////////////////////////MAPEO//////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('dispositivostab').addEventListener('click',  dispositivos);
$(document).on('swipeleft', 'body', dispositivos);
function dispositivos(){
	document.getElementById('dispositivostab').className = 'inn selected';
	document.getElementById('programastab').className = 'inn';
	document.getElementById('CLIENTESCONTAINER').style.display = 'block';
	document.getElementById('PROGRAMASCONTAINER').style.display = 'none';
	document.getElementById('modificacionprograma').style.display = 'none';
	document.getElementById('main').className = 'wrapper';
	
}



document.getElementById('programastab').addEventListener('click',programas);
$(document).on('swiperight', 'body', programas);
function programas(){
	document.getElementById('dispositivostab').className = 'inn';
	document.getElementById('programastab').className = 'inn selected';
	document.getElementById('CLIENTESCONTAINER').style.display = 'none';
	document.getElementById('PROGRAMASCONTAINER').style.display = 'block';
	document.getElementById('PROGRAMASCONTAINER').className = 'container';
	document.getElementById('programas').style.display='inline-block';
	document.getElementById('modificacionprograma').style.display='none';
	document.getElementById('eliminarprogramas').style.display='none';
	document.getElementById('main').className = 'wrapper';
	var cols = document.getElementsByClassName('deleteop');for(i = 0; i < cols.length; i++) {cols[i].style.display='none';}
	for (var i = 0; i < programasres.length; i++) {///estado programas
		/*console.log(programasres[i][2]+"programas"+programasres[i][0]);*/
		var u= document.getElementById("programaestado"+programasres[i][0]);
		if (programasres[i][2]==1) {u.checked=true;} else if(programasres[i][2]==0) {u.checked=false;}
	}
}



$(document).on('click','#agregarprograma',function(){programeditshow(0)});
document.getElementById('canceledit').addEventListener('click',  function(){programeditshow(0)});
document.getElementById('addprogram').addEventListener('click',  function(){programeditshow(0)});

function programeditshow(ID){
	if (ID==0) {
		document.getElementById('programid').value="0";
		document.getElementById('editarprogramatitulo').innerHTML="NUEVO PROGRAMA";
		document.getElementById('nombreprogramaedit').value="";
		for (var i = 1; i <= 7; i++) {var x=document.getElementById("D"+i);x.value=false;x.className="button special fit small disabled";}
		document.getElementById('HORAINICIO').value="HH";
		document.getElementById('MINUTOINICIO').value="MM";
		document.getElementById('HORAFIN').value="HH";
		document.getElementById('MINUTOFIN').value="MM";
		for (var i = 0; i < res.length; i++) {
			/*console.log(res[i][0]);*/document.getElementById('devicesprogram'+res[i][0]).checked=false;
		}
	}else{
		document.getElementById('editarprogramatitulo').innerHTML="MODIFICAR PROGRAMA";
		for (var i = 0; i < programasres.length; i++) {
			if(programasres[i][0]==ID){
				document.getElementById('programid').value=programasres[i][0];
				document.getElementById('nombreprogramaedit').value=programasres[i][1];
				var days = programasres[i][3].split("D");
				for (var d = 0; d <= days.length-1; d++) {if(days[d]!="D" && days[d]!=""){selectday("D"+days[d]);}}
				var inicio = programasres[i][4].split(":");
				document.getElementById('HORAINICIO').value=inicio[0];
				document.getElementById('MINUTOINICIO').value=inicio[1];
				var fin = programasres[i][5].split(":");
				document.getElementById('HORAFIN').value=fin[0];
				document.getElementById('MINUTOFIN').value=fin[1];
				var dev =programasres[i][6].split("%");
				for (var v = 0; v < dev.length; v++) {
					if(dev[v]!="%" && dev[v]!=""){
						/*console.log(dev[v]);*/
						document.getElementById('devicesprogram'+dev[v]).checked=true;
					}
				}
			}
		}
	}
	var x = document.getElementById('programas');
	var y = document.getElementById('modificacionprograma');
  if (x.style.display === "none") {
  	x.style.display = "inline-block";y.style.display = "none";
  	/*document.getElementById('PROGRAMASCONTAINER').className = 'container';*/
  	document.getElementById('main').className = 'wrapper';}
  else {x.style.display = "none";y.style.display = "inline-block";
  /*document.getElementById('PROGRAMASCONTAINER').className = 'container  border';*/
  document.getElementById('main').className = 'wrapper border';}


var h1=document.getElementById('HMF').getBoundingClientRect().bottom;
var h2=document.getElementById("programbutton").getBoundingClientRect().top;

document.getElementById("tabladevices").style.height=((h2-h1)*0.95)+"px";
}


function selectday(a){
	var x = document.getElementById(a);
	x.value=!x.value;
	if (x.value==false){x.className = "button special fit small disabled";}
	if (x.value==true){x.className = "button special fit small";}
}

/*document.getElementById('programdel').addEventListener('click',  programdel);
function programdel() {
	var x = document.getElementById('dropmenu');
	if (x.style.display==='none') {x.style.display='block';}else{x.style.display='none';}
}*/

document.getElementById('trash').addEventListener('click',  delmenu);
/*document.getElementById('delmenu').addEventListener('click',  delmenu);*/
function delmenu() {
	var cols = document.getElementsByClassName('deleteop');
	var y = document.getElementById('eliminarprogramas');
	for(i = 0; i < cols.length; i++) {
		if (cols[i].style.display=='none'){cols[i].style.display='table-cell';y.style.display='table-cell';}
		else{cols[i].style.display='none';y.style.display='none';}
	}
}

document.getElementById('eliminarprogramas').addEventListener('click',eliminarprogramas);
function eliminarprogramas(){
	var progamaeliminar="$";
	for (var i = 0; i < programasres.length; i++) {
		if(document.getElementById('del'+programasres[i][0]).checked==true){progamaeliminar+=programasres[i][0]+"$";}
	}
	var user= document.getElementById('botsuser').value;
	var data={USER:user,progamaeliminar:progamaeliminar};
	$.ajax({
		type: 'POST',
		url: urldir+'/progamaeliminar.php',
		data: data,
		success: function(response){/*console.log(response);*/programasclientes();},
		error: function(error){console.log(error);}
	});	
	delmenu();
}


document.getElementById('saveedit').addEventListener('click', nuevoprograma);
function nuevoprograma(){
	var programid = document.getElementById('programid').value;
	var nombreprograma = document.getElementById('nombreprogramaedit').value;
	if (nombreprograma!="") {
		var days="";
		for (var i = 1; i <= 7; i++) {var x=document.getElementById("D"+i);if(x.value==true){days+="D"+i;}}
		if (days!="") {
			var horainicio = document.getElementById('HORAINICIO').value+":"+document.getElementById('MINUTOINICIO').value;
			if (document.getElementById('HORAINICIO').value!="HH" && document.getElementById('MINUTOINICIO').value!="MM") {
				var horafin = document.getElementById('HORAFIN').value+":"+document.getElementById('MINUTOFIN').value;
				if (document.getElementById('HORAFIN').value!="HH" && document.getElementById('MINUTOFIN').value!="MM") {
					var devi = "%";
					for (var i = 0; i < res.length; i++) {if(document.getElementById('devicesprogram'+res[i][0]).checked==true){devi+=res[i][0]+"%";}}
					if (devi!="%") {
						var user= document.getElementById('botsuser').value;
						var sta =true;
						if (programid!=0) {sta=document.getElementById('programaestado'+programid).checked;}
						var datapost={USER:user,estado:sta,programid:programid,nombreprograma:nombreprograma,days:days,horainicio:horainicio,horafin:horafin,devi:devi};
						$.ajax({
							type: 'POST',
							url: urldir+'/nuevoprograma.php',
							data: datapost,
							success: function(response){/*console.log(response);*/programasclientes();},
							error: function(error){console.log(error);delmenu();}
						});
						programeditshow(0);
					}else{console.log("DISPOSITIVOS NO SELECCIONADOS");}
				}else{console.log("HORA FIN INCORRECTA");}
			}else{console.log("HORA INICIO INCORRECTA");}
		}else{console.log("SIN DIAS SELECCIONADOS");}
	}else{console.log("INGRESE NOMBRE DE PROGRAMA");}
}



function modificarestadonprograma(u){
var user= document.getElementById('botsuser').value;
var datapost = {USER:user,ID:u,ESTADO:document.getElementById('programaestado'+u).checked};
	$.ajax({
		type: 'POST',
		url: urldir+'/modificarestadoprograma.php',
		data: datapost,
		success: function(response){/*console.log(response);*/programasclientes();},
		error: function(error){console.log(error);}
	});
}


var bodyHeight= document.body.clientHeight;
var HeaderHeight = document.getElementById('header').getBoundingClientRect().height;
var footerHeight = document.getElementById('footerx').getBoundingClientRect().height;
var mainHeight = bodyHeight-HeaderHeight-footerHeight;


document.getElementById("main").style.top=HeaderHeight+"px";
document.getElementById("main").style.bottom=footerHeight+"px";
/*document.getElementById("main").style.height=mainHeight+"px";*/
$.mobile.loading().hide();
