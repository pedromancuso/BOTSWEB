<?php
if(!isset($_SESSION)){session_start();}
header("Access-Control-Allow-Origin: *");
include "webuser.html";
?>