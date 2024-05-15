
SSK.namespace("SSK.module");

SSK.module.CamKeyboardController = function(  ){

};

SSK.module.CamKeyboardController.prototype = {

	tick : function(e)
    {
            if(e.player.CInputState.up)
            {
                e.CInputState.yaxis = 1;            
            }
            else if(e.player.CInputState.down)
            {
                e.CInputState.yaxis = -1;
            }
            else
            {
                e.CInputState.yaxis *= 0.9;
            }
    
            if(e.player.CInputState.right)
            {
                e.CInputState.xaxis = 1;            
            }
            else if(e.player.CInputState.left)
            {
                e.CInputState.xaxis = -1;
            }
            else
            {
                e.CInputState.xaxis *= 0.9;
            }
        
	},

	performsOver : function(e){
		return e.CCamera;
	}



};
