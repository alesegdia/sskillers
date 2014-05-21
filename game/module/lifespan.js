

SSK.namespace("SSK.module");

SSK.module.LifeSpan = function(){};
SSK.module.LifeSpan.prototype = {

	tick : function(e) {
		e.CLifeSpan -= SSK.core.deltaTime;
		if( e.CLifeSpan <= 0 )
		{
			e.CAlive = false;
		}
		//console.log(e.CLifeSpan);
	},

	performsOver : function(e) {
		return e.CLifeSpan;
	}

};
