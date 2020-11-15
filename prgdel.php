<?php 
	if(!isset($_SESSION)){session_start();}
	include 'credentials.php';
	$con = mysqli_connect ($phphost, $phpuser, $phppw) or die ("Problemas al conectar".mysqli_connect_error());
	mysqli_select_db ($con,$phpdb) or die ("Problemas al seleccionar".mysqli_error($con));
	if (!isset($_SESSION['USER'])){$user=$_POST['USER'];}else{$user=$_SESSION['USER'];}
	/////////////////////TABLE ROWS////////////////////////////////////////////////////////	
	$OK=0;$NOOK=0;$error="";
	$u = explode("$",$_POST['prgdel']);
	for($i=0;$i<count($u);$i++){
		if($u[$i]!=""){
			$sql = "DELETE FROM programas WHERE ID=".$u[$i];
			if(mysqli_query($con, $sql)){$OK=$OK+1;}
			else{$NOOK=$NOOK+1;$error+= "ERROR: Could not able to execute $sql. " . mysqli_error($con);}
		}
	}
	if ($NOOK==0) {echo "1";}
	else{echo "No fue posible eliminar todos los programas:"+$error;}

	////////////////CLOSE////////////////////////////////////////////////////1
	mysqli_close($con);
?>