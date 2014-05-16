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
			var context = canvas.getContext("2d");
			var moving_direction = "right"
			var canvas_width = 750
			var canvas_height = 500
			var foodLocation = {}
			var snake = {}
			
			canvasSettings();
			restartGame();
			
			setInterval(function() {
				context.clearRect(0,0,canvas_width,canvas_height);
				if(detectCollisionOfSnakeWithFood()) {
					generateNewFood();
					increaseLengthOfSnake();
				}
				detectCollisionOfSnakeWithSnake();
				updatePositionsOfOldPoints();
				updateFrontPoints();
				drawFood();
				drawSnake();
			}, 60);
			
			function canvasSettings() {
			
				canvas.setAttribute("width", canvas_width+"px");
				canvas.setAttribute("height",canvas_height+"px");
				document.getElementById("leaderboard").setAttribute("width", (window.innerWidth -canvas_width) + "px");
				document.getElementById("leaderboard").setAttribute("height", (window.innerHeight - canvas_height) + "px");
				context.fillStyle = "#FFFFFF";
				document.getElementById("header").setAttribute("style", "width:" + (window.innerWidth-30) + "px;" + "height:" + (window.innerHeight - canvas_height - 80) + "px;");
			}
			
			function restartGame() {
				foodLocation = {}
				foodLocation.width = 40;
				foodLocation.height = 40;
				foodLocation.x = Math.floor(Math.random()*canvas_width*3/4) + 2 * foodLocation.width;
				foodLocation.y = Math.floor(Math.random()*canvas_height*3/4) + 2 * foodLocation.height;
				snake.length = 3
				snake.position = []
				snake.position[1] = {x:canvas_width/2, y:canvas_height/2, width:10, height:10}
				snake.position[2] = {x:canvas_width/2 - snake.position[1].width, y:canvas_height/2, width:snake.position[1].width, height:snake.position[1].height}
				snake.position[3] = {x:canvas_width/2 - 2* snake.position[1].width, y:canvas_height/2, width:snake.position[1].width, height:snake.position[1].height}
			}
			
			function detectCollisionOfSnakeWithSnake() {
				for(i=1;i<=snake.length;i++) {
					if(i-j <= 5 || i-j <= -5) continue;
					if(detectCollision(snake.position[1], snake.position[i])) {
						alert("Game Over");
						handleGameOver();
					}
				}
			}
			
			function detectCollision(box1, box2) {
				return (box1.x < box2.x + box2.width && box2.x < box1.x + box1.width && box1.y < box2.y + box2.height && box2.y < box1.y + box1.height)
			}

			function generateNewFood() {
				foodLocation.x = Math.floor(Math.random()*canvas_width*3/4) + 30;
				foodLocation.y = Math.floor(Math.random()*canvas_height*3/4) + 30;
			}
			
			function increaseLengthOfSnake() {
				snake.length++;
				snake.position[snake.length] = {}
				snake.position[snake.length].x = snake.position[snake.length-1].x
				snake.position[snake.length].y = snake.position[snake.length-1].y
				snake.position[snake.length].width = 10;
				snake.position[snake.length].height = 10;
			}
			
			function drawFood() {
				context.fillRect(foodLocation.x, foodLocation.y, foodLocation.width, foodLocation.height);
			}
			
			function detectCollisionOfSnakeWithFood() {
				return detectCollision(foodLocation, snake.position[1]);	
			}
			
			function updatePositionsOfOldPoints() {
				for(i=snake.length;i>=2;i--) {
					snake.position[i].x = snake.position[i-1].x
					snake.position[i].y = snake.position[i-1].y
				}
			}
		
			function updateFrontPoints() {
				if(moving_direction == "right") {
					snake.position[1].x += 15;
				}
				
				if(moving_direction == "left") {
					snake.position[1].x -= 15;
				}
				
				if(moving_direction == "up") {
					snake.position[1].y -= 15;
				}
				
				if(moving_direction == "down") {
					snake.position[1].y += 15;
				}
				
				if(snake.position[1].x > canvas_width) snake.position[1].x = 0;
				if(snake.position[1].x < 0) snake.position[1].x = canvas_width;
				if(snake.position[1].y > canvas_height) snake.position[1].y = 0;
				if(snake.position[1].y < 0) snake.position[1].y = canvas_height;
				
				/*
				if(snake.position[1].y > canvas_height) snake.position[1].y -= canvas_height;
				
				if(snake.position[1].y < canvas_height) snake.position[1].y += canvas_height;
				*/
			}
			
			function drawSnake() {
				for(i=1;i<=snake.length;i++) {
					context.fillRect(snake.position[i].x, snake.position[i].y, snake.position[i].width, snake.position[i].height);
				}
			}
			
			function postScoreToFacebook() {
			
			}
			
			function handleGameOver() {
				postScoreToFacebook();
				restartGame();
			}
			
			window.onkeydown = function(event) {
				if(event.keyCode == 37 && moving_direction != "right") {
					moving_direction = "left";
				}
				if(event.keyCode == 38 && moving_direction != "down") {
					moving_direction = "up";
				}
				if(event.keyCode == 39 && moving_direction != "left") {
					moving_direction = "right";
				}
				if(event.keyCode == 40 && moving_direction != "up") {
					moving_direction = "down";
				}
				if(event.keyCode >= 37 && event.keyCode <= 40)
					return false;			
			}
		
		</script>
		<!-- -->
	</html>
