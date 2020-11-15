<?php 
	if(!isset($_SESSION)){session_start();}
	include 'credentials.php';
	$con = mysqli_connect ($phphost, $phpuser, $phppw) or die ("Problemas al conectar".mysqli_connect_error());
	mysqli_select_db ($con,$phpdb) or die ("Problemas al seleccionar".mysqli_error($con));	$sql = "SELECT * FROM login";
	$userok=0;
	if($result = mysqli_query($con, $sql)){
		if(mysqli_num_rows($result) > 0){
			while($row = mysqli_fetch_array($result)){
				if ($_POST['user']==$row['USER']){$pass=$row['PASS'];$userok=1;}
			}
			mysqli_free_result($result);// Free result set
		}else{echo "Usuario No Registrado.";}
	}else{echo "Imposible ejecutar $sql. " . mysqli_error($con);}

	if($userok==1){////////////////mail
		$subject = "Password BOTS!";
		$msg= "Hola ".$_POST['user'].", enviamos tu contraseña de recupero BOTS: ".$pass."";
		$headers = "From: bots@hotmail.com" . "\r\n" . "CC: pedromancuso@hotmail.com";
		$send = mail($_POST['email'],$subject,$msg,$headers);
		if ($send) {echo "Mensaje Enviado";}else{echo "Error: Mensaje No Enviado, contacte a bots@bots.com.ar";}
	}else if($userok==0){echo "Usuario No Registrado.";}
;?>