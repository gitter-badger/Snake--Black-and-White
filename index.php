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

				#leaderboard {
					overflow:scroll;
				}

			</style>
		</head>

		<body>
			<table> 
				<tr>
					<td>
						<canvas id="canvas"> </canvas>
					</td>
					<td id="leaderboard">
						LeaderBoard
					</td>
				</tr>
		
			
		</body>
		<script>
			var canvas = document.getElementById("canvas");
			var context = document.getElementById("context");

			canvas.setAttribute("width", 600+"px");
			canvas.setAttribute("height",400+"px");

			document.getElementById("leaderboard").setAttribute("width", (window.innerWidth -600) + "px");
			document.getElementById("leaderboard").setAttribute("height", (window.innerHeight - 400) + "px");

		</script>
	</html>
