

//var player = new SSK.entity.Player( 100, 100, 0, 0, 0, "../media/dforce.png" );

// ENTITIES
var player = new SSK.game.entity.PlayerShip( );
var cam = new SSK.game.entity.Camera( );

// MODULES
var renderer = null;
var levelsize = new Vec2( 2300, 2700 );
var keycontroller = new SSK.module.KeyboardController();
var camcontroller = new SSK.module.CamController( 150 );
var worldcorrector = new SSK.module.WorldBoundsCorrector( levelsize.x, levelsize.y );
var motion = new SSK.module.Motion();
var world = null;
var scrolladjust = new SSK.module.ScrollAdjust( cam );

var notismusic = getUrlVars()['music'] == "no";
var bgmusic = new Howl({ urls: ['../media/bgmusic.ogg'], autoplay: !notismusic, loop: true, volume: 1.5 });
var payum_payum_motherfucker = new Howl({ urls: ['../media/disparo.wav'], volume: 0.2 });
var deadsound = new Howl({ urls: ['../media/dead.mp3'], volume: 1.0 });
var hitsound = new Howl({ urls: ['../media/Explosion29.wav'], volume: 0.5 });


// INPUT
window.addEventListener( 'load', init, false );
window.addEventListener( 'keydown', SSK.input.keyEventListener( true, player ) );
window.addEventListener( 'keyup', SSK.input.keyEventListener( false, player ) );

var prevtime = 0;
var usewebgl = getUrlVars()['usewebgl'] == "yes";
console.log(getUrlVars()['usewebgl']);

var currentScreen;
//var gameplayScreen = new SSK.screen.GameplayScreen();

SSK.namespace("SSK.game");

var stats = new Stats();
document.body.appendChild( stats.domElement );

function init(){

	renderer = new SSK.module.Renderer( 1000, 500, usewebgl );
	renderer.canvas2d.addEventListener( 'mousemove',
			function( evt ){ SSK.input.updateMouse( renderer.canvas2d, evt ); }, false );
	world = new SSK.game.World( cam, player, renderer, levelsize.x, levelsize.y );
	world.addModule( keycontroller );
	world.addModule( new SSK.module.AI() );
	world.addModule( camcontroller );
	world.addModule( motion );
	world.addModule( scrolladjust );
	world.addModule( worldcorrector );
	world.addModule( new SSK.module.LifeSpan() );
	world.addModule( new SSK.module.BulletShot() );
	world.addModule( new SSK.module.ShieldSystem() );
	world.addEntity( player );
	for( var i = 0; i < 30; i++ )
		world.addEntity(
				new SSK.game.entity.EnemyShip( randomRange( 0, levelsize.x), randomRange( 0, levelsize.y )));
	//world.addEntity( new SSK.game.entity.EnemyGenerator(1000, 1000 ) );
	world.addEntity( cam );
	SSK.game.World = world;
	setInterval( run, 10 );

}


function run(){

	SSK.core.deltaTime = (Date.now()-prevtime) / 1000;
	prevtime = Date.now();

	world.tick();
	world.render();
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




