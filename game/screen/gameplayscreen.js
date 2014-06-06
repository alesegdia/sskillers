
SSK.namespace("SSK.screen");

SSK.screen.GameplayScreen = function() {
	this.world = null;
};

SSK.screen.GameplayScreen.init = function() {
	var player = new SSK.game.entity.PlayerShip();
	var cam = new SSK.game.entity.Camera( );
	var scrolladjust = new SSK.module.ScrollAdjust( cam );
	var levelsize = new Vec2( 2300, 2700 );
	var keycontroller = new SSK.module.KeyboardController();
	var camcontroller = new SSK.module.CamController( 150 );
	var worldcorrector = new SSK.module.WorldBoundsCorrector( levelsize.x, levelsize.y );
	var motion = new SSK.module.Motion();
	window.addEventListener( 'keydown', SSK.input.keyEventListener( true, player ) );
	window.addEventListener( 'keyup', SSK.input.keyEventListener( false, player ) );

	this.world = new SSK.game.WorldObj(
			cam, player, renderer,
			levelsize.x, levelsize.y );
	this.world.addModule( keycontroller );
	this.world.addModule( new SSK.module.AI() );
	this.world.addModule( camcontroller );
	this.world.addModule( motion );
	this.world.addModule( scrolladjust );
	this.world.addModule( worldcorrector );
	this.world.addModule( new SSK.module.LifeSpan() );
	this.world.addModule( new SSK.module.BulletShot() );
	this.world.addModule( new SSK.module.ShieldSystem() );
	this.world.addEntity( player );
	for( var i = 0; i < 30; i++ )
		this.world.addEntity(
				new SSK.game.entity.EnemyShip( randomRange( 0, levelsize.x), randomRange( 0, levelsize.y )));
	//world.addEntity( new SSK.game.entity.EnemyGenerator(1000, 1000 ) );
	this.world.addEntity( cam );
	console.log("HEY!!");
	SSK.game.World = this.world;

};

SSK.screen.GameplayScreen.tick = function() {
	this.world.tick();
};

SSK.screen.GameplayScreen.render = function() {
	this.world.render();
};

