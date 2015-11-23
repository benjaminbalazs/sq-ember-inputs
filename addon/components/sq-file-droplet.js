import Ember from 'ember';
import Inputviews from '.././mixins/inputviews';

export default Ember.Component.extend(Inputviews, {

	classNames: ['sq-file-droplet'],

	multiple: false,

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

		//
		this.set('failed', false);
		this.set('uploading', true);
		this.set('percentage', '0%');

		//
		var data = new FormData();
    	data.append('file', file);

    	var self = this;

		this.get('uploader').upload( this.get('namespace'), data, function(value) { self.onProgress(value); }, function() { self.onUploaded(); }, self.get('authenticate')).then(function(data) {

			self.onComplete(data);

		}).catch(function() {

			self.onFail();

		}).finally(function() {

			self.set('uploading', false);
			self.set('processing', false);

		});

	},

	//

	onUploaded() {

		this.set('uploading', false);

	},

	onComplete(data) {

		this.set('processing', false);
		this.sendAction('complete', data);

	},

	onProgress(value) {

		this.set('percentage', value);

	},

	onFail() {

		this.set('failed', true);

	},

});
