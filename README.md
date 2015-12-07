## EventSelector

```
meteor add ultimatejs:event-selector
```

This mixin brings *Blaze style* event selectors to React. Using `EventSelector` you no longer have to pass down functions to child components that implement them. In addition, you don't have to write extra boilerplate code to both access parent `state` and child `props`. If you needed both, typically you'd have to define yet another method on the child component in react that passes data from `props` to the event handler defined on and passed down from the parent. Your event handler, which is defined on the parent, has the `props` of the child component swapped in temporarily for the execution of the method. 

GOTCHA: you can access the parent's props via `this.ownProps` within the handler.

CAVEAT: *React Native* won't work with this approach yet, but bringing event selectors there is in the pipeline as well. For now use `HelperLookup`: http://github.com/ultimatejs/helper-lookup

## EXAMPLE:

```
ParentComponent = React.createClass({
	mixins: [EventSelector],

	getInitialState() {
		return {title: ''};
	},

	'click button'() {
		let title = prompt('enter a title') + ' set by ' + this.props.name;
		this.setState({title: title});
	}

	render() {
		return (
			<div>
				<h1>My title is {this.state.title}</h1>
				<ChildComponent name={'child 1'} />;
				<ChildComponent name={'child 2'} />;
			</div>
		);
	}
});


ChildComponent = React.createClass({
	mixins: [EventSelector],

	render() {
		return (
			<button>Set Title</button>
		);
	}
});
```

----

To see how this works nicely with "helpers" similarly defined on the parent, check out: http://github.com/ultimatejs/helper-lookup.

I won't put an example combining the 2 here in order to keep this readme short and sweet, but I suggest you checkout the example app to see it all put to work for you. 
----
###An example app has been prepared to quickly test it. 
Give it a try: https://github.com/ultimatejs/tracker-react-todos-example

*Thanks for helping us bridge the Blaze world we know to what will be a delightful React future.* **Long Live Meteor!** *Stay tuned for more coming out of the* [***Sideburns***](https://github.com/timbrandin/blaze-react) and ***Blaze React*** *project. Pull requests welcome.*  

######FINAL NOTE: make sure to check out `TrackerReact` as well. That is perhaps the biggest evolution in bringing Blaze behavior to React. Here it is: http://github.com/ultimatejs/tracker-react
