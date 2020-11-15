<?php

	////////////////CONNECTION////////////////////////////////////////////////////1
	$host = "localhost";
	$user = "root";
	$pw = "prueba123";
	$db = "id9898104_prueba";
	$con = mysqli_connect ($host, $user, $pw) or die ("Problemas al conectar".mysqli_connect_error());
	mysqli_select_db ($con,$db) or die ("Problemas al seleccionar".mysqli_error($con));
	if (isset($_POST['action'])){$action=$_POST['action'];}
	////////////////INSERT////////////////////////////////////////////////////1
	if ($action=="insert") {
		if (isset($_POST['user']) && !empty($_POST['pass'])){
			$usuario = $_POST["user"];
			$password = $_POST["pass"];
			mysqli_query($con, "INSERT INTO LOGIN (USER,PASS) VALUES ('$usuario','$password')") or die ("Problemas al conectar".mysqli_error($con));
			//echo "Registro Correcto";
			header("Location: http://localhost/generic.html");	
		}else{
			echo "insert incorrect";
		}
	}
	////////////////DELETE////////////////////////////////////////////////////1
	if ($action=="delete") {
		$sql = "DELETE FROM LOGIN WHERE ID='2'";
		if(mysqli_query($con, $sql)){echo "Records were deleted successfully.";}
		else{echo "ERROR: Could not able to execute $sql. " . mysqli_error($con);}
	}
	////////////////SELECT////////////////////////////////////////////////////1
	if ($action=="select") {
		$sql = "SELECT * FROM login";
		if($result = mysqli_query($con, $sql)){
		    if(mysqli_num_rows($result) > 0){
		        echo "<table>";
		            echo "<tr>";
		                echo "<th>id</th>";
		                echo "<th>USER</th>";
		                echo "<th>PASS</th>";
		            echo "</tr>";
		        while($row = mysqli_fetch_array($result)){
		            echo "<tr>";
		                echo "<td>" . $row['ID'] . "</td>";
		                echo "<td>" . $row['USER'] . "</td>";
		                echo "<td>" . $row['PASS'] . "</td>";
		            echo "</tr>";
		        }
		        echo "</table>";
		        // Free result set
		        mysqli_free_result($result);
		    } else{
		        echo "No records matching your query were found.";
		    }
		} else{
		    echo "ERROR: Could not able to execute $sql. " . mysqli_error($con);
		}
	}
	////////////////MODIFY////////////////////////////////////////////////////1
	if ($action=="MODIFY") {
		$sql = "UPDATE login SET PASS='700' WHERE ID=1";
		if(mysqli_query($con, $sql)){
		    echo "Records were updated successfully.";
		} else {
		    echo "ERROR: Could not able to execute $sql. " . mysqli_error($con);
		}
	}
	////////////////CLOSE////////////////////////////////////////////////////1
	mysqli_close($con);
?>