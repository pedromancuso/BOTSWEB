<?php 
	if(!isset($_SESSION)){session_start();}
	include 'credentials.php';
	$con = mysqli_connect ($phphost, $phpuser, $phppw) or die ("Problemas al conectar".mysqli_connect_error());
	mysqli_select_db ($con,$phpdb) or die ("Problemas al seleccionar".mysqli_error($con));
	if (!isset($_SESSION['USER'])){$user=$_POST['user'];}else{$user=$_SESSION['USER'];}
	/////////////////////TABLE ROWS////////////////////////////////////////////////////////
	/////////////////////TABLE ROWS////////////////////////////////////////////////////////
	$clientecomostring = "";
	$sql2 = "SELECT * FROM clientes";
	if($trresult = mysqli_query($con, $sql2)){
	    if(mysqli_num_rows($trresult) > 0){
	        while($trrow = mysqli_fetch_array($trresult)){
	        	if($trrow['USER']==$user){
	        		$clientecomostring .= "&ID=".$trrow['ID'];
        			$clientecomostring .= "&dev=".$trrow['DEVICE'];
					$clientecomostring.="$";
	            }
	        }echo $clientecomostring;
	        mysqli_free_result($trresult);
	    }else{echo "No records matching your query were found.";}
	}else{echo "Imposible ejecutar $sql. ".mysqli_error($con);}
;?>