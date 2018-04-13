var nodes, wW, wH, timeStart;

var palettes = [
	// Light red on red
	{
		background: {
			r: 28,
			g: 254,
			b: 186
		},
		line: {
			r: 229,
			g: 54,
			b: 50
		}
	},
	// Dark blue on red
	{
		background: {
			r: 231,
			g: 76,
			b: 60
		},
		line: {
			r: 44,
			g: 62,
			b: 80
		}
	},
	// Pinkish red on beige
	{
		background: {
			r: 243,
			g: 255,
			b: 189
		},
		line: {
			r: 255,
			g: 22,
			b: 84
		}
	},
	// Dark blue on pink
	{
		background: {
			r: 255,
			g: 162,
			b: 159
		},
		line: {
			r: 72,
			g: 110,
			b: 142
		}
	},
	// Orange on dark purple
	{
		background: {
			r: 51,
			g: 37,
			b: 50
		},
		line: {
			r: 255,
			g: 151,
			b: 79
		}
	},
	// Teal green on light green
	{
		line: {
			r: 0,
			g: 163,
			b: 136
		},
		background: {
			r: 190,
			g: 235,
			b: 159
		}
	}
];
var currentPalette;

function setup() {
	nodes = [];
	timeStart = millis();
	currentPalette = Math.floor(Math.random()*palettes.length);
	wW = windowWidth;
	wH = windowHeight;
	createCanvas(wW, wH);
	frameRate(60);

	for (var i = 0; i < Math.floor((Math.random() * 20) + 15); i++) {
		nodes.push( {x: Math.floor((Math.random() * wW) + 1), y: Math.floor((Math.random() * wH) + 1), v: createVector( ((Math.floor(Math.random() * 10) % 2 == 0) ? 1 : -1) * (Math.random()*2.5 + 1), ((Math.floor(Math.random() * 10) % 2 == 0) ? 1 : -1) * (Math.random()*2.5 + 1) )} ) 
	}
	background( "rgba(" + palettes[currentPalette].background.r + "," + palettes[currentPalette].background.g + "," + palettes[currentPalette].background.b + "," + 255 + ")" );
}

function draw() {
	if(millis() - timeStart < 3500) {
	  	for (var i = 0; i < nodes.length; i++) {
	  		//move ellipse
	  		nodes[i].x += nodes[i].v.x;
	  		nodes[i].y += nodes[i].v.y;


			if (nodes[i].x > wW + 10) {
				nodes[i].x = -10;
			} else if (nodes[i].x < -10) {
				nodes[i].x = wW + 10;
			}

			if (nodes[i].y > wH + 10) {
				nodes[i].y = -10;
			} else if (nodes[i].y < -10) {
				nodes[i].y = wH + 10;
			}

	  		//draw line
			strokeWeight(0.15);
			stroke("rgba(" + palettes[currentPalette].line.r + "," + palettes[currentPalette].line.g + "," + palettes[currentPalette].line.b + "," + 255 + ")");
	  		for (var y = i; y < nodes.length; y++) {
	  			if ( dist(nodes[i].x, nodes[i].y, nodes[y].x, nodes[y].y) < wW/4 && dist(nodes[i].x, nodes[i].y, nodes[y].x, nodes[y].y) > 0 ) {
	  				line(nodes[i].x, nodes[i].y, nodes[y].x, nodes[y].y);
	  			}
	  		}
	  	}
	}
}



function windowResized() {
	setup();
}

function mousePressed() {
	setup();
}