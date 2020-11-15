<?php
	if(!isset($_SESSION)){session_start();}
	include 'credentials.php';
	$con = mysqli_connect ($phphost, $phpuser, $phppw) or die ("Problemas al conectar".mysqli_connect_error());
	mysqli_select_db ($con,$phpdb) or die ("Problemas al seleccionar".mysqli_error($con));	
	//$myObj = new \stdClass();
	if (!isset($_SESSION['USER'])){$user=$_POST['mqttuser'];}else{$user=$_SESSION['USER'];}
	$mqttinputstring="";
	if (isset($user) && $user!=""){
		$sql = "SELECT * FROM login";
		if($result = mysqli_query($con, $sql)){
		    if(mysqli_num_rows($result)>0){
		        while($row = mysqli_fetch_array($result)){
		            if ($row['USER'] == $user){
		            	$mqttinputstring .= "&mqtthost=".$row['mqtthost'];
		            	$mqttinputstring .= "&mqttport=".$row['mqttport'];
		            	$mqttinputstring .= "&mqttwsocketport=".$row['mqttwsocketport'];
		            	$mqttinputstring .= "&mqttusuario=".$row['mqttusuario'];
		            	$mqttinputstring .= "&mqttpass=".$row['mqttpass'];
		            	$mqttinputstring .= "&mqtttopic=".$row['mqtttopic'];
						echo $mqttinputstring;
		            }
		        }
		        mysqli_free_result($result);// Free result set
		    }else{echo "No records matching your query were found.";}
		}else{echo "Imposible Ejecutar $sql".mysqli_error($con);}
		//}
	}else{echo "Error de Usuario";}
	////////////////CLOSE////////////////////////////////////////////////////1
	mysqli_close($con);
?>