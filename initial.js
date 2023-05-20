const wd = window.innerWidth - 30, ht = window.innerHeight - 50;
const bgcolor = "#000000";

var sandbox = document.createElement("canvas");
sandbox.width = wd;	
sandbox.height = ht;
document.getElementById("sandbox").appendChild(sandbox);

var c = sandbox.getContext("2d");
c.fillStyle = bgcolor;
c.fillRect(0, 0, wd, ht); 

let angle = 2*Math.PI*Math.random();
let popLimit = 800;
let mitoPercent = 0.2;
let cellSize = 5;
let vel = cellSize/4;
let frames = 100; 
let devMode = false;
let dist = (x1, y1, x2, y2) => {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

let cells = [];
let hormones = [];

function background() {
	c.fillStyle = bgcolor;
	c.fillRect(0, 0, wd, ht);
	c.strokeStyle = '#ff3333';
}
function keyBoard(event) {
	let key = event.key;
	if(key == 'q')
		start();
	else if(key == 'w')
		stop();
	else if(key == 'x') {
		devMode = true;
		stop();
		start();
	}
	else if(key == 'u') {
		devMode = false;
		popLimit = 800;
		stop();
		start();
	}
	else if(key =='d') {
		Chamber.drawShape(event);
	}
}