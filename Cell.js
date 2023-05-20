let iter = 1;
let id = 0;
class Cell {
	constructor(x, y) {
		this.id = id++;
		this.x = x;
		this.y = y;
		this.vx = 0;
		this.vy = 0;
		this.ax = 0;
		this.ay = 0;
		this.angle = 0;
		this.size = cellSize;
		this.exists = true;
		this.isOverlap = false;
		this.color = '#995444';
		this.dividing = null;
	}
	static spaceTol = 0.98;
	static anyOverLap() {
		//whether any are overlapped or not
		for(let i = 0; i < cells.length; i ++) {
			let ci = cells[i];
			for(let j = 0; j < cells.length && j != i; j ++) {
				let cj = cells[j];
				let limit = ci.size + cj.size;
				limit *= Cell.spaceTol;
				if(dist(ci.x, ci.y, cj.x, cj.y) < limit) {
					return true;
				}
			}
		}
		return false;
	}
	static showAll() {
		//moving every cell
		for(let i = 0; i < cells.length; i ++) {
			cells[i].x += cells[i].vx;
			cells[i].y += cells[i].vy;
		}
		//showing all the cells
		for(let i = 0; i < cells.length; i ++)
			cells[i].show();
	}
	adjust() {
		//adjust so cell occupies unique position
		/*
		for(let i = 0; (i < cells.length)?(this.id != cells[i].id):false ; i ++) {
			
		}
		*/
		let changed = false;
		for(let j = 0; (j < cells.length)?this.id != cells[j].id:false; j ++) {
			let cj = cells[j];
			let limit = this.size + cells[j].size;
			limit *= Cell.spaceTol;
			let d = dist(this.x, this.y, cj.x, cj.y);
			if(d < limit) {
				let a = Math.atan2(cj.y - this.y, cj.x - this.x) + Math.PI;
				let v = vel/(1 + d); 
				this.vx += v * Math.cos(a);
				this.vy += v * Math.sin(a);
				cj.vx += v * Math.cos(a + Math.PI);
				cj.vy += v * Math.sin(a + Math.PI);
				changed = true;
				cj.isOverlap = true;
				this.isOverlap = true;
				//vel = (this.size + cj.size)/4; 
			}
		}
		if(!changed) {
			this.isOverlap = false;
			this.vx = this.vy = 0;
		}
	}
	show() {
		this.adjust();	
		/*
		//To highlight adjusting cells 
		if(this.isOverlap)
			this.color = "#BB3222";
		else 
			this.color = "#995444";
		*/
		c.fillStyle = this.color;
		c.beginPath();
		c.arc(this.x, this.y, this.size, 0, 2*Math.PI, false);
		c.fill();
	}
	mitote() {
		//create two new cells around the current cell
		//need new cells to be at 180
		if(++iter < popLimit) {
			this.dividing = setTimeout(
			() => {
				for(let i = 0; i < 2; i ++) {
					let angle = Math.PI - 2*Math.PI*Math.random();
					let nx = this.x + this.size*Math.cos(angle);
					let ny = this.y + this.size*Math.sin(angle);
					cells.push(new Cell(nx, ny));
				}
				//destroying current cell
				this.destroy();
			}, 10);// (50 + 50*Math.random())*frames);
		}
	}
	destroy() {
		this.exists = false;
		for(let i = 0; i < cells.length; i ++) {
			if(cells[i].id == this.id) {
				cells.splice(i, 1);
				break;
			}
		}
	}
}
		/*
		//adjusting cells so they dont overlap
		for(let i = 0; i < cells.length; i ++) {
			let ci = cells[i];
			let changed = false;
			for(let j = 0; j < cells.length && j != i; j ++) {
				let cj = cells[j];
				let md = ci.size + cj.size;
				let d = 1;
				if(d = dist(ci.x, ci.y, cj.x, cj.y) < md) {
					let a = Math.atan2(cj.y - ci.y, cj.x - ci.x) + Math.PI;
					ci.vx += vel/d * Math.cos(a);
					ci.vy += vel/d * Math.sin(a);
					cj.vy += vel/d * Math.sin(a + Math.PI);
					cj.vx += vel/d * Math.cos(a + Math.PI);
					if(!changed) {
						ci.isOverlap = true;
						cj.isOverlap = true;
						changed = true;
					}
				}
			}
			if(!changed && ci.isOverlap) {
				ci.isOverlap = false;
			}
			if(Chamber.wall(cells[i])) {
				ci.vx = ci.vy = 0; 
			}
		}
		*/