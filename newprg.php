<?php 
	if(!isset($_SESSION)){session_start();}
	include 'credentials.php';
	$con = mysqli_connect ($phphost, $phpuser, $phppw) or die ("Problemas al conectar".mysqli_connect_error());
	mysqli_select_db ($con,$phpdb) or die ("Problemas al seleccionar".mysqli_error($con));
	if (!isset($_SESSION['USER'])){$user=$_POST['USER'];}else{$user=$_SESSION['USER'];}
	if ($_POST['prgid']==0) {////////////////INSERT////////////////////////////////////////////////////		
		$sql = "INSERT INTO programas (USER,NOMBRE,ESTADO,DIAS,HORAINICIO,HORAFIN,DEVICES) 
		VALUES ('".$user."','".$_POST['nprg']."','".$_POST['state']."','".$_POST['days']."','".$_POST['HHINICIO']."','".$_POST['HHFIN']."','".$_POST['dev']."')";
		if(mysqli_query($con, $sql)){echo "NID". mysqli_insert_id($con);}
		else {echo "ERROR: Could not able to execute $sql. ".mysqli_error($con);}
	}else{////////////////MODIFY////////////////////////////////////////////////////
		$sql = "UPDATE programas SET 
		NOMBRE='".$_POST['nprg']."',
		DIAS='".$_POST['days']."',
		HORAINICIO='".$_POST['HHINICIO']."',
		HORAFIN='".$_POST['HHFIN']."',
		DEVICES='".$_POST['dev']."'
		WHERE ID='".$_POST['prgid']."'";
		if(mysqli_query($con, $sql)){echo "NID".$_POST['prgid'];
		} else {echo "ERROR: Could not able to execute $sql. " . mysqli_error($con);}
	}
	////////////////CLOSE////////////////////////////////////////////////////1
	mysqli_close($con);
?>