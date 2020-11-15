<?php
	if(!isset($_SESSION)){session_start();}
	if (isset($_POST['oldpass']) && $_POST['oldpass']!=""){
		if (isset($_POST['newpass1']) && $_POST['newpass1']!=""){
			if (isset($_POST['newpass2'])  && $_POST['newpass2']!=""){
				$pass1=$_POST['newpass1'];
				$pass2=$_POST['newpass2'];
				$pass0=$_POST['oldpass'];
				if (!isset($_SESSION['USER'])){$usuario=$_POST['USER'];}else{$usuario=$_SESSION['USER'];}
				include 'credentials.php';
				$con = mysqli_connect ($phphost, $phpuser, $phppw) or die ("Problemas al conectar".mysqli_connect_error());
				mysqli_select_db ($con,$phpdb) or die ("Problemas al seleccionar".mysqli_error($con));
				/*if (isset($_POST['action'])){$action=$_POST['action'];}*/
				$sql = "SELECT * FROM login";
				if($result = mysqli_query($con, $sql)){
				    if(mysqli_num_rows($result) > 0){
				        while($row = mysqli_fetch_array($result)){
				            if ($usuario==$row['USER']){
				            	$id=$row['ID'];
				            	$oldpass=$row['PASS'];
				            }
				        }
				        mysqli_free_result($result);
				    }else{
				    	echo "No records matching your query were found.";
				    }
				}else{
					echo "ERROR: Could not able to execute $sql. " . mysqli_error($con);
				}
				if($pass1==$pass2){
					if ($oldpass==$pass0){
						//if ($action=="changepass"){
							$sql = "UPDATE login SET PASS=$pass1 WHERE ID=$id";
							if(mysqli_query($con, $sql)){echo "1";}
							else{echo "Imposible ejecutar $sql. " . mysqli_error($con);}
						//}
					}else{echo "Contraseña Antigua Incorrecta";}
				}else{echo "Contraseñas Nuevas Diferentes";}
				mysqli_close($con);
			}else{echo "Complete Pass 2";}
		}else{echo "Complete Pass 1";}
	}else{echo "Complete Pass Antigua";}
?>