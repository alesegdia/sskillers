



SSK.namespace("SSK.game.entity");

function parseJSONrect(file)
{
	var tmp;
	$.ajax({
		url: file,
		async: false,
		success: function(data) {
			tmp = data;
		}
	});
	var ret = [];
	for( var i = 0; i < tmp.length; i++ )
	{
		var obj = new Vec2(tmp[i][0][0], tmp[i][0][1]);
		ret.push(obj);
		var obj = new Vec2(tmp[i][1][0], tmp[i][1][1]);
		ret.push(obj);
	}
	return ret;
}

var astraboxes = parseJSONrect('./astraslicer.json');

SSK.game.entity.Camera = function( ){
	this.CTransform = new Vec2( 1000, 1000 );
	this.CBox = [new Vec2( 0, 0 ), new Vec2( 0, 0 )];
	this.CCamera = true;
	this.CSpeedFactor = new Vec2( 1000, 1000 );
	this.CVelocity = new Vec2( 0, 0 );
	this.CSpeed = new Vec2( 0, 0 );
	this.CAlive = true;
};

SSK.game.entity.PlayerShip = function( ){

	this.CRender = {
		faceLeft : true,
		sprite : SSK.game.gfx.SpriteCache.SP_DFORCE
	};

	this.CAlive = true;
	this.CTransform = new Vec2( 100, 100 );
	this.CBox = [new Vec2(0,0), new Vec2( 20, 20 )];
	this.CVelocity = new Vec2( 0, 0 );
	this.CSpeed = new Vec2( 0, 0 );
	this.CMaxVelocity = new Vec2( 300, 225 );
	this.CGauge = 4;

	this.CHealth = 15;
	this.CMaxHealth = 15;
	this.CShield = {
		maxShield : 8,
		current : 5,
		startregen : 1.5,
		regenrate : 0.15,
		lastHit : 0,
		nextHeal : 0,
		timer : 0
	};

	var that = this;
	this.CCollision = {
		handle : function(other){
			if( other.CBullet && other.CAlive && other.CBullet.enemy == true ){
				SSK.game.World.shake += 10;
				that.CShield.lastHit = 0;
				that.CShield.current -= other.CBullet.power;
				hitsound.play();
				if( that.CShield.current < 0 )
				{
					that.CHealth += that.CShield.current;
					that.CShield.current = 0;
				}

				if( that.CHealth <= 0 ){
					that.CAlive = false;
					SSK.screen.Manager.nextScreen = SSK.screen.MenuScreen;
				}
				other.CAlive = false;
			}
		}
	};

	this.CPlayer = true;
	this.CBulletShot = {
		rate : 0.1,
		timer : 0,
		enemy : false,
		power : 1
	};

	//this.CSprite.src = "../media/dforce_der.png";
	this.CInputState = {
		up : false,
		down : false,
		left : false,
		right : false,
		xaxis : 0,
		yaxis : 0,
		attack : false,
		shift : false,
		pause : false
	};

};


SSK.game.entity.Pickup = function( px, py, spr, type )
{
	this.CRender = {
		faceLeft : true,
		sprite : spr,
		rect : SSK.game.gfx.SpritesheetCache.SH_ITEMS.getRect( 0 )
	};
	this.CTransform = new Vec2( px, py );
	this.CBox = [new Vec2(0,0), new Vec2( this.CRender.sprite.width, this.CRender.sprite.height )];
}

SSK.game.entity.EnemyShip = function( px, py ){

	this.CRender = {
		faceLeft : true,
		sprite : SSK.game.gfx.SpriteCache.SP_AFORCE
	};

	this.CAlive = true;
	this.CMaxHealth = 10;
	this.CHealth = 10;
	this.CTransform = new Vec2( px, py );
	this.CBox = [new Vec2(0,0), new Vec2( this.CRender.sprite.width, this.CRender.sprite.height )];
	this.CVelocity = new Vec2( 0, 0 );
	this.CSpeed = new Vec2( 0, 0 );

	this.CEnemy = true;

	this.CInputState = {
		xaxis : 0,
		yaxis : 0,
		attack : false,
		shift : true,
		pause : false,
		reset : function(){
			this.attack=this.shift=this.pause=false;
		}
	};

	var that = this;
	this.CCollision = {
		handle : function(other){
			that.CInputState.shift = true;
			if( other.CBullet && other.CAlive && other.CBullet.enemy == false ){
				that.CHealth -= other.CBullet.power;
				// poner este check en un sistema
				if( that.CHealth <= 0 ){
					that.CAlive = false;
				}
				other.CAlive = false;
			}
		}
	};

	this.CBulletShot = {
		rate : 0.5,
		timer : 0,
		enemy : true,
		power : 1
	};


	this.CMaxVelocity = new Vec2( 1000, 1000 );
	this.CKeyControl = true;
	var mytr = this.CTransform;
	var myci = this.CInputState;
	var mycr = this.CRender;
	this.CBehaviour = {
		force : new Vec2(0,0),
		maxforce : new Vec2(50,50),
		action : function(pl) {

			var pltr = pl.CTransform;
			if( distance( pltr.x, pltr.y, mytr.x, mytr.y ) < 1000 )
			{
				myci.reset();

				var dx = mytr.x - pltr.x;
				var dy = mytr.y - pltr.y;

				mycr.faceLeft = dx > 0;
				var vectoplayer = pltr.clone();
				vectoplayer.sub( mytr );
				var v2pmod = vectoplayer.mod();
				vectoplayer.normalize();

				if( Math.abs(dy) < 30 && Math.abs(dx) < 400 ) {
					this.force.y *= 0.97;
					this.force.x *= 0.97;
				}
				else
				{
				this.force.y += 0.5 * vectoplayer.y;
				this.force.x += 0.5 * vectoplayer.x;
				}

				//this.force.add(vectoplayer);
				this.force.cap(this.maxforce.x, this.maxforce.y);

				myci.xaxis = this.force.x / 100;
				myci.yaxis = this.force.y / 100;

				var tol = 10;
				if( distance( pltr.x, pltr.y, mytr.x, mytr.y ) < 1000 ) {
					if( (dy < 0 && dy > -40 - that.CBox[0].x) || (dy > 0 && dy < 40 ) )
						that.CInputState.attack = true;

				}
			}

			/*
			var pltr = pl.CTransform;
			myci.reset();


			var dx = mytr.x - pltr.x;
			var dy = mytr.y - pltr.y;

			var tol = 10;
			if( distance( pltr.x, pltr.y, mytr.x, mytr.y ) < 1000 ) {
				if( dx > tol )
					myci.xaxis = -1;
				else if( dx < -tol )
					myci.xaxis = 1;

				if( dy > tol )
					myci.yaxis = -1;
				else if( dy < -tol )
					myci.yaxis = 1;

				if( (dy < 0 && dy > -40 - that.CBox[0].x) || (dy > 0 && dy < 40 ) )
					that.CInputState.attack = true;

			}
			*/

		}
	};


};


SSK.game.entity.EnemyGenerator = function( px, py ){

	this.CRender = {
		faceLeft : false,
		sprite : SSK.game.gfx.SpriteCache.SP_GEN
	};

	this.CAlive = true;
	this.CMaxHealth = 400;
	this.CHealth = 400;

	this.CCollision = {
		handle : function(other){
			if( other.CBullet && other.CAlive && other.CBullet.enemy == false ){
				that.CHealth -= other.CBullet.power;
				// poner este check en un sistema
				if( that.CHealth <= 0 ){
					that.CAlive = false;
				}
				other.CAlive = false;
			}
		}
	};

	this.CEnemy = true;
	this.CTransform = new Vec2( px, py );
	this.CBox = astraboxes.slice(0); //[ new Vec2( this.CRender.sprite.width, this.CRender.sprite.height ) ];
	var that = this;
	this.CBehaviour = {
		next_spawn : 0,
		spawn_rate : 4000,
		action : function(pl) {
			if( this.next_spawn < SSK.core.time )
			{
				this.next_spawn = SSK.core.time + this.spawn_rate;
				SSK.game.World.addEntity( new SSK.game.entity.EnemyShip(
							that.CTransform.x + randomRange(200,300) , that.CTransform.y + randomRange(150,250) ) );
			}
		}
	};


};


SSK.game.entity.Bullet = function( px, py, enemyBullet, pow ){

	this.CRender = {
		faceLeft : false,
		sprite : SSK.game.gfx.SpriteCache.SP_BULLET
	};


	var that = this;
	this.CCollision = {
		handle : function(other){
		}
	};

	this.CAlive = true;
	this.CTransform = new Vec2( px, py );
	this.CBox = [ new Vec2( 0, 0 ), new Vec2( this.CRender.sprite.width, this.CRender.sprite.height ) ];
	this.CVelocity = new Vec2( 800, 0 );
	this.CSpeed = new Vec2( 0, 0 );

	this.CBullet = {
		enemy : enemyBullet,
		power : pow
	};
	this.CLifeSpan = 3;

};




/*
SSK.game.entity.MovingBulletShip = function( px, py, pmaxX, pmaxY, health, spritesrc ){
	this.CTransform = new Vec2( px, py );
	this.CSprite = SSK.game.gfx.RequestCachedSprite( spritesrc );
	this.CVelocity = {
		x : 0, y : 0,
		maxX : pmaxX, maxY: pmaxY
	};
	this.CHealth = health;
	this.CBulletAttack = {
		rate : 1.00,
		bulletJump : 0,
		bulletJumpTime : 0,
		ref : {}
	};
	this.CInputState : {
		up : false,
		down : false,
		left : false,
		right : false,
		attack : false,
		shift : false,
		pause : false
	}

};

SSK.game.entity.Bullet = function( px, py, pxspeed, pyspeed, power, spritesrc ){
	this.CTransform = new Vec2( px, py );
	this.CVelocity = {
		x : pxspeed, y : pyspeed,
		maxX : pxspeed, maxY : pyspeed
	};
	this.CPower = power;
	this.CSprite = SSK.game.gfx.RequestCachedSprite( spritesrc );
};

SSK.game.entity.Player.prototype = new MovingBulletShip();
SSK.game.entity.Player.constructor = function( px, py, pmaxX, pmaxY, health, spritesrc ){
	SSK.game.entity.MovingBulletShip.call( this, px, py, pmaxX, pmaxY, health, spritesrc );
	this.CPlayer = true;
};

SSK.game.entity.EnemyShip.prototype = new MovingBulletShip();


*/

