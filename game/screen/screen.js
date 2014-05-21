
SSK.namespace("SSK.screen");

SSK.screen.Screen = {

	width : 0,
	height : 0,
	reset : function(){},
	tick : function(){},
	render : function(){},
	nextScreen : null

};

SSK.screen.Manager = {

	currentScreen : null,

	tick : function(){
		currentScreen.tick();
		if( currentScreen.nextScreen !== null ){
			currentScreen.nextScreen.reset();
			currentScreen.nextScreen.tick();
			currentScreen = currentScreen.nextScreen;
		}
	},

	render : function( ctx ){
		currentScreen.render( ctx );
	}

};

