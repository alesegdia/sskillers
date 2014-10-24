
SSK.namespace("SSK.screen");


SSK.screen.MenuScreen = {

	bg : SSK.game.gfx.SpriteCache.SP_MENUBG,
	newgame0 : SSK.game.gfx.SpriteCache.SP_NEWGAME_0,
	newgame1 : SSK.game.gfx.SpriteCache.SP_NEWGAME_1,
	credits0 : SSK.game.gfx.SpriteCache.SP_CREDITS_0,
	credits1 : SSK.game.gfx.SpriteCache.SP_CREDITS_1,
	highsco0 : SSK.game.gfx.SpriteCache.SP_HIGHSCORE_0,
	highsco1 : SSK.game.gfx.SpriteCache.SP_HIGHSCORE_1,
	dforce : SSK.game.gfx.SpriteCache.SP_DFORCE,

	selected : 0,

	keydownhandler : null,
	keyuphandler : null,

	options : null,
	enter : false,

	init : function() {
		
		this.options = [];
		this.options.push({
			img0 : SSK.game.gfx.SpriteCache.SP_NEWGAME_0,
			img1 : SSK.game.gfx.SpriteCache.SP_NEWGAME_1,
		});
		this.options.push({
			img0 : SSK.game.gfx.SpriteCache.SP_HIGHSCORE_0,
			img1 : SSK.game.gfx.SpriteCache.SP_HIGHSCORE_1,
		});
		this.options.push({
			img0 : SSK.game.gfx.SpriteCache.SP_CREDITS_0,
			img1 : SSK.game.gfx.SpriteCache.SP_CREDITS_1,
		});
		var that = this;
		this.keydownhandler = function(e) {
			that.up = true;
			switch( e.keyCode )
			{
				case SSK.input.keys.up:
					that.selected++;
					if( that.selected == 3 ) that.selected = 2;
					that.timer = 0;
					break;
				case SSK.input.keys.down:
					that.selected--;
					if( that.selected == -1 ) that.selected = 0;
					that.timer = 0;
					break;
				case SSK.input.keys.space:
					that.enter = true;
			}
		};
		window.addEventListener( 'keydown', this.keydownhandler );
	},

	tick : function() {
		if( this.enter == true )
		{
			SSK.screen.Manager.nextScreen = SSK.screen.GameplayScreen;
		}
	},

	render : function( ctx ) {
		ctx.drawImage( this.bg, 0, 0 );
		var x = 1024/2 - this.highsco0.width/2;
		this.drawOptions( ctx, x, 200, 30 );
	},

	timer : 0,

	drawOptions : function( ctx, x, y, spacing )
	{
		var w, wp, i, sprite, min_alpha, mult_alpha;
		min_alpha = 0.2;
		mult_alpha = 8;
		w = this.highsco1.width; // ancho del mas grande, HARDCODEADO, very cutre...
		for( i=0; i<this.options.length; i++ )
		{
			if( i == this.selected )
			{
				this.timer += SSK.core.deltaTime;
				sprite = this.options[i].img1;
				ctx.drawImage( this.dforce, x - this.dforce.width - 15, y - this.dforce.height/2 + this.newgame0.height/2 + 1 + spacing * i  );

				ctx.globalAlpha = ((0.5 - min_alpha) * Math.sin( this.timer * mult_alpha ) + (0.5 + min_alpha));
			}
			else
			{
				sprite = this.options[i].img0;
				ctx.globalAlpha = 1;
			}
			wp = (w - sprite.width) / 2;
			ctx.drawImage( sprite, x + wp, y + i * spacing );
		}
		ctx.globalAlpha = 1;
	},

	dispose : function() {
		window.removeEventListener( 'keydown', this.keydownhandler );
		intromusic.stop();
	}

};

