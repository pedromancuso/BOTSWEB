<?php
	if(!isset($_SESSION)){session_start();}
	include 'credentials.php';
	$con = mysqli_connect ($phphost, $phpuser, $phppw) or die ("Problemas al conectar".mysqli_connect_error());
	mysqli_select_db ($con,$phpdb) or die ("Problemas al seleccionar".mysqli_error($con));	/*if (isset($_POST['action'])){$action=$_POST['action'];}*/
	$myObj = new \stdClass();
	if (!empty($_POST['user']) && !empty($_POST['pass'])){
		$usuario = $_POST["user"];
		$password = $_POST["pass"];
		$_SESSION['login'] = "0";
		//if ($action=="login") {
		$sql = "SELECT * FROM login";
		if($result = mysqli_query($con, $sql)){
		    if(mysqli_num_rows($result)>0){
		        while($row = mysqli_fetch_array($result)){
		            if ($row['USER'] == $usuario){
		            	$_SESSION['login']="1";
		            	if ($row['PASS'] == $password){
		            		$_SESSION['USER']=$usuario;
		            		echo 1;
		            	}else{echo "Password Incorrecta";}
		            }
		        }
		        if ($_SESSION['login']=="0"){echo "Usuario No Registrado";}
		        mysqli_free_result($result);// Free result set
		    }else{echo "No records matching your query were found.";}
		}else{echo "Imposible Ejecutar $sql".mysqli_error($con);}
		//}
	}else{echo "Complete todos los datos";}
	////////////////CLOSE////////////////////////////////////////////////////1
	mysqli_close($con);
?>