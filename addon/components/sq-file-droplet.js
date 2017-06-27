import Ember from 'ember';
import Inputviews from '.././mixins/inputviews';

export default Ember.Component.extend(Inputviews, {

	classNames: ['sq-file-droplet'],
	classNameBindings: ['dragging'],
	accept: '',

	multiple: false,
	showPreview: false,

	// DRAG EVENTS -----------------------------------------------------------------

	dragging: false,

	/*

	dragOver(event){
    	event.preventDefault();
  	},

	dragEnter(event) {
		return;
		this.set('dragging', true);
		event.stopPropagation();
  		event.preventDefault();
	},

	dragLeave(event) {
		return;
		this.set('dragging', false);
		event.stopPropagation();
  		event.preventDefault();
	},


	// DROP EVENT ------------------------------------------------------------------

	change(event) {

		event.stopPropagation();
  		event.preventDefault();

  		if ( this.get('uploading') === false ) {

	  		var files = event.target.files || event.dataTransfer.files;

			if ( this.get('multiple') === true ) {
				for (var i = 0, file; file = files[i]; i++) {

				}
			} else {
				console.log(files[0]);
			}

		}

	},
	*/
	// CLICK -----------------------------------------------------------------------

	open() {

		if ( this.get('uploading') === false ) {

			var self = this;
			Ember.run.later(function() {

				var input = Ember.$('<input>').attr({ type: 'file', accept: self.get('accept') } );
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

		if ( this.get('showPreview') ) {

			var reader = new FileReader();

			var self = this;

			reader.onload = function(e) {
				self.set('preview', e.target.result);
			};

			reader.readAsDataURL(file);

		}

		this.upload(file);

	},

	// UPLOAD ----------------------------------------------------------------------

	uploading: false,
	processing: false,
	failed: false,

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
	//	this.set('percentage', '0%');

		this.sendAction('start');

		//
		var data = new FormData();
    	data.append('file', file);

    	var self = this;

		this.get('uploader').upload( this.get('namespace'), data).then(function(data) {

			if ( self.get('isDestroyed') !== true ) {
				self.set('preview', null);
				self.set('uploading', false);
		//		self.set('processing', false);
			}

			self.onComplete(data,self);

		}).catch(function(error) {

			console.log(error);

			if ( self.get('isDestroyed') !== true ) {
				self.set('preview', null);
				self.set('uploading', false);
				self.set('failed', true);
		//		self.set('processing', false);
			}

		});

	},

	//

	//onUploaded() {

	//	if ( this.get('isDestroyed') !== true ) {
	//		this.set('processing', true);
	//		this.set('uploading', false);
	//	}

	//},

	onComplete(data) {

		this.sendAction('complete', data);

	},

	//onProgress(value) {

	//	if ( this.get('isDestroyed') !== true ) {
	//		this.set('percentage', value);
	//	}

	//},


});
