<?php
	
?>

<!DOCTYPE html>
	<html>
		<head>
			<title>
				Mario Jumpak
			</title>
		
			<style>
				#canvas {
					background-color:black;
				}

			</style>
		</head>

		<body>
			 <canvas id="canvas"> </canvas>
		
			
		</body>
		<script>
			var canvas = document.getElementById("canvas");
			var context = document.getElementById("context");

			canvas.setAttribute("width", window.innerWidth+"px");
			canvas.setAttribute("height", window.innerHeight+"px");

		</script>

	</html>

