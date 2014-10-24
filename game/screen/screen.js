
SSK.namespace("SSK.screen");

/*
SSK.screen.Screen = {

	width : 0,
	height : 0,
	reset : function(){},
	tick : function(){},
	render : function(){},
	nextScreen : null

};
*/

SSK.screen.Manager = {

	currentScreen : null,
	nextScreen : null,
	ctx : null,

	init : function( firstScreen, ctx ){
		this.ctx = ctx;
		this.currentScreen = firstScreen;
		this.currentScreen.init();
	},

	tick : function(){
		this.currentScreen.tick();
		if( this.nextScreen !== null ){
			this.currentScreen.dispose();
			this.currentScreen = this.nextScreen;
			this.currentScreen.init();
			this.nextScreen = null;
		}
	},

	render : function( ){
		this.currentScreen.render( this.ctx );
	},

	changeScreen : function( screen ){
		this.currentScreen.dispose();
		this.currentScreen = screen;
		this.currentScreen.init();
	}


};


