/*-------------------------------------MAPEO----------------------------------------------------------------------------------*/
var ID=function(id){return document.getElementById(id);};
document.addEventListener('click',function(e){
	switch (e.target&&e.target.id){
		case ('menu'):navdisplay();break;
		case ('main'):if(ID('nav').style.display!='none'){navdisplay();};break;
		case ('closenav'):navdisplay();break;
		case ('connect'):wifilogin();break;
		case ('login'):botslogin();break;
		case ('cancel'):changepassworddisplay();break;
		case ('passwordbutton'):changepassworddisplay();break;
		case ('dispositivostab'):dispositivosdisplay(1);break;
		case ('programastab'):dispositivosdisplay(0);break;
		case ('agregarprograma'):edicionprogramasdisplay(0);break;
		case ('agregarprograma2'):edicionprogramasdisplay(0);break;
		case ('canceledit'):edicionprogramasdisplay(0);break;
		case ('addprogram'):edicionprogramasdisplay(0);break;
		case ('configuracionbots'):configuracionbotsdisplay();break;
		case ('configuracionwifi'):configuracionwifidisplay();break;
		case ('trash'):delmenudisplay();break;
		case ('recuperarcontraseña'):recuperardisplay();break;
		case ('cancelrecu'):recuperardisplay();break;
		case ('changepass'):changepasswordphp();break;
		case ('eliminarprogramas'):eliminarprogramasphp();break;
		case ('trashbig'):eliminarprogramasphp();break;
		case ('eliminar'):eliminarprogramasphp();break;
		case ('saveedit'):nuevoprogramaphp();break;
		case ('recuperar'):recuperarphp();break;
		case ('cerrarsesion'):botscerrarsesion();break;
		default:break;
	}
		for (var i=0;i<=max;i++){
		if(e.target && e.target.id==('programa'+i)) {edicionprogramasdisplay(i);}
		if(e.target && e.target.id==('nombreprograma'+i)) {edicionprogramasdisplay(i);}
		if(e.target && e.target.id==('nombreprogramaright'+i)) {edicionprogramasdisplay(i);}
		if(e.target && e.target.id==('check'+i)) {check(i);}
		if(e.target && e.target.id==('programaestado'+i)) {modificarestadoprogramaphp(i);}
	}
	for (var i=1;i<=7;i++){if(e.target&&e.target.id==('D'+i)){diadisplay('D'+i);}}
});
function myajax(stringpost,url){
	return new Promise(resolve=>{
		setTimeout(()=>{
			var xmlHttp=new XMLHttpRequest();
			xmlHttp.onreadystatechange=function(){
				if(xmlHttp.readyState===4&&xmlHttp.status===200){				
				try{resolve(xmlHttp.response);}
				catch(err){console.log(err);alert('response: '+err);}
					
				}
			};
			xmlHttp.open('POST',url,true);
			xmlHttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			xmlHttp.send(stringpost);
		}, 2000);
	});
}
var botsuser;
function user(){
	var HeaderHeight=ID('header').getBoundingClientRect().height;
	var footerHeight=ID('footeruser').getBoundingClientRect().height;
	var mainHeight=document.body.clientHeight-HeaderHeight-footerHeight;
	ID('main').style.top=HeaderHeight+'px';ID('main').style.bottom=footerHeight+'px';
	espinitload();
}
async function landing(){
	var msg=await myajax(null,'/LandingCheck');
	var est[i]=msg.split('&');
	if(est[0]!='OFFLINE'){
		ID('result').innerHTML='WiFi conectado a Red: '+ est[0];
		ID.('configuracionwifi').innerHTML='CONFIGURACION WIFI ✔';
	}
	if(est[1]!='false'){
		ID('result').innerHTML='BOTS USER: '+ est[1];
		ID.('configuracionwifi').innerHTML='CONFIGURACION WIFI ✔';
	}
}
if(document.body.contains(ID('webuser'))) {console.log('webuser');user();}
if(document.body.contains(ID('weblogin'))) {console.log('weblogin');}
if(document.body.contains(ID('weblanding'))) {console.log('weblanding');}
/*-------------------------------------HTTP----------------------------------------------------------------------------------*/
async function botslogin(){
	ID('result').innerHTML='Ingresando...';
	var msg=await myajax('&user='+ID('BOTSUSER').value+'&pass='+ID('BOTSPASS').value+'','/botslogin.php');
	if(msg=='1'){ID.('configuracionbots').innerHTML='INICIO DE SESION BOTS ✔';window.location.href='/';}else{ID('result').innerHTML=msg;ID.('configuracionbots').innerHTML='INICIO DE SESION BOTS &#8964;';}
}
async function wifilogin(){
	var msg=await myajax('&STAssid='+ID('STAssid').value+'&STApassword='+ID('STApassword').value+'','/wifilogin');
	if(msg=='1'){ID.('configuracionwifi').innerHTML='CONFIGURACION WIFI ✔';window.location.href='/';}else{ID('result').innerHTML=msg;ID.('configuracionwifi').innerHTML='CONFIGURACION WIFI &#8964;';}
}
async function botscerrarsesion(){await myajax(null,'/botscerrarsesion.php');}
/*-------------------------------------PHP----------------------------------------------------------------------------------*/
var max=0;var res=[];
async function clientesphp(){
	res=[];
	var message=await myajax('&user='+botsuser+'','/clientes.php');
	ID('clientes').innerHTML='';
	var progx=message.split('$');
	if(progx.length>1){
		for (var i=0;i<progx.length-1;i++){
			res[i]=progx[i].split('&');
			res[i].splice(0, 1);
			for (var k = 0;k<=res[i].length-1; k++) {
				res[i][k]=res[i][k].split('=')[1];
			}
			auxiliarmax(parseInt(res[i][0]));
			ID('clientes').innerHTML+=`<tr><td class='mytd'>`+res[i][1]+`</td><td class='mytd right'><label class='switch' id='label`+res[i][0]+`'><input type='checkbox' id='check`+res[i][0]+`'><div class='sliderround'></div></label></td></tr>`;
		}
	}else{ID('programasclientes').innerHTML+=`<tr><td id='nodev'>NO DEVS</td></tr>`;}
	programasclientesphp();
}
var programasres=[];
async function programasclientesphp(){	
	programasres=[];
	var message=await myajax('&user='+botsuser+'','/programasclientes.php');
	ID('programasclientes').innerHTML='';
	ID('devicesprogram').innerHTML='';
	var progx=message.split('$');
	if(progx.length>1){
		for (var i=0;i<progx.length-1;i++){
			programasres[i]=progx[i].split('&');
			programasres[i].splice(0, 1);
			for (var k = 0;k<=programasres[i].length-1; k++) {
				programasres[i][k]=programasres[i][k].split('=')[1];
			}
			auxiliarmax(parseInt(programasres[i][0]));
			auxiliarnuevoprograma(programasres[i][0],programasres[i][1]);
		}
		auxiliarestadoprogramas();
	}else{auxiliarsinprogramas(1);}
	auxiliarlistadodispositivos();
	setTimeout(mqttinput,1000);
}
function auxiliarnuevoprograma(NID,NIDNAME){ID('programasclientes').innerHTML+=`<tr id='programa`+NID+`'><td class='mytd' id='nombreprograma`+NID+`'>`+NIDNAME+`</td><td id='nombreprogramaright`+NID+`' class='mytd right'><label class='switch programswitch'><input type='checkbox' id='programaestado`+NID+`'><div class='sliderround'></div></label><label class='deleteop switch' style='display: none;' id='deleteprogram`+NID+`'><input type='checkbox' id='del`+NID+`'><div class='square'></div></label></td></tr>`;}
function auxiliarlistadodispositivos(){for (var j=0;j<Object.keys(res).length;j++){ID('devicesprogram').innerHTML+=`<tr><td class='mytd'>`+res[j][1]+`</td><td class='mytd right'><label class='switch'><input type='checkbox' id='devicesprogram`+res[j][0]+`'><div class='square'></div></label></td></tr>`;}}
function auxiliarmax(NMAX){if(NMAX>=max) {max=NMAX;}}
function auxiliarestadoprogramas(){for (var i=0;i<Object.keys(programasres).length;i++){var u=ID('programaestado'+programasres[i][0]);if(programasres[i][2]==1){u.checked=true;}else{u.checked=false;}}}
function auxiliarsinprogramas(show){
	if (show==1) {ID('programasclientes').innerHTML+=`<tr id='agregarprograma'><td id='agregarprograma2'>+ Agregar programa</td></tr>`;}
	else{ID('agregarprograma').parentNode.removeChild(ID('agregarprograma'));}
}

async function recupassphp(){
	if(ID('mailrecu').value!=''){
		if(ID('recuuser').value!=''){
			ID('resultrecu').innerHTML=await myajax('&user='+ID('recuuser').value+'&email='+ID('mailrecu').value+'','/recupass.php');
		}else{ID('resultrecu').innerHTML='Complete Usuario';}
	}else{ID('resultrecu').innerHTML='Complete E-mail';}
}
async function changepasswordphp(){
	var message=await myajax('&oldpassword='+ID('oldpassword').value+'&newpassword1='+ID('newpassword1').value+'&newpassword2='+ID('newpassword2').value+'','/changepassword.php');
	if(message==1){ID('result').innerHTML='Contraseña Modificada Correctamente.';}else{ID('result').innerHTML=message;}
}
async function nuevoprogramaphp(){
	var programid=ID('programid').value;
	var nombreprograma=ID('nombreprogramaedit').value;
	if(nombreprograma!=''){
		if ((nombreprograma.split('&').length<=1)&&(nombreprograma.split('$').length<=1)){
			var days='';
			for (var i=1;i<=7;i++){if(ID('D'+i).value==true){days+='D'+i;}}
			if(days!=''){
				var horainicio=ID('HORAINICIO').value;
				if(ID('HORAINICIO').value!=''){
					var horafin=ID('HORAFIN').value;
					if(ID('HORAFIN').value!=''){
						var devi='%';
						for (var i=0;i<res.length;i++){if(ID('devicesprogram'+res[i][0]).checked==true){devi+=res[i][0]+'%';}}
						if(devi!='%'){
							var sta =true;
							if(programid!=0){sta=ID('programaestado'+programid).checked;}
							var message=await myajax('&programid='+programid+'&nombreprograma='+nombreprograma+'&estado='+sta+'&days='+days+'&horainicio='+horainicio+'&horafin='+horafin+'&devi='+devi+'','/nuevoprograma.php');
							if (message.split('NID').length==2) {
								var NID=message.split('NID')[1];
								var preslen = Object.keys(programasres).length;
								var newp=(NID+'&'+nombreprograma+'&'+sta+'&'+days+'&'+horainicio+'&'+horafin+'&'+devi+'&$');
								if(preslen==0) {auxiliarsinprogramas(0);}
								if (programid==0) {
									programasres[preslen]=newp.split('&');
									auxiliarmax(parseInt(NID));
									auxiliarnuevoprograma(NID,nombreprograma);
								}else{
									for (var i=0;i<preslen;i++){
										if (programasres[i][0]==NID){
											programasres[i]=newp.split('&');
											ID('nombreprograma'+NID).innerHTML=nombreprograma;
											ID('programaestado'+NID).checked=sta;
										}
									}
								}
							}else{alert('response: '+message);}
							edicionprogramasdisplay(0);
							auxiliarestadoprogramas();
						}else{alert('DISPOSITIVOS NO SELECCIONADOS');}
					}else{alert('HORA FIN INCORRECTA');}
				}else{alert('HORA INICIO INCORRECTA');}
			}else{alert('SIN DIAS SELECCIONADOS');}
		}else{alert('NOMBRE DE PROGRAMA NO PUEDE CONTENTER $ o &');}
	}else{alert('INGRESE NOMBRE DE PROGRAMA');}
}
async function modificarestadoprogramaphp(u){
	var st;
	if (ID('programaestado'+u).checked){st=true;}else{st=false;}
	var message = await myajax('&ID='+u+'&ESTADO='+st+'','/modificarestadoprograma.php');
	if (message==1) {ID('programaestado'+u).checked=st;}else{ID('programaestado'+u).checked!=st;alert('response: '+message);}
}
async function eliminarprogramasphp(){
	var progamaeliminar='$';
	for (var i=0;i<Object.keys(programasres).length;i++){
		if(ID('del'+programasres[i][0]).checked==true){progamaeliminar+=programasres[i][0]+'$';}
	}
	var message=await myajax('&progamaeliminar='+progamaeliminar+'','/progamaeliminar.php');
	if (message==1) {
		var len=0;
		for (var i=0;i<Object.keys(programasres).length;i++){
			if(ID('del'+programasres[i][0]).checked==true){
				var row = document.getElementById('programa'+programasres[i][0]);
				row.parentNode.removeChild(row);
				programasres.splice(i, 1);
				i--;
			}
		}
		if(Object.keys(programasres).length==0) {
			if (document.body.contains(ID('agregarprograma'))==false){auxiliarsinprogramas(1);}
		}
	}else{alert('response: '+message);}
	delmenudisplay();
}
/*-------------------------------------CSSDISPLAY----------------------------------------------------------------------------------*/
function navdisplay(){if(ID('nav').style.display!='none'){ID('nav').style.display='none';}else{ID('nav').style.display='block';}}
function recuperardisplay(){
	var x1=ID('recucontramod');var x2=ID('botsloginform');
	if(x1.style.display=='block'){x1.style.display='none';x2.style.display='block';}else{x1.style.display='block';x2.style.display='none';}
}
function changepassworddisplay(){
	var x1=ID('passwordsurvey');
	if(x1.style.display=='inline-block'){x1.style.display='none';}else{x1.style.display='inline-block';}
}
function diadisplay(a){
	ID(a).value=!ID(a).value;
	if(ID(a).value==false){ID(a).className='day special disabled';}
	if(ID(a).value==true){ID(a).className='day special';}
}
function delmenudisplay(){
	var eliminador=ID('eliminarprogramas');
	var eli=document.getElementsByClassName('deleteop');
	var swi=document.getElementsByClassName('programswitch');
	if (eliminador.style.display=='none') {
		eliminador.style.display='table-cell';
		for(i=0;i<eli.length;i++){eli[i].style.display='inline-block';swi[i].style.display='none';}
	}else{
		eliminador.style.display='none';
		for(i=0;i<eli.length;i++){eli[i].style.display='none';swi[i].style.display='inline-block';}
	}
}
function loaderdisplay(show){
	if (show==0) {ID('loader').style.display='none';ID('main').style.display='block';}
	if (show==1) {ID('loader').style.display='block';ID('main').style.display='none';}
}
function configuracionwifidisplay(){
	var x=ID('wificonfigform');
	if (x.style.display=='none') {x.style.display='block';}else{x.style.display='none';}
}
function configuracionbotsdisplay(){
	var x=ID('botsloginform');
	if (x.style.display=='none') {x.style.display='block';}else{x.style.display='none';}
}
function dispositivosdisplay(s){
	ID('programas').style.display='inline-block';
	ID('modificacionprograma').style.display='none';
	ID('eliminarprogramas').style.display='none';
	ID('main').className='wrapper';
	if(s==1){
		ID('dispositivostab').className='inn selected';
		ID('programastab').className='inn';
		ID('CLIENTESCONTAINER').style.display='block';
		ID('PROGRAMASCONTAINER').style.display='none';
	}else if(s==0){
		ID('dispositivostab').className='inn';
		ID('programastab').className='inn selected';
		ID('CLIENTESCONTAINER').style.display='none';
		ID('PROGRAMASCONTAINER').style.display='block';
		if (ID('eliminarprogramas').style.display!='none') {delmenudisplay();}
		auxiliarestadoprogramas();
	}
}
function edicionprogramasdisplay(IDx){
	if(IDx==0){
		ID('programid').value='0';
		ID('editarprogramatitulo').innerHTML='NUEVO PROGRAMA';
		ID('nombreprogramaedit').value='';
		ID('HORAINICIO').value='';
		ID('HORAFIN').value='';
		for (var i=1;i<=7;i++){ID('D'+i).value=false;ID('D'+i).className='day special disabled';}
		for (var i=0;i<res.length;i++){ID('devicesprogram'+res[i][0]).checked=false;}
	}else{
		ID('editarprogramatitulo').innerHTML='MODIFICAR PROGRAMA';
		for (var i=0;i<Object.keys(programasres).length;i++){
			if(programasres[i][0]==IDx){
				ID('programid').value=programasres[i][0];
				ID('nombreprogramaedit').value=programasres[i][1];
				var days=programasres[i][3].split('D');
				for (var d=0;d<=days.length-1;d++){if(days[d]!='D'&&days[d]!=''){diadisplay('D'+days[d]);}}
				ID('HORAINICIO').value=auxiliarcortarhora(programasres[i][4]);
				ID('HORAFIN').value=auxiliarcortarhora(programasres[i][5]);
				var dev =programasres[i][6].split('%');
				for (var v=0;v<dev.length;v++){if(dev[v]!='%'&&dev[v]!=''){ID('devicesprogram'+dev[v]).checked=true;}}
			}
		}
	}
	if(ID('programas').style.display=='none'){ID('programas').style.display='inline-block';ID('modificacionprograma').style.display='none';ID('main').className ='wrapper';}
	else{ID('programas').style.display='none';ID('modificacionprograma').style.display='inline-block';ID('main').className='wrapper border';}
	ID('tabladevices').style.height=(((ID('programbutton').getBoundingClientRect().top)-(ID('titulotabla').getBoundingClientRect().bottom)))+'px';
}
var auxiliarcortarhora=function(string){var cut=[];cut=string.split(':');if (cut[0].length==1) {cut[0]='0'+cut[0];}if (cut[1].length==1) {cut[1]='0'+cut[1];}return (cut[0]+':'+cut[1]);};
/*-------------------------------------MQTT----------------------------------------------------------------------------------*/
function check(idx){if(ID('check'+idx).checked===true){sendmqtt(idx+'I');}else{sendmqtt(idx+'O');}}
/*-------------------------------------WEB----------------------------------------------------------------------------------*/
async function espinitload(){
	botsuser=await myajax(null,'/retrieveuser.php');
	if (botsuser!="") {clientesphp();}else{setTimeout(espinitload,1000);}
}
function sendmqtt(dato){message=new Paho.MQTT.Message(dato);message.destinationName=topic;message.qos=0;client.send(message);}
var host;var port;var usuario;var contrasena;var topic;var mqttwsocketport;
async function mqttinput(){	
	var message=await myajax('&mqttuser='+botsuser+'','/mqttuser.php');
	var mqttdata=message.split('&');
	if(mqttdata.length>1){
		var mqttvar=[];
		for (var i=0;i<mqttdata.length;i++){mqttvar[i]=mqttdata[i].split('=');}
		host=mqttvar[1][1];
		//port=parseInt(mqttvar[2][1]);
		port = parseInt(mqttvar[3][1]);
		usuario=mqttvar[4][1];
		contrasena=mqttvar[5][1];
		topic=mqttvar[6][1];
		setTimeout(mqttconn,1000);
	}else{setTimeout(mqttinput,6000);}
}
var client;var clientId;
function mqttconn(){
	clientId = 'ws' + Math.random();
	client = new Paho.MQTT.Client(host, port, clientId);// Create a client instance
	client.onConnectionLost = onConnectionLost;// set callback handlers
	client.onMessageArrived = onMessageArrived;// set callback handlers	
	try{
		client.connect({// connect the client
			useSSL: true,
			userName: usuario,
			password: contrasena,
			onSuccess: onConnect,//subscribe
			onFailure: onFailure
		});
	}
	catch(err){console.log(err);alert('response: '+err);}
}
function onConnect(){console.log('MQTT Connected');loaderdisplay(0);client.subscribe(topic);}
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log('onConnectionLost:', responseObject.errorMessage);
		setTimeout(function(){client.connect()},5000);
	}
}
function onFailure(invocationContext, errorCode, errorMessage) {
	alert('Imposible conectar WebSocket, verificar puerto Firewall 39627');
}
function onMessageArrived(a) {
	if (a.destinationName == topic) {
		var message = a.payloadString;
		var estado = message.substring(message.length - 1, message.length);
		var id = message.substring(0, message.length-1);
		if(estado=='I'){document.getElementById('check'+id).checked = true;}
		if(estado=='O'){document.getElementById('check'+id).checked = false;}
	}
}