
SSK.namespace("SSK.screen");


SSK.screen.StoryScreen = {


	selected : 0,

	keydownhandler : null,

	texts : null,
	space: false,
	currenttext : 0,

	init : function() {

		intromusic.play();
		this.end = 2;
		this.options = [];
		this.options.push(SSK.game.gfx.SpriteCache.SP_SLIDE0);
		this.options.push(SSK.game.gfx.SpriteCache.SP_SLIDE1);
		this.options.push(SSK.game.gfx.SpriteCache.SP_SLIDE2);
		this.options.push(SSK.game.gfx.SpriteCache.SP_SLIDE3);
		this.options.push(SSK.game.gfx.SpriteCache.SP_SLIDE4);
		this.options.push(SSK.game.gfx.SpriteCache.SP_SLIDE5);
		this.options.push(SSK.game.gfx.SpriteCache.SP_SLIDE6);

		var that = this;
		this.timer = 0;
		this.currenttext = -1;
		this.keydownhandler = function(e) {
			that.up = true;
			switch( e.keyCode )
			{
				case SSK.input.keys.space:
					that.space = true;
					break;
			}
		};
		window.addEventListener( 'keydown', this.keydownhandler );
	},

	tick : function() {
		/*
		if( this.enter == true )
		{
			SSK.screen.Manager.nextScreen = SSK.screen.MenuScreen;
		}
		*/

		if( this.end == 0 )	SSK.screen.Manager.nextScreen = SSK.screen.MenuScreen;
	},

	timer : 0,
	end : 1,

	render : function( ctx ) {
		ctx.drawImage( SSK.game.gfx.SpriteCache.SP_INTROBG, 0, 0 );
		var i, x, y, spacing,maxv, anim_time, fadein_time;
		maxw = this.options[5].width;
		x = (SSK.game.gfx.SpriteCache.SP_INTROBG.width - maxw)/2;
		y = 30;
		spacing = 24;
		this.timer += SSK.core.deltaTime;
		this.shiptimer += SSK.core.deltaTime;
		anim_time=6;
		fadein_time=6;
		if( this.currenttext < 6 )
		{
			if( this.timer > anim_time && this.currenttext < 6 )
			{
				this.timer = 0;
				this.currenttext++;
			}
			if( this.space )
			{
				this.space = false;
				this.timer = 0;
				this.currenttext++;
			}
		}
		else
		{
			if( this.space )
			{
				this.space = false;
				this.end--;
				this.timer = 50;
			}
		}
		for( i=0; i<=this.currenttext; i++ )
		{
			if( this.currenttext == i )
			{
				ctx.globalAlpha = this.timer / fadein_time;
			}
			ctx.drawImage( this.options[i], x + (maxw - this.options[i].width)/2, y + i*spacing );
			ctx.globalAlpha = 1;
		}
		x=600;
		y=240;
		ctx.drawImage( SSK.game.gfx.SpriteCache.SP_INTROSHIP, x, y + 8 * Math.sin( this.shiptimer * 2) );
	},

	shiptimer : 0,


	dispose : function() {
		window.removeEventListener( 'keydown', this.keydownhandler );
	}

};

