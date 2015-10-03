import Ember from 'ember';
import Inputviews from '.././mixins/inputviews';

export default Ember.Component.extend(Inputviews, {

	classNames: ['sq-file-droplet'],

	value: null,

	// SETTINGS
	multiple: false,
	type: 'file',
	autoremove: true,

	// DRAG EVENTS -----------------------------------------------------------------

	dragging: false,

	//

	dragOver(event) {
		this.set('dragging', true);
    	event.preventDefault();
    	event.stopPropagation();
  	},

	dragEnter(event) {
		this.set('dragging', true);
		event.stopPropagation();
  		event.preventDefault();
	},

	dragLeave(event) {
		this.set('dragging', false);
		event.stopPropagation();
  		event.preventDefault();
	},

	// DROP EVENT ------------------------------------------------------------------

	drop(event) {

		event.stopPropagation();
  		event.preventDefault();

  		if ( this.get('uploading') === false ) {

	  		var files = event.target.files || event.dataTransfer.files;

			for (var i = 0, file; file = files[i]; i++) {
		
			}

		}

	},

	// CLICK -----------------------------------------------------------------------

	click() {

		if ( this.get('uploading') === false ) {

			var self = this;
			Ember.run.later(function() {

				var input = Ember.$('<input>').attr({ type: 'file'});
				input.on('change', function(event) {
					self.handleInputField(event);
				});

				self.set('input', input );
				self.get('input').click();

			});

		}

	},

	// HANDLE ----------------------------------------------------------------------

	handleInputField() {

		var file = this.input[0].files[0];

		this.upload(file);

	},

	// UPLOAD ----------------------------------------------------------------------

	uploading: false,
	processing: false,
	failed: false,
	//
	percentage: '0%',

	//

	working: Ember.computed('uploading', 'processing', function() {
		return ( this.get('uploading') || this.get('processing') );
	}),
	//

	upload(file) {

		var self = this;

		//
		this.set('uploading', true);

		//
		var data = new FormData();
    	data.append('file', file);

    	//
    	var current = null;
    	if ( this.get('autoremove') ) {
    		current = this.get('value.id');
    	}

    	self.set('percentage', '0%');

		this.uploader.upload( this.get('type'), current, data,

		function(value) {
			self.set('percentage', value);
		},

		function() {
			self.set('uploading', false);
			self.set('processing', true);
		}

		).then(function(model) {

			self.set('value', model);

			self.set('processing', false);

			self.sendAction('change', model);

		})

		.catch(function() {

			self.set('processing', false);
			self.set('uploading', false);
			self.set('failed', true);

		});

	},

	// INITIALIZE ------------------------------------------------------------------

	initialize : Ember.on('init', function() {

		var config = this.container.lookupFactory('config:environment');
		this.baseUrl =  "/" + config.APP.api_namespace + "/upload";

	})

});
