//Scaling Factor is 25
//Add Mandelbrot Set, Add Julia Sets
var canvas = document.getElementById("canvas");
var graphics = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

//What runs and stops the stuff
var interval;

var mousedown = false;
var x = width/2;
var y = height/2;

var realX;
var realY;
var magnitude;
var angleRadians;
var angleDegrees;

var complexPointRadio = document.getElementById("complexpointradio");
var taylorSeriesRadio = document.getElementById("taylorseriesradio")
var fourierSeriesRadio = document.getElementById("fourierseriesradio")
var mandelbrotSetRadio = document.getElementById("mandelbrotsetradio")
var juliaSetRadio = document.getElementById("juliasetradio");

var complexPoint = document.getElementById("complexpoint");
var magnitudeButton = document.getElementById("magnitudebutton");
var pythagoreanTheoremButton = document.getElementById("pythagoreantheorembutton");
var angleButton = document.getElementById("anglebutton");
var degreesButton = document.getElementById("degreesbutton");
var radiansButton = document.getElementById("radiansbutton");

var taylorSeriesSlider = document.getElementById("taylorseriesslider");
var description = document.getElementById("description");
var taylorSeriesTerms = document.getElementById("taylorseriesterms");

var fourierTerms = document.getElementById("numberoffourierterms");
var fourierSeriesLine = document.getElementById("fourierseriesline");
var fourierSeriesLineButton = document.getElementById("fourierserieslinebutton");
var fourierSeriesParabola = document.getElementById("fourierseriesparabola");
var fourierSeriesParabolaButton = document.getElementById("fourierseriesparabolabutton");
var fourierSeriesSign = document.getElementById("fourierseriessign");
var fourierSeriesSignButton = document.getElementById("fourierseriessignbutton");
var fourierSeriesAbsoluteValue = document.getElementById("fourierseriesabsolutevalue");
var fourierSeriesAbsoluteValueButton = document.getElementById("fourierseriesabsolutevaluebutton");
var fourierSeriesSlider = document.getElementById("fourierseriesslider");

var fourierBallX = 0;
var fourierBallY = 0;

var mandelbrotIterations = document.getElementById("numberofmandelbrotiterations");
var mandelbrotSetSlider = document.getElementById("mandelbrotsetslider");

var juliaSetIterations = document.getElementById("numberofjuliaiterations");
var juliaSetSlider = document.getElementById("juliasetslider");
var juliaSetReal = document.getElementById("juliasetreal");
var juliaSetImaginary = document.getElementById("juliasetimaginary")

//Audio for Fourier Series
var ctx = new AudioContext();
var osc;
var gain = ctx.createGain();

//So only one sound can play at a time
var lineSound = false;
var parabolaSound = false;
var signSound = false;
var absoluteValueSound = false;


//helps with performance
complexPointRadio.onclick = function() {
	fourierBallX = 0;
	fourierBallY = 0;
	lineSound = false;
	parabolaSound = false;
	signSound = false;
	absoluteValueSound = false;
	
	if (osc != null) {
		osc.stop();
		osc.disconnect(ctx.destination);
	}

	osc = null
}

taylorSeriesRadio.onclick = function() {
	fourierBallX = 0;
	fourierBallY = 0;
	lineSound = false;
	parabolaSound = false;
	signSound = false;
	absoluteValueSound = false;
	
	if (osc != null) {
		osc.stop();
		osc.disconnect(ctx.destination);
	}

	osc = null;
}

mandelbrotSetRadio.onclick = function() {
	fourierBallX = 0;
	fourierBallY = 0;
	lineSound = false;
	parabolaSound = false;
	signSound = false;
	absoluteValueSound = false;

	if (osc != null) {
		osc.stop();
		osc.disconnect(ctx.destination);
	}

	osc = null;

	mandelbrotDraw(mandelbrotSetSlider.value);
}

mandelbrotSetSlider.onclick = function() {
	mandelbrotDraw(mandelbrotSetSlider.value, 1, 1);
}

juliaSetRadio.onclick = function() {
	fourierBallX = 0;
	fourierBallY = 0;
	lineSound = false;
	parabolaSound = false;
	signSound = false;
	absoluteValueSound = false;

	if (osc != null) {
		osc.stop();
		osc.disconnect(ctx.destination);
	}

	osc = null;

	juliaSetDraw(parseFloat(juliaSetReal.value), parseFloat(juliaSetImaginary.value), juliaSetSlider.value);
}

juliaSetSlider.onclick = function() {
	juliaSetDraw(parseFloat(juliaSetReal.value), parseFloat(juliaSetImaginary.value), juliaSetSlider.value);
}

//Just telling myself where the performance enhancing stuff ends
fourierSeriesLineButton.onclick = function() {
	fourierSeriesSound("line");
}

fourierSeriesParabolaButton.onclick = function() {
	fourierSeriesSound("parabola");
}

fourierSeriesSignButton.onclick = function() {
	fourierSeriesSound("sign");
}

fourierSeriesAbsoluteValueButton.onclick = function() {
	fourierSeriesSound("absolute");
}

function drawLines() {
	graphics.strokeStyle = "white";
	//graphics.lineWidth = .1;

	//Vertical Lines
	for (var i = 1; i < 20; i++) {
		if (i == 10) {
			graphics.lineWidth = 2;
		} else {
			graphics.lineWidth = .5;
		}

		graphics.beginPath();
		graphics.moveTo(i*25, 0);
		graphics.lineTo(i*25, height);
		graphics.stroke();
	}

	//Horizontal Lines
	for (var i = 1; i < 20; i++) {
		if (i == 10) {
			graphics.lineWidth = 2;
		} else {
			graphics.lineWidth = .5;
		}

		graphics.beginPath();
		graphics.moveTo(0, i*25);
		graphics.lineTo(width, i*25);
		graphics.stroke();
	}
}

canvas.addEventListener("mousedown", function() {
	if (complexPoint.checked) {
		mousedown = true;
	}
});

document.addEventListener("mouseup", function() {
	if (complexPoint.checked) {
		mousedown = false;
	}
});

document.addEventListener("mousemove", function(event) {
	if (mousedown && complexPoint.checked) {
		let mouseX = event.clientX-7;
		let mouseY = event.clientY-7;

		setComplexPointCoordinates(mouseX, mouseY);
	}
});

function setComplexPointCoordinates(mouseX, mouseY) {
	if (mouseX > 0 && mouseX < width) {
		x = mouseX;
	} else if (mouseX < 0) {
		x = 0;
	} else if (mouseX > width) {
		x = width;
	}

	if (mouseY > 0 && mouseY < height) {
		y = mouseY;
	} else if (mouseY < 0) {
		y = 0;
	} else if (mouseY > height) {
		y = height;
	}
}


function factorial(n) {
    if (n < 2) {
        return 1;
    }

    return n*factorial(n-1);
}

function drawEx() {
	for (var i = 0; i <= width*10; i++) {
		graphics.fillStyle = "blue";
		graphics.fillRect(i/10, -Math.exp((i/10-height/2)/25)*25+height/2, 1, 1);
	}
}

function taylorSeriesEx(terms) {
	for (var i = 0; i <= width*10; i++) {
		let Ex = 0;

		for (var j = 0; j < terms; j++) {
			Ex += ((((i/10-height/2)/25)**(j))/factorial(j));
		}

		graphics.fillStyle = "red";
		graphics.fillRect(i/10, -Ex*25+height/2, 1, 1);
	}
}

function random(min, max) {
	return Math.floor(Math.random()*(max-min+1)) + min;
}

function fourierSeriesDraw(terms) {
	for (var i = 0; i <= width*10; i++) {
		let line = 0;
		let parabola = (Math.PI)**2/3;
		let sign = 0;
		let absoluteValue = Math.PI/2;

		let bestX = (i/10-height/2)/25;

		for (var j = 1; j <= terms; j++) {
			if (fourierSeriesLine.checked) {
				line += 2*((-1)**(j+1)/j)*Math.sin(j*bestX);
			}

			if (fourierSeriesParabola.checked) {
				parabola += 4*((-1)**j/(j*j))*Math.cos(j*bestX);
			}

			if (fourierSeriesSign.checked) {
				sign += (2/Math.PI)*((1+(-1)**(j+1))/j)*Math.sin(j*bestX);
			}

			if (fourierSeriesAbsoluteValue.checked) {
				absoluteValue += (2/Math.PI)*((-1+(-1)**j)/(j*j))*Math.cos(j*bestX);
			}
		}

		if (fourierSeriesLine.checked) {
			graphics.fillStyle = "red";
			graphics.fillRect(i/10, -line*25+height/2, 1, 1);
		}

		if (fourierSeriesParabola.checked) {
			graphics.fillStyle = "blue";
			graphics.fillRect(i/10, -parabola*25+height/2, 1, 1);
		}

		if (fourierSeriesSign.checked) {
			graphics.fillStyle = "green";
			graphics.fillRect(i/10, -sign*25+height/2, 1, 1);
		}

		if (fourierSeriesAbsoluteValue.checked) {
			graphics.fillStyle = "orange";
			graphics.fillRect(i/10, -absoluteValue*25+height/2, 1, 1);
		}
	}
}

function fourierSeriesSound(type) {
	var sound = lineSound || parabolaSound || signSound || absoluteValueSound;

	if (!sound) { 
		osc = ctx.createOscillator();
		osc.start();
		osc.connect(ctx.destination);

		if (type == "line") {
			lineSound = true;
		} else if (type == "parabola") {
			parabolaSound = true;
		} else if (type == "sign") {
			signSound = true;
		} else if (type == "absolute") {
			absoluteValueSound = true;
		}

	} else {
		osc.stop();
		osc.disconnect(ctx.destination);
		osc = null;

		fourierBallX = 0;

		lineSound = false;
		parabolaSound = false;
		signSound = false;
		absoluteValueSound = false;
	}
}

function mandelbrotDraw(iterations) {
	graphics.clearRect(0, 0, width, height);

	var scalingFactor = width/4;

	//multiply by 4 in order to get the scaling right
	for (var i = 0; i <= width; i++) {
		for (var j = 0; j <= height; j++) {
			var x = 0;
			var y = 0;

			var k = 0;

			var re = ((i-width/2)/scalingFactor);
			var im = ((j-height/2)/scalingFactor);

			while (x*x + y*y <= 4 && k < iterations) {
				let x_new = (x*x-y*y)+re;
				y = (2*x*y)+im;

				x = x_new;

				k++;
			}

			if (k < iterations) {
				graphics.fillStyle = "hsl(" + iterations/k + "," + k + "%, " + k  + "%)";
				graphics.fillRect(i, j, 1, 1);
			} else {
				graphics.fillStyle = "white";
				graphics.fillRect(i, j, 1, 1);
			}
		}
	}
}

function juliaSetDraw(real, imaginary, iterations) {
	graphics.clearRect(0, 0, width, height);

	var scalingFactor = width/4;
	//multiply by 4 in order to get the scaling right
	for (var i = 0; i <= width; i++) {
		for (var j = 0; j <= height; j++) {
			var x = (i-width/2)/scalingFactor;
			var y = (j-height/2)/scalingFactor;

			var k = 0;

			var re = real;
			var im = imaginary;

			while (x*x + y*y <= 4 && k < iterations) {
				let x_new = (x*x-y*y)+re;
				y = (2*x*y)+im;

				x = x_new;

				k++;
			}

			if (k < iterations) {
				graphics.fillStyle = "hsl(" + iterations/k + "," + k + "%, " + k  + "%)";
				graphics.fillRect(i, j, 1, 1);
			} else {
				graphics.fillStyle = "white";
				graphics.fillRect(i, j, 1, 1);
			}
		}
	}
}

function draw() {
	if (!mandelbrotSetRadio.checked && !juliaSetRadio.checked) {
		graphics.clearRect(0, 0, width, height);
		drawLines();
	}

	if (complexPointRadio.checked) {
		var complexList = document.getElementsByClassName("complexpoint");

		for (var i = 0; i < complexList.length; i++) {
			complexList[i].hidden = false;
		}

		realX = (x-width/2)/25;
		realY = -1*(y-height/2)/25;
		magnitude = Math.round(Math.sqrt(realX**2+realY**2)*100)/100;

		if (realX > 0 && realY > 0) {
			angleRadians = Math.atan(realY/realX);
		} else if ((realX < 0 && realY > 0) || (realX < 0 && realY < 0)) {
			angleRadians = Math.atan(realY/realX)+Math.PI;
		} else if (realX == 0 && realY == 0) {
			angleRadians = 0;
		} else {
			angleRadians = Math.atan(realY/realX)+2*Math.PI;
		}

		if (complexPoint.checked) {
			graphics.beginPath();
			graphics.fillStyle = "red";
			graphics.arc(x, y, 5, 0, 2*Math.PI);
			graphics.closePath();
			graphics.fill();
		}

		if (magnitudeButton.checked) {
			graphics.lineWidth = 3;
			graphics.strokeStyle = "blue";
			graphics.beginPath();
			graphics.moveTo(width/2, height/2);
			graphics.lineTo(x, y);
			graphics.stroke();
		}

		if (angleButton.checked) {
			graphics.lineWidth = 5;
			graphics.strokeStyle = "purple";
			graphics.beginPath();
			graphics.arc(width/2, height/2, 20, 0, -angleRadians, true);
			graphics.stroke();
		}

		if (pythagoreanTheoremButton.checked) {
			//Horizontal Line
			graphics.lineWidth = 2;
			graphics.strokeStyle = "orange";
			graphics.beginPath();
			graphics.moveTo(width/2, height/2);
			graphics.lineTo(x, height/2);
			graphics.stroke();

			//Vertical Line
			graphics.lineWidth = 2;
			graphics.strokeStyle = "yellow";
			graphics.beginPath();
			graphics.moveTo(x, height/2);
			graphics.lineTo(x, y);
			graphics.stroke();
		}

		angleDegrees = Math.round(angleRadians*(180/Math.PI)*100)/100;

		if (radiansButton.checked) {
			description.innerHTML = "Complex Number in Standard Form: " + realX + " + " + realY + "i <br> Complex Exponential Form: " + magnitude + "e<sup>" + Math.round(angleRadians*100)/100 + "<br> Complex Trigonometric Form: " + magnitude + "(cos(" + Math.round(angleRadians*100)/100 +") + i*sin(" + Math.round(angleRadians*100)/100 +"))";
		} else {
			description.innerHTML = "Complex Number in Standard Form: " + realX + " + " + realY + "i <br> Complex Exponential Form: " + magnitude + "e<sup>" + angleDegrees + "<br> Complex Trigonometric Form: " + magnitude + "(cos(" + angleDegrees +") + i*sin(" + angleDegrees +"))";
		}
	} else {
		var complexList = document.getElementsByClassName("complexpoint");

		for (var i = 0; i < complexList.length; i++) {
			complexList[i].hidden = true;
		}
	}

	var polynomial = "";

	if (taylorSeriesRadio.checked) {
		var taylorSeriesList = document.getElementsByClassName("taylorseries");

		for (var i = 0; i < taylorSeriesList.length; i++) {
			taylorSeriesList[i].hidden = false;
		}

		drawEx();
		taylorSeriesEx(taylorSeriesSlider.value);

		for (var i = 0; i < taylorSeriesSlider.value; i++) {
			if (i == 0) {
				polynomial += taylorSeriesSlider.value + " terms: 1";
			} else if (i == 1) {
				polynomial += "+x";
			} else {
				polynomial += "+<sup>x<sup>" + i + "</sup></sup>&frasl;" + i + "!";
			}
		}

		taylorSeriesTerms.innerHTML = polynomial;
	} else {
		var taylorSeriesList = document.getElementsByClassName("taylorseries");

		for (var i = 0; i < taylorSeriesList.length; i++) {
			taylorSeriesList[i].hidden = true;
		}
	}

	if (fourierSeriesRadio.checked) {
		var fourierSeriesList = document.getElementsByClassName("fourierseries");

		for (var i = 0; i < fourierSeriesList.length; i++) {
			fourierSeriesList[i].hidden = false;
		}

		fourierTerms.innerHTML = fourierSeriesSlider.value + " terms";
		fourierSeriesDraw(fourierSeriesSlider.value);

		if (lineSound && fourierBallX < width) {
			var bestX = (fourierBallX-height/2)/25;

			for (var i = 1; i <= fourierSeriesSlider.value; i++) {
				fourierBallY += 2*((-1)**(i+1)/i)*Math.sin(i*bestX);
			}

			graphics.fillStyle = "pink";
			graphics.beginPath();
			graphics.arc(fourierBallX, -fourierBallY*25+height/2, 5, 0, Math.PI*2);
			graphics.fill();

			osc.frequency.value = fourierBallY*25+height/2;

			fourierBallX+=1;
			fourierBallY = 0;
		} else if (parabolaSound && fourierBallX < width) {
			var bestX = (fourierBallX-height/2)/25;

			for (var i = 1; i <= fourierSeriesSlider.value; i++) {
				fourierBallY += 4*((-1)**i/(i*i))*Math.cos(i*bestX);
			}

			graphics.fillStyle = "pink";
			graphics.beginPath();
			graphics.arc(fourierBallX, -fourierBallY*25+height/2, 5, 0, Math.PI*2);
			graphics.fill();

			osc.frequency.value = fourierBallY*25+height/2;

			fourierBallX+=1;
			fourierBallY = (Math.PI)**2/3;
		} else if (signSound && fourierBallX < width) {
			var bestX = (fourierBallX-height/2)/25;

			for (var i = 1; i <= fourierSeriesSlider.value; i++) {
				fourierBallY += (2/Math.PI)*((1+(-1)**(i+1))/i)*Math.sin(i*bestX);
			}

			graphics.fillStyle = "pink";
			graphics.beginPath();
			graphics.arc(fourierBallX, -fourierBallY*25+height/2, 5, 0, Math.PI*2);
			graphics.fill();

			osc.frequency.value = fourierBallY*25+height/2;

			fourierBallX+=1;
			fourierBallY = 0;
		} else if (absoluteValueSound && fourierBallX < width) {
			var bestX = (fourierBallX-height/2)/25;

			for (var i = 1; i <= fourierSeriesSlider.value; i++) {
				fourierBallY += (2/Math.PI)*((-1+(-1)**i)/(i*i))*Math.cos(i*bestX);
			}

			graphics.fillStyle = "pink";
			graphics.beginPath();
			graphics.arc(fourierBallX, -fourierBallY*25+height/2, 5, 0, Math.PI*2);
			graphics.fill();

			osc.frequency.value = fourierBallY*25+height/2;

			fourierBallX+=1;
			fourierBallY = Math.PI/2;
		}

		if (fourierBallX >= width) {
			fourierBallX = 0;

			osc.stop();
			osc.disconnect(ctx.destination);
			osc = null;

			lineSound = false;
			parabolaSound = false;
			signSound = false;
			absoluteValueSound = false
		}
	} else {
		var fourierSeriesList = document.getElementsByClassName("fourierseries");

		for (var i = 0; i < fourierSeriesList.length; i++) {
			fourierSeriesList[i].hidden = true;
		}
	}

	if (mandelbrotSetRadio.checked) {
		var mandelbrotSetList = document.getElementsByClassName("mandelbrotset");

		for (var i = 0; i < mandelbrotSetList.length; i++) {
			mandelbrotSetList[i].hidden = false;
		}

		mandelbrotIterations.innerHTML = mandelbrotSetSlider.value + " iterations";
	} else {
		var mandelbrotSetList = document.getElementsByClassName("mandelbrotset");

		for (var i = 0; i < mandelbrotSetList.length; i++) {
			mandelbrotSetList[i].hidden = true;
		}
	}

	if (juliaSetRadio.checked) {
		var juliaSetList = document.getElementsByClassName("juliaset");

		for (var i = 0; i < juliaSetList.length; i++) {
			juliaSetList[i].hidden = false;
		}

		juliaSetIterations.innerHTML = juliaSetSlider.value + " iterations";
	} else {
		var juliaSetList = document.getElementsByClassName("juliaset");

		for (var i = 0; i < juliaSetList.length; i++) {
			juliaSetList[i].hidden = true;
		}
	}
}

interval = setInterval(draw, 10);