<?php 
	if(!isset($_SESSION)){session_start();}
	include 'credentials.php';
	$con = mysqli_connect ($phphost, $phpuser, $phppw) or die ("Problemas al conectar".mysqli_connect_error());
	mysqli_select_db ($con,$phpdb) or die ("Problemas al seleccionar".mysqli_error($con));
	if (!isset($_SESSION['USER'])){$user=$_POST['USER'];}else{$user=$_SESSION['USER'];}
	////////////////MODIFY////////////////////////////////////////////////////1
	$sql = "UPDATE programas SET ESTADO=".$_POST['ESTADO']." WHERE ID=".$_POST['ID']."";
	if(mysqli_query($con, $sql)){echo "1";
	} else {echo "ERROR: Could not able to execute $sql. " . mysqli_error($con);}
	////////////////CLOSE////////////////////////////////////////////////////1
	mysqli_close($con);
?>