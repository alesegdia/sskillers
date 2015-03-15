
SSK.namespace("SSK.core.render");

var SSK.core.render.Spritesheet = function( sprite, cols, rows )
{
	this.sprite = sprite;
	this.cols = cols;
	this.rows = rows;
	this.tw = sprite.width / rows;
	this.th = sprite.height / cols;
	var that = this;
	this.getRect = function( n ) {
		return [ n % that.cols * that.tw, Math.floor( n / that.cols ) * that.th, that.tw, that.th ];
	}
}

