

SSK.namespace("SSK.module");

SSK.module.BulletShot = function(){};
SSK.module.BulletShot.prototype = {

	tick : function(e) {

		var createBullet = function(offx, offy, angle)
		{
			var b = new SSK.game.entity.Bullet( e.CBulletShot.sprite, e.CTransform.x + offx, e.CTransform.y + offy, e.CBulletShot.enemy, e.CBulletShot.power, angle );
			if( e.CRender.faceLeft == true ) b.CVelocity.x = -b.CVelocity.x;
			if(b == '0')
				{
					debugger;
				}
			return b;
		};

		if( e.CInputState.attack && e.CBulletShot.timer > e.CBulletShot.rate )
		{
			var bullets = [];
			if(e.CBulletShot.type == "parallel")
			{
				for(var i = 0; i <= e.CBulletShot.count; i++)
				{
					bullets.push(
						createBullet(e.CRender.sprite.width / 2,
						(e.CRender.sprite.height/e.CBulletShot.count) * i,
						0));
				}
			}
			else if(e.CBulletShot.type == "spread")
			{
				var offx = e.CRender.sprite.width / 2;
				var offy = e.CRender.sprite.height / 2;
				
				bullets.push(createBullet(offx, offy, 0));
				for(var i = 1; i <= e.CBulletShot.count; i++)
				{
					var angle = e.CBulletShot.angle / i;
					bullets.push(createBullet(offx, offy,  angle));
					bullets.push(createBullet(offx, offy, -angle));
				}
			}

			bullets.forEach( function(bullet) {
				SSK.game.World.addEntity( bullet );
			});
			
			e.CBulletShot.timer = 0;
			
			if( e.CPlayer ) payum_payum_motherfucker.play();
		}
		else
		{
			e.CBulletShot.timer += SSK.core.deltaTime;
		}
	},

	performsOver : function(e) {
		return e.CBulletShot && e.CTransform;
	}

};
