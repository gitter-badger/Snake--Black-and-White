speed = 3
var lastKeyPressed_left_or_right = "right";
var max_frame = 0;
var frame = 0;
var game = {}
var coordinates = {x:0, y:0}
var showStartUpScreen = true
var showLives = 0
var showLevels = 0
var showGameOver = 0
var mouse_pressed = false
var collidedWithEnemy = false
var level = 1
var showHappiness = 0
var startPlatform = 0
var endPlatform
var printHighScore = 0

function decreaseSpeed() {
	speed = (3 + speed)/2
}

function deletePlatforms() {
	
	i = startPlatform
	while(game.platforms[1][i++].x + 1000 < frame) { startPlatform++; }
}

function createPlatforms() {
	if(frame + window.innerWidth + 300 > game.platforms[1][game.platforms[1].length-1].x ) {
		k = game.platforms[1][game.platforms[1].length-1].x + Math.floor((Math.random()*600))+300
		game.platforms[1].push({x: k, y: 600, width: 400, height: 50, type: "brick", variable: brick, shm: false})
		game.enemies[1].push({x: k + Math.random() * 400, y: 520, width:75, height:75, shm:{max:1438, min:1313}, alive: true, going_positive: true,  speed: 0})
		
	}
}

//showLevels = 1;

//Sounds
var jump_on_enemy = []
for(i=0;i<5;i++) {
 jump_on_enemy[i] = new Audio()
 jump_on_enemy[i].src = "Sounds/firework.mp3"
}
var gameover_really = new Audio()
gameover_really.src = "Sounds/gameover_really.mp3"
var jump = new Audio()
var gameover_sound = new Audio()
jump.src = "Sounds/jump.mp3"
gameover_sound.src = "Sounds/gameover.mp3"
var main_music = new Audio()
jump_on_enemy.src = "Sounds/firework.mp3"
main_music.src = "Sounds/main.mp3"
var coin_taken = []
for(i=0;i<10;i++) {
	coin_taken[i] = new Audio()
	coin_taken[i].src = "Sounds/coin.mp3"
}

//Images that i usied in game.
var gameover_image = new Image()
var coin = new Image()
var forward_mario = new Image()
var mario_rev = new Image()
var brick = new Image()
var brick2 = new Image()
var brick3 = new Image()
var enemy = new Image()

gameover_image.src = "Images/gameover.png"
brick3.src = "Images/brick3.jpg"
enemy.src = "Images/enemy.png"
coin.src = "Images/coin.gif"
brick2.src = "Images/brick2.png";
brick.src = "Images/brick.png";
forward_mario.src = "Images/mario.png";
mario_rev.src = "Images/mario_rev.gif";

//Getting context.
var canvas = document.getElementById("mario_game")
var context = canvas.getContext("2d")

//KeyBoard keys currently pressed.

game.keyboard = []
for(i=0;i<256;i++) {
	game.keyboard.push(0);
}

window.onkeyup = function(event) {
	game.keyboard[getKey(event)] = 0;
}

window.onmousedown = function() {
	mouse_pressed = true;
}

window.onmouseup = function() {
	mouse_pressed = false;
}

window.onkeydown = function(event) {
	if(lastKeyPressed_left_or_right == "right" && event.keyCode == 37) decreaseSpeed();
	if(event.keyCode == 37) lastKeyPressed_left_or_right = "left";
	if(event.keyCode == 39) lastKeyPressed_left_or_right = "right";
	game.keyboard[getKey(event)] = 1;
}


//Properties of canvas.
game.canvas = {}
game.canvas.width = window.innerWidth - 20
game.canvas.height = window.innerHeight - 20
canvas.setAttribute("width", game.canvas.width+"px")
canvas.setAttribute("height", game.canvas.height+"px")

// Properties of player.
game.player = {}
game.player.collided = false
game.player.collided_direction = ""
game.player.x = 40
game.player.y = 40
game.player.default_width = 120
game.player.default_height = 160
game.player.width = 120
game.player.height = 160
game.player.gravity = 0.06
game.player.velocity_x = 0
game.player.velocity_y = 0
game.player.lives = 3
game.player.coins_taken = 0

game.player.draw_player = function() {

	if(game.keyboard[37]) mario = mario_rev;
	else mario = forward_mario;
	
	context.drawImage(mario, game.player.x - frame, game.player.y, game.player.width, game.player.height);

}

game.player.changeXY = function() {
		game.player.x += speed;
		speed += 0.001
		if(game.player.collided == true && (game.keyboard[38] || game.keyboard[32]) && game.player.collided_direction=="down") {
			jump.play()
			game.player.velocity_y = -4.5
		}
		if(game.keyboard[37] && game.player.x > max_frame) { game.player.x -=2;  }
		if(game.keyboard[39]  && game.player.collided_direction != "right") {
			//	if(game.keyboard[16]) 
			//	game.player.x +=2;			
		}
		if(game.player.collided == true && game.player.velocity_y > 0) return;
		game.player.velocity_y += game.player.gravity
		game.player.y += game.player.velocity_y
}

game.detectCollision = function(box1, box2) {
	ans =  (box1.x <= box2.x + box2.width && box2.x <= box1.x + box1.width && box1.y <= box2.y + box2.height && box2.y <= box1.y + box1.height)
	return ans	
}

game.detectCollisions = function() {
	var resultforloop = false;
	for(i=startPlatform;i<game.platforms[level].length;i++) {
		if(game.detectCollision(game.player, game.platforms[level][i])) {
			resultforloop = true;
			game.player.collided = true;
			
			if(game.player.y + game.player.height - game.platforms[level][i].y < 10) {
				if(game.platforms[level][i].shm == true) {
						if(game.platforms[level][i].shm_info.shm_in == "x") {
						if(game.platforms[level][i].shm_info.moving_positive == true) game.player.x  += 0.5;
						else game.player.x  -= 0.5;		
					}
				}
				game.player.velocity_y = 0
				game.player.collided_direction = "down";
				game.player.y = game.platforms[level][i].y - game.player.height;
				return;
			}
			
			else if(Math.abs(game.player.y - game.platforms[level][i].height - game.platforms[level][i].y) < 5) {
				game.player.collided_direction = "up";
				game.player.y = game.platforms[level][i].y + game.platforms[level][i].height + 1
				game.player.velocity_y = 0
				resultforloop = false;
				game.player.collided = false;
//				return;
			}
			
			
			
			else if(game.keyboard[39]) {				
				game.player.collided_direction = "right";
				game.player.x = game.platforms[level][i].x - game.player.width - 10;
				game.player.y = game.platforms[level][i].y + game.platforms[level][i].height;
//				game.player.velocity_y = 0;
				return;
			}
			else if(game.keyboard[37]) {
				game.player.collided = false;
				game.player.x = game.platforms[level][i].x + game.platforms[level][i].width + 1
				game.keyboard.collided_direction = "left";
				game.player.y = game.platforms[level][i].y + game.platforms[level][i].height;
//				game.player.velocity_y = 0;
				return;
			}
			
			else if(game.keyboard[38]) game.player.velocity_y = 0;
		
			
			return;
		}	
		
		else {
			if(resultforloop == true) return;		
		}
	}
	
	if(resultforloop == false) {
		game.player.collided = false;
		game.player.collided_direction = "none";
	}
}



game.draw_enemies = function() {
	for(i=0;i<game.enemies[level].length;i++) {
		if(game.enemies[level][i].alive) {
			context.drawImage(enemy, game.enemies[level][i].x - frame, game.enemies[level][i].y, game.enemies[level][i].width, game.enemies[level][i].height);
		} else {
			if(game.enemies[level][i].height > 0)
				context.drawImage(enemy, game.enemies[level][i].x - frame, game.enemies[level][i].y, game.enemies[level][i].width, game.enemies[level][i].height);
		}
	}
}

game.shm_enemies = function() {
	for(i=0;i<game.enemies[level].length;i++) {
		if(game.enemies[level][i].alive) {
			if(Math.floor(game.enemies[level][i].x) == game.enemies[level][i].shm.min) {
				game.enemies[level][i].x = game.enemies[level][i].shm.min + 1;
				game.enemies[level][i].going_positive = true;
			} else if(Math.floor(game.enemies[level][i].x) == game.enemies[level][i].shm.max) {
				game.enemies[level][i].x = game.enemies[level][i].shm.max - 1;
				game.enemies[level][i].going_positive = false;
			} else {
				if(game.enemies[level][i].going_positive) game.enemies[level][i].x+= game.enemies[level][i].speed;
				else game.enemies[level][i].x-= game.enemies[level][i].speed;
			}
		} else {
			if(game.enemies[level][i].height > 0) {
				jump_on_enemy[i%5].play()
				game.enemies[level][i].y += 0.9
				game.enemies[level][i].height -= 0.9
			}
		}
	}
}

game.shm_platforms = function() {
	for(i=startPlatform;i<game.platforms[level].length; i++) {
		if(game.platforms[level][i].shm == true) {
			if(game.platforms[level][i].shm_info.shm_in == "x") {
					if(game.platforms[level][i].x == game.platforms[level][i].shm_info.max_x) game.platforms[level][i].shm_info.moving_positive = false;
					if(game.platforms[level][i].x == game.platforms[level][i].shm_info.min_x) game.platforms[level][i].shm_info.moving_positive = true;
					
					if(game.platforms[level][i].shm_info.moving_positive) game.platforms[level][i].x += 0.5
					else game.platforms[level][i].x -= 0.5
				
			} else {
					if(game.platforms[level][i].y == game.platforms[level][i].shm_info.max_y) game.platforms[level][i].shm_info.moving_positive = false;
					if(game.platforms[level][i].y == game.platforms[level][i].shm_info.min_y) game.platforms[level][i].shm_info.moving_positive = true;
					
					if(game.platforms[level][i].shm_info.moving_positive) game.platforms[level][i].y += 0.5
					else game.platforms[level][i].y -= 0.5
				
		
			}
		}
	}
}

game.draw_platforms = function() {
	for(i=startPlatform;i<game.platforms[level].length;i++) {
			var x_start = game.platforms[level][i].x
			var y_start = game.platforms[level][i].y
			var x_number = game.platforms[level][i].width / game.objects[game.platforms[level][i].type].width;
			var y_number = game.platforms[level][i].height / game.objects[game.platforms[level][i].type].height;
			
			
			for(k=0;k<x_number;k++) {
				for(l=0;l<y_number;l++) {
					context.drawImage(game.platforms[level][i].variable, x_start + game.objects[game.platforms[level][i].type].width * k - frame, y_start + game.objects[game.platforms[level][i].type].height * l, game.objects[game.platforms[level][i].type].width, game.objects[game.platforms[level][i].type].height)
				}
			}
	}
}

function moveFrame() {
	frame = Math.max(frame,game.player.x - game.canvas.width/2)
	max_frame = frame
}

function getKey(event) {
	if(event.charCode == 0) return event.keyCode;
	return event.charCode;
}

function draw() {
	
	if(showStartUpScreen == true) {
			
			context.clearRect(0, 0, game.canvas.width, game.canvas.height)
			showBackground()
			game.player.draw_player()
			game.shm_platforms()
			writeToHomeScreen()
			game.draw_platforms()
			game.draw_coins()
			game.shm_enemies()
			game.draw_enemies()
		} else if(showHappiness) {
			decreaseSizeOfPlayer(0.5)
			showHappiness++;
			context.clearRect(0, 0, game.canvas.width, game.canvas.height)
			showBackground()
			drawGates()
			game.shm_platforms()
			game.draw_platforms()
			game.player.draw_player()
			game.draw_coins()
			game.shm_enemies()
			main_music.pause()
			game.draw_enemies()
			jump_on_enemy[Math.floor(Math.random() * 5)].play()
			jump_on_enemy[Math.floor(Math.random() * 5)].play()
			if(showHappiness > 300) {
				showHappiness = 0;
				showLevels = 1;
			}
			
		} else if(showLives)  {
			if(printHighScore == 0) {
				printHighScore = 1;
				publishHighScoreToFacebook();
			}
			if(gameover_sound.ended) {
			/*
				if(showLives == 1) {
					decreaseSizeOfPlayer()
					game.player.lives -=1;
					frame = 0;
					max_frame = 0;
					game.player.x = game.endpoints[level].start.x;
					game.player.y = game.endpoints[level].start.y;
		
					refreshKeyboard()
				}
			*/
				context.clearRect(0, 0, game.canvas.width, game.canvas.height)
				showBackground()
				showLivesInText()
				writeCoordinates()
				showLives++;
				//if(showLives > 500) showLives = 0;
				
			} else {
				context.clearRect(0, 0, game.canvas.width, game.canvas.height)
				showBackground()
				decreaseSizeOfPlayer(0.03)
				game.draw_platforms()
				game.player.draw_player()
				game.draw_coins()
				game.draw_enemies()
				
			}
			
		} else if(showGameOver) {
				
				if(showGameOver++ > 700) {
					window.location.href += ""
				}
			
		} else if(showLevels) {
		/*
			main_music.pause()
			context.clearRect(0, 0, game.canvas.width, game.canvas.height)
			writeCoordinates()
			showLevels++;
			if(showLevels > 500) {
				showLevels = 0;
				restartLevel()
			}
		*/
		} else {
			createPlatforms()
			deletePlatforms()
			context.clearRect(0, 0, game.canvas.width, game.canvas.height)
			showBackground()
			writeCoordinates()
			moveFrame()
			game.detectCollisions()
			if(game.player.collided_direction == "none") game.player.collided = false;
			game.shm_platforms()
			game.player.changeXY()
			game.draw_platforms()
			game.player.draw_player()
			game.detectCollisionWithCoins()
			game.draw_coins()
			game.shm_enemies()
			main_music.play()
			game.draw_enemies()
			game.detectCollisionWithEnemies()	
			if(gameover()) handleGameOver()
				putScore()
	}
}

function gameover() {
//	if(game.player.x < frame - game.player.width) handleGameOver()
//	if(game.player.x < frame) game.player.x = frame;
	if(game.player.y > game.canvas.height) return true;
	if(collidedWithEnemy) {
		collidedWithEnemy = false;
		return true;
	}
}

function handleGameOver() {
	main_music.pause()
	if(game.player.lives > 1) {
		gameover_sound.play()
		showLives = 1;

		
	} else {
		context.drawImage(gameover_image, 200, 200);
		game.player.lives = 0;
		gameover_really.play()
		showGameOver = 1;
	}
}

game.draw_coins  = function() {
	for(i=0;i<game.coins[level].length; i++) {
		if(game.coins[level][i].taken == false) {
			context.drawImage(coin, game.coins[level][i].x - frame, game.coins[level][i].y, game.coins[level][i].width, game.coins[level][i].height);
		}
		if(game.coins[level][i].taken == true && game.coins[level][i].width > 0) {
			game.coins[level][i].width = game.coins[level][i].width - 0.5;
			game.coins[level][i].y = game.coins[level][i].y - 3;
			context.drawImage(coin, game.coins[level][i].x - frame, game.coins[level][i].y, game.coins[level][i].width, game.coins[level][i].height);
		}
	}
}

game.detectCollisionWithCoins = function() {
	for(i=0;i<game.coins[level].length;i++) {
		if(game.coins[level][i].taken == false) {
			if(game.detectCollision(game.player, game.coins[level][i])) {
				coin_taken[i%10].play()
				game.coins[level][i].taken = true;
				game.player.coins_taken++;
			}
		}
	}
}

game.detectCollisionWithEnemies = function() {
	for(i=0;i<game.enemies[level].length;i++) {
		if(game.enemies[level][i].alive) {
			if(game.detectCollision(game.player, game.enemies[level][i]) && ((game.player.y + game.player.height) - game.enemies[level][i].y < 5)) {
				game.player.velocity_y = -4.5
				game.enemies[level][i].alive = false;
			} else if(game.detectCollision(game.player, game.enemies[level][i])) {
				collidedWithEnemy = true;
			}
		}
	}
}

function putScore() {
	document.getElementById("score_coins").innerHTML = "<center> <strong> Score </strong> <br><br>" + Math.floor(game.player.x/100) + "</center>";
}

canvas.onmousemove = function(event) {
	coordinates.x = (event.clientX - (window.innerWidth - canvas.clientWidth)/2) + 9;
	coordinates.y = event.clientY - 50
} 

function writeToHomeScreen() {
		context.fillStyle = "#000000"
		context.font = "30px Arial"
		context.fillText("Mario Brothers", 100, 100)
		context.strokeStyle = "#FF0000"
		context.strokeText("Mario Brothers", 100, 100)
		context.font= "10px Arial"
		try {
			context.fillText("X: "+ coordinates.x +", Y: "+ coordinates.y, 70, 50)
		} catch(e) {
		
		}
		context.lineWidth = 3
		context.strokeStyle = "#00FF00"
		context.fillRect(400, 100, 150, 50);
		context.strokeRect(400, 100, 150, 50);
		context.lineWidth = 1
		context.font = "30px Arial"
		if(game.keyboard[83]) showStartUpScreen = false;
		if(game.detectCollision({x:coordinates.x, y:coordinates.y, width:0, height:0},{x:400, y:100, width: 150, height:50})) {
			context.fillStyle = "#FFFF00"
			if(mouse_pressed) { 
				showStartUpScreen = false;
			}
		}
		else context.fillStyle = "#00FF00"
		context.fillText("Start", 435, 135)
		context.fillStyle="#000000"
		
}



function refreshKeyboard() {
	for(i=0;i<game.keyboard.length;i++) {
		game.keyboard[i] = 0;
	}
}

function restartLevel() {
	level++;
	decreaseSizeOfPlayer()
	game.player.x = game.endpoints[level].start.x;
	game.player.y = game.endpoints[level].start.y;
	frame = 0;
	max_frame = 0;
}



function decreaseSizeOfPlayer(decreaseBy) {
	if(decreaseBy == undefined) {
		game.player.y = game.player.y + game.player.height - game.player.default_height 
		game.player.width = game.player.default_width
		game.player.height = game.player.default_height
		return;
	}
	decreaseByForX = (game.player.width/game.player.height) * decreaseBy;
	if(game.player.width - 2*decreaseByForX < 0 || game.player.height - 2*decreaseBy < 0) return;
	
	
	game.player.x += decreaseByForX;
	game.player.width -= 2*decreaseByForX;
	game.player.y += decreaseBy;
	game.player.height -= 2*decreaseBy;
	
}

function writeCoordinates() {
	var old_font = context.font;
	context.font = "10px Arial";
	context.fillText("X: "+ (frame + coordinates.x) +", Y: "+ coordinates.y, 70, 50)
	context.font = old_font;
}

function showLivesInText() {
	var old_font = context.font;
	context.font = "20px Arial";
	context.fillText("Lives left: Mario x " + game.player.lives, 230, 200);
	context.font = old_font;

}

function showBackground() {
	
}
function publishHighScoreToFacebook() {
	alert("Published HighScore to facebook");
	window.location.href = window.localtion.href;
}