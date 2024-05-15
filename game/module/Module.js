

SSK.namespace("SSK.module");

SSK.module.GenericModule = function() {
	this.process = function() {
		throw new Error("GenericModule, no process function!");
	};
};

SSK.module.EntityModule = function() {
	this.onEntityAdded = function(e) {
		if( this.performsOver(e) ) this.notifyEntityAdded(e);
	};
	this.onEntityDeleted = function(e) {
		if( this.performsOver(e) ) this.notifyEntityDeleted(e);
	};
	this.notifyEntityAdded = function(e) {
		throw new Error("Abstract!");
	};
	this.notifyEntityDeleted = function(e) {
		throw new Error("Abstract!");
	};
};

SSK.module.EntityModule.prototype = Object.create(SSK.module.GenericModule);
