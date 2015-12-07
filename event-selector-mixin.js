if(Meteor.isServer) return EventSelector = {}; //so server side rendering isn't broken

EventSelector = {
	nodes: {},

	componentDidMount() {
		EventSelector.nodes[this._reactId()] = this;
		this.bindEvents();
	},
	componentWillUnmount() {
		delete EventSelector.nodes[this._reactId()];		
		this.unbindEvents();
	},
	componentDidUpdate() {
		this.unbindEvents();
		this.bindEvents();
	},


	bindEvents() {
		_.each(this.events(), (handler, key) => {
			let [event, selector] = this._eventAndSelector(key);
			let $el = $(selector, ReactDOM.findDOMNode(this));
			let self = this;

			$el.on(event+'.'+this._namespace(), function(e) {
				let component = self._findComponent($(this));
				self._applyEventHandlerWithProps(self, handler, [e], component.props);
			});
		});
	},
	unbindEvents() {
		_.each(this.events(), (handler, key) => {
			let [event, selector] = this._eventAndSelector(key);
			let $el = $(selector, ReactDOM.findDOMNode(this));
			
			$el.off('.'+this._namespace());
		});
	},


	_findComponent($el) {
		let reactId;
	
		while($el.length !== 0) {
			reactId = $el.data('reactid');
		
			if(EventSelector.nodes[reactId]) return EventSelector.nodes[reactId]; //component exists for reactId
			else $el = $el.parent('[data-reactid]'); //reactId corresponds to non-component element; find parent instead
		};
	},


	_applyEventHandlerWithProps(component={}, method, args, props) {
		let oldProps = component.props; 					//swap props to Blaze helper/event context
		component.props = props; 									//which is supplied props from event
		component.ownProps = oldProps;						//continue to provide access to `oldProps if necessary
		component.child = component;							//provide access to child, perhaps for polymorphic usage
		
		let ret = method.apply(component, args); 	//gather return value
		
		component.props = oldProps; 							//put props back for other methods to utilize like normal
		delete component.ownProps;
		delete component.child;
		
		return ret;
	},


	_eventAndSelector(key) {
		return key.trim().split(/\s(.+)?/);
	},
	_isEvent(method, name) {
		return this._eventsRegex.test(name) && _.isFunction(method);
	},	
	events() {
		return _.filterObject(Object.getPrototypeOf(this), this._isEvent);
	},
	_reactId() {
		return this._reactInternalInstance && this._reactInternalInstance._rootNodeID;
	},
	_namespace() {
		return btoa(this._reactId());
	},
	_eventsRegex: /^(click|dblclick|focus|blur|change|mouseenter|mouseleave|mousedown|mouseup|keydown|keypress|keyup|touchdown|touchmove|touchup)(\s|$)/
};