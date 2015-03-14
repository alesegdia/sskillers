

SSK.namespace("SSK.module");

SSK.module.Motion = function(){};
SSK.module.Motion.prototype = {

	tick : function(e) {

		e.CSpeed.set(e.CVelocity);
		e.CSpeed.scale(SSK.core.deltaTime);
		e.CSpeed.cap( e.CMaxVelocity );
		e.CTransform.x += e.CSpeed.x; //* SSK.core.deltaTime * 10; //SSK.core.time.delta * e.CVelocity.x;
		e.CTransform.y += e.CSpeed.y; //SSK.core.deltaTime * 10; //SSK.core.time.delta * e.CVelocity.y;
		//console.log(e.CSpeed );
	},

	performsOver : function(e) {
		return e.CTransform && e.CVelocity;
	}

};
