function Button(x, y, w, h, shiftX, shiftY, text, isPicture, src) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.shiftX = shiftX;
	this.shiftY = shiftY;
	this.text = text;
	this.isPicture = isPicture;
	this.src = src;

	if (this.isPicture) {
		this.drawing = new Image();
		this.drawing.src = this.src;
	}
}

Button.prototype.draw = function() {
	if (!this.isPicture) {
		ctx.fillStyle = "#00F";
		ctx.fillRect(this.x, this.y, this.w, this.h);

		ctx.fillStyle = "#FFF";
		ctx.font = "45px Arial";
		ctx.fillText(this.text, this.x + this.shiftX, this.y + this.shiftY);
	} else {
		ctx.fillStyle = "#FFF";
		ctx.fillText(this.text, this.x+this.shiftX, this.y+this.shiftY);
		ctx.drawImage(this.drawing, this.x, this.y, this.w, this.h);
	}
};

Button.prototype.clicked = function(mouseX, mouseY) {
	if (mouseX > this.x && mouseX < this.x+this.w && mouseY > this.y && mouseY < this.y+this.h) {
		return true;
	} else {
		return false;
	}
};

function Enemy(layer) {
	if (track === 1) {
		this.x = 45;
		this.y = -80;
	} else if (track === 2) {
		this.x = -80;
		this.y = 45;
	} else if (track === 3) {
		this.x = 165;
		this.y = -80;
	}

	this.w = 30;
	this.h = 30;

	//Defines the strength of the enemy
	this.layer = layer;
	this.alive = true;
	this.originalLayer = layer;
}

Enemy.prototype.update = function() {
	if (mode == "easy") {
		if (this.layer > 0 && this.layer < 2) {
			this.fill = "red";
			this.moveAmount = 1;
		} else if (this.layer >= 2 && this.layer < 3) {
			this.fill = "blue";
			this.moveAmount = 1.25;
		} else if (this.layer >= 3 && this.layer < 4) {
			this.fill = "green";
			this.moveAmount = 1.5;
		} else if (this.layer >= 4 && this.layer < 5) {
			this.fill = "yellow";
			this.moveAmount = 1.75;
		} else if (this.layer >= 5 && this.layer < 6) {
			this.fill = "pink";
			this.moveAmount = 2;
		} else if (this.layer >= 6 && this.layer < 7) {
			this.fill = "#4B0082";
			this.moveAmount = 2.5;
		} else if (this.layer >= 7 && this.layer < 8) {
			this.fill = "gray";
			this.moveAmount = 2.75;
		} else if (this.layer >= 8 && this.layer < 9) {
			this.fill = "#008080";
			this.moveAmount = 3;
		} else if (this.layer >= 9 && this.layer < 10) {
			this.fill = "#0198E1";
			this.moveAmount = 3.25;
		} else if (this.layer == 10) {
			this.fill = "cyan";
			this.moveAmount = 1.5;
		}
	}

	if (mode == "intermediate" || mode == "deflation" || mode == "sandbox") {
		if (this.layer > 0 && this.layer < 2) {
			this.fill = "red";
			this.moveAmount = 1.25;
		} else if (this.layer >= 2 && this.layer < 3) {
			this.fill = "blue";
			this.moveAmount = 1.5;
		} else if (this.layer >= 3 && this.layer < 4) {
			this.fill = "green";
			this.moveAmount = 1.75;
		} else if (this.layer >= 4 && this.layer < 5) {
			this.fill = "yellow";
			this.moveAmount = 2;
		} else if (this.layer >= 5 && this.layer < 6) {
			this.fill = "pink";
			this.moveAmount = 2.25;
		} else if (this.layer >= 6 && this.layer < 7) {
			this.fill = "#4B0082";
			this.moveAmount = 2.75;
		} else if (this.layer >= 7 && this.layer < 8) {
			this.fill = "gray";
			this.moveAmount = 3;
		} else if (this.layer >= 8 && this.layer < 9) {
			this.fill = "#008080";
			this.moveAmount = 3.25;
		} else if (this.layer >= 9 && this.layer < 10) {
			this.fill = "#0198E1";
			this.moveAmount = 3.5;
		} else if (this.layer == 10) {
			this.fill = "cyan";
			this.moveAmount = 1.75;
		}
	}

	if (mode == "hard") {
		if (this.layer > 0 && this.layer < 2) {
			this.fill = "red";
			this.moveAmount = 1.5;
		} else if (this.layer >= 2 && this.layer < 3) {
			this.fill = "blue";
			this.moveAmount = 1.75;
		} else if (this.layer >= 3 && this.layer < 4) {
			this.fill = "green";
			this.moveAmount = 2;
		} else if (this.layer >= 4 && this.layer < 5) {
			this.fill = "yellow";
			this.moveAmount = 2.25;
		} else if (this.layer >= 4 && this.layer < 5) {
			this.fill = "pink";
			this.moveAmount = 2.5;
		} else if (this.layer >= 5 && this.layer < 6) {
			this.fill = "pink";
			this.moveAmount = 2.75;
		} else if (this.layer >= 6 && this.layer < 7) {
			this.fill = "#4B0082";
			this.moveAmount = 3.25;
		} else if (this.layer >= 7 && this.layer < 8) {
			this.fill = "gray";
			this.moveAmount = 3.25;
		} else if (this.layer >= 8 && this.layer < 9) {
			this.fill = "#008080";
			this.moveAmount = 3.5;
		} else if (this.layer >= 9 && this.layer < 10) {
			this.fill = "#0198E1";
			this.moveAmount = 3.75;
		} else if (this.layer == 10) {
			this.fill = "cyan";
			this.moveAmount = 2;
		}
	}	
};

Enemy.prototype.draw = function() {
	//Draws the enemy to the screen
	ctx.fillStyle = this.fill;
	ctx.fillRect(this.x, this.y, this.w, this.h);
};

Enemy.prototype.move = function() {
	//Moves the enemy  for the first track (I know that this is also inefficient like the path used)
	if (track === 1) {
		if (this.x == 45 && this.y < 45) {
			this.y += this.moveAmount;
		} else if (this.x < 405 && this.y >= 40 && this.y <= 60) {
			this.y = 45;
			this.x += this.moveAmount;
		} else if (this.x >= 400 && this.x <= 420 && this.y < 165) {
			this.x = 405
			this.y += this.moveAmount;
		} else if (this.x < 565 && this.x > 404 && this.y >= 160 && this.y <= 180) {
			this.y = 165;
			this.x += this.moveAmount;
		} else if (this.x >= 560 && this.x <= 580 && this.y < 285) {
			this.x = 565;
			this.y += this.moveAmount;
		} else if (this.x > 325 && this.y >= 280 && this.y <= 300) {
			this.y = 285;
			this.x -= this.moveAmount;
		} else if (this.x >= 320 && this.x <= 340 && this.y > 125 && this.y < 326) {
			this.x = 325;
			this.y -= this.moveAmount;
		} else if (this.x > 85 && this.y >= 120 && this.y <= 140) {
			this.y = 125;
			this.x -= this.moveAmount
		} else if (this.x >= 80 && this.x <= 100 && this.y < 365) {
			this.x = 85;
			this.y += this.moveAmount;
		} else if (this.x < 445 && this.y >= 360 && this.y <= 380) {
			this.y = 365
			this.x += this.moveAmount;
		} else if (this.x >= 440 && this.x <= 460 && this.y < 445) {
			this.x = 445;
			this.y += this.moveAmount;
		} else if (this.x < 525 && this.y >= 440 && this.y <= 460) {
			this.y = 445;
			this.x += this.moveAmount;
		} else if(this.x >= 520 && this.x <= 540 && this.y < 600) {
			this.x = 525
			this.y += this.moveAmount;
		}
	} else if (track === 2) {
		if (this.x < 485 && this.y == 45) {
			this.x += this.moveAmount;
		} else if (this.x >= 480 && this.x <= 500 && this.y >= 45 && this.y < 165) {
			this.x = 485;
			this.y += this.moveAmount;
		} else if (this.x > 125 && this.x <= 485 && this.y >= 160 && this.y <= 180) {
			this.y = 165;
			this.x -= this.moveAmount;
		} else if (this.x >= 120 && this.x <= 140 && this.y >= 165 && this.y < 325) {
			this.x = 125;
			this.y += this.moveAmount;
		} else if (this.x >= 125 && this.x < 445 && this.y >= 320 && this.y <= 340) {
			this.y = 325;
			this.x += this.moveAmount;
		} else if (this.x >= 440 && this.x <= 460 && this.y >= 325 && this.y < 600) {
			this.x = 445;
			this.y += this.moveAmount;
		}
	} else if (track === 3) {
		if (this.x == 165 && this.y < 205) {
			this.y += this.moveAmount;
		} else if (this.x >= 165 && this.x < 485 && this.y >= 200 && this.y <= 225) {
			this.y = 205;
			this.x += this.moveAmount;
		} else if (this.x >= 480 && this.x <= 500 && this.y >= 205 && this.y < 325) {
			this.x = 485;
			this.y += this.moveAmount;
		} else if (this.x > 325 && this.x <= 485 && this.y >= 320 && this.y <= 340) {
			this.y = 325;
			this.x -= this.moveAmount;
		} else if (this.x >= 320 && this.x <= 340 && this.y >= 325 && this.y < 600) {
			this.x = 325;
			this.y += this.moveAmount;
		}
	}
};

function Tower(x, y, attackPower, r, fill, index, type, cost) {
	this.x = x;
	this.y = y;
	this.w = 40;
	this.h = 40;

	this.enemiesKilled = 0;
	this.timeAlive = 0;
	this.attackPower = attackPower;

	this.r = r;
	this.rx = this.x+this.w/2;
	this.ry = this.y+this.h/2;
	this.fill = fill;

	this.index = index;
	this.type = type;
	this.cost = cost;
	this.totalCost = 0;
	this.enemiesKilled = 0;

	this.clickedOn = false;
	this.attackRangeDrawn = false;

	this.target = null;

	this.upgrade1Cost = null;
	this.upgrade1Text = "";
	this.upgrade1Bought = false;

	this.upgrade2Cost = null;
	this.upgrade2Text = "";
	this.upgrade2Bought = false;

	this.totalCost += this.cost;
}

Tower.prototype.draw = function() {
	ctx.fillStyle = this.fill;
	ctx.fillRect(this.x, this.y, this.w, this.h);
};

Tower.prototype.determineTarget = function() {
	//if no enemies, no target
	if(enemies.length == 0) {
	    this.target = null;
	    return;
	}

	//find first enemy withing range and select that as tower's target
	for (var i = 0; i < enemies.length; i++) {
	    var dist = (enemies[i].x-this.x)*(enemies[i].x-this.x+this.w)+(enemies[i].y-this.y)*(enemies[i].y-this.y+this.h); //rectWidth included to look at center of rectangle, not top left corner

	 	if (dist < this.r**2) { //sqaure of range. avoice Math.sqrt which is expensive
	      	this.target = enemies[i];
	      	return; //only need a single target
	    }
	}

	return;
};

Tower.prototype.attackTarget = function() {
	if (this.target != null && this.target.y > 0) {
		this.target.layer -= this.attackPower;
		return;
	}
};

Tower.prototype.drawAttackRange = function() {
	ctx.beginPath();
	ctx.fillStyle = "rgba(255, 255, 255, .5)";
	ctx.arc(this.rx, this.ry, this.r, 0, Math.PI*2);
	ctx.fill();
	ctx.closePath();
};

Tower.prototype.determineUpgrades = function() {
	if (this.type == 1) {
		if (mode == "easy") {
			this.upgrade1Cost = 45;
			this.upgrade2Cost = 40;
		} else if (mode == "intermediate" || mode == "deflation" || mode == "sandbox") {
			this.upgrade1Cost = 55;
			this.upgrade2Cost = 50;
		} else if (mode == "hard") {
			this.upgrade1Cost = 65;
			this.upgrade2Cost = 60;
		}
	} else if (this.type == 2) {
		if (mode == "easy") {
			this.upgrade1Cost = 55;
			this.upgrade2Cost = 50;
		} else if (mode == "intermediate" || mode == "deflation" || mode == "sandbox") {
			this.upgrade1Cost = 65;
			this.upgrade2Cost = 60;
		} else if (mode == "hard") {
			this.upgrade1Cost = 75;
			this.upgrade2Cost = 70;
		}
	} else if (this.type == 3) {
		if (mode == "easy") {
			this.upgrade1Cost = 75;
			this.upgrade2Cost = 70;
		} else if (mode == "intermediate" || mode == "deflation" || mode == "sandbox") {
			this.upgrade1Cost = 85;
			this.upgrade2Cost = 80;
		} else if (mode == "hard") {
			this.upgrade1Cost = 95;
			this.upgrade2Cost = 90;
		}
	} else if (this.type == 4) {
		if (mode == "easy") {
			this.upgrade1Cost = 85;
			this.upgrade2Cost = 80;
		} else if (mode == "intermediate" || mode == "deflation" || mode == "sandbox") {
			this.upgrade1Cost = 85;
			this.upgrade2Cost = 80;
		} else if (mode == "hard") {
			this.upgrade1Cost = 95;
			this.upgrade2Cost = 90;
		}
	} else if (this.type == 5) {
		if (mode == "easy") {
			this.upgrade1Cost = 145;
			this.upgrade2Cost = 135;
		} else if (mode == "intermediate" || mode == "deflation" || mode == "sandbox") {
			this.upgrade1Cost = 165;
			this.upgrade2Cost = 155;
		} else if (mode == "hard") {
			this.upgrade1Cost = 185;
			this.upgrade2Cost = 175;
		}
	}

	this.upgrade1Text = "Faster Attack Rate";
	this.upgrade2Text = "Longer Tower Range";
};

Tower.prototype.drawUpgrades = function() {
	ctx1.fillStyle = "brown";
	ctx1.fillRect(0, 0, width1, height1);

	ctx1.fillStyle = "red";
	ctx1.fillRect(15, 40, 120, 25);

	ctx1.fillStyle = "white";
	ctx1.font = "15px Arial";
	ctx1.fillText("Sell Tower  $" + Math.floor(this.totalCost*.85), 15, 56);

	ctx1.fillText("Time Alive: " + Math.round(this.timeAlive/50), 10, 20);
	ctx1.fillText("Attack Power: " + this.attackPower, 10, 35);
	//ctx1.fillText("Enemies Killed: " + this.enemiesKilled, 10, 50);

	if (!this.upgrade1Bought) {
		ctx1.fillStyle = "white";
	} else {
		ctx1.fillStyle = "lime";
	}

	ctx1.fillRect(150, 0, (width1-150)/2, height1);
	ctx1.fillStyle = "black";
	ctx1.fillText(this.upgrade1Text, 155, 20);
	ctx1.fillText("Cost: " + this.upgrade1Cost, 155, 40);

	if (!this.upgrade2Bought) {
		ctx1.fillStyle = "black";
	} else {
		ctx1.fillStyle = "lime";
	}

	ctx1.fillRect(375, 0, (width1-150)/2, height1);
	ctx1.fillStyle = "white";
	ctx1.fillText(this.upgrade2Text, 380, 20);
	ctx1.fillText("Cost: " + this.upgrade2Cost, 380, 40);
};