

SSK.namespace("SSK.module");

SSK.module.ShieldSystem = function( ){
};

SSK.module.ShieldSystem.prototype = {

	tick : function(e) {
		var sh = e.CShield;
		if( sh.current < sh.maxShield )
		{
			sh.lastHit += SSK.core.deltaTime;
			sh.nextHeal += SSK.core.deltaTime;
			if( sh.lastHit >= sh.startregen && sh.nextHeal > sh.regenrate){
				sh.current++;
				sh.nextHeal = 0;
			}
		}
	},

	performsOver : function(e) {
		return e.CPlayer;
	}

};
