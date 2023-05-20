//start animation
let loop;
function start() {
	//drawing a background
	background();
	cells = new Array();
	hormones = new Array();
	iter = 0;
	id = 0;
	console.clear();
	//creating the first cell
	cells.push(new Cell(wd/2, ht/2));
	//creating chamber
	let chamber = new Chamber(wd/4, ht/4, wd/2, ht/2);
	//creating hormone
	for(let i = 0; i < 10; i ++)
		hormones.push(new Hormone(chamber.x + 15 + (chamber.wd - 15)*Math.random(), chamber.y + 15 + (chamber.ht - 15)*Math.random(), 10, "#5566AA77"));
	if(devMode)
		popLimit = prompt("Population size :", popLimit);
	//loop for animation
	loop = setInterval(() => {
		background();
		//show all cells
		Cell.showAll();
		//hormone in chamber
		Hormone.showAll();
		//chamber for cell growth
		chamber.show();
		for(let i = 0; i < cells.length; i ++) 
			chamber.checkWall(cells[i]);
		for(let i = 0; i < hormones.length; i ++)
			chamber.checkWall(hormones[i]);
		if(cells.length >= popLimit) {
			Hormone.allowMitosis = false;
			if(!Cell.anyOverLap()) {
				clearInterval(loop);
				console.log("Finished simulation");
				//start();
			}
			/*
			else
				console.log("Population :", cells.length);
			*/
		}
	}, 1);
}
function stop() {
	clearInterval(loop);
	iter = 1;
	for(let i = 0; i < cells.length; i ++)
			clearTimeout(cells[i].dividing);
	while(cells.length)
		cells.pop();
	while(hormones.length)
		hormones.pop();
	console.log("Loop was forcefully stopped");
}