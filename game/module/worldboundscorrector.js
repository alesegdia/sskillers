
SSK.namespace("SSK.module");

SSK.module.WorldBoundsCorrector = function( sx, sy ){

	console.log( "creando" );
	this.size = new Vec2( sx, sy );

};

SSK.module.WorldBoundsCorrector.prototype = {

	tick : function( e ){

		assert( this.size != null, "WorldBoundsCorrector: this.size == null!" );

		/*
		if(e.CTransform.x + e.CBox.x/2 < 0) {
			e.CTransform.x = this.size.x-e.CBox.x/2;
		} else if (e.CTransform.x + e.CBox.x/2 > this.size.x) {
			e.CTransform.x = -e.CBox.x/2;
		}

		if(e.CTransform.y + e.CBox.y/2 < 0) {
			e.CTransform.y = this.size.y-e.CBox.y/2;
		} else if (e.CTransform.y + e.CBox.y/2 > this.size.y) {
			e.CTransform.y = -e.CBox.y/2;
		}
		*/

		var out = false;
		if(e.CTransform.x < 0) {
			out = true;
			e.CTransform.x = 0;
		} else if (e.CTransform.x + e.CBox.x > this.size.x) {
			out = true;
			e.CTransform.x = this.size.x - e.CBox.x;
		}

		if(e.CTransform.y <= 0) {
			out = true;
			e.CTransform.y = 0;
		} else if (e.CTransform.y + e.CBox.y > this.size.y) {
			out = true;
			e.CTransform.y = this.size.y - e.CBox.y;
		}

		if( out == true && e.CBullet ) e.CAlive = false;

	},

	performsOver : function( e ){
		return e.CPlayer || e.CCamera;
		//return e.CCamera || e.CPlayer;
	}
};
