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
					border:3px double pink;
				}

				#header {
					border:1px solid black;
				}

			</style>
		</head>

		<body>
			<div id="header">
				Here will be the header!
			</div>
			<table> 
				<tr>
					<td>
						<canvas id="canvas"> </canvas>
					</td>
					<td id="leaderboard">
						LeaderBoard
					</td>
				</tr>
			</table>
		
			
		</body>
		<script>
			var canvas = document.getElementById("canvas");
			var context = document.getElementById("context");
			var canvas_width = 750
			var canvas_height = 500

			canvas.setAttribute("width", canvas_width+"px");
			canvas.setAttribute("height",canvas_height+"px");

			document.getElementById("leaderboard").setAttribute("width", (window.innerWidth -canvas_width) + "px");
			document.getElementById("leaderboard").setAttribute("height", (window.innerHeight - canvas_height) + "px");

			document.getElementById("header").setAttribute("style", "width:" + (window.innerWidth-30) + "px;" + "height:" + (window.innerHeight - canvas_height) + "px;");

		</script>
		<!-- -->
	</html>
