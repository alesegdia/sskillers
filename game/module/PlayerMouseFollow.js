

SSK.namespace("SSK.module");



SSK.module.PlayerMouseFollow = function(){};
SSK.module.PlayerMouseFollow.prototype = {

	tick : function(e) {
		
		e.CInputState.attack = SSK.input.mousePressed;

		var prevx = e.CTransform.x; 
        e.CTransform.x = SSK.input.mousePos.x + e.cam.CTransform.x;
        e.CTransform.y = SSK.input.mousePos.y + e.cam.CTransform.y;
		var delta = prevx - e.CTransform.x;
		if(!e.CInputState.attack && delta != 0)
		{
			e.CRender.faceLeft = delta > 0;			
		}
	},

	performsOver : function(e) {
		return e.CPlayer;
	}

};
