_.mixin({
	filterObject: function(obj, isTrue, ctx) {
		var newObj = {};

		_.each(obj, function(v, k) {
			if(isTrue.call(ctx || obj, v, k)) newObj[k] = v;
		});
	
		return newObj;
	}
});