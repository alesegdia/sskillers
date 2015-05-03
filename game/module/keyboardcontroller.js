

SSK.namespace("SSK.module");

SSK.module.GenericModule = function() {
	this.process = function() {
		throw new Error("GenericModule, no process function!");
	};
};

SSK.module.EntityModule = function() {
	this.onEntityAdded = function(e) {
		if( this.performsOver(e) ) this.notifyEntityAdded(e);
	};
	this.onEntityDeleted = function(e) {
		if( this.performsOver(e) ) this.notifyEntityDeleted(e);
	};
	this.notifyEntityAdded = function(e) {
		throw new Error("Abstract!");
	};
	this.notifyEntityDeleted = function(e) {
		throw new Error("Abstract!");
	};
};

SSK.module.EntityModule.prototype = Object.create(SSK.module.GenericModule);



SSK.module.KeyboardController = function(){};
SSK.module.KeyboardController.prototype = {

	tick : function(e) {
		var vel = 1;
		e.CVelocity.x = 0;
		e.CVelocity.y = 0;
		e.CVelocity.y = e.CMaxVelocity.y * e.CInputState.yaxis;
		e.CVelocity.x = e.CMaxVelocity.x * e.CInputState.xaxis;


		if( e.CPlayer )
		{
			if( e.CInputState.left )
			{
				e.CInputState.xaxis = -1;
			}
			else if( e.CInputState.right )
			{
				e.CInputState.xaxis = 1;
			}
			else
			{
				e.CInputState.xaxis = 0;
			}

			if( e.CInputState.down )
			{
				e.CInputState.yaxis = -1;
			}
			else if( e.CInputState.up )
			{
				e.CInputState.yaxis = 1;
			}
			else
			{
				e.CInputState.yaxis = 0;
			}
		}

		if( e.CPlayer )
		{
			if(e.CInputState.xaxis < 0 ){
				//e.CVelocity.x = -e.CMaxVelocity.x;
				if( !e.CInputState.attack || e.CInputState.shift )
					e.CRender.faceLeft = true;
			} else if (e.CInputState.xaxis > 0 ){
				//e.CVelocity.x = e.CMaxVelocity.x;
				if( !e.CInputState.attack || e.CInputState.shift )
					e.CRender.faceLeft = false;
			}
		}

	},

	performsOver : function(e) {
		//return e.CPlayer;
		return e.CPlayer || e.CKeyControl;
	}

};
