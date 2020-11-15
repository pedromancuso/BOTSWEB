/////////////////////////LOGIN////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////LOGIN////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////LOGIN////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////LOGIN////////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('login').addEventListener('click', 
	function login(){
		if(document.getElementById('user').value!=''){
			if(document.getElementById('pass').value!=''){
				var datalogin ={user:document.getElementById('user').value,pass:document.getElementById('pass').value}
					$.ajax({
					type: 'POST',
					url: '/BOTSlogin.php',
					data: datalogin,
					success: function(response){
						if(response==1){window.location.href='/webuser.php';}
						else{document.getElementById('result').innerHTML=response;}
					},
					error: function(error) {document.getElementById('result').innerHTML=error;}
				});
			}else{
				document.getElementById('result').innerHTML='Complete Contraseña';
			}
		}else{
			document.getElementById('result').innerHTML='Complete Usuario';
		}
	}
);
/////////////////////////RECUPERARCONTRASEÑA//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////RECUPERARCONTRASEÑA//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////RECUPERARCONTRASEÑA//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////RECUPERARCONTRASEÑA//////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('recuperar').addEventListener('click', 
	function recuperar(){
		if(document.getElementById('mailrecu').value!=''){
			if(document.getElementById('recuuser').value!=''){
				var datarecu ={user:document.getElementById('recuuser').value,email:document.getElementById('mailrecu').value}
				$.ajax({
					type: 'POST',
					url: '/recupass.php',
					data: datarecu,
					success: function(response){
						document.getElementById('resultrecu').innerHTML=response;
					},
					error: function(error) {
						console.log(error);
					}
				});
			}else{
				document.getElementById('resultrecu').innerHTML='Complete Usuario';
			}
		}else{
			document.getElementById('resultrecu').innerHTML='Complete E-mail';
		}
	}
);
/////////////////////////RECUPERARCONTRASEÑA//////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('recuperarcontraseña').addEventListener('click',
	function recu(){
		document.getElementById('recucontramod').style.display='inline-block';
		document.getElementById('loginmod').style.display='none';
	}
);
document.getElementById('cancelrecu').addEventListener('click',
	function norecu(){
		document.getElementById('recucontramod').style.display='none';
		document.getElementById('loginmod').style.display='inline-block';
	}
);