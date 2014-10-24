
SSK.namespace("SSK.module");

SSK.module.ScrollAdjust = function( cam ){
	this.cam = cam;
};

SSK.module.ScrollAdjust.prototype = {
// esto es en realidad el super motor joder
	tick : function(e) {
		if( this.cam.CTransform.x + this.cam.CBox.x < SSK.game.World.width && this.cam.CTransform.x > 0 )
			e.CTransform.x += this.cam.CSpeed.x;
		if( this.cam.CTransform.y + this.cam.CBox.y < SSK.game.World.height && this.cam.CTransform.y > 0 ){
			e.CTransform.y += this.cam.CSpeed.y;
		}
	},

	performsOver : function(e) {
		return e.CPlayer;
	}

};
