class Hormone {
	constructor(x, y, size, color) {
		this.color = color;
		this.x = x;
		this.y = y;
		this.size = size;
		this.effective = 10;
		this.decay = 0.99;
		this.vx = this.effective*(0.5 - Math.random());
		this.vy = this.effective*(0.5 - Math.random());
	}
	static allowMitosis = true;
	static showAll() {
		for(let i = 0; i < hormones.length; i ++) {
			if(hormones[i].size <= 1)
				hormones.pop();
			else {
				hormones[i].show();
				hormones[i].size *= hormones[i].decay;
			}
		}
	}
	show() {
		this.interact();
		this.x += this.vx;
		this.y += this.vy;
		c.fillStyle = this.color;
		c.beginPath();
		c.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
		c.fill();
	}
	interact() {
		let queue = [];
		for(let i = 0; i < cells.length; i ++) {
			let d = dist(this.x, this.y, cells[i].x, cells[i].y);
			let limit = (this.size + cells[i].size);
			if(d < limit && this.effective >= 1) {
				this.effective *= this.decay;
				this.vx = this.effective*(0.5 - Math.random());
				this.vy = this.effective*(0.5 - Math.random());
				queue.push(cells[i]);
			}
		}
		while(queue.length && Hormone.allowMitosis) {
			queue.pop().mitote();
		}
	}
}