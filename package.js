Package.describe({
	name: "ultimatejs:event-selector",
	summary: "Blaze-style event selectors (with React-style contexts)",
	version: '0.0.6',
	documentation: 'README.md',
	git: 'https://github.com/ultimatejs/event-selector'
});

Package.onUse(function (api) {
	api.use('ultimatejs:ultimate-react@0.0.0');
	
	api.use('underscore@1.0.0');
	api.use('ultimatejs:underscore-mixin@0.0.0');
	
	api.addFiles([
		'event-selector-mixin.jsx',
	]);
	
	api.export('EventSelector');
});

