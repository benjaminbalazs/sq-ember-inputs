import { computed } from '@ember/object';
import $ from 'jquery';
import { later } from '@ember/runloop';
import Component from '@ember/component';
import Ember from 'ember';
import Inputviews from '.././mixins/inputviews';

export default Component.extend(Inputviews, {

	classNames: ['sq-file-droplet'],
	classNameBindings: ['dragging'],
	accept: '',

	multiple: false,
	showPreview: false,

	// CLICK -------------------------------------------------------------------

	open() {

		if ( this.get('uploading') === false ) {

			var self = this;
			later(function() {

				var input = $('<input>').attr({ type: 'file', accept: self.get('accept') } );
				input.on('change', function(event) {
					self.handleInputField(event);
				});

				self.set('input', input );
				self.get('input').click();

			});

		}

	},

	// HANDLE ------------------------------------------------------------------

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

	working: computed('uploading', 'processing', function() {
		return ( this.get('uploading') || this.get('processing') );
	}),

	//

	upload(file) {

		this.set('failed', false);
		this.set('uploading', true);

		this.sendAction('start');

		var data = new FormData();
    	data.append('file', file);

    	var self = this;

		this.get('uploader').upload( this.get('namespace'), data).then(function(data) {

			if ( self.get('isDestroyed') !== true ) {
				self.set('preview', null);
				self.set('uploading', false);
			}

			self.onComplete(data,self);

		}).catch(function(error) {

			console.error(error);

			if ( self.get('isDestroyed') !== true ) {
				self.set('preview', null);
				self.set('uploading', false);
				self.set('failed', true);
			}

		});

	},

	onComplete(data) {

		this.sendAction('complete', data);

	},


});
