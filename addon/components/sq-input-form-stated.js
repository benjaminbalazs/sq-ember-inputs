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

			if ( this.isValid() ) {

				if ( typeof(this.get('submit')) === 'function' ) {

					this.set('saving', true);

					// UPDATE MODEL VALUES
					var list = this.get('params').split(',');
					for ( var i=0; i < list.length; i++) {
						var value = this.get('internal.'+list[i] );
						self.set('model.'+list[i], value);
					}

					//---

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
			if ( String(this.get('model.'+list[i])) !== String(this.get('internal.'+list[i])) ) {
				isDifferent = true;
			}
		}
		this.set('dirty', isDifferent);
	},

	// LISTENERS

	init() {

		this._super();

		this.set('internal', Ember.Object.create({}));

		var list = this.get('params').split(',');

		for ( var i=0; i < list.length; i++) {

			// DEFAULTS
			this.set('internal.'+list[i], this.get('model.'+list[i]));

			// LISTENER
			this.get('internal').addObserver(list[i], this, function() {
				this.changed();
			});

			// APPLY OUTSIDE CHANGE
			this.get('model').addObserver(list[i], this, this.outside);

		}

	},

	outside(sender, key) {
		if ( this.get('saving') === false ) {
			this.set('internal.'+key, this.get('model.'+key));
		}
	}

});
