

SSK.namespace("SSK.module");

SSK.module.BulletShot = function(){};
SSK.module.BulletShot.prototype = {

	tick : function(e) {

		if( e.CInputState.attack && e.CBulletShot.timer > e.CBulletShot.rate )
		{
			var bullet1 = new SSK.game.entity.Bullet( e.CTransform.x, e.CTransform.y, e.CBulletShot.enemy, e.CBulletShot.power );
			var bullet2 = new SSK.game.entity.Bullet( e.CTransform.x, e.CTransform.y - 1 + e.CRender.sprite.height, e.CBulletShot.enemy, e.CBulletShot.power );
			if( e.CRender.faceLeft == true ) bullet1.CVelocity.x = -bullet1.CVelocity.x;
			if( e.CRender.faceLeft == true ) bullet2.CVelocity.x = -bullet2.CVelocity.x;
			SSK.game.World.addEntity( bullet1 );
			SSK.game.World.addEntity( bullet2 );
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
