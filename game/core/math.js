var Rect = function(x,y,w,h) {
	this.pos = new Vec2(x,y);
	this.size = new Vec2(w,h);
};

var Vec2 = function(x,y) {
	this.x = parseFloat(x); this.y = parseFloat(y);
};

Vec2.prototype = {

	set : function(){
		if( arguments.length == 1 ){
			this.x = arguments[0].x;
			this.y = arguments[0].y;
		} else if( arguments.length == 2 ){
			this.x = arguments[0];
			this.y = arguments[1];
		}
	},

	scale : function( factor ){
		this.x *= factor;
		this.y *= factor;
	},

	add : function( other ){
		this.x += other.x;
		this.y += other.y;
	},

	sub : function( other ){
		this.x -= other.x;
		this.y -= other.y;
	},

	scaleXY : function( fx, fy ){
		this.x *= fx;
		this.y *= fy;
	}

};

function randomRange(min,max) {
	return Math.floor((Math.random()*max)+min);
}

var sign = function(number) {
	return number ? number < 0 ? -1 : 1 : 0;
}

var module = function(v) {
	return Math.sqrt(v.x*v.x + v.y*v.y);
}

var norm = function(v) {
	var mod = Math.sqrt(v.x*v.x + v.y*v.y);
	return new Vec2(v.x/mod, v.y/mod);
}

var distance = function(vx,vy,wx,wy) {
	return Math.sqrt(Math.pow(vx-wx,2)+Math.pow(vy-wy,2));
}

var rectIntersect = function( pa, ba, pb, bb )
{

	var atop, abot, aleft, aright;
	var btop, bbot, bleft, bright;

	atop = pa.y + ba.y;
	abot = pa.y;
	aleft = pa.x;
	aright = pa.x + ba.x;

	btop = pb.y + bb.y;
	bbot = pb.y;
	bleft = pb.x;
	bright = pb.x + bb.x;

	return !(bleft > aright ||
			 bright < aleft ||
			 btop < abot ||
			 bbot > atop);

};
