

//var player = new SSK.entity.Player( 100, 100, 0, 0, 0, "../media/dforce.png" );

// ENTITIES

// MODULES
var renderer = null;
var world = null;

var notismusic = getUrlVars()['music'] == "no";
var bgmusic = new Howl({ urls: ['../media/music/bgmusic.ogg'], autoplay: !notismusic, loop: true, volume: 1.5 });
var payum_payum_motherfucker = new Howl({ urls: ['../media/sfx/disparo.wav'], volume: 0.2 });
var deadsound = new Howl({ urls: ['../media/sfx/dead.mp3'], volume: 1.0 });
var hitsound = new Howl({ urls: ['../media/sfx/Explosion29.wav'], volume: 0.5 });


// INPUT
window.addEventListener( 'load', init, false );

var prevtime = 0;
var usewebgl = getUrlVars()['usewebgl'] == "yes";
console.log(getUrlVars()['usewebgl']);

var currentScreen;
//var gameplayScreen = new SSK.screen.GameplayScreen();

//SSK.namespace("SSK.game");

var stats = new Stats();
document.body.appendChild( stats.domElement );

function init(){

	SSK.screen.Manager.gameplayScreen = SSK.screen.GameplayScreen;
	renderer = new SSK.module.Renderer( 1000, 500, usewebgl );
	renderer.canvas2d.addEventListener( 'mousemove',
			function( evt ){ SSK.input.updateMouse( renderer.canvas2d, evt ); }, false );
	//world = new SSK.game.World( cam, player, renderer, levelsize.x, levelsize.y );
	setInterval( run, 10 );
	SSK.screen.Manager.init( SSK.screen.Manager.gameplayScreen );
}


function run(){

	SSK.core.deltaTime = (Date.now()-prevtime) / 1000;
	prevtime = Date.now();

	SSK.screen.Manager.tick();
	SSK.screen.Manager.render();
	//console.log("player pos: " + player.CTransform.x + "," + player.CTransform.y);

/*
	keycontroller.tick( player );
	camcontroller.tick( cam );
	starparticle.tick( cam ); // probablemente cam, y meter ahi esta velocidad!! coño, esta delante de mis narices xDDD hacer eso joder, asi mantenemos la estructura, y encima ayudamos la encapsulacion
	motion.tick(player);
	motion.tick(cam);
	worldcorrector.tick( cam );

	renderer.tick(player);
*/
}




