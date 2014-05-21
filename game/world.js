
SSK.namespace("SSK.game");

SSK.game.World = function( cam, player, renderer, w, h ){

	this.width = w;
	this.height = h;

	this.entitylist = new List();
	this.modulelist = [];
	this.rendermodulelist = [];

	this.player = player;
	this.renderer = renderer;
	this.cam = cam;
	this.cam.CBox.x = this.renderer.canvas2d.width;
	this.cam.CBox.y = this.renderer.canvas2d.height;
	this.rastro = new Rastro( this.player, 4, 0.15, 0.15 );

	this.particlestarsys = new SSK.module.ParticleStarSystem( 100,
		renderer.canvas2d.width, renderer.canvas2d.height );
	this.modulelist.push( this.particlestarsys );

	// añadir desde aqui los modulos

};

function foo (boo) {
	var error = 5.5;
	return Math.floor((Math.floor(boo / error) * error));
	/*
	var ceil = Math.ceil(boo);
	var floor = Math.floor(boo);
	var round = Math.round(boo);
	if( floor == ceil || round == ceil )
	return floor;
	return Math.floor(boo-0.75);
	*/
	//return (Math.round(a-0.5) == down) ? down : up;
};

var entitynum = 0;
var ok = false;

SSK.game.World.prototype = {

	addModule : function(m) {
		this.modulelist.push(m);
	},

	addEntity : function(e) {
		this.entitylist.add(e);
		//this.entitylist.push(e);
	},

	drawMinimap : function(x, y, factor, context) {
		var i, xs, ys;

		// LEVEL
		context.strokeStyle = "#00F";
		context.strokeRect(x,y,this.width*factor,this.height*factor);

		// CAMERA
		context.strokeStyle = "#FFF";
		context.strokeRect(
			x + this.cam.CTransform.x * factor,
			y + this.cam.CTransform.y * factor,
			this.cam.CBox.x * factor,
			this.cam.CBox.y * factor);

		// PLAYER
		context.fillStyle='#0F0';
		xs = x + (this.player.CTransform.x) * factor,
		ys = y + (this.player.CTransform.y) * factor;
		context.fillRect(xs,ys,3,3);

		this.entitylist.each( function(entity){
			xs = entity.CTransform.x * factor + x;
			ys = entity.CTransform.y * factor + y;
			if( entity.CEnemy ) {
				context.fillStyle='#F00';
				context.fillRect(xs,ys,3,3);
			} else if( entity.CPlayer ) {
				context.fillStyle='#0F0';
				context.fillRect(xs,ys,3,3);
			} /*else if( entity.CLifeSpan ) {
				context.fillStyle='#00F';
				context.fillRect(xs,ys,3,3);
			}*/
		});
	},

	tick : function()
	{
		var j, x, y, inRange, margin, modules;
		var entitylist
		modules = this.modulelist;
		entitynum = 0;
		this.entitylist.each( function(entity){
			entitynum++;
			for( j = 0; j < modules.length; j++ )
			{
				if( modules[j].performsOver( entity ) )
				{
					modules[j].tick( entity );
				}
			}
		});


		var elist = this.entitylist;
		elist.each( function(e1){
			elist.each( function(e2){
				if( e1 !== e2 && e1.CCollision && e2.CCollision ) {
						if( rectIntersect( e1.CTransform, e1.CBox,
							e2.CTransform, e2.CBox ) == true )
							e1.CCollision.handle( e2 );
				}
			});});


		// CLEAR DEAD ENTITIES
		this.entitylist.delete_if( function(entity){
			return entity.CAlive == false;
		});

		if ( this.player.CHealth <= 0 && ok == false ){
			ok = true;
			deadsound.play();
		}

	},

	drawBar : function(sprite, num, x, y)
	{
		for( var i = 0; i < num; i++ )
		{
			this.renderer.context2d.drawImage(sprite,
				x + sprite.width * i + 2 * i,
				y);
		}
	},

	drawGui : function( x, y )
	{
		this.renderer.context2d.drawImage( SSK.game.gfx.SpriteCache.SP_GUI, x , y );
		this.drawBar( SSK.game.gfx.SpriteCache.SP_ARMORBAR, this.player.CHealth, x + 78, y + 258 );
		this.drawBar( SSK.game.gfx.SpriteCache.SP_SHIELDBAR, this.player.CShield.current, x + 78, y + 228 );
		this.drawBar( SSK.game.gfx.SpriteCache.SP_GAUGEBAR, this.player.CGauge, x + 78, y + 288 );
		this.drawMinimap( x + 75, y + 40, 0.05, this.renderer.context2d );
	},

	render : function()
	{
		var x1,x2,y1,y2,rend,camera,posx,posy;
		x1 = this.cam.CTransform.x;
		y1 = this.cam.CTransform.y;
		x2 = this.cam.CTransform.x + this.cam.CBox.x;
		y2 = this.cam.CTransform.y + this.cam.CBox.y;

		if( this.player.CTransform.x + this.player.CBox.x >= x2 )
			this.player.CTransform.x = x2 - this.player.CBox.x;
		else if( this.player.CTransform.x <= x1 )
			this.player.CTransform.x = x1;

		if( this.player.CTransform.y + this.player.CBox.y >= y2 )
			this.player.CTransform.y = y2 - this.player.CBox.y;
		else if( this.player.CTransform.y <= y1 )
			this.player.CTransform.y = y1;

		this.rastro.tick( this.player, this.cam );


		if( this.renderer.usewebgl )
			this.renderer.context2d.colorMask(1, 1, 1, 1);

		this.renderer.context2d.fillStyle='rgba( 0, 0, 0, 1 )';
		this.renderer.context2d.fillRect(0,0,this.cam.CBox.x,this.cam.CBox.y);
		this.particlestarsys.render( this.renderer.context2d );

		this.rastro.render( this.renderer, this.cam, this.player );
		//if( !this.player.CInputState.shift && this.player.CVelocity.x != 0 )
		//	this.player.CRender.lookLeft = this.player.CVelocity.x < 0;

		margin=20;
		rend = this.renderer;
		camera = this.cam;
		this.entitylist.each( function(entity){

			if( renderer.performsOver( entity )  )
			{
				x = entity.CTransform.x;
				y = entity.CTransform.y;
				inRange =  (x > camera.CTransform.x - margin)
						|| (x < camera.CTransform.x + camera.CBox.x + margin)
						|| (y > camera.CTransform.y - margin)
						|| (y < camera.CTransform.y + camera.CBox.y + margin);
				if (inRange) {
					posx = entity.CTransform.x - camera.CTransform.x;
					posy = entity.CTransform.y - camera.CTransform.y;
					if( entity.CRender.faceLeft == true ) {
						rend.context2d.save();
						rend.drawFlipH( entity.CRender.sprite, posx, posy );
						rend.context2d.restore();
					} else {
						rend.context2d.save();
						rend.context2d.drawImage(entity.CRender.sprite, posx, posy );
						rend.context2d.restore();
					}
					if( entity.CEnemy )
					{
						var barsz = entity.CMaxHealth*4;
						rend.context2d.fillStyle="#FF0000";
						rend.context2d.fillRect( posx + entity.CHealth*4, posy + 10, (entity.CMaxHealth-entity.CHealth) * 4, 5 );
						rend.context2d.fillStyle="#00FF00";
						rend.context2d.fillRect( posx, posy + 10, entity.CHealth*4, 5 );
					}

				}
			}

		});

		//this.globalAlpha = 1.0;
		//
		//this.renderer.context2d.fillStyle='#FFF';
		this.drawGui( this.cam.CBox.x - SSK.game.gfx.SpriteCache.SP_GUI.width, 0 );

		this.renderer.context2d.fillStyle='#FFF';
		this.renderer.context2d.fillText("entidades: " + entitynum, 0, 10 );



	}

};
