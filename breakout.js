"use strict";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

var dx = 2;
var dy = -2;

var wait = 0;

var leftPressed = false;
var rightPressed = false;

var playerScore = 0;
var lives = 3;

var cols = 8;
var rows = 6;
var brickWidth = width/cols;
var brickHeight = 135/rows;
var bricks = [];

for (let i = 0; i < cols; i++) {
	bricks[i] = [];
	for (let j = 0; j < rows; j++) {
		bricks[i][j] = new Obj(i*brickWidth, j*brickHeight + 30, brickWidth, brickHeight, "red", true);
		bricks[i][j].status = 1;
	}
}

function random(min, max) {
	return Math.floor(Math.random() * (max-min+1))+min;
}

document.addEventListener("keydown", function(e) {
	if (e.keyCode == 37) {
		leftPressed = true;
	} else if (e.keyCode == 39) {
		rightPressed = true;
	}
});

document.addEventListener("keyup", function(e) {
	if (e.keyCode == 37) {
		leftPressed = false;
	} else if (e.keyCode == 39) {
		rightPressed = false;
	}
});

function Obj(x, y, w, h, fill, stroke) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.fill = fill;
	this.stroke = stroke;
}

Obj.prototype.draw = function() {
	if (this.fill !== false) {
		ctx.fillStyle = this.fill;

		if (!this.stroke) {
			ctx.fillRect(this.x, this.y, this.w, this.h);
		} else if (this.stroke) {
			ctx.beginPath();
			ctx.strokeStyle = "black";
			ctx.lineWidth = 0.5;
			ctx.rect(this.x, this.y, this.w, this.h);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		}
	}
};

Obj.prototype.hits = function(obj) {
	if (this.x+this.w > obj.x && this.x < obj.x+obj.w && this.y+this.h > obj.y && this.y < obj.y+obj.h) {
		return true;
	} else {
		return false;
	}
};

function reset() {
	ball.x = width/2-10;
	ball.y = height-40;
	player.x = width/2-player.w/2;

	if (random(1, 2) == 1) {
		dx = -2;
	} else {
		dx = 2;
	}

	dy = -2;

	wait = 0;
	lives--;
}

var player = new Obj(width/2-37.5, height-20, 75, 15, "white");

var ball = new Obj(width/2-10, height-40, 20, 20, "cyan");

function draw() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, width, height);

	player.draw();

	ctx.font = "25px Arial";
	ctx.fillText("Score: " + playerScore, 10, 25);
	ctx.fillText("Lives: " + lives, width-100, 25);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (bricks[i][j].status == 1) {
				bricks[i][j].draw();
			}

			if (bricks[i][j].hits(ball) && bricks[i][j].status == 1) {
				bricks[i][j].status = 0;
				dy = -dy;
				playerScore += 20;
			}
		}
	}

	if (playerScore/20 == cols*rows) {
		alert("You win!!!");
		document.location.reload();
	} else if (lives <= 0) {
		alert("You lose!!!");
		document.location.reload();
	}

	ball.draw();

	if (ball.x < 0) {
		dx = Math.abs(dx);
	} else if (ball.x > width-ball.w) {
		dx = -Math.abs(dx);
	}

	if (ball.y < 0) {
		dy = Math.abs(dy);
	} else if (ball.y > height-ball.h/2) {
		reset();
	}

	if (ball.hits(player) && dy > 0) {
		dy += 1/8;
		dy = -Math.abs(dy);

		if (ball.x < player.x+player.w/2) {
			dx = random(-5, 2);
		} else {
			dx = random(2, 5);
		}
	}

	if (wait == 50) {
		ball.x += dx;
		ball.y += dy;

		if (leftPressed && player.x > 0) {
			player.x -= 7;
		} else if (rightPressed && player.x < width-player.w) {
			player.x += 7;
		}
	}
}

function update() {
	draw();

	if (wait < 50) {
		wait++;
	}

	requestAnimationFrame(update);
}

update();