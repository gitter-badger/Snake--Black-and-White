var lastPush = 1350

game.objects = {}
game.objects.brick = {width: 20, height: 20}
game.objects.brick2 = {width: 10, height: 10}
game.objects.brick3 = {width: 10, height: 10}


game.platforms = []
game.coins = []
game.enemies = []
game.endpoints = []
game.gates = []


game.platforms[1] = [
	{x: 50, y: 600, width: 400, height: 50, type: "brick", variable: brick, shm: false},
	{x: 700, y: 600, width: 400, height: 50, type: "brick", variable: brick, shm: false},
	{x: 1350, y: 600, width: 400, height: 50, type: "brick", variable: brick, shm: false},
	//{x: 2100, y: 600, width: 400, height: 50, type: "brick", variable: brick, shm: false},
	//{x: 2750, y: 600, width: 400, height: 50, type: "brick", variable: brick, shm: false},
	//{x: 3400, y: 600, width: 400, height: 50, type: "brick", variable: brick, shm: false},
];

game.coins[1] = [

];

game.enemies[1] = [
	{x: 1000, y: 520, width:75, height:75, shm:{max:1110, min:974}, alive: true, going_positive: true,  speed: 0.3},
	{x: 1390, y: 520, width:75, height:75, shm:{max:1438, min:1313}, alive: true, going_positive: true,  speed: 0.3},
	{x: 1430, y: 520, width:75, height:75, shm:{max:1438, min:1313}, alive: true, going_positive: true,  speed: 0},

]

game.gates[1] = {x:2800, y: 300, width: 200, height: 200}
game.endpoints[1] = {start: {x: 50, y:200} }





game.player.x = game.endpoints[level].start.x
game.player.y = game.endpoints[level].start.y