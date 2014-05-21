

SSK.namespace("SSK.core");

SSK.core.deltaTime = 0;

function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

/*
SSK.core.Scheduler = function(){
	this.modules = [];
};

SSK.core.Scheduler.prototype = {
	setNumPriorities : function( nPrio ){
		this.modules = new Array( nPrio );
	},
	addModule : function( m, p ){
		this.modules[p] = m;
	},
	tick : function(e){
		this.modules.forEach( function(m){
			if( m.performsOver(e) ) m.process(e);
		});
	}
};



SSK.core.Engine = function(){
	this.entities = [];
};

SSK.core.Engine.prototype = {
	addEntity = function(e){
		entities.push(e);
	}
};

*/

