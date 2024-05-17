// MODULES
var renderer = null;
var world = null;

var notismusic = getUrlVars()['music'] == "no";
var bgmusic = new Howl({ urls: ['../media/music/bgmusic.ogg'], loop: true, volume: 1.5 });
var intromusic = new Howl({ urls: ['../media/music/intro.mp3'], loop: true, volume: 1.5 });
var payum_payum_motherfucker = new Howl({ urls: ['../media/sfx/disparo.wav'], volume: 0.1 });
var deadsound = new Howl({ urls: ['../media/sfx/dead.mp3'], volume: 1.0 });
var hitsound = new Howl({ urls: ['../media/sfx/Explosion29.wav'], volume: 0.3 });

// INPUT
window.addEventListener( 'load', init, false );

var prevtime = 0;
var usewebgl = getUrlVars()['usewebgl'] == "yes";
console.log(getUrlVars()['usewebgl']);

var currentScreen;

var stats;
function init(){

	stats = new Stats();
	stats.setMode(0);
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.getElementsByTagName('body')[0].appendChild( stats.domElement );
	renderer = new SSK.module.Renderer( 1024, 600, usewebgl );
	renderer.canvas2d.addEventListener( 'mousemove',
			function( evt ){ SSK.input.updateMouse( renderer.canvas2d, evt ); }, false );
	renderer.canvas2d.addEventListener('mousedown', SSK.input.mouseDown);
	renderer.canvas2d.addEventListener('mouseup', SSK.input.mouseUp);
	setInterval( run, 16 );
	SSK.screen.Manager.init( SSK.screen.StoryScreen, renderer.context2d );
}


function run(){

	stats.begin();
	SSK.core.deltaTime = ( (Date.now()-prevtime) / 1000 );
	TWEEN.update(SSK.core.deltaTime);
	SSK.core.time = Date.now();
	prevtime = Date.now();

	SSK.screen.Manager.tick();
	SSK.screen.Manager.render();
	stats.end();
}

