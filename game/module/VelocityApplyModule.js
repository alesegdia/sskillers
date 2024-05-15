

SSK.namespace("SSK.module");

SSK.module.VelocityApplyModule = function(){};
SSK.module.VelocityApplyModule.prototype = {

	tick : function(e) {
		var vel = 1;
		e.CVelocity.x = 0;
		e.CVelocity.y = 0;
		e.CVelocity.y = e.CMaxVelocity.y * e.CInputState.yaxis;
		e.CVelocity.x = e.CMaxVelocity.x * e.CInputState.xaxis;
	},

	performsOver : function(e) {
		return e.CVelocity && e.CMaxVelocity && e.CInputState;
	}

};
