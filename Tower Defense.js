"use strict";

/*****
ToDo:

	1. Game over when all lives lost ✔
	2. More efficient money gaining system ✔
	3. Provides tower stats when a tower is clicked on (time alive ✔, attack amount ✔)
	4. More Lives ✔
	5. More Towers ✔
	6. Allow the player to choose the mode (Easy ✔, Medium ✔, Hard ✔, Deflation ✔, Sandbox ✔) ✔
	7. More tracks (3 Track/3 Tracks) ✔
	8. Tower upgrades ✔
	9. Selling Towers 85% of money back ✔
	10. System to go Back to the Title Screen ✔
	11. Screen for the Tracks (3 Track/3 Tracks) ✔
	12. More Rounds (15 Rounds/15 Rounds) ✔
	13. Fast Forward ✔
	14. Fix the mouse situation ✔
	15. Win Screen ✔
*****/

alert("Play at 90% zoom for the best gameplay.");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

var canvas1 = document.getElementById("canvas1");
var ctx1 = canvas1.getContext("2d");
const width1 = canvas1.width;
const height1 = canvas1.height;

var screen = 1;
var track;
var mode;

var buttons = [];

buttons.push(new Button(25, height*.25, 115, 50, 10, 40, "Easy"));
buttons.push(new Button((buttons[0].x+buttons[0].w)+20, height*.25, 270, 50, 10, 40, "Intermediate"));
buttons.push(new Button((buttons[1].x+buttons[1].w)+20, height*.25, 115, 50, 10, 40, "Hard"));
buttons.push(new Button(width/10, height*.5, 200, 50, 10, 40, "Deflation"));
buttons.push(new Button(width/2, height*.5, 200, 50, 10, 40, "Sandbox"));

buttons.push(new Button(width*.05, height/2-100, 175, 175, 30, -20, "Easy", true, "Track1.png"));
buttons.push(new Button(width*.65833333333333333333, height/2-100, 175, 175, -15, -20, "Medium", true, "Track2.png"));
buttons.push(new Button(width/2-87.5, height/2+150, 175, 175, 25, -20, "Hard", true, "Track3.png"));

//The things you see to the left of the game
var information = document.getElementById("information");
var informationSet = false;

//Getting the tower types
var tower1 = document.getElementById("tower1");
var tower2 = document.getElementById("tower2");
var tower3 = document.getElementById("tower3");
var tower4 = document.getElementById("tower4");
var tower5 = document.getElementById("tower5");

//The statistics
var tower1stats = document.getElementById("tower1stats");
var tower2stats = document.getElementById("tower2stats");
var tower3stats = document.getElementById("tower3stats");
var tower4stats = document.getElementById("tower4stats");
var tower5stats = document.getElementById("tower5stats");

//Getting stats
var modeH = document.getElementById("mode");
var roundH = document.getElementById("round");
var moneyH = document.getElementById("money");
var livesH = document.getElementById("lives");

var enemySpawn = document.getElementById("enemy_spawn");
var enemyHolder1 = document.getElementById("enemyHolder1");
var enemyHolder2 = document.getElementById("enemyHolder2");
var enemyHolder3 = document.getElementById("enemyHolder3");

var goBack = document.getElementById("go_back");

var fastForward = document.getElementById("fast_forward");

//All the rounds in the game (I'm thinking of up to 20 rounds maybe)
var round = 1;

//Enemies to keep track of
var enemies = [];

//The amount of enemies per round
var enemyAmountPerRound = [10, 15, 20, 30, 40, 50, 75, 100, 150, 200, 300, 400, 200, 200, 100, 50];

//The amount of enemies on the screen
var enemiesPerRound = 0;

//The towers on the screen stored in an array
var towers = [];
var towerIndex = 0;

//Cost of all the towers
var tower1Cost;
var tower2Cost;
var tower3Cost;
var tower4Cost;
var tower5Cost;

//Important variables
var money;
var lives;

//Makes sure that the nextRound() function is called once so it doesn't brake the game
var called = true;

var mouseX;
var mouseY;

var mouseX1;
var mouseY1;

//Time until next enemy is generated
var time = 0;

//For how fast the game goes
var interval;

function floorTo40(num) {
	return Math.floor(num/40) * 40;
}

function mouseOverlaps(mouseX, mouseY) {
	for (let i = 0; i < towers.length; i++) {
		var b = towers[i];

		if (mouseX > b.x && mouseX < b.x+b.w && mouseY > b.y && mouseY < b.y+b.h) {
			return true;
		}
	}

	if (track === 1) {
		if (mouseX >= 40 && mouseX <= 80 && mouseY >= 0 && mouseY <= 80 || mouseX >= 40 && mouseX <= 440 && mouseY >= 40 && mouseY <= 80 || mouseX >= 400 && mouseX <= 440 && mouseY >= 40 && mouseY <= 200 || mouseX >= 400 && mouseX <= 600 && mouseY >= 160 && mouseY <= 200 || mouseX >= 560 && mouseX <= 600 && mouseY >= 160 && mouseY <= 320 || mouseX >= 320 && mouseX <= 600 && mouseY >= 280 && mouseY <= 320 || mouseX >= 320 && mouseX <= 360 && mouseY >= 120 && mouseY <= 320 || mouseX >= 80 && mouseX <= 360 && mouseY >= 120 && mouseY <= 160 || mouseX >= 80 && mouseX <= 120 && mouseY >= 120 && mouseY <= 400 || mouseX >= 80 && mouseX <= 480 && mouseY >= 360 && mouseY <= 400 || mouseX >= 440 && mouseX <= 480 && mouseY >= 360 && mouseY <= 480 || mouseX >= 440 && mouseX <= 560 && mouseY >= 440 && mouseY <= 480 || mouseX >= 520 && mouseX <= 560 && mouseY >= 440 && mouseY <= 600) {
			return true;
		}
	} else if (track === 2) {
		if (mouseX >= 0 && mouseX <= 520 && mouseY >= 40 && mouseY <= 80 || mouseX >= 480 && mouseX <= 520 && mouseY >= 40 && mouseY <= 200 || mouseX >= 120 && mouseX <= 520 && mouseY >= 160 && mouseY <= 200 || mouseX >= 120 && mouseX <= 160 && mouseY >= 160 && mouseY <= 360 || mouseX >= 120 && mouseX <= 480 && mouseY >= 320 && mouseY <= 360 || mouseX >= 440 && mouseX <= 480 && mouseY >= 320 && mouseY <= 600) {
			return true;
		}
	} else if (track === 3) {
		if (mouseX >= 160 && mouseX <= 200 && mouseY >= 0 && mouseY <= 240 || mouseX >= 160 && mouseX <= 520 && mouseY >= 200 && mouseY <= 240 || mouseX >= 480 && mouseX <= 520 && mouseY >= 200 && mouseY <= 360 || mouseX >= 320 && mouseX <= 520 && mouseY >= 320 && mouseY <= 360 || mouseX >= 320 && mouseX <= 360 && mouseY >= 320 && mouseY <= 600) {
			return true;
		}
	}

	return false;
}

function determineCursorNotAllowed(mouseX, mouseY) {
	if (track === 1) {
		if (mouseX >= 40 && mouseX <= 80 && mouseY >= 0 && mouseY <= 80 || mouseX >= 40 && mouseX <= 440 && mouseY >= 40 && mouseY <= 80 || mouseX >= 400 && mouseX <= 440 && mouseY >= 40 && mouseY <= 200 || mouseX >= 400 && mouseX <= 600 && mouseY >= 160 && mouseY <= 200 || mouseX >= 560 && mouseX <= 600 && mouseY >= 160 && mouseY <= 320 || mouseX >= 320 && mouseX <= 600 && mouseY >= 280 && mouseY <= 320 || mouseX >= 320 && mouseX <= 360 && mouseY >= 120 && mouseY <= 320 || mouseX >= 80 && mouseX <= 360 && mouseY >= 120 && mouseY <= 160 || mouseX >= 80 && mouseX <= 120 && mouseY >= 120 && mouseY <= 400 || mouseX >= 80 && mouseX <= 480 && mouseY >= 360 && mouseY <= 400 || mouseX >= 440 && mouseX <= 480 && mouseY >= 360 && mouseY <= 480 || mouseX >= 440 && mouseX <= 560 && mouseY >= 440 && mouseY <= 480 || mouseX >= 520 && mouseX <= 560 && mouseY >= 440 && mouseY <= 600) {
			return true;
		}
	} else if (track === 2) {
		if (mouseX >= 0 && mouseX <= 520 && mouseY >= 40 && mouseY <= 80 || mouseX >= 480 && mouseX <= 520 && mouseY >= 40 && mouseY <= 200 || mouseX >= 120 && mouseX <= 520 && mouseY >= 160 && mouseY <= 200 || mouseX >= 120 && mouseX <= 160 && mouseY >= 160 && mouseY <= 360 || mouseX >= 120 && mouseX <= 480 && mouseY >= 320 && mouseY <= 360 || mouseX >= 440 && mouseX <= 480 && mouseY >= 320 && mouseY <= 600) {
			return true;
		}
	} else if (track === 3) {
		if (mouseX >= 160 && mouseX <= 200 && mouseY >= 0 && mouseY <= 240 || mouseX >= 160 && mouseX <= 520 && mouseY >= 200 && mouseY <= 240 || mouseX >= 480 && mouseX <= 520 && mouseY >= 200 && mouseY <= 360 || mouseX >= 320 && mouseX <= 520 && mouseY >= 320 && mouseY <= 360 || mouseX >= 320 && mouseX <= 360 && mouseY >= 320 && mouseY <= 600) {
			return true;
		}
	}

	return false;
}

function determinePointer(mouseX, mouseY) {
	for (let i = 0; i < towers.length; i++) {
		var b = towers[i];

		if (mouseX > b.x && mouseX < b.x+b.w && mouseY > b.y && mouseY < b.y+b.h) {
			return true;
		}
	}

	return false;
}

function determinePointer1(mouseX1, mouseY1) {
	for (let i = 0; i < towers.length; i++) {
		var b = towers[i];

		if (b.clickedOn) { 
			if (mouseX1 > 150 && mouseX1 < 375 && mouseY1 > 0 && mouseY1 < 80 && money >= b.upgrade1Cost && !b.upgrade1Bought) {
				return true;
			} else if (mouseX1 > 375 && mouseX1 < 600 && mouseY1 > 0 && mouseY1 < 80 && money >= b.upgrade2Cost && !b.upgrade2Bought) {
				return true;
			}
		} 
	}

	return false;
}

canvas.addEventListener("mousemove", function(e) {
	mouseX = e.clientX-canvas.offsetLeft;
	mouseY = e.clientY-canvas.offsetTop;
});

canvas.addEventListener("click", function(e) {
	var mouseX = e.clientX-canvas.offsetLeft;
	var mouseY = e.clientY-canvas.offsetTop;

	//Hey developers can have fun too. This is just for removing enemies by clicking on them
	/*for (let i = 0; i < enemies.length; i++) {
		var b = enemies[i];

		if (mouseX > b.x && mouseX < b.x+b.w && mouseY > b.y && mouseY < b.y+b.h) {
			enemies.splice(i, 1);
		}
	}*/

	if (screen === 1) {
		if (buttons[0].clicked(mouseX, mouseY)) {
			tower1Cost = 35;
			tower2Cost = 45;
			tower3Cost = 65;
			tower4Cost = 75;
			tower5Cost = 135;

			money = 150;
			lives = 125;

			screen = 2;
			mode = "easy";
		} else if (buttons[1].clicked(mouseX, mouseY)) {
			tower1Cost = 45;
			tower2Cost = 55;
			tower3Cost = 75;
			tower4Cost = 105;
			tower5Cost = 155;

			money = 150;
			lives = 100;

			screen = 2;
			mode = "intermediate";
		} else if (buttons[2].clicked(mouseX, mouseY)) {
			tower1Cost = 55;
			tower2Cost = 65;
			tower3Cost = 85;
			tower4Cost = 115;
			tower5Cost = 175;

			money = 150;
			lives = 75;

			screen = 2;
			mode = "hard";
		} else if (buttons[3].clicked(mouseX, mouseY)) {
			tower1Cost = 45;
			tower2Cost = 55;
			tower3Cost = 75;
			tower4Cost = 105;
			tower5Cost = 155;

			money = 2000;
			lives = 100;

			screen = 2;
			mode = "deflation";
		} else if (buttons[4].clicked(mouseX, mouseY)) {
			tower1Cost = 45;
			tower2Cost = 55;
			tower3Cost = 75;
			tower4Cost = 105;
			tower5Cost = 155;

			money = Infinity;
			lives = Infinity;

			screen = 2;
			mode = "sandbox";
		}
	} else if (screen === 2) {
		if (buttons[5].clicked(mouseX, mouseY)) {
			track = 1;
			screen = 3;
		} else if (buttons[6].clicked(mouseX, mouseY)) {
			track = 2;
			screen = 3;
		} else if (buttons[7].clicked(mouseX, mouseY)) {
			track = 3;
			screen = 3;
		} 
	} else if (screen === 3) {
		if (!mouseOverlaps(mouseX, mouseY)) {
			if (tower1.checked && money >= tower1Cost) {
				towers.push(new Tower(floorTo40(mouseX), floorTo40(mouseY), 1, 75, "#A52A2A", towerIndex, 1, tower1Cost));
				towerIndex++;
				money -= tower1Cost;
			} else if (tower2.checked && money >= tower2Cost) {
				towers.push(new Tower(floorTo40(mouseX), floorTo40(mouseY), 1, 100, "#FF69B4", towerIndex, 2, tower2Cost));
				towerIndex++;
				money -= tower2Cost;
			} else if (tower3.checked && money >= tower3Cost) {
				towers.push(new Tower(floorTo40(mouseX), floorTo40(mouseY), 1, 125, "#604439", towerIndex, 3, tower3Cost));
				towerIndex++;
				money -= tower3Cost;
			} else if (tower4.checked && money >= tower4Cost) {
				towers.push(new Tower(floorTo40(mouseX), floorTo40(mouseY), 1, 125, "#33C", towerIndex, 4, tower4Cost));
				towerIndex++;
				money -= tower4Cost;
			} else if (tower5.checked && money >= tower5Cost) {
				towers.push(new Tower(floorTo40(mouseX), floorTo40(mouseY), 1, 160, "#A5A", towerIndex, 5, tower5Cost));
				towerIndex++;
				money -= tower5Cost;
			}
		}

		for (let i = 0; i < towers.length; i++) {
			var b = towers[i];

			if (mouseX > b.x && mouseX < b.x+b.w && mouseY > b.y && mouseY < b.y+b.h) {
				b.clickedOn = true;
			} else {
				if (b.clickedOn == true) {
					b.clickedOn = false;
				}
			}
		}
	}
});

canvas1.addEventListener("mousemove", function(e) {
	mouseX1 = e.clientX-canvas1.offsetLeft;
	mouseY1 = e.clientY-canvas1.offsetTop;
});

canvas1.addEventListener("click", function(e) {
	var mouseX = e.clientX-canvas1.offsetLeft;
	var mouseY = e.clientY-canvas1.offsetTop;

	for (let i = 0; i < towers.length; i++) {
		var b = towers[i];

		if (b.clickedOn) {
			if (mouseX > 150 && mouseX < 375 && mouseY > 0 && mouseY < 80 && money >= b.upgrade1Cost && !b.upgrade1Bought && b.clickedOn) {
				b.upgrade1Bought = true;
				b.totalCost += b.upgrade1Cost;
				money -= b.upgrade1Cost;
			} else if (mouseX > 375 && mouseX < 600 && mouseY > 0 && mouseY < 80 && money >= b.upgrade2Cost && !b.upgrade2Bought && b.clickedOn) {
				b.upgrade2Bought = true;
				b.totalCost += b.upgrade2Cost;
				money -= b.upgrade2Cost;
			}

			if (mouseX > 15 && mouseX < 135 && mouseY > 40 && mouseY < 65) {
				money += Math.floor(b.totalCost*.85);
				towers.splice(i, 1);
			}
		}
	}
});

//Draws the First path
//The First Path (Took me an entire day)
function drawPath1() {
	ctx.fillStyle = "white";
	ctx.fillRect(40, 0, 40, 80);
	ctx.fillRect(40, 40, 400, 40);
	ctx.fillRect(400, 40, 40, 160);
	ctx.fillRect(400, 160, 200, 40);
	ctx.fillRect(560, 160, 40, 160);
	ctx.fillRect(320, 280, 280, 40);
	ctx.fillRect(320, 120, 40, 200);
	ctx.fillRect(80, 120, 280, 40);
	ctx.fillRect(80, 120, 40, 280);
	ctx.fillRect(80, 360, 400, 40);
	ctx.fillRect(440, 360, 40, 120);
	ctx.fillRect(440, 440, 120, 40);
	ctx.fillRect(520, 440, 40, 160);
}

//The Second Path
function drawPath2() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 40, 520, 40);
	ctx.fillRect(480, 80, 40, 120);
	ctx.fillRect(120, 160, 400, 40);
	ctx.fillRect(120, 200, 40, 160);
	ctx.fillRect(120, 320, 360, 40);
	ctx.fillRect(440, 320, 40, 560);
}

//The Third Path
function drawPath3() {
	ctx.fillStyle = "white";
	ctx.fillRect(160, 0, 40, 200);
	ctx.fillRect(160, 200, 360, 40);
	ctx.fillRect(480, 200, 40, 160);
	ctx.fillRect(320, 320, 200, 40);
	ctx.fillRect(320, 320, 40, 280);
} 

//Changes the round
function nextRound() {
	round+=1;
	enemiesPerRound = 0;
}

function draw() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, width, height);
	ctx1.fillStyle = "black";
	ctx1.fillRect(0, 0, width1, height1);

	if (screen === 1) {
		track = null;
		mode = null;
		money = null;
		lives = null;
		round = 1;
		towers.length = 0;
		enemies.length = 0;
		enemiesPerRound = 0;
		informationSet = false;

		tower1stats.innerHTML = "";
		tower2stats.innerHTML = "";
		tower3stats.innerHTML = "";
		tower4stats.innerHTML = "";
		tower5stats.innerHTML = "";

		goBack.innerHTML = "";

		enemySpawn.style.display = "none";

		canvas.style.top = "0px";
		canvas1.style.top = "-3px";
		information.style.top = "-100px";

		moneyH.innerHTML = "Money:";
		livesH.innerHTML = "Lives:";

		ctx.font = "60px Arial";
		ctx.fillStyle = "white";
		ctx.fillText("Tower Defense", width/2-200, 60);

		for (let i = 0; i < buttons.length; i++) {
			if (i < 5) {
				buttons[i].draw();
			}
		}
	} else if (screen === 2) {
		ctx.font = "60px Arial";
		ctx.fillStyle = "white";
		ctx.fillText("Choose the Track", width/2-240, 60);

		for (let i = 0; i < buttons.length; i++) {
			if (i > 4) {
				buttons[i].draw();
			}
		}
	} else if (screen === 3) {
		if (fastForward.checked) {
			interval = 5;
		} else {
			interval = 10;
		}

		if (determineCursorNotAllowed(mouseX, mouseY)) {
			canvas.style.cursor = "not-allowed";
		} else if (determinePointer(mouseX, mouseY)) {
			canvas.style.cursor = "pointer";
		} else if (determinePointer1(mouseX1, mouseY1)) {
			canvas1.style.cursor = "pointer";
		} else {
			canvas.style.cursor = "default";
			canvas1.style.cursor = "default";
		}

		if (mode != "sandbox") {
			//Round 1
			if (time%40 == 0 && enemiesPerRound < enemyAmountPerRound[0] && round == 1) {
				enemies.push(new Enemy(1));
				enemiesPerRound++;
			}

			//Round 2
			if (time%40 == 0 && enemiesPerRound < enemyAmountPerRound[1] && round == 2) {
				enemies.push(new Enemy(1));
				enemiesPerRound++;
			}

			//Round 3
			if (time%40 == 0 && enemiesPerRound < enemyAmountPerRound[2] && round == 3) {
				if (enemiesPerRound < enemyAmountPerRound[2]/2) {
					enemies.push(new Enemy(1));
				} else {
					enemies.push(new Enemy(2));
				}

				enemiesPerRound++;
			}

			//Round 4
			if (time%40 == 0 && enemiesPerRound < enemyAmountPerRound[3] && round == 4) {
				enemies.push(new Enemy(2));
				enemiesPerRound++;
			}

			//Round 5
			if (time%40 == 0 && enemiesPerRound < enemyAmountPerRound[4] && round == 5) {
				if (enemiesPerRound < enemyAmountPerRound[4]*0.4) {
					enemies.push(new Enemy(1));
				} else if (enemiesPerRound >= enemyAmountPerRound[4]*0.4 && enemiesPerRound < enemyAmountPerRound[4]*0.8) {
					enemies.push(new Enemy(2));
				} else {
					enemies.push(new Enemy(3));
				}

				enemiesPerRound++;
			}

			if (time%40 == 0 && enemiesPerRound < enemyAmountPerRound[5] && round == 6) {
				enemies.push(new Enemy(3));
				enemiesPerRound++;
			}

			if (time%40 == 0 && enemiesPerRound < enemyAmountPerRound[6] && round == 7) {
				if (enemiesPerRound%5 == 0) {
					enemies.push(new Enemy(4));
				} else {
					enemies.push(new Enemy(2));
				}

				enemiesPerRound++;
			}

			if (time%40 == 0 && enemiesPerRound < enemyAmountPerRound[7] && round == 8) {
				if (enemiesPerRound < enemyAmountPerRound[7]*0.5) {
					enemies.push(new Enemy(4));
				} else {
					enemies.push(new Enemy(2));
				}

				enemiesPerRound++;
			}

			if (time%40 == 0 && enemiesPerRound < enemyAmountPerRound[8] && round == 9) {
				if (enemiesPerRound < 10) {
					enemies.push(new Enemy(5));
				} else if (enemiesPerRound < 50 && enemiesPerRound >= 10) {
					enemies.push(new Enemy(4));
				} else if (enemiesPerRound >= 50) {
					if (enemiesPerRound%2 == 0) {
						enemies.push(new Enemy(1));
					} else if (enemiesPerRound%3 == 0) {
						enemies.push(new Enemy(2));
					} else {
						enemies.push(new Enemy(3));
					}
				}

				enemiesPerRound++;
			}

			if (time%40 == 0 && enemiesPerRound < enemyAmountPerRound[9] && round == 10) {
				if (enemiesPerRound < 50) {
					enemies.push(new Enemy(1));
				} else if (enemiesPerRound < 100 && enemiesPerRound >= 50) {
					enemies.push(new Enemy(2));
				} else if (enemiesPerRound < 150 && enemiesPerRound >= 100) {
					enemies.push(new Enemy(3));
				} else {
					enemies.push(new Enemy(4));
				}

				enemiesPerRound++;
			}

			if (time%40 == 0 && enemiesPerRound < enemyAmountPerRound[10] && round == 11) {
				if (enemiesPerRound < 100) {
					enemies.push(new Enemy(5));
				} else if (enemiesPerRound < 200) {
					enemies.push(new Enemy(4))
				} else {
					enemies.push(new Enemy(3));
				}

				enemiesPerRound++;
			}

			if (time%40 == 0 && enemiesPerRound < enemyAmountPerRound[11] && round == 12) {
				enemies.push(new Enemy(4));

				enemiesPerRound++;
			}

			if (time%40 == 0 && enemiesPerRound < enemyAmountPerRound[12] && round == 13) {
				if (enemiesPerRound%2 == 0) {
					enemies.push(new Enemy(4));
				} else {
					enemies.push(new Enemy(5));
				}

				enemiesPerRound++;
			}

			if (time%40 == 0 && enemiesPerRound < enemyAmountPerRound[13] && round == 14) {
				enemies.push(new Enemy(6));

				enemiesPerRound++;
			}

			if (time%40 == 0 && enemiesPerRound < enemyAmountPerRound[14] && round == 15) {
				enemies.push(new Enemy(10));

				enemiesPerRound++;
			}


			if (round == 1 && enemiesPerRound == enemyAmountPerRound[0]) {
				called = false;
			} else if (round == 2 && enemiesPerRound == enemyAmountPerRound[1]) {
				called = false;
			} else if (round == 3 && enemiesPerRound == enemyAmountPerRound[2]) {
				called = false;
			} else if (round == 4 && enemiesPerRound == enemyAmountPerRound[3]) {
				called = false;
			} else if (round == 5 && enemiesPerRound == enemyAmountPerRound[4]) {
				called = false;
			} else if (round == 6 && enemiesPerRound == enemyAmountPerRound[5]) {
				called = false;
			} else if (round == 7 && enemiesPerRound == enemyAmountPerRound[6]) {
				called = false;
			} else if (round == 8 && enemiesPerRound == enemyAmountPerRound[7]) {
				called = false;
			} else if (round == 9 && enemiesPerRound == enemyAmountPerRound[8]) {
				called = false;
			} else if (round == 10 && enemiesPerRound == enemyAmountPerRound[9]) {
				called = false;
			} else if (round == 11 && enemiesPerRound == enemyAmountPerRound[10]) {
				called = false;
			} else if (round == 12 && enemiesPerRound == enemyAmountPerRound[11]) {
				called = false;
			} else if (round == 13 && enemiesPerRound == enemyAmountPerRound[12]) {
				called = false;
			} else if (round == 14 && enemiesPerRound == enemyAmountPerRound[13]) {
				called = false;
			} else if (round == 15 && enemiesPerRound == enemyAmountPerRound[14]) {
				called = false;
			}

			//Calls the nextRound() function to change the round
			if (!called && enemies.length == 0) {
				nextRound();
				called = true;
			}

			canvas.style.top = "-0px";
			canvas1.style.top = "-3px";
			information.style.top = "-100px";

			enemyHolder1.innerHTML = "";
			enemyHolder2.innerHTML = "";
			enemyHolder3.innerHTML = "";
		} 

		ctx1.font = "30px Arial";
		ctx1.fillStyle = "white";
		ctx1.fillText("Round: " + round + " of 15", 10, height1*.9);
		ctx1.fillText("Mode: " + mode[0].toUpperCase() + mode.substr(1, mode.length-1), 250, height1*.9);

		moneyH.innerHTML = "Money: " + money;
		livesH.innerHTML = "Lives: " + lives;

		if (!informationSet) {
			goBack.innerHTML = "<input id='goBack' type='button' value='Go Back to the Title Screen'>";

			if (mode == "sandbox") {
				enemySpawn.style.display = "inline";

				canvas.style.top = "-290px";
				canvas1.style.top = "-293px";
				information.style.top = "-20px";

				enemyHolder1.innerHTML = "<input id='enemyButton1' type='button' value='Spawn the Red Enemy'>";
				enemyHolder2.innerHTML = "<input id='enemyButton2' type='button' value='Spawn the Blue Enemy'>";
				enemyHolder3.innerHTML = "<input id='enemyButton3' type='button' value='Spawn the Green Enemy'>";
				enemyHolder4.innerHTML = "<input id='enemyButton4' type='button' value='Spawn the Yellow Enemy'>";
				enemyHolder5.innerHTML = "<input id='enemyButton5' type='button' value='Spawn the Pink Enemy'>";
				enemyHolder6.innerHTML = "<input id='enemyButton6' type='button' value='Spawn the Indigo Enemy'>";
				enemyHolder7.innerHTML = "<input id='enemyButton7' type='button' value='Spawn the Gray Enemy'>";
				enemyHolder8.innerHTML = "<input id='enemyButton8' type='button' value='Spawn the Teal Enemy'>";
				enemyHolder9.innerHTML = "<input id='enemyButton9' type='button' value='Spawn the Topaz Enemy'>";
				enemyHolder10.innerHTML = "<input id='enemyButton10' type='button' value='Spawn the Cyan Enemy'>";
			}

			tower1stats.innerHTML = "Cost: " + tower1Cost + ", Range: 75";
			tower2stats.innerHTML = "Cost: " + tower2Cost + ", Range: 100";
			tower3stats.innerHTML = "Cost: " + tower3Cost + ", Range: 125";
			tower4stats.innerHTML = "Cost: " + tower4Cost + ", Range: 125";
			tower5stats.innerHTML = "Cost: " + tower5Cost + ", Range: 160";

			informationSet = true;
		}

		goBack.onclick = function() {
			screen = 1;
		};

		if (mode == "sandbox") {
			enemyButton1.onclick = function() {
				enemies.push(new Enemy(1));
			};

			enemyButton2.onclick = function() {
				enemies.push(new Enemy(2));
			};

			enemyButton3.onclick = function() {
				enemies.push(new Enemy(3));
			};

			enemyButton4.onclick = function() {
				enemies.push(new Enemy(4));
			};

			enemyButton5.onclick = function() {
				enemies.push(new Enemy(5));
			};

			enemyButton6.onclick = function() {
				enemies.push(new Enemy(6));
			};

			enemyButton7.onclick = function() {
				enemies.push(new Enemy(7));
			};

			enemyButton8.onclick = function() {
				enemies.push(new Enemy(8));
			};

			enemyButton9.onclick = function() {
				enemies.push(new Enemy(9));
			};

			enemyButton10.onclick = function() {
				enemies.push(new Enemy(10));
			};
		}

		if (round == 16) {
			alert("You Win!!!");
			screen = 1;
		} 

		if (lives <= 0) {
			alert("You Lose!!!");
			screen = 1;
		}

		//The lines to help me visualize where each square is (40x40)
		for (let i = 0; i < 16; i++) {
			for (let j = 0; j < 16; j++) {
				ctx.beginPath();
				ctx.strokeStyle = "white";
				ctx.moveTo(0, j * 40);
				ctx.lineTo(width, j * 40);
				ctx.moveTo(i * 40, 0);
				ctx.lineTo(i * 40, height);	
				ctx.stroke();
				ctx.closePath();
			}
		}

		//Checks to see which track it is so it draws the right one
		if (track === 1) {
			drawPath1();
		} else if (track === 2) {
			drawPath2();
		} else if (track === 3) {
			drawPath3();
		}

		if (tower1.checked && money > tower1Cost) {
			ctx.fillStyle = "#A52A2A";
			ctx.fillRect(mouseX-20, mouseY-20, 40, 40);
		} else if (tower2.checked && money > tower2Cost) {
			ctx.fillStyle = "#FF69B4";
			ctx.fillRect(mouseX-20, mouseY-20, 40, 40);
		} else if (tower3.checked && money > tower3Cost) {
			ctx.fillStyle = "#604439";
			ctx.fillRect(mouseX-20, mouseY-20, 40, 40);
		} else if (tower4.checked && money > tower4Cost) {
			ctx.fillStyle = "#33C";
			ctx.fillRect(mouseX-20, mouseY-20, 40, 40);
		} else if (tower5.checked && money > tower5Cost) {
			ctx.fillStyle = "#A5A";
			ctx.fillRect(mouseX-20, mouseY-20, 40, 40);
		}

		//Shows the coordinates which makes it easier for me to determine where the place things
		/* for (let i = 0; i < 16; i++) {
			for (let j = 0; j < 16; j++) {
				ctx.font = "10px sans-serif";
				ctx.fillStyle = "green";
				ctx.fillText(i * 40 + "," + ((j * 40)-40), i * 40+2, j * 40 - 15);	
			}
		} */

		//This iterates over the enemies function and does all the important things
		for (let i = 0; i < enemies.length; i++) {
			var b = enemies[i];

			if (b.alive && b.layer > 0) {
				enemies[i].update();
				enemies[i].draw();
				enemies[i].move();
			}

			//If the enemy's y position is greater than or equal to the height of the screen, remove the enemy from the enemies 
			if (b.layer <= 0 || b.y >= height) {
				if (b.layer <= 0 && mode != "deflation" && mode != "sandbox") {
					money += b.originalLayer;
					b.alive = false;
				}

				if (b.y >= height) {
					lives -= Math.round(b.layer);
					b.alive = false;
				}

				enemies.splice(i, 1);
			}
		}

		for (let i = 0; i < towers.length; i++) {
			var b = towers[i];

			towers[i].draw();
			towers[i].determineTarget();
			towers[i].determineUpgrades();

			b.timeAlive++;

			if (b.clickedOn) {
				towers[i].drawAttackRange();
				b.attackRangeDrawn = true;
			} else {
				b.attackRangeDrawn = false;
			}

			if (b.attackRangeDrawn) {
				towers[i].drawUpgrades();
			}

			if (b.type == 1) {
				if (b.upgrade2Bought) {
					b.r = 100;
				}
			} else if (b.type == 2) {
				if (b.upgrade2Bought) {
					b.r = 125;
				}
			} else if (b.type == 3) {
				if (b.upgrade2Bought) {
					b.r = 130;
				}
			} else if (b.type == 4) {
				if (b.upgrade2Bought) {
					b.r = 130;
				}
			} else if (b.type == 5) {
				if (b.upgrade2Bought) {
					b.r = 180;
				}
			}

			if (time%65 == 0 && b.type == 1 && !b.upgrade1Bought) {
				towers[i].attackTarget();
			} else if (time%52 == 0 && b.type == 1 && b.upgrade1Bought) {
				towers[i].attackTarget();
			}

			if (time%60 == 0 && b.type == 2 && !b.upgrade1Bought) {
				towers[i].attackTarget();
			} else if (time%48 == 0 && b.type == 2 && b.upgrade1Bought) {
				towers[i].attackTarget();
			}

			if (time%55 == 0 && b.type == 3 && !b.upgrade1Bought) {
				towers[i].attackTarget();
			} else if (time%44 == 0 && b.type == 3 && b.upgrade1Bought) {
				towers[i].attackTarget();
			}

			if (time%50 == 0 && b.type == 4 && !b.upgrade1Bought) {
				towers[i].attackTarget();
			} else if (time%40 == 0 && b.type == 4 && b.upgrade1Bought) {
				towers[i].attackTarget();
			}

			if (time%45 == 0 && b.type == 5 && !b.upgrade1Bought) {
				towers[i].attackTarget();
			} else if (time%36 == 0 && b.type == 5 && b.upgrade1Bought) {
				towers[i].attackTarget();
			}
		}
	}
}

function update() {
	draw();

	setTimeout(update, interval);

	time++;
}

update();
