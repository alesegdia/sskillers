var List = function() {

	List.makeNode = function(){
		return { data: null, next: null };
	};

	this.start = null;
	this.end = null;

	this.add = function(data){
		if( this.start === null ){
			this.start = List.makeNode();
			this.end = this.start;
		} else {
			this.end.next = List.makeNode();
			this.end = this.end.next;
		}
		this.end.data = data;
	};

	this.delete = function( data ){
		var current = this.start;
		var previous = this.start;
		while( current !== null ){
			if( data === current.data ){
				if( current === this.start ){
					this.start = current.next;
					return;
				}
				if( current === this.end)
					this.end = previous;
				previous.next = current.next;
				return;
			}
			previous = current;
			current = current.next;
		}
	};

	this.delete_if = function( predicate ){
		var current = this.start;
		var previous = this.start;
		while( current !== null ){
			if( predicate( current.data ) ){
				if( current === this.start ){
					this.start = current.next;
					return;
				}
				if( current === this.end)
					this.end = previous;
				previous.next = current.next;
				return;
			}
			previous = current;
			current = current.next;
		}
	};

	this.each = function(f) {
		var current = this.start;
		while( current !== null ){
			f(current.data);
			current = current.next;
		}
	};

};

