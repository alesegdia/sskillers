

SSK.namespace("SSK.module");

SSK.module.AI = function(){};
SSK.module.AI.prototype = {

	tick : function(e) {
		e.CBehaviour.action(SSK.game.World.player);
	},

	performsOver : function(e) {
		return e.CBehaviour;
	}

};
