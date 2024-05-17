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


var UnorderedList = function() {

	this.data = [];

	this.add = function(element)
	{
		this.data.push(element);
	};

	this.removeByIndex = function(element_index)
	{
		this.data[element_index] = this.data[this.data.length - 1];
		this.data.pop();
	};

	this.removeIf = function(pred)
	{
		var limit = this.data.length;
		for(var i = 0; i < limit; i++)
		{
			var shouldRemove = pred(this.data[i]);
			if(shouldRemove)
			{
				this.data[i] = this.data[this.data.length - 1];
				this.data.pop();
				limit--;
			}
		}
	}
};

