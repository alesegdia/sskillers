

SSK.namespace("SSK.game.gfx");

SSK.game.gfx.Sprite = function( src ){
	this.image = new Image();
	this.image.src = src;
};

SSK.game.gfx.SpriteCache = {};

SSK.game.gfx.RequestCachedSprite = function( id ){
	return SSK.game.gfx.SpriteCache[id];
};

var cache = SSK.game.gfx.SpriteCache;
cache.SP_DFORCE = new Image();
cache.SP_DFORCE.src = "../../media/dforce_der.png";

cache.SP_AFORCE = new Image();
cache.SP_AFORCE.src = "../../media/aforce_der.png";


cache.SP_BULLET = new Image();
cache.SP_BULLET.src = "../../media/tiro.png";

cache.SP_GUI = new Image();
cache.SP_GUI.src = "../../media/guibase.png";

cache.SP_ARMORBAR = new Image();
cache.SP_ARMORBAR.src = "../../media/armorbar.png";
cache.SP_SHIELDBAR = new Image();
cache.SP_SHIELDBAR.src = "../../media/shieldbar.png";
cache.SP_GAUGEBAR = new Image();
cache.SP_GAUGEBAR.src = "../../media/gaugebar.png";

cache.SP_GEN = new Image();
cache.SP_GEN.src = "../../media/generator.png";
