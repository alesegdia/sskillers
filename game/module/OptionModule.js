

SSK.namespace("SSK.module");

SSK.module.OptionModule = function(){};
SSK.module.OptionModule.prototype = {

	tick : function(e) {
		var i = 0;
		var angleStep = 360 / e.COptionOwner.options.length;
		var sum = ((SSK.core.time * 0.1) % 360) ;
		e.COptionOwner.options.forEach(element => {
			position = rotateVector(50, 0, sum + angleStep * i);
			var entity = element;
			entity.CTransform = { x: position.x + e.CTransform.x, y: position.y + e.CTransform.y };
			entity.CRender.faceLeft = e.CRender.faceLeft;
			i++;
			entity.CInputState.attack = e.CInputState.attack;
		});
	},

	performsOver : function(e) {
		return e.COptionOwner;
	}

};
