var Star = function( maxw, maxh ) {
	this.spmult = 0.25;
	this.x = parseFloat( randomRange( 0, maxw - 1 ));
	this.y = parseFloat( randomRange( 0, maxh - 1 ));
	var spd = randomRange( 1, 3 ) * this.spmult;
	this.speedX = spd;
	this.speedY = spd;
};

Star.prototype.update = function(fx,fy) {

	var spd = randomRange(1,3)*this.spmult;

	this.x += this.speedX*fx;
	this.y += this.speedY*fy;

	if (this.x > canvas.width){
	this.speedX=spd;
	this.speedY=spd;
		this.x = 0;
		this.y = randomRange(0,canvas.height);
	} else if (this.x < 0) {
	this.speedX=spd;
	this.speedY=spd;
		this.x = canvas.width-1;
		this.y = randomRange(0,canvas.height);
	} else if (this.y > canvas.height){
	this.speedX=spd;
	this.speedY=spd;
		this.y = 0;
		this.x = randomRange(0,canvas.width);
	} else if (this.y < 0) {
	this.speedX=spd;
	this.speedY=spd;
		this.y = canvas.height-1;
		this.x = randomRange(0,canvas.width);
	}
};
