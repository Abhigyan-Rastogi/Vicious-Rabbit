let shape = new Array();
class Chamber {
	//a way to input user defined shapes
	//a way to check if cells are going outside the chamber
	//a way to stop cells from going outside the chamber
	constructor(x, y, wd, ht) {
		this.x = x;
		this.y = y; 
		this.wd = wd;
		this.ht = ht;
		this.show();
	}
	show() {
		c.strokeStyle = "#9999AA";
		c.lineWidth = 3;
		c.strokeRect(this.x, this.y, this.wd, this.ht);
	}
	checkWall(p = {x : 0, y : 0, vx : 0, vy : 0, size : 0}) {
		let c1 = (p.x + p.vx - p.size <= this.x + 3)
		|| (p.x + p.vx + p.size >= this.x + this.wd - 3);
		let c2 = (p.y + p.vy - p.size <= this.y + 3)
		|| (p.y + p.vy + p.size >= this.y + this.ht - 3);
		if(c1)
			p.vx *= -1;
		if(c2)
			p.vy *= -1;
	}
	static drawShape(event) {
		console.log("Recording");
		for(let i = 0; i < 100; i ++) {
			setTimeout(() => {
				console.log(shape.push({x : event.clientX, y : event.clientY}));
			}, 10);
		}
		console.log(shape);
	}
}