



SSK.namespace("SSK.game.entity");

SSK.game.entity.Camera = function( ){
	this.CTransform = new Vec2( 1000, 1000 );
	this.CBox = new Vec2( 0, 0 );
	this.CCamera = true;
	this.CSpeedFactor = new Vec2( 50, 50 );
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
	this.CBox = new Vec2( 20, 20 );
	this.CVelocity = new Vec2( 0, 0 );
	this.CSpeed = new Vec2( 0, 0 );
	this.CMaxVelocity = new Vec2( 3000, 2250 );
	this.CGauge = 4;

	this.CHealth = 15;
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
		attack : false,
		shift : false,
		pause : false
	};

};

SSK.game.entity.EnemyShip = function( px, py ){

	this.CRender = {
		faceLeft : true,
		sprite : SSK.game.gfx.SpriteCache.SP_AFORCE
	};

	this.CAlive = true;
	this.CMaxHealth = 10;
	this.CHealth = 10;
	this.CTransform = new Vec2( px, py );
	this.CBox = new Vec2( this.CRender.sprite.width, this.CRender.sprite.height );
	this.CVelocity = new Vec2( 0, 0 );
	this.CSpeed = new Vec2( 0, 0 );
	this.CMaxVelocity = new Vec2( 500, 375 );

	this.CEnemy = true;

	this.CInputState = {
		up : false,
		down : false,
		left : false,
		right : false,
		attack : false,
		shift : true,
		pause : false,
		reset : function(){
			this.up=this.down=this.left=this.right=this.attack=this.shift=this.pause=false;
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


	this.CKeyControl = true;
	var mytr = this.CTransform;
	var myci = this.CInputState;
	this.CBehaviour = {
		action : function(pl) {

			var pltr = pl.CTransform;
			myci.reset();


			var dx = mytr.x - pltr.x;
			var dy = mytr.y - pltr.y;

			var tol = 10;
			if( distance( pltr.x, pltr.y, mytr.x, mytr.y ) < 1000 ) {
				if( dx > tol )
					myci.left = true;
				else if( dx < -tol )
					myci.right = true;

				if( dy > tol )
					myci.down = true;
				else if( dy < -tol )
					myci.up = true;

				if( (dy < 0 && dy > -40 - that.CBox.x) || (dy > 0 && dy < 40 ) )
					that.CInputState.attack = true;

				/*
				if( mytr.x - pltr.y < 0 ){
					myci.up = true;
				}
				*/
			}

		}
	};


};


SSK.game.entity.EnemyGenerator = function( px, py ){

	this.CRender = {
		faceLeft : true,
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
	this.CBox = new Vec2( this.CRender.sprite.width, this.CRender.sprite.height );
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
	this.CBox = new Vec2( this.CRender.sprite.width, this.CRender.sprite.height );
	this.CVelocity = new Vec2( 80, 0 );
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

