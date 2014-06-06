
SSK.namespace("SSK.module");

SSK.module.ScrollAdjust = function( cam ){
	this.cam = cam;
};

SSK.module.ScrollAdjust.prototype = {
// esto es en realidad el super motor joder
	tick : function(e) {
		e.CTransform.x += this.cam.CSpeed.x;
		e.CTransform.y += this.cam.CSpeed.y;
	},

	performsOver : function(e) {
		return e.CPlayer;
	}

};
