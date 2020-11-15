<?php
if(!isset($_SESSION)){session_start();}
include 'credentials.php';
echo $_SESSION['USER'];;
exit;
?>


