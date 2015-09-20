import SqForm from './sq-input-form';
import Ember from 'ember';

export default SqForm.extend({

	//
	dirty: false,
	saving: false,
	saved: false,
	errored: false,

	//

	actions : {

		submit() {

			var self = this;

			this.validate();
			
			if ( this.get('isValid') ) {

				// UPDATE MODEL VALUES
				var list = this.get('params').split(',');
				for ( var i=0; i < list.length; i++) {
					var value = this.get('internal.'+list[i] );
					self.set('model.'+list[i], value);
				}
				
				if ( typeof(this.get('submit')) === 'function' ) {

					this.set('saving', true);
					self.set('dirty', false);

					var save = this.get('submit');

					save().then(function() {

						self.set('saving', false);
						self.set('saved', true);

						setTimeout(function() {
							self.set('saved', false);
						}, 1000);

					}).catch(function() {
						self.set('errored', true);
						self.set('saving', false);
					});

				} else {
					this.sendAction('submit');
					this.set('dirty', false);
				}

			}
			
		}

	},

	//

	changed() {
		var list = this.get('params').split(',');
		var isDifferent = false;
		for ( var i=0; i < list.length; i++) {
			if ( this.get('model.'+list[i]) !== this.get('internal.'+list[i]) ) {
				isDifferent = true;
			}
		}
		this.set('dirty', isDifferent);
	},

	// LISTENERS

	init() {

		this._super();

		this.set('internal', Ember.Object.create({}));

		var self = this;
		var list = this.get('params').split(',');
		
		for ( var i=0; i < list.length; i++) {

			// DEFAULTS
			this.set('internal.'+list[i], this.get('model.'+list[i]));

			this.get('internal').addObserver(list[i], null, function() {
				self.changed();
			});
			
			//this.get('model').addObserver(list[i], null, function(sender, key, value, rev) {
			//	if ( !this.get('overriding') ) {
			//		self.set('internal.'+key, value);
			//		self.changed();
			//	}
			//});

		}

	}

});