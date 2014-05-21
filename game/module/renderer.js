
SSK.namespace("SSK.module");

SSK.module.Renderer = function( w, h, usewebgl2d ){

	this.canvas2d = document.getElementById('canvas');
	this.usewebgl = usewebgl2d;
	
	if( usewebgl2d ) {
		WebGL2D.enable(this.canvas2d);
	}

	this.canvas2d.width = w;
	this.canvas2d.height = h;

	if( usewebgl2d ) {
		this.context2d = this.canvas2d.getContext("webgl-2d");//this.canvas2d.getContext('2d');
	} else {
		this.context2d = this.canvas2d.getContext('2d');
	}
};

SSK.module.Renderer.prototype = {

	tick : function(e) {
		//console.log("procesa");
		this.context2d.save();
		this.context2d.translate(10,0);
		this.context2d.scale(-1,1);
		//this.context2d.drawImage( e.CSprite, e.CTransform.x, e.CTransform.y );
		this.context2d.restore();
	},

	performsOver : function(e) {
		return e.CRender && e.CTransform;
	},

	drawFlipH : function(img, x, y) {
		this.context2d.save();
		this.context2d.scale(-1,1);
		
		this.context2d.drawImage(img, -x, y, -img.width, img.height);
		this.context2d.restore();
	}

};
