
SSK.namespace("SSK.screen");


SSK.screen.GameplayScreen = {

	world : null,
	playerKeyEventListenerOn : null,
	playerKeyEventListenerOff : null,


	init : function()
	{
		bgmusic.play();
		var player = new SSK.game.entity.PlayerShip();
		var cam = new SSK.game.entity.Camera( );
		var scrolladjust = new SSK.module.ScrollAdjust( cam );
		var levelsize = new Vec2( 2300, 2700 );
		var keycontroller = new SSK.module.KeyboardController();
		var camcontroller = new SSK.module.CamController( 300 );
		var worldcorrector = new SSK.module.WorldBoundsCorrector( levelsize.x, levelsize.y );
		var motion = new SSK.module.Motion();
		this.playerKeyEventListenerOn = SSK.input.keyEventListener( true, player );
		this.playerKeyEventListenerOff = SSK.input.keyEventListener( false, player );
		window.addEventListener( 'keydown', this.playerKeyEventListenerOn );
		window.addEventListener( 'keyup', this.playerKeyEventListenerOff );

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

		for( var j = 0; j < 4; j++ )
		{
			this.world.addEntity( new SSK.game.entity.EnemyGenerator(randomRange( 0, levelsize.x), randomRange( 0, levelsize.y )));
		}
		for( var i = 0; i < 0; i++ )
			this.world.addEntity(
					new SSK.game.entity.EnemyShip( randomRange( 0, levelsize.x), randomRange( 0, levelsize.y )));
		//world.addEntity( new SSK.game.entity.EnemyGenerator(1000, 1000 ) );
		this.world.addEntity( cam );
		console.log("HEY!!");
		SSK.game.World = this.world;
	},

	tick : function() {
		this.world.tick();
	},

	render : function( ctx ) {
		this.world.render();
	},

	dispose : function() {
		window.removeEventListener( 'keydown', this.playerKeyEventListenerOn );
		window.removeEventListener( 'keydown', this.playerKeyEventListenerOff);
		bgmusic.stop();
		// remove key listeners
	}
};

