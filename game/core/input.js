


SSK.namespace("SSK.input");

SSK.input.pause = false;
SSK.input.mousePos = new Vec2( 0, 0 );
SSK.input.deltaMouse = new Vec2( 0, 0 );
SSK.input.distToCenter = 0;
SSK.input.keys = {
	enter 	: 13,
	left 	: 65,
	up 		: 83,
	right 	: 68,
	down 	: 87,
	space  : 32
};



SSK.input.updateMouse = function( canvas, evt ) {
	var rect = canvas.getBoundingClientRect();
	this.mousePos.x = evt.clientX - rect.left;
	this.mousePos.y = evt.clientY - rect.top;
	this.deltaMouse.x = (( this.mousePos.x - ( canvas.width - 1 ) / 2 ))/(canvas.height/2);
	this.deltaMouse.y = (( this.mousePos.y - ( canvas.height - 1 ) / 2 ))/(canvas.height/2);
	this.distToCenter = distance(
			canvas.width / 2, canvas.height / 2,
			this.mousePos.x, this.mousePos.y);
};



SSK.input.keyEventListener = function( setval, player ){
	return function (e) {
		player.CInputState.shift = e.shiftKey;
		switch(e.keyCode) {
			case SSK.input.keys.up:
				player.CInputState.up = setval;
				break;
			case SSK.input.keys.down:
				player.CInputState.down = setval;
				break;
			case SSK.input.keys.left:
				player.CInputState.left = setval;
				//if( !player.CInputState.shift ) player.CRender.faceLeft = setval;
				break;
			case SSK.input.keys.right:
				player.CInputState.right = setval;
				//if( !player.CInputState.shift ) player.CRender.faceLeft = setval;
				break;
			case SSK.input.keys.enter:
				if(setval) SSK.input.pause = !SSK.input.pause;
				break;
			case SSK.input.keys.space:
				player.CInputState.attack = setval;
		}
	};
};

