<?php
session_start();
echo "<!DOCTYPE HTML>
<html>
	<head>
		<title>BOTS</title>
		<meta charset='utf-8' />
		<link rel='icon' href='./images/logo.ico' type='image/x-icon'>
		<meta name='viewport' content='width=device-width, initial-scale=1' />
		<!--[if lte IE 8]><script src='assets/js/ie/html5shiv.js'></script><![endif]-->
		<link rel='stylesheet' href='assets/css/main.css' />		
		<!--[if lte IE 8]><link rel='stylesheet' href='assets/css/ie8.css' /><![endif]-->
		<!--[if lte IE 9]><link rel='stylesheet' href='assets/css/ie9.css' /><![endif]-->
	</head>
	<body class='landing'>

		<!-- Header -->
			<header id='header' class='alt' style='position: fixed;top: 0;padding: 0em 1em;background: #1b2835;'>
				<h1><a href='index.html'>BOTS</a></h1>
				<!--a href='#nav'>Login</a-->
				<a href='#nav' style='cursor: pointer;'>Login</a>
			</header>

		<!-- Nav -->
			<nav id='nav'>
				<div class='major narrow'>
					<h2 style='color: #ffffff'>Login</h2>
				</div>
				<div id='loginmod'> 
					<!--form action='./login.php' method='POST'-->
					<div>
						<input style='display:none' name='action' value='login'/>
						<div class='12u$(xsmall)'>
							<input style='margin: 1em 0em' id='user' name='user' placeholder='User' type='text' />
						</div>
						<div class='12u$(xsmall)'>
							<input style='margin: 1em 0em' id='pass' name='pass' placeholder='Password' type='password' />
						</div>
					</div>
					<div id='result'></div>
					<div class='actions' style='margin:1em 0;'>
						<div>
							<!--input id='SignIn' type='reset' class='alt' value='Sign In' /-->
							<input style='width:100%' id='login' type='submit' class='special' value='Login' />
						</div>
					</div>
					<div id='recuperarcontraseña' style='text-align:center;margin:1em 0;cursor:pointer'>¿Olvido su contraseña?</div>
				</div>
				<div id='recucontramod' style='display:none'>
				<div>Ingrese E-mail para enviar contraseña de recupero</div>
					<div>
						<div class='12u$(xsmall)'>
							<input style='margin: 1em 0em' id='recuuser' name='recuuser' placeholder='Usuario' type='text' />
						</div>
						<div class='12u$(xsmall)'>
							<input style='margin: 1em 0em' id='mailrecu' name='mailrecu' placeholder='E-mail' type='email' />
						</div>
					</div>
					<div id='resultrecu'></div>
					<div class='actions' style='margin:1em 0;'>
						<div>
							<input style='min-width:49%' id='cancelrecu' type='reset' class='alt' value='Cancel' />
							<input style='min-width:49%' id='recuperar' type='submit' class='special' value='Recuperar!' />
						</div>
					</div>
				</div>
			</nav>
		<!-- Banner -->
			<section id='banner'>
				<!--i class='icon fa-diamond'></i-->
				<img src='./images/logo.png' style='width: 125px'>
				<h2>BOTS</h2>
				<p>Automatización de Procesos</p>
				<ul class='actions'>
					<li><a href='#main' class='button big special'>Conocenos</a></li>
				</ul>
			</section>


			<!-- Three -->
			<section id='main' class='wrapper'>
				<div class='container'>

					<header class='major special'>
						<h2>Una premisa simple...</h2>
						<p>Robótica al servicio del pueblo</p>
					</header>

					<a href='#'' class='image fit'><img src='images/pic11.jpg' alt='' /></a>
					<p>Respuestas sencillas para problemas algo más complejos: cualquiera, sin conocimientos de ingeniería, puede aprovechar su versatilidad para crear, por ejemplo, una impresora 3D, un taquígrafo portátil o un sistema de luces con temporizador similar al de un semáforo. Ya seas una empresa o un particular, pondremos el conocimiento y la tecnología a tu alcance. ¿Más ejemplos? Una simple puerta con cierre de seguridad controlado por internet.</p>
					<p>La automatización es el uso de tecnología para realizar tareas sin la asistencia humana. Algunos de los sectores que la utilizan son los de la fabricación, la robótica y el control vehicular. También está presente en el mundo de la tecnología: en los sistemas de TI y en los sistemas de software para la toma de decisiones empresariales.</p>
					<p>Acercar el 'Internet de las Cosas' al usuario de a pie sin necesidad de gastar una fortuna.</p>
					<p>Lo invitamos a descubrir el potencial de la Automatización.</p>

				</div>
			</section>

		<!-- Five -->
		<section id='five' class='wrapper style2 special' style='padding:8em 0 1em 0'>
			<div class='inner'>
				<header class='major narrow'>
					<h2>Contactanos</h2>
					<br>
					<p>Nos pondremos en contacto a la brevedad</p>
				</header>
				<form action='#' method='POST'>
					<div class='container 75%'>
							<div class='row uniform 50%'>
							<div class='6u 12u$(xsmall)'>
								<input name='name' placeholder='Nombre' type='text' />
							</div>
							<div class='6u$ 12u$(xsmall)'>
								<input name='email' placeholder='Email' type='email' />
							</div>
							<div class='12u$'>
								<textarea name='message' placeholder='Mensaje' rows='4'></textarea>
							</div>
						</div>
					</div>
					<ul class='actions'>
						<li><input type='reset' class='alt' value='Borrar' /></li>
						<li><input type='submit' class='special' value='Enviar' /></li>
					</ul>
				</form>
			</div>
		</section>

		<!-- Footer -->
			<footer id='footer'>
				<div class='inner' style='padding:1em 0 1em 0'>
					<ul class='copyright'>
						<li>&copy; BOTS.</li>
					</ul>
				</div>
			</footer>

		<!-- Scripts -->
			<script src='assets/js/mqttws31.js' type='text/javascript'></script> 	
			<script src='assets/js/jquery.min.js'></script>
			<script src='assets/js/skel.min.js'></script>
			<script src='assets/js/util.js'></script>
			<!--[if lte IE 8]><script src='assets/js/ie/respond.min.js'></script><![endif]-->
			<script src='assets/js/main.js'></script>
			<script src='./index.js'></script>
	</body>
</html>";
?>