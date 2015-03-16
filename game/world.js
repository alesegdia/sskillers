
SSK.namespace("SSK.game");
SSK.game.World = null;
SSK.game.WorldObj = function( cam, player, renderer, w, h ){

	this.shake = 0;
	this.shakemax = 10;
	this.shakedecay = 30;
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

SSK.game.WorldObj.prototype = {

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
		this.shake -= this.shakedecay * SSK.core.deltaTime;
		if( this.shake <= 0 ) this.shake = 0;
		else if( this.shake >= this.shakemax ) this.shake = this.shakemax;

		var elist = this.entitylist;
		elist.each( function(e1){
			elist.each( function(e2){
				if( e1 !== e2 && e1.CCollision && e2.CCollision ) {
					var collide = false;
					var i,j;
					var v1, v2;
					v1 = new Vec2(0,0);
					v2 = new Vec2(0,0);
					for( i = 0; i < e1.CBox.length; i+=2 )
					{
						if( collide ) break;
						for( j = 0; j < e2.CBox.length; j+=2 )
						{
							if( collide ) break;
							v1.set(e1.CTransform.x, e1.CTransform.y);
							v1.add(e1.CBox[i]);
							v2.set(e2.CTransform.x, e2.CTransform.y);
							v2.add(e2.CBox[j]);
							if( rectIntersect( v1, e1.CBox[i+1],
								v2, e2.CBox[j+1] ) == true )
							{
								collide = true;
							}
						}
					}

					if( collide ) e1.CCollision.handle( e2 );
				}
		});});



		var j, x, y, inRange, margin, modules;
		var entities = this.entitylist;
		entitynum = 0;
		this.modulelist.forEach( function(module) {
			entitynum++;
			entities.each( function(entity) {
				if( module.performsOver(entity) ) {
					module.tick(entity);
				}
			});
		});

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

		this.drawBar( SSK.game.gfx.SpriteCache.SP_ARMORBAR_, this.player.CMaxHealth, x + 78, y + 258 );
		this.drawBar( SSK.game.gfx.SpriteCache.SP_ARMORBAR, this.player.CHealth, x + 78, y + 258 );

		this.drawBar( SSK.game.gfx.SpriteCache.SP_SHIELDBAR_, this.player.CShield.maxShield, x + 78, y + 228 );
		this.drawBar( SSK.game.gfx.SpriteCache.SP_SHIELDBAR, this.player.CShield.current, x + 78, y + 228 );

		this.drawBar( SSK.game.gfx.SpriteCache.SP_GAUGEBAR, this.player.CGauge, x + 78, y + 288 );
		this.drawMinimap( x + 75, y + 40, 0.05, this.renderer.context2d );
	},

	render : function()
	{
		var ctx = this.renderer.context2d;
		ctx.save();


		var dir = new Vec2( Math.random() * 2 - 1, Math.random() * 2 - 1 );
		dir = norm(dir);
		dir.scaleXY(this.shake, this.shake);
		ctx.translate(dir.x, dir.y);


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
						var mult = 1;
						rend.context2d.fillStyle="#FF0000";
						rend.context2d.fillRect( posx + entity.CHealth * mult, posy + 10, (entity.CMaxHealth-entity.CHealth) * mult, 5 );
						rend.context2d.fillStyle="#00FF00";
						rend.context2d.fillRect( posx, posy + 10, entity.CHealth*mult, 5 );
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

		var dm = SSK.input.deltaMouse;
		var mod = module(dm);
		var inact, act, extra;
		var vec = norm(dm);
		if( mod < 0.1 )
		{
			inact = { x:dm.x, y:dm.y };
			act = { x:0, y:0 };
			extra = { x:0, y:0 };
		}
		else if( mod >= 0.1 && mod <= 0.5 )
		{
			inact = { x:vec.x * 0.1,y:vec.y * 0.1 };
			act = { x:dm.x, y:dm.y };
			extra = { x:0, y:0 };
		}
		else
		{
			inact = { x:vec.x * 0.1,y:vec.y * 0.1 };
			act = { x:vec.x * 0.5,y:vec.y * 0.5 };
			extra = { x:dm.x, y:dm.y };
		}

		var h = this.renderer.canvas2d.height/2;

		ctx.strokeStyle = "rgb(0,0,255)";
		ctx.beginPath();
		ctx.moveTo(this.renderer.canvas2d.width/2+ h * act.x, this.renderer.canvas2d.height/2 + h * act.y);
		ctx.lineTo(this.renderer.canvas2d.width/2+ h * extra.x, this.renderer.canvas2d.height/2 + h * extra.y);
		ctx.stroke();

		ctx.strokeStyle = "rgb(0,255,0)";
		ctx.beginPath();
		ctx.moveTo(this.renderer.canvas2d.width/2+ h * inact.x, this.renderer.canvas2d.height/2 + h * inact.y);
		ctx.lineTo(this.renderer.canvas2d.width/2+ h * act.x, this.renderer.canvas2d.height/2 + h * act.y);
		ctx.stroke();

		ctx.strokeStyle = "rgb(255,0,0)";
		ctx.beginPath();
		ctx.moveTo(this.renderer.canvas2d.width/2, this.renderer.canvas2d.height/2);
		ctx.lineTo(this.renderer.canvas2d.width/2+ h * inact.x, this.renderer.canvas2d.height/2 + h * inact.y);
		ctx.stroke();


		ctx.restore();

	}

};
